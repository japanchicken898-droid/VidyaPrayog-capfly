import React, { useState } from 'react';
import { BookOpen, Award, Calendar, Plus, Search } from 'lucide-react';
import { SmoothAreaTrendChart, VerticalBarChart } from './ChartUtils';

interface FdpRecord {
  id: string; eventName: string; eventType: 'FDP' | 'Workshop' | 'Conference' | 'Certification';
  facultyName: string; dept: string; date: string; duration: string; status: 'Completed' | 'Ongoing';
}

const fdpRecords: FdpRecord[] = [
  { id: 'FDP-01', eventName: 'AI & Generative Deep Learning Masterclass', eventType: 'FDP', facultyName: 'Dr. Anitha S', dept: 'CSE', date: 'Jan 15–22, 2026', duration: '7 Days', status: 'Completed' },
  { id: 'FDP-02', eventName: 'VLSI Chip Synthesis with Cadence', eventType: 'Workshop', facultyName: 'Dr. Karthik R', dept: 'ECE', date: 'Feb 02–06, 2026', duration: '5 Days', status: 'Completed' },
  { id: 'FDP-03', eventName: 'IEEE International Power Summit', eventType: 'Conference', facultyName: 'Dr. Meena P', dept: 'EEE', date: 'Mar 10–12, 2026', duration: '3 Days', status: 'Ongoing' },
  { id: 'FDP-04', eventName: 'AWS Certified Solutions Architect', eventType: 'Certification', facultyName: 'Prof. Ramesh S', dept: 'CSE', date: 'Jan 28, 2026', duration: 'Self-Paced', status: 'Completed' },
];

// FDPs attended year-on-year growth
const fdpTrendData = [
  { label: '2021', value: 68 }, { label: '2022', value: 82 },
  { label: '2023', value: 105 }, { label: '2024', value: 128 }, { label: '2025', value: 142 },
];

// Certifications per dept
const certDeptBarData = [
  { label: 'CSE Faculty', value: 74, color: '#2563eb' },
  { label: 'ECE Faculty', value: 58, color: '#10b981' },
  { label: 'Mechanical', value: 42, color: '#f59e0b' },
  { label: 'EEE Faculty', value: 22, color: '#8b5cf6' },
  { label: 'Civil Faculty', value: 14, color: '#f43f5e' },
];

export const FacultyDevelopmentTab: React.FC = () => {
  const [search, setSearch] = useState('');
  const filtered = fdpRecords.filter(r => r.eventName.toLowerCase().includes(search.toLowerCase()) || r.facultyName.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Faculty Development</h1>
          <p className="text-xs text-slate-500">Faculty &gt; FDPs, Workshops &amp; Certifications</p>
        </div>
        <button className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer"><Plus className="w-4 h-4" /><span>Add FDP Record</span></button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'FDPs Attended', value: '142', Icon: BookOpen, color: 'bg-amber-50 text-amber-600' },
          { label: 'Int. Conferences', value: '38', Icon: Calendar, color: 'bg-blue-50 text-blue-600' },
          { label: 'Certifications Earned', value: '210', Icon: Award, color: 'bg-emerald-50 text-emerald-600' },
          { label: 'Workshops Conducted', value: '56', Icon: BookOpen, color: 'bg-purple-50 text-purple-600' },
        ].map((c, i) => (
          <div key={i} className="bg-white rounded-xl p-5 border border-slate-100 shadow-xs flex items-center justify-between">
            <div><p className="text-xs font-semibold text-slate-500 mb-1">{c.label}</p><h3 className="text-2xl font-extrabold text-slate-900">{c.value}</h3></div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${c.color}`}><c.Icon className="w-6 h-6" /></div>
          </div>
        ))}
      </div>

      {/* CHART ROW: Smooth Trend Growth + Vertical Bar Certifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
          <div className="pb-3 border-b border-slate-100 mb-4">
            <h3 className="text-sm font-bold text-slate-900">FDP Participation Growth (2021–2025)</h3>
            <p className="text-[10px] text-slate-400">Annual FDP attendance trend — Smooth Area Line Graph</p>
          </div>
          <SmoothAreaTrendChart data={fdpTrendData} color="#f59e0b" />
        </div>

        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
          <div className="pb-3 border-b border-slate-100 mb-4">
            <h3 className="text-sm font-bold text-slate-900">Certifications Earned by Department</h3>
            <p className="text-[10px] text-slate-400">Total industry certifications per dept — Horizontal Bar</p>
          </div>
          <VerticalBarChart data={certDeptBarData} />
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search event or faculty..." className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-xs font-medium focus:outline-none" />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead><tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-extrabold uppercase text-slate-500">
            <th className="py-3.5 px-4">Event Name</th><th className="py-3.5 px-4">Type</th><th className="py-3.5 px-4">Faculty</th><th className="py-3.5 px-4">Dept</th><th className="py-3.5 px-4">Date</th><th className="py-3.5 px-4">Duration</th><th className="py-3.5 px-4">Status</th>
          </tr></thead>
          <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
            {filtered.map(r => (
              <tr key={r.id} className="hover:bg-slate-50/70">
                <td className="py-3.5 px-4 font-bold text-slate-900">{r.eventName}</td>
                <td className="py-3.5 px-4"><span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-extrabold text-[10px]">{r.eventType}</span></td>
                <td className="py-3.5 px-4 font-bold text-slate-800">{r.facultyName}</td>
                <td className="py-3.5 px-4">{r.dept}</td>
                <td className="py-3.5 px-4 text-slate-600">{r.date}</td>
                <td className="py-3.5 px-4 text-slate-600">{r.duration}</td>
                <td className="py-3.5 px-4"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${r.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}`}>{r.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
