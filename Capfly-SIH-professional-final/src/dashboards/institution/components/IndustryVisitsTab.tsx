import React, { useState } from 'react';
import {
  MapPin, Plus, Download, CheckCircle2, ShieldCheck, Users, Building2
} from 'lucide-react';
import { MultiSegmentProgressBar, RadialGauge, KPICard } from './ChartUtils';
import { IndustryExportModal } from './IndustryExportModal';

interface Visit {
  id: string; plantName: string; company: string; city: string;
  date: string; department: string; studentBatch: string;
  studentsCount: number; facultyLead: string;
  safetyApproval: 'Approved and Verified' | 'Pending Audit';
}

const mockVisits: Visit[] = [
  { id:'V-901', plantName:'Automated Robotic Assembly Facility', company:'Hyundai Motor India',
    city:'Sriperumbudur, Tamil Nadu', date:'04 Aug 2026',
    department:'Mechanical and Mechatronics', studentBatch:'3rd Year B.Tech 2023-27',
    studentsCount:120, facultyLead:'Prof. S. Ranganathan', safetyApproval:'Approved and Verified' },
  { id:'V-902', plantName:'Tier-4 High Availability Data Center', company:'CtrlS Datacenters',
    city:'Hyderabad, Telangana', date:'18 Aug 2026',
    department:'Computer Science and IT', studentBatch:'4th Year B.Tech 2022-26',
    studentsCount:95, facultyLead:'Dr. Kavita Deshmukh', safetyApproval:'Approved and Verified' },
  { id:'V-903', plantName:'Biopharmaceutical Formulation Plant', company:'Dr. Reddys Laboratories',
    city:'Visakhapatnam, Andhra Pradesh', date:'10 Sep 2026',
    department:'Chemical and Biotech', studentBatch:'3rd Year B.Tech 2023-27',
    studentsCount:80, facultyLead:'Dr. Rajesh Bhalla', safetyApproval:'Approved and Verified' },
];

export const IndustryVisitsTab: React.FC = () => {
  const deptSegs = [
    { label:'Mechanical', value:35, color:'#ec4899' },
    { label:'CSE and IT', value:30, color:'#3b82f6' },
    { label:'ECE and EEE', value:20, color:'#10b981' },
    { label:'Chemical', value:15, color:'#8b5cf6' },
  ];

  const [showExportModal, setShowExportModal] = useState(false);

  const exportConfig = {
    filename: 'industrial_visits_field_report',
    pdfLabel: 'Industrial Visits & Plant Tours Field Report',
    csvData: 'Facility / Plant,Company,City,Date,Department,Student Batch,Students,Faculty Lead,Safety Approval\n' +
      mockVisits.map(v => `"${v.plantName}","${v.company}","${v.city}","${v.date}","${v.department}","${v.studentBatch}",${v.studentsCount},"${v.facultyLead}","${v.safetyApproval}"`).join('\n'),
  };

  const handleExportVisits = () => {
    setShowExportModal(true);
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto relative">
      <IndustryExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        config={exportConfig}
        onToast={(msg) => { void msg; }}
      />
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-pink-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Industrial Visits and Plant Tours Log</h1>
            <p className="text-xs text-slate-500 mt-0.5">Field exposure trips, plant tours, safety clearance and student attendance verification</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleExportVisits}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-2 cursor-pointer">
            <Download className="w-4 h-4 text-slate-500"/>Field Reports PDF
          </button>
          <button onClick={handleExportVisits}
            className="px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-pink-500/20 cursor-pointer">
            <Plus className="w-4 h-4"/>Schedule Plant Visit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Plant Visits" value="24" change="+6 this year" isPositive={true} icon={<svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" x2="9" y1="22" y2="22"/><line x1="15" x2="15" y1="22" y2="22"/><line x1="9" x2="9" y1="6" y2="6"/><line x1="15" x2="15" y1="6" y2="6"/><line x1="9" x2="9" y1="10" y2="10"/><line x1="15" x2="15" y1="10" y2="10"/><line x1="9" x2="9" y1="14" y2="14"/><line x1="15" x2="15" y1="14" y2="14"/><line x1="9" x2="9" y1="18" y2="18"/><line x1="15" x2="15" y1="18" y2="18"/></svg>} color="blue"/>
        <KPICard title="Participating Students" value="1,150" change="Safety cleared" isPositive={true} icon={<svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>} color="emerald"/>
        <KPICard title="Safety Audit Score" value="100%" change="Zero Incidents" isPositive={true} icon={<svg className="w-5 h-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>} color="amber"/>
        <KPICard title="Partner Facilities" value="18 Plants" change="National Coverage" isPositive={true} icon={<svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>} color="purple"/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 mb-2">Departmental Participation Share</h2>
          <p className="text-xs text-slate-400 mb-6">Distribution of students by department for industrial visits</p>
          <MultiSegmentProgressBar segments={deptSegs}/>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <RadialGauge value={100} label="Industrial Safety Compliance Index" color="#db2777"/>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Industrial Field Visits Log</h3>
          <span className="text-xs text-slate-500">{mockVisits.length} Visits Logged</span>
        </div>
        <div className="divide-y divide-slate-100">
          {mockVisits.map(vis => (
            <div key={vis.id} className="p-6 hover:bg-slate-50/60 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-base">{vis.plantName}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-pink-50 text-pink-700 font-bold text-[10px]">{vis.company}</span>
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400"/>
                    {vis.city} - <span className="font-semibold text-slate-700">{vis.department}</span>
                    {' '} - <span className="text-slate-500">{vis.date}</span>
                  </div>
                  <div className="text-xs text-slate-500">
                    {vis.studentBatch} - Faculty: <span className="font-semibold text-slate-700">{vis.facultyLead}</span>
                  </div>
                </div>
                <div className="flex items-center gap-6 shrink-0">
                  <div className="text-right text-xs">
                    <span className="font-bold text-slate-900 block">{vis.studentsCount} Students</span>
                    <span className="text-[10px] text-slate-400">Participated</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5"/>{vis.safetyApproval}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
