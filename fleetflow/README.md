# FleetFlow - Fleet & Logistics Management System

A comprehensive, modular fleet and logistics management system built with Next.js, React, TypeScript, and Supabase. Designed to streamline operations for fleet management companies.

## Features

### 🚗 Core Modules

1. **Dashboard (Command Center)**
   - Real-time fleet status overview
   - KPI cards for quick metrics
   - Fleet status visualization
   - Advanced filtering options

2. **Vehicle Registry (Page 3)**
   - Complete vehicle inventory management
   - Vehicle tracking and maintenance schedules
   - Document expiry alerts (insurance, pollution certificate)
   - Mileage and depreciation tracking

3. **Trip Dispatcher (Page 4)**
   - Trip creation and management
   - Real-time trip tracking
   - Trip lifecycle management
   - Route optimization

4. **Driver Performance (Page 7)**
   - Driver profiles and performance metrics
   - Safety score calculation
   - License and certification tracking
   - Violation and accident records

5. **Service Logs (Page 5)**
   - Maintenance scheduling
   - Service history tracking
   - Repair records
   - Parts replacement documentation

6. **Fuel & Expense Logging (Page 6)**
   - Fuel consumption tracking
   - Expense categorization
   - Cost per kilometer calculation
   - Approval workflows

7. **Reports & ROI (Page 8)**
   - Revenue vs expense analysis
   - Fuel efficiency reports
   - ROI calculations
   - Exportable reports

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Charts**: Chart.js with React-ChartJS-2
- **Icons**: Lucide React
- **State Management**: React Hooks

## Project Structure

```
fleetflow/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home (redirect)
│   ├── globals.css        # Global styles
│   ├── (auth)/            # Authentication routes
│   │   ├── login/
│   │   └── forgot-password/
│   ├── dashboard/         # Dashboard module
│   ├── vehicles/          # Vehicle management
│   ├── drivers/           # Driver management
│   ├── trips/             # Trip management
│   ├── maintenance/       # Maintenance logs
│   ├── expenses/          # Expense tracking
│   └── analytics/         # Reports & analytics
├── components/            # Shared components
│   ├── Navbar.tsx
│   ├── Sidebar.tsx
│   ├── StatusPill.tsx
│   └── ProtectedRoute.tsx
├── lib/
│   ├── supabaseClient.ts
│   ├── rbac.ts            # Role-based access control
│   ├── calculations.ts    # Business logic
│   └── validations.ts     # Form validations
├── hooks/                 # Custom React hooks
│   ├── useAuth.ts
│   ├── useVehicles.ts
│   ├── useDrivers.ts
│   └── useTrips.ts
├── types/                 # TypeScript definitions
│   ├── vehicle.ts
│   ├── driver.ts
│   ├── trip.ts
│   └── expense.ts
├── utils/                 # Utility functions
│   ├── constants.ts
│   └── statusHelpers.ts
├── supabase/             # Database files
│   ├── schema.sql        # Database schema
│   └── seed.sql          # Sample data
├── middleware.ts         # Next.js middleware
├── package.json
├── tsconfig.json
└── .env.local           # Environment variables
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm
- Supabase account
- Basic knowledge of Next.js and React

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fleetflow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create `.env.local` file:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Set up Supabase**
   - Create a new Supabase project
   - Run `supabase/schema.sql` to create tables
   - Run `supabase/seed.sql` to populate sample data

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

### Default Login Credentials (for testing)
- Email: `test@example.com`
- Password: `password123`

## Key Features

### RBAC (Role-Based Access Control)
- Admin: Full access
- Manager: Trip creation, vehicle/driver management, analytics
- Driver: View-only access to assigned trips
- Viewer: Limited read-only access

### Business Logic Features

- **ROI Calculation**: Automatic profit/loss calculation per trip
- **Fuel Efficiency**: km/l tracking and reporting
- **Safety Scoring**: Algorithmic driver performance evaluation
- **Cost Analytics**: Cost per kilometer and expense categorization
- **Depreciation**: Automatic vehicle value depreciation calculation

### Calculations Implemented

- Fuel efficiency (km/l)
- Trip profitability
- ROI percentage
- Vehicle depreciation
- Safety score
- Utilization rates
- Cargo weight validation

## Database Schema

### Main Tables

- **vehicles**: Repository of all vehicles
- **drivers**: Driver information and performance
- **trips**: Trip records with financial data
- **expenses**: All operational expenses
- **maintenance**: Service and maintenance records
- **trip_lifecycle_events**: Trip event tracking

## API Integration

The system uses Supabase for:
- Real-time database operations
- Authentication management
- Row-level security
- Automatic timestamps

## Form Validations

All forms include:
- Field-level validation
- Business logic validation (e.g., cargo weight ≤ max capacity)
- License/document expiry checks
- Email and phone format validation

## UI Components

- Responsive navigation bar
- Collapsible sidebar
- Status pills with color coding
- Data tables with sorting
- Form components with error handling
- Chart visualizations
- KPI cards
- Modal dialogs

## Testing the Application

1. Login with test credentials
2. Create vehicles and drivers
3. Create trips and track them
4. Log expenses and maintenance
5. View analytics and reports
6. Export data for analysis

## Performance Optimizations

- Server-side data fetching
- Indexed database queries
- Lazy-loaded components
- Optimized images
- Minified CSS/JS

## Future Enhancements

- GPS real-time tracking
- Mobile app
- Advanced AI analytics
- Predictive maintenance
- Automated expense claims
- Multi-language support
- Two-factor authentication
- Audit logging
- Custom reports builder

## Troubleshooting

### Authentication Issues
- Ensure Supabase keys are correct in .env.local
- Check Supabase project settings
- Clear browser cookies and try again

### Database Errors
- Verify schema.sql was executed
- Check database permissions
- Ensure row-level security is configured

### Performance Issues
- Check database indexes
- Review API response times
- Clear browser cache

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Review the documentation
- Check Supabase documentation
- Review Next.js best practices

---

**Built with ❤️ for efficient fleet management**
