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

  const typeColors: Record<string, string> = {
    Fuel: 'bg-orange-50 text-orange-700 ring-orange-600/20',
    Toll: 'bg-blue-50 text-blue-700 ring-blue-600/20',
    Maintenance: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  };

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th>Vehicle</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {mockExpenses.map((expense) => (
              <tr key={expense.id}>
                <td className="font-semibold text-slate-900">{expense.vehicle}</td>
                <td>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ring-inset ${
                      typeColors[expense.type] || 'bg-slate-50 text-slate-700 ring-slate-600/20'
                    }`}
                  >
                    {expense.type}
                  </span>
                </td>
                <td className="text-slate-600 font-medium">\u20B9{expense.amount}</td>
                <td className="text-slate-600">{expense.description}</td>
                <td className="text-slate-600">{expense.date}</td>
                <td>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ring-inset ${
                      expense.status === 'Approved'
                        ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20'
                        : 'bg-amber-50 text-amber-700 ring-amber-600/20'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${expense.status === 'Approved' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    {expense.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
