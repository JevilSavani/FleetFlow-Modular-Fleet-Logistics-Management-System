'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Download } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function AnalyticsPage() {
  const fuelEfficiencyData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Fuel Efficiency (km/l)',
        data: [8.2, 8.5, 8.1, 8.7, 8.4, 8.6],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const roiData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue (₹)',
        data: [450000, 520000, 485000, 610000, 750000, 680000],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Expenses (₹)',
        data: [280000, 320000, 290000, 370000, 450000, 410000],
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
      },
    ],
  };

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Analytics & Reports</h1>
          <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition">
            <Download size={20} />
            <span>Export Report</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition">
            <p className="text-gray-600 text-sm">Total Revenue</p>
            <h3 className="text-2xl font-bold text-green-600 mt-2">₹37,88,000</h3>
            <p className="text-green-600 text-xs mt-2">+12.5% vs last quarter</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition">
            <p className="text-gray-600 text-sm">Total Expenses</p>
            <h3 className="text-2xl font-bold text-red-600 mt-2">₹21,21,000</h3>
            <p className="text-red-600 text-xs mt-2">+8.3% vs last quarter</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition">
            <p className="text-gray-600 text-sm">Net Profit</p>
            <h3 className="text-2xl font-bold text-blue-600 mt-2">₹16,67,000</h3>
            <p className="text-green-600 text-xs mt-2">+15.2% margin improvement</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition">
            <p className="text-gray-600 text-sm">ROI</p>
            <h3 className="text-2xl font-bold text-purple-600 mt-2">78.6%</h3>
            <p className="text-green-600 text-xs mt-2">+2.1pp increase</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Fuel Efficiency Trend</h2>
            <Line data={fuelEfficiencyData} options={{ responsive: true, maintainAspectRatio: true }} />
          </div>

          <div className="bg-white rounded-lg p-6 shadow">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Revenue vs Expenses</h2>
            <Line data={roiData} options={{ responsive: true, maintainAspectRatio: true }} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Top Performing Vehicles</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b pb-3">
                <span className="font-semibold">DL-01-AB-1234</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  9.2 km/l
                </span>
              </div>
              <div className="flex justify-between items-center border-b pb-3">
                <span className="font-semibold">DL-02-CD-5678</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  8.8 km/l
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">DL-03-EF-9012</span>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                  7.5 km/l
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Top Performing Drivers</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b pb-3">
                <span className="font-semibold">Rajesh Kumar</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  95/100
                </span>
              </div>
              <div className="flex justify-between items-center border-b pb-3">
                <span className="font-semibold">Priya Singh</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  92/100
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Mohammad Ali</span>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                  85/100
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
