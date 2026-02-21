'use client';

import { Shield } from 'lucide-react';

interface SafetyScoreProps {
  score: number;
  violations: number;
  accidents: number;
  totalTrips: number;
}

export function SafetyScore({
  score,
  violations,
  accidents,
  totalTrips,
}: SafetyScoreProps) {
  const getRiskLevel = (score: number) => {
    if (score >= 80) return { label: 'Excellent', color: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' };
    if (score >= 60) return { label: 'Good', color: 'bg-blue-50 text-blue-700 ring-blue-600/20' };
    if (score >= 40) return { label: 'Fair', color: 'bg-amber-50 text-amber-700 ring-amber-600/20' };
    return { label: 'Poor', color: 'bg-red-50 text-red-700 ring-red-600/20' };
  };

  const risk = getRiskLevel(score);

  return (
    <div className="card p-6">
      <div className="flex items-center gap-2 mb-6">
        <Shield size={16} className="text-violet-600" />
        <h2 className="text-sm font-semibold text-slate-800">Safety Performance</h2>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-3">
            <span className="text-sm font-medium text-slate-600">Safety Score</span>
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ring-inset ${risk.color}`}>
              {risk.label}
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                score >= 80 ? 'bg-emerald-500' :
                score >= 60 ? 'bg-blue-500' :
                score >= 40 ? 'bg-amber-500' : 'bg-red-500'
              }`}
              style={{ width: `${score}%` }}
            />
          </div>
          <p className={`text-center text-2xl font-bold mt-3 ${
            score >= 80 ? 'text-emerald-600' :
            score >= 60 ? 'text-blue-600' :
            score >= 40 ? 'text-amber-600' : 'text-red-600'
          }`}>{score}/100</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center bg-red-50 rounded-xl p-4">
            <p className="text-xs text-slate-500 font-medium">Violations</p>
            <p className="text-2xl font-bold text-red-600 mt-1">{violations}</p>
          </div>
          <div className="text-center bg-red-50 rounded-xl p-4">
            <p className="text-xs text-slate-500 font-medium">Accidents</p>
            <p className="text-2xl font-bold text-red-600 mt-1">{accidents}</p>
          </div>
          <div className="text-center bg-blue-50 rounded-xl p-4">
            <p className="text-xs text-slate-500 font-medium">Total Trips</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">{totalTrips}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
