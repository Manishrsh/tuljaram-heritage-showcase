import { list, put } from "@vercel/blob";
import { handleUpload } from "@vercel/blob/client";
import process from "node:process";

const MANIFEST_PATH = "photo-overrides/manifest.json";
const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const VIDEO_TYPES = ["video/mp4"];
const VALID_EXTENSIONS: Record<string, string[]> = {
  image: ["jpg", "jpeg", "png", "webp", "gif"],
  video: ["mp4"],
};

async function readManifest(): Promise<Record<string, string>> {
  const { blobs } = await list({ prefix: MANIFEST_PATH, limit: 1 });
  const manifest = blobs.find((blob) => blob.pathname === MANIFEST_PATH);
  if (!manifest) return {};
  const response = await fetch(manifest.url, { cache: "no-store" });
  if (!response.ok) throw new Error("Could not read photo manifest");
  return response.json() as Promise<Record<string, string>>;
}

export default async function handler(req: any, res: any) {
  if (req.method === "GET") {
    try {
      return res.status(200).setHeader("Cache-Control", "no-store").json(await readManifest());
    } catch {
      return res.status(503).json({ error: "Photo storage is not configured" });
    }
  }
  if (req.method !== "POST") return res.status(405).send("Method not allowed");
  try {
    const body = req.body || {};
    const protocol = req.headers["x-forwarded-proto"] || "http";
    const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
    const headers = new Headers();
    for (const [name, value] of Object.entries(req.headers)) {
      if (typeof value === "string") headers.set(name, value);
      else if (Array.isArray(value)) headers.set(name, value.join(", "));
    }
    const request = new Request(`${protocol}://${host}${req.url || "/api/photos"}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        const session = request.headers.get("cookie")?.split(";").map((part) => part.trim()).find((part) => part.startsWith("admin_session="))?.slice("admin_session=".length);
        const secret = process.env.ADMIN_SESSION_SECRET;
        const { verifySession } = await import("../server/auth");
        if (!session || !secret || !verifySession(session, secret)) throw new Error("Sign in required");
        const payload = JSON.parse(clientPayload ?? "{}") as { slot?: string; kind?: string };
        const extension = pathname.split(".").pop()?.toLowerCase();
        if (!payload.slot || !/^[a-z0-9-]{1,80}$/.test(payload.slot) || !payload.kind || !VALID_EXTENSIONS[payload.kind]?.includes(extension ?? "")) {
          throw new Error("Invalid media location or file type");
        }
        if (pathname !== `photo-overrides/${payload.slot}.${extension}`) throw new Error("Invalid media path");
        return {
          allowedContentTypes: payload.kind === "video" ? VIDEO_TYPES : PHOTO_TYPES,
          addRandomSuffix: false,
          allowOverwrite: true,
          ...(process.env.VERCEL_BLOB_CALLBACK_URL ? { callbackUrl: process.env.VERCEL_BLOB_CALLBACK_URL } : {}),
          tokenPayload: JSON.stringify({ slot: payload.slot }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        const payload = JSON.parse(tokenPayload ?? "{}") as { slot?: string };
        if (!payload.slot || !/^[a-z0-9-]{1,80}$/.test(payload.slot)) throw new Error("Invalid upload metadata");
        const manifest = await readManifest();
        const versionedUrl = `${blob.url}?v=${Date.now()}`;
        manifest[payload.slot] = versionedUrl;
        await put(MANIFEST_PATH, JSON.stringify(manifest), { access: "public", addRandomSuffix: false, allowOverwrite: true, contentType: "application/json" });
      },
    });
    return res.status(200).json(result);
  } catch (error) {
    console.error("Photo upload failed", error);
    return res.status(400).json({ error: error instanceof Error ? error.message : "Photo upload failed. Check Vercel Blob configuration." });
  }
}
