"use client";

import { useState } from "react";
import { Bug, Lightbulb, PlusCircle, Send, Check, ChevronDown } from "lucide-react";

type FeedbackType = "bug" | "improvement" | "suggest";
type SubmitState = "idle" | "submitting" | "success" | "error";

const TABS: { type: FeedbackType; label: string; icon: React.ElementType; placeholder: string }[] = [
  {
    type: "bug",
    label: "Report issue",
    icon: Bug,
    placeholder: "Describe the issue — what happened, what you expected, and which browser you're using.",
  },
  {
    type: "improvement",
    label: "Suggest improvement",
    icon: Lightbulb,
    placeholder: "What could be better? e.g. a missing option, a UX issue, or extra output you'd find useful.",
  },
  {
    type: "suggest",
    label: "Suggest new tool",
    icon: PlusCircle,
    placeholder: "Describe the tool you'd like — what it does, who it's for, and why you need it.",
  },
];

interface ToolFeedbackProps {
  toolName: string;
  /** Your Formspree form ID, e.g. "xpwzgkla" */
  formspreeId?: string;
}

export default function ToolFeedback({ toolName, formspreeId = "YOUR_FORM_ID" }: ToolFeedbackProps) {
  const [activeTab, setActiveTab] = useState<FeedbackType>("bug");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SubmitState>("idle");

  const activeConfig = TABS.find((t) => t.type === activeTab)!;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    setState("submitting");

    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          tool: toolName,
          type: activeTab,
          message,
          email: email || "not provided",
        }),
      });

      if (res.ok) {
        setState("success");
        setMessage("");
        setEmail("");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  return (
    <section className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-2">
            Help us improve
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Found a bug, have an idea, or want a new tool? Let us know — every message is read.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {TABS.map(({ type, label, icon: Icon }) => (
            <button
              key={type}
              onClick={() => { setActiveTab(type); setState("idle"); }}
              className={`inline-flex items-center gap-1.5 px-3 h-8 rounded-md text-sm font-medium transition-colors ${
                activeTab === type
                  ? "bg-zinc-950 dark:bg-white text-white dark:text-zinc-950"
                  : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>

        {/* Form */}
        {state === "success" ? (
          <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-lg p-5 flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-3 h-3 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                Thanks — message received!
              </p>
              <p className="text-sm text-emerald-700 dark:text-emerald-400 mt-0.5">
                We read every submission. If you left an email we'll follow up.
              </p>
              <button
                onClick={() => setState("idle")}
                className="mt-3 text-xs font-medium text-emerald-700 dark:text-emerald-400 underline underline-offset-2 hover:no-underline"
              >
                Send another
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                {activeConfig.label}
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={activeConfig.placeholder}
                required
                className="w-full px-3 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-md focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 resize-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                Email <span className="font-normal text-zinc-400">(optional — only if you want a reply)</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-10 px-3 border border-zinc-200 dark:border-zinc-800 rounded-md focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 transition-colors"
              />
            </div>

            {state === "error" && (
              <p className="text-sm text-red-600 dark:text-red-400">
                Something went wrong. Try emailing us directly at shahzaibzafar093@gmail.com.
              </p>
            )}

            <button
              type="submit"
              disabled={state === "submitting" || !message.trim()}
              className="inline-flex items-center gap-2 h-10 px-5 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-md text-sm font-medium transition-colors"
            >
              <Send className="w-4 h-4" />
              {state === "submitting" ? "Sending…" : "Send feedback"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
