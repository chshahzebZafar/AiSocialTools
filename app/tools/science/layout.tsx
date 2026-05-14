import type { Metadata } from "next";
import { getOGImageUrl } from "@/lib/og-image-generator";

export const metadata: Metadata = {
  title: "Science & Engineering Calculators — Physics, Chemistry & More (Coming Soon)",
  description:
    "Free science calculators for density, speed, molarity, molecular weight, horsepower, wind chill, heat index, pH, half-life, and more. Coming 2026.",
  keywords: [
    "science calculator",
    "physics calculator",
    "chemistry calculator",
    "density calculator",
    "molarity calculator",
    "molecular weight calculator",
    "horsepower calculator",
    "wind chill calculator",
    "pH calculator",
    "half-life calculator",
  ],
  openGraph: {
    title: "Science & Engineering Calculators (Coming Soon)",
    description:
      "Free physics, chemistry, and engineering calculators. Coming 2026.",
    type: "website",
    url: "https://aisocialtools.co/tools/science",
    siteName: "AISocialTools",
    images: [{ url: getOGImageUrl("default"), width: 1200, height: 630, alt: "Science Calculators — Coming Soon" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Science & Engineering Calculators — Coming Soon",
    description: "Free physics, chemistry, and engineering calculators.",
    images: [getOGImageUrl("default")],
  },
  alternates: { canonical: "https://aisocialtools.co/tools/science" },
  robots: { index: false, follow: true },
};

export default function ScienceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
