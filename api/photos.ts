import { randomUUID } from "node:crypto";
import process from "node:process";
import { ensurePhotoSchema, getPostgresPool } from "../server/postgres.js";
import { verifySession } from "../server/auth.js";

const CHUNK_SIZE = 768 * 1024;
const MAX_IMAGE_SIZE = 4 * 1024 * 1024;
const MAX_VIDEO_SIZE = 500 * 1024 * 1024;
const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const VIDEO_TYPE = "video/mp4";

interface HttpRequest {
  method?: string;
  body?: unknown;
  url?: string;
  headers: {
    cookie?: string | string[];
    range?: string | string[];
    [name: string]: string | string[] | undefined;
  };
}

interface HttpResponse {
  status(code: number): HttpResponse;
  setHeader(name: string, value: string | number): HttpResponse;
  json(value: unknown): HttpResponse;
  send(value: string): HttpResponse;
  write(chunk: Buffer): boolean;
  end(): HttpResponse;
}

class HttpError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
  }
}

function isAdminRequest(cookieHeader?: string | string[]): boolean {
  const cookie = Array.isArray(cookieHeader) ? cookieHeader.join(";") : cookieHeader;
  const session = cookie
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith("admin_session="))
    ?.slice("admin_session=".length);
  const secret = process.env.ADMIN_SESSION_SECRET;
  return Boolean(session && secret && verifySession(session, secret));
}

function parseBody(body: unknown): Record<string, unknown> {
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      throw new HttpError("Invalid JSON request body", 400);
    }
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new HttpError("Invalid request body", 400);
  }
  return body as Record<string, unknown>;
}

function assertSlot(slot: unknown): asserts slot is string {
  if (typeof slot !== "string" || !/^[a-z0-9-]{1,80}$/.test(slot)) {
    throw new HttpError("Invalid media location", 400);
  }
}

function getQuery(req: HttpRequest, name: string): string | undefined {
  const value = new URL(req.url || "/api/photos", "http://localhost").searchParams.get(name);
  return value ?? undefined;
}

async function getOverrides(): Promise<Record<string, string>> {
  const { rows } = await getPostgresPool().query(
    `SELECT slot, updated_at FROM media_overrides ORDER BY slot`,
  );
  return Object.fromEntries(
    rows.map((row) => [
      row.slot,
      `/api/photos?slot=${encodeURIComponent(row.slot)}&v=${new Date(row.updated_at).getTime()}`,
    ]),
  );
}

function parseRange(range: string | undefined, size: number): [number, number] | null {
  if (!range) return [0, size - 1];
  const match = /^bytes=(\d*)-(\d*)$/.exec(range);
  if (!match || (!match[1] && !match[2])) return null;

  const start = match[1] ? Number(match[1]) : Math.max(0, size - Number(match[2]));
  let end = match[1] ? (match[2] ? Number(match[2]) : size - 1) : size - 1;
  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start < 0 || start >= size || end < start) {
    return null;
  }
  end = Math.min(end, size - 1);
  return [start, end];
}

