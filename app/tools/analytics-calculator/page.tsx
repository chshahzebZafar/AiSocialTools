"use client";

import { useState } from "react";
import { BarChart3, TrendingUp } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { ToolComments } from "@/components/ToolComments";
import { getSEOMetadata } from "@/lib/seo-metadata";
import ShareButtons from "@/components/ShareButtons";
import { FavoriteButton } from "@/components/FavoriteButton";

export default function AnalyticsCalculatorPage() {
  const tool = getToolById("analytics-calculator");
  const seo = tool ? getSEOMetadata(tool) : null;
  const [metrics, setMetrics] = useState({
    followers: "",
    impressions: "",
    reach: "",
    clicks: "",
    conversions: "",
    revenue: ""
  });

  const calculateMetrics = () => {
    const f = parseFloat(metrics.followers) || 0;
    const imp = parseFloat(metrics.impressions) || 0;
    const r = parseFloat(metrics.reach) || 0;
    const c = parseFloat(metrics.clicks) || 0;
    const conv = parseFloat(metrics.conversions) || 0;
    const rev = parseFloat(metrics.revenue) || 0;

    const engagementRate = f > 0 ? (imp / f) * 100 : 0;
    const reachRate = imp > 0 ? (r / imp) * 100 : 0;
    const ctr = imp > 0 ? (c / imp) * 100 : 0;
    const conversionRate = c > 0 ? (conv / c) * 100 : 0;
    const cpc = c > 0 ? rev / c : 0;
    const cpa = conv > 0 ? rev / conv : 0;
    const roas = rev > 0 ? (rev / (rev * 0.1)) * 100 : 0; // Assuming 10% ad spend

    return {
      engagementRate: engagementRate.toFixed(2),
      reachRate: reachRate.toFixed(2),
      ctr: ctr.toFixed(2),
      conversionRate: conversionRate.toFixed(2),
      cpc: cpc.toFixed(2),
      cpa: cpa.toFixed(2),
      roas: roas.toFixed(2)
    };
  };

  const calculated = calculateMetrics();

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900">Social Media Analytics Calculator - Calculate KPIs & Metrics Free</h1>
            <p className="text-slate-600">Calculate social media KPIs including CTR, conversion rate, CPC, CPA, and ROAS. Free analytics calculator for Instagram, Twitter, Facebook. Analyze your social media performance.</p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3 flex-wrap">
          {tool && <FavoriteButton toolId={tool.id} />}
          <ShareButtons
            title="Social Media Analytics Calculator"
            text="Check out this free analytics calculator tool!"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Input Metrics</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Followers
                </label>
                <input
                  type="number"
                  value={metrics.followers}
                  onChange={(e) => setMetrics({ ...metrics, followers: e.target.value })}
                  placeholder="10000"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Impressions
                </label>
                <input
                  type="number"
                  value={metrics.impressions}
                  onChange={(e) => setMetrics({ ...metrics, impressions: e.target.value })}
                  placeholder="50000"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Reach
                </label>
                <input
                  type="number"
                  value={metrics.reach}
                  onChange={(e) => setMetrics({ ...metrics, reach: e.target.value })}
                  placeholder="30000"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Clicks
                </label>
                <input
                  type="number"
                  value={metrics.clicks}
                  onChange={(e) => setMetrics({ ...metrics, clicks: e.target.value })}
                  placeholder="500"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Conversions
                </label>
                <input
                  type="number"
                  value={metrics.conversions}
                  onChange={(e) => setMetrics({ ...metrics, conversions: e.target.value })}
                  placeholder="50"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Revenue ($)
                </label>
                <input
                  type="number"
                  value={metrics.revenue}
                  onChange={(e) => setMetrics({ ...metrics, revenue: e.target.value })}
                  placeholder="1000"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-semibold text-slate-900">Calculated KPIs</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                <p className="text-sm text-indigo-700 mb-1">Engagement Rate</p>
                <p className="text-2xl font-bold text-indigo-900">{calculated.engagementRate}%</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-blue-700 mb-1">Reach Rate</p>
                <p className="text-2xl font-bold text-blue-900">{calculated.reachRate}%</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <p className="text-sm text-purple-700 mb-1">Click-Through Rate (CTR)</p>
                <p className="text-2xl font-bold text-purple-900">{calculated.ctr}%</p>
              </div>
              <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
                <p className="text-sm text-pink-700 mb-1">Conversion Rate</p>
                <p className="text-2xl font-bold text-pink-900">{calculated.conversionRate}%</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <p className="text-sm text-green-700 mb-1">Cost Per Click (CPC)</p>
                <p className="text-2xl font-bold text-green-900">${calculated.cpc}</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <p className="text-sm text-orange-700 mb-1">Cost Per Acquisition (CPA)</p>
                <p className="text-2xl font-bold text-orange-900">${calculated.cpa}</p>
              </div>
              <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                <p className="text-sm text-teal-700 mb-1">Return on Ad Spend (ROAS)</p>
                <p className="text-2xl font-bold text-teal-900">{calculated.roas}%</p>
              </div>
            </div>
          </div>
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

