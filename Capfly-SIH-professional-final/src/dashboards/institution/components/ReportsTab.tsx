import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Filter, 
  Search, 
  Calendar, 
  CheckCircle2, 
  FileSpreadsheet, 
  ShieldCheck, 
  Clock, 
  Layers, 
  TrendingUp, 
  Share2, 
  Printer, 
  Eye, 
  Plus, 
  X, 
  AlertCircle, 
  Sparkles, 
  Check, 
  Building2, 
  Award,
  ChevronRight,
  Database,
  Send,
  SlidersHorizontal,
  FileCheck,
  Zap,
  Flame,
  ArrowUpRight,
  BarChart3,
  PieChart,
  RefreshCw,
  FolderDown
} from 'lucide-react';
import { 
  RadarWebChart, 
  DonutChart, 
  KPICard, 
  VerticalBarChart, 
  SemiCircleGauge,
  MultiSegmentProgressBar 
} from './ChartUtils';
import { InstitutionExportModal } from './InstitutionExportModal';

interface ReportModule {
  id: string;
  title: string;
  category: 'NAAC / NIRF' | 'Placements & CTC' | 'Academic & Attendance' | 'Faculty & Research' | 'Industry & MoUs';
  categoryColor: string;
  desc: string;
  complianceCode: string;
  version: string;
  fileSize: string;
  lastGenerated: string;
  recordsCount: number;
  tags: string[];
  metrics: { label: string; value: string; color: string }[];
  sampleColumns: string[];
  sampleRows: (string | number)[][];
}

