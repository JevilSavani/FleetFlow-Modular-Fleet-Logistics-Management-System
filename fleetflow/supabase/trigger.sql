create or replace function set_vehicle_in_shop()
returns trigger as $$
begin
  update vehicles
  set status = 'in_shop'
  where id = new.vehicle_id;
  return new;
end;
$$ language plpgsql;

create trigger maintenance_trigger
after insert on maintenance_logs
for each row
execute function set_vehicle_in_shop();