import React, { useState } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Download, 
  Search, 
  Filter, 
  Send, 
  User, 
  ShieldCheck, 
  ChevronRight, 
  X, 
  Bell, 
  FileSpreadsheet,
  Check,
  TrendingUp,
  GraduationCap
} from 'lucide-react';
import { InstitutionExportModal } from './InstitutionExportModal';
import { SemiCircleGauge, VerticalBarChart, KPICard } from './ChartUtils';

interface AttendanceRecord {
  id: string;
  rollNumber: string;
  name: string;
  dept: string;
  year: string;
  totalClasses: number;
  attendedClasses: number;
  percentage: number;
  lastSwipe: string;
  status: 'Normal' | 'Shortage Warning' | 'Perfect';
  subjects: { name: string; attended: number; total: number; pct: number }[];
}

const initialAttendanceData: AttendanceRecord[] = [
  {
    id: 'att-1',
    rollNumber: '21CS101',
    name: 'Aarav Sharma',
    dept: 'Computer Science',
    year: '4th Year',
    totalClasses: 180,
    attendedClasses: 168,
    percentage: 93.3,
    lastSwipe: 'Today, 08:45 AM (Biometric Gate 2)',
    status: 'Normal',
    subjects: [
      { name: 'Distributed Systems', attended: 42, total: 45, pct: 93.3 },
      { name: 'Machine Learning', attended: 43, total: 45, pct: 95.5 },
      { name: 'Cloud Computing', attended: 41, total: 45, pct: 91.1 },
      { name: 'Compiler Design', attended: 42, total: 45, pct: 93.3 }
    ]
  },
  {
    id: 'att-2',
    rollNumber: '21CS102',
    name: 'Priya Patel',
    dept: 'Computer Science',
    year: '4th Year',
    totalClasses: 180,
    attendedClasses: 176,
    percentage: 97.8,
    lastSwipe: 'Today, 08:30 AM (Biometric Gate 1)',
    status: 'Normal',
    subjects: [
      { name: 'Distributed Systems', attended: 44, total: 45, pct: 97.8 },
      { name: 'Machine Learning', attended: 45, total: 45, pct: 100 },
      { name: 'Cloud Computing', attended: 43, total: 45, pct: 95.5 },
      { name: 'Compiler Design', attended: 44, total: 45, pct: 97.8 }
    ]
  },
  {
    id: 'att-3',
    rollNumber: '22EC204',
    name: 'Rohan Verma',
    dept: 'Electronics & Comm.',
    year: '3rd Year',
    totalClasses: 175,
    attendedClasses: 118,
    percentage: 67.4,
    lastSwipe: 'Yesterday, 11:15 AM (Manual Override)',
    status: 'Shortage Warning',
    subjects: [
      { name: 'Digital Signal Processing', attended: 28, total: 44, pct: 63.6 },
      { name: 'VLSI Design', attended: 31, total: 44, pct: 70.4 },
      { name: 'Antenna Theory', attended: 29, total: 43, pct: 67.4 },
      { name: 'Microcontrollers', attended: 30, total: 44, pct: 68.2 }
    ]
  },
  {
    id: 'att-4',
    rollNumber: '22EC205',
    name: 'Ananya Iyer',
    dept: 'Electronics & Comm.',
    year: '3rd Year',
    totalClasses: 175,
    attendedClasses: 175,
    percentage: 100,
    lastSwipe: 'Today, 08:20 AM (Biometric Gate 1)',
    status: 'Perfect',
    subjects: [
      { name: 'Digital Signal Processing', attended: 44, total: 44, pct: 100 },
      { name: 'VLSI Design', attended: 44, total: 44, pct: 100 },
      { name: 'Antenna Theory', attended: 43, total: 43, pct: 100 },
      { name: 'Microcontrollers', attended: 44, total: 44, pct: 100 }
    ]
  },
  {
    id: 'att-5',
    rollNumber: '23ME301',
    name: 'Vikram Malhotra',
    dept: 'Mechanical Engg.',
    year: '2nd Year',
    totalClasses: 160,
    attendedClasses: 138,
    percentage: 86.2,
    lastSwipe: 'Today, 08:52 AM (Biometric Gate 3)',
    status: 'Normal',
    subjects: [
      { name: 'Thermodynamics', attended: 35, total: 40, pct: 87.5 },
      { name: 'Fluid Mechanics', attended: 34, total: 40, pct: 85.0 },
      { name: 'Kinematics of Machines', attended: 36, total: 40, pct: 90.0 },
      { name: 'Material Science', attended: 33, total: 40, pct: 82.5 }
    ]
  },
  {
    id: 'att-6',
    rollNumber: '23ME302',
    name: 'Sneha Kulkarni',
    dept: 'Mechanical Engg.',
    year: '2nd Year',
    totalClasses: 160,
    attendedClasses: 112,
    percentage: 70.0,
    lastSwipe: '3 days ago, 09:10 AM',
    status: 'Shortage Warning',
    subjects: [
      { name: 'Thermodynamics', attended: 27, total: 40, pct: 67.5 },
      { name: 'Fluid Mechanics', attended: 29, total: 40, pct: 72.5 },
      { name: 'Kinematics of Machines', attended: 28, total: 40, pct: 70.0 },
      { name: 'Material Science', attended: 28, total: 40, pct: 70.0 }
    ]
  },
  {
    id: 'att-7',
    rollNumber: '21EE105',
    name: 'Kavita Reddy',
    dept: 'Electrical Engg.',
    year: '4th Year',
    totalClasses: 170,
    attendedClasses: 155,
    percentage: 91.2,
    lastSwipe: 'Today, 08:40 AM (Biometric Gate 2)',
    status: 'Normal',
    subjects: [
      { name: 'Power Systems II', attended: 39, total: 42, pct: 92.8 },
      { name: 'Control Systems', attended: 40, total: 43, pct: 93.0 },
      { name: 'Power Electronics', attended: 38, total: 43, pct: 88.4 },
      { name: 'Electric Drives', attended: 38, total: 42, pct: 90.5 }
    ]
  },
  {
    id: 'att-8',
    rollNumber: '24CE010',
    name: 'Kabir Das',
    dept: 'Civil Engg.',
    year: '1st Year',
    totalClasses: 150,
    attendedClasses: 104,
    percentage: 69.3,
    lastSwipe: 'Yesterday, 09:00 AM',
    status: 'Shortage Warning',
    subjects: [
      { name: 'Structural Analysis', attended: 26, total: 38, pct: 68.4 },
      { name: 'Geotechnical Engg', attended: 27, total: 38, pct: 71.0 },
      { name: 'Surveying & Geomatics', attended: 25, total: 37, pct: 67.5 },
      { name: 'Concrete Technology', attended: 26, total: 37, pct: 70.2 }
    ]
  },
  {
    id: 'att-9',
    rollNumber: '22CS210',
    name: 'Devika Nair',
    dept: 'Computer Science',
    year: '3rd Year',
    totalClasses: 175,
    attendedClasses: 166,
    percentage: 94.8,
    lastSwipe: 'Today, 08:35 AM (Biometric Gate 1)',
    status: 'Normal',
    subjects: [
      { name: 'Database Management', attended: 42, total: 44, pct: 95.4 },
      { name: 'Computer Networks', attended: 41, total: 44, pct: 93.1 },
      { name: 'Web Technologies', attended: 42, total: 43, pct: 97.6 },
      { name: 'Theory of Computation', attended: 41, total: 44, pct: 93.1 }
    ]
  },
  {
    id: 'att-10',
    rollNumber: '23EC108',
    name: 'Manish Joshi',
    dept: 'Electronics & Comm.',
    year: '2nd Year',
    totalClasses: 165,
    attendedClasses: 147,
    percentage: 89.1,
    lastSwipe: 'Today, 08:48 AM (Biometric Gate 2)',
    status: 'Normal',
    subjects: [
      { name: 'Analog Circuits', attended: 37, total: 41, pct: 90.2 },
      { name: 'Signals and Systems', attended: 36, total: 41, pct: 87.8 },
      { name: 'Electromagnetic Waves', attended: 37, total: 41, pct: 90.2 },
      { name: 'Digital Logic Design', attended: 37, total: 42, pct: 88.0 }
    ]
  }
];

