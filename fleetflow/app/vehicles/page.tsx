'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { VehicleTable } from './components/VehicleTable';
import { useVehicles } from '@/hooks/useVehicles';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function VehiclesPage() {
  const { vehicles, loading, error } = useVehicles();

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Vehicles</h1>
          <Link
            href="/vehicles/new"
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Plus size={20} />
            <span>Add Vehicle</span>
          </Link>
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
          <VehicleTable vehicles={vehicles} />
        )}
      </div>
    </ProtectedRoute>
  );
}
