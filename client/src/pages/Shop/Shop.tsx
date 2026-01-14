import { useEffect, useState } from "react";
import WatchCard, { type Watch } from "../../components/WatchCard/WatchCard";
import "./Shop.css";

const API_URL = "http://localhost:3310";

export default function Shop() {
  const [watches, setWatches] = useState<Watch[]>([]);
  const [loading, setLoading] = useState(true);
  const apiBaseUrl = "http://localhost:3310";

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/shop/watches`)
      .then((res) => res.json())
      .then((data) => setWatches(data))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div>
      <div className="shop-page">
        <div className="shop-header">
          <h1 className="shop-title">Boutique</h1>
          <div className="shop-count">
            {watches.length} montre{watches.length > 1 ? "s" : ""}
          </div>
        </div>

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
