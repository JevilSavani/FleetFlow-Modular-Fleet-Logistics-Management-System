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
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th>Vehicle</th>
              <th>Service Type</th>
              <th>Mechanic</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((record) => (
              <tr key={record.id}>
                <td className="font-semibold text-slate-900">{record.vehicle}</td>
                <td>
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                    {record.service_type}
                  </span>
                </td>
                <td className="text-slate-600">{record.mechanic}</td>
                <td className="text-slate-600 font-medium">\u20B9{record.amount}</td>
                <td className="text-slate-600">{record.date}</td>
                <td>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ring-inset ${
                      record.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20'
                        : 'bg-amber-50 text-amber-700 ring-amber-600/20'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${record.status === 'Completed' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    {record.status}
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
