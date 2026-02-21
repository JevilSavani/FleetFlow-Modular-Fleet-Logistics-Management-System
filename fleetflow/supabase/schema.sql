-- Vehicles Table
CREATE TABLE vehicles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  registration_number VARCHAR(50) NOT NULL UNIQUE,
  make VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  year INT NOT NULL,
  vehicle_type VARCHAR(50) NOT NULL CHECK (vehicle_type IN ('truck', 'van', 'car', 'sedan', 'bus')),
  status VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'maintenance', 'retired', 'reserved')),
  max_capacity DECIMAL(10, 2) NOT NULL,
  current_cargo_weight DECIMAL(10, 2) DEFAULT 0,
  mileage DECIMAL(10, 2) DEFAULT 0,
  purchase_date DATE,
  depreciation_value DECIMAL(12, 2),
  fuel_type VARCHAR(50) NOT NULL CHECK (fuel_type IN ('diesel', 'petrol', 'electric', 'hybrid')),
  fuel_efficiency DECIMAL(5, 2) NOT NULL,
  gps_tracking_enabled BOOLEAN DEFAULT false,
  last_service_date DATE,
  next_service_due DATE,
  insurance_expiry DATE,
  pollution_certificate_expiry DATE,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Drivers Table
CREATE TABLE drivers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(20) NOT NULL,
  license_number VARCHAR(50) NOT NULL UNIQUE,
  license_expiry DATE NOT NULL,
  license_class VARCHAR(50),
  status VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'on_leave', 'suspended', 'retired')),
  date_of_birth DATE,
  address VARCHAR(255),
  emergency_contact VARCHAR(100),
  emergency_contact_phone VARCHAR(20),
  joining_date DATE,
  total_trips INT DEFAULT 0,
  total_distance DECIMAL(10, 2) DEFAULT 0,
  safety_score INT DEFAULT 100 CHECK (safety_score >= 0 AND safety_score <= 100),
  violations_count INT DEFAULT 0,
  accidents_count INT DEFAULT 0,
  average_fuel_efficiency DECIMAL(5, 2),
  assigned_vehicle_id UUID REFERENCES vehicles(id),
  aadhar_number VARCHAR(50),
  pan_number VARCHAR(50),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Trips Table
CREATE TABLE trips (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trip_number VARCHAR(50) NOT NULL UNIQUE,
  vehicle_id UUID NOT NULL REFERENCES vehicles(id),
  driver_id UUID NOT NULL REFERENCES drivers(id),
  origin VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  origin_lat DECIMAL(10, 8),
  origin_lng DECIMAL(11, 8),
  destination_lat DECIMAL(10, 8),
  destination_lng DECIMAL(11, 8),
  cargo_description TEXT,
  cargo_weight DECIMAL(10, 2) NOT NULL,
  cargo_value DECIMAL(12, 2),
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled', 'delayed')),
  scheduled_departure TIMESTAMP NOT NULL,
  actual_departure TIMESTAMP,
  scheduled_arrival TIMESTAMP NOT NULL,
  actual_arrival TIMESTAMP,
  distance_planned DECIMAL(10, 2),
  distance_actual DECIMAL(10, 2),
  fuel_cost_estimated DECIMAL(12, 2),
  fuel_cost_actual DECIMAL(12, 2),
  additional_expenses DECIMAL(12, 2),
  revenue DECIMAL(12, 2),
  profit_loss DECIMAL(12, 2),
  notes TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Expenses Table
CREATE TABLE expenses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vehicle_id UUID NOT NULL REFERENCES vehicles(id),
  trip_id UUID REFERENCES trips(id),
  expense_type VARCHAR(50) NOT NULL CHECK (expense_type IN ('fuel', 'maintenance', 'toll', 'parking', 'insurance', 'fine', 'other')),
  amount DECIMAL(12, 2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'INR',
  date DATE NOT NULL,
  description TEXT,
  receipt_url VARCHAR(255),
  odometer_reading DECIMAL(10, 2),
  fuel_quantity DECIMAL(8, 2),
  fuel_unit_price DECIMAL(8, 2),
  approved_by VARCHAR(100),
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Maintenance Table
CREATE TABLE maintenance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vehicle_id UUID NOT NULL REFERENCES vehicles(id),
  service_type VARCHAR(50) NOT NULL CHECK (service_type IN ('routine', 'repair', 'inspection', 'urgent')),
  amount DECIMAL(12, 2) NOT NULL,
  date DATE NOT NULL,
  description TEXT,
  parts_replaced TEXT,
  mechanic_name VARCHAR(100),
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Trip Lifecycle Events Table
CREATE TABLE trip_lifecycle_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trip_id UUID NOT NULL REFERENCES trips(id),
  event_type VARCHAR(50) NOT NULL CHECK (event_type IN ('created', 'started', 'in_progress', 'completed', 'delayed', 'cancelled')),
  timestamp TIMESTAMP DEFAULT now(),
  location VARCHAR(255),
  notes TEXT
);

-- Create Indexes for Performance
CREATE INDEX idx_vehicles_status ON vehicles(status);
CREATE INDEX idx_vehicles_registration ON vehicles(registration_number);
CREATE INDEX idx_drivers_status ON drivers(status);
CREATE INDEX idx_drivers_license_number ON drivers(license_number);
CREATE INDEX idx_trips_vehicle ON trips(vehicle_id);
CREATE INDEX idx_trips_driver ON trips(driver_id);
CREATE INDEX idx_trips_status ON trips(status);
CREATE INDEX idx_expenses_vehicle ON expenses(vehicle_id);
CREATE INDEX idx_expenses_type ON expenses(expense_type);
CREATE INDEX idx_maintenance_vehicle ON maintenance(vehicle_id);

-- Create Updated At Trigger Functions
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create Triggers
CREATE TRIGGER update_vehicles_updated_at BEFORE UPDATE ON vehicles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_drivers_updated_at BEFORE UPDATE ON drivers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trips_updated_at BEFORE UPDATE ON trips
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_expenses_updated_at BEFORE UPDATE ON expenses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_maintenance_updated_at BEFORE UPDATE ON maintenance
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
