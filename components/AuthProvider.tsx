"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  type User,
} from "firebase/auth";
import { auth, googleProvider, isFirebaseReady } from "@/lib/firebase";

/**
 * Accounts exist for one job: a submitter signs in, sees the tools they sent
 * us, and manages the one they paid to feature. Everything else an account
 * could do is deliberately not wired up here.
 *
 * This replaces a stub that always returned `user: null` ("auth is temporarily
 * disabled"). Two things that stub was holding shut are worth knowing about:
 *
 *  - ToolComments posts straight to Firestore with no moderation queue. It is
 *    kept shut by its own flag now rather than by auth being broken, so
 *    turning comments on becomes a decision instead of a side effect.
 *  - /profile is a 612-line page that assumes a real user. It comes back to
 *    life with this change.
 *
 * When Firebase is not configured (NEXT_PUBLIC_FIREBASE_* absent, as in a
 * preview build or a fork), `auth` is undefined. Every method below degrades
 * to a clear error instead of throwing on undefined, and `ready` is false so
 * the UI can hide sign-in rather than offer something that cannot work.
 */

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  /** False when Firebase env vars are missing - sign-in cannot work at all. */
  ready: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  /** Fresh ID token for calling our own API as this user. Null when signed out. */
  getIdToken: () => Promise<string | null>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const NOT_CONFIGURED = "Sign-in is not available right now.";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  // Starts true only when there is an auth instance to wait on; otherwise the
  // UI would sit on a spinner forever in an unconfigured environment.
  const [loading, setLoading] = useState(isFirebaseReady && !!auth);

  useEffect(() => {
    if (!auth) return;
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      ready: isFirebaseReady && !!auth,
      signInWithGoogle: async () => {
        if (!auth || !googleProvider) throw new Error(NOT_CONFIGURED);
        await signInWithPopup(auth, googleProvider);
      },
      signInWithEmail: async (email, password) => {
        if (!auth) throw new Error(NOT_CONFIGURED);
        await signInWithEmailAndPassword(auth, email, password);
      },
      signUpWithEmail: async (email, password) => {
        if (!auth) throw new Error(NOT_CONFIGURED);
        await createUserWithEmailAndPassword(auth, email, password);
      },
      resetPassword: async (email) => {
        if (!auth) throw new Error(NOT_CONFIGURED);
        await sendPasswordResetEmail(auth, email);
      },
      logout: async () => {
        if (!auth) return;
        await signOut(auth);
      },
      getIdToken: async () => {
        if (!auth?.currentUser) return null;
        return auth.currentUser.getIdToken();
      },
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider />");
  return ctx;
}

/**
 * Firebase error codes are not fit to show anyone. Map the ones people
 * actually hit; fall back to something honest rather than a code.
 */
export function authErrorMessage(err: unknown): string {
  const code = typeof err === "object" && err && "code" in err ? String(err.code) : "";
  switch (code) {
    case "auth/invalid-email":
      return "That does not look like an email address.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Email or password is not right.";
    case "auth/email-already-in-use":
      return "There is already an account with that email. Try signing in.";
    case "auth/weak-password":
      return "Pick a password of at least 6 characters.";
    case "auth/too-many-requests":
      return "Too many attempts. Wait a few minutes and try again.";
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return "Sign-in window closed before finishing.";
    case "auth/unauthorized-domain":
      return "This site is not on the Firebase authorised domains list yet.";
    default:
      return err instanceof Error && err.message ? err.message : "Could not sign you in.";
  }
}
