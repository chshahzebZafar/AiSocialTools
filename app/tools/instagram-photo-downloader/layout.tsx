import { generateMetadataForTool } from "@/lib/seo-metadata";
import { getToolById } from "@/lib/social-tools";
import type { Metadata } from "next";

export const metadata: Metadata = generateMetadataForTool(getToolById("instagram-photo-downloader")!);

export default function InstagramPhotoDownloaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
