"use client";

import { useMemo, useState } from "react";
import { Twitter, Copy } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolHero from "@/components/ToolHero";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { ToolComments } from "@/components/ToolComments";

const LIMIT = 280;
const URL_WEIGHT = 23;
const URL_REGEX = /https?:\/\/\S+/g;

export default function TwitterCharacterCounterPage() {
  const tool = getToolById("twitter-character-counter");
  const [text, setText] = useState("");
  const [weightUrls, setWeightUrls] = useState(true);

  const stats = useMemo(() => {
    const raw = text.length;
    const urlMatches = text.match(URL_REGEX) ?? [];
    const urlRawTotal = urlMatches.reduce((n, u) => n + u.length, 0);
    const weighted = weightUrls
      ? raw - urlRawTotal + urlMatches.length * URL_WEIGHT
      : raw;
    const remaining = LIMIT - weighted;
    const percent = Math.min((weighted / LIMIT) * 100, 100);
    const threadCount = weighted > 0 ? Math.ceil(weighted / (LIMIT - 8)) : 0;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    return {
      raw,
      weighted,
      remaining,
      percent,
      urls: urlMatches.length,
      threadCount,
      words,
    };
  }, [text, weightUrls]);

  const statusColor =
    stats.percent >= 100 ? "text-red-600" :
    stats.percent >= 90 ? "text-orange-600" :
    stats.percent >= 75 ? "text-yellow-600" : "text-green-600";

  const barColor =
    stats.percent >= 100 ? "bg-red-500" :
    stats.percent >= 90 ? "bg-orange-500" :
    stats.percent >= 75 ? "bg-yellow-500" : "bg-green-500";

  const copyText = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <ToolHero
        toolId={tool?.id}
        icon={Twitter}
        iconGradient="from-sky-500 to-blue-600"
        title="Twitter / X Character Counter — Free, Accurate URL Weighting"
        description="Count characters for Twitter and X posts with the correct URL-weighting rule (every link counts as 23 characters). Live count, remaining characters, and an automatic thread split preview."
        shareTitle="Twitter / X Character Counter"
        shareText="Free Twitter character counter with accurate URL weighting."
      />
      <div className="p-8 max-w-4xl mx-auto">

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              Your tweet
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={weightUrls}
                onChange={(e) => setWeightUrls(e.target.checked)}
                className="accent-sky-500"
              />
              Count URLs as 23 chars (X&rsquo;s rule)
            </label>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste or type your tweet here..."
            className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 resize-none"
            rows={6}
          />
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-2xl font-bold ${statusColor}`}>
                {stats.weighted} / {LIMIT}
              </span>
              <span className={`text-sm font-medium ${statusColor}`}>
                {stats.remaining >= 0 ? `${stats.remaining} remaining` : `${Math.abs(stats.remaining)} over limit`}
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all ${barColor}`}
                style={{ width: `${stats.percent}%` }}
              />
            </div>
            <div className="flex items-center justify-end mt-3">
              <button
                onClick={copyText}
                disabled={!text}
                className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50"
              >
                <Copy className="w-4 h-4" /> Copy
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard label="Raw characters" value={stats.raw} />
          <StatCard label="Weighted (X rule)" value={stats.weighted} />
          <StatCard label="URLs detected" value={stats.urls} />
          <StatCard label="Tweets if threaded" value={stats.threadCount} />
        </div>

        <div className="bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800 rounded-xl p-5 text-sm text-sky-900 dark:text-sky-100">
          <p className="font-semibold mb-1">How X counts characters</p>
          <p>
            On Twitter / X, every URL is counted as <strong>23 characters</strong> regardless of its actual length — short or long links weigh the same. Emoji and most non-Latin scripts count as 2 characters. Use the checkbox above to see either the weighted count (what X actually enforces) or the raw character count.
          </p>
        </div>

        {tool && <ToolComments toolId={tool.id} />}
        {tool && <ToolFAQ tool={tool} />}
        {tool && <RelatedTools currentTool={tool} />}
        {tool && <ToolDetailsSection tool={tool} />}
      </div>
    </>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{label}</p>
      <p className="text-xl font-bold text-slate-900 dark:text-slate-100">{value.toLocaleString()}</p>
    </div>
  );
}
