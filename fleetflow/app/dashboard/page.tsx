'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { KPICards } from './components/KPICards';
import { FleetStatusChart } from './components/FleetStatusChart';
import { Filters } from './components/Filters';
import { useState } from 'react';

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [status, setStatus] = useState('');

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <span className="text-gray-500">Command Center</span>
        </div>

        <Filters
          dateRange={dateRange}
          setDateRange={setDateRange}
          status={status}
          setStatus={setStatus}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICards />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FleetStatusChart />
        </div>
      </div>
    </ProtectedRoute>
  );
}
