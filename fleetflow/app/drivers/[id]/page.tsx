'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useDrivers } from '@/hooks/useDrivers';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Driver } from '@/types/driver';
import { StatusPill } from '@/components/StatusPill';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { getSafetyScoreColor } from '@/utils/statusHelpers';

export default function DriverDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { getDriverById, loading, error } = useDrivers();
  const [driver, setDriver] = useState<Driver | null>(null);

  useEffect(() => {
    if (id) {
      getDriverById(id).then(setDriver);
    }
  }, [id, getDriverById]);

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <Link
          href="/drivers"
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={20} />
          <span>Back to Drivers</span>
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

        {driver && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">
                    {driver.first_name} {driver.last_name}
                  </h1>
                  <p className="text-gray-600 mt-2">License: {driver.license_number}</p>
                </div>
                <StatusPill status={driver.status} type="driver" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-semibold">{driver.email}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-semibold">{driver.phone}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Date of Birth:</span>
                    <span className="font-semibold">{driver.date_of_birth}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Address:</span>
                    <span className="font-semibold">{driver.address}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">License Details</h2>
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">License Class:</span>
                    <span className="font-semibold">{driver.license_class}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Expiry Date:</span>
                    <span className="font-semibold">{driver.license_expiry}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Joining Date:</span>
                    <span className="font-semibold">{driver.joining_date}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Total Trips</h2>
                <p className="text-3xl font-bold text-blue-600">{driver.total_trips}</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Total Distance</h2>
                <p className="text-3xl font-bold text-green-600">{driver.total_distance} km</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Avg Fuel Efficiency</h2>
                <p className="text-3xl font-bold text-orange-600">
                  {driver.average_fuel_efficiency?.toFixed(2) || 'N/A'} km/l
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Safety Performance</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Safety Score</span>
                    <span className={`text-lg font-bold p-2 rounded`}
                          style={{
                            color: getSafetyScoreColor(driver.safety_score) === 'green' ? '#10b981' :
                                   getSafetyScoreColor(driver.safety_score) === 'yellow' ? '#f59e0b' :
                                   getSafetyScoreColor(driver.safety_score) === 'red' ? '#ef4444' : '#3b82f6'
                          }}>
                      {driver.safety_score}/100
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${
                        driver.safety_score >= 80
                          ? 'bg-green-500'
                          : driver.safety_score >= 60
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${driver.safety_score}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-gray-600 text-sm">Violations</p>
                    <p className="text-2xl font-bold text-red-600">{driver.violations_count}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600 text-sm">Accidents</p>
                    <p className="text-2xl font-bold text-red-600">{driver.accidents_count}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600 text-sm">Assigned Vehicle</p>
                    <p className="text-lg font-bold text-blue-600">
                      {driver.assigned_vehicle_id ? '✓' : '—'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex space-x-3">
              <AlertCircle className="text-yellow-600 flex-shrink-0" size={20} />
              <div>
                <h3 className="font-semibold text-yellow-800">Important Notice</h3>
                <p className="text-yellow-700 text-sm mt-1">
                  License expires on {driver.license_expiry}. Please ensure renewal before expiry date.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
