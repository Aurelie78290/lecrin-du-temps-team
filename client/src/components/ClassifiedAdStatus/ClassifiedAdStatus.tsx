import { useEffect, useState } from "react";

import "./ClassifiedAdStatus.css";

type adStatusI = {
  total: number;
  watch_sell_status: string;
};

function ClassifiedAdStatus({ updateTrigger }: { updateTrigger: number }) {
  const [adStatus, setAdStatus] = useState<adStatusI[]>([]);

  // 1. On définit l'ordre souhaité et les libellés exacts
  const statusOrder = ["En vente", "A valider", "Refusée"];

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/nbpendingAdd`)
      .then((response) => response.json())
      .then((data: adStatusI[]) => {
        setAdStatus(data);
        console.log("nombre de passe pour le refresh :", updateTrigger);
      });
  }, [updateTrigger]);

  return (
    <article className="ClassifiedAdStatus-article">
      {statusOrder.map((status) => {
        // 2. Pour chaque statut imposé, on cherche si l'API a renvoyé une valeur
        const found = adStatus.find(
          (item) => item.watch_sell_status === status,
        );

        // 3. Si trouvé, on affiche le total, sinon on affiche 0
        const totalCount = found ? found.total : 0;

        return (
          <div key={status} className="ClassifiedAdStatus-card">
            <p>{status}</p>
            <p>{totalCount}</p>
          </div>
        );
      })}
    </article>
  );
}

export default ClassifiedAdStatus;
