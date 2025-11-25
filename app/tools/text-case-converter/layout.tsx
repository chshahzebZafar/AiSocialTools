import { generateMetadataForTool } from "@/lib/seo-metadata";
import { getToolById } from "@/lib/social-tools";
import type { Metadata } from "next";

export const metadata: Metadata = generateMetadataForTool(getToolById("text-case-converter")!);

export default function TextCaseConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
