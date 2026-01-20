import { useCollectionStats } from "../../hook/useCollectionStats";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler, // ⚠️ CRUCIAL : sans ça, pas de remplissage !
} from "chart.js";
import { Line } from "react-chartjs-2";
import 'chartjs-adapter-date-fns';
import "./UserGraph.css";
import { fr } from "date-fns/locale";

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  // ⚠️ Ne pas oublier !
);

function UserGraph() {
  const {chartData, loading} = useCollectionStats()
  if (loading) return <p>Chargement...</p>;
  if (chartData.length === 0) return <p>Aucune donnée</p>;
  // Configuration du graphique
  const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Évolution de ma collection',
    },
    tooltip: {
      callbacks: {
        label: (context: any) => `${context.parsed.y.toLocaleString('fr-FR')} €`,
      },
    },
  },
  scales: {
    x: {
      type: 'time' as const,  // ✅ Fix ici
      time: {
        unit: 'month' as const,  // ✅ Fix ici
        displayFormats: {
          month: 'MMM yyyy',
        },
      },
      adapters: {
        date: {
          locale: fr,
        },
      },
      title: {
        display: true,
        text: 'Date',
      },
    },
    y: {
      beginAtZero: false,
      title: {
        display: true,
      },
      ticks: {
        callback: (value: number | string) => 
          `${Number(value).toLocaleString('fr-FR')} €`,
      },
    },
  },
};

  // Données du graphique
 const data = {
  datasets: [
    {
      label: 'Valeur collection',
      data: chartData,
      borderColor: '#e0c58f',
      borderWidth: 2,
      tension: 0.2,
      pointRadius: 4,
      pointHoverRadius: 8,
    },
  ],
};

  return (
    <div className="usergraph__main">
      <Line className="usergraph__content" options={options} data={data} />
    </div>
  );
}

export default UserGraph;
