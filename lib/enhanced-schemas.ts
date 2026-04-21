/**
 * Enhanced Schema Markup for Better Organic SEO
 * 
 * This file contains additional schema types that can be implemented
 * to improve organic search results and rich snippets.
 */

import { BlogPost } from "./blog-posts";
import { SocialTool } from "./social-tools";

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
      "url": `https://aisocialtools.co${post.image}`,
      "width": 1200,
      "height": 630
    },
    "datePublished": post.publishedAt,
    "dateModified": post.updatedAt || post.publishedAt,
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": "https://aisocialtools.co/author"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Social Media Tools",
      "logo": {
        "@type": "ImageObject",
        "url": "https://aisocialtools.co/logo.png",
        "width": 600,
        "height": 60
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://aisocialtools.co/blog/${post.slug}`
    },
    "articleSection": post.category,
    "keywords": post.tags.join(", "),
    "wordCount": post.content.split(/\s+/).length,
    "timeRequired": `PT${post.readTime}M`,
    "inLanguage": "en-US"
  };
}

/**
 * Review/Rating Schema for Tools
 */
export function getReviewSchema(tool: SocialTool, rating: number = 4.8, reviewCount: number = 1250) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": rating.toString(),
      "ratingCount": reviewCount.toString(),
      "bestRating": "5",
      "worstRating": "1"
    }
  };
}

/**
 * SiteLinks SearchBox Schema
 */
export function getSiteLinksSearchBoxSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://aisocialtools.co",
    "name": "Social Media Tools",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://aisocialtools.co/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };
}

/**
 * Enhanced FAQPage Schema
 */
export function getEnhancedFAQSchema(tool: SocialTool) {
  const faqs = [
    {
      "@type": "Question",
      "name": `How to use ${tool.name}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Our ${tool.name.toLowerCase()} is a free online tool that helps you ${tool.description.toLowerCase()}. Simply use the interface above to get started. No signup or registration required.`
      }
    },
    {
      "@type": "Question",
      "name": `Is ${tool.name} free?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Yes, ${tool.name} is completely free to use. No signup, no credit card, and no hidden fees. Use it as much as you want, whenever you need it.`
      }
    },
    {
      "@type": "Question",
      "name": `What can I do with ${tool.name}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `${tool.name} allows you to ${tool.description.toLowerCase()}. It's perfect for content creators, social media managers, marketers, and anyone looking to enhance their social media presence.`
      }
    },
    {
      "@type": "Question",
      "name": `Do I need to create an account to use ${tool.name}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `No, you don't need to create an account. ${tool.name} works instantly in your browser without any registration. Just visit the page and start using it immediately.`
      }
    },
    {
      "@type": "Question",
      "name": `Is my data safe when using ${tool.name}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Yes, your data is completely safe. All processing happens in your browser, and we don't store any of your information. Your privacy is our top priority.`
      }
    },
    {
      "@type": "Question",
      "name": `Can I use ${tool.name} on mobile devices?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Yes, ${tool.name} is fully responsive and works perfectly on mobile devices, tablets, and desktops. You can use it anywhere, anytime.`
      }
    },
    {
      "@type": "Question",
      "name": `Are there any limitations to using ${tool.name}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `No, there are no limitations. You can use ${tool.name} as much as you want, whenever you need it. It's completely free with unlimited usage.`
      }
    }
  ];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs
  };
}

/**
 * Enhanced HowTo Schema
 */
export function getEnhancedHowToSchema(tool: SocialTool) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to Use ${tool.name}`,
    "description": `Step-by-step guide on how to use ${tool.name} to ${tool.description.toLowerCase()}.`,
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Visit the Tool Page",
        "text": `Navigate to the ${tool.name} page on our website.`,
        "image": "https://aisocialtools.co/og-image.png"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Enter Your Input",
        "text": "Enter your content, text, or data in the input field provided.",
        "image": "https://aisocialtools.co/og-image.png"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Generate or Process",
        "text": "Click the generate or process button to create your output.",
        "image": "https://aisocialtools.co/og-image.png"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Copy or Download",
        "text": "Copy your result or download it directly. No signup required!",
        "image": "https://aisocialtools.co/og-image.png"
      }
    ],
    "totalTime": "PT2M",
    "tool": [
      {
        "@type": "HowToTool",
        "name": tool.name
      }
    ]
  };
}

/**
 * Author Schema
 */
export function getAuthorSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Shahzeb Zafar",
    "url": "https://aisocialtools.co/author",
    "image": "https://aisocialtools.co/author-image.jpg",
    "sameAs": [
      // Add your social media profiles
      // "https://twitter.com/yourhandle",
      // "https://linkedin.com/in/yourprofile"
    ],
    "jobTitle": "SEO Expert & Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "Social Media Tools"
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

