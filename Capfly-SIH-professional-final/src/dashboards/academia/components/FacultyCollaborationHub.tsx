import React, { useState } from 'react';
import { 
  Building2, Briefcase, Award, TrendingUp, Search, Calendar, MapPin, 
  Clock, Plus, CheckCircle2, ChevronRight, X, User, Users
} from 'lucide-react';

type FacultyCollabTab = 'consultancies' | 'fdp' | 'grants';

export const FacultyCollaborationHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FacultyCollabTab>('consultancies');
  
  // Modals
  const [isProposeModalOpen, setProposeModalOpen] = useState(false);
  const [isFdpModalOpen, setFdpModalOpen] = useState(false);
  const [isBidModalOpen, setBidModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Data States
  const [consultancies, setConsultancies] = useState([
    { id: 'c1', title: 'Optimization of 5G Antenna Arrays', company: 'TelcoComm India', funding: '₹12 Lakhs', status: 'Open', deadline: 'Oct 30, 2026' },
    { id: 'c2', title: 'Biodegradable Packaging Polymers', company: 'EcoPlast Corp', funding: '₹8 Lakhs', status: 'Reviewing', deadline: 'Oct 15, 2026' }
  ]);

  const [fdps, setFdps] = useState([
    { id: 'f1', title: 'Industrial IoT & Automation Workshop', company: 'Siemens', date: 'Nov 10 - Nov 14, 2026', mode: 'Hybrid', seats: 40, registered: false },
    { id: 'f2', title: 'Advanced Cloud Security FDP', company: 'AWS Academy', date: 'Dec 01 - Dec 05, 2026', mode: 'Online', seats: 100, registered: false }
  ]);

  const [grants, setGrants] = useState([
    { id: 'g1', title: 'Joint Research: Quantum Computing Applications', partner: 'IBM Research', grant: '₹50 Lakhs', matching: '50% Co-funded', status: 'Accepting Proposals' },
    { id: 'g2', title: 'AI in Healthcare Diagnostics', partner: 'Apollo Hospitals Hub', grant: '₹25 Lakhs', matching: '100% Funded', status: 'Closing Soon' }
  ]);

  // Form States
  const [proposeForm, setProposeForm] = useState({ title: '', summary: '', amount: '' });
  const [bidForm, setBidForm] = useState({ abstract: '', teamSize: '' });

  const handleProposeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConsultancies([{
      id: `c${Date.now()}`,
      title: proposeForm.title,
      company: 'Pending Partner',
      funding: `₹${proposeForm.amount} Lakhs`,
      status: 'Proposed',
      deadline: 'TBD'
    }, ...consultancies]);
    setProposeModalOpen(false);
    setProposeForm({ title: '', summary: '', amount: '' });
  };

  const handleFdpRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setFdps(fdps.map(f => f.id === selectedItem.id ? { ...f, registered: true } : f));
    setFdpModalOpen(false);
    setSelectedItem(null);
  };

  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGrants(grants.map(g => g.id === selectedItem.id ? { ...g, status: 'Bid Submitted' } : g));
    setBidModalOpen(false);
    setSelectedItem(null);
    setBidForm({ abstract: '', teamSize: '' });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 font-['Outfit']">Faculty Collaboration Hub</h2>
            <p className="text-sm text-slate-500 mt-1">
              Engage with industry through R&D consultancies, FDPs, and joint research grants.
            </p>
          </div>
          {activeTab === 'consultancies' && (
            <button 
              onClick={() => setProposeModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#0F172A] hover:bg-slate-800 text-white text-sm font-bold rounded-xl shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Propose Consultancy
            </button>
          )}
        </div>

        <div className="px-6 py-2 flex flex-wrap items-center gap-6 bg-slate-50/50 border-b border-slate-200">
          {[
            { id: 'consultancies', label: 'Industry R&D Consultancies', icon: Briefcase },
            { id: 'fdp', label: 'Corporate FDP Training', icon: Award },
            { id: 'grants', label: 'Joint Research Grants', icon: TrendingUp },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as FacultyCollabTab)}
                className={`py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
                  isActive 
                    ? 'border-blue-600 text-blue-700' 
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" /> {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
        {/* 1. Industry R&D Consultancies */}
        {activeTab === 'consultancies' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {consultancies.map(item => (
              <div key={item.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 hover:shadow-md transition-shadow flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg border ${
                    item.status === 'Open' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    item.status === 'Proposed' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                    'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {item.status}
                  </span>
                  <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {item.deadline}
                  </span>
                </div>
                <h3 className="text-lg font-black text-slate-900 font-['Outfit'] mb-2">{item.title}</h3>
                <p className="text-sm font-semibold text-slate-600 flex items-center gap-1.5 flex-1 mb-4">
                  <Building2 className="w-4 h-4 text-blue-500" /> {item.company}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400">Funding / Budget</p>
                    <p className="font-black text-slate-900">{item.funding}</p>
                  </div>
                  {item.status === 'Open' ? (
                    <button className="px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold rounded-xl transition-colors cursor-pointer border border-blue-200">
                      Submit Interest
                    </button>
                  ) : (
                    <button disabled className="px-4 py-2 bg-slate-50 text-slate-400 text-xs font-bold rounded-xl border border-slate-200 cursor-not-allowed">
                      Pending
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. Corporate FDP Training */}
        {activeTab === 'fdp' && (
          <div className="space-y-4">
            {fdps.map(item => (
              <div key={item.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 hover:border-blue-300 transition-colors">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-base">{item.title}</h3>
                    <p className="text-sm font-semibold text-slate-600 mt-1 flex items-center gap-1.5">
                      <Building2 className="w-4 h-4" /> Hosted by {item.company}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {item.date}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {item.mode}</span>
                      <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {item.seats} Seats</span>
                    </div>
                  </div>
                </div>
                <div className="shrink-0 border-t md:border-t-0 border-slate-100 pt-4 md:pt-0 flex flex-col items-end">
                  {item.registered ? (
                    <button disabled className="px-6 py-2.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-sm font-bold flex items-center gap-2 cursor-not-allowed">
                      <CheckCircle2 className="w-4 h-4" /> Registered
                    </button>
                  ) : (
                    <button 
                      onClick={() => { setSelectedItem(item); setFdpModalOpen(true); }}
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-sm transition-colors cursor-pointer"
                    >
                      Register Now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. Joint Research Grants */}
        {activeTab === 'grants' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
            {grants.map(item => (
              <div key={item.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg border ${
                    item.status === 'Bid Submitted' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}>
                    {item.status}
                  </span>
                  <span className="text-xs font-bold text-slate-600 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                    {item.matching}
                  </span>
                </div>
                <h3 className="text-lg font-black text-slate-900 font-['Outfit'] mb-2">{item.title}</h3>
                <p className="text-sm font-semibold text-slate-600 flex items-center gap-1.5 mb-5">
                  <Building2 className="w-4 h-4 text-blue-500" /> Partner: {item.partner}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400">Total Grant</p>
                    <p className="font-black text-slate-900 text-lg">{item.grant}</p>
                  </div>
                  {item.status === 'Bid Submitted' ? (
                    <button disabled className="px-5 py-2 bg-purple-50 text-purple-700 text-xs font-bold rounded-xl border border-purple-200 cursor-not-allowed flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Applied
                    </button>
                  ) : (
                    <button 
                      onClick={() => { setSelectedItem(item); setBidModalOpen(true); }}
                      className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-sm flex items-center gap-1.5"
                    >
                      Bid / Apply <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODALS */}

      {/* 1. Propose Consultancy Modal */}
      {isProposeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-black text-slate-900">Propose New Consultancy</h3>
              <button onClick={() => setProposeModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5"/></button>
            </div>
            <form onSubmit={handleProposeSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Project Title *</label>
                <input required type="text" value={proposeForm.title} onChange={e => setProposeForm({...proposeForm, title: e.target.value})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" placeholder="e.g. AI Optimization of Pipelines" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Expected Budget (in Lakhs) *</label>
                <input required type="number" value={proposeForm.amount} onChange={e => setProposeForm({...proposeForm, amount: e.target.value})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" placeholder="10" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Abstract / Summary *</label>
                <textarea required value={proposeForm.summary} onChange={e => setProposeForm({...proposeForm, summary: e.target.value})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 h-24 resize-none" placeholder="Briefly describe the research scope..." />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setProposeModalOpen(false)} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl cursor-pointer shadow-sm">Submit Proposal</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. FDP Registration Modal */}
      {isFdpModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-black text-slate-900">FDP Registration</h3>
              <button onClick={() => setFdpModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5"/></button>
            </div>
            <form onSubmit={handleFdpRegister} className="p-6 space-y-5">
              <div>
                <p className="text-sm font-semibold text-slate-800">{selectedItem.title}</p>
                <p className="text-xs text-slate-500 mt-1">Hosted by {selectedItem.company}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex flex-col gap-2 text-sm text-blue-900 font-medium">
                <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-blue-600" /> {selectedItem.date}</div>
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-600" /> {selectedItem.mode}</div>
              </div>
              <p className="text-xs text-slate-500">By confirming, you agree to share your institutional email with the corporate partner for certification purposes.</p>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setFdpModalOpen(false)} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl cursor-pointer shadow-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4"/> Confirm Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Bid Modal */}
      {isBidModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-black text-slate-900">Apply for Grant</h3>
              <button onClick={() => setBidModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5"/></button>
            </div>
            <form onSubmit={handleBidSubmit} className="p-6 space-y-4">
              <div className="mb-2">
                <h4 className="font-bold text-slate-900">{selectedItem.title}</h4>
                <p className="text-xs text-slate-500">{selectedItem.partner} • {selectedItem.grant}</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Primary Investigator Details *</label>
                <input required type="text" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" placeholder="Name & Department" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Team Size (Including Scholars) *</label>
                <input required type="number" value={bidForm.teamSize} onChange={e => setBidForm({...bidForm, teamSize: e.target.value})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" placeholder="e.g. 4" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Preliminary Proposal *</label>
                <textarea required value={bidForm.abstract} onChange={e => setBidForm({...bidForm, abstract: e.target.value})} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 h-24 resize-none" placeholder="Provide a brief methodology..." />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setBidModalOpen(false)} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl cursor-pointer shadow-sm">Submit Bid</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
