"use client";

import {
  MapPin,
  Navigation,
  Globe,
  Clock,
  Plane,
  Car,
  DollarSign,
  Phone,
  Search,
  Map,
  Compass,
  Flag,
  Timer,
  ArrowLeftRight,
} from "lucide-react";
import {
  ComingSoonCategoryPage,
  type PlannedTool,
} from "@/components/ComingSoonCategoryPage";

const plannedTools: PlannedTool[] = [
  { icon: MapPin, name: "Distance Calculator", description: "Calculate the straight-line and driving distance between any two cities or addresses worldwide." },
  { icon: Car, name: "Driving Distance Calculator", description: "Estimate driving distance, time, and fuel cost between any two locations using road routes." },
  { icon: Navigation, name: "Midpoint Calculator", description: "Find the exact geographic midpoint between two locations — useful for meeting halfway." },
  { icon: Compass, name: "Coordinates Converter", description: "Convert GPS coordinates between decimal degrees, degrees/minutes/seconds, and UTM formats." },
  { icon: MapPin, name: "Latitude & Longitude Finder", description: "Find the latitude and longitude of any city, address, or landmark instantly." },
  { icon: Clock, name: "Time Zone Converter", description: "Convert any time between 400+ world time zones with daylight saving time handled automatically." },
  { icon: Globe, name: "World Clock", description: "See the current local time in any city or country around the world, side by side." },
  { icon: Plane, name: "Flight Time Calculator", description: "Estimate flight duration between any two airports, accounting for distance and average speed." },
  { icon: DollarSign, name: "Travel Cost Calculator", description: "Estimate total trip cost including fuel, tolls, and accommodation for any road trip." },
  { icon: Car, name: "Road Trip Planner", description: "Plan a multi-stop road trip with distances, drive times, and total fuel cost for each leg." },
  { icon: ArrowLeftRight, name: "Currency Converter", description: "Convert between 150+ currencies with up-to-date exchange rates for travel planning." },
  { icon: Phone, name: "Area Code Lookup", description: "Look up any US phone area code by city or state, or find which area covers a given number." },
  { icon: Search, name: "ZIP Code Lookup", description: "Find city, state, county, time zone, and coordinates for any US ZIP code." },
  { icon: Flag, name: "Country Info Lookup", description: "Get capital, currency, dialing code, time zone, languages, and flag for any country." },
  { icon: Map, name: "Map Scale Calculator", description: "Convert map distances to real-world distances using any map scale ratio." },
  { icon: Timer, name: "Jet Lag Calculator", description: "Calculate jet lag severity and recovery time based on departure, arrival, and time zone difference." },
];

export default function LocationToolsPage() {
  return (
    <ComingSoonCategoryPage
      slug="location"
      shortName="Location"
      longName="Location & Travel Tools"
      launchWindow="2026"
      Icon={MapPin}
      headline={{ first: "Location tools,", second: "for wherever you're going." }}
      subheadline="Free calculators for distances, time zones, travel costs, coordinates, ZIP codes, country info, and more. Plan smarter — no app, no signup."
      plannedToolsHeading="16 tools on the way."
      plannedToolsBlurb="Everything from GPS coordinate conversion to jet lag recovery — all the location and travel calculations you actually need."
      plannedTools={plannedTools}
      suggestHeading="Planning a trip?"
      suggestBlurb="If you're doing a specific type of travel planning and need a calculator we don't have, tell us. Travel and expat workflows both welcome."
    />
  );
}
