import { generateMetadataForTool } from "@/lib/seo-metadata";
import { getToolById } from "@/lib/social-tools";
import type { Metadata } from "next";

export const metadata: Metadata = generateMetadataForTool(getToolById("youtube-thumbnail")!);

export default function YoutubeThumbnailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
