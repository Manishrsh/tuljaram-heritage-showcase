
import { createHash, timingSafeEqual } from "node:crypto";
import process from "node:process";
import { signSession, verifySession } from "../../server/auth";

export default async function handler(req: any, res: any) {
  const cookieHeader = req.headers.cookie || "";

  const token = cookieHeader
    .split(";")
    .map((part: string) => part.trim())
    .find((part: string) => part.startsWith("admin_session="))
    ?.slice("admin_session=".length);

  const secret = process.env.ADMIN_SESSION_SECRET;

  const secure =
    req.headers["x-forwarded-proto"] === "https" ? "; Secure" : "";

  // GET: Check authentication
  if (req.method === "GET") {
    const authenticated = Boolean(
      token && secret && verifySession(token, secret)
    );

    return res.status(200).json({ authenticated });
  }

  // DELETE: Logout
  if (req.method === "DELETE") {
    res.setHeader(
      "Set-Cookie",
      `admin_session=; HttpOnly${secure}; SameSite=Strict; Path=/; Max-Age=0`
    );

    return res.status(204).end();
  }

  // Allow POST only
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  const {
    ADMIN_PASSWORD,
    ADMIN_SESSION_SECRET
  } = process.env;

  if (!ADMIN_PASSWORD || !ADMIN_SESSION_SECRET) {
    return res.status(503).json({
      error: "Admin is not configured"
    });
  }

  // Read password
  const body = req.body || {};
  const suppliedPassword = createHash("sha256")
    .update(body.password ?? "")
    .digest();

  const configuredPassword = createHash("sha256")
    .update(ADMIN_PASSWORD)
    .digest();

  // Validate password
  if (!timingSafeEqual(suppliedPassword, configuredPassword)) {
    return res.status(401).json({
      error: "Password is incorrect"
    });
  }

  // Create session
  const expires = String(
    Date.now() + 7 * 24 * 60 * 60 * 1000
  );

  const sessionToken =
    `${expires}.${signSession(expires, ADMIN_SESSION_SECRET)}`;

  res.setHeader(
    "Set-Cookie",
    `admin_session=${sessionToken}; HttpOnly${secure}; SameSite=Strict; Path=/; Max-Age=604800`
  );

  return res.status(200).json({
    authenticated: true
  });
}
