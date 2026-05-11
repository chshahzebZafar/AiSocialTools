"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Check, ArrowRight, Mail, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

const STORAGE_KEY = "lead_popup_dismissed";
const DELAY_MS = 5000; // 5 seconds after landing

const valueProps = [
  "Top AI tool picks — zero noise",
  "Early access to new directory listings",
  "Practical tips to 10× your workflow",
];

export default function LeadCapturePopup() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (dismissed) return;
    const timer = setTimeout(() => {
      setMounted(true);
      // Allow mount before transition kicks in
      requestAnimationFrame(() => setVisible(true));
    }, DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = useCallback(() => {
    setVisible(false);
    setTimeout(() => setMounted(false), 300);
    sessionStorage.setItem(STORAGE_KEY, "1");
  }, []);

  useEffect(() => {
    if (!visible) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", handler);
    // Lock body scroll while popup is open
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = prev;
    };
  }, [visible, dismiss]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email.");
      return;
    }
    setLoading(true);
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
      setTimeout(() => {
        setVisible(false);
        setTimeout(() => setMounted(false), 300);
        sessionStorage.setItem(STORAGE_KEY, "1");
      }, 3200);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[9998] bg-zinc-950/50 backdrop-blur-sm"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        onClick={dismiss}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
      >
        <div
          className="relative w-full max-w-[440px] pointer-events-auto"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible
              ? "translateY(0) scale(1)"
              : "translateY(16px) scale(0.97)",
            transition:
              "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1), transform 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Card */}
          <div className="relative bg-white border border-zinc-200 rounded-lg shadow-2xl shadow-zinc-950/10 overflow-hidden">
            {/* Close — small, top-right, neutral */}
            <button
              onClick={dismiss}
              className="absolute top-3.5 right-3.5 z-10 w-7 h-7 flex items-center justify-center rounded-md text-zinc-400 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {!submitted ? (
              <>
                {/* Hero — subtle aurora wash, dot grid, light background */}
                <div className="relative px-7 pt-8 pb-6 overflow-hidden border-b border-zinc-100">
                  {/* Aurora — single indigo wash, very subtle */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-60"
                    style={{
                      background:
                        "radial-gradient(ellipse 80% 60% at 20% -10%, rgba(99, 102, 241, 0.18), transparent 70%)",
                    }}
                    aria-hidden
                  />
                  {/* Dot grid — same pattern as homepage */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-40"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                    aria-hidden
                  />

                  {/* Content */}
                  <div className="relative">
                    <Badge variant="accent" className="mb-4">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500" />
                      </span>
                      Free weekly digest
                    </Badge>

                    <h2
                      id="popup-title"
                      className="text-2xl font-semibold text-zinc-950 tracking-tight leading-[1.15] mb-2"
                    >
                      The best AI tools,
                      <br />
                      <span className="text-zinc-500">curated every week.</span>
                    </h2>

                    <p className="text-sm text-zinc-600 leading-relaxed">
                      Join 2,000+ creators getting hand-picked AI tools, no spam.
                    </p>
                  </div>
                </div>

                {/* Body */}
                <div className="px-7 py-6">
                  {/* Value props */}
                  <ul className="space-y-2.5 mb-6">
                    {valueProps.map((text) => (
                      <li
                        key={text}
                        className="flex items-start gap-2.5 text-sm text-zinc-700 leading-snug"
                      >
                        <Check
                          className="w-3.5 h-3.5 text-indigo-600 mt-0.5 flex-shrink-0"
                          strokeWidth={2.75}
                        />
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-2.5">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError("");
                        }}
                        placeholder="you@example.com"
                        aria-label="Email address"
                        className="w-full h-10 pl-9 pr-3 border border-zinc-200 rounded-md focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-sm bg-white text-zinc-900 placeholder-zinc-400 transition-colors"
                        required
                        autoComplete="email"
                      />
                    </div>

                    {error && (
                      <p
                        className="text-xs text-red-600 flex items-center gap-1.5"
                        role="alert"
                      >
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full h-10 inline-flex items-center justify-center gap-2 bg-zinc-950 hover:bg-zinc-800 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-md text-sm font-medium transition-colors"
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          Get free access
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>

                  {/* Footer line */}
                  <p className="text-center text-[11px] text-zinc-500 mt-4">
                    No spam. Unsubscribe any time.
                  </p>
                </div>
              </>
            ) : (
              /* Success — clean, editorial */
              <div className="px-7 py-12 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-5">
                  <Check
                    className="w-5 h-5 text-emerald-600"
                    strokeWidth={2.75}
                  />
                </div>
                <h3 className="text-xl font-semibold text-zinc-950 tracking-tight mb-2">
                  You&apos;re in.
                </h3>
                <p className="text-sm text-zinc-600 max-w-[280px] mx-auto leading-relaxed">
                  First edition is heading to your inbox now. Welcome.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
