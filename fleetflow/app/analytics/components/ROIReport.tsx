'use client';

import { TrendingUp, TrendingDown, DollarSign, Percent } from 'lucide-react';

interface ROIMetrics {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  roiPercentage: number;
  margin: number;
}

export function ROIReport() {
  const metrics: ROIMetrics = {
    totalRevenue: 3788000,
    totalExpenses: 2121000,
    netProfit: 1667000,
    roiPercentage: 78.6,
    margin: 44.0,
  };

  const cards = [
    { label: 'Total Revenue', value: `\u20B9${(metrics.totalRevenue / 100000).toFixed(2)}L`, change: '+12.5% vs previous period', icon: TrendingUp, color: 'emerald' },
    { label: 'Total Expenses', value: `\u20B9${(metrics.totalExpenses / 100000).toFixed(2)}L`, change: '+8.3% vs previous period', icon: TrendingDown, color: 'red' },
    { label: 'Net Profit', value: `\u20B9${(metrics.netProfit / 100000).toFixed(2)}L`, change: '+15.2% growth', icon: DollarSign, color: 'blue' },
    { label: 'ROI Percentage', value: `${metrics.roiPercentage}%`, change: '+2.1pp increase', icon: Percent, color: 'violet' },
  ];

  const colorMap: Record<string, { iconBg: string; text: string; changeText: string }> = {
    emerald: { iconBg: 'bg-emerald-100 text-emerald-600', text: 'text-emerald-600', changeText: 'text-emerald-600' },
    red: { iconBg: 'bg-red-100 text-red-600', text: 'text-red-600', changeText: 'text-red-500' },
    blue: { iconBg: 'bg-blue-100 text-blue-600', text: 'text-blue-600', changeText: 'text-blue-600' },
    violet: { iconBg: 'bg-violet-100 text-violet-600', text: 'text-violet-600', changeText: 'text-violet-600' },
  };

  return (
    <div className="card-glass p-6">
      <h2 className="text-sm font-semibold text-slate-800 mb-6">ROI Report</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {cards.map((card) => {
          const colors = colorMap[card.color];
          return (
            <div key={card.label} className="bg-white rounded-xl p-5 ring-1 ring-slate-200/60">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-9 h-9 ${colors.iconBg} rounded-xl flex items-center justify-center`}>
                  <card.icon size={16} />
                </div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{card.label}</p>
              </div>
              <p className={`text-2xl font-bold ${colors.text}`}>{card.value}</p>
              <p className={`text-xs mt-1.5 font-medium ${colors.changeText}`}>{card.change}</p>
            </div>
          );
        })}
      </div>

      {/* Profit Margin Bar */}
      <div className="mt-6 bg-white rounded-xl p-5 ring-1 ring-slate-200/60">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-slate-600">Profit Margin</span>
          <span className="text-xl font-bold text-emerald-600">{metrics.margin}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-emerald-500 h-full rounded-full transition-all"
            style={{ width: `${metrics.margin}%` }}
          />
        </div>
      </div>
    </div>
  );
}
