import "server-only";
import { supabaseAdmin } from "@/lib/supabase";
import { getDb, SUBMISSIONS } from "@/lib/firebase-admin";

/**
 * Submission storage: Supabase when configured, Firestore otherwise.
 *
 * Same switch as the read path in directory-store.ts, for the same reason -
 * the cutover is a config change and the rollback is removing one variable.
 *
 * The two stores name fields differently (camelCase documents vs snake_case
 * columns), so the mapping lives here rather than being repeated at every call
 * site. Private reviewer notes live in their own Supabase table, because RLS
 * is row-level and a notes column would be readable by the submitter the
 * moment the browser queried their own row.
 */

/** One submission as the app works with it, whichever store holds it. */
export interface StoredRow {
  id: string;
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
  status: string;
  slug?: string;
  source: string;
  sponsored?: boolean;
  sponsoredUntil?: string;
  sponsoredLifetime?: boolean;
  notifiedStatus?: string;
  notifiedAt?: string;
  reviewedAt?: string;
  /** The provider payment that bought the placement, for reversing it. */
  sponsoredPaymentRef?: string;
  /** Private. Returned to the admin only, never to a submitter. */
  notes?: string;
  sponsorshipNote?: string;
}

/** True once submissions live in Supabase rather than Firestore. */
export function submissionsOnSupabase(): boolean {
  return supabaseAdmin() !== null;
}

const str = (v: unknown) => (v == null ? "" : String(v));

function rowFromSupabase(
  r: Record<string, unknown>,
  note?: Record<string, unknown>
): StoredRow {
  return {
    id: str(r.id),
    reference: str(r.reference),
    submittedAt: str(r.submitted_at),
    name: str(r.name),
    url: str(r.url),
    tagline: str(r.tagline),
    description: str(r.description),
    category: str(r.category),
    pricing: str(r.pricing),
    pricingDetails: str(r.pricing_details),
    features: str(r.features),
    twitter: str(r.twitter),
    founder: str(r.founder),
    submitterName: str(r.submitter_name),
    submitterEmail: str(r.submitter_email),
    submitterRole: str(r.submitter_role),
    status: str(r.status) || "new",
    slug: r.slug ? str(r.slug) : undefined,
    source: str(r.source) || "form",
    sponsored: r.sponsored === true,
    sponsoredUntil: r.sponsored_until ? str(r.sponsored_until) : undefined,
    sponsoredLifetime: r.sponsored_lifetime === true,
    notifiedStatus: r.notified_status ? str(r.notified_status) : undefined,
    notifiedAt: r.notified_at ? str(r.notified_at) : undefined,
    reviewedAt: r.reviewed_at ? str(r.reviewed_at) : undefined,
    sponsoredPaymentRef: r.sponsored_payment_ref ? str(r.sponsored_payment_ref) : undefined,
    notes: note ? str(note.notes) : undefined,
    sponsorshipNote: note ? str(note.sponsorship_note) : undefined,
  };
}

/** Newest-first list for /admin, including the private notes. */
export async function listSubmissions(limit = 200): Promise<StoredRow[]> {
  const db = supabaseAdmin();
  if (!db) {
    const fs = getDb();
    if (!fs) return [];
    const snap = await fs
      .collection(SUBMISSIONS)
      .orderBy("submittedAt", "desc")
      .limit(limit)
      .get();
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as object) })) as StoredRow[];
  }

  const { data, error } = await db
    .from("submissions")
    .select("*")
    .order("submitted_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);

  const ids = (data ?? []).map((r) => String(r.id));
  const notesById = new Map<string, Record<string, unknown>>();
  if (ids.length) {
    const { data: notes } = await db
      .from("submission_notes")
      .select("*")
      .in("submission_id", ids);
    for (const n of notes ?? []) notesById.set(String(n.submission_id), n);
  }
  return (data ?? []).map((r) => rowFromSupabase(r, notesById.get(String(r.id))));
}

/** One submission by id. */
export async function getSubmission(id: string): Promise<StoredRow | null> {
  const db = supabaseAdmin();
  if (!db) {
    const fs = getDb();
    if (!fs) return null;
    const snap = await fs.collection(SUBMISSIONS).doc(id).get();
    const d = snap.data();
    return d ? ({ id: snap.id, ...(d as object) } as StoredRow) : null;
  }
  const { data } = await db.from("submissions").select("*").eq("id", id).maybeSingle();
  if (!data) return null;
  const { data: note } = await db
    .from("submission_notes")
    .select("*")
    .eq("submission_id", id)
    .maybeSingle();
  return rowFromSupabase(data, note ?? undefined);
}

/**
 * Look a submission up by its public reference (SC-20260920-AB12).
 *
 * Needed by the payment webhook, which knows the reference it put in checkout
 * metadata but not the storage id - those differ between the two backends
 * (Firestore uses the reference as the document id, Supabase has a uuid).
 */
