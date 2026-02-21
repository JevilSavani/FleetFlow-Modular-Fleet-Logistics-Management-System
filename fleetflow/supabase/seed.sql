-- Sample Vehicles Data
INSERT INTO vehicles (registration_number, make, model, year, vehicle_type, status, max_capacity, fuel_type, fuel_efficiency, purchase_date, insurance_expiry, pollution_certificate_expiry) VALUES
('DL-01-AB-1234', 'Tata', 'LPT 613', 2022, 'truck', 'active', 5000, 'diesel', 8.5, '2022-03-15', '2025-03-15', '2025-06-15'),
('DL-02-CD-5678', 'Mahindra', 'Bolero', 2021, 'van', 'active', 2000, 'diesel', 10.2, '2021-06-20', '2025-06-20', '2025-08-20'),
('DL-03-EF-9012', 'Maruti', 'Swift', 2023, 'car', 'active', 800, 'petrol', 15.5, '2023-01-10', '2025-12-10', '2025-12-10'),
('DL-04-GH-3456', 'Hyundai', 'Creta', 2022, 'sedan', 'maintenance', 900, 'diesel', 14.2, '2022-09-05', '2025-09-05', '2025-11-05'),
('DL-05-IJ-7890', 'Ashok Leyland', 'S9', 2021, 'bus', 'active', 8000, 'diesel', 6.5, '2021-04-12', '2025-04-12', '2025-07-12'),
('DL-06-KL-2345', 'Tata', '407', 2023, 'truck', 'active', 4000, 'diesel', 8.8, '2023-02-28', '2026-02-28', '2026-05-28'),
('DL-07-MN-6789', 'Force', 'Trax', 2022, 'van', 'reserved', 1500, 'diesel', 11.0, '2022-07-14', '2025-07-14', '2025-09-14'),
('DL-08-OP-0123', 'Tata', 'Nexon', 2023, 'car', 'active', 700, 'petrol', 16.0, '2023-05-22', '2026-05-22', '2026-07-22');

-- Sample Drivers Data
INSERT INTO drivers (first_name, last_name, email, phone, license_number, license_expiry, license_class, status, joining_date, safety_score) VALUES
('Rajesh', 'Kumar', 'rajesh@fleetflow.com', '9876543210', 'DL0120000001234', '2026-05-15', 'HCV', 'active', '2021-03-20', 95),
('Priya', 'Singh', 'priya@fleetflow.com', '9876543211', 'DL0120000001235', '2026-08-20', 'HCV', 'active', '2022-01-10', 92),
('Mohammad', 'Ali', 'mohammad@fleetflow.com', '9876543212', 'DL0120000001236', '2025-10-12', 'LCV', 'active', '2020-06-15', 85),
('Deepak', 'Patel', 'deepak@fleetflow.com', '9876543213', 'DL0120000001237', '2025-12-05', 'HCV', 'on_leave', '2021-11-30', 88),
('Meera', 'Sharma', 'meera@fleetflow.com', '9876543214', 'DL0120000001238', '2026-03-18', 'HCV', 'active', '2022-04-05', 90),
('Amit', 'Verma', 'amit@fleetflow.com', '9876543215', 'DL0120000001239', '2026-07-22', 'LCV', 'active', '2021-08-12', 87),
('Harpreet', 'Kaur', 'harpreet@fleetflow.com', '9876543216', 'DL0120000001240', '2025-09-08', 'LCV', 'suspended', '2023-02-20', 72),
('Suresh', 'Nair', 'suresh@fleetflow.com', '9876543217', 'DL0120000001241', '2026-01-30', 'HCV', 'active', '2020-05-14', 94);

