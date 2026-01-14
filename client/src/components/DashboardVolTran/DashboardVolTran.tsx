import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { useEffect, useState } from "react";
import "./DashboardVolTran.css";

// Enregistrement des composants Chart.js nécessaires
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

interface NbTranI {
  jour: string;
  nombre_de_transactions: number;
}

function DashboardVolTran() {
  const [nbTran, setNbTran] = useState<NbTranI[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/adminVolTran`)
      .then((response) => response.json())
      .then((data: NbTranI[]) => {
        setNbTran(data);
      });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  // 1. On crée un tableau avec TOUTES les dates des 30 derniers jours
  const allDates = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    allDates.push(d.toISOString().split("T")[0]); // Format "YYYY-MM-DD"
  }

  // 2. On mappe ces dates avec vos données réelles
  const fullData = allDates.map((dateStr) => {
    // On cherche si on a une transaction pour ce jour précis
    const found = nbTran.find((item) => item.jour.startsWith(dateStr));

    return {
      jour: dateStr,
      nombre_de_transactions: found ? found.nombre_de_transactions : 0,
    };
  });

  const data = {
    // On formate chaque date avant de l'envoyer au graphique
    labels: fullData.map((d) => {
      const date = new Date(d.jour);
      return date.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short", // "short" pour "déc.", "long" pour "décembre"
      });
    }),
    datasets: [
      {
        fill: true,
        label: "Transactions",
        data: fullData.map((d) => d.nombre_de_transactions),
        borderColor: "#D4AF37",
        backgroundColor: "rgba(212, 175, 55, 0.1)",
        tension: 0.4,
      },
    ],
    scales: {
      x: {
        ticks: {
          maxRotation: 45, // Incline les dates si elles manquent de place
          minRotation: 45,
        },
      },
      y: { beginAtZero: true },
    },
  };

  return (
    <article className="DashboardVolTran">
      <p>Volume des transactions sur 30 jours glissants</p>
      <div className="DashboardVolTran-Graphique">
        {nbTran.length === 0 ? (
          "Donnée en cours de chargement"
        ) : nbTran[0].nombre_de_transactions === 0 ? (
          "Pas de transaction"
        ) : (
          <Line options={options} data={data} />
        )}
      </div>
    </article>
  );
}

export default DashboardVolTran;
