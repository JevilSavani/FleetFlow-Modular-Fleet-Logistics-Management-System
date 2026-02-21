'use client';

import { getVehicleStatusColor, getTripStatusColor, getDriverStatusColor } from '@/utils/statusHelpers';

interface StatusPillProps {
  status: string;
  type?: 'vehicle' | 'trip' | 'driver';
  size?: 'sm' | 'md' | 'lg';
}

export function StatusPill({ status, type = 'vehicle', size = 'md' }: StatusPillProps) {
  let color = 'gray';
  let label = status;

  if (type === 'vehicle') {
    color = getVehicleStatusColor(status);
  } else if (type === 'trip') {
    color = getTripStatusColor(status);
  } else if (type === 'driver') {
    color = getDriverStatusColor(status);
  }

  const colorClasses: Record<string, string> = {
    green:  'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
    red:    'bg-red-50 text-red-700 ring-red-600/20',
    yellow: 'bg-amber-50 text-amber-700 ring-amber-600/20',
    blue:   'bg-blue-50 text-blue-700 ring-blue-600/20',
    gray:   'bg-slate-100 text-slate-600 ring-slate-500/20',
    orange: 'bg-orange-50 text-orange-700 ring-orange-600/20',
  };

  const sizeClasses: Record<string, string> = {
    sm: 'px-2.5 py-0.5 text-[11px]',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm',
  };

  const dotColors: Record<string, string> = {
    green:  'bg-emerald-500',
    red:    'bg-red-500',
    yellow: 'bg-amber-500',
    blue:   'bg-blue-500',
    gray:   'bg-slate-400',
    orange: 'bg-orange-500',
  };

  const className = `inline-flex items-center gap-1.5 font-semibold rounded-full ring-1 ring-inset ${colorClasses[color] || colorClasses.gray} ${sizeClasses[size]}`;

  return (
    <span className={className}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColors[color] || dotColors.gray}`} />
      {label.charAt(0).toUpperCase() + label.slice(1).replace(/_/g, ' ')}
    </span>
  );
}
