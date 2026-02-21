'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useDrivers } from '@/hooks/useDrivers';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Driver } from '@/types/driver';
import { StatusPill } from '@/components/StatusPill';
import { ArrowLeft, AlertCircle, User, CreditCard, MapPin, Fuel, BarChart3, Shield } from 'lucide-react';
import Link from 'next/link';

export default function DriverDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { getDriverById } = useDrivers();
  const [driver, setDriver] = useState<Driver | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      setPageLoading(true);
      getDriverById(id)
        .then((data) => setDriver(data as Driver))
        .catch(() => setPageError('Failed to load driver'))
        .finally(() => setPageLoading(false));
    }
  }, [id, getDriverById]);

  return (
    <ProtectedRoute>
      <div className="space-y-6 animate-fade-in">
        <Link
          href="/drivers"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition font-medium"
        >
          <ArrowLeft size={16} />
          <span>Back to Drivers</span>
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

        {driver && (
          <div className="space-y-5">
            {/* Hero card */}
            <div className="card p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <User size={26} className="text-blue-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                      {driver.first_name} {driver.last_name}
                    </h1>
                    <p className="text-slate-500 text-sm mt-0.5">License: {driver.license_number}</p>
                  </div>
                </div>
                <StatusPill status={driver.status} type="driver" size="lg" />
              </div>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-5">
                  <User size={16} className="text-blue-600" />
                  <h2 className="text-sm font-semibold text-slate-800">Personal Information</h2>
                </div>
                <div className="space-y-3">
                  {[
                    ['Email', driver.email],
                    ['Phone', driver.phone],
                    ['Date of Birth', driver.date_of_birth],
                    ['Address', driver.address],
                  ].map(([label, value]) => (
                    <div key={String(label)} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                      <span className="text-sm text-slate-500">{label}:</span>
                      <span className="text-sm font-semibold text-slate-800">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-2 mb-5">
                  <CreditCard size={16} className="text-emerald-600" />
                  <h2 className="text-sm font-semibold text-slate-800">License Details</h2>
                </div>
                <div className="space-y-3">
                  {[
                    ['License Class', driver.license_class],
                    ['Expiry Date', driver.license_expiry],
                    ['Joining Date', driver.joining_date],
                  ].map(([label, value]) => (
                    <div key={String(label)} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                      <span className="text-sm text-slate-500">{label}:</span>
                      <span className="text-sm font-semibold text-slate-800">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { label: 'Total Trips', value: driver.total_trips, icon: MapPin, color: 'blue' },
                { label: 'Total Distance', value: `${driver.total_distance} km`, icon: BarChart3, color: 'emerald' },
                { label: 'Avg Fuel Efficiency', value: `${driver.average_fuel_efficiency?.toFixed(2) || 'N/A'} km/l`, icon: Fuel, color: 'amber' },
              ].map((stat) => {
                const colorMap: Record<string, string> = {
                  blue: 'bg-blue-100 text-blue-600',
                  emerald: 'bg-emerald-100 text-emerald-600',
                  amber: 'bg-amber-100 text-amber-600',
                };
                const textMap: Record<string, string> = {
                  blue: 'text-blue-600',
                  emerald: 'text-emerald-600',
                  amber: 'text-amber-600',
                };
                return (
                  <div key={stat.label} className="card p-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${colorMap[stat.color]} rounded-xl flex items-center justify-center`}>
                        <stat.icon size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
                        <p className={`text-xl font-bold ${textMap[stat.color]} mt-0.5`}>{stat.value}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Safety Performance */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-6">
                <Shield size={16} className="text-violet-600" />
                <h2 className="text-sm font-semibold text-slate-800">Safety Performance</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-slate-600">Safety Score</span>
                    <span className={`text-lg font-bold ${
                      driver.safety_score >= 80 ? 'text-emerald-600' :
                      driver.safety_score >= 60 ? 'text-amber-600' : 'text-red-600'
                    }`}>
                      {driver.safety_score}/100
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        driver.safety_score >= 80 ? 'bg-emerald-500' :
                        driver.safety_score >= 60 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${driver.safety_score}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center bg-red-50 rounded-xl p-4">
                    <p className="text-xs text-slate-500 font-medium">Violations</p>
                    <p className="text-2xl font-bold text-red-600 mt-1">{driver.violations_count}</p>
                  </div>
                  <div className="text-center bg-red-50 rounded-xl p-4">
                    <p className="text-xs text-slate-500 font-medium">Accidents</p>
                    <p className="text-2xl font-bold text-red-600 mt-1">{driver.accidents_count}</p>
                  </div>
                  <div className="text-center bg-blue-50 rounded-xl p-4">
                    <p className="text-xs text-slate-500 font-medium">Assigned Vehicle</p>
                    <p className="text-lg font-bold text-blue-600 mt-1">
                      {driver.assigned_vehicle_id ? '\u2713' : '\u2014'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* License Warning */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3">
              <AlertCircle className="text-amber-600 flex-shrink-0 mt-0.5" size={18} />
              <div>
                <h3 className="font-semibold text-amber-800 text-sm">Important Notice</h3>
                <p className="text-amber-700 text-sm mt-0.5">
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
