'use client';

import { User } from 'lucide-react';

interface DriverProfileProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  licenseNumber: string;
  status: string;
}

export function DriverProfile({
  firstName,
  lastName,
  email,
  phone,
  licenseNumber,
  status,
}: DriverProfileProps) {
  return (
    <div className="card p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
            <User size={26} className="text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {firstName} {lastName}
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">License: {licenseNumber}</p>
          </div>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ring-inset ${
            status === 'active'
              ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20'
              : 'bg-red-50 text-red-700 ring-red-600/20'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${status === 'active' ? 'bg-emerald-500' : 'bg-red-500'}`} />
          {status}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs text-slate-500 font-medium">Email</p>
          <p className="font-semibold text-slate-900 text-sm mt-0.5">{email}</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs text-slate-500 font-medium">Phone</p>
          <p className="font-semibold text-slate-900 text-sm mt-0.5">{phone}</p>
        </div>
      </div>
    </div>
  );
}
