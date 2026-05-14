"use client";

import {
  Scale,
  Activity,
  Heart,
  Dumbbell,
  Timer,
  HeartPulse,
  Baby,
  Flame,
  Percent,
  Calculator,
  Droplets,
  ShieldCheck,
  Zap,
  PersonStanding,
  FlaskConical,
  Ruler,
  Clock,
} from "lucide-react";
import {
  ComingSoonCategoryPage,
  type PlannedTool,
} from "@/components/ComingSoonCategoryPage";
import { getCategoryToolsBy } from "@/lib/category-tools";

const plannedTools: PlannedTool[] = [
  { icon: Flame, name: "Calorie Deficit Calculator", description: "Calculate daily calorie deficit needed to lose weight at your target rate, with projected timeline." },
  { icon: Droplets, name: "Water Intake Calculator", description: "Daily hydration target based on weight, activity level, and climate." },
  { icon: Activity, name: "VO2 Max Calculator", description: "Estimate your VO2 max (aerobic fitness level) from a run test or heart rate data." },
  { icon: Ruler, name: "Waist-to-Hip Ratio Calculator", description: "Calculate waist-to-hip ratio and assess cardiovascular health risk category." },
  { icon: Clock, name: "Intermittent Fasting Calculator", description: "Calculate eating and fasting windows for 16:8, 18:6, 5:2, and other IF protocols." },
  { icon: Flame, name: "Calorie Calculator", description: "Daily calorie needs based on age, weight, height, sex, and activity level." },
  { icon: Percent, name: "Body Fat Calculator", description: "Estimate body fat percentage using Navy, Jackson-Pollock, and BMI-based methods." },
  { icon: Activity, name: "BMR Calculator", description: "Basal Metabolic Rate using Mifflin-St Jeor, Harris-Benedict, and Katch-McArdle formulas." },
  { icon: Calculator, name: "Macro Calculator", description: "Personalized protein, carb, and fat targets based on your goals and TDEE." },
  { icon: Scale, name: "Ideal Weight Calculator", description: "Ideal body weight using Devine, Robinson, Miller, and Hamwi formulas side by side." },
  { icon: Baby, name: "Pregnancy Calculator", description: "Due date, trimester breakdown, and key milestone dates from LMP or conception date." },
  { icon: Scale, name: "Pregnancy Weight Gain Calculator", description: "Recommended total and weekly weight gain by pre-pregnancy BMI and trimester." },
  { icon: Baby, name: "Pregnancy Conception Calculator", description: "Estimate conception date from due date or last menstrual period." },
  { icon: Baby, name: "Due Date Calculator", description: "Estimated due date using Naegele's rule from LMP or known conception date." },
  { icon: Timer, name: "Pace Calculator", description: "Pace, time, and distance — convert between any two. Includes race split planners." },
  { icon: ShieldCheck, name: "Army Body Fat Calculator", description: "US Army body fat percentage using neck, waist, and hip circumference measurements." },
  { icon: Flame, name: "Carbohydrate Calculator", description: "Daily carb intake recommendation based on calorie goal, activity, and diet type." },
  { icon: Dumbbell, name: "Lean Body Mass Calculator", description: "Lean mass from total weight and body fat percentage using multiple formulas." },
  { icon: Scale, name: "Healthy Weight Calculator", description: "Healthy weight range for your height using BMI and frame-size adjustments." },
  { icon: Flame, name: "Calories Burned Calculator", description: "Calories burned for 100+ activities based on weight, duration, and MET values." },
  { icon: Dumbbell, name: "One Rep Max Calculator", description: "1RM estimate using Epley, Brzycki, Lander, and 8 other formulas. Compare side-by-side." },
  { icon: Heart, name: "Target Heart Rate Calculator", description: "Max HR and training zones (Z1–Z5) using Karvonen, Tanaka, and HRR formulas." },
  { icon: Activity, name: "Protein Calculator", description: "Daily protein target based on body weight, training intensity, and fitness goal." },
  { icon: Droplets, name: "Fat Intake Calculator", description: "Recommended daily fat intake based on calorie goal and dietary fat percentage." },
  { icon: Zap, name: "TDEE Calculator", description: "Total Daily Energy Expenditure across all activity levels with cut/bulk/maintain targets." },
  { icon: Baby, name: "Ovulation Calculator", description: "Estimated ovulation window and fertile days based on cycle length and LMP." },
  { icon: Baby, name: "Conception Calculator", description: "Likely conception date range from a known due date or last menstrual period." },
  { icon: Baby, name: "Period Calculator", description: "Predict future period dates and cycle patterns based on past cycle history." },
  { icon: FlaskConical, name: "GFR Calculator", description: "Estimated Glomerular Filtration Rate (eGFR) from creatinine, age, sex, and race." },
  { icon: PersonStanding, name: "Body Type Calculator", description: "Identify ectomorph, mesomorph, or endomorph body type from measurements." },
  { icon: Scale, name: "Body Surface Area Calculator", description: "BSA using Mosteller, Du Bois, and Haycock formulas — used in medication dosing." },
  { icon: FlaskConical, name: "BAC Calculator", description: "Blood alcohol content estimate based on drinks, weight, sex, and time elapsed." },
  { icon: Scale, name: "Anorexic BMI Calculator", description: "BMI classification with clinical underweight thresholds and health risk context." },
  { icon: Calculator, name: "Weight Watcher Points Calculator", description: "Estimate WW PersonalPoints for any food based on calories, fat, sugar, and protein." },
  { icon: Scale, name: "Overweight Calculator", description: "Determine overweight and obesity classification by BMI, waist size, and body fat." },
];

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Free Health & Fitness Calculators",
  description: "Free health and fitness calculators for BMI, calories, body fat, macros, pregnancy, and more.",
  url: "https://aisocialtools.co/tools/health-fitness",
  numberOfItems: 1,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "BMI Calculator", url: "https://aisocialtools.co/tools/health-fitness/bmi-calculator" },
  ],
};

export default function HealthFitnessToolsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <ComingSoonCategoryPage
      slug="health-fitness"
      shortName="Health & Fitness"
      longName="Health & Fitness Tools"
      launchWindow="2026"
      Icon={HeartPulse}
      headline={{ first: "Body math,", second: "honest numbers." }}
      subheadline="Free calculators for BMI, calories, body fat, pregnancy, training pace, macros, and more. No subscriptions, no shady supplements — just the formulas."
      plannedToolsHeading="35 calculators on the way."
      plannedToolsBlurb="Every major fitness and health calculation covered — from BMI to pregnancy tracking to one-rep max. More sport-specific tools will follow."
      plannedTools={plannedTools}
      liveTools={getCategoryToolsBy("health-fitness")}
      suggestHeading="Train differently?"
      suggestBlurb="If you do a specific sport (cycling, swimming, climbing, lifting) and want sport-specific math, tell us your event and we'll prioritize."
    />
    </>
  );
}
