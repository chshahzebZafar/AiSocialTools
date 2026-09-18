import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Session handling for /admin.
 *
 * A single shared password (ADMIN_PASSWORD) is exchanged for a signed,
 * expiring token stored in an httpOnly cookie. The password itself is never
 * sent to the browser and never reaches the client bundle.
 *
 * The signing key is derived from ADMIN_PASSWORD rather than being a separate
 * secret, which keeps the setup to one environment variable and has a useful
 * side effect: changing the password invalidates every existing session.
 */

export const ADMIN_COOKIE = "ais_admin";
const SESSION_MS = 7 * 24 * 60 * 60 * 1000;

function key(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  return pw && pw.length > 0 ? pw : null;
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

/** True when an admin password is configured at all. */
export function isAdminConfigured(): boolean {
  return key() !== null;
}

/** Constant-time password check, so timing does not leak the password. */
export function passwordMatches(candidate: unknown): boolean {
  const expected = key();
  if (!expected || typeof candidate !== "string" || candidate.length === 0) return false;
  // Hash both sides first: timingSafeEqual throws on length mismatch, and the
  // lengths themselves would otherwise be observable.
  const a = createHmac("sha256", expected).update(candidate).digest();
  const b = createHmac("sha256", expected).update(expected).digest();
  return timingSafeEqual(a, b);
}

/** Issue a token valid for SESSION_MS. Returns null if no password is set. */
export function createSessionToken(): string | null {
  const secret = key();
  if (!secret) return null;
  const exp = Date.now() + SESSION_MS;
  return `${exp}.${sign(`admin:${exp}`, secret)}`;
}

/** Verify a cookie value. Rejects tampered or expired tokens. */
export function verifySessionToken(token: string | undefined): boolean {
  const secret = key();
  if (!secret || !token) return false;
  const [expPart, signature] = token.split(".");
  if (!expPart || !signature) return false;
  const exp = Number(expPart);
  if (!Number.isFinite(exp) || exp < Date.now()) return false;

  const expected = Buffer.from(sign(`admin:${exp}`, secret));
  const got = Buffer.from(signature);
  if (expected.length !== got.length) return false;
  return timingSafeEqual(expected, got);
}

export const SESSION_MAX_AGE_SECONDS = Math.floor(SESSION_MS / 1000);
