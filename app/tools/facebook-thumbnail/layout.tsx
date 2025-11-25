import { generateMetadataForTool } from "@/lib/seo-metadata";
import { getToolById } from "@/lib/social-tools";
import type { Metadata } from "next";

export const metadata: Metadata = generateMetadataForTool(getToolById("facebook-thumbnail")!);

export default function FacebookThumbnailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

