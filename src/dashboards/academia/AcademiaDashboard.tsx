import React, { useState, useRef } from 'react';
import { FacultyCollaborationHub } from './components/FacultyCollaborationHub';
import {
  LayoutDashboard,
  Users,
  Award,
  TrendingUp,
  FileText,
  ChevronDown,
  LogOut,
  Bell,
  School,
  CheckCircle2,
  PieChart as PieChartIcon,
  Check,
  X,
  Target,
  BarChart3,
  Send,
  Loader2,
  BookOpen,
  FolderGit2,
  Paperclip,
  UploadCloud,
  Clock,
  Handshake
} from 'lucide-react';

import { useLanguage } from '../../context/LanguageContext';
import { LanguageSelectorPill } from '../../components/common/LanguageSelectorPill';

export type AcademiaTabType = 'dashboard' | 'students' | 'upskilling' | 'consultancy' | 'reports' | 'collaboration';

export interface AcademiaDashboardProps {
  onLogout?: () => void;
}

// -------------------------------------------------------------
// 1. Chart 1 Math: Donut Chart (Faculty Engagement Allocation)
// -------------------------------------------------------------
interface DonutSegment {
  id: string;
  name: string;
  percentage: number;
  color: string;
  hoverColor: string;
}

const ENGAGEMENT_DONUT_DATA: DonutSegment[] = [
  { id: 'mentorship', name: 'Mentorship', percentage: 40, color: '#2563EB', hoverColor: '#1D4ED8' },
  { id: 'sabbaticals', name: 'Sabbaticals', percentage: 30, color: '#0D9488', hoverColor: '#0F766E' },
  { id: 'consultancy', name: 'Consultancy', percentage: 20, color: '#F59E0B', hoverColor: '#D97706' },
  { id: 'reporting', name: 'Reporting', percentage: 10, color: '#6366F1', hoverColor: '#4F46E5' },
];

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(x: number, y: number, inner: number, outer: number, start: number, end: number) {
  const e = end >= 360 ? 359.999 : end;
  const so = polarToCartesian(x, y, outer, start);
  const eo = polarToCartesian(x, y, outer, e);
  const si = polarToCartesian(x, y, inner, e);
  const ei = polarToCartesian(x, y, inner, start);
  const large = end - start <= 180 ? '0' : '1';
  return [
    'M', so.x, so.y,
    'A', outer, outer, 0, large, 1, eo.x, eo.y,
    'L', si.x, si.y,
    'A', inner, inner, 0, large, 0, ei.x, ei.y,
    'Z',
  ].join(' ');
}

const computeDonutSlices = (segments: DonutSegment[]) => {
  let angle = 0;
  return segments.map((seg) => {
    const span = (seg.percentage / 100) * 360;
    const start = angle;
    const end = angle + span;
    angle = end;
    return { seg, start, end };
  });
};

const PRECOMPUTED_DONUT_SLICES = computeDonutSlices(ENGAGEMENT_DONUT_DATA);

// -------------------------------------------------------------
// 2. Chart 2 Math: Radar Chart (Skill Averages vs Threshold)
// -------------------------------------------------------------
const RADAR_AXES = [
  { label: 'Core CS', batch: 90, threshold: 85 },
  { label: 'Cloud', batch: 84, threshold: 80 },
  { label: 'AI / ML', batch: 78, threshold: 85 },
  { label: 'Embedded', batch: 92, threshold: 80 },
  { label: 'Systems', batch: 86, threshold: 85 },
];

const CX = 145;
const CY = 125;
const MAX_R = 78;

function getRadarPoint(index: number, total: number, valuePct: number) {
  const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
  const r = (valuePct / 100) * MAX_R;
  return {
    x: CX + r * Math.cos(angle),
    y: CY + r * Math.sin(angle),
  };
}

const getGridPolygon = (fraction: number) => {
  return RADAR_AXES.map((_, i) => {
    const pt = getRadarPoint(i, RADAR_AXES.length, fraction * 100);
    return `${pt.x},${pt.y}`;
  }).join(' ');
};

const BATCH_POLYGON = RADAR_AXES.map((ax, i) => {
  const pt = getRadarPoint(i, RADAR_AXES.length, ax.batch);
  return `${pt.x},${pt.y}`;
}).join(' ');

const THRESHOLD_POLYGON = RADAR_AXES.map((ax, i) => {
  const pt = getRadarPoint(i, RADAR_AXES.length, ax.threshold);
  return `${pt.x},${pt.y}`;
}).join(' ');

// -------------------------------------------------------------
// Tab 2 Data: Students (Assessments & Heatmap)
// -------------------------------------------------------------
interface AssessmentBlueprint {
  id: string;
  title: string;
  provider: string;
  skills: string;
  threshold: number;
  duration: string;
  assigned: boolean;
}

const INITIAL_BLUEPRINTS: AssessmentBlueprint[] = [
  {
    id: 'bp-1',
    title: 'Data Structures & Algorithms Basics',
    provider: 'CapFly Internal',
    skills: 'Arrays, Linked Lists, Trees',
    threshold: 85,
    duration: '30 Mins',
    assigned: false,
  },
  {
    id: 'bp-2',
    title: 'Cloud Infrastructure & Microservices',
    provider: 'Corp XYZ',
    skills: 'Docker & Kubernetes',
    threshold: 80,
    duration: '60 Mins',
    assigned: true,
  },
  {
    id: 'bp-3',
    title: 'Web Development Fundamentals',
    provider: 'CapFly Internal',
    skills: 'HTML, CSS, JS',
    threshold: 78,
    duration: '30 Mins',
    assigned: false,
  },
];

type SkillState = 'verified' | 'progress' | 'gap';

