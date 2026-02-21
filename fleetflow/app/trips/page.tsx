'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useTrips } from '@/hooks/useTrips';
import { StatusPill } from '@/components/StatusPill';
import { Plus, Eye, Pencil, Trash2, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function TripsPage() {
  const { trips, loading, error } = useTrips();

  return (
    <ProtectedRoute>
      <div className="space-y-6 animate-fade-in">
        <div className="page-header">
          <div>
            <h1 className="page-title">Trips</h1>
            <p className="page-subtitle">Track and manage all fleet trips</p>
          </div>
          <Link href="/trips/create" className="btn-primary">
            <Plus size={18} />
            <span>Create Trip</span>
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
              <p className="text-slate-400 text-sm">Loading trips...</p>
            </div>
          </div>
        ) : trips.length === 0 ? (
          <div className="card flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
              <MapPin size={28} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700">No trips yet</h3>
            <p className="text-slate-400 text-sm mt-1 mb-4">Create your first trip to get started</p>
            <Link href="/trips/create" className="btn-primary text-sm">
              <Plus size={16} />
              <span>Create Trip</span>
            </Link>
          </div>
        ) : (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Trip #</th>
                    <th>Route</th>
                    <th>Vehicle</th>
                    <th>Cargo Weight</th>
                    <th>Status</th>
                    <th>Scheduled</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {trips.map((trip) => (
                    <tr key={trip.id}>
                      <td className="font-semibold text-slate-900">
                        {trip.trip_number}
                      </td>
                      <td className="text-slate-600">
                        <span className="inline-flex items-center gap-1.5">
                          {trip.origin}
                          <span className="text-slate-300">&rarr;</span>
                          {trip.destination}
                        </span>
                      </td>
                      <td>
                        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                          {trip.vehicle_id}
                        </span>
                      </td>
                      <td className="text-slate-600">{trip.cargo_weight} kg</td>
                      <td>
                        <StatusPill status={trip.status} type="trip" size="sm" />
                      </td>
                      <td className="text-slate-600">
                        {new Date(trip.scheduled_departure).toLocaleDateString()}
                      </td>
                      <td>
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/trips/${trip.id}`}
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
