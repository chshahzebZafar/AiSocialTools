"use client";

import Link from "next/link";
import { SocialTool, getToolsByCategory } from "@/lib/social-tools";
import { ArrowRight } from "lucide-react";

interface RelatedToolsProps {
  currentTool: SocialTool;
  limit?: number;
}

export default function RelatedTools({ currentTool, limit = 4 }: RelatedToolsProps) {
  const relatedTools = getToolsByCategory(currentTool.category)
    .filter(tool => tool.id !== currentTool.id)
    .slice(0, limit);

  if (relatedTools.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Related Tools</h2>
        <Link
          href="/tools"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
        >
          View All Tools
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {relatedTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.id}
              href={tool.path}
              className="bg-slate-50 rounded-lg p-4 hover:bg-slate-100 transition-colors border border-slate-200 group"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2">{tool.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

