import Link from "next/link";
import { socialTools } from "@/lib/social-tools";
import type { Metadata } from "next";
import { getOGImageUrl } from "@/lib/og-image-generator";

export const metadata: Metadata = {
  title: "All Social Media Tools - Free Online Tools Collection",
  description: "Browse our complete collection of free social media tools. Generate content, download thumbnails, create captions, and more. All tools are 100% free with no signup required.",
  keywords: [
    "social media tools",
    "free tools",
    "all tools",
    "tool collection",
    "social media management tools",
    "content creation tools"
  ],
  openGraph: {
    title: "All Social Media Tools - Free Online Tools Collection",
    description: "Browse our complete collection of free social media tools. All tools are 100% free with no signup required.",
    type: "website",
    url: "https://socialmediatools.netlify.app/tools",
    siteName: "Social Media Tools",
    images: [
      {
        url: getOGImageUrl("tools"),
        width: 1200,
        height: 630,
        alt: "All Social Media Tools - Free Online Tools Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Social Media Tools - Free Online Tools Collection",
    description: "Browse our complete collection of free social media tools. All tools are 100% free with no signup required.",
    images: [getOGImageUrl("tools")],
  },
  alternates: {
    canonical: "https://socialmediatools.netlify.app/tools",
  },
};

export default function ToolsPage() {
  // ItemList schema for SEO
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

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-3 sm:mb-4">
            All Social Media Tools
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto px-4">
            Browse our complete collection of free tools to help you create, manage, and optimize your social media content
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {socialTools.map((tool) => {
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
                    <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-slate-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2">{tool.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
    </div>
  );
}

