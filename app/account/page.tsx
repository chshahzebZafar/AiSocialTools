"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { useAuth, authErrorMessage } from "@/components/AuthProvider";
import { ArrowUpRight, Loader2, LogOut, Mail } from "lucide-react";

/**
 * The submitter's side of the directory: sign in, see what you sent us and
 * where it got to.
 *
 * Kept separate from /profile, which is the older comments-and-bug-reports
 * page. This one exists to serve the submission and paid-placement flow and
 * nothing else.
 */

type Submission = {
  id: string;
  reference: string;
  submittedAt: string;
  name: string;
  url: string;
  tagline: string;
  category: string;
  pricing: string;
  slug: string;
  status: string;
  sponsored: boolean;
  sponsoredUntil: string;
};

const STATUS_STYLE: Record<string, string> = {
  new: "bg-amber-50 text-amber-700 border-amber-200",
  approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  declined: "bg-zinc-100 text-zinc-600 border-zinc-200",
};

const STATUS_LABEL: Record<string, string> = {
  new: "In review",
  approved: "Published",
  declined: "Not listed",
};

function SignInPanel() {
  const { ready, signInWithGoogle, signInWithEmail, signUpWithEmail, resetPassword } = useAuth();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function run(fn: () => Promise<void>) {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await fn();
    } catch (err) {
      setError(authErrorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  if (!ready) {
    return (
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Accounts are not switched on for this site yet. You can still{" "}
          <Link href="/ai-directory/submit" className="underline">
            submit a tool
          </Link>{" "}
          without one — you will get a reference by email.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-sm">
      <div className="flex gap-1 mb-5 p-1 rounded-lg bg-zinc-100 dark:bg-zinc-900 w-fit">
        {(["in", "up"] as const).map((m) => (
          <button
            key={m}
            onClick={() => {
              setMode(m);
              setError("");
              setNotice("");
            }}
            className={`px-3 h-8 text-sm font-medium rounded-md transition-colors ${
              mode === m
                ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-sm"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
            }`}
          >
            {m === "in" ? "Sign in" : "Create account"}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void run(() =>
            mode === "in" ? signInWithEmail(email, password) : signUpWithEmail(email, password)
          );
        }}
        className="space-y-3"
      >
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="w-full px-3 py-2 text-sm border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900"
        />
        <input
          type="password"
          required
          minLength={6}
          autoComplete={mode === "in" ? "current-password" : "new-password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-3 py-2 text-sm border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900"
        />
        <button
          type="submit"
          disabled={busy}
          className="w-full h-10 rounded-lg bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-sm font-medium disabled:opacity-60 inline-flex items-center justify-center gap-2"
        >
          {busy && <Loader2 className="w-4 h-4 animate-spin" />}
          {mode === "in" ? "Sign in" : "Create account"}
        </button>
      </form>

      <button
        onClick={() => void run(signInWithGoogle)}
        disabled={busy}
        className="w-full h-10 mt-3 rounded-lg border border-zinc-300 dark:border-zinc-700 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900 disabled:opacity-60"
      >
        Continue with Google
      </button>

      {mode === "in" && (
        <button
          onClick={() => {
            if (!email) {
              setError("Enter your email address first.");
              return;
            }
            void run(async () => {
              await resetPassword(email);
              setNotice("If that address has an account, a reset link is on its way.");
            });
          }}
          className="mt-3 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 underline"
        >
          Forgot password?
        </button>
      )}

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      {notice && <p className="mt-3 text-sm text-emerald-700">{notice}</p>}
    </div>
  );
}

export default function AccountPage() {
  const { user, loading, logout, getIdToken } = useAuth();
  const [rows, setRows] = useState<Submission[] | null>(null);
  const [error, setError] = useState("");
  const [emailVerified, setEmailVerified] = useState(true);

  const load = useCallback(async () => {
    const token = await getIdToken();
    if (!token) return;
    setError("");
    try {
      const res = await fetch("/api/account/submissions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not load your submissions.");
      setRows(data.submissions);
      setEmailVerified(data.emailVerified !== false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load your submissions.");
    }
  }, [getIdToken]);

  useEffect(() => {
    if (user) void load();
  }, [user, load]);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      <Header />
      <main className="flex-1">
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <Badge variant="neutral" className="mb-3">Your account</Badge>
            <h1 className="text-3xl sm:text-4xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-3">
              Your submissions
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl">
              Everything you have sent to the directory, and where each one got to.
            </p>
          </div>
        </section>

        <section>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {loading ? (
              <p className="text-sm text-zinc-500 inline-flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Checking…
              </p>
            ) : !user ? (
              <SignInPanel />
            ) : (
              <>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Signed in as <span className="font-medium text-zinc-950 dark:text-white">{user.email}</span>
                  </p>
                  <button
                    onClick={() => void logout()}
                    className="text-sm text-zinc-500 hover:text-zinc-950 dark:hover:text-white inline-flex items-center gap-1.5"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>

                {/* Unverified accounts only ever see submissions made while
                    signed in. Explained rather than left as a silent gap. */}
                {!emailVerified && (
                  <div className="mb-6 flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
                    <Mail className="w-4 h-4 mt-0.5 text-amber-600 flex-shrink-0" />
                    <p className="text-sm text-amber-900">
                      Your email is not verified yet, so submissions you sent before creating this
                      account are not shown here. Verify it and they will appear.
                    </p>
                  </div>
                )}

                {error && <p className="text-sm text-red-600 mb-6">{error}</p>}

                {rows === null ? (
                  <p className="text-sm text-zinc-500 inline-flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Loading…
                  </p>
                ) : rows.length === 0 ? (
                  <div className="text-center py-14 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
                    <p className="text-zinc-600 dark:text-zinc-400 mb-1">Nothing submitted yet.</p>
                    <p className="text-sm text-zinc-500 mb-6">
                      Listing is free, and we check every submission before it goes live.
                    </p>
                    <ButtonLink href="/ai-directory/submit" size="md">Submit a tool</ButtonLink>
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {rows.map((s) => (
                      <li
                        key={s.id}
                        className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-5"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                          <div className="min-w-0">
                            <p className="font-semibold text-zinc-950 dark:text-white">{s.name}</p>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">{s.tagline}</p>
                          </div>
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded-full border whitespace-nowrap ${
                              STATUS_STYLE[s.status] || STATUS_STYLE.declined
                            }`}
                          >
                            {STATUS_LABEL[s.status] || s.status}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400">
                          <span>Ref {s.reference || "—"}</span>
                          <span>Sent {s.submittedAt.slice(0, 10)}</span>
                          <span>{s.category}</span>
                          {s.sponsored && s.sponsoredUntil && (
                            <span className="text-amber-700 dark:text-amber-400 font-medium">
                              Featured until {s.sponsoredUntil}
                            </span>
                          )}
                          {s.status === "approved" && s.slug && (
                            <Link
                              href={`/ai-directory/${s.slug}`}
                              className="text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-0.5"
                            >
                              View listing <ArrowUpRight className="w-3 h-3" />
                            </Link>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-8 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5">
                  <p className="font-medium text-zinc-950 dark:text-white mb-1">
                    Want a listing featured?
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Featured listings appear on the homepage and at the top of the directory,
                    labelled as sponsored.{" "}
                    <Link href="/contact" className="underline">Get in touch</Link> and we will
                    sort it out.
                  </p>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
