'use client';

interface DriverProfileProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  licenseNumber: string;
  status: string;
}

export function DriverProfile({
  firstName,
  lastName,
  email,
  phone,
  licenseNumber,
  status,
}: DriverProfileProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {firstName} {lastName}
          </h1>
          <p className="text-gray-600 mt-2">License: {licenseNumber}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            status === 'active'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="border-b pb-4">
          <p className="text-gray-600 text-sm">Email</p>
          <p className="font-semibold text-gray-900">{email}</p>
        </div>
        <div className="border-b pb-4">
          <p className="text-gray-600 text-sm">Phone</p>
          <p className="font-semibold text-gray-900">{phone}</p>
        </div>
      </div>
    </div>
  );
}
