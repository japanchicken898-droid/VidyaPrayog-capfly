import React, { useState } from 'react';
import {
  Briefcase, Search, X, CheckCircle2, Clock, MapPin,
  Building2, DollarSign, Calendar, Filter, FileText, Send, UploadCloud, FileUp, Sparkles
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
export interface InternshipPost {
  id: string;
  type: 'internship';
  title: string;
  company: string;
  domain: string;
  duration: string;
  stipend?: string;
  location: string;
  deadline: string;
  openings: number;
  skills: string[];
  roleOverview?: string[];
  stipendBreakup?: string;
  aboutCompany?: string[];
  activity?: string;
}

export interface JobPost {
  id: string;
  type: 'job';
  title: string;
  company: string;
  track: string;
  ctc: string;
  location: string;
  experience: string;
  deadline: string;
  openings: number;
  skills: string[];
  roleOverview?: string[];
  stipendBreakup?: string;
  aboutCompany?: string[];
  activity?: string;
}

export interface ApplicationRecord {
  applicationId: string;
  item: InternshipPost | JobPost;
  appliedOn: string;
  status: 'Under Review' | 'Shortlisted' | 'Rejected';
}

// ─────────────────────────────────────────────────────────────────────────────
// Mock Data
// ─────────────────────────────────────────────────────────────────────────────
const DEFAULT_INTERNSHIPS: InternshipPost[] = [
  {
    id: 'int-1',
    type: 'internship',
    title: 'Full-Stack Web Engineering Intern',
    company: 'TechNova Labs',
    domain: 'Full-Stack & Cloud',
    duration: '6 Months',
    stipend: '₹35,000 / month',
    location: 'Bengaluru (Hybrid)',
    deadline: '25 Oct 2026',
    openings: 10,
    skills: ['React', 'Node.js', 'PostgreSQL', 'AWS']
  },
  {
    id: 'int-2',
    type: 'internship',
    title: 'AI / ML Research Engineering Intern',
    company: 'DataSphere Inc.',
    domain: 'AI & Data Engineering',
    duration: '6 Months',
    stipend: '₹45,000 / month',
    location: 'Hyderabad (On-site)',
    deadline: '30 Oct 2026',
    openings: 6,
    skills: ['Python', 'PyTorch', 'MLOps', 'Data Pipelines']
  },
  {
    id: 'int-3',
    type: 'internship',
    title: 'Embedded Systems & IoT Intern',
    company: 'EdgeCraft Systems',
    domain: 'Embedded & IoT',
    duration: '12 Weeks',
    stipend: '₹28,000 / month',
    location: 'Chennai (On-site)',
    deadline: '10 Nov 2026',
    openings: 4,
    skills: ['C/C++', 'RTOS', 'Arduino', 'Raspberry Pi']
  },
  {
    id: 'int-4',
    type: 'internship',
    title: 'Cloud DevOps Engineering Intern',
    company: 'Cloudify Networks',
    domain: 'DevOps & Security',
    duration: '6 Months',
    stipend: '₹40,000 / month',
    location: 'Remote / Own Place',
    deadline: '20 Nov 2026',
    openings: 8,
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'Terraform']
  }
];

const DEFAULT_JOBS: JobPost[] = [
  {
    id: 'job-1',
    type: 'job',
    title: 'Software Development Engineer (SDE-I)',
    company: 'TechNova Labs',
    track: 'Full-Stack & Cloud',
    ctc: '₹12 LPA',
    location: 'Bengaluru',
    experience: 'Fresher / 0–1 Yr',
    deadline: '30 Oct 2026',
    openings: 12,
    skills: ['Data Structures', 'System Design', 'React / TypeScript', 'Node.js']
  },
  {
    id: 'job-2',
    type: 'job',
    title: 'ML Engineer — Applied AI',
    company: 'DataSphere Inc.',
    track: 'AI & Data Engineering',
    ctc: '₹16 LPA',
    location: 'Hyderabad',
    experience: 'Fresher / 0–2 Yr',
    deadline: '15 Nov 2026',
    openings: 8,
    skills: ['Python', 'ML Frameworks', 'Statistics', 'Data Engineering']
  },
  {
    id: 'job-3',
    type: 'job',
    title: 'Embedded Firmware Engineer',
    company: 'EdgeCraft Systems',
    track: 'Embedded & IoT',
    ctc: '₹10 LPA',
    location: 'Chennai',
    experience: 'Fresher',
    deadline: '10 Nov 2026',
    openings: 5,
    skills: ['C', 'RTOS', 'MCU Programming', 'CAN Bus']
  }
];

