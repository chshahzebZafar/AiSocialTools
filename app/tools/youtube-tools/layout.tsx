import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import { getOGImageUrl } from "@/lib/og-image-generator";

const URL = "https://aisocialtools.co/tools/youtube-tools";

export const metadata: Metadata = {
  title: "Free YouTube Tools 2026 — Tags, Descriptions, Thumbnails, Earnings",
  description:
    "Complete free YouTube toolkit — tag generator, description generator, money calculator, thumbnail downloader, and more. Grow your channel with free SEO tools. No signup required.",
  keywords: [
    "free youtube tools",
    "youtube creator tools",
    "youtube seo tools free",
    "youtube toolkit",
    "youtube tools 2026",
    "best free youtube tools",
    "youtube tag generator",
    "youtube description generator",
    "youtube money calculator",
    "youtube thumbnail downloader",
    "youtube channel tools",
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: "Free YouTube Tools 2026 — Complete Creator Toolkit",
    description: "Tag generator, description builder, money calculator, thumbnail downloader. All free, no signup.",
    type: "website",
    url: URL,
    siteName: "AI Social Tools",
    images: [{ url: getOGImageUrl("default"), width: 1200, height: 630, alt: "Free YouTube Tools" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free YouTube Tools 2026 — Complete Creator Toolkit",
    description: "Free YouTube SEO tools for creators.",
    images: [getOGImageUrl("default")],
  },
  robots: { index: true, follow: true },
};

export default function YouTubeToolsLayout({ children }: { children: React.ReactNode }) {
  return <ToolLayout>{children}</ToolLayout>;
}
