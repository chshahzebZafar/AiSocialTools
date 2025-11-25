import { generateMetadataForTool } from "@/lib/seo-metadata";
import { getToolById } from "@/lib/social-tools";
import type { Metadata } from "next";

export const metadata: Metadata = generateMetadataForTool(getToolById("emoji-picker")!);

export default function EmojiPickerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
