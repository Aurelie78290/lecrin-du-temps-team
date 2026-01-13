import { useEffect, useState } from "react";

type NbTranI = {
  nombre_de_transactions: number;
  jour: string;
};

function DashboardVolTran() {
  const [nbTran, setNbTran] = useState<NbTranI[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/adminVolTran`)
      .then((response) => response.json())
      .then((data: NbTranI[]) => {
        setNbTran(data);
      });
  }, []);
  console.log("voici le tableau nbTran :", nbTran);
  const nbTranLoad =
    nbTran.length === 0
      ? "Donnée en cours de chargement"
      : nbTran[0].nombre_de_transactions === 0
        ? "Pas de transaction"
        : nbTran[0].nombre_de_transactions;

  return (
    <article>
      <p>Volume de transaction 30 jours glissants</p>
      <p>{nbTranLoad}</p>
    </article>
  );
}

export default DashboardVolTran;
