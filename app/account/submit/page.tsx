"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/components/AuthProvider";
import { AuthScreen } from "@/components/account/AuthScreen";
import { aiCategories } from "@/lib/ai-directory";
import { ArrowLeft, ArrowRight, Check, Loader2, Star } from "lucide-react";

/**
 * Submit a tool, from inside the account.
 *
 * Two steps on one page: the tool, then the plan. It asks nothing about the
 * person - no name, no email, no role - because the account already answers
 * that, and every field a form asks for that it does not need is a field
 * somebody abandons the form over.
 *
 * The listing is created before checkout, never after. A payment arriving for
 * a submission that does not exist yet would have nothing to attach to.
 */

const PRICING = ["Free", "Freemium", "Paid", "Open Source"] as const;

const FEATURED_INCLUDES = [
  "A slot in the homepage featured strip, for the life of the listing",
  "Pinned to the top of the directory and of its category",
  "Reviewed within 30 minutes, not 7 days",
];

type Step = "details" | "plan";

export default function SubmitPage() {
  const router = useRouter();
  const { user, session, loading } = useAuth();

  const [step, setStep] = useState<Step>("details");
  const [plan, setPlan] = useState<"free" | "featured">("free");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    url: "",
    tagline: "",
    description: "",
    category: "",
    pricing: "",
    pricingDetails: "",
    features: "",
    twitter: "",
    founder: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit() {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/account/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
        },
        body: JSON.stringify({ ...form, plan }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not submit your tool.");

      // An external checkout needs a full navigation; an internal page does not.
      if (data.checkout) window.location.href = data.next;
      else router.push(data.next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not submit your tool.");
      setBusy(false);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="w-5 h-5 animate-spin text-zinc-400" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
        <Header />
        <main className="flex-1">
          <AuthScreen />
        </main>
        <Footer />
      </div>
    );
  }

  const field =
    "w-full px-3 text-sm rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500";
  const label = "block text-sm font-medium text-zinc-900 dark:text-zinc-200 mb-1.5";
  const hint = "text-xs text-zinc-500 dark:text-zinc-400 mt-1.5";

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      <Header />
      <main className="flex-1">
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link
              href="/account"
              className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors mb-5"
            >
              <ArrowLeft className="w-4 h-4" />
              Your listings
            </Link>

            {/* Two steps, shown rather than implied. */}
            <div className="flex items-center gap-3 mb-6">
              {(["details", "plan"] as const).map((s, i) => {
                const active = step === s;
                const done = step === "plan" && s === "details";
                return (
                  <div key={s} className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-6 h-6 rounded-full text-xs font-semibold flex items-center justify-center border ${
                          done
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/30"
                            : active
                              ? "bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 border-zinc-950 dark:border-white"
                              : "bg-white dark:bg-zinc-900 text-zinc-400 border-zinc-200 dark:border-zinc-800"
                        }`}
                      >
                        {done ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : i + 1}
                      </span>
                      <span
                        className={`text-sm ${active ? "font-medium text-zinc-950 dark:text-white" : "text-zinc-500"}`}
                      >
                        {s === "details" ? "The tool" : "Your plan"}
                      </span>
                    </div>
                    {i === 0 && <span className="w-8 h-px bg-zinc-200 dark:bg-zinc-800" />}
                  </div>
                );
              })}
            </div>

            <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 dark:text-white tracking-tight">
              {step === "details" ? "Tell us about the tool" : "Choose how it gets listed"}
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
              {step === "details"
                ? "Only the tool — we already know who you are from your account."
                : "Both plans get the same human review. One of them puts you at the top."}
            </p>
          </div>
        </section>

        <section>
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {step === "details" ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setError("");
                  setStep("plan");
                }}
                className="space-y-6"
              >
                <div>
                  <label htmlFor="f-name" className={label}>Tool name</label>
                  <input id="f-name" required maxLength={80} value={form.name} onChange={set("name")}
                    placeholder="Acme AI" className={`${field} h-10`} />
                </div>

                <div>
                  <label htmlFor="f-url" className={label}>Link</label>
                  <input id="f-url" required type="url" maxLength={300} value={form.url} onChange={set("url")}
                    placeholder="https://example.com" className={`${field} h-10`} />
                  <p className={hint}>We open this to check it works before publishing.</p>
                </div>

                <div>
                  <label htmlFor="f-tagline" className={label}>One line</label>
                  <input id="f-tagline" required maxLength={140} value={form.tagline} onChange={set("tagline")}
                    placeholder="What it does, in a sentence" className={`${field} h-10`} />
                  <p className={hint}>{form.tagline.length}/140 — this is what shows in listings.</p>
                </div>

                <div>
                  <label htmlFor="f-description" className={label}>Description</label>
                  <textarea id="f-description" required maxLength={4000} rows={5} value={form.description}
                    onChange={set("description")} placeholder="What it does, who it is for, and what makes it different."
                    className={`${field} py-2.5`} />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="f-category" className={label}>Category</label>
                    <select id="f-category" required value={form.category} onChange={set("category")}
                      className={`${field} h-10`}>
                      <option value="">Choose one…</option>
                      {aiCategories.map((c) => (<option key={c} value={c}>{c}</option>))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="f-pricing" className={label}>Pricing model</label>
                    <select id="f-pricing" required value={form.pricing} onChange={set("pricing")}
                      className={`${field} h-10`}>
                      <option value="">Choose one…</option>
                      {PRICING.map((p) => (<option key={p} value={p}>{p}</option>))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="f-pricingDetails" className={label}>
                    Pricing detail <span className="font-normal text-zinc-400">optional</span>
                  </label>
                  <input id="f-pricingDetails" maxLength={300} value={form.pricingDetails} onChange={set("pricingDetails")}
                    placeholder="Free up to 50 generations/day, then $20/mo" className={`${field} h-10`} />
                </div>

                <div>
                  <label htmlFor="f-features" className={label}>
                    Key features <span className="font-normal text-zinc-400">optional</span>
                  </label>
                  <textarea id="f-features" maxLength={1200} rows={4} value={form.features} onChange={set("features")}
                    placeholder={"One per line\nRuns locally\nExports to PDF"} className={`${field} py-2.5`} />
                  <p className={hint}>One per line.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="f-founder" className={label}>
                      Made by <span className="font-normal text-zinc-400">optional</span>
                    </label>
                    <input id="f-founder" maxLength={120} value={form.founder} onChange={set("founder")}
                      placeholder="Company or person" className={`${field} h-10`} />
                  </div>
                  <div>
                    <label htmlFor="f-twitter" className={label}>
                      X / Twitter <span className="font-normal text-zinc-400">optional</span>
                    </label>
                    <input id="f-twitter" maxLength={40} value={form.twitter} onChange={set("twitter")}
                      placeholder="acmeai" className={`${field} h-10`} />
                  </div>
                </div>

                {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

                <button type="submit"
                  className="w-full h-11 rounded-md bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 inline-flex items-center justify-center gap-2 transition-colors">
                  Continue to plans
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Free */}
                  <button
                    onClick={() => setPlan("free")}
                    aria-pressed={plan === "free"}
                    className={`text-left rounded-xl border-2 p-5 transition-colors ${
                      plan === "free"
                        ? "border-zinc-950 dark:border-white bg-zinc-50 dark:bg-zinc-900"
                        : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                    }`}
                  >
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">Listed</p>
                    <p className="text-3xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-1">Free</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">Permanent. Not a trial.</p>
                    <ul className="space-y-2">
                      <li className="flex gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                        <Check className="w-4 h-4 mt-0.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" strokeWidth={2.5} />
                        <span>Checked by a person, usually within 7 days</span>
                      </li>
                      <li className="flex gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                        <Check className="w-4 h-4 mt-0.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" strokeWidth={2.5} />
                        <span>Permanent listing in its category and search</span>
                      </li>
                    </ul>
                  </button>

                  {/* Featured */}
                  <button
                    onClick={() => setPlan("featured")}
                    aria-pressed={plan === "featured"}
                    className={`text-left rounded-xl border-2 p-5 transition-colors ${
                      plan === "featured"
                        ? "border-indigo-500 bg-indigo-50/60 dark:bg-indigo-500/10"
                        : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Featured</p>
                      <Star className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <p className="text-3xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-1">$5</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">One payment, for life.</p>
                    <ul className="space-y-2">
                      {FEATURED_INCLUDES.map((f) => (
                        <li key={f} className="flex gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                          <Check className="w-4 h-4 mt-0.5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" strokeWidth={2.5} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </button>
                </div>

                {plan === "featured" && (
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    You will be taken to Dodo Payments to pay, then brought back to your listing.
                    It still goes through review — if we cannot list it, you get a refund.
                  </p>
                )}

                {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setStep("details")}
                    disabled={busy}
                    className="h-11 px-4 text-sm rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white disabled:opacity-60 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => void submit()}
                    disabled={busy}
                    className="flex-1 h-11 rounded-md bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-60 inline-flex items-center justify-center gap-2 transition-colors"
                  >
                    {busy && <Loader2 className="w-4 h-4 animate-spin" />}
                    {plan === "featured" ? "Continue to payment — $5" : "Submit for review"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
