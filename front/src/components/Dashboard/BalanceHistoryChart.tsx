import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler, // Pour le remplissage sous la ligne
} from 'chart.js';
import type { CardData } from '../transaction/request/listMapper';

// Enregistrement des composants Chart.js nécessaires
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface BalanceHistoryChartProps {
  transactions: CardData[];
}

// Fonction utilitaire pour parser les dates au format "jj/mm/aaaa"
const parseDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day);
};

export const BalanceHistoryChart: React.FC<BalanceHistoryChartProps> = ({ transactions }) => {
  
  // useMemo est crucial ici pour éviter de recalculer à chaque rendu
  const chartData = useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return null;
    }

    // 1. Trier les transactions par date
    const sortedTransactions = [...transactions].sort(
      (a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime()
    );

    // 2. Calculer le solde cumulé jour par jour
    const balanceByDate: { [date: string]: number } = {};
    let currentBalance = 0;

    for (const tx of sortedTransactions) {
      const amount = tx.isGain ? tx.price : -tx.price;
      currentBalance += amount;
      balanceByDate[tx.date] = currentBalance; // Écrase si plusieurs transactions le même jour
    }

    // 3. Préparer les données pour le graphique
    const labels = Object.keys(balanceByDate);
    const dataPoints = Object.values(balanceByDate);

    return {
      labels: labels,
      datasets: [
        {
          label: 'Évolution du Solde',
          data: dataPoints,
          fill: true,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.1, // Ligne légèrement courbée
        },
      ],
    };
  }, [transactions]);

  // Si pas de données, ne rien afficher
  if (!chartData) {
    return <div className="text-center p-4">Pas de données pour afficher le graphique.</div>;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Historique du Solde au fil du temps',
      },
    },
    scales: {
        y: {
            beginAtZero: false, // Le solde peut être négatif
        }
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-6">
      <Line options={options} data={chartData} />
    </div>
  );
};