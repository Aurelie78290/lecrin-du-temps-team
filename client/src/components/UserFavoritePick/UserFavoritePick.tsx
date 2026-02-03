import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { useFavorites } from "../../contexts/FavoriteContext";
import "./UserFavoritePick.css";

const API_URL = import.meta.env.VITE_API_URL;

type FavoriteWatch = {
  idwatch: number;
  brand: string;
  model: string;
  watch_price: number | null;
  photos: string[];
};

function UserFavoritePick() {
  const { favoriteIds } = useFavorites();
  const [watch, setWatch] = useState<FavoriteWatch | null>(null);

  const randomId = useMemo(() => {
    const ids = Array.from(favoriteIds);
    if (ids.length === 0) return null;
    return ids[Math.floor(Math.random() * ids.length)];
  }, [favoriteIds]);

  useEffect(() => {
    if (randomId == null) {
      setWatch(null);
      return;
    }

    fetch(`${API_URL}/api/watches/${randomId}`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data: FavoriteWatch) => setWatch(data))
      .catch(() => setWatch(null));
  }, [randomId]);

  if (!watch) return null;

  const photo = watch.photos?.[0];
  const price =
    watch.watch_price == null
      ? "—"
      : `${new Intl.NumberFormat("fr-FR").format(watch.watch_price)}€`;

  return (
    <div className="favorite-pick">
      <h3 className="favorite-pick__title">Votre coup de coeur</h3>

      <div className="favorite-pick__image">
        {photo && (
          <img
            src={`${API_URL}${photo}`}
            alt={`${watch.brand} ${watch.model}`}
          />
        )}
      </div>

      <div className="favorite-pick__info">
        <span className="favorite-pick__brand">{watch.brand}</span>
        <span className="favorite-pick__model">{watch.model}</span>
        <span className="favorite-pick__price">{price}</span>
      </div>

      <Link to={`/shop/${watch.idwatch}`} className="favorite-pick__btn">
        Acheter
      </Link>
    </div>
  );
}

export default UserFavoritePick;
