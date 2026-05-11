import type { Metadata } from "next";
import { getOGImageUrl } from "@/lib/og-image-generator";

export const metadata: Metadata = {
  title: "Cooking Calculators — Recipe Scaler, Unit Converter & More (Coming Soon)",
  description:
    "Free cooking calculators for recipe scaling, unit conversion, temperature conversion, baking ratios, butter conversion, and more kitchen math. Coming 2026.",
  keywords: [
    "cooking calculator",
    "recipe scaler",
    "cooking unit converter",
    "baking calculator",
    "butter conversion",
    "cooking temperature converter",
    "recipe scaling",
    "yeast converter",
    "kitchen calculator",
  ],
  openGraph: {
    title: "Cooking Calculators — Recipe Scaler & More (Coming Soon)",
    description:
      "Free cooking tools for recipe scaling, unit conversion, and kitchen math. Coming 2026.",
    type: "website",
    url: "https://aisocialtools.co/tools/cooking",
    siteName: "Social Media Tools",
    images: [{ url: getOGImageUrl("default"), width: 1200, height: 630, alt: "Cooking Calculators — Coming Soon" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cooking Calculators — Coming Soon",
    description: "Free cooking tools for recipe scaling, unit conversion, and kitchen math.",
    images: [getOGImageUrl("default")],
  },
  alternates: { canonical: "https://aisocialtools.co/tools/cooking" },
  robots: { index: true, follow: true },
};

export default function CookingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
