"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { Loader2, LogOut, User, AlertCircle } from "lucide-react";
import { isFirebaseReady } from "@/lib/firebase";

export function AuthButtons() {
  const router = useRouter();
  const { user, loading, signInWithGoogle, logout } = useAuth();

  if (!isFirebaseReady) {
    return (
      <div className="inline-flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2 py-1 rounded-lg">
        <AlertCircle className="w-3 h-3" />
        <span>Firebase not configured</span>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="inline-flex items-center gap-2 text-sm text-slate-500">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Checking login...</span>
      </div>
    );
  }

  if (!user) {
    const handleSignIn = async () => {
      await signInWithGoogle();
      router.push("/profile");
    };

    return (
      <button
        type="button"
        onClick={handleSignIn}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
      >
        <User className="w-4 h-4" />
        <span>Sign in with Google</span>
      </button>
    );
  }

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => router.push("/profile")}
        className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200 hover:underline"
      >
        {user.photoURL && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.photoURL}
            alt={user.displayName || "User avatar"}
            className="w-6 h-6 rounded-full"
          />
        )}
        <span className="font-medium">
          {user.displayName || user.email || "Profile"}
        </span>
      </button>
      <button
        type="button"
        onClick={handleLogout}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
      >
        <LogOut className="w-3 h-3" />
        <span>Logout</span>
      </button>
    </div>
  );
}


