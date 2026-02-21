'use client';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function FleetStatusChart() {
  const statusData = {
    labels: ['Active', 'Maintenance', 'Reserved', 'Retired'],
    datasets: [
      {
        label: 'Vehicles',
        data: [42, 5, 8, 3],
        backgroundColor: ['#10b981', '#f59e0b', '#3b82f6', '#ef4444'],
      },
    ],
  };

  const performanceData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Trips Completed',
        data: [65, 78, 72, 85, 92, 68, 45],
        backgroundColor: '#3b82f6',
        borderColor: '#1e40af',
        borderWidth: 1,
      },
      {
        label: 'Revenue',
        data: [45000, 52000, 48000, 61000, 75000, 55000, 38000],
        backgroundColor: '#10b981',
        borderColor: '#065f46',
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Fleet Status</h2>
        <div className="max-h-80 flex items-center justify-center">
          <Pie data={statusData} options={{ responsive: true, maintainAspectRatio: true }} />
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Weekly Performance</h2>
        <div className="max-h-80">
          <Bar
            data={performanceData}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              indexAxis: 'x' as const,
            }}
          />
        </div>
      </div>
    </>
  );
}
