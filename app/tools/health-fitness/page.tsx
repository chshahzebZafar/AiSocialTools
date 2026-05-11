"use client";

import {
  Scale,
  Activity,
  Heart,
  Droplet,
  Dumbbell,
  Timer,
  HeartPulse,
} from "lucide-react";
import {
  ComingSoonCategoryPage,
  type PlannedTool,
} from "@/components/ComingSoonCategoryPage";
import { getCategoryToolsBy } from "@/lib/category-tools";

const plannedTools: PlannedTool[] = [
  {
    icon: Scale,
    name: "BMI Calculator",
    description:
      "Body Mass Index with category breakdown and healthy-weight range for your height.",
  },
  {
    icon: Activity,
    name: "Calorie & TDEE Calculator",
    description:
      "Total Daily Energy Expenditure based on age, weight, height, sex, and activity level.",
  },
  {
    icon: Droplet,
    name: "Water Intake Calculator",
    description:
      "Daily hydration target adjusted for weight, climate, and exercise duration.",
  },
  {
    icon: Heart,
    name: "Heart Rate Zone Calculator",
    description:
      "Max HR and training zones (Z1-Z5) using Karvonen, Tanaka, and HRR formulas.",
  },
  {
    icon: Timer,
    name: "Running Pace Calculator",
    description:
      "Pace, time, and distance — convert between any two. Includes split planners.",
  },
  {
    icon: Dumbbell,
    name: "One-Rep Max Calculator",
    description:
      "1RM estimate using Epley, Brzycki, Lander, and 8 other formulas. Compare side-by-side.",
  },
];

export default function HealthFitnessToolsPage() {
  return (
    <ComingSoonCategoryPage
      slug="health-fitness"
      shortName="Health & Fitness"
      longName="Health & Fitness Tools"
      launchWindow="Q2 2026"
      Icon={HeartPulse}
      headline={{ first: "Body math,", second: "honest numbers." }}
      subheadline="Free calculators for BMI, calories, heart rate, training pace, and one-rep max. No subscriptions, no shady supplements, just the formulas."
      plannedToolsHeading="Six calculators on the way."
      plannedToolsBlurb="Starting with the essentials for general fitness and training planning. Sport-specific tools will follow."
      plannedTools={plannedTools}
      liveTools={getCategoryToolsBy("health-fitness")}
      suggestHeading="Train differently?"
      suggestBlurb="If you do a specific sport (cycling, swimming, climbing, lifting) and want sport-specific math, tell us your event and we'll prioritize."
    />
  );
}
