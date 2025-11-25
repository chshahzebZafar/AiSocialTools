import { generateMetadataForTool } from "@/lib/seo-metadata";
import { getToolById } from "@/lib/social-tools";
import type { Metadata } from "next";

export const metadata: Metadata = generateMetadataForTool(getToolById("caption-templates")!);

export default function CaptionTemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
