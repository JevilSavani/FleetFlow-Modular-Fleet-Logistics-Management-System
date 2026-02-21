import { supabase } from '../supabaseClient.js';

export const createExpense = async (req, res) => {
    try {
        if (!supabase) {
            return res.status(503).json({ error: 'Database not configured' });
        }

        const { vehicle_id, trip_id, expense_type, amount, liters, date, description } = req.body;

        if (!vehicle_id || !expense_type || !amount) {
            return res.status(400).json({ error: 'Vehicle ID, expense type, and amount are required' });
        }

        const { data, error } = await supabase
            .from('expenses')
            .insert({
                vehicle_id,
                trip_id,
                expense_type,
                amount,
                liters,
                date: date || new Date().toISOString(),
                description,
                status: 'pending'
            })
            .select()
            .single();

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.status(201).json({ message: 'Expense created', data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getExpenses = async (req, res) => {
    try {
        if (!supabase) {
            return res.status(503).json({ error: 'Database not configured' });
        }

        const { vehicle_id, expense_type, status } = req.query;

        let query = supabase
            .from('expenses')
            .select(`
        *,
        vehicles(model, license_plate),
        trips(origin, destination)
      `);

        if (vehicle_id) query = query.eq('vehicle_id', vehicle_id);
        if (expense_type) query = query.eq('expense_type', expense_type);
        if (status) query = query.eq('status', status);

        const { data, error } = await query.order('date', { ascending: false });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getExpensesByVehicle = async (req, res) => {
    try {
        if (!supabase) {
            return res.status(503).json({ error: 'Database not configured' });
        }

        const { vehicleId } = req.params;

        const { data, error } = await supabase
            .from('expenses')
            .select('*')
            .eq('vehicle_id', vehicleId)
            .order('date', { ascending: false });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Calculate total operational cost (Fuel + Maintenance)
        const totalCost = data.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

        res.json({ expenses: data, totalCost });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

export const updateExpense = async (req, res) => {
    try {
        if (!supabase) {
            return res.status(503).json({ error: 'Database not configured' });
        }

        const { id } = req.params;
        const { status, amount, description } = req.body;

        const updateData = {};
        if (status) updateData.status = status;
        if (amount) updateData.amount = amount;
        if (description) updateData.description = description;

        const { data, error } = await supabase
            .from('expenses')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.json({ message: 'Expense updated', data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

export const deleteExpense = async (req, res) => {
    try {
        if (!supabase) {
            return res.status(503).json({ error: 'Database not configured' });
        }

        const { id } = req.params;

        const { error } = await supabase
            .from('expenses')
            .delete()
            .eq('id', id);

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.json({ message: 'Expense deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
