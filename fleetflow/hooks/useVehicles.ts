'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Vehicle, VehicleFormData } from '@/types/vehicle';

export function useVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setVehicles(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch vehicles');
    } finally {
      setLoading(false);
    }
  };

  const createVehicle = async (formData: VehicleFormData) => {
    try {
      const { data, error: insertError } = await supabase
        .from('vehicles')
        .insert([formData])
        .select();

      if (insertError) throw insertError;
      if (data) {
        setVehicles([data[0], ...vehicles]);
      }
      return data?.[0];
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create vehicle';
      setError(message);
      throw err;
    }
  };

  const updateVehicle = async (id: string, formData: Partial<Vehicle>) => {
    try {
      const { data, error: updateError } = await supabase
        .from('vehicles')
        .update(formData)
        .eq('id', id)
        .select();

      if (updateError) throw updateError;
      if (data) {
        setVehicles(vehicles.map((v) => (v.id === id ? data[0] : v)));
      }
      return data?.[0];
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update vehicle';
      setError(message);
      throw err;
    }
  };

  const deleteVehicle = async (id: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('vehicles')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      setVehicles(vehicles.filter((v) => v.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete vehicle';
      setError(message);
      throw err;
    }
  };

  const getVehicleById = async (id: string) => {
    try {
      const { data, error: fetchError } = await supabase
        .from('vehicles')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch vehicle';
      setError(message);
      throw err;
    }
  };

  return {
    vehicles,
    loading,
    error,
    fetchVehicles,
    createVehicle,
    updateVehicle,
    deleteVehicle,
    getVehicleById,
  };
}
