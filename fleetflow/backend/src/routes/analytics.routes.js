import express from 'express';
import {
    getDashboardKPIs,
    getFuelEfficiency,
    getVehicleROI,
    getDriverPerformance,
    getFleetUtilization
} from '../controllers/analytics.controller.js';

const router = express.Router();

router.get('/dashboard', getDashboardKPIs);
router.get('/fuel-efficiency', getFuelEfficiency);
router.get('/vehicle-roi/:vehicleId', getVehicleROI);
router.get('/driver-performance', getDriverPerformance);
router.get('/fleet-utilization', getFleetUtilization);

export default router;
