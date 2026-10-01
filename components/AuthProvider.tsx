"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabaseBrowser, isSupabaseReady } from "@/lib/supabase";

/**
 * Accounts, on Supabase.
 *
 * Previously this pointed at Firebase Auth, which was never configured in
 * production, so /account permanently said "accounts are not switched on".
 * Supabase needs only the two public env vars to sign people in - the
 * service-role key is for server-side reads and is deliberately not involved
 * here.
 *
 * Scope is unchanged: an account exists so a submitter can see the tools they
 * sent us and manage a paid placement. Comment posting stays shut behind its
 * own flag in ToolComments; working auth must not switch unmoderated public
 * UGC on across 40+ tool pages as a side effect.
 */

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  /** False when Supabase is not configured - UI hides what cannot work. */
  ready: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const NOT_CONFIGURED = "Sign-in is not available right now.";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  // Only wait on a client that exists; otherwise the UI would spin forever in
  // an unconfigured environment.
  const [loading, setLoading] = useState(isSupabaseReady);

  useEffect(() => {
    const supabase = supabaseBrowser();
    if (!supabase) return;

    // getSession() resolves from local storage immediately; the listener then
    // keeps it current across tabs, token refreshes and sign-out.
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      session,
      loading,
      ready: isSupabaseReady,
      signInWithEmail: async (email, password) => {
        const supabase = supabaseBrowser();
        if (!supabase) throw new Error(NOT_CONFIGURED);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      },
      signUpWithEmail: async (email, password) => {
        const supabase = supabaseBrowser();
        if (!supabase) throw new Error(NOT_CONFIGURED);
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            // Must match a Redirect URL allowed in the Supabase dashboard, or
            // the confirmation link silently falls back to the Site URL.
            emailRedirectTo:
              typeof window !== "undefined" ? `${window.location.origin}/account` : undefined,
          },
        });
        if (error) throw error;
      },
      signInWithGoogle: async () => {
        const supabase = supabaseBrowser();
        if (!supabase) throw new Error(NOT_CONFIGURED);
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo:
              typeof window !== "undefined" ? `${window.location.origin}/account` : undefined,
          },
        });
        if (error) throw error;
      },
      resetPassword: async (email) => {
        const supabase = supabaseBrowser();
        if (!supabase) throw new Error(NOT_CONFIGURED);
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo:
            typeof window !== "undefined" ? `${window.location.origin}/account` : undefined,
        });
        if (error) throw error;
      },
      logout: async () => {
        const supabase = supabaseBrowser();
        if (!supabase) return;
        await supabase.auth.signOut();
      },
    }),
    [session, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider />");
  return ctx;
}

/**
 * Supabase error messages are mostly fine to show, but the common ones read
 * better rephrased, and "Invalid login credentials" should not hint at
 * whether the address exists.
 */
export function authErrorMessage(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err ?? "");
  const m = msg.toLowerCase();
  if (m.includes("invalid login credentials")) return "Email or password is not right.";
  if (m.includes("user already registered") || m.includes("already been registered")) {
    return "There is already an account with that email. Try signing in.";
  }
  if (m.includes("password should be at least")) {
    return "Pick a password of at least 6 characters.";
  }
  if (m.includes("email not confirmed")) {
    return "Check your inbox and confirm your email address first.";
  }
  if (m.includes("unable to validate email") || m.includes("invalid email")) {
    return "That does not look like an email address.";
  }
  if (m.includes("rate limit") || m.includes("too many")) {
    return "Too many attempts. Wait a few minutes and try again.";
  }
  if (m.includes("provider is not enabled")) {
    return "That sign-in method is not switched on for this site yet.";
  }
  return msg || "Could not sign you in.";
}
