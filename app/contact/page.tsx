import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Mail, MessageCircle, Send, Clock, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { getOGImageUrl } from "@/lib/og-image-generator";

export const metadata: Metadata = {
  title: "Contact — Social Media Tools",
  description:
    "Get in touch. Bug reports, feature requests, partnerships, or just to say hi. The reply comes from a real person.",
  keywords: ["contact social media tools", "feedback", "support", "get in touch"],
  openGraph: {
    title: "Contact — Social Media Tools",
    description: "Get in touch with us about feedback, bugs, or feature ideas.",
    type: "website",
    url: "https://aisocialtools.co/contact",
    siteName: "Social Media Tools",
    images: [{ url: getOGImageUrl("default"), width: 1200, height: 630, alt: "Contact" }],
  },
  alternates: { canonical: "https://aisocialtools.co/contact" },
};

export default function ContactPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://aisocialtools.co" },
      { "@type": "ListItem", position: 2, name: "Contact", item: "https://aisocialtools.co/contact" },
    ],
  };

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact — Social Media Tools",
    description: "Get in touch about feedback, bugs, or feature ideas.",
    url: "https://aisocialtools.co/contact",
    mainEntity: {
      "@type": "Organization",
      name: "Social Tools",
      email: "shahzaibzafar093@gmail.com",
      url: "https://aisocialtools.co",
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <Header />
      <main className="flex-1">
        <Breadcrumbs />

        {/* Hero */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <Badge variant="neutral" className="mb-4">
              Contact
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-4">
              Get in touch.
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
              Bug reports, feature requests, partnerships, or just to say hi. The reply
              comes from the person who built the site — usually within 24-48 hours.
            </p>
          </div>
        </section>

        {/* Two columns: methods + form */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              {/* Methods */}
              <div className="lg:col-span-5 space-y-3">
                <a
                  href="mailto:shahzaibzafar093@gmail.com"
                  className="group block bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-9 h-9 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:bg-indigo-50 group-hover:border-indigo-200 dark:group-hover:bg-indigo-500/10 dark:group-hover:border-indigo-500/30 transition-colors">
                      <Mail className="w-4 h-4 text-zinc-700 dark:text-zinc-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <h3 className="font-semibold text-zinc-950 dark:text-white mb-1">
                    Email
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                    Best for detailed questions or bug reports.
                  </p>
                  <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    shahzaibzafar093@gmail.com
                  </p>
                </a>

                <a
                  href="mailto:shahzaibzafar093@gmail.com?subject=Feature%20Request"
                  className="group block bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-9 h-9 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:bg-indigo-50 group-hover:border-indigo-200 dark:group-hover:bg-indigo-500/10 dark:group-hover:border-indigo-500/30 transition-colors">
                      <MessageCircle className="w-4 h-4 text-zinc-700 dark:text-zinc-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <h3 className="font-semibold text-zinc-950 dark:text-white mb-1">
                    Feature requests
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Got an idea for a tool? Send it over — most existing tools came from
                    user requests.
                  </p>
                </a>

                <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5">
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-zinc-700 dark:text-zinc-300 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-zinc-950 dark:text-white text-sm mb-1">
                        Response time
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        Usually 24-48 hours. Mark urgent items in the subject line and
                        I&apos;ll prioritize them.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-7">
                <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 sm:p-8">
                  <h2 className="text-lg font-semibold text-zinc-950 dark:text-white tracking-tight mb-6">
                    Send a message
                  </h2>
                  <form
                    action="mailto:shahzaibzafar093@gmail.com"
                    method="get"
                    encType="text/plain"
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="Your name"
                          className="w-full h-10 px-3 border border-zinc-200 dark:border-zinc-800 rounded-md focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                          Email
                        </label>
                        <input
                          type="email"
                          name="from"
                          required
                          placeholder="you@example.com"
                          className="w-full h-10 px-3 border border-zinc-200 dark:border-zinc-800 rounded-md focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        required
                        placeholder="What's this about?"
                        className="w-full h-10 px-3 border border-zinc-200 dark:border-zinc-800 rounded-md focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Message
                      </label>
                      <textarea
                        rows={6}
                        name="body"
                        required
                        placeholder="Your message…"
                        className="w-full px-3 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-md focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 h-10 px-5 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-md text-sm font-medium transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      Send message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
