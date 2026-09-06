"use client";

import { useState } from "react";

const SITE = "https://aisocialtools.co";
const TOOL_PATH = "/tools/engagement-calculator";

/**
 * Embeddable engagement rate calculator.
 *
 * Designed to be dropped into third-party pages via <iframe>. Constraints that
 * differ from the full tool page:
 *   - self-contained: no shared Header/Footer/popup, no lucide icons, so the
 *     iframe payload stays small
 *   - fixed light theme: it renders inside someone else's page and must look
 *     deliberate there, not inherit half of our dark mode
 *   - visible attribution back to the canonical tool page
 *
 * Note the attribution <a> here lives inside the iframe, so it is NOT the
 * backlink. The embed snippet shown on the tool page includes a separate
 * attribution link that sits on the host page itself — that is the real link.
 */
export default function EmbedEngagementCalculator() {
  const [followers, setFollowers] = useState("");
  const [likes, setLikes] = useState("");
  const [comments, setComments] = useState("");
  const [shares, setShares] = useState("");
  const [saves, setSaves] = useState("");

  const f = parseFloat(followers) || 0;
  const total =
    (parseFloat(likes) || 0) +
    (parseFloat(comments) || 0) +
    (parseFloat(shares) || 0) +
    (parseFloat(saves) || 0);
  const rate = f > 0 ? (total / f) * 100 : 0;
  const hasInput = f > 0;

  // Benchmarks are widely-cited industry rules of thumb, not measurements of
  // our own — labelled as such so the widget does not imply original research.
  const verdict = !hasInput
    ? null
    : rate >= 6
      ? { label: "Excellent", cls: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" }
      : rate >= 3
        ? { label: "Good", cls: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" }
        : rate >= 1
          ? { label: "Average", cls: "text-amber-600", bg: "bg-amber-50 border-amber-200" }
          : { label: "Below average", cls: "text-red-600", bg: "bg-red-50 border-red-200" };

  const fields: Array<[string, string, (v: string) => void, string]> = [
    ["Followers", followers, setFollowers, "10000"],
    ["Likes", likes, setLikes, "500"],
    ["Comments", comments, setComments, "50"],
    ["Shares", shares, setShares, "20"],
    ["Saves", saves, setSaves, "30"],
  ];

  return (
    <div className="p-4 sm:p-5 max-w-2xl mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
        {fields.map(([label, value, setter, placeholder]) => (
          <div key={label}>
            <label className="block text-xs font-medium text-zinc-600 mb-1">
              {label}
            </label>
            <input
              type="number"
              min="0"
              inputMode="numeric"
              value={value}
              onChange={(e) => setter(e.target.value)}
              placeholder={placeholder}
              aria-label={label}
              className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        ))}
      </div>

      <div
        className={`rounded-lg border p-4 mb-3 transition-colors ${
          verdict ? verdict.bg : "bg-zinc-50 border-zinc-200"
        }`}
      >
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-1">
              Engagement rate
            </p>
            <p
              className={`text-3xl font-semibold tracking-tight ${
                verdict ? verdict.cls : "text-zinc-400"
              }`}
            >
              {hasInput ? `${rate.toFixed(2)}%` : "—"}
            </p>
          </div>
          {verdict && (
            <div className="text-right">
              <p className={`text-sm font-semibold ${verdict.cls}`}>
                {verdict.label}
              </p>
              <p className="text-xs text-zinc-500">
                {total.toLocaleString()} engagements
              </p>
            </div>
          )}
        </div>
        {!hasInput && (
          <p className="text-xs text-zinc-500 mt-2">
            Enter your follower count to calculate.
          </p>
        )}
      </div>

      <p className="text-[11px] text-zinc-500 leading-relaxed mb-3">
        Rate = (likes + comments + shares + saves) ÷ followers × 100. Benchmarks
        are common industry rules of thumb and vary by platform and niche.
      </p>

      <p className="text-[11px] text-zinc-500 text-center border-t border-zinc-200 pt-3">
        <a
          href={`${SITE}${TOOL_PATH}?utm_source=embed`}
          target="_blank"
          rel="noopener"
          className="text-zinc-600 hover:text-zinc-950 underline underline-offset-2"
        >
          Engagement Rate Calculator
        </a>{" "}
        by AI Social Tools
      </p>
    </div>
  );
}
