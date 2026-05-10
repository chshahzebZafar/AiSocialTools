/**
 * Advanced SEO Utility Functions
 * 
 * This file contains utility functions for generating advanced SEO metadata,
 * structured data, and optimization features for better search engine rankings.
 */

import { Metadata } from "next";
import { SocialTool } from "./social-tools";
import { BlogPost } from "./blog-posts";

const BASE_URL = "https://aisocialtools.co";

/**
 * Generate breadcrumb schema for any page
 */
export function generateBreadcrumbSchema(paths: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: paths.map((path, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: path.name,
      item: path.url,
    })),
  };
}

/**
 * Generate breadcrumb paths for a tool page
 */
export function getToolBreadcrumbs(tool: SocialTool) {
  return [
    { name: "Home", url: BASE_URL },
    { name: "Tools", url: `${BASE_URL}/tools` },
    { name: tool.name, url: `${BASE_URL}${tool.path}` },
  ];
}

/**
 * Generate breadcrumb paths for a blog post
 */
export function getBlogBreadcrumbs(post: BlogPost) {
  return [
    { name: "Home", url: BASE_URL },
    { name: "Blog", url: `${BASE_URL}/blog` },
    { name: post.title, url: `${BASE_URL}/blog/${post.slug}` },
  ];
}

/**
 * Generate breadcrumb paths for a static page
 */
export function getStaticPageBreadcrumbs(pageName: string, pagePath: string) {
  return [
    { name: "Home", url: BASE_URL },
    { name: pageName, url: `${BASE_URL}${pagePath}` },
  ];
}

/**
 * Generate CollectionPage schema for category/tool listing pages
 */
export function generateCollectionPageSchema(
  name: string,
  description: string,
  url: string,
  items: Array<{ name: string; url: string; description?: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "WebApplication",
          name: item.name,
          description: item.description || "",
          url: item.url,
        },
      })),
    },
  };
}

/**
 * Generate enhanced metadata with all SEO best practices
 */
export function generateEnhancedMetadata({
  title,
  description,
  keywords,
  url,
  ogImage,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  tags,
  noindex = false,
  nofollow = false,
}: {
  title: string;
  description: string;
  keywords?: string[];
  url: string;
  ogImage?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  noindex?: boolean;
  nofollow?: boolean;
}): Metadata {
  const ogImageUrl = ogImage || `${BASE_URL}/og-default.png`;

  return {
    title,
    description,
    keywords: keywords || [],
    authors: authors?.map((name) => ({ name })) || [],
    openGraph: {
      title,
      description,
      type,
      url,
      siteName: "Social Media Tools",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors: authors || [],
        tags: tags || [],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
      creator: "@SHAHZEBZAFAR99",
      site: "@SHAHZEBZAFAR99",
    },
    alternates: {
      canonical: url,
      languages: {
        en: url,
      },
    },
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "theme-color": "#3b82f6",
    },
  };
}


/**
 * Generate Article schema with enhanced properties
 */
export function generateArticleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: {
      "@type": "ImageObject",
      url: `${BASE_URL}${post.image}`,
      width: 1200,
      height: 630,
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author,
      url: `${BASE_URL}/author`,
    },
    publisher: {
      "@type": "Organization",
      name: "Social Media Tools",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/og-default.png`,
        width: 1200,
        height: 630,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${post.slug}`,
    },
    articleSection: post.category,
    keywords: post.tags.join(", "),
    wordCount: post.content.split(/\s+/).length,
    timeRequired: `PT${post.readTime}M`,
    inLanguage: "en-US",
  };
}

/**
 * Generate VideoObject schema (for future video content)
 */
export function generateVideoSchema({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  contentUrl,
  embedUrl,
}: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string;
  contentUrl?: string;
  embedUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl,
    uploadDate,
    duration,
    ...(contentUrl && { contentUrl }),
    ...(embedUrl && { embedUrl }),
  };
}

/**
 * Generate Organization schema with enhanced properties
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Social Media Tools",
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/og-default.png`,
      width: 1200,
      height: 630,
    },
    description:
      "Free social media tools for content creation, management, and optimization",
    sameAs: [
      "https://github.com/chshahzebZafar/",
      "https://x.com/SHAHZEBZAFAR99",
      "https://www.linkedin.com/in/shahzaib-zafer/",
      "https://shahzebzafar.netlify.app/",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      url: `${BASE_URL}/contact`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/tools?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generate WebSite schema with SiteLinks SearchBox
 */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: BASE_URL,
    name: "Social Media Tools",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/tools?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generate Person schema for author
 */
export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shahzeb Zafar",
    url: `${BASE_URL}/author`,
    image: `${BASE_URL}/author-image.jpg`,
    sameAs: [
      "https://github.com/chshahzebZafar/",
      "https://x.com/SHAHZEBZAFAR99",
      "https://www.linkedin.com/in/shahzaib-zafer/",
      "https://shahzebzafar.netlify.app/",
    ],
    jobTitle: "SEO Expert & Developer",
    worksFor: {
      "@type": "Organization",
      name: "Social Media Tools",
    },
  };
}

/**
 * Generate FAQPage schema with multiple questions
 */
export function generateFAQSchema(questions: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((qa) => ({
      "@type": "Question",
      name: qa.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: qa.answer,
      },
    })),
  };
}

/**
 * Generate HowTo schema for step-by-step guides
 */
export function generateHowToSchema({
  name,
  description,
  steps,
  totalTime,
  tool,
}: {
  name: string;
  description: string;
  steps: Array<{ name: string; text: string; image?: string }>;
  totalTime?: string;
  tool?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && {
        image: {
          "@type": "ImageObject",
          url: step.image,
        },
      }),
    })),
    ...(totalTime && { totalTime }),
    ...(tool && {
      tool: [
        {
          "@type": "HowToTool",
          name: tool,
        },
      ],
    }),
  };
}


