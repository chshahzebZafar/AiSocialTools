"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Clock, Search, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/animations/Reveal";
import type { BlogPost } from "@/lib/blog-posts";

interface BlogFilterClientProps {
  posts: BlogPost[];
  categories: string[];
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogFilterClient({ posts, categories }: BlogFilterClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredPosts = useMemo(() => {
    let filtered = posts;
    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((tag) => tag.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q)
      );
    }
    return filtered.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }, [posts, searchQuery, selectedCategory]);

  return (
    <>
      {/* Filters */}
      <section className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search articles…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 h-10 border border-zinc-200 dark:border-zinc-800 rounded-md focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400"
              />
            </div>
            <div className="relative sm:w-56">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-10 pl-3 pr-8 border border-zinc-200 dark:border-zinc-800 rounded-md focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 appearance-none cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}{" "}
                    {cat !== "All" &&
                      `(${posts.filter((p) => p.category === cat).length})`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Posts list */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length > 0 ? (
            <>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8">
                {filteredPosts.length}{" "}
                {filteredPosts.length === 1 ? "article" : "articles"}
                {selectedCategory !== "All" && ` in ${selectedCategory}`}
                {searchQuery && ` matching "${searchQuery}"`}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
                {filteredPosts.map((post, i) => (
                  <Reveal key={post.id} delay={Math.min(i * 40, 400)}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group block bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors h-full"
                    >
                      <article className="p-6 sm:p-7 h-full flex flex-col">
                        <div className="flex items-center gap-2 mb-4">
                          <Badge variant="neutral" className="text-[10px]">
                            {post.category}
                          </Badge>
                          {post.featured && (
                            <Badge variant="warning" className="text-[10px]">
                              Featured
                            </Badge>
                          )}
                        </div>

                        <h2 className="text-xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-3 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {post.title}
                        </h2>

                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3 mb-6 flex-1">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-900 mt-auto">
                          <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-500">
                            <span>{formatDate(post.publishedAt)}</span>
                            <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                            <span className="inline-flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {post.readTime} min
                            </span>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </div>
                      </article>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg">
              <p className="text-zinc-500 dark:text-zinc-400 mb-2">No articles found</p>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                Try a different search or category
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
