import { Pool } from "pg";
import process from "node:process";

type PostgresGlobals = typeof globalThis & {
  photoDatabasePool?: Pool;
  photoDatabaseSchema?: Promise<void>;
};

const globals = globalThis as PostgresGlobals;

const PHOTO_SCHEMA = `
  CREATE TABLE IF NOT EXISTS media_uploads (
    upload_id UUID PRIMARY KEY,
    slot TEXT NOT NULL,
    kind TEXT NOT NULL CHECK (kind IN ('image', 'video')),
    content_type TEXT NOT NULL,
    file_size BIGINT NOT NULL CHECK (file_size > 0),
    chunk_count INTEGER NOT NULL CHECK (chunk_count > 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
  CREATE TABLE IF NOT EXISTS media_upload_chunks (
    upload_id UUID NOT NULL REFERENCES media_uploads(upload_id) ON DELETE CASCADE,
    chunk_index INTEGER NOT NULL CHECK (chunk_index >= 0),
    data BYTEA NOT NULL,
    PRIMARY KEY (upload_id, chunk_index)
  );
  CREATE TABLE IF NOT EXISTS media_overrides (
    slot TEXT PRIMARY KEY,
    upload_id UUID NOT NULL UNIQUE REFERENCES media_uploads(upload_id) ON DELETE CASCADE,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
`;

export function getPostgresPool(): Pool {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured");
  }

  if (!globals.photoDatabasePool) {
    globals.photoDatabasePool = new Pool({
      connectionString,
      max: 1,
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 5_000,
    });
  }

  return globals.photoDatabasePool;
}

export async function ensurePhotoSchema(): Promise<void> {
  if (!globals.photoDatabaseSchema) {
    globals.photoDatabaseSchema = getPostgresPool()
      .query(PHOTO_SCHEMA)
      .then(() => undefined)
      .catch((error: unknown) => {
        globals.photoDatabaseSchema = undefined;
        throw error;
      });
  }

  await globals.photoDatabaseSchema;
}
