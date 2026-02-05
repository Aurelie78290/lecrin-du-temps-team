import { Heart, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useFavorites } from "../../contexts/FavoriteContext";
import WatchCard from "../WatchCard/WatchCard";
import type { Watch } from "../WatchCard/WatchCard";

import "./FavoritesDrawer.css";

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  apiBaseUrl: string;
}

type WatchListItem = {
  idwatch: number;
  brand: string;
  model: string;
  watch_price: number | null;
  watch_condition: string | null;
  photo_url?: string | null;
  watch_sell_status?: string | null;
};

function formatWatch(item: WatchListItem): Watch {
  return {
    idwatch: item.idwatch,
    brand: item.brand,
    model: item.model,
    watch_price: item.watch_price,
    watch_condition: item.watch_condition,
    photo_url: item.photo_url ?? null,
    watch_sell_status: item.watch_sell_status,
  };
}

function FavoritesDrawer({
  isOpen,
  onClose,
  apiBaseUrl,
}: FavoritesDrawerProps) {
  const { favoriteIds } = useFavorites();
  const [favoriteWatches, setFavoriteWatches] = useState<Watch[]>([]);
  const [loading, setLoading] = useState(false);

  const baseUrl = apiBaseUrl.split("/api")[0];

  useEffect(() => {
    if (favoriteIds.size === 0) {
      setFavoriteWatches([]);
      return;
    }

    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const ids = Array.from(favoriteIds);
        const idsString = ids.join(",");

        const res = await fetch(`${baseUrl}/api/watches?ids=${idsString}`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Erreur lors du chargement des favoris");
        }

        const data: WatchListItem[] = await res.json();

        const formatted = data.map(formatWatch);

        setFavoriteWatches(formatted);
      } catch (err) {
        console.error("Erreur favoris:", err);
        setFavoriteWatches([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [favoriteIds, baseUrl]);

  // Fermer le tiroir avec Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className={`favorites-drawer-overlay ${isOpen ? "show" : ""}`}
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClose();
        }}
        tabIndex={0}
        role="button"
      />

      <div className={`favorites-drawer-sidebar ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="favorites-drawer-header">
          <h2 className="favorites-drawer-title">Vos Favoris</h2>
          <button
            type="button"
            onClick={onClose}
            className="favorites-drawer-close-button"
            aria-label="Fermer"
          >
            <X className="favorites-drawer-close-icon" />
          </button>
        </div>

        {/* Contenu */}
        <div className="favorites-drawer-content">
          {loading ? (
            <div className="favorites-drawer-loading">
              <p>Chargement...</p>
            </div>
          ) : favoriteIds.size === 0 ? (
            <div className="favorites-drawer-empty">
              <Heart className="favorites-drawer-empty-icon" />
              <p className="favorites-drawer-empty-text">
                Vous n'avez pas encore de favoris
              </p>
            </div>
          ) : favoriteWatches.length === 0 ? (
            <div className="favorites-drawer-empty">
              <p>Aucune montre trouvée</p>
            </div>
          ) : (
            <div className="favorites-drawer-items">
              {favoriteWatches.map((watch) => (
                <WatchCard
                  key={watch.idwatch}
                  watch={watch}
                  apiBaseUrl={baseUrl}
                  context="shop"
                  forceEager
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default FavoritesDrawer;
