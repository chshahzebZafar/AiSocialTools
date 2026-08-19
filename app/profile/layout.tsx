// /profile is an authenticated, per-user view — there is nothing here for a
// search engine to index, and its content differs for every visitor. page.tsx
// is a client component with no metadata export, so without this layout the
// route inherits root metadata and is served as index,follow.
//
// follow: true is deliberate — the page links out to tool pages we do want
// crawled, so we drop the page from the index without stranding those links.
//
// Note: this is NOT handled via a robots.txt disallow. A disallow would stop
// Googlebot fetching the page and therefore from ever seeing this noindex,
// which can leave a bare URL in the index instead of removing it.
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Profile",
  robots: { index: false, follow: true },
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
