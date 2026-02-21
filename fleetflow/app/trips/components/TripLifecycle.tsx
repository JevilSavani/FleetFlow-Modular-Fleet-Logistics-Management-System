'use client';

import { CheckCircle, ArrowRight, Circle } from 'lucide-react';

export function TripLifecycle() {
  const steps = [
    { label: 'Trip Created', time: 'Feb 20, 2024 08:00 AM', status: 'done' as const },
    { label: 'Trip Started', time: 'Feb 20, 2024 08:15 AM', status: 'current' as const },
    { label: 'Trip Completed', time: 'Pending', status: 'pending' as const },
  ];

  const iconMap = {
    done: <CheckCircle size={20} className="text-white" />,
    current: <ArrowRight size={20} className="text-white" />,
    pending: <Circle size={20} className="text-white" />,
  };

  const bgMap = {
    done: 'bg-emerald-500 shadow-lg shadow-emerald-500/30',
    current: 'bg-blue-500 shadow-lg shadow-blue-500/30',
    pending: 'bg-slate-300',
  };

  return (
    <div className="card p-6">
      <h2 className="text-sm font-semibold text-slate-800 mb-6">Trip Lifecycle</h2>
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={step.label} className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${bgMap[step.status]}`}>
                {iconMap[step.status]}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-0.5 h-8 mt-1 ${step.status === 'done' ? 'bg-emerald-300' : 'bg-slate-200'}`} />
              )}
            </div>
            <div>
              <p className="font-semibold text-slate-800 text-sm">{step.label}</p>
              <p className="text-slate-400 text-xs mt-0.5">{step.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
