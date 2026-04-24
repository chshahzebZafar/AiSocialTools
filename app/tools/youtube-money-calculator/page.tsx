"use client";

import { useMemo, useState } from "react";
import { DollarSign, Youtube } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import ToolContentSection from "@/components/ToolContentSection";
import { ToolComments } from "@/components/ToolComments";
import ShareButtons from "@/components/ShareButtons";
import { FavoriteButton } from "@/components/FavoriteButton";

type ContentType = "long-form" | "shorts";

const NICHE_PRESETS: { label: string; cpmLow: number; cpmHigh: number }[] = [
  { label: "Finance / Investing", cpmLow: 12, cpmHigh: 25 },
  { label: "Tech / SaaS", cpmLow: 8, cpmHigh: 18 },
  { label: "Business / Marketing", cpmLow: 9, cpmHigh: 20 },
  { label: "Education / Tutorials", cpmLow: 3, cpmHigh: 8 },
  { label: "Health / Fitness", cpmLow: 2, cpmHigh: 6 },
  { label: "Lifestyle / Vlog", cpmLow: 2, cpmHigh: 5 },
  { label: "Gaming", cpmLow: 1.5, cpmHigh: 4 },
  { label: "Entertainment", cpmLow: 1, cpmHigh: 3 },
  { label: "Kids / Family", cpmLow: 0.5, cpmHigh: 1.5 },
  { label: "Custom", cpmLow: 0, cpmHigh: 0 },
];

const CREATOR_SHARE = 0.55;

export default function YouTubeMoneyCalculatorPage() {
  const tool = getToolById("youtube-money-calculator");
  const [views, setViews] = useState("100000");
  const [contentType, setContentType] = useState<ContentType>("long-form");
  const [presetIdx, setPresetIdx] = useState(2);
  const [customLow, setCustomLow] = useState("3");
  const [customHigh, setCustomHigh] = useState("8");
  const [monetizedPct, setMonetizedPct] = useState(70);

  const result = useMemo(() => {
    const v = Math.max(0, parseFloat(views) || 0);
    let cpmLow: number;
    let cpmHigh: number;
    if (presetIdx === NICHE_PRESETS.length - 1) {
      cpmLow = Math.max(0, parseFloat(customLow) || 0);
      cpmHigh = Math.max(cpmLow, parseFloat(customHigh) || 0);
    } else {
      const p = NICHE_PRESETS[presetIdx];
      cpmLow = p.cpmLow;
      cpmHigh = p.cpmHigh;
    }

    if (contentType === "shorts") {
      const shortsLow = v * 0.00002;
      const shortsHigh = v * 0.0001;
      return { monthly: { low: shortsLow, avg: (shortsLow + shortsHigh) / 2, high: shortsHigh }, yearly: { low: shortsLow * 12, avg: ((shortsLow + shortsHigh) / 2) * 12, high: shortsHigh * 12 }, cpmLow, cpmHigh };
    }

    const monetizedViews = (v * monetizedPct) / 100;
    const grossLow = (monetizedViews / 1000) * cpmLow;
    const grossHigh = (monetizedViews / 1000) * cpmHigh;
    const netLow = grossLow * CREATOR_SHARE;
    const netHigh = grossHigh * CREATOR_SHARE;
    const netAvg = (netLow + netHigh) / 2;
    return {
      monthly: { low: netLow, avg: netAvg, high: netHigh },
      yearly: { low: netLow * 12, avg: netAvg * 12, high: netHigh * 12 },
      cpmLow,
      cpmHigh,
    };
  }, [views, contentType, presetIdx, customLow, customHigh, monetizedPct]);

  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <div className="p-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                YouTube Money Calculator — Free YouTube Earnings Estimator
              </h1>
              <p className="text-slate-600 dark:text-slate-300">
                Estimate YouTube ad revenue from monthly views, CPM, and niche. Separate modes for long-form videos and Shorts. Results reflect YouTube&rsquo;s standard 55% creator share.
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3 flex-wrap">
            {tool && <FavoriteButton toolId={tool.id} />}
            <ShareButtons title="YouTube Money Calculator" text="Free YouTube earnings estimator — long-form and Shorts modes." />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Content type</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setContentType("long-form")}
                  className={`flex-1 py-2 rounded-lg border text-sm font-medium transition ${
                    contentType === "long-form"
                      ? "border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-200"
                      : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  <Youtube className="w-4 h-4 inline mr-1" /> Long-form
                </button>
                <button
                  onClick={() => setContentType("shorts")}
                  className={`flex-1 py-2 rounded-lg border text-sm font-medium transition ${
                    contentType === "shorts"
                      ? "border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-200"
                      : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  Shorts
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Monthly views</label>
              <input
                type="number"
                value={views}
                onChange={(e) => setViews(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {contentType === "long-form" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Niche preset</label>
                  <select
                    value={presetIdx}
                    onChange={(e) => setPresetIdx(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg"
                  >
                    {NICHE_PRESETS.map((p, i) => (
                      <option key={i} value={i}>
                        {p.label}{p.label !== "Custom" ? ` — $${p.cpmLow}–$${p.cpmHigh} CPM` : ""}
                      </option>
                    ))}
                  </select>
                </div>

                {presetIdx === NICHE_PRESETS.length - 1 && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-600 dark:text-slate-300 mb-1">Low CPM ($)</label>
                      <input type="number" step="0.1" value={customLow} onChange={(e) => setCustomLow(e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-600 dark:text-slate-300 mb-1">High CPM ($)</label>
                      <input type="number" step="0.1" value={customHigh} onChange={(e) => setCustomHigh(e.target.value)} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg" />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                    Monetised views: <span className="font-bold">{monetizedPct}%</span>
                  </label>
                  <input
                    type="range"
                    min={30}
                    max={100}
                    value={monetizedPct}
                    onChange={(e) => setMonetizedPct(Number(e.target.value))}
                    className="w-full accent-green-500"
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Typical: 60–75% (ad blockers, non-ad views, and unmonetised niches reduce this).
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">Estimated monthly ad revenue</p>
              <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                {fmt(result.monthly.low)} – {fmt(result.monthly.high)}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">avg ≈ {fmt(result.monthly.avg)}</p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">Projected yearly ad revenue</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                {fmt(result.yearly.low)} – {fmt(result.yearly.high)}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">avg ≈ {fmt(result.yearly.avg)}</p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-5 text-sm text-green-900 dark:text-green-100">
              <p className="font-semibold mb-1">Estimate notes</p>
              <ul className="space-y-0.5">
                <li>&bull; Based on YouTube&rsquo;s standard 55% creator share for long-form.</li>
                <li>&bull; Shorts use YouTube&rsquo;s Creator Pool — roughly $0.02–$0.10 per 1,000 views.</li>
                <li>&bull; Excludes memberships, Super Chat, affiliates, and brand deals.</li>
              </ul>
            </div>
          </div>
        </div>

        {tool && <ToolComments toolId={tool.id} />}
        {tool && <ToolFAQ tool={tool} />}
        {tool && <RelatedTools currentTool={tool} />}
        {tool && <ToolContentSection tool={tool} />}
        {tool && <ToolDetailsSection tool={tool} />}
      </div>
    </>
  );
}
