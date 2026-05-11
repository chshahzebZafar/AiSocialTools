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
import { Scale, TrendingUp, Calculator, Hammer, GraduationCap, Ruler, Home, Footprints, Layers } from "lucide-react";

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
    slug: "lumber-calculator",
    category: "construction",
    name: "Lumber Calculator",
    tagline: "Board feet, framing studs, and sheet goods with waste & cost.",
    description:
      "Free lumber calculator for framing studs, boards & trim, and plywood/OSB sheet goods. Board feet, m³, waste allowance, and cost estimate. Imperial and metric.",
    path: "/tools/construction/lumber-calculator",
    icon: Ruler,
    isNew: true,
  },
  {
    slug: "roof-pitch-calculator",
    category: "construction",
    name: "Roof Pitch Calculator",
    tagline: "Convert pitch ratios, calculate rafter length, slope angle, and rise.",
    description:
      "Free roof pitch calculator. Convert rise/run to pitch ratio, degrees, and percent slope. Calculate rafter length with overhang. Imperial and metric.",
    path: "/tools/construction/roof-pitch-calculator",
    icon: Home,
    isNew: true,
  },
  {
    slug: "drywall-estimator",
    category: "construction",
    name: "Drywall Estimator",
    tagline: "Sheets, screws, mud, and tape for any room with deductions and waste.",
    description:
      "Free drywall estimator. Calculate sheets, screws, joint compound, and tape for any room. Multiple rooms, door/window deductions, waste factor, cost estimate, and PDF export. Imperial and metric.",
    path: "/tools/construction/drywall-estimator",
    icon: Layers,
    isNew: true,
  },
  {
    slug: "stair-calculator",
    category: "construction",
    name: "Stair Calculator",
    tagline: "Riser count, tread depth, stringer length, and IRC code check.",
    description:
      "Free stair calculator. Enter total rise and run to get riser count, riser height, tread depth, stringer length, headroom clearance, and lumber cost. IRC code-compliant. Imperial and metric.",
    path: "/tools/construction/stair-calculator",
    icon: Footprints,
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
