import type { Metadata } from "next";
import { getOGImageUrl } from "@/lib/og-image-generator";

export const metadata: Metadata = {
  title: "All Free Social Media Tools - Complete Online Tools Collection 2026",
  description: "Browse our complete collection of the best free social media tools online. Generate tweets, create Instagram posts, download YouTube thumbnails, generate hashtags, create captions, and more. All tools are 100% free with no signup required - perfect for content creators and marketers.",
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
    url: "https://socialmediatools.netlify.app/tools",
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
    canonical: "https://socialmediatools.netlify.app/tools",
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
