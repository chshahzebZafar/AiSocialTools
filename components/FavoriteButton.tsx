"use client";

import { useState } from "react";
import { useFavorites } from "@/hooks/useFavorites";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";

interface FavoriteButtonProps {
  toolId: string;
  className?: string;
}

// Simple SVG fallback for Heart icon
const HeartIcon = ({ className, filled = false }: { className?: string; filled?: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

export function FavoriteButton({ toolId, className = "" }: FavoriteButtonProps) {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const router = useRouter();
  const [isToggling, setIsToggling] = useState(false);
  const favorite = isFavorite(toolId);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      // Redirect to profile page to sign in
      router.push("/profile");
      return;
    }

    if (isToggling) return;

    setIsToggling(true);
    try {
      await toggleFavorite(toolId);
    } catch (error) {
      console.error("Error toggling favorite:", error);
      alert("Failed to update favorite. Please try again.");
    } finally {
      setIsToggling(false);
    }
  };

  // Auth is temporarily disabled - show disabled button
  if (!user) {
    return (
      <button
        disabled
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm text-slate-400 dark:text-slate-500 opacity-50 cursor-not-allowed ${className}`}
        title="Authentication is temporarily disabled"
      >
        <HeartIcon className="w-4 h-4" />
        <span>Add to Favorites</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={isToggling}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-colors ${
        favorite
          ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
          : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
      } ${isToggling ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      title={favorite ? "Remove from favorites" : "Add to favorites"}
    >
      <HeartIcon className="w-4 h-4" filled={favorite} />
      <span>{favorite ? "Favorited" : "Add to Favorites"}</span>
    </button>
  );
}

