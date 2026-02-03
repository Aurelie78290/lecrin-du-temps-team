import { Heart } from "lucide-react";
import { Link } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { useFavorites } from "../../contexts/FavoriteContext";
import "./WatchCard.css";
import type { CSSProperties } from "react";

export type Watch = {
  idwatch: number;
  brand: string;
  model: string;
  watch_price: number | null;
  watch_condition?: string | null;
  photo_url: string | null;
  watch_sell_status?: string | null;
};

type WatchCardProps = {
  watch: Watch;
  apiBaseUrl: string;
  context: "shop" | "collection";
  userId?: number;
  onChange?: () => void;
  index?: number;
};

export default function WatchCard({
  watch,
  apiBaseUrl,
  context,
  index = 0,
}: WatchCardProps) {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(watch.idwatch);
  const cover = watch.photo_url;

  const isForSale = (watch.watch_sell_status ?? "").trim() === "active";
  const price =
    watch.watch_price == null
      ? "—"
      : `${new Intl.NumberFormat("fr-FR").format(watch.watch_price)} €`;
  const style: CSSProperties & { "--enter-delay": string } = {
    "--enter-delay": `${Math.min(index, 12) * 50}ms`,
  };
  const linkTo =
    context === "collection"
      ? `/collection/${watch.idwatch}`
      : `/shop/${watch.idwatch}`;

  return (
    <Link to={linkTo} className="watch-card-link">
      <article className="watch-card" style={style}>
        <div className="watch-card-inner">
          <div className="watch-card-media">
            {isForSale && <span className="watch-card-badge">En vente</span>}

            {user && context === "shop" && (
              <button
                type="button"
                className={`watch-card-fav ${favorited ? "is-fav" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleFavorite(watch.idwatch);
                }}
              >
                <Heart size={20} fill={favorited ? "currentColor" : "none"} />
              </button>
            )}

            {cover && (
              <img
                src={`${apiBaseUrl}${cover}`}
                alt={`Montre ${watch.brand} ${watch.model}`}
                loading="lazy"
              />
            )}
          </div>

          <div className="watch-card-body">
            <div className="watch-card-brand">{watch.brand}</div>
            <div className="watch-card-model">{watch.model}</div>

            <div className="watch-card-row">
              <div className="watch-card-price">{price}</div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
