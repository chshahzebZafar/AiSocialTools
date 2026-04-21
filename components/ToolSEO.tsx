"use client";

import { SocialTool } from "@/lib/social-tools";
import { getSEOMetadata } from "@/lib/seo-metadata";
import { 
  getReviewSchema, 
  getEnhancedFAQSchema, 
  getEnhancedHowToSchema 
} from "@/lib/enhanced-schemas";

interface ToolSEOProps {
  tool: SocialTool;
}

export default function ToolSEO({ tool }: ToolSEOProps) {
  const seo = getSEOMetadata(tool);

  // Enhanced WebApplication schema
  const structuredData = {
    ...seo.structuredData,
    "@context": "https://schema.org",
    url: `https://aisocialtools.co${tool.path}`,
  };

  // Enhanced FAQ Schema with 7 questions
  const faqSchema = getEnhancedFAQSchema(tool);

  // Enhanced HowTo Schema
  const howToSchema = getEnhancedHowToSchema(tool);

  // Review/Rating Schema
  const reviewSchema = getReviewSchema(tool, 4.8, 1250);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
    </>
  );
}

