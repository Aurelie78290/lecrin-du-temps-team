import { useEffect, useState } from "react";
import "./UserLastAdd.css";
import type { Watch } from "../WatchCard/WatchCard";

function UserLastAdd() {
  const [watch, setWatch] = useState<Watch[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/collection/watches`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data: Watch[]) => setWatch(data))
      .catch((err) => console.error(err));
  }, []);

  const lastWatch = watch[0];

  if (!lastWatch) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="lastwatch__main">
      <div className="lastwatch__content">
        <div>
          <h2>
            {lastWatch.brand} - {lastWatch.model}
          </h2>
        </div>
        <div>
          <h2>Prix d'achat : {lastWatch.watch_price}€</h2>
        </div>
      </div>
    </div>
  );
}

export default UserLastAdd;
