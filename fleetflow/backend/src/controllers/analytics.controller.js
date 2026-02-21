import { supabase } from '../supabaseClient.js';

export const getDashboardKPIs = async (req, res) => {
    try {
        if (!supabase) {
            return res.status(503).json({ error: 'Database not configured' });
        }

        // Active Fleet (vehicles on trip)
        const { count: activeFleet } = await supabase
            .from('vehicles')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'on_trip');

        // Maintenance Alerts (vehicles in shop)
        const { count: maintenanceAlerts } = await supabase
            .from('vehicles')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'in_shop');

        // Total vehicles
        const { count: totalVehicles } = await supabase
            .from('vehicles')
            .select('*', { count: 'exact', head: true })
            .neq('status', 'retired');

        // Utilization Rate: % of fleet assigned vs idle
        const utilizationRate = totalVehicles > 0
            ? ((activeFleet / totalVehicles) * 100).toFixed(2)
            : 0;

        // Pending Cargo (trips in draft status)
        const { count: pendingCargo } = await supabase
            .from('trips')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'draft');

        // Active trips
        const { count: activeTrips } = await supabase
            .from('trips')
            .select('*', { count: 'exact', head: true })
            .in('status', ['dispatched', 'in_progress']);

        res.json({
            activeFleet: activeFleet || 0,
            maintenanceAlerts: maintenanceAlerts || 0,
            utilizationRate: parseFloat(utilizationRate),
            pendingCargo: pendingCargo || 0,
            activeTrips: activeTrips || 0,
            totalVehicles: totalVehicles || 0
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getFuelEfficiency = async (req, res) => {
    try {
        if (!supabase) {
            return res.status(503).json({ error: 'Database not configured' });
        }

        const { vehicle_id, start_date, end_date } = req.query;

        let expenseQuery = supabase
            .from('expenses')
            .select('vehicle_id, liters, vehicles(model, license_plate), trips(actual_distance)')
            .eq('expense_type', 'fuel');

        if (vehicle_id) expenseQuery = expenseQuery.eq('vehicle_id', vehicle_id);
        if (start_date) expenseQuery = expenseQuery.gte('date', start_date);
        if (end_date) expenseQuery = expenseQuery.lte('date', end_date);

        const { data: expenses, error } = await expenseQuery;

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Calculate fuel efficiency (km/L) per vehicle
        const efficiencyMap = {};

        expenses.forEach(expense => {
            const vehicleId = expense.vehicle_id;
            const distance = expense.trips?.actual_distance || 0;
            const liters = expense.liters || 0;

            if (!efficiencyMap[vehicleId]) {
                efficiencyMap[vehicleId] = {
                    vehicle: expense.vehicles,
                    totalDistance: 0,
                    totalLiters: 0,
                    efficiency: 0
                };
            }

            efficiencyMap[vehicleId].totalDistance += distance;
            efficiencyMap[vehicleId].totalLiters += liters;
        });

        // Calculate efficiency: km / L
        Object.keys(efficiencyMap).forEach(vehicleId => {
            const data = efficiencyMap[vehicleId];
            data.efficiency = data.totalLiters > 0
                ? (data.totalDistance / data.totalLiters).toFixed(2)
                : 0;
        });

        res.json(Object.values(efficiencyMap));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getVehicleROI = async (req, res) => {
    try {
        if (!supabase) {
            return res.status(503).json({ error: 'Database not configured' });
        }

        const { vehicleId } = req.params;

        // Get vehicle details
        const { data: vehicle, error: vehicleError } = await supabase
            .from('vehicles')
            .select('*, acquisition_cost')
            .eq('id', vehicleId)
            .single();

        if (vehicleError || !vehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }

        // Get total expenses (fuel + maintenance)
        const { data: expenses } = await supabase
            .from('expenses')
            .select('amount')
            .eq('vehicle_id', vehicleId);

        const { data: maintenance } = await supabase
            .from('maintenance')
            .select('cost')
            .eq('vehicle_id', vehicleId);

        const totalExpenses = [
            ...(expenses || []).map(e => parseFloat(e.amount)),
            ...(maintenance || []).map(m => parseFloat(m.cost))
        ].reduce((sum, cost) => sum + cost, 0);

        // Get total revenue from completed trips
        const { data: trips } = await supabase
            .from('trips')
            .select('revenue')
            .eq('vehicle_id', vehicleId)
            .eq('status', 'completed');

        const totalRevenue = (trips || [])
            .reduce((sum, trip) => sum + (parseFloat(trip.revenue) || 0), 0);

        // Calculate ROI: (Revenue - Expenses) / Acquisition Cost
        const acquisitionCost = parseFloat(vehicle.acquisition_cost) || 0;
        const roi = acquisitionCost > 0
            ? (((totalRevenue - totalExpenses) / acquisitionCost) * 100).toFixed(2)
            : 0;

        res.json({
            vehicle: {
                model: vehicle.model,
                license_plate: vehicle.license_plate
            },
            acquisitionCost,
            totalRevenue,
            totalExpenses,
            netProfit: totalRevenue - totalExpenses,
            roi: parseFloat(roi)
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getDriverPerformance = async (req, res) => {
    try {
        if (!supabase) {
            return res.status(503).json({ error: 'Database not configured' });
        }

        const { data: drivers, error } = await supabase
            .from('drivers')
            .select(`
        id,
        name,
        license_number,
        safety_score,
        trips(id, status)
      `);

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        const performance = drivers.map(driver => {
            const totalTrips = driver.trips?.length || 0;
            const completedTrips = driver.trips?.filter(t => t.status === 'completed').length || 0;
            const completionRate = totalTrips > 0
                ? ((completedTrips / totalTrips) * 100).toFixed(2)
                : 0;

            return {
                id: driver.id,
                name: driver.name,
                license_number: driver.license_number,
                safetyScore: driver.safety_score || 0,
                totalTrips,
                completedTrips,
                completionRate: parseFloat(completionRate)
            };
        });

        res.json(performance);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getFleetUtilization = async (req, res) => {
    try {
        if (!supabase) {
            return res.status(503).json({ error: 'Database not configured' });
        }

        const { data: vehicles, error } = await supabase
            .from('vehicles')
            .select('status')
            .neq('status', 'retired');

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        const statusCount = vehicles.reduce((acc, vehicle) => {
            acc[vehicle.status] = (acc[vehicle.status] || 0) + 1;
            return acc;
        }, {});

        const total = vehicles.length;

        res.json({
            total,
            breakdown: statusCount,
            utilizationRate: total > 0
                ? (((statusCount.on_trip || 0) / total) * 100).toFixed(2)
                : 0
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
