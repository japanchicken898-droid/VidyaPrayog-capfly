import React from 'react';
import { X, FileSpreadsheet, FileText, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

export interface InstitutionExportConfig {
  /** Base filename without extension */
  filename: string;
  /** CSV/tabular content to export in Excel/CSV mode */
  csvData?: string;
  /** Human-readable label shown on the PDF document header */
  pdfLabel?: string;
}

interface InstitutionExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: InstitutionExportConfig;
  /** Called after either download completes — use for toast notifications */
  onToast?: (msg: string) => void;
}

/**
 * InstitutionExportModal
 * Portal-wide format-selection download modal for the Institution Portal.
 * Renders a blurred overlay with two choices: Excel/CSV or Formatted PDF.
 *
 * Scoped strictly to the Institution Portal — do NOT import in Student or
 * other portal dashboards.
 */
export const InstitutionExportModal: React.FC<InstitutionExportModalProps> = ({
  isOpen,
  onClose,
  config,
  onToast,
}) => {
  if (!isOpen) return null;

  const toast = (msg: string) => onToast?.(msg);

  const parseCSV = (csv: string): string[][] => {
    const rows: string[][] = [];
    let currentRow: string[] = [];
    let currentCell = '';
    let inQuotes = false;
    
    for (let i = 0; i < csv.length; i++) {
      const char = csv[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        currentRow.push(currentCell.trim());
        currentCell = '';
      } else if (char === '\n' && !inQuotes) {
        currentRow.push(currentCell.trim());
        rows.push(currentRow);
        currentRow = [];
        currentCell = '';
      } else {
        currentCell += char;
      }
    }
    if (currentCell || currentRow.length > 0) {
      currentRow.push(currentCell.trim());
      rows.push(currentRow);
    }
    return rows;
  };

  const handleExcel = () => {
    onClose();
    toast('Generating Excel / Data Sheet...');
    setTimeout(() => {
      try {
        const csvContent = config.csvData || 'No Data Available';
        const dataAOA = parseCSV(csvContent);
        
        // Create workbook and worksheet
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(dataAOA);
        
        // Append worksheet to workbook
        XLSX.utils.book_append_sheet(wb, ws, "Data Sheet");
        
        // Generate Excel file and trigger download
        XLSX.writeFile(wb, `${config.filename}.xlsx`);
        
        toast(`✅ ${config.filename}.xlsx downloaded successfully!`);
      } catch (err) {
        console.error('Excel Generation Error:', err);
        toast('❌ Error generating Excel document.');
      }
    }, 700);
  };

  const handlePDF = () => {
    onClose();
    toast('Generating Formatted Report Document...');
    setTimeout(() => {
      try {
        const doc = new jsPDF({ orientation: 'landscape' });
        
        // --- Header Section ---
        const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        doc.setFillColor(15, 23, 42); // slate-900
        doc.rect(0, 0, doc.internal.pageSize.width, 35, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        doc.text('CAPFLY INSTITUTIONAL PLATFORM', 14, 20);
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(200, 200, 200);
        doc.text(`Authorized By: Office of the Academic Registrar`, 14, 28);
        doc.text(`Generated: ${now}`, doc.internal.pageSize.width - 14, 28, { align: 'right' });

        // --- Title Section ---
        doc.setTextColor(15, 23, 42);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(config.pdfLabel || config.filename, 14, 50);
        
        doc.setFontSize(10);
        doc.setTextColor(100, 116, 139);
        doc.setFont('helvetica', 'italic');
        doc.text('Confidential Institutional Document. Handle with care.', 14, 57);

        // --- Data Table Section ---
        if (config.csvData) {
          const rows = parseCSV(config.csvData);

          if (rows.length > 0) {
            const head = [rows[0]];
            const body = rows.slice(1);
            
            autoTable(doc, {
              startY: 65,
              head: head,
              body: body,
              theme: 'grid',
              styles: { fontSize: 9, cellPadding: 3 },
              headStyles: { fillColor: [30, 41, 59], textColor: [255, 255, 255], fontStyle: 'bold' },
              alternateRowStyles: { fillColor: [248, 250, 252] },
              margin: { top: 65, right: 14, bottom: 20, left: 14 },
            });
          }
        } else {
          doc.setFontSize(12);
          doc.setTextColor(100, 100, 100);
          doc.text('No tabular data provided for this report.', 14, 75);
        }

        // --- Footer Section ---
        const pageCount = (doc as any).internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i);
          doc.setFontSize(8);
          doc.setTextColor(150, 150, 150);
          doc.text(`Page ${i} of ${pageCount} • Capfly Unified Dashboard System`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center' });
        }

        // Trigger Download
        doc.save(`${config.filename}.pdf`);
        toast(`✅ ${config.filename}.pdf downloaded successfully!`);
      } catch (err) {
        console.error('PDF Generation Error:', err);
        toast('❌ Error generating PDF document.');
      }
    }, 900);
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(15,23,42,0.65)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-sm overflow-hidden"
        style={{ animation: 'institutionExportZoom 0.16s ease-out' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/30">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-black text-slate-900 tracking-tight">Select Export Format</p>
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5 truncate max-w-[190px]" title={config.filename}>
                {config.filename}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── Options ── */}
        <div className="p-5 space-y-3">
          {/* Excel / Data Sheet */}
          <button
            id="inst-export-excel-btn"
            onClick={handleExcel}
            className="w-full group flex items-center gap-4 p-4 rounded-xl border-2 border-emerald-200 bg-emerald-50 hover:bg-emerald-100 hover:border-emerald-400 transition-all duration-150 cursor-pointer text-left"
          >
            <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/25 group-hover:scale-110 transition-transform duration-150">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-black text-emerald-900">📊 Excel / Data Sheet (.xlsx)</p>
              <p className="text-[11px] text-emerald-700 font-semibold mt-0.5 leading-relaxed">
                Structured tabular data — open in Excel, Google Sheets, or Numbers
              </p>
            </div>
          </button>

          {/* PDF Report */}
          <button
            id="inst-export-pdf-btn"
            onClick={handlePDF}
            className="w-full group flex items-center gap-4 p-4 rounded-xl border-2 border-blue-200 bg-blue-50 hover:bg-blue-100 hover:border-blue-400 transition-all duration-150 cursor-pointer text-left"
          >
            <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform duration-150">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-black text-blue-900">📄 Formatted Report (.pdf)</p>
              <p className="text-[11px] text-blue-700 font-semibold mt-0.5 leading-relaxed">
                Branded institutional document — print-ready, auditable, NAAC compliant
              </p>
            </div>
          </button>
        </div>

        {/* ── Footer ── */}
        <div className="px-5 pb-5">
          <button
            onClick={onClose}
            className="w-full text-center text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors py-1.5 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>

      <style>{`
        @keyframes institutionExportZoom {
          from { opacity: 0; transform: scale(0.90) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};
