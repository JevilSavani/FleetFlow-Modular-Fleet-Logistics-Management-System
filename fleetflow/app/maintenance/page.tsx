'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Plus, Eye, Edit2, Trash2 } from 'lucide-react';

export default function MaintenancePage() {
  const mockMaintenance = [
    {
      id: '1',
      vehicle_id: 'DL-01-AB-1234',
      service_type: 'Routine Service',
      cost: 5000,
      date: '2024-02-15',
      mechanic: 'John\'s Auto Service',
      status: 'Completed',
    },
    {
      id: '2',
      vehicle_id: 'DL-02-CD-5678',
      service_type: 'Oil Change',
      cost: 2000,
      date: '2024-02-18',
      mechanic: 'RAJ Service Center',
      status: 'Pending',
    },
  ];

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Maintenance</h1>
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
            <Plus size={20} />
            <span>Log Service</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Vehicle
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Service Type
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Mechanic
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Cost
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
              {mockMaintenance.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {record.vehicle_id}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{record.service_type}</td>
                  <td className="px-6 py-4 text-gray-700">{record.mechanic}</td>
                  <td className="px-6 py-4 text-gray-700">₹{record.cost}</td>
                  <td className="px-6 py-4 text-gray-700">{record.date}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        record.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {record.status}
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
