import React, { useState } from 'react';
import {
  FileText, Search, Plus, Download, AlertTriangle, ShieldCheck,
  DollarSign, TrendingUp, X, CheckCircle2
} from 'lucide-react';
import { FunnelChart, SmoothAreaTrendChart, KPICard } from './ChartUtils';
import { IndustryExportModal } from './IndustryExportModal';

interface MoU {
  id: string; refNo: string; companyName: string; scope: string;
  signedDate: string; expiryDate: string; financialOutlay: string;
  category: string; status: 'Active' | 'Expiring Soon' | 'Under Renewal';
}

const mockMoUs: MoU[] = [
  { id:'M-01', refNo:'CAP/MOU/2024/MSFT-01', companyName:'Microsoft Corporation',
    scope:'Azure AI Center of Excellence and Student Certification Voucher Sponsorship',
    signedDate:'15 Jan 2024', expiryDate:'14 Jan 2027', financialOutlay:'Rs 45.0 Lakhs',
    category:'Research and CoE', status:'Active' },
  { id:'M-02', refNo:'CAP/MOU/2024/GOOG-02', companyName:'Google India Cloud',
    scope:'Cloud Engineering Curriculum Integration and Dedicated Lab Sandbox API Credits',
    signedDate:'10 Aug 2023', expiryDate:'09 Aug 2026', financialOutlay:'Rs 60.0 Lakhs',
    category:'Curriculum Design', status:'Active' },
  { id:'M-03', refNo:'CAP/MOU/2024/LNT-03', companyName:'Larsen and Toubro',
    scope:'Joint Smart Civil Engineering Testing Lab and Sponsored Postgraduate Grants',
    signedDate:'01 Nov 2021', expiryDate:'31 Oct 2024', financialOutlay:'Rs 1.2 Crores',
    category:'Research and CoE', status:'Expiring Soon' },
  { id:'M-04', refNo:'CAP/MOU/2024/TCS-04', companyName:'Tata Consultancy Services',
    scope:'National Qualifier Test Priority Drive and Industry Faculty Exchange Program',
    signedDate:'05 Mar 2022', expiryDate:'04 Mar 2025', financialOutlay:'Rs 25.0 Lakhs',
    category:'Placements and Internships', status:'Under Renewal' },
  { id:'M-05', refNo:'CAP/MOU/2024/SIEM-05', companyName:'Siemens Healthineers',
    scope:'Bio-Medical Signal Processing Research Unit and Internship Sponsorship',
    signedDate:'18 May 2023', expiryDate:'17 May 2026', financialOutlay:'Rs 35.0 Lakhs',
    category:'Research and CoE', status:'Active' },
];

