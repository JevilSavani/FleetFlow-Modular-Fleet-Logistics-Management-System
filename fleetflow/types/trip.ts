export interface Trip {
  id: string;
  trip_number: string;
  vehicle_id: string;
  driver_id: string;
  origin: string;
  destination: string;
  origin_lat?: number;
  origin_lng?: number;
  destination_lat?: number;
  destination_lng?: number;
  cargo_description: string;
  cargo_weight: number; // kg
  cargo_value?: number; // currency
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled' | 'delayed';
  scheduled_departure: string;
  actual_departure?: string;
  scheduled_arrival: string;
  actual_arrival?: string;
  distance_planned: number; // km
  distance_actual?: number; // km
  fuel_cost_estimated?: number;
  fuel_cost_actual?: number;
  additional_expenses?: number;
  revenue?: number;
  profit_loss?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface TripFormData {
  vehicle_id: string;
  driver_id: string;
  origin: string;
  destination: string;
  cargo_description: string;
  cargo_weight: number;
  cargo_value?: number;
  scheduled_departure: string;
  scheduled_arrival: string;
  distance_planned: number;
  notes?: string;
}

export interface TripLifecycleEvent {
  trip_id: string;
  event_type: 'created' | 'started' | 'in_progress' | 'completed' | 'delayed' | 'cancelled';
  timestamp: string;
  location?: string;
  notes?: string;
}
