/**
 * Moves the directory inbox from Firestore to Supabase.
 *
 * Dry run by default: it reads everything, maps it, reports exactly what it
 * would write, and touches nothing. Pass --apply to actually write.
 *
 *   node scripts/migrate-firestore-to-supabase.mjs            # report only
 *   node scripts/migrate-firestore-to-supabase.mjs --apply    # write
 *
 * Needs, in the environment:
 *   FIREBASE_SERVICE_ACCOUNT_JSON   (raw JSON or base64, same as Vercel)
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *
 * Safe to re-run. Rows are upserted on `reference`, which is unique and stable
 * from the day a submission was created, so a second run updates rather than
 * duplicating. That matters because the realistic way this goes wrong is a
 * partial first run.
 *
 * It does not delete anything from Firestore. Verify Supabase first, cut the
 * app over, watch it for a few days, and only then decommission.
 */
import { createClient } from "@supabase/supabase-js";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const APPLY = process.argv.includes("--apply");
const SUBMISSIONS = "aiDirectorySubmissions";

function parseServiceAccount(raw) {
  let text = raw.trim();
  if (!text.startsWith("{")) text = Buffer.from(text, "base64").toString("utf8");
  const parsed = JSON.parse(text);
  parsed.private_key = String(parsed.private_key).replace(/\\n/g, "\n");
  return parsed;
}

function fail(msg) {
  console.error("ERROR: " + msg);
  process.exit(1);
}

const rawAccount = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!rawAccount) fail("FIREBASE_SERVICE_ACCOUNT_JSON is not set.");
if (!url || !serviceKey) fail("NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are not set.");

const account = parseServiceAccount(rawAccount);
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
const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

/** Firestore stores ISO strings; Postgres wants a real timestamp or null. */
function ts(v) {
  if (!v) return null;
  const s = String(v);
  const ms = Date.parse(s);
  return Number.isFinite(ms) ? new Date(ms).toISOString() : null;
}

/** sponsored_until is a date column: YYYY-MM-DD or null, never "". */
function dateOnly(v) {
  const s = String(v ?? "").slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(s) ? s : null;
}

const STATUSES = new Set(["new", "approved", "declined", "spam"]);

const snap = await db.collection(SUBMISSIONS).get();
console.log(`Read ${snap.size} documents from Firestore.\n`);

const rows = [];
const notes = [];
const problems = [];

for (const doc of snap.docs) {
  const d = doc.data();
  // The Firestore doc id IS the reference for form submissions; fall back to
  // the stored field, then the id, so nothing is skipped for want of one.
  const reference = String(d.reference ?? doc.id).trim() || doc.id;
  const status = STATUSES.has(String(d.status)) ? String(d.status) : "new";

  if (!d.name || !d.url) {
    problems.push(`${reference}: missing name or url — skipped`);
    continue;
  }

  rows.push({
    reference,
    // Firebase uids are not Supabase uuids. Nobody ever signed in under the
    // Firebase auth that was built (it was never switched on), so there is no
    // real ownership to carry across. Submitters reclaim their rows by
    // verified email on first sign-in.
    owner_id: null,
    name: String(d.name),
    url: String(d.url),
    tagline: String(d.tagline ?? ""),
    description: String(d.description ?? ""),
    category: String(d.category ?? ""),
    pricing: String(d.pricing ?? ""),
    pricing_details: String(d.pricingDetails ?? ""),
    features: String(d.features ?? ""),
    twitter: String(d.twitter ?? ""),
    founder: String(d.founder ?? ""),
    submitter_name: String(d.submitterName ?? ""),
    submitter_email: String(d.submitterEmail ?? ""),
    submitter_role: String(d.submitterRole ?? ""),
    status,
    slug: d.slug ? String(d.slug) : null,
    source: String(d.source ?? "form"),
    sponsored: d.sponsored === true,
    sponsored_until: dateOnly(d.sponsoredUntil),
    notified_status: STATUSES.has(String(d.notifiedStatus)) ? String(d.notifiedStatus) : null,
    notified_at: ts(d.notifiedAt),
    submitted_at: ts(d.submittedAt) ?? new Date().toISOString(),
    reviewed_at: ts(d.reviewedAt),
  });

  if (d.notes || d.sponsorshipNote) {
    notes.push({
      reference,
      notes: String(d.notes ?? ""),
      sponsorship_note: String(d.sponsorshipNote ?? ""),
    });
  }
}

// Report before doing anything.
const byStatus = rows.reduce((a, r) => ((a[r.status] = (a[r.status] || 0) + 1), a), {});
console.log("Mapped rows by status:");
for (const [k, v] of Object.entries(byStatus)) console.log(`   ${k.padEnd(10)} ${v}`);
console.log(`   ${"published".padEnd(10)} ${rows.filter((r) => r.slug).length} (have a slug)`);
console.log(`   ${"sponsored".padEnd(10)} ${rows.filter((r) => r.sponsored).length}`);
console.log(`\nPrivate note rows: ${notes.length}`);

const dupes = rows.map((r) => r.reference).filter((r, i, a) => a.indexOf(r) !== i);
if (dupes.length) problems.push(`duplicate references: ${[...new Set(dupes)].join(", ")}`);
const slugs = rows.map((r) => r.slug).filter(Boolean);
const dupeSlugs = slugs.filter((s, i) => slugs.indexOf(s) !== i);
if (dupeSlugs.length) problems.push(`duplicate slugs: ${[...new Set(dupeSlugs)].join(", ")}`);

if (problems.length) {
  console.log("\nProblems:");
  for (const p of problems) console.log("   " + p);
}

if (!APPLY) {
  console.log("\nDry run — nothing written. Re-run with --apply to write.");
  process.exit(problems.length ? 1 : 0);
}

if (problems.length) fail("Refusing to write while the problems above are unresolved.");

// Write submissions, then notes. Chunked so one oversized request cannot fail
// the whole migration.
const CHUNK = 100;
let written = 0;
for (let i = 0; i < rows.length; i += CHUNK) {
  const slice = rows.slice(i, i + CHUNK);
  const { error } = await supabase
    .from("submissions")
    .upsert(slice, { onConflict: "reference" });
  if (error) fail(`writing submissions at offset ${i}: ${error.message}`);
  written += slice.length;
  console.log(`   wrote ${written}/${rows.length}`);
}

// Notes key on submission_id, so look the ids back up by reference.
if (notes.length) {
  const { data: ids, error } = await supabase
    .from("submissions")
    .select("id, reference")
    .in("reference", notes.map((n) => n.reference));
  if (error) fail(`reading back ids: ${error.message}`);

  const byRef = new Map(ids.map((r) => [r.reference, r.id]));
  const noteRows = notes
    .filter((n) => byRef.has(n.reference))
    .map((n) => ({
      submission_id: byRef.get(n.reference),
      notes: n.notes,
      sponsorship_note: n.sponsorship_note,
    }));

  const { error: noteErr } = await supabase
    .from("submission_notes")
    .upsert(noteRows, { onConflict: "submission_id" });
  if (noteErr) fail(`writing notes: ${noteErr.message}`);
  console.log(`   wrote ${noteRows.length} private note rows`);
}

// Verify by counting what is actually there rather than trusting the writes.
const { count, error: countErr } = await supabase
  .from("submissions")
  .select("*", { count: "exact", head: true });
if (countErr) fail(`verifying: ${countErr.message}`);

console.log(`\nDone. submissions now holds ${count} rows (expected at least ${rows.length}).`);
console.log("Firestore is untouched. Verify the site against Supabase before decommissioning it.");
