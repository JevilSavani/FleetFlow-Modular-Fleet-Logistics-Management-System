'use client';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export function FleetStatusChart() {
  const statusData = {
    labels: ['Active', 'Maintenance', 'Reserved', 'Retired'],
    datasets: [
      {
        label: 'Vehicles',
        data: [42, 5, 8, 3],
        backgroundColor: ['#10b981', '#f59e0b', '#3b82f6', '#ef4444'],
        borderWidth: 0,
        hoverOffset: 6,
      },
    ],
  };

  const performanceData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Trips Completed',
        data: [65, 78, 72, 85, 92, 68, 45],
        backgroundColor: 'rgba(59,130,246,0.8)',
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: 'Revenue',
        data: [45000, 52000, 48000, 61000, 75000, 55000, 38000],
        backgroundColor: 'rgba(16,185,129,0.8)',
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  return (
    <>
      <div className="card p-6">
        <h2 className="text-base font-semibold text-slate-800 mb-5">Fleet Status</h2>
        <div className="max-h-72 flex items-center justify-center">
          <Pie
            data={statusData}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                legend: {
                  position: 'bottom',
                  labels: {
                    padding: 16,
                    usePointStyle: true,
                    pointStyleWidth: 8,
                    font: { size: 12, family: 'Inter' },
                  },
                },
              },
            }}
          />
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-base font-semibold text-slate-800 mb-5">Weekly Performance</h2>
        <div className="max-h-72">
          <Bar
            data={performanceData}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                legend: {
                  position: 'top',
                  labels: {
                    padding: 16,
                    usePointStyle: true,
                    pointStyleWidth: 8,
                    font: { size: 12, family: 'Inter' },
                  },
                },
              },
              scales: {
                x: {
                  grid: { display: false },
                  ticks: { font: { size: 11, family: 'Inter' } },
                },
                y: {
                  grid: { color: 'rgba(0,0,0,0.04)' },
                  ticks: { font: { size: 11, family: 'Inter' } },
                },
              },
            }}
          />
        </div>
      </div>
    </>
  );
}
