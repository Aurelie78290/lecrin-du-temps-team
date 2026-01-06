import { Link } from "react-router";
import "./WatchCard.css";

export type Watch = {
  idwatch: number;
  brand: string;
  model: string;
  watch_price: number | null;
  watch_condition?: string | null;

  url_photo1?: string | null;
  url_photo2?: string | null;
  url_photo3?: string | null;
  url_photo4?: string | null;
  url_photo5?: string | null;
};

type WatchCardProps = {
  watch: Watch;
  apiBaseUrl: string;
};

export default function WatchCard({ watch, apiBaseUrl }: WatchCardProps) {
  const cover = watch.url_photo1;

  const price =
    watch.watch_price == null
      ? "—"
      : `${new Intl.NumberFormat("fr-FR").format(watch.watch_price)} €`;

  return (
    <Link to={`/shop/${watch.idwatch}`} className="watch-card-link">
      <article className="watch-card">
        <div className="watch-card-media">
          <span className="watch-card-badge">En vente</span>

          {cover && (
            <img
              src={`${apiBaseUrl}/uploads/${cover}`}
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
