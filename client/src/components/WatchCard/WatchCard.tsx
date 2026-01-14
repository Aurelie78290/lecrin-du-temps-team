import { Link } from "react-router";
import "./WatchCard.css";

export type Watch = {
  idwatch: number;
  brand: string;
  model: string;
  watch_price: number | null;
  watch_condition?: string | null;
  photo_url: string | null;
};

type WatchCardProps = {
  watch: Watch;
  apiBaseUrl: string;
  context: "shop" | "collection";
  userId?: number; // utile seulement en collection
  onChange?: () => void; // pour refresh après delete
};

export default function WatchCard({
  watch,
  apiBaseUrl,
  context,
}: WatchCardProps) {
  const cover = watch.photo_url;

  const price =
    watch.watch_price == null
      ? "—"
      : `${new Intl.NumberFormat("fr-FR").format(watch.watch_price)} €`;

  const linkTo =
    context === "collection"
      ? `/collection/${watch.idwatch}`
      : `/shop/${watch.idwatch}`;

  return (
    <Link to={linkTo} className="watch-card-link">
      <article className="watch-card">
        <div className="watch-card-media">
          <span className="watch-card-badge">En vente</span>

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
      </article>
    </Link>
  );
}
