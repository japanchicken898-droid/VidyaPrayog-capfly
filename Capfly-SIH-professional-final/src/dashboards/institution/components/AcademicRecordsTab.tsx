import React, { useState } from 'react';
import { BookOpen, Award, TrendingUp, AlertTriangle, Search, Download, Filter, X } from 'lucide-react';
import { SmoothAreaTrendChart, RadarWebChart, KPICard } from './ChartUtils';
import { InstitutionExportModal } from './InstitutionExportModal';

export interface AcademicRecord {
  rollNumber: string; 
  name: string; 
  department: string;
  cgpa: number; 
  semesters: number[]; 
  backlogs: number; 
  distinction: boolean;
}

const records: AcademicRecord[] = [
  { rollNumber: '22CSE001', name: 'Arun Suresh', department: 'CSE', cgpa: 9.42, semesters: [9.2, 9.5, 9.4, 9.6, 9.3, 9.5], backlogs: 0, distinction: true },
  { rollNumber: '22CSE002', name: 'Priya Krishnan', department: 'CSE', cgpa: 9.18, semesters: [9.0, 9.2, 9.1, 9.3, 9.2, 9.3], backlogs: 0, distinction: true },
  { rollNumber: '22ECE015', name: 'Rahul Mehta', department: 'ECE', cgpa: 8.65, semesters: [8.4, 8.7, 8.6, 8.8, 8.5, 8.8], backlogs: 0, distinction: false },
  { rollNumber: '23EEE021', name: 'Sneha Gupta', department: 'EEE', cgpa: 8.90, semesters: [8.8, 8.9, 9.0, 8.8, 9.1, 8.8], backlogs: 0, distinction: true },
  { rollNumber: '22ME032', name: 'Vignesh Kumar', department: 'Mechanical', cgpa: 8.72, semesters: [8.5, 8.8, 8.6, 8.9, 8.7, 8.8], backlogs: 0, distinction: false },
  { rollNumber: '23CE018', name: 'Divya Thangam', department: 'Civil', cgpa: 7.84, semesters: [7.5, 7.8, 8.0, 7.9, 7.8, 8.0], backlogs: 0, distinction: false },
  { rollNumber: '22CSE045', name: 'Nandha Kishore', department: 'CSE', cgpa: 8.95, semesters: [8.7, 9.0, 9.1, 8.9, 9.0, 9.0], backlogs: 0, distinction: true },
  { rollNumber: '22ECE038', name: 'Lakshmi Sundaram', department: 'ECE', cgpa: 9.05, semesters: [8.9, 9.1, 9.0, 9.2, 9.0, 9.1], backlogs: 0, distinction: true },
  { rollNumber: '23EEE007', name: 'Ajay Ramesh', department: 'EEE', cgpa: 7.40, semesters: [7.2, 7.5, 7.3, 7.6, 7.4, 7.4], backlogs: 1, distinction: false },
  { rollNumber: '22ME049', name: 'Harini Sridhar', department: 'Mechanical', cgpa: 8.12, semesters: [8.0, 8.2, 8.1, 8.3, 8.0, 8.0], backlogs: 0, distinction: false },
];

