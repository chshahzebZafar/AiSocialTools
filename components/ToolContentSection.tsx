"use client";

import Link from "next/link";
import { SocialTool } from "@/lib/social-tools";
import { getToolContent } from "@/lib/tool-content";
import { Check, Lightbulb, Target, Zap, TrendingUp } from "lucide-react";

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

interface ListSectionProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  items: string[];
  intro?: string;
  twoColumn?: boolean;
}

function ListSection({ icon: Icon, title, items, intro, twoColumn }: ListSectionProps) {
  if (!items || items.length === 0) return null;
  return (
    <section className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
          <Icon className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
        </div>
        <h2 className="text-lg sm:text-xl font-semibold text-zinc-950 dark:text-white tracking-tight">
          {title}
        </h2>
      </div>
      {intro && (
        <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">{intro}</p>
      )}
      <ul className={twoColumn ? "grid grid-cols-1 md:grid-cols-2 gap-3" : "space-y-3"}>
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0" strokeWidth={2.5} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function ToolContentSection({ tool, content }: ToolContentSectionProps) {
  const custom = content ?? getToolContent(tool.id);
  if (!custom) return null;

  const final = {
    overview: custom.overview ?? "",
    benefits: custom.benefits ?? [],
    useCases: custom.useCases ?? [],
    features: custom.features ?? [],
    tips: custom.tips ?? [],
  };

  return (
    <div className="mt-12 space-y-4">
      {/* Overview */}
      {final.overview && (
        <section className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 sm:p-8">
          <h2 className="text-lg sm:text-xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-4">
            About {tool.name}
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            {final.overview}
          </p>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mt-4 text-sm">
            Looking for more?{" "}
            <Link
              href="/tools"
              className="text-zinc-950 dark:text-white font-medium underline underline-offset-4 decoration-zinc-300 dark:decoration-zinc-700 hover:decoration-indigo-500"
            >
              Browse the complete collection
            </Link>{" "}
            or check out related tools below.
          </p>
        </section>
      )}

      <ListSection icon={Check} title="Key benefits" items={final.benefits} />

      <ListSection
        icon={Target}
        title="Use cases"
        items={final.useCases}
        intro={`${tool.name} is perfect for these scenarios:`}
        twoColumn
      />

      <ListSection icon={Zap} title="Features" items={final.features} twoColumn />

      <ListSection
        icon={Lightbulb}
        title="Pro tips"
        items={final.tips}
        intro={`Get the most out of ${tool.name} with these tips:`}
      />

      {/* Why choose */}
      <section className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-md bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-zinc-950 dark:text-white tracking-tight">
            Why this tool
          </h2>
        </div>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm sm:text-base">
          {tool.name} runs entirely in your browser. No upload to a server, no rate limits,
          no watermarks, no signup. It does one thing well, and it does it free — forever.
          If you find a bug or have a feature request, open an issue or send an email; this
          site is maintained by one person who actually reads them.
        </p>
      </section>
    </div>
  );
}
