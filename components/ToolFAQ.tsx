"use client";

import { SocialTool } from "@/lib/social-tools";
import { getSEOMetadata } from "@/lib/seo-metadata";

interface ToolFAQProps {
  tool: SocialTool;
}

export default function ToolFAQ({ tool }: ToolFAQProps) {
  const seo = getSEOMetadata(tool);

  const faqs = [
    {
      question: `How to use ${tool.name}?`,
      answer: `Our ${tool.name.toLowerCase()} is a free online tool that helps you ${tool.description.toLowerCase()}. Simply use the interface above to get started. No signup required.`
    },
    {
      question: `Is ${tool.name} free to use?`,
      answer: `Yes, ${tool.name} is completely free. No signup, no credit card, no hidden fees. Use it as many times as you need.`
    },
    {
      question: `Can I use ${tool.name} for business?`,
      answer: `Absolutely! ${tool.name} is perfect for businesses, content creators, and social media managers looking to improve their social media presence.`
    },
    {
      question: `Do I need to create an account?`,
      answer: `No account required! All our social media tools are free to use without any registration. Just visit the tool and start using it immediately.`
    }
  ];

  return (
    <div className="mt-8 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-slate-200 dark:border-slate-700 last:border-0 pb-4 last:pb-0">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">{faq.question}</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

