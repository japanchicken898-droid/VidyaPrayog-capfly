import React, { useState } from 'react';
import { Handshake, Building2, Briefcase, Search, Eye } from 'lucide-react';
import { DonutChart, ResearchFunnelChart } from './ChartUtils';

interface IndustryRecord {
  id: string; projectTitle: string; company: string;
  facultyLead: string; dept: string; value: string; status: 'Active' | 'Completed';
}

const industryRecords: IndustryRecord[] = [
  { id: 'IND-01', projectTitle: 'AI Infrastructure Optimization & GenAI Pipeline', company: 'TCS Research', facultyLead: 'Dr. Anitha S', dept: 'CSE', value: '₹ 28.5 Lakhs', status: 'Active' },
  { id: 'IND-02', projectTitle: 'Robotic Welding Automation Consultancy', company: 'Larsen & Toubro', facultyLead: 'Dr. Prakash M', dept: 'Mechanical', value: '₹ 42.0 Lakhs', status: 'Completed' },
  { id: 'IND-03', projectTitle: 'RISC-V Microprocessor Validation Lab', company: 'Bosch India', facultyLead: 'Dr. Karthik R', dept: 'ECE', value: '₹ 34.0 Lakhs', status: 'Active' },
  { id: 'IND-04', projectTitle: 'Smart Grid Load Balancing Algorithm', company: 'Tata Power', facultyLead: 'Dr. Meena P', dept: 'EEE', value: '₹ 18.0 Lakhs', status: 'Active' },
];

// Revenue by department — Donut
const revenuePieData = [
  { label: 'Mechanical (L&T)', value: 42, color: '#2563eb' },
  { label: 'ECE (Bosch)', value: 34, color: '#10b981' },
  { label: 'CSE (TCS)', value: 28.5, color: '#8b5cf6' },
  { label: 'EEE (Tata)', value: 18, color: '#f59e0b' },
];

// MoU stages funnel
const mouFunnel = [
  { label: 'Prospected', count: 80, percentage: 100, color: '#fcd34d' },
  { label: 'MoU Signed', count: 42, percentage: 52, color: '#f59e0b' },
  { label: 'Active Projects', count: 28, percentage: 35, color: '#f97316' },
  { label: 'Joint Publications', count: 12, percentage: 15, color: '#dc2626' },
];

export const IndustryEngagementTab: React.FC = () => {
  const [search, setSearch] = useState('');
  const filtered = industryRecords.filter(r => r.projectTitle.toLowerCase().includes(search.toLowerCase()) || r.company.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Industry Engagement</h1>
        <p className="text-xs text-slate-500">Faculty &gt; Consultancy Projects, MoUs &amp; Joint R&amp;D</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Consultancy', value: '34', Icon: Handshake, color: 'bg-rose-50 text-rose-600' },
          { label: 'Corporate MoUs', value: '42', Icon: Building2, color: 'bg-blue-50 text-blue-600' },
          { label: 'Industry Projects', value: '28', Icon: Briefcase, color: 'bg-emerald-50 text-emerald-600' },
          { label: 'Revenue', value: '₹ 85 L', Icon: Handshake, color: 'bg-purple-50 text-purple-600' },
        ].map((c, i) => (
          <div key={i} className="bg-white rounded-xl p-5 border border-slate-100 shadow-xs flex items-center justify-between">
            <div><p className="text-xs font-semibold text-slate-500 mb-1">{c.label}</p><h3 className="text-2xl font-extrabold text-slate-900">{c.value}</h3></div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${c.color}`}><c.Icon className="w-6 h-6" /></div>
          </div>
        ))}
      </div>

      {/* CHART ROW: Donut Revenue Share + MoU Pipeline Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
          <div className="pb-3 border-b border-slate-100 mb-4">
            <h3 className="text-sm font-bold text-slate-900">Consultancy Revenue by Department</h3>
            <p className="text-[10px] text-slate-400">Revenue split ₹ 85 Lakhs — Donut Chart</p>
          </div>
          <DonutChart data={revenuePieData} centerText="85 L" centerSubtext="Revenue" />
        </div>

        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
          <div className="pb-3 border-b border-slate-100 mb-4">
            <h3 className="text-sm font-bold text-slate-900">Industry MoU Conversion Funnel</h3>
            <p className="text-[10px] text-slate-400">From Prospect to Joint Research — Funnel Chart</p>
          </div>
          <ResearchFunnelChart steps={mouFunnel} />
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search project or company..." className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-xs font-medium focus:outline-none" />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead><tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-extrabold uppercase text-slate-500">
            <th className="py-3.5 px-4">Project Title</th><th className="py-3.5 px-4">Industry Partner</th><th className="py-3.5 px-4">Faculty Lead</th><th className="py-3.5 px-4">Dept</th><th className="py-3.5 px-4">Value</th><th className="py-3.5 px-4">Status</th><th className="py-3.5 px-4 text-center">View</th>
          </tr></thead>
          <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
            {filtered.map(r => (
              <tr key={r.id} className="hover:bg-slate-50/70">
                <td className="py-3.5 px-4 font-bold text-slate-900">{r.projectTitle}</td>
                <td className="py-3.5 px-4 font-bold text-blue-900">{r.company}</td>
                <td className="py-3.5 px-4 font-bold text-slate-800">{r.facultyLead}</td>
                <td className="py-3.5 px-4">{r.dept}</td>
                <td className="py-3.5 px-4 font-extrabold text-emerald-700">{r.value}</td>
                <td className="py-3.5 px-4"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${r.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}`}>{r.status}</span></td>
                <td className="py-3.5 px-4 text-center"><button className="text-xs font-bold text-blue-600 hover:underline flex items-center justify-center gap-1 cursor-pointer"><Eye className="w-3.5 h-3.5" /><span>View</span></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
