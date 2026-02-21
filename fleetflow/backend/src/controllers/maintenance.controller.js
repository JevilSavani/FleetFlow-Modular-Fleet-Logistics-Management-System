import { supabase } from '../supabaseClient.js';

export const createMaintenanceLog = async (req, res) => {
    try {
        if (!supabase) {
            return res.status(503).json({ error: 'Database not configured' });
        }

        const { vehicle_id, service_type, description, cost, service_date } = req.body;

        if (!vehicle_id || !service_type || !cost) {
            return res.status(400).json({ error: 'Vehicle ID, service type, and cost are required' });
        }

        // AUTO-LOGIC: Update vehicle status to "in_shop" - removes from dispatcher pool
        await supabase
            .from('vehicles')
            .update({ status: 'in_shop' })
            .eq('id', vehicle_id);

        const { data, error } = await supabase
            .from('maintenance')
            .insert({
                vehicle_id,
                service_type,
                description,
                cost,
                service_date: service_date || new Date().toISOString(),
                status: 'in_progress'
            })
            .select()
            .single();

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.status(201).json({ message: 'Maintenance log created, vehicle marked as in_shop', data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getMaintenanceLogs = async (req, res) => {
    try {
        if (!supabase) {
            return res.status(503).json({ error: 'Database not configured' });
        }

        const { status, vehicle_id } = req.query;

        let query = supabase
            .from('maintenance')
            .select(`
        *,
        vehicles(model, license_plate)
      `);

        if (status) query = query.eq('status', status);
        if (vehicle_id) query = query.eq('vehicle_id', vehicle_id);

        const { data, error } = await query.order('service_date', { ascending: false });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getMaintenanceByVehicle = async (req, res) => {
    try {
        if (!supabase) {
            return res.status(503).json({ error: 'Database not configured' });
        }

        const { vehicleId } = req.params;

        const { data, error } = await supabase
            .from('maintenance')
            .select('*')
            .eq('vehicle_id', vehicleId)
            .order('service_date', { ascending: false });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

export const updateMaintenanceLog = async (req, res) => {
    try {
        if (!supabase) {
            return res.status(503).json({ error: 'Database not configured' });
        }

        const { id } = req.params;
        const { status, cost, description } = req.body;

        const updateData = {};
        if (status) updateData.status = status;
        if (cost) updateData.cost = cost;
        if (description) updateData.description = description;

        // AUTO-LOGIC: If maintenance completed, set vehicle back to available
        if (status === 'completed') {
            const { data: maintenance } = await supabase
                .from('maintenance')
                .select('vehicle_id')
                .eq('id', id)
                .single();

            if (maintenance) {
                await supabase
                    .from('vehicles')
                    .update({ status: 'available' })
                    .eq('id', maintenance.vehicle_id);
            }
        }

        const { data, error } = await supabase
            .from('maintenance')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.json({ message: 'Maintenance log updated', data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
