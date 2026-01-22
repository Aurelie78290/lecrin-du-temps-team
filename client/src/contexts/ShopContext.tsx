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

export type BasketItem = {
  idwatch: number;
  brand: string;
  model: string;
  price: number;
  quantity: number;
};

/**
 * Format exact renvoyé par l'API /api/cart
 */
type BasketItemApi = {
  idwatch: number;
  brand: string;
  model: string;
  watch_price: number;
  quantity: number;
};

type BasketContextType = {
  basket: BasketItem[];
  addToBasket: (item: Omit<BasketItem, "quantity">) => Promise<void>;
  removeFromBasket: (idwatch: number) => Promise<void>;
  clearBasket: () => Promise<void>;
  loading: boolean;
  error: string | null;
};

/* =========================
   Context
========================= */

const BasketContext = createContext<BasketContextType | null>(null);

export const useBasket = () => {
  const ctx = useContext(BasketContext);
  if (!ctx) {
    throw new Error("useBasket must be used inside BasketProvider");
  }
  return ctx;
};

/* =========================
   Provider
========================= */

export const BasketProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [basket, setBasket] = useState<BasketItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /* =========================
     Fetch basket
  ========================= */

  const fetchBasket = useCallback(async (): Promise<void> => {
    if (!user) {
      setBasket([]);
      return;
    }
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/api/cart`, {
        credentials: "include",
      });

      // Non connecté → panier vide
      if (response.status === 401) {
        setBasket([]);
        return;
      }

      if (!response.ok) {
        throw new Error("Erreur lors du chargement du panier");
      }

      const data: BasketItemApi[] = await response.json();

      const formattedBasket: BasketItem[] = data.map((item) => ({
        idwatch: item.idwatch,
        brand: item.brand,
        model: item.model,
        price: item.watch_price,
        quantity: item.quantity,
      }));

      setBasket(formattedBasket);
    } catch (err) {
      console.error("fetchBasket error:", err);
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      setBasket([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  /* =========================
     Initial load
  ========================= */

  useEffect(() => {
    fetchBasket();
  }, [fetchBasket]);

  /* =========================
     Add item
  ========================= */

  const addToBasket = async (
    item: Omit<BasketItem, "quantity">,
  ): Promise<void> => {
    try {
      setError(null);

      setBasket((prev) => {
        const existing = prev.find((p) => p.idwatch === item.idwatch);
        if (existing) {
          return prev.map((p) =>
            p.idwatch === item.idwatch ? { ...p, quantity: p.quantity + 1 } : p,
          );
        }
        return [...prev, { ...item, quantity: 1 }];
      });

      const response = await fetch(`${API_URL}/api/cart/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ watchId: item.idwatch }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout au panier");
      }

      // Resynchronisation backend → frontend
      await fetchBasket();
    } catch (err) {
      console.error("addToBasket error:", err);
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      await fetchBasket();
    }
  };

  /* =========================
     Remove item
  ========================= */

  const removeFromBasket = async (idwatch: number): Promise<void> => {
    try {
      setError(null);

      setBasket((prev) => prev.filter((item) => item.idwatch !== idwatch));

      const response = await fetch(`${API_URL}/api/cart/items/${idwatch}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression");
      }

      await fetchBasket();
    } catch (err) {
      console.error("removeFromBasket error:", err);
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      await fetchBasket();
    }
  };

  /* =========================
     Clear basket
  ========================= */

  const clearBasket = async (): Promise<void> => {
    try {
      setError(null);

      setBasket([]);

      const response = await fetch(`${API_URL}/api/cart`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Erreur lors du vidage du panier");
      }
    } catch (err) {
      console.error("clearBasket error:", err);
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      await fetchBasket();
    }
  };

  /* =========================
     Provider value
  ========================= */

  return (
    <BasketContext.Provider
      value={{
        basket,
        addToBasket,
        removeFromBasket,
        clearBasket,
        loading,
        error,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};
