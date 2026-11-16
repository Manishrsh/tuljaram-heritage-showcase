import { list, put } from "@vercel/blob";
import { handleUpload } from "@vercel/blob/client";

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

export default async function handler(request: Request): Promise<Response> {
  if (request.method === "GET") {
    try {
      return Response.json(await readManifest(), { headers: { "Cache-Control": "no-store" } });
    } catch {
      return Response.json({ error: "Photo storage is not configured" }, { status: 503 });
    }
  }
  if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });
  try {
    const body = await request.json();
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
    return Response.json(result);
  } catch (error) {
    console.error("Photo upload failed", error);
    return Response.json({ error: error instanceof Error ? error.message : "Photo upload failed. Check Vercel Blob configuration." }, { status: 400 });
  }
}
