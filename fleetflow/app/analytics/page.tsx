'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Download, TrendingUp, TrendingDown, DollarSign, Percent } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function AnalyticsPage() {
  const fuelEfficiencyData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Fuel Efficiency (km/l)',
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
    ],
  };

  const roiData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue (\u20B9)',
        data: [450000, 520000, 485000, 610000, 750000, 680000],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.08)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#10b981',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
      {
        label: 'Expenses (\u20B9)',
        data: [280000, 320000, 290000, 370000, 450000, 410000],
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.08)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#ef4444',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { position: 'top' as const, labels: { usePointStyle: true, padding: 20, font: { size: 12 } } },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: 'rgba(0,0,0,0.04)' } },
    },
  };

  const stats = [
    { label: 'Total Revenue', value: '\u20B937,88,000', change: '+12.5%', icon: TrendingUp, color: 'emerald', positive: true },
    { label: 'Total Expenses', value: '\u20B921,21,000', change: '+8.3%', icon: TrendingDown, color: 'red', positive: false },
    { label: 'Net Profit', value: '\u20B916,67,000', change: '+15.2%', icon: DollarSign, color: 'blue', positive: true },
    { label: 'ROI', value: '78.6%', change: '+2.1pp', icon: Percent, color: 'violet', positive: true },
  ];

  const colorMap: Record<string, { iconBg: string; text: string }> = {
    emerald: { iconBg: 'bg-emerald-100 text-emerald-600', text: 'text-emerald-600' },
    red: { iconBg: 'bg-red-100 text-red-600', text: 'text-red-600' },
    blue: { iconBg: 'bg-blue-100 text-blue-600', text: 'text-blue-600' },
    violet: { iconBg: 'bg-violet-100 text-violet-600', text: 'text-violet-600' },
  };

  const topVehicles = [
    { id: 'DL-01-AB-1234', value: '9.2 km/l', rank: 'high' },
    { id: 'DL-02-CD-5678', value: '8.8 km/l', rank: 'high' },
    { id: 'DL-03-EF-9012', value: '7.5 km/l', rank: 'medium' },
  ];

  const topDrivers = [
    { name: 'Rajesh Kumar', value: '95/100', rank: 'high' },
    { name: 'Priya Singh', value: '92/100', rank: 'high' },
    { name: 'Mohammad Ali', value: '85/100', rank: 'medium' },
  ];

  return (
    <ProtectedRoute>
      <div className="space-y-6 animate-fade-in">
        <div className="page-header">
          <div>
            <h1 className="page-title">Analytics & Reports</h1>
            <p className="page-subtitle">Fleet performance insights and metrics</p>
          </div>
          <button className="btn-success">
            <Download size={18} />
            <span>Export Report</span>
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => {
            const colors = colorMap[stat.color];
            return (
              <div key={stat.label} className="card p-5 animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${colors.iconBg} rounded-xl flex items-center justify-center`}>
                    <stat.icon size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
                    <p className={`text-xl font-bold ${colors.text} mt-0.5`}>{stat.value}</p>
                  </div>
                </div>
                <p className={`text-xs mt-3 font-medium ${
                  stat.positive ? 'text-emerald-600' : 'text-red-500'
                }`}>{stat.change} vs last quarter</p>
              </div>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="card p-6">
            <h2 className="text-sm font-semibold text-slate-800 mb-4">Fuel Efficiency Trend</h2>
            <Line data={fuelEfficiencyData} options={chartOptions} />
          </div>
          <div className="card p-6">
            <h2 className="text-sm font-semibold text-slate-800 mb-4">Revenue vs Expenses</h2>
            <Line data={roiData} options={chartOptions} />
          </div>
        </div>

        {/* Top Performers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="card p-6">
            <h2 className="text-sm font-semibold text-slate-800 mb-5">Top Performing Vehicles</h2>
            <div className="space-y-3">
              {topVehicles.map((v, i) => (
                <div key={v.id} className="flex justify-between items-center py-2.5 border-b border-slate-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-slate-100 rounded-lg flex items-center justify-center text-xs font-bold text-slate-500">{i + 1}</span>
                    <span className="font-semibold text-sm text-slate-800">{v.id}</span>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ring-inset ${
                    v.rank === 'high' ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' : 'bg-amber-50 text-amber-700 ring-amber-600/20'
                  }`}>
                    {v.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-sm font-semibold text-slate-800 mb-5">Top Performing Drivers</h2>
            <div className="space-y-3">
              {topDrivers.map((d, i) => (
                <div key={d.name} className="flex justify-between items-center py-2.5 border-b border-slate-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-slate-100 rounded-lg flex items-center justify-center text-xs font-bold text-slate-500">{i + 1}</span>
                    <span className="font-semibold text-sm text-slate-800">{d.name}</span>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ring-inset ${
                    d.rank === 'high' ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' : 'bg-amber-50 text-amber-700 ring-amber-600/20'
                  }`}>
                    {d.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
