"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";

interface FavoriteButtonProps {
  toolId: string;
  className?: string;
}

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

  if (!user) {
    return (
      <button
        onClick={handleClick}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${className}`}
        title="Sign in to add favorites"
      >
        <Heart className="w-4 h-4" />
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
      <Heart className={`w-4 h-4 ${favorite ? "fill-current" : ""}`} />
      <span>{favorite ? "Favorited" : "Add to Favorites"}</span>
    </button>
  );
}

