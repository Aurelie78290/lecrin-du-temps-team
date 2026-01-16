import { useEffect, useState } from "react";
import { Link } from "react-router";
import "./DashboardPendingAdd.css";

type PendingAddsI = {
  idwatch: number;
  brand: string;
  model: string;
};

function DashboardPendingAdd() {
  const [pendingAdds, setPendingAdds] = useState<PendingAddsI[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/pendingAdd`)
      .then((response) => response.json())
      .then((data: PendingAddsI[]) => {
        setPendingAdds(data);
      });
  }, []);

  return (
    <article className="DashboardPendingAdd-article">
      <p className="DashboardPendingAdd-title"> Annonces à valider</p>
      {pendingAdds.length === 0 ? (
        <p>Pas d'annonces à valider</p>
      ) : (
        pendingAdds.slice(0, 3).map((e) => (
          <div key={e.idwatch} className="DashboardPendingAdd-add">
            <p>
              {e.brand} - {e.model}
            </p>
          </div>
        ))
      )}
      <Link to="/ClassifiedAd" className="DashboardPendingAdd-linkto">
        Voir plus{" "}
        {pendingAdds.length > 3 && `(${pendingAdds.length - 3} de plus)`}
      </Link>
    </article>
  );
}

export default DashboardPendingAdd;
