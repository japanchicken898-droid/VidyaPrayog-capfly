import React, { useState } from 'react';
import {
  Briefcase, Search, X, CheckCircle2, Clock, MapPin,
  Building2, DollarSign, FileText, Shield, Calendar,
  Plus, Send, Sparkles, Tag, ChevronDown
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface InternshipPost {
  id: string;
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

interface JobPost {
  id: string;
  title: string;
  company: string;
  track: string;
  ctc: string;
  location: string;
  experience: string;
  deadline: string;
  openings: number;
  skills: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Default Data
// ─────────────────────────────────────────────────────────────────────────────

const DEFAULT_INTERNSHIPS: InternshipPost[] = [
  {
    id: 'int-0',
    title: 'Business Development (Sales) (Female)',
    company: 'Online Eduversity',
    domain: 'Business Development',
    duration: '6 Months',
    stipend: '₹ 15,000 - 25,000 /month',
    location: 'Mumbai',
    deadline: '30 Oct 2026',
    openings: 5,
    skills: ['Client Interaction', 'MS-Excel', 'Sales Management', 'Business Dev'],
    roleOverview: [
      'Assist with sales strategy, market research, and client relationship management for business development.',
      'Create social media content, support email marketing, and contribute to digital marketing initiatives.',
      'Analyze sales data using MS-Excel to identify trends and support revenue growth.'
    ],
    stipendBreakup: 'Stipend breakup:\nStipend: ₹ 10,000 - 15,000 /month\nVariable Pay: ₹ 5,000 - 10,000 /month',
    aboutCompany: [
      'Online Eduversity offers flexible and affordable online higher education programs, including online MBAs, accessible globally.',
      'Perks: Certificate, Letter of recommendation, Flexible work hours, Informal dress code, Free snacks & beverages.',
    ],
    activity: 'Hiring since: April 2023; Opportunities posted: 27; Candidates hired: 9.'
  },
  {
    id: 'int-1',
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
    title: 'Embedded Systems & IoT Intern',
    company: 'EdgeCraft Systems',
    domain: 'Embedded & IoT',
    duration: '12 Weeks',
    stipend: '₹28,000 / month',
    location: 'Chennai (On-site)',
    deadline: '10 Nov 2026',
    openings: 4,
    skills: ['C/C++', 'RTOS', 'Arduino', 'Raspberry Pi']
  }
];

const DEFAULT_JOBS: JobPost[] = [
  {
    id: 'job-1',
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

const DOMAIN_OPTIONS = [
  'Full-Stack & Cloud',
  'AI & Data Engineering',
  'Embedded Systems & IoT',
  'Cybersecurity & DevOps',
];

const EXPERIENCE_OPTIONS = [
  'Fresher / 0–1 Yr',
  '1–2 Yrs',
  '2+ Yrs',
];

// ─────────────────────────────────────────────────────────────────────────────
// Helper: Stipend Badge (Strictly Optional)
// ─────────────────────────────────────────────────────────────────────────────

const renderStipendBadge = (stipend?: string) => {
  const isPaid =
    stipend &&
    stipend.trim() !== '' &&
    stipend.trim() !== '0' &&
    !stipend.toLowerCase().includes('unpaid');

  if (isPaid) {
    return (
      <span className="flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200 text-emerald-700 font-bold text-xs">
        <DollarSign className="w-3 h-3" />
        {stipend}
      </span>
    );
  }

  return (
    <span className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200 text-amber-700 font-bold text-xs">
      <DollarSign className="w-3 h-3 text-amber-500" />
      Unpaid / Performance Stipend
    </span>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Add Internship Modal Component
// ─────────────────────────────────────────────────────────────────────────────

interface AddInternshipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (internship: InternshipPost) => void;
}

const AddInternshipModal: React.FC<AddInternshipModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle]       = useState('');
  const [skills, setSkills]     = useState('');
  const [workMode, setWorkMode] = useState('Hybrid');
  const [duration, setDuration] = useState('12 Weeks');
  const [stipend, setStipend]   = useState('');
  const [openings, setOpenings] = useState('5');
  const [error, setError]       = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a Role Title');
      return;
    }
    if (!skills.trim()) {
      setError('Please list at least one required skill');
      return;
    }

    const newPost: InternshipPost = {
      id: `int-${Date.now()}`,
      title: title.trim(),
      company: 'CapFly Partner Enterprise',
      domain: 'Engineering & Technology',
      duration: duration.trim() || '12 Weeks',
      stipend: stipend.trim() ? stipend.trim() : undefined,
      location: workMode,
      deadline: '30 Nov 2026',
      openings: parseInt(openings, 10) || 5,
      skills: skills.split(',').map((s) => s.trim()).filter(Boolean)
    };

    onAdd(newPost);
    setTitle('');
    setSkills('');
    setWorkMode('Hybrid');
    setDuration('12 Weeks');
    setStipend('');
    setOpenings('5');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4" onClick={onClose}>
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0B192C] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Plus className="w-5 h-5 text-blue-400" />
            <div>
              <h3 className="text-base font-black font-['Outfit']">Create Internship Posting</h3>
              <p className="text-[11px] text-slate-300">Publish open internship tracks to partner colleges</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-semibold">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Role Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Cybersecurity Analysis Intern"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Skills Needed <span className="text-red-500">*</span> (comma-separated)
            </label>
            <input
              type="text"
              required
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g., Python, Wireshark, Network Security"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Work Mode / Location
              </label>
              <select
                value={workMode}
                onChange={(e) => setWorkMode(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              >
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
                <option value="Remote / Own Place">Remote / Own Place</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Duration
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g., 12 Weeks or 6 Months"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Monthly Stipend <span className="text-slate-400 font-normal lowercase">(optional)</span>
              </label>
              <input
                type="text"
                value={stipend}
                onChange={(e) => setStipend(e.target.value)}
                placeholder="Leave blank for Unpaid / Performance"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                If blank, automatically tagged as &quot;Unpaid / Performance Stipend&quot;
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Openings
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={openings}
                onChange={(e) => setOpenings(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#0B192C] hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4 text-blue-400" />
              Publish Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Create Job Requisition Modal
// ─────────────────────────────────────────────────────────────────────────────

interface AddJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (job: JobPost) => void;
}

const AddJobModal: React.FC<AddJobModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [jobTitle, setJobTitle]     = useState('');
  const [track, setTrack]           = useState(DOMAIN_OPTIONS[0]);
  const [openings, setOpenings]     = useState('15');
  const [ctc, setCtc]               = useState('');
  const [location, setLocation]     = useState('');
  const [experience, setExperience] = useState(EXPERIENCE_OPTIONS[0]);
  const [deadline, setDeadline]     = useState('');
  const [skillsRaw, setSkillsRaw]   = useState('');
  const [error, setError]           = useState('');

  if (!isOpen) return null;

  const resetForm = () => {
    setJobTitle('');
    setTrack(DOMAIN_OPTIONS[0]);
    setOpenings('15');
    setCtc('');
    setLocation('');
    setExperience(EXPERIENCE_OPTIONS[0]);
    setDeadline('');
    setSkillsRaw('');
    setError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const formatDeadline = (raw: string) => {
    if (!raw) return '30 Nov 2026';
    const d = new Date(raw);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle.trim()) { setError('Please provide a Job Title'); return; }
    if (!ctc.trim()) { setError('Please specify the CTC / Compensation'); return; }
    if (!location.trim()) { setError('Please specify Location & Work Mode'); return; }

    const newJob: JobPost = {
      id: `job-${Date.now()}`,
      title: jobTitle.trim(),
      company: 'CapFly Partner Enterprise',
      track,
      ctc: ctc.trim(),
      location: location.trim(),
      experience,
      deadline: formatDeadline(deadline),
      openings: Math.max(1, parseInt(openings, 10) || 1),
      skills: skillsRaw.split(',').map((s) => s.trim()).filter(Boolean),
    };

    onAdd(newJob);
    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4" onClick={handleClose}>
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#0F172A] px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 text-white">
            <div className="w-8 h-8 rounded-lg bg-blue-600/30 flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-blue-300" />
            </div>
            <div>
              <h3 className="text-base font-black font-['Outfit']">Create Job Requisition</h3>
              <p className="text-[11px] text-slate-400">Publish a new job opening to campus partner pipelines</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form — Scrollable */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-semibold">
              {error}
            </div>
          )}

          {/* Row 1: Job Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g., Full-Stack Software Engineer (SDE-I)"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>

          {/* Row 2: Domain / Track & Openings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                <ChevronDown className="w-3 h-3 text-blue-600" />
                Domain / Track
              </label>
              <select
                value={track}
                onChange={(e) => setTrack(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                {DOMAIN_OPTIONS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Vacancy / Openings Count
              </label>
              <input
                type="number"
                min="1"
                max="500"
                value={openings}
                onChange={(e) => setOpenings(e.target.value)}
                placeholder="e.g., 15"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Row 3: CTC & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                <DollarSign className="w-3 h-3 text-emerald-600" />
                Annual CTC Compensation <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={ctc}
                onChange={(e) => setCtc(e.target.value)}
                placeholder="e.g., ₹14 LPA"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-500" />
                Location & Work Mode <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Bengaluru • Hybrid"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Row 4: Experience & Deadline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Target Experience
              </label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                {EXPERIENCE_OPTIONS.map((ex) => (
                  <option key={ex} value={ex}>{ex}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-500" />
                Application Deadline
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Row 5: Technical Skill Tags */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Tag className="w-3 h-3 text-purple-600" />
              Technical Skill Tags / Specifications
            </label>
            <input
              type="text"
              value={skillsRaw}
              onChange={(e) => setSkillsRaw(e.target.value)}
              placeholder="e.g., React, TypeScript, Node.js, Docker"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            {skillsRaw.trim() && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {skillsRaw.split(',').map((s) => s.trim()).filter(Boolean).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-purple-50 text-purple-700 border border-purple-100 rounded-md text-[10px] font-bold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <p className="text-[10px] text-slate-400 mt-1">Comma-separated. Tags will appear on the published job card.</p>
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#0F172A] hover:bg-slate-800 active:bg-slate-900 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-sm hover:shadow-md"
            >
              <Send className="w-3.5 h-3.5 text-blue-400" />
              Publish Job Opening
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Internship Details Modal
// ─────────────────────────────────────────────────────────────────────────────

interface InternshipDetailsModalProps {
  internship: InternshipPost | null;
  isOpen: boolean;
  onClose: () => void;
}

const InternshipDetailsModal: React.FC<InternshipDetailsModalProps> = ({ internship, isOpen, onClose }) => {
  if (!isOpen || !internship) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4" onClick={onClose}>
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-white sticky top-0 z-10 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-1">{internship.title}</h2>
            <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
              <span>{internship.company}</span>
              <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold">Actively hiring</span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span>{internship.stipend || 'Unpaid'}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{internship.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{internship.duration}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <span className="text-xs text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md font-medium flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> 7 days ago
              </span>
              <span className="text-xs text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md font-medium">
                {internship.openings} vacancies
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              About the internship 
              <span className="text-[10px] font-bold px-2 py-1 bg-purple-50 text-purple-700 rounded-md flex items-center gap-1">
                Summarized by AI <Sparkles className="w-3 h-3" />
              </span>
            </h3>
            
            <div className="space-y-5">
              <div>
                <p className="font-bold mb-2">Role Overview:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {internship.roleOverview ? internship.roleOverview.map((item, idx) => <li key={idx}>{item}</li>) : (
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
                  <li><strong>Skills:</strong> {internship.skills.join(', ')}</li>
                </ul>
              </div>

              <div>
                <p className="font-bold mb-2">Stipend:</p>
                {internship.stipendBreakup ? (
                  <div className="whitespace-pre-line">{internship.stipendBreakup}</div>
                ) : (
                  <>
                    <p>Stipend breakup:</p>
                    <p>Stipend: {internship.stipend || 'Unpaid'}</p>
                    <p>Variable Pay: Based on performance</p>
                  </>
                )}
              </div>

              <div>
                <p className="font-bold mb-2">About {internship.company}:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {internship.aboutCompany ? internship.aboutCompany.map((item, idx) => <li key={idx}>{item}</li>) : (
                    <>
                      <li>{internship.company} is a leading organization pushing the boundaries of technology.</li>
                      <li><strong>Perks:</strong> Certificate, Letter of recommendation, Flexible work hours.</li>
                    </>
                  )}
                  <li><strong>Activity on Platform:</strong> {internship.activity || 'Hiring since: April 2023; Opportunities posted: 15; Candidates hired: 5.'}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Apply for Internship Sub-View
// ─────────────────────────────────────────────────────────────────────────────

interface ApplyForInternshipViewProps {
  internships: InternshipPost[];
}

const ApplyForInternshipView: React.FC<ApplyForInternshipViewProps> = ({ internships }) => {
  const [search, setSearch] = useState('');
  const [applications, setApplications] = useState<any[]>([]);
  const [selectedInternship, setSelectedInternship] = useState<InternshipPost | null>(null);

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
    // Poll to simulate real-time notification
    const interval = setInterval(loadApps, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleReviewAccept = (appId: string) => {
    const saved = localStorage.getItem('capfly_student_applications');
    if (saved) {
      const apps = JSON.parse(saved);
      const updatedApps = apps.map((app: any) => 
        app.applicationId === appId ? { ...app, status: 'Shortlisted' } : app
      );
      localStorage.setItem('capfly_student_applications', JSON.stringify(updatedApps));
      setApplications(updatedApps);
    }
  };

  const filtered = internships.filter((i) =>
    i.title.toLowerCase().includes(search.toLowerCase()) ||
    i.domain.toLowerCase().includes(search.toLowerCase()) ||
    i.company.toLowerCase().includes(search.toLowerCase()) ||
    i.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-3">
      {/* Search Header Container */}
      <div className="pb-3 border-b border-slate-100 shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search internship roles, domains, skills, or companies..."
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          <div className="flex items-center shrink-0">
            <span className="text-xs text-slate-500 font-medium">
              {filtered.length} positions found
            </span>
          </div>
        </div>
      </div>

      {/* Internship Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedInternship(item)}
            className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs hover:border-blue-300 transition-all cursor-pointer"
          >
            <div className="p-3 sm:p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">
                    {item.domain}
                  </div>
                  <h3 className="font-black text-slate-900 text-sm sm:text-base font-['Outfit'] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    {item.company}
                  </p>
                </div>
                <span className="shrink-0 px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-[10px] font-bold">
                  {item.openings} Opens
                </span>
              </div>

              {/* Badges: Duration, Optional Stipend, Location */}
              <div className="flex flex-wrap gap-2 text-[11px] text-slate-600 mb-2">
                <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
                  <Clock className="w-3 h-3 text-slate-400" /> {item.duration}
                </span>
                {renderStipendBadge(item.stipend)}
                <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
                  <MapPin className="w-3 h-3 text-slate-400" /> {item.location}
                </span>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 mb-2">
                {item.skills.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-md text-[10px] font-bold"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-2.5 border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" /> Deadline: {item.deadline}
                </span>
                <span className="text-[10px] font-semibold text-slate-400">
                  Campus Scout Verified
                </span>
              </div>

              {/* Application Notifications */}
              {applications.filter(app => app.item.id === item.id).map(app => (
                <div key={app.applicationId} className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between gap-3 animate-fade-in shadow-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0">
                      <FileText className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">New Candidate Application</p>
                      <p className="text-[10px] text-slate-500 font-mono">App ID: #{app.applicationId}</p>
                    </div>
                  </div>
                  {app.status === 'Shortlisted' ? (
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Accepted & Reviewed
                    </span>
                  ) : (
                    <button 
                      onClick={() => handleReviewAccept(app.applicationId)}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer shadow-sm"
                    >
                      Review & Accept
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-slate-400 text-sm bg-white rounded-2xl border border-dashed border-slate-200">
          No internship roles match your search. Use &quot;+ Add Internship&quot; in the header to publish a new one.
        </div>
      )}

      <InternshipDetailsModal
        internship={selectedInternship}
        isOpen={!!selectedInternship}
        onClose={() => setSelectedInternship(null)}
      />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Apply for Job Sub-View — with Pre-Interview Assessment Dispatcher
// ─────────────────────────────────────────────────────────────────────────────

interface ApplyForJobViewProps {
  jobs: JobPost[];
}

const ApplyForJobView: React.FC<ApplyForJobViewProps> = ({ jobs }) => {
  const [search, setSearch]                 = useState('');
  const [dispatchedJobs, setDispatchedJobs] = useState<Record<string, boolean>>({});
  const [notification, setNotification]     = useState<string | null>(null);
  const [applications, setApplications] = useState<any[]>([]);

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
    const interval = setInterval(loadApps, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleReviewAccept = (appId: string) => {
    const saved = localStorage.getItem('capfly_student_applications');
    if (saved) {
      const apps = JSON.parse(saved);
      const updatedApps = apps.map((app: any) => 
        app.applicationId === appId ? { ...app, status: 'Shortlisted' } : app
      );
      localStorage.setItem('capfly_student_applications', JSON.stringify(updatedApps));
      setApplications(updatedApps);
    }
  };

  const handleDispatchAssessment = (job: JobPost) => {
    setDispatchedJobs((prev) => ({ ...prev, [job.id]: true }));
    setNotification(
      'Pre-Interview Proctored Assessment successfully dispatched to candidate.'
    );
    setTimeout(() => {
      setNotification(null);
    }, 6000);
  };

  const filtered = jobs.filter((j) =>
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.track.toLowerCase().includes(search.toLowerCase()) ||
    j.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-3">
      {/* Success Notification Alert Banner for dispatched test */}
      {notification && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3 flex items-center justify-between text-emerald-900 text-xs sm:text-sm font-semibold shadow-xs animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{notification}</span>
          </div>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="text-emerald-700 hover:text-emerald-900 p-1 rounded-lg hover:bg-emerald-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search Header Container */}
      <div className="pb-3 border-b border-slate-100 shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search job titles, engineering tracks, or companies..."
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>
          <div className="flex items-center shrink-0">
            <span className="text-xs text-slate-500 font-medium">{filtered.length} positions open</span>
          </div>
        </div>
      </div>

      {/* Job Cards */}
      <div className="space-y-3">
        {filtered.map((job) => {
          const isDispatched = dispatchedJobs[job.id];
          return (
            <div
              key={job.id}
              className="bg-white rounded-xl border border-[#E2E8F0] p-3 sm:p-4 shadow-xs hover:border-blue-300 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider">
                      {job.track}
                    </span>
                    {isDispatched ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-50 text-amber-800 border border-amber-300 rounded-md text-[10px] font-bold animate-pulse">
                        <Clock className="w-3 h-3 text-amber-600" />
                        Test Dispatched / Pending Completion
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 rounded-md text-[10px] font-bold">
                        Assessment Available
                      </span>
                    )}
                  </div>

                  <h3 className="font-black text-slate-900 text-sm sm:text-base font-['Outfit']">{job.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                    <Building2 className="w-3 h-3" /> {job.company} • {job.location} • {job.experience}
                  </p>

                  <div className="flex flex-wrap gap-2 text-xs mt-2 mb-2">
                    <span className="flex items-center gap-1 bg-purple-50 px-2 py-1 rounded-lg border border-purple-100 text-purple-700 font-bold">
                      <DollarSign className="w-3 h-3" /> {job.ctc}
                    </span>
                    <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200 text-slate-600">
                      <Calendar className="w-3 h-3 text-slate-400" /> Deadline: {job.deadline}
                    </span>
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg font-bold">
                      {job.openings} Openings
                    </span>
                  </div>

                  {job.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {job.skills.map((s) => (
                        <span key={s} className="px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 rounded-md text-[10px] font-semibold">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: Actions */}
                <div className="flex flex-col items-end gap-2 shrink-0 sm:pt-1">
                  <button
                    type="button"
                    onClick={() => handleDispatchAssessment(job)}
                    disabled={isDispatched}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                      isDispatched
                        ? 'bg-amber-100 text-amber-800 border border-amber-300 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-500/20 cursor-pointer active:scale-95'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    {isDispatched ? 'Assessment Dispatched' : 'Start Pre-Interview Test'}
                  </button>

                  <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                    <Shield className="w-3 h-3 text-slate-400" />
                    <span>Automated Candidate Dispatch</span>
                  </div>
                </div>
              </div>

              {/* Application Notifications for Jobs */}
              {applications.filter(app => app.item.id === job.id).map(app => (
                <div key={app.applicationId} className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3 animate-fade-in">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shrink-0">
                      <FileText className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">New Candidate Application Received</p>
                      <p className="text-[10px] text-slate-500 font-mono">App ID: #{app.applicationId}</p>
                    </div>
                  </div>
                  {app.status === 'Shortlisted' ? (
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Accepted & Reviewed
                    </span>
                  ) : (
                    <button 
                      onClick={() => handleReviewAccept(app.applicationId)}
                      className="px-3 py-1.5 bg-[#0F172A] hover:bg-slate-800 text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer shadow-sm"
                    >
                      Review & Accept
                    </button>
                  )}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-slate-400 text-sm bg-white rounded-2xl border border-dashed border-slate-200">
          No job listings match your search. Click &quot;+ Add Job&quot; in the header to create a new requisition.
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Main PostOpportunitiesView (with single context-aware dynamic header button)
// ─────────────────────────────────────────────────────────────────────────────

type SubView = 'internship' | 'job';

export const PostOpportunitiesView: React.FC = () => {
  const [subView, setSubView]                                 = useState<SubView>('internship');
  const [internships, setInternships]                         = useState<InternshipPost[]>(DEFAULT_INTERNSHIPS);
  const [jobs, setJobs]                                       = useState<JobPost[]>(DEFAULT_JOBS);
  const [isAddJobModalOpen, setIsAddJobModalOpen]             = useState(false);
  const [isAddInternshipModalOpen, setIsAddInternshipModalOpen] = useState(false);
  const [toastMessage, setToastMessage]                       = useState<string | null>(null);

  const handleAddJob = (newJob: JobPost) => {
    setJobs((prev) => [newJob, ...prev]);
    setToastMessage(`Job requisition "${newJob.title}" published and added to active listings!`);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const handleAddInternship = (newInternship: InternshipPost) => {
    setInternships((prev) => [newInternship, ...prev]);
    setToastMessage(`Internship posting "${newInternship.title}" published and added to active listings!`);
    setTimeout(() => setToastMessage(null), 5000);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs flex flex-col space-y-3 h-[calc(100vh-120px)] overflow-hidden">
      {/* Success Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
          <div className="flex items-center gap-3 px-4 py-3.5 bg-[#0B192C] text-white rounded-2xl shadow-2xl border border-slate-700 max-w-sm">
            <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <p className="text-[11px] text-slate-200 leading-snug flex-1 font-medium">{toastMessage}</p>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Header Banner with Single Context-Aware Dynamic Primary Action Button */}
      <div className="space-y-3 pb-3 border-b border-slate-100 shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          {/* Left: Title & Description */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-[10px] font-bold text-blue-600 uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Opportunities Hub</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 font-['Outfit'] mt-1 leading-none">
              Post Opportunities
            </h2>
            <p className="text-[11px] text-slate-500 mt-1">
              Publish internships and job openings, dispatch proctored assessments, and track candidate pipelines.
            </p>
          </div>

          {/* Right: Sub-Nav Toggle + Single Context-Aware Dynamic Primary Action Button */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 shrink-0">
            {/* Sub-Navigation Toggle */}
            <div className="inline-flex p-1 bg-slate-100 rounded-lg gap-1">
              <button
                type="button"
                onClick={() => setSubView('internship')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                  subView === 'internship'
                    ? 'bg-white text-blue-600 shadow-sm border border-blue-200'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <FileText className="w-3 h-3" />
                Internship
              </button>
              <button
                type="button"
                onClick={() => setSubView('job')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                  subView === 'job'
                    ? 'bg-[#0B192C] text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Briefcase className="w-3 h-3" />
                Jobs
              </button>
            </div>

            {/* Exactly ONE Context-Aware Dynamic Primary Action Button (Dark Navy #0F172A) */}
            {subView === 'job' ? (
              <button
                type="button"
                onClick={() => setIsAddJobModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0F172A] hover:bg-slate-800 active:bg-slate-900 text-white rounded-lg text-[11px] font-bold transition-all shadow-sm cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-3.5 h-3.5 text-blue-400" />
                + Add Job
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsAddInternshipModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0F172A] hover:bg-slate-800 active:bg-slate-900 text-white rounded-lg text-[11px] font-bold transition-all shadow-sm cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-3.5 h-3.5 text-blue-400" />
                + Add Internship
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sub-View Content */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {subView === 'internship' ? (
          <ApplyForInternshipView internships={internships} />
        ) : (
          <ApplyForJobView jobs={jobs} />
        )}
      </div>

      {/* Context-Specific Modals */}
      <AddJobModal
        isOpen={isAddJobModalOpen}
        onClose={() => setIsAddJobModalOpen(false)}
        onAdd={handleAddJob}
      />

      <AddInternshipModal
        isOpen={isAddInternshipModalOpen}
        onClose={() => setIsAddInternshipModalOpen(false)}
        onAdd={handleAddInternship}
      />
    </div>
  );
};
