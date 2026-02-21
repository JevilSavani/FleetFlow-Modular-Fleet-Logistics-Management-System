'use client';

import { useState } from 'react';
import { VehicleFormData } from '@/types/vehicle';
import { useVehicles } from '@/hooks/useVehicles';
import { useRouter } from 'next/navigation';
import { VEHICLE_TYPES, FUEL_TYPES } from '@/utils/constants';
import { validateVehicleForm } from '@/lib/validations';
import { Save } from 'lucide-react';

export function VehicleForm() {
  const [formData, setFormData] = useState<VehicleFormData>({
    registration_number: '',
    make: '',
    model: '',
    year: new Date().getFullYear(),
    vehicle_type: 'truck',
    max_capacity: 0,
    fuel_type: 'diesel',
    fuel_efficiency: 0,
    purchase_date: '',
    insurance_expiry: '',
    pollution_certificate_expiry: '',
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { createVehicle } = useVehicles();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'year' || name === 'max_capacity' || name === 'fuel_efficiency' ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateVehicleForm(formData);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await createVehicle(formData);
      router.push('/vehicles');
    } catch (err) {
      setErrors(['Failed to create vehicle']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div className="card p-6 space-y-6">
        {errors.length > 0 && (
          <div className="alert-error">
            {errors.map((error, i) => (
              <p key={i} className="text-sm">{error}</p>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">
              Registration Number *
            </label>
            <input
              type="text"
              name="registration_number"
              value={formData.registration_number}
              onChange={handleChange}
              placeholder="DL-01-AB-1234"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">
              Vehicle Type *
            </label>
            <select
              name="vehicle_type"
              value={formData.vehicle_type}
              onChange={handleChange}
              className="input-field"
            >
              {VEHICLE_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">
              Make *
            </label>
            <input
              type="text"
              name="make"
              value={formData.make}
              onChange={handleChange}
              placeholder="Tata"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">
              Model *
            </label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              placeholder="LPT 613"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">
              Year *
            </label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">
              Fuel Type *
            </label>
            <select
              name="fuel_type"
              value={formData.fuel_type}
              onChange={handleChange}
              className="input-field"
            >
              {FUEL_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">
              Max Capacity (kg) *
            </label>
            <input
              type="number"
              name="max_capacity"
              value={formData.max_capacity}
              onChange={handleChange}
              placeholder="5000"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">
              Fuel Efficiency (km/l) *
            </label>
            <input
              type="number"
              name="fuel_efficiency"
              value={formData.fuel_efficiency}
              onChange={handleChange}
              placeholder="8.5"
              step="0.1"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">
              Purchase Date *
            </label>
            <input
              type="date"
              name="purchase_date"
              value={formData.purchase_date}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">
              Insurance Expiry *
            </label>
            <input
              type="date"
              name="insurance_expiry"
              value={formData.insurance_expiry}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">
              Pollution Certificate Expiry *
            </label>
            <input
              type="date"
              name="pollution_certificate_expiry"
              value={formData.pollution_certificate_expiry}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full py-3">
          <Save size={18} />
          <span>{loading ? 'Creating...' : 'Create Vehicle'}</span>
        </button>
      </div>
    </form>
  );
}
