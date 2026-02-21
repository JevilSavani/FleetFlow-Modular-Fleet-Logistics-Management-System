'use client';

import { Truck, Users, Navigation, Fuel, TrendingUp } from 'lucide-react';

interface KPICard {
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  color: string;
  trend?: string;
  trendUp?: boolean;
}

const mockData: KPICard[] = [
  {
    title: 'Active Vehicles',
    value: 42,
    icon: Truck,
    color: 'blue',
    trend: '+2 this week',
    trendUp: true,
  },
  {
    title: 'Operating Drivers',
    value: 38,
    icon: Users,
    color: 'emerald',
    trend: '+1 new hire',
    trendUp: true,
  },
  {
    title: 'Active Trips',
    value: 15,
    icon: Navigation,
    color: 'amber',
    trend: '5 completed today',
    trendUp: true,
  },
  {
    title: 'Fuel Efficiency',
    value: '8.4 km/l',
    icon: Fuel,
    color: 'violet',
    trend: '+0.2 vs last week',
    trendUp: true,
  },
];

export function KPICards() {
  return (
    <>
      {mockData.map((kpi, idx) => {
        const Icon = kpi.icon;

        const palette: Record<string, { bg: string; icon: string; ring: string }> = {
          blue:    { bg: 'bg-blue-50',    icon: 'text-blue-600',    ring: 'ring-blue-200' },
          emerald: { bg: 'bg-emerald-50', icon: 'text-emerald-600', ring: 'ring-emerald-200' },
          amber:   { bg: 'bg-amber-50',   icon: 'text-amber-600',   ring: 'ring-amber-200' },
          violet:  { bg: 'bg-violet-50',  icon: 'text-violet-600',  ring: 'ring-violet-200' },
        };
        const p = palette[kpi.color] || palette.blue;

        return (
          <div
            key={kpi.title}
            className="card p-5 animate-slide-up"
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{kpi.title}</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-2">{kpi.value}</h3>
                {kpi.trend && (
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp size={12} className="text-emerald-500" />
                    <p className="text-emerald-600 text-xs font-medium">{kpi.trend}</p>
                  </div>
                )}
              </div>
              <div className={`p-3 rounded-xl ${p.bg} ring-1 ring-inset ${p.ring}`}>
                <Icon size={22} className={p.icon} />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
