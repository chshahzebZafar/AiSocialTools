"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Clock, User, ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { getFeaturedBlogPosts, BlogPost } from "@/lib/blog-posts";

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
    }, 6000);
    return () => clearInterval(interval);
  }, [posts.length, isHovered]);

  if (posts.length === 0) return null;

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % posts.length);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric",
      year: "numeric"
    });
  };

  const getGradientColors = (index: number) => {
    const gradients = [
      "from-blue-500 via-purple-600 to-pink-600",
      "from-emerald-500 via-teal-600 to-cyan-600",
      "from-orange-500 via-red-600 to-pink-600",
      "from-violet-500 via-purple-600 to-fuchsia-600",
    ];
    return gradients[index % gradients.length];
  };

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.05),transparent_50%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Latest Articles</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
            Expert Insights & Strategies
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Discover proven tips, strategies, and insights to elevate your social media game
          </p>
        </div>

        {/* Slider Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Slider */}
          <div className="relative h-[600px] sm:h-[650px] lg:h-[700px]">
            {posts.map((post, index) => {
              const isActive = index === currentIndex;
              const isPrev = index === (currentIndex - 1 + posts.length) % posts.length;
              const isNext = index === (currentIndex + 1) % posts.length;
              
              return (
                <div
                  key={post.id}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    isActive
                      ? "opacity-100 scale-100 z-20 translate-x-0"
                      : isPrev
                      ? "opacity-40 scale-95 z-10 -translate-x-8 sm:-translate-x-12"
                      : isNext
                      ? "opacity-40 scale-95 z-10 translate-x-8 sm:translate-x-12"
                      : "opacity-0 scale-90 z-0 translate-x-0"
                  }`}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block h-full group"
                  >
                    <div className="h-full bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-200/50 dark:border-slate-700/50 hover:shadow-3xl transition-all duration-500">
                      <div className="grid lg:grid-cols-2 h-full">
                        {/* Image Section - Left */}
                        <div className={`relative h-64 sm:h-80 lg:h-full bg-gradient-to-br ${getGradientColors(index)} overflow-hidden`}>
                          {/* Animated Background Pattern */}
                          <div className="absolute inset-0 opacity-20">
                            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-[slide_20s_linear_infinite]" />
                          </div>
                          
                          {/* Overlay Gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                          
                          {/* Floating Elements */}
                          <div className="absolute top-6 left-6 z-20">
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur-md text-blue-600 rounded-full text-xs font-bold shadow-xl">
                              <TrendingUp className="w-3 h-3" />
                              {post.category}
                            </span>
                          </div>
                          
                          {post.featured && (
                            <div className="absolute top-6 right-6 z-20">
                              <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 text-white rounded-full text-xs font-bold shadow-xl animate-pulse">
                                <Sparkles className="w-3 h-3" />
                                Featured
                              </span>
                            </div>
                          )}

                          {/* Content Overlay */}
                          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10 z-20">
                            <div className="space-y-4">
                              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight line-clamp-2 group-hover:translate-y-[-4px] transition-transform duration-300">
                                {post.title}
                              </h3>
                              <p className="text-blue-100 text-base sm:text-lg line-clamp-2 opacity-90">
                                {post.excerpt}
                              </p>
                            </div>
                          </div>

                          {/* Decorative Elements */}
                          <div className="absolute top-1/2 right-8 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
                          <div className="absolute bottom-1/4 left-8 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
                        </div>

                        {/* Content Section - Right */}
                        <div className="p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-between bg-gradient-to-br from-white via-slate-50 to-blue-50/30 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900">
                          <div className="space-y-6">
                            {/* Meta Info */}
                            <div className="flex flex-wrap items-center gap-4">
                              <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                                  <User className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <div className="text-xs text-slate-500 dark:text-slate-400">Author</div>
                                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{post.author}</div>
                                </div>
                              </div>
                              <div className="h-8 w-px bg-slate-300 dark:bg-slate-600" />
                              <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                                  <Clock className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <div className="text-xs text-slate-500 dark:text-slate-400">Read Time</div>
                                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{post.readTime} min</div>
                                </div>
                              </div>
                            </div>

                            {/* Date */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
                              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                                {formatDate(post.publishedAt)}
                              </span>
                            </div>

                            {/* Excerpt */}
                            <div className="space-y-3">
                              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base sm:text-lg line-clamp-4">
                                {post.excerpt}
                              </p>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                              {post.tags.slice(0, 4).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-semibold border border-blue-200 dark:border-blue-800 hover:scale-105 transition-transform"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* CTA Button */}
                          <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                            <div className="inline-flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group/btn">
                              <span>Read Full Article</span>
                              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center border border-slate-200 dark:border-slate-700 group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center border border-slate-200 dark:border-slate-700 group"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
          </button>

          {/* Progress Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
            <div className="flex items-center gap-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-4 py-2 rounded-full shadow-xl border border-slate-200 dark:border-slate-700">
              {posts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="relative group"
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <div className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-gradient-to-r from-blue-600 to-purple-600"
                      : "w-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"
                  }`} />
                  {index === currentIndex && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
          >
            <span>Explore All Articles</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 20px 20px;
          }
        }
      `}</style>
    </section>
  );
}
