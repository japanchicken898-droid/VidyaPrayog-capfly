import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Handshake, 
  Briefcase, 
  CheckCircle2, 
  Users, 
  TrendingUp, 
  Calendar,
  FileText,
  Search,
  Plus,
  X,
  Presentation,
  MapPin,
  ExternalLink,
  Clock,
  Award,
  GraduationCap,
  Filter,
  Eye,
  Settings,
  ArrowRight,
  Download
} from 'lucide-react';
import { 
  VerticalBarChart, 
  DonutChart, 
  HorizontalBarChart, 
  MultiLineGraph 
} from './ChartUtils';
import { IndustryExportModal } from './IndustryExportModal';

interface Partner {
  id: string;
  name: string;
  logoBg: string;
  sector: string;
  status: 'Active' | 'Expiring Soon' | 'Under Renewal' | 'Inactive';
  projects: number;
  contactPerson: string;
  expiryDate: string;
  email: string;
}

const initialPartners: Partner[] = [
  { id: 'IND-01', name: 'Tata Consultancy Services (TCS)', logoBg: 'bg-blue-600', sector: 'IT & Software', status: 'Active', projects: 6, contactPerson: 'Mr. S. Narayanan', expiryDate: '14 Oct 2026', email: 's.narayanan@tcs.com' },
  { id: 'IND-02', name: 'Infosys', logoBg: 'bg-indigo-600', sector: 'IT & Software', status: 'Active', projects: 4, contactPerson: 'Ms. Priya Kumar', expiryDate: '22 Nov 2026', email: 'priya.k@infosys.com' },
  { id: 'IND-03', name: 'Bosch', logoBg: 'bg-emerald-600', sector: 'Manufacturing & Automation', status: 'Active', projects: 3, contactPerson: 'Mr. Arun Raj', expiryDate: '08 Jan 2027', email: 'arun.raj@bosch.com' },
  { id: 'IND-04', name: 'Apollo Hospitals', logoBg: 'bg-rose-600', sector: 'Healthcare', status: 'Expiring Soon', projects: 2, contactPerson: 'Dr. Meena S', expiryDate: '15 Dec 2026', email: 'meena.s@apollo.org' },
  { id: 'IND-05', name: 'Larsen & Toubro (L&T)', logoBg: 'bg-amber-600', sector: 'Heavy Engineering', status: 'Active', projects: 5, contactPerson: 'Mr. Vikram Mehta', expiryDate: '10 Aug 2027', email: 'v.mehta@lnt.com' },
  { id: 'IND-06', name: 'Cognizant', logoBg: 'bg-purple-600', sector: 'IT & Software', status: 'Under Renewal', projects: 3, contactPerson: 'Ms. Pooja Verma', expiryDate: '12 Mar 2026', email: 'pooja.v@cognizant.com' },
];

interface IndustryTabProps {
  selectedYear?: string;
  onYearChange?: (year: string) => void;
  activeSubSection?: string;
}

