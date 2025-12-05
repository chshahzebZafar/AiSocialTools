"use client";

import { useState } from "react";
import { User, Copy, RefreshCw } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { ToolComments } from "@/components/ToolComments";
import { getSEOMetadata } from "@/lib/seo-metadata";
import ShareButtons from "@/components/ShareButtons";

export default function UsernameGeneratorPage() {
  const tool = getToolById("username-generator");
  const seo = tool ? getSEOMetadata(tool) : null;
  const [name, setName] = useState("");
  const [niche, setNiche] = useState("");
  const [generatedUsernames, setGeneratedUsernames] = useState<string[]>([]);

  const generateUsernames = () => {
    if (!name.trim()) {
      alert("Please enter your name or keyword");
      return;
    }

    const base = name.toLowerCase().replace(/\s+/g, "");
    const nicheBase = niche.toLowerCase().replace(/\s+/g, "");
    const numbers = ["", "123", "2024", "99", "01", "88", "2023"];
    const suffixes = ["", "official", "real", "the", "iam", "im", "its"];
    const prefixes = ["", "the", "iam", "im", "its", "official", "real"];
    const separators = ["", "_", ".", "-", ""];

    const usernames: string[] = [];

    // Base variations
    usernames.push(base);
    usernames.push(`${base}${nicheBase ? nicheBase : ""}`);
    usernames.push(`${nicheBase ? nicheBase : ""}${base}`);

    // With numbers
    numbers.forEach(num => {
      usernames.push(`${base}${num}`);
      usernames.push(`${num}${base}`);
    });

    // With separators
    separators.forEach(sep => {
      if (sep) {
        usernames.push(`${base}${sep}${nicheBase || "official"}`);
        usernames.push(`${nicheBase || "official"}${sep}${base}`);
      }
    });

    // With prefixes/suffixes
    prefixes.forEach(prefix => {
      if (prefix) {
        usernames.push(`${prefix}${base}`);
      }
    });

    suffixes.forEach(suffix => {
      if (suffix) {
        usernames.push(`${base}${suffix}`);
      }
    });

    // Creative combinations
    usernames.push(`get${base}`);
    usernames.push(`${base}life`);
    usernames.push(`${base}world`);
    usernames.push(`${base}hub`);
    usernames.push(`${base}daily`);

    // Remove duplicates and limit
    const unique = Array.from(new Set(usernames))
      .filter(u => u.length >= 3 && u.length <= 30)
      .slice(0, 30);

    setGeneratedUsernames(unique);
  };

  const copyUsername = (username: string) => {
    navigator.clipboard.writeText(username);
    alert(`Copied: ${username}`);
  };

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900">Username Generator - Generate Unique Social Media Usernames Free</h1>
            <p className="text-slate-600">Generate unique and available usernames for social media</p>
          </div>
        </div>
        <div className="mt-4">
          <ShareButtons
            title="Username Generator"
            text="Check out this free username generator tool!"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Name or Keyword
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., john, tech, fashion"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Niche or Category (Optional)
            </label>
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="e.g., tech, fashion, fitness"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            onClick={generateUsernames}
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Generate Usernames
          </button>
        </div>
      </div>

      {generatedUsernames.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Generated Usernames ({generatedUsernames.length})
            </h2>
            <ShareButtons
              title="Generated Usernames"
              text={`Check out these ${generatedUsernames.length} usernames I generated!`}
              resultText={generatedUsernames.join(", ")}
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {generatedUsernames.map((username, index) => (
              <button
                key={index}
                onClick={() => copyUsername(username)}
                className="p-3 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors flex items-center justify-between group"
              >
                <span className="truncate">{username}</span>
                <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ml-2 flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 bg-indigo-50 rounded-xl p-6 border border-indigo-200">
        <h3 className="font-semibold text-indigo-900 mb-2">💡 Username Tips</h3>
        <ul className="text-sm text-indigo-800 space-y-1">
          <li>• Keep it short and memorable (3-15 characters ideal)</li>
          <li>• Use your real name or brand name as a base</li>
          <li>• Add numbers or symbols if your preferred name is taken</li>
          <li>• Make it easy to spell and pronounce</li>
          <li>• Check availability across all platforms before committing</li>
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

