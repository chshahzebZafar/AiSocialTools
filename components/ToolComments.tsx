"use client";

import { useEffect, useState, FormEvent } from "react";
import {
  addDoc,
  collection,
  collectionGroup,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { firestore, isFirebaseReady } from "@/lib/firebase";
import { useAuth } from "./AuthProvider";
import { AuthButtons } from "./AuthButtons";
import { MessageCircle, Send, Edit2, Trash2, X, Check } from "lucide-react";

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
  docPath?: string; // Full Firestore path: users/{userId}/toolComments/{commentId}
}

export function ToolComments({ toolId }: ToolCommentsProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<CommentDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isFirebaseReady || !firestore) {
      setLoading(false);
      return;
    }

    // Use collectionGroup to query across all users' toolComments subcollections
    // This allows us to get all comments for a specific tool while maintaining
    // user-based organization: users/{userId}/toolComments/{commentId}
    const toolCommentsGroup = collectionGroup(firestore, "toolComments");
    const q = query(
      toolCommentsGroup,
      where("toolId", "==", toolId)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs: CommentDoc[] = snapshot.docs.map((docSnapshot) => {
          const data = docSnapshot.data() as any;
          // Extract userId from the document path: users/{userId}/toolComments/{commentId}
          const pathParts = docSnapshot.ref.path.split("/");
          const userIdFromPath = pathParts[1]; // users/{userId}
          
          return {
            id: docSnapshot.id,
            text: data.text ?? "",
            userName: data.userName ?? null,
            // Normalize avatar: convert empty strings to null, keep valid URLs
            userAvatar: data.userAvatar && data.userAvatar.trim() !== "" ? data.userAvatar : null,
            userId: userIdFromPath || (data.userId ?? ""), // Use path userId as primary, fallback to data
            createdAt: data.createdAt,
            docPath: docSnapshot.ref.path, // Store full path for edit/delete operations
          };
        });
        // Sort client-side by createdAt (newest first)
        docs.sort((a, b) => {
          if (!a.createdAt && !b.createdAt) return 0;
          if (!a.createdAt) return 1;
          if (!b.createdAt) return -1;
          return b.createdAt.seconds - a.createdAt.seconds;
        });
        setComments(docs);
        setLoading(false);
      },
      (error: any) => {
        console.error("Error loading comments:", error);
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);
        
        // Set user-friendly error message
        if (error.code === "permission-denied") {
          setError("Permission denied. Please check Firestore security rules.");
        } else if (error.code === "failed-precondition") {
          // Extract the index creation URL from the error message if available
          const indexUrlMatch = error.message?.match(/https:\/\/[^\s]+/);
          const indexUrl = indexUrlMatch ? indexUrlMatch[0] : null;
          
          if (indexUrl) {
            setError(
              `Missing Firestore index. Click here to create it: ${indexUrl}`
            );
            // Also log it for easy copy-paste
            console.log("Index creation URL:", indexUrl);
          } else {
            setError(
              "Missing Firestore index. Check browser console for the index creation link, or deploy firestore.indexes.json using Firebase CLI."
            );
          }
        } else {
          setError(`Error loading comments: ${error.message}`);
        }
        
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [toolId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Auth is temporarily disabled - comments cannot be posted
    if (!user || !text.trim() || !isFirebaseReady || !firestore) return;

    // Type guard - user should never be truthy when auth is disabled
    if (!user || typeof user !== 'object' || !('uid' in user)) return;

    setSubmitting(true);
    try {
      // Store comment under user's subcollection: users/{userId}/toolComments/{commentId}
      // This organizes all comments by user for easy future extension
      const userCommentsRef = collection(firestore, "users", (user as any).uid, "toolComments");
      await addDoc(userCommentsRef, {
        toolId,
        text: text.trim(),
        userId: (user as any).uid,
        userName: (user as any).displayName || (user as any).email || "Anonymous",
        // Normalize avatar: only save if it's a valid non-empty URL
        userAvatar: (user as any).photoURL && (user as any).photoURL.trim() !== "" ? (user as any).photoURL : null,
        createdAt: serverTimestamp(),
      });
      setText("");
    } catch (error: any) {
      console.error("Error posting comment:", error);
      alert("Failed to post comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditStart = (comment: CommentDoc) => {
    setEditingId(comment.id);
    setEditText(comment.text);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditText("");
  };

  const handleEditSave = async (comment: CommentDoc) => {
    if (!editText.trim() || !isFirebaseReady || !firestore || !comment.docPath) return;

    try {
      // Use the full document path stored in comment.docPath
      // Format: users/{userId}/toolComments/{commentId}
      const commentRef = doc(firestore, comment.docPath);
      await updateDoc(commentRef, {
        text: editText.trim(),
        updatedAt: serverTimestamp(),
      });
      setEditingId(null);
      setEditText("");
    } catch (error) {
      console.error("Error updating comment:", error);
      alert("Failed to update comment. Please try again.");
    }
  };

  const handleDelete = async (comment: CommentDoc) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;
    if (!isFirebaseReady || !firestore || !comment.docPath) return;

    setDeletingId(comment.id);
    try {
      // Use the full document path stored in comment.docPath
      // Format: users/{userId}/toolComments/{commentId}
      const commentRef = doc(firestore, comment.docPath);
      await deleteDoc(commentRef);
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Failed to delete comment. Please try again.");
    } finally {
      setDeletingId(null);
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

        {/* Auth is temporarily disabled - comments are view-only */}
        {!user && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              💬 Comments are view-only. Authentication is temporarily disabled.
            </p>
          </div>
        )}

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
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-sm text-red-800 dark:text-red-200 font-medium mb-2">
                Error loading comments
              </p>
              {error.includes("https://") ? (
                <div className="space-y-2">
                  <p className="text-xs text-red-600 dark:text-red-300">
                    Missing Firestore index required for querying comments.
                  </p>
                  <a
                    href={error.match(/https:\/\/[^\s]+/)?.[0]}
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
                  <p className="text-xs text-red-600 dark:text-red-300">{error}</p>
                  <p className="text-xs text-red-500 dark:text-red-400 mt-2">
                    Check browser console for more details.
                  </p>
                </>
              )}
            </div>
          )}
          {loading ? (
            <p className="text-sm text-slate-500">Loading comments...</p>
          ) : comments.length === 0 && !error ? (
            <p className="text-sm text-slate-500">
              No comments yet. Be the first to share your thoughts!
            </p>
          ) : (
            comments.map((comment) => {
              // Auth is temporarily disabled - no editing/deleting
              const isOwner = false; // user?.uid === comment.userId;
              const isEditing = editingId === comment.id;
              const isDeleting = deletingId === comment.id;

              return (
                <div
                  key={comment.id}
                  className={`border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 flex gap-3 ${
                    isDeleting ? "opacity-50" : ""
                  }`}
                >
                  {comment.userAvatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={comment.userAvatar}
                      alt={comment.userName || "User avatar"}
                      className="w-8 h-8 rounded-full mt-0.5 flex-shrink-0 object-cover border border-slate-200 dark:border-slate-700"
                      onError={(e) => {
                        // If image fails to load, hide it and show fallback
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
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 flex items-center justify-center text-xs font-semibold text-white mt-0.5 flex-shrink-0 shadow-sm"
                    style={{ display: comment.userAvatar ? "none" : "flex" }}
                  >
                    {(comment.userName || "Anonymous" || "U").charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {comment.userName || "Anonymous"}
                      </span>
                      <div className="flex items-center gap-2">
                        {comment.createdAt && (
                          <span className="text-xs text-slate-400">
                            {new Date(
                              comment.createdAt.seconds * 1000
                            ).toLocaleString()}
                          </span>
                        )}
                        {/* Edit/Delete buttons disabled - auth is temporarily disabled */}
                        {false && isOwner && !isEditing && (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleEditStart(comment)}
                              className="p-1.5 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 rounded transition-colors"
                              title="Edit comment"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(comment)}
                              disabled={isDeleting}
                              className="p-1.5 text-slate-500 hover:text-red-600 dark:hover:text-red-400 rounded transition-colors disabled:opacity-50"
                              title="Delete comment"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    {isEditing ? (
                      <div className="space-y-2">
                        <textarea
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          rows={3}
                          className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Edit your comment..."
                          autoFocus
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={handleEditCancel}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                            Cancel
                          </button>
                          <button
                            onClick={() => handleEditSave(comment)}
                            disabled={!editText.trim()}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                          >
                            <Check className="w-3.5 h-3.5" />
                            Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-700 dark:text-slate-200 whitespace-pre-wrap">
                        {comment.text}
                      </p>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}