export async function getSubmissionByReference(reference: string): Promise<StoredRow | null> {
  const db = supabaseAdmin();
  if (!db) {
    const fs = getDb();
    if (!fs) return null;
    // Firestore keyed new submissions by reference, so try that first, then
    // fall back to a field query for anything backfilled under another id.
    const direct = await fs.collection(SUBMISSIONS).doc(reference).get();
    if (direct.exists) return { id: direct.id, ...(direct.data() as object) } as StoredRow;
    const q = await fs.collection(SUBMISSIONS).where("reference", "==", reference).limit(1).get();
    const doc = q.docs[0];
    return doc ? ({ id: doc.id, ...(doc.data() as object) } as StoredRow) : null;
  }

  const { data } = await db
    .from("submissions")
    .select("*")
    .eq("reference", reference)
    .maybeSingle();
  return data ? rowFromSupabase(data) : null;
}

/**
 * Find a listing by the payment that bought its placement.
 *
 * A refund webhook names the payment it reverses, not necessarily the
 * checkout metadata that named the listing, so this is how a refund finds
 * what to undo.
 */
export async function getSubmissionByPaymentRef(ref: string): Promise<StoredRow | null> {
  const db = supabaseAdmin();
  if (!db) return null;
  const { data } = await db
    .from("submissions")
    .select("*")
    .eq("sponsored_payment_ref", ref)
    .maybeSingle();
  return data ? rowFromSupabase(data) : null;
}

/** Fields the admin may change. Notes are routed to their own table. */
export interface SubmissionPatch {
  status?: string;
  slug?: string;
  sponsored?: boolean;
  sponsoredUntil?: string;
  sponsoredLifetime?: boolean;
  notifiedStatus?: string;
  notifiedAt?: string;
  reviewedAt?: string;
  sponsoredPaymentRef?: string | null;
  notes?: string;
  sponsorshipNote?: string;
}

export async function updateSubmission(id: string, patch: SubmissionPatch): Promise<void> {
  const db = supabaseAdmin();
  if (!db) {
    const fs = getDb();
    if (!fs) throw new Error("Storage is not configured.");
    await fs.collection(SUBMISSIONS).doc(id).update(patch as Record<string, unknown>);
    return;
  }

  const row: Record<string, unknown> = {};
  if (patch.status !== undefined) row.status = patch.status;
  if (patch.slug !== undefined) row.slug = patch.slug;
  if (patch.sponsored !== undefined) row.sponsored = patch.sponsored;
  // An empty string clears the placement; a date column rejects "" outright.
  if (patch.sponsoredUntil !== undefined) {
    row.sponsored_until = patch.sponsoredUntil === "" ? null : patch.sponsoredUntil;
  }
  if (patch.sponsoredLifetime !== undefined) row.sponsored_lifetime = patch.sponsoredLifetime;
  if (patch.notifiedStatus !== undefined) row.notified_status = patch.notifiedStatus;
  if (patch.notifiedAt !== undefined) row.notified_at = patch.notifiedAt;
  if (patch.reviewedAt !== undefined) row.reviewed_at = patch.reviewedAt;
  if (patch.sponsoredPaymentRef !== undefined) {
    row.sponsored_payment_ref = patch.sponsoredPaymentRef;
  }

  if (Object.keys(row).length) {
    const { error } = await db.from("submissions").update(row).eq("id", id);
    if (error) throw new Error(error.message);
  }

  if (patch.notes !== undefined || patch.sponsorshipNote !== undefined) {
    const note: Record<string, unknown> = {
      submission_id: id,
      updated_at: new Date().toISOString(),
    };
    if (patch.notes !== undefined) note.notes = patch.notes;
    if (patch.sponsorshipNote !== undefined) note.sponsorship_note = patch.sponsorshipNote;
    const { error } = await db
      .from("submission_notes")
      .upsert(note, { onConflict: "submission_id" });
    if (error) throw new Error(error.message);
  }
}

/**
 * Store a new submission from the public form.
 *
 * ownerId is the signed-in account, when there is one. It is taken from a
 * verified token on the server, never from the request body - a uid in the
 * body would let anyone claim someone else's submission.
 */
export async function createSubmission(
  reference: string,
  fields: Record<string, unknown>,
  ownerId?: string
): Promise<void> {
  const db = supabaseAdmin();
  if (!db) {
    const fs = getDb();
    if (!fs) throw new Error("Storage is not configured.");
    await fs
      .collection(SUBMISSIONS)
      .doc(reference)
      .set({
        ...fields,
        status: "new",
        notes: "",
        source: "form",
        ...(ownerId ? { submitterUid: ownerId } : {}),
      });
    return;
  }

  const f = (k: string) => str(fields[k]);
  const { error } = await db.from("submissions").insert({
    reference,
    owner_id: ownerId ?? null,
    name: f("name"),
    url: f("url"),
    tagline: f("tagline"),
    description: f("description"),
    category: f("category"),
    pricing: f("pricing"),
    pricing_details: f("pricingDetails"),
    features: f("features"),
    twitter: f("twitter"),
    founder: f("founder"),
    submitter_name: f("submitterName"),
    submitter_email: f("submitterEmail"),
    submitter_role: f("submitterRole"),
    status: "new",
    source: "form",
    submitted_at: f("submittedAt") || new Date().toISOString(),
  });
  if (error) throw new Error(error.message);
}
