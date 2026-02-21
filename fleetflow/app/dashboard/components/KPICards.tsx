'use client';

import { Truck, Users, Navigation, Fuel } from 'lucide-react';

interface KPICard {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ size: number; className?: string }>;
  color: string;
  trend?: string;
}

const mockData: KPICard[] = [
  {
    title: 'Active Vehicles',
    value: 42,
    icon: Truck,
    color: 'blue',
    trend: '+2 this week',
  },
  {
    title: 'Operating Drivers',
    value: 38,
    icon: Users,
    color: 'green',
    trend: '+1 new hire',
  },
  {
    title: 'Active Trips',
    value: 15,
    icon: Navigation,
    color: 'orange',
    trend: '5 completed today',
  },
  {
    title: 'Fuel Efficiency',
    value: '8.4 km/l',
    icon: Fuel,
    color: 'purple',
    trend: '+0.2 vs last week',
  },
];

export function KPICards() {
  return (
    <>
      {mockData.map((kpi) => {
        const Icon = kpi.icon;
        const colorClasses: Record<string, string> = {
          blue: 'bg-blue-100 text-blue-600',
          green: 'bg-green-100 text-green-600',
          orange: 'bg-orange-100 text-orange-600',
          purple: 'bg-purple-100 text-purple-600',
        };

        return (
          <div
            key={kpi.title}
            className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-gray-600 text-sm">{kpi.title}</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-2">{kpi.value}</h3>
                {kpi.trend && (
                  <p className="text-green-600 text-xs mt-2">{kpi.trend}</p>
                )}
              </div>
              <div className={`p-3 rounded-lg ${colorClasses[kpi.color]}`}>
                <Icon size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
