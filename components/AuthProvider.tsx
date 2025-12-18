"use client";

import React, { createContext, useContext, useMemo } from "react";

// Auth is temporarily disabled - will be re-implemented later
type AuthContextValue = {
  user: null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Auth disabled - return empty state
  const value = useMemo(
    () => ({
      user: null,
      loading: false,
      signInWithGoogle: async () => {
        // Auth disabled
      },
      logout: async () => {
        // Auth disabled
      },
    }),
    []
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider />");
  return ctx;
}