const reportModules: ReportModule[] = [
  {
    id: 'rep-naac-c35',
    title: 'NAAC Criteria 3 & 5 Statutory Dossier',
    category: 'NAAC / NIRF',
    categoryColor: 'from-emerald-500 to-teal-600',
    desc: 'Official institutional compliance audit for Criterion 3 (Research, Innovations & Extension) and Criterion 5 (Student Support & Progression) with digital cryptographic validation stamps.',
    complianceCode: 'NAAC AQAR 2025-26',
    version: 'v4.2 Audited',
    fileSize: '5.2 MB (PDF + XLSX)',
    lastGenerated: '10 mins ago',
    recordsCount: 3842,
    tags: ['A++ Readiness', 'Research Grants', 'Student Welfare', 'IQAC Audit'],
    metrics: [
      { label: 'Attainment', value: '98.4%', color: 'text-emerald-600' },
      { label: 'Grants Logged', value: '₹ 148.5 L', color: 'text-indigo-600' },
      { label: 'Scholarships', value: '520 Students', color: 'text-purple-600' }
    ],
    sampleColumns: ['Criterion Metric', 'Key Parameter', 'Target Benchmark', 'Institutional Attainment', 'Audit Status'],
    sampleRows: [
      ['3.1.1', 'Resource Mobilization for Research', '₹ 120.0 Lakhs', '₹ 148.50 Lakhs (123.7%)', 'Verified ✓'],
      ['3.2.2', 'Seminars/Workshops on Research & IPR', '20 Events', '28 Conducted (140.0%)', 'Verified ✓'],
      ['3.3.1', 'Ethics & Anti-Plagiarism Protocol', '100% Turnitin Verified', '100% Compliant', 'Verified ✓'],
      ['5.1.1', 'Government & Institutional Free-ships', '400 Beneficiaries', '520 Beneficiaries (130%)', 'Verified ✓'],
      ['5.2.1', 'Placement & Progression of Graduates', '85.0%', '94.8% Placed', 'Verified ✓'],
      ['5.3.1', 'National Level Sports / Cultural Medals', '25 Medals', '42 Medals Won', 'Verified ✓']
    ]
  },
  {
    id: 'rep-nirf-dcs',
    title: 'NIRF Data Capturing System (DCS) Engineering',
    category: 'NAAC / NIRF',
    categoryColor: 'from-emerald-500 to-teal-600',
    desc: 'Full NIRF Engineering Ranking parameter dossier encompassing TLR (Teaching, Learning & Resources), RPC (Research & Professional Practice), GO (Graduation Outcomes), and Outreach.',
    complianceCode: 'NIRF 2025 Submission',
    version: 'v2.1 Verified',
    fileSize: '6.8 MB (XLSX Bundle)',
    lastGenerated: 'Yesterday, 04:30 PM',
    recordsCount: 4250,
    tags: ['NIRF Top 50', 'TLR Score', 'RPC Index', 'Graduation Rate'],
    metrics: [
      { label: 'Overall Score', value: '77.2 / 100', color: 'text-emerald-600' },
      { label: 'Graduation Outcome', value: '88.6 / 100', color: 'text-indigo-600' },
      { label: 'Faculty Quality', value: '78.4 / 100', color: 'text-purple-600' }
    ],
    sampleColumns: ['Ranking Domain', 'Weightage', 'Actual Score / Value', 'National Benchmark Range', 'Status'],
    sampleRows: [
      ['Teaching, Learning & Resources (TLR)', '100 pts', '78.4 / 100', 'Top 50 Institute Tier', 'Validated ✓'],
      ['Research & Professional Practice (RPC)', '100 pts', '69.2 / 100', 'Top 60 Institute Tier', 'Validated ✓'],
      ['Graduation Outcome (GO)', '100 pts', '88.6 / 100', 'Top 30 Institute Tier', 'Validated ✓'],
      ['Outreach & Inclusivity (OI)', '100 pts', '74.1 / 100', 'Top 45 Institute Tier', 'Validated ✓'],
      ['Perception & Peer Reputation (PR)', '100 pts', '65.8 / 100', 'Top 70 Institute Tier', 'Validated ✓']
    ]
  },
  {
    id: 'rep-place-funnel',
    title: 'Placement & Salary Package Funnel Dossier',
    category: 'Placements & CTC',
    categoryColor: 'from-indigo-600 to-blue-600',
    desc: 'Comprehensive campus placement analytics: CTC salary brackets (Highest ₹28 LPA, Average ₹8.24 LPA), tier-1 product recruiters, PPO conversion rates, and department offer distribution.',
    complianceCode: 'T&P Statutory Filing',
    version: '2025 Batch Live',
    fileSize: '3.9 MB (PDF / CSV)',
    lastGenerated: 'Today, 11:20 AM',
    recordsCount: 912,
    tags: ['Highest ₹28 LPA', 'Avg ₹8.24 LPA', '94.8% Placed', 'Tier-1 Recruiters'],
    metrics: [
      { label: 'Placement Rate', value: '94.8%', color: 'text-emerald-600' },
      { label: 'Highest CTC', value: '₹ 28.0 LPA', color: 'text-indigo-600' },
      { label: 'Average CTC', value: '₹ 8.24 LPA', color: 'text-purple-600' }
    ],
    sampleColumns: ['Package Tier', 'Total Offers', 'Highest CTC', 'Average CTC', 'Lead Recruiters'],
    sampleRows: [
      ['Super Dream (> ₹15 LPA)', '68 Offers', '₹ 28.00 LPA', '₹ 18.50 LPA', 'Amazon AWS, Microsoft, Google'],
      ['Dream (₹8 - ₹15 LPA)', '240 Offers', '₹ 14.50 LPA', '₹ 10.20 LPA', 'Oracle, Cisco, Qualcomm, Intel'],
      ['Core Engineering (₹6 - ₹10 LPA)', '310 Offers', '₹ 9.80 LPA', '₹ 7.40 LPA', 'L&T, Tata Motors, Bosch, Siemens'],
      ['Mass IT / Services (₹4 - ₹6 LPA)', '246 Offers', '₹ 5.50 LPA', '₹ 4.80 LPA', 'TCS Digital, Infosys, Cognizant'],
      ['Total Placement Roster', '864 Placed', '₹ 28.00 LPA', '₹ 8.24 LPA', '94.8% Cohort Clearance Rate']
    ]
  },
  {
    id: 'rep-intern-telemetry',
    title: 'Corporate Internship Telemetry & Stipend Audit',
    category: 'Industry & MoUs',
    categoryColor: 'from-purple-600 to-pink-600',
    desc: 'Audit ledger of 6-month full-time & summer internships, industrial mentor telemetry, weekly progress evaluations, and aggregate student stipend mobilization (₹ 42.8 Lakhs total).',
    complianceCode: 'AICTE Internship Policy v2.4',
    version: 'Active Roster',
    fileSize: '3.2 MB (CSV / PDF)',
    lastGenerated: '10 Sep 2026, 03:15 PM',
    recordsCount: 840,
    tags: ['₹42.8L Stipend', 'PPO Rate: 44%', 'AICTE Compliant', '840 Interns'],
    metrics: [
      { label: 'Active Interns', value: '840 Students', color: 'text-indigo-600' },
      { label: 'PPO Pre-Offers', value: '340 Offers', color: 'text-emerald-600' },
      { label: 'Avg Stipend', value: '₹ 28.5k / mo', color: 'text-purple-600' }
    ],
    sampleColumns: ['Department', 'Interns Placed', 'Average Monthly Stipend', 'PPO Conversions', 'Corporate Partners'],
    sampleRows: [
      ['Computer Science & Engg', '280 Students', '₹ 38,500 / mo', '142 PPOs (50.7%)', 'Google, Amazon, TCS Innovation Labs'],
      ['Electronics & Comm Engg', '210 Students', '₹ 28,000 / mo', '86 PPOs (41.0%)', 'Texas Instruments, Intel, Qualcomm'],
      ['Electrical & Electronics', '140 Students', '₹ 22,000 / mo', '48 PPOs (34.3%)', 'ABB, Schneider Electric, Siemens'],
      ['Mechanical Engineering', '135 Students', '₹ 20,000 / mo', '42 PPOs (31.1%)', 'Tata Motors, Mahindra EV, Bosch'],
      ['Civil Engineering', '75 Students', '₹ 18,000 / mo', '22 PPOs (29.3%)', 'L&T Construction, DLF, Shapoorji']
    ]
  },
  {
    id: 'rep-mou-engagement',
    title: 'Corporate MoUs & Joint CoE Collaboration Ledger',
    category: 'Industry & MoUs',
    categoryColor: 'from-purple-600 to-pink-600',
    desc: 'Comprehensive audit of 42 active industry MoUs, corporate Centre of Excellence (CoE) infrastructure funding, industrial expert guest lectures, and joint patent filings.',
    complianceCode: 'Industry-Academia Board',
    version: '42 Active MoUs',
    fileSize: '5.8 MB (PDF Dossier)',
    lastGenerated: '08 Sep 2026, 02:40 PM',
    recordsCount: 42,
    tags: ['₹1.85 Cr CoE Grants', '42 MoUs', '28 Joint Patents', 'Faculty Immersion'],
    metrics: [
      { label: 'Active MoUs', value: '42 Corporate', color: 'text-purple-600' },
      { label: 'CoE Funding', value: '₹ 1.85 Cr', color: 'text-emerald-600' },
      { label: 'Joint Patents', value: '28 Filed', color: 'text-indigo-600' }
    ],
    sampleColumns: ['Partner Enterprise', 'Collaboration Focus', 'MoU Tenancy', 'Joint CoE Capital', 'Status'],
    sampleRows: [
      ['Tata Consultancy Services', 'Cloud & Cognitive Computing Lab', '2023 - 2026 (3 Yrs)', '₹ 45.0 Lakhs', 'Active ✓'],
      ['Bosch India Ltd', 'Automotive Embedded Systems', '2023 - 2026 (3 Yrs)', '₹ 38.0 Lakhs', 'Active ✓'],
      ['Texas Instruments', 'Analog & VLSI Design Center', '2024 - 2027 (3 Yrs)', '₹ 52.0 Lakhs', 'Active ✓'],
      ['Amazon Web Services', 'Cloud Architecture Academy', '2024 - 2027 (3 Yrs)', '₹ 30.0 Lakhs', 'Active ✓'],
      ['L&T Construction', 'Smart Sustainable Infrastructure', '2022 - 2025 (3 Yrs)', '₹ 25.0 Lakhs', 'Expiring Soon ⚠️']
    ]
  },
  {
    id: 'rep-acad-attendance',
    title: 'Campus Academic CGPA & Biometric Attendance Audit',
    category: 'Academic & Attendance',
    categoryColor: 'from-amber-500 to-orange-600',
    desc: 'Institutional SGPA/CGPA grade distribution, semester pass rate benchmarks, backlog registers, and biometric attendance shortage debars below statutory 75% threshold.',
    complianceCode: 'University Academic Council',
    version: 'Current Semester',
    fileSize: '4.5 MB (XLSX / PDF)',
    lastGenerated: '07 Sep 2026, 10:00 AM',
    recordsCount: 3842,
    tags: ['8.34 Avg CGPA', '96.8% Pass Rate', '18 Shortage Debars', '3,842 Students'],
    metrics: [
      { label: 'Campus Pass Rate', value: '96.8%', color: 'text-emerald-600' },
      { label: 'Avg CGPA', value: '8.34 / 10', color: 'text-indigo-600' },
      { label: 'Debar Alerts', value: '18 Students', color: 'text-rose-600' }
    ],
    sampleColumns: ['Department', 'Enrolled Strength', 'Pass Percentage', 'Average CGPA', 'Shortage Debars (<75%)'],
    sampleRows: [
      ['Computer Science & Engg', '1,120 Students', '98.2%', '8.42 / 10', '4 Students (0.35%)'],
      ['Electronics & Comm Engg', '940 Students', '96.5%', '8.18 / 10', '5 Students (0.53%)'],
      ['Electrical & Electronics', '680 Students', '95.1%', '7.95 / 10', '3 Students (0.44%)'],
      ['Mechanical Engineering', '650 Students', '94.8%', '7.82 / 10', '4 Students (0.61%)'],
      ['Civil Engineering', '452 Students', '93.6%', '7.74 / 10', '2 Students (0.44%)']
    ]
  },
  {
    id: 'rep-fac-research',
    title: 'Faculty Scholarship, SCI Publications & Patent Dossier',
    category: 'Faculty & Research',
    categoryColor: 'from-cyan-600 to-blue-700',
    desc: 'Indexed faculty scholarship ledger containing SCI/Scopus journal publications, IEEE conference proceedings, granted/published patents, and extramural research grants.',
    complianceCode: 'R&D Cell Annual Ledger',
    version: '2025-26 Annual',
    fileSize: '4.1 MB (PDF + BibTeX)',
    lastGenerated: '05 Sep 2026, 05:15 PM',
    recordsCount: 264,
    tags: ['398 Scopus Papers', '56 Patents', '₹1.90 Cr Grants', '74.2% PhDs'],
    metrics: [
      { label: 'Scopus Papers', value: '398 Papers', color: 'text-indigo-600' },
      { label: 'Patents Filed', value: '56 Patents', color: 'text-emerald-600' },
      { label: 'Research Grants', value: '₹ 1.90 Cr', color: 'text-purple-600' }
    ],
    sampleColumns: ['Department', 'Faculty Count', 'Scopus Papers', 'Patents Filed (Granted)', 'Extramural Grants'],
    sampleRows: [
      ['Computer Science & Engg', '78 Faculty', '142 Papers', '18 Filed (6 Granted)', '₹ 68.5 Lakhs (SERB / DST)'],
      ['Electronics & Comm Engg', '64 Faculty', '98 Papers', '14 Filed (4 Granted)', '₹ 45.2 Lakhs (DRDO / ISRO)'],
      ['Electrical & Electronics', '46 Faculty', '64 Papers', '8 Filed (2 Granted)', '₹ 32.0 Lakhs (MNRE)'],
      ['Mechanical Engineering', '44 Faculty', '58 Papers', '11 Filed (3 Granted)', '₹ 28.4 Lakhs (ARDB / DST)'],
      ['Civil Engineering', '32 Faculty', '36 Papers', '5 Filed (1 Granted)', '₹ 16.0 Lakhs (AICTE RPS)']
    ]
  },
  {
    id: 'rep-aicte-mandatory',
    title: 'AICTE Mandatory Annual Disclosure & Infrastructure Census',
    category: 'NAAC / NIRF',
    categoryColor: 'from-emerald-500 to-teal-600',
    desc: 'Standardized regulatory census covering faculty cadre ratios (1:14.5), laboratory equipment inventories, library volume indexes, high-speed leased bandwidth, and physical infrastructure.',
    complianceCode: 'AICTE Approval Handbook',
    version: 'Statutory 2025-26',
    fileSize: '8.4 MB (Full Dossier)',
    lastGenerated: '02 Sep 2026, 11:00 AM',
    recordsCount: 1,
    tags: ['AICTE 100% Compliant', '1:14.5 Ratio', '2.5 Gbps Fiber', '22,400 Sq.m'],
    metrics: [
      { label: 'Faculty Ratio', value: '1 : 14.5', color: 'text-emerald-600' },
      { label: 'Built-up Area', value: '22,400 Sq.m', color: 'text-indigo-600' },
      { label: 'Internet Bandwidth', value: '2.5 Gbps', color: 'text-purple-600' }
    ],
    sampleColumns: ['Infrastructure / Norm Parameter', 'AICTE Mandatory Benchmark', 'Institutional Attainment', 'Surplus / Margin', 'Status'],
    sampleRows: [
      ['Faculty-to-Student Ratio', '1 : 15 (UG Engg)', '1 : 14.5 Attained', '+0.5 Surplus Margin', 'Compliant ✓'],
      ['Faculty Cadre (Prof : Asso : Asst)', '1 : 2 : 6', '1 : 2.1 : 5.8', 'Balanced Cadre Distribution', 'Compliant ✓'],
      ['Instructional Built-up Area', '18,500 Sq. meters', '22,400 Sq. meters', '+3,900 Sq.m Surplus', 'Compliant ✓'],
      ['Digital Library E-Journals', '10,000+ Titles', '14,500 IEEE/Springer/ACM', '+4,500 Titles', 'Compliant ✓'],
      ['Campus Internet Fiber Bandwidth', '1.0 Gbps Dedicated', '2.5 Gbps Redundant Dual-Ring', '+1.5 Gbps Surplus', 'Compliant ✓']
    ]
  }
];

