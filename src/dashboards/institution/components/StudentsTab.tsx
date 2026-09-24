import React, { useState } from 'react';
import { DonutChart, VerticalBarChart, RadialGauge } from './ChartUtils';
import { Search, Plus, Download, ShieldCheck, CheckCircle2, X, Award, CheckSquare, Square } from 'lucide-react';
import { InstitutionExportModal } from './InstitutionExportModal';

interface Student {
  id: string;
  name: string;
  dept: string;
  year: string;
  score: string;
  int: string;
  intColor: string;
  place: string;
  placeColor: string;
  verified?: boolean;
  techSkills: { name: string; score: number; gap: number }[];
  softSkills: { name: string; score: number; gap: number }[];
  badges: string[];
  companyMatch: { company: string; score: number; logoColor: string }[];
}

export const StudentsTab: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([
    {
      id: 'CAP001',
      name: 'Harini S',
      dept: 'CSE',
      year: '4',
      score: '92%',
      int: 'Completed',
      intColor: 'text-emerald-600 bg-emerald-100',
      place: 'Placed',
      placeColor: 'text-blue-600 bg-blue-100',
      verified: true,
      techSkills: [
        { name: 'Data Structures & Algorithms', score: 94, gap: 6 },
        { name: 'Full Stack React / Node.js', score: 90, gap: 10 },
        { name: 'Cloud Native & Docker', score: 88, gap: 12 },
        { name: 'GenAI & Python', score: 95, gap: 5 },
      ],
      softSkills: [
        { name: 'Technical Communication', score: 88, gap: 12 },
        { name: 'Agile Team Collaboration', score: 92, gap: 8 },
        { name: 'Problem Solving & Logic', score: 96, gap: 4 },
      ],
      badges: ['AWS Certified Cloud Practitioner', 'NPTEL AI Specialist (Gold)', 'React Professional Badge', 'SIH Hackathon Winner'],
      companyMatch: [
        { company: 'Tata Consultancy Services', score: 94, logoColor: 'bg-blue-600' },
        { company: 'Zoho Corporation', score: 91, logoColor: 'bg-emerald-600' },
        { company: 'Infosys', score: 88, logoColor: 'bg-indigo-600' },
        { company: 'Bosch Engineering', score: 85, logoColor: 'bg-amber-600' },
      ]
    },
    {
      id: 'CAP002',
      name: 'Karthik R',
      dept: 'ECE',
      year: '3',
      score: '78%',
      int: 'Ongoing',
      intColor: 'text-blue-600 bg-blue-100',
      place: 'Eligible',
      placeColor: 'text-indigo-600 bg-indigo-100',
      verified: false,
      techSkills: [
        { name: 'Embedded C & RISC-V', score: 82, gap: 18 },
        { name: 'VLSI Circuit Design', score: 75, gap: 25 },
        { name: 'IoT Protocols & Sensors', score: 80, gap: 20 },
      ],
      softSkills: [
        { name: 'Technical Presentation', score: 72, gap: 28 },
        { name: 'Analytical Thinking', score: 84, gap: 16 },
      ],
      badges: ['ARM Microcontroller Certified', 'NPTEL Embedded Systems'],
      companyMatch: [
        { company: 'Bosch Engineering', score: 89, logoColor: 'bg-amber-600' },
        { company: 'Texas Instruments', score: 82, logoColor: 'bg-rose-600' },
        { company: 'Infosys', score: 76, logoColor: 'bg-indigo-600' },
      ]
    },
    {
      id: 'CAP003',
      name: 'Priya M',
      dept: 'EEE',
      year: '3',
      score: '65%',
      int: 'Not Applied',
      intColor: 'text-rose-600 bg-rose-100',
      place: 'Not Placed',
      placeColor: 'text-rose-600 bg-rose-100',
      verified: false,
      techSkills: [
        { name: 'Power Electronics', score: 70, gap: 30 },
        { name: 'EV Battery Management', score: 62, gap: 38 },
        { name: 'MATLAB Simulation', score: 68, gap: 32 },
      ],
      softSkills: [
        { name: 'Group Discussion', score: 65, gap: 35 },
        { name: 'Time Management', score: 70, gap: 30 },
      ],
      badges: ['IEEE Student Member'],
      companyMatch: [
        { company: 'Larsen & Toubro', score: 74, logoColor: 'bg-blue-600' },
        { company: 'Tata Power', score: 71, logoColor: 'bg-emerald-600' },
      ]
    },
    {
      id: 'CAP004',
      name: 'Arun K',
      dept: 'Mechanical',
      year: '4',
      score: '88%',
      int: 'Completed',
      intColor: 'text-emerald-600 bg-emerald-100',
      place: 'Placed',
      placeColor: 'text-blue-600 bg-blue-100',
      verified: true,
      techSkills: [
        { name: 'SolidWorks CAD/CAM', score: 92, gap: 8 },
        { name: 'Robotics & Automation', score: 86, gap: 14 },
        { name: 'Finite Element Analysis', score: 84, gap: 16 },
      ],
      softSkills: [
        { name: 'Project Management', score: 90, gap: 10 },
        { name: 'Leadership', score: 88, gap: 12 },
      ],
      badges: ['Certified SolidWorks Associate', 'Industrial Robotics Level 2'],
      companyMatch: [
        { company: 'Larsen & Toubro', score: 92, logoColor: 'bg-blue-600' },
        { company: 'Mahindra & Mahindra', score: 87, logoColor: 'bg-rose-600' },
      ]
    },
    {
      id: 'CAP005',
      name: 'Divya L',
      dept: 'Civil',
      year: '2',
      score: '70%',
      int: 'Ongoing',
      intColor: 'text-blue-600 bg-blue-100',
      place: 'Eligible',
      placeColor: 'text-indigo-600 bg-indigo-100',
      verified: false,
      techSkills: [
        { name: 'AutoCAD 3D', score: 78, gap: 22 },
        { name: 'Building Information Modeling (BIM)', score: 68, gap: 32 },
      ],
      softSkills: [
        { name: 'Team Communication', score: 75, gap: 25 },
      ],
      badges: ['Autodesk Certified User'],
      companyMatch: [
        { company: 'Larsen & Toubro Civil', score: 78, logoColor: 'bg-blue-600' },
      ]
    },
  ]);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeStudentModal, setActiveStudentModal] = useState<Student | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: '', dept: 'CSE', year: '1', score: '' });

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All Departments');
  const [yearFilter, setYearFilter] = useState('All Years');
  const [internshipFilter, setInternshipFilter] = useState('All');
  const [verificationFilter, setVerificationFilter] = useState('All');

  // Derived: filtered students
  const filteredStudents = students.filter(s => {
    const q = searchQuery.toLowerCase();
    if (q && !s.name.toLowerCase().includes(q) && !s.id.toLowerCase().includes(q)) return false;
    if (deptFilter !== 'All Departments' && s.dept !== deptFilter) return false;
    if (yearFilter !== 'All Years' && s.year !== yearFilter.replace(/[^0-9]/g, '')) return false;
    if (internshipFilter === 'Completed' && s.int !== 'Completed') return false;
    if (internshipFilter === 'Ongoing' && s.int !== 'Ongoing') return false;
    if (internshipFilter === 'Not Applied' && s.int !== 'Not Applied') return false;
    if (verificationFilter === 'Verified & Stamped' && !s.verified) return false;
    if (verificationFilter === 'Pending Stamp' && s.verified) return false;
    return true;
  });

  const STUDENTS_PER_PAGE = 5;
  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / STUDENTS_PER_PAGE));
  const pagedStudents = filteredStudents.slice((currentPage - 1) * STUDENTS_PER_PAGE, currentPage * STUDENTS_PER_PAGE);

  const setFilterAndReset = (setter: (v: string) => void) => (v: string) => {
    setter(v);
    setCurrentPage(1);
  };

  // Dynamic chart data from filteredStudents
  const depts = ['CSE', 'ECE', 'EEE', 'Mechanical', 'Civil'];
  const deptColors: Record<string, string> = { CSE: '#3b82f6', ECE: '#10b981', EEE: '#f59e0b', Mechanical: '#8b5cf6', Civil: '#ec4899' };
  const deptChartData = depts.map(d => ({
    label: d, value: filteredStudents.filter(s => s.dept === d).length, color: deptColors[d]
  })).filter(d => d.value > 0);
  const othersCount = filteredStudents.filter(s => !depts.includes(s.dept)).length;
  if (othersCount > 0) deptChartData.push({ label: 'Others', value: othersCount, color: '#94a3b8' });

  const yearChartData = [
    { label: '1st Year', value: filteredStudents.filter(s => s.year === '1').length, color: '#3b82f6' },
    { label: '2nd Year', value: filteredStudents.filter(s => s.year === '2').length, color: '#10b981' },
    { label: '3rd Year', value: filteredStudents.filter(s => s.year === '3').length, color: '#f59e0b' },
    { label: '4th Year', value: filteredStudents.filter(s => s.year === '4').length, color: '#8b5cf6' },
  ].filter(y => y.value > 0);

  const assessedCount = filteredStudents.filter(s => parseFloat(s.score) >= 60).length;

  const intCompleted = filteredStudents.filter(s => s.int === 'Completed').length;
  const intOngoing = filteredStudents.filter(s => s.int === 'Ongoing').length;
  const intApplied = filteredStudents.filter(s => s.int !== 'Not Applied').length - intCompleted - intOngoing;
  const intNotStarted = filteredStudents.filter(s => s.int === 'Not Applied').length;
  const intChartData = [
    { label: 'Completed', value: intCompleted, color: '#f59e0b' },
    { label: 'Ongoing', value: intOngoing, color: '#10b981' },
    { label: 'Applied', value: Math.max(0, intApplied), color: '#3b82f6' },
    { label: 'Not Started', value: intNotStarted, color: '#8b5cf6' },
  ].filter(d => d.value > 0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const [showExportModal, setShowExportModal] = useState(false);

  const exportConfig = {
    filename: 'students_export',
    pdfLabel: 'Student Records & Verification Directory',
    csvData: ['Student ID,Name,Department,Year,Skill Score,Internship Status,Placement Status,Stamp Status',
      ...students.map(s => `${s.id},"${s.name}","${s.dept}","${s.year}","${s.score}","${s.int}","${s.place}","${s.verified ? 'Verified & Stamped' : 'Pending Stamp'}"`)
    ].join('\n'),
  };

  const handleExport = () => setShowExportModal(true);

  const handleAddStudent = () => {
    if (!newStudent.name.trim() || !newStudent.score.trim()) {
      showToast('Please fill in all required fields.');
      return;
    }
    const nextId = `CAP${String(students.length + 1).padStart(3, '0')}`;
    const added: Student = {
      id: nextId,
      name: newStudent.name.trim(),
      dept: newStudent.dept,
      year: newStudent.year,
      score: newStudent.score.includes('%') ? newStudent.score : newStudent.score + '%',
      int: 'Not Applied',
      intColor: 'text-rose-600 bg-rose-100',
      place: 'Not Placed',
      placeColor: 'text-rose-600 bg-rose-100',
      verified: false,
      techSkills: [],
      softSkills: [],
      badges: [],
      companyMatch: [],
    };
    setStudents(prev => [...prev, added]);
    setNewStudent({ name: '', dept: 'CSE', year: '1', score: '' });
    setShowAddModal(false);
    setCurrentPage(Math.ceil((students.length + 1) / STUDENTS_PER_PAGE));
    showToast(`Student ${added.name} (${nextId}) added successfully!`);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === students.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(students.map(s => s.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleBatchVerify = () => {
    if (selectedIds.length === 0) return;
    setStudents(prev =>
      prev.map(s => selectedIds.includes(s.id) ? { ...s, verified: true } : s)
    );
    showToast(`Successfully verified & cryptographically stamped ${selectedIds.length} student portfolios!`);
    setSelectedIds([]);
  };

  return (
    <div className="space-y-6 pb-16 relative">
      <InstitutionExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        config={exportConfig}
        onToast={showToast}
      />
      {/* Toast */}
      {toastMessage && (

        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-3 border border-slate-700 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* 4 Visual Charts Grid — reactive to filters */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm flex flex-col h-64">
          <h3 className="text-[11px] font-black text-slate-800 mb-3 tracking-tight">Student Distribution (Dept)</h3>
          <div className="flex-1 flex items-center justify-center">
            {deptChartData.length > 0
              ? <DonutChart data={deptChartData} />
              : <p className="text-xs text-slate-400">No data</p>}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm flex flex-col h-64">
          <h3 className="text-[11px] font-black text-slate-800 mb-3 tracking-tight">Year Wise Students</h3>
          <div className="flex-1 flex items-center justify-center">
            {yearChartData.length > 0
              ? <VerticalBarChart data={yearChartData} />
              : <p className="text-xs text-slate-400">No data</p>}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm flex flex-col h-64">
          <h3 className="text-[11px] font-black text-slate-800 mb-3 tracking-tight">Skill Assessment Progress</h3>
          <div className="flex-1 flex items-center justify-center">
            <RadialGauge value={assessedCount} total={Math.max(1, filteredStudents.length)} color="#3b82f6" label="Assessed" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm flex flex-col h-64">
          <h3 className="text-[11px] font-black text-slate-800 mb-3 tracking-tight">Internship & Placement</h3>
          <div className="flex-1 flex items-center justify-center">
            {intChartData.length > 0
              ? <DonutChart data={intChartData} />
              : <p className="text-xs text-slate-400">No data</p>}
          </div>
        </div>
      </div>

      {/* Student Records Ledger */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-200/80 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-black text-slate-800 tracking-tight">Student Records & Verification</h2>
            <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full">
              {filteredStudents.filter(s => s.verified).length} / {filteredStudents.length} Portfolios Stamped
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-300 rounded-md text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 rounded-md text-xs font-bold text-white hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Student
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="p-4 border-b border-slate-200/80 flex items-center gap-4 bg-white">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by Name / ID" 
              className="w-full pl-9 pr-4 py-2 bg-slate-100 border-none rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none text-slate-700 font-semibold placeholder-slate-400"
            />
          </div>
          <select className="px-3 py-2 bg-slate-100 border-none rounded-lg text-xs font-semibold text-slate-700 outline-none appearance-none pr-8 relative cursor-pointer min-w-[140px]">
            <option>All Departments</option>
            <option>CSE</option>
            <option>ECE</option>
          </select>
          <select className="px-3 py-2 bg-slate-100 border-none rounded-lg text-xs font-semibold text-slate-700 outline-none appearance-none pr-8 relative cursor-pointer min-w-[120px]">
            <option>All Years</option>
            <option>1st Year</option>
            <option>2nd Year</option>
          </select>
          <select className="px-3 py-2 bg-slate-100 border-none rounded-lg text-xs font-semibold text-slate-700 outline-none appearance-none pr-8 relative cursor-pointer min-w-[140px]">
            <option>Internship Status</option>
            <option>Completed</option>
            <option>Ongoing</option>
          </select>
          <select className="px-3 py-2 bg-slate-100 border-none rounded-lg text-xs font-semibold text-slate-700 outline-none appearance-none pr-8 relative cursor-pointer min-w-[140px]">
            <option>Verification Status</option>
            <option>Verified & Stamped</option>
            <option>Pending Stamp</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[10px] uppercase font-black text-slate-500 tracking-wider">
                <th className="p-4 border-b border-slate-200/80 w-10 text-center">
                  <button onClick={toggleSelectAll} className="text-slate-500 hover:text-blue-600">
                    {selectedIds.length === students.length && students.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-blue-600" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="p-4 border-b border-slate-200/80 w-12 text-center">#</th>
                <th className="p-4 border-b border-slate-200/80">Student ID</th>
                <th className="p-4 border-b border-slate-200/80">Name</th>
                <th className="p-4 border-b border-slate-200/80">Department</th>
                <th className="p-4 border-b border-slate-200/80 text-center">Year</th>
                <th className="p-4 border-b border-slate-200/80 text-center">Skill Score</th>
                <th className="p-4 border-b border-slate-200/80 text-center">Stamp Status</th>
                <th className="p-4 border-b border-slate-200/80 text-center">Placement Status</th>
                <th className="p-4 border-b border-slate-200/80 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-xs font-semibold text-slate-700">
              {pagedStudents.map((row, i) => {
                const globalIndex = (currentPage - 1) * STUDENTS_PER_PAGE + i;
                const isSelected = selectedIds.includes(row.id);
                return (
                  <tr key={row.id} className={`hover:bg-slate-50 transition-colors group ${isSelected ? 'bg-blue-50/40' : ''}`}>
                    <td className="p-4 border-b border-slate-200/80 text-center">
                      <button onClick={() => toggleSelect(row.id)} className="text-slate-400 hover:text-blue-600">
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-300" />
                        )}
                      </button>
                    </td>
                    <td className="p-4 border-b border-slate-200/80 text-center text-slate-400">{globalIndex + 1}</td>
                    <td className="p-4 border-b border-slate-200/80 font-bold text-slate-800">{row.id}</td>
                    <td className="p-4 border-b border-slate-200/80">
                      <div className="flex items-center gap-2">
                        <span>{row.name}</span>
                        {row.verified && (
                          <span title="Verified Digital Portfolio">
                            <ShieldCheck className="w-4 h-4 text-blue-600" />
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 border-b border-slate-200/80 text-slate-500">{row.dept}</td>
                    <td className="p-4 border-b border-slate-200/80 text-center">{row.year}</td>
                    <td className="p-4 border-b border-slate-200/80 text-center font-bold text-slate-800">{row.score}</td>
                    <td className="p-4 border-b border-slate-200/80 text-center">
                      {row.verified ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-700 border border-blue-200">
                          <ShieldCheck className="w-3 h-3 text-blue-600" /> Verified & Stamped
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-500">
                          Pending Stamp
                        </span>
                      )}
                    </td>
                    <td className="p-4 border-b border-slate-200/80 text-center">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${row.placeColor}`}>{row.place}</span>
                    </td>
                    <td className="p-4 border-b border-slate-200/80 text-center">
                      <button
                        onClick={() => setActiveStudentModal(row)}
                        className="px-3 py-1 border border-blue-200 text-blue-600 bg-blue-50 rounded-md text-[10px] font-bold uppercase hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 flex items-center justify-between bg-white text-xs text-slate-500 font-semibold">
          <p>
            {filteredStudents.length === 0
              ? 'No students match the current filters'
              : `Showing ${(currentPage - 1) * STUDENTS_PER_PAGE + 1} to ${Math.min(currentPage * STUDENTS_PER_PAGE, filteredStudents.length)} of ${filteredStudents.length} student${filteredStudents.length !== 1 ? 's' : ''}`}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
            >&lt;</button>
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 flex items-center justify-center rounded font-bold cursor-pointer transition-colors ${
                  currentPage === page
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'hover:bg-slate-100 text-slate-600'
                }`}
              >{page}</button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || filteredStudents.length === 0}
              className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
            >&gt;</button>
          </div>
        </div>
      </div>

      {/* VERIFICATION BATCH DRAWER (FLAKE / FLOATING BAR) */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3.5 rounded-2xl shadow-2xl z-40 flex items-center gap-6 border border-slate-700 animate-fadeIn">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs font-black">
              {selectedIds.length}
            </span>
            <span className="text-xs font-bold text-slate-200">Students Selected for Verification</span>
          </div>

          <div className="h-4 w-px bg-slate-700" />

          <div className="flex items-center gap-3">
            <button
              onClick={handleBatchVerify}
              className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black rounded-lg transition-colors shadow-md cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              Verify & Stamp Student Digital Portfolios
            </button>
            <button
              onClick={() => setSelectedIds([])}
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-white font-semibold"
            >
              Deselect All
            </button>
          </div>
        </div>
      )}

      {/* ADD STUDENT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-200">
            <div className="p-5 bg-slate-900 text-white rounded-t-2xl flex items-center justify-between">
              <h3 className="text-sm font-black">Add New Student</h3>
              <button onClick={() => setShowAddModal(false)} className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Full Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={newStudent.name}
                  onChange={e => setNewStudent(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Ravi Kumar"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Department</label>
                  <select
                    value={newStudent.dept}
                    onChange={e => setNewStudent(prev => ({ ...prev, dept: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>CSE</option>
                    <option>ECE</option>
                    <option>EEE</option>
                    <option>Mechanical</option>
                    <option>Civil</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Year</label>
                  <select
                    value={newStudent.year}
                    onChange={e => setNewStudent(prev => ({ ...prev, year: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Skill Score <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={newStudent.score}
                  onChange={e => setNewStudent(prev => ({ ...prev, score: e.target.value }))}
                  placeholder="e.g. 75%"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-200 rounded-b-2xl flex justify-end gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-white border border-slate-300 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >Cancel</button>
              <button
                onClick={handleAddStudent}
                className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
              >Add Student</button>
            </div>
          </div>
        </div>
      )}

      {/* DETAILED SKILL PROFILING MODAL */}
      {activeStudentModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
            {/* Modal Header */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 rounded-t-2xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-lg">
                  {activeStudentModal.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black">{activeStudentModal.name}</h3>
                    <span className="text-xs font-bold text-blue-400 bg-blue-500/20 px-2.5 py-0.5 rounded border border-blue-500/30">
                      {activeStudentModal.id}
                    </span>
                    {activeStudentModal.verified && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
                        <ShieldCheck className="w-3.5 h-3.5" /> Institutional Stamp Verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Department: {activeStudentModal.dept} • Year {activeStudentModal.year} • Overall Skill Score: {activeStudentModal.score}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveStudentModal(null)}
                className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Technical vs Soft Skill Gap Breakdown */}
              <div>
                <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-3">Individual Skill Gap Breakdown</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Tech Skills */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="text-xs font-black text-blue-700 uppercase">Technical Core Skills</span>
                      <span className="text-[10px] text-slate-500 font-bold">Score / Target</span>
                    </div>
                    {activeStudentModal.techSkills.map((sk, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs font-bold text-slate-700">
                          <span>{sk.name}</span>
                          <span className="text-blue-600">{sk.score}%</span>
                        </div>
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div className="bg-blue-600 h-full rounded-full" style={{ width: `${sk.score}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Soft Skills */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="text-xs font-black text-emerald-700 uppercase">Soft Skills & Leadership</span>
                      <span className="text-[10px] text-slate-500 font-bold">Score / Target</span>
                    </div>
                    {activeStudentModal.softSkills.map((sk, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs font-bold text-slate-700">
                          <span>{sk.name}</span>
                          <span className="text-emerald-600">{sk.score}%</span>
                        </div>
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${sk.score}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Verified Badge Status */}
              <div>
                <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-3">Verified Digital Badges & Certifications</h4>
                <div className="flex flex-wrap gap-2">
                  {activeStudentModal.badges.map((bg, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-bold">
                      <Award className="w-3.5 h-3.5 text-indigo-600" />
                      {bg}
                    </span>
                  ))}
                </div>
              </div>

              {/* Company Placement Match Scores (%) */}
              <div>
                <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-3">Company Placement Match Scores (%)</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {activeStudentModal.companyMatch.map((c, idx) => (
                    <div key={idx} className="p-3 bg-white border border-slate-200 rounded-xl shadow-2xs flex flex-col items-center text-center">
                      <div className={`w-8 h-8 rounded-lg ${c.logoColor} text-white flex items-center justify-center font-black text-xs mb-2`}>
                        {c.company.charAt(0)}
                      </div>
                      <p className="text-[11px] font-bold text-slate-800 line-clamp-1">{c.company}</p>
                      <div className="mt-2 text-base font-black text-blue-600">{c.score}%</div>
                      <span className="text-[9px] text-slate-400 font-bold">Match Index</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3 rounded-b-2xl">
              <button
                onClick={() => setActiveStudentModal(null)}
                className="px-4 py-2 bg-white border border-slate-300 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-100 transition-colors"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
