"use client";

import { useRef, useState } from "react";
import { Ghost, Copy, RefreshCw, Check, Plus, Loader2 } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import { SNAP_STYLES, buildSnapPool } from "@/lib/snapchat-username-styles";
import { sampleBatch } from "@/lib/username-engine";
import { relatedWords } from "@/lib/datamuse";
import ToolSEO from "@/components/ToolSEO";
import ToolHero from "@/components/ToolHero";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { ToolComments } from "@/components/ToolComments";
import ShareButtons from "@/components/ShareButtons";

interface SnapUsernameToolProps {
  toolId: string;
  styleKey: keyof typeof SNAP_STYLES;
  title: string;
  heroDescription: string;
  shareTitle: string;
  shareText: string;
  /** Unique intro copy so each variant page has original content. */
  intro: string;
  namePlaceholder?: string;
}

const BATCH = 30;

export default function SnapUsernameTool({
  toolId,
  styleKey,
  title,
  heroDescription,
  shareTitle,
  shareText,
  intro,
  namePlaceholder = "e.g. emma, alex, jay",
}: SnapUsernameToolProps) {
  const tool = getToolById(toolId);
  const [name, setName] = useState("");
  const [niche, setNiche] = useState("");
  const [pool, setPool] = useState<string[]>([]);
  const [shown, setShown] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const seen = useRef<Set<string>>(new Set());

  const buildAndShow = async () => {
    setTouched(true);
    setLoading(true);
    // Widen the pool with real related words for the topic (free, keyless, soft-fail).
    const extra = niche.trim() ? await relatedWords(niche, { max: 30, mode: "ml" }) : [];
    const p = buildSnapPool(name, niche, styleKey, extra);
    seen.current = new Set();
    const batch = sampleBatch(p, BATCH, seen.current);
    batch.forEach((u) => seen.current.add(u));
    setPool(p);
    setShown(batch);
    setLoading(false);
  };

  const loadMore = () => {
    const batch = sampleBatch(pool, BATCH, seen.current);
    batch.forEach((u) => seen.current.add(u));
    setShown((prev) => [...prev, ...batch]);
  };

  const copy = async (u: string) => {
    await navigator.clipboard.writeText(u);
    setCopied(u);
    setTimeout(() => setCopied(null), 1500);
  };

  const remaining = pool.length - shown.length;

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <ToolHero
        toolId={tool?.id}
        icon={Ghost}
        iconGradient="from-yellow-400 to-amber-500"
        title={title}
        description={heroDescription}
        shareTitle={shareTitle}
        shareText={shareText}
      />
      <div className="p-8 max-w-4xl mx-auto">
        <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">{intro}</p>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Name or keyword</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && buildAndShow()}
              placeholder={namePlaceholder}
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Niche or interest (optional — adds related words)</label>
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && buildAndShow()}
              placeholder="e.g. travel, gaming, fitness"
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            />
          </div>
          <button
            onClick={buildAndShow}
            disabled={loading}
            className="w-full bg-slate-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-700 transition flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <RefreshCw className="w-5 h-5" />}
            {loading ? "Generating…" : "Generate usernames"}
          </button>
          {touched && !loading && pool.length === 0 && (
            <p className="text-sm text-amber-600 dark:text-amber-400">
              Enter a name or keyword (letters or numbers) to generate ideas.
            </p>
          )}
        </div>

        {shown.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {shown.length} ideas{remaining > 0 ? ` of ${pool.length}+` : ""}
              </h2>
              <ShareButtons title={shareTitle} text={`Generated ${shown.length} Snapchat username ideas!`} resultText={shown.join(", ")} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {shown.map((u) => (
                <button
                  key={u}
                  onClick={() => copy(u)}
                  className="p-3 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 transition flex items-center justify-between"
                >
                  <span className="truncate">{u}</span>
                  {copied === u ? <Check className="w-4 h-4 text-green-600 ml-2 flex-shrink-0" /> : <Copy className="w-4 h-4 ml-2 flex-shrink-0 opacity-50" />}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 mt-5">
              {remaining > 0 && (
                <button
                  onClick={loadMore}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-600 transition"
                >
                  <Plus className="w-4 h-4" /> Load more ideas
                </button>
              )}
              <button
                onClick={buildAndShow}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
              >
                <RefreshCw className="w-4 h-4" /> Fresh batch
              </button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
              Tip: paste a username into Snapchat&apos;s sign-up or username-change screen to check availability. Taken? Load more for a fresh set.
            </p>
          </div>
        )}

        <div className="mt-8 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 text-sm text-slate-700 dark:text-slate-300">
          <p className="font-semibold mb-2 text-slate-900 dark:text-slate-100">Snapchat username rules</p>
          <ul className="space-y-1">
            <li>&bull; 3 – 15 characters, must start with a letter</li>
            <li>&bull; Letters, numbers, periods (.), hyphens (-), underscores (_) only</li>
            <li>&bull; Cannot end with a symbol, and no two symbols in a row</li>
            <li>&bull; Usernames are lowercase and can be changed once per year</li>
          </ul>
        </div>

        {tool && <ToolComments toolId={tool.id} />}
        {tool && <ToolFAQ tool={tool} />}
        {tool && <RelatedTools currentTool={tool} />}
        {tool && <ToolDetailsSection tool={tool} />}
      </div>
    </>
  );
}