interface AuditTrail {
  id: string;
  reportTitle: string;
  category: string;
  requestedBy: string;
  generatedAt: string;
  format: 'PDF' | 'XLSX' | 'CSV';
  fileSize: string;
  status: 'Cryptographically Sealed' | 'Verified Ready';
}

const auditTrailRecords: AuditTrail[] = [
  {
    id: 'log-1',
    reportTitle: 'NAAC Criteria 3 & 5 Statutory Dossier',
    category: 'NAAC / NIRF',
    requestedBy: 'Dr. Principal Office',
    generatedAt: 'Today, 09:15 AM',
    format: 'PDF',
    fileSize: '5.2 MB',
    status: 'Cryptographically Sealed'
  },
  {
    id: 'log-2',
    reportTitle: 'NIRF Data Capturing System (DCS) Engineering',
    category: 'NAAC / NIRF',
    requestedBy: 'Director - IQAC Accreditation',
    generatedAt: 'Yesterday, 04:30 PM',
    format: 'XLSX',
    fileSize: '6.8 MB',
    status: 'Verified Ready'
  },
  {
    id: 'log-3',
    reportTitle: 'Placement & Salary Package Funnel Dossier',
    category: 'Placements & CTC',
    requestedBy: 'Head - Training & Placement Cell',
    generatedAt: '11 Sep 2026, 11:20 AM',
    format: 'PDF',
    fileSize: '3.9 MB',
    status: 'Cryptographically Sealed'
  },
  {
    id: 'log-4',
    reportTitle: 'Corporate Internship Telemetry & Stipend Audit',
    category: 'Industry & MoUs',
    requestedBy: 'Dean - Industry Collaborations',
    generatedAt: '10 Sep 2026, 03:15 PM',
    format: 'CSV',
    fileSize: '3.2 MB',
    status: 'Verified Ready'
  },
  {
    id: 'log-5',
    reportTitle: 'Campus Academic CGPA & Biometric Attendance Audit',
    category: 'Academic & Attendance',
    requestedBy: 'Dean - Academic Affairs',
    generatedAt: '08 Sep 2026, 02:40 PM',
    format: 'PDF',
    fileSize: '4.5 MB',
    status: 'Cryptographically Sealed'
  }
];

