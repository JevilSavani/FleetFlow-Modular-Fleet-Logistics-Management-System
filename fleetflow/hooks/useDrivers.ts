'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Driver, DriverFormData } from '@/types/driver';

// Dummy drivers shown when Supabase returns nothing or errors
const DUMMY_DRIVERS: Driver[] = [
  {
    id: 'd1', first_name: 'Rajesh', last_name: 'Kumar', email: 'rajesh.kumar@fleet.com',
    phone: '+91 98765 43210', license_number: 'DL0120000001234', license_expiry: '2026-05-15',
    license_class: 'HCV', status: 'active', date_of_birth: '1988-04-12', address: '42 MG Road, Delhi',
    emergency_contact: 'Sunita Kumar', emergency_contact_phone: '+91 98765 43211',
    joining_date: '2020-01-10', total_trips: 342, total_distance: 128500,
    safety_score: 95, violations_count: 1, accidents_count: 0, average_fuel_efficiency: 8.4,
    assigned_vehicle_id: 'v1', created_at: '2020-01-10T00:00:00Z', updated_at: '2026-02-01T00:00:00Z',
  },
  {
    id: 'd2', first_name: 'Priya', last_name: 'Singh', email: 'priya.singh@fleet.com',
    phone: '+91 87654 32109', license_number: 'DL0120000001235', license_expiry: '2026-08-20',
    license_class: 'HCV', status: 'active', date_of_birth: '1992-07-25', address: '18 Nehru Place, Delhi',
    emergency_contact: 'Amit Singh', emergency_contact_phone: '+91 87654 32110',
    joining_date: '2021-03-15', total_trips: 218, total_distance: 84200,
    safety_score: 92, violations_count: 0, accidents_count: 0, average_fuel_efficiency: 9.1,
    assigned_vehicle_id: 'v2', created_at: '2021-03-15T00:00:00Z', updated_at: '2026-01-20T00:00:00Z',
  },
  {
    id: 'd3', first_name: 'Mohammad', last_name: 'Ali', email: 'mohammad.ali@fleet.com',
    phone: '+91 76543 21098', license_number: 'DL0120000001236', license_expiry: '2026-10-12',
    license_class: 'LCV', status: 'active', date_of_birth: '1995-11-08', address: '7 Lajpat Nagar, Delhi',
    emergency_contact: 'Fatima Ali', emergency_contact_phone: '+91 76543 21099',
    joining_date: '2022-06-01', total_trips: 156, total_distance: 52300,
    safety_score: 85, violations_count: 2, accidents_count: 0, average_fuel_efficiency: 11.5,
    created_at: '2022-06-01T00:00:00Z', updated_at: '2026-02-10T00:00:00Z',
  },
  {
    id: 'd4', first_name: 'Meera', last_name: 'Sharma', email: 'meera.sharma@fleet.com',
    phone: '+91 65432 10987', license_number: 'DL0120000001238', license_expiry: '2026-03-18',
    license_class: 'HCV', status: 'on_leave', date_of_birth: '1990-02-14', address: '25 Saket, Delhi',
    emergency_contact: 'Vikram Sharma', emergency_contact_phone: '+91 65432 10988',
    joining_date: '2019-08-20', total_trips: 410, total_distance: 165800,
    safety_score: 90, violations_count: 1, accidents_count: 1, average_fuel_efficiency: 7.8,
    assigned_vehicle_id: 'v4', created_at: '2019-08-20T00:00:00Z', updated_at: '2026-02-15T00:00:00Z',
  },
];

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
      setDrivers(data && data.length > 0 ? data : DUMMY_DRIVERS);
    } catch (err) {
      console.warn('Using dummy driver data:', err);
      setDrivers(DUMMY_DRIVERS);
      setError(null);
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

  const getDriverById = useCallback(async (id: string) => {
    try {
      const { data, error: fetchError } = await supabase
        .from('drivers')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;
      return data;
    } catch (err) {
      const dummy = DUMMY_DRIVERS.find((d) => d.id === id);
      return dummy || DUMMY_DRIVERS[0];
    }
  }, []);

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
