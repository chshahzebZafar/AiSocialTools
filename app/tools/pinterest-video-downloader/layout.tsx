import { generateMetadataForTool } from "@/lib/seo-metadata";
import { getToolById } from "@/lib/social-tools";
import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";

export const metadata: Metadata = generateMetadataForTool(getToolById("pinterest-video-downloader")!);

export default function PinterestVideoDownloaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ToolLayout>{children}</ToolLayout>;
}
