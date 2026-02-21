import { supabase } from '../supabaseClient.js';

export const createTrip = async (req, res) => {
    try {
        if (!supabase) {
            return res.status(503).json({ error: 'Database not configured' });
        }

        const { vehicle_id, driver_id, cargo_weight, origin, destination, scheduled_date } = req.body;

        if (!vehicle_id || !driver_id || !cargo_weight || !origin || !destination) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check vehicle availability and capacity
        const { data: vehicle, error: vehicleError } = await supabase
            .from('vehicles')
            .select('status, max_capacity')
            .eq('id', vehicle_id)
            .single();

        if (vehicleError || !vehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }

        if (vehicle.status !== 'available') {
            return res.status(400).json({ error: 'Vehicle is not available' });
        }

        // Cargo weight validation - CRITICAL BUSINESS RULE
        if (cargo_weight > vehicle.max_capacity) {
            return res.status(400).json({
                error: `Cargo weight (${cargo_weight}kg) exceeds vehicle capacity (${vehicle.max_capacity}kg)`
            });
        }

        // Check driver availability and license
        const { data: driver, error: driverError } = await supabase
            .from('drivers')
            .select('status, license_expiry')
            .eq('id', driver_id)
            .single();

        if (driverError || !driver) {
            return res.status(404).json({ error: 'Driver not found' });
        }

        if (driver.status !== 'available') {
            return res.status(400).json({ error: 'Driver is not available' });
        }

        // License expiry check - CRITICAL COMPLIANCE RULE
        if (new Date(driver.license_expiry) < new Date()) {
            return res.status(400).json({ error: 'Driver license has expired - cannot assign trip' });
        }

        // Create trip
        const { data: trip, error: tripError } = await supabase
            .from('trips')
            .insert({
                vehicle_id,
                driver_id,
                cargo_weight,
                origin,
                destination,
                scheduled_date,
                status: 'draft'
            })
            .select()
            .single();

        if (tripError) {
            return res.status(400).json({ error: tripError.message });
        }

        res.status(201).json({ message: 'Trip created successfully', trip });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getTrips = async (req, res) => {
    try {
        if (!supabase) {
            return res.status(503).json({ error: 'Database not configured' });
        }

        const { status, vehicle_id, driver_id } = req.query;

        let query = supabase
            .from('trips')
            .select(`
        *,
        vehicles(model, license_plate),
        drivers(name, license_number)
      `);

        if (status) query = query.eq('status', status);
        if (vehicle_id) query = query.eq('vehicle_id', vehicle_id);
        if (driver_id) query = query.eq('driver_id', driver_id);

        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getTripById = async (req, res) => {
    try {
        if (!supabase) {
            return res.status(503).json({ error: 'Database not configured' });
        }

        const { id } = req.params;

        const { data, error } = await supabase
            .from('trips')
            .select(`
        *,
        vehicles(*),
        drivers(*)
      `)
            .eq('id', id)
            .single();

        if (error || !data) {
            return res.status(404).json({ error: 'Trip not found' });
        }

        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

export const updateTripStatus = async (req, res) => {
    try {
        if (!supabase) {
            return res.status(503).json({ error: 'Database not configured' });
        }

        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ['draft', 'dispatched', 'in_progress', 'completed', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        // Get trip details
        const { data: trip } = await supabase
            .from('trips')
            .select('vehicle_id, driver_id')
            .eq('id', id)
            .single();

        // AUTO-UPDATE LOGIC: Update vehicle and driver status based on trip status
        if (status === 'dispatched' || status === 'in_progress') {
            await supabase.from('vehicles').update({ status: 'on_trip' }).eq('id', trip.vehicle_id);
            await supabase.from('drivers').update({ status: 'on_duty' }).eq('id', trip.driver_id);
        } else if (status === 'completed' || status === 'cancelled') {
            await supabase.from('vehicles').update({ status: 'available' }).eq('id', trip.vehicle_id);
            await supabase.from('drivers').update({ status: 'available' }).eq('id', trip.driver_id);
        }

        const { data, error } = await supabase
            .from('trips')
            .update({ status })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.json({ message: 'Trip status updated', trip: data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

export const completeTrip = async (req, res) => {
    try {
        if (!supabase) {
            return res.status(503).json({ error: 'Database not configured' });
        }

        const { id } = req.params;
        const { final_odometer, actual_distance } = req.body;

        const { data, error } = await supabase
            .from('trips')
            .update({
                status: 'completed',
                final_odometer,
                actual_distance,
                completed_at: new Date().toISOString()
            })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Update vehicle and driver to available
        await supabase.from('vehicles').update({ status: 'available' }).eq('id', data.vehicle_id);
        await supabase.from('drivers').update({ status: 'available' }).eq('id', data.driver_id);

        res.json({ message: 'Trip completed successfully', trip: data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

export const cancelTrip = async (req, res) => {
    try {
        if (!supabase) {
            return res.status(503).json({ error: 'Database not configured' });
        }

        const { id } = req.params;
        const { reason } = req.body;

        const { data, error } = await supabase
            .from('trips')
            .update({
                status: 'cancelled',
                cancellation_reason: reason,
                cancelled_at: new Date().toISOString()
            })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Update vehicle and driver to available
        await supabase.from('vehicles').update({ status: 'available' }).eq('id', data.vehicle_id);
        await supabase.from('drivers').update({ status: 'available' }).eq('id', data.driver_id);

        res.json({ message: 'Trip cancelled', trip: data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
