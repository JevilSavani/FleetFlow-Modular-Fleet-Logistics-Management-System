'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { TripForm } from '../components/TripForm';

export default function CreateTripPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Create New Trip</h1>
        <TripForm />
      </div>
    </ProtectedRoute>
  );
}
