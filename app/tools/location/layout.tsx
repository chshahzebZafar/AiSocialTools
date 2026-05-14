import type { Metadata } from "next";
import { getOGImageUrl } from "@/lib/og-image-generator";

export const metadata: Metadata = {
  title: "Location & Travel Tools — Distance, Time Zones, Travel Cost & More (Coming Soon)",
  description:
    "Free location and travel calculators — distance between cities, time zone converter, flight time, travel cost, ZIP code lookup, coordinates converter, and more. Coming 2026.",
  keywords: [
    "distance calculator",
    "driving distance calculator",
    "time zone converter",
    "flight time calculator",
    "travel cost calculator",
    "coordinates converter",
    "ZIP code lookup",
    "country info lookup",
    "midpoint calculator",
    "jet lag calculator",
  ],
  openGraph: {
    title: "Location & Travel Tools — Distance, Time Zones & More (Coming Soon)",
    description:
      "Free location and travel calculators for distances, time zones, travel costs, and more. Coming 2026.",
    type: "website",
    url: "https://aisocialtools.co/tools/location",
    siteName: "AISocialTools",
    images: [{ url: getOGImageUrl("default"), width: 1200, height: 630, alt: "Location & Travel Tools — Coming Soon" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Location & Travel Tools — Coming Soon",
    description: "Free location and travel calculators. Coming 2026.",
    images: [getOGImageUrl("default")],
  },
  alternates: { canonical: "https://aisocialtools.co/tools/location" },
  robots: { index: false, follow: true },
};

export default function LocationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
