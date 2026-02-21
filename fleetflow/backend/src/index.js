import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// import route files
import vehicleRoutes from './routes/vehicle.routes.js';
import driverRoutes from './routes/driver.routes.js';
import tripRoutes from './routes/trip.routes.js';
import maintenanceRoutes from './routes/maintenance.routes.js';
import expenseRoutes from './routes/expense.routes.js';
import authRoutes from './routes/auth.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';

// import middleware
import { errorHandler, notFound } from './middleware/errorHandler.js';

// create express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// register routes
app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/analytics', analyticsRoutes);

// test route
app.get('/', (req, res) => {
  res.json({
    message: 'FleetFlow Backend API',
    status: 'ok',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: '/api/auth',
      vehicles: '/api/vehicles',
      drivers: '/api/drivers',
      trips: '/api/trips',
      maintenance: '/api/maintenance',
      expenses: '/api/expenses',
      analytics: '/api/analytics'
    }
  });
});

// health check
app.get('/health', (req, res) => {
  const supabaseConfigured = process.env.SUPABASE_URL &&
    process.env.SUPABASE_URL !== 'your_supabase_url';

  res.json({
    status: 'running',
    supabase: supabaseConfigured ? 'configured' : 'not configured',
    port: process.env.PORT || 5001,
    timestamp: new Date().toISOString()
  });
});

// error handling
app.use(notFound);
app.use(errorHandler);

// start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`\n🚀 FleetFlow Backend Server`);
  console.log(`📍 Running on: http://localhost:${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log(`📚 API Documentation: http://localhost:${PORT}\n`);
});
