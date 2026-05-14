import type { Metadata } from "next";
import { getOGImageUrl } from "@/lib/og-image-generator";

export const metadata: Metadata = {
  title: "Social Media Tools — Free 40+ Online Tools 2026",
  description:
    "Browse 40+ free social media tools for tweets, Instagram posts, YouTube thumbnails, hashtags, and more. Browser-based. No signup.",
  keywords: [
    "social media tools",
    "free social media tools",
    "social media tools list",
    "best free tools online",
    "social media management tools",
    "content creation tools online",
    "social media toolkit",
    "social media tools collection",
    "free tools for creators",
  ],
  openGraph: {
    title: "Social Media Tools — Free Online Tools Collection",
    description:
      "Browse our complete collection of free social media tools. All tools are 100% free with no signup required.",
    type: "website",
    url: "https://aisocialtools.co/tools/social-media",
    siteName: "AISocialTools",
    images: [
      {
        url: getOGImageUrl("tools"),
        width: 1200,
        height: 630,
        alt: "Social Media Tools — Free Online Tools Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Social Media Tools — Free Online Tools Collection",
    description:
      "Browse our complete collection of free social media tools. All tools are 100% free with no signup required.",
    images: [getOGImageUrl("tools")],
  },
  alternates: { canonical: "https://aisocialtools.co/tools/social-media" },
  robots: { index: true, follow: true },
};

export default function SocialMediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
