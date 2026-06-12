"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { socialTools } from "@/lib/social-tools";
import { ArrowUpRight, Search, Sparkles } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/animations/Reveal";
import {
  generateCollectionPageSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo-utils";

export default function SocialMediaToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(socialTools.map((t) => t.category)));
    return ["All", ...cats.sort()];
  }, []);

  const filteredTools = useMemo(() => {
    let list = socialTools;
    if (selectedCategory !== "All") {
      list = list.filter((t) => t.category === selectedCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [selectedCategory, searchQuery]);

  const collectionPageSchema = generateCollectionPageSchema(
    "All Social Media Tools",
    "Complete collection of free social media tools for content creation, management, and optimization.",
    "https://aisocialtools.co/tools/social-media",
    socialTools.map((tool) => ({
      name: tool.name,
      url: `https://aisocialtools.co${tool.path}`,
      description: tool.description,
    }))
  );

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "All Social Media Tools",
    url: "https://aisocialtools.co/tools/social-media",
    numberOfItems: socialTools.length,
    itemListElement: socialTools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "WebApplication",
        name: tool.name,
        description: tool.description,
        url: `https://aisocialtools.co${tool.path}`,
      },
    })),
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://aisocialtools.co" },
    { name: "Tools", url: "https://aisocialtools.co/tools" },
    {
      name: "Social Media",
      url: "https://aisocialtools.co/tools/social-media",
    },
  ]);

  return (
    <ToolLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
        <div className="aurora" aria-hidden />
        <div className="absolute inset-0 bg-dot-grid-animated opacity-50" aria-hidden />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center">
          <Breadcrumbs center />
          <Badge variant="accent" className="mb-6 float-soft">
            <Sparkles className="w-3 h-3" />
            Social Media · {socialTools.length} tools
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-zinc-950 dark:text-white tracking-tight leading-[1.05] mb-5 max-w-3xl mx-auto">
            Every social media tool,
            <br />
            <span className="text-zinc-500 dark:text-zinc-400">one click away.</span>
          </h1>
          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Browse the complete collection. Filter by platform or search for what you need —
            every tool is free, browser-based, and works without an account.
          </p>
        </div>
      </section>

      {/* Filters + grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools…"
              className="w-full pl-9 pr-3 h-10 border border-zinc-200 dark:border-zinc-800 rounded-md focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400"
            />
          </div>
          <div className="relative sm:w-56">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full h-10 pl-3 pr-8 border border-zinc-200 dark:border-zinc-800 rounded-md focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 appearance-none cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}{" "}
                  {cat !== "All" &&
                    `(${socialTools.filter((t) => t.category === cat).length})`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedCategory !== "All" || searchQuery ? (
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
            {filteredTools.length} {filteredTools.length === 1 ? "tool" : "tools"}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        ) : null}

        {/* Tools grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredTools.map((tool, i) => {
              const Icon = tool.icon;
              return (
                <Reveal key={tool.id} delay={Math.min(i * 30, 400)}>
                  <Link
                    href={tool.path}
                    className="group relative block h-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="w-9 h-9 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:bg-indigo-50 group-hover:border-indigo-200 dark:group-hover:bg-indigo-500/10 dark:group-hover:border-indigo-500/30 transition-colors">
                        <Icon className="w-4 h-4 text-zinc-700 dark:text-zinc-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        {tool.isNew && (
                          <Badge variant="success" className="text-[10px] py-0">
                            New
                          </Badge>
                        )}
                        <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-[15px] text-zinc-950 dark:text-white mb-1">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-3">
                      {tool.description}
                    </p>
                    <div className="text-xs text-zinc-500 dark:text-zinc-500">
                      {tool.category}
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg">
            <p className="text-zinc-500 dark:text-zinc-400 mb-2">No tools found</p>
            <p className="text-sm text-zinc-400 dark:text-zinc-500">
              Try a different search term or category
            </p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
