import React, { useState } from 'react';
import { GraduationCap, BookOpen, Clock, CheckCircle2, AlertCircle, Search } from 'lucide-react';
import { RadarWebChart, SmoothAreaTrendChart } from './ChartUtils';

interface WorkloadRow {
  facultyName: string; dept: string; subjects: string[]; classes: string; weeklyHours: number; status: 'Optimal' | 'Overloaded' | 'Underloaded';
}

const workloadRows: WorkloadRow[] = [
  { facultyName: 'Dr. Anitha S', dept: 'CSE', subjects: ['Data Structures', 'Advanced GenAI'], classes: 'CSE-A (Yr 2), CSE-C (Yr 4)', weeklyHours: 16, status: 'Optimal' },
  { facultyName: 'Dr. Karthik R', dept: 'ECE', subjects: ['VLSI Circuits', 'Embedded RISC-V'], classes: 'ECE-A (Yr 3), ECE-B (Yr 4)', weeklyHours: 18, status: 'Optimal' },
  { facultyName: 'Dr. Prakash M', dept: 'Mechanical', subjects: ['Robotics & Automation', 'Kinematics'], classes: 'MECH-A (Yr 4), MECH-B (Yr 3)', weeklyHours: 22, status: 'Overloaded' },
  { facultyName: 'Dr. Meena P', dept: 'EEE', subjects: ['Power Systems', 'EV Battery Tech'], classes: 'EEE-A (Yr 3)', weeklyHours: 14, status: 'Optimal' },
  { facultyName: 'Dr. Divya K', dept: 'Civil', subjects: ['Structural Analysis', 'CAD 3D'], classes: 'CIVIL-A (Yr 2)', weeklyHours: 12, status: 'Underloaded' },
  { facultyName: 'Prof. Ramesh S', dept: 'CSE', subjects: ['Cloud Computing', 'Docker Microservices'], classes: 'CSE-B (Yr 3)', weeklyHours: 20, status: 'Overloaded' },
];

// Teaching load over semesters — area chart
const trendData = [
  { label: 'Sem 1', value: 14 }, { label: 'Sem 2', value: 16 }, { label: 'Sem 3', value: 15 },
  { label: 'Sem 4', value: 18 }, { label: 'Sem 5', value: 17 }, { label: 'Sem 6', value: 21 },
];

// Radar showing balance across 5 domains
const radarData = [
  { subject: 'UG Teaching Load', score: 82 },
  { subject: 'PG Teaching Load', score: 60 },
  { subject: 'Lab & Tutorial Hours', score: 70 },
  { subject: 'Research Work', score: 50 },
  { subject: 'Admin & Mentoring', score: 45 },
];

export const TeachingWorkloadTab: React.FC = () => {
  const [search, setSearch] = useState('');
  const [dept, setDept] = useState('All');

  const filtered = workloadRows.filter(r => (r.facultyName.toLowerCase().includes(search.toLowerCase()) || r.dept.toLowerCase().includes(search.toLowerCase())) && (dept === 'All' || r.dept === dept));

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Teaching &amp; Workload</h1>
        <p className="text-xs text-slate-500">Faculty &gt; Subject Allocation &amp; Teaching Hours</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Courses Handled', value: '240', Icon: BookOpen, color: 'bg-emerald-50 text-emerald-600' },
          { label: 'Avg Weekly Hours', value: '16.5 Hrs', Icon: Clock, color: 'bg-blue-50 text-blue-600' },
          { label: 'Optimal Workload', value: '88%', Icon: CheckCircle2, color: 'bg-purple-50 text-purple-600' },
          { label: 'Overload Alerts', value: '12', Icon: AlertCircle, color: 'bg-rose-50 text-rose-600' },
        ].map((c, i) => (
          <div key={i} className="bg-white rounded-xl p-5 border border-slate-100 shadow-xs flex items-center justify-between">
            <div><p className="text-xs font-semibold text-slate-500 mb-1">{c.label}</p><h3 className="text-2xl font-extrabold text-slate-900">{c.value}</h3></div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${c.color}`}><c.Icon className="w-6 h-6" /></div>
          </div>
        ))}
      </div>

      {/* CHART ROW: Radar + Smooth Area Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
          <div className="pb-3 border-b border-slate-100 mb-4">
            <h3 className="text-sm font-bold text-slate-900">Teaching Activity Radar</h3>
            <p className="text-[10px] text-slate-400">Workload Balance Across 5 Domains — Spider Web</p>
          </div>
          <RadarWebChart data={radarData} />
        </div>

        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
          <div className="pb-3 border-b border-slate-100 mb-4">
            <h3 className="text-sm font-bold text-slate-900">Teaching Load Trend Over Semesters</h3>
            <p className="text-[10px] text-slate-400">Avg Weekly Hours per Semester — Smooth Area Graph</p>
          </div>
          <SmoothAreaTrendChart data={trendData} color="#8b5cf6" />
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search faculty name or subject..." className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-xs font-medium focus:outline-none" />
        </div>
        <select value={dept} onChange={e => setDept(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold">
          <option value="All">All Departments</option>
          <option value="CSE">CSE</option><option value="ECE">ECE</option><option value="EEE">EEE</option><option value="Mechanical">Mechanical</option><option value="Civil">Civil</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead><tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-extrabold uppercase text-slate-500">
            <th className="py-3.5 px-4">Faculty Name</th><th className="py-3.5 px-4">Department</th><th className="py-3.5 px-4">Subjects Handled</th><th className="py-3.5 px-4">Classes</th><th className="py-3.5 px-4">Weekly Hours</th><th className="py-3.5 px-4">Status</th>
          </tr></thead>
          <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
            {filtered.map(r => (
              <tr key={r.facultyName} className="hover:bg-slate-50/70">
                <td className="py-3.5 px-4 font-bold text-slate-900">{r.facultyName}</td>
                <td className="py-3.5 px-4">{r.dept}</td>
                <td className="py-3.5 px-4"><div className="flex flex-wrap gap-1">{r.subjects.map(s => <span key={s} className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold text-[10px]">{s}</span>)}</div></td>
                <td className="py-3.5 px-4 text-slate-600">{r.classes}</td>
                <td className="py-3.5 px-4 font-bold">{r.weeklyHours} Hrs/Wk</td>
                <td className="py-3.5 px-4"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${r.status === 'Optimal' ? 'bg-emerald-100 text-emerald-800' : r.status === 'Overloaded' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'}`}>{r.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
