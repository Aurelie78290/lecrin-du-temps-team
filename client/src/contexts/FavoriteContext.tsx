import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import { useAuth } from "./AuthContext";

const API_URL = "http://localhost:3310";

type FavoriteContextType = {
  favoriteIds: Set<number>;
  toggleFavorite: (watchId: number) => Promise<void>;
  removeFavorite: (watchId: number) => Promise<void>;
  isFavorite: (watchId: number) => boolean;
};

const FavoriteContext = createContext<FavoriteContextType | null>(null);

export const useFavorites = () => {
  const ctx = useContext(FavoriteContext);
  if (!ctx) {
    throw new Error("useFavorites must be used inside FavoriteProvider");
  }
  return ctx;
};

export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set());

  const fetchFavorites = useCallback(async () => {
    if (!user) {
      setFavoriteIds(new Set());
      return;
    }
    try {
      const res = await fetch(`${API_URL}/api/favorites`, {
        credentials: "include",
      });
      if (!res.ok) {
        setFavoriteIds(new Set());
        return;
      }
      const ids: number[] = await res.json();
      setFavoriteIds(new Set(ids));
    } catch {
      setFavoriteIds(new Set());
    }
  }, [user]);

  useEffect(() => {
    if (user) fetchFavorites();
    else setFavoriteIds(new Set());
  }, [user, fetchFavorites]);

  const toggleFavorite = async (watchId: number) => {
    // Optimistic update

    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(watchId)) next.delete(watchId);
      else next.add(watchId);
      return next;
    });

    try {
      const res = await fetch(`${API_URL}/api/favorites/${watchId}`, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) {
        // Revert on error
        await fetchFavorites();
      }
    } catch {
      await fetchFavorites();
    }
  };

  const removeFavorite = async (watchId: number) => {
    // Optimistic update
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      next.delete(watchId);
      return next;
    });

    try {
      const res = await fetch(`${API_URL}/api/favorites/${watchId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Delete failed");
    } catch {
      // Revert on error
      fetchFavorites();
    }
  };

  const isFavorite = (watchId: number) => favoriteIds.has(watchId);

  return (
    <FavoriteContext.Provider
      value={{ favoriteIds, toggleFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
