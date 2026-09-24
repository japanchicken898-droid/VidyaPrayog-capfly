import React, { useState } from 'react';
import {
  Building2, Search, Filter, Plus, Download, Mail, Globe, MapPin,
  CheckCircle2, X, TrendingUp, Handshake, ShieldCheck
} from 'lucide-react';
import { SemiCircleGauge, DonutChart, HorizontalBarChart, KPICard, MultiSegmentProgressBar } from './ChartUtils';
import { IndustryExportModal } from './IndustryExportModal';

export interface Partner {
  id: string; 
  name: string; 
  logo: string;
  tier: 'Tier-1 Global MNC' | 'Tier-2 Enterprise' | 'Tier-3 Startup';
  domain: string; 
  location: string; 
  activeMoUs: number;
  placementsCount: number; 
  avgPackage: string;
  contactName: string; 
  contactEmail: string;
  status: 'Active' | 'Pending Renewal';
}

const mockPartners: Partner[] = [
  { 
    id: 'P-101', 
    name: 'Microsoft Corp',
    logo: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=60&q=80',
    tier: 'Tier-1 Global MNC', 
    domain: 'Software & Cloud', 
    location: 'Bangalore / Seattle',
    activeMoUs: 4, 
    placementsCount: 42, 
    avgPackage: '28.5 LPA',
    contactName: 'Sarah Jenkins', 
    contactEmail: 's.jenkins@microsoft.com', 
    status: 'Active' 
  },
  { 
    id: 'P-102', 
    name: 'Google LLC',
    logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=60&q=80',
    tier: 'Tier-1 Global MNC', 
    domain: 'AI & Cloud Infrastructure', 
    location: 'Hyderabad / Mountain View',
    activeMoUs: 3, 
    placementsCount: 38, 
    avgPackage: '32.0 LPA',
    contactName: 'Rajesh Varma', 
    contactEmail: 'rvarma@google.com', 
    status: 'Active' 
  },
  { 
    id: 'P-103', 
    name: 'Larsen and Toubro',
    logo: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?w=60&q=80',
    tier: 'Tier-2 Enterprise', 
    domain: 'Heavy Engineering', 
    location: 'Mumbai / Pune',
    activeMoUs: 5, 
    placementsCount: 65, 
    avgPackage: '14.2 LPA',
    contactName: 'Anil Deshmukh', 
    contactEmail: 'a.deshmukh@lnt.com', 
    status: 'Active' 
  },
  { 
    id: 'P-104', 
    name: 'Tata Consultancy Services',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=60&q=80',
    tier: 'Tier-1 Global MNC', 
    domain: 'IT and Digital Transformation', 
    location: 'Chennai / Mumbai',
    activeMoUs: 6, 
    placementsCount: 110, 
    avgPackage: '9.8 LPA',
    contactName: 'Priya Sundaram', 
    contactEmail: 'priya.s@tcs.com', 
    status: 'Active' 
  },
  { 
    id: 'P-105', 
    name: 'Zomato Ltd',
    logo: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=60&q=80',
    tier: 'Tier-3 Startup', 
    domain: 'Consumer Tech and Logistics', 
    location: 'Gurugram',
    activeMoUs: 2, 
    placementsCount: 18, 
    avgPackage: '18.0 LPA',
    contactName: 'Karan Mehra', 
    contactEmail: 'karan.m@zomato.com', 
    status: 'Pending Renewal' 
  },
  { 
    id: 'P-106', 
    name: 'Siemens Healthineers',
    logo: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=60&q=80',
    tier: 'Tier-2 Enterprise', 
    domain: 'MedTech and Diagnostics', 
    location: 'Bangalore / Erlangen',
    activeMoUs: 3, 
    placementsCount: 24, 
    avgPackage: '16.5 LPA',
    contactName: 'Elena Rostova', 
    contactEmail: 'elena.rostova@siemens.com', 
    status: 'Active' 
  },
];

