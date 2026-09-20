"use client";

import Link from "next/link";
import { useAuth } from "./AuthProvider";
import { UserCircle2 } from "lucide-react";

/**
 * Header entry point to an account.
 *
 * Renders nothing when Firebase is not configured, so an unconfigured build
 * shows no sign-in it cannot honour. Also renders nothing while the auth state
 * is still resolving, which avoids the flash of "Sign in" that turns into the
 * user's own email a moment later.
 */
export function AuthButtons() {
  const { user, loading, ready } = useAuth();

  if (!ready || loading) return null;

  if (!user) {
    return (
      <Link
        href="/account"
        className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors"
      >
        Sign in
      </Link>
    );
  }

  return (
    <Link
      href="/account"
      title={user.email || "Your account"}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors"
    >
      <UserCircle2 className="w-4 h-4" />
      <span className="hidden sm:inline max-w-[12ch] truncate">
        {user.displayName || user.email?.split("@")[0] || "Account"}
      </span>
    </Link>
  );
}
