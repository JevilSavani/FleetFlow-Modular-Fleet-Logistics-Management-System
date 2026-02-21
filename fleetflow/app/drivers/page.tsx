'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useDrivers } from '@/hooks/useDrivers';
import { StatusPill } from '@/components/StatusPill';
import { Plus, Eye, Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function DriversPage() {
  const { drivers, loading, error } = useDrivers();

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Drivers</h1>
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
            <Plus size={20} />
            <span>Add Driver</span>
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    License Expiry
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Safety Score
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {drivers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      No drivers found
                    </td>
                  </tr>
                ) : (
                  drivers.map((driver) => (
                    <tr key={driver.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {driver.first_name} {driver.last_name}
                      </td>
                      <td className="px-6 py-4 text-gray-700">{driver.email}</td>
                      <td className="px-6 py-4 text-gray-700">{driver.phone}</td>
                      <td className="px-6 py-4 text-gray-700">{driver.license_expiry}</td>
                      <td className="px-6 py-4">
                        <StatusPill status={driver.status} type="driver" size="sm" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${driver.safety_score}%` }}
                            ></div>
                          </div>
                          <span className="font-semibold">{driver.safety_score}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 space-x-2 flex">
                        <Link
                          href={`/drivers/${driver.id}`}
                          className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded"
                        >
                          <Eye size={18} />
                        </Link>
                        <button className="text-orange-600 hover:text-orange-800 p-2 hover:bg-orange-50 rounded">
                          <Edit2 size={18} />
                        </button>
                        <button className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
