'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { TripForm } from '../components/TripForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateTripPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-6 animate-fade-in">
        <Link
          href="/trips"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition font-medium"
        >
          <ArrowLeft size={16} />
          <span>Back to Trips</span>
        </Link>
        <div>
          <h1 className="page-title">Create New Trip</h1>
          <p className="page-subtitle">Schedule a new fleet trip</p>
        </div>
        <TripForm />
      </div>
    </ProtectedRoute>
  );
}