export const ReportsTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'All' | 'NAAC / NIRF' | 'Placements & CTC' | 'Academic & Attendance' | 'Faculty & Research' | 'Industry & MoUs'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('All');
  const [selectedYearFilter, setSelectedYearFilter] = useState('2025-2026');
  
  // Modals & Notifications
  const [previewReport, setPreviewReport] = useState<ReportModule | null>(null);
  const [showWizardModal, setShowWizardModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [toastNotice, setToastNotice] = useState<{ title: string; desc: string } | null>(null);

  // Custom Compiler State
  const [compilerTitle, setCompilerTitle] = useState('Comprehensive Annual Institutional Dossier');
  const [compilerCategory, setCompilerCategory] = useState('NAAC / NIRF');
  const [compilerFormat, setCompilerFormat] = useState('PDF');
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileProgress, setCompileProgress] = useState(0);

  const showToast = (title: string, desc: string) => {
    setToastNotice({ title, desc });
    setTimeout(() => setToastNotice(null), 4500);
  };

  const filteredReports = reportModules.filter(rep => {
    const matchesCategory = activeTab === 'All' || rep.category === activeTab;
    const matchesSearch = 
      rep.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rep.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rep.complianceCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rep.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const [showExportModal, setShowExportModal] = useState(false);
  const [pendingReport, setPendingReport] = useState<ReportModule | null>(null);

  const downloadReport = (report: ReportModule) => {
    setPendingReport(report);
    setShowExportModal(true);
  };

  const getReportExportConfig = (report: ReportModule) => ({
    filename: `${report.id}_data_export`,
    pdfLabel: `Official Audit Report & Dossier — ${report.title}`,
    csvData: `${report.sampleColumns.join(',')}\n${report.sampleRows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')}`,
  });

  const handleRunCompiler = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCompiling(true);
    setCompileProgress(15);
    const interval = setInterval(() => {
      setCompileProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          setTimeout(() => {
            setIsCompiling(false);
            setCompileProgress(0);
            setShowWizardModal(false);
            showToast("Custom Dossier Compiled", `Successfully generated "${compilerTitle}" in ${compilerFormat} format.`);
          }, 400);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto animate-in fade-in duration-300">
      {pendingReport && (
        <InstitutionExportModal
          isOpen={showExportModal}
          onClose={() => { setShowExportModal(false); setPendingReport(null); }}
          config={getReportExportConfig(pendingReport)}
          onToast={(msg) => showToast('Export Status', msg)}
        />
      )}
      {/* Toast Notification Alert */}
      {toastNotice && (
        <div className="fixed top-20 right-8 z-50 bg-slate-900/95 backdrop-blur-md text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3.5 border border-slate-700/80 animate-in slide-in-from-top-4 duration-300">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-sm text-white">{toastNotice.title}</p>
            <p className="text-xs text-slate-300 mt-0.5">{toastNotice.desc}</p>
          </div>
        </div>
      )}

      {/* Hero Header Card with Vibrant Gradient */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-8 text-white shadow-xl border border-slate-700/50">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none" />
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/30 shrink-0 font-bold">
              <FileSpreadsheet className="w-8 h-8 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="px-3 py-0.5 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-emerald-400" /> Statutory Intelligence Suite
                </span>
                <span className="text-xs text-slate-400">• NAAC A++ &amp; NIRF Ready</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white">
                Institutional Reports &amp; Compliance Hub
              </h1>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                Automated NAAC Criteria audits, NIRF DCS extractions, placement salary funnels, biometric attendance logs, and multi-format cryptographic dossiers.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowScheduleModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-xl transition border border-white/10 backdrop-blur-sm cursor-pointer"
            >
              <Clock className="w-4 h-4 text-emerald-400" />
              Automated Crons (3)
            </button>
            <button
              onClick={() => setShowWizardModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-sm font-bold rounded-xl transition shadow-lg shadow-emerald-500/30 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-slate-950" />
              Compile Custom Dossier
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Row with Vivid Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard
          title="Total Reports Generated"
          value="1,420 Reports"
          subtitle="Across 8 Statutory Frameworks"
          trend={{ value: 18.4, isPositive: true }}
          color="emerald"
          icon={<FileText className="w-5 h-5 text-emerald-600" />}
        />
        <KPICard
          title="NAAC Compliance Readiness"
          value="98.4% Ready"
          subtitle="Criteria 1-7 Audit Validated"
          trend={{ value: 2.1, isPositive: true }}
          color="indigo"
          icon={<ShieldCheck className="w-5 h-5 text-indigo-600" />}
        />
        <KPICard
          title="Placement & CTC Dossier"
          value="94.8% Placed"
          subtitle="Highest ₹28 LPA • Avg ₹8.24 LPA"
          trend={{ value: 5.6, isPositive: true }}
          color="purple"
          icon={<Award className="w-5 h-5 text-purple-600" />}
        />
        <KPICard
          title="Scheduled Auto-Dispatches"
          value="12 Active Crons"
          subtitle="Automated Leadership Digests"
          trend={{ value: 4.0, isPositive: true }}
          color="amber"
          icon={<Clock className="w-5 h-5 text-amber-600" />}
        />
      </div>

      {/* Analytics Visualizers Row: 2 Big Beautiful Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: NAAC 7-Criteria Compliance Spider Web */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                  Accreditation Matrix
                </span>
                <h3 className="font-extrabold text-slate-900 text-lg mt-1">NAAC 7-Criteria Compliance Radar</h3>
                <p className="text-xs text-slate-500">Statutory institutional readiness benchmarked against A++ grade standards</p>
              </div>
              <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-extrabold rounded-xl shadow-sm">
                A++ Projection
              </span>
            </div>
            <div className="py-2">
              <RadarWebChart
                data={[
                  { subject: 'C1: Curricular (96%)', value: 96 },
                  { subject: 'C2: Teaching (98%)', value: 98 },
                  { subject: 'C3: Research (92%)', value: 92 },
                  { subject: 'C4: Infra (95%)', value: 95 },
                  { subject: 'C5: Student Welfare (99%)', value: 99 },
                  { subject: 'C6: Governance (94%)', value: 94 }
                ]}
                color="#059669"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-slate-100 text-center text-xs">
            <div className="p-3 bg-slate-50 rounded-2xl">
              <p className="text-slate-400 font-medium">Research Grants</p>
              <p className="font-extrabold text-slate-900 text-sm mt-0.5">₹ 148.5 L</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100/50">
              <p className="text-emerald-700 font-medium">Avg CGPA</p>
              <p className="font-extrabold text-emerald-900 text-sm mt-0.5">8.34 / 10</p>
            </div>
            <div className="p-3 bg-indigo-50 rounded-2xl border border-indigo-100/50">
              <p className="text-indigo-700 font-medium">Faculty PhDs</p>
              <p className="font-extrabold text-indigo-900 text-sm mt-0.5">74.2%</p>
            </div>
          </div>
        </div>

        {/* Right: Report Generation by Category Share */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                  Data Telemetry
                </span>
                <h3 className="font-extrabold text-slate-900 text-lg mt-1">Export Generation by Domain Share</h3>
                <p className="text-xs text-slate-500">Distribution of administrative and academic report compilations</p>
              </div>
              <span className="text-xs font-extrabold text-slate-700 bg-slate-100 px-3 py-1 rounded-xl">
                1,420 Exports
              </span>
            </div>
            <div className="py-2">
              <DonutChart
                data={[
                  { label: 'Placement & Internships', value: 497, color: '#6366f1' },
                  { label: 'NAAC & NIRF Rankings', value: 398, color: '#059669' },
                  { label: 'Academic & Attendance', value: 284, color: '#8b5cf6' },
                  { label: 'Corporate MoUs & CSR', value: 241, color: '#f59e0b' }
                ]}
                centerLabel="1,420"
                centerSublabel="Total Reports"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 text-xs">
            <div className="p-3 bg-indigo-50/70 rounded-2xl border border-indigo-100/50 flex items-center justify-between">
              <div>
                <p className="text-indigo-600 font-semibold">Highest Demand</p>
                <p className="font-bold text-indigo-950 text-sm">Placement Funnels (35%)</p>
              </div>
              <Flame className="w-5 h-5 text-indigo-500" />
            </div>
            <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-100/50 flex items-center justify-between">
              <div>
                <p className="text-emerald-600 font-semibold">Fastest Growing</p>
                <p className="font-bold text-emerald-950 text-sm">NAAC AQAR Audits (+34%)</p>
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Control Panel: Category Buttons & Dynamic Filters */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-4">
        {/* Category Pills with Glowing Highlights */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {(['All', 'NAAC / NIRF', 'Placements & CTC', 'Academic & Attendance', 'Faculty & Research', 'Industry & MoUs'] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-[1.02]'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {isActive && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                {tab === 'All' ? 'All Report Modules (8)' : tab}
              </button>
            );
          })}
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-100">
          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search reports by title, compliance code (e.g. NAAC, NIRF), or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-500">Department:</label>
              <select
                value={selectedDeptFilter}
                onChange={(e) => setSelectedDeptFilter(e.target.value)}
                className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none cursor-pointer focus:ring-2 focus:ring-emerald-500"
              >
                <option value="All">All Departments</option>
                <option value="CSE">Computer Science &amp; Engg</option>
                <option value="ECE">Electronics &amp; Comm Engg</option>
                <option value="EEE">Electrical &amp; Electronics</option>
                <option value="MECH">Mechanical Engineering</option>
                <option value="CIVIL">Civil Engineering</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-500">Academic Year:</label>
              <select
                value={selectedYearFilter}
                onChange={(e) => setSelectedYearFilter(e.target.value)}
                className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none cursor-pointer focus:ring-2 focus:ring-emerald-500"
              >
                <option value="2025-2026">2025 - 2026</option>
                <option value="2024-2025">2024 - 2025</option>
                <option value="2023-2024">2023 - 2024</option>
              </select>
            </div>

            <button
              onClick={() => showToast("Telemetry Refreshed", `Streamed verified data for ${selectedDeptFilter} (${selectedYearFilter})`)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-md shadow-emerald-600/20 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Fetch Data
            </button>
          </div>
        </div>
      </div>

      {/* Reports Catalog Grid with Rich Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">Official Compliance &amp; Telemetry Reports Catalog</h3>
            <p className="text-xs text-slate-500">Validated data packages ready for direct download, preview, and statutory submission</p>
          </div>
          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-xl">
            Showing {filteredReports.length} modules
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300 flex flex-col justify-between space-y-5 group"
            >
              <div className="space-y-3.5">
                {/* Header: Title & Code Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold rounded-md uppercase tracking-wider">
                        {report.complianceCode}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                        {report.version}
                      </span>
                    </div>
                    <h4 className="text-lg font-extrabold text-slate-900 group-hover:text-emerald-700 transition leading-snug">
                      {report.title}
                    </h4>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-100 whitespace-nowrap">
                    {report.fileSize}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {report.desc}
                </p>

                {/* Key Metrics Pill Grid */}
                <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50/80 rounded-2xl border border-slate-100/80 text-center">
                  {report.metrics.map((m, idx) => (
                    <div key={idx}>
                      <p className="text-[10px] text-slate-400 font-medium uppercase">{m.label}</p>
                      <p className={`text-xs font-extrabold mt-0.5 ${m.color}`}>{m.value}</p>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {report.tags.map((tag, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-semibold rounded-lg">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer: Timestamp & Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{report.lastGenerated}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPreviewReport(report)}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-500" /> Preview
                  </button>
                  <button
                    onClick={() => downloadReport(report)}
                    className="px-4 py-2 bg-slate-900 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-slate-900/10 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Download Report
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Historical Export Audit Trail */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">Recent Report Generation &amp; Export Audit Log</h3>
            <p className="text-xs text-slate-500">Cryptographically stamped immutable audit trail for compliance verification</p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 w-fit">
            Audit Trail Active ✓
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50/80 text-xs uppercase text-slate-400 font-bold border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5">Report Title</th>
                <th className="px-6 py-3.5">Category</th>
                <th className="px-6 py-3.5">Requested By</th>
                <th className="px-6 py-3.5">Timestamp</th>
                <th className="px-6 py-3.5">Format &amp; Size</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {auditTrailRecords.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition">
                  <td className="px-6 py-4 font-extrabold text-slate-900 text-xs">{log.reportTitle}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg">
                      {log.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-700 font-medium">{log.requestedBy}</td>
                  <td className="px-6 py-4 text-xs text-slate-500">{log.generatedAt}</td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-600">
                    <span className="font-bold text-emerald-600">{log.format}</span> • {log.fileSize}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-extrabold rounded-full border border-emerald-200">
                      <Check className="w-3 h-3 text-emerald-600" /> {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => showToast("Re-download Initiated", `Fetched "${log.reportTitle}" from secure cold storage.`)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" /> Re-Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Preview Modal */}
      {previewReport && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center font-bold">
                  <FileText className="w-6 h-6 text-slate-950" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded-md uppercase">
                      {previewReport.complianceCode}
                    </span>
                    <span className="text-xs font-bold text-slate-400">• {previewReport.category}</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-lg mt-0.5">{previewReport.title}</h3>
                </div>
              </div>
              <button
                onClick={() => setPreviewReport(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">{previewReport.desc}</p>

              {/* Sample Data Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-800">Verified Sample Records Preview</span>
                  <span className="text-[11px] text-slate-500 font-mono">Total {previewReport.recordsCount} Records Audited</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100/80 text-slate-700 font-extrabold border-b border-slate-200">
                      <tr>
                        {previewReport.sampleColumns.map((col, idx) => (
                          <th key={idx} className="px-4 py-3">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {previewReport.sampleRows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50/80 transition">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="px-4 py-3">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end gap-3 pt-3">
                <button
                  onClick={() => setPreviewReport(null)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  Close Preview
                </button>
                <button
                  onClick={() => {
                    downloadReport(previewReport);
                    setPreviewReport(null);
                  }}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-lg shadow-emerald-600/20 cursor-pointer"
                >
                  <Download className="w-4 h-4" /> Download Report
                </button>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Report Compiler Wizard Modal */}
      {showWizardModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900">Custom Dossier Compiler</h3>
                  <p className="text-xs text-slate-500">Synthesize multi-source campus data into sealed report</p>
                </div>
              </div>
              <button
                onClick={() => setShowWizardModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRunCompiler} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Dossier Title</label>
                <input
                  type="text"
                  required
                  value={compilerTitle}
                  onChange={(e) => setCompilerTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Framework</label>
                  <select
                    value={compilerCategory}
                    onChange={(e) => setCompilerCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="NAAC / NIRF">NAAC / NIRF Statutory</option>
                    <option value="Placements & CTC">Placements &amp; CTC Roster</option>
                    <option value="Academic & Attendance">Academic &amp; Attendance</option>
                    <option value="Faculty & Research">Faculty Research &amp; Patents</option>
                    <option value="Industry & MoUs">Industry MoUs &amp; Grants</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Export Format</label>
                  <select
                    value={compilerFormat}
                    onChange={(e) => setCompilerFormat(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="PDF">Cryptographic PDF (.pdf)</option>
                    <option value="XLSX">Excel Workbook (.xlsx)</option>
                    <option value="CSV">Raw CSV Archive (.csv)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Include Data Sub-Modules</label>
                <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <label className="flex items-center gap-2 cursor-pointer font-medium">
                    <input type="checkbox" defaultChecked className="rounded text-emerald-600 focus:ring-emerald-500" />
                    Student Digital Portfolios &amp; Cryptographic Badges
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-medium">
                    <input type="checkbox" defaultChecked className="rounded text-emerald-600 focus:ring-emerald-500" />
                    Biometric Attendance Telemetry &amp; Shortage Debars
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-medium">
                    <input type="checkbox" defaultChecked className="rounded text-emerald-600 focus:ring-emerald-500" />
                    Corporate MoU Deliverables &amp; CoE Grant Allocations
                  </label>
                </div>
              </div>

              {isCompiling && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Compiling Telemetry...</span>
                    <span>{compileProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full transition-all duration-200" style={{ width: `${compileProgress}%` }} />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowWizardModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCompiling}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-2 shadow-lg shadow-emerald-600/20 disabled:opacity-50 cursor-pointer"
                >
                  {isCompiling ? (
                    <>Processing Engine...</>
                  ) : (
                    <><Sparkles className="w-3.5 h-3.5" /> Compile &amp; Download</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Scheduled Crons Manager Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900">Automated Report Crons</h3>
                  <p className="text-xs text-slate-500">Scheduled automated dispatches to institutional leadership</p>
                </div>
              </div>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div className="space-y-2.5">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-slate-900">Weekly Attendance Shortage Digest</p>
                    <p className="text-slate-400 mt-0.5">Every Monday at 08:00 AM → All HoDs</p>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-extrabold rounded-lg">Active</span>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-slate-900">Monthly Placement CTC &amp; Offer Ledger</p>
                    <p className="text-slate-400 mt-0.5">1st of every month → Principal &amp; TPO Cell</p>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-extrabold rounded-lg">Active</span>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-slate-900">Quarterly NAAC Criteria 3 &amp; 5 Audit</p>
                    <p className="text-slate-400 mt-0.5">End of Quarter → IQAC Governing Board</p>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-extrabold rounded-lg">Active</span>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
