"use client";

import { useState } from "react";
import { Clock, TrendingUp } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { getSEOMetadata } from "@/lib/seo-metadata";
import ShareButtons from "@/components/ShareButtons";

export default function BestTimeCalculatorPage() {
  const tool = getToolById("best-time-calculator");
  const seo = tool ? getSEOMetadata(tool) : null;
  const [platform, setPlatform] = useState("instagram");
  const [timezone, setTimezone] = useState("UTC");

  const bestTimes: Record<string, { times: string[]; description: string }> = {
    instagram: {
      times: ["11:00 AM - 1:00 PM", "7:00 PM - 9:00 PM"],
      description: "Best engagement during lunch breaks and evening hours"
    },
    twitter: {
      times: ["8:00 AM - 10:00 AM", "12:00 PM - 1:00 PM", "5:00 PM - 6:00 PM"],
      description: "Peak times during morning commute, lunch, and evening"
    },
    facebook: {
      times: ["9:00 AM - 11:00 AM", "1:00 PM - 3:00 PM", "7:00 PM - 9:00 PM"],
      description: "High engagement during work breaks and evening"
    },
    linkedin: {
      times: ["8:00 AM - 10:00 AM", "12:00 PM - 1:00 PM", "5:00 PM - 6:00 PM"],
      description: "Best during business hours and commute times"
    },
    tiktok: {
      times: ["6:00 PM - 10:00 PM", "9:00 AM - 11:00 AM"],
      description: "Peak engagement in evening and morning"
    },
    youtube: {
      times: ["2:00 PM - 4:00 PM", "8:00 PM - 11:00 PM"],
      description: "Best for longer content viewing sessions"
    }
  };

  const currentData = bestTimes[platform] || bestTimes.instagram;

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900">Best Time to Post Calculator - Find Optimal Posting Times Free</h1>
            <p className="text-slate-600">Find the best times to post on Instagram, Twitter, Facebook, LinkedIn, and TikTok. Free posting time calculator with platform-specific recommendations. Maximize engagement.</p>
          </div>
        </div>
        <div className="mt-4">
          <ShareButtons
            title="Best Time to Post Calculator"
            text="Check out this free posting time calculator tool!"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Platform
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 mb-4"
            >
              <option value="instagram">Instagram</option>
              <option value="twitter">Twitter/X</option>
              <option value="facebook">Facebook</option>
              <option value="linkedin">LinkedIn</option>
              <option value="tiktok">TikTok</option>
              <option value="youtube">YouTube</option>
            </select>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Timezone
            </label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="UTC">UTC</option>
              <option value="EST">EST (UTC-5)</option>
              <option value="PST">PST (UTC-8)</option>
              <option value="GMT">GMT (UTC+0)</option>
              <option value="CET">CET (UTC+1)</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-orange-600" />
            <h2 className="text-lg font-semibold text-slate-900">Best Posting Times</h2>
          </div>
          <div className="space-y-4">
            {currentData.times.map((time, index) => (
              <div key={index} className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <span className="font-semibold text-orange-900">{time}</span>
                </div>
                <span className="text-sm text-orange-700">({timezone})</span>
              </div>
            ))}
            <p className="text-sm text-slate-600 mt-4">{currentData.description}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-orange-50 rounded-xl p-6 border border-orange-200">
        <h3 className="font-semibold text-orange-900 mb-2">💡 Tips for Optimal Posting</h3>
        <ul className="text-sm text-orange-800 space-y-1">
          <li>• Post consistently at the same times to build audience expectations</li>
          <li>• Test different times and analyze your own engagement data</li>
          <li>• Consider your specific audience's timezone and habits</li>
          <li>• Weekdays generally perform better than weekends</li>
          <li>• Use analytics to find your personal best posting times</li>
        </ul>
      </div>

      {tool && <ToolFAQ tool={tool} />}
      {tool && <RelatedTools currentTool={tool} />}
      {tool && <ToolDetailsSection tool={tool} />}
    </div>
    </>
  );
}