export const AttendanceTab: React.FC = () => {
  const [records, setRecords] = useState<AttendanceRecord[]>(initialAttendanceData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedStudent, setSelectedStudent] = useState<AttendanceRecord | null>(null);
  const [showSmsModal, setShowSmsModal] = useState(false);
  const [smsSentNotice, setSmsSentNotice] = useState(false);

  const filteredRecords = records.filter(rec => {
    const matchesSearch = 
      rec.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All' || rec.dept === selectedDept;
    const matchesStatus = 
      selectedStatus === 'All' ? true :
      selectedStatus === 'Shortage' ? rec.percentage < 75 :
      selectedStatus === 'Normal' ? (rec.percentage >= 75 && rec.percentage < 100) :
      rec.percentage === 100;
    return matchesSearch && matchesDept && matchesStatus;
  });

  const shortageCount = records.filter(r => r.percentage < 75).length;
  const perfectCount = records.filter(r => r.percentage === 100).length;

  const handleSendAlerts = () => {
    setShowSmsModal(false);
    setSmsSentNotice(true);
    setTimeout(() => setSmsSentNotice(false), 4500);
  };

  const [showExportModal, setShowExportModal] = useState(false);

  const exportConfig = {
    filename: 'student_attendance_report',
    pdfLabel: 'Student Attendance & Shortage Alerts Official Report',
    csvData: 'Roll No,Name,Department,Year,Attended,Total,Percentage,Status\n' +
      records.map(r => `${r.rollNumber},"${r.name}","${r.dept}",${r.year},${r.attendedClasses},${r.totalClasses},${r.percentage}%,${r.status}`).join('\n'),
  };

  const handleExportCSV = () => setShowExportModal(true);

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto animate-in fade-in duration-300">
      <InstitutionExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        config={exportConfig}
      />
      {/* Toast Notification */}
      {smsSentNotice && (
        <div className="fixed top-20 right-8 z-50 bg-emerald-600 text-white px-5 py-3.5 rounded-xl shadow-xl flex items-center gap-3 border border-emerald-400/30 animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-5 h-5" />
          <div>
            <p className="font-semibold text-sm">Alerts Dispatched Successfully!</p>
            <p className="text-xs text-emerald-100">Automated SMS & email notices sent to parents of all {shortageCount} shortage students.</p>
          </div>
        </div>
      )}

      {/* Page Header Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
            <Calendar className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Student Attendance & Shortage Alerts</h1>
            <p className="text-sm text-slate-500 mt-1">
              Biometric swipe-in telemetry, real-time subject tracking, and statutory 75% criteria compliance.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition shadow-sm"
          >
            <Download className="w-4 h-4 text-slate-500" />
            Export CSV
          </button>
          <button
            onClick={() => setShowSmsModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold rounded-xl transition shadow-lg shadow-rose-600/20"
          >
            <Bell className="w-4 h-4" />
            Dispatch Shortage SMS ({shortageCount})
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard
          title="Overall Avg Attendance"
          value="86.4%"
          subtitle="Target threshold: >= 75%"
          trend={{ value: 1.8, isPositive: true }}
          color="purple"
          icon={<svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
        />
        <KPICard
          title="Attendance Shortage"
          value={`${shortageCount} Students`}
          subtitle="< 75% - Exam Debarment Risk"
          trend={{ value: 4.2, isPositive: false }}
          color="rose"
          icon={<svg className="w-5 h-5 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>}
        />
        <KPICard
          title="100% Attendance"
          value={`${perfectCount} Students`}
          subtitle="Merit Attendance Badges"
          trend={{ value: 8.5, isPositive: true }}
          color="emerald"
          icon={<svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
        />
        <KPICard
          title="Total Lectures Logged"
          value="1,840 Hours"
          subtitle="Current Academic Semester"
          trend={{ value: 12.0, isPositive: true }}
          color="blue"
          icon={<svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>}
        />
      </div>

      {/* Analytics Row: 2 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Overall Attendance Gauge */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Campus Attendance Health</h3>
                <p className="text-xs text-slate-500">Aggregate institution-wide biometric score</p>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-100 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Healthy Score
              </span>
            </div>
            <div className="py-2">
              <SemiCircleGauge
                value={86.4}
                max={100}
                label="Average Attendance"
                color="#8b5cf6"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 text-center">
            <div className="p-2.5 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-500">Min. Criteria</p>
              <p className="text-sm font-bold text-slate-800">75.0%</p>
            </div>
            <div className="p-2.5 bg-emerald-50 rounded-xl">
              <p className="text-xs text-emerald-600 font-medium">Safe Zone</p>
              <p className="text-sm font-bold text-emerald-700">80.0%+</p>
            </div>
            <div className="p-2.5 bg-rose-50 rounded-xl">
              <p className="text-xs text-rose-600 font-medium">Debarred If</p>
              <p className="text-sm font-bold text-rose-700">&lt; 75.0%</p>
            </div>
          </div>
        </div>

        {/* Right: Department-wise Attendance Breakdown */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Department-wise Attendance Averages</h3>
              <p className="text-xs text-slate-500">Comparing student presence across academic faculties</p>
            </div>
            <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-lg">
              Sem End Target: 85%
            </span>
          </div>
          <div className="h-64">
            <VerticalBarChart
              data={[
                { label: 'CSE', value: 89.4, color: '#6366f1' },
                { label: 'ECE', value: 87.2, color: '#8b5cf6' },
                { label: 'EEE', value: 84.6, color: '#06b6d4' },
                { label: 'Mech', value: 83.1, color: '#f59e0b' },
                { label: 'Civil', value: 81.8, color: '#ec4899' }
              ]}
              maxValue={100}
            />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student name or roll number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium whitespace-nowrap">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </div>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
          >
            <option value="All">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Electronics & Comm.">Electronics & Comm.</option>
            <option value="Mechanical Engg.">Mechanical Engg.</option>
            <option value="Electrical Engg.">Electrical Engg.</option>
            <option value="Civil Engg.">Civil Engg.</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Shortage">⚠️ Shortage (&lt; 75%)</option>
            <option value="Normal">✓ Regular (&gt;= 75%)</option>
            <option value="Perfect">⭐ Perfect (100%)</option>
          </select>
        </div>
      </div>

      {/* Attendance Roster Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Student Biometric Attendance Roster</h3>
            <p className="text-xs text-slate-500">Showing {filteredRecords.length} recorded students for the current semester</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50/80 text-xs uppercase text-slate-400 font-semibold border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5">Student Details</th>
                <th className="px-6 py-3.5">Department & Year</th>
                <th className="px-6 py-3.5">Lectures (Attended / Total)</th>
                <th className="px-6 py-3.5">Attendance %</th>
                <th className="px-6 py-3.5">Compliance Status</th>
                <th className="px-6 py-3.5">Last Biometric Swipe</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.map((rec) => {
                const isShortage = rec.percentage < 75;
                const isPerfect = rec.percentage === 100;
                return (
                  <tr key={rec.id} className="hover:bg-slate-50/70 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                          isShortage ? 'bg-rose-100 text-rose-700' :
                          isPerfect ? 'bg-indigo-100 text-indigo-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {rec.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{rec.name}</p>
                          <p className="text-xs font-mono text-slate-400">{rec.rollNumber}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-slate-800 font-medium text-xs">{rec.dept}</p>
                      <p className="text-slate-400 text-xs">{rec.year}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-slate-800">{rec.attendedClasses}</span>
                      <span className="text-slate-400 text-xs"> / {rec.totalClasses} hrs</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-36 space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className={`font-bold ${
                            isShortage ? 'text-rose-600' :
                            isPerfect ? 'text-indigo-600' :
                            'text-slate-800'
                          }`}>
                            {rec.percentage}%
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {isShortage ? 'Shortage' : 'Safe'}
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              isShortage ? 'bg-rose-500' :
                              isPerfect ? 'bg-indigo-500' :
                              'bg-purple-500'
                            }`}
                            style={{ width: `${rec.percentage}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {isShortage ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-rose-50 text-rose-700 text-xs font-semibold rounded-lg border border-rose-200">
                          <AlertTriangle className="w-3 h-3 text-rose-600" />
                          Shortage Alert
                        </span>
                      ) : isPerfect ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-lg border border-indigo-200">
                          <CheckCircle2 className="w-3 h-3 text-indigo-600" />
                          100% Perfect
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-lg border border-emerald-200">
                          <Check className="w-3 h-3 text-emerald-600" />
                          Compliant
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      {rec.lastSwipe}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedStudent(rec)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-purple-50 text-slate-700 hover:text-purple-700 text-xs font-semibold rounded-lg transition border border-slate-200 hover:border-purple-200 inline-flex items-center gap-1"
                      >
                        Subject Log <ChevronRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Subject-Wise Log Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-sm">
                  {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{selectedStudent.name}</h3>
                  <p className="text-xs text-slate-400 font-mono">{selectedStudent.rollNumber} • {selectedStudent.dept}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">Aggregate Semester Attendance</p>
                  <p className={`text-2xl font-extrabold ${selectedStudent.percentage < 75 ? 'text-rose-600' : 'text-slate-900'}`}>
                    {selectedStudent.percentage}%
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Attended Classes</p>
                  <p className="text-sm font-bold text-slate-800">
                    {selectedStudent.attendedClasses} / {selectedStudent.totalClasses} Lectures
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Subject Breakdown</h4>
                <div className="space-y-2.5">
                  {selectedStudent.subjects.map((sub, idx) => (
                    <div key={idx} className="p-3 bg-white border border-slate-100 rounded-xl space-y-1.5 shadow-sm">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-slate-800">{sub.name}</span>
                        <span className={`font-bold ${sub.pct < 75 ? 'text-rose-600' : 'text-purple-600'}`}>
                          {sub.attended}/{sub.total} ({sub.pct}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${sub.pct < 75 ? 'bg-rose-500' : 'bg-purple-500'}`}
                          style={{ width: `${sub.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition"
                >
                  Close
                </button>
                {selectedStudent.percentage < 75 && (
                  <button
                    onClick={() => {
                      setSelectedStudent(null);
                      setSmsSentNotice(true);
                      setTimeout(() => setSmsSentNotice(false), 4500);
                    }}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl transition flex items-center gap-1.5 shadow-md shadow-rose-600/20"
                  >
                    <Send className="w-3.5 h-3.5" /> Send Warning SMS to Guardian
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Batch SMS Modal */}
      {showSmsModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Dispatch Shortage Warning SMS</h3>
                  <p className="text-xs text-slate-500">Targeting {shortageCount} debarment-risk students</p>
                </div>
              </div>
              <button
                onClick={() => setShowSmsModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-2">
                <p className="font-semibold text-slate-700">Automated SMS Preview:</p>
                <p className="text-slate-600 italic bg-white p-2.5 rounded-lg border border-slate-200">
                  "Dear Parent, Your ward [Student Name] (Roll: [Roll No]) has attendance below 75% ([Pct]%) at CAPFLY Institute. Attendance below 75% will lead to semester examination debarment. Please contact the HoD."
                </p>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>This action will trigger instant SMS messages via institutional gateway and log compliance audit records.</span>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowSmsModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendAlerts}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl transition flex items-center gap-2 shadow-lg shadow-rose-600/20"
                >
                  <Send className="w-3.5 h-3.5" /> Dispatch All {shortageCount} SMS
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
