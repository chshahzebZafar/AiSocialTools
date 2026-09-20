import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin-auth";
import { getDb, SUBMISSIONS, type SubmissionStatus } from "@/lib/firebase-admin";
import { slugify } from "@/lib/directory-live";
import { aiDirectoryTools } from "@/lib/ai-directory";

export const runtime = "nodejs";
// Always read live data; an admin inbox must never be served from a cache.
export const dynamic = "force-dynamic";

const STATUSES: SubmissionStatus[] = ["new", "approved", "declined", "spam"];
const MAX_LIMIT = 500;

async function requireAdmin(): Promise<NextResponse | null> {
  const jar = await cookies();
  if (!verifySessionToken(jar.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }
  return null;
}

/**
 * GET /api/admin/submissions?limit=200
 *
 * Returns the most recent submissions, newest first.
 *
 * Status and text filtering happen in the browser rather than here. Firestore
 * cannot do substring search at all, and combining a status filter with an
 * ordering would require a composite index — extra setup for no benefit at a
 * few hundred rows.
 */
export async function GET(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const db = getDb();
  if (!db) {
    return NextResponse.json(
      { error: "Storage is not configured. Set FIREBASE_SERVICE_ACCOUNT_JSON." },
      { status: 503 }
    );
  }

  const url = new URL(req.url);
  const limit = Math.min(
    Math.max(Number(url.searchParams.get("limit")) || 200, 1),
    MAX_LIMIT
  );

  try {
    const snap = await db
      .collection(SUBMISSIONS)
      .orderBy("submittedAt", "desc")
      .limit(limit)
      .get();
    const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    return NextResponse.json({ ok: true, count: items.length, items });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[admin] failed to read submissions:", err);
    return NextResponse.json({ error: "Could not read submissions." }, { status: 500 });
  }
}

/** PATCH /api/admin/submissions — update status, notes or paid placement. */
export async function PATCH(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const db = getDb();
  if (!db) {
    return NextResponse.json({ error: "Storage is not configured." }, { status: 503 });
  }

  let body: {
    id?: string;
    status?: string;
    notes?: string;
    sponsored?: boolean;
    sponsoredUntil?: string;
    sponsorshipNote?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!body.id || typeof body.id !== "string") {
    return NextResponse.json({ error: "id is required." }, { status: 400 });
  }

  const update: Record<string, unknown> = { reviewedAt: new Date().toISOString() };
  if (body.status !== undefined) {
    if (!STATUSES.includes(body.status as SubmissionStatus)) {
      return NextResponse.json(
        { error: `status must be one of: ${STATUSES.join(", ")}` },
        { status: 400 }
      );
    }
    update.status = body.status;
  }
  if (body.notes !== undefined) {
    if (typeof body.notes !== "string" || body.notes.length > 5000) {
      return NextResponse.json({ error: "notes must be a string under 5000 chars." }, { status: 400 });
    }
    update.notes = body.notes;
  }

  // Paid placement, sold manually. Validated here rather than trusted from the
  // form: a bad date would otherwise store a placement that either never shows
  // or never expires, and neither failure is visible until someone complains.
  if (body.sponsored !== undefined) {
    if (typeof body.sponsored !== "boolean") {
      return NextResponse.json({ error: "sponsored must be true or false." }, { status: 400 });
    }
    update.sponsored = body.sponsored;
  }
  if (body.sponsoredUntil !== undefined) {
    const raw = body.sponsoredUntil;
    if (raw === "") {
      update.sponsoredUntil = "";
    } else if (typeof raw !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
      return NextResponse.json(
        { error: "sponsoredUntil must be a YYYY-MM-DD date." },
        { status: 400 }
      );
    } else if (!Number.isFinite(Date.parse(`${raw}T00:00:00Z`))) {
      return NextResponse.json({ error: "sponsoredUntil is not a real date." }, { status: 400 });
    } else {
      update.sponsoredUntil = raw;
    }
  }
  if (body.sponsorshipNote !== undefined) {
    if (typeof body.sponsorshipNote !== "string" || body.sponsorshipNote.length > 2000) {
      return NextResponse.json(
        { error: "sponsorshipNote must be a string under 2000 chars." },
        { status: 400 }
      );
    }
    update.sponsorshipNote = body.sponsorshipNote;
  }

  // Turning a placement on without an end date would run forever. Reject it
  // rather than inventing a date on the admin's behalf.
  if (update.sponsored === true) {
    const until =
      typeof update.sponsoredUntil === "string" ? update.sponsoredUntil : undefined;
    if (until === undefined || until === "") {
      return NextResponse.json(
        { error: "A sponsored listing needs an end date." },
        { status: 400 }
      );
    }
  }

  try {
    // Approving publishes the tool, so it needs a stable slug. Assigned once,
    // on first approval, and kept afterwards so a published URL never moves.
    // Curated entries own their slugs, so a clash gets a suffix rather than
    // shadowing the code file.
    if (update.status === "approved") {
      const snap = await db.collection(SUBMISSIONS).doc(body.id).get();
      const data = snap.data();
      if (data && !data.slug) {
        const base = slugify(String(data.name ?? "")) || body.id.toLowerCase();
        const taken = new Set(aiDirectoryTools.map((t) => t.slug));
        let slug = base;
        let n = 2;
        while (taken.has(slug)) slug = `${base}-${n++}`;
        update.slug = slug;
      }
    }

    await db.collection(SUBMISSIONS).doc(body.id).update(update);
    return NextResponse.json({ ok: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[admin] failed to update submission:", err);
    return NextResponse.json({ error: "Could not update submission." }, { status: 500 });
  }
}
