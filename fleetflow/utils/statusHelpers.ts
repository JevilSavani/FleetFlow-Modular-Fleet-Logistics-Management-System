import { VEHICLE_STATUS, DRIVER_STATUS, TRIP_STATUS, SAFETY_SCORE_RANGES } from './constants';

export function getVehicleStatusColor(status: string): string {
  const statusObj = VEHICLE_STATUS.find((s) => s.value === status);
  return statusObj?.color || 'gray';
}

export function getVehicleStatusLabel(status: string): string {
  const statusObj = VEHICLE_STATUS.find((s) => s.value === status);
  return statusObj?.label || 'Unknown';
}

export function getDriverStatusColor(status: string): string {
  const statusObj = DRIVER_STATUS.find((s) => s.value === status);
  return statusObj?.color || 'gray';
}

export function getDriverStatusLabel(status: string): string {
  const statusObj = DRIVER_STATUS.find((s) => s.value === status);
  return statusObj?.label || 'Unknown';
}

export function getTripStatusColor(status: string): string {
  const statusObj = TRIP_STATUS.find((s) => s.value === status);
  return statusObj?.color || 'gray';
}

export function getTripStatusLabel(status: string): string {
  const statusObj = TRIP_STATUS.find((s) => s.value === status);
  return statusObj?.label || 'Unknown';
}

export function getSafetyScoreColor(score: number): string {
  const range = SAFETY_SCORE_RANGES.find((r) => score >= r.min && score <= r.max);
  return range?.color || 'gray';
}

export function getSafetyScoreLabel(score: number): string {
  const range = SAFETY_SCORE_RANGES.find((r) => score >= r.min && score <= r.max);
  return range?.label || 'Unknown';
}

export function isAlertStatus(status: string, type: 'vehicle' | 'driver' | 'trip'): boolean {
  const alertStatuses = {
    vehicle: ['maintenance', 'retired'],
    driver: ['suspended', 'on_leave'],
    trip: ['cancelled', 'delayed'],
  };

  return alertStatuses[type].includes(status);
}

export function getStatusIcon(status: string, type: 'vehicle' | 'driver' | 'trip'): string {
  const icons: Record<string, Record<string, string>> = {
    vehicle: {
      active: '🚗',
      maintenance: '🔧',
      retired: '⛔',
      reserved: '📅',
    },
    driver: {
      active: '👤',
      on_leave: '🏖️',
      suspended: '🚫',
      retired: '🏁',
    },
    trip: {
      pending: '⏱️',
      in_progress: '🚀',
      completed: '✅',
      cancelled: '❌',
      delayed: '⏰',
    },
  };

  return icons[type]?.[status] || '❓';
}

export function formatVehicleType(type: string): string {
  const types: Record<string, string> = {
    truck: 'Commercial Truck',
    van: 'Delivery Van',
    car: 'Compact Car',
    sedan: 'Luxury Sedan',
    bus: 'Passenger Bus',
  };

  return types[type] || 'Unknown';
}

export function isExpiringSoon(expiryDate: string, daysThreshold: number = 30): boolean {
  const expiry = new Date(expiryDate);
  const today = new Date();
  const daysUntilExpiry = Math.floor(
    (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  return daysUntilExpiry <= daysThreshold && daysUntilExpiry >= 0;
}

export function daysUntilExpiry(expiryDate: string): number {
  const expiry = new Date(expiryDate);
  const today = new Date();
  return Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export function isExpired(expiryDate: string): boolean {
  return new Date(expiryDate) < new Date();
}
