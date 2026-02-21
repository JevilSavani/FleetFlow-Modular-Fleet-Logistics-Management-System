import express from 'express';
import {
    createMaintenanceLog,
    getMaintenanceLogs,
    getMaintenanceByVehicle,
    updateMaintenanceLog
} from '../controllers/maintenance.controller.js';

const router = express.Router();

router.post('/', createMaintenanceLog);
router.get('/', getMaintenanceLogs);
router.get('/vehicle/:vehicleId', getMaintenanceByVehicle);
router.patch('/:id', updateMaintenanceLog);

export default router;
