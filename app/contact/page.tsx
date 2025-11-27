import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Mail, MessageCircle, Send } from "lucide-react";
import type { Metadata } from "next";
import { getOGImageUrl } from "@/lib/og-image-generator";

export const metadata: Metadata = {
  title: "Contact Us - Social Media Tools",
  description: "Get in touch with Social Media Tools. Have questions, feedback, or suggestions? Contact us through our contact form or email. We'd love to hear from you!",
  keywords: ["contact social media tools", "feedback", "support", "get in touch"],
  openGraph: {
    title: "Contact Us - Social Media Tools",
    description: "Get in touch with Social Media Tools. Have questions, feedback, or suggestions? Contact us today.",
    type: "website",
    url: "https://socialmediatools.netlify.app/contact",
    siteName: "Social Media Tools",
    images: [
      {
        url: getOGImageUrl("default"),
        width: 1200,
        height: 630,
        alt: "Contact Us - Social Media Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - Social Media Tools",
    description: "Get in touch with Social Media Tools. Have questions, feedback, or suggestions? Contact us today.",
    images: [getOGImageUrl("default")],
  },
  alternates: {
    canonical: "https://socialmediatools.netlify.app/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header />
      <main className="flex-1">
        <Breadcrumbs />
        <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Contact Us</h1>
          </div>

          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
              Have a question, suggestion, or feedback? We'd love to hear from you! Get in touch with us through 
              any of the following methods.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">Email Us</h3>
                <p className="text-slate-700 dark:text-slate-300 mb-3">
                  Send us an email and we'll get back to you as soon as possible.
                </p>
                <a
                  href="mailto:shahzaibzafar093@gmail.com"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                >
                  shahzaibzafar093@gmail.com
                </a>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
                <MessageCircle className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-3" />
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">Feedback</h3>
                <p className="text-slate-700 dark:text-slate-300 mb-3">
                  Have suggestions for new tools or improvements? We're all ears!
                </p>
                <a
                  href="mailto:shahzaibzafar093@gmail.com"
                  className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium"
                >
                  shahzaibzafar093@gmail.com
                </a>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Contact Form</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
                    placeholder="Your message..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Response Time</h2>
              <p className="text-slate-700 dark:text-slate-300">
                We typically respond to all inquiries within 24-48 hours. For urgent matters, please mention 
                "URGENT" in your subject line.
              </p>
            </div>
          </div>
        </div>
      </div>
      </main>
      <Footer />
    </div>
  );
}

