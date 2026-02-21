'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { VehicleTable } from './components/VehicleTable';
import { useVehicles } from '@/hooks/useVehicles';
import Link from 'next/link';
import { Plus, Truck } from 'lucide-react';

export default function VehiclesPage() {
  const { vehicles, loading, error } = useVehicles();

  return (
    <ProtectedRoute>
      <div className="space-y-6 animate-fade-in">
        <div className="page-header">
          <div>
            <h1 className="page-title">Vehicles</h1>
            <p className="page-subtitle">Manage and monitor your entire fleet</p>
          </div>
          <Link href="/vehicles/new" className="btn-primary">
            <Plus size={18} />
            <span>Add Vehicle</span>
          </Link>
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
              <p className="text-slate-400 text-sm">Loading vehicles...</p>
            </div>
          </div>
        ) : vehicles.length === 0 ? (
          <div className="card flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
              <Truck size={28} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700">No vehicles yet</h3>
            <p className="text-slate-400 text-sm mt-1 mb-4">Add your first vehicle to get started</p>
            <Link href="/vehicles/new" className="btn-primary text-sm">
              <Plus size={16} />
              <span>Add Vehicle</span>
            </Link>
          </div>
        ) : (
          <VehicleTable vehicles={vehicles} />
        )}
      </div>
    </ProtectedRoute>
  );
}
