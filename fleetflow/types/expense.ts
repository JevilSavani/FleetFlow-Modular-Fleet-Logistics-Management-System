export interface Expense {
  id: string;
  vehicle_id: string;
  trip_id?: string;
  expense_type: 'fuel' | 'maintenance' | 'toll' | 'parking' | 'insurance' | 'fine' | 'other';
  amount: number;
  currency: string;
  date: string;
  description: string;
  receipt_url?: string;
  odometer_reading?: number;
  fuel_quantity?: number; // liters
  fuel_unit_price?: number;
  approved_by?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface FuelLog extends Expense {
  expense_type: 'fuel';
  fuel_quantity: number;
  fuel_unit_price: number;
  odometer_reading: number;
  fuel_type: 'diesel' | 'petrol' | 'electric';
}

export interface MaintenanceExpense extends Expense {
  expense_type: 'maintenance';
  service_type: 'routine' | 'repair' | 'inspection' | 'urgent';
  description: string;
  parts_replaced?: string;
  mechanic_name?: string;
}

export interface ExpenseFormData {
  vehicle_id: string;
  trip_id?: string;
  expense_type: 'fuel' | 'maintenance' | 'toll' | 'parking' | 'insurance' | 'fine' | 'other';
  amount: number;
  date: string;
  description: string;
  fuel_quantity?: number;
  odometer_reading?: number;
}

export interface ExpenseAnalytics {
  total_expenses: number;
  by_category: Record<string, number>;
  average_monthly: number;
  trending: 'up' | 'down' | 'stable';
}
