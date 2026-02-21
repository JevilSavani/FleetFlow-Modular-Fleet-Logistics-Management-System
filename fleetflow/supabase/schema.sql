
create extension if not exists "uuid-ossp";


create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text check (role in ('manager','dispatcher','safety','finance')) not null,
  created_at timestamp default now()
);


create table vehicles (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  model text,
  license_plate text unique not null,
  max_capacity_kg numeric not null,
  acquisition_cost numeric default 0,
  odometer numeric default 0,
  status text check (status in ('available','on_trip','in_shop','retired')) 
         default 'available',
  created_at timestamp default now()
);


create table drivers (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  license_number text unique not null,
  license_category text,
  license_expiry_date date,
  status text check (status in ('available','on_trip','off_duty','suspended')) 
         default 'available',
  safety_score numeric default 100,
  created_at timestamp default now()
);


create table trips (
  id uuid primary key default uuid_generate_v4(),
  vehicle_id uuid references vehicles(id) on delete set null,
  driver_id uuid references drivers(id) on delete set null,
  cargo_weight numeric not null,
  origin text,
  destination text,
  status text check (status in ('draft','dispatched','completed','cancelled')) 
         default 'draft',
  start_odometer numeric,
  end_odometer numeric,
  revenue numeric default 0,
  created_at timestamp default now(),
  completed_at timestamp
);


create table maintenance_logs (
  id uuid primary key default uuid_generate_v4(),
  vehicle_id uuid references vehicles(id) on delete cascade,
  service_type text,
  cost numeric default 0,
  service_date date default current_date,
  notes text,
  created_at timestamp default now()
);

create table fuel_logs (
  id uuid primary key default uuid_generate_v4(),
  vehicle_id uuid references vehicles(id) on delete cascade,
  trip_id uuid references trips(id) on delete set null,
  liters numeric not null,
  cost numeric not null,
  date date default current_date,
  created_at timestamp default now()
);