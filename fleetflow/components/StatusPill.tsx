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
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    blue: 'bg-blue-100 text-blue-800',
    gray: 'bg-gray-100 text-gray-800',
    orange: 'bg-orange-100 text-orange-800',
  };

  const sizeClasses: Record<string, string> = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const className = `inline-flex items-center font-semibold rounded-full ${colorClasses[color] || colorClasses.gray} ${sizeClasses[size]}`;

  return (
    <span className={className}>
      {label.charAt(0).toUpperCase() + label.slice(1).replace(/_/g, ' ')}
    </span>
  );
}
