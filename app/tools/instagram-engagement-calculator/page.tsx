"use client";

import { useMemo, useState } from "react";
import { TrendingUp, Instagram } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolHero from "@/components/ToolHero";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { ToolComments } from "@/components/ToolComments";

type Mode = "per-post" | "account";

export default function InstagramEngagementCalculatorPage() {
  const tool = getToolById("instagram-engagement-calculator");
  const [mode, setMode] = useState<Mode>("per-post");
  const [followers, setFollowers] = useState("");
  const [likes, setLikes] = useState("");
  const [comments, setComments] = useState("");
  const [saves, setSaves] = useState("");
  const [shares, setShares] = useState("");
  const [posts, setPosts] = useState("");

  const result = useMemo(() => {
    const f = Math.max(0, parseFloat(followers) || 0);
    const l = Math.max(0, parseFloat(likes) || 0);
    const c = Math.max(0, parseFloat(comments) || 0);
    const sv = Math.max(0, parseFloat(saves) || 0);
    const sh = Math.max(0, parseFloat(shares) || 0);
    const p = Math.max(1, parseFloat(posts) || 1);

    const totalEngagements = l + c + sv + sh;
    const engagementRate = f > 0 ? (totalEngagements / (mode === "account" ? f * p : f)) * 100 : 0;
    return {
      totalEngagements,
      engagementRate,
      likeRate: f > 0 ? (l / f) * 100 : 0,
      commentRate: f > 0 ? (c / f) * 100 : 0,
      saveRate: f > 0 ? (sv / f) * 100 : 0,
      shareRate: f > 0 ? (sh / f) * 100 : 0,
    };
  }, [mode, followers, likes, comments, saves, shares, posts]);

  const band = result.engagementRate >= 6
    ? { label: "Excellent", className: "text-green-600", bar: "bg-green-500" }
    : result.engagementRate >= 3
    ? { label: "Good", className: "text-emerald-600", bar: "bg-emerald-500" }
    : result.engagementRate >= 1
    ? { label: "Average", className: "text-yellow-600", bar: "bg-yellow-500" }
    : { label: "Low", className: "text-red-600", bar: "bg-red-500" };

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <ToolHero
        toolId={tool?.id}
        icon={Instagram}
        iconGradient="from-pink-500 to-purple-600"
        title="Instagram Engagement Rate Calculator — Free & Instant"
        description="Calculate your Instagram engagement rate in seconds. Compare against 2026 benchmarks, get a per-post or account-wide breakdown, and see which interaction type drives the most engagement."
        shareTitle="Instagram Engagement Calculator"
        shareText="Free Instagram engagement rate calculator with 2026 benchmarks."
      />
      <div className="p-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Calculation mode</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setMode("per-post")}
                  className={`flex-1 py-2 rounded-lg border text-sm font-medium transition ${
                    mode === "per-post"
                      ? "border-pink-500 bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-200"
                      : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  Per post
                </button>
                <button
                  onClick={() => setMode("account")}
                  className={`flex-1 py-2 rounded-lg border text-sm font-medium transition ${
                    mode === "account"
                      ? "border-pink-500 bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-200"
                      : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  Account average
                </button>
              </div>
            </div>

            <Field label="Followers" value={followers} onChange={setFollowers} placeholder="10000" />
            <Field label="Likes" value={likes} onChange={setLikes} placeholder="500" />
            <Field label="Comments" value={comments} onChange={setComments} placeholder="40" />
            <Field label="Saves" value={saves} onChange={setSaves} placeholder="60" />
            <Field label="Shares" value={shares} onChange={setShares} placeholder="25" />
            {mode === "account" && (
              <Field label="Number of posts analysed" value={posts} onChange={setPosts} placeholder="10" />
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <div className="flex items-center gap-2 mb-3 text-slate-700 dark:text-slate-200">
                <TrendingUp className="w-5 h-5" />
                <h2 className="text-lg font-semibold">Your engagement rate</h2>
              </div>
              <p className={`text-5xl font-bold ${band.className}`}>
                {result.engagementRate.toFixed(2)}<span className="text-2xl">%</span>
              </p>
              <p className={`text-sm font-medium mt-1 ${band.className}`}>{band.label}</p>
              <div className="mt-3 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div className={`h-2 rounded-full ${band.bar}`} style={{ width: `${Math.min(result.engagementRate * 10, 100)}%` }} />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Total engagements: {result.totalEngagements.toLocaleString()}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <MiniStat color="purple" label="Like rate" value={`${result.likeRate.toFixed(2)}%`} />
              <MiniStat color="pink" label="Comment rate" value={`${result.commentRate.toFixed(2)}%`} />
              <MiniStat color="indigo" label="Save rate" value={`${result.saveRate.toFixed(2)}%`} />
              <MiniStat color="amber" label="Share rate" value={`${result.shareRate.toFixed(2)}%`} />
            </div>

            <div className="bg-pink-50 dark:bg-pink-900/20 rounded-xl border border-pink-200 dark:border-pink-800 p-5 text-sm text-pink-900 dark:text-pink-100">
              <p className="font-semibold mb-1">Instagram engagement benchmarks (2026)</p>
              <ul className="space-y-0.5">
                <li>&bull; Excellent: 6% +</li>
                <li>&bull; Good: 3 – 6%</li>
                <li>&bull; Average: 1 – 3%</li>
                <li>&bull; Low: &lt; 1%</li>
              </ul>
            </div>
          </div>
        </div>

        {tool && <ToolComments toolId={tool.id} />}
        {tool && <ToolFAQ tool={tool} />}
        {tool && <RelatedTools currentTool={tool} />}
        {tool && <ToolDetailsSection tool={tool} />}
      </div>
    </>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">{label}</label>
      <input
        type="number"
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
      />
    </div>
  );
}

function MiniStat({ color, label, value }: { color: "purple" | "pink" | "indigo" | "amber"; label: string; value: string }) {
  const palette: Record<string, string> = {
    purple: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-100",
    pink: "bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800 text-pink-900 dark:text-pink-100",
    indigo: "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-100",
    amber: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100",
  };
  return (
    <div className={`rounded-lg p-3 border ${palette[color]}`}>
      <p className="text-xs opacity-75 mb-1">{label}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
}
