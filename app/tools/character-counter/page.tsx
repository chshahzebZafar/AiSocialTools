"use client";

import { useState, useEffect } from "react";
import { Type, Copy } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { getSEOMetadata } from "@/lib/seo-metadata";
import ShareButtons from "@/components/ShareButtons";

interface PlatformLimit {
  name: string;
  limit: number;
  description: string;
}

const platformLimits: PlatformLimit[] = [
  { name: "Twitter/X", limit: 280, description: "Character limit for tweets" },
  { name: "Instagram Caption", limit: 2200, description: "Maximum caption length" },
  { name: "Facebook Post", limit: 63206, description: "Maximum post length" },
  { name: "LinkedIn Post", limit: 3000, description: "Maximum post length" },
  { name: "TikTok Caption", limit: 2200, description: "Maximum caption length" },
  { name: "YouTube Title", limit: 100, description: "Maximum title length" },
  { name: "YouTube Description", limit: 5000, description: "Maximum description length" },
  { name: "Pinterest Description", limit: 500, description: "Maximum description length" },
  { name: "Reddit Post", limit: 40000, description: "Maximum post length" },
];

export default function CharacterCounterPage() {
  const tool = getToolById("character-counter");
  const seo = tool ? getSEOMetadata(tool) : null;
  const [text, setText] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("Twitter/X");

  const currentLimit = platformLimits.find(p => p.name === selectedPlatform)?.limit || 280;
  const characterCount = text.length;
  const remaining = currentLimit - characterCount;
  const percentage = (characterCount / currentLimit) * 100;

  const getStatusColor = () => {
    if (percentage >= 90) return "text-red-600";
    if (percentage >= 75) return "text-yellow-600";
    return "text-green-600";
  };

  const getProgressColor = () => {
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
            <Type className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900">Social Media Character Counter - Count Characters for All Platforms Free</h1>
            <p className="text-slate-600">Count characters for Twitter, Instagram, Facebook, LinkedIn, and more. Free social media character counter with platform limits. Track character count in real-time.</p>
          </div>
        </div>
        <div className="mt-4">
          <ShareButtons
            title="Social Media Character Counter"
            text="Check out this free character counter tool!"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Select Platform
            </label>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
            >
              {platformLimits.map((platform) => (
                <option key={platform.name} value={platform.name}>
                  {platform.name} ({platform.limit} chars)
                </option>
              ))}
            </select>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Your Text
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here..."
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              rows={10}
            />

            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-2xl font-bold ${getStatusColor()}`}>
                  {characterCount} / {currentLimit}
                </span>
                <span className={`text-sm font-medium ${getStatusColor()}`}>
                  {remaining >= 0 ? `${remaining} remaining` : `${Math.abs(remaining)} over`}
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${getProgressColor()}`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Platform Limits</h3>
            <div className="space-y-3">
              {platformLimits.map((platform) => (
                <button
                  key={platform.name}
                  onClick={() => setSelectedPlatform(platform.name)}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                    selectedPlatform === platform.name
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="font-medium text-slate-900">{platform.name}</div>
                  <div className="text-sm text-slate-600">{platform.limit.toLocaleString()} chars</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Text Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Words:</span>
                <span className="font-medium">{text.trim() ? text.trim().split(/\s+/).length : 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Sentences:</span>
                <span className="font-medium">{text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Paragraphs:</span>
                <span className="font-medium">{text.trim() ? text.split(/\n\n/).filter(p => p.trim()).length : 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {tool && <ToolFAQ tool={tool} />}
      {tool && <RelatedTools currentTool={tool} />}
      {tool && <ToolDetailsSection tool={tool} />}
    </div>
    </>
  );
}

