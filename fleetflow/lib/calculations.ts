export function calculateFuelEfficiency(
  distance: number,
  fuelConsumed: number
): number {
  if (fuelConsumed === 0) return 0;
  return parseFloat((distance / fuelConsumed).toFixed(2));
}

export function calculateTripProfit(
  revenue: number,
  expenses: number
): number {
  return Math.round((revenue - expenses) * 100) / 100;
}

export function calculateROI(
  totalProfit: number,
  totalInvestment: number
): number {
  if (totalInvestment === 0) return 0;
  return parseFloat(((totalProfit / totalInvestment) * 100).toFixed(2));
}

export function calculateVehicleDepreciation(
  purchasePrice: number,
  ageInYears: number,
  depreciationRate: number = 0.15
): number {
  // Standard 15% annual depreciation
  const currentValue = purchasePrice * Math.pow(1 - depreciationRate, ageInYears);
  return parseFloat(currentValue.toFixed(2));
}

export function calculateCostPerKm(
  totalExpenses: number,
  totalDistance: number
): number {
  if (totalDistance === 0) return 0;
  return parseFloat((totalExpenses / totalDistance).toFixed(2));
}

export function calculateAverageFuelCost(
  totalFuelExpense: number,
  totalDistance: number,
  fuelEfficiency: number
): number {
  // Cost per liter * liters needed per km
  if (totalDistance === 0 || fuelEfficiency === 0) return 0;
  const costPerLiter = totalFuelExpense / (totalDistance / fuelEfficiency);
  return parseFloat(costPerLiter.toFixed(2));
}

export function calculateSafetyScore(
  violations: number,
  accidents: number,
  totalTrips: number
): number {
  if (totalTrips === 0) return 100;
  const violationPenalty = violations * 5;
  const accidentPenalty = accidents * 10;
  const score = Math.max(0, 100 - violationPenalty - accidentPenalty);
  return Math.round(score);
}

export function calculateTotalRevenue(trips: Array<{ revenue?: number }>): number {
  return trips.reduce((sum, trip) => sum + (trip.revenue || 0), 0);
}

export function calculateTotalExpenses(expenses: Array<{ amount: number }>): number {
  return expenses.reduce((sum, exp) => sum + exp.amount, 0);
}

export function calculateUtilizationRate(
  activeTrips: number,
  totalVehicles: number
): number {
  if (totalVehicles === 0) return 0;
  const rate = (activeTrips / totalVehicles) * 100;
  return parseFloat(rate.toFixed(2));
}

export function estimateTripDuration(
  distanceKm: number,
  averageSpeedKmh: number = 60
): number {
  // Returns duration in hours
  if (averageSpeedKmh === 0) return 0;
  return parseFloat((distanceKm / averageSpeedKmh).toFixed(2));
}

export function calculateCargoUtilization(
  cargoWeight: number,
  maxCapacity: number
): number {
  if (maxCapacity === 0) return 0;
  const utilization = (cargoWeight / maxCapacity) * 100;
  return parseFloat(utilization.toFixed(2));
}
