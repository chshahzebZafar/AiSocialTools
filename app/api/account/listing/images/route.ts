import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { userFromRequest, supabaseAdmin } from "@/lib/supabase";
import { getSubmissionByReference } from "@/lib/submission-store";
import { isSponsored } from "@/lib/ai-directory";
import { processUpload, MAX_UPLOAD_BYTES } from "@/lib/image-pipeline";
import {
  BUCKET,
  MAX_IMAGES_PER_LISTING,
  ownerImages,
  insertImage,
  deleteImage,
  findImage,
} from "@/lib/listing-images";

/**
 * Screenshot uploads for featured listings.
 *
 * Three gates, in this order, and all of them server-side:
 *
 *   1. You are signed in and you own this listing.
 *   2. The listing is a live featured placement. Screenshots are part of what
 *      the placement buys, so this is a billing check, not a UI preference -
 *      hiding the button would not stop anyone posting to this route.
 *   3. You are under the limit, counted from the database rather than from
 *      anything the client sent.
 *
 * Only then does the file get looked at, and it is never trusted: see
 * lib/image-pipeline.ts for what "looked at" means. The bytes that reach
 * storage are a WebP this server produced, not the file that was uploaded.
 *
 * Everything lands as pending. The pipeline can prove a file is a safe image;
 * it cannot tell whether the picture belongs on a public page.
 */
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const MAX_CAPTION = 140;

async function ownedListing(req: Request, reference: string) {
  const who = await userFromRequest(req.headers.get("authorization"));
  if (!who) return { error: "Please sign in first.", status: 401 as const };

  const row = await getSubmissionByReference(reference);
  if (!row) return { error: "Listing not found.", status: 404 as const };

  const owner = (row as { ownerId?: string }).ownerId;
  if (owner && owner !== who.id) {
    return { error: "That is not your listing.", status: 403 as const };
  }
  return { row };
}

/**
 * The owner's own gallery, including images still in review and ones that were
 * turned down. They paid for the slot, so "we are looking at it" and "we said
 * no, here is why" are both things they are entitled to see.
 */
export async function GET(req: Request) {
  const reference = new URL(req.url).searchParams.get("reference")?.trim() ?? "";
  if (!reference) {
    return NextResponse.json({ error: "reference is required." }, { status: 400 });
  }

  const owned = await ownedListing(req, reference);
  if ("error" in owned) {
    return NextResponse.json({ error: owned.error }, { status: owned.status });
  }

  const images = await ownerImages(owned.row.id);
  return NextResponse.json({
    ok: true,
    images,
    limit: MAX_IMAGES_PER_LISTING,
    eligible: isSponsored(owned.row),
  });
}

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid upload." }, { status: 400 });
  }

  const reference = String(form.get("reference") ?? "").trim();
  if (!reference) {
    return NextResponse.json({ error: "reference is required." }, { status: 400 });
  }

  const owned = await ownedListing(req, reference);
  if ("error" in owned) {
    return NextResponse.json({ error: owned.error }, { status: owned.status });
  }
  const row = owned.row;

  // Gate 2: featured placements only.
  if (!isSponsored(row)) {
    return NextResponse.json(
      {
        error: "Screenshots are part of a featured placement.",
        upgrade: true,
      },
      { status: 402 }
    );
  }

  if (row.status === "declined") {
    return NextResponse.json(
      { error: "This listing was not accepted, so it cannot take screenshots." },
      { status: 409 }
    );
  }

  // Gate 3: counted from the database, not from the client.
  const existing = await ownerImages(row.id);
  const live = existing.filter((i) => i.status !== "declined");
  if (live.length >= MAX_IMAGES_PER_LISTING) {
    return NextResponse.json(
      {
        error: `A listing can hold ${MAX_IMAGES_PER_LISTING} screenshots. Remove one to add another.`,
      },
      { status: 409 }
    );
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No image was attached." }, { status: 400 });
  }
  // Cheap rejection before reading the whole body into memory.
  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json(
      { error: `Images must be under ${Math.floor(MAX_UPLOAD_BYTES / 1024 / 1024)} MB.` },
      { status: 413 }
    );
  }

  const caption = String(form.get("caption") ?? "").trim().slice(0, MAX_CAPTION);

  const input = Buffer.from(await file.arrayBuffer());
  const processed = await processUpload(input);
  if (!processed.ok) {
    return NextResponse.json({ error: processed.reason }, { status: 400 });
  }

  const db = supabaseAdmin();
  if (!db) {
    return NextResponse.json({ error: "Uploads are unavailable right now." }, { status: 503 });
  }

  // The uuid makes the path unguessable, so a pending image cannot be found by
  // walking the bucket even though the bucket is public-read.
  const path = `${row.id}/${randomUUID()}.webp`;

  const { error: upErr } = await db.storage.from(BUCKET).upload(path, processed.image.data, {
    contentType: processed.image.contentType,
    cacheControl: "31536000",
    upsert: false,
  });
  if (upErr) {
    return NextResponse.json({ error: "Could not store that image." }, { status: 500 });
  }

  const record = await insertImage({
    submissionId: row.id,
    storagePath: path,
    width: processed.image.width,
    height: processed.image.height,
    bytes: processed.image.bytes,
    caption: caption || null,
    position: live.length,
  });

  if (!record) {
    // Don't leave an orphan file behind paying for storage forever.
    await db.storage.from(BUCKET).remove([path]);
    return NextResponse.json({ error: "Could not save that image." }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    image: record,
    message: "Uploaded. We review screenshots before they appear on your page.",
  });
}

export async function DELETE(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const reference = String(body.reference ?? "").trim();
  const imageId = String(body.imageId ?? "").trim();
  if (!reference || !imageId) {
    return NextResponse.json({ error: "reference and imageId are required." }, { status: 400 });
  }

  const owned = await ownedListing(req, reference);
  if ("error" in owned) {
    return NextResponse.json({ error: owned.error }, { status: owned.status });
  }

  const image = await findImage(imageId);
  // Checked against the listing we just proved ownership of, so an id from
  // somebody else's gallery cannot be deleted by passing your own reference.
  if (!image || image.submissionId !== owned.row.id) {
    return NextResponse.json({ error: "Image not found." }, { status: 404 });
  }

  const gone = await deleteImage(image.id, image.storagePath);
  if (!gone) {
    return NextResponse.json({ error: "Could not remove that image." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
