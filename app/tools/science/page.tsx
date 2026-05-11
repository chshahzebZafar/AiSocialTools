"use client";

import {
  Atom,
  Weight,
  Gauge,
  Wind,
  Thermometer,
  Droplets,
  FlaskConical,
  Hash,
  Zap,
  Radio,
  Activity,
} from "lucide-react";
import {
  ComingSoonCategoryPage,
  type PlannedTool,
} from "@/components/ComingSoonCategoryPage";

const plannedTools: PlannedTool[] = [
  { icon: Weight, name: "Density Calculator", description: "Calculate density, mass, or volume given any two of the three values." },
  { icon: Weight, name: "Mass Calculator", description: "Convert between mass units — kg, lbs, oz, grams, stones, and more." },
  { icon: Weight, name: "Weight Calculator", description: "Calculate weight from mass and gravitational acceleration on Earth, Moon, or any planet." },
  { icon: Gauge, name: "Speed Calculator", description: "Solve for speed, distance, or time given any two values. Supports all units." },
  { icon: FlaskConical, name: "Molarity Calculator", description: "Calculate molarity, moles, or volume of a solution for any chemical." },
  { icon: Atom, name: "Molecular Weight Calculator", description: "Calculate the molecular weight of any chemical formula from atomic masses." },
  { icon: Zap, name: "Horsepower Calculator", description: "Convert between horsepower, kilowatts, and torque. Supports HP, BHP, PS, kW." },
  { icon: Zap, name: "Engine Horsepower Calculator", description: "Estimate engine horsepower from elapsed time (ET) and vehicle weight using the Trap Speed method." },
  { icon: Wind, name: "Wind Chill Calculator", description: "Apparent temperature from air temp and wind speed using the NWS wind chill formula." },
  { icon: Thermometer, name: "Heat Index Calculator", description: "Feels-like temperature from air temp and relative humidity using the NWS formula." },
  { icon: Droplets, name: "Dew Point Calculator", description: "Calculate dew point and relative humidity from temperature and moisture values." },
  { icon: Hash, name: "Roman Numeral Converter", description: "Convert between Arabic numbers and Roman numerals in both directions, any value." },
  { icon: FlaskConical, name: "pH Calculator", description: "Calculate pH, pOH, hydrogen ion concentration, and acid/base strength for any solution." },
  { icon: Activity, name: "Half-Life Calculator", description: "Calculate remaining quantity, decay constant, or time elapsed for any radioactive isotope." },
  { icon: Radio, name: "Wavelength / Frequency Calculator", description: "Convert between wavelength, frequency, and wave speed for light, sound, or any wave." },
];

export default function ScienceToolsPage() {
  return (
    <ComingSoonCategoryPage
      slug="science"
      shortName="Science"
      longName="Science & Engineering Calculators"
      launchWindow="2026"
      Icon={Atom}
      headline={{ first: "Science calculators,", second: "no lab required." }}
      subheadline="Free physics, chemistry, and engineering calculators — density, speed, molarity, molecular weight, horsepower, weather, and more. All client-side."
      plannedToolsHeading="15 calculators on the way."
      plannedToolsBlurb="Essential science and engineering formulas in a clean, no-signup interface. Built for students, engineers, and the curious."
      plannedTools={plannedTools}
      suggestHeading="Need a specific formula?"
      suggestBlurb="If you keep reaching for a specific scientific calculation, tell us and we'll build it. Lab and field workflows both welcome."
    />
  );
}
