'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Trip, TripFormData } from '@/types/trip';

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
      setTrips(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch trips');
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

  const getTripById = async (id: string) => {
    try {
      const { data, error: fetchError } = await supabase
        .from('trips')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch trip';
      setError(message);
      throw err;
    }
  };

  const getTripsByVehicle = async (vehicleId: string) => {
    try {
      const { data, error: fetchError } = await supabase
        .from('trips')
        .select('*')
        .eq('vehicle_id', vehicleId)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      return data || [];
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch vehicle trips';
      setError(message);
      throw err;
    }
  };

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
