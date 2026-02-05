import { useEffect, useState } from "react";
import "./UserLastAdd.css";
import type { Watch } from "../WatchCard/WatchCard";

function UserLastAdd() {
  const [watches, setWatches] = useState<Watch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/collection/watches`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data: Watch[]) => setWatches(data))
      .catch(() => setWatches([]))
      .finally(() => setLoading(false));
  }, []);

  const lastWatch = watches[0];

  return (
    <div className="lastwatch__main">
      {loading && (
        <div className="lastwatch__placeholder">
          <span className="lastwatch__spinner" />
          <p>Chargement de votre dernière montre…</p>
        </div>
      )}

      {!loading && !lastWatch && (
        <div className="lastwatch__placeholder">
          <p>Aucune montre dans votre collection</p>
        </div>
      )}

      {!loading && lastWatch && (
        <div className="lastwatch__content">
          <h2>
            {lastWatch.brand} — {lastWatch.model}
          </h2>
          <h2>
            Prix d'achat :{" "}
            {lastWatch.watch_price
              ? `${new Intl.NumberFormat("fr-FR").format(
                  lastWatch.watch_price,
                )} €`
              : "—"}
          </h2>
        </div>
      )}
    </div>
  );
}

export default UserLastAdd;