export const AcademicRecordsTab: React.FC = () => {
  const [search, setSearch] = useState('');
  const [dept, setDept] = useState('All');
  const [selected, setSelected] = useState<AcademicRecord | null>(null);

  const filtered = records.filter(r =>
    (r.name.toLowerCase().includes(search.toLowerCase()) || r.rollNumber.toLowerCase().includes(search.toLowerCase()))
    && (dept === 'All' || r.department === dept)
  );

  const cgpaTrend = [
    { label: 'Sem 1', value: 8.12 }, 
    { label: 'Sem 2', value: 8.34 }, 
    { label: 'Sem 3', value: 8.45 },
    { label: 'Sem 4', value: 8.52 }, 
    { label: 'Sem 5', value: 8.58 }, 
    { label: 'Sem 6', value: 8.65 },
  ];

  const radarData = [
    { subject: 'CSE', score: 88 }, 
    { subject: 'ECE', score: 84 }, 
    { subject: 'EEE', score: 82 },
    { subject: 'MECH', score: 80 }, 
    { subject: 'CIVIL', score: 78 }, 
    { subject: 'IT', score: 86 },
  ];

  const [showExportModal, setShowExportModal] = useState(false);
  const [pendingRecord, setPendingRecord] = useState<AcademicRecord | null>(null);

  const downloadTranscript = (record: AcademicRecord) => {
    setPendingRecord(record);
    setShowExportModal(true);
  };

  const getTranscriptExportConfig = (record: AcademicRecord) => ({
    filename: `${record.rollNumber}_official_transcript`,
    pdfLabel: `Official Academic Transcript — ${record.name} (${record.rollNumber})`,
    csvData: `Roll Number,Name,Department,CGPA,Distinction,Backlogs,Semester Scores\n` +
      `"${record.rollNumber}","${record.name}","${record.department}",${record.cgpa},${record.distinction ? 'Yes' : 'No'},${record.backlogs},"${record.semesters.join(' | ')}"`,
  });

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {pendingRecord && (
        <InstitutionExportModal
          isOpen={showExportModal}
          onClose={() => { setShowExportModal(false); setPendingRecord(null); }}
          config={getTranscriptExportConfig(pendingRecord)}
        />
      )}
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Academic Records and CGPA Transcripts</h1>
            <p className="text-xs text-slate-500 mt-0.5">Semester-wise CGPA history, distinction holders, backlog tracking and grade distribution</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => downloadTranscript(selected || records[0])}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
          >
            <Download className="w-4 h-4 text-slate-500" />
            Export Transcripts
          </button>
        </div>
      </div>

      {/* KPIS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Avg Institutional CGPA" value="8.42" change="+0.12 YoY" isPositive={true} icon={<svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>} color="emerald" />
        <KPICard title="Distinction Holders" value="614" change="9+ CGPA" isPositive={true} icon={<svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>} color="blue" />
        <KPICard title="First Class with Distinction" value="2,140" change="55.7% of cohort" isPositive={true} icon={<svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>} color="purple" />
        <KPICard title="Students with Backlogs" value="38" change="Needs intervention" isPositive={false} icon={<svg className="w-5 h-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>} color="amber" />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900 mb-1">Institutional Average CGPA Trend</h2>
          <p className="text-xs text-slate-400 mb-4">Semester-wise progression</p>
          <SmoothAreaTrendChart data={cgpaTrend} color="#059669" />
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900 mb-4">Academic Excellence Score by Department</h2>
          <RadarWebChart data={radarData} />
        </div>
      </div>

      {/* FILTER */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center gap-4">
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search student name or roll number..."
            value={search} 
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>
        <div className="flex items-center gap-3 ml-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs font-semibold text-slate-600">Department:</span>
          <select 
            value={dept} 
            onChange={e => setDept(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="All">All Departments</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Civil">Civil</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Student Academic Records</h3>
          <span className="text-xs text-slate-500">{filtered.length} records</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-6">Student</th>
                <th className="py-3.5 px-4">Department</th>
                <th className="py-3.5 px-4">Current CGPA</th>
                <th className="py-3.5 px-4">Semester GPA Trend</th>
                <th className="py-3.5 px-4">Backlogs</th>
                <th className="py-3.5 px-4 text-center">Distinction</th>
                <th className="py-3.5 px-6 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {filtered.map(r => (
                <tr key={r.rollNumber} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900">{r.name}</div>
                    <div className="text-[11px] font-mono text-slate-400 mt-0.5">{r.rollNumber}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold">{r.department}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`text-base font-extrabold ${r.cgpa >= 9.0 ? 'text-emerald-600' : r.cgpa >= 8.0 ? 'text-blue-600' : 'text-amber-600'}`}>
                      {r.cgpa.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-slate-400 ml-0.5">/ 10</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-end gap-0.5 h-8">
                      {r.semesters.map((gpa, i) => (
                        <div 
                          key={i} 
                          className="w-4 rounded-sm bg-emerald-200 hover:bg-emerald-400 transition-colors cursor-pointer relative group"
                          style={{ height: `${((gpa - 6) / 4) * 100}%` }}
                        >
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            S{i+1}: {gpa}
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {r.backlogs > 0
                      ? <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-[10px] font-bold">{r.backlogs} Backlog</span>
                      : <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">Clear</span>}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {r.distinction
                      ? <Award className="w-4 h-4 text-amber-500 mx-auto" />
                      : <span className="text-slate-300 text-lg">-</span>}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button 
                      onClick={() => setSelected(r)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 text-emerald-600 text-xs font-semibold cursor-pointer transition-colors"
                    >
                      View Record
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RECORD MODAL */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold">{selected.name}</h2>
                <p className="text-xs text-slate-400">{selected.rollNumber} • {selected.department} • CGPA: {selected.cgpa.toFixed(2)}</p>
              </div>
              <button 
                onClick={() => setSelected(null)} 
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                {selected.semesters.map((g, i) => (
                  <div key={i} className={`p-3 rounded-xl border text-center ${g >= 9 ? 'bg-emerald-50 border-emerald-200' : g >= 8 ? 'bg-blue-50 border-blue-200' : 'bg-amber-50 border-amber-200'}`}>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Semester {i+1}</div>
                    <div className={`text-xl font-extrabold mt-1 ${g >= 9 ? 'text-emerald-600' : g >= 8 ? 'text-blue-600' : 'text-amber-600'}`}>{g.toFixed(2)}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-700">Overall CGPA</span>
                <span className="text-xl font-extrabold text-emerald-600">{selected.cgpa.toFixed(2)} / 10.0</span>
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button 
                onClick={() => downloadTranscript(selected)}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 cursor-pointer flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Download Transcript
              </button>
              <button 
                onClick={() => setSelected(null)} 
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
