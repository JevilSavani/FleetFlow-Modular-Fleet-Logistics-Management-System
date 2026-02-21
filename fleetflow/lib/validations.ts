import { VehicleFormData } from '@/types/vehicle';
import { DriverFormData } from '@/types/driver';
import { TripFormData } from '@/types/trip';
import { ExpenseFormData } from '@/types/expense';

export function validateVehicleForm(data: VehicleFormData): string[] {
  const errors: string[] = [];

  if (!data.registration_number?.trim()) {
    errors.push('Registration number is required');
  }

  if (!data.make?.trim()) {
    errors.push('Vehicle make is required');
  }

  if (!data.model?.trim()) {
    errors.push('Vehicle model is required');
  }

  if (data.year < 1900 || data.year > new Date().getFullYear() + 1) {
    errors.push('Invalid year');
  }

  if (data.max_capacity <= 0) {
    errors.push('Max capacity must be greater than 0');
  }

  if (data.fuel_efficiency <= 0) {
    errors.push('Fuel efficiency must be greater than 0');
  }

  return errors;
}

export function validateCargoWeight(
  cargoWeight: number,
  maxCapacity: number
): boolean {
  return cargoWeight <= maxCapacity && cargoWeight > 0;
}

export function validateDriverForm(data: DriverFormData): string[] {
  const errors: string[] = [];

  if (!data.first_name?.trim()) {
    errors.push('First name is required');
  }

  if (!data.last_name?.trim()) {
    errors.push('Last name is required');
  }

  if (!data.email?.trim() || !isValidEmail(data.email)) {
    errors.push('Valid email is required');
  }

  if (!data.phone?.trim()) {
    errors.push('Phone number is required');
  }

  if (!data.license_number?.trim()) {
    errors.push('License number is required');
  }

  const licenseExpiry = new Date(data.license_expiry);
  if (licenseExpiry < new Date()) {
    errors.push('License has expired');
  }

  return errors;
}

export function validateTripForm(data: TripFormData): string[] {
  const errors: string[] = [];

  if (!data.vehicle_id?.trim()) {
    errors.push('Vehicle selection is required');
  }

  if (!data.driver_id?.trim()) {
    errors.push('Driver selection is required');
  }

  if (!data.origin?.trim()) {
    errors.push('Origin is required');
  }

  if (!data.destination?.trim()) {
    errors.push('Destination is required');
  }

  if (!data.cargo_description?.trim()) {
    errors.push('Cargo description is required');
  }

  if (data.cargo_weight <= 0) {
    errors.push('Cargo weight must be greater than 0');
  }

  if (data.distance_planned <= 0) {
    errors.push('Planned distance must be greater than 0');
  }

  const departure = new Date(data.scheduled_departure);
  const arrival = new Date(data.scheduled_arrival);

  if (departure >= arrival) {
    errors.push('Arrival time must be after departure time');
  }

  if (departure < new Date()) {
    errors.push('Departure time cannot be in the past');
  }

  return errors;
}

export function validateExpenseForm(data: ExpenseFormData): string[] {
  const errors: string[] = [];

  if (!data.vehicle_id?.trim()) {
    errors.push('Vehicle selection is required');
  }

  if (data.amount <= 0) {
    errors.push('Expense amount must be greater than 0');
  }

  if (!data.description?.trim()) {
    errors.push('Description is required');
  }

  if (!data.date?.trim()) {
    errors.push('Date is required');
  }

  return errors;
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

export function isLicenseExpired(expiryDate: string): boolean {
  return new Date(expiryDate) < new Date();
}

export function isInsuranceExpired(expiryDate: string): boolean {
  return new Date(expiryDate) < new Date();
}

export function isServiceDue(lastServiceDate: string, intervalDays: number = 90): boolean {
  const last = new Date(lastServiceDate);
  const due = new Date(last.getTime() + intervalDays * 24 * 60 * 60 * 1000);
  return due < new Date();
}