-- Sample Trips Data
INSERT INTO trips (trip_number, vehicle_id, driver_id, origin, destination, cargo_description, cargo_weight, scheduled_departure, scheduled_arrival, status, distance_planned) VALUES
('TR-001-2024', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'f47ac10b-58cc-4372-a567-0e02b2c3d480', 'Delhi', 'Jaipur', 'Electronics Equipment', 2500, '2024-02-20 08:00:00', '2024-02-20 14:00:00', 'completed', 250),
('TR-002-2024', 'f47ac10b-58cc-4372-a567-0e02b2c3d481', 'f47ac10b-58cc-4372-a567-0e02b2c3d482', 'Mumbai', 'Pune', 'Agricultural Products', 1800, '2024-02-21 06:00:00', '2024-02-21 12:00:00', 'in_progress', 150),
('TR-003-2024', 'f47ac10b-58cc-4372-a567-0e02b2c3d483', 'f47ac10b-58cc-4372-a567-0e02b2c3d484', 'Bangalore', 'Hyderabad', 'Textile Materials', 3200, '2024-02-22 09:00:00', '2024-02-23 09:00:00', 'pending', 580),
('TR-004-2024', 'f47ac10b-58cc-4372-a567-0e02b2c3d485', 'f47ac10b-58cc-4372-a567-0e02b2c3d486', 'Delhi', 'Chandigarh', 'Pharmaceutical Items', 900, '2024-02-19 10:00:00', '2024-02-19 14:30:00', 'completed', 250);

-- Sample Expenses Data
INSERT INTO expenses (vehicle_id, trip_id, expense_type, amount, date, description, status, fuel_quantity) VALUES
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'f47ac10b-58cc-4372-a567-0e02b2c3d487', 'fuel', 3500, '2024-02-20', 'Diesel - 40 liters @ 87.5/liter', 'approved', 40),
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'f47ac10b-58cc-4372-a567-0e02b2c3d488', 'toll', 450, '2024-02-21', 'Highway Toll - Delhi to Jaipur', 'approved', NULL),
('f47ac10b-58cc-4372-a567-0e02b2c3d483', NULL, 'maintenance', 8000, '2024-02-18', 'Engine Oil Change and Filter Replacement', 'approved', NULL),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', NULL, 'fuel', 2800, '2024-02-19', 'Diesel - 32 liters @ 87.5/liter', 'pending', 32),
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'f47ac10b-58cc-4372-a567-0e02b2c3d489', 'parking', 200, '2024-02-20', 'Parking at Mumbai Station', 'approved', NULL),
('f47ac10b-58cc-4372-a567-0e02b2c3d485', 'f47ac10b-58cc-4372-a567-0e02b2c3d490', 'fuel', 2200, '2024-02-19', 'Diesel - 25 liters @ 88/liter', 'approved', 25);

-- Sample Maintenance Data
INSERT INTO maintenance (vehicle_id, service_type, amount, date, description, parts_replaced, mechanic_name, status) VALUES
('f47ac10b-58cc-4372-a567-0e02b2c3d483', 'routine', 5000, '2024-02-15', 'Regular Service - Oil and Filter Change', 'Engine Oil Filter', 'Delhi Auto Service', 'completed'),
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'repair', 8500, '2024-02-10', 'Brake System Repair', 'Brake Pads, Rotors', 'RAJ Service Center', 'completed'),
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'inspection', 2000, '2024-02-18', 'Vehicle Safety Inspection', NULL, 'Authorized Service Center', 'completed'),
('f47ac10b-58cc-4372-a567-0e02b2c3d485', 'urgent', 12000, '2024-02-17', 'Transmission Fluid Replacement', 'Transmission Fluid', 'Premium Auto Services', 'pending');

-- Trip Lifecycle Events Sample Data
INSERT INTO trip_lifecycle_events (trip_id, event_type, timestamp, location, notes) VALUES
('f47ac10b-58cc-4372-a567-0e02b2c3d487', 'created', '2024-02-19 18:30:00', 'Delhi', 'Trip created by Manager'),
('f47ac10b-58cc-4372-a567-0e02b2c3d487', 'started', '2024-02-20 08:15:00', 'Delhi', 'Driver started journey'),
('f47ac10b-58cc-4372-a567-0e02b2c3d487', 'completed', '2024-02-20 13:45:00', 'Jaipur', 'Trip completed successfully'),
('f47ac10b-58cc-4372-a567-0e02b2c3d488', 'created', '2024-02-20 22:00:00', 'Mumbai', 'Trip created'),
('f47ac10b-58cc-4372-a567-0e02b2c3d488', 'started', '2024-02-21 06:30:00', 'Mumbai', 'Vehicle departed from origin');
