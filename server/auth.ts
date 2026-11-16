import { createHmac, timingSafeEqual } from "node:crypto";

export function signSession(value: string, secret: string): string {
  return createHmac("sha256", secret).update(value).digest("hex");
}

export function verifySession(token: string, secret: string): boolean {
  const [expires, signature] = token.split(".");
  if (!expires || !signature || !/^\d+$/.test(expires) || Number(expires) < Date.now()) return false;
  const expected = signSession(expires, secret);
  const supplied = Buffer.from(signature);
  const actual = Buffer.from(expected);
  return supplied.length === actual.length && timingSafeEqual(supplied, actual);
}
