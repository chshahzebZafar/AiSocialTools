"use client";

import { useState } from "react";

/**
 * A tool's own favicon, falling back to its initial.
 *
 * The letter avatars were fine but gave every card the same texture, so a
 * grid of 230 tools read as one undifferentiated wall. A real favicon is the
 * mark people already recognise.
 *
 * Icons come from DuckDuckGo rather than Google's favicon service for two
 * reasons: it does not hand a visitor's IP to Google on every card, and it
 * returns a 404 for a domain with no icon instead of a generic grey globe.
 * The 404 is the useful part - it fires onError, so we fall back to the
 * initial rather than rendering a wall of identical globes.
 *
 * A tool's own logoUrl, when set, always wins.
 */

function domainOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "";
  }
}

export function ToolIcon({
  name,
  url,
  logoUrl,
  size = 44,
  className = "",
  rounded = "rounded-xl",
}: {
  name: string;
  url: string;
  logoUrl?: string;
  size?: number;
  className?: string;
  rounded?: string;
}) {
  const domain = domainOf(url);
  const src = logoUrl || (domain ? `https://icons.duckduckgo.com/ip3/${domain}.ico` : "");
  const [failed, setFailed] = useState(!src);

  const initial = name.charAt(0).toUpperCase();

  if (failed) {
    return (
      <div
        aria-hidden
        style={{ width: size, height: size }}
        className={`${rounded} bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-sm flex-shrink-0 ${className}`}
      >
        <span style={{ fontSize: Math.round(size * 0.4) }}>{initial}</span>
      </div>
    );
  }

  return (
    <div
      style={{ width: size, height: size }}
      className={`${rounded} bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center overflow-hidden flex-shrink-0 ${className}`}
    >
      {/* Plain img, not next/image: these are hundreds of tiny third-party
          icons across arbitrary domains, so the optimiser would add a proxy
          round-trip per card for no gain at 16-44px. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        width={Math.round(size * 0.68)}
        height={Math.round(size * 0.68)}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="object-contain"
      />
    </div>
  );
}
