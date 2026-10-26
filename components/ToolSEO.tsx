"use client";

import { SocialTool } from "@/lib/social-tools";
import { getEnhancedFAQSchema } from "@/lib/enhanced-schemas";

/**
 * The FAQ markup for a tool page, when the page has FAQs worth marking up.
 *
 * This component has been shedding fabrications. It used to emit a second,
 * poorer WebApplication beside ToolSchemaInjector's, plus a SoftwareApplication
 * stub from getReviewSchema - three entities describing one tool. Both are gone
 * and the injector owns that alone.
 *
 * It also emitted a HowTo claiming the same four steps on all 56 pages, none of
 * which appeared on any page. That is gone too, and not replaced: Google retired
 * HowTo rich results, so it was risk with no possible payoff.
 *
 * What is left is FAQPage, now built from lib/tool-faqs.ts - the same source the
 * visible list reads. Previously the two were unrelated, so a page showing seven
 * written answers about tweet mockups told Google it answered seven generic
 * questions instead. getEnhancedFAQSchema returns null for tools that only have
 * filler, and nothing is rendered in that case.
 */
interface ToolSEOProps {
  tool: SocialTool;
}

export default function ToolSEO({ tool }: ToolSEOProps) {
  const faqSchema = getEnhancedFAQSchema(tool);
  if (!faqSchema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}
