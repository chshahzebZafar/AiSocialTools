// Tool temporarily disabled — see lib/social-tools.ts for context.
// This layout doesn't touch the tool registry so the route renders the
// Coming Soon page (page.tsx) without 404ing. Page is noindex so Google
// doesn't index the placeholder.
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Image Generator — Coming Soon | AI Social Tools",
  description:
    "Our AI Image Generator is being upgraded to a more reliable free model. Check back soon, or explore 45+ free social media tools in the meantime.",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://aisocialtools.co/tools/ai-image-generator" },
};

export default function AIImageGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
