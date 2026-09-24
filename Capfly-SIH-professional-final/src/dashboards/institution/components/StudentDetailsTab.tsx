import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Eye, 
  Mail, 
  Phone, 
  GraduationCap, 
  X, 
  UserCheck, 
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import { DonutChart, MultiSegmentProgressBar, KPICard } from './ChartUtils';
import { InstitutionExportModal } from './InstitutionExportModal';

export interface Student {
  id: number;
  rollNumber: string;
  name: string;
  initials: string;
  color: string;
  department: string;
  year: string;
  email: string;
  contact: string;
  cgpa: number;
  status: 'Active' | 'Inactive' | 'Graduated';
}

const initialStudents: Student[] = [
  { id: 1, rollNumber: '22CSE001', name: 'Arun Suresh', initials: 'AS', color: 'bg-blue-600', department: 'CSE', year: 'Final Year', email: 'arun.s@college.edu.in', contact: '9876543210', cgpa: 9.42, status: 'Active' },
  { id: 2, rollNumber: '22CSE002', name: 'Priya Krishnan', initials: 'PK', color: 'bg-indigo-600', department: 'CSE', year: 'Final Year', email: 'priya.k@college.edu.in', contact: '8765432109', cgpa: 9.18, status: 'Active' },
  { id: 3, rollNumber: '22ECE015', name: 'Rahul Mehta', initials: 'RM', color: 'bg-emerald-600', department: 'ECE', year: 'Third Year', email: 'rahul.m@college.edu.in', contact: '9876123456', cgpa: 8.65, status: 'Active' },
  { id: 4, rollNumber: '23EEE021', name: 'Sneha Gupta', initials: 'SG', color: 'bg-amber-600', department: 'EEE', year: 'Third Year', email: 'sneha.g@college.edu.in', contact: '8765143210', cgpa: 8.90, status: 'Active' },
  { id: 5, rollNumber: '22ME032', name: 'Vignesh Kumar', initials: 'VK', color: 'bg-purple-600', department: 'Mechanical', year: 'Final Year', email: 'vignesh.k@college.edu.in', contact: '9876234567', cgpa: 8.72, status: 'Active' },
  { id: 6, rollNumber: '23CE018', name: 'Divya Thangam', initials: 'DT', color: 'bg-rose-600', department: 'Civil', year: 'Second Year', email: 'divya.t@college.edu.in', contact: '8765987654', cgpa: 7.84, status: 'Active' },
  { id: 7, rollNumber: '22CSE045', name: 'Nandha Kishore', initials: 'NK', color: 'bg-cyan-600', department: 'CSE', year: 'Third Year', email: 'nandha.k@college.edu.in', contact: '9876789012', cgpa: 8.95, status: 'Active' },
  { id: 8, rollNumber: '22ECE038', name: 'Lakshmi Sundaram', initials: 'LS', color: 'bg-teal-600', department: 'ECE', year: 'Final Year', email: 'lakshmi.s@college.edu.in', contact: '8765678901', cgpa: 9.05, status: 'Active' },
  { id: 9, rollNumber: '23EEE007', name: 'Ajay Ramesh', initials: 'AR', color: 'bg-violet-600', department: 'EEE', year: 'Second Year', email: 'ajay.r@college.edu.in', contact: '9876098765', cgpa: 7.40, status: 'Active' },
  { id: 10, rollNumber: '22ME049', name: 'Harini Sridhar', initials: 'HS', color: 'bg-orange-600', department: 'Mechanical', year: 'Third Year', email: 'harini.s@college.edu.in', contact: '8765012345', cgpa: 8.12, status: 'Active' },
  { id: 11, rollNumber: '23CSE077', name: 'Karthik Raj', initials: 'KR', color: 'bg-sky-600', department: 'CSE', year: 'Second Year', email: 'karthik.r@college.edu.in', contact: '9876345678', cgpa: 8.50, status: 'Active' },
  { id: 12, rollNumber: '22CE021', name: 'Pooja Nair', initials: 'PN', color: 'bg-pink-600', department: 'Civil', year: 'Final Year', email: 'pooja.n@college.edu.in', contact: '8765901234', cgpa: 8.30, status: 'Graduated' },
];

