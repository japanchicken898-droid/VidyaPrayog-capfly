import React, { useState } from 'react';
import {
  Briefcase, Plus, Download, Award, Users, DollarSign, TrendingUp, CheckCircle2
} from 'lucide-react';
import { RadarWebChart, SmoothAreaTrendChart, KPICard } from './ChartUtils';
import { IndustryExportModal } from './IndustryExportModal';

interface Project {
  id: string; code: string; title: string; sponsor: string;
  principalInvestigator: string; department: string;
  sanctionedBudget: string; duration: string; progressPct: number;
  trlLevel: string; status: 'In Progress' | 'Milestone Audit' | 'Completed' | 'Patent Pending';
}

const mockProjects: Project[] = [
  { id:'P-501', code:'IND-RD-2024-09',
    title:'Autonomous Drone Navigation using Edge AI and Computer Vision',
    sponsor:'DRDO and Boeing Defense', principalInvestigator:'Dr. Arisudan Sharma',
    department:'Computer Science and Robotics', sanctionedBudget:'Rs 85.0 Lakhs',
    duration:'24 Months Phase 2', progressPct:75, trlLevel:'TRL 6 Prototype Demo', status:'In Progress' },
  { id:'P-502', code:'IND-RD-2024-12',
    title:'Battery Management System Thermal Modeling for EVs',
    sponsor:'Tata Motors Electric', principalInvestigator:'Prof. Meenakshi Sundaram',
    department:'Electrical and Mobility', sanctionedBudget:'Rs 62.0 Lakhs',
    duration:'18 Months', progressPct:90, trlLevel:'TRL 7 Operational Environment', status:'Patent Pending' },
  { id:'P-503', code:'IND-RD-2024-15',
    title:'GenAI Powered EHR Extraction for Medical Diagnostics',
    sponsor:'Philips Healthcare', principalInvestigator:'Dr. Rajeshwari Nair',
    department:'AI and Biomedical', sanctionedBudget:'Rs 48.0 Lakhs',
    duration:'12 Months', progressPct:45, trlLevel:'TRL 4 Lab Validation', status:'Milestone Audit' },
  { id:'P-504', code:'IND-RD-2023-04',
    title:'5G Small Cell Antenna Optimization for Dense Urban Areas',
    sponsor:'Qualcomm India', principalInvestigator:'Dr. Vikramaditya Roy',
    department:'Electronics and Telecom', sanctionedBudget:'Rs 1.1 Crores',
    duration:'36 Months', progressPct:100, trlLevel:'TRL 8 Commercial Ready', status:'Completed' },
];

export const IndustryProjectsTab: React.FC = () => {
  const radarData = [
    { subject:'Edge AI and Robotics', score:92 },
    { subject:'EV Thermal Systems', score:85 },
    { subject:'Biomedical Tech', score:78 },
    { subject:'5G Telecom', score:95 },
    { subject:'Cybersecurity', score:82 },
    { subject:'Clean Energy', score:88 },
  ];
  const fundingData = [
    { label:'2021', value:2.1 }, { label:'2022', value:4.5 },
    { label:'2023', value:6.2 }, { label:'2024', value:8.4 },
  ];

  const [showExportModal, setShowExportModal] = useState(false);

  const exportConfig = {
    filename: 'industry_rd_projects_directory',
    pdfLabel: 'Industry R&D Projects Directory Report',
    csvData: 'Project Title,Partner,Budget,Department,Progress,TRL,Status\n' +
      mockProjects.map(p => `"${p.title}","${p.sponsor}","${p.sanctionedBudget}","${p.department}",${p.progressPct},"${p.trlLevel}","${p.status}"`).join('\n'),
  };

  const handleExportProjects = () => {
    setShowExportModal(true);
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto relative">
      <IndustryExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        config={exportConfig}
        onToast={(msg) => { /* toast handled by modal internally */ void msg; }}
      />
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Industry R&D and Consultancy Projects</h1>
            <p className="text-xs text-slate-500 mt-0.5">Live industry sponsored research, TRL audits and faculty consultancy engagements</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleExportProjects}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-2 cursor-pointer">
            <Download className="w-4 h-4 text-slate-500"/>Export R&D Roster
          </button>
          <button onClick={handleExportProjects}
            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-amber-500/20 cursor-pointer">
            <Plus className="w-4 h-4"/>Submit R&D Proposal
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Live Sponsored Projects" value="34" change="+8 this FY" isPositive={true} icon={<svg className="w-5 h-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>} color="amber"/>
        <KPICard title="Sanctioned R&D Funding" value="Rs 8.4 Cr" change="+2.2 Cr YoY" isPositive={true} icon={<svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>} color="emerald"/>
        <KPICard title="Patents and Tech Transfers" value="12" change="4 Commercialized" isPositive={true} icon={<svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>} color="purple"/>
        <KPICard title="Student R&D Fellows" value="88" change="Fully funded" isPositive={true} icon={<svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>} color="blue"/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 mb-4">Research Domain Competency Radar</h2>
          <RadarWebChart data={radarData}/>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <SmoothAreaTrendChart data={fundingData} color="#d97706" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Active R&D Projects Roster</h3>
          <span className="text-xs text-slate-500">{mockProjects.length} Projects</span>
        </div>
        <div className="divide-y divide-slate-100">
          {mockProjects.map(prj => (
            <div key={prj.id} className="p-6 hover:bg-slate-50/50 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-mono text-[10px] font-bold">{prj.code}</span>
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-bold">{prj.trlLevel}</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900">{prj.title}</h4>
                  <p className="text-xs text-slate-500">
                    Sponsor: <span className="font-semibold text-slate-800">{prj.sponsor}</span>
                    {' '} - Lead PI: <span className="font-semibold text-slate-800">{prj.principalInvestigator}</span>
                    {' '}({prj.department})
                  </p>
                </div>
                <div className="flex items-center gap-6 shrink-0">
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Funding</span>
                    <span className="text-sm font-extrabold text-amber-600">{prj.sanctionedBudget}</span>
                  </div>
                  <div className="w-36">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1">
                      <span>Milestone</span><span>{prj.progressPct}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full transition-all duration-500" style={{ width:`${prj.progressPct}%` }}/>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    prj.status==='Completed' ? 'bg-emerald-50 text-emerald-700' :
                    prj.status==='Patent Pending' ? 'bg-purple-50 text-purple-700' :
                    'bg-amber-50 text-amber-700'}`}>{prj.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
