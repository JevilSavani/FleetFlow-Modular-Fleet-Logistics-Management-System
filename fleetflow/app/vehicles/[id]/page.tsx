'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useVehicles } from '@/hooks/useVehicles';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Vehicle } from '@/types/vehicle';
import { StatusPill } from '@/components/StatusPill';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function VehicleDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { getVehicleById, loading, error } = useVehicles();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    if (id) {
      getVehicleById(id).then(setVehicle);
    }
  }, [id, getVehicleById]);

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <Link
          href="/vehicles"
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={20} />
          <span>Back to Vehicles</span>
        </Link>

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {vehicle && (
          <div className="bg-white rounded-lg shadow p-6 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {vehicle.make} {vehicle.model}
                </h1>
                <p className="text-gray-600 mt-2">{vehicle.registration_number}</p>
              </div>
              <StatusPill status={vehicle.status} type="vehicle" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Vehicle Details</h2>
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-semibold">{vehicle.vehicle_type}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Year:</span>
                    <span className="font-semibold">{vehicle.year}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Fuel Type:</span>
                    <span className="font-semibold">{vehicle.fuel_type}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Mileage:</span>
                    <span className="font-semibold">{vehicle.mileage} km</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Capacity & Fuel</h2>
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Max Capacity:</span>
                    <span className="font-semibold">{vehicle.max_capacity} kg</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Current Load:</span>
                    <span className="font-semibold">{vehicle.current_cargo_weight} kg</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Fuel Efficiency:</span>
                    <span className="font-semibold">{vehicle.fuel_efficiency} km/l</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Depreciation Value:</span>
                    <span className="font-semibold">₹{vehicle.depreciation_value}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Maintenance & Documents</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-600 mb-2">Last Service Date:</p>
                  <p className="font-semibold">{vehicle.last_service_date}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-2">Next Service Due:</p>
                  <p className="font-semibold">{vehicle.next_service_due}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-2">Insurance Expiry:</p>
                  <p className="font-semibold">{vehicle.insurance_expiry}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-2">Pollution Certificate Expiry:</p>
                  <p className="font-semibold">{vehicle.pollution_certificate_expiry}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
