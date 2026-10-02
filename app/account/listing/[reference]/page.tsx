"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/components/AuthProvider";
import { AuthScreen } from "@/components/account/AuthScreen";
import { ListingStatus, FeaturedBadge } from "@/components/account/ListingStatus";
import { ToolIcon } from "@/components/ToolIcon";
import { supabaseBrowser } from "@/lib/supabase";
import { ArrowLeft, ArrowUpRight, Check, Clock, Copy, Loader2, Star } from "lucide-react";

/**
 * One listing, as its owner sees it.
 *
 * The screen a submitter lands on after submitting - paid or free - and the
 * one they come back to. It shows everything they entered, so they can see we
 * have it right, and the status in plain words.
 *
 * Read through my_submissions, which RLS filters to auth.uid(). Someone
 * guessing another person's reference gets nothing back.
 */

type Listing = {
  id: string;
  reference: string;
  name: string;
  url: string;
  tagline: string;
  description: string;
  category: string;
  pricing: string;
  pricing_details: string;
  features: string;
  twitter: string;
  founder: string;
  slug: string | null;
  status: string;
  sponsored: boolean;
  sponsored_lifetime: boolean;
  submitted_at: string;
};

export default function ListingPage() {
  const params = useParams<{ reference: string }>();
  const reference = String(params?.reference ?? "");
  const { user, session, loading } = useAuth();

  const [row, setRow] = useState<Listing | null | "missing">(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [buying, setBuying] = useState(false);

  const load = useCallback(async () => {
    const supabase = supabaseBrowser();
    if (!supabase || !reference) return;

    // A payment can land a moment before or after the redirect, so claim first:
    // a listing paid for by someone whose account was created during checkout
    // would otherwise be unreachable.
    if (session?.access_token) {
      await fetch("/api/account/claim", {
        method: "POST",
        headers: { Authorization: `Bearer ${session.access_token}` },
      }).catch(() => {});
    }

    const { data, error: err } = await supabase
      .from("my_submissions")
      .select("*")
      .eq("reference", reference)
      .maybeSingle();

    if (err) {
      setError(err.message || "Could not load this listing.");
      return;
    }
    setRow((data as Listing) ?? "missing");
  }, [reference, session]);

  useEffect(() => {
    if (user) void load();
  }, [user, load]);

  async function feature() {
    setBuying(true);
    setError("");
    try {
      const res = await fetch("/api/account/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
        },
        body: JSON.stringify({ reference }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Could not start checkout.");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start checkout.");
      setBuying(false);
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

  // Signed out, the auth screen takes the whole viewport - no site header,
  // no footer, one link home.
  if (!user) return <AuthScreen />;

  const publicUrl = row && row !== "missing" && row.slug
    ? `https://aisocialtools.co/ai-directory/${row.slug}`
    : "";

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <Link
            href="/account"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Your listings
          </Link>

          {row === null ? (
            <p className="text-sm text-zinc-500 inline-flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Loading…
            </p>
          ) : row === "missing" ? (
            <div className="text-center py-16 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
              <p className="text-zinc-950 dark:text-white font-medium mb-1">Listing not found</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
                Either this reference does not exist, or it belongs to a different account. If you
                have just paid, give it a moment and reload.
              </p>
            </div>
          ) : (
            <>
              {/* Status first - it is why they are here */}
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden mb-6">
                <div
                  className={`px-5 py-4 flex flex-wrap items-center gap-3 border-b ${
                    row.status === "approved"
                      ? "bg-emerald-50/60 dark:bg-emerald-500/5 border-emerald-200 dark:border-emerald-500/20"
                      : row.status === "new"
                        ? "bg-amber-50/60 dark:bg-amber-500/5 border-amber-200 dark:border-amber-500/20"
                        : "bg-zinc-50 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800"
                  }`}
                >
                  <ListingStatus status={row.status} />
                  {row.sponsored && <FeaturedBadge />}
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 ml-auto">
                    {row.reference}
                  </span>
                </div>

                <div className="px-5 py-4">
                  {row.status === "new" && (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed inline-flex gap-2">
                      <Clock className="w-4 h-4 mt-0.5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                      <span>
                        A person is checking the link, the pricing and the description.
                        {row.sponsored
                          ? " Featured submissions are reviewed within 30 minutes."
                          : " This usually takes up to 7 days."}{" "}
                        We will email you either way.
                      </span>
                    </p>
                  )}

                  {row.status === "approved" && (
                    <div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3 inline-flex gap-2">
                        <Check className="w-4 h-4 mt-0.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" strokeWidth={2.5} />
                        <span>This listing is live. Here is its public page:</span>
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        <code className="flex-1 min-w-0 truncate text-xs bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-zinc-700 dark:text-zinc-300">
                          {publicUrl}
                        </code>
                        <button
                          onClick={() => {
                            navigator.clipboard?.writeText(publicUrl).then(
                              () => {
                                setCopied(true);
                                setTimeout(() => setCopied(false), 2000);
                              },
                              () => {}
                            );
                          }}
                          className="h-9 px-3 text-xs rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white inline-flex items-center gap-1.5 transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          {copied ? "Copied" : "Copy"}
                        </button>
                        <a
                          href={publicUrl}
                          target="_blank"
                          rel="noopener"
                          className="h-9 px-3 text-xs rounded-md bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 inline-flex items-center gap-1.5 transition-colors"
                        >
                          Open
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  )}

                  {row.status === "declined" && (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      We decided not to add this one. It is a judgement about fit rather than a
                      mark against the tool — if it changes significantly, submit it again.
                    </p>
                  )}
                </div>
              </div>

              {/* Upgrade, only where it can be honoured */}
              {!row.sponsored && row.status !== "declined" && (
                <div className="rounded-xl border border-indigo-200 dark:border-indigo-500/30 bg-indigo-50/60 dark:bg-indigo-500/5 p-5 mb-6">
                  <div className="flex items-start gap-3">
                    <Star className="w-4 h-4 mt-0.5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium text-zinc-950 dark:text-white mb-1">
                        Feature this listing — $5 for life
                      </p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                        Homepage strip and the top of its category, permanently, labelled as
                        sponsored. One payment, no subscription.
                      </p>
                      <button
                        onClick={() => void feature()}
                        disabled={buying}
                        className="h-10 px-4 text-sm font-medium rounded-md bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-60 inline-flex items-center gap-2 transition-colors"
                      >
                        {buying && <Loader2 className="w-4 h-4 animate-spin" />}
                        {buying ? "Opening checkout…" : "Feature for $5"}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {error && <p className="text-sm text-red-600 dark:text-red-400 mb-6">{error}</p>}

              {/* What they submitted */}
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6">
                <div className="flex items-start gap-4 mb-5">
                  <ToolIcon name={row.name} url={row.url} size={48} />
                  <div className="min-w-0">
                    <h1 className="text-xl font-semibold text-zinc-950 dark:text-white tracking-tight">
                      {row.name}
                    </h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{row.tagline}</p>
                  </div>
                </div>

                <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4 text-sm mb-5">
                  <div className="sm:col-span-2">
                    <dt className="text-zinc-500 dark:text-zinc-400 mb-1">Link</dt>
                    <dd>
                      <a href={row.url} target="_blank" rel="noopener nofollow"
                        className="text-indigo-600 dark:text-indigo-400 hover:underline break-all">
                        {row.url}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-zinc-500 dark:text-zinc-400 mb-1">Category</dt>
                    <dd className="text-zinc-950 dark:text-white">{row.category}</dd>
                  </div>
                  <div>
                    <dt className="text-zinc-500 dark:text-zinc-400 mb-1">Pricing</dt>
                    <dd className="text-zinc-950 dark:text-white">
                      {row.pricing}
                      {row.pricing_details && (
                        <span className="block text-zinc-500 dark:text-zinc-400 text-xs mt-0.5">
                          {row.pricing_details}
                        </span>
                      )}
                    </dd>
                  </div>
                  {row.founder && (
                    <div>
                      <dt className="text-zinc-500 dark:text-zinc-400 mb-1">Made by</dt>
                      <dd className="text-zinc-950 dark:text-white">{row.founder}</dd>
                    </div>
                  )}
                  {row.twitter && (
                    <div>
                      <dt className="text-zinc-500 dark:text-zinc-400 mb-1">X / Twitter</dt>
                      <dd className="text-zinc-950 dark:text-white">@{row.twitter.replace(/^@/, "")}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-zinc-500 dark:text-zinc-400 mb-1">Submitted</dt>
                    <dd className="text-zinc-950 dark:text-white">
                      {(row.submitted_at || "").slice(0, 10)}
                    </dd>
                  </div>
                </dl>

                <div className="pt-5 border-t border-zinc-100 dark:border-zinc-800">
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-1.5">Description</p>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                    {row.description}
                  </p>
                </div>

                {row.features && (
                  <div className="pt-5 mt-5 border-t border-zinc-100 dark:border-zinc-800">
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-2">Key features</p>
                    <ul className="space-y-1.5">
                      {row.features.split("\n").map((f) => f.trim()).filter(Boolean).map((f) => (
                        <li key={f} className="flex gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                          <Check className="w-4 h-4 mt-0.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" strokeWidth={2.5} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800">
                  Something wrong here? Reply to your submission email and we will fix it.
                </p>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
