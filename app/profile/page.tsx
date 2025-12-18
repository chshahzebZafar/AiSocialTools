"use client";

import { useAuth } from "@/components/AuthProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  collection,
  collectionGroup,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { firestore, isFirebaseReady } from "@/lib/firebase";
import { getToolById } from "@/lib/social-tools";
import { MessageCircle, Bug, Settings, UserCircle2 } from "lucide-react";

type TabKey = "overview" | "comments" | "bugs" | "settings";

interface CommentDoc {
  id: string;
  toolId: string;
  text: string;
  createdAt?: { seconds: number; nanoseconds: number };
}

interface BugReportDoc {
  id: string;
  toolId: string;
  title: string;
  status?: string;
  createdAt?: { seconds: number; nanoseconds: number };
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [comments, setComments] = useState<CommentDoc[]>([]);
  const [bugs, setBugs] = useState<BugReportDoc[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [loadingBugs, setLoadingBugs] = useState(true);
  const [commentsError, setCommentsError] = useState<string | null>(null);
  const [bugsError, setBugsError] = useState<string | null>(null);

  // Auth is temporarily disabled - show message instead of redirecting
  // useEffect(() => {
  //   if (!loading && !user) {
  //     router.push("/");
  //   }
  // }, [loading, user, router]);

  useEffect(() => {
    // Auth is temporarily disabled - no user data to load
    if (!user || !isFirebaseReady || !firestore) {
      setLoadingComments(false);
      setLoadingBugs(false);
      return;
    }

    // Type guard - user should never be truthy when auth is disabled, but TypeScript needs this
    if (!user || typeof user !== 'object' || !('uid' in user)) {
      setLoadingComments(false);
      setLoadingBugs(false);
      return;
    }

    // Use collectionGroup to query across all users' toolComments subcollections
    // Comments are stored as: users/{userId}/toolComments/{commentId}
    const toolCommentsGroup = collectionGroup(firestore, "toolComments");
    const commentsQuery = query(
      toolCommentsGroup,
      where("userId", "==", (user as any).uid),
      orderBy("createdAt", "desc")
    );

    const unsubComments = onSnapshot(
      commentsQuery,
      (snap) => {
        const docs: CommentDoc[] = snap.docs.map((doc) => {
          const data = doc.data() as any;
          return {
            id: doc.id,
            toolId: data.toolId ?? "",
            text: data.text ?? "",
            createdAt: data.createdAt,
          };
        });
        setComments(docs);
        setLoadingComments(false);
      },
      (error: any) => {
        console.error("Error loading comments:", error);
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);
        
        // Set user-friendly error message
        if (error.code === "permission-denied") {
          setCommentsError("Permission denied. Please check Firestore security rules.");
        } else if (error.code === "failed-precondition") {
          // Extract the index creation URL from the error message if available
          const indexUrlMatch = error.message?.match(/https:\/\/[^\s]+/);
          const indexUrl = indexUrlMatch ? indexUrlMatch[0] : null;
          
          if (indexUrl) {
            setCommentsError(
              `Missing Firestore index. Click here to create it: ${indexUrl}`
            );
            console.log("Index creation URL:", indexUrl);
          } else {
            setCommentsError(
              "Missing Firestore index. Check browser console for the index creation link, or deploy firestore.indexes.json using Firebase CLI."
            );
          }
        } else {
          setCommentsError(`Error loading comments: ${error.message}`);
        }
        
        setLoadingComments(false);
      }
    );

    const bugsRef = collection(firestore, "toolBugReports");
    const bugsQuery = query(
      bugsRef,
      where("userId", "==", (user as any).uid),
      orderBy("createdAt", "desc")
    );

    const unsubBugs = onSnapshot(
      bugsQuery,
      (snap) => {
        const docs: BugReportDoc[] = snap.docs.map((doc) => {
          const data = doc.data() as any;
          return {
            id: doc.id,
            toolId: data.toolId ?? "",
            title: data.title ?? "",
            status: data.status,
            createdAt: data.createdAt,
          };
        });
        setBugs(docs);
        setLoadingBugs(false);
      },
      (error: any) => {
        console.error("Error loading bug reports:", error);
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);
        
        // Set user-friendly error message
        if (error.code === "permission-denied") {
          setBugsError("Permission denied. Please check Firestore security rules.");
        } else if (error.code === "failed-precondition") {
          const indexUrlMatch = error.message?.match(/https:\/\/[^\s]+/);
          const indexUrl = indexUrlMatch ? indexUrlMatch[0] : null;
          
          if (indexUrl) {
            setBugsError(
              `Missing Firestore index. Click here to create it: ${indexUrl}`
            );
            console.log("Index creation URL:", indexUrl);
          } else {
            setBugsError(
              "Missing Firestore index. Check browser console for the index creation link."
            );
          }
        } else {
          setBugsError(`Error loading bug reports: ${error.message}`);
        }
        
        setLoadingBugs(false);
      }
    );

    return () => {
      unsubComments();
      unsubBugs();
    };
  }, [user]);

  // Hooks must be called before any conditional returns
  const recentComments = useMemo(() => comments.slice(0, 10), [comments]);
  const recentBugs = useMemo(() => bugs.slice(0, 10), [bugs]);

  // Auth is temporarily disabled
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center max-w-md mx-auto p-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Profile Page
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Authentication is temporarily disabled. This feature will be available again soon.
          </p>
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    if (activeTab === "overview") {
      return (
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Welcome back! Here&apos;s a quick snapshot of your activity.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 p-4">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                Comments
              </p>
              <p className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
                {comments.length}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 p-4">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                Bug reports
              </p>
              <p className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
                {bugs.length}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 p-4">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                Tools used
              </p>
              <p className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
                {new Set(comments.map((c) => c.toolId)).size}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === "comments") {
      if (!isFirebaseReady) {
        return (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Comments history is unavailable because Firebase is not configured.
          </p>
        );
      }

      if (commentsError) {
        const indexUrlMatch = commentsError.match(/https:\/\/[^\s]+/);
        const indexUrl = indexUrlMatch ? indexUrlMatch[0] : null;
        
        return (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-sm text-red-800 dark:text-red-200 font-medium mb-2">
              Error loading comments
            </p>
            {indexUrl ? (
              <div className="space-y-2">
                <p className="text-xs text-red-600 dark:text-red-300">
                  Missing Firestore index required for querying your comments.
                </p>
                <a
                  href={indexUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs text-blue-600 dark:text-blue-400 hover:underline break-all"
                >
                  Click here to create the index →
                </a>
                <p className="text-xs text-red-500 dark:text-red-400 mt-2">
                  Or deploy firestore.indexes.json using Firebase CLI:{" "}
                  <code className="bg-red-100 dark:bg-red-900/40 px-1 rounded">
                    firebase deploy --only firestore:indexes
                  </code>
                </p>
              </div>
            ) : (
              <>
                <p className="text-xs text-red-600 dark:text-red-300">{commentsError}</p>
                <p className="text-xs text-red-500 dark:text-red-400 mt-2">
                  Check browser console for more details.
                </p>
              </>
            )}
          </div>
        );
      }

      if (loadingComments) {
        return (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Loading your comments...
          </p>
        );
      }

      if (!recentComments.length) {
        return (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            You haven&apos;t left any comments yet. Try commenting on a tool to
            help other users.
          </p>
        );
      }

      return (
        <div className="space-y-3">
          {recentComments.map((comment) => {
            const tool = getToolById(comment.toolId);
            return (
              <div
                key={comment.id}
                className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col gap-1"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
                      {tool ? tool.name : "Unknown tool"}
                    </p>
                  </div>
                  {comment.createdAt && (
                    <span className="text-xs text-slate-400">
                      {new Date(
                        comment.createdAt.seconds * 1000
                      ).toLocaleString()}
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-200 whitespace-pre-wrap">
                  {comment.text}
                </p>
                {tool && (
                  <Link
                    href={tool.path}
                    className="mt-2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline self-start"
                  >
                    View tool
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      );
    }

    if (activeTab === "bugs") {
      if (!isFirebaseReady) {
        return (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Bug reports are unavailable because Firebase is not configured.
          </p>
        );
      }

      if (bugsError) {
        const indexUrlMatch = bugsError.match(/https:\/\/[^\s]+/);
        const indexUrl = indexUrlMatch ? indexUrlMatch[0] : null;
        
        return (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-sm text-red-800 dark:text-red-200 font-medium mb-2">
              Error loading bug reports
            </p>
            {indexUrl ? (
              <div className="space-y-2">
                <p className="text-xs text-red-600 dark:text-red-300">
                  Missing Firestore index required for querying bug reports.
                </p>
                <a
                  href={indexUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs text-blue-600 dark:text-blue-400 hover:underline break-all"
                >
                  Click here to create the index →
                </a>
                <p className="text-xs text-red-500 dark:text-red-400 mt-2">
                  Check browser console for more details.
                </p>
              </div>
            ) : (
              <>
                <p className="text-xs text-red-600 dark:text-red-300">{bugsError}</p>
                <p className="text-xs text-red-500 dark:text-red-400 mt-2">
                  Check browser console for more details.
                </p>
              </>
            )}
          </div>
        );
      }

      if (loadingBugs) {
        return (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Loading your bug reports...
          </p>
        );
      }

      if (!recentBugs.length) {
        return (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            You haven&apos;t reported any bugs yet. You&apos;ll see them here
            once you start submitting feedback from tools.
          </p>
        );
      }

      return (
        <div className="space-y-3">
          {recentBugs.map((bug) => {
            const tool = getToolById(bug.toolId);
            return (
              <div
                key={bug.id}
                className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col gap-1"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <Bug className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
                      {bug.title || "Bug report"}
                    </p>
                  </div>
                  {bug.createdAt && (
                    <span className="text-xs text-slate-400">
                      {new Date(bug.createdAt.seconds * 1000).toLocaleString()}
                    </span>
                  )}
                </div>
                {tool && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                    Tool: {tool.name}
                  </p>
                )}
                {bug.status && (
                  <span className="inline-flex items-center mt-1 w-fit rounded-full px-2 py-0.5 text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    Status: {bug.status}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      );
    }

    // settings
    return (
      <div className="space-y-4">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Settings are simple for now. Your theme preference is stored in your
          browser, and you sign in with Google to sync comments across devices.
        </p>
        <ul className="text-sm text-slate-600 dark:text-slate-300 list-disc list-inside space-y-1">
          <li>Use the theme toggle in the header to switch light / dark mode.</li>
          <li>
            Your comments and bug reports are linked to your Google account and
            stored securely in Firebase.
          </li>
          <li>
            In the future you&apos;ll be able to manage favorites and
            notifications from here.
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-6">
          Your Profile
        </h1>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-center gap-4">
            {(user as any)?.photoURL ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={(user as any).photoURL}
                alt={(user as any)?.displayName || (user as any)?.email || "User avatar"}
                className="w-16 h-16 rounded-full object-cover border-2 border-slate-200 dark:border-slate-700 shadow-sm"
                onError={(e) => {
                  const img = e.currentTarget;
                  img.style.display = "none";
                  const fallback = img.nextElementSibling as HTMLElement;
                  if (fallback) {
                    fallback.style.display = "flex";
                  }
                }}
              />
            ) : null}
            <div
              className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 flex items-center justify-center text-2xl font-semibold text-white shadow-md"
              style={{ display: (user as any)?.photoURL ? "none" : "flex" }}
            >
              {((user as any)?.displayName || (user as any)?.email || "U").charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                {(user as any)?.displayName || "Anonymous User"}
              </p>
              {(user as any)?.email && (
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {(user as any).email}
                </p>
              )}
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                UID: {(user as any)?.uid || "N/A"}
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <Link
              href="/tools"
              className="inline-flex items-center px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Browse tools
            </Link>
            <button
              type="button"
              onClick={async () => {
                await logout();
                router.push("/");
              }}
              className="inline-flex items-center px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
          <div className="border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-3">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("overview")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                  activeTab === "overview"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                }`}
              >
                <UserCircle2 className="w-4 h-4" />
                Overview
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("comments")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                  activeTab === "comments"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                Recent comments
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("bugs")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                  activeTab === "bugs"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                }`}
              >
                <Bug className="w-4 h-4" />
                Reported bugs
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("settings")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                  activeTab === "settings"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                }`}
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </div>
          </div>

          <div className="px-4 sm:px-6 py-5">{renderTabContent()}</div>
        </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

