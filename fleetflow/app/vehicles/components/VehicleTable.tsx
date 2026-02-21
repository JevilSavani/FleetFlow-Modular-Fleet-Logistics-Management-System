'use client';

import { Vehicle } from '@/types/vehicle';
import { StatusPill } from '@/components/StatusPill';
import { Edit2, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';

interface VehicleTableProps {
  vehicles: Vehicle[];
}

export function VehicleTable({ vehicles }: VehicleTableProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Registration
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Vehicle
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Type
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Status
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Capacity
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Mileage
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {vehicles.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                No vehicles found
              </td>
            </tr>
          ) : (
            vehicles.map((vehicle) => (
              <tr key={vehicle.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold text-gray-900">
                  {vehicle.registration_number}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {vehicle.make} {vehicle.model}
                </td>
                <td className="px-6 py-4 text-gray-700">{vehicle.vehicle_type}</td>
                <td className="px-6 py-4">
                  <StatusPill status={vehicle.status} type="vehicle" size="sm" />
                </td>
                <td className="px-6 py-4 text-gray-700">{vehicle.max_capacity} kg</td>
                <td className="px-6 py-4 text-gray-700">{vehicle.mileage} km</td>
                <td className="px-6 py-4 space-x-2 flex">
                  <Link
                    href={`/vehicles/${vehicle.id}`}
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
  );
}
