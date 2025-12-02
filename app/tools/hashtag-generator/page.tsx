"use client";

import { useState } from "react";
import { Hash, Copy, Download } from "lucide-react";
import Link from "next/link";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { getSEOMetadata } from "@/lib/seo-metadata";
import ShareButtons from "@/components/ShareButtons";
import { ToolComments } from "@/components/ToolComments";

export default function HashtagGeneratorPage() {
  const tool = getToolById("hashtag-generator");
  const seo = tool ? getSEOMetadata(tool) : null;
  const [keyword, setKeyword] = useState("");
  const [platform, setPlatform] = useState("instagram");
  const [generatedHashtags, setGeneratedHashtags] = useState<string[]>([]);

  const hashtagCategories: Record<string, string[]> = {
    business: ["#business", "#entrepreneur", "#startup", "#success", "#motivation", "#leadership", "#innovation"],
    fashion: ["#fashion", "#style", "#ootd", "#fashionista", "#trendy", "#outfit", "#fashionblogger"],
    food: ["#food", "#foodie", "#delicious", "#yummy", "#foodporn", "#instafood", "#foodstagram"],
    travel: ["#travel", "#wanderlust", "#adventure", "#explore", "#travelgram", "#instatravel", "#vacation"],
    fitness: ["#fitness", "#workout", "#gym", "#health", "#fit", "#training", "#fitnessmotivation"],
    tech: ["#technology", "#tech", "#innovation", "#digital", "#ai", "#coding", "#software"],
    photography: ["#photography", "#photo", "#photooftheday", "#picoftheday", "#instagood", "#photographer"],
    art: ["#art", "#artist", "#creative", "#design", "#artwork", "#drawing", "#painting"],
  };

  const generateHashtags = () => {
    if (!keyword.trim()) {
      alert("Please enter a keyword");
      return;
    }

    const baseHashtags: string[] = [];
    const keywordLower = keyword.toLowerCase();
    
    // Add keyword variations
    baseHashtags.push(`#${keywordLower.replace(/\s+/g, "")}`);
    baseHashtags.push(`#${keywordLower.replace(/\s+/g, "_")}`);
    
    // Add related hashtags based on keyword matching
    for (const [category, tags] of Object.entries(hashtagCategories)) {
      if (keywordLower.includes(category) || category.includes(keywordLower)) {
        baseHashtags.push(...tags);
      }
    }

    // Add generic popular hashtags
    const popular = ["#love", "#instagood", "#photooftheday", "#beautiful", "#happy", "#follow", "#like4like"];
    baseHashtags.push(...popular.slice(0, 5));

    // Add trending variations
    const variations = [
      `#${keywordLower}`,
      `#${keywordLower}life`,
      `#${keywordLower}lover`,
      `#${keywordLower}addict`,
      `#${keywordLower}community`,
    ];
    baseHashtags.push(...variations);

    // Limit based on platform
    const limit = platform === "instagram" ? 30 : platform === "twitter" ? 3 : 10;
    const uniqueHashtags = Array.from(new Set(baseHashtags)).slice(0, limit);
    
    setGeneratedHashtags(uniqueHashtags);
  };

  const copyHashtags = () => {
    const text = generatedHashtags.join(" ");
    navigator.clipboard.writeText(text);
    alert("Hashtags copied to clipboard!");
  };

  const downloadHashtags = () => {
    const blob = new Blob([generatedHashtags.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "hashtags.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

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
            url: "https://socialmediatools.netlify.app/tools/hashtag-generator",
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
      <div className="p-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <Hash className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Free Hashtag Generator - Generate Trending Hashtags for Instagram, Twitter
              </h1>
              <p className="text-slate-600 dark:text-slate-300">
                Generate relevant and trending hashtags for Instagram, Twitter, TikTok, and LinkedIn. 
                Free hashtag generator with platform-specific suggestions. Boost your social media reach instantly.
                {" "}
                <Link href="/tools/tweet-generator" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                  Pair with our Tweet Generator
                </Link>
                {" "}or{" "}
                <Link href="/tools/content-ideas" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                  Content Ideas Generator
                </Link>
                {" "}for complete social media content creation.
              </p>
            </div>
          </div>
          <div className="mt-4">
            <ShareButtons
              title="Free Hashtag Generator"
              text="Check out this free hashtag generator tool!"
            />
          </div>
        </div>

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
              onChange={(e) => setPlatform(e.target.value)}
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
            className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            Generate Hashtags
          </button>
        </div>
      </div>

      {generatedHashtags.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Generated Hashtags ({generatedHashtags.length})
            </h2>
            <div className="flex gap-2">
              <button
                onClick={copyHashtags}
                className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                title="Copy all"
              >
                <Copy className="w-5 h-5" />
              </button>
              <button
                onClick={downloadHashtags}
                className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                title="Download"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
            <ShareButtons
              title="Generated Hashtags"
              text={`Check out these ${generatedHashtags.length} hashtags I generated!`}
              resultText={generatedHashtags.join(" ")}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {generatedHashtags.map((tag, index) => (
              <button
                key={index}
                onClick={() => {
                  navigator.clipboard.writeText(tag);
                  alert(`Copied: ${tag}`);
                }}
                className="px-3 py-1.5 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
        <h2 className="font-semibold text-purple-900 dark:text-purple-200 mb-2 text-lg">💡 Hashtag Tips</h2>
        <ul className="text-sm text-purple-800 dark:text-purple-300 space-y-1">
          <li>• Instagram: Use 5-10 relevant hashtags for best reach</li>
          <li>• Twitter: Limit to 1-2 hashtags per tweet</li>
          <li>• Mix popular and niche hashtags for better visibility</li>
          <li>• Research trending hashtags in your niche</li>
          <li>• Avoid banned or spam hashtags</li>
        </ul>
      </div>

      {tool && <ToolFAQ tool={tool} />}
      {tool && <RelatedTools currentTool={tool} />}
      {tool && <ToolDetailsSection tool={tool} />}
      {tool && <ToolComments toolId={tool.id} />}
    </div>
    </>
  );
}

