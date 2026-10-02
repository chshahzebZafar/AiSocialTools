"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth, authErrorMessage } from "@/components/AuthProvider";
import { supabaseBrowser } from "@/lib/supabase";
import { BadgeCheck, Check, Loader2, Mail } from "lucide-react";

/**
 * Sign in and create account.
 *
 * A split screen rather than a lone card: the left panel carries the reason to
 * bother making an account, which a bare form does not. Everything here uses
 * the site's own tokens - zinc ground, indigo accent, rounded-md controls at
 * h-10 - so it reads as part of the site rather than a bolted-on auth page.
 */

const REASONS = [
  "Submit a tool and track it through review",
  "See the moment a listing goes live, with its public link",
  "Feature a listing for a one-off $5",
];

export function AuthScreen() {
  const { ready, signInWithEmail, signUpWithEmail, signInWithGoogle, resetPassword } = useAuth();
  const [mode, setMode] = useState<"in" | "up">("up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState("");
  const [notice, setNotice] = useState("");
  const [googleEnabled, setGoogleEnabled] = useState(false);

  // Ask the project which providers are on, so a button never appears that
  // could only produce "provider is not enabled".
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!supabaseBrowser() || !url || !key) return;
    fetch(`${url}/auth/v1/settings`, { headers: { apikey: key } })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setGoogleEnabled(Boolean(d?.external?.google)))
      .catch(() => setGoogleEnabled(false));
  }, []);

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
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Accounts are not switched on for this site yet.
        </p>
      </div>
    );
  }

  // After signup the person is still signed out until they confirm, so the
  // screen has to say what happened - otherwise the form looks like it failed.
  if (sent) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center mx-auto mb-5">
          <Mail className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
        </div>
        <h1 className="text-2xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-2">
          Check your email
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
          We sent a confirmation link to <span className="font-medium text-zinc-950 dark:text-white">{sent}</span>.
          Click it and you can sign in — the link has to be opened before your account works.
        </p>
        <button
          onClick={() => {
            setSent("");
            setMode("in");
          }}
          className="text-sm text-zinc-500 hover:text-zinc-950 dark:hover:text-white underline"
        >
          Back to sign in
        </button>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 min-h-[calc(100vh-4rem)]">
      {/* Why bother making an account. A bare form answers nothing. */}
      <div className="relative hidden lg:flex flex-col justify-center overflow-hidden bg-zinc-950 px-12 xl:px-16 py-16">
        <div className="absolute inset-0 bg-dot-grid-animated opacity-[0.12]" aria-hidden />
        <div className="relative max-w-md">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-xs font-medium text-zinc-300 mb-6">
            <BadgeCheck className="w-3.5 h-3.5 text-indigo-400" />
            Hand-checked directory
          </div>
          <h2 className="text-3xl xl:text-4xl font-semibold text-white tracking-tight leading-tight mb-5">
            Get your tool in front of people looking for it.
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-8">
            Every listing is opened and checked by a person before it goes live. An account lets
            you submit one and follow it through.
          </p>
          <ul className="space-y-3">
            {REASONS.map((r) => (
              <li key={r} className="flex gap-2.5 text-sm text-zinc-300">
                <Check className="w-4 h-4 mt-0.5 text-indigo-400 flex-shrink-0" strokeWidth={2.5} />
                <span>{r}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-zinc-500 mt-10">
            Listing is free. Featuring is a one-off $5 — never a subscription.
          </p>
        </div>
      </div>

      {/* The form */}
      <div className="flex items-center justify-center px-4 sm:px-8 py-14 bg-white dark:bg-zinc-950">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-1">
            {mode === "up" ? "Create your account" : "Welcome back"}
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-7">
            {mode === "up"
              ? "You will need one to submit a tool."
              : "Sign in to manage your listings."}
          </p>

          <div className="flex gap-1 mb-6 p-1 rounded-lg bg-zinc-100 dark:bg-zinc-900">
            {(["up", "in"] as const).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  setError("");
                  setNotice("");
                }}
                aria-pressed={mode === m}
                className={`flex-1 h-9 text-sm font-medium rounded-md transition-colors ${
                  mode === m
                    ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                {m === "up" ? "Create account" : "Sign in"}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void run(async () => {
                if (mode === "in") {
                  await signInWithEmail(email, password);
                  return;
                }
                await signUpWithEmail(email, password);
                setSent(email);
                setPassword("");
              });
            }}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="auth-email"
                className="block text-sm font-medium text-zinc-900 dark:text-zinc-200 mb-1.5"
              >
                Email
              </label>
              <input
                id="auth-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full h-10 px-3 text-sm rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
              />
            </div>

            <div>
              <div className="flex items-baseline justify-between mb-1.5">
                <label
                  htmlFor="auth-password"
                  className="block text-sm font-medium text-zinc-900 dark:text-zinc-200"
                >
                  Password
                </label>
                {mode === "in" && (
                  <button
                    type="button"
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
                    className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 underline"
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <input
                id="auth-password"
                type="password"
                required
                minLength={6}
                autoComplete={mode === "in" ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === "up" ? "At least 6 characters" : "Your password"}
                className="w-full h-10 px-3 text-sm rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={busy}
              className="w-full h-10 rounded-md bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-60 inline-flex items-center justify-center gap-2 transition-colors"
            >
              {busy && <Loader2 className="w-4 h-4 animate-spin" />}
              {mode === "up" ? "Create account" : "Sign in"}
            </button>
          </form>

          {googleEnabled && (
            <>
              <div className="flex items-center gap-3 my-5">
                <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
                <span className="text-xs text-zinc-400">or</span>
                <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
              </div>
              <button
                onClick={() => void run(signInWithGoogle)}
                disabled={busy}
                className="w-full h-10 rounded-md border border-zinc-300 dark:border-zinc-700 text-sm font-medium text-zinc-900 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 disabled:opacity-60 transition-colors"
              >
                Continue with Google
              </button>
            </>
          )}

          {error && <p className="mt-4 text-sm text-red-600 dark:text-red-400">{error}</p>}
          {notice && <p className="mt-4 text-sm text-emerald-700 dark:text-emerald-400">{notice}</p>}

          <p className="mt-7 text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed">
            By creating an account you agree to our{" "}
            <Link href="/terms" className="underline hover:text-zinc-600 dark:hover:text-zinc-300">terms</Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline hover:text-zinc-600 dark:hover:text-zinc-300">privacy policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
