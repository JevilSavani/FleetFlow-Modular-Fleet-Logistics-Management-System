'use client';

import { Search, SlidersHorizontal } from 'lucide-react';
import { VEHICLE_STATUS } from '@/utils/constants';

interface FiltersProps {
  dateRange: { from: string; to: string };
  setDateRange: (range: { from: string; to: string }) => void;
  status: string;
  setStatus: (status: string) => void;
}

export function Filters({ dateRange, setDateRange, status, setStatus }: FiltersProps) {
  return (
    <div className="card p-5">
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal size={16} className="text-blue-600" />
        <h3 className="text-sm font-semibold text-slate-700">Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">
            From Date
          </label>
          <input
            type="date"
            value={dateRange.from}
            onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
            className="input-field text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">
            To Date
          </label>
          <input
            type="date"
            value={dateRange.to}
            onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
            className="input-field text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="input-field text-sm"
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
          <button className="btn-primary w-full py-2.5 text-sm">
            <Search size={16} />
            <span>Apply</span>
          </button>
        </div>
      </div>
    </div>
  );
}
