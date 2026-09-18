import "server-only";

import { cert, getApp, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

/**
 * Server-side Firebase, used for storing AI-directory submissions and reading
 * them back in /admin.
 *
 * This is the Admin SDK, not the client SDK in lib/firebase.ts. It bypasses
 * Firestore security rules, which is exactly what we want here: submissions are
 * written by the API on behalf of anonymous visitors, so there is no signed-in
 * user to attach rules to. Keeping writes server-only also means nobody can
 * post straight into the collection and skip Turnstile and the honeypot.
 *
 * Requires FIREBASE_SERVICE_ACCOUNT_JSON: the downloaded service-account JSON,
 * either raw or base64-encoded. Base64 is recommended, because the raw JSON
 * contains newlines in private_key that some dashboards mangle.
 *
 * Everything degrades gracefully when it is unset: getDb() returns null and
 * callers skip persistence rather than failing the request.
 */

const APP_NAME = "admin";

let cached: Firestore | null | undefined;

function parseServiceAccount(raw: string): Record<string, string> | null {
  const trimmed = raw.trim();
  const json = trimmed.startsWith("{")
    ? trimmed
    : Buffer.from(trimmed, "base64").toString("utf8");
  try {
    const parsed = JSON.parse(json);
    if (!parsed.project_id || !parsed.client_email || !parsed.private_key) {
      return null;
    }
    // Some dashboards store the key with literal backslash-n instead of real
    // newlines; the SDK rejects that with an opaque error.
    parsed.private_key = String(parsed.private_key).replace(/\\n/g, "\n");
    return parsed;
  } catch {
    return null;
  }
}

/** Firestore instance, or null when no service account is configured. */
export function getDb(): Firestore | null {
  if (cached !== undefined) return cached;

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!raw) {
    // eslint-disable-next-line no-console
    console.warn("[firebase-admin] FIREBASE_SERVICE_ACCOUNT_JSON not set — persistence disabled.");
    cached = null;
    return cached;
  }

  const account = parseServiceAccount(raw);
  if (!account) {
    // eslint-disable-next-line no-console
    console.error(
      "[firebase-admin] FIREBASE_SERVICE_ACCOUNT_JSON could not be parsed, or is missing " +
        "project_id/client_email/private_key. Persistence disabled."
    );
    cached = null;
    return cached;
  }

  try {
    const existing = getApps().find((a) => a.name === APP_NAME);
    const app: App =
      existing ??
      initializeApp(
        {
          credential: cert({
            projectId: account.project_id,
            clientEmail: account.client_email,
            privateKey: account.private_key,
          }),
        },
        APP_NAME
      );
    cached = getFirestore(existing ? getApp(APP_NAME) : app);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[firebase-admin] initialisation failed:", err);
    cached = null;
  }
  return cached;
}

/** Collection holding AI-directory submissions. */
export const SUBMISSIONS = "aiDirectorySubmissions";

export type SubmissionStatus = "new" | "approved" | "declined" | "spam";

export interface StoredSubmission {
  reference: string;
  submittedAt: string;
  name: string;
  url: string;
  tagline: string;
  description: string;
  category: string;
  pricing: string;
  pricingDetails: string;
  features: string;
  twitter: string;
  founder: string;
  submitterName: string;
  submitterEmail: string;
  submitterRole: string;
  status: SubmissionStatus;
  /** Private reviewer notes, never shown publicly. */
  notes: string;
  /** How it arrived: the live form, or a manual backfill of earlier records. */
  source: "form" | "backfill";
  reviewedAt?: string;
}
