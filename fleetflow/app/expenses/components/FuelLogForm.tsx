'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';

export function FuelLogForm() {
  const [formData, setFormData] = useState({
    vehicle_id: '',
    fuel_quantity: '',
    fuel_unit_price: '',
    odometer_reading: '',
    date: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div className="card p-6 space-y-6">
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
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">
              Date *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">
              Fuel Quantity (liters) *
            </label>
            <input
              type="number"
              name="fuel_quantity"
              value={formData.fuel_quantity}
              onChange={handleChange}
              placeholder="50"
              step="0.1"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">
              Unit Price (\u20B9/liter) *
            </label>
            <input
              type="number"
              name="fuel_unit_price"
              value={formData.fuel_unit_price}
              onChange={handleChange}
              placeholder="87.50"
              step="0.01"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">
              Odometer Reading (km) *
            </label>
            <input
              type="number"
              name="odometer_reading"
              value={formData.odometer_reading}
              onChange={handleChange}
              placeholder="50000"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Fuel purchased at XYZ"
              className="input-field"
            />
          </div>
        </div>

        <button type="submit" className="btn-primary w-full py-3">
          <Save size={18} />
          <span>Log Fuel</span>
        </button>
      </div>
    </form>
  );
}
