import React, { useState } from 'react';
import { Briefcase, Search, Filter, Calendar, CheckCircle2, Award, Download, Plus, Star, ShieldCheck, Eye, Check } from 'lucide-react';
import { KPICard } from './ChartUtils';
import { IndustryExportModal } from './IndustryExportModal';

interface InternshipRecord {
  id: string;
  name: string;
  dept: string;
  hostIndustry: string;
  title: string;
  duration: string;
  mentorRating: number;
  status: 'Applied' | 'Ongoing' | 'Completed';
  type: 'Student' | 'Faculty';
}

export const InternshipsTab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'Student Internships' | 'Faculty FDPs & Industrial Training'>('Student Internships');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [records, setRecords] = useState<InternshipRecord[]>([
    {
      id: 'CAP001',
      name: 'Harini S',
      dept: 'CSE',
      hostIndustry: 'TCS Research',
      title: 'Cloud Infrastructure & Microservices',
      duration: '6 Months',
      mentorRating: 4.8,
      status: 'Completed',
      type: 'Student',
    },
    {
      id: 'CAP002',
      name: 'Karthik R',
      dept: 'ECE',
      hostIndustry: 'Bosch Engineering',
      title: 'Embedded RISC-V Firmware Dev',
      duration: '3 Months',
      mentorRating: 4.5,
      status: 'Ongoing',
      type: 'Student',
    },
    {
      id: 'CAP004',
      name: 'Arun K',
      dept: 'Mechanical',
      hostIndustry: 'Larsen & Toubro',
      title: 'Robotic Welding & Digital Twin',
      duration: '6 Months',
      mentorRating: 4.9,
      status: 'Completed',
      type: 'Student',
    },
    {
      id: 'CAP005',
      name: 'Divya L',
      dept: 'Civil',
      hostIndustry: 'L&T Construction',
      title: 'BIM 3D Modeling Internship',
      duration: '2 Months',
      mentorRating: 4.2,
      status: 'Applied',
      type: 'Student',
    },
    // Faculty FDPs
    {
      id: 'FAC001',
      name: 'Dr. Anitha S',
      dept: 'CSE',
      hostIndustry: 'Infosys Springboard',
      title: 'Advanced GenAI & LLM Architecture',
      duration: '14 Days',
      mentorRating: 5.0,
      status: 'Completed',
      type: 'Faculty',
    },
    {
      id: 'FAC002',
      name: 'Dr. Karthik R',
      dept: 'ECE',
      hostIndustry: 'Texas Instruments',
      title: '5G Communication Protocol FDP',
      duration: '7 Days',
      mentorRating: 4.7,
      status: 'Ongoing',
      type: 'Faculty',
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleApproveCompletion = (id: string, name: string) => {
    setRecords(prev =>
      prev.map(r => r.id === id ? { ...r, status: 'Completed' } : r)
    );
    showToast(`Approved internship completion & issued digital certificate for ${name}!`);
  };

  const handleExport = () => {
    setShowExportModal(true);
  };

  const [showExportModal, setShowExportModal] = useState(false);

  const exportConfig = {
    filename: 'internships_ledger_report',
    pdfLabel: 'Internship & FDP Hub — Official Ledger Report',
    csvData: 'ID,Name,Department,Host Industry,Title,Duration,Mentor Rating,Status,Type\n' +
      records.map(r => `"${r.id}","${r.name}","${r.dept}","${r.hostIndustry}","${r.title}","${r.duration}",${r.mentorRating},"${r.status}","${r.type}"`).join('\n'),
  };

  const currentType = activeSubTab === 'Student Internships' ? 'Student' : 'Faculty';

  const filteredRecords = records
    .filter(r => r.type === currentType)
    .filter(r => selectedDept === 'All' || r.dept === selectedDept)
    .filter(r => selectedStatus === 'All' || r.status === selectedStatus)
    .filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.id.toLowerCase().includes(searchQuery.toLowerCase()) || r.hostIndustry.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6 pb-12 font-sans text-slate-800">
      <IndustryExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        config={exportConfig}
        onToast={showToast}
      />
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-3 border border-slate-700 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}


      {/* Page Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
        <div>
          <h1 className="text-lg font-black text-slate-800 tracking-tight">Internship &amp; FDP Hub</h1>
          <div className="text-xs font-semibold text-slate-500">Dashboard &gt; Internship Hub</div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-lg transition-colors shadow-sm cursor-pointer w-fit">
          <Plus className="w-4 h-4" /> Add Internship Record
        </button>
      </div>

      {/* KPIS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Internships" value="450" change="+12% YoY" isPositive={true} icon={<svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>} color="blue" />
        <KPICard title="Pre-Placement Offers" value="84" change="High conversion" isPositive={true} icon={<svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>} color="emerald" />
        <KPICard title="Avg Stipend" value="₹ 22k / Mo" change="Top tier" isPositive={true} icon={<svg className="w-5 h-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>} color="amber" />
        <KPICard title="Completion Rate" value="98%" change="Verified" isPositive={true} icon={<svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>} color="purple" />
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-xl shadow-xs px-2 overflow-x-auto">
        {(['Student Internships', 'Faculty FDPs & Industrial Training'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={`px-5 py-3 text-xs font-bold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeSubTab === tab 
                ? 'border-emerald-600 text-emerald-700 bg-emerald-50/40' 
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search & Filter Controls Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID, Candidate Name, or Host Industry..."
            className="w-full pl-9 pr-4 py-2 bg-slate-100 border-none rounded-lg text-xs font-semibold focus:ring-2 focus:ring-emerald-500 outline-none text-slate-700 placeholder-slate-400"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-500">Department:</label>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-3 py-2 bg-slate-100 border-none rounded-lg text-xs font-bold text-slate-700 outline-none cursor-pointer"
          >
            <option value="All">Select Department (All)</option>
            <option value="CSE">CSE / IT</option>
            <option value="ECE">ECE</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Civil">Civil</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-500">Status:</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-slate-100 border-none rounded-lg text-xs font-bold text-slate-700 outline-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Applied">Applied (Yellow)</option>
            <option value="Ongoing">Ongoing (Blue)</option>
            <option value="Completed">Completed (Green)</option>
          </select>
        </div>
      </div>

      {/* Internship Action Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <h2 className="text-sm font-black text-slate-800 tracking-tight">
            {activeSubTab} Ledger ({filteredRecords.length})
          </h2>
          <button onClick={handleExport} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-md text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer">
            <Download className="w-3.5 h-3.5" /> Export PDF Ledger
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[10px] uppercase font-black text-slate-500 tracking-wider">
                <th className="p-4 border-b border-slate-200 w-12 text-center">#</th>
                <th className="p-4 border-b border-slate-200">ID</th>
                <th className="p-4 border-b border-slate-200">Candidate Name</th>
                <th className="p-4 border-b border-slate-200">Department</th>
                <th className="p-4 border-b border-slate-200">Host Industry</th>
                <th className="p-4 border-b border-slate-200">Internship Title / Scope</th>
                <th className="p-4 border-b border-slate-200 text-center">Duration</th>
                <th className="p-4 border-b border-slate-200 text-center">Mentor Rating</th>
                <th className="p-4 border-b border-slate-200 text-center">Status</th>
                <th className="p-4 border-b border-slate-200 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-xs font-semibold text-slate-700">
              {filteredRecords.map((row, i) => {
                let statusBadge = 'bg-amber-100 text-amber-800 border-amber-200';
                if (row.status === 'Ongoing') statusBadge = 'bg-blue-100 text-blue-800 border-blue-200';
                if (row.status === 'Completed') statusBadge = 'bg-emerald-100 text-emerald-800 border-emerald-200';

                return (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 border-b border-slate-200 text-center text-slate-400">{i + 1}</td>
                    <td className="p-4 border-b border-slate-200 font-bold text-slate-900">{row.id}</td>
                    <td className="p-4 border-b border-slate-200 font-bold text-slate-800">{row.name}</td>
                    <td className="p-4 border-b border-slate-200 text-slate-500">{row.dept}</td>
                    <td className="p-4 border-b border-slate-200 font-bold text-slate-700">{row.hostIndustry}</td>
                    <td className="p-4 border-b border-slate-200 text-slate-600">{row.title}</td>
                    <td className="p-4 border-b border-slate-200 text-center font-bold text-slate-600">{row.duration}</td>
                    <td className="p-4 border-b border-slate-200 text-center font-bold">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 text-[11px]">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {row.mentorRating}
                      </span>
                    </td>
                    <td className="p-4 border-b border-slate-200 text-center">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider border ${statusBadge}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="p-4 border-b border-slate-200 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => showToast(`Viewing detailed progress report for ${row.name}...`)}
                          className="px-2.5 py-1 border border-slate-300 text-slate-700 bg-white hover:bg-slate-100 rounded text-[10px] font-bold uppercase transition-colors cursor-pointer"
                        >
                          View Report
                        </button>
                        {row.status !== 'Completed' && (
                          <button
                            onClick={() => handleApproveCompletion(row.id, row.name)}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-black uppercase transition-colors shadow-xs cursor-pointer"
                          >
                            Approve
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
