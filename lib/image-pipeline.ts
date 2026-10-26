import sharp, { type Metadata } from "sharp";

/**
 * Turning an untrusted upload into something safe to serve.
 *
 * The rule throughout: never trust anything the client says about the file.
 * Not its Content-Type, not its filename, not its reported size. All three are
 * attacker-controlled and none of them is checked here.
 *
 * What actually happens:
 *
 *   1. Size is measured from the bytes we received, not from a header.
 *   2. The format is read from the file's own magic bytes. A .png extension on
 *      an HTML file is still an HTML file, and browsers have historically been
 *      willing to render one.
 *   3. Dimensions are capped before any decode work. A 50,000x50,000 PNG is a
 *      few hundred KB on disk and gigabytes decoded - a decompression bomb that
 *      takes the function down rather than the site.
 *   4. The image is re-encoded to WebP. This is the step that matters most: the
 *      output is a new file built from decoded pixels, so EXIF (which carries
 *      GPS coordinates from phone cameras), colour profiles, and any payload
 *      smuggled into a comment field or appended after the image data are all
 *      gone. Polyglot files - valid image and valid script at once - stop being
 *      polyglots the moment they are decoded and re-encoded.
 *
 * What this does NOT do is judge the picture. It can prove a file is a real,
 * safe image; it cannot tell whether it is a screenshot of a product or
 * something that should never appear on a public page. That is why uploads land
 * in a review queue.
 */

/** Hard ceiling on what we accept, checked against the bytes we actually got. */
export const MAX_UPLOAD_BYTES = 2 * 1024 * 1024; // 2 MB

/** Guards against decompression bombs, checked before any full decode. */
const MAX_INPUT_PIXELS = 40_000_000; // 40 MP
const MAX_INPUT_DIMENSION = 10_000;

/** What we store. Wide enough for a readable screenshot, small enough to serve. */
const OUTPUT_MAX_WIDTH = 1600;
const OUTPUT_MAX_HEIGHT = 1200;
const OUTPUT_QUALITY = 82;

/** A screenshot smaller than this is unreadable and almost always a mistake. */
const MIN_DIMENSION = 200;

export interface ProcessedImage {
  data: Buffer;
  width: number;
  height: number;
  bytes: number;
  contentType: "image/webp";
}

export type ImageRejection = { ok: false; reason: string };
export type ImageResult = { ok: true; image: ProcessedImage } | ImageRejection;

/**
 * The formats we accept, identified by their own leading bytes.
 *
 * Deliberately short. Every format here is one sharp decodes safely and that a
 * person plausibly has a screenshot in. SVG is absent on purpose: it is a
 * document format that can carry script and external references, and "an SVG
 * that is only ever shown in an <img>" is a rule that holds right up until
 * someone links the file directly.
 */
function sniffFormat(buf: Buffer): "png" | "jpeg" | "webp" | "gif" | null {
  if (buf.length < 12) return null;

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47 &&
    buf[4] === 0x0d && buf[5] === 0x0a && buf[6] === 0x1a && buf[7] === 0x0a
  ) return "png";

  // JPEG: FF D8 FF
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpeg";

  // WebP: "RIFF" .... "WEBP"
  if (
    buf.toString("ascii", 0, 4) === "RIFF" &&
    buf.toString("ascii", 8, 12) === "WEBP"
  ) return "webp";

  // GIF: "GIF87a" or "GIF89a"
  if (buf.toString("ascii", 0, 6) === "GIF87a" || buf.toString("ascii", 0, 6) === "GIF89a")
    return "gif";

  return null;
}

export async function processUpload(input: Buffer): Promise<ImageResult> {
  if (input.length === 0) {
    return { ok: false, reason: "That file was empty." };
  }
  if (input.length > MAX_UPLOAD_BYTES) {
    return {
      ok: false,
      reason: `Images must be under ${Math.floor(MAX_UPLOAD_BYTES / 1024 / 1024)} MB. That one is ${(input.length / 1024 / 1024).toFixed(1)} MB.`,
    };
  }

  // Magic bytes, not the Content-Type the browser sent.
  const format = sniffFormat(input);
  if (!format) {
    return { ok: false, reason: "That is not a PNG, JPEG, WebP or GIF image." };
  }

  let meta: Metadata;
  try {
    meta = await sharp(input, { limitInputPixels: MAX_INPUT_PIXELS }).metadata();
  } catch {
    // A file can pass the magic-byte check and still be corrupt or crafted.
    return { ok: false, reason: "That image could not be read. Try exporting it again." };
  }

  const w = meta.width ?? 0;
  const h = meta.height ?? 0;
  if (!w || !h) {
    return { ok: false, reason: "That image could not be read. Try exporting it again." };
  }
  if (w > MAX_INPUT_DIMENSION || h > MAX_INPUT_DIMENSION) {
    return { ok: false, reason: `Images must be under ${MAX_INPUT_DIMENSION}px on each side.` };
  }
  if (w < MIN_DIMENSION || h < MIN_DIMENSION) {
    return { ok: false, reason: `Images must be at least ${MIN_DIMENSION}px on each side.` };
  }

  try {
    // The re-encode. `rotate()` with no argument applies the EXIF orientation
    // before the data is discarded, so a phone screenshot does not come out
    // sideways once its metadata is gone.
    const out = await sharp(input, { limitInputPixels: MAX_INPUT_PIXELS })
      .rotate()
      .resize({
        width: OUTPUT_MAX_WIDTH,
        height: OUTPUT_MAX_HEIGHT,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: OUTPUT_QUALITY })
      .toBuffer({ resolveWithObject: true });

    return {
      ok: true,
      image: {
        data: out.data,
        width: out.info.width,
        height: out.info.height,
        bytes: out.data.length,
        contentType: "image/webp",
      },
    };
  } catch {
    return { ok: false, reason: "That image could not be processed. Try a different file." };
  }
}
