'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Plus, Eye, Pencil, Trash2 } from 'lucide-react';

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
      <div className="space-y-6 animate-fade-in">
        <div className="page-header">
          <div>
            <h1 className="page-title">Maintenance</h1>
            <p className="page-subtitle">Service logs and maintenance records</p>
          </div>
          <button className="btn-primary">
            <Plus size={18} />
            <span>Log Service</span>
          </button>
        </div>

        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Vehicle</th>
                  <th>Service Type</th>
                  <th>Mechanic</th>
                  <th>Cost</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockMaintenance.map((record) => (
                  <tr key={record.id}>
                    <td className="font-semibold text-slate-900">
                      {record.vehicle_id}
                    </td>
                    <td>
                      <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                        {record.service_type}
                      </span>
                    </td>
                    <td className="text-slate-600">{record.mechanic}</td>
                    <td className="text-slate-600 font-medium">\u20B9{record.cost}</td>
                    <td className="text-slate-600">{record.date}</td>
                    <td>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ring-inset ${
                          record.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20'
                            : 'bg-amber-50 text-amber-700 ring-amber-600/20'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${record.status === 'Completed' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        {record.status}
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
