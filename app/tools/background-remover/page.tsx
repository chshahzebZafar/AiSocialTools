// Tool temporarily disabled while the remove.bg API key is rotated and a
// server-side proxy route is built. The original implementation is preserved
// as page.tsx.disabled in this folder — restore it once the work in
// lib/social-tools.ts re-enablement checklist is complete.
import { notFound } from "next/navigation";

export default function BackgroundRemoverPage() {
  notFound();
}
