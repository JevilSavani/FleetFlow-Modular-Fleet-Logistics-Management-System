insert into vehicles (name, model, license_plate, max_capacity_kg, acquisition_cost)
values
('Tata LPT 613', 'LPT 613', 'DL-01-AB-1234', 5000, 1500000),
('Mahindra Bolero', 'Bolero', 'DL-02-CD-5678', 2000, 900000),
('Maruti Swift', 'Swift', 'DL-03-EF-9012', 800, 700000),
('Ashok Leyland S9', 'S9', 'DL-05-IJ-7890', 8000, 2500000);

insert into drivers (full_name, license_number, license_category, license_expiry_date, safety_score)
values
('Rajesh Kumar', 'DL0120000001234', 'HCV', '2026-05-15', 95),
('Priya Singh', 'DL0120000001235', 'HCV', '2026-08-20', 92),
('Mohammad Ali', 'DL0120000001236', 'LCV', '2025-10-12', 85),
('Meera Sharma', 'DL0120000001238', 'HCV', '2026-03-18', 90);

insert into trips (
  vehicle_id,
  driver_id,
  cargo_weight,
  origin,
  destination,
  status,
  revenue,
  start_odometer,
  end_odometer
)
values
(
  (select id from vehicles where license_plate = 'DL-01-AB-1234'),
  (select id from drivers where license_number = 'DL0120000001234'),
  2500,
  'Delhi',
  'Jaipur',
  'completed',
  30000,
  10000,
  10250
);

insert into maintenance_logs (
  vehicle_id,
  service_type,
  cost
)
values
(
  (select id from vehicles where license_plate = 'DL-02-CD-5678'),
  'Oil Change',
  5000
);

insert into fuel_logs (
  vehicle_id,
  liters,
  cost
)
values
(
  (select id from vehicles where license_plate = 'DL-01-AB-1234'),
  40,
  3500
);