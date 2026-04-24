"use client";

import { useMemo, useState } from "react";
import { Youtube, Copy, Check, RefreshCw } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { ToolComments } from "@/components/ToolComments";
import ShareButtons from "@/components/ShareButtons";
import { FavoriteButton } from "@/components/FavoriteButton";

const MAX_TAG_CHARS = 500;
const STOPWORDS = new Set(["the", "a", "an", "of", "to", "in", "on", "and", "or", "for", "with", "at", "by", "is", "are", "be"]);

const MODIFIERS = [
  (t: string) => `how to ${t}`,
  (t: string) => `${t} tutorial`,
  (t: string) => `${t} guide`,
  (t: string) => `${t} tips`,
  (t: string) => `${t} for beginners`,
  (t: string) => `best ${t}`,
  (t: string) => `top ${t}`,
  (t: string) => `${t} 2026`,
  (t: string) => `${t} 2025`,
  (t: string) => `${t} explained`,
  (t: string) => `${t} review`,
  (t: string) => `${t} step by step`,
  (t: string) => `learn ${t}`,
  (t: string) => `${t} mistakes to avoid`,
  (t: string) => `${t} course`,
  (t: string) => `${t} masterclass`,
  (t: string) => `${t} secrets`,
  (t: string) => `${t} cheat sheet`,
];

function buildTags(topic: string, niche: string): string[] {
  const t = topic.trim().toLowerCase();
  const n = niche.trim().toLowerCase();
  if (!t) return [];

  const tags = new Set<string>();
  tags.add(t);

  const words = t.split(/\s+/).filter((w) => !STOPWORDS.has(w) && w.length > 2);
  words.forEach((w) => tags.add(w));

  MODIFIERS.forEach((fn) => tags.add(fn(t)));

  if (n) {
    tags.add(n);
    tags.add(`${n} ${t}`);
    tags.add(`${t} ${n}`);
    MODIFIERS.slice(0, 8).forEach((fn) => tags.add(fn(`${t} ${n}`)));
  }

  if (words.length > 1) {
    tags.add(words.join(" "));
    tags.add(`${words[0]} ${words[words.length - 1]}`);
  }

  return Array.from(tags)
    .map((tag) => tag.trim())
    .filter((tag) => tag.length >= 2 && tag.length <= 60);
}

export default function YouTubeTagGeneratorPage() {
  const tool = getToolById("youtube-tag-generator");
  const [topic, setTopic] = useState("");
  const [niche, setNiche] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);

  const tags = useMemo(() => buildTags(topic, niche), [topic, niche]);
  const selectedList = useMemo(() => tags.filter((t) => selected.has(t)), [tags, selected]);
  const selectedJoined = selectedList.join(", ");
  const charCount = selectedJoined.length;
  const overLimit = charCount > MAX_TAG_CHARS;

  const toggle = (tag: string) => {
    const next = new Set(selected);
    if (next.has(tag)) next.delete(tag);
    else next.add(tag);
    setSelected(next);
  };

  const selectTopN = () => {
    const next = new Set<string>();
    let chars = 0;
    for (const tag of tags) {
      const addLen = chars === 0 ? tag.length : tag.length + 2;
      if (chars + addLen > MAX_TAG_CHARS) break;
      next.add(tag);
      chars += addLen;
    }
    setSelected(next);
  };

  const clearAll = () => setSelected(new Set());

  const copy = async () => {
    if (!selectedJoined) return;
    await navigator.clipboard.writeText(selectedJoined);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <div className="p-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
              <Youtube className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                YouTube Tag Generator — Free SEO Tag Generator for Videos
              </h1>
              <p className="text-slate-600 dark:text-slate-300">
                Generate 30+ SEO-optimised YouTube tags from any topic. Pick the tags you want, stay under the 500-character limit, and copy the list straight into YouTube Studio.
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3 flex-wrap">
            {tool && <FavoriteButton toolId={tool.id} />}
            <ShareButtons title="YouTube Tag Generator" text="Free SEO tag generator for YouTube videos." />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Video topic or title</label>
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. beginner sourdough bread"
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Niche (optional)</label>
            <input
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="e.g. home baking, cooking"
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>

        {tags.length > 0 && (
          <>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {tags.length} suggested tags
                </h2>
                <div className="flex gap-2">
                  <button onClick={selectTopN} className="text-sm px-3 py-1.5 rounded border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-1">
                    <RefreshCw className="w-3 h-3" /> Auto-fill up to 500 chars
                  </button>
                  <button onClick={clearAll} className="text-sm px-3 py-1.5 rounded border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700">
                    Clear
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => {
                  const active = selected.has(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggle(tag)}
                      className={`px-3 py-1 rounded-full text-sm border transition ${
                        active
                          ? "bg-red-600 border-red-600 text-white"
                          : "bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-red-400"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                  Your tag list ({selectedList.length} tags)
                </h3>
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-semibold ${overLimit ? "text-red-600" : "text-slate-600 dark:text-slate-300"}`}>
                    {charCount} / {MAX_TAG_CHARS} chars
                  </span>
                  <button
                    onClick={copy}
                    disabled={!selectedJoined}
                    className="px-3 py-1.5 rounded bg-red-600 hover:bg-red-700 text-white text-sm flex items-center gap-2 disabled:opacity-50"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copied" : "Copy all"}
                  </button>
                </div>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-200 break-words bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 rounded-lg p-4 min-h-[64px]">
                {selectedJoined || "Select tags above to build your list..."}
              </p>
              {overLimit && (
                <p className="text-xs text-red-600 mt-2">
                  Over the 500-character YouTube limit. Remove some tags before pasting.
                </p>
              )}
            </div>
          </>
        )}

        {tool && <ToolComments toolId={tool.id} />}
        {tool && <ToolFAQ tool={tool} />}
        {tool && <RelatedTools currentTool={tool} />}
        {tool && <ToolDetailsSection tool={tool} />}
      </div>
    </>
  );
}
