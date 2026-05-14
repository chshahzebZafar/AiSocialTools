"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { ChevronDown, Mail } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const faqAnswersJSX: Record<number, React.ReactNode> = {
  0: (
    <>
      Yes. Every tool is free with no hidden tier. There are no paid features, no usage caps, no upgrade prompt at the end of any workflow.{" "}
      <Link href="/tools" className="text-indigo-600 dark:text-indigo-400 hover:underline">Browse all 70+ tools →</Link>
    </>
  ),
  4: (
    <>
      Roughly one new tool per month, mostly driven by user requests. Existing tools also get fixes and small upgrades regularly.{" "}
      <Link href="/tools" className="text-indigo-600 dark:text-indigo-400 hover:underline">See all available tools →</Link>
    </>
  ),
  6: (
    <>
      Absolutely — that&apos;s where most ideas come from.{" "}
      <Link href="/contact" className="text-indigo-600 dark:text-indigo-400 hover:underline">Send a message via the contact page</Link>{" "}
      or email directly. Concrete suggestions (&quot;a tool that does X for Y reason&quot;) are easier to act on than general ones.
    </>
  ),
  8: (
    <>
      Depends on the tool. Most image tools support PNG and JPG, some support WebP, SVG, or PDF.{" "}
      <Link href="/tools" className="text-indigo-600 dark:text-indigo-400 hover:underline">Each tool&apos;s page</Link>{" "}
      lists what it produces.
    </>
  ),
};

const faqs = [
  {
    question: "Are all the tools really free?",
    answer:
      "Yes. Every tool is free with no hidden tier. There are no paid features, no usage caps, no upgrade prompt at the end of any workflow.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No. There is no signup, no email gate, no auth wall. Visit any tool page and start using it immediately.",
  },
  {
    question: "Is my data safe and private?",
    answer:
      "Yes. Tools run in your browser. We don't upload your text or images to a server, we don't analyze them, and we don't store anything beyond standard analytics (page views — no personal data).",
  },
  {
    question: "Can I use these tools for commercial work?",
    answer:
      "Yes. Personal projects, client work, agency work, side hustles — all fine. There's no licensing fee or attribution requirement.",
  },
  {
    question: "How often are new tools added?",
    answer:
      "Roughly one new tool per month, mostly driven by user requests. Existing tools also get fixes and small upgrades regularly.",
  },
  {
    question: "Which browsers are supported?",
    answer:
      "All modern browsers — Chrome, Firefox, Safari, Edge, Opera, Arc. Most tools also work fine on mobile browsers (iOS Safari, Chrome Android).",
  },
  {
    question: "Can I suggest a new tool?",
    answer:
      "Absolutely — that's where most ideas come from. Send a message via the contact page or email directly. Concrete suggestions (\"a tool that does X for Y reason\") are easier to act on than general ones.",
  },
  {
    question: "Do the tools work on mobile?",
    answer:
      "Yes. Every tool is responsive. Some image-heavy tools work better on desktop simply because of screen size, but they all run on mobile.",
  },
  {
    question: "What file formats can I download?",
    answer:
      "Depends on the tool. Most image tools support PNG and JPG, some support WebP, SVG, or PDF. Each tool's page lists what it produces.",
  },
  {
    question: "Are there any usage limits?",
    answer:
      "No. Use any tool as many times as you want. There's no daily cap, no per-session limit, no rate limit.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((qa) => ({
      "@type": "Question",
      name: qa.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: qa.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://aisocialtools.co" },
      { "@type": "ListItem", position: 2, name: "FAQ", item: "https://aisocialtools.co/faq" },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main className="flex-1">
        <Breadcrumbs />

        {/* Hero */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <Badge variant="neutral" className="mb-4">
              FAQ
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-4">
              Frequently asked questions.
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Quick answers to the questions that come up most. If yours isn&apos;t here,
              email is faster than searching.
            </p>
          </div>
        </section>

        {/* FAQ list */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg divide-y divide-zinc-200 dark:divide-zinc-800 overflow-hidden">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div key={index} className="bg-white dark:bg-zinc-950">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full px-5 sm:px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="font-medium text-[15px] text-zinc-950 dark:text-white">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-zinc-500 dark:text-zinc-400 flex-shrink-0 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-5 -mt-1">
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          {faqAnswersJSX[index] ?? faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Still have questions */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-8 text-center">
              <h2 className="text-xl sm:text-2xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-3">
                Still have a question?
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6 max-w-md mx-auto">
                The fastest answer is usually a quick email. Replies come from the person
                who built the site.
              </p>
              <ButtonLink href="/contact" variant="primary" size="md">
                <Mail className="w-4 h-4" />
                Get in touch
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
