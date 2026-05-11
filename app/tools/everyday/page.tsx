"use client";

import {
  Utensils,
  Car,
  Droplets,
  Moon,
  Heart,
  Shuffle,
  ShoppingBag,
  ArrowLeftRight,
  Target,
  Gauge,
  Compass,
  Clock,
  ArrowUpDown,
  Hash,
} from "lucide-react";
import {
  ComingSoonCategoryPage,
  type PlannedTool,
} from "@/components/ComingSoonCategoryPage";

const plannedTools: PlannedTool[] = [
  { icon: Utensils, name: "Tip Calculator", description: "Calculate tip amount and split the bill evenly between any number of people." },
  { icon: Droplets, name: "Fuel Cost Calculator", description: "Estimate total fuel cost for any trip based on distance, MPG, and gas price." },
  { icon: Car, name: "Gas Mileage Calculator", description: "Calculate your car's MPG or L/100km from fill-up data and track it over time." },
  { icon: Gauge, name: "Mileage Calculator", description: "Calculate distance traveled, fuel used, or cost between any two points." },
  { icon: Car, name: "Tire Size Calculator", description: "Compare tire sizes, calculate speedometer error, and find equivalent tire dimensions." },
  { icon: Moon, name: "Sleep Calculator", description: "Find the best bedtime or wake-up time based on 90-minute sleep cycle multiples." },
  { icon: Heart, name: "Love Calculator", description: "Fun compatibility score based on names — a lighthearted conversation starter." },
  { icon: ShoppingBag, name: "Bra Size Conversion", description: "Convert bra sizes between US, UK, EU, FR, IT, AU, and JP sizing systems." },
  { icon: ArrowLeftRight, name: "Shoe Size Conversion", description: "Convert shoe sizes between US, UK, EU, JP, AU, and MX for men, women, and kids." },
  { icon: Shuffle, name: "Dice Roller", description: "Roll any combination of dice (d4, d6, d8, d10, d12, d20, d100) with history log." },
  { icon: Target, name: "Golf Handicap Calculator", description: "Calculate your USGA/WHS golf handicap index from recent scorecards." },
  { icon: Clock, name: "Time Card Calculator", description: "Calculate total hours worked from clock-in/out times across multiple shifts." },
  { icon: ArrowLeftRight, name: "Unit Converter", description: "Comprehensive unit converter — length, weight, volume, temperature, speed, pressure, and area." },
  { icon: Clock, name: "Epoch / Unix Timestamp Converter", description: "Convert Unix timestamps to human-readable dates and vice versa, in any timezone." },
  { icon: Hash, name: "Random Number Generator", description: "Generate random numbers in any range, with optional integer, decimal, and unique-set modes." },
];

export default function EverydayToolsPage() {
  return (
    <ComingSoonCategoryPage
      slug="everyday"
      shortName="Everyday"
      longName="Everyday Calculators"
      launchWindow="2026"
      Icon={Compass}
      headline={{ first: "Everyday calculators,", second: "for everyday life." }}
      subheadline="Free tools for tips, gas, sleep, shoe sizes, dice, and more. Quick answers to the questions that come up daily — no app, no signup."
      plannedToolsHeading="15 calculators on the way."
      plannedToolsBlurb="The most-searched everyday utilities that don't fit neatly into finance or health — all free, all client-side."
      plannedTools={plannedTools}
      suggestHeading="Missing a daily calculator?"
      suggestBlurb="If you find yourself Googling the same quick calculation every week, we want to build it. Tell us what it is."
    />
  );
}
