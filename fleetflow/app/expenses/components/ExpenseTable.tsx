'use client';

export function ExpenseTable() {
  const mockExpenses = [
    {
      id: 1,
      vehicle: 'DL-01-AB-1234',
      type: 'Fuel',
      amount: 3500,
      date: '2024-02-18',
      description: 'Diesel - 40 liters',
      status: 'Approved',
    },
    {
      id: 2,
      vehicle: 'DL-02-CD-5678',
      type: 'Toll',
      amount: 450,
      date: '2024-02-17',
      description: 'Highway Toll',
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
              Type
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Description
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
          {mockExpenses.map((expense) => (
            <tr key={expense.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-semibold text-gray-900">{expense.vehicle}</td>
              <td className="px-6 py-4 text-gray-700">{expense.type}</td>
              <td className="px-6 py-4 text-gray-700">₹{expense.amount}</td>
              <td className="px-6 py-4 text-gray-700">{expense.description}</td>
              <td className="px-6 py-4 text-gray-700">{expense.date}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    expense.status === 'Approved'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {expense.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
