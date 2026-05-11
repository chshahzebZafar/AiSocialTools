"use client";

import { Calculator, Ruler, Hammer, HardHat, Thermometer, Square, Layers, Home, Fence } from "lucide-react";
import {
  ComingSoonCategoryPage,
  type PlannedTool,
} from "@/components/ComingSoonCategoryPage";
import { getCategoryToolsBy } from "@/lib/category-tools";

const plannedTools: PlannedTool[] = [
  { icon: Ruler, name: "Paint Coverage", description: "Gallons needed for any wall area with two-coat and trim allowances." },
  { icon: Square, name: "Square Footage Calculator", description: "Calculate area for rooms, yards, and irregular shapes in square feet or meters." },
  { icon: Hammer, name: "Roofing Calculator", description: "Roofing squares, shingles, underlayment, and material cost for any roof shape." },
  { icon: Layers, name: "Tile Calculator", description: "Tiles needed for any floor or wall area with grout spacing and waste factor." },
  { icon: Layers, name: "Mulch Calculator", description: "Cubic yards of mulch needed for any bed area at your desired depth." },
  { icon: Layers, name: "Gravel Calculator", description: "Cubic yards and tons of gravel or stone needed for driveways, paths, and beds." },
  { icon: Thermometer, name: "BTU Calculator", description: "BTUs needed to heat or cool any room based on area, ceiling height, and climate." },
  { icon: Home, name: "Flooring Calculator", description: "Square footage of hardwood, laminate, or carpet needed for any room, with waste factor." },
  { icon: Fence, name: "Fence Calculator", description: "Posts, panels, and material cost for any fence length, post spacing, and material type." },
  { icon: Layers, name: "Wallpaper Calculator", description: "Rolls of wallpaper needed for any room, accounting for pattern repeat and waste." },
  { icon: Square, name: "Insulation Calculator", description: "R-value, square footage, and bags or rolls of insulation needed for walls, attic, or floor." },
];

export default function ConstructionToolsPage() {
  return (
    <ComingSoonCategoryPage
      slug="construction"
      shortName="Construction"
      longName="Construction Tools"
      launchWindow="2026"
      Icon={HardHat}
      headline={{ first: "Construction tools,", second: "built right." }}
      subheadline="Free calculators, estimators, and planners for contractors, builders, and DIYers. No signup, no upsell."
      plannedToolsHeading="11 tools on the way."
      plannedToolsBlurb="The most-requested estimating and planning workflows for contractors, builders, and DIYers. More will ship monthly."
      plannedTools={plannedTools}
      liveTools={getCategoryToolsBy("construction")}
      suggestHeading="Need a specific calculator?"
      suggestBlurb="We're building from real use cases. If you do construction work and have a calculation you redo every week, tell us — we'll prioritize it."
    />
  );
}
