export interface Driver {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  license_number: string;
  license_expiry: string;
  license_class: string; // HCV, LCV, etc.
  status: 'active' | 'on_leave' | 'suspended' | 'retired';
  date_of_birth: string;
  address: string;
  emergency_contact: string;
  emergency_contact_phone: string;
  joining_date: string;
  total_trips: number;
  total_distance: number;
  safety_score: number; // 0-100
  violations_count: number;
  accidents_count: number;
  average_fuel_efficiency: number;
  assigned_vehicle_id?: string;
  aadhar_number?: string;
  pan_number?: string;
  created_at: string;
  updated_at: string;
}

export interface DriverFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  license_number: string;
  license_expiry: string;
  license_class: string;
  date_of_birth: string;
  address: string;
  emergency_contact: string;
  emergency_contact_phone: string;
}

export interface SafetyMetrics {
  total_violations: number;
  total_accidents: number;
  speeding_incidents: number;
  harsh_braking_incidents: number;
  harsh_acceleration_incidents: number;
  safety_score: number;
  risk_level: 'low' | 'medium' | 'high';
}
