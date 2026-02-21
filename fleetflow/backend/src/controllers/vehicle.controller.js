import { supabase } from '../supabaseClient.js';

export const addVehicle = async (req, res) => {
  try {
    const { model, license_plate, max_capacity } = req.body;

    if (!model || !license_plate || !max_capacity) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const { error } = await supabase.from('vehicles').insert({
      model,
      license_plate,
      max_capacity,
      status: 'Available'
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Vehicle added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getVehicles = async (req, res) => {
  try {
    const { data, error } = await supabase.from('vehicles').select('*');

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};