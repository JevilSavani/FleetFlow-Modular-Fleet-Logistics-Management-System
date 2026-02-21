'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { KPICards } from './components/KPICards';
import { FleetStatusChart } from './components/FleetStatusChart';
import { Filters } from './components/Filters';
import { useState } from 'react';
import { Activity } from 'lucide-react';

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [status, setStatus] = useState('');

  return (
    <ProtectedRoute>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">Dashboard</h1>
            <p className="page-subtitle">Command Center — Real-time overview of your fleet operations</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full font-medium">
            <Activity size={14} />
            <span>Live</span>
          </div>
        </div>

        <Filters
          dateRange={dateRange}
          setDateRange={setDateRange}
          status={status}
          setStatus={setStatus}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <KPICards />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <FleetStatusChart />
        </div>
      </div>
    </ProtectedRoute>
  );
}
