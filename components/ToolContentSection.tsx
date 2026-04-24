"use client";

import Link from "next/link";
import { SocialTool } from "@/lib/social-tools";
import { getToolContent } from "@/lib/tool-content";
import { CheckCircle2, Lightbulb, Target, TrendingUp, Users, Zap } from "lucide-react";

interface ToolContentSectionProps {
  tool: SocialTool;
  content?: {
    overview?: string;
    benefits?: string[];
    useCases?: string[];
    tips?: string[];
    features?: string[];
  };
}

export default function ToolContentSection({ tool, content }: ToolContentSectionProps) {
  // Priority order:
  //   1. `content` prop explicitly passed (legacy inline use, e.g. youtube-thumbnail)
  //   2. Lookup in lib/tool-content.ts (centralised per-tool SEO content)
  //   3. Don't render anything (no generic filler — that creates duplicate content across tools)
  const custom = content ?? getToolContent(tool.id);
  if (!custom) return null;

  const finalContent = {
    overview: custom.overview ?? "",
    benefits: custom.benefits ?? [],
    useCases: custom.useCases ?? [],
    features: custom.features ?? [],
    tips: custom.tips ?? [],
  };

  return (
    <div className="mt-12 space-y-8">
      {/* Overview Section */}
      <section className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          About {tool.name}
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          {finalContent.overview}
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-4">
          Looking for more tools? Explore our{" "}
          <Link href="/tools" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            complete collection of free social media tools
          </Link>
          {" "}or check out related tools below.
        </p>
      </section>

      {/* Benefits Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Key Benefits
          </h2>
        </div>
        <ul className="space-y-3">
          {finalContent.benefits?.map((benefit, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <span className="text-slate-700 dark:text-slate-300">{benefit}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Use Cases Section */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
        <div className="flex items-center gap-3 mb-4">
          <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Use Cases
          </h2>
        </div>
        <p className="text-slate-600 dark:text-slate-300 mb-4">
          {tool.name} is perfect for various scenarios and use cases:
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {finalContent.useCases?.map((useCase, index) => (
            <li key={index} className="flex items-start gap-3">
              <Target className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
              <span className="text-slate-700 dark:text-slate-300">{useCase}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Features
          </h2>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {finalContent.features?.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-slate-700 dark:text-slate-300">{feature}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Tips Section */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
        <div className="flex items-center gap-3 mb-4">
          <Lightbulb className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Pro Tips
          </h2>
        </div>
        <p className="text-slate-600 dark:text-slate-300 mb-4">
          Get the most out of {tool.name} with these expert tips:
        </p>
        <ul className="space-y-3">
          {finalContent.tips?.map((tip, index) => (
            <li key={index} className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <span className="text-slate-700 dark:text-slate-300">{tip}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Why Choose Section */}
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-6 h-6 text-slate-600 dark:text-slate-400" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Why Choose Our {tool.name}?
          </h2>
        </div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          What makes our {tool.name} different? It's not just another tool—it's your secret weapon for social media success. 
          We've spent countless hours perfecting every feature, testing every workflow, and listening to user feedback to create 
          something truly special. Unlike other tools that charge premium prices or limit your usage, we believe powerful social 
          media tools should be accessible to everyone. That's why we've built a platform that rivals paid alternatives—without 
          the price tag. From beginners taking their first steps in social media to seasoned professionals managing enterprise 
          accounts, our tool adapts to your needs and grows with you.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg">
            <Users className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Trusted by Thousands</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">Used by content creators worldwide</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg">
            <Zap className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Lightning Fast</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">Get results in seconds</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg">
            <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">100% Free</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">No hidden costs ever</p>
          </div>
        </div>
      </section>
    </div>
  );
}

