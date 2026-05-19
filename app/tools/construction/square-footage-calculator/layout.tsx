import { Metadata } from "next";
import { getOGImageUrl } from "@/lib/og-image-generator";

export const metadata: Metadata = {
  title: "Square Footage Calculator 2026 | Calculate Area in Sq Ft",
  description:
    "Free square footage calculator. Calculate area for rooms, houses, yards, and irregular shapes. Supports feet, inches, meters, and acres. Perfect for.",
  keywords: [
    "square footage calculator",
    "sq ft calculator",
    "square feet calculator",
    "area calculator",
    "room area calculator",
    "how to calculate square footage",
    "square footage of a room",
    "calculate sq ft",
    "square footage formula",
    "irregular shape area calculator",
    "house square footage calculator",
    "acre to sq ft calculator",
    "sq ft to sq meter converter",
    "l shaped room square footage",
    "total square footage calculator",
  ],
  alternates: {
    canonical: "https://aisocialtools.co/tools/construction/square-footage-calculator",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Square Footage Calculator | Calculate Area in Sq Ft",
    description: "Free square footage calculator for rooms, houses, yards, and irregular shapes. Supports feet, inches, meters, and acres. Perfect for flooring, paint, and.",
    url: "https://aisocialtools.co/tools/construction/square-footage-calculator",
    type: "website",
    siteName: "AISocialTools",
    images: [{ url: getOGImageUrl("default"), width: 1200, height: 630, alt: "Square Footage Calculator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Square Footage Calculator | Calculate Area in Sq Ft",
    description: "Free square footage calculator for rooms, houses, and irregular shapes. Supports feet, inches, meters, and acres.",
    images: [getOGImageUrl("default")],
  },
};

export default function SquareFootageCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
