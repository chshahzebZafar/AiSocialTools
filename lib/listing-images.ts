import { supabaseAdmin } from "@/lib/supabase";

/**
 * Reading and writing the screenshot gallery.
 *
 * Every public read goes through approvedImages(), which filters on
 * status = 'approved'. There is deliberately no function that returns images
 * regardless of state to a public caller - the one that does, ownerImages(), is
 * named for who it is for and takes an owner id.
 */

export const BUCKET = "listing-images";

/** How many screenshots a featured listing may hold. */
export const MAX_IMAGES_PER_LISTING = 4;

export interface ListingImage {
  id: string;
  submissionId: string;
  storagePath: string;
  url: string;
  width: number;
  height: number;
  bytes: number;
  caption: string | null;
  status: "pending" | "approved" | "declined";
  declineNote: string | null;
  position: number;
  uploadedAt: string;
}

interface Row {
  id: string;
  submission_id: string;
  storage_path: string;
  width: number;
  height: number;
  bytes: number;
  caption: string | null;
  status: string;
  decline_note: string | null;
  position: number;
  uploaded_at: string;
}

function publicUrl(path: string): string {
  const base = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").replace(/\/$/, "");
  return `${base}/storage/v1/object/public/${BUCKET}/${path}`;
}

function toImage(r: Row): ListingImage {
  return {
    id: r.id,
    submissionId: r.submission_id,
    storagePath: r.storage_path,
    url: publicUrl(r.storage_path),
    width: r.width,
    height: r.height,
    bytes: r.bytes,
    caption: r.caption,
    status: (r.status as ListingImage["status"]) ?? "pending",
    declineNote: r.decline_note,
    position: r.position,
    uploadedAt: r.uploaded_at,
  };
}

/**
 * The gallery a visitor sees. Approved only, in the owner's chosen order.
 *
 * Returns [] rather than throwing when the store is unavailable: a tool page
 * that cannot reach Supabase should render without a gallery, not 500. The
 * gallery is an enhancement to the page, never the page itself.
 */
export async function approvedImages(submissionId: string): Promise<ListingImage[]> {
  const db = supabaseAdmin();
  if (!db) return [];
  const { data, error } = await db
    .from("listing_images")
    .select("*")
    .eq("submission_id", submissionId)
    .eq("status", "approved")
    .order("position", { ascending: true });
  if (error || !data) return [];
  return (data as Row[]).map(toImage);
}

/** Approved galleries for several listings at once, keyed by submission id. */
export async function approvedImagesFor(
  submissionIds: string[]
): Promise<Record<string, ListingImage[]>> {
  const out: Record<string, ListingImage[]> = {};
  const db = supabaseAdmin();
  if (!db || submissionIds.length === 0) return out;
  const { data, error } = await db
    .from("listing_images")
    .select("*")
    .in("submission_id", submissionIds)
    .eq("status", "approved")
    .order("position", { ascending: true });
  if (error || !data) return out;
  for (const r of data as Row[]) {
    (out[r.submission_id] ??= []).push(toImage(r));
  }
  return out;
}

/** Everything the owner uploaded, including pending and declined. */
export async function ownerImages(submissionId: string): Promise<ListingImage[]> {
  const db = supabaseAdmin();
  if (!db) return [];
  const { data, error } = await db
    .from("listing_images")
    .select("*")
    .eq("submission_id", submissionId)
    .order("position", { ascending: true });
  if (error || !data) return [];
  return (data as Row[]).map(toImage);
}

/** The reviewer's queue: oldest pending first, across every listing. */
export async function pendingImages(limit = 100): Promise<ListingImage[]> {
  const db = supabaseAdmin();
  if (!db) return [];
  const { data, error } = await db
    .from("listing_images")
    .select("*")
    .eq("status", "pending")
    .order("uploaded_at", { ascending: true })
    .limit(limit);
  if (error || !data) return [];
  return (data as Row[]).map(toImage);
}

export async function insertImage(fields: {
  submissionId: string;
  storagePath: string;
  width: number;
  height: number;
  bytes: number;
  caption?: string | null;
  position: number;
}): Promise<ListingImage | null> {
  const db = supabaseAdmin();
  if (!db) return null;
  const { data, error } = await db
    .from("listing_images")
    .insert({
      submission_id: fields.submissionId,
      storage_path: fields.storagePath,
      width: fields.width,
      height: fields.height,
      bytes: fields.bytes,
      caption: fields.caption ?? null,
      position: fields.position,
    })
    .select("*")
    .single();
  if (error || !data) return null;
  return toImage(data as Row);
}

export async function setImageStatus(
  id: string,
  status: "approved" | "declined",
  declineNote?: string
): Promise<boolean> {
  const db = supabaseAdmin();
  if (!db) return false;
  const { error } = await db
    .from("listing_images")
    .update({
      status,
      decline_note: status === "declined" ? declineNote ?? null : null,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", id);
  return !error;
}

/**
 * Removes an image from both the table and the bucket.
 *
 * Storage first: a row with no file renders a broken image on a public page,
 * while a file with no row is invisible and costs a few KB. If the storage
 * delete fails we stop, leaving the row intact and the gallery consistent.
 */
export async function deleteImage(id: string, storagePath: string): Promise<boolean> {
  const db = supabaseAdmin();
  if (!db) return false;
  const { error: storageErr } = await db.storage.from(BUCKET).remove([storagePath]);
  if (storageErr) return false;
  const { error } = await db.from("listing_images").delete().eq("id", id);
  return !error;
}

export async function findImage(id: string): Promise<ListingImage | null> {
  const db = supabaseAdmin();
  if (!db) return null;
  const { data, error } = await db.from("listing_images").select("*").eq("id", id).single();
  if (error || !data) return null;
  return toImage(data as Row);
}
