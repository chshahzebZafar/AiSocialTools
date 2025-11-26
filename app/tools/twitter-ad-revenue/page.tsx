"use client";

import { useState } from "react";
import { DollarSign, TrendingUp } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { getSEOMetadata } from "@/lib/seo-metadata";
import ShareButtons from "@/components/ShareButtons";

export default function TwitterAdRevenuePage() {
  const tool = getToolById("twitter-ad-revenue");
  const seo = tool ? getSEOMetadata(tool) : null;
  const [formData, setFormData] = useState({
    followers: "",
    avgEngagement: "",
    postFrequency: "",
    cpm: "5", // Cost per mille (impressions)
  });

  const calculateRevenue = () => {
    const followers = parseInt(formData.followers) || 0;
    const engagement = parseFloat(formData.avgEngagement) || 0;
    const frequency = parseInt(formData.postFrequency) || 0;
    const cpm = parseFloat(formData.cpm) || 5;

    // Estimated impressions (followers * engagement rate)
    const impressionsPerPost = followers * (engagement / 100);
    const monthlyImpressions = impressionsPerPost * frequency;
    
    // Revenue calculation (CPM / 1000 * impressions)
    const monthlyRevenue = (cpm / 1000) * monthlyImpressions;
    const yearlyRevenue = monthlyRevenue * 12;

    return {
      monthlyImpressions: Math.round(monthlyImpressions),
      monthlyRevenue: monthlyRevenue.toFixed(2),
      yearlyRevenue: yearlyRevenue.toFixed(2),
      impressionsPerPost: Math.round(impressionsPerPost),
    };
  };

  const results = calculateRevenue();

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900">Twitter Ad Revenue Calculator - Calculate Twitter/X Ad Revenue Free</h1>
            <p className="text-slate-600">Calculate potential Twitter ad revenue based on followers, engagement, and CPM. Free Twitter ad revenue calculator. Estimate earnings from Twitter monetization.</p>
          </div>
        </div>
        <div className="mt-4">
          <ShareButtons
            title="Twitter Ad Revenue Calculator"
            text="Check out this free Twitter ad revenue calculator tool!"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Number of Followers
            </label>
            <input
              type="number"
              value={formData.followers}
              onChange={(e) => setFormData({ ...formData, followers: e.target.value })}
              placeholder="10000"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Average Engagement Rate (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.avgEngagement}
              onChange={(e) => setFormData({ ...formData, avgEngagement: e.target.value })}
              placeholder="2.5"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-slate-500 mt-1">
              Typical range: 1-5% for most accounts
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Posts Per Month
            </label>
            <input
              type="number"
              value={formData.postFrequency}
              onChange={(e) => setFormData({ ...formData, postFrequency: e.target.value })}
              placeholder="30"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              CPM Rate ($)
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.cpm}
              onChange={(e) => setFormData({ ...formData, cpm: e.target.value })}
              placeholder="5.00"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-slate-500 mt-1">
              Cost per 1,000 impressions (typical range: $2-$10)
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Estimated Revenue
          </h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-sm text-blue-700 mb-1">Impressions Per Post</p>
              <p className="text-2xl font-bold text-blue-900">
                {results.impressionsPerPost.toLocaleString()}
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-sm text-green-700 mb-1">Monthly Impressions</p>
              <p className="text-2xl font-bold text-green-900">
                {results.monthlyImpressions.toLocaleString()}
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <p className="text-sm text-purple-700 mb-1">Estimated Monthly Revenue</p>
              <p className="text-2xl font-bold text-purple-900">
                ${results.monthlyRevenue}
              </p>
            </div>

            <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
              <p className="text-sm text-indigo-700 mb-1">Estimated Yearly Revenue</p>
              <p className="text-2xl font-bold text-indigo-900">
                ${results.yearlyRevenue}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">💡 Revenue Factors</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Revenue estimates are based on CPM (Cost Per Mille) advertising model</li>
          <li>• Actual revenue varies based on niche, audience quality, and ad placement</li>
          <li>• Twitter/X revenue sharing programs have specific eligibility requirements</li>
          <li>• Engagement rate significantly impacts potential earnings</li>
          <li>• These are estimates only - actual revenue may vary</li>
        </ul>
      </div>

      {tool && <ToolFAQ tool={tool} />}
      {tool && <RelatedTools currentTool={tool} />}
      {tool && <ToolDetailsSection tool={tool} />}
    </div>
    </>
  );
}

