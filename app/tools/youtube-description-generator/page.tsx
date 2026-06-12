"use client";

import { useMemo, useState } from "react";
import { FileText, Copy, Check } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolHero from "@/components/ToolHero";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { ToolComments } from "@/components/ToolComments";

const MAX_CHARS = 5000;

function splitLines(s: string): string[] {
  return s.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
}

export default function YouTubeDescriptionGeneratorPage() {
  const tool = getToolById("youtube-description-generator");
  const [hook, setHook] = useState("");
  const [summary, setSummary] = useState("");
  const [timestamps, setTimestamps] = useState("");
  const [links, setLinks] = useState("");
  const [cta, setCta] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [copied, setCopied] = useState(false);

  const description = useMemo(() => {
    const sections: string[] = [];
    if (hook.trim()) sections.push(hook.trim());
    if (summary.trim()) sections.push("", summary.trim());
    const ts = splitLines(timestamps);
    if (ts.length) {
      sections.push("", "⏱️ CHAPTERS");
      sections.push(...ts);
    }
    const ln = splitLines(links);
    if (ln.length) {
      sections.push("", "🔗 LINKS");
      sections.push(...ln);
    }
    if (cta.trim()) sections.push("", cta.trim());
    const tags = hashtags
      .split(/[\s,]+/)
      .filter(Boolean)
      .map((t) => (t.startsWith("#") ? t : `#${t}`))
      .slice(0, 5);
    if (tags.length) sections.push("", tags.join(" "));
    return sections.join("\n");
  }, [hook, summary, timestamps, links, cta, hashtags]);

  const copy = async () => {
    if (!description) return;
    await navigator.clipboard.writeText(description);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const charCount = description.length;
  const over = charCount > MAX_CHARS;

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <ToolHero
        toolId={tool?.id}
        icon={FileText}
        iconGradient="from-red-500 to-rose-600"
        title="YouTube Description Generator — Free SEO Description Template"
        description="Build a fully-structured YouTube description with hook, chapter timestamps, links, CTA, and hashtags. Stays under the 5,000-character limit. Free, no signup."
        shareTitle="YouTube Description Generator"
        shareText="Free YouTube description generator with timestamps & hashtags."
      />
      <div className="p-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 space-y-4">
            <Field label="Opening hook (first 2 lines — most important for SEO)">
              <input
                value={hook}
                onChange={(e) => setHook(e.target.value)}
                placeholder="Learn sourdough in 5 minutes — no scale, no starter, no waste."
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </Field>
            <Field label="Video summary / key points">
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="In this video you'll learn..."
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
              />
            </Field>
            <Field label="Timestamps (one per line, e.g. 00:00 Intro)">
              <textarea
                value={timestamps}
                onChange={(e) => setTimestamps(e.target.value)}
                placeholder={"00:00 Intro\n01:20 The recipe\n04:15 Kneading technique\n08:00 Final bake"}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none font-mono text-sm"
              />
            </Field>
            <Field label="Links (one per line — socials, merch, referenced videos)">
              <textarea
                value={links}
                onChange={(e) => setLinks(e.target.value)}
                placeholder={"Instagram: https://instagram.com/you\nMerch: https://shop.example.com\nReferenced in video: https://youtu.be/..."}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
              />
            </Field>
            <Field label="Call-to-action">
              <input
                value={cta}
                onChange={(e) => setCta(e.target.value)}
                placeholder="👍 Like if this helped, 💬 drop your questions, 🔔 subscribe for weekly recipes."
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </Field>
            <Field label="Hashtags (3–5 recommended, comma or space separated)">
              <input
                value={hashtags}
                onChange={(e) => setHashtags(e.target.value)}
                placeholder="sourdough, baking, homecooking"
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </Field>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 lg:sticky lg:top-4 h-fit">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Preview</h2>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-semibold ${over ? "text-red-600" : "text-slate-500 dark:text-slate-400"}`}>
                  {charCount} / {MAX_CHARS}
                </span>
                <button
                  onClick={copy}
                  disabled={!description}
                  className="px-3 py-1.5 rounded bg-red-600 hover:bg-red-700 text-white text-sm flex items-center gap-2 disabled:opacity-50"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
            <pre className="whitespace-pre-wrap break-words text-sm text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 rounded-lg p-4 min-h-[400px] font-sans">
              {description || "Fill in the fields on the left to generate your YouTube description..."}
            </pre>
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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">{label}</label>
      {children}
    </div>
  );
}
