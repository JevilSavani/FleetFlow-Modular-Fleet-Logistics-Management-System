import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// import route files
import vehicleRoutes from './routes/vehicle.routes.js';
import driverRoutes from './routes/driver.routes.js';

// create express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// register routes
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/drivers', driverRoutes);

// test route
app.get('/', (req, res) => {
  res.json({
    message: 'FleetFlow Backend Running',
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// health check
app.get('/health', (req, res) => {
  const supabaseConfigured = process.env.SUPABASE_URL &&
    process.env.SUPABASE_URL !== 'your_supabase_url';

  res.json({
    status: 'running',
    supabase: supabaseConfigured ? 'configured' : 'not configured',
    port: process.env.PORT || 5000
  });
});

// start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`\n🚀 FleetFlow Backend Server`);
  console.log(`📍 Running on: http://localhost:${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health\n`);
});