async function serveMedia(req: HttpRequest, res: HttpResponse, slot: string): Promise<void> {
  assertSlot(slot);
  const pool = getPostgresPool();
  const { rows } = await pool.query(
    `SELECT u.upload_id, u.content_type, u.file_size
       FROM media_overrides o
       JOIN media_uploads u ON u.upload_id = o.upload_id
      WHERE o.slot = $1`,
    [slot],
  );
  const media = rows[0];
  if (!media) throw new HttpError("Media not found", 404);

  const size = Number(media.file_size);
  const rangeHeader = Array.isArray(req.headers.range) ? req.headers.range[0] : req.headers.range;
  const range = parseRange(rangeHeader, size);
  if (!range) {
    res.setHeader("Content-Range", `bytes */${size}`);
    res.status(416).end();
    return;
  }

  const [start, end] = range;
  const firstChunk = Math.floor(start / CHUNK_SIZE);
  const lastChunk = Math.floor(end / CHUNK_SIZE);
  const result = await pool.query(
    `SELECT chunk_index, data
       FROM media_upload_chunks
      WHERE upload_id = $1 AND chunk_index BETWEEN $2 AND $3
      ORDER BY chunk_index`,
    [media.upload_id, firstChunk, lastChunk],
  );

  res.status(rangeHeader ? 206 : 200);
  res.setHeader("Accept-Ranges", "bytes");
  res.setHeader("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
  res.setHeader("Content-Type", media.content_type);
  res.setHeader("Content-Length", end - start + 1);
  if (rangeHeader) res.setHeader("Content-Range", `bytes ${start}-${end}/${size}`);

  for (const row of result.rows) {
    const data = Buffer.isBuffer(row.data) ? row.data : Buffer.from(row.data);
    const chunkStart = Number(row.chunk_index) * CHUNK_SIZE;
    const from = Math.max(0, start - chunkStart);
    const to = Math.min(data.length, end - chunkStart + 1);
    if (to > from) res.write(data.subarray(from, to));
  }
  res.end();
}

async function startUpload(body: Record<string, unknown>): Promise<{ uploadId: string; chunkSize: number }> {
  const { slot, kind, contentType, size } = body;
  assertSlot(slot);

  if (kind !== "image" && kind !== "video") {
    throw new HttpError("Invalid media type", 400);
  }
  if (
    typeof contentType !== "string" ||
    (kind === "image" && !IMAGE_TYPES.has(contentType)) ||
    (kind === "video" && contentType !== VIDEO_TYPE)
  ) {
    throw new HttpError("Unsupported media content type", 400);
  }
  const maxSize = kind === "video" ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;
  if (typeof size !== "number" || !Number.isSafeInteger(size) || size <= 0 || size > maxSize) {
    throw new HttpError(`File size must be between 1 byte and ${kind === "video" ? "500 MB" : "4 MB"}`, 413);
  }

  const uploadId = randomUUID();
  const chunkCount = Math.ceil(size / CHUNK_SIZE);
  const pool = getPostgresPool();
  await pool.query(
    `DELETE FROM media_uploads u
      WHERE u.created_at < NOW() - INTERVAL '24 hours'
        AND NOT EXISTS (SELECT 1 FROM media_overrides o WHERE o.upload_id = u.upload_id)`,
  );
  await pool.query(
    `INSERT INTO media_uploads (upload_id, slot, kind, content_type, file_size, chunk_count)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [uploadId, slot, kind, contentType, size, chunkCount],
  );
  return { uploadId, chunkSize: CHUNK_SIZE };
}

async function saveChunk(body: Record<string, unknown>): Promise<void> {
  const { uploadId, index, data: encoded } = body;
  if (
    typeof uploadId !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uploadId) ||
    typeof index !== "number" ||
    !Number.isSafeInteger(index) ||
    index < 0 ||
    typeof encoded !== "string" ||
    !encoded
  ) {
    throw new HttpError("Invalid upload chunk", 400);
  }

  const chunk = Buffer.from(encoded, "base64");
  if (
    chunk.length > CHUNK_SIZE ||
    chunk.toString("base64") !== encoded
  ) {
    throw new HttpError("Invalid or oversized base64 chunk", 413);
  }

  const result = await getPostgresPool().query(
    `WITH eligible AS (
       SELECT u.upload_id, u.file_size, u.chunk_count
         FROM media_uploads u
        WHERE u.upload_id = $1
          AND $2 < u.chunk_count
          AND NOT EXISTS (SELECT 1 FROM media_overrides o WHERE o.upload_id = u.upload_id)
        FOR UPDATE
     )
     INSERT INTO media_upload_chunks (upload_id, chunk_index, data)
     SELECT eligible.upload_id, $2, $3
       FROM eligible
      WHERE OCTET_LENGTH($3::bytea) = LEAST($4::integer, (eligible.file_size - $2::bigint * $4::bigint)::integer)
     ON CONFLICT (upload_id, chunk_index) DO UPDATE SET data = EXCLUDED.data`,
    [uploadId, index, chunk, CHUNK_SIZE],
  );
  if (result.rowCount !== 1) {
    throw new HttpError("Upload session not found or already published", 404);
  }
}

async function completeUpload(uploadId: unknown): Promise<string> {
  if (
    typeof uploadId !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uploadId)
  ) {
    throw new HttpError("Invalid upload session", 400);
  }

  const pool = getPostgresPool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const { rows: uploads } = await client.query(
      `SELECT slot, file_size, chunk_count
         FROM media_uploads
        WHERE upload_id = $1
        FOR UPDATE`,
      [uploadId],
    );
    const upload = uploads[0];
    if (!upload) throw new HttpError("Upload session not found", 404);

    const { rows: totals } = await client.query(
      `SELECT COUNT(*)::integer AS chunk_count, COALESCE(SUM(OCTET_LENGTH(data)), 0)::bigint AS byte_count
         FROM media_upload_chunks
        WHERE upload_id = $1`,
      [uploadId],
    );
    if (
      Number(totals[0].chunk_count) !== Number(upload.chunk_count) ||
      Number(totals[0].byte_count) !== Number(upload.file_size)
    ) {
      throw new HttpError("Upload is incomplete; retry the missing chunks", 409);
    }

    const { rows: previous } = await client.query(
      `SELECT upload_id FROM media_overrides WHERE slot = $1 FOR UPDATE`,
      [upload.slot],
    );
    await client.query(
      `INSERT INTO media_overrides (slot, upload_id, updated_at)
       VALUES ($1, $2, NOW())
       ON CONFLICT (slot) DO UPDATE SET upload_id = EXCLUDED.upload_id, updated_at = NOW()`,
      [upload.slot, uploadId],
    );
    if (previous[0] && previous[0].upload_id !== uploadId) {
      await client.query(`DELETE FROM media_uploads WHERE upload_id = $1`, [previous[0].upload_id]);
    }
    await client.query("COMMIT");
    return `/api/photos?slot=${encodeURIComponent(upload.slot)}&v=${Date.now()}`;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

async function removeOverride(slot: unknown): Promise<void> {
  assertSlot(slot);
  const pool = getPostgresPool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const { rows } = await client.query(
      `DELETE FROM media_overrides WHERE slot = $1 RETURNING upload_id`,
      [slot],
    );
    if (rows[0]) {
      await client.query(`DELETE FROM media_uploads WHERE upload_id = $1`, [rows[0].upload_id]);
    }
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export default async function handler(req: HttpRequest, res: HttpResponse): Promise<unknown> {
  try {
    await ensurePhotoSchema();

    if (req.method === "GET") {
      const slot = getQuery(req, "slot");
      if (slot) {
        await serveMedia(req, res, slot);
        return;
      }
      return res.status(200).setHeader("Cache-Control", "no-store").json(await getOverrides());
    }

    if (req.method !== "POST") return res.status(405).send("Method not allowed");
    if (!isAdminRequest(req.headers.cookie)) {
      return res.status(401).json({ error: "Sign in required" });
    }

    const body = parseBody(req.body);
    if (body.action === "start") {
      return res.status(201).json(await startUpload(body));
    }
    if (body.action === "chunk") {
      await saveChunk(body);
      return res.status(200).json({ saved: true });
    }
    if (body.action === "complete") {
      const url = await completeUpload(body.uploadId);
      return res.status(200).json({ url });
    }
    if (body.action === "remove") {
      await removeOverride(body.slot);
      return res.status(200).json({ removed: true });
    }
    return res.status(400).json({ error: "Unknown media action" });
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.status).json({ error: error.message });
    }
    console.error("Photo storage request failed", error);
    return res.status(503).json({
      error: error instanceof Error && error.message === "DATABASE_URL is not configured"
        ? error.message
        : "Photo storage is unavailable. Check the PostgreSQL connection and retry.",
    });
  }
}
