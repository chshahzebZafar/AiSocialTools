/**
 * One-off: load data/submissions-backfill.json into Firestore.
 *
 * Submissions were only logged and emailed before 2026-09-18, so the admin
 * inbox would otherwise start empty. This writes the records we still have,
 * reconstructed from the notification emails, each marked source: "backfill".
 *
 * Safe to re-run: documents are keyed by reference and written with merge, so
 * a second run updates rather than duplicates. It will overwrite status and
 * notes for those records, so avoid re-running after triaging them in /admin.
 *
 * Usage (from the repo root), with the same service account used in Vercel:
 *
 *   # PowerShell
 *   $env:FIREBASE_SERVICE_ACCOUNT_JSON = Get-Content -Raw .\service-account.json
 *   node scripts/backfill-submissions.mjs
 *
 * Add --dry-run to print what would be written without touching Firestore.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const COLLECTION = "aiDirectorySubmissions";
const dryRun = process.argv.includes("--dry-run");

function loadServiceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!raw) {
    console.error("FIREBASE_SERVICE_ACCOUNT_JSON is not set.");
    process.exit(1);
  }
  const trimmed = raw.trim();
  const json = trimmed.startsWith("{")
    ? trimmed
    : Buffer.from(trimmed, "base64").toString("utf8");
  const account = JSON.parse(json);
  account.private_key = String(account.private_key).replace(/\\n/g, "\n");
  return account;
}

// Which file to load: pass a name from data/, e.g.
//   node scripts/backfill-submissions.mjs submissions-backfill-2.json
const fileArg = process.argv.slice(2).find((a) => !a.startsWith("--"));
const FILE = fileArg || "submissions-backfill.json";
const records = JSON.parse(readFileSync(join(ROOT, "data", FILE), "utf8"));
console.log(`source: data/${FILE}`);

console.log(`${records.length} records to backfill${dryRun ? " (dry run)" : ""}`);

if (dryRun) {
  for (const r of records) {
    console.log(`  ${r.reference}  ${String(r.status).padEnd(8)}  ${r.name}`);
  }
  process.exit(0);
}

const account = loadServiceAccount();
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: account.project_id,
      clientEmail: account.client_email,
      privateKey: account.private_key,
    }),
  });
}
const db = getFirestore();

let written = 0;
for (const r of records) {
  if (!r.reference) {
    console.warn(`  skipped (no reference): ${r.name}`);
    continue;
  }
  await db.collection(COLLECTION).doc(r.reference).set(r, { merge: true });
  written += 1;
  console.log(`  wrote ${r.reference}  ${r.name}`);
}

console.log(`done: ${written} written to ${COLLECTION}`);
process.exit(0);
