import { generateMetadataForTool } from "@/lib/seo-metadata";
import { getToolById } from "@/lib/social-tools";
import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";

export const metadata: Metadata = generateMetadataForTool(getToolById("aesthetic-snapchat-username-generator")!);

export default function AestheticSnapchatUsernameLayout({ children }: { children: React.ReactNode }) {
  return <ToolLayout>{children}</ToolLayout>;
}
