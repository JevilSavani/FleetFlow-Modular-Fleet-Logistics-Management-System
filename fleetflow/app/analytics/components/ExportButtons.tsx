'use client';

import { Download, FileText, Sheet } from 'lucide-react';

export function ExportButtons() {
  const handleExportPDF = () => {
    // Implementation for PDF export
    alert('PDF export functionality would be implemented here');
  };

  const handleExportExcel = () => {
    // Implementation for Excel export
    alert('Excel export functionality would be implemented here');
  };

  const handleExportCSV = () => {
    // Implementation for CSV export
    alert('CSV export functionality would be implemented here');
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={handleExportPDF}
        className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
      >
        <FileText size={18} />
        <span>Export as PDF</span>
      </button>

      <button
        onClick={handleExportExcel}
        className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
      >
        <Sheet size={18} />
        <span>Export as Excel</span>
      </button>

      <button
        onClick={handleExportCSV}
        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
      >
        <Download size={18} />
        <span>Export as CSV</span>
      </button>
    </div>
  );
}
