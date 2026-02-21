'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Driver, DriverFormData } from '@/types/driver';

export function useDrivers() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('drivers')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setDrivers(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch drivers');
    } finally {
      setLoading(false);
    }
  };

  const createDriver = async (formData: DriverFormData) => {
    try {
      const { data, error: insertError } = await supabase
        .from('drivers')
        .insert([formData])
        .select();

      if (insertError) throw insertError;
      if (data) {
        setDrivers([data[0], ...drivers]);
      }
      return data?.[0];
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create driver';
      setError(message);
      throw err;
    }
  };

  const updateDriver = async (id: string, formData: Partial<Driver>) => {
    try {
      const { data, error: updateError } = await supabase
        .from('drivers')
        .update(formData)
        .eq('id', id)
        .select();

      if (updateError) throw updateError;
      if (data) {
        setDrivers(drivers.map((d) => (d.id === id ? data[0] : d)));
      }
      return data?.[0];
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update driver';
      setError(message);
      throw err;
    }
  };

  const deleteDriver = async (id: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('drivers')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      setDrivers(drivers.filter((d) => d.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete driver';
      setError(message);
      throw err;
    }
  };

  const getDriverById = async (id: string) => {
    try {
      const { data, error: fetchError } = await supabase
        .from('drivers')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch driver';
      setError(message);
      throw err;
    }
  };

  return {
    drivers,
    loading,
    error,
    fetchDrivers,
    createDriver,
    updateDriver,
    deleteDriver,
    getDriverById,
  };
}
