import { generateMetadataForTool } from "@/lib/seo-metadata";
import { getToolById } from "@/lib/social-tools";
import type { Metadata } from "next";

export const metadata: Metadata = generateMetadataForTool(getToolById("twitter-ad-revenue")!);

export default function TwitterAdRevenueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
