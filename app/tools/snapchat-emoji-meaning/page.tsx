"use client";

import { useState, useMemo } from "react";
import { Smile, Search } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolHero from "@/components/ToolHero";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { ToolComments } from "@/components/ToolComments";

// Accurate Snapchat friendship & trophy emoji meanings (2026).
const EMOJIS: { emoji: string; name: string; meaning: string; keywords: string }[] = [
  { emoji: "💛", name: "Yellow Heart", meaning: "#1 Best Friends. You send the most snaps to each other — and they send the most to you too. Keep snapping for two weeks to turn it red.", keywords: "best friend number one mutual gold" },
  { emoji: "❤️", name: "Red Heart", meaning: "#1 Best Friends for two weeks straight. You've each been the other's top snap friend for 14 days in a row.", keywords: "best friend two weeks love" },
  { emoji: "💕", name: "Pink Hearts", meaning: "#1 Best Friends for two months in a row. The strongest friendship badge on Snapchat — you've been each other's #1 for 2 months.", keywords: "two pink hearts best friend two months super" },
  { emoji: "😎", name: "Face With Sunglasses", meaning: "Mutual best friend. One of your best friends is also one of their best friends — you share a close mutual.", keywords: "sunglasses cool mutual best friend shared" },
  { emoji: "😬", name: "Grimacing Face", meaning: "You share a #1 best friend. Your #1 best friend is also their #1 best friend (a little awkward!).", keywords: "grimace teeth shared number one best friend" },
  { emoji: "😊", name: "Smiling Face", meaning: "One of your best friends. You send this person a lot of snaps, but they're not your #1.", keywords: "smile best friend regular" },
  { emoji: "😏", name: "Smirking Face", meaning: "You're one of their best friends, but they're not one of yours. They snap you a lot — you don't snap back as much.", keywords: "smirk one sided they snap you" },
  { emoji: "🔥", name: "Fire (Snapstreak)", meaning: "Snapstreak! You and this friend have snapped each other within 24 hours for several days in a row. The number next to it is how many days the streak has lasted.", keywords: "fire streak snapstreak days consecutive number" },
  { emoji: "💯", name: "Hundred / 100", meaning: "100-Day Snapstreak. You've kept a Snapstreak going for 100 days straight — a big milestone.", keywords: "hundred 100 streak milestone" },
  { emoji: "⌛", name: "Hourglass", meaning: "Your Snapstreak is about to end. Send this friend a snap soon (and have them snap back) to keep the streak alive.", keywords: "hourglass streak ending warning expire" },
  { emoji: "⭐", name: "Gold Star", meaning: "Someone has replayed this person's snaps in the past 24 hours — they posted something worth watching.", keywords: "star gold replay popular" },
  { emoji: "🎂", name: "Birthday Cake", meaning: "It's this friend's birthday today (shows when they've enabled the Birthday Party feature).", keywords: "cake birthday bday party" },
  { emoji: "👶", name: "Baby", meaning: "You just became friends with this person on Snapchat — a brand-new connection.", keywords: "baby new friend just added recently" },
];

export default function SnapchatEmojiMeaningPage() {
  const tool = getToolById("snapchat-emoji-meaning");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return EMOJIS;
    return EMOJIS.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.meaning.toLowerCase().includes(q) ||
        e.keywords.includes(q) ||
        e.emoji.includes(q)
    );
  }, [query]);

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <ToolHero
        toolId={tool?.id}
        icon={Smile}
        iconGradient="from-yellow-400 to-amber-500"
        title="Snapchat Emoji Meaning Finder — What Do the Emojis Mean?"
        description="Look up what every Snapchat friend emoji means — yellow heart, red heart, 😎, 😬, 🔥 Snapstreak, ⌛ hourglass and more. Search by emoji or keyword. Accurate 2026 reference."
        shareTitle="Snapchat Emoji Meaning Finder"
        shareText="What do Snapchat emojis mean? Full, accurate 2026 guide."
      />
      <div className="p-8 max-w-4xl mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Search emojis or meanings</label>
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. yellow heart, streak, hourglass, 🔥"
              className="w-full pl-11 pr-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filtered.map((e) => (
            <div
              key={e.name}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex gap-4"
            >
              <div className="text-3xl leading-none flex-shrink-0" aria-hidden>{e.emoji}</div>
              <div>
                <h2 className="font-semibold text-slate-900 dark:text-slate-100 text-sm mb-1">{e.name}</h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{e.meaning}</p>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-slate-500 dark:text-slate-400 py-10">
            No emoji matches &ldquo;{query}&rdquo;. Try &ldquo;heart&rdquo;, &ldquo;streak&rdquo;, or &ldquo;best friend&rdquo;.
          </p>
        )}

        <div className="mt-8 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 text-sm text-slate-700 dark:text-slate-300">
          <p className="font-semibold mb-2 text-slate-900 dark:text-slate-100">Good to know</p>
          <ul className="space-y-1">
            <li>&bull; Friend emojis are private — only you can see yours, and they update automatically.</li>
            <li>&bull; You can customize which emoji means what in Settings → Customize Emojis.</li>
            <li>&bull; The 🔥 streak number is the count of consecutive days you&apos;ve snapped each other.</li>
            <li>&bull; ⌛ means you have only a few hours left before a streak resets — snap fast!</li>
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
