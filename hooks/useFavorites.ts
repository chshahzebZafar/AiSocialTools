"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { 
  addToFavorites, 
  removeFromFavorites, 
  type Favorite
} from "@/lib/favorites";
import { SocialTool, getToolById } from "@/lib/social-tools";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { firestore } from "@/lib/firebase";

export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<SocialTool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !firestore) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    const favoritesRef = collection(firestore, `users/${user.uid}/favorites`);
    const q = query(favoritesRef, orderBy("addedAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const favoriteTools: SocialTool[] = [];
        snapshot.forEach((doc) => {
          const favorite = doc.data() as Favorite;
          const tool = getToolById(favorite.toolId);
          if (tool) {
            favoriteTools.push(tool);
          }
        });
        setFavorites(favoriteTools);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching favorites:", error);
        setFavorites([]);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const toggleFavorite = async (toolId: string): Promise<boolean> => {
    if (!user) {
      throw new Error("User must be logged in to add favorites");
    }

    const currentlyFavorite = favorites.some(tool => tool.id === toolId);
    
    try {
      if (currentlyFavorite) {
        await removeFromFavorites(user.uid, toolId);
        return false;
      } else {
        await addToFavorites(user.uid, toolId);
        return true;
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      throw error;
    }
  };

  const checkIsToolFavorite = (toolId: string): boolean => {
    return favorites.some(tool => tool.id === toolId);
  };

  return {
    favorites,
    loading,
    toggleFavorite,
    isFavorite: checkIsToolFavorite,
  };
}
