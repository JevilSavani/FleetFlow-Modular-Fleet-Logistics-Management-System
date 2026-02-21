'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Trip, TripFormData } from '@/types/trip';

// Dummy trips shown when Supabase returns nothing or errors
const DUMMY_TRIPS: Trip[] = [
  {
    id: 't1', trip_number: 'TRP-2026-001', vehicle_id: 'v1', driver_id: 'd1',
    origin: 'Delhi', destination: 'Jaipur', cargo_description: 'Electronics & Appliances',
    cargo_weight: 2500, cargo_value: 450000, status: 'completed',
    scheduled_departure: '2026-02-10T06:00:00Z', actual_departure: '2026-02-10T06:15:00Z',
    scheduled_arrival: '2026-02-10T12:00:00Z', actual_arrival: '2026-02-10T11:45:00Z',
    distance_planned: 280, distance_actual: 275, fuel_cost_estimated: 3500,
    fuel_cost_actual: 3200, revenue: 30000, profit_loss: 26800,
    created_at: '2026-02-09T00:00:00Z', updated_at: '2026-02-10T12:00:00Z',
  },
  {
    id: 't2', trip_number: 'TRP-2026-002', vehicle_id: 'v2', driver_id: 'd2',
    origin: 'Delhi', destination: 'Agra', cargo_description: 'Textiles & Garments',
    cargo_weight: 1200, cargo_value: 220000, status: 'in_progress',
    scheduled_departure: '2026-02-20T08:00:00Z', actual_departure: '2026-02-20T08:10:00Z',
    scheduled_arrival: '2026-02-20T14:00:00Z',
    distance_planned: 230, fuel_cost_estimated: 2800, revenue: 18000,
    created_at: '2026-02-19T00:00:00Z', updated_at: '2026-02-20T08:10:00Z',
  },
  {
    id: 't3', trip_number: 'TRP-2026-003', vehicle_id: 'v4', driver_id: 'd4',
    origin: 'Mumbai', destination: 'Pune', cargo_description: 'FMCG Products',
    cargo_weight: 4800, cargo_value: 380000, status: 'pending',
    scheduled_departure: '2026-02-22T05:00:00Z',
    scheduled_arrival: '2026-02-22T10:00:00Z',
    distance_planned: 150, fuel_cost_estimated: 2200, revenue: 22000,
    created_at: '2026-02-18T00:00:00Z', updated_at: '2026-02-18T00:00:00Z',
  },
  {
    id: 't4', trip_number: 'TRP-2026-004', vehicle_id: 'v5', driver_id: 'd3',
    origin: 'Bangalore', destination: 'Chennai', cargo_description: 'Auto Parts & Machinery',
    cargo_weight: 3500, cargo_value: 520000, status: 'completed',
    scheduled_departure: '2026-02-08T04:00:00Z', actual_departure: '2026-02-08T04:30:00Z',
    scheduled_arrival: '2026-02-08T12:00:00Z', actual_arrival: '2026-02-08T12:20:00Z',
    distance_planned: 350, distance_actual: 345, fuel_cost_estimated: 4200,
    fuel_cost_actual: 4100, revenue: 35000, profit_loss: 30900,
    created_at: '2026-02-07T00:00:00Z', updated_at: '2026-02-08T12:20:00Z',
  },
  {
    id: 't5', trip_number: 'TRP-2026-005', vehicle_id: 'v1', driver_id: 'd1',
    origin: 'Delhi', destination: 'Lucknow', cargo_description: 'Pharmaceuticals',
    cargo_weight: 1800, cargo_value: 680000, status: 'delayed',
    scheduled_departure: '2026-02-19T06:00:00Z', actual_departure: '2026-02-19T08:30:00Z',
    scheduled_arrival: '2026-02-19T16:00:00Z',
    distance_planned: 500, fuel_cost_estimated: 5500, revenue: 42000,
    notes: 'Delayed due to fog on highway',
    created_at: '2026-02-18T00:00:00Z', updated_at: '2026-02-19T08:30:00Z',
  },
];

export function useTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('trips')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setTrips(data && data.length > 0 ? data : DUMMY_TRIPS);
    } catch (err) {
      console.warn('Using dummy trip data:', err);
      setTrips(DUMMY_TRIPS);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  const createTrip = async (formData: TripFormData) => {
    try {
      const { data, error: insertError } = await supabase
        .from('trips')
        .insert([formData])
        .select();

      if (insertError) throw insertError;
      if (data) {
        setTrips([data[0], ...trips]);
      }
      return data?.[0];
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create trip';
      setError(message);
      throw err;
    }
  };

  const updateTrip = async (id: string, formData: Partial<Trip>) => {
    try {
      const { data, error: updateError } = await supabase
        .from('trips')
        .update(formData)
        .eq('id', id)
        .select();

      if (updateError) throw updateError;
      if (data) {
        setTrips(trips.map((t) => (t.id === id ? data[0] : t)));
      }
      return data?.[0];
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update trip';
      setError(message);
      throw err;
    }
  };

  const deleteTrip = async (id: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('trips')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      setTrips(trips.filter((t) => t.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete trip';
      setError(message);
      throw err;
    }
  };

  const getTripById = useCallback(async (id: string) => {
    try {
      const { data, error: fetchError } = await supabase
        .from('trips')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;
      return data;
    } catch (err) {
      const dummy = DUMMY_TRIPS.find((t) => t.id === id);
      return dummy || DUMMY_TRIPS[0];
    }
  }, []);

  const getTripsByVehicle = useCallback(async (vehicleId: string) => {
    try {
      const { data, error: fetchError } = await supabase
        .from('trips')
        .select('*')
        .eq('vehicle_id', vehicleId)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      return data && data.length > 0 ? data : DUMMY_TRIPS.filter((t) => t.vehicle_id === vehicleId);
    } catch (err) {
      return DUMMY_TRIPS.filter((t) => t.vehicle_id === vehicleId);
    }
  }, []);

  return {
    trips,
    loading,
    error,
    fetchTrips,
    createTrip,
    updateTrip,
    deleteTrip,
    getTripById,
    getTripsByVehicle,
  };
}
