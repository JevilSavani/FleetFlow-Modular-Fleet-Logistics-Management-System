'use client';

export function TripLifecycle() {
  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Trip Lifecycle</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
            ✓
          </div>
          <div>
            <p className="font-semibold text-gray-800">Trip Created</p>
            <p className="text-gray-600 text-sm">Feb 20, 2024 08:00 AM</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            →
          </div>
          <div>
            <p className="font-semibold text-gray-800">Trip Started</p>
            <p className="text-gray-600 text-sm">Feb 20, 2024 08:15 AM</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold">
            ○
          </div>
          <div>
            <p className="font-semibold text-gray-800">Trip Completed</p>
            <p className="text-gray-600 text-sm">Pending</p>
          </div>
        </div>
      </div>
    </div>
  );
}
