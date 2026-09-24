import React, { useState } from 'react';
import { TrendingUp, Search, Filter, CheckCircle2, Download, Building2, ShieldCheck, ArrowRight } from 'lucide-react';
import { FunnelChart } from './ChartUtils';
import { InstitutionExportModal } from './InstitutionExportModal';

interface PlacementCandidate {
  rollNo: string;
  name: string;
  branch: string;
  compatibilityScore: number;
  companyApplied: string;
  stage: 'Shortlisted' | 'Interview' | 'Offered';
  packageLpa: string;
}

export const PlacementsTab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'Company Openings' | 'Shortlisted Candidates' | 'Recruitment Funnel'>('Shortlisted Candidates');
  const [searchRollInput, setSearchRollInput] = useState('');
  const [activeSearchQuery, setActiveSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);

  const exportConfig = {
    filename: 'placement_data_export',
    pdfLabel: 'Placement Shortlist & Compatibility Report',
    csvData: 'Roll No,Name,Branch,Compatibility,Company,Stage,Package\n' +
      'CAP001,Amit Kumar,CSE,94%,TechCorp,Offered,12 LPA\n' +
      'CAP002,Priya Sharma,ECE,88%,Innovatech,Interview,8 LPA',
  };

  const [candidates, setCandidates] = useState<PlacementCandidate[]>([
    {
      rollNo: 'CAP001',
      name: 'Harini S',
      branch: 'CSE',
      compatibilityScore: 94,
      companyApplied: 'Tata Consultancy Services',
      stage: 'Offered',
      packageLpa: '₹ 12.5 LPA',
    },
    {
      rollNo: 'CAP002',
      name: 'Karthik R',
      branch: 'ECE',
      compatibilityScore: 88,
      companyApplied: 'Bosch Engineering',
      stage: 'Interview',
      packageLpa: '₹ 9.5 LPA',
    },
    {
      rollNo: 'CAP003',
      name: 'Priya M',
      branch: 'EEE',
      compatibilityScore: 78,
      companyApplied: 'Larsen & Toubro',
      stage: 'Shortlisted',
      packageLpa: '₹ 7.2 LPA',
    },
    {
      rollNo: 'CAP004',
      name: 'Arun K',
      branch: 'Mechanical',
      compatibilityScore: 92,
      companyApplied: 'Mahindra & Mahindra',
      stage: 'Offered',
      packageLpa: '₹ 10.0 LPA',
    },
    {
      rollNo: 'CAP005',
      name: 'Divya L',
      branch: 'Civil',
      compatibilityScore: 80,
      companyApplied: 'L&T Infrastructure',
      stage: 'Shortlisted',
      packageLpa: '₹ 6.5 LPA',
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleFetchData = () => {
    setActiveSearchQuery(searchRollInput);
    if (searchRollInput.trim()) {
      const match = candidates.find(c => c.rollNo.toLowerCase() === searchRollInput.toLowerCase() || c.name.toLowerCase().includes(searchRollInput.toLowerCase()));
      if (match) {
        showToast(`Fetched placement profile for Roll No: ${match.rollNo} (${match.name})`);
      } else {
        showToast(`No exact record found for "${searchRollInput}". Showing matching results.`);
      }
    } else {
      showToast('Displaying all candidate placement records.');
    }
  };

  const filteredCandidates = candidates.filter(c =>
    c.rollNo.toLowerCase().includes(activeSearchQuery.toLowerCase()) ||
    c.name.toLowerCase().includes(activeSearchQuery.toLowerCase()) ||
    c.companyApplied.toLowerCase().includes(activeSearchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12 font-sans text-slate-800">
      <InstitutionExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        config={exportConfig}
      />
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-3 border border-slate-700 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Page Title & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
        <div>
          <h1 className="text-lg font-black text-slate-800 tracking-tight">Placement Management</h1>
          <div className="text-xs font-semibold text-slate-500">Dashboard &gt; Placement Management</div>
        </div>
        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200 flex items-center gap-1.5 w-fit">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
          78.4% Overall Placement Rate
        </span>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-xl shadow-xs px-2 overflow-x-auto">
        {(['Company Openings', 'Shortlisted Candidates', 'Recruitment Funnel'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={`px-5 py-3 text-xs font-bold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeSubTab === tab 
                ? 'border-emerald-600 text-emerald-700 bg-emerald-50/40' 
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* DATA FETCH BAR (PRAGATI MITRA SPECIFIED: Input + Green Fetch Button) */}
      <div className="bg-slate-900 text-white rounded-xl p-4 shadow-md flex flex-col md:flex-row items-center justify-between gap-4 border border-slate-800">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-emerald-400">Candidate Data Fetch Bar</h3>
            <p className="text-[10px] text-slate-400 font-semibold">Instantly query roll number placement eligibility &amp; offer details</p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-1/2">
          <input
            type="text"
            value={searchRollInput}
            onChange={(e) => setSearchRollInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleFetchData()}
            placeholder="Enter Candidate Roll Number / ID (e.g. CAP001)..."
            className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-xs font-bold text-white placeholder-slate-400 outline-none focus:border-emerald-500 transition-colors"
          />
          <button
            onClick={handleFetchData}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-lg transition-colors shadow-sm cursor-pointer whitespace-nowrap"
          >
            Fetch Profile
          </button>
        </div>
      </div>

      {/* View Content Switching */}
      {activeSubTab === 'Shortlisted Candidates' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
            <h2 className="text-sm font-black text-slate-800 tracking-tight">
              Shortlisted Candidates &amp; Compatibility LEDGER ({filteredCandidates.length})
            </h2>
            <button 
              onClick={() => setShowExportModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-md text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> Export Placement Data
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[10px] uppercase font-black text-slate-500 tracking-wider">
                  <th className="p-4 border-b border-slate-200 w-12 text-center">#</th>
                  <th className="p-4 border-b border-slate-200">Roll Number / ID</th>
                  <th className="p-4 border-b border-slate-200">Candidate Name</th>
                  <th className="p-4 border-b border-slate-200">Branch</th>
                  <th className="p-4 border-b border-slate-200 text-center">Skill Compatibility %</th>
                  <th className="p-4 border-b border-slate-200">Company Applied</th>
                  <th className="p-4 border-b border-slate-200 text-center">Current Stage</th>
                  <th className="p-4 border-b border-slate-200 text-center">Package (LPA)</th>
                  <th className="p-4 border-b border-slate-200 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-xs font-semibold text-slate-700">
                {filteredCandidates.map((row, i) => {
                  let stageBadge = 'bg-amber-100 text-amber-800 border-amber-200';
                  if (row.stage === 'Interview') stageBadge = 'bg-blue-100 text-blue-800 border-blue-200';
                  if (row.stage === 'Offered') stageBadge = 'bg-emerald-100 text-emerald-800 border-emerald-200';

                  return (
                    <tr key={row.rollNo} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 border-b border-slate-200 text-center text-slate-400">{i + 1}</td>
                      <td className="p-4 border-b border-slate-200 font-bold text-slate-900">{row.rollNo}</td>
                      <td className="p-4 border-b border-slate-200 font-bold text-slate-800">{row.name}</td>
                      <td className="p-4 border-b border-slate-200 text-slate-500">{row.branch}</td>
                      <td className="p-4 border-b border-slate-200 text-center">
                        <span className="font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-xs">
                          {row.compatibilityScore}% Match
                        </span>
                      </td>
                      <td className="p-4 border-b border-slate-200 font-bold text-slate-700">{row.companyApplied}</td>
                      <td className="p-4 border-b border-slate-200 text-center">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider border ${stageBadge}`}>
                          {row.stage}
                        </span>
                      </td>
                      <td className="p-4 border-b border-slate-200 text-center font-black text-blue-600">{row.packageLpa}</td>
                      <td className="p-4 border-b border-slate-200 text-center">
                        <button
                          onClick={() => showToast(`Viewing full placement dossier for ${row.name}...`)}
                          className="px-3 py-1 border border-blue-200 text-blue-600 bg-blue-50 rounded-md text-[10px] font-bold uppercase hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeSubTab === 'Recruitment Funnel' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <h3 className="text-sm font-black text-slate-800 tracking-tight">Institutional Recruitment Conversion Funnel</h3>
          <FunnelChart steps={[
            { label: 'Applied Candidates', count: 1248, percentage: 100, color: '#3b82f6' },
            { label: 'Shortlisted for Assessment', count: 850, percentage: 68.1, color: '#0ea5e9' },
            { label: 'Passed Technical Round', count: 420, percentage: 33.6, color: '#10b981' },
            { label: 'HR & Final Interview', count: 280, percentage: 22.4, color: '#f59e0b' },
            { label: 'Placed / Received Offers', count: 245, percentage: 19.6, color: '#8b5cf6' },
          ]} />
        </div>
      )}

      {activeSubTab === 'Company Openings' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <h3 className="text-sm font-black text-slate-800 tracking-tight">Active Recruitment Drives &amp; Company Openings</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { company: 'Tata Consultancy Services', role: 'Digital Software Engineer', ctc: '₹ 12.5 LPA', deadline: 'Sep 25, 2026', applicants: 340 },
              { company: 'Bosch Engineering', role: 'Embedded Systems Developer', ctc: '₹ 9.5 LPA', deadline: 'Oct 02, 2026', applicants: 180 },
              { company: 'Larsen & Toubro', role: 'Graduate Engineer Trainee', ctc: '₹ 7.2 LPA', deadline: 'Oct 10, 2026', applicants: 210 },
            ].map((drive, idx) => (
              <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-2">
                <h4 className="text-xs font-black text-slate-900">{drive.company}</h4>
                <p className="text-[11px] font-bold text-blue-600">{drive.role}</p>
                <div className="flex justify-between text-[11px] text-slate-600 pt-2 border-t border-slate-200">
                  <span>CTC: <strong className="text-emerald-600">{drive.ctc}</strong></span>
                  <span>Applicants: <strong>{drive.applicants}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
