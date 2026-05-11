"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import {
  Clock,
  Check,
  Mail,
  Loader2,
  ArrowLeft,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

export interface PlannedTool {
  icon: LucideIcon;
  name: string;
  description: string;
}

export interface ComingSoonCategoryPageProps {
  /** category slug — used for URL building and breadcrumb */
  slug: string;
  /** "Construction" — used in breadcrumb */
  shortName: string;
  /** "Construction Tools" */
  longName: string;
  /** target launch window, e.g. "Early 2026" */
  launchWindow: string;
  /** category-level Icon shown on the suggest-a-tool card */
  Icon: LucideIcon;
  /** two-tone hero heading. The first line is bold, second line is muted */
  headline: { first: string; second: string };
  /** Below the headline */
  subheadline: string;
  /** Section heading above planned tools, e.g. "Six tools to start." */
  plannedToolsHeading: string;
  /** Short paragraph below the planned-tools heading */
  plannedToolsBlurb: string;
  /** the actual list of planned tools */
  plannedTools: PlannedTool[];
  /** "Need a specific calculator?" style heading on the suggest section */
  suggestHeading: string;
  /** Suggest section body */
  suggestBlurb: string;
}

type SubscribeState = "idle" | "submitting" | "success" | "error";

export function ComingSoonCategoryPage({
  slug,
  shortName,
  longName,
  launchWindow,
  Icon,
  headline,
  subheadline,
  plannedToolsHeading,
  plannedToolsBlurb,
  plannedTools,
  suggestHeading,
  suggestBlurb,
}: ComingSoonCategoryPageProps) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SubscribeState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");
    setErrorMessage("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState("error");
      setErrorMessage("Please enter a valid email.");
      return;
    }
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: `category-${slug}` }),
      });
      setState("success");
      setEmail("");
    } catch {
      setState("error");
      setErrorMessage("Couldn't subscribe. Please try again.");
    }
  }

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Planned ${longName}`,
    description: `Free ${longName.toLowerCase()} — coming soon.`,
    url: `https://aisocialtools.co/tools/${slug}`,
    numberOfItems: plannedTools.length,
    itemListElement: plannedTools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.name,
      description: tool.description,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://aisocialtools.co" },
      { "@type": "ListItem", position: 2, name: "Tools", item: "https://aisocialtools.co/tools" },
      {
        "@type": "ListItem",
        position: 3,
        name: shortName,
        item: `https://aisocialtools.co/tools/${slug}`,
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />

      <main className="flex-1">
        <Breadcrumbs />

        {/* Hero */}
        <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
          <div className="aurora" aria-hidden />
          <div className="absolute inset-0 bg-dot-grid-animated opacity-50" aria-hidden />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
            <Link
              href="/tools"
              className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all tools
            </Link>

            <Badge variant="warning" className="mb-6 float-soft">
              <Clock className="w-3 h-3" />
              Coming soon · {launchWindow}
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-zinc-950 dark:text-white tracking-tight leading-[1.05] mb-5 max-w-3xl">
              {headline.first}
              <br />
              <span className="text-zinc-500 dark:text-zinc-400">{headline.second}</span>
            </h1>
            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mb-10 leading-relaxed">
              {subheadline}
            </p>

            {/* Notify form */}
            {state === "success" ? (
              <div className="max-w-md bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-lg p-5 flex items-start gap-3">
                <Check
                  className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0"
                  strokeWidth={2.5}
                />
                <div>
                  <p className="text-sm font-medium text-zinc-950 dark:text-white mb-1">
                    You&apos;re on the list.
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    We&apos;ll email you the moment the first {shortName.toLowerCase()} tool
                    ships.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-md">
                <label
                  htmlFor={`subscribe-${slug}`}
                  className="block text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2"
                >
                  Get notified when we launch
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                    <input
                      id={`subscribe-${slug}`}
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrorMessage("");
                      }}
                      placeholder="you@example.com"
                      className="w-full h-10 pl-9 pr-3 border border-zinc-200 dark:border-zinc-800 rounded-md focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={state === "submitting"}
                    className="inline-flex items-center justify-center gap-2 h-10 px-5 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-md text-sm font-medium transition-colors disabled:opacity-60"
                  >
                    {state === "submitting" ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Notify me"
                    )}
                  </button>
                </div>
                {errorMessage && (
                  <p className="text-xs text-red-600 mt-2">{errorMessage}</p>
                )}
                <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2">
                  No spam. One email when we ship. Unsubscribe any time.
                </p>
              </form>
            )}
          </div>
        </section>

        {/* Planned tools */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="max-w-2xl mb-12">
              <Badge variant="neutral" className="mb-4">
                What&apos;s coming
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-4">
                {plannedToolsHeading}
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {plannedToolsBlurb}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
              {plannedTools.map((tool) => {
                const ToolIcon = tool.icon;
                return (
                  <div
                    key={tool.name}
                    className="bg-white dark:bg-zinc-950 p-6 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center mb-4">
                      <ToolIcon
                        className="w-4 h-4 text-zinc-700 dark:text-zinc-300"
                        strokeWidth={1.75}
                      />
                    </div>
                    <h3 className="text-base font-semibold text-zinc-950 dark:text-white mb-2 flex items-center gap-2">
                      {tool.name}
                      <Badge variant="warning" className="text-[9px] py-0">
                        Soon
                      </Badge>
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Suggest a tool */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="text-center">
              <div className="inline-flex w-12 h-12 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 items-center justify-center mb-6">
                <Icon className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-3">
                {suggestHeading}
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 max-w-xl mx-auto leading-relaxed">
                {suggestBlurb}
              </p>
              <ButtonLink href="/contact" variant="primary" size="md">
                Suggest a tool
                <ArrowRight className="w-4 h-4" />
              </ButtonLink>
            </div>
          </div>
        </section>

        {/* CTA — browse live tools */}
        <section className="bg-zinc-950 dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight mb-4 max-w-2xl mx-auto">
              While you wait, check out what&apos;s live.
            </h2>
            <p className="text-lg text-zinc-400 max-w-xl mx-auto mb-8 leading-relaxed">
              60+ free tools for social media — all working, all free, no signup.
            </p>
            <Link
              href="/tools/social-media"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-white text-zinc-950 hover:bg-zinc-200 rounded-md text-base font-medium transition-colors"
            >
              Browse social media tools
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
