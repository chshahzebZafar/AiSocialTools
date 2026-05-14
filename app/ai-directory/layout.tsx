import type { Metadata } from "next";
import { getOGImageUrl } from "@/lib/og-image-generator";

export const metadata: Metadata = {
  title: "AI Tools Directory — Curated, Verified, Free to Browse",
  description:
    "Hand-picked directory of 120+ AI tools for content, image, video, code, and more. Honest pros, cons, and pricing. Free, no signup.",
  keywords: [
    "AI tools directory",
    "best AI tools 2026",
    "AI tools list",
    "free AI tools",
    "AI tools comparison",
    "AI productivity tools",
    "AI image generators",
    "AI video tools",
    "AI coding tools",
    "AI chat tools",
    "curated AI tools",
    "verified AI tools",
  ],
  openGraph: {
    title: "AI Tools Directory — Curated, Verified, Free to Browse",
    description:
      "Hand-picked directory of 120+ AI tools with honest pros, cons, and pricing. No spam, no affiliate fluff.",
    type: "website",
    url: "https://aisocialtools.co/ai-directory",
    siteName: "AISocialTools",
    images: [
      {
        url: getOGImageUrl("default"),
        width: 1200,
        height: 630,
        alt: "AI Tools Directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Tools Directory — Curated, Verified, Free to Browse",
    description:
      "Hand-picked directory of 120+ AI tools with honest pros, cons, and pricing.",
    images: [getOGImageUrl("default")],
  },
  alternates: { canonical: "https://aisocialtools.co/ai-directory" },
  robots: { index: true, follow: true },
};

export default function AIDirectoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
