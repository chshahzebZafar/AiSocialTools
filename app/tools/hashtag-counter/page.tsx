"use client";

import { useMemo, useState } from "react";
import { Hash, Copy } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolHero from "@/components/ToolHero";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { ToolComments } from "@/components/ToolComments";

const HASHTAG_REGEX = /#[\p{L}\p{N}_]+/gu;

interface PlatformRule {
  name: string;
  limit: number;
  note: string;
}

const PLATFORMS: PlatformRule[] = [
  { name: "Instagram", limit: 30, note: "30 hashtags max per post or reel" },
  { name: "TikTok", limit: 100, note: "~100 chars reserved for hashtags (no hard count)" },
  { name: "Twitter / X", limit: 2, note: "1–2 hashtags recommended for best engagement" },
  { name: "LinkedIn", limit: 5, note: "3–5 hashtags recommended per post" },
  { name: "YouTube", limit: 15, note: "15 hashtags max in description before all are ignored" },
];

export default function HashtagCounterPage() {
  const tool = getToolById("hashtag-counter");
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const matches = text.match(HASHTAG_REGEX) ?? [];
    const lower = matches.map((m) => m.toLowerCase());
    const unique = Array.from(new Set(lower));
    const duplicates = matches.length - unique.length;
    return {
      all: matches,
      total: matches.length,
      unique: unique.length,
      duplicates,
      list: unique,
    };
  }, [text]);

  const copyHashtags = () => {
    if (!stats.list.length) return;
    navigator.clipboard.writeText(stats.list.join(" "));
  };

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <ToolHero
        toolId={tool?.id}
        icon={Hash}
        iconGradient="from-purple-500 to-pink-500"
        title="Hashtag Counter — Free Caption Hashtag Counter for Instagram, TikTok & Twitter"
        description="Paste your caption and instantly see how many hashtags it contains, which ones are duplicates, and whether you’re within Instagram, TikTok, Twitter, LinkedIn, and YouTube limits."
        shareTitle="Hashtag Counter"
        shareText="Free hashtag counter that warns you about platform limits."
      />
      <div className="p-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Your caption</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your caption including hashtags..."
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                rows={8}
              />
              <div className="grid grid-cols-3 gap-3 mt-4">
                <StatBlock label="Total" value={stats.total} color="purple" />
                <StatBlock label="Unique" value={stats.unique} color="pink" />
                <StatBlock label="Duplicates" value={stats.duplicates} color="amber" />
              </div>
            </div>

            {stats.list.length > 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Unique hashtags ({stats.list.length})
                  </h2>
                  <button onClick={copyHashtags} className="text-sm px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2">
                    <Copy className="w-4 h-4" /> Copy all
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {stats.list.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-sm bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-200 border border-purple-200 dark:border-purple-800">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Platform limits</h3>
              <div className="space-y-3">
                {PLATFORMS.map((p) => {
                  const over = stats.unique > p.limit;
                  return (
                    <div key={p.name} className={`p-3 rounded-lg border ${over ? "border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-800" : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40"}`}>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-slate-900 dark:text-slate-100">{p.name}</span>
                        <span className={`text-sm font-bold ${over ? "text-red-600" : "text-slate-600 dark:text-slate-300"}`}>
                          {stats.unique} / {p.limit}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{p.note}</p>
                    </div>
                  );
                })}
              </div>
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

function StatBlock({ label, value, color }: { label: string; value: number; color: "purple" | "pink" | "amber" }) {
  const palette: Record<string, string> = {
    purple: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-100",
    pink: "bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800 text-pink-900 dark:text-pink-100",
    amber: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100",
  };
  return (
    <div className={`rounded-lg p-4 border text-center ${palette[color]}`}>
      <p className="text-xs opacity-75 mb-1">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
