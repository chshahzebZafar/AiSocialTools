/**
 * Enhanced Schema Markup for Better Organic SEO
 * 
 * This file contains additional schema types that can be implemented
 * to improve organic search results and rich snippets.
 */

import { BlogPost } from "./blog-posts";
import { SocialTool } from "./social-tools";
import { getToolFaqs } from "./tool-faqs";

const BASE_URL = "https://aisocialtools.co";

/**
 * Enhanced Article Schema for Blog Posts
 */
export function getEnhancedArticleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": {
      "@type": "ImageObject",
      "url": `${BASE_URL}${post.image}`,
      "width": 1200,
      "height": 630
    },
    "datePublished": post.publishedAt,
    "dateModified": post.updatedAt || post.publishedAt,
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": `${BASE_URL}/about`
    },
    "publisher": {
      "@type": "Organization",
      "name": "AISocialTools",
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/og-image.png`,
        "width": 1200,
        "height": 630
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${post.slug}`
    },
    "articleSection": post.category,
    "keywords": post.tags.join(", "),
    "wordCount": post.content.split(/\s+/).length,
    "timeRequired": `PT${post.readTime}M`,
    "inLanguage": "en-US"
  };
}

/*
 * getReviewSchema used to live here. Its aggregateRating was removed once it
 * turned out to be a hardcoded 4.8 from 1250 reviews that never existed, which
 * left a SoftwareApplication stub repeating the name, category and a $0 offer
 * that ToolSchemaInjector's WebApplication already covered - a third entity for
 * the same tool, competing with the other two. Deleted rather than left unused,
 * because a function called getReviewSchema invites being wired back in, and
 * the next person to do that may not know why the ratings went.
 *
 * Real ratings need real user data, and a schema.org Review or aggregateRating
 * built from it. Not a constant.
 */

/**
 * SiteLinks SearchBox Schema
 */
export function getSiteLinksSearchBoxSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": BASE_URL,
    "name": "AISocialTools",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${BASE_URL}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

/**
 * FAQPage markup, built from the FAQs the page actually shows.
 *
 * It used to build them from a template that ignored the page entirely. On
 * /tools/tweet-generator the page showed seven written answers about making
 * tweet mockups while this told Google the page answered "Is my data safe?"
 * and six other questions that appeared nowhere on it - zero overlap, on all
 * 56 tool pages, 392 Q&As asserted that did not exist. Google requires this
 * markup to match visible content, and at that scale it reads as deliberate.
 *
 * Returns null when a tool only has generic filler. No markup is better than
 * markup for four restatements of "it is free and needs no account".
 */
export function getEnhancedFAQSchema(tool: SocialTool) {
  const faqs = getToolFaqs(tool.id);
  if (!faqs) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer,
      },
    })),
  };
}

/*
 * getEnhancedHowToSchema used to live here, and it was fabricated end to end.
 * Every one of the 56 tool pages claimed the same four steps - "Visit the Tool
 * Page", "Enter Your Input", "Generate or Process", "Copy or Download" - none
 * of which appeared on any page as content a reader could see.
 *
 * Deleted rather than rewritten, because there is nothing to rewrite it into:
 * Google retired HowTo rich results, so the markup could never have produced
 * anything. It was pure risk for no benefit.
 */

export function getAuthorSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Shahzeb Zafar",
    "url": `${BASE_URL}/about`,
    "image": `${BASE_URL}/og-default.png`,
    "sameAs": [
      // Add your social media profiles
      // "https://twitter.com/yourhandle",
      // "https://linkedin.com/in/yourprofile"
    ],
    "jobTitle": "SEO Expert & Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "AISocialTools"
    }
  };
}

/**
 * Enhanced BreadcrumbList Schema
 */
export function getEnhancedBreadcrumbSchema(paths: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": paths.map((path, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": path.name,
      "item": path.url
    }))
  };
}

/**
 * ImageObject Schema
 */
export function getImageSchema(imageUrl: string, description: string, author: string = "Shahzeb Zafar") {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "contentUrl": imageUrl,
    "description": description,
    "license": "https://creativecommons.org/licenses/by/4.0/",
    "creator": {
      "@type": "Person",
      "name": author
    }
  };
}

/**
 * VideoObject Schema (for future video content)
 */
export function getVideoSchema(
  name: string,
  description: string,
  thumbnailUrl: string,
  uploadDate: string,
  duration: string,
  contentUrl?: string,
  embedUrl?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": name,
    "description": description,
    "thumbnailUrl": thumbnailUrl,
    "uploadDate": uploadDate,
    "duration": duration,
    ...(contentUrl && { "contentUrl": contentUrl }),
    ...(embedUrl && { "embedUrl": embedUrl })
  };
}

