import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogPosts } from "@/lib/blog-posts";
import { Badge } from "@/components/ui/Badge";
import BlogFilterClient from "./BlogFilterClient";

// Server Component — no "use client". Interactive search/filter lives in
// BlogFilterClient so all 21 post cards are present in the initial HTML
// and fully crawlable by Googlebot.

const categories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category))).sort()];

const sortedPosts = [...blogPosts].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
);

export default function BlogPage() {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Social Media Blog — Tips & Growth Strategies",
    description: "Practical writing on what actually works on each platform.",
    url: "https://aisocialtools.co/blog",
    publisher: {
      "@type": "Organization",
      name: "Social Tools",
      url: "https://aisocialtools.co",
    },
    blogPost: blogPosts.slice(0, 10).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt || post.publishedAt,
      url: `https://aisocialtools.co/blog/${post.slug}`,
      author: {
        "@type": "Person",
        name: post.author,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://aisocialtools.co" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://aisocialtools.co/blog" },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main className="flex-1">
        {/* Hero — server-rendered, fully crawlable */}
        <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
          <div className="aurora" aria-hidden />
          <div className="absolute inset-0 bg-dot-grid-animated opacity-50" aria-hidden />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
            <Badge variant="accent" className="mb-5">
              Writing
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-zinc-950 dark:text-white tracking-tight leading-[1.05] mb-5 max-w-3xl">
              Strategy notes
              <br />
              <span className="text-zinc-500 dark:text-zinc-400">& playbooks.</span>
            </h1>
            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
              Practical writing on what actually works on each platform — no growth-hacker
              clichés, no engagement bait.
            </p>
          </div>
        </section>

        {/* Interactive filter + post grid — client component handles state,
            server pre-renders all posts so Googlebot sees them on first load */}
        <BlogFilterClient posts={sortedPosts} categories={categories} />
      </main>
      <Footer />
    </div>
  );
}