// Helper
const renderStipendBadge = (stipend?: string) => {
  const isPaid = stipend && stipend.trim() !== '' && stipend.trim() !== '0' && !stipend.toLowerCase().includes('unpaid');
  if (isPaid) {
    return (
      <span className="flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200 text-emerald-700 font-bold text-xs shrink-0">
        <DollarSign className="w-3 h-3" />
        {stipend}
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200 text-amber-700 font-bold text-xs shrink-0">
      <DollarSign className="w-3 h-3 text-amber-500" />
      Unpaid
    </span>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────
type SubTabType = 'internships' | 'jobs' | 'applications';

export const StudentOpportunitiesHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SubTabType>('internships');
  const [search, setSearch] = useState('');
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  const [selectedItem, setSelectedItem] = useState<InternshipPost | JobPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [locationFilter, setLocationFilter] = useState('All');
  const [minStipend, setMinStipend] = useState(0);
  const [aiMatch, setAiMatch] = useState('> 80%');
  const [resumeType, setResumeType] = useState<'capfly' | 'own' | null>(null);

  // Initialize applications from localStorage if available
  React.useEffect(() => {
    const loadApps = () => {
      const saved = localStorage.getItem('capfly_student_applications');
      if (saved) {
        try {
          setApplications(JSON.parse(saved));
        } catch (e) {
          // ignore
        }
      }
    };
    loadApps();
    const interval = setInterval(loadApps, 1000);
    return () => clearInterval(interval);
  }, []);

  const hasApplied = (id: string) => applications.some(app => app.item.id === id);
  const getAppStatus = (id: string) => applications.find(app => app.item.id === id)?.status || 'Applied';

  const handleApply = (item: InternshipPost | JobPost) => {
    // Check if already applied
    if (applications.some(app => app.item.id === item.id)) {
      setNotification(`You have already applied for this ${item.type}.`);
      setTimeout(() => setNotification(null), 3000);
      setIsModalOpen(false);
      return;
    }

    const newApp: ApplicationRecord = {
      applicationId: `APP-${Math.floor(1000 + Math.random() * 9000)}`,
      item,
      appliedOn: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Under Review'
    };

    const updatedApps = [newApp, ...applications];
    setApplications(updatedApps);
    localStorage.setItem('capfly_student_applications', JSON.stringify(updatedApps));

    setNotification(`Successfully submitted your application for ${item.title}!`);
    setTimeout(() => setNotification(null), 5000);
    setIsModalOpen(false);
    setIsApplying(false);
    setResumeUploaded(false);
  };

  const startApplication = () => {
    // Check if already applied
    if (selectedItem && applications.some(app => app.item.id === selectedItem.id)) {
      setNotification(`You have already applied for this ${selectedItem.type}.`);
      setTimeout(() => setNotification(null), 3000);
      return;
    }
    setIsApplying(true);
  };

  const handleUploadResume = (type: 'capfly' | 'own') => {
    setResumeType(type);
    if (type === 'own') {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = '.pdf,.doc,.docx';
      fileInput.onchange = (e) => {
        if ((e.target as HTMLInputElement).files?.length) {
          setIsUploading(true);
          setTimeout(() => {
            setIsUploading(false);
            setResumeUploaded(true);
          }, 1500);
        }
      };
      fileInput.click();
    } else {
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
        setResumeUploaded(true);
      }, 1500); // Simulate upload delay
    }
  };

  const openDetails = (item: InternshipPost | JobPost) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    setIsApplying(false);
    setResumeUploaded(false);
  };

  const filteredInternships = DEFAULT_INTERNSHIPS.filter(i =>
    i.title.toLowerCase().includes(search.toLowerCase()) ||
    i.company.toLowerCase().includes(search.toLowerCase()) ||
    i.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredJobs = DEFAULT_JOBS.filter(j =>
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.company.toLowerCase().includes(search.toLowerCase()) ||
    j.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-2">
      {/* 1. Header & Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-4 py-2 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-black text-slate-900 font-['Outfit']">Opportunities Hub</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Discover and apply for internships and full-time roles posted by industry partners.
            </p>
          </div>
        </div>

        <div className="px-4 py-1 flex items-center gap-4 overflow-x-auto border-b border-slate-200">
          <button
            onClick={() => setActiveTab('internships')}
            className={`py-2 text-sm font-bold border-b-2 transition-colors shrink-0 ${
              activeTab === 'internships' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Internships
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`py-2 text-sm font-bold border-b-2 transition-colors shrink-0 ${
              activeTab === 'jobs' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Full-Time Jobs
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`py-2 text-sm font-bold border-b-2 transition-colors shrink-0 ${
              activeTab === 'applications' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            My Applications & Status
            {applications.length > 0 && (
              <span className="ml-2 bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                {applications.length}
              </span>
            )}
          </button>
        </div>

        {/* 2. Filters & Search (Only for Jobs/Internships) */}
        {activeTab !== 'applications' && (
          <div className="bg-slate-50 p-2 flex flex-col sm:flex-row items-center gap-2">
            <div className="flex items-center gap-2 flex-1">
              <button onClick={() => setLocationFilter(prev => prev === 'All' ? 'Remote / Own Place' : prev === 'Remote / Own Place' ? 'On-site' : 'All')} className="px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-[11px] font-semibold text-slate-600 flex items-center gap-1.5 shrink-0 cursor-pointer hover:bg-slate-50 transition-colors">
                <MapPin className="w-3.5 h-3.5" /> Location: {locationFilter}
              </button>
              {activeTab === 'internships' && (
                <button onClick={() => setMinStipend(prev => prev === 0 ? 10000 : prev === 10000 ? 20000 : prev === 20000 ? 30000 : 0)} className="px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-[11px] font-semibold text-slate-600 flex items-center gap-1.5 shrink-0 cursor-pointer hover:bg-slate-50 transition-colors">
                  <DollarSign className="w-3.5 h-3.5" /> Min Stipend: ₹{minStipend}/mo
                </button>
              )}
              <button onClick={() => setAiMatch(prev => prev === '> 80%' ? '> 90%' : prev === '> 90%' ? 'All' : '> 80%')} className="px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-[11px] font-semibold text-slate-600 flex items-center gap-1.5 shrink-0 cursor-pointer hover:bg-slate-50 transition-colors">
                <Filter className="w-3.5 h-3.5 text-blue-600" /> AI Match: {aiMatch}
              </button>
            </div>
            
            <div className="relative w-full sm:w-56 shrink-0">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter list..."
                className="w-full pl-8 pr-2 py-1.5 bg-white border border-slate-200 rounded-lg text-[11px] sm:text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
          </div>
        )}
      </div>

      {notification && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 flex items-center justify-between text-emerald-900 text-sm font-semibold shadow-xs animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 3. Content Views */}
      <div className="space-y-2">
        {/* Internships List */}
        {activeTab === 'internships' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {filteredInternships.map(item => (
              <div key={item.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-3 sm:p-4 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1.5">{item.domain}</div>
                  <h3 className="font-black text-slate-900 text-base font-['Outfit'] leading-snug">{item.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5 font-medium">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" /> {item.company}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600 my-2">
                  <span className="flex items-center gap-1 bg-slate-50 px-1.5 py-1 rounded-md border border-slate-200 shrink-0">
                    <Clock className="w-3 h-3 text-slate-400" /> {item.duration}
                  </span>
                  {renderStipendBadge(item.stipend)}
                  <span className="flex items-center gap-1 bg-slate-50 px-1.5 py-1 rounded-md border border-slate-200 shrink-0">
                    <MapPin className="w-3 h-3 text-slate-400" /> {item.location}
                  </span>
                </div>
                
                <div className="flex items-center justify-between pt-2.5 border-t border-slate-100">
                  <span className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> Deadline: {item.deadline}
                  </span>
                  <button 
                    onClick={() => openDetails(item)}
                    className={`px-3 py-1.5 text-white text-[11px] font-bold rounded-lg shadow-sm transition-colors cursor-pointer ${
                      hasApplied(item.id) 
                        ? 'bg-emerald-500 hover:bg-emerald-600' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {hasApplied(item.id) ? 'View Status' : 'View Details'}
                  </button>
                </div>
              </div>
            ))}
            {filteredInternships.length === 0 && <p className="text-sm text-slate-500 col-span-2 text-center py-8">No internships found.</p>}
          </div>
        )}

        {/* Full-Time Jobs List */}
        {activeTab === 'jobs' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {filteredJobs.map(item => (
              <div key={item.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-3 sm:p-4 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1.5">{item.track}</div>
                  <h3 className="font-black text-slate-900 text-base font-['Outfit'] leading-snug">{item.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5 font-medium">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" /> {item.company}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600 my-2">
                  <span className="flex items-center gap-1 bg-slate-50 px-1.5 py-1 rounded-md border border-slate-200 shrink-0">
                    <Briefcase className="w-3 h-3 text-slate-400" /> {item.experience}
                  </span>
                  <span className="flex items-center gap-1 bg-emerald-50 px-1.5 py-1 rounded-md border border-emerald-200 text-emerald-700 font-bold shrink-0">
                    <DollarSign className="w-3 h-3 text-emerald-600" /> {item.ctc}
                  </span>
                  <span className="flex items-center gap-1 bg-slate-50 px-1.5 py-1 rounded-md border border-slate-200 shrink-0">
                    <MapPin className="w-3 h-3 text-slate-400" /> {item.location}
                  </span>
                </div>
                
                <div className="flex items-center justify-between pt-2.5 border-t border-slate-100">
                  <span className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> Deadline: {item.deadline}
                  </span>
                  <button 
                    onClick={() => openDetails(item)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
            {filteredJobs.length === 0 && <p className="text-sm text-slate-500 col-span-2 text-center py-8">No jobs found.</p>}
          </div>
        )}

        {/* My Applications */}
        {activeTab === 'applications' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-1">
            {applications.length === 0 ? (
              <div className="text-center py-16 text-slate-400 text-sm flex flex-col items-center">
                <FileText className="w-10 h-10 mb-3 text-slate-300" />
                <p className="font-semibold text-slate-500">No applications yet.</p>
                <p className="mt-1">Explore the internships and jobs tab to find roles.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {applications.map(app => (
                  <div key={app.applicationId} className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 transition-colors rounded-xl">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                        app.item.type === 'internship' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'
                      }`}>
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded border ${
                            app.item.type === 'internship' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}>
                            {app.item.type === 'internship' ? 'Internship Application' : 'Job Application'}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">#{app.applicationId}</span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm">{app.item.title}</h4>
                        <p className="text-xs text-slate-500 font-medium">{app.item.company}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between md:justify-end gap-6 md:w-1/3 border-t border-slate-100 pt-3 md:border-t-0 md:pt-0">
                      <div className="text-xs text-slate-500">
                        Applied: <span className="font-semibold text-slate-700">{app.appliedOn}</span>
                      </div>
                      <div className="px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-700 rounded-lg text-xs font-bold flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> {app.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4" onClick={() => setIsModalOpen(false)}>
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className={`px-6 py-5 flex items-start justify-between ${selectedItem.type === 'internship' ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'}`}>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded text-white mb-2 inline-block">
                  {selectedItem.type === 'internship' ? selectedItem.domain : (selectedItem as JobPost).track}
                </span>
                <h2 className="text-xl sm:text-2xl font-black font-['Outfit'] leading-tight mb-1">{selectedItem.title}</h2>
                <p className="text-sm font-medium flex items-center gap-2">
                  <Building2 className="w-4 h-4" /> {selectedItem.company}
                </p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/30 text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {isApplying ? (
              <div className="p-8 flex flex-col items-center justify-center min-h-[300px]">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                  <FileUp className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Provide your Resume</h3>
                <p className="text-sm text-slate-500 mb-6 text-center max-w-sm">
                  Choose which resume to submit with your application for <strong>{selectedItem.title}</strong>.
                </p>

                {!resumeUploaded ? (
                  <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <button
                      onClick={() => handleUploadResume('capfly')}
                      disabled={isUploading}
                      className="flex-1 py-4 px-6 border-2 border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center gap-2 cursor-pointer text-slate-600 hover:text-blue-700"
                    >
                      <FileText className="w-6 h-6" />
                      <span className="text-sm font-semibold text-center">
                        {isUploading && resumeType === 'capfly' ? 'Uploading...' : 'Use Capfly Resume'}
                      </span>
                    </button>
                    <button
                      onClick={() => handleUploadResume('own')}
                      disabled={isUploading}
                      className="flex-1 py-4 px-6 border-2 border-dashed border-slate-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center gap-2 cursor-pointer text-slate-600 hover:text-blue-700"
                    >
                      <UploadCloud className={`w-6 h-6 ${isUploading && resumeType === 'own' ? 'animate-bounce text-blue-500' : ''}`} />
                      <span className="text-sm font-semibold text-center">
                        {isUploading && resumeType === 'own' ? 'Uploading...' : 'Upload My Own Resume'}
                      </span>
                    </button>
                  </div>
                ) : (
                  <div className="w-full max-w-xs py-3 border border-emerald-200 bg-emerald-50 rounded-xl flex items-center justify-center gap-2 text-emerald-700 font-semibold mb-4">
                    <CheckCircle2 className="w-5 h-5" /> Resume Uploaded Successfully
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-800">
                <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold">Actively hiring</span>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-slate-600 mb-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span className="font-semibold text-emerald-700">{selectedItem.type === 'internship' ? (selectedItem.stipend || 'Unpaid') : (selectedItem as JobPost).ctc}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="font-semibold text-slate-900">{selectedItem.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="font-semibold text-slate-900">{selectedItem.type === 'internship' ? selectedItem.duration : (selectedItem as JobPost).experience}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900">{selectedItem.openings} vacancies</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <span className="text-xs text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> 7 days ago
                  </span>
                  <span className="text-xs text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md font-medium flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Deadline: {selectedItem.deadline}
                  </span>
                </div>
                
                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                    About the role 
                    <span className="text-[10px] font-bold px-2 py-1 bg-purple-50 text-purple-700 rounded-md flex items-center gap-1">
                      Summarized by AI <Sparkles className="w-3 h-3" />
                    </span>
                  </h3>
                  
                  <div className="space-y-5">
                    <div>
                      <p className="font-bold mb-2">Role Overview:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        {selectedItem.roleOverview ? selectedItem.roleOverview.map((item, idx) => <li key={idx}>{item}</li>) : (
                          <>
                            <li>Assist with core engineering tasks and collaborate with cross-functional teams.</li>
                            <li>Develop and maintain clean, efficient, and scalable code.</li>
                            <li>Participate in code reviews and continuous improvement initiatives.</li>
                          </>
                        )}
                      </ul>
                    </div>

                    <div>
                      <p className="font-bold mb-2">Requirements:</p>
                      <ul className="list-disc pl-5">
                        <li><strong>Skills:</strong> {selectedItem.skills.join(', ')}</li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-bold mb-2">{selectedItem.type === 'internship' ? 'Stipend:' : 'Compensation:'}</p>
                      {selectedItem.stipendBreakup ? (
                        <div className="whitespace-pre-line">{selectedItem.stipendBreakup}</div>
                      ) : (
                        <>
                          <p>{selectedItem.type === 'internship' ? 'Stipend breakup:' : 'CTC Breakdown:'}</p>
                          <p>{selectedItem.type === 'internship' ? 'Stipend: ' : 'CTC: '} <span className="font-semibold">{selectedItem.type === 'internship' ? (selectedItem.stipend || 'Unpaid') : (selectedItem as JobPost).ctc}</span></p>
                          <p>Variable Pay: Based on performance</p>
                        </>
                      )}
                    </div>

                    <div>
                      <p className="font-bold mb-2">About {selectedItem.company}:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        {selectedItem.aboutCompany ? selectedItem.aboutCompany.map((item, idx) => <li key={idx}>{item}</li>) : (
                          <>
                            <li>{selectedItem.company} is a leading organization pushing the boundaries of technology.</li>
                            <li><strong>Perks:</strong> Certificate, Letter of recommendation, Flexible work hours.</li>
                          </>
                        )}
                        <li><strong>Activity on Platform:</strong> {selectedItem.activity || 'Hiring since: April 2023; Opportunities posted: 15; Candidates hired: 5.'}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              {isApplying ? (
                <>
                  <button onClick={() => setIsApplying(false)} className="text-sm font-bold text-slate-500 hover:text-slate-800">
                    Back to Details
                  </button>
                  <button 
                    onClick={() => handleApply(selectedItem)}
                    disabled={!resumeUploaded}
                    className={`px-6 py-2.5 text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2 ${
                      !resumeUploaded 
                        ? 'bg-slate-300 cursor-not-allowed' 
                        : selectedItem.type === 'internship' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-emerald-600 hover:bg-emerald-700'
                    }`}
                  >
                    <Send className="w-4 h-4" /> Submit Application
                  </button>
                </>
              ) : hasApplied(selectedItem.id) ? (
                <>
                  <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> You meet 85% of requirements
                  </span>
                  <button 
                    disabled
                    className="px-6 py-2.5 bg-emerald-100 text-emerald-700 text-sm font-bold rounded-xl shadow-md flex items-center gap-2 cursor-not-allowed"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Applied ({getAppStatus(selectedItem.id)})
                  </button>
                </>
              ) : (
                <>
                  <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> You meet 85% of requirements
                  </span>
                  <button 
                    onClick={startApplication}
                    className={`px-6 py-2.5 text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2 ${
                      selectedItem.type === 'internship' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-emerald-600 hover:bg-emerald-700'
                    }`}
                  >
                    <Send className="w-4 h-4" /> Apply Now
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
