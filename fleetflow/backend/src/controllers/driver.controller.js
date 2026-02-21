import { supabase } from '../supabaseClient.js';

export const addDriver = async (req, res) => {
  try {
    const { name, license_number, license_expiry } = req.body;

    if (!name || !license_number || !license_expiry) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const today = new Date();
    const expiryDate = new Date(license_expiry);

    const status = expiryDate < today ? 'suspended' : 'available';

    const { error } = await supabase.from('drivers').insert({
      name,
      license_number,
      license_expiry,
      status
    });

    if (error) return res.status(400).json({ error: error.message });

    res.json({ message: 'Driver added successfully', status });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getDrivers = async (req, res) => {
  try {
    const { data, error } = await supabase.from('drivers').select('*');

    if (error) return res.status(400).json({ error: error.message });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};