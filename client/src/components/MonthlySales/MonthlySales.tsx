import { useEffect, useState } from "react";

import "./MonthlySales.css";

type MonthlySalesI = {
  monthly_revenue: string;
};

function MonthlySales() {
  const [totalMonthlySales, setTotalMonthlySales] = useState<MonthlySalesI[]>(
    [],
  );

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/monthlySales`)
      .then((response) => response.json())
      .then((data: MonthlySalesI[]) => {
        setTotalMonthlySales(data);
      });
  }, []);

  return (
    <section className="MonthlySales">
      <p>Chiffre d'affaires du mois :</p>
      <p>
        {totalMonthlySales.length > 0
          ? `${Number(totalMonthlySales[0].monthly_revenue).toLocaleString("fr-FR")} €`
          : "Donnée en cours ce chargement"}
      </p>
    </section>
  );
}

export default MonthlySales;