interface StudentHeatmapRow {
  id: string;
  name: string;
  rollNo: string;
  coreCS: SkillState;
  cloud: SkillState;
  ai: SkillState;
  score: number;
  endorsed: boolean;
  recommendedCourse?: string;
  assignedProject?: string;
}

const INITIAL_STUDENTS: StudentHeatmapRow[] = [
  {
    id: 's-1',
    name: 'Scholar A1',
    rollNo: 'STU-01',
    coreCS: 'verified',
    cloud: 'verified',
    ai: 'progress',
    score: 92,
    endorsed: false,
  },
  {
    id: 's-2',
    name: 'Scholar B2',
    rollNo: 'STU-02',
    coreCS: 'verified',
    cloud: 'progress',
    ai: 'verified',
    score: 88,
    endorsed: true,
  },
  {
    id: 's-3',
    name: 'Scholar C3',
    rollNo: 'STU-03',
    coreCS: 'progress',
    cloud: 'verified',
    ai: 'gap',
    score: 82,
    endorsed: false,
  },
  {
    id: 's-4',
    name: 'Scholar D4',
    rollNo: 'STU-04',
    coreCS: 'verified',
    cloud: 'gap',
    ai: 'progress',
    score: 78,
    endorsed: false,
  },
  {
    id: 's-5',
    name: 'Scholar E5',
    rollNo: 'STU-05',
    coreCS: 'verified',
    cloud: 'verified',
    ai: 'verified',
    score: 96,
    endorsed: true,
  },
];

// -------------------------------------------------------------
// Tab 3 Data: Upskilling (Faculty Sabbaticals & FDPs)
// -------------------------------------------------------------
interface SabbaticalItem {
  id: string;
  title: string;
  host: string;
  duration: string;
  tag: string;
  deadline: string;
  applied: boolean;
}

const INITIAL_SABBATICALS: SabbaticalItem[] = [
  {
    id: 'sab-1',
    title: 'Systems Core Industrial Sabbatical',
    host: 'Enterprise ABC',
    duration: '4 Weeks (On-Site)',
    tag: 'Industry Funded',
    deadline: 'In 6 Days',
    applied: false,
  },
  {
    id: 'sab-2',
    title: 'Cloud Infrastructure Residency',
    host: 'Corp XYZ',
    duration: '6 Weeks (Hybrid)',
    tag: 'Industry Funded',
    deadline: 'Rolling',
    applied: true,
  },
  {
    id: 'sab-3',
    title: 'Applied AI Laboratory Sabbatical',
    host: 'Institute PQR',
    duration: '3 Weeks (On-Site)',
    tag: 'Fellowship Grant',
    deadline: 'Nov 12',
    applied: false,
  },
];

// -------------------------------------------------------------
// Tab 4 Data: Consultancy (R&D Problem Statements)
// -------------------------------------------------------------
interface ProblemItem {
  id: string;
  title: string;
  partner: string;
  grant: string;
  duration: string;
  submitted: boolean;
}

const INITIAL_PROBLEMS: ProblemItem[] = [
  {
    id: 'p-1',
    title: 'Battery Telemetry Early-Warning Algorithm',
    partner: 'Enterprise ABC',
    grant: 'Grant: ₹4.5L',
    duration: '6 Months',
    submitted: false,
  },
  {
    id: 'p-2',
    title: 'Distributed Queue Fault-Tolerance Optimization',
    partner: 'Corp XYZ',
    grant: 'Grant: ₹6.0L',
    duration: '4 Months',
    submitted: true,
  },
  {
    id: 'p-3',
    title: 'Real-Time Signal Classification Pipeline',
    partner: 'Institute PQR',
    grant: 'Grant: ₹8.2L',
    duration: '8 Months',
    submitted: false,
  },
];

