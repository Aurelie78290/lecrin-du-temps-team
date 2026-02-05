import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
} from "chart.js";
import type { ChartOptions, TooltipItem } from "chart.js";
import { Line } from "react-chartjs-2";
import { useCollectionStats } from "../../hook/useCollectionStats";
import "chartjs-adapter-date-fns";
import "./UserGraph.css";
import { fr } from "date-fns/locale";
import { Link } from "react-router";

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

function UserGraph() {
  const { chartData, loading } = useCollectionStats();

  const isEmpty = chartData.length === 0;

  // Configuration du graphique
  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Évolution de ma collection",
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"line">) => {
            const value = context.parsed.y;
            return value !== null ? `${value.toLocaleString("fr-FR")} €` : "";
          },
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "month",
          displayFormats: { month: "MMM yyyy" },
        },
        adapters: { date: { locale: fr } },
        title: { display: true, text: "Date" },
      },
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value: number | string) =>
            `${Number(value).toLocaleString("fr-FR")} €`,
        },
      },
    },
  };

  const data = {
    datasets: [
      {
        label: "Valeur collection",
        data: chartData,
        borderColor: "#e0c58f",
        borderWidth: 2,
        tension: 0.2,
        pointRadius: 4,
        pointHoverRadius: 8,
      },
    ],
  };

  return (
    <div className="usergraph__main">
      {loading && (
        <div className="usergraph__placeholder">
          <div className="usergraph__spinner" />
          <p>Chargement du graphique…</p>
        </div>
      )}

      {!loading && isEmpty && (
        <div className="usergraph__placeholder">
          <h3>Votre collection est vide</h3>
          <p>Ajoutez une montre pour voir l’évolution ici.</p>

          <Link to="/collection" className="favorite-pick__btn">
            Voir ma collection
          </Link>
        </div>
      )}

      {!loading && !isEmpty && (
        <Line className="usergraph__content" options={options} data={data} />
      )}
    </div>
  );
}

export default UserGraph;
