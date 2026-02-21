'use client';

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function FuelEfficiencyChart() {
  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Fleet Efficiency (km/l)',
        data: [8.2, 8.5, 8.1, 8.7, 8.4, 8.6],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Target Efficiency',
        data: [8.0, 8.0, 8.0, 8.0, 8.0, 8.0],
        borderColor: '#10b981',
        borderDash: [5, 5],
        tension: 0,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 7,
        max: 9,
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Fuel Efficiency Trend</h2>
      <div className="max-h-80">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
