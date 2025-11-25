"use client";

import { useState } from "react";
import { Smile, Copy, Search } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { getSEOMetadata } from "@/lib/seo-metadata";

const emojiCategories = {
  "Smileys & People": ["😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "😚", "😙", "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔"],
  "Animals & Nature": ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐽", "🐸", "🐵", "🙈", "🙉", "🙊", "🐒", "🐔", "🐧", "🐦", "🐤", "🐣", "🐥", "🦆", "🦅", "🦉", "🦇"],
  "Food & Drink": ["🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🍈", "🍒", "🍑", "🥭", "🍍", "🥥", "🥝", "🍅", "🍆", "🥑", "🥦", "🥬", "🥒", "🌶", "🌽", "🥕", "🥔", "🍠", "🥐", "🥯", "🍞"],
  "Travel & Places": ["🚗", "🚕", "🚙", "🚌", "🚎", "🏎", "🚓", "🚑", "🚒", "🚐", "🚚", "🚛", "🚜", "🛴", "🚲", "🛵", "🏍", "🚨", "🚔", "🚍", "🚘", "🚖", "🚡", "🚠", "🚟", "🚃", "🚋", "🚞", "🚝", "🚄"],
  "Activities": ["⚽", "🏀", "🏈", "⚾", "🎾", "🏐", "🏉", "🎱", "🏓", "🏸", "🥅", "🏒", "🏑", "🏏", "⛳", "🏹", "🎣", "🥊", "🥋", "🎽", "⛸", "🥌", "🛷", "🎿", "⛷", "🏂", "🏋️", "🤼", "🤸", "🤺"],
  "Objects": ["⌚", "📱", "📲", "💻", "⌨️", "🖥", "🖨", "🖱", "🖲", "🕹", "🗜", "💾", "💿", "📀", "📼", "📷", "📸", "📹", "🎥", "📽", "🎞", "📞", "☎️", "📟", "📠", "📺", "📻", "🎙", "🎚", "🎛"],
  "Symbols": ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "☮️", "✝️", "☪️", "🕉", "☸️", "✡️", "🔯", "🕎", "☯️", "☦️", "🛐"],
  "Flags": ["🏳️", "🏴", "🏁", "🚩", "🏳️‍🌈", "🇦🇫", "🇦🇽", "🇦🇱", "🇩🇿", "🇦🇸", "🇦🇩", "🇦🇴", "🇦🇮", "🇦🇶", "🇦🇬", "🇦🇷", "🇦🇲", "🇦🇼", "🇦🇺", "🇦🇹", "🇦🇿", "🇧🇸", "🇧🇭", "🇧🇩", "🇧🇧", "🇧🇾", "🇧🇪", "🇧🇿", "🇧🇯", "🇧🇲"],
};

export default function EmojiPickerPage() {
  const tool = getToolById("emoji-picker");
  const seo = tool ? getSEOMetadata(tool) : null;
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>(Object.keys(emojiCategories)[0]);

  const filteredEmojis = Object.entries(emojiCategories).reduce((acc, [category, emojis]) => {
    if (searchTerm) {
      const filtered = emojis.filter(emoji => 
        emoji.includes(searchTerm) || category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filtered.length > 0) {
        acc[category] = filtered;
      }
    } else {
      acc[category] = emojis;
    }
    return acc;
  }, {} as Record<string, string[]>);

  const addEmoji = (emoji: string) => {
    setSelectedEmojis([...selectedEmojis, emoji]);
  };

  const removeEmoji = (index: number) => {
    setSelectedEmojis(selectedEmojis.filter((_, i) => i !== index));
  };

  const copyEmojis = () => {
    navigator.clipboard.writeText(selectedEmojis.join(" "));
    alert("Emojis copied to clipboard!");
  };

  const clearAll = () => {
    setSelectedEmojis([]);
  };

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
            <Smile className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Emoji Picker & Generator - Copy Emojis for Social Media Free</h1>
            <p className="text-slate-600">Browse and copy emojis for Instagram, Twitter, Facebook posts. Free emoji picker with categories. Find the perfect emoji for your social media content.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search emojis..."
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {Object.keys(emojiCategories).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? "bg-yellow-500 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-8 gap-2 max-h-96 overflow-y-auto p-2">
              {(searchTerm ? Object.values(filteredEmojis).flat() : emojiCategories[activeCategory as keyof typeof emojiCategories] || []).map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => addEmoji(emoji)}
                  className="text-2xl p-2 hover:bg-yellow-50 rounded-lg transition-colors"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Selected ({selectedEmojis.length})
            </h2>
            <div className="flex gap-2">
              <button
                onClick={copyEmojis}
                disabled={selectedEmojis.length === 0}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
                title="Copy"
              >
                <Copy className="w-5 h-5" />
              </button>
              <button
                onClick={clearAll}
                disabled={selectedEmojis.length === 0}
                className="px-3 py-1 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
              >
                Clear
              </button>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-4 min-h-[200px] max-h-96 overflow-y-auto">
            {selectedEmojis.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {selectedEmojis.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => removeEmoji(index)}
                    className="text-2xl p-1 hover:bg-red-50 rounded transition-colors"
                    title="Click to remove"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-center py-8">No emojis selected</p>
            )}
          </div>
          {selectedEmojis.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="text-xs text-slate-500 mb-2">Text Output:</p>
              <div className="bg-slate-50 rounded p-2 text-sm break-all">
                {selectedEmojis.join(" ")}
              </div>
            </div>
          )}
        </div>
      </div>

      {tool && <ToolFAQ tool={tool} />}
      {tool && <RelatedTools currentTool={tool} />}
      {tool && <ToolDetailsSection tool={tool} />}
    </div>
    </>
  );
}

