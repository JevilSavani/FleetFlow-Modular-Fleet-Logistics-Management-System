'use client';

import { Vehicle } from '@/types/vehicle';
import { StatusPill } from '@/components/StatusPill';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface VehicleTableProps {
  vehicles: Vehicle[];
}

export function VehicleTable({ vehicles }: VehicleTableProps) {
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th>Registration</th>
              <th>Vehicle</th>
              <th>Type</th>
              <th>Status</th>
              <th>Capacity</th>
              <th>Mileage</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center text-slate-400 py-12">
                  No vehicles found
                </td>
              </tr>
            ) : (
              vehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td className="font-semibold text-slate-900">
                    {vehicle.registration_number}
                  </td>
                  <td className="text-slate-600">
                    {vehicle.make} {vehicle.model}
                  </td>
                  <td>
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md capitalize">
                      {vehicle.vehicle_type}
                    </span>
                  </td>
                  <td>
                    <StatusPill status={vehicle.status} type="vehicle" size="sm" />
                  </td>
                  <td className="text-slate-600">{vehicle.max_capacity} kg</td>
                  <td className="text-slate-600">{vehicle.mileage} km</td>
                  <td>
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/vehicles/${vehicle.id}`}
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
