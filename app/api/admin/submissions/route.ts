import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin-auth";
import { getDb, SUBMISSIONS, type SubmissionStatus } from "@/lib/firebase-admin";

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

/** PATCH /api/admin/submissions — update status and/or notes on one submission. */
export async function PATCH(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const db = getDb();
  if (!db) {
    return NextResponse.json({ error: "Storage is not configured." }, { status: 503 });
  }

  let body: { id?: string; status?: string; notes?: string };
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

  try {
    await db.collection(SUBMISSIONS).doc(body.id).update(update);
    return NextResponse.json({ ok: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[admin] failed to update submission:", err);
    return NextResponse.json({ error: "Could not update submission." }, { status: 500 });
  }
}
