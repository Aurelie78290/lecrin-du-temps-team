import { createContext, useContext } from "react";
import { useState } from "react";
import type { ReactNode } from "react";

export type BasketItem = {
  idwatch: number;
  brand: string;
  model: string;
  price: number;
  quantity: number;
};

type BasketContextType = {
  basket: BasketItem[];
  addToBasket: (item: BasketItem) => void;
  removeFromBasket: (idwatch: number) => void;
  clearBasket: () => void;
};

const BasketContext = createContext<BasketContextType | null>(null);

export const useBasket = () => {
  const ctx = useContext(BasketContext);
  if (!ctx) throw new Error("useBasket must be used inside BasketProvider");
  return ctx;
};

export const BasketProvider = ({ children }: { children: ReactNode }) => {
  const [basket, setBasket] = useState<BasketItem[]>([]);

  const addToBasket = (item: BasketItem) => {
    setBasket((prev) => {
      const existing = prev.find((p) => p.idwatch === item.idwatch);
      if (existing) {
        return prev.map((p) =>
          p.idwatch === item.idwatch ? { ...p, quantity: p.quantity + 1 } : p,
        );
      }
      return [...prev, item];
    });
  };

  const removeFromBasket = (idwatch: number) => {
    setBasket((prev) => prev.filter((item) => item.idwatch !== idwatch));
  };

  const clearBasket = () => setBasket([]);

  return (
    <BasketContext.Provider
      value={{ basket, addToBasket, removeFromBasket, clearBasket }}
    >
      {children}
    </BasketContext.Provider>
  );
};
