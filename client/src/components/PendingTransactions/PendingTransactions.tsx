import { useEffect, useState } from "react";

import "./PendingTransactions.css";

type PendingTransactionsI = {
  total_pending: number;
};

function PendingTransactions() {
  const [nbPending, setNbPending] = useState<PendingTransactionsI[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/PendingTransactions`)
      .then((response) => response.json())
      .then((data: PendingTransactionsI[]) => {
        setNbPending(data);
      });
  }, []);

  const pending =
    nbPending.length === 0
      ? "Donnée en cours ce chargement"
      : nbPending[0].total_pending === 0
        ? "Pas de transactions en cours"
        : nbPending[0].total_pending;

  return (
    <article className="PendingTransactions">
      <p>Nombre de transactions en cours :</p>
      <p>{pending}</p>
    </article>
  );
}

export default PendingTransactions;
