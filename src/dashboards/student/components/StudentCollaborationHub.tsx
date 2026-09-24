import React, { useState } from 'react';
import { 
  Trophy, Video, Users, Briefcase, Calendar, Clock, MapPin, 
  ExternalLink, ChevronRight, CheckCircle2, Star, Building2, X, Info, Sparkles, Check
} from 'lucide-react';

type StudentCollabTab = 'hackathons' | 'lectures' | 'capstones' | 'mentorship';

export const StudentCollaborationHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<StudentCollabTab>('hackathons');
  const [rsvpStatus, setRsvpStatus] = useState<Record<string, boolean>>({});

  // Modals & Dynamic State
  const [isApplyModalOpen, setApplyModalOpen] = useState(false);
  const [isBookModalOpen, setBookModalOpen] = useState(false);
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const [isAllMentorsModalOpen, setAllMentorsModalOpen] = useState(false);
  
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>('Tomorrow, 10:00 AM');
  const [credits, setCredits] = useState(3);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const [hackathons, setHackathons] = useState([
    { id: 'h1', title: 'Global AI Hackathon 2026', org: 'TechNova Research', type: 'Hackathon', prize: '$10,000', deadline: 'Ends in 5 days', applied: false },
    { id: 'h2', title: 'Zero-Trust Architecture Challenge', org: 'Cloudify Networks', type: 'Innovation Challenge', prize: 'Paid Internship', deadline: 'Ends in 2 weeks', applied: false },
    { id: 'h3', title: 'Sustainable Supply Chain Optimizer', org: 'GreenTech Corp', type: 'Corporate Hack', prize: '$5,000', deadline: 'Starts tomorrow', applied: false }
  ]);

  const [capstones, setCapstones] = useState([
    { 
      id: 'c1', 
      title: 'Edge Computing for Remote Healthcare', 
      partner: 'MedTech Corp', 
      difficulty: 'Advanced', 
      tags: ['IoT', 'C++', 'AWS'], 
      applied: false,
      description: 'Build a low-latency edge AI system for processing bio-sensor data from wearables and alerting care units in real time.',
      deliverables: ['Edge gateway module', 'Web dashboard for doctors', 'AWS IoT Core integration']
    },
    { 
      id: 'c2', 
      title: 'Automated Financial Fraud Detection', 
      partner: 'FinServe Global', 
      difficulty: 'Intermediate', 
      tags: ['Python', 'ML', 'Data Eng'], 
      applied: false,
      description: 'Develop graph neural networks and anomaly detection models to flag fraudulent card transactions with <50ms latency.',
      deliverables: ['Trained XGBoost & GNN model', 'Real-time inference API endpoint', 'Model performance report']
    },
    { 
      id: 'c3', 
      title: 'AR Navigation for Warehouse Logistics', 
      partner: 'LogistiCorp', 
      difficulty: 'Advanced', 
      tags: ['React Native', 'ARKit', 'Node.js'], 
      applied: false,
      description: 'Design an augmented reality navigation assistant for warehouse staff to optimize inventory picking paths.',
      deliverables: ['Mobile AR prototype app', 'Indoor spatial mapping backend', 'UX evaluation study']
    },
    { 
      id: 'c4', 
      title: 'Blockchain-based Credential Verification', 
      partner: 'EduTrust', 
      difficulty: 'Intermediate', 
      tags: ['Solidity', 'Web3', 'React'], 
      applied: false,
      description: 'Create a tamper-proof university degree verification ledger on Ethereum testnet with QR-based instant lookup.',
      deliverables: ['Smart contract repository', 'Verification portal frontend', 'Gas optimization report']
    }
  ]);

  const [mentors] = useState([
    { name: 'Priya Sharma', role: 'Senior Data Scientist', company: 'Google', rating: '4.9', slots: ['Tomorrow, 10:00 AM', 'Tomorrow, 02:00 PM', 'Friday, 11:30 AM'], category: 'AI & Data Science' },
    { name: 'Michael Chen', role: 'Staff Backend Engineer', company: 'Stripe', rating: '5.0', slots: ['Tomorrow, 04:00 PM', 'Friday, 02:00 PM'], category: 'Backend Systems' },
    { name: 'Anita Patel', role: 'Lead Product Designer', company: 'Airbnb', rating: '4.8', slots: ['Thursday, 11:00 AM', 'Friday, 05:00 PM', 'Next Mon, 10:00 AM'], category: 'UI/UX Design' },
    { name: 'David Miller', role: 'Principal Security Architect', company: 'Cloudflare', rating: '4.95', slots: ['Friday, 01:00 PM', 'Next Tue, 03:00 PM'], category: 'Cybersecurity' }
  ]);

  const handleRSVP = (item: any) => {
    setRsvpStatus(prev => ({ ...prev, [item.id]: true }));
    triggerToast(`🎉 RSVP Confirmed for "${item.title}"! Calendar invite sent.`);
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItem.type) {
      setHackathons(hackathons.map(h => h.id === selectedItem.id ? { ...h, applied: true } : h));
      triggerToast(`🚀 Application submitted for ${selectedItem.title}!`);
    } else {
      setCapstones(capstones.map(c => c.id === selectedItem.id ? { ...c, applied: true } : c));
      triggerToast(`📋 Proposal submitted for Capstone: ${selectedItem.title}!`);
    }
    setApplyModalOpen(false);
    setSelectedItem(null);
  };

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (credits > 0) {
      setCredits(c => c - 1);
      triggerToast(`📅 Mentorship session booked with ${selectedItem.name} for ${selectedSlot}!`);
    }
    setBookModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-[999] bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* ── Header & Tabs ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100">
          <h2 className="text-2xl font-black text-slate-900 font-['Outfit']">Industry Collaboration Hub</h2>
          <p className="text-sm text-slate-500 mt-1">
            Connect directly with leading tech companies through hackathons, expert talks, and mentorship.
          </p>
        </div>

        <div className="px-6 py-2 flex flex-wrap items-center gap-6 bg-slate-50/50">
          {[
            { id: 'hackathons', label: 'Hackathons & Challenges', icon: Trophy },
            { id: 'lectures', label: 'Guest Lectures', icon: Video },
            { id: 'capstones', label: 'Industry Capstones', icon: Briefcase },
            { id: 'mentorship', label: '1-on-1 Mentorship', icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as StudentCollabTab)}
                className={`py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
                  isActive 
                    ? 'border-violet-600 text-violet-700' 
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" /> {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Tab Content ── */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
        
        {/* 1. Hackathons & Challenges */}
        {activeTab === 'hackathons' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {hackathons.map(item => (
              <div key={item.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 hover:shadow-md transition-all group flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-violet-700 bg-violet-50 rounded-lg border border-violet-200 flex items-center gap-1.5">
                      <Trophy className="w-3 h-3" /> {item.type}
                    </span>
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {item.deadline}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 font-['Outfit'] group-hover:text-violet-700 transition-colors">{item.title}</h3>
                  <div className="flex items-center gap-2 mt-2 text-sm text-slate-600 font-medium">
                    <Building2 className="w-4 h-4" /> {item.org}
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="text-sm">
                    <span className="text-slate-500 font-medium">Prize Pool:</span>{' '}
                    <span className="font-black text-slate-900">{item.prize}</span>
                  </div>
                  {item.applied ? (
                    <button disabled className="px-5 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-not-allowed">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Applied
                    </button>
                  ) : (
                    <button 
                      onClick={() => { setSelectedItem(item); setApplyModalOpen(true); }}
                      className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors cursor-pointer flex items-center gap-2"
                    >
                      Apply Now <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. Guest Lectures & Masterclasses */}
        {activeTab === 'lectures' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Upcoming Industry Masterclasses</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                { id: 'l1', title: 'Masterclass: Scalable Cloud Architecture', speaker: 'Dr. Alan Smith, Principal Engineer', company: 'Amazon Web Services', date: 'Oct 24, 2026', time: '10:00 AM' },
                { id: 'l2', title: 'The Future of Generative AI in Production', speaker: 'Sarah Jones, Lead AI Researcher', company: 'OpenAI', date: 'Oct 28, 2026', time: '02:00 PM' },
                { id: 'l3', title: 'Building High-Performance React Applications', speaker: 'Dan Abramov (Ex-Meta)', company: 'Independent Consultant', date: 'Nov 02, 2026', time: '11:00 AM' }
              ].map(item => (
                <div key={item.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                      <Video className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-base">{item.title}</h4>
                      <p className="text-sm font-semibold text-slate-600 mt-1">
                        {item.speaker} <span className="text-slate-400 font-normal">@ {item.company}</span>
                      </p>
                      <div className="flex items-center gap-4 mt-2.5 text-xs text-slate-500 font-medium">
                        <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {item.date}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {item.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0 border-t md:border-t-0 border-slate-100 pt-4 md:pt-0">
                    {rsvpStatus[item.id] ? (
                      <button disabled className="px-6 py-2.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-sm font-bold flex items-center gap-2 cursor-not-allowed">
                        <CheckCircle2 className="w-4 h-4" /> RSVP Confirmed
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleRSVP(item)}
                        className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-bold shadow-sm transition-colors cursor-pointer flex items-center gap-2"
                      >
                        Reserve Seat
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Industry Capstones */}
        {activeTab === 'capstones' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {capstones.map(item => (
              <div key={item.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 flex flex-col hover:border-violet-300 hover:shadow-md transition-all group">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-slate-600 bg-slate-100 rounded-lg border border-slate-200">
                      Live Capstone
                    </span>
                    <span className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-lg border ${
                      item.difficulty === 'Advanced' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {item.difficulty}
                    </span>
                  </div>
                  <h3 className="font-black text-slate-900 text-base leading-tight mb-2 group-hover:text-violet-700 transition-colors">{item.title}</h3>
                  <p className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 mb-4">
                    <Building2 className="w-3.5 h-3.5" /> Partner: {item.partner}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-blue-50/50 text-blue-700 border border-blue-100 rounded-md text-[10px] font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-100 flex gap-3">
                  <button 
                    onClick={() => { setSelectedItem(item); setDetailsModalOpen(true); }}
                    className="flex-1 py-2 text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 border border-slate-200"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Details
                  </button>
                  {item.applied ? (
                    <button disabled className="flex-1 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl cursor-not-allowed flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5"/> Applied
                    </button>
                  ) : (
                    <button 
                      onClick={() => { setSelectedItem(item); setApplyModalOpen(true); }}
                      className="flex-1 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors cursor-pointer shadow-sm"
                    >
                      Submit Proposal
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4. Mentorship Booking */}
        {activeTab === 'mentorship' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 border border-purple-100">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900 font-['Outfit'] leading-tight mb-2">Book a 1-on-1 Mentorship Session</h3>
              <p className="text-sm text-slate-500 mb-6">
                Connect with industry experts for career guidance, resume reviews, technical mock interviews, and project feedback.
              </p>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-xs font-bold text-slate-700 uppercase mb-2">Your Available Credits</div>
                <div className="text-3xl font-black text-slate-900">{credits} <span className="text-sm font-semibold text-slate-500">Sessions</span></div>
                <p className="text-[10px] text-slate-500 mt-1">Refreshes next month</p>
              </div>
            </div>

            <div className="md:w-2/3 border-l border-slate-100 pl-0 md:pl-8">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-slate-900">Top Mentors Available This Week</h4>
                <button 
                  onClick={() => setAllMentorsModalOpen(true)}
                  className="text-xs font-bold text-violet-600 hover:text-violet-800 cursor-pointer"
                >
                  View All Experts &rarr;
                </button>
              </div>
              
              <div className="space-y-4">
                {mentors.slice(0, 3).map((mentor, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 hover:border-violet-300 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden shrink-0">
                        <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${mentor.name}&backgroundColor=e2e8f0`} alt={mentor.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h5 className="font-bold text-slate-900 text-sm group-hover:text-violet-700 transition-colors">{mentor.name}</h5>
                        <p className="text-xs font-medium text-slate-500">{mentor.role} @ {mentor.company}</p>
                        <div className="flex items-center gap-2 mt-1.5 text-[10px] font-bold text-slate-500">
                          <span className="flex items-center gap-1 text-amber-500"><Star className="w-3 h-3 fill-current" /> {mentor.rating}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                          <span className="text-emerald-600">{mentor.slots.length} slots available</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => { setSelectedItem(mentor); setSelectedSlot(mentor.slots[0]); setBookModalOpen(true); }}
                      className="w-full sm:w-auto px-5 py-2.5 bg-white border-2 border-slate-200 hover:border-violet-500 text-slate-700 hover:text-violet-700 text-xs font-bold rounded-xl transition-colors cursor-pointer text-center"
                    >
                      Book Session
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL 1: APPLICATION FORM */}
      {isApplyModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-black text-slate-900">Application Form</h3>
              <button onClick={() => setApplyModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer"><X className="w-5 h-5"/></button>
            </div>
            <form onSubmit={handleApply} className="p-6 space-y-4">
              <div className="mb-2 p-3 bg-violet-50 rounded-xl border border-violet-100">
                <h4 className="font-bold text-slate-900 text-sm">{selectedItem.title}</h4>
                <p className="text-xs text-slate-600 font-medium mt-0.5">{selectedItem.org || selectedItem.partner}</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Team Name *</label>
                <input required type="text" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-violet-500" placeholder="Enter your team or applicant name" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Proposal / Portfolio Link</label>
                <input type="url" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-violet-500" placeholder="https://github.com/..." />
              </div>
              <div className="flex justify-end gap-3 pt-4 mt-2">
                <button type="button" onClick={() => setApplyModalOpen(false)} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2.5 text-sm font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-xl cursor-pointer shadow-sm">Submit Application</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: BOOK MENTORSHIP SESSION */}
      {isBookModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-black text-slate-900">Book Mentorship Session</h3>
              <button onClick={() => setBookModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer"><X className="w-5 h-5"/></button>
            </div>
            <form onSubmit={handleBook} className="p-6 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden shrink-0">
                  <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${selectedItem.name}&backgroundColor=e2e8f0`} alt={selectedItem.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{selectedItem.name}</h4>
                  <p className="text-xs text-slate-500">{selectedItem.role} @ {selectedItem.company}</p>
                </div>
              </div>

              {credits === 0 ? (
                <div className="p-4 bg-rose-50 text-rose-700 rounded-xl text-sm font-medium border border-rose-200">
                  You have 0 sessions remaining this month. Please wait until your credits refresh or upgrade your plan.
                </div>
              ) : (
                <>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 mb-4">
                    <p className="text-xs font-bold text-slate-700 uppercase mb-2">Select a Time Slot</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(selectedItem.slots || ['Tomorrow, 10:00 AM', 'Tomorrow, 02:00 PM']).map((slot: string) => (
                        <div 
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`p-2.5 border rounded-xl text-xs font-bold text-center cursor-pointer transition-all ${
                            selectedSlot === slot 
                              ? 'border-violet-600 bg-violet-50 text-violet-700 shadow-xs' 
                              : 'border-slate-200 hover:border-violet-300 text-slate-600 bg-white'
                          }`}
                        >
                          {slot}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">What do you want to discuss?</label>
                    <textarea required className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-violet-500 h-20 resize-none" placeholder="e.g. Need feedback on my capstone architecture or resume evaluation..." />
                  </div>
                </>
              )}

              <div className="flex justify-end gap-3 pt-4 mt-2">
                <button type="button" onClick={() => setBookModalOpen(false)} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer">Cancel</button>
                <button 
                  type="submit" 
                  disabled={credits === 0}
                  className={`px-5 py-2.5 text-sm font-bold text-white rounded-xl shadow-sm ${credits === 0 ? 'bg-slate-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'}`}
                >
                  Confirm Booking (Uses 1 Credit)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: CAPSTONE DETAILS MODAL */}
      {isDetailsModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-violet-700 bg-violet-50 rounded-lg border border-violet-200">
                  Capstone Project Details
                </span>
              </div>
              <button onClick={() => setDetailsModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer"><X className="w-5 h-5"/></button>
            </div>
            
            <div className="p-6 space-y-5">
              <div>
                <h3 className="text-xl font-black text-slate-900 font-['Outfit'] mb-1">{selectedItem.title}</h3>
                <p className="text-sm font-bold text-violet-700 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" /> Partner Institution: {selectedItem.partner}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-700 leading-relaxed">
                <span className="font-bold text-slate-900 block mb-1">Project Description:</span>
                {selectedItem.description}
              </div>

              {selectedItem.deliverables && (
                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Key Industry Deliverables</h4>
                  <ul className="space-y-2">
                    {selectedItem.deliverables.map((del: string, i: number) => (
                      <li key={i} className="text-sm text-slate-600 flex items-center gap-2 font-medium">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" /> {del}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Required Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.tags.map((tag: string) => (
                    <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-bold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setDetailsModalOpen(false)} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer">
                  Close
                </button>
                {selectedItem.applied ? (
                  <button disabled className="px-6 py-2.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm font-bold rounded-xl flex items-center gap-2 cursor-not-allowed">
                    <CheckCircle2 className="w-4 h-4"/> Proposal Submitted
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      setDetailsModalOpen(false);
                      setApplyModalOpen(true);
                    }}
                    className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm cursor-pointer"
                  >
                    Submit Proposal
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: ALL MENTORS CATALOG */}
      {isAllMentorsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50 shrink-0">
              <div>
                <h3 className="font-black text-slate-900 text-lg">Industry Expert Mentors</h3>
                <p className="text-xs text-slate-500">Book 1-on-1 sessions with top tech leaders</p>
              </div>
              <button onClick={() => setAllMentorsModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer"><X className="w-5 h-5"/></button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              {mentors.map((mentor, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 hover:border-violet-300 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden shrink-0">
                      <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${mentor.name}&backgroundColor=e2e8f0`} alt={mentor.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900 text-base group-hover:text-violet-700 transition-colors">{mentor.name}</h5>
                      <p className="text-xs font-medium text-slate-600">{mentor.role} @ <span className="font-bold text-slate-800">{mentor.company}</span></p>
                      <div className="flex items-center gap-2 mt-1.5 text-xs font-bold text-slate-500">
                        <span className="flex items-center gap-1 text-amber-500"><Star className="w-3.5 h-3.5 fill-current" /> {mentor.rating}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span className="text-violet-600 font-semibold">{mentor.category}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setAllMentorsModalOpen(false);
                      setSelectedItem(mentor);
                      setSelectedSlot(mentor.slots[0]);
                      setBookModalOpen(true);
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer text-center shadow-xs"
                  >
                    Book Session
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
