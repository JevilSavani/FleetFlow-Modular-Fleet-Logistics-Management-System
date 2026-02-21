'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useVehicles } from '@/hooks/useVehicles';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Vehicle } from '@/types/vehicle';
import { StatusPill } from '@/components/StatusPill';
import { ArrowLeft, Truck, Fuel, Calendar, Shield } from 'lucide-react';
import Link from 'next/link';

export default function VehicleDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { getVehicleById } = useVehicles();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      setPageLoading(true);
      getVehicleById(id)
        .then((data) => setVehicle(data as Vehicle))
        .catch(() => setPageError('Failed to load vehicle'))
        .finally(() => setPageLoading(false));
    }
  }, [id, getVehicleById]);

  return (
    <ProtectedRoute>
      <div className="space-y-6 animate-fade-in">
        <Link
          href="/vehicles"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition font-medium"
        >
          <ArrowLeft size={16} />
          <span>Back to Vehicles</span>
        </Link>

        {pageLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-blue-500/20 border-t-blue-600"></div>
          </div>
        )}

        {pageError && (
          <div className="alert-error">
            <span>{pageError}</span>
          </div>
        )}

        {vehicle && (
          <>
            {/* Hero card */}
            <div className="card p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <Truck size={26} className="text-blue-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                      {vehicle.make} {vehicle.model}
                    </h1>
                    <p className="text-slate-500 text-sm mt-0.5">{vehicle.registration_number}</p>
                  </div>
                </div>
                <StatusPill status={vehicle.status} type="vehicle" size="lg" />
              </div>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Truck size={16} className="text-blue-600" />
                  <h2 className="text-sm font-semibold text-slate-800">Vehicle Details</h2>
                </div>
                <div className="space-y-3">
                  {[
                    ['Type', vehicle.vehicle_type],
                    ['Year', vehicle.year],
                    ['Fuel Type', vehicle.fuel_type],
                    ['Mileage', `${vehicle.mileage} km`],
                  ].map(([label, value]) => (
                    <div key={String(label)} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                      <span className="text-sm text-slate-500">{label}:</span>
                      <span className="text-sm font-semibold text-slate-800 capitalize">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Fuel size={16} className="text-emerald-600" />
                  <h2 className="text-sm font-semibold text-slate-800">Capacity & Fuel</h2>
                </div>
                <div className="space-y-3">
                  {[
                    ['Max Capacity', `${vehicle.max_capacity} kg`],
                    ['Current Load', `${vehicle.current_cargo_weight} kg`],
                    ['Fuel Efficiency', `${vehicle.fuel_efficiency} km/l`],
                    ['Depreciation Value', `\u20B9${vehicle.depreciation_value}`],
                  ].map(([label, value]) => (
                    <div key={String(label)} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                      <span className="text-sm text-slate-500">{label}:</span>
                      <span className="text-sm font-semibold text-slate-800">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Maintenance & Documents */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-5">
                <Shield size={16} className="text-violet-600" />
                <h2 className="text-sm font-semibold text-slate-800">Maintenance & Documents</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { label: 'Last Service Date', value: vehicle.last_service_date, icon: Calendar },
                  { label: 'Next Service Due', value: vehicle.next_service_due, icon: Calendar },
                  { label: 'Insurance Expiry', value: vehicle.insurance_expiry, icon: Shield },
                  { label: 'Pollution Cert Expiry', value: vehicle.pollution_certificate_expiry, icon: Shield },
                ].map((item) => (
                  <div key={item.label} className="bg-slate-50 rounded-xl p-4">
                    <p className="text-xs text-slate-500 font-medium mb-1">{item.label}</p>
                    <p className="text-sm font-semibold text-slate-800">{item.value || 'N/A'}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
}
