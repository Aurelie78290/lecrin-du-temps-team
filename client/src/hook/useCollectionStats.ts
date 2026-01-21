import { useState, useEffect } from 'react';

interface ChartDataPoint {
  x: Date;
  y: number;
}

export function useCollectionStats() {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/collection/stats`, {
          credentials: 'include',
        });

        if (!response.ok) {
          console.error('Erreur HTTP:', response.status);
          return;
        }

        const data = await response.json();
        console.log('Réponse API:', data);

        // Transformer pour Chart.js
        const formatted = data.map((row: any) => ({
          x: new Date(row.date),
          y: Number(row.cumulative_value),
        }));

        console.log('Données formatées:', formatted);  // 👈 Debug
        setChartData(formatted);
        
      } catch (error) {
        console.error('Erreur fetch stats:', error);
      } finally {
        setLoading(false);  // 👈 TOUJOURS exécuté
      }
    };

    fetchStats();
  }, []);

  return { chartData, loading };
}