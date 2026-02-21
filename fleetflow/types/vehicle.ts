export interface Vehicle {
  id: string;
  registration_number: string;
  make: string;
  model: string;
  year: number;
  vehicle_type: 'truck' | 'van' | 'car' | 'sedan' | 'bus';
  status: 'active' | 'maintenance' | 'retired' | 'reserved';
  max_capacity: number; // kg
  current_cargo_weight: number; // kg
  mileage: number;
  purchase_date: string;
  depreciation_value: number;
  fuel_type: 'diesel' | 'petrol' | 'electric' | 'hybrid';
  fuel_efficiency: number; // km/l
  gps_tracking_enabled: boolean;
  last_service_date: string;
  next_service_due: string;
  insurance_expiry: string;
  pollution_certificate_expiry: string;
  created_at: string;
  updated_at: string;
  assigned_driver_id?: string;
}

export interface VehicleFormData {
  registration_number: string;
  make: string;
  model: string;
  year: number;
  vehicle_type: 'truck' | 'van' | 'car' | 'sedan' | 'bus';
  max_capacity: number;
  fuel_type: 'diesel' | 'petrol' | 'electric' | 'hybrid';
  fuel_efficiency: number;
  purchase_date: string;
  insurance_expiry: string;
  pollution_certificate_expiry: string;
}
