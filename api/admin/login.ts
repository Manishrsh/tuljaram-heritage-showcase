import { createHash, timingSafeEqual } from "node:crypto";
import { signSession, verifySession } from "../../server/auth";

export default async function handler(request: Request): Promise<Response> {
  if (request.method === "GET") {
    const token = request.headers.get("cookie")?.split(";").map((part) => part.trim()).find((part) => part.startsWith("admin_session="))?.slice("admin_session=".length);
    const secret = process.env.ADMIN_SESSION_SECRET;
    return Response.json({ authenticated: Boolean(token && secret && verifySession(token, secret)) });
  }
  if (request.method === "DELETE") {
    const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";
    return new Response(null, { status: 204, headers: { "Set-Cookie": `admin_session=; HttpOnly${secure}; SameSite=Strict; Path=/; Max-Age=0` } });
  }
  if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });
  const { ADMIN_PASSWORD, ADMIN_SESSION_SECRET } = process.env;
  if (!ADMIN_PASSWORD || !ADMIN_SESSION_SECRET) return Response.json({ error: "Admin is not configured" }, { status: 503 });
  const body = await request.json().catch(() => ({})) as { password?: string };
  const suppliedPassword = createHash("sha256").update(body.password ?? "").digest();
  const configuredPassword = createHash("sha256").update(ADMIN_PASSWORD).digest();
  if (!timingSafeEqual(suppliedPassword, configuredPassword)) return Response.json({ error: "Password is incorrect" }, { status: 401 });
  const expires = String(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const token = `${expires}.${signSession(expires, ADMIN_SESSION_SECRET)}`;
  const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";
  return Response.json({ authenticated: true }, { headers: { "Set-Cookie": `admin_session=${token}; HttpOnly${secure}; SameSite=Strict; Path=/; Max-Age=604800` } });
}
