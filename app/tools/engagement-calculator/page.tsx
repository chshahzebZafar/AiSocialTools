"use client";

import { useState } from "react";
import { TrendingUp, BarChart3 } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolHero from "@/components/ToolHero";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { ToolComments } from "@/components/ToolComments";
import { getSEOMetadata } from "@/lib/seo-metadata";
import ShareButtons from "@/components/ShareButtons";

export default function EngagementCalculatorPage() {
  const tool = getToolById("engagement-calculator");
  const seo = tool ? getSEOMetadata(tool) : null;
  const [followers, setFollowers] = useState("");
  const [likes, setLikes] = useState("");
  const [comments, setComments] = useState("");
  const [shares, setShares] = useState("");
  const [saves, setSaves] = useState("");
  const [views, setViews] = useState("");

  const calculateMetrics = () => {
    const f = parseFloat(followers) || 0;
    const l = parseFloat(likes) || 0;
    const c = parseFloat(comments) || 0;
    const s = parseFloat(shares) || 0;
    const sv = parseFloat(saves) || 0;
    const v = parseFloat(views) || 0;

    const totalEngagements = l + c + s + sv;
    const engagementRate = f > 0 ? (totalEngagements / f) * 100 : 0;
    const reachRate = v > 0 ? (f / v) * 100 : 0;
    const avgEngagement = totalEngagements / (l > 0 || c > 0 || s > 0 || sv > 0 ? 1 : 0);
    const likeRate = f > 0 ? (l / f) * 100 : 0;
    const commentRate = f > 0 ? (c / f) * 100 : 0;
    const shareRate = f > 0 ? (s / f) * 100 : 0;
    const saveRate = f > 0 ? (sv / f) * 100 : 0;

    return {
      engagementRate: engagementRate.toFixed(2),
      reachRate: reachRate.toFixed(2),
      totalEngagements,
      avgEngagement: avgEngagement.toFixed(2),
      likeRate: likeRate.toFixed(2),
      commentRate: commentRate.toFixed(2),
      shareRate: shareRate.toFixed(2),
      saveRate: saveRate.toFixed(2),
    };
  };

  const metrics = calculateMetrics();

  const getEngagementColor = (rate: number) => {
    if (rate >= 3) return "text-green-600";
    if (rate >= 1) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <ToolHero
        toolId={tool?.id}
        icon={TrendingUp}
        iconGradient="from-emerald-500 to-green-600"
        title="Social Media Engagement Calculator - Calculate Engagement Rate Free"
        description="Calculate engagement rate, reach rate, and social media metrics. Free engagement calculator for Instagram, Twitter, Facebook. Analyze your social media performance instantly."
        shareTitle="Social Media Engagement Calculator"
        shareText="Check out this free engagement calculator tool!"
      />
      <div className="p-8 max-w-6xl mx-auto">
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
                  value={followers}
                  onChange={(e) => setFollowers(e.target.value)}
                  placeholder="10000"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Likes
                </label>
                <input
                  type="number"
                  value={likes}
                  onChange={(e) => setLikes(e.target.value)}
                  placeholder="500"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Comments
                </label>
                <input
                  type="number"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="50"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Shares
                </label>
                <input
                  type="number"
                  value={shares}
                  onChange={(e) => setShares(e.target.value)}
                  placeholder="20"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Saves
                </label>
                <input
                  type="number"
                  value={saves}
                  onChange={(e) => setSaves(e.target.value)}
                  placeholder="30"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Views (Optional)
                </label>
                <input
                  type="number"
                  value={views}
                  onChange={(e) => setViews(e.target.value)}
                  placeholder="5000"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-600" />
                Calculated Metrics
              </h2>
              {(followers || likes || comments || shares || saves) && (
                <ShareButtons
                  title="Engagement Calculator Results"
                  text={`My engagement rate: ${metrics.engagementRate}% | Total engagements: ${metrics.totalEngagements}`}
                />
              )}
            </div>
            <div className="space-y-4">
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <p className="text-sm text-green-700 mb-1">Engagement Rate</p>
                <p className={`text-2xl font-bold ${getEngagementColor(parseFloat(metrics.engagementRate))}`}>
                  {metrics.engagementRate}%
                </p>
                <p className="text-xs text-green-600 mt-1">
                  {parseFloat(metrics.engagementRate) >= 3 ? "Excellent" : parseFloat(metrics.engagementRate) >= 1 ? "Good" : "Needs Improvement"}
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-blue-700 mb-1">Total Engagements</p>
                <p className="text-2xl font-bold text-blue-900">
                  {metrics.totalEngagements.toLocaleString()}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                  <p className="text-xs text-purple-700 mb-1">Like Rate</p>
                  <p className="text-lg font-bold text-purple-900">{metrics.likeRate}%</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                  <p className="text-xs text-orange-700 mb-1">Comment Rate</p>
                  <p className="text-lg font-bold text-orange-900">{metrics.commentRate}%</p>
                </div>
                <div className="bg-pink-50 rounded-lg p-3 border border-pink-200">
                  <p className="text-xs text-pink-700 mb-1">Share Rate</p>
                  <p className="text-lg font-bold text-pink-900">{metrics.shareRate}%</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-200">
                  <p className="text-xs text-indigo-700 mb-1">Save Rate</p>
                  <p className="text-lg font-bold text-indigo-900">{metrics.saveRate}%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <h3 className="font-semibold text-green-900 mb-2">💡 Engagement Benchmarks</h3>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Excellent: 3%+ engagement rate</li>
              <li>• Good: 1-3% engagement rate</li>
              <li>• Average: 0.5-1% engagement rate</li>
              <li>• Needs Improvement: &lt;0.5% engagement rate</li>
            </ul>
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