export const IndustryPartnersTab: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>(mockPartners);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('All');
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // New Partner State
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newDomain, setNewDomain] = useState('');
  const [newTier, setNewTier] = useState<'Tier-1 Global MNC' | 'Tier-2 Enterprise' | 'Tier-3 Startup'>('Tier-1 Global MNC');
  const [newLocation, setNewLocation] = useState('');

  const showToast = (msg: string) => { 
    setToastMsg(msg); 
    setTimeout(() => setToastMsg(null), 4000); 
  };

  const filtered = partners.filter(p => {
    const q = searchTerm.toLowerCase();
    const matchesSearch = 
      p.name.toLowerCase().includes(q) || 
      p.domain.toLowerCase().includes(q) || 
      p.location.toLowerCase().includes(q);
    const matchesTier = selectedTier === 'All' || p.tier === selectedTier;
    return matchesSearch && matchesTier;
  });

  const tierData = [
    { label: 'Tier-1 Global MNC', value: 48, color: '#2563eb' },
    { label: 'Tier-2 Enterprise', value: 62, color: '#059669' },
    { label: 'Tier-3 Startup', value: 32, color: '#d97706' },
  ];

  const domainSegs = [
    { label: 'IT and Software', value: 42, color: '#2563eb' },
    { label: 'Core Engineering', value: 28, color: '#059669' },
    { label: 'Finance and Fintech', value: 16, color: '#7c3aed' },
    { label: 'Healthcare', value: 14, color: '#db2777' },
  ];

  const handleExportCSV = () => {
    setShowExportModal(true);
  };

  const exportConfig = {
    filename: 'industry_partners_directory',
    pdfLabel: 'Industry Partners Directory Report',
    csvData: 'Partner Name,Tier,Domain,Active MoUs,Placements,Avg Package,Contact Name,Contact Email,Status\n' +
      partners.map(p => `"${p.name}","${p.tier}","${p.domain}",${p.activeMoUs},${p.placementsCount},"${p.avgPackage}","${p.contactName}","${p.contactEmail}","${p.status}"`).join('\n'),
  };

  const handleAddPartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newPartner: Partner = {
      id: 'P-' + Date.now(),
      name: newName,
      logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=60&q=80',
      tier: newTier,
      domain: newDomain || 'Technology & Engineering',
      location: newLocation || 'Bangalore / Global',
      activeMoUs: 1,
      placementsCount: 15,
      avgPackage: '12.5 LPA',
      contactName: 'University Relations Head',
      contactEmail: newEmail || `campus@${newName.toLowerCase().replace(/[^a-z]/g, '')}.com`,
      status: 'Active'
    };

    setPartners(prev => [newPartner, ...prev]);
    setShowAddModal(false);
    setNewName('');
    setNewEmail('');
    setNewDomain('');
    setNewLocation('');
    showToast(`Partner "${newName}" onboarded successfully!`);
  };

  return (
    <div className="p-6 relative space-y-6 max-w-[1600px] mx-auto">
      <IndustryExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        config={exportConfig}
        onToast={showToast}
      />
      {toastMsg && (
        <div className="fixed top-20 right-8 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in slide-in-from-top-4 duration-200">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <p className="text-xs font-semibold">{toastMsg}</p>
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Industry Partners Directory</h1>
            <p className="text-xs text-slate-500 mt-0.5">142 accredited corporate partners, MoUs, domain verticals and active recruiters</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
          >
            <Download className="w-4 h-4 text-slate-500" />
            Export Directory
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-blue-500/20 cursor-pointer transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Corporate Partner
          </button>
        </div>
      </div>

      {/* KPIS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Partners" value="142" change="+18 this FY" isPositive={true} icon={<svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>} color="blue" />
        <KPICard title="Active MoUs" value="48" change="100% active" isPositive={true} icon={<svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>} color="emerald" />
        <KPICard title="Avg Package Offered" value="16.8 LPA" change="+2.4 LPA YoY" isPositive={true} icon={<svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>} color="purple" />
        <KPICard title="Tier-1 MNCs" value="48" change="33.8% share" isPositive={true} icon={<svg className="w-5 h-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>} color="amber" />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900 mb-1">Partners by Tier</h2>
          <p className="text-xs text-slate-400 mb-4">Enterprise tier classification of connected companies</p>
          <DonutChart data={tierData} centerText="142" centerSubtext="Partners" />
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900 mb-1">Industry Domain Breakdown</h2>
          <p className="text-xs text-slate-400 mb-6">Vertical specialization of corporate collaborations</p>
          <MultiSegmentProgressBar segments={domainSegs} />
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Highest Demand: IT and Software (42%)
            </span>
          </div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search company, domain or city..."
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
        <div className="flex items-center gap-3">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs font-semibold text-slate-600">Tier:</span>
          <select 
            value={selectedTier} 
            onChange={e => setSelectedTier(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="All">All Tiers</option>
            <option value="Tier-1 Global MNC">Tier-1 Global MNC</option>
            <option value="Tier-2 Enterprise">Tier-2 Enterprise</option>
            <option value="Tier-3 Startup">Tier-3 Startup</option>
          </select>
        </div>
      </div>

      {/* PARTNERS TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Corporate Partners Directory</h3>
          <span className="text-xs text-slate-500">{filtered.length} of {partners.length} partners</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-6">Company</th>
                <th className="py-3.5 px-4">Tier</th>
                <th className="py-3.5 px-4">MoUs</th>
                <th className="py-3.5 px-4">Hired</th>
                <th className="py-3.5 px-4">Avg Pkg</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img src={p.logo} alt={p.name} className="w-10 h-10 rounded-xl object-cover border border-slate-200" />
                      <div>
                        <div className="font-bold text-slate-900">{p.name}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" />{p.domain} - {p.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      p.tier === 'Tier-1 Global MNC' ? 'bg-blue-50 text-blue-700' :
                      p.tier === 'Tier-2 Enterprise' ? 'bg-emerald-50 text-emerald-700' :
                      'bg-amber-50 text-amber-700'
                    }`}>
                      {p.tier}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-bold text-slate-800">{p.activeMoUs}</td>
                  <td className="py-4 px-4">
                    <span className="font-bold text-slate-900">{p.placementsCount}</span>
                    <span className="text-[10px] text-slate-400 block">students</span>
                  </td>
                  <td className="py-4 px-4 font-extrabold text-blue-600">Rs {p.avgPackage}</td>
                  <td className="py-4 px-4">
                    <div className="font-semibold text-slate-800">{p.contactName}</div>
                    <div className="text-[10px] text-slate-400 truncate max-w-[140px]">{p.contactEmail}</div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      p.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${p.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      {p.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button 
                      onClick={() => setSelectedPartner(p)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-blue-600 text-xs font-semibold cursor-pointer transition-colors"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400 font-medium">
                    No industry partners found matching the filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PARTNER PROFILE MODAL */}
      {selectedPartner && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold">{selectedPartner.name}</h2>
                <p className="text-xs text-slate-400">{selectedPartner.tier} • {selectedPartner.domain}</p>
              </div>
              <button 
                onClick={() => setSelectedPartner(null)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Location</span>
                  <span className="font-bold text-slate-800">{selectedPartner.location}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">MoUs</span>
                  <span className="font-bold text-blue-600">{selectedPartner.activeMoUs} Active</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Avg Package</span>
                  <span className="font-bold text-emerald-600">Rs {selectedPartner.avgPackage}</span>
                </div>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 space-y-2.5">
                <div className="font-bold text-slate-800 text-sm">{selectedPartner.contactName}</div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedPartner.contactEmail}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span>careers.{selectedPartner.name.toLowerCase().replace(/[^a-z]/g, '')}.com</span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => setSelectedPartner(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD PARTNER MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <h2 className="text-base font-bold flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-400" />
                Add Corporate Partner
              </h2>
              <button 
                onClick={() => setShowAddModal(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <form onSubmit={handleAddPartner} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Company Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Cisco Systems" 
                  value={newName} 
                  onChange={e => setNewName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tier</label>
                  <select 
                    value={newTier} 
                    onChange={e => setNewTier(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 outline-none cursor-pointer"
                  >
                    <option value="Tier-1 Global MNC">Tier-1 Global MNC</option>
                    <option value="Tier-2 Enterprise">Tier-2 Enterprise</option>
                    <option value="Tier-3 Startup">Tier-3 Startup</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Location</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Bangalore / USA" 
                    value={newLocation} 
                    onChange={e => setNewLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Industry Domain</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Cybersecurity & Cloud" 
                  value={newDomain} 
                  onChange={e => setNewDomain(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 outline-none"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Contact Email</label>
                <input 
                  type="email" 
                  placeholder="e.g. hr@cisco.com" 
                  value={newEmail} 
                  onChange={e => setNewEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 outline-none"
                />
              </div>
              <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md shadow-blue-500/20 cursor-pointer transition-colors"
                >
                  Save Partner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
