import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import { getOGImageUrl } from "@/lib/og-image-generator";

const CANONICAL_URL = "https://aisocialtools.co/tools/instagram-tools";

export const metadata: Metadata = {
  title: "Free Instagram Tools 2026 — Captions, Hashtags, Fonts, Analytics",
  description:
    "The complete free Instagram toolkit — post generator, caption templates, hashtag generator, Instagram fonts, engagement calculator, best time to post, and more. All free, no signup, 2026 ready.",
  keywords: [
    "free instagram tools",
    "instagram tools 2026",
    "instagram toolkit",
    "instagram marketing tools free",
    "best free instagram tools",
    "instagram creator tools",
    "instagram tools for business",
    "instagram caption generator",
    "instagram hashtag tools",
    "instagram font generator",
    "instagram engagement calculator",
  ],
  alternates: {
    canonical: CANONICAL_URL,
    languages: {
      "en": CANONICAL_URL,
      "x-default": CANONICAL_URL,
    },
  },
  openGraph: {
    title: "Free Instagram Tools 2026 — Complete Toolkit",
    description:
      "12+ free Instagram tools — post generator, captions, hashtags, fonts, engagement calculator, and more. No signup required.",
    type: "website",
    url: CANONICAL_URL,
    siteName: "AISocialTools",
    images: [{ url: getOGImageUrl("default"), width: 1200, height: 630, alt: "Free Instagram Tools" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Instagram Tools 2026 — Complete Toolkit",
    description: "12+ free Instagram tools. No signup.",
    images: [getOGImageUrl("default")],
  },
  robots: { index: true, follow: true },
};

export default function InstagramToolsLayout({ children }: { children: React.ReactNode }) {
  return <ToolLayout>{children}</ToolLayout>;
}
