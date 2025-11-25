import { generateMetadataForTool } from "@/lib/seo-metadata";
import { getToolById } from "@/lib/social-tools";
import type { Metadata } from "next";

export const metadata: Metadata = generateMetadataForTool(getToolById("tweet-to-image")!);

export default function TweetToImageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

