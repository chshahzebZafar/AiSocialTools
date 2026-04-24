"use client";

import { useMemo, useState } from "react";
import { MessageCircle, Copy, Check } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { ToolComments } from "@/components/ToolComments";
import ShareButtons from "@/components/ShareButtons";
import { FavoriteButton } from "@/components/FavoriteButton";

function splitIntoThread(text: string, maxLen: number, numbered: boolean): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];

  const reserve = numbered ? 8 : 0;
  const effective = Math.max(40, maxLen - reserve);

  const sentences = trimmed
    .split(/(?<=[.!?])\s+/)
    .flatMap((s) => (s.length <= effective ? [s] : chunkByWords(s, effective)));

  const tweets: string[] = [];
  let buffer = "";
  for (const sentence of sentences) {
    if (!buffer) {
      buffer = sentence;
      continue;
    }
    if (buffer.length + 1 + sentence.length <= effective) {
      buffer = `${buffer} ${sentence}`;
    } else {
      tweets.push(buffer);
      buffer = sentence;
    }
  }
  if (buffer) tweets.push(buffer);

  if (!numbered) return tweets;
  const total = tweets.length;
  return tweets.map((t, i) => `${t} (${i + 1}/${total})`);
}

function chunkByWords(text: string, maxLen: number): string[] {
  const words = text.split(/\s+/);
  const out: string[] = [];
  let buf = "";
  for (const w of words) {
    if (w.length > maxLen) {
      if (buf) { out.push(buf); buf = ""; }
      for (let i = 0; i < w.length; i += maxLen) {
        out.push(w.slice(i, i + maxLen));
      }
      continue;
    }
    if (!buf) { buf = w; continue; }
    if (buf.length + 1 + w.length <= maxLen) buf = `${buf} ${w}`;
    else { out.push(buf); buf = w; }
  }
  if (buf) out.push(buf);
  return out;
}

export default function TweetThreadMakerPage() {
  const tool = getToolById("tweet-thread-maker");
  const [text, setText] = useState("");
  const [maxLen, setMaxLen] = useState(280);
  const [numbered, setNumbered] = useState(true);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const tweets = useMemo(() => splitIntoThread(text, maxLen, numbered), [text, maxLen, numbered]);

  const copyOne = async (tweet: string, idx: number) => {
    await navigator.clipboard.writeText(tweet);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  const copyAll = () => {
    if (!tweets.length) return;
    navigator.clipboard.writeText(tweets.join("\n\n"));
  };

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <div className="p-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-sky-500 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Tweet Thread Maker — Free Twitter / X Thread Generator
              </h1>
              <p className="text-slate-600 dark:text-slate-300">
                Paste long text and get a neatly split, numbered Twitter / X thread. Smart sentence boundaries keep every tweet readable. Free, no signup, no limits.
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3 flex-wrap">
            {tool && <FavoriteButton toolId={tool.id} />}
            <ShareButtons title="Tweet Thread Maker" text="Free tweet thread generator with smart sentence splits." />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Your long text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your essay, article, or long post here..."
            className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 resize-none"
            rows={8}
          />
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <label className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2">
              Max chars per tweet:
              <input
                type="number"
                min={100}
                max={280}
                value={maxLen}
                onChange={(e) => setMaxLen(Math.max(100, Math.min(280, Number(e.target.value) || 280)))}
                className="w-20 px-2 py-1 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 rounded"
              />
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={numbered}
                onChange={(e) => setNumbered(e.target.checked)}
                className="accent-sky-500"
              />
              Auto-number (1/n)
            </label>
          </div>
        </div>

        {tweets.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Thread preview ({tweets.length} tweet{tweets.length === 1 ? "" : "s"})
              </h2>
              <button onClick={copyAll} className="text-sm px-3 py-1.5 rounded-md bg-sky-600 hover:bg-sky-700 text-white flex items-center gap-2">
                <Copy className="w-4 h-4" /> Copy all
              </button>
            </div>
            <div className="space-y-3">
              {tweets.map((tweet, i) => (
                <div key={i} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-slate-50 dark:bg-slate-900/40">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-slate-800 dark:text-slate-100 whitespace-pre-wrap flex-1">{tweet}</p>
                    <button
                      onClick={() => copyOne(tweet, i)}
                      className="text-xs px-2 py-1 rounded border border-slate-300 dark:border-slate-600 hover:bg-white dark:hover:bg-slate-700 flex items-center gap-1 flex-shrink-0"
                    >
                      {copiedIdx === i ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                      {copiedIdx === i ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">{tweet.length} chars</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tool && <ToolComments toolId={tool.id} />}
        {tool && <ToolFAQ tool={tool} />}
        {tool && <RelatedTools currentTool={tool} />}
        {tool && <ToolDetailsSection tool={tool} />}
      </div>
    </>
  );
}
