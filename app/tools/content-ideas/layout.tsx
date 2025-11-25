import { generateMetadataForTool } from "@/lib/seo-metadata";
import { getToolById } from "@/lib/social-tools";
import type { Metadata } from "next";

export const metadata: Metadata = generateMetadataForTool(getToolById("content-ideas")!);

export default function ContentIdeasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
