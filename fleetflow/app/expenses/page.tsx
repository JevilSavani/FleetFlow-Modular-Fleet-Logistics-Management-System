'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Plus, Eye, Edit2, Trash2 } from 'lucide-react';

export default function ExpensesPage() {
  const mockExpenses = [
    {
      id: '1',
      vehicle_id: 'DL-01-AB-1234',
      type: 'Fuel',
      amount: 3500,
      date: '2024-02-18',
      description: 'Diesel - 50 liters',
      status: 'Approved',
    },
    {
      id: '2',
      vehicle_id: 'DL-02-CD-5678',
      type: 'Toll',
      amount: 450,
      date: '2024-02-17',
      description: 'Toll Plaza - Delhi to Agra',
      status: 'Pending',
    },
    {
      id: '3',
      vehicle_id: 'DL-03-EF-9012',
      type: 'Maintenance',
      amount: 8000,
      date: '2024-02-16',
      description: 'Tire replacement and alignment',
      status: 'Approved',
    },
  ];

  const typeColors: Record<string, string> = {
    Fuel: 'bg-orange-100 text-orange-800',
    Toll: 'bg-blue-100 text-blue-800',
    Maintenance: 'bg-yellow-100 text-yellow-800',
    Parking: 'bg-purple-100 text-purple-800',
  };

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Expenses</h1>
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
            <Plus size={20} />
            <span>Log Expense</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg p-4 shadow">
            <p className="text-gray-600 text-sm">Total Expenses (Month)</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-2">₹45,850</h3>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <p className="text-gray-600 text-sm">Pending Approval</p>
            <h3 className="text-2xl font-bold text-orange-600 mt-2">₹3,450</h3>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <p className="text-gray-600 text-sm">Average per Vehicle</p>
            <h3 className="text-2xl font-bold text-green-600 mt-2">₹1,342</h3>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Vehicle
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {mockExpenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {expense.vehicle_id}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        typeColors[expense.type] || 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {expense.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">₹{expense.amount}</td>
                  <td className="px-6 py-4 text-gray-700">{expense.description}</td>
                  <td className="px-6 py-4 text-gray-700">{expense.date}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        expense.status === 'Approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {expense.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 space-x-2 flex">
                    <button className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded">
                      <Eye size={18} />
                    </button>
                    <button className="text-orange-600 hover:text-orange-800 p-2 hover:bg-orange-50 rounded">
                      <Edit2 size={18} />
                    </button>
                    <button className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ProtectedRoute>
  );
}
