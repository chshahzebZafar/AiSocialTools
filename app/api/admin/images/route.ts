import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin-auth";
import { pendingImages, setImageStatus, findImage, deleteImage } from "@/lib/listing-images";

/**
 * The screenshot review queue.
 *
 * The upload pipeline already proved each file is a real image and stripped
 * anything executable out of it. What it could not do is look at the picture,
 * which is the whole reason this exists: these render on public pages that are
 * indexed, and "is this a screenshot of the product" is not a question code can
 * answer.
 *
 * Declining keeps the row and the file so the owner can see what happened and
 * why. Deleting is separate and removes both.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// The same cookie session the rest of /admin uses. Deliberately not a separate
// bearer token: a second way in is a second thing to get wrong.
async function requireAdmin(): Promise<NextResponse | null> {
  const jar = await cookies();
  if (!verifySessionToken(jar.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }
  return null;
}

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const images = await pendingImages();
  return NextResponse.json({ ok: true, images });
}

export async function POST(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const imageId = String(body.imageId ?? "").trim();
  const action = String(body.action ?? "").trim();
  const note = String(body.note ?? "").trim().slice(0, 200);

  if (!imageId || !["approve", "decline", "delete"].includes(action)) {
    return NextResponse.json(
      { error: "imageId and a valid action are required." },
      { status: 400 }
    );
  }

  const image = await findImage(imageId);
  if (!image) {
    return NextResponse.json({ error: "Image not found." }, { status: 404 });
  }

  if (action === "delete") {
    const gone = await deleteImage(image.id, image.storagePath);
    if (!gone) {
      return NextResponse.json({ error: "Could not delete that image." }, { status: 500 });
    }
    return NextResponse.json({ ok: true, deleted: true });
  }

  const ok = await setImageStatus(
    image.id,
    action === "approve" ? "approved" : "declined",
    note || undefined
  );
  if (!ok) {
    return NextResponse.json({ error: "Could not update that image." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, status: action === "approve" ? "approved" : "declined" });
}
