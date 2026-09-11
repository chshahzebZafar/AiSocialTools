"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { aiCategories } from "@/lib/ai-directory";
import {
  ArrowLeft,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react";

type SubmissionState = "idle" | "submitting" | "success" | "error";

const pricingOptions = ["Free", "Freemium", "Paid", "Open Source"] as const;

/**
 * Public Turnstile site key. NEXT_PUBLIC_ values are inlined at build time, so
 * after setting it in Vercel the site must be redeployed. Empty disables the
 * widget, matching the API, which only enforces verification when
 * TURNSTILE_SECRET_KEY is set.
 */
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

interface TurnstileRenderOptions {
  sitekey: string;
  callback: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
}

type TurnstileWindow = Window & {
  turnstile?: {
    render: (el: HTMLElement, options: TurnstileRenderOptions) => string;
    remove: (widgetId: string) => void;
  };
};

export default function SubmitAIToolPage() {
  const [state, setState] = useState<SubmissionState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  // Reference returned by the API — shown on screen so the submitter has a
  // receipt even if the confirmation email is delayed or filtered.
  const [reference, setReference] = useState("");
  // Stamped once on mount. The API rejects submissions that arrive faster than
  // a human could plausibly fill the form. useRef, not useState, so it is not
  // reset by re-renders and never triggers one.
  const formLoadedAt = useRef<number>(0);
  useEffect(() => {
    formLoadedAt.current = Date.now();
  }, []);

  // -- Cloudflare Turnstile ------------------------------------------------
  // Tokens are single-use, so the widget is rebuilt after every failed attempt
  // (turnstileEpoch) and whenever the form remounts after "Submit another tool".
  const turnstileContainer = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);
  const turnstileToken = useRef("");
  const [turnstileReady, setTurnstileReady] = useState(false);
  const [turnstileEpoch, setTurnstileEpoch] = useState(0);
  const formMounted = state !== "success";

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !turnstileReady || !formMounted) return;
    const el = turnstileContainer.current;
    const ts = (window as TurnstileWindow).turnstile;
    if (!el || !ts) return;
    turnstileToken.current = "";
    turnstileWidgetId.current = ts.render(el, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: (token: string) => {
        turnstileToken.current = token;
      },
      "expired-callback": () => {
        turnstileToken.current = "";
      },
      "error-callback": () => {
        turnstileToken.current = "";
      },
    });
    return () => {
      if (turnstileWidgetId.current) {
        ts.remove(turnstileWidgetId.current);
        turnstileWidgetId.current = null;
      }
      turnstileToken.current = "";
    };
  }, [turnstileReady, formMounted, turnstileEpoch]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Catch a missing token here rather than round-tripping to the API for the
    // same answer. The API still verifies independently.
    if (TURNSTILE_SITE_KEY && !turnstileToken.current) {
      setState("error");
      setErrorMessage("Please complete the verification check above the submit button.");
      return;
    }
    setState("submitting");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      url: formData.get("url"),
      tagline: formData.get("tagline"),
      description: formData.get("description"),
      category: formData.get("category"),
      pricing: formData.get("pricing"),
      pricingDetails: formData.get("pricingDetails"),
      features: formData.get("features"),
      twitter: formData.get("twitter"),
      founder: formData.get("founder"),
      submitterName: formData.get("submitterName"),
      submitterEmail: formData.get("submitterEmail"),
      submitterRole: formData.get("submitterRole"),
      // Anti-bot: honeypot must arrive empty, and the API rejects submissions
      // that arrive faster than a human could fill the form.
      companyWebsite: formData.get("companyWebsite"),
      formLoadedAt: formLoadedAt.current,
      turnstileToken: turnstileToken.current,
    };

    try {
      const res = await fetch("/api/submit-ai-tool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit");
      }
      setReference(typeof data.reference === "string" ? data.reference : "");
      setState("success");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setState("error");
      setErrorMessage(err instanceof Error ? err.message : "Unknown error");
      // The token was spent on this attempt; get a fresh challenge for the retry.
      setTurnstileEpoch((n) => n + 1);
    }
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://aisocialtools.co" },
      {
        "@type": "ListItem",
        position: 2,
        name: "AI Directory",
        item: "https://aisocialtools.co/ai-directory",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Submit",
        item: "https://aisocialtools.co/ai-directory/submit",
      },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Submit Your AI Tool",
    description:
      "Free submission form to list any AI tool in our curated directory. No fee, no backlink demand, reviewed within 7 days.",
    url: "https://aisocialtools.co/ai-directory/submit",
    isPartOf: {
      "@type": "WebSite",
      name: "Social Media Tools",
      url: "https://aisocialtools.co",
    },
    mainEntity: {
      "@type": "Action",
      name: "Submit AI Tool",
      target: "https://aisocialtools.co/api/submit-ai-tool",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <Breadcrumbs embedded />
            <Link
              href="/ai-directory"
              className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to directory
            </Link>
            <Badge variant="neutral" className="mb-4">
              Submit
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-4">
              Submit an AI tool.
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Free listing. No fee, no backlink demand, no &quot;featured slot&quot; upsell.
              We review every submission within 7 days. Good tools get in.
            </p>
          </div>
        </section>

        {/* Form */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            {state === "success" ? (
              <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-lg p-8 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                  <Check className="w-6 h-6 text-emerald-600 dark:text-emerald-400" strokeWidth={2.5} />
                </div>
                <h2 className="text-2xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-3">
                  Submission received.
                </h2>

                {reference && (
                  <div className="mb-5">
                    <p className="text-xs uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-500 font-semibold mb-1.5">
                      Your reference
                    </p>
                    <p className="font-mono text-lg font-semibold text-zinc-950 dark:text-white tracking-tight">
                      {reference}
                    </p>
                  </div>
                )}

                <p className="text-zinc-600 dark:text-zinc-400 mb-2 max-w-md mx-auto">
                  Thanks — we&apos;ve logged your submission and sent a confirmation
                  email with these details. We review within 7 days and will reply if
                  we have questions. If accepted, the listing goes live the same day.
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-500 mb-6 max-w-md mx-auto">
                  Listings are free and editorial. Quote your reference if you follow up.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <ButtonLink href="/ai-directory" size="md">
                    Browse the directory
                  </ButtonLink>
                  <button
                    onClick={() => {
                      setReference("");
                      setState("idle");
                    }}
                    className="inline-flex items-center justify-center gap-2 h-10 px-4 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors"
                  >
                    Submit another tool
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                {/*
                  Honeypot. Bots fill every field they find; people never see
                  this one. Hidden with CSS rather than type="hidden" — some
                  form-fillers skip hidden inputs but will happily fill a text
                  field they can parse. aria-hidden + tabIndex -1 keep it away
                  from screen readers and keyboard navigation, and
                  autoComplete="off" stops browsers auto-filling it.
                */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    width: 1,
                    height: 1,
                    overflow: "hidden",
                  }}
                >
                  <label htmlFor="companyWebsite">
                    Company website (leave blank)
                  </label>
                  <input
                    type="text"
                    id="companyWebsite"
                    name="companyWebsite"
                    tabIndex={-1}
                    autoComplete="off"
                    defaultValue=""
                  />
                </div>

                {/* Section: Tool basics */}
                <fieldset className="space-y-6">
                  <legend className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500 font-semibold mb-4 w-full pb-2 border-b border-zinc-200 dark:border-zinc-800">
                    Tool basics
                  </legend>

                  <Field
                    name="name"
                    label="Tool name"
                    required
                    placeholder="e.g. Mindfulness AI"
                  />
                  <Field
                    name="url"
                    label="Website URL"
                    type="url"
                    required
                    placeholder="https://"
                  />
                  <Field
                    name="tagline"
                    label="One-line pitch"
                    required
                    maxLength={120}
                    placeholder="The fastest way to…"
                    hint="Max 120 chars. Front-load the value."
                  />
                  <Field
                    name="description"
                    label="Description"
                    required
                    multiline
                    rows={5}
                    placeholder="Tell us what your tool does, who it's for, and what makes it different. 2-4 paragraphs."
                    hint="Honest writing wins. Don't pad with marketing speak."
                  />
                </fieldset>

                {/* Section: Category & pricing */}
                <fieldset className="space-y-6">
                  <legend className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500 font-semibold mb-4 w-full pb-2 border-b border-zinc-200 dark:border-zinc-800">
                    Category & pricing
                  </legend>

                  <SelectField
                    name="category"
                    label="Primary category"
                    required
                    options={aiCategories.map((c) => ({ value: c, label: c }))}
                  />
                  <SelectField
                    name="pricing"
                    label="Pricing model"
                    required
                    options={pricingOptions.map((p) => ({ value: p, label: p }))}
                  />
                  <Field
                    name="pricingDetails"
                    label="Pricing details"
                    placeholder="e.g. Free up to 50 generations/day, then $20/mo"
                    hint="Be specific. Vague pricing hurts your submission."
                  />
                  <Field
                    name="features"
                    label="Key features"
                    multiline
                    rows={4}
                    placeholder={"One per line:\nReal-time collaboration\n200K context window\nAPI access"}
                    hint="One per line. 3-6 features is the sweet spot."
                  />
                </fieldset>

                {/* Section: Links */}
                <fieldset className="space-y-6">
                  <legend className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500 font-semibold mb-4 w-full pb-2 border-b border-zinc-200 dark:border-zinc-800">
                    Optional links
                  </legend>

                  <Field
                    name="twitter"
                    label="Twitter / X handle"
                    placeholder="without the @"
                  />
                  <Field
                    name="founder"
                    label="Company or founder name"
                    placeholder="e.g. Acme Inc. or Jane Doe"
                  />
                </fieldset>

                {/* Section: Submitter */}
                <fieldset className="space-y-6">
                  <legend className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500 font-semibold mb-4 w-full pb-2 border-b border-zinc-200 dark:border-zinc-800">
                    About you
                  </legend>

                  <Field
                    name="submitterName"
                    label="Your name"
                    required
                  />
                  <Field
                    name="submitterEmail"
                    label="Your email"
                    type="email"
                    required
                    hint="We email you once if accepted — no marketing."
                  />
                  <SelectField
                    name="submitterRole"
                    label="Your relationship to this tool"
                    required
                    options={[
                      { value: "founder", label: "I built it (founder / team)" },
                      { value: "user", label: "I'm a happy user (no affiliation)" },
                      { value: "other", label: "Other" },
                    ]}
                  />
                </fieldset>

                {/* Error message */}
                {state === "error" && (
                  <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-md p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium text-red-900 dark:text-red-200 mb-1">
                        Couldn&apos;t submit
                      </p>
                      <p className="text-red-700 dark:text-red-300">{errorMessage}</p>
                    </div>
                  </div>
                )}

                {TURNSTILE_SITE_KEY && (
                  <div>
                    <Script
                      src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
                      strategy="afterInteractive"
                      onReady={() => setTurnstileReady(true)}
                    />
                    <div ref={turnstileContainer} />
                  </div>
                )}

                {/* Submit */}
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center pt-2">
                  <button
                    type="submit"
                    disabled={state === "submitting"}
                    className="inline-flex items-center justify-center gap-2 h-11 px-6 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-md text-sm font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {state === "submitting" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      "Submit for review"
                    )}
                  </button>
                  <p className="text-xs text-zinc-500 dark:text-zinc-500 sm:ml-2">
                    By submitting you agree to our{" "}
                    <Link href="/terms" className="underline hover:text-zinc-950 dark:hover:text-white">
                      Terms
                    </Link>
                    .
                  </p>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Form field helpers                                                 */
/* ------------------------------------------------------------------ */

interface FieldProps {
  name: string;
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  hint?: string;
  multiline?: boolean;
  rows?: number;
  maxLength?: number;
}

function Field({
  name,
  label,
  required,
  type = "text",
  placeholder,
  hint,
  multiline,
  rows = 4,
  maxLength,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-1.5">
        {label}
        {required && <span className="text-zinc-400 dark:text-zinc-600"> *</span>}
      </label>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          required={required}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          className="w-full px-3 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-md focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 resize-none"
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          required={required}
          placeholder={placeholder}
          maxLength={maxLength}
          className="w-full h-10 px-3 border border-zinc-200 dark:border-zinc-800 rounded-md focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400"
        />
      )}
      {hint && (
        <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1.5">{hint}</p>
      )}
    </div>
  );
}

interface SelectFieldProps {
  name: string;
  label: string;
  required?: boolean;
  options: Array<{ value: string; label: string }>;
  hint?: string;
}

function SelectField({ name, label, required, options, hint }: SelectFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-1.5">
        {label}
        {required && <span className="text-zinc-400 dark:text-zinc-600"> *</span>}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        defaultValue=""
        className="w-full h-10 px-3 border border-zinc-200 dark:border-zinc-800 rounded-md focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 appearance-none cursor-pointer"
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {hint && (
        <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1.5">{hint}</p>
      )}
    </div>
  );
}
