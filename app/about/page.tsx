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
    url: "https://aisocialtools.co/about",
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
    canonical: "https://aisocialtools.co/about",
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
              Welcome to Social Media Tools—your trusted partner in social media success. We're on a mission to democratize 
              content creation by providing powerful, free tools that help creators, marketers, and businesses build their 
              online presence without breaking the bank or compromising on quality.
            </p>

            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              Founded with a simple belief: everyone deserves access to professional-grade social media tools, regardless of 
              budget or technical expertise. Whether you're a solo creator just starting out, a small business owner managing 
              your own social media, or a seasoned marketer looking for efficient solutions, we've built tools that work for you.
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
                  <span><strong>100% Free Forever:</strong> All our tools are completely free to use with no hidden costs, subscriptions, or premium tiers. What you see is what you get—powerful features at zero cost.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span><strong>No Signup Required:</strong> Start using our tools immediately without creating an account, providing your email, or going through any registration process. Instant access, zero friction.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Privacy First:</strong> We don't collect, store, or share your personal data. All processing happens in your browser, ensuring your content and information stay completely private and secure.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Regular Updates:</strong> We continuously add new tools and improve existing ones based on user feedback. Your success is our motivation to keep innovating.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Unlimited Usage:</strong> Use our tools as many times as you want, whenever you need them. No daily limits, no usage restrictions—just unlimited access to powerful features.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Professional Quality:</strong> Our tools are built with the same attention to detail and quality you'd expect from premium services, but available to everyone for free.</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Our Comprehensive Tool Suite</h2>
              <p className="text-slate-700 dark:text-slate-300 mb-6">
                We offer over 30 free tools designed to cover every aspect of social media content creation and management. 
                From ideation to execution, we've got you covered:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Content Creation Tools</h3>
                  <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                    <li>• AI Tweet Generator</li>
                    <li>• Instagram Post Generator</li>
                    <li>• TikTok Hook Generator</li>
                    <li>• Caption Templates</li>
                    <li>• Content Ideas Generator</li>
                    <li>• Bio & Username Generators</li>
                  </ul>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Media Tools</h3>
                  <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                    <li>• YouTube Thumbnail Downloader</li>
                    <li>• Image Resizer & Upscaler</li>
                    <li>• Background Remover</li>
                    <li>• Instagram Filters</li>
                    <li>• QR Code Generator</li>
                    <li>• Video to GIF Converter</li>
                  </ul>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Analytics & Strategy</h3>
                  <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                    <li>• Engagement Calculator</li>
                    <li>• Analytics Calculator</li>
                    <li>• Best Time to Post Calculator</li>
                    <li>• Twitter Ad Revenue Calculator</li>
                    <li>• Content Calendar</li>
                    <li>• Character Counter</li>
                  </ul>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Utility Tools</h3>
                  <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                    <li>• Hashtag Generator</li>
                    <li>• Text Case Converter</li>
                    <li>• Emoji Picker</li>
                    <li>• Open Graph Generator</li>
                    <li>• PDF Tools (Merge, Split, Convert)</li>
                    <li>• WhatsApp Chat Link Generator</li>
                  </ul>
                </div>
              </div>

              <p className="text-slate-700 dark:text-slate-300">
                And we're constantly adding more! Every tool is designed with one goal in mind: making your social media 
                workflow faster, easier, and more effective. No matter what you need, we've built a tool to help you succeed.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Our Commitment to You</h2>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                We're not just building tools—we're building a community of creators, marketers, and entrepreneurs who 
                believe that great content shouldn't require a huge budget. Our commitment to you includes:
              </p>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">→</span>
                  <span><strong>Continuous Improvement:</strong> We listen to your feedback and regularly update our tools with new features and improvements.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">→</span>
                  <span><strong>Educational Resources:</strong> Our blog and guides help you maximize the value of every tool and stay ahead of social media trends.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">→</span>
                  <span><strong>Community Support:</strong> We're here to help. Reach out anytime with questions, suggestions, or feedback.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">→</span>
                  <span><strong>Transparency:</strong> No hidden fees, no data collection, no surprises—just honest, straightforward tools that work.</span>
                </li>
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

