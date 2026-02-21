export const APP_NAME = 'FleetFlow';
export const APP_VERSION = '1.0.0';

export const VEHICLE_TYPES = [
  { value: 'truck', label: 'Truck' },
  { value: 'van', label: 'Van' },
  { value: 'car', label: 'Car' },
  { value: 'sedan', label: 'Sedan' },
  { value: 'bus', label: 'Bus' },
];

export const VEHICLE_STATUS = [
  { value: 'active', label: 'Active', color: 'green' },
  { value: 'maintenance', label: 'Maintenance', color: 'yellow' },
  { value: 'retired', label: 'Retired', color: 'red' },
  { value: 'reserved', label: 'Reserved', color: 'blue' },
];

export const FUEL_TYPES = [
  { value: 'diesel', label: 'Diesel' },
  { value: 'petrol', label: 'Petrol' },
  { value: 'electric', label: 'Electric' },
  { value: 'hybrid', label: 'Hybrid' },
];

export const DRIVER_STATUS = [
  { value: 'active', label: 'Active', color: 'green' },
  { value: 'on_leave', label: 'On Leave', color: 'yellow' },
  { value: 'suspended', label: 'Suspended', color: 'red' },
  { value: 'retired', label: 'Retired', color: 'gray' },
];

export const TRIP_STATUS = [
  { value: 'pending', label: 'Pending', color: 'gray' },
  { value: 'in_progress', label: 'In Progress', color: 'blue' },
  { value: 'completed', label: 'Completed', color: 'green' },
  { value: 'cancelled', label: 'Cancelled', color: 'red' },
  { value: 'delayed', label: 'Delayed', color: 'orange' },
];

export const EXPENSE_TYPES = [
  { value: 'fuel', label: 'Fuel' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'toll', label: 'Toll' },
  { value: 'parking', label: 'Parking' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'fine', label: 'Fine' },
  { value: 'other', label: 'Other' },
];

export const EXPENSE_STATUS = [
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];

export const LICENSE_CLASSES = [
  'HCV (Heavy Commercial Vehicle)',
  'LCV (Light Commercial Vehicle)',
  'MCWG (Motorcycle with Gear)',
  'MCNG (Motorcycle without Gear)',
];

export const SERVICE_INTERVALS = {
  routine: 10000, // km
  inspection: 30000, // km
  major: 100000, // km
};

export const DASHBOARD_REFRESH_INTERVAL = 30000; // 30 seconds

export const DEFAULT_PAGINATION_LIMIT = 20;

export const CURRENCY = {
  symbol: '₹',
  code: 'INR',
};

export const DISTANCE_UNIT = 'km';
export const WEIGHT_UNIT = 'kg';
export const VOLUME_UNIT = 'cbm';

export const SAFETY_SCORE_RANGES = [
  { min: 80, max: 100, label: 'Excellent', color: 'green' },
  { min: 60, max: 79, label: 'Good', color: 'blue' },
  { min: 40, max: 59, label: 'Fair', color: 'yellow' },
  { min: 0, max: 39, label: 'Poor', color: 'red' },
];

export const FUEL_EFFICIENCY_TARGETS = {
  truck: 8,
  van: 12,
  car: 15,
  sedan: 18,
  bus: 6,
};
