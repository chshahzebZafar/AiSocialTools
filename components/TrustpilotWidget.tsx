"use client";

import { useEffect, useRef } from "react";

type TrustBoxVariant =
  | "micro-review-count"   // tiny star + count inline
  | "mini"                  // compact horizontal bar
  | "slider"                // scrollable review cards
  | "horizontal"            // full-width review strip
  | "grid";                 // 2-col review grid

interface TrustpilotWidgetProps {
  variant?: TrustBoxVariant;
  height?: string;
  className?: string;
}

const TEMPLATE_IDS: Record<TrustBoxVariant, string> = {
  "micro-review-count": "5419b6ffb0d04a076446a9af",
  mini:                  "53aa8807dec7e10d38f59f32",
  slider:                "54ad5defc6454f065c28af8b",
  horizontal:            "5406e65db0d04a09e042d5fc",
  grid:                  "5418052cfbfb950d88702476",
};

const HEIGHTS: Record<TrustBoxVariant, string> = {
  "micro-review-count": "24px",
  mini:                  "150px",
  slider:                "240px",
  horizontal:            "28px",
  grid:                  "500px",
};

export default function TrustpilotWidget({
  variant = "mini",
  height,
  className = "",
}: TrustpilotWidgetProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Re-initialise widgets loaded after the initial script bootstrap
    if (typeof window !== "undefined" && (window as any).Trustpilot) {
      (window as any).Trustpilot.loadFromElement(ref.current, true);
    }
  }, []);

  return (
    <div
      ref={ref}
      className={`trustpilot-widget ${className}`}
      data-locale="en-US"
      data-template-id={TEMPLATE_IDS[variant]}
      data-businessunit-id="YOUR_BUSINESS_UNIT_ID" // ← replace after signup
      data-style-height={height ?? HEIGHTS[variant]}
      data-style-width="100%"
      data-theme="light"
      data-stars="4,5"
    >
      <a
        href="https://www.trustpilot.com/review/aisocialtools.co"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-zinc-500 hover:text-zinc-950 transition-colors"
      >
        Read our reviews on Trustpilot
      </a>
    </div>
  );
}
