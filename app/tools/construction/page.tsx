"use client";

import { HardHat, Thermometer, Layers, Wallpaper } from "lucide-react";
import {
  ComingSoonCategoryPage,
  type PlannedTool,
} from "@/components/ComingSoonCategoryPage";
import { getCategoryToolsBy } from "@/lib/category-tools";

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Free Construction Calculators & Estimators",
  description: "Free construction calculators for concrete, lumber, roofing, flooring, tile, paint, fencing, stairs, and more.",
  url: "https://aisocialtools.co/tools/construction",
  numberOfItems: 12,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Concrete Calculator", url: "https://aisocialtools.co/tools/construction/concrete-calculator" },
    { "@type": "ListItem", position: 2, name: "Lumber Calculator", url: "https://aisocialtools.co/tools/construction/lumber-calculator" },
    { "@type": "ListItem", position: 3, name: "Roofing Calculator", url: "https://aisocialtools.co/tools/construction/roofing-calculator" },
    { "@type": "ListItem", position: 4, name: "Drywall Estimator", url: "https://aisocialtools.co/tools/construction/drywall-estimator" },
    { "@type": "ListItem", position: 5, name: "Stair Calculator", url: "https://aisocialtools.co/tools/construction/stair-calculator" },
    { "@type": "ListItem", position: 6, name: "Roof Pitch Calculator", url: "https://aisocialtools.co/tools/construction/roof-pitch-calculator" },
    { "@type": "ListItem", position: 7, name: "Flooring Calculator", url: "https://aisocialtools.co/tools/construction/flooring-calculator" },
    { "@type": "ListItem", position: 8, name: "Paint Calculator", url: "https://aisocialtools.co/tools/construction/paint-calculator" },
    { "@type": "ListItem", position: 9, name: "Tile Calculator", url: "https://aisocialtools.co/tools/construction/tile-calculator" },
    { "@type": "ListItem", position: 10, name: "Square Footage Calculator", url: "https://aisocialtools.co/tools/construction/square-footage-calculator" },
    { "@type": "ListItem", position: 11, name: "Fence Calculator", url: "https://aisocialtools.co/tools/construction/fence-calculator" },
    { "@type": "ListItem", position: 12, name: "Mulch Calculator", url: "https://aisocialtools.co/tools/construction/mulch-calculator" },
  ],
};

const plannedTools: PlannedTool[] = [
  { icon: Layers, name: "Gravel Calculator", description: "Cubic yards and tons of gravel or stone needed for driveways, paths, and beds." },
  { icon: Thermometer, name: "BTU Calculator", description: "BTUs needed to heat or cool any room based on area, ceiling height, and climate." },
  { icon: Wallpaper, name: "Wallpaper Calculator", description: "Rolls of wallpaper needed for any room, accounting for pattern repeat and waste." },
  { icon: Layers, name: "Insulation Calculator", description: "R-value, square footage, and bags or rolls of insulation needed for walls, attic, or floor." },
];

export default function ConstructionToolsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <ComingSoonCategoryPage
      slug="construction"
      shortName="Construction"
      longName="Construction Tools"
      launchWindow="2026"
      Icon={HardHat}
      headline={{ first: "Construction tools,", second: "built right." }}
      subheadline="Free calculators, estimators, and planners for contractors, builders, and DIYers. No signup, no upsell."
      plannedToolsHeading="4 tools on the way."
      plannedToolsBlurb="The most-requested estimating and planning workflows for contractors, builders, and DIYers. More will ship monthly."
      plannedTools={plannedTools}
      liveTools={getCategoryToolsBy("construction")}
      suggestHeading="Need a specific calculator?"
      suggestBlurb="We're building from real use cases. If you do construction work and have a calculation you redo every week, tell us — we'll prioritize it."
    />
    </>
  );
}
