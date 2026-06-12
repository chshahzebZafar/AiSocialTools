"use client";

import { useMemo, useState } from "react";
import { CaseSensitive, Copy, Check } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolHero from "@/components/ToolHero";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import ToolContentSection from "@/components/ToolContentSection";
import { ToolComments } from "@/components/ToolComments";

type MapFn = (text: string) => string;

function offsetMapper(upperA: number, lowerA: number, digitZero?: number): MapFn {
  return (text) =>
    [...text].map((ch) => {
      const code = ch.codePointAt(0);
      if (code === undefined) return ch;
      if (code >= 65 && code <= 90) return String.fromCodePoint(upperA + (code - 65));
      if (code >= 97 && code <= 122) return String.fromCodePoint(lowerA + (code - 97));
      if (digitZero !== undefined && code >= 48 && code <= 57) return String.fromCodePoint(digitZero + (code - 48));
      return ch;
    }).join("");
}

function tableMapper(upperTable: Record<string, string>, lowerTable: Record<string, string>): MapFn {
  return (text) =>
    [...text].map((ch) => upperTable[ch] ?? lowerTable[ch] ?? ch).join("");
}

const smallCapsTable: Record<string, string> = {
  a: "ᴀ", b: "ʙ", c: "ᴄ", d: "ᴅ", e: "ᴇ", f: "ꜰ", g: "ɢ", h: "ʜ", i: "ɪ", j: "ᴊ",
  k: "ᴋ", l: "ʟ", m: "ᴍ", n: "ɴ", o: "ᴏ", p: "ᴘ", q: "ǫ", r: "ʀ", s: "s", t: "ᴛ",
  u: "ᴜ", v: "ᴠ", w: "ᴡ", x: "x", y: "ʏ", z: "ᴢ",
};

const upsideDownTable: Record<string, string> = {
  a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ", i: "ᴉ", j: "ɾ",
  k: "ʞ", l: "ʃ", m: "ɯ", n: "u", o: "o", p: "d", q: "b", r: "ɹ", s: "s", t: "ʇ",
  u: "n", v: "ʌ", w: "ʍ", x: "x", y: "ʎ", z: "z", "?": "¿", "!": "¡", ".": "˙", ",": "‘",
  A: "∀", B: "𐐒", C: "Ͻ", D: "p", E: "Ǝ", F: "Ⅎ", G: "פ", H: "H", I: "I", J: "ſ",
  K: "ʞ", L: "˥", M: "W", N: "N", O: "O", P: "Ԁ", Q: "Q", R: "ɹ", S: "S", T: "┴",
  U: "∩", V: "Λ", W: "M", X: "X", Y: "⅄", Z: "Z",
};

const toStrikethrough: MapFn = (text) => [...text].map((c) => c + "\u0336").join("");
const toUnderline: MapFn = (text) => [...text].map((c) => c + "\u0332").join("");
const toWide: MapFn = (text) =>
  [...text].map((ch) => {
    const code = ch.codePointAt(0);
    if (code === undefined) return ch;
    if (code >= 33 && code <= 126) return String.fromCodePoint(0xFF00 + (code - 0x20));
    if (code === 32) return "\u3000";
    return ch;
  }).join("");

const FONTS: { key: string; label: string; transform: MapFn }[] = [
  { key: "bold", label: "Bold", transform: offsetMapper(0x1D400, 0x1D41A, 0x1D7CE) },
  { key: "italic", label: "Italic", transform: offsetMapper(0x1D434, 0x1D44E) },
  { key: "bold-italic", label: "Bold Italic", transform: offsetMapper(0x1D468, 0x1D482) },
  { key: "script", label: "Script", transform: offsetMapper(0x1D49C, 0x1D4B6) },
  { key: "bold-script", label: "Bold Script", transform: offsetMapper(0x1D4D0, 0x1D4EA) },
  { key: "fraktur", label: "Fraktur", transform: offsetMapper(0x1D504, 0x1D51E) },
  { key: "double-struck", label: "Double-struck", transform: offsetMapper(0x1D538, 0x1D552, 0x1D7D8) },
  { key: "bold-fraktur", label: "Bold Fraktur", transform: offsetMapper(0x1D56C, 0x1D586) },
  { key: "sans-serif", label: "Sans-serif", transform: offsetMapper(0x1D5A0, 0x1D5BA, 0x1D7E2) },
  { key: "sans-bold", label: "Sans-serif Bold", transform: offsetMapper(0x1D5D4, 0x1D5EE, 0x1D7EC) },
  { key: "sans-italic", label: "Sans-serif Italic", transform: offsetMapper(0x1D608, 0x1D622) },
  { key: "sans-bold-italic", label: "Sans-serif Bold Italic", transform: offsetMapper(0x1D63C, 0x1D656) },
  { key: "monospace", label: "Monospace", transform: offsetMapper(0x1D670, 0x1D68A, 0x1D7F6) },
  { key: "circled", label: "Circled", transform: offsetMapper(0x24B6, 0x24D0) },
  { key: "squared", label: "Squared", transform: offsetMapper(0x1F130, 0x1F130) },
  { key: "small-caps", label: "Small Caps", transform: tableMapper({}, smallCapsTable) },
  { key: "upside-down", label: "Upside Down", transform: (text) => [...text].reverse().map((c) => upsideDownTable[c] ?? c).join("") },
  { key: "wide", label: "Full-width", transform: toWide },
  { key: "strikethrough", label: "Strikethrough", transform: toStrikethrough },
  { key: "underline", label: "Underline", transform: toUnderline },
];

export default function InstagramFontsPage() {
  const tool = getToolById("instagram-fonts");
  const [text, setText] = useState("your text here");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const samples = useMemo(
    () => FONTS.map((f) => ({ key: f.key, label: f.label, output: f.transform(text) })),
    [text]
  );

  const copy = async (key: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <ToolHero
        toolId={tool?.id}
        icon={CaseSensitive}
        iconGradient="from-pink-500 to-purple-600"
        title="Instagram Font Generator — 20+ Free Stylish Fonts for Bio & Captions"
        description="Type once, see your text in 20+ stylish Instagram fonts — bold, italic, script, small caps, upside down, and more. One-click copy, works in bio, captions, and stories."
        shareTitle="Instagram Font Generator"
        shareText="Free Instagram fonts — 20+ styles, copy in one click."
      />
      <div className="p-8 max-w-4xl mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Your text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            placeholder="Type anything to see every style"
          />
        </div>

        <div className="space-y-2">
          {samples.map((s) => (
            <div key={s.key} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">{s.label}</p>
                <p className="text-lg text-slate-900 dark:text-slate-100 break-words">{s.output || "your text here"}</p>
              </div>
              <button
                onClick={() => copy(s.key, s.output)}
                disabled={!s.output}
                className="text-xs px-3 py-1.5 rounded border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-1 flex-shrink-0 disabled:opacity-50"
              >
                {copiedKey === s.key ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                {copiedKey === s.key ? "Copied" : "Copy"}
              </button>
            </div>
          ))}
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
