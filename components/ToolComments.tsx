"use client";

import { useEffect, useState, FormEvent } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { firestore, isFirebaseReady } from "@/lib/firebase";
import { useAuth } from "./AuthProvider";
import { AuthButtons } from "./AuthButtons";
import { MessageCircle, Send } from "lucide-react";

interface ToolCommentsProps {
  toolId: string;
}

interface CommentDoc {
  id: string;
  text: string;
  userName: string | null;
  userAvatar?: string | null;
  userId: string;
  createdAt?: { seconds: number; nanoseconds: number };
}

export function ToolComments({ toolId }: ToolCommentsProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<CommentDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!isFirebaseReady || !firestore) {
      setLoading(false);
      return;
    }

    const commentsRef = collection(firestore, "toolComments");
    const q = query(
      commentsRef,
      where("toolId", "==", toolId),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs: CommentDoc[] = snapshot.docs.map((doc) => {
        const data = doc.data() as any;
        return {
          id: doc.id,
          text: data.text ?? "",
          userName: data.userName ?? null,
          userAvatar: data.userAvatar ?? null,
          userId: data.userId ?? "",
          createdAt: data.createdAt,
        };
      });
      setComments(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [toolId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || !text.trim() || !isFirebaseReady || !firestore) return;

    setSubmitting(true);
    try {
      const commentsRef = collection(firestore, "toolComments");
      await addDoc(commentsRef, {
        toolId,
        text: text.trim(),
        userId: user.uid,
        userName: user.displayName || user.email || "Anonymous",
        userAvatar: user.photoURL || null,
        createdAt: serverTimestamp(),
      });
      setText("");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isFirebaseReady) {
    return null;
  }

  return (
    <section className="mt-10">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Comments
          </h2>
        </div>

        <div className="mb-4">
          <AuthButtons />
        </div>

        {user && (
          <form onSubmit={handleSubmit} className="mb-6 space-y-3">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Share your feedback or tips for this tool
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write a helpful comment for other users..."
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting || !text.trim()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
                {submitting ? "Posting..." : "Post Comment"}
              </button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {loading ? (
            <p className="text-sm text-slate-500">Loading comments...</p>
          ) : comments.length === 0 ? (
            <p className="text-sm text-slate-500">
              No comments yet. Be the first to share your thoughts!
            </p>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 flex gap-3"
              >
                {comment.userAvatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={comment.userAvatar}
                    alt={comment.userName || "User avatar"}
                    className="w-8 h-8 rounded-full mt-0.5 flex-shrink-0"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-semibold text-slate-500 dark:text-slate-300 mt-0.5 flex-shrink-0">
                    {(comment.userName || "U").charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {comment.userName || "Anonymous"}
                    </span>
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
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}


