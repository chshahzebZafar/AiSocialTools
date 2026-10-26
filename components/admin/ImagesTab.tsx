"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, X, Trash2, Loader2 } from "lucide-react";
import type { ListingImage } from "@/lib/listing-images";

/**
 * The screenshot review queue.
 *
 * The upload pipeline has already proved every file here is a real image with
 * nothing executable left in it. The only question left is the one no code can
 * answer: does this picture belong on a public page. So the job here is to look
 * at the image, large enough to actually see it, and say yes or no.
 *
 * Decline keeps the file and shows the owner the reason. Delete removes it for
 * good, and is the right choice only for something that should not sit in
 * storage at all.
 */
export function ImagesTab() {
  const [images, setImages] = useState<ListingImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/images", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not load the queue.");
        return;
      }
      setImages(data.images ?? []);
      setError("");
    } catch {
      setError("Could not load the queue.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function act(imageId: string, action: "approve" | "decline" | "delete") {
    let note = "";
    if (action === "decline") {
      // The owner sees this, so it should say something they can act on.
      note = window.prompt("Why? (shown to the listing owner)") ?? "";
      if (note === null) return;
    }
    if (action === "delete" && !window.confirm("Delete this image permanently?")) return;

    setBusy(imageId);
    try {
      const res = await fetch("/api/admin/images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageId, action, note }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "That did not work.");
        return;
      }
      setImages((prev) => prev.filter((i) => i.id !== imageId));
    } catch {
      setError("That did not work.");
    } finally {
      setBusy(null);
    }
  }

  if (loading) return <p className="text-sm text-zinc-500">Loading…</p>;

  return (
    <div>
      {error && (
        <div className="mb-5 p-3 rounded-md border border-red-200 bg-red-50 text-sm text-red-700">
          {error}
        </div>
      )}

      {images.length === 0 ? (
        <div className="rounded-xl border border-zinc-200 p-8 text-center">
          <p className="text-sm text-zinc-500">Nothing waiting. Screenshots appear here when a featured listing uploads one.</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-zinc-500 mb-4">
            {images.length} waiting. Each has already been re-encoded and stripped of metadata —
            what is left is whether it belongs on a public page.
          </p>
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {images.map((img) => (
              <li key={img.id} className="rounded-xl border border-zinc-200 overflow-hidden">
                {/* Shown large: a thumbnail is not enough to judge by. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt={img.caption || "Pending screenshot"}
                  className="w-full h-auto bg-zinc-50 block"
                />
                <div className="p-4">
                  {img.caption && (
                    <p className="text-sm text-zinc-700 mb-1">{img.caption}</p>
                  )}
                  <p className="text-xs text-zinc-400 mb-3 tabular-nums">
                    {img.width}×{img.height} · {(img.bytes / 1024).toFixed(0)} KB ·{" "}
                    {new Date(img.uploadedAt).toLocaleDateString()}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => void act(img.id, "approve")}
                      disabled={busy === img.id}
                      className="h-8 px-3 text-sm font-medium rounded-md bg-zinc-950 text-white hover:bg-zinc-800 disabled:opacity-50 inline-flex items-center gap-1.5"
                    >
                      {busy === img.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                      Approve
                    </button>
                    <button
                      onClick={() => void act(img.id, "decline")}
                      disabled={busy === img.id}
                      className="h-8 px-3 text-sm font-medium rounded-md border border-zinc-300 text-zinc-700 hover:border-zinc-400 disabled:opacity-50 inline-flex items-center gap-1.5"
                    >
                      <X className="w-3.5 h-3.5" />
                      Decline
                    </button>
                    <button
                      onClick={() => void act(img.id, "delete")}
                      disabled={busy === img.id}
                      aria-label="Delete permanently"
                      className="h-8 px-2 text-sm rounded-md border border-zinc-300 text-zinc-500 hover:text-red-600 hover:border-red-300 disabled:opacity-50 ml-auto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
