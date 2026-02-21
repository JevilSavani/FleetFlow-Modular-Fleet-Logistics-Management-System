'use client';

interface ROIMetrics {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  roiPercentage: number;
  margin: number;
}

export function ROIReport() {
  const metrics: ROIMetrics = {
    totalRevenue: 3788000,
    totalExpenses: 2121000,
    netProfit: 1667000,
    roiPercentage: 78.6,
    margin: 44.0,
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 shadow">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">ROI Report</h2>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-4 shadow">
          <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            ₹{(metrics.totalRevenue / 100000).toFixed(2)}L
          </p>
          <p className="text-green-600 text-xs mt-2">+12.5% vs previous period</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow">
          <p className="text-gray-600 text-sm font-medium">Total Expenses</p>
          <p className="text-3xl font-bold text-red-600 mt-2">
            ₹{(metrics.totalExpenses / 100000).toFixed(2)}L
          </p>
          <p className="text-red-600 text-xs mt-2">+8.3% vs previous period</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow">
          <p className="text-gray-600 text-sm font-medium">Net Profit</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            ₹{(metrics.netProfit / 100000).toFixed(2)}L
          </p>
          <p className="text-blue-600 text-xs mt-2">+15.2% growth</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow">
          <p className="text-gray-600 text-sm font-medium">ROI Percentage</p>
          <p className="text-3xl font-bold text-purple-600 mt-2">{metrics.roiPercentage}%</p>
          <p className="text-purple-600 text-xs mt-2">+2.1pp increase</p>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-lg p-4 shadow">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-gray-700">Profit Margin</span>
          <span className="text-2xl font-bold text-green-600">{metrics.margin}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full transition-all"
            style={{ width: `${metrics.margin}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
