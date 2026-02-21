'use client';

interface SafetyScoreProps {
  score: number;
  violations: number;
  accidents: number;
  totalTrips: number;
}

export function SafetyScore({
  score,
  violations,
  accidents,
  totalTrips,
}: SafetyScoreProps) {
  const getRiskLevel = (score: number) => {
    if (score >= 80) return { label: 'Excellent', color: 'bg-green-100 text-green-800' };
    if (score >= 60) return { label: 'Good', color: 'bg-blue-100 text-blue-800' };
    if (score >= 40) return { label: 'Fair', color: 'bg-yellow-100 text-yellow-800' };
    return { label: 'Poor', color: 'bg-red-100 text-red-800' };
  };

  const risk = getRiskLevel(score);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Safety Performance</h2>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-3">
            <span className="font-semibold text-gray-700">Safety Score</span>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${risk.color}`}>
              {risk.label}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all ${
                score >= 80
                  ? 'bg-green-500'
                  : score >= 60
                  ? 'bg-blue-500'
                  : score >= 40
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }`}
              style={{ width: `${score}%` }}
            ></div>
          </div>
          <p className="text-center text-2xl font-bold text-gray-800 mt-3">{score}/100</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center bg-gray-50 rounded-lg p-4">
            <p className="text-gray-600 text-sm font-medium">Violations</p>
            <p className="text-3xl font-bold text-red-600 mt-2">{violations}</p>
          </div>
          <div className="text-center bg-gray-50 rounded-lg p-4">
            <p className="text-gray-600 text-sm font-medium">Accidents</p>
            <p className="text-3xl font-bold text-red-600 mt-2">{accidents}</p>
          </div>
          <div className="text-center bg-gray-50 rounded-lg p-4">
            <p className="text-gray-600 text-sm font-medium">Total Trips</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{totalTrips}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
