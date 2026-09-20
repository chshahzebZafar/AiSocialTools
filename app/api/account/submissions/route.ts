import { NextResponse } from "next/server";
import { getDb, SUBMISSIONS, verifyIdToken } from "@/lib/firebase-admin";

/**
 * GET /api/account/submissions — the signed-in user's own submissions.
 *
 * Distinct from the admin route, which returns everything including private
 * reviewer notes. This one returns only what a submitter is entitled to see
 * about their own entry, and never another person's.
 */
export const dynamic = "force-dynamic";

/** Fields safe to hand back to the submitter. Notes and spam flags stay out. */
function present(id: string, d: Record<string, unknown>) {
  const status = String(d.status ?? "new");
  return {
    id,
    reference: String(d.reference ?? ""),
    submittedAt: String(d.submittedAt ?? ""),
    name: String(d.name ?? ""),
    url: String(d.url ?? ""),
    tagline: String(d.tagline ?? ""),
    category: String(d.category ?? ""),
    pricing: String(d.pricing ?? ""),
    slug: d.slug ? String(d.slug) : "",
    // "spam" is an internal judgement. Telling someone we filed them as spam
    // invites an argument and teaches spammers what tripped the filter, so it
    // reads as declined - which is also true.
    status: status === "spam" ? "declined" : status,
    sponsored: d.sponsored === true,
    sponsoredUntil: d.sponsoredUntil ? String(d.sponsoredUntil) : "",
  };
}

export async function GET(req: Request) {
  const who = await verifyIdToken(req.headers.get("authorization"));
  if (!who) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const db = getDb();
  if (!db) {
    return NextResponse.json({ error: "Storage is not configured." }, { status: 503 });
  }

  try {
    const byUid = await db
      .collection(SUBMISSIONS)
      .where("submitterUid", "==", who.uid)
      .limit(100)
      .get();

    const rows = new Map<string, ReturnType<typeof present>>();
    for (const doc of byUid.docs) rows.set(doc.id, present(doc.id, doc.data()));

    // Submissions sent before this account existed carry an email but no uid.
    // Claim them only when Firebase says the address is verified: an
    // unverified address is a string someone typed, and matching on it would
    // hand over another person's submission to whoever guessed their email.
    if (who.email && who.emailVerified) {
      const byEmail = await db
        .collection(SUBMISSIONS)
        .where("submitterEmail", "==", who.email)
        .limit(100)
        .get();
      for (const doc of byEmail.docs) {
        if (!rows.has(doc.id)) rows.set(doc.id, present(doc.id, doc.data()));
      }
    }

    // Newest first. Sorted here rather than in the query so neither `where`
    // needs a composite index building first.
    const submissions = [...rows.values()].sort((a, b) =>
      b.submittedAt.localeCompare(a.submittedAt)
    );

    return NextResponse.json({
      submissions,
      emailVerified: who.emailVerified,
      email: who.email,
    });
  } catch {
    return NextResponse.json({ error: "Could not read your submissions." }, { status: 500 });
  }
}
