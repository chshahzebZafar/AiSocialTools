import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Info, Users, Target, Heart } from "lucide-react";
import type { Metadata } from "next";
import { getOGImageUrl } from "@/lib/og-image-generator";

export const metadata: Metadata = {
  title: "About Us - Free Social Media Tools",
  description: "Learn about Social Media Tools - your free resource for powerful social media management tools. 100% free, no signup required. Discover our mission and values.",
  keywords: ["about social media tools", "free tools", "social media management", "content creation"],
  openGraph: {
    title: "About Us - Free Social Media Tools",
    description: "Learn about Social Media Tools - your free resource for powerful social media management tools.",
    type: "website",
    url: "https://socialmediatools.netlify.app/about",
    siteName: "Social Media Tools",
    images: [
      {
        url: getOGImageUrl("default"),
        width: 1200,
        height: 630,
        alt: "About Us - Free Social Media Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - Free Social Media Tools",
    description: "Learn about Social Media Tools - your free resource for powerful social media management tools.",
    images: [getOGImageUrl("default")],
  },
  alternates: {
    canonical: "https://socialmediatools.netlify.app/about",
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header />
      <main className="flex-1">
        <Breadcrumbs />
        <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Info className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">About Us</h1>
          </div>

          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              Welcome to Social Media Tools, your one-stop destination for free, powerful tools to help you create, 
              manage, and optimize your social media content. We're dedicated to providing high-quality, easy-to-use 
              tools that help content creators, marketers, and social media enthusiasts grow their online presence.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <Target className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">Our Mission</h3>
                <p className="text-slate-700 dark:text-slate-300">
                  To empower creators and businesses with free, accessible tools that make social media management 
                  easier and more effective.
                </p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
                <Users className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-3" />
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">Who We Serve</h3>
                <p className="text-slate-700 dark:text-slate-300">
                  Content creators, social media managers, small businesses, and anyone looking to enhance their 
                  social media presence.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 border border-slate-200 dark:border-slate-700 my-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Why Choose Us?</h2>
              <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span><strong>100% Free:</strong> All our tools are completely free to use with no hidden costs or subscriptions.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span><strong>No Signup Required:</strong> Start using our tools immediately without creating an account.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Privacy First:</strong> We don't collect or store your personal data. Your content stays yours.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Regular Updates:</strong> We continuously add new tools and improve existing ones based on user feedback.</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Our Tools</h2>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                We offer a comprehensive suite of social media tools including:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 dark:text-slate-300">
                <li>• Content generators (Tweets, Instagram posts, TikTok hooks)</li>
                <li>• Thumbnail downloaders (YouTube, Vimeo, Facebook)</li>
                <li>• Hashtag and caption generators</li>
                <li>• Analytics and engagement calculators</li>
                <li>• Image tools (resizer, filters, QR codes)</li>
                <li>• Text-to-handwriting converter</li>
                <li>• WhatsApp chat link generator</li>
                <li>• And many more!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      </main>
      <Footer />
    </div>
  );
}

