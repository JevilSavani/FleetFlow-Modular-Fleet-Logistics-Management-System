create view vehicle_financial_summary as
select
  v.id,
  v.name,
  v.acquisition_cost,
  coalesce(sum(t.revenue),0) as total_revenue,
  coalesce(sum(f.cost),0) as total_fuel_cost,
  coalesce(sum(m.cost),0) as total_maintenance_cost,
  (
    coalesce(sum(t.revenue),0) -
    (coalesce(sum(f.cost),0) + coalesce(sum(m.cost),0))
  ) / nullif(v.acquisition_cost,0) as roi
from vehicles v
left join trips t on v.id = t.vehicle_id
left join fuel_logs f on v.id = f.vehicle_id
left join maintenance_logs m on v.id = m.vehicle_id
group by v.id;