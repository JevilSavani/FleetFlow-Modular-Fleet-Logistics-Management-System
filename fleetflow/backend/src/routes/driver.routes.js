import express from 'express';
import { addDriver, getDrivers } from '../controllers/driver.controller.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Drivers route working' });
});

// TEMP: comment others for now
// router.post('/', addDriver);
// router.get('/', getDrivers);

export default router;