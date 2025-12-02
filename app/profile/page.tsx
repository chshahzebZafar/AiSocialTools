"use client";

import { useAuth } from "@/components/AuthProvider";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const { user, loading, logout } = useAuth();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      setShouldRedirect(true);
    }
  }, [loading, user]);

  if (shouldRedirect) {
    redirect("/");
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-6">
          Your Profile
        </h1>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-center gap-4">
            {user.photoURL && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.photoURL}
                alt={user.displayName || user.email || "User avatar"}
                className="w-16 h-16 rounded-full"
              />
            )}
            <div>
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                {user.displayName || "Anonymous User"}
              </p>
              {user.email && (
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {user.email}
                </p>
              )}
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                UID: {user.uid}
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <Link
              href="/tools"
              className="inline-flex items-center px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Browse Tools
            </Link>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2">
            Coming soon
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            In the future, this page can show your saved presets, favorite tools,
            and your comments history.
          </p>
        </div>
      </div>
    </div>
  );
}


