import type { Metadata } from "next";
import { getOGImageUrl } from "@/lib/og-image-generator";

export const metadata: Metadata = {
  title: "Real Estate Tools — Free Calculators (Coming Soon)",
  description:
    "Free real-estate calculators for affordability, rent vs. buy, ROI, cap rate, and closing costs. For buyers, agents, and investors. Coming Q2 2026.",
  keywords: [
    "real estate calculator",
    "mortgage affordability calculator",
    "rent vs buy calculator",
    "cap rate calculator",
    "property ROI calculator",
    "cash on cash return",
    "closing cost calculator",
    "free real estate tools",
  ],
  openGraph: {
    title: "Real Estate Tools — Free Calculators (Coming Soon)",
    description:
      "Free real-estate calculators for buyers, agents, and investors.",
    type: "website",
    url: "https://aisocialtools.co/tools/real-estate",
    siteName: "Social Media Tools",
    images: [
      {
        url: getOGImageUrl("default"),
        width: 1200,
        height: 630,
        alt: "Real Estate Tools — Coming Soon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Estate Tools — Free Calculators (Coming Soon)",
    description: "Free real-estate calculators — coming Q2 2026.",
    images: [getOGImageUrl("default")],
  },
  alternates: { canonical: "https://aisocialtools.co/tools/real-estate" },
  robots: { index: true, follow: true },
};

export default function RealEstateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
