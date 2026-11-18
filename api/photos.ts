import { list, put } from "@vercel/blob";
import { handleUpload } from "@vercel/blob/client";
import process from "node:process";
import { verifySession } from "../server/auth.js";
const MANIFEST_PATH = "photo-overrides/manifest.json";
const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const VIDEO_TYPES = ["video/mp4"];
const VALID_EXTENSIONS: Record<string, string[]> = {
  image: ["jpg", "jpeg", "png", "webp", "gif"],
  video: ["mp4"],
};

function getCallbackUrl(body: { payload?: { callbackUrl?: unknown } }): string {
  const callbackUrl = process.env.VERCEL_BLOB_CALLBACK_URL;
  if (callbackUrl) {
    const url = new URL(callbackUrl);
    if (url.protocol !== "https:" || url.pathname !== "/api/photos") {
      throw new Error("VERCEL_BLOB_CALLBACK_URL must be an HTTPS URL ending in /api/photos");
    }
    return url.toString();
  }

  const clientCallbackUrl = body.payload?.callbackUrl;
  if (typeof clientCallbackUrl === "string") {
    const hostname = new URL(clientCallbackUrl).hostname;
    if (
      hostname === "localhost" ||
      hostname.endsWith(".localhost") ||
      hostname === "127.0.0.1" ||
      hostname === "::1" ||
      hostname === "[::1]"
    ) {
      throw new Error("Local Blob uploads need a public HTTPS callback URL. Set VERCEL_BLOB_CALLBACK_URL to your tunnel URL ending in /api/photos.");
    }
    return clientCallbackUrl;
  }
  throw new Error("Missing Blob upload callback URL");
}

function isAdminRequest(cookieHeader?: string): boolean {
  const session = cookieHeader
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith("admin_session="))
    ?.slice("admin_session=".length);
  const secret = process.env.ADMIN_SESSION_SECRET;
  return Boolean(session && secret && verifySession(session, secret));
}

async function readManifest(): Promise<Record<string, string>> {
  const { blobs } = await list({ prefix: MANIFEST_PATH, limit: 1 });
  const manifest = blobs.find((blob) => blob.pathname === MANIFEST_PATH);
  if (!manifest) return {};
  const response = await fetch(manifest.url, { cache: "no-store" });
  if (!response.ok) throw new Error("Could not read photo manifest");
  return response.json() as Promise<Record<string, string>>;
}

async function publishOverride(slot: string, blobUrl: string) {
  if (!/^[a-z0-9-]{1,80}$/.test(slot)) throw new Error("Invalid media location");
  const url = new URL(blobUrl);
  const pathname = decodeURIComponent(url.pathname).replace(/^\/+/, "");
  const extension = pathname.split(".").pop()?.toLowerCase();
  const kind = extension === "mp4" ? "video" : "image";
  if (
    url.protocol !== "https:" ||
    !url.hostname.endsWith(".public.blob.vercel-storage.com") ||
    !VALID_EXTENSIONS[kind].includes(extension ?? "") ||
    pathname !== `photo-overrides/${slot}.${extension}`
  ) {
    throw new Error("Invalid uploaded media URL");
  }

  const manifest = await readManifest();
  manifest[slot] = `${url.toString()}?v=${Date.now()}`;
  await put(MANIFEST_PATH, JSON.stringify(manifest), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
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
    if (body.action === "publish") {
      if (!isAdminRequest(req.headers.cookie)) {
        return res.status(401).json({ error: "Sign in required" });
      }
      await publishOverride(body.slot, body.url);
      return res.status(200).json({ published: true });
    }

    const uploadBody =
      body.type === "blob.generate-client-token" && body.payload
        ? {
            ...body,
            payload: { ...body.payload, callbackUrl: getCallbackUrl(body) },
          }
        : body;
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
      body: JSON.stringify(uploadBody),
    });
    const result = await handleUpload({
      body: uploadBody,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        if (!isAdminRequest(request.headers.get("cookie") ?? undefined)) throw new Error("Sign in required");
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
        };
      },
      onUploadCompleted: async () => undefined,
    });
    return res.status(200).json(result);
  } catch (error) {
    console.error("Photo upload failed", error);
    return res.status(400).json({ error: error instanceof Error ? error.message : "Photo upload failed. Check Vercel Blob configuration." });
  }
}
