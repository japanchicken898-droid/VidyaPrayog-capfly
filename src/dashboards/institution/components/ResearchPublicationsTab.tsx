import React, { useState } from 'react';
import { FileText, Award, Layers, Search, Eye } from 'lucide-react';
import { ResearchFunnelChart, SmoothAreaTrendChart } from './ChartUtils';

interface ResearchRecord {
  id: string; title: string; facultyName: string; dept: string;
  type: 'Journal Paper' | 'Conference' | 'Patent' | 'Research Grant';
  publisher: string; year: string; status: 'Published' | 'Granted' | 'Under Review';
}

const researchRecords: ResearchRecord[] = [
  { id: 'RES-01', title: 'Quantum-Safe Cryptographic Protocol for Distributed IoT Nodes', facultyName: 'Dr. Anitha S', dept: 'CSE', type: 'Patent', publisher: 'Indian Patent Office', year: '2025', status: 'Granted' },
  { id: 'RES-02', title: 'Ultra Low Power RISC-V Neural Accelerator Architecture', facultyName: 'Dr. Karthik R', dept: 'ECE', type: 'Journal Paper', publisher: 'IEEE Transactions on VLSI', year: '2025', status: 'Published' },
  { id: 'RES-03', title: 'AI-Driven Robotics for Heavy Material Sorting', facultyName: 'Dr. Prakash M', dept: 'Mechanical', type: 'Research Grant', publisher: 'DST / SERB India', year: '2025', status: 'Published' },
  { id: 'RES-04', title: 'Adaptive Battery Management in EV Microgrids', facultyName: 'Dr. Meena P', dept: 'EEE', type: 'Conference', publisher: 'IEEE Power & Energy Conf', year: '2024', status: 'Published' },
];

// Publications by indexing type funnel
const publicationFunnel = [
  { label: 'Submitted', count: 420, percentage: 100, color: '#e0e7ff' },
  { label: 'Scopus / WOS Indexed', count: 320, percentage: 76, color: '#818cf8' },
  { label: 'Accepted & Published', count: 280, percentage: 67, color: '#4f46e5' },
  { label: 'High-Impact Q1/Q2 Journals', count: 165, percentage: 39, color: '#312e81' },
];

// Research grant funding growth
const grantTrendData = [
  { label: '2021', value: 28 }, { label: '2022', value: 45 },
  { label: '2023', value: 68 }, { label: '2024', value: 95 }, { label: '2025', value: 140 },
];

export const ResearchPublicationsTab: React.FC = () => {
  const [search, setSearch] = useState('');
  const filtered = researchRecords.filter(r => r.title.toLowerCase().includes(search.toLowerCase()) || r.facultyName.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Research &amp; Publications</h1>
        <p className="text-xs text-slate-500">Faculty &gt; Research Projects, Journals, Patents &amp; Grants</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Published Papers', value: '320', Icon: FileText, color: 'bg-purple-50 text-purple-600' },
          { label: 'Active Patents', value: '18', Icon: Award, color: 'bg-emerald-50 text-emerald-600' },
          { label: 'Research Grants', value: '₹ 1.4 Cr', Icon: Layers, color: 'bg-blue-50 text-blue-600' },
          { label: 'Scopus Indexed', value: '245 (76%)', Icon: FileText, color: 'bg-amber-50 text-amber-600' },
        ].map((c, i) => (
          <div key={i} className="bg-white rounded-xl p-5 border border-slate-100 shadow-xs flex items-center justify-between">
            <div><p className="text-xs font-semibold text-slate-500 mb-1">{c.label}</p><h3 className="text-2xl font-extrabold text-slate-900">{c.value}</h3></div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${c.color}`}><c.Icon className="w-6 h-6" /></div>
          </div>
        ))}
      </div>

      {/* CHART ROW: Publication Funnel + Grant Growth Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
          <div className="pb-3 border-b border-slate-100 mb-4">
            <h3 className="text-sm font-bold text-slate-900">Publication Pipeline Funnel</h3>
            <p className="text-[10px] text-slate-400">From Submission to High-Impact Q1/Q2 — Funnel Chart</p>
          </div>
          <ResearchFunnelChart steps={publicationFunnel} />
        </div>

        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
          <div className="pb-3 border-b border-slate-100 mb-4">
            <h3 className="text-sm font-bold text-slate-900">Research Grant Funding Growth</h3>
            <p className="text-[10px] text-slate-400">Annual research grants secured (Lakhs) — Area Trend Graph</p>
          </div>
          <SmoothAreaTrendChart data={grantTrendData} color="#6d28d9" />
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search research title or faculty lead..." className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-xs font-medium focus:outline-none" />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead><tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-extrabold uppercase text-slate-500">
            <th className="py-3.5 px-4">Research Title</th><th className="py-3.5 px-4">Faculty Lead</th><th className="py-3.5 px-4">Dept</th><th className="py-3.5 px-4">Type</th><th className="py-3.5 px-4">Publisher</th><th className="py-3.5 px-4">Year</th><th className="py-3.5 px-4">Status</th><th className="py-3.5 px-4 text-center">Details</th>
          </tr></thead>
          <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
            {filtered.map(r => (
              <tr key={r.id} className="hover:bg-slate-50/70">
                <td className="py-3.5 px-4 font-bold text-slate-900">{r.title}</td>
                <td className="py-3.5 px-4 font-bold text-slate-800">{r.facultyName}</td>
                <td className="py-3.5 px-4">{r.dept}</td>
                <td className="py-3.5 px-4"><span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-800 font-extrabold text-[10px]">{r.type}</span></td>
                <td className="py-3.5 px-4 text-slate-600">{r.publisher}</td>
                <td className="py-3.5 px-4 text-slate-600">{r.year}</td>
                <td className="py-3.5 px-4"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">{r.status}</span></td>
                <td className="py-3.5 px-4 text-center"><button className="text-xs font-bold text-blue-600 hover:underline flex items-center justify-center gap-1 cursor-pointer"><Eye className="w-3.5 h-3.5" /><span>Details</span></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