export const IndustryTab: React.FC<IndustryTabProps> = ({
  selectedYear = '2025 - 2026',
  onYearChange,
  activeSubSection = 'partners'
}) => {
  const mapSectionToTab = (sec?: string) => {
    if (sec === 'mous-agreements' || sec === 'mous') return 'mous';
    if (sec === 'industry-projects' || sec === 'projects') return 'projects';
    if (sec === 'consultancy') return 'consultancy';
    if (sec === 'guest-lectures' || sec === 'lectures') return 'lectures';
    if (sec === 'industry-visits' || sec === 'visits') return 'visits';
    if (sec === 'industry-internships' || sec === 'internships') return 'internships';
    return 'partners';
  };

  const [year, setYear] = useState(selectedYear);
  const [activeTab, setActiveTab] = useState(() => mapSectionToTab(activeSubSection));
  
  // Sync activeTab when activeSubSection prop changes (e.g. from sidebar floating menu click!)
  useEffect(() => {
    setActiveTab(mapSectionToTab(activeSubSection));
  }, [activeSubSection]);

  // Roster state
  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [search, setSearch] = useState('');
  const [sectorFilter, setSectorFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modals state
  const [selectedPartnerView, setSelectedPartnerView] = useState<Partner | null>(null);
  const [selectedMouPartner, setSelectedMouPartner] = useState<Partner | null>(null);
  const [showAddPartnerModal, setShowAddPartnerModal] = useState(false);

  const [newPartner, setNewPartner] = useState({
    name: '', sector: 'IT & Software', status: 'Active' as Partner['status'],
    projects: 1, contactPerson: '', expiryDate: '15 Dec 2026', email: ''
  });

  const filteredPartners = partners.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
                          p.sector.toLowerCase().includes(search.toLowerCase());
    const matchesSector = sectorFilter === 'All' || p.sector === sectorFilter;
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesSector && matchesStatus;
  });

  const handleAddPartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPartner.name) return;
    const partner: Partner = {
      id: `IND-${String(partners.length + 1).padStart(2, '0')}`,
      name: newPartner.name,
      logoBg: 'bg-blue-600',
      sector: newPartner.sector,
      status: newPartner.status,
      projects: Number(newPartner.projects) || 1,
      contactPerson: newPartner.contactPerson || 'Contact Person',
      expiryDate: newPartner.expiryDate || '31 Dec 2026',
      email: newPartner.email || 'contact@company.com'
    };
    setPartners([partner, ...partners]);
    setShowAddPartnerModal(false);
    setNewPartner({ name: '', sector: 'IT & Software', status: 'Active', projects: 1, contactPerson: '', expiryDate: '15 Dec 2026', email: '' });
  };

  const [showExportModal, setShowExportModal] = useState(false);

  const exportCSV = () => {
    setShowExportModal(true);
  };

  const exportConfig = {
    filename: `Industry_Partners_${year}`,
    pdfLabel: `Industry Partners & Collaboration Overview Report (${year})`,
    csvData: 'Company Name,Industry Sector,MoU Status,Projects,Contact Person,Expiry Date\n' +
      partners.map(p => `"${p.name}","${p.sector}","${p.status}",${p.projects},"${p.contactPerson}","${p.expiryDate}"`).join('\n'),
  };

  return (
    <div className="space-y-6 font-sans text-slate-800 bg-[#f8fafc] min-h-full pb-12 animate-in fade-in duration-200 relative">
      <IndustryExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        config={exportConfig}
        onToast={(msg) => { void msg; }}
      />
      {/* 1. PAGE HEADER (Title, Subtitle, Year Selector, Export Report, + Add Partner) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Industry Collaboration</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Manage corporate partnerships, MoUs, sponsored projects, and industry engagement.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-2xs">
            <Calendar className="w-4 h-4 text-blue-600" />
            <select
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
                if (onYearChange) onYearChange(e.target.value);
              }}
              className="text-xs font-bold text-slate-900 bg-transparent border-none outline-none cursor-pointer"
            >
              <option value="2025 - 2026">2025 - 2026</option>
              <option value="2024 - 2025">2024 - 2025</option>
              <option value="2023 - 2024">2023 - 2024</option>
            </select>
          </div>

          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl px-3.5 py-2 border border-slate-200 shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Report</span>
          </button>

          <button
            onClick={() => setShowAddPartnerModal(true)}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl px-4 py-2 shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Partner</span>
          </button>
        </div>
      </div>

      {/* 2. SECTION A — 6 SUMMARY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {[
          { label: 'Industry Partners', value: '36', change: '+12% vs last year', Icon: Building2, color: 'text-blue-600 bg-blue-50' },
          { label: 'Active MoUs', value: '28', change: '+17% vs last year', Icon: Handshake, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Ongoing Projects', value: '16', change: '+33% vs last year', Icon: Briefcase, color: 'text-purple-600 bg-purple-50' },
          { label: 'Completed Projects', value: '24', change: '+20% vs last year', Icon: CheckCircle2, color: 'text-indigo-600 bg-indigo-50' },
          { label: 'Guest Lectures', value: '42', change: '+40% vs last year', Icon: GraduationCap, color: 'text-amber-600 bg-amber-50' },
          { label: 'Industry Visits', value: '18', change: '+28% vs last year', Icon: Building2, color: 'text-rose-600 bg-rose-50' },
        ].map((c, idx) => (
          <div key={idx} className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500 truncate">{c.label}</span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${c.color}`}>
                <c.Icon className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 leading-tight">{c.value}</h3>
              <p className="text-[10px] font-extrabold text-emerald-600 mt-0.5">{c.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 3. SECTION B — INDUSTRY PARTNERSHIP OVERVIEW (Growth Bar & MoU Donut) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Card 1: Industry Partnership Growth */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
          <div className="pb-3 border-b border-slate-100 mb-2 flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900">Industry Partnership Growth</h3>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">2021 – 2025</span>
          </div>
          <div className="py-2">
            <VerticalBarChart
              data={[
                { label: '2021', value: 8, color: '#93c5fd' },
                { label: '2022', value: 12, color: '#93c5fd' },
                { label: '2023', value: 18, color: '#93c5fd' },
                { label: '2024', value: 22, color: '#93c5fd' },
                { label: '2025', value: 28, color: '#2563eb' }
              ]}
            />
          </div>
        </div>

        {/* Card 2: MoU Status */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
          <div className="pb-3 border-b border-slate-100 mb-2 flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900">MoU Status</h3>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">25 Total Contracts</span>
          </div>
          <div className="py-2">
            <DonutChart
              data={[
                { label: 'Active', value: 18, color: '#2563eb' },
                { label: 'Expiring Soon', value: 4, color: '#f59e0b' },
                { label: 'Renewed', value: 2, color: '#10b981' },
                { label: 'Inactive', value: 1, color: '#ec4899' }
              ]}
              centerText="25"
              centerSubtext="MoUs"
            />
          </div>
        </div>

      </div>

      {/* 4. SECTION C — COLLABORATION ACTIVITY OVERVIEW */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
        <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-slate-900">Collaboration Activity Overview</h3>
          <span className="text-xs font-bold text-slate-400">Institutional Engagement Breakdown</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            { title: 'Consultancy Projects', count: '14 Live', status: 'Active', Icon: Briefcase, color: 'border-blue-200 bg-blue-50/50 text-blue-700' },
            { title: 'Joint Research', count: '8 Papers', status: 'Published', Icon: FileText, color: 'border-emerald-200 bg-emerald-50/50 text-emerald-700' },
            { title: 'Sponsored Labs', count: '6 Labs', status: 'Operational', Icon: Building2, color: 'border-purple-200 bg-purple-50/50 text-purple-700' },
            { title: 'Guest Lectures', count: '42 Sessions', status: 'Ongoing', Icon: GraduationCap, color: 'border-amber-200 bg-amber-50/50 text-amber-700' },
            { title: 'Workshops', count: '18 Events', status: 'Completed', Icon: Presentation, color: 'border-indigo-200 bg-indigo-50/50 text-indigo-700' },
            { title: 'Industry Visits', count: '18 Trips', status: 'Scheduled', Icon: Building2, color: 'border-rose-200 bg-rose-50/50 text-rose-700' },
            { title: 'Student Internships', count: '120 Placed', status: 'Active', Icon: Users, color: 'border-teal-200 bg-teal-50/50 text-teal-700' },
          ].map((act, i) => (
            <div key={i} className={`p-3 rounded-xl border ${act.color} flex flex-col justify-between space-y-2`}>
              <div className="flex items-center justify-between">
                <act.Icon className="w-4 h-4" />
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-white/80">{act.status}</span>
              </div>
              <div>
                <h4 className="text-[11px] font-bold leading-snug">{act.title}</h4>
                <p className="text-[10px] font-extrabold mt-0.5">{act.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. SECTION D — FUNCTIONAL TABS & MANAGEMENT TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden space-y-4">
        
        {/* FUNCTIONAL TABS BAR */}
        <div className="border-b border-slate-200/90 bg-slate-50/50 px-4 pt-3 flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'partners', label: 'Industry Partners' },
            { id: 'mous', label: 'MoUs & Agreements' },
            { id: 'projects', label: 'Industry Projects' },
            { id: 'consultancy', label: 'Consultancy' },
            { id: 'lectures', label: 'Guest Lectures & Workshops' },
            { id: 'visits', label: 'Industry Visits' },
            { id: 'internships', label: 'Internships' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'border-blue-600 text-blue-600 bg-white rounded-t-lg shadow-2xs'
                    : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: INDUSTRY PARTNERS TABLE */}
        {activeTab === 'partners' && (
          <div className="p-4 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search by company name..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={sectorFilter}
                  onChange={e => setSectorFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700"
                >
                  <option value="All">All Industry Sectors</option>
                  <option value="IT & Software">IT &amp; Software</option>
                  <option value="Manufacturing & Automation">Manufacturing &amp; Automation</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Heavy Engineering">Heavy Engineering</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700"
                >
                  <option value="All">All MoU Status</option>
                  <option value="Active">Active</option>
                  <option value="Expiring Soon">Expiring Soon</option>
                  <option value="Under Renewal">Under Renewal</option>
                </select>

                <button
                  onClick={exportCSV}
                  className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-3 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export</span>
                </button>

                <button
                  onClick={() => setShowAddPartnerModal(true)}
                  className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Partner</span>
                </button>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase text-slate-500">
                    <th className="py-3 px-4">Company Name</th>
                    <th className="py-3 px-4">Industry Sector</th>
                    <th className="py-3 px-4">MoU Status</th>
                    <th className="py-3 px-4 text-center">Projects</th>
                    <th className="py-3 px-4">Contact Person</th>
                    <th className="py-3 px-4">Expiry Date</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                  {filteredPartners.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-7 h-7 rounded-lg ${p.logoBg} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                            {p.name[0]}
                          </div>
                          <span className="font-bold text-slate-900">{p.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{p.sector}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                          p.status === 'Active' ? 'bg-emerald-100 text-emerald-800' :
                          p.status === 'Expiring Soon' ? 'bg-amber-100 text-amber-800' : 'bg-purple-100 text-purple-800'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center font-bold text-blue-700">{p.projects}</td>
                      <td className="py-3 px-4 text-slate-800 font-semibold">{p.contactPerson}</td>
                      <td className="py-3 px-4 text-slate-600">{p.expiryDate}</td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setSelectedPartnerView(p)}
                            className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                          >
                            View
                          </button>
                          <button
                            onClick={() => setSelectedMouPartner(p)}
                            className="text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                          >
                            Manage MoU
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: MOUS & AGREEMENTS */}
        {activeTab === 'mous' && (
          <div className="p-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-700">Institutional MoUs &amp; Legal Agreements</h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 font-extrabold text-slate-500 uppercase text-[10px]">
                  <tr><th className="p-3">Company Partner</th><th className="p-3">Industry Sector</th><th className="p-3">Status</th><th className="p-3">Expiry Date</th><th className="p-3 text-center">Actions</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {partners.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-900">{p.name}</td>
                      <td className="p-3 text-slate-600">{p.sector}</td>
                      <td className="p-3"><span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">{p.status}</span></td>
                      <td className="p-3 text-slate-600">{p.expiryDate}</td>
                      <td className="p-3 text-center"><button onClick={() => setSelectedMouPartner(p)} className="text-xs font-bold text-blue-600 hover:underline">Manage MoU Details</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: INDUSTRY PROJECTS */}
        {activeTab === 'projects' && (
          <div className="p-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-700">Live Industry &amp; Sponsored R&amp;D Projects</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'AI Infrastructure & GenAI Pipeline Optimization', partner: 'Tata Consultancy Services (TCS)', lead: 'Dr. Anitha S (CSE)', budget: '₹ 28.5 Lakhs', progress: 75 },
                { title: 'Robotic Welding Automation Consultancy', partner: 'Larsen & Toubro (L&T)', lead: 'Dr. Prakash M (Mech)', budget: '₹ 42.0 Lakhs', progress: 100 },
                { title: 'RISC-V Microprocessor Validation Lab', partner: 'Bosch', lead: 'Dr. Karthik R (ECE)', budget: '₹ 34.0 Lakhs', progress: 60 },
                { title: 'Smart Grid Load Balancing Algorithm', partner: 'Tata Power', lead: 'Dr. Meena P (EEE)', budget: '₹ 18.0 Lakhs', progress: 85 },
              ].map((prj, i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-2">
                  <div>
                    <span className="text-[10px] font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded">R&amp;D Project</span>
                    <h5 className="text-xs font-bold text-slate-900 mt-2">{prj.title}</h5>
                    <p className="text-[11px] text-slate-500 font-medium">Partner: {prj.partner} &bull; Lead: {prj.lead}</p>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] font-bold text-slate-700 mb-1">
                      <span>Progress</span>
                      <span>{prj.progress}% ({prj.budget})</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full rounded-full" style={{ width: `${prj.progress}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CONSULTANCY */}
        {activeTab === 'consultancy' && (
          <div className="p-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-700">Corporate Consultancy &amp; Technical Advisory</h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 font-extrabold text-slate-500 uppercase text-[10px]">
                  <tr><th className="p-3">Client Firm</th><th className="p-3">Consultancy Domain</th><th className="p-3">Faculty Lead</th><th className="p-3">Revenue Value</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50"><td className="p-3 font-bold text-slate-900">Tata Consultancy Services</td><td className="p-3">Cloud AI Infrastructure</td><td className="p-3">Dr. Anitha S</td><td className="p-3 font-extrabold text-emerald-700">₹ 14.5 Lakhs</td></tr>
                  <tr className="hover:bg-slate-50"><td className="p-3 font-bold text-slate-900">Larsen &amp; Toubro</td><td className="p-3">Robotic Automation</td><td className="p-3">Dr. Prakash M</td><td className="p-3 font-extrabold text-emerald-700">₹ 22.0 Lakhs</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: GUEST LECTURES */}
        {activeTab === 'lectures' && (
          <div className="p-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-700">Corporate Guest Lectures &amp; Speaker Workshops</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { topic: 'Generative AI Applications in Cloud Native Microservices', speaker: 'Mr. S. Narayanan (TCS)', date: 'Mar 24, 2026', venue: 'Auditorium 1' },
                { topic: 'VLSI Chip Architecture & 3nm Fabrication Trends', speaker: 'Mr. Arun Raj (Bosch)', date: 'Apr 02, 2026', venue: 'Seminar Hall B' },
              ].map((lec, i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">Tech Talk</span>
                    <h5 className="text-xs font-bold text-slate-900 mt-2 mb-1">{lec.topic}</h5>
                    <p className="text-[11px] text-slate-600 font-medium">Speaker: {lec.speaker}</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-200 flex justify-between items-center text-[11px] font-bold text-slate-500">
                    <span>{lec.date} &bull; {lec.venue}</span>
                    <button onClick={() => setShowExportModal(true)} className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-3 py-1 rounded-lg text-xs font-bold">Register Students</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: VISITS */}
        {activeTab === 'visits' && (
          <div className="p-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-700">Industrial Visits &amp; Campus Trips</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { company: 'Larsen & Toubro Plant Visit', dept: 'Mechanical (Yr 3)', date: 'Feb 18, 2026', count: '120 Students' },
                { company: 'Bosch Smart Automation Facility', dept: 'ECE & EEE (Yr 4)', date: 'Mar 15, 2026', count: '85 Students' },
              ].map((v, i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex justify-between items-center">
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">{v.company}</h5>
                    <p className="text-[11px] text-slate-500 font-medium">{v.dept} &bull; {v.date}</p>
                  </div>
                  <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg">{v.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: INTERNSHIPS */}
        {activeTab === 'internships' && (
          <div className="p-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-700">Industry Internship Opportunities &amp; Placements</h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 font-extrabold text-slate-500 uppercase text-[10px]">
                  <tr><th className="p-3">Partner Firm</th><th className="p-3">Internship Role</th><th className="p-3">Stipend</th><th className="p-3">Students Placed</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50"><td className="p-3 font-bold text-slate-900">Tata Consultancy Services</td><td className="p-3">Cloud AI Intern</td><td className="p-3 font-bold text-emerald-700">₹ 35,000 / Mo</td><td className="p-3 font-extrabold">42 Students</td></tr>
                  <tr className="hover:bg-slate-50"><td className="p-3 font-bold text-slate-900">Infosys</td><td className="p-3">Systems Engineer Intern</td><td className="p-3 font-bold text-emerald-700">₹ 30,000 / Mo</td><td className="p-3 font-extrabold">38 Students</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* MODAL 1: VIEW PARTNER DETAILS */}
      {selectedPartnerView && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${selectedPartnerView.logoBg} text-white font-black text-sm flex items-center justify-center`}>
                  {selectedPartnerView.name[0]}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{selectedPartnerView.name}</h3>
                  <p className="text-[11px] text-slate-500 font-semibold">{selectedPartnerView.sector}</p>
                </div>
              </div>
              <button onClick={() => setSelectedPartnerView(null)} className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex justify-between"><span className="text-slate-500 font-semibold">MoU Status:</span><span className="font-bold text-emerald-600">{selectedPartnerView.status}</span></div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex justify-between"><span className="text-slate-500 font-semibold">Active Projects:</span><span className="font-extrabold text-slate-900">{selectedPartnerView.projects} Projects</span></div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex justify-between"><span className="text-slate-500 font-semibold">Contact Person:</span><span className="font-bold text-slate-800">{selectedPartnerView.contactPerson} ({selectedPartnerView.email})</span></div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex justify-between"><span className="text-slate-500 font-semibold">Expiry Date:</span><span className="font-bold text-slate-800">{selectedPartnerView.expiryDate}</span></div>
            </div>

            <div className="mt-5 flex justify-end">
              <button onClick={() => setSelectedPartnerView(null)} className="px-4 py-2 text-xs font-bold text-white bg-blue-600 rounded-xl cursor-pointer">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: MANAGE MOU */}
      {selectedMouPartner && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <h3 className="text-sm font-bold text-slate-900">Manage MoU — {selectedMouPartner.name}</h3>
              <button onClick={() => setSelectedMouPartner(null)} className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                <p className="font-bold text-blue-900">Current MoU Status: {selectedMouPartner.status}</p>
                <p className="text-[11px] text-blue-700 mt-0.5">Agreement Expires on: <strong>{selectedMouPartner.expiryDate}</strong></p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Update MoU Expiry Date</label>
                <input type="text" defaultValue={selectedMouPartner.expiryDate} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>

            <div className="mt-5 flex justify-between items-center">
              <button onClick={() => {
                setSelectedMouPartner(null);
                setShowExportModal(true);
              }} className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer">
                <Download className="w-3.5 h-3.5" /> Download Contract PDF
              </button>
              <button onClick={() => setSelectedMouPartner(null)} className="px-4 py-2 text-xs font-bold text-white bg-blue-600 rounded-xl cursor-pointer">Save &amp; Close</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: ADD PARTNER FORM */}
      {showAddPartnerModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <h3 className="text-sm font-bold text-slate-900">+ Add Industry Partner</h3>
              <button onClick={() => setShowAddPartnerModal(false)} className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddPartner} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Company Name</label>
                <input type="text" required placeholder="e.g. Wipro Technologies" value={newPartner.name} onChange={e => setNewPartner({...newPartner, name: e.target.value})} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Industry Sector</label>
                  <select value={newPartner.sector} onChange={e => setNewPartner({...newPartner, sector: e.target.value})} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
                    <option value="IT & Software">IT &amp; Software</option>
                    <option value="Manufacturing & Automation">Manufacturing &amp; Automation</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Heavy Engineering">Heavy Engineering</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">MoU Status</label>
                  <select value={newPartner.status} onChange={e => setNewPartner({...newPartner, status: e.target.value as Partner['status']})} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500">
                    <option value="Active">Active</option>
                    <option value="Expiring Soon">Expiring Soon</option>
                    <option value="Under Renewal">Under Renewal</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Contact Person</label>
                  <input type="text" placeholder="e.g. Mr. S. Narayanan" value={newPartner.contactPerson} onChange={e => setNewPartner({...newPartner, contactPerson: e.target.value})} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Expiry Date</label>
                  <input type="text" placeholder="e.g. 14 Oct 2026" value={newPartner.expiryDate} onChange={e => setNewPartner({...newPartner, expiryDate: e.target.value})} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddPartnerModal(false)} className="px-4 py-2 font-bold text-slate-600 hover:bg-slate-100 rounded-xl">Cancel</button>
                <button type="submit" className="px-4 py-2 font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs">Save Partner</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
