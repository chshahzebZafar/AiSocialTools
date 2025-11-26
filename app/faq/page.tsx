"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { HelpCircle, ChevronDown, Mail } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Are all the tools really free?",
    answer: "Yes! All our tools are 100% free to use. There are no hidden costs, subscriptions, or premium features. You can use any tool as many times as you want without any limitations."
  },
  {
    question: "Do I need to create an account?",
    answer: "No, you don't need to create an account to use our tools. Simply visit any tool page and start using it immediately. We don't require any registration or sign-up process."
  },
  {
    question: "Is my data safe and private?",
    answer: "Absolutely! We don't collect, store, or share your personal data. All processing happens in your browser, and we don't track your usage. Your privacy is our priority."
  },
  {
    question: "Can I use these tools for commercial purposes?",
    answer: "Yes, you can use our tools for both personal and commercial purposes. Whether you're a content creator, marketer, or business owner, feel free to use our tools to enhance your social media presence."
  },
  {
    question: "How often are new tools added?",
    answer: "We regularly add new tools based on user feedback and industry trends. Follow us on social media or check back frequently to see what's new!"
  },
  {
    question: "What browsers are supported?",
    answer: "Our tools work on all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. For the best experience, we recommend using the latest version of your browser."
  },
  {
    question: "Can I suggest a new tool?",
    answer: "Absolutely! We love hearing from our users. Please contact us through our contact page or email us with your tool suggestions. We consider all requests and prioritize based on user demand."
  },
  {
    question: "Do the tools work on mobile devices?",
    answer: "Yes! All our tools are fully responsive and work great on mobile phones and tablets. You can use them on any device with a modern web browser."
  },
  {
    question: "What file formats can I download?",
    answer: "It depends on the tool. Most image tools support PNG and JPG formats. Some tools also support PDF and SVG formats. Check the individual tool page for specific download options."
  },
  {
    question: "Is there a limit on how many times I can use a tool?",
    answer: "No, there are no usage limits. You can use any tool as many times as you need, whenever you need it. We believe in providing unlimited access to all our free tools."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header />
      <main className="flex-1">
        <Breadcrumbs />
        <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Frequently Asked Questions</h1>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <span className="font-semibold text-slate-900 dark:text-slate-100 pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 dark:text-slate-400 flex-shrink-0 transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 py-4 bg-slate-50 dark:bg-slate-700/50 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">Still have questions?</h2>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Can't find the answer you're looking for? Please get in touch with our friendly team.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-colors"
            >
              <Mail className="w-5 h-5" />
              Contact Us
            </a>
          </div>
        </div>
      </div>
      </main>
      <Footer />
    </div>
  );
}

