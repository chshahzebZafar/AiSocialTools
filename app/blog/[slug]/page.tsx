import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getBlogPostBySlug, getRecentBlogPosts, blogPosts } from "@/lib/blog-posts";
import { Clock, User, Calendar, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { getOGImageUrl } from "@/lib/og-image-generator";
import ShareButtons from "@/components/ShareButtons";
import { getEnhancedArticleSchema } from "@/lib/enhanced-schemas";
import { generateBreadcrumbSchema, getBlogBreadcrumbs } from "@/lib/seo-utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: `${post.title} | Social Media Tools Blog`,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://aisocialtools.co/blog/${post.slug}`,
      siteName: "AISocialTools",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: getOGImageUrl("default"),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [getOGImageUrl("default")],
    },
    alternates: {
      canonical: `https://aisocialtools.co/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  const recentPosts = getRecentBlogPosts(3).filter(p => p.slug !== slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    });
  };

  // Convert markdown-like content to HTML (enhanced)
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactElement[] = [];
    let currentParagraph: string[] = [];
    let listItems: string[] = [];
    let inList = false;
    let listKey = 0;

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith("# ")) {
        if (currentParagraph.length > 0) {
          elements.push(<p key={`p-${index}`} className="mb-6 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">{currentParagraph.join(" ")}</p>);
          currentParagraph = [];
        }
        if (inList && listItems.length > 0) {
          elements.push(<ul key={`ul-${listKey++}`} className="list-disc list-inside mb-6 space-y-2 text-slate-700 dark:text-slate-300 ml-4">{listItems.map((item, i) => <li key={i} className="leading-relaxed">{item}</li>)}</ul>);
          listItems = [];
          inList = false;
        }
        elements.push(<h1 key={`h1-${index}`} className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-6 mt-12 leading-tight">{trimmedLine.substring(2)}</h1>);
      } else if (trimmedLine.startsWith("## ")) {
        if (currentParagraph.length > 0) {
          elements.push(<p key={`p-${index}`} className="mb-6 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">{currentParagraph.join(" ")}</p>);
          currentParagraph = [];
        }
        if (inList && listItems.length > 0) {
          elements.push(<ul key={`ul-${listKey++}`} className="list-disc list-inside mb-6 space-y-2 text-slate-700 dark:text-slate-300 ml-4">{listItems.map((item, i) => <li key={i} className="leading-relaxed">{item}</li>)}</ul>);
          listItems = [];
          inList = false;
        }
        elements.push(<h2 key={`h2-${index}`} className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4 mt-10 leading-tight">{trimmedLine.substring(3)}</h2>);
      } else if (trimmedLine.startsWith("### ")) {
        if (currentParagraph.length > 0) {
          elements.push(<p key={`p-${index}`} className="mb-6 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">{currentParagraph.join(" ")}</p>);
          currentParagraph = [];
        }
        if (inList && listItems.length > 0) {
          elements.push(<ul key={`ul-${listKey++}`} className="list-disc list-inside mb-6 space-y-2 text-slate-700 dark:text-slate-300 ml-4">{listItems.map((item, i) => <li key={i} className="leading-relaxed">{item}</li>)}</ul>);
          listItems = [];
          inList = false;
        }
        elements.push(<h3 key={`h3-${index}`} className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4 mt-8 leading-tight">{trimmedLine.substring(4)}</h3>);
      } else if (trimmedLine.startsWith("**") && trimmedLine.endsWith("**")) {
        currentParagraph.push(`<strong className="font-bold text-slate-900 dark:text-slate-100">${trimmedLine.substring(2, trimmedLine.length - 2)}</strong>`);
      } else if (trimmedLine.startsWith("- ") || trimmedLine.startsWith("* ")) {
        if (currentParagraph.length > 0) {
          elements.push(<p key={`p-${index}`} className="mb-6 text-slate-700 dark:text-slate-300 leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: currentParagraph.join(" ") }} />);
          currentParagraph = [];
        }
        inList = true;
        listItems.push(trimmedLine.substring(2));
      } else if (trimmedLine === "") {
        if (currentParagraph.length > 0) {
          elements.push(<p key={`p-${index}`} className="mb-6 text-slate-700 dark:text-slate-300 leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: currentParagraph.join(" ") }} />);
          currentParagraph = [];
        }
        if (inList && listItems.length > 0) {
          elements.push(<ul key={`ul-${listKey++}`} className="list-disc list-inside mb-6 space-y-2 text-slate-700 dark:text-slate-300 ml-4">{listItems.map((item, i) => <li key={i} className="leading-relaxed">{item}</li>)}</ul>);
          listItems = [];
          inList = false;
        }
      } else {
        currentParagraph.push(trimmedLine);
      }
    });

    if (currentParagraph.length > 0) {
      elements.push(<p key="p-final" className="mb-6 text-slate-700 dark:text-slate-300 leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: currentParagraph.join(" ") }} />);
    }
    if (inList && listItems.length > 0) {
      elements.push(<ul key="ul-final" className="list-disc list-inside mb-6 space-y-2 text-slate-700 dark:text-slate-300 ml-4">{listItems.map((item, i) => <li key={i} className="leading-relaxed">{item}</li>)}</ul>);
    }

    return elements;
  };

  // Enhanced Article Schema
  const articleSchema = getEnhancedArticleSchema(post);
  
  // Breadcrumb Schema
  const breadcrumbSchema = generateBreadcrumbSchema(getBlogBreadcrumbs(post));

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Enhanced Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main className="flex-1">
        {/* Back Button */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </div>

        {/* Article */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Header */}
          <header className="mb-8">
            <div className="mb-4">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold">
                {post.category}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              {post.title}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-6">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 dark:text-slate-400 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} min read</span>
              </div>
              <div className="ml-auto">
                <ShareButtons
                  title={post.title}
                  text={post.excerpt}
                />
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="mb-8 rounded-2xl overflow-hidden">
            <div className="relative h-64 sm:h-96 bg-gradient-to-br from-blue-500 to-purple-600">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {post.title}
                </h2>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 sm:p-10 lg:p-12 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="max-w-3xl mx-auto">
                {renderContent(post.content)}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?search=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full text-sm hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Share Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 sm:p-8 mb-12 border border-blue-200 dark:border-blue-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Enjoyed this article? Share it!
            </h3>
            <ShareButtons
              title={post.title}
              text={post.excerpt}
            />
          </div>

          {/* Related Posts */}
          {recentPosts.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="group"
                  >
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-all h-full">
                      <div className="relative h-32 bg-gradient-to-br from-blue-500 to-purple-600">
                        <div className="absolute top-2 left-2">
                          <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-blue-600 rounded text-xs font-semibold">
                            {relatedPost.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-2">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <Clock className="w-3 h-3" />
                          <span>{relatedPost.readTime} min read</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
}

