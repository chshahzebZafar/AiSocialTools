import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ToolSchemaInjector from "@/components/ToolSchemaInjector";

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      {/* WebApplication JSON-LD schema — injected once here so all tool
          pages get structured data without touching individual page files */}
      <ToolSchemaInjector />

      {/* Same shell as the rest of the site: full-width Header + centered
          content + Footer. No sidebar — tool pages now match the homepage,
          blog, and other pages. */}
      <Header />

      <main className="flex-1 w-full">{children}</main>

      <Footer />
    </div>
  );
}
