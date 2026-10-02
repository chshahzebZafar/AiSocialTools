import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getDb, SUBMISSIONS } from "@/lib/firebase-admin";
import { supabaseIfConfigured } from "@/lib/supabase";
import { verifySessionToken, ADMIN_COOKIE } from "@/lib/admin-auth";

/**
 * One-off: copy the submission inbox from Firestore into Supabase.
 *
 * Runs here rather than from a laptop because Vercel already holds the
 * Firebase credentials, so nothing has to be copied onto a developer machine
 * to make the move.
 *
 * GET  — dry run. Reads, maps, reports counts, writes nothing.
 * POST — writes. Upserts on `reference`, which is unique and stable from the
 *        day a submission was created, so a partial run is safe to repeat.
 *
 * Admin-session gated, and it never deletes anything from Firestore. Delete
 * this route once the move is done and verified; a migration endpoint sitting
 * in production is a liability with no remaining purpose.
 */
export const dynamic = "force-dynamic";
export const maxDuration = 60;

async function requireAdmin() {
  const jar = await cookies();
  if (!verifySessionToken(jar.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }
  return null;
}

const STATUSES = new Set(["new", "approved", "declined", "spam"]);

/** Firestore stores ISO strings; Postgres wants a real timestamp or null. */
function ts(v: unknown): string | null {
  if (!v) return null;
  const ms = Date.parse(String(v));
  return Number.isFinite(ms) ? new Date(ms).toISOString() : null;
}

/** sponsored_until is a date column: YYYY-MM-DD or null, never "". */
function dateOnly(v: unknown): string | null {
  const s = String(v ?? "").slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(s) ? s : null;
}

type Mapped = {
  rows: Record<string, unknown>[];
  notes: { reference: string; notes: string; sponsorship_note: string }[];
  problems: string[];
  total: number;
};

async function readAndMap(): Promise<Mapped | { error: string }> {
  const fs = getDb();
  if (!fs) return { error: "Firestore is not configured." };

  const snap = await fs.collection(SUBMISSIONS).get();
  const rows: Record<string, unknown>[] = [];
  const notes: Mapped["notes"] = [];
  const problems: string[] = [];

  for (const doc of snap.docs) {
    const d = doc.data();
    const reference = String(d.reference ?? doc.id).trim() || doc.id;
    if (!d.name || !d.url) {
      problems.push(`${reference}: missing name or url — skipped`);
      continue;
    }
    rows.push({
      reference,
      // Firebase uids are not Supabase uuids, and nobody ever signed in under
      // the Firebase auth that was built, so there is no ownership to carry
      // across. Submitters reclaim rows by verified email on first sign-in.
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
      status: STATUSES.has(String(d.status)) ? String(d.status) : "new",
      slug: d.slug ? String(d.slug) : null,
      source: String(d.source ?? "form"),
      sponsored: d.sponsored === true,
      sponsored_until: dateOnly(d.sponsoredUntil),
      sponsored_lifetime: d.sponsoredLifetime === true,
      notified_status: STATUSES.has(String(d.notifiedStatus))
        ? String(d.notifiedStatus)
        : null,
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

  const refs = rows.map((r) => String(r.reference));
  const dupeRefs = [...new Set(refs.filter((r, i) => refs.indexOf(r) !== i))];
  if (dupeRefs.length) problems.push(`duplicate references: ${dupeRefs.join(", ")}`);
  const slugs = rows.map((r) => r.slug).filter(Boolean) as string[];
  const dupeSlugs = [...new Set(slugs.filter((s, i) => slugs.indexOf(s) !== i))];
  if (dupeSlugs.length) problems.push(`duplicate slugs: ${dupeSlugs.join(", ")}`);

  return { rows, notes, problems, total: snap.size };
}

function summarise(m: Mapped) {
  const byStatus: Record<string, number> = {};
  for (const r of m.rows) {
    const s = String(r.status);
    byStatus[s] = (byStatus[s] ?? 0) + 1;
  }
  return {
    firestoreDocuments: m.total,
    mapped: m.rows.length,
    byStatus,
    published: m.rows.filter((r) => r.slug).length,
    sponsored: m.rows.filter((r) => r.sponsored).length,
    privateNotes: m.notes.length,
    problems: m.problems,
  };
}

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const m = await readAndMap();
    if ("error" in m) return NextResponse.json({ error: m.error }, { status: 503 });
    return NextResponse.json({
      ok: true,
      dryRun: true,
      supabaseConfigured: supabaseIfConfigured() !== null,
      ...summarise(m),
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Could not read Firestore." },
      { status: 500 }
    );
  }
}

export async function POST() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const db = supabaseIfConfigured();
  if (!db) {
    return NextResponse.json(
      { error: "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY." },
      { status: 503 }
    );
  }

  try {
    const m = await readAndMap();
    if ("error" in m) return NextResponse.json({ error: m.error }, { status: 503 });
    if (m.problems.length) {
      return NextResponse.json(
        { error: "Refusing to write while problems remain.", problems: m.problems },
        { status: 409 }
      );
    }

    // Chunked so one oversized request cannot fail the whole move.
    let written = 0;
    for (let i = 0; i < m.rows.length; i += 100) {
      const slice = m.rows.slice(i, i + 100);
      const { error } = await db.from("submissions").upsert(slice, { onConflict: "reference" });
      if (error) {
        return NextResponse.json(
          { error: `writing submissions at offset ${i}: ${error.message}`, written },
          { status: 500 }
        );
      }
      written += slice.length;
    }

    // Notes key on submission_id, so the ids are read back by reference.
    let noteRowsWritten = 0;
    if (m.notes.length) {
      const { data: ids } = await db
        .from("submissions")
        .select("id, reference")
        .in("reference", m.notes.map((n) => n.reference));
      const byRef = new Map((ids ?? []).map((r) => [String(r.reference), String(r.id)]));
      const noteRows = m.notes
        .filter((n) => byRef.has(n.reference))
        .map((n) => ({
          submission_id: byRef.get(n.reference),
          notes: n.notes,
          sponsorship_note: n.sponsorship_note,
        }));
      if (noteRows.length) {
        const { error } = await db
          .from("submission_notes")
          .upsert(noteRows, { onConflict: "submission_id" });
        if (error) {
          return NextResponse.json(
            { error: `writing notes: ${error.message}`, written },
            { status: 500 }
          );
        }
        noteRowsWritten = noteRows.length;
      }
    }

    // Count what is actually there rather than trusting the writes.
    const { count } = await db
      .from("submissions")
      .select("*", { count: "exact", head: true });

    return NextResponse.json({
      ok: true,
      written,
      noteRowsWritten,
      supabaseRowCount: count,
      note: "Firestore is untouched. Set DIRECTORY_STORE=supabase to switch the site over.",
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Migration failed." },
      { status: 500 }
    );
  }
}