export const StudentDetailsTab: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selected, setSelected] = useState<Student | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // New Student Form State
  const [newName, setNewName] = useState('');
  const [newRoll, setNewRoll] = useState('');
  const [newDept, setNewDept] = useState('CSE');
  const [newYear, setNewYear] = useState('First Year');
  const [newEmail, setNewEmail] = useState('');
  const [newContact, setNewContact] = useState('');
  const [newCgpa, setNewCgpa] = useState('8.50');

  const showToast = (msg: string) => { 
    setToastMsg(msg); 
    setTimeout(() => setToastMsg(null), 4000); 
  };

  const filtered = students.filter(s => {
    const q = search.toLowerCase();
    const matchesSearch = 
      s.name.toLowerCase().includes(q) || 
      s.rollNumber.toLowerCase().includes(q) || 
      s.email.toLowerCase().includes(q);
    const matchesDept = deptFilter === 'All' || s.department === deptFilter;
    const matchesYear = yearFilter === 'All' || s.year === yearFilter;
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchesSearch && matchesDept && matchesYear && matchesStatus;
  });

  const deptData = [
    { label: 'CSE', value: 1120, color: '#2563eb' },
    { label: 'ECE', value: 940, color: '#059669' },
    { label: 'EEE', value: 680, color: '#d97706' },
    { label: 'MECH', value: 650, color: '#7c3aed' },
    { label: 'CIVIL', value: 452, color: '#db2777' },
  ];

  const statusSegs = [
    { label: 'Active Students', value: 3482, color: '#059669' },
    { label: 'Graduated', value: 280, color: '#2563eb' },
    { label: 'On Leave', value: 62, color: '#d97706' },
    { label: 'Inactive', value: 18, color: '#ef4444' },
  ];

  const [showExportModal, setShowExportModal] = useState(false);

  const exportConfig = {
    filename: 'student_roster_directory',
    pdfLabel: 'Student Directory & Roll Roster Official Report',
    csvData: 'Roll No,Name,Department,Year,Email,CGPA,Status\n' +
      students.map(s => `"${s.rollNumber}","${s.name}","${s.department}","${s.year}","${s.email}",${s.cgpa},"${s.status}"`).join('\n'),
  };

  const handleExportCSV = () => setShowExportModal(true);

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newRoll.trim()) return;

    const initials = newName
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2) || 'ST';

    const colors = ['bg-blue-600', 'bg-emerald-600', 'bg-purple-600', 'bg-amber-600', 'bg-rose-600', 'bg-cyan-600'];
    const chosenColor = colors[Math.floor(Math.random() * colors.length)];

    const newStudent: Student = {
      id: Date.now(),
      rollNumber: newRoll.toUpperCase(),
      name: newName,
      initials,
      color: chosenColor,
      department: newDept,
      year: newYear,
      email: newEmail || `${newRoll.toLowerCase()}@college.edu.in`,
      contact: newContact || '9876543210',
      cgpa: parseFloat(newCgpa) || 8.0,
      status: 'Active'
    };

    setStudents(prev => [newStudent, ...prev]);
    setShowAdd(false);
    setNewName('');
    setNewRoll('');
    setNewEmail('');
    setNewContact('');
    setNewCgpa('8.50');
    showToast(`Student "${newName}" enrolled successfully!`);
  };

  return (
    <div className="p-6 relative space-y-6 max-w-[1600px] mx-auto">
      <InstitutionExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        config={exportConfig}
        onToast={showToast}
      />
      {toastMsg && (
        <div className="fixed top-20 right-8 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in slide-in-from-top-4 duration-200">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <p className="text-xs font-semibold">{toastMsg}</p>
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Student Directory and Roll Roster</h1>
            <p className="text-xs text-slate-500 mt-0.5">Complete student profiles, enrollment records, CGPA and contact information</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
          >
            <Download className="w-4 h-4 text-slate-500" />
            Export Directory
          </button>
          <button 
            onClick={() => setShowAdd(true)}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-blue-500/20 cursor-pointer transition-colors"
          >
            <Plus className="w-4 h-4" />
            Enrol New Student
          </button>
        </div>
      </div>

      {/* KPIS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Enrolled" value="3,842" change="+248 this year" isPositive={true} icon={<svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>} color="blue" />
        <KPICard title="Active Students" value="3,482" change="90.6% enrolled" isPositive={true} icon={<svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>} color="emerald" />
        <KPICard title="Avg Institutional CGPA" value="8.42" change="+0.12 vs last yr" isPositive={true} icon={<svg className="w-5 h-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>} color="amber" />
        <KPICard title="Distinction Holders" value="614" change="16% of total" isPositive={true} icon={<svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>} color="purple" />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900 mb-1">Enrollment by Department</h2>
          <p className="text-xs text-slate-400 mb-4">Student strength across all academic departments</p>
          <DonutChart data={deptData} centerText="3,842" centerSubtext="Students" />
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900 mb-1">Enrollment Status Distribution</h2>
          <p className="text-xs text-slate-400 mb-6">Breakdown by active, graduated, and inactive students</p>
          <MultiSegmentProgressBar segments={statusSegs} />
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center gap-4">
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name, roll number or email..."
            value={search} 
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3 ml-auto">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs font-semibold text-slate-600">Dept:</span>
            <select 
              value={deptFilter} 
              onChange={e => setDeptFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="All">All Depts</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600">Year:</span>
            <select 
              value={yearFilter} 
              onChange={e => setYearFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="All">All Years</option>
              <option value="First Year">First Year</option>
              <option value="Second Year">Second Year</option>
              <option value="Third Year">Third Year</option>
              <option value="Final Year">Final Year</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600">Status:</span>
            <select 
              value={statusFilter} 
              onChange={e => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Graduated">Graduated</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* STUDENT TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-4 px-6">Student</th>
                <th className="py-4 px-6">Roll Number</th>
                <th className="py-4 px-6">Department</th>
                <th className="py-4 px-6">Academic Year</th>
                <th className="py-4 px-6">CGPA</th>
                <th className="py-4 px-6">Email Address</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl ${s.color} text-white font-bold flex items-center justify-center text-xs shrink-0`}>
                        {s.initials}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block">{s.name}</span>
                        <span className="text-[10px] text-slate-400 font-medium">+91 {s.contact}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-mono font-semibold text-slate-700">{s.rollNumber}</td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-slate-700">{s.department}</span>
                  </td>
                  <td className="py-4 px-6 font-medium text-slate-600">{s.year}</td>
                  <td className="py-4 px-6">
                    <span className="font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded-md">
                      {s.cgpa.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-medium text-slate-500">{s.email}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      s.status === 'Active' ? 'bg-emerald-50 text-emerald-700' :
                      s.status === 'Graduated' ? 'bg-blue-50 text-blue-700' : 'bg-red-50 text-red-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        s.status === 'Active' ? 'bg-emerald-500' : s.status === 'Graduated' ? 'bg-blue-500' : 'bg-red-500'
                      }`} />
                      {s.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button 
                      onClick={() => setSelected(s)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-blue-600 text-xs font-semibold cursor-pointer flex items-center gap-1.5 ml-auto transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400 font-medium">
                    No students matching the selected filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* STUDENT PROFILE MODAL */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 bg-slate-900 text-white flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl ${selected.color} flex items-center justify-center text-white text-xl font-extrabold shrink-0`}>
                {selected.initials}
              </div>
              <div className="flex-1">
                <h2 className="text-base font-bold">{selected.name}</h2>
                <p className="text-xs text-slate-400">{selected.rollNumber} • {selected.department} • {selected.year}</p>
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
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">CGPA</span>
                  <span className="text-lg font-extrabold text-emerald-600">{selected.cgpa.toFixed(2)}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Department</span>
                  <span className="font-bold text-slate-800">{selected.department}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Status</span>
                  <span className={`font-bold ${selected.status === 'Active' ? 'text-emerald-600' : 'text-blue-600'}`}>
                    {selected.status}
                  </span>
                </div>
              </div>
              <div className="space-y-2.5 p-4 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2.5 text-slate-700">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span>{selected.email}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-700">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span>+91 {selected.contact}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-700">
                  <GraduationCap className="w-4 h-4 text-slate-400" />
                  <span>{selected.year} • Enrolled under Full-Time B.Tech/M.Tech Program</span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => setSelected(null)} 
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 cursor-pointer transition-colors"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD STUDENT MODAL */}
      {showAdd && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <h2 className="text-base font-bold flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-400" />
                Enrol New Student
              </h2>
              <button 
                onClick={() => setShowAdd(false)} 
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <form onSubmit={handleAddStudent} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Ananya Krishnan" 
                  value={newName} 
                  onChange={e => setNewName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Roll Number</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. 24CSE101" 
                    value={newRoll} 
                    onChange={e => setNewRoll(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Department</label>
                  <select 
                    value={newDept} 
                    onChange={e => setNewDept(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none cursor-pointer"
                  >
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="EEE">EEE</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Civil">Civil</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Year</label>
                  <select 
                    value={newYear} 
                    onChange={e => setNewYear(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none cursor-pointer"
                  >
                    <option value="First Year">First Year</option>
                    <option value="Second Year">Second Year</option>
                    <option value="Third Year">Third Year</option>
                    <option value="Final Year">Final Year</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Initial CGPA</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    min="0" 
                    max="10" 
                    placeholder="e.g. 8.50" 
                    value={newCgpa} 
                    onChange={e => setNewCgpa(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">College Email</label>
                <input 
                  type="email" 
                  placeholder="e.g. student@college.edu.in" 
                  value={newEmail} 
                  onChange={e => setNewEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                />
              </div>
              <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setShowAdd(false)} 
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md shadow-blue-500/20 cursor-pointer transition-colors"
                >
                  Enrol Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
