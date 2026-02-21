import express from 'express';
import cors from 'cors';

// import route files
import vehicleRoutes from './routes/vehicle.routes.js';
import driverRoutes from './routes/driver.routes.js';

// create express app FIRST
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// register routes AFTER app creation
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/drivers', driverRoutes);

// test route
app.get('/', (req, res) => {
  res.send('FleetFlow Backend Running');
});

// start server
app.listen(5000, () => {
  console.log('Backend running on port 5000');
});