import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Check, Info } from "lucide-react";

/**
 * Directory pricing: a free listing and a $5 featured placement.
 *
 * Featuring applies to one specific listing, so buying starts from /account
 * rather than from this page - there is no listing in context here. The
 * checkout URL is built server-side so the product id stays off the client.
 *
 * See docs/pricing-and-plans.md for the reasoning behind the price.
 */

const FEATURED_PRICE_USD = 5;

export const metadata: Metadata = {
  title: "Pricing — Free Listing or $5 Lifetime Featured Placement",
  description:
    "Listing an AI tool is free and permanent. Featured placement is a one-off $5 for life — homepage, top of the directory, and review within 30 minutes.",
  alternates: { canonical: "https://aisocialtools.co/pricing" },
  openGraph: {
    title: "AI Directory Pricing",
    description:
      "Free permanent listings. $5 once for lifetime featured placement, clearly labelled.",
    url: "https://aisocialtools.co/pricing",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const freeIncludes = [
  "Submit any AI tool, no account needed",
  "Checked by a person — working link, honest pricing, accurate description",
  "Permanent listing once approved. No expiry, no renewal",
  "Appears in its category, in search, and in any collection it qualifies for",
  "An email when the decision is made, either way",
];

const featuredIncludes = [
  "Everything in the free listing",
  "A slot in the homepage featured strip, for the life of the listing",
  "Pinned to the top of the directory and of its category",
  "Clearly labelled as Sponsored",
  "Reviewed within 30 minutes, not 7 days",
  "One payment. No renewal, no subscription, nothing to cancel",
];


export default function PricingPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Featured AI directory listing",
    description: "Lifetime featured placement in the aisocialtools.co AI directory.",
    offers: {
      "@type": "Offer",
      price: String(FEATURED_PRICE_USD),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: "https://aisocialtools.co/pricing",
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
          <div className="aurora" aria-hidden />
          <div className="absolute inset-0 bg-dot-grid-animated opacity-50" aria-hidden />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <Breadcrumbs embedded />
            <Badge variant="neutral" className="mb-3">Pricing</Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-zinc-950 dark:text-white tracking-tight leading-tight mb-5">
              Listing is free. Standing out costs ${FEATURED_PRICE_USD}, once.
            </h1>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
              Every tool in this directory was checked by a person before it went live, and
              that does not change if you pay. What ${FEATURED_PRICE_USD} buys is position —
              for the life of the listing, reviewed within 30 minutes, and clearly marked as
              paid for.
            </p>
          </div>
        </section>

        {/* The two plans */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="grid md:grid-cols-2 gap-5">
              {/* Free */}
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 flex flex-col">
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2">Listed</p>
                <p className="text-4xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-1">
                  Free
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                  Permanent. Not a trial.
                </p>
                <ul className="space-y-3 flex-1 mb-7">
                  {freeIncludes.map((f) => (
                    <li key={f} className="flex gap-2.5 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      <Check className="w-4 h-4 mt-0.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" strokeWidth={2.5} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <ButtonLink href="/ai-directory/submit" size="md" className="w-full justify-center">
                  Submit a tool
                </ButtonLink>
              </div>

              {/* Featured */}
              <div className="rounded-2xl border-2 border-amber-300 dark:border-amber-500/40 bg-amber-50/40 dark:bg-amber-500/5 p-6 sm:p-8 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-300">Featured</p>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded px-1.5 py-0.5">
                    Sponsored
                  </span>
                </div>
                <p className="text-4xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-1">
                  ${FEATURED_PRICE_USD}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                  One payment, for life. Not a subscription.
                </p>
                <ul className="space-y-3 flex-1 mb-7">
                  {featuredIncludes.map((f) => (
                    <li key={f} className="flex gap-2.5 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      <Check className="w-4 h-4 mt-0.5 text-amber-600 dark:text-amber-400 flex-shrink-0" strokeWidth={2.5} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <ButtonLink href="/account" size="md" className="w-full justify-center">
                  Feature a listing — ${FEATURED_PRICE_USD}
                </ButtonLink>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-3 text-center">
                  Pick the listing you want featured from your account. Submit it free first if
                  you have not already.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-7">
              How it works
            </h2>
            <ol className="space-y-5">
              {[
                ["Submit", "Free, and no account required. Tell us what the tool does and what it costs."],
                ["We check it", "A person opens the link, confirms the pricing, and reads enough to write an honest line about it. Featured submissions are reviewed within 30 minutes."],
                ["You hear back", "An email either way, with a reference. Approved tools go live immediately."],
                [`Feature it for $${FEATURED_PRICE_USD}`, "Optional, and only offered once your tool is approved. Permanently up top, labelled as sponsored."],
              ].map(([title, body], i) => (
                <li key={title} className="flex gap-4">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-xs font-semibold text-zinc-500">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium text-zinc-950 dark:text-white mb-0.5">{title}</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8 flex gap-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 p-4">
              <Info className="w-4 h-4 mt-0.5 text-zinc-400 flex-shrink-0" />
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Payment is a one-off ${FEATURED_PRICE_USD} through Dodo Payments. Nothing is
                charged until your tool has been approved and you choose to feature it.
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h2 className="text-2xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-2">
              Start with the free listing
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
              It costs nothing and it is the same review either way.
            </p>
            <ButtonLink href="/ai-directory/submit" size="md">
              Submit your tool
            </ButtonLink>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-4">
              Questions? <Link href="/contact" className="underline">Get in touch</Link>.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
