'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useDrivers } from '@/hooks/useDrivers';
import { StatusPill } from '@/components/StatusPill';
import { Plus, Eye, Pencil, Trash2, Users } from 'lucide-react';
import Link from 'next/link';

export default function DriversPage() {
  const { drivers, loading, error } = useDrivers();

  return (
    <ProtectedRoute>
      <div className="space-y-6 animate-fade-in">
        <div className="page-header">
          <div>
            <h1 className="page-title">Drivers</h1>
            <p className="page-subtitle">Manage driver profiles and performance</p>
          </div>
          <button className="btn-primary">
            <Plus size={18} />
            <span>Add Driver</span>
          </button>
        </div>

        {error && (
          <div className="alert-error">
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-blue-500/20 border-t-blue-600 mx-auto mb-3"></div>
              <p className="text-slate-400 text-sm">Loading drivers...</p>
            </div>
          </div>
        ) : drivers.length === 0 ? (
          <div className="card flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
              <Users size={28} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700">No drivers yet</h3>
            <p className="text-slate-400 text-sm mt-1 mb-4">Add your first driver to get started</p>
            <button className="btn-primary text-sm">
              <Plus size={16} />
              <span>Add Driver</span>
            </button>
          </div>
        ) : (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>License Expiry</th>
                    <th>Status</th>
                    <th>Safety Score</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {drivers.map((driver) => (
                    <tr key={driver.id}>
                      <td className="font-semibold text-slate-900">
                        {driver.first_name} {driver.last_name}
                      </td>
                      <td className="text-slate-600">{driver.email}</td>
                      <td className="text-slate-600">{driver.phone}</td>
                      <td className="text-slate-600">{driver.license_expiry}</td>
                      <td>
                        <StatusPill status={driver.status} type="driver" size="sm" />
                      </td>
                      <td>
                        <div className="flex items-center gap-2.5">
                          <div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                driver.safety_score >= 80 ? 'bg-emerald-500' :
                                driver.safety_score >= 60 ? 'bg-amber-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${driver.safety_score}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold text-slate-700">{driver.safety_score}</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/drivers/${driver.id}`}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          >
                            <Eye size={16} />
                          </Link>
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
        )}
      </div>
    </ProtectedRoute>
  );
}
