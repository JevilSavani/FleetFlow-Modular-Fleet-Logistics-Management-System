'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Plus, Eye, Pencil, Trash2, IndianRupee, Clock, TrendingDown } from 'lucide-react';

export default function ExpensesPage() {
  const mockExpenses = [
    {
      id: '1',
      vehicle_id: 'DL-01-AB-1234',
      type: 'Fuel',
      amount: 3500,
      date: '2026-02-18',
      description: 'Diesel - 50 liters',
      status: 'Approved',
    },
    {
      id: '2',
      vehicle_id: 'DL-02-CD-5678',
      type: 'Toll',
      amount: 450,
      date: '2026-02-17',
      description: 'Toll Plaza - Delhi to Agra',
      status: 'Pending',
    },
    {
      id: '3',
      vehicle_id: 'DL-03-EF-9012',
      type: 'Maintenance',
      amount: 8000,
      date: '2026-02-16',
      description: 'Tire replacement and alignment',
      status: 'Approved',
    },
    {
      id: '4',
      vehicle_id: 'DL-05-IJ-7890',
      type: 'Fuel',
      amount: 5200,
      date: '2026-02-19',
      description: 'Diesel - 75 liters (long haul)',
      status: 'Approved',
    },
    {
      id: '5',
      vehicle_id: 'MH-12-KL-3456',
      type: 'Parking',
      amount: 200,
      date: '2026-02-15',
      description: 'Overnight parking - Pune depot',
      status: 'Approved',
    },
    {
      id: '6',
      vehicle_id: 'DL-01-AB-1234',
      type: 'Toll',
      amount: 850,
      date: '2026-02-20',
      description: 'Toll - Delhi to Lucknow expressway',
      status: 'Pending',
    },
  ];

  const typeColors: Record<string, string> = {
    Fuel: 'bg-orange-50 text-orange-700 ring-orange-600/20',
    Toll: 'bg-blue-50 text-blue-700 ring-blue-600/20',
    Maintenance: 'bg-amber-50 text-amber-700 ring-amber-600/20',
    Parking: 'bg-violet-50 text-violet-700 ring-violet-600/20',
  };

  const summaryCards = [
    { label: 'Total Expenses (Month)', value: '\u20B945,850', icon: IndianRupee, color: 'blue' },
    { label: 'Pending Approval', value: '\u20B93,450', icon: Clock, color: 'amber' },
    { label: 'Average per Vehicle', value: '\u20B91,342', icon: TrendingDown, color: 'emerald' },
  ];

  const colorMap: Record<string, { bg: string; iconBg: string; text: string }> = {
    blue: { bg: 'bg-blue-50', iconBg: 'bg-blue-100 text-blue-600', text: 'text-slate-900' },
    amber: { bg: 'bg-amber-50', iconBg: 'bg-amber-100 text-amber-600', text: 'text-amber-700' },
    emerald: { bg: 'bg-emerald-50', iconBg: 'bg-emerald-100 text-emerald-600', text: 'text-emerald-700' },
  };

  return (
    <ProtectedRoute>
      <div className="space-y-6 animate-fade-in">
        <div className="page-header">
          <div>
            <h1 className="page-title">Expenses</h1>
            <p className="page-subtitle">Track fuel, toll, and maintenance costs</p>
          </div>
          <button className="btn-primary">
            <Plus size={18} />
            <span>Log Expense</span>
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {summaryCards.map((card) => {
            const colors = colorMap[card.color];
            return (
              <div key={card.label} className="card p-5">
                <div className="flex items-center gap-4">
                  <div className={`w-11 h-11 ${colors.iconBg} rounded-xl flex items-center justify-center`}>
                    <card.icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{card.label}</p>
                    <p className={`text-xl font-bold ${colors.text} mt-0.5`}>{card.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Expense Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Vehicle</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockExpenses.map((expense) => (
                  <tr key={expense.id}>
                    <td className="font-semibold text-slate-900">
                      {expense.vehicle_id}
                    </td>
                    <td>
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ring-inset ${
                          typeColors[expense.type] || 'bg-slate-50 text-slate-700 ring-slate-600/20'
                        }`}
                      >
                        {expense.type}
                      </span>
                    </td>
                    <td className="text-slate-600 font-medium">\u20B9{expense.amount}</td>
                    <td className="text-slate-600">{expense.description}</td>
                    <td className="text-slate-600">{expense.date}</td>
                    <td>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ring-inset ${
                          expense.status === 'Approved'
                            ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20'
                            : 'bg-amber-50 text-amber-700 ring-amber-600/20'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${expense.status === 'Approved' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        {expense.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                          <Eye size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition">
                          <Pencil size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
