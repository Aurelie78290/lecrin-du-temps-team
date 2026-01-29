import { useCallback, useEffect, useState } from "react";
import SearchBar, {
  type SearchFilters,
} from "../../components/SearchBar/SearchBar";
import WatchCard, { type Watch } from "../../components/WatchCard/WatchCard";
import "./Shop.css";

const API_URL = "http://localhost:3310";

export default function Shop() {
  const [watches, setWatches] = useState<Watch[]>([]);
  const [loading, setLoading] = useState(true);
  const apiBaseUrl = "http://localhost:3310";

  const fetchWatches = useCallback((filters: SearchFilters) => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.search) params.append("search", filters.search);
    if (filters.watch_gender)
      params.append("watch_gender", filters.watch_gender);
    if (filters.brand_id) params.append("brand_id", filters.brand_id);
    if (filters.movement_type_id)
      params.append("movement_type_id", filters.movement_type_id);

    const queryString = params.toString();
    const url = queryString
      ? `${apiBaseUrl}/api/shop/watches?${queryString}`
      : `${apiBaseUrl}/api/shop/watches`;

    fetch(url)
      .then((res) => res.json())
      .then(setWatches)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchWatches({
      search: "",
      watch_gender: "",
      brand_id: "",
      movement_type_id: "",
    });
  }, [fetchWatches]);

  return (
    <div>
      <div className="shop-page">
        <div className="shop-header">
          <h1 className="shop-title">Boutique</h1>
          <div className="shop-count">
            {watches.length} montre{watches.length > 1 ? "s" : ""}
          </div>
        </div>

        <SearchBar onSearch={fetchWatches} />

        {loading && <div className="shop-state">Chargement…</div>}

        <div className="shop-grid">
          {watches.map((watch) => (
            <WatchCard
              key={watch.idwatch}
              watch={watch}
              apiBaseUrl={API_URL}
              context="shop"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
