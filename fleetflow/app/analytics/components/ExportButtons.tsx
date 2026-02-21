'use client';

import { Download, FileText, Sheet } from 'lucide-react';

export function ExportButtons() {
  const handleExportPDF = () => {
    alert('PDF export functionality would be implemented here');
  };

  const handleExportExcel = () => {
    alert('Excel export functionality would be implemented here');
  };

  const handleExportCSV = () => {
    alert('CSV export functionality would be implemented here');
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={handleExportPDF}
        className="btn-danger"
      >
        <FileText size={16} />
        <span>Export as PDF</span>
      </button>

      <button
        onClick={handleExportExcel}
        className="btn-success"
      >
        <Sheet size={16} />
        <span>Export as Excel</span>
      </button>

      <button
        onClick={handleExportCSV}
        className="btn-primary"
      >
        <Download size={16} />
        <span>Export as CSV</span>
      </button>
    </div>
  );
}
