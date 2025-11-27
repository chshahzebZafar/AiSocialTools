import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { socialTools } from "@/lib/social-tools";
import type { Metadata } from "next";
import { getOGImageUrl } from "@/lib/og-image-generator";
import { 
  Sparkles, 
  Zap, 
  Shield, 
  Heart, 
  ArrowRight, 
  TrendingUp,
  Users,
  Clock
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free Social Media Tools - Create & Manage Content",
  description: "Powerful free social media tools for content creation, management, and optimization. Generate tweets, create Instagram posts, download thumbnails, and more. 100% free, no signup required.",
  keywords: [
    "social media tools",
    "free social media tools",
    "social media management",
    "content creation tools",
    "tweet generator",
    "instagram tools",
    "youtube thumbnail downloader",
    "hashtag generator",
    "social media analytics"
  ],
  openGraph: {
    title: "Free Social Media Tools - Create & Manage Content",
    description: "Powerful free social media tools for content creation, management, and optimization. 100% free, no signup required.",
    type: "website",
    url: "https://socialmediatools.netlify.app",
    siteName: "Social Media Tools",
    images: [
      {
        url: getOGImageUrl("home"),
        width: 1200,
        height: 630,
        alt: "Social Media Tools - Free Online Tools for Social Media",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Social Media Tools - Create & Manage Content",
    description: "Powerful free social media tools for content creation, management, and optimization. 100% free, no signup required.",
    images: [getOGImageUrl("home")],
  },
  alternates: {
    canonical: "https://socialmediatools.netlify.app",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  const featuredTools = socialTools.slice(0, 6);

  // Organization schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Social Media Tools",
    url: "https://socialmediatools.netlify.app",
    logo: {
      "@type": "ImageObject",
      url: "https://socialmediatools.netlify.app/og-default.png",
      width: 1200,
      height: 630
    },
    description: "Free social media tools for content creation, management, and optimization",
    sameAs: [
      "https://github.com/chshahzebZafar/",
      "https://x.com/SHAHZEBZAFAR99",
      "https://www.linkedin.com/in/shahzaib-zafer/",
      "https://shahzebzafar.netlify.app/"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      url: "https://socialmediatools.netlify.app/contact",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://socialmediatools.netlify.app/tools?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  // WebSite schema with search action
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Social Media Tools",
    url: "https://socialmediatools.netlify.app",
    description: "Free social media tools for content creation, management, and optimization",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://socialmediatools.netlify.app/tools?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  // FAQ schema for homepage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are these social media tools really free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all our social media tools are 100% free to use. There are no hidden costs, no credit card required, and no signup necessary. You can use all tools immediately without any restrictions."
        }
      },
      {
        "@type": "Question",
        name: "Do I need to create an account to use these tools?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, you don't need to create an account or sign up to use any of our tools. All tools work directly in your browser without requiring any registration or login."
        }
      },
      {
        "@type": "Question",
        name: "What types of social media tools are available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer a comprehensive suite of social media tools including content generators (tweets, captions, hashtags, bios), thumbnail downloaders (YouTube, Vimeo, Facebook), analytics calculators, image tools (resizer, filters, QR codes), and many more specialized tools for social media management."
        }
      },
      {
        "@type": "Question",
        name: "Is my data safe when using these tools?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, your privacy is our priority. All tools work entirely in your browser without sending your data to our servers. We don't collect, store, or share any personal information or content you create with our tools."
        }
      },
      {
        "@type": "Question",
        name: "Can I use these tools for commercial purposes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can use all our tools for both personal and commercial purposes. There are no restrictions on how you use the content generated by our tools."
        }
      },
      {
        "@type": "Question",
        name: "Which social media platforms are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our tools support all major social media platforms including Instagram, Twitter/X, LinkedIn, TikTok, Facebook, YouTube, and more. Many tools are platform-specific, while others work across multiple platforms."
        }
      }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-12 sm:py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 mb-6 shadow-sm">
                <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>100% Free • No Signup Required</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                Powerful Social Media Tools
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  For Everyone
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                Create, manage, and optimize your social media content with our comprehensive suite of free tools. 
                No credit card, no signup, just powerful tools at your fingertips.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/tools"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Explore Tools
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-all border border-slate-200"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 sm:py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">{socialTools.length}+</div>
                <div className="text-sm sm:text-base text-slate-600 dark:text-slate-400">Free Tools</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">100%</div>
                <div className="text-sm sm:text-base text-slate-600 dark:text-slate-400">Free Forever</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-pink-600 dark:text-pink-400 mb-2">0</div>
                <div className="text-sm sm:text-base text-slate-600 dark:text-slate-400">Signup Required</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">∞</div>
                <div className="text-sm sm:text-base text-slate-600 dark:text-slate-400">Unlimited Uses</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Why Choose Our Tools?
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Everything you need to succeed on social media, completely free
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">Lightning Fast</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Get results instantly. No waiting, no processing delays. All tools work in real-time.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">100% Private</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Your data stays yours. We don't collect, store, or share any of your personal information.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">Completely Free</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  No hidden costs, no premium tiers, no credit card required. Everything is free forever.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">Regular Updates</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  We continuously add new tools and improve existing ones based on user feedback.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">Easy to Use</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Intuitive interfaces designed for everyone. No technical skills required.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">No Signup</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Start using any tool immediately. No account creation, no email verification needed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Tools Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Explore Our Tools
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Discover powerful tools to enhance your social media presence
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
              {featuredTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.id}
                    href={tool.path}
                    className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 sm:p-6 hover:shadow-lg transition-all group hover:border-blue-300 dark:hover:border-blue-600"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {tool.name}
                          </h3>
                          <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors opacity-0 group-hover:opacity-100" />
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2">{tool.description}</p>
                        <span className="inline-block mt-2 text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded">
                          {tool.category}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="text-center">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                View All Tools
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Boost Your Social Media?
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 dark:text-blue-200 mb-8">
              Start using our free tools today. No signup, no credit card, just powerful tools at your fingertips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tools"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-lg"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
