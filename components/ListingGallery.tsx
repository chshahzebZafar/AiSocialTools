import Image from "next/image";
import type { ListingImage } from "@/lib/listing-images";

/**
 * The screenshots a featured listing has had approved.
 *
 * Server-rendered as plain <Image> elements rather than a lightbox or carousel.
 * A visitor deciding between two tools wants to see the interface, and every
 * interaction between them and that is a cost. It also means the screenshots
 * are in the HTML a crawler reads.
 *
 * Rendered through next/image on purpose: Vercel's CDN then caches each one at
 * the edge, so Supabase serves a given file once per cache period instead of
 * once per page view. That is the difference between egress being a real
 * constraint and being irrelevant.
 *
 * Renders nothing when there are no approved images, so a listing without
 * screenshots has no empty shelf on it.
 */
export function ListingGallery({
  images,
  toolName,
}: {
  images: ListingImage[];
  toolName: string;
}) {
  if (images.length === 0) return null;

  return (
    <section className="mb-10">
      <div className="flex items-baseline justify-between gap-4 mb-4">
        <h2 className="text-xl font-semibold text-zinc-950 dark:text-white tracking-tight">
          Screenshots
        </h2>
        {/* Said plainly. These come from the vendor, not from us, and a reader
            comparing tools should know which images were chosen by whom. */}
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          Provided by {toolName}
        </span>
      </div>

      <div
        className={
          images.length === 1
            ? "grid grid-cols-1 gap-4"
            : "grid grid-cols-1 sm:grid-cols-2 gap-4"
        }
      >
        {images.map((img, i) => (
          <figure key={img.id} className="group">
            <div className="relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
              <Image
                src={img.url}
                alt={
                  img.caption
                    ? `${toolName}: ${img.caption}`
                    : `Screenshot of ${toolName}`
                }
                width={img.width}
                height={img.height}
                className="w-full h-auto"
                sizes="(max-width: 640px) 100vw, 50vw"
                // The first screenshot is usually above the fold on a phone;
                // the rest can wait until they are scrolled to.
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
            {img.caption && (
              <figcaption className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {img.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}
