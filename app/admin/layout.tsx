// Admin area. Never indexed, never linked from the public site.
//
// The real protection is the signed session cookie checked by every
// /api/admin/* route — noindex only keeps the page out of search results, it is
// not access control. app/robots.ts also disallows /admin.
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-zinc-50 text-zinc-950">{children}</div>;
}
