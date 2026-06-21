"use client";

import { useRef, useState } from "react";
import { Hash, Copy, Download, RefreshCw, Plus, Loader2, Check } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolHero from "@/components/ToolHero";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import ToolContentSection from "@/components/ToolContentSection";
import ShareButtons from "@/components/ShareButtons";
import { ToolComments } from "@/components/ToolComments";
import { buildHashtagPool, optimizedSet, type Hashtag, type HashtagPool, type Tier } from "@/lib/hashtag-engine";
import { topicWords } from "@/lib/datamuse";

const TIER_STYLES: Record<Tier, string> = {
  niche: "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100",
  medium: "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-100",
  popular: "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-100",
};
const TIER_LABEL: Record<Tier, string> = { niche: "Niche / branded", medium: "Category", popular: "Popular reach" };
const BATCH = 30;

export default function HashtagGeneratorPage() {
  const tool = getToolById("hashtag-generator");
  const [keyword, setKeyword] = useState("");
  const [platform, setPlatform] = useState("instagram");
  const [pool, setPool] = useState<Hashtag[]>([]);
  const [visible, setVisible] = useState(0);
  const [optimized, setOptimized] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [error, setError] = useState("");
  const builtRef = useRef<HashtagPool | null>(null);

  const generateHashtags = async () => {
    if (!keyword.trim()) {
      setError("Please enter a keyword or topic.");
      return;
    }
    setError("");
    setLoading(true);
    const related = await topicWords(keyword, 40); // free Datamuse topical words, soft-fails to []
    const built = buildHashtagPool(keyword, related);
    builtRef.current = built;
    setPool(built.all);
    setVisible(Math.min(BATCH, built.all.length));
    setOptimized(optimizedSet(built, platform));
    setLoading(false);
  };

  const loadMore = () => setVisible((v) => Math.min(v + BATCH, pool.length));

  const reshuffleOptimized = () => {
    if (builtRef.current) setOptimized(optimizedSet(builtRef.current, platform));
  };

  const copyText = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  const downloadHashtags = () => {
    const blob = new Blob([pool.map((h) => h.tag).join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "hashtags.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const shown = pool.slice(0, visible);

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Hashtag Generator",
            url: "https://aisocialtools.co/tools/hashtag-generator",
            description: "Free AI hashtag generator for Instagram, Twitter, TikTok, and LinkedIn. Generate trending and relevant hashtags to boost your social media reach.",
            applicationCategory: "Utility",
            operatingSystem: "Web Browser",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD"
            },
            creator: {
              "@type": "Person",
              name: "Shahzeb Zafar"
            }
          }),
        }}
      />
      <ToolHero
        toolId={tool?.id}
        icon={Hash}
        iconGradient="from-purple-500 to-fuchsia-500"
        title="Best Free Hashtag Generator Online - Boost Your Social Media Reach 2026"
        description="Hashtags are the secret weapon of social media success, but finding the right ones shouldn't be a guessing game. Our intelligent hashtag generator analyzes your content and delivers platform-optimized hashtags that actually work. Get discovered by your target audience on Instagram, Twitter, TikTok, and LinkedIn—no more posting into the void. Our tool suggests trending, niche, and branded hashtags tailored to your content, helping you reach thousands more people with every post."
        shareTitle="Free Hashtag Generator"
        shareText="Check out this free hashtag generator tool!"
      />
      <div className="p-8 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Keyword or Topic
            </label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g., fitness, travel, business"
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Platform
            </label>
            <select
              value={platform}
              onChange={(e) => {
                const p = e.target.value;
                setPlatform(p);
                if (builtRef.current) setOptimized(optimizedSet(builtRef.current, p));
              }}
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
            >
              <option value="instagram">Instagram (up to 30)</option>
              <option value="twitter">Twitter (up to 3)</option>
              <option value="tiktok">TikTok (up to 10)</option>
              <option value="linkedin">LinkedIn (up to 5)</option>
            </select>
          </div>

          <button
            onClick={generateHashtags}
            disabled={loading}
            className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Hash className="w-5 h-5" />}
            {loading ? "Generating…" : "Generate Hashtags"}
          </button>
          {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
        </div>
      </div>

      {optimized.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Optimized set for {platform[0].toUpperCase() + platform.slice(1)} ({optimized.length})
            </h2>
            <div className="flex gap-2">
              <button
                onClick={reshuffleOptimized}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                title="Reshuffle the optimized set"
              >
                <RefreshCw className="w-4 h-4" /> Shuffle
              </button>
              <button
                onClick={() => copyText(optimized.join(" "), "opt")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm bg-purple-600 text-white hover:bg-purple-700 transition"
              >
                {copied === "opt" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} Copy set
              </button>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            A ready-to-paste mix following the 70-20-10 rule (niche · category · popular) within {platform}&apos;s best-practice limit.
          </p>
          <div className="flex flex-wrap gap-2">
            {optimized.map((tag) => (
              <span key={tag} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-full text-sm">{tag}</span>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <ShareButtons title="Generated Hashtags" text="Check out these hashtags I generated!" resultText={optimized.join(" ")} />
          </div>
        </div>
      )}

      {pool.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              All hashtags ({pool.length})
            </h2>
            <div className="flex gap-2">
              <button onClick={() => copyText(pool.map((h) => h.tag).join(" "), "all")} className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors" title="Copy all">
                {copied === "all" ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
              </button>
              <button onClick={downloadHashtags} className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors" title="Download">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mb-4 text-xs text-slate-500 dark:text-slate-400">
            {(["niche", "medium", "popular"] as Tier[]).map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${TIER_STYLES[t].split(" ")[0]}`} /> {TIER_LABEL[t]}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {shown.map((h) => (
              <button
                key={h.tag}
                onClick={() => copyText(h.tag, h.tag)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${TIER_STYLES[h.tier]}`}
              >
                {copied === h.tag ? "Copied!" : h.tag}
              </button>
            ))}
          </div>
          {visible < pool.length && (
            <button
              onClick={loadMore}
              className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-600 transition"
            >
              <Plus className="w-4 h-4" /> Load more ({pool.length - visible} more)
            </button>
          )}
        </div>
      )}

      <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
        <h2 className="font-semibold text-purple-900 dark:text-purple-200 mb-3 text-lg flex items-center gap-2">
          <span>💡</span> Hashtag Strategy That Actually Works
        </h2>
        <p className="text-sm text-purple-800 dark:text-purple-300 mb-3">
          Not all hashtags are created equal. Here's how to use them strategically:
        </p>
        <ul className="text-sm text-purple-800 dark:text-purple-300 space-y-2">
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Instagram:</strong> Use 5-10 hashtags, mixing popular (1M+ posts) with niche (10K-100K posts) for maximum discoverability.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Twitter/X:</strong> Keep it to 1-2 hashtags max. Too many hashtags can actually hurt your engagement rate.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>The 70-20-10 rule:</strong> 70% niche hashtags, 20% moderately popular, 10% trending. This balance helps you reach the right audience.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Research before you post:</strong> Check if hashtags are banned or associated with spam. Our tool helps you avoid these pitfalls.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span><strong>Create branded hashtags:</strong> Build your own community with a unique hashtag. Track it to see how your audience engages.</span>
          </li>
        </ul>
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

