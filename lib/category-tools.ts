/**
 * Live tools that live under category hubs (finance, health-fitness, etc.)
 *
 * Distinct from `socialTools` in lib/social-tools.ts which has its own
 * legacy data shape.
 *
 * Adding a new live tool:
 *   1. Append an entry here.
 *   2. Create the page at `app/tools/{category}/{slug}/page.tsx`.
 *   3. Add to sitemap.ts.
 *   4. Bump `toolCount` in lib/tool-categories.ts if the category is now live.
 */

import type { LucideIcon } from "lucide-react";
import { Scale, TrendingUp, Calculator, Hammer, GraduationCap } from "lucide-react";

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

export const categoryTools: CategoryTool[] = [
  {
    slug: "bmi-calculator",
    category: "health-fitness",
    name: "BMI Calculator",
    tagline: "Body Mass Index with healthy-weight range, metric & imperial.",
    description:
      "Free BMI calculator with metric and imperial units. Shows BMI category, healthy weight range, and side-by-side comparison.",
    path: "/tools/health-fitness/bmi-calculator",
    icon: Scale,
    isNew: true,
  },
  {
    slug: "compound-interest-calculator",
    category: "finance",
    name: "Compound Interest Calculator",
    tagline: "See how money grows with monthly contributions and any compounding.",
    description:
      "Free compound interest calculator with monthly contributions, daily/monthly/yearly compounding, and a year-by-year growth table.",
    path: "/tools/finance/compound-interest-calculator",
    icon: TrendingUp,
    isNew: true,
  },
  {
    slug: "mortgage-calculator",
    category: "finance",
    name: "Mortgage Calculator",
    tagline: "Monthly payment, total interest, and full amortization schedule.",
    description:
      "Free mortgage calculator with property tax, insurance, HOA, monthly payment breakdown, and a full amortization schedule.",
    path: "/tools/finance/mortgage-calculator",
    icon: Calculator,
    isNew: true,
  },
  {
    slug: "concrete-calculator",
    category: "construction",
    name: "Concrete Calculator",
    tagline: "Cubic yards, bags, and cost for slabs, footings, and columns.",
    description:
      "Free concrete calculator for slabs, footings, and columns. Outputs cubic yards, 60/80 lb bag counts, and cost estimate.",
    path: "/tools/construction/concrete-calculator",
    icon: Hammer,
    isNew: true,
  },
  {
    slug: "gpa-calculator",
    category: "education",
    name: "GPA Calculator",
    tagline: "Calculate semester or cumulative GPA on 4.0 or 5.0 scale.",
    description:
      "Free GPA calculator for semester or cumulative GPA. Supports weighted and unweighted on 4.0 and 5.0 scales.",
    path: "/tools/education/gpa-calculator",
    icon: GraduationCap,
    isNew: true,
  },
];

export function getCategoryToolsBy(category: string): CategoryTool[] {
  return categoryTools.filter((t) => t.category === category);
}

export function getCategoryToolBySlug(slug: string): CategoryTool | undefined {
  return categoryTools.find((t) => t.slug === slug);
}
