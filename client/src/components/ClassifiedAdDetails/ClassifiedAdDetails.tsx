import { useCallback, useEffect, useState } from "react";

import WatchDetails from "../../pages/WatchDetails/WatchDetails";

import "./ClassifiedAdDetails.css";
import ToggleValidateAdd from "../ToggleValidateAdd/ToggleValidateAdd";

type PendingAddsI = {
  idwatch: number;
  brand: string;
  model: string;
};

function ClassifiedAdDetails() {
  const [pendingAdds, setPendingAdds] = useState<PendingAddsI[]>([]);
  const [selectedWatchId, setSelectedWatchId] = useState<number | null>(null);

  const refreshList = useCallback(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/pendingAdd`)
      .then((response) => response.json())
      .then((data: PendingAddsI[]) => {
        setPendingAdds(data);

        if (
          !data.find((w) => w.idwatch === selectedWatchId) &&
          data.length > 0
        ) {
          setSelectedWatchId(data[0].idwatch);
        } else if (data.length === 0) {
          setSelectedWatchId(null);
        }
        // 1. Si la liste n'est pas vide, on sélectionne la première montre par défaut
      });
  }, [selectedWatchId]);

  useEffect(() => {
    refreshList();
  }, [refreshList]);

  return (
    <div className="ClassifiedAdDetails-Conteneur">
      <aside className="ClassifiedAdDetails-aside">
        <p className="DashboardPendingAdd-title"> Annonces à valider</p>
        {pendingAdds.length === 0 ? (
          <p>Pas d'annonces à valider</p>
        ) : (
          pendingAdds.map((e) => (
            <button
              key={e.idwatch}
              className="DashboardPendingAdd-add"
              type="button" // On indique aux lecteurs d'écran que c'est un bouton
              tabIndex={0} // On permet à la touche Tab de s'arrêter ici
              onClick={() => setSelectedWatchId(e.idwatch)} // 2. On change l'ID au clic
            >
              <p>
                {e.brand} - {e.model}
              </p>
            </button>
          ))
        )}
      </aside>
      <main>
        <ToggleValidateAdd idwatch={selectedWatchId} onSuccess={refreshList} />
        {selectedWatchId ? (
          <WatchDetails idwatch={selectedWatchId} isReadOnly={true} />
        ) : (
          <p>Il n'y a pas d'annonce à valider</p>
        )}
      </main>
    </div>
  );
}

export default ClassifiedAdDetails;