export const AcademiaDashboard: React.FC<AcademiaDashboardProps> = ({ onLogout }) => {
  const { t } = useLanguage();
  // 1. Navigation State (Strictly 5 views)
  const [activeTab, setActiveTab] = useState<AcademiaTabType>('dashboard');
  const [studentSubTab, setStudentSubTab] = useState<'assessments' | 'heatmap'>('assessments');

  // 2. Interactive Data States
  const [blueprints, setBlueprints] = useState<AssessmentBlueprint[]>(() => {
    const saved = localStorage.getItem('capfly_assigned_blueprints');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_BLUEPRINTS;
      }
    }
    return INITIAL_BLUEPRINTS;
  });
  const [students, setStudents] = useState<StudentHeatmapRow[]>(INITIAL_STUDENTS);
  const [sabbaticals, setSabbaticals] = useState<SabbaticalItem[]>(INITIAL_SABBATICALS);
  const [problems, setProblems] = useState<ProblemItem[]>(INITIAL_PROBLEMS);
  const [activeDonutSegment, setActiveDonutSegment] = useState<DonutSegment | null>(null);

  // 3. Sabbatical / FDP Application Modal State
  const [selectedSabbatical, setSelectedSabbatical] = useState<SabbaticalItem | null>(null);
  const [appDesignation, setAppDesignation] = useState('Associate Professor / Dept. of Information Technology');
  const [appExpertise, setAppExpertise] = useState('Distributed Systems, High-Performance Computing & Cloud Telemetry');
  const [resumeFileName, setResumeFileName] = useState<string>('Dr_Devi_Academic_CV.pdf');
  const [resumeFileSize, setResumeFileSize] = useState<string>('2.4 MB');
  const [appSop, setAppSop] = useState('Focusing on industrial telemetry workflows, low-latency microservices, and edge systems architecture.');
  const [isSubmittingApp, setIsSubmittingApp] = useState(false);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  // 4. Consultancy Proposal Modal State
  const [selectedProblem, setSelectedProblem] = useState<ProblemItem | null>(null);
  const [propPi, setPropPi] = useState('Dr. Devi / Dept. of Information Technology');
  const [propAbstract, setPropAbstract] = useState('Telemetry-driven predictive degradation models using edge transformer filters and zero-copy queue telemetry.');
  const [propFileName, setPropFileName] = useState<string>('Research_Abstract_Budget_Proposal.pdf');
  const [propFileSize, setPropFileSize] = useState<string>('1.8 MB');
  const [propBudget, setPropBudget] = useState('₹2.5L Research Personnel + ₹1.5L Compute + ₹0.5L Testing Hardware');
  const [isSubmittingProp, setIsSubmittingProp] = useState(false);
  const propInputRef = useRef<HTMLInputElement>(null);

  // 5. Dispatch Report State & Last Sync
  const [dispatchState, setDispatchState] = useState<'idle' | 'loading' | 'dispatched'>('idle');
  const [lastSyncTime, setLastSyncTime] = useState('Today, 08:30 PM');

  // 6. Header States
  const [department, setDepartment] = useState('Department A');
  const [notifOpen, setNotifOpen] = useState(false);
  const [hasUnreadNotifs, setHasUnreadNotifs] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      window.location.href = '/';
    }
  };

  // Tab 2 Action: Assign Assessment Blueprint
  const handleAssignBlueprint = (id: string) => {
    setBlueprints((prev) => {
      const updated = prev.map((b) => {
        if (b.id === id) {
          const next = !b.assigned;
          showToast(next ? `Blueprint Assigned: ${b.title}` : `Blueprint Revoked`);
          return { ...b, assigned: next };
        }
        return b;
      });
      localStorage.setItem('capfly_assigned_blueprints', JSON.stringify(updated));
      return updated;
    });
  };

  // Tab 2 Action: Recommend Course to Student
  const handleRecommendCourse = (id: string, name: string) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, recommendedCourse: 'Cloud Architecture Core' } : s))
    );
    showToast(`Course Recommended for ${name}`);
  };

  // Tab 2 Action: Assign Live Project to Student
  const handleAssignProject = (id: string, name: string) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, assignedProject: 'Telemetry Micro-Service' } : s))
    );
    showToast(`Live Project Assigned to ${name}`);
  };

  // Tab 2 Action: Endorse Student
  const handleToggleEndorse = (id: string, name: string) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const next = !s.endorsed;
          showToast(next ? `${name}: Endorsed ✓` : `${name}: Endorsement Revoked`);
          return { ...s, endorsed: next };
        }
        return s;
      })
    );
  };

  // Tab 3 Action: Open Sabbatical Application Modal
  const handleOpenSabbaticalModal = (item: SabbaticalItem) => {
    setSelectedSabbatical(item);
  };

  // Tab 3 Action: Submit Sabbatical Application
  const handleSubmitApplication = () => {
    if (!selectedSabbatical || isSubmittingApp) return;
    setIsSubmittingApp(true);
    setTimeout(() => {
      const partnerName = selectedSabbatical.host;
      setSabbaticals((prev) =>
        prev.map((s) => (s.id === selectedSabbatical.id ? { ...s, applied: true } : s))
      );
      setIsSubmittingApp(false);
      setSelectedSabbatical(null);
      showToast(`Application & Resume successfully submitted to ${partnerName}`);
    }, 1000);
  };

  // Tab 4 Action: Open Proposal Modal
  const handleOpenProposalModal = (item: ProblemItem) => {
    setSelectedProblem(item);
  };

  // Tab 4 Action: Submit Consultancy Proposal
  const handleSubmitProposalAction = () => {
    if (!selectedProblem || isSubmittingProp) return;
    setIsSubmittingProp(true);
    setTimeout(() => {
      const partnerName = selectedProblem.partner;
      setProblems((prev) =>
        prev.map((p) => (p.id === selectedProblem.id ? { ...p, submitted: true } : p))
      );
      setIsSubmittingProp(false);
      setSelectedProblem(null);
      showToast(`Proposal successfully submitted to ${partnerName}`);
    }, 1000);
  };

  // Tab 5 Action: Dispatch Report to Institution
  const handleDispatchReport = () => {
    if (dispatchState !== 'idle') return;
    setDispatchState('loading');
    setTimeout(() => {
      setDispatchState('dispatched');
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setLastSyncTime(`Today, ${timeStr}`);
      showToast('Dispatched to Institution Admin ✓');
      setTimeout(() => {
        setDispatchState('idle');
      }, 3500);
    }, 1000);
  };

  const departments = ['Department A', 'Department B', 'Department C', 'Academic Affairs'];

  // Strictly 5 Tabs, 1-2 Words Each as specified
  const sidebarItems: {
    id: AcademiaTabType;
    label: string;
    badge: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: 'dashboard', label: t('dashboard', 'Dashboard'), badge: '01', icon: LayoutDashboard },
    { id: 'students', label: t('students_analytics', 'Students'), badge: '02', icon: Users },
    { id: 'upskilling', label: t('upskilling_fdp', 'Upskilling'), badge: '03', icon: Award },
    { id: 'consultancy', label: t('research_consultancy', 'Consultancy'), badge: '04', icon: TrendingUp },
    { id: 'reports', label: t('naac_reports', 'Reports'), badge: '05', icon: FileText },
    { id: 'collaboration', label: 'Collab Hub', badge: '06', icon: Handshake },
  ];

  // Dynamic breadcrumbs
  const getBreadcrumb = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Dashboard > Overview';
      case 'students':
        return 'Students > Mentoring Pipeline';
      case 'upskilling':
        return 'Upskilling > Faculty Exposure';
      case 'consultancy':
        return 'Consultancy > Corporate Collaboration';
      case 'reports':
        return 'Reports > Institution Analytics';
      case 'collaboration':
        return 'Collaboration > Corporate Partnerships';
      default:
        return 'Dashboard > Overview';
    }
  };

  const activeSegment = activeDonutSegment || ENGAGEMENT_DONUT_DATA[0];

  // Dot badge renderer
  const renderSkillDot = (state: SkillState) => {
    if (state === 'verified') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Verified
        </span>
      );
    }
    if (state === 'progress') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          In-Progress
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
        Gap
      </span>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7FB] text-slate-900 font-sans">
      
      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
          <div className="flex items-center gap-3 px-4 py-3 bg-[#0B192C] text-white rounded-xl shadow-2xl border border-slate-700 max-w-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <p className="text-xs font-semibold">{toast}</p>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="ml-auto text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 1. TOP HEADER & BREADCRUMB                                   */}
      {/* ============================================================ */}
      <div className="w-full flex flex-col shrink-0">
        <header className="w-full bg-white text-slate-900 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between border-b border-slate-200 shadow-xs">
          
          {/* Brand */}
          <div className="flex items-center gap-3">

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-950 font-['Outfit'] leading-none">
                  Capfly
                </span>
                <span className="text-slate-300 font-light text-sm">|</span>
                <span className="text-xs sm:text-sm font-bold text-blue-600">
                  {t('academia_portal', 'Faculty Portal')}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-0.5">
                Academic Mentorship &amp; Curriculum Alignment
              </span>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Language Selector Pill */}
            <LanguageSelectorPill />

            {/* Notification Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setNotifOpen(!notifOpen);
                  setHasUnreadNotifs(false);
                }}
                className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 transition-all cursor-pointer shadow-xs"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {hasUnreadNotifs && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white shadow-xs"></span>
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {notifOpen && (
                <div className="absolute right-0 mt-3 w-80 rounded-2xl bg-white text-slate-800 shadow-2xl border border-slate-200 z-50 p-4 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-900">Academic Alerts</span>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                      3 New
                    </span>
                  </div>
                  <div className="divide-y divide-slate-100 mt-2 text-xs">
                    <div className="py-2.5">
                      <p className="font-semibold text-slate-800">Enterprise ABC assigned blueprint: Systems Benchmark</p>
                      <span className="text-[10px] text-slate-400 mt-0.5 block">10m ago</span>
                    </div>
                    <div className="py-2.5">
                      <p className="font-semibold text-slate-800">Scholar A1 assessment submitted (Score: 92%)</p>
                      <span className="text-[10px] text-slate-400 mt-0.5 block">1h ago</span>
                    </div>
                    <div className="py-2.5">
                      <p className="font-semibold text-slate-800">Corp XYZ approved sabbatical residency</p>
                      <span className="text-[10px] text-slate-400 mt-0.5 block">Yesterday</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Department Dropdown */}
            <div className="relative hidden md:block">
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="appearance-none bg-slate-50 text-slate-700 text-xs sm:text-sm font-medium py-2 pl-3.5 pr-9 rounded-lg border border-slate-200 hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer shadow-xs"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept} className="bg-white text-slate-900 py-1">
                    {dept}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Red Logout Button */}
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 px-3.5 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-all duration-150 cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span>{t('logout', 'Logout')}</span>
            </button>

          </div>
        </header>

        {/* Sub-Header Bar */}
        <div className="w-full bg-[#E0F2FE] border-b border-[#BAE6FD] px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
            <span className="text-blue-700 font-bold">Portal</span>
            <span className="text-slate-400">&gt;</span>
            <span className="text-slate-800">{getBreadcrumb()}</span>
          </div>
          <div className="text-[11px] font-medium text-slate-500 hidden sm:flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Live Facilitator Session</span>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. MAIN BODY: ULTRA-MINIMAL SIDEBAR + CANVAS                 */}
      {/* ============================================================ */}
      <div className="flex-1 flex flex-col md:flex-row w-full">
        
        {/* Left Sidebar (Squircle 3D Tile Navigation) */}
        <aside className="w-full md:w-24 lg:w-26 bg-white border-r border-[#E6ECF5] shrink-0 p-2.5 sm:p-3 flex flex-row md:flex-col items-center select-none overflow-x-auto md:overflow-x-visible">
          <nav className="flex flex-row md:flex-col items-center gap-2.5 sm:gap-3 w-full justify-center md:justify-start">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`w-[74px] h-[74px] sm:w-[78px] sm:h-[78px] rounded-[20px] p-2 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-150 transform active:scale-95 shrink-0 ${
                    isActive
                      ? 'bg-violet-600 text-white shadow-[0_3.5px_0_#5b21b6] hover:bg-violet-700 translate-y-[-1px]'
                      : 'bg-white text-[#2C3E50] border-[2.5px] border-[#DFE7F3] shadow-[0_3px_0_#DFE7F3] hover:border-[#CBD8EA] hover:bg-slate-50/80'
                  }`}
                >
                  <div className="flex items-center justify-center mb-1">
                    <Icon className={`w-[22px] h-[22px] ${isActive ? 'text-white' : 'text-[#33465E]'}`} />
                  </div>
                  <span className={`text-[10px] sm:text-[11px] font-black tracking-tight leading-none truncate max-w-full px-0.5 ${
                    isActive ? 'text-white' : 'text-[#24354A]'
                  }`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content Canvas */}
        <main className="flex-1 p-4 sm:p-5 overflow-y-auto w-full space-y-5">

          {/* ============================================================ */}
          {/* TAB 01: DASHBOARD                                            */}
          {/* ============================================================ */}
          {activeTab === 'dashboard' && (
            <div className="space-y-5">
              
              {/* Quick Stat Strip (3 Stat Cards) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Card 1: 38 Tracked (Mentees) */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Mentees
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="text-2xl font-black text-slate-900 font-['Outfit']">
                      38 Tracked
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium mt-0.5">
                      <span>Batch Readiness</span>
                      <span className="font-bold text-blue-600">86.4%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-2">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: '86.4%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Card 2: 2 Active (Sabbaticals / FDPs) */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Faculty Exposure
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <Award className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="text-2xl font-black text-slate-900 font-['Outfit']">
                      2 Active
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium mt-0.5">
                      <span>Sabbaticals / FDPs</span>
                      <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-1.5 py-0.5 rounded border border-emerald-200">
                        On-Track
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-2">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '66.7%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Card 3: ₹12.5L (Corporate Grants) */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Corporate Grants
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-black text-slate-900 font-['Outfit']">
                        ₹12.5L
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                        Sanctioned R&amp;D
                      </div>
                    </div>
                    <svg viewBox="0 0 70 28" className="w-16 h-7 shrink-0">
                      <path
                        d="M2,24 Q15,20 28,14 T48,16 T68,4"
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <circle cx="68" cy="4" r="3" fill="#D97706" />
                    </svg>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-2">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>

              </div>
              
              {/* Top Horizontal Stepper: SIH Core Pipeline */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Facilitator Workflow Pipeline
                </div>
                <div className="grid grid-cols-5 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-blue-50 border border-blue-200">
                    <span className="text-[10px] font-black text-blue-600 block">STEP 01</span>
                    <span className="font-bold text-slate-900 text-[11px]">Industry Req</span>
                  </div>
                  <div className="p-2 rounded-xl bg-blue-50 border border-blue-200">
                    <span className="text-[10px] font-black text-blue-600 block">STEP 02</span>
                    <span className="font-bold text-slate-900 text-[11px]">Assessment</span>
                  </div>
                  <div className="p-2 rounded-xl bg-blue-50 border border-blue-200">
                    <span className="text-[10px] font-black text-blue-600 block">STEP 03</span>
                    <span className="font-bold text-slate-900 text-[11px]">Gap Analysis</span>
                  </div>
                  <div className="p-2 rounded-xl bg-blue-50 border border-blue-200">
                    <span className="text-[10px] font-black text-blue-600 block">STEP 04</span>
                    <span className="font-bold text-slate-900 text-[11px]">Training</span>
                  </div>
                  <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200">
                    <span className="text-[10px] font-black text-emerald-600 block">STEP 05</span>
                    <span className="font-bold text-emerald-800 text-[11px]">Placed ✓</span>
                  </div>
                </div>
              </div>

              {/* Visual Analytics: Radar Chart & Donut Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                
                {/* 1. Radar Chart: Student Skill Averages vs Threshold */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <Target className="w-3.5 h-3.5 text-blue-600" />
                        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                          Skill Averages vs Industry Threshold
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-bold">
                        <span className="flex items-center gap-1 text-blue-600">
                          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                          Batch
                        </span>
                        <span className="flex items-center gap-1 text-slate-400">
                          <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                          Threshold
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-center items-center py-2">
                      <svg viewBox="0 0 290 230" className="w-full max-w-[250px] h-[190px]">
                        {[0.25, 0.5, 0.75, 1.0].map((frac) => (
                          <polygon
                            key={frac}
                            points={getGridPolygon(frac)}
                            fill="none"
                            stroke="#E2E8F0"
                            strokeWidth="1"
                          />
                        ))}

                        {RADAR_AXES.map((_, i) => {
                          const pt = getRadarPoint(i, RADAR_AXES.length, 100);
                          return (
                            <line
                              key={i}
                              x1={CX}
                              y1={CY}
                              x2={pt.x}
                              y2={pt.y}
                              stroke="#E2E8F0"
                              strokeWidth="1"
                            />
                          );
                        })}

                        <polygon
                          points={THRESHOLD_POLYGON}
                          fill="rgba(148, 163, 184, 0.12)"
                          stroke="#94A3B8"
                          strokeWidth="1.5"
                          strokeDasharray="3,3"
                        />

                        <polygon
                          points={BATCH_POLYGON}
                          fill="rgba(37, 99, 235, 0.22)"
                          stroke="#2563EB"
                          strokeWidth="2"
                        />

                        {RADAR_AXES.map((ax, i) => {
                          const angle = (i * 2 * Math.PI) / RADAR_AXES.length - Math.PI / 2;
                          const labelR = MAX_R + 24;
                          const lx = CX + labelR * Math.cos(angle);
                          const ly = CY + labelR * Math.sin(angle);
                          return (
                            <text
                              key={ax.label}
                              x={lx}
                              y={ly}
                              textAnchor="middle"
                              dominantBaseline="central"
                              className="text-[9px] font-bold fill-slate-600"
                            >
                              {ax.label}
                            </text>
                          );
                        })}
                      </svg>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Embedded: <strong>92% vs 80%</strong></span>
                    <span className="text-emerald-600 font-bold">4/5 Ahead</span>
                  </div>
                </div>

                {/* 2. Donut Chart: Faculty Engagement Allocation */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <PieChartIcon className="w-3.5 h-3.5 text-blue-600" />
                        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                          Engagement Allocation
                        </h3>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                        Workload
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mt-3">
                      <div className="flex justify-center items-center relative py-1">
                        <svg viewBox="0 0 200 200" className="w-40 h-40 drop-shadow-2xs">
                          {PRECOMPUTED_DONUT_SLICES.map(({ seg, start, end }) => {
                            const isHovered = activeSegment.id === seg.id;
                            const pathData = describeArc(100, 100, 52, isHovered ? 86 : 80, start, end);
                            return (
                              <path
                                key={seg.id}
                                d={pathData}
                                fill={isHovered ? seg.hoverColor : seg.color}
                                className="transition-all duration-200 cursor-pointer"
                                onMouseEnter={() => setActiveDonutSegment(seg)}
                              />
                            );
                          })}
                        </svg>

                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                          <span className="text-xl font-black text-slate-900 font-['Outfit'] leading-none">
                            70%
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                            Active
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        {ENGAGEMENT_DONUT_DATA.map((item) => {
                          const isCurrent = activeSegment.id === item.id;
                          return (
                            <div
                              key={item.id}
                              onMouseEnter={() => setActiveDonutSegment(item)}
                              className={`p-1.5 rounded-lg flex items-center justify-between text-xs cursor-pointer transition-colors ${
                                isCurrent ? 'bg-slate-50 border border-slate-200' : 'hover:bg-slate-50/50'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span
                                  className="w-2.5 h-2.5 rounded-full shrink-0"
                                  style={{ backgroundColor: item.color }}
                                ></span>
                                <span className="font-semibold text-slate-700">{item.name}</span>
                              </div>
                              <span className="font-bold text-slate-900 font-mono">{item.percentage}%</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Mentorship 40% &bull; Sabbaticals 30%</span>
                    <span className="text-blue-600 font-bold">100% Balanced</span>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 02: STUDENTS                                             */}
          {/* ============================================================ */}
          {activeTab === 'students' && (
            <div className="space-y-4">
              
              {/* Sub-tabs: [ Industry Assessments ] vs [ Skill Gap Heatmap ] */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStudentSubTab('assessments')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    studentSubTab === 'assessments'
                      ? 'bg-blue-600 text-white shadow-xs font-black'
                      : 'border border-slate-300 text-slate-700 bg-white hover:bg-slate-50'
                  }`}
                >
                  Industry Assessments
                </button>

                <button
                  type="button"
                  onClick={() => setStudentSubTab('heatmap')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    studentSubTab === 'heatmap'
                      ? 'bg-blue-600 text-white shadow-xs font-black'
                      : 'border border-slate-300 text-slate-700 bg-white hover:bg-slate-50'
                  }`}
                >
                  Skill Gap Heatmap
                </button>
              </div>

              {/* View 1: Industry Assessments */}
              {studentSubTab === 'assessments' && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 font-['Outfit']">
                        Corporate Assessment Blueprints
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Industry-certified testing frameworks for mentee evaluation
                      </p>
                    </div>
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                      3 Blueprints
                    </span>
                  </div>

                  <div className="space-y-3">
                    {blueprints.map((bp) => (
                      <div
                        key={bp.id}
                        className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-extrabold uppercase bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                              {bp.provider}
                            </span>
                            <span className="text-xs font-bold text-slate-900">{bp.title}</span>
                          </div>
                          <div className="text-xs text-slate-500 flex items-center gap-2 flex-wrap">
                            <span>Skills: <strong>{bp.skills}</strong></span>
                            <span>•</span>
                            <span>Threshold: <strong>{bp.threshold}%</strong></span>
                            <span>•</span>
                            <span>Duration: {bp.duration}</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleAssignBlueprint(bp.id)}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
                            bp.assigned
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-2xs'
                          }`}
                        >
                          {bp.assigned ? 'Assigned ✓' : 'Assign to Students'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* View 2: Skill Gap Heatmap */}
              {studentSubTab === 'heatmap' && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-blue-600" />
                        <h3 className="text-base font-bold text-slate-900 font-['Outfit']">
                          Student Skill Gap Heatmap
                        </h3>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Interactive workflow: Recommend courses, assign projects, and endorse
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] font-bold">
                      <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Verified
                      </span>
                      <span className="flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        In-Progress
                      </span>
                      <span className="flex items-center gap-1 text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                        Gap
                      </span>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                          <th className="py-2.5 px-3">Scholar</th>
                          <th className="py-2.5 px-3 text-center">Core CS</th>
                          <th className="py-2.5 px-3 text-center">Cloud</th>
                          <th className="py-2.5 px-3 text-center">AI / ML</th>
                          <th className="py-2.5 px-3 text-center">Readiness</th>
                          <th className="py-2.5 px-3 text-right">Intervention Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {students.map((s) => (
                          <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-3 px-3">
                              <div>
                                <div className="font-bold text-slate-900">{s.name}</div>
                                <div className="text-[10px] text-slate-400 font-mono">{s.rollNo}</div>
                                {(s.recommendedCourse || s.assignedProject) && (
                                  <div className="flex items-center gap-1 mt-1 flex-wrap">
                                    {s.recommendedCourse && (
                                      <span className="text-[9px] font-bold bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-200">
                                        Course Added ✓
                                      </span>
                                    )}
                                    {s.assignedProject && (
                                      <span className="text-[9px] font-bold bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded border border-purple-200">
                                        Project Active ✓
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                            </td>

                            <td className="py-3 px-3 text-center">{renderSkillDot(s.coreCS)}</td>
                            <td className="py-3 px-3 text-center">{renderSkillDot(s.cloud)}</td>
                            <td className="py-3 px-3 text-center">{renderSkillDot(s.ai)}</td>

                            <td className="py-3 px-3 text-center">
                              <div className="font-black font-mono text-slate-900">{s.score}%</div>
                              {s.endorsed ? (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 mt-0.5">
                                  <Check className="w-2.5 h-2.5" /> Verified ✓
                                </span>
                              ) : (
                                <span className="text-[10px] text-slate-400 font-medium">Pending</span>
                              )}
                            </td>

                            <td className="py-3 px-3 text-right">
                              <div className="flex items-center justify-end gap-1.5 flex-wrap">
                                {/* Recommend Course */}
                                <button
                                  type="button"
                                  onClick={() => handleRecommendCourse(s.id, s.name)}
                                  className={`px-2 py-1 rounded text-[11px] font-bold cursor-pointer inline-flex items-center gap-1 transition-all ${
                                    s.recommendedCourse
                                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                  }`}
                                >
                                  <BookOpen className="w-3 h-3 text-blue-600" />
                                  <span>{s.recommendedCourse ? 'Course Added ✓' : 'Recommend Course'}</span>
                                </button>

                                {/* Assign Live Project */}
                                <button
                                  type="button"
                                  onClick={() => handleAssignProject(s.id, s.name)}
                                  className={`px-2 py-1 rounded text-[11px] font-bold cursor-pointer inline-flex items-center gap-1 transition-all ${
                                    s.assignedProject
                                      ? 'bg-purple-50 text-purple-700 border border-purple-200'
                                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                  }`}
                                >
                                  <FolderGit2 className="w-3 h-3 text-purple-600" />
                                  <span>{s.assignedProject ? 'Project Active ✓' : 'Assign Live Project'}</span>
                                </button>

                                {/* Endorse Button */}
                                <button
                                  type="button"
                                  onClick={() => handleToggleEndorse(s.id, s.name)}
                                  className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer inline-flex items-center gap-1 ${
                                    s.endorsed
                                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                                  }`}
                                >
                                  {s.endorsed ? (
                                    <>
                                      <Check className="w-3 h-3 text-emerald-600" />
                                      <span>Endorsed ✓</span>
                                    </>
                                  ) : (
                                    <span>Endorse</span>
                                  )}
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

            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 03: UPSKILLING                                           */}
          {/* ============================================================ */}
          {activeTab === 'upskilling' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-['Outfit']">
                    Short-Term Faculty Internships &amp; Sabbaticals
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    SIH faculty exposure mandate: Residencies hosted by corporate partners
                  </p>
                </div>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                  Open Opportunities
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {sabbaticals.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <span className="text-[10px] font-extrabold uppercase bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                        {item.host}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm mt-2">{item.title}</h4>
                      <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                          {item.duration}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          {item.tag}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                          {item.deadline}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60">
                      <button
                        type="button"
                        disabled={item.applied}
                        onClick={() => handleOpenSabbaticalModal(item)}
                        className={`w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                          item.applied
                            ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-2xs'
                        }`}
                      >
                        {item.applied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Applied ✓</span>
                          </>
                        ) : (
                          'Apply for Sabbatical'
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 04: CONSULTANCY                                          */}
          {/* ============================================================ */}
          {activeTab === 'consultancy' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-['Outfit']">
                    Industry-Sponsored R&amp;D Problem Statements
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    SIH corporate collaboration mandate: Active problems with allocated budgets
                  </p>
                </div>
                <span className="text-xs font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                  ₹18.7L Pipeline
                </span>
              </div>

              <div className="space-y-3">
                {problems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase bg-purple-50 text-purple-700 px-2 py-0.5 rounded">
                          {item.partner}
                        </span>
                        <span className="text-xs font-bold text-slate-900">{item.title}</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                        <span className="font-bold text-emerald-600">{item.grant}</span>
                        <span>•</span>
                        <span>{item.duration}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={item.submitted}
                      onClick={() => handleOpenProposalModal(item)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                        item.submitted
                          ? 'bg-amber-50 text-amber-800 border border-amber-200 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-2xs'
                      }`}
                    >
                      {item.submitted ? (
                        <>
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          <span>Proposal Under Review</span>
                        </>
                      ) : (
                        'Submit Proposal'
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 05: REPORTS                                              */}
          {/* ============================================================ */}
          {activeTab === 'reports' && (
            <div className="space-y-5">
              
              {/* Macro Analytics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Placement Readiness</div>
                  <div className="text-2xl font-black text-slate-900 font-['Outfit'] mt-1">86.4%</div>
                  <div className="text-xs text-emerald-600 font-semibold mt-0.5">+4.2% Delta vs Baseline</div>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Curriculum Alignment</div>
                  <div className="text-2xl font-black text-blue-600 font-['Outfit'] mt-1">91.2%</div>
                  <div className="text-xs text-slate-500 font-semibold mt-0.5">Accreditation Ready</div>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Partner Index</div>
                  <div className="text-2xl font-black text-amber-500 font-['Outfit'] mt-1">84.0%</div>
                  <div className="text-xs text-emerald-600 font-semibold mt-0.5">Top Decile Ranking</div>
                </div>
              </div>

              {/* Report Dispatcher Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 font-['Outfit']">
                      Institution-Level Decision Reports
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                      <span>Handwritten institution workflow: Dispatch automated placement readiness intelligence</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-blue-700 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                        Last synced: {lastSyncTime}
                      </span>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleDispatchReport}
                    disabled={dispatchState === 'loading'}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer ${
                      dispatchState === 'dispatched'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                    }`}
                  >
                    {dispatchState === 'loading' ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                        <span>Dispatching...</span>
                      </>
                    ) : dispatchState === 'dispatched' ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Dispatched to Institution Admin ✓</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Dispatch Report to Institution</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Track 1: Core Engineering</span>
                    <div className="flex justify-between font-bold">
                      <span>Systems &amp; Architecture</span>
                      <span className="text-blue-600">92% Match</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Track 2: Cloud Systems</span>
                    <div className="flex justify-between font-bold">
                      <span>Distributed Infrastructure</span>
                      <span className="text-blue-600">84% Match</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: '84%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 06: COLLAB HUB                                             */}
          {/* ============================================================ */}
          {activeTab === 'collaboration' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
              <FacultyCollaborationHub />
            </div>
          )}

        </main>
      </div>

      {/* ============================================================ */}
      {/* 3. INTERACTIVE MODAL 1: Sabbatical / FDP Application Modal     */}
      {/* ============================================================ */}
      {selectedSabbatical && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                    {selectedSabbatical.host}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">{selectedSabbatical.duration}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 font-['Outfit'] mt-1">
                  Application for {selectedSabbatical.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSabbatical(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Field 1: Faculty Designation / Department */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Faculty Designation / Department
                </label>
                <input
                  type="text"
                  value={appDesignation}
                  onChange={(e) => setAppDesignation(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                  placeholder="e.g. Associate Professor / Dept. of Information Technology"
                />
              </div>

              {/* Field 2: Area of Expertise */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Area of Expertise / Relevant Experience
                </label>
                <textarea
                  rows={2}
                  value={appExpertise}
                  onChange={(e) => setAppExpertise(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 resize-none"
                  placeholder="Summarize your primary domains and lab experience..."
                />
              </div>

              {/* Field 3: Resume / CV Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Resume / Curriculum Vitae Upload
                </label>
                <input
                  type="file"
                  ref={resumeInputRef}
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setResumeFileName(e.target.files[0].name);
                      setResumeFileSize(`${(e.target.files[0].size / (1024 * 1024)).toFixed(1)} MB`);
                    }
                  }}
                />
                {resumeFileName ? (
                  <div className="p-3 rounded-xl border border-blue-200 bg-blue-50/50 flex items-center justify-between">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <p className="text-xs font-bold text-slate-800 truncate">{resumeFileName}</p>
                        <p className="text-[10px] text-slate-500">{resumeFileSize} • PDF Document</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                        <Check className="w-2.5 h-2.5" /> Attached
                      </span>
                      <button
                        type="button"
                        onClick={() => resumeInputRef.current?.click()}
                        className="text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer underline ml-1"
                      >
                        Change
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => resumeInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-blue-500 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <UploadCloud className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                    <p className="text-xs font-bold text-slate-700">Click or drag &amp; drop your CV here</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Supports PDF or DOCX up to 10MB</p>
                  </div>
                )}
              </div>

              {/* Field 4: Statement of Purpose */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Statement of Purpose <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={2}
                  value={appSop}
                  onChange={(e) => setAppSop(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 resize-none"
                  placeholder="Brief motivation or objectives for this industrial sabbatical..."
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-2.5">
              <button
                type="button"
                disabled={isSubmittingApp}
                onClick={() => setSelectedSabbatical(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isSubmittingApp}
                onClick={handleSubmitApplication}
                className="px-5 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {isSubmittingApp ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Submit Application</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 4. INTERACTIVE MODAL 2: Consultancy Proposal Modal            */}
      {/* ============================================================ */}
      {selectedProblem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                    {selectedProblem.partner}
                  </span>
                  <span className="text-xs text-emerald-700 font-bold">{selectedProblem.grant}</span>
                  <span className="text-xs text-slate-400">• {selectedProblem.duration}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 font-['Outfit'] mt-1">
                  Submit Proposal: {selectedProblem.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProblem(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Field 1: Principal Investigator */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Principal Investigator / Department
                </label>
                <input
                  type="text"
                  value={propPi}
                  onChange={(e) => setPropPi(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                  placeholder="Lead Researcher Designation"
                />
              </div>

              {/* Field 2: Research Abstract */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Research Abstract &amp; Technical Approach
                </label>
                <textarea
                  rows={2}
                  value={propAbstract}
                  onChange={(e) => setPropAbstract(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 resize-none"
                  placeholder="Detail mathematical formulation, testing methodologies, and milestones..."
                />
              </div>

              {/* Field 3: Research Abstract & Budget Attachment */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Upload Research Abstract &amp; Budget
                </label>
                <input
                  type="file"
                  ref={propInputRef}
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setPropFileName(e.target.files[0].name);
                      setPropFileSize(`${(e.target.files[0].size / (1024 * 1024)).toFixed(1)} MB`);
                    }
                  }}
                />
                {propFileName ? (
                  <div className="p-3 rounded-xl border border-purple-200 bg-purple-50/40 flex items-center justify-between">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                        <Paperclip className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <p className="text-xs font-bold text-slate-800 truncate">{propFileName}</p>
                        <p className="text-[10px] text-slate-500">{propFileSize} • Research Abstract &amp; Budget Plan</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                        <Check className="w-2.5 h-2.5" /> Attached
                      </span>
                      <button
                        type="button"
                        onClick={() => propInputRef.current?.click()}
                        className="text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer underline ml-1"
                      >
                        Change
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => propInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-purple-500 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <UploadCloud className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                    <p className="text-xs font-bold text-slate-700">Click to upload Research Abstract &amp; Budget</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">PDF format required</p>
                  </div>
                )}
              </div>

              {/* Field 4: Budget Breakdown Summary */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Budget Allocation Summary
                </label>
                <input
                  type="text"
                  value={propBudget}
                  onChange={(e) => setPropBudget(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                  placeholder="e.g. ₹2.5L Research Personnel + ₹1.5L Compute..."
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-2.5">
              <button
                type="button"
                disabled={isSubmittingProp}
                onClick={() => setSelectedProblem(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isSubmittingProp}
                onClick={handleSubmitProposalAction}
                className="px-5 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {isSubmittingProp ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                    <span>Submitting Proposal...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Submit Proposal</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademiaDashboard;
