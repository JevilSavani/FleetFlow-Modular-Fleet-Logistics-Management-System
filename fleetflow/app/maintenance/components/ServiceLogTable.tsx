'use client';

export function ServiceLogTable() {
  const mockData = [
    {
      id: 1,
      vehicle: 'DL-01-AB-1234',
      service_type: 'Routine Service',
      amount: 5000,
      date: '2024-02-15',
      mechanic: "John's Auto",
      status: 'Completed',
    },
    {
      id: 2,
      vehicle: 'DL-02-CD-5678',
      service_type: 'Oil Change',
      amount: 2000,
      date: '2024-02-18',
      mechanic: 'RAJ Service',
      status: 'Pending',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Vehicle
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Service Type
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Mechanic
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Date
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {mockData.map((record) => (
            <tr key={record.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-semibold text-gray-900">{record.vehicle}</td>
              <td className="px-6 py-4 text-gray-700">{record.service_type}</td>
              <td className="px-6 py-4 text-gray-700">{record.mechanic}</td>
              <td className="px-6 py-4 text-gray-700">₹{record.amount}</td>
              <td className="px-6 py-4 text-gray-700">{record.date}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    record.status === 'Completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {record.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
