import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import { User, Mail, Github, Twitter, Linkedin, Coffee, Heart, Code, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import { getOGImageUrl } from "@/lib/og-image-generator";

export const metadata: Metadata = {
  title: "About the Author - Social Media Tools Creator",
  description: "Meet the creator behind Social Media Tools. Learn about the story, mission, and values behind our free social media tools platform.",
  keywords: ["author", "creator", "developer", "social media tools creator", "about author"],
  openGraph: {
    title: "About the Author - Social Media Tools Creator",
    description: "Meet the creator behind Social Media Tools. Learn about the story, mission, and values behind our free social media tools platform.",
    type: "website",
    url: "https://socialmediatools.com/author",
    siteName: "Social Media Tools",
    images: [
      {
        url: getOGImageUrl("default"),
        width: 1200,
        height: 630,
        alt: "About the Author - Social Media Tools Creator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About the Author - Social Media Tools Creator",
    description: "Meet the creator behind Social Media Tools. Learn about the story, mission, and values behind our free social media tools platform.",
    images: [getOGImageUrl("default")],
  },
  alternates: {
    canonical: "https://socialmediatools.com/author",
  },
};

export default function AuthorPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <main className="flex-1">
        <Breadcrumbs />
        <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
            {/* Author Header */}
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
                About the Author
              </h1>
              <p className="text-lg text-slate-600">
                Creator & Developer of Social Media Tools
              </p>
            </div>

            <div className="prose prose-slate max-w-none space-y-8">
              {/* Introduction */}
              <section className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Hello! 👋</h2>
                    <p className="text-slate-700 leading-relaxed">
                      I'm the creator behind Social Media Tools, a platform dedicated to providing free, 
                      powerful tools for content creators, marketers, and social media enthusiasts. My mission 
                      is to make social media management easier and more accessible for everyone.
                    </p>
                  </div>
                </div>
              </section>

              {/* Story */}
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Code className="w-6 h-6 text-purple-600" />
                  The Story Behind Social Media Tools
                </h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  As a developer and content creator myself, I understand the challenges of managing multiple 
                  social media platforms. I found myself constantly needing various tools for different tasks - 
                  from generating content ideas to downloading thumbnails, creating captions, and more.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Instead of paying for multiple expensive tools or dealing with complicated software, I decided 
                  to create a comprehensive suite of free tools that anyone can use. The result is Social Media 
                  Tools - a collection of powerful, easy-to-use tools that work entirely in your browser, 
                  requiring no signup and respecting your privacy.
                </p>
              </section>

              {/* Values */}
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Heart className="w-6 h-6 text-pink-600" />
                  My Values
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h3 className="font-semibold text-slate-900 mb-2">Free & Accessible</h3>
                    <p className="text-slate-700 text-sm">
                      I believe powerful tools should be available to everyone, regardless of budget. 
                      That's why all our tools are completely free.
                    </p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <h3 className="font-semibold text-slate-900 mb-2">Privacy First</h3>
                    <p className="text-slate-700 text-sm">
                      Your privacy matters. I've designed the platform to work entirely in your browser 
                      without collecting any personal data.
                    </p>
                  </div>
                  <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
                    <h3 className="font-semibold text-slate-900 mb-2">User-Focused</h3>
                    <p className="text-slate-700 text-sm">
                      Every tool is built with the user in mind. Simple, intuitive, and powerful - 
                      no learning curve required.
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h3 className="font-semibold text-slate-900 mb-2">Continuous Improvement</h3>
                    <p className="text-slate-700 text-sm">
                      I'm always working on new features and improvements based on user feedback. 
                      Your suggestions drive the platform forward.
                    </p>
                  </div>
                </div>
              </section>

              {/* Contact & Support */}
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Get in Touch</h2>
                <p className="text-slate-700 leading-relaxed mb-6">
                  I'd love to hear from you! Whether you have feedback, suggestions for new tools, 
                  or just want to say hello, feel free to reach out.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a
                    href="/contact"
                    className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors group"
                  >
                    <Mail className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="font-semibold text-slate-900">Email Me</div>
                      <div className="text-sm text-slate-600">Get in touch</div>
                    </div>
                  </a>
                  <a
                    href="https://buymeacoffee.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg border border-yellow-200 transition-colors group"
                  >
                    <Coffee className="w-5 h-5 text-yellow-600 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="font-semibold text-slate-900">Buy Me a Coffee</div>
                      <div className="text-sm text-slate-600">Support the project</div>
                    </div>
                  </a>
                </div>
              </section>

              {/* Social Links */}
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Connect With Me</h2>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://github.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://twitter.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg text-blue-700 transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                    <span>Twitter</span>
                  </a>
                  <a
                    href="https://linkedin.com/in/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg text-blue-700 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </section>

              {/* Thank You */}
              <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
                <h2 className="text-2xl font-bold mb-3">Thank You! 🙏</h2>
                <p className="leading-relaxed opacity-90">
                  Thank you for using Social Media Tools! Your support and feedback mean the world to me. 
                  I'm committed to continuously improving the platform and adding new tools based on your needs. 
                  Together, we're making social media management easier for everyone.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

