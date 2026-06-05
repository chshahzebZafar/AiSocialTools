/**
 * Live tools that live under non-social category hubs (finance, health, etc.)
 *
 * These categories were removed to focus the site on social media tools + the
 * AI directory, so this registry is currently empty. It is kept (rather than
 * deleted) because `getCategoryToolsBy` / `getCategoryToolBySlug` and the
 * sitemap still import from here. Re-add entries if a non-social calculator
 * category is ever reintroduced.
 */

import type { LucideIcon } from "lucide-react";

export interface CategoryTool {
  slug: string;
  /** Matches a slug in lib/tool-categories.ts */
  category: string;
  name: string;
  /** Short tagline shown on cards */
  tagline: string;
  /** Longer description for SEO */
  description: string;
  /** Full path — must match the file path */
  path: string;
  icon: LucideIcon;
  isNew?: boolean;
}

export const categoryTools: CategoryTool[] = [];

export function getCategoryToolsBy(category: string): CategoryTool[] {
  return categoryTools.filter((t) => t.category === category);
}

export function getCategoryToolBySlug(slug: string): CategoryTool | undefined {
  return categoryTools.find((t) => t.slug === slug);
}
