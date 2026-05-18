// Tool disabled — see lib/social-tools.ts for the full context and the
// re-enablement checklist. This layout is intentionally minimal so the
// route returns 404 without touching the tool registry.
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not Found",
  robots: { index: false, follow: true },
};

export default function BackgroundRemoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
