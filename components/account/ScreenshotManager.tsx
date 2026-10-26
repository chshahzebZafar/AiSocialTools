"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ImagePlus, Loader2, Trash2, Clock, Check, X, AlertCircle } from "lucide-react";
import type { ListingImage } from "@/lib/listing-images";

/**
 * Where an owner manages the screenshots on their listing.
 *
 * The limits shown here are copies of the ones the API enforces, not the
 * limits themselves. Everything that matters - who may upload, how many, what
 * a file actually is - is decided server-side, because a disabled button stops
 * nobody who can open devtools. These exist so a person finds out before
 * choosing a file rather than after uploading one.
 *
 * Pending and declined images are shown to the owner, never to visitors. They
 * paid for the slot, so "we are looking at it" and "we said no, and here is
 * why" are both things they should be able to see without emailing anyone.
 */

const MAX_MB = 2;
const ACCEPT = "image/png,image/jpeg,image/webp,image/gif";

export function ScreenshotManager({
  reference,
  accessToken,
  featured,
}: {
  reference: string;
  accessToken?: string;
  featured: boolean;
}) {
  const [images, setImages] = useState<ListingImage[]>([]);
  const [limit, setLimit] = useState(4);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [note, setNote] = useState("");
  const [caption, setCaption] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const auth = accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined;

  const load = useCallback(async () => {
    if (!accessToken) return;
    try {
      const res = await fetch(
        `/api/account/listing/images?reference=${encodeURIComponent(reference)}`,
        { headers: auth }
      );
      const data = await res.json();
      if (res.ok) {
        setImages(data.images ?? []);
        setLimit(data.limit ?? 4);
      }
    } catch {
      /* a gallery that will not load is not worth an error banner here */
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference, accessToken]);

  useEffect(() => {
    void load();
  }, [load]);

  // Declined images do not occupy a slot - otherwise a rejection would cost the
  // owner one of the four they paid for.
  const used = images.filter((i) => i.status !== "declined").length;
  const full = used >= limit;

  async function upload(file: File) {
    setError("");
    setNote("");

    if (file.size > MAX_MB * 1024 * 1024) {
      setError(`Images must be under ${MAX_MB} MB. That one is ${(file.size / 1024 / 1024).toFixed(1)} MB.`);
      return;
    }

    setBusy(true);
    try {
      const body = new FormData();
      body.append("reference", reference);
      body.append("file", file);
      if (caption.trim()) body.append("caption", caption.trim());

      const res = await fetch("/api/account/listing/images", {
        method: "POST",
        headers: auth,
        body,
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Could not upload that image.");
        return;
      }
      setCaption("");
      setNote(data.message || "Uploaded.");
      await load();
    } catch {
      setError("Could not upload that image. Check your connection and try again.");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function remove(imageId: string) {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/account/listing/images", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", ...(auth ?? {}) },
        body: JSON.stringify({ reference, imageId }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Could not remove that image.");
        return;
      }
      await load();
    } catch {
      setError("Could not remove that image.");
    } finally {
      setBusy(false);
    }
  }

  // Not a featured listing: say what it would get, and do not render controls
  // that would only fail.
  if (!featured) {
    return (
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-5">
        <h3 className="font-semibold text-zinc-950 dark:text-white mb-1.5">Screenshots</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Featured listings can show up to {limit} screenshots on their page. Someone
          choosing between two tools learns more from seeing the interface than from
          reading about it.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-5">
      <div className="flex items-baseline justify-between gap-3 mb-1.5">
        <h3 className="font-semibold text-zinc-950 dark:text-white">Screenshots</h3>
        <span className="text-xs text-zinc-500 tabular-nums">
          {used} of {limit}
        </span>
      </div>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
        PNG, JPEG, WebP or GIF, under {MAX_MB} MB. We convert everything to WebP and
        check each image before it appears on your page.
      </p>

      {error && (
        <p className="flex items-start gap-2 text-sm text-red-600 dark:text-red-400 mb-3">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          {error}
        </p>
      )}
      {note && !error && (
        <p className="flex items-start gap-2 text-sm text-emerald-700 dark:text-emerald-400 mb-3">
          <Check className="w-4 h-4 mt-0.5 shrink-0" />
          {note}
        </p>
      )}

      {loading ? (
        <p className="text-sm text-zinc-500">Loading…</p>
      ) : (
        <>
          {images.length > 0 && (
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              {images.map((img) => (
                <li key={img.id} className="group relative">
                  <div className="relative overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 aspect-[4/3]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.url}
                      alt={img.caption || "Screenshot"}
                      className="w-full h-full object-cover"
                    />
                    {img.status !== "approved" && (
                      <div className="absolute inset-0 bg-white/70 dark:bg-zinc-950/70 flex items-center justify-center">
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider rounded px-1.5 py-0.5 ${
                            img.status === "pending"
                              ? "text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30"
                              : "text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30"
                          }`}
                        >
                          {img.status === "pending" ? (
                            <><Clock className="w-3 h-3" /> In review</>
                          ) : (
                            <><X className="w-3 h-3" /> Not accepted</>
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                  {img.status === "declined" && img.declineNote && (
                    <p className="mt-1 text-[11px] text-zinc-500 leading-snug">{img.declineNote}</p>
                  )}
                  <button
                    type="button"
                    onClick={() => remove(img.id)}
                    disabled={busy}
                    aria-label="Remove screenshot"
                    className="absolute top-1.5 right-1.5 p-1.5 rounded-md bg-white/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-700 text-zinc-600 hover:text-red-600 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity disabled:opacity-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {full ? (
            <p className="text-sm text-zinc-500">
              That is all {limit}. Remove one to add another.
            </p>
          ) : (
            <div className="space-y-2.5">
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Caption (optional) — what this screen shows"
                maxLength={140}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 h-10 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              />
              <input
                ref={fileRef}
                type="file"
                accept={ACCEPT}
                className="sr-only"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void upload(f);
                }}
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={busy}
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 dark:border-zinc-700 px-4 h-10 text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors disabled:opacity-50"
              >
                {busy ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Uploading…</>
                ) : (
                  <><ImagePlus className="w-4 h-4" /> Add a screenshot</>
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
