'use client';

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export function FuelEfficiencyChart() {
  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Fleet Efficiency (km/l)',
        data: [8.2, 8.5, 8.1, 8.7, 8.4, 8.6],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.08)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
      {
        label: 'Target Efficiency',
        data: [8.0, 8.0, 8.0, 8.0, 8.0, 8.0],
        borderColor: '#10b981',
        borderDash: [5, 5],
        tension: 0,
        fill: false,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { position: 'top' as const, labels: { usePointStyle: true, padding: 20, font: { size: 12 } } },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: false, min: 7, max: 9, grid: { color: 'rgba(0,0,0,0.04)' } },
    },
  };

  return (
    <div className="card p-6">
      <h2 className="text-sm font-semibold text-slate-800 mb-4">Fuel Efficiency Trend</h2>
      <div className="max-h-80">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
