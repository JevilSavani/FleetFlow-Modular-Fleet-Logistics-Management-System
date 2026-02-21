# FleetFlow - Quick Start Guide

## Project Overview

FleetFlow is a **Modular Fleet & Logistics Management System** designed to help fleet operators manage vehicles, drivers, trips, expenses, and operations efficiently.

## Tech Stack
- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Charts**: Chart.js
- **Icons**: Lucide React

## 5-Minute Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Supabase
Create `.env.local` file:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. Setup Database
- Go to Supabase Dashboard
- Create new project
- Open SQL Editor
- Copy & paste contents of `supabase/schema.sql`
- Execute to create tables
- Copy & paste contents of `supabase/seed.sql`
- Execute to add sample data

### 4. Run Development Server
```bash
npm run dev
```

### 5. Access Application
- Open http://localhost:3000
- Login with: `test@example.com` / `password123`

## Project Structure

```
fleetflow/
├── app/                    # Pages and routes
├── components/             # Reusable UI components
├── hooks/                  # Custom React hooks
├── lib/                    # Business logic & utilities
├── types/                  # TypeScript definitions
├── utils/                  # Helper functions
└── supabase/              # Database files
```

## Key Pages

| Page | Route | Purpose |
|------|-------|---------|
| Login | `/login` | User authentication |
| Dashboard | `/dashboard` | Overview & metrics |
| Vehicles | `/vehicles` | Vehicle management |
| Drivers | `/drivers` | Driver management |
| Trips | `/trips` | Trip management |
| Maintenance | `/maintenance` | Service logs |
| Expenses | `/expenses` | Cost tracking |
| Analytics | `/analytics` | Reports & insights |

## Main Components

### Shared (Reusable)
- **Navbar.tsx** - Top navigation
- **Sidebar.tsx** - Side navigation  
- **StatusPill.tsx** - Status badges
- **ProtectedRoute.tsx** - Route protection

### Page-Specific
- **Dashboard Components** - KPI Cards, Charts, Filters
- **Vehicle Components** - Table, Form, Detail view
- **Driver Components** - Profile, Safety Score
- **Trip Components** - Form, Lifecycle tracking
- **Expense Components** - Fuel Log, Expense Table
- **Analytics Components** - Charts, ROI Report, Export

## Important Hooks

```typescript
// Authentication
const { user, signOut, isAuthenticated } = useAuth();

// Data Management
const { vehicles, createVehicle, updateVehicle } = useVehicles();
const { drivers, createDriver } = useDrivers();
const { trips, createTrip } = useTrips();
```

## Business Logic Examples

```typescript
// Calculate fuel efficiency
const efficiency = calculateFuelEfficiency(distance, fuelConsumed);

// Calculate trip profit
const profit = calculateTripProfit(revenue, expenses);

// Calculate safety score
const score = calculateSafetyScore(violations, accidents, totalTrips);

// Validate cargo weight
const isValid = validateCargoWeight(cargoWeight, maxCapacity);
```

## Database Tables

### Core Tables
- **vehicles** - Fleet inventory
- **drivers** - Driver information
- **trips** - Trip records
- **expenses** - Operational costs
- **maintenance** - Service records
- **trip_lifecycle_events** - Trip event tracking

## Role-Based Access Control

```typescript
// Check if user can perform action
if (hasPermission(userRole, 'vehicles', 'create')) {
  // Allow create vehicle
}
```

### Roles
- **Admin** - Full access
- **Manager** - CRUD most resources
- **Driver** - Limited view access
- **Viewer** - Read-only access

## Common Tasks

### Add a Vehicle
1. Go to `/vehicles`
2. Click "Add Vehicle"
3. Fill form and submit
4. Vehicle added to database

### Create a Trip
1. Go to `/trips`
2. Click "Create Trip"
3. Select vehicle & driver
4. Enter route details
5. Submit to create

### Log an Expense
1. Go to `/expenses`
2. Click "Log Expense"
3. Select type (Fuel, Maintenance, etc.)
4. Enter amount and details
5. Submit for approval

### View Analytics
1. Go to `/analytics`
2. View revenue, expenses, ROI
3. Check fuel efficiency trends
4. Export reports (stub implementation)

## Form Validations

All forms validate:
- Required fields
- Format (email, phone, date)
- Business logic (cargo weight ≤ capacity)
- Document expiry dates
- License validity

## Error Handling

- Try/catch blocks in all data operations
- User-friendly error messages
- Error state in components
- Console logging for debugging

## Testing Scenarios

1. **Vehicle Management**
   - Create vehicle
   - View vehicle list
   - View vehicle details
   - Update vehicle

2. **Driver Management**
   - Create driver
   - View drivers
   - Check safety score
   - Monitor violations

3. **Trip Operations**
   - Create trip
   - Track trip status
   - View trip history
   - Calculate profitability

4. **Expense Tracking**
   - Log fuel expense
   - Log maintenance cost
   - Approve expenses
   - View expense reports

## Performance Tips

- Use React.memo for expensive components
- Lazy load routes with next/dynamic
- Optimize images
- Index database queries
- Cache API responses

## Debugging

### Console Logs
All async operations log results to console

### Network Tab
- Check Supabase API calls
- Verify auth tokens
- Monitor response times

### React DevTools
- Inspect component state
- Profile performance
- Debug hooks

## Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)

## Environment Setup Issues?

### Issue: "Cannot find module '@supabase/supabase-js'"
**Solution**: Run `npm install @supabase/supabase-js`

### Issue: "Supabase URL not found"
**Solution**: Check `.env.local` has correct values from Supabase dashboard

### Issue: "Authentication failed"
**Solution**: Verify user exists in Supabase Auth → Users

### Issue: "Table not found"
**Solution**: Re-run `supabase/schema.sql` in SQL editor

## Next Development Steps

1. Connect real Supabase project
2. Implement form submissions
3. Add real-time updates
4. Build mobile app
5. Add GPS tracking
6. Implement notifications
7. Set up analytics
8. Deploy to production

## Support

For issues:
1. Check browser console for errors
2. Verify Supabase connection
3. Check database schema matches schema.sql
4. Review TypeScript types for data
5. Check network tab for API errors

---

**Ready to develop?** Start with `/app/dashboard/page.tsx` to understand the structure!
