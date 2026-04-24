import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

// Proxies image upscaling through Replicate's real-esrgan model.
// Requires REPLICATE_API_TOKEN set in server env (NOT NEXT_PUBLIC_*).
// See https://replicate.com/account/api-tokens

export const runtime = "nodejs";
export const maxDuration = 60;

// nightmareai/real-esrgan — fast, high-quality 4x upscaler with optional face enhancement.
const MODEL_VERSION =
  "nightmareai/real-esrgan:f121d640bd286e1fdc67f9799164c1d5be36ff74576ee11c803ae5b665dd46aa";

export async function POST(req: NextRequest) {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Image upscaling is not configured on this server. Set REPLICATE_API_TOKEN to enable it — see https://replicate.com/account/api-tokens.",
      },
      { status: 503 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("image");
    const scaleRaw = formData.get("scale");
    const faceEnhancement = formData.get("face_enhancement") === "true";

    if (!(file instanceof Blob)) {
      return NextResponse.json(
        { success: false, error: "Missing image file." },
        { status: 400 }
      );
    }

    const maxBytes = 10 * 1024 * 1024;
    if (file.size > maxBytes) {
      return NextResponse.json(
        { success: false, error: "Image is over 10 MB. Please compress it first." },
        { status: 413 }
      );
    }

    const scale = Math.max(2, Math.min(8, Number(scaleRaw) || 4));

    // Convert uploaded file to data URL (Replicate accepts http(s) URLs and data URLs).
    const buffer = Buffer.from(await file.arrayBuffer());
    const mime = file.type || "image/png";
    const dataUrl = `data:${mime};base64,${buffer.toString("base64")}`;

    const replicate = new Replicate({ auth: token });

    const output = (await replicate.run(MODEL_VERSION, {
      input: {
        image: dataUrl,
        scale,
        face_enhance: faceEnhancement,
      },
    })) as unknown;

    const outputUrl =
      typeof output === "string"
        ? output
        : Array.isArray(output) && typeof output[0] === "string"
        ? (output[0] as string)
        : null;

    if (!outputUrl) {
      return NextResponse.json(
        { success: false, error: "Upscaling returned no output. Please try again." },
        { status: 502 }
      );
    }

    // Fetch the upscaled image and stream it back as the response body
    const imageResp = await fetch(outputUrl);
    if (!imageResp.ok) {
      return NextResponse.json(
        { success: false, error: "Failed to fetch upscaled image from Replicate." },
        { status: 502 }
      );
    }

    const arrayBuf = await imageResp.arrayBuffer();
    return new NextResponse(arrayBuf, {
      status: 200,
      headers: {
        "Content-Type": imageResp.headers.get("Content-Type") || "image/png",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Upscale image error:", error);
    const message =
      error instanceof Error ? error.message : "Unexpected error during upscaling.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
