// Bare layout for embeddable widgets.
//
// Deliberately excludes Header, Footer, and LeadCapturePopup — anything shown
// inside someone else's page must be the tool and nothing else. A popup firing
// inside a third-party iframe would be a good way to never get embedded twice.
//
// These routes are noindex: they duplicate the full tool pages and exist to be
// framed, not found. The canonical, indexable version is /tools/<id>.
//
// Framing is enabled for these paths in next.config.ts, which otherwise sends
// X-Frame-Options: SAMEORIGIN site-wide and would block every external embed.
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-zinc-950 antialiased">
      {children}
    </div>
  );
}
