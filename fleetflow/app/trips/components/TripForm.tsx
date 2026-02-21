'use client';

import { useState } from 'react';
import { TripFormData } from '@/types/trip';
import { useTrips } from '@/hooks/useTrips';
import { useRouter } from 'next/navigation';
import { validateTripForm } from '@/lib/validations';
import { useVehicles } from '@/hooks/useVehicles';
import { useDrivers } from '@/hooks/useDrivers';
import { Save } from 'lucide-react';

export function TripForm() {
  const [formData, setFormData] = useState<TripFormData>({
    vehicle_id: '',
    driver_id: '',
    origin: '',
    destination: '',
    cargo_description: '',
    cargo_weight: 0,
    scheduled_departure: '',
    scheduled_arrival: '',
    distance_planned: 0,
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { createTrip } = useTrips();
  const { vehicles } = useVehicles();
  const { drivers } = useDrivers();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'cargo_weight' || name === 'distance_planned' ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateTripForm(formData);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await createTrip(formData);
      router.push('/trips');
    } catch (err) {
      setErrors(['Failed to create trip']);
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
              Vehicle *
            </label>
            <select
              name="vehicle_id"
              value={formData.vehicle_id}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="">Select a Vehicle</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.registration_number} - {vehicle.make} {vehicle.model}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">
              Driver *
            </label>
            <select
              name="driver_id"
              value={formData.driver_id}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="">Select a Driver</option>
              {drivers.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.first_name} {driver.last_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">
              Origin *
            </label>
            <input
              type="text"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              placeholder="e.g., Delhi"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">
              Destination *
            </label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="e.g., Jaipur"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">
              Cargo Weight (kg) *
            </label>
            <input
              type="number"
              name="cargo_weight"
              value={formData.cargo_weight}
              onChange={handleChange}
              placeholder="2500"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">
              Planned Distance (km) *
            </label>
            <input
              type="number"
              name="distance_planned"
              value={formData.distance_planned}
              onChange={handleChange}
              placeholder="250"
              className="input-field"
              required
            />
          </div>

          <div className="col-span-full">
            <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">
              Cargo Description *
            </label>
            <textarea
              name="cargo_description"
              value={formData.cargo_description}
              onChange={handleChange}
              placeholder="Describe the cargo being transported"
              rows={3}
              className="input-field resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">
              Scheduled Departure *
            </label>
            <input
              type="datetime-local"
              name="scheduled_departure"
              value={formData.scheduled_departure}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">
              Scheduled Arrival *
            </label>
            <input
              type="datetime-local"
              name="scheduled_arrival"
              value={formData.scheduled_arrival}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">
              Cargo Value (Optional)
            </label>
            <input
              type="number"
              name="cargo_value"
              placeholder="50000"
              step="0.01"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">
              Notes (Optional)
            </label>
            <input
              type="text"
              name="notes"
              placeholder="Add any special instructions or notes"
              className="input-field"
            />
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full py-3">
          <Save size={18} />
          <span>{loading ? 'Creating Trip...' : 'Create Trip'}</span>
        </button>
      </div>
    </form>
  );
}
