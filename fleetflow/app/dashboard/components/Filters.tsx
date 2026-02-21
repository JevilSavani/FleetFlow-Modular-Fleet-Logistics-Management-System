'use client';

import { Search, Filter } from 'lucide-react';
import { VEHICLE_STATUS } from '@/utils/constants';

interface FiltersProps {
  dateRange: { from: string; to: string };
  setDateRange: (range: { from: string; to: string }) => void;
  status: string;
  setStatus: (status: string) => void;
}

export function Filters({ dateRange, setDateRange, status, setStatus }: FiltersProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Filter size={20} className="text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From Date
          </label>
          <input
            type="date"
            value={dateRange.from}
            onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            To Date
          </label>
          <input
            type="date"
            value={dateRange.to}
            onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">All Status</option>
            {VEHICLE_STATUS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg flex items-center justify-center space-x-2 transition">
            <Search size={18} />
            <span>Apply</span>
          </button>
        </div>
      </div>
    </div>
  );
}
