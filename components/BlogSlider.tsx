"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Clock, ArrowRight } from "lucide-react";
import { getFeaturedBlogPosts, BlogPost } from "@/lib/blog-posts";
import { Badge } from "./ui/Badge";

export default function BlogSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setPosts(getFeaturedBlogPosts().slice(0, 3));
  }, []);

  useEffect(() => {
    if (posts.length === 0 || isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % posts.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [posts.length, isHovered]);

  if (posts.length === 0) return null;

  const goToSlide = (index: number) => setCurrentIndex(index);
  const goToPrevious = () =>
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % posts.length);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <section className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div className="max-w-2xl">
            <Badge variant="neutral" className="mb-4">
              Writing
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-4">
              Strategy notes & playbooks.
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Practical writing on what actually works on each platform — no growth-hacker
              clichés.
            </p>
          </div>
          <Link
            href="/blog"
            className="text-sm font-medium text-zinc-950 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors inline-flex items-center gap-1 self-start sm:self-end"
          >
            All articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Slider */}
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {posts.map((post) => (
                <article key={post.id} className="w-full flex-shrink-0">
                  <Link href={`/blog/${post.slug}`} className="block group">
                    <div className="grid lg:grid-cols-5">
                      {/* Image / numbered side */}
                      <div className="lg:col-span-2 relative aspect-[16/9] lg:aspect-auto bg-zinc-100 dark:bg-zinc-900 border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800 flex items-center justify-center overflow-hidden">
                        <div className="absolute top-5 left-5 text-xs font-mono text-zinc-500 dark:text-zinc-500 tabular-nums">
                          {String(posts.indexOf(post) + 1).padStart(2, "0")} /{" "}
                          {String(posts.length).padStart(2, "0")}
                        </div>
                        <div className="text-center px-8">
                          <div className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-500 mb-3">
                            {post.category}
                          </div>
                          <div className="text-2xl sm:text-3xl font-semibold text-zinc-950 dark:text-white tracking-tight leading-tight line-clamp-3">
                            {post.title}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="lg:col-span-3 p-8 sm:p-10 lg:p-12 flex flex-col">
                        <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-500 mb-6">
                          <span>{formatDate(post.publishedAt)}</span>
                          <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime} min read
                          </span>
                          <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                          <span>by {post.author}</span>
                        </div>

                        <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed line-clamp-4 mb-8 flex-1">
                          {post.excerpt}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-8">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="neutral">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-950 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          Read article
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-1.5">
              {posts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-1 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-8 bg-zinc-950 dark:bg-white"
                      : "w-4 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={goToPrevious}
                aria-label="Previous"
                className="w-9 h-9 flex items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
              </button>
              <button
                onClick={goToNext}
                aria-label="Next"
                className="w-9 h-9 flex items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
