"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/components/AuthProvider";
import { AuthScreen } from "@/components/account/AuthScreen";
import { ListingStatus, FeaturedBadge } from "@/components/account/ListingStatus";
import { supabaseBrowser } from "@/lib/supabase";
import { ArrowUpRight, Loader2, LogOut, Mail, Plus } from "lucide-react";

/**
 * The submitter's dashboard.
 *
 * Signed out it is the auth screen; signed in it is their listings. Reads
 * my_submissions straight from the browser - that view is RLS-filtered to
 * auth.uid(), so it cannot return anybody else's rows and needs no API route
 * and no service-role key anywhere in the path.
 */

type Row = {
  id: string;
  reference: string;
  name: string;
  url: string;
  tagline: string;
  category: string;
  pricing: string;
  slug: string | null;
  status: string;
  sponsored: boolean;
  submitted_at: string;
};

export default function AccountPage() {
  const { user, session, loading, logout } = useAuth();
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState("");

  const emailVerified = Boolean(user?.email_confirmed_at);

  const load = useCallback(async () => {
    const supabase = supabaseBrowser();
    if (!supabase) return;
    setError("");

    // Attach anything submitted before this account existed. Rows carried over
    // from the old store have no owner, and this view matches on owner_id, so
    // without it someone who submitted last month sees an empty dashboard and
    // concludes their tool was never received.
    if (session?.access_token) {
      await fetch("/api/account/claim", {
        method: "POST",
        headers: { Authorization: `Bearer ${session.access_token}` },
      }).catch(() => {});
    }

    const { data, error: err } = await supabase
      .from("my_submissions")
      .select("id,reference,name,url,tagline,category,pricing,slug,status,sponsored,submitted_at")
      .order("submitted_at", { ascending: false });

    if (err) {
      setError(err.message || "Could not load your listings.");
      return;
    }
    setRows((data ?? []) as Row[]);
  }, [session]);

  useEffect(() => {
    if (user) void load();
  }, [user, load]);

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

  const live = (rows ?? []).filter((r) => r.status === "approved").length;
  const waiting = (rows ?? []).filter((r) => r.status === "new").length;

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      <Header />
      <main className="flex-1">
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-1.5">
                  Your listings
                </h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Signed in as {user.email}
                  {rows && rows.length > 0 && (
                    <>
                      {" · "}
                      {live} published, {waiting} in review
                    </>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/account/submit"
                  className="inline-flex items-center gap-1.5 h-10 px-4 text-sm font-medium rounded-md bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Submit a tool
                </Link>
                <button
                  onClick={() => void logout()}
                  className="inline-flex items-center gap-1.5 h-10 px-3 text-sm rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {!emailVerified && (
              <div className="mb-6 flex gap-3 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 p-4">
                <Mail className="w-4 h-4 mt-0.5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                <p className="text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
                  Your email is not confirmed yet. Listings you submitted before creating this
                  account will appear here once it is.
                </p>
              </div>
            )}

            {error && <p className="text-sm text-red-600 dark:text-red-400 mb-6">{error}</p>}

            {rows === null ? (
              <p className="text-sm text-zinc-500 inline-flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Loading…
              </p>
            ) : rows.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
                <h2 className="text-lg font-semibold text-zinc-950 dark:text-white mb-1.5">
                  No listings yet
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 max-w-sm mx-auto leading-relaxed">
                  Submit a tool and it will appear here while we check it. Listing is free.
                </p>
                <Link
                  href="/account/submit"
                  className="inline-flex items-center gap-1.5 h-10 px-4 text-sm font-medium rounded-md bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Submit a tool
                </Link>
              </div>
            ) : (
              <ul className="space-y-3">
                {rows.map((r) => (
                  <li key={r.id}>
                    <Link
                      href={`/account/listing/${r.reference}`}
                      className="group block rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm transition-all"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                        <div className="min-w-0">
                          <p className="font-semibold text-zinc-950 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {r.name}
                          </p>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-1">
                            {r.tagline}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {r.sponsored && <FeaturedBadge size="sm" />}
                          <ListingStatus status={r.status} size="sm" />
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400">
                        <span>{r.category}</span>
                        <span>{r.pricing}</span>
                        <span>Submitted {(r.submitted_at || "").slice(0, 10)}</span>
                        <span className="text-zinc-400 dark:text-zinc-500">{r.reference}</span>
                        {r.status === "approved" && r.slug && (
                          <span className="text-indigo-600 dark:text-indigo-400 inline-flex items-center gap-0.5">
                            View public page <ArrowUpRight className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
