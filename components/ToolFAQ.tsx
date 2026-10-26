"use client";

import { SocialTool } from "@/lib/social-tools";
import { getToolFaqs, genericFaqs } from "@/lib/tool-faqs";

interface ToolFAQProps {
  tool: SocialTool;
}

export default function ToolFAQ({ tool }: ToolFAQProps) {
  // The real FAQs when this tool has them, generic filler when it does not.
  // getToolFaqs returns null in the filler case, which is also the signal to
  // ToolSEO not to emit FAQPage markup - marking up filler as a rich result
  // is how 56 pages ended up asserting 392 Q&As that were not on them.
  const faqs = getToolFaqs(tool.id) ?? genericFaqs(tool);

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

