'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';

export function ServiceLogForm() {
  const [formData, setFormData] = useState({
    vehicle_id: '',
    service_type: 'routine',
    amount: '',
    date: '',
    description: '',
    parts_replaced: '',
    mechanic_name: '',
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
              Service Type *
            </label>
            <select
              name="service_type"
              value={formData.service_type}
              onChange={handleChange}
              className="input-field"
            >
              <option value="routine">Routine Service</option>
              <option value="repair">Repair</option>
              <option value="inspection">Inspection</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">
              Amount *
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="5000"
              className="input-field"
              required
            />
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
              Mechanic Name
            </label>
            <input
              type="text"
              name="mechanic_name"
              value={formData.mechanic_name}
              onChange={handleChange}
              placeholder="John's Auto Service"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">
              Parts Replaced
            </label>
            <input
              type="text"
              name="parts_replaced"
              value={formData.parts_replaced}
              onChange={handleChange}
              placeholder="Oil Filter, Spark Plugs"
              className="input-field"
            />
          </div>

          <div className="col-span-full">
            <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the service performed"
              rows={3}
              className="input-field resize-none"
              required
            />
          </div>
        </div>

        <button type="submit" className="btn-primary w-full py-3">
          <Save size={18} />
          <span>Log Service</span>
        </button>
      </div>
    </form>
  );
}
