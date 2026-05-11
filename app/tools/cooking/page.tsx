"use client";

import {
  UtensilsCrossed,
  ArrowLeftRight,
  Scale,
  Thermometer,
  Clock,
  Calculator,
  ChefHat,
  Droplets,
  Timer,
} from "lucide-react";
import {
  ComingSoonCategoryPage,
  type PlannedTool,
} from "@/components/ComingSoonCategoryPage";

const plannedTools: PlannedTool[] = [
  { icon: ArrowLeftRight, name: "Cooking Unit Converter", description: "Convert between cups, ml, oz, tbsp, tsp, liters, and grams for any ingredient." },
  { icon: Scale, name: "Recipe Scaler", description: "Scale any recipe up or down by servings — all ingredient quantities adjusted automatically." },
  { icon: Thermometer, name: "Cooking Temperature Converter", description: "Convert oven temperatures between Fahrenheit, Celsius, and Gas Mark." },
  { icon: Clock, name: "Cooking Time Calculator", description: "Calculate roasting, baking, or grilling time based on weight and cooking method." },
  { icon: Droplets, name: "Butter Conversion Calculator", description: "Convert butter between sticks, cups, tablespoons, grams, and ounces." },
  { icon: Calculator, name: "Baking Ratio Calculator", description: "Calculate baker's percentages and scale bread, cake, or pastry recipes by weight." },
  { icon: Scale, name: "Ingredient Substitution Guide", description: "Find common ingredient substitutions when you're missing something mid-recipe." },
  { icon: Timer, name: "Boiling Point Calculator", description: "Adjust boiling point and cooking times for different altitudes above sea level." },
  { icon: ChefHat, name: "Serving Size Calculator", description: "Scale recipes for any number of guests from a base serving count." },
  { icon: Droplets, name: "Yeast Converter", description: "Convert between active dry, instant, and fresh yeast quantities for any recipe." },
];

export default function CookingToolsPage() {
  return (
    <ComingSoonCategoryPage
      slug="cooking"
      shortName="Cooking"
      longName="Cooking Calculators"
      launchWindow="2026"
      Icon={UtensilsCrossed}
      headline={{ first: "Cooking calculators,", second: "no culinary school needed." }}
      subheadline="Free tools for scaling recipes, converting units, adjusting temperatures, and timing your cooking. All the kitchen math in one place."
      plannedToolsHeading="10 tools on the way."
      plannedToolsBlurb="The most-needed cooking calculations — from converting a US recipe to metric to scaling a birthday cake for 40 people."
      plannedTools={plannedTools}
      suggestHeading="Missing a kitchen tool?"
      suggestBlurb="If you find yourself Googling a conversion or calculation every time you cook, we want to build it. Tell us what slows you down."
    />
  );
}
