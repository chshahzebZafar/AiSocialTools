"use client";

import { useState } from "react";
import { PenTool, Copy, RefreshCw, Check } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolHero from "@/components/ToolHero";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { ToolComments } from "@/components/ToolComments";
import ShareButtons from "@/components/ShareButtons";

// Snapchat bio limit is 80 characters. {n} = optional name token.
const BIO_LIMIT = 80;

type Vibe = "aesthetic" | "funny" | "baddie" | "simple" | "cute" | "savage";

const VIBES: { id: Vibe; label: string; emoji: string }[] = [
  { id: "aesthetic", label: "Aesthetic", emoji: "🌸" },
  { id: "funny", label: "Funny", emoji: "😂" },
  { id: "baddie", label: "Baddie", emoji: "💅" },
  { id: "cute", label: "Cute", emoji: "🧸" },
  { id: "savage", label: "Savage", emoji: "🔥" },
  { id: "simple", label: "Simple", emoji: "✨" },
];

const TEMPLATES: Record<Vibe, string[]> = {
  aesthetic: [
    "🌸 living softly, dreaming loudly",
    "✨ collecting sunsets & good vibes",
    "🤍 making memories, not excuses",
    "🌿 here for the little moments",
    "☁️ daydreamer with a camera roll full of skies",
    "🪐 lost in my own little galaxy",
    "📷 capturing what words can't say",
    "🌙 soft heart, loud playlist",
  ],
  funny: [
    "😂 professional overthinker, part-time napper",
    "🤡 i put the 'pro' in procrastinate",
    "🍕 powered by snacks & bad decisions",
    "😎 not lazy, just on energy-saving mode",
    "🙃 here for the snaps, staying for the chaos",
    "🤓 my hobbies include eating & avoiding people",
    "👻 i'd agree with you but then we'd both be wrong",
    "😴 running on coffee & zero sleep",
  ],
  baddie: [
    "💅 main character energy only",
    "🔥 she believed she could, so she did",
    "👑 classy with a hint of bad-girl",
    "💋 your favorite's favorite",
    "✨ expensive taste, free spirit",
    "😏 too glam to give a damn",
    "🖤 soft but make it iconic",
    "💎 building an empire in heels",
  ],
  cute: [
    "🧸 just a soft soul in a loud world",
    "🍓 sweet like strawberries 🍓",
    "🌷 spreading kindness one snap at a time",
    "🐣 small but mighty 🤍",
    "🍰 made of sugar, spice & wifi",
    "🌈 your daily dose of serotonin",
    "🐻 cuddles, snacks & golden hours",
    "💗 here to make you smile",
  ],
  savage: [
    "🔥 do it for the plot",
    "😤 i don't chase, i attract",
    "🖤 silence is my answer to the fake",
    "⚡ less talk, more action",
    "💀 i'm not mean, i'm just honest",
    "🥷 making moves in silence",
    "🐍 trust issues with a smile",
    "🔪 sharp mind, soft heart",
  ],
  simple: [
    "✨ just here vibing",
    "📸 snap me anytime",
    "🤍 good vibes only",
    "🌎 wherever life takes me",
    "☕ coffee. music. repeat.",
    "🎧 add me, let's talk",
    "🙂 keeping it real",
    "🌟 living my best life",
  ],
};

const NAME_HOOKS = [
  (n: string) => `${n} ✨`,
  (n: string) => `it's ${n} 🤍`,
  (n: string) => `${n} | `,
];

const personalize = (bio: string, name: string): string => {
  const n = name.trim();
  if (!n) return bio;
  // Prepend a small name hook if it still fits under the limit.
  const hook = NAME_HOOKS[Math.floor(Math.random() * NAME_HOOKS.length)](n);
  const combined = `${hook}${bio}`;
  return combined.length <= BIO_LIMIT ? combined : bio;
};

export default function SnapchatBioGeneratorPage() {
  const tool = getToolById("snapchat-bio-generator");
  const [name, setName] = useState("");
  const [vibe, setVibe] = useState<Vibe>("aesthetic");
  const [results, setResults] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const generate = () => {
    const pool = [...TEMPLATES[vibe]];
    const shuffled = pool
      .sort(() => Math.random() - 0.5)
      .map((b) => personalize(b, name))
      .filter((b) => b.length <= BIO_LIMIT)
      .slice(0, 6);
    setResults(shuffled);
  };

  const copy = async (b: string) => {
    await navigator.clipboard.writeText(b);
    setCopied(b);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <ToolHero
        toolId={tool?.id}
        icon={PenTool}
        iconGradient="from-yellow-400 to-amber-500"
        title="Snapchat Bio Generator — Free Bios With Emojis"
        description="Generate catchy Snapchat bios in seconds. Pick a vibe — aesthetic, funny, baddie, cute, savage or simple — and get ready-to-paste bios that fit Snapchat's 80-character limit."
        shareTitle="Snapchat Bio Generator"
        shareText="Free Snapchat bio generator with aesthetic, funny & baddie vibes."
      />
      <div className="p-8 max-w-4xl mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Your name (optional)</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generate()}
              placeholder="e.g. Emma"
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Pick a vibe</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {VIBES.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setVibe(v.id)}
                  className={`px-2 py-2.5 rounded-lg text-sm font-medium border transition ${
                    vibe === v.id
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-slate-50 dark:bg-slate-900/40 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  <span className="mr-1">{v.emoji}</span>
                  {v.label}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={generate}
            className="w-full bg-slate-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-700 transition flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" /> Generate Snapchat bios
          </button>
        </div>

        {results.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {results.length} bio ideas
              </h2>
              <ShareButtons title="Snapchat Bios" text={`Generated ${results.length} Snapchat bio ideas!`} resultText={results.join("\n")} />
            </div>
            <div className="space-y-2">
              {results.map((b) => (
                <button
                  key={b}
                  onClick={() => copy(b)}
                  className="w-full text-left p-3 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 transition flex items-center justify-between gap-3"
                >
                  <span className="flex-1">{b}</span>
                  <span className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-slate-400">{b.length}/{BIO_LIMIT}</span>
                    {copied === b ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 opacity-50" />}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 text-sm text-slate-700 dark:text-slate-300">
          <p className="font-semibold mb-2 text-slate-900 dark:text-slate-100">Snapchat bio tips</p>
          <ul className="space-y-1">
            <li>&bull; Snapchat bios are limited to <strong>80 characters</strong> — every idea here fits.</li>
            <li>&bull; Add your bio in the app: Profile → tap your name → Bio.</li>
            <li>&bull; Emojis count as 1–2 characters each but always render in your bio.</li>
            <li>&bull; You can edit your bio anytime — try a new vibe each season.</li>
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
