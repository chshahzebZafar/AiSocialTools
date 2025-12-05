import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  getDoc, 
  getDocs,
  query,
  where,
  Timestamp
} from "firebase/firestore";
import { firestore } from "./firebase";
import { SocialTool, getToolById } from "./social-tools";

export interface Favorite {
  toolId: string;
  addedAt: Timestamp;
}

/**
 * Add a tool to user's favorites
 */
export async function addToFavorites(userId: string, toolId: string): Promise<void> {
  if (!firestore) {
    throw new Error("Firestore is not initialized");
  }

  const favoriteRef = doc(firestore, `users/${userId}/favorites`, toolId);
  
  // Check if already exists to avoid update operation
  const existing = await getDoc(favoriteRef);
  if (existing.exists()) {
    // Already favorited, no need to do anything
    return;
  }
  
  // Create new favorite document
  await setDoc(favoriteRef, {
    toolId,
    addedAt: Timestamp.now(),
  });
}

/**
 * Remove a tool from user's favorites
 */
export async function removeFromFavorites(userId: string, toolId: string): Promise<void> {
  if (!firestore) {
    throw new Error("Firestore is not initialized");
  }

  const favoriteRef = doc(firestore, `users/${userId}/favorites`, toolId);
  await deleteDoc(favoriteRef);
}

/**
 * Check if a tool is in user's favorites
 */
export async function isFavorite(userId: string, toolId: string): Promise<boolean> {
  if (!firestore) {
    return false;
  }

  const favoriteRef = doc(firestore, `users/${userId}/favorites`, toolId);
  const favoriteSnap = await getDoc(favoriteRef);
  return favoriteSnap.exists();
}

/**
 * Get all favorite tools for a user
 */
export async function getFavoriteTools(userId: string): Promise<SocialTool[]> {
  if (!firestore) {
    return [];
  }

  const favoritesRef = collection(firestore, `users/${userId}/favorites`);
  const favoritesSnap = await getDocs(favoritesRef);
  
  const favoriteTools: SocialTool[] = [];
  favoritesSnap.forEach((doc) => {
    const favorite = doc.data() as Favorite;
    const tool = getToolById(favorite.toolId);
    if (tool) {
      favoriteTools.push(tool);
    }
  });

  // Sort by addedAt (most recent first)
  return favoriteTools;
}

