import express from 'express';
import {
    createTrip,
    getTrips,
    getTripById,
    updateTripStatus,
    completeTrip,
    cancelTrip
} from '../controllers/trip.controller.js';

const router = express.Router();

router.post('/', createTrip);
router.get('/', getTrips);
router.get('/:id', getTripById);
router.patch('/:id/status', updateTripStatus);
router.patch('/:id/complete', completeTrip);
router.patch('/:id/cancel', cancelTrip);

export default router;
