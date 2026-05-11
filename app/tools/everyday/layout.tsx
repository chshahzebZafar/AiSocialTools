import type { Metadata } from "next";
import { getOGImageUrl } from "@/lib/og-image-generator";

export const metadata: Metadata = {
  title: "Everyday Calculators — Tip, Gas, Sleep, Size Converters & More (Coming Soon)",
  description:
    "Free everyday calculators for tips, fuel cost, gas mileage, sleep cycles, shoe sizes, dice roller, golf handicap, and more. All client-side. Coming 2026.",
  keywords: [
    "tip calculator",
    "fuel cost calculator",
    "gas mileage calculator",
    "sleep calculator",
    "shoe size conversion",
    "dice roller",
    "golf handicap calculator",
    "unit converter",
    "everyday calculators",
  ],
  openGraph: {
    title: "Everyday Calculators — Tip, Gas, Sleep & More (Coming Soon)",
    description:
      "Free everyday tools for tips, fuel, sleep, shoe sizes, dice, and more. Coming 2026.",
    type: "website",
    url: "https://aisocialtools.co/tools/everyday",
    siteName: "Social Media Tools",
    images: [{ url: getOGImageUrl("default"), width: 1200, height: 630, alt: "Everyday Calculators — Coming Soon" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Everyday Calculators — Coming Soon",
    description: "Free everyday tools for tips, fuel, sleep, shoe sizes, and more.",
    images: [getOGImageUrl("default")],
  },
  alternates: { canonical: "https://aisocialtools.co/tools/everyday" },
  robots: { index: true, follow: true },
};

export default function EverydayLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
