"use client";

import { useState } from "react";
import { User, Copy, RefreshCw, Check } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolHero from "@/components/ToolHero";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { ToolComments } from "@/components/ToolComments";
import ShareButtons from "@/components/ShareButtons";

const VIRAL_SUFFIXES = ["tv", "official", "fyp", "viral", "trends", "vibes", "creates", "creator", "studio", "daily", "hq", "it", "world", "zone", "central", "lab"];
const VIBE_PREFIXES = ["its", "iam", "real", "the", "official", "team", "house", "that"];
const SEPARATORS = ["", "_", ".", "_", "."];
const NUMBERS = ["", "01", "07", "22", "24", "99", "420", "808"];
const NICHE_TEMPLATES = ["Creates", "TV", "Studio", "Daily", "Lab", "World", "Diary", "HQ", "Life"];

const sanitize = (s: string) => s.toLowerCase().replace(/[^a-z0-9._]/g, "");
const isValidTikTok = (u: string) => /^[a-z0-9._]{2,24}$/.test(u) && !/^[._]/.test(u) && !/[._]$/.test(u) && !/\.\./.test(u);

export default function TikTokUsernameGeneratorPage() {
  const tool = getToolById("tiktok-username-generator");
  const [name, setName] = useState("");
  const [niche, setNiche] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const generate = () => {
    const base = sanitize(name);
    if (!base) {
      setResults([]);
      return;
    }
    const nicheBase = sanitize(niche);
    const pool = new Set<string>();

    pool.add(base);
    if (nicheBase) {
      pool.add(`${base}${nicheBase}`);
      pool.add(`${nicheBase}${base}`);
    }

    for (const sep of SEPARATORS) {
      for (const suffix of VIRAL_SUFFIXES) {
        pool.add(`${base}${sep}${suffix}`);
      }
      for (const prefix of VIBE_PREFIXES) {
        pool.add(`${prefix}${sep}${base}`);
      }
      if (nicheBase) {
        for (const suffix of VIRAL_SUFFIXES) {
          pool.add(`${base}${sep}${nicheBase}${sep}${suffix}`);
        }
      }
    }

    for (const num of NUMBERS) {
      if (!num) continue;
      pool.add(`${base}${num}`);
      pool.add(`${base}.${num}`);
      pool.add(`${base}_${num}`);
    }

    for (const t of NICHE_TEMPLATES) {
      pool.add(`${base}${t.toLowerCase()}`);
      pool.add(`${base}.${t.toLowerCase()}`);
    }

    const valid = Array.from(pool).filter(isValidTikTok);
    const shuffled = valid.sort(() => Math.random() - 0.5).slice(0, 30);
    setResults(shuffled);
  };

  const copy = async (u: string) => {
    await navigator.clipboard.writeText(u);
    setCopied(u);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <ToolHero
        toolId={tool?.id}
        icon={User}
        iconGradient="from-indigo-500 to-violet-500"
        title="TikTok Username Generator — Free Unique TikTok Name Ideas"
        description="Generate catchy, TikTok-compliant usernames in seconds. All results follow TikTok’s rules (2 – 24 characters, letters / numbers / underscores / periods only) and are ready to copy."
        shareTitle="TikTok Username Generator"
        shareText="Free TikTok username generator with viral-inspired suffixes."
      />
      <div className="p-8 max-w-4xl mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Name or keyword</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. emma, tech, fitness"
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Niche (optional)</label>
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="e.g. cooking, gaming, beauty"
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
            />
          </div>
          <button
            onClick={generate}
            className="w-full bg-slate-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-700 transition flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" /> Generate TikTok usernames
          </button>
        </div>

        {results.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {results.length} TikTok username ideas
              </h2>
              <ShareButtons title="TikTok Usernames" text={`Generated ${results.length} TikTok username ideas!`} resultText={results.join(", ")} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {results.map((u) => (
                <button
                  key={u}
                  onClick={() => copy(u)}
                  className="p-3 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 transition flex items-center justify-between"
                >
                  <span className="truncate">@{u}</span>
                  {copied === u ? <Check className="w-4 h-4 text-green-600 ml-2 flex-shrink-0" /> : <Copy className="w-4 h-4 ml-2 flex-shrink-0 opacity-50" />}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 text-sm text-slate-700 dark:text-slate-300">
          <p className="font-semibold mb-2 text-slate-900 dark:text-slate-100">TikTok username rules</p>
          <ul className="space-y-1">
            <li>&bull; 2 – 24 characters</li>
            <li>&bull; Letters, numbers, underscores, and periods only</li>
            <li>&bull; Cannot start or end with a period or underscore</li>
            <li>&bull; Cannot contain consecutive periods (..)</li>
            <li>&bull; Must be unique across TikTok — always check availability before committing</li>
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