export const MoUsAgreementsTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = mockMoUs.filter(m => {
    const q = searchTerm.toLowerCase();
    const matchQ = m.companyName.toLowerCase().includes(q) || m.refNo.toLowerCase().includes(q) || m.scope.toLowerCase().includes(q);
    const matchS = statusFilter === 'All' || m.status === statusFilter;
    return matchQ && matchS;
  });

  const funnelSteps = [
    { label:'Initial Proposal Submitted', count:98, percentage:100, color:'#3b82f6' },
    { label:'Legal and IP Vetting Passed', count:82, percentage:84, color:'#06b6d4' },
    { label:'Academic Board Approved', count:74, percentage:75, color:'#8b5cf6' },
    { label:'MoU Formally Executed', count:64, percentage:65, color:'#10b981' },
  ];

  const trendData = [
    { label:'Q1 23', value:12 }, { label:'Q2 23', value:18 }, { label:'Q3 23', value:24 },
    { label:'Q4 23', value:38 }, { label:'Q1 24', value:45 }, { label:'Q2 24', value:64 },
  ];

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [showExportModal, setShowExportModal] = useState(false);
  const [exportModalConfig, setExportModalConfig] = useState<{ filename: string; csvData: string; pdfLabel: string } | null>(null);

  const showToast = (msg: string) => { 
    setToastMsg(msg); 
    setTimeout(() => setToastMsg(null), 4000); 
  };

  const handleExportMoUs = () => {
    setExportModalConfig({
      filename: 'mou_agreements_audit_log',
      pdfLabel: 'MoUs & Legal Agreements Audit Report',
      csvData: 'Company,Ref No,Scope,Signed Date,Expiry Date,Funding,Status\n' +
        mockMoUs.map(m => `"${m.companyName}","${m.refNo}","${m.scope}","${m.signedDate}","${m.expiryDate}","${m.financialOutlay}","${m.status}"`).join('\n'),
    });
    setShowExportModal(true);
  };

  const handleDownloadSingleMoU = (refNo: string, partner: string) => {
    setExportModalConfig({
      filename: `${refNo}_agreement_document`,
      pdfLabel: `MoU Agreement — ${partner} (${refNo})`,
      csvData: `Ref No,Partner,Scope,Status\n"${refNo}","${partner}","MoU Agreement","Executed"`,
    });
    setShowExportModal(true);
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto relative">
      {exportModalConfig && (
        <IndustryExportModal
          isOpen={showExportModal}
          onClose={() => { setShowExportModal(false); setExportModalConfig(null); }}
          config={exportModalConfig}
          onToast={showToast}
        />
      )}
      {toastMsg && (
        <div className="fixed top-20 right-8 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in slide-in-from-top-4 duration-200">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-bold">{toastMsg}</p>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
            <FileText className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">MoUs and Legal Agreements Tracker</h1>
            <p className="text-xs text-slate-500 mt-0.5">Legal framework monitoring, validity timelines, IP rights and financial commitments</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleExportMoUs}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-2 cursor-pointer">
            <Download className="w-4 h-4 text-slate-500"/>Audit Report PDF
          </button>
          <button onClick={handleExportMoUs}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-emerald-500/20 cursor-pointer">
            <Plus className="w-4 h-4"/>Execute New MoU
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Active MoUs" value="64" change="+12 this year" isPositive={true} icon={<svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>} color="emerald"/>
        <KPICard title="Expiring in 90 Days" value="7" change="Action required" isPositive={false} icon={<svg className="w-5 h-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>} color="amber"/>
        <KPICard title="Financial Outlay" value="Rs 4.8 Cr" change="Grant commitments" isPositive={true} icon={<svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>} color="blue"/>
        <KPICard title="Renewal Rate" value="94.2%" change="+3.1% YoY" isPositive={true} icon={<svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>} color="purple"/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 mb-1">MoU Lifecycle and Conversion Funnel</h2>
          <p className="text-xs text-slate-400 mb-4">Pipeline stages from draft proposal to executed agreement</p>
          <FunnelChart steps={funnelSteps}/>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <SmoothAreaTrendChart data={trendData} color="#059669" />
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/>
          <input type="text" placeholder="Search company or MoU ref number..."
            value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"/>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-600">Status:</span>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer">
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Expiring Soon">Expiring Soon</option>
            <option value="Under Renewal">Under Renewal</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Active Memorandums of Understanding</h3>
          <span className="text-xs text-slate-500">{filtered.length} MoUs listed</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-6">MoU Ref and Partner</th>
                <th className="py-3.5 px-4">Primary Scope</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Financial Value</th>
                <th className="py-3.5 px-4">Expiry Date</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-6 text-right">PDF</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {filtered.map(m => (
                <tr key={m.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900 text-sm">{m.companyName}</div>
                    <div className="text-[11px] font-mono text-slate-400 mt-0.5">{m.refNo}</div>
                  </td>
                  <td className="py-4 px-4 max-w-[280px] text-slate-600 truncate">{m.scope}</td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-semibold">{m.category}</span>
                  </td>
                  <td className="py-4 px-4 font-bold text-emerald-600">{m.financialOutlay}</td>
                  <td className="py-4 px-4">
                    <div className="font-semibold text-slate-800">{m.expiryDate}</div>
                    <div className="text-[10px] text-slate-400">Signed {m.signedDate}</div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      m.status==='Active' ? 'bg-emerald-50 text-emerald-700' :
                      m.status==='Expiring Soon' ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'}`}>
                      {m.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button onClick={() => handleDownloadSingleMoU(m.refNo, m.companyName)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer flex items-center gap-1 ml-auto">
                      <Download className="w-3.5 h-3.5"/>PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
