"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { socialTools } from "@/lib/social-tools";
import { ChevronDown } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import { generateCollectionPageSchema, generateBreadcrumbSchema, getStaticPageBreadcrumbs } from "@/lib/seo-utils";

export default function ToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  // Get all unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(socialTools.map(tool => tool.category)));
    return ["All", ...cats.sort()];
  }, []);

  // Filter tools by category
  const filteredTools = useMemo(() => {
    if (selectedCategory === "All") {
      return socialTools;
    }
    return socialTools.filter(tool => tool.category === selectedCategory);
  }, [selectedCategory]);

  // Enhanced CollectionPage schema for SEO
  const collectionPageSchema = generateCollectionPageSchema(
    "All Social Media Tools",
    "Complete collection of free social media tools for content creation, management, and optimization. Generate tweets, create Instagram posts, download YouTube thumbnails, generate hashtags, and more.",
    "https://socialmediatools.netlify.app/tools",
    socialTools.map((tool) => ({
      name: tool.name,
      url: `https://socialmediatools.netlify.app${tool.path}`,
      description: tool.description,
    }))
  );

  // ItemList schema for SEO (backward compatibility)
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "All Social Media Tools",
    description: "Complete collection of free social media tools for content creation, management, and optimization",
    url: "https://socialmediatools.netlify.app/tools",
    numberOfItems: socialTools.length,
    itemListElement: socialTools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "WebApplication",
        name: tool.name,
        description: tool.description,
        url: `https://socialmediatools.netlify.app${tool.path}`,
        applicationCategory: "SocialMediaApplication",
        operatingSystem: "Web Browser",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD"
        }
      }
    }))
  };

  // Breadcrumb Schema
  const breadcrumbSchema = generateBreadcrumbSchema(getStaticPageBreadcrumbs("All Tools", "/tools"));

  return (
    <ToolLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full">
        {/* CollectionPage Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
        />
        {/* ItemList Schema (backward compatibility) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-3 sm:mb-4">
            All Free Social Media Tools - Complete Collection 2025
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto px-4">
            Browse our complete collection of the best free social media tools online. Generate content, download thumbnails, create captions, and optimize your social media strategy - all tools are 100% free with no signup required.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-6 sm:mb-8">
          <div className="relative inline-block w-full sm:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer w-full sm:w-64"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category} {category !== "All" && `(${socialTools.filter(t => t.category === category).length})`}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
          </div>
          {selectedCategory !== "All" && (
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Showing {filteredTools.length} {filteredTools.length === 1 ? "tool" : "tools"} in {selectedCategory}
            </p>
          )}
        </div>

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.id}
                  href={tool.path}
                  className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 sm:p-6 hover:shadow-md transition-shadow group"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {tool.name}
                        </h3>
                        {tool.isNew && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-green-500 to-emerald-600 text-white animate-pulse">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-2">
                        {tool.description}
                      </p>
                      <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400">
                        {tool.category}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-500 dark:text-slate-400">No tools found in this category.</p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
