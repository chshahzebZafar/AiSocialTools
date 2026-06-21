import { generateMetadataForTool } from "@/lib/seo-metadata";
import { getToolById } from "@/lib/social-tools";
import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";

export const metadata: Metadata = generateMetadataForTool(getToolById("cool-snapchat-username-generator")!);

export default function CoolSnapchatUsernameLayout({ children }: { children: React.ReactNode }) {
  return <ToolLayout>{children}</ToolLayout>;
}
