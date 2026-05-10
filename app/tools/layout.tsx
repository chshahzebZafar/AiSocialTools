import type { Metadata } from "next";
import { getOGImageUrl } from "@/lib/og-image-generator";

export const metadata: Metadata = {
  title: "Free Social Media Tools - 40+ Online Tools 2026",
  description: "Browse 40+ free social media tools for tweets, Instagram posts, YouTube thumbnails, hashtags, and more. No signup. For creators and marketers.",
  keywords: [
    "all social media tools",
    "free social media tools list",
    "complete tools collection",
    "best free tools online",
    "social media management tools free",
    "content creation tools online",
    "free online tools no signup",
    "social media toolkit",
    "all free tools",
    "social media tools collection",
    "free tools for creators",
    "online social media tools"
  ],
  openGraph: {
    title: "All Social Media Tools - Free Online Tools Collection",
    description: "Browse our complete collection of free social media tools. All tools are 100% free with no signup required.",
    type: "website",
    url: "https://aisocialtools.co/tools",
    siteName: "Social Media Tools",
    images: [
      {
        url: getOGImageUrl("tools"),
        width: 1200,
        height: 630,
        alt: "All Social Media Tools - Free Online Tools Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Social Media Tools - Free Online Tools Collection",
    description: "Browse our complete collection of free social media tools. All tools are 100% free with no signup required.",
    images: [getOGImageUrl("tools")],
  },
  alternates: {
    canonical: "https://aisocialtools.co/tools",
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
