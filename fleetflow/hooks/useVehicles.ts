'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Vehicle, VehicleFormData } from '@/types/vehicle';

// Dummy vehicles shown when Supabase returns nothing or errors
const DUMMY_VEHICLES: Vehicle[] = [
  {
    id: 'v1', registration_number: 'DL-01-AB-1234', make: 'Tata', model: 'LPT 613', year: 2022,
    vehicle_type: 'truck', status: 'active', max_capacity: 5000, current_cargo_weight: 2200,
    mileage: 45230, purchase_date: '2022-03-15', depreciation_value: 300000, fuel_type: 'diesel',
    fuel_efficiency: 8.5, gps_tracking_enabled: true, last_service_date: '2025-12-10',
    next_service_due: '2026-03-10', insurance_expiry: '2026-08-20',
    pollution_certificate_expiry: '2026-06-15', created_at: '2022-03-15T00:00:00Z', updated_at: '2025-12-10T00:00:00Z',
  },
  {
    id: 'v2', registration_number: 'DL-02-CD-5678', make: 'Mahindra', model: 'Bolero Pickup', year: 2023,
    vehicle_type: 'van', status: 'active', max_capacity: 2000, current_cargo_weight: 800,
    mileage: 22150, purchase_date: '2023-06-01', depreciation_value: 180000, fuel_type: 'diesel',
    fuel_efficiency: 12.2, gps_tracking_enabled: true, last_service_date: '2026-01-05',
    next_service_due: '2026-04-05', insurance_expiry: '2026-11-30',
    pollution_certificate_expiry: '2026-09-20', created_at: '2023-06-01T00:00:00Z', updated_at: '2026-01-05T00:00:00Z',
  },
  {
    id: 'v3', registration_number: 'DL-03-EF-9012', make: 'Maruti Suzuki', model: 'Eeco Cargo', year: 2024,
    vehicle_type: 'van', status: 'maintenance', max_capacity: 800, current_cargo_weight: 0,
    mileage: 8700, purchase_date: '2024-01-20', depreciation_value: 70000, fuel_type: 'petrol',
    fuel_efficiency: 15.5, gps_tracking_enabled: false, last_service_date: '2026-02-01',
    next_service_due: '2026-05-01', insurance_expiry: '2027-01-20',
    pollution_certificate_expiry: '2026-07-20', created_at: '2024-01-20T00:00:00Z', updated_at: '2026-02-01T00:00:00Z',
  },
  {
    id: 'v4', registration_number: 'DL-05-IJ-7890', make: 'Ashok Leyland', model: 'BOSS 1616', year: 2021,
    vehicle_type: 'truck', status: 'active', max_capacity: 8000, current_cargo_weight: 5500,
    mileage: 92400, purchase_date: '2021-09-10', depreciation_value: 500000, fuel_type: 'diesel',
    fuel_efficiency: 6.8, gps_tracking_enabled: true, last_service_date: '2025-11-20',
    next_service_due: '2026-02-20', insurance_expiry: '2026-09-10',
    pollution_certificate_expiry: '2026-05-10', created_at: '2021-09-10T00:00:00Z', updated_at: '2025-11-20T00:00:00Z',
  },
  {
    id: 'v5', registration_number: 'MH-12-KL-3456', make: 'Eicher', model: 'Pro 2049', year: 2023,
    vehicle_type: 'truck', status: 'reserved', max_capacity: 7000, current_cargo_weight: 0,
    mileage: 31200, purchase_date: '2023-04-12', depreciation_value: 350000, fuel_type: 'diesel',
    fuel_efficiency: 7.5, gps_tracking_enabled: true, last_service_date: '2026-01-15',
    next_service_due: '2026-04-15', insurance_expiry: '2027-04-12',
    pollution_certificate_expiry: '2026-10-12', created_at: '2023-04-12T00:00:00Z', updated_at: '2026-01-15T00:00:00Z',
  },
];

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
      setVehicles(data && data.length > 0 ? data : DUMMY_VEHICLES);
    } catch (err) {
      console.warn('Using dummy vehicle data:', err);
      setVehicles(DUMMY_VEHICLES);
      setError(null);
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

  const getVehicleById = useCallback(async (id: string) => {
    try {
      const { data, error: fetchError } = await supabase
        .from('vehicles')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;
      return data;
    } catch (err) {
      // Fall back to dummy data
      const dummy = DUMMY_VEHICLES.find((v) => v.id === id);
      return dummy || DUMMY_VEHICLES[0];
    }
  }, []);

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
