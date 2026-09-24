import React, { useState } from 'react';
import { 
  Award, 
  Sparkles, 
  ShieldCheck, 
  Search, 
  Filter, 
   
   
  ExternalLink, 
  Plus, 
  Download, 
  CheckCircle2, 
  X, 
  Code, 
  Cpu, 
  Cloud, 
  Terminal, 
  Trophy,
  BookOpen,
  Eye,
  Check
} from 'lucide-react';
import { RadarWebChart, MultiSegmentProgressBar, KPICard } from './ChartUtils';
import { InstitutionExportModal } from './InstitutionExportModal';

interface PortfolioItem {
  id: string;
  name: string;
  rollNumber: string;
  dept: string;
  year: string;
  avatarUrl?: string;
  cgpa: number;
  topSkills: string[];
  badgesCount: number;
  isStamped: boolean;
  hackathonWins: number;
  githubProjects: number;
  headline: string;
  bio: string;
  featuredProject: {
    title: string;
    description: string;
    techStack: string[];
    demoUrl: string;
    mentorStamped: string;
  };
  certifications: string[];
}

const initialPortfolios: PortfolioItem[] = [
  {
    id: 'port-1',
    name: 'Aarav Sharma',
    rollNumber: '21CS101',
    dept: 'Computer Science',
    year: '4th Year',
    cgpa: 9.42,
    topSkills: ['React', 'Next.js', 'PyTorch', 'Distributed Systems'],
    badgesCount: 8,
    isStamped: true,
    hackathonWins: 3,
    githubProjects: 14,
    headline: 'Full-Stack Engineer & AI Researcher | SIH 2024 Finalist',
    bio: 'Specialized in building scalable distributed systems and deploying multimodal AI inference pipelines.',
    featuredProject: {
      title: 'Autonomous Drone Fleet Telemetry & Swarm AI',
      description: 'Built a real-time WebSocket telemetry engine handling 50+ autonomous drones with edge computer vision object classification.',
      techStack: ['Python', 'FastAPI', 'PyTorch', 'ROS2', 'WebSockets'],
      demoUrl: 'https://github.com/aaravsharma/drone-swarm-ai',
      mentorStamped: 'Verified by Tata Consultancy Services Lead Architect'
    },
    certifications: ['AWS Certified Solutions Architect', 'TensorFlow Developer Certificate', 'Meta Certified React Lead']
  },
  {
    id: 'port-2',
    name: 'Priya Patel',
    rollNumber: '21CS102',
    dept: 'Computer Science',
    year: '4th Year',
    cgpa: 9.15,
    topSkills: ['Kubernetes', 'Docker', 'Go', 'GCP', 'Terraform'],
    badgesCount: 7,
    isStamped: true,
    hackathonWins: 2,
    githubProjects: 11,
    headline: 'Cloud Infrastructure & DevOps Engineer | Google Cloud Certified',
    bio: 'Passionate about infrastructure as code, zero-trust cloud architectures, and CI/CD pipelines.',
    featuredProject: {
      title: 'Zero-Trust Multi-Cluster Kubernetes Mesh',
      description: 'Designed Istio service mesh orchestrating microservices across hybrid cloud clusters with automated canary rollouts.',
      techStack: ['Go', 'Kubernetes', 'Istio', 'Terraform', 'Prometheus'],
      demoUrl: 'https://github.com/priyapatel/k8s-service-mesh',
      mentorStamped: 'Verified by Infosys Cloud Center of Excellence'
    },
    certifications: ['CKA: Certified Kubernetes Administrator', 'Google Professional Cloud Architect']
  },
  {
    id: 'port-3',
    name: 'Rohan Verma',
    rollNumber: '22EC204',
    dept: 'Electronics & Comm.',
    year: '3rd Year',
    cgpa: 8.65,
    topSkills: ['Verilog', 'FPGA', 'VLSI Design', 'Embedded C', 'RTOS'],
    badgesCount: 5,
    isStamped: true,
    hackathonWins: 1,
    githubProjects: 8,
    headline: 'Hardware Architect & Embedded Systems Engineer',
    bio: 'Designing custom RISC-V coprocessors on Xilinx FPGAs and ultra-low power IoT sensor modules.',
    featuredProject: {
      title: 'RISC-V 32-bit Pipelined Core on FPGA',
      description: 'Implemented custom 5-stage RISC-V integer ISA core synthesized on Xilinx Artix-7 with branch prediction.',
      techStack: ['Verilog', 'Xilinx Vivado', 'C', 'ModelSim'],
      demoUrl: 'https://github.com/rohanverma/riscv-fpga-core',
      mentorStamped: 'Verified by Texas Instruments Design Engineer'
    },
    certifications: ['Xilinx Certified FPGA Developer', 'ARM Cortex-M Embedded Specialist']
  },
  {
    id: 'port-4',
    name: 'Ananya Iyer',
    rollNumber: '22EC205',
    dept: 'Electronics & Comm.',
    year: '3rd Year',
    cgpa: 9.80,
    topSkills: ['Edge AI', 'TinyML', 'MATLAB', 'Computer Vision'],
    badgesCount: 9,
    isStamped: true,
    hackathonWins: 4,
    githubProjects: 16,
    headline: 'Edge AI Pioneer & National Smart India Hackathon Winner',
    bio: 'Deploying quantized neural networks onto ultra-low-power microcontrollers for real-time edge processing.',
    featuredProject: {
      title: 'Sub-Watt Acoustic Wildlife Poaching Detector',
      description: 'TinyML acoustic classifier running on ESP32 with 98.4% detection accuracy for chainsaws and gunshots.',
      techStack: ['C++', 'TensorFlow Lite for Microcontrollers', 'ESP-IDF'],
      demoUrl: 'https://github.com/ananyaiyer/tinyml-poaching-detect',
      mentorStamped: 'Verified by Bosch AI Research Labs'
    },
    certifications: ['Edge Impulse Certified TinyML Developer', 'DeepLearning.AI AI Engineering']
  },
  {
    id: 'port-5',
    name: 'Vikram Malhotra',
    rollNumber: '23ME301',
    dept: 'Mechanical Engg.',
    year: '2nd Year',
    cgpa: 8.85,
    topSkills: ['SolidWorks', 'ANSYS FEA', 'Computational Fluid Dynamics', 'Python'],
    badgesCount: 4,
    isStamped: false,
    hackathonWins: 1,
    githubProjects: 6,
    headline: 'Aerodynamic Simulation & EV Battery Thermal Architect',
    bio: 'Simulating aerodynamic drag reduction and liquid cooling loops for electric vehicle battery packs.',
    featuredProject: {
      title: 'Phase Change Material Cooling for 100kWh EV Battery',
      description: 'Conducted high-precision transient thermal CFD simulations improving cooling efficiency by 34%.',
      techStack: ['ANSYS Fluent', 'SolidWorks', 'Python Scipy'],
      demoUrl: 'https://github.com/vikrammalhotra/ev-cooling-cfd',
      mentorStamped: 'Under Review by Mahindra EV Center'
    },
    certifications: ['SolidWorks CSWA Certified', 'ANSYS Fluent Professional']
  },
  {
    id: 'port-6',
    name: 'Devika Nair',
    rollNumber: '22CS210',
    dept: 'Computer Science',
    year: '3rd Year',
    cgpa: 9.20,
    topSkills: ['PostgreSQL', 'GraphQL', 'TypeScript', 'Node.js', 'Redis'],
    badgesCount: 6,
    isStamped: true,
    hackathonWins: 2,
    githubProjects: 12,
    headline: 'Backend Architect & High-Throughput API Developer',
    bio: 'Architecting distributed database indexing strategies and microservices handling 10k+ req/sec.',
    featuredProject: {
      title: 'Distributed Event-Driven Ledger Engine',
      description: 'Financial ledger engine featuring zero-loss ACID replication with Kafka stream processing.',
      techStack: ['Node.js', 'TypeScript', 'PostgreSQL', 'Apache Kafka', 'Redis'],
      demoUrl: 'https://github.com/devikanair/event-ledger',
      mentorStamped: 'Verified by JPMorgan Chase Tech Mentorship'
    },
    certifications: ['PostgreSQL Certified Professional', 'MongoDB Certified Developer']
  }
];

export const StudentPortfoliosTab: React.FC = () => {
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>(initialPortfolios);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedModal, setSelectedModal] = useState<PortfolioItem | null>(null);
  const [showIssueBadgeModal, setShowIssueBadgeModal] = useState(false);
  const [badgeIssuedToast, setBadgeIssuedToast] = useState(false);

  // New badge modal form state
  const [newBadgeStudent, setNewBadgeStudent] = useState('');
  const [newBadgeTitle, setNewBadgeTitle] = useState('Full Stack Ninja');

  const filteredPortfolios = portfolios.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.topSkills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDept = selectedDept === 'All' || p.dept === selectedDept;
    return matchesSearch && matchesDept;
  });

  const totalBadges = portfolios.reduce((acc, p) => acc + p.badgesCount, 0);
  const stampedCount = portfolios.filter(p => p.isStamped).length;
  const totalHackathons = portfolios.reduce((acc, p) => acc + p.hackathonWins, 0);

  const [showExportModal, setShowExportModal] = useState(false);
  const [pendingPortfolio, setPendingPortfolio] = useState<PortfolioItem | null>(null);

  const downloadPortfolio = (student: PortfolioItem) => {
    setPendingPortfolio(student);
    setShowExportModal(true);
  };

  const getPortfolioExportConfig = (student: PortfolioItem) => ({
    filename: `${student.rollNumber}_verified_portfolio`,
    pdfLabel: `Verified Skill Portfolio & Credentials — ${student.name} (${student.rollNumber})`,
    csvData: `Roll Number,Name,Department,Total Badges,Hackathon Wins,Headline,Project Title,Tech Stack\n` +
      `"${student.rollNumber}","${student.name}","${student.dept}",${student.badgesCount},${student.hackathonWins},"${student.headline}","${student.featuredProject.title}","${student.featuredProject.techStack.join(', ')}"`,
  });

    const handleIssueBadge = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBadgeStudent) {
      setPortfolios(prev => prev.map(p => {
        if (p.name === newBadgeStudent) {
          return {
            ...p,
            badgesCount: p.badgesCount + 1,
            isStamped: true,
            certifications: [...p.certifications, `${newBadgeTitle} (Level 3 - Issued ${new Date().toLocaleDateString()})`]
          };
        }
        return p;
      }));
    }
    setShowIssueBadgeModal(false);
    setBadgeIssuedToast(true);
    setTimeout(() => setBadgeIssuedToast(false), 4500);
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto animate-in fade-in duration-300">
      {pendingPortfolio && (
        <InstitutionExportModal
          isOpen={showExportModal}
          onClose={() => { setShowExportModal(false); setPendingPortfolio(null); }}
          config={getPortfolioExportConfig(pendingPortfolio)}
          onToast={(msg) => console.log(msg)} // Replace with toast function if available
        />
      )}
      {/* Toast Notification */}
      {badgeIssuedToast && (
        <div className="fixed top-20 right-8 z-50 bg-indigo-600 text-white px-5 py-3.5 rounded-xl shadow-xl flex items-center gap-3 border border-indigo-400/30 animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-5 h-5" />
          <div>
            <p className="font-semibold text-sm">Digital Skill Badge Issued!</p>
            <p className="text-xs text-indigo-100">Cryptographically stamped credential published to student portfolio.</p>
          </div>
        </div>
      )}

      {/* Page Header Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Student Digital Portfolios & Skill Badges</h1>
            <p className="text-sm text-slate-500 mt-1">
              CAPFLY Verified tamper-proof digital credentials, skill endorsements, hackathon achievements, and project portfolios.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowIssueBadgeModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition shadow-lg shadow-indigo-600/20"
          >
            <Plus className="w-4 h-4" />
            Issue Skill Badge
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard
          title="Verified Portfolios"
          value="2,840 Active"
          subtitle="73.9% of All Students"
          trend={{ value: 14.5, isPositive: true }}
          color="indigo"
          icon={<svg className="w-5 h-5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>}
        />
        <KPICard
          title="Digital Badges Issued"
          value="14,250 Badges"
          subtitle="Avg 5.2 Badges / Student"
          trend={{ value: 22.8, isPositive: true }}
          color="purple"
          icon={<svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>}
        />
        <KPICard
          title="Hackathon Winners"
          value="186 Champions"
          subtitle="National & State Contests"
          trend={{ value: 18.0, isPositive: true }}
          color="amber"
          icon={<svg className="w-5 h-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>}
        />
        <KPICard
          title="Industry-Stamped Projects"
          value="428 Repos"
          subtitle="Direct Corporate Endorsement"
          trend={{ value: 31.4, isPositive: true }}
          color="emerald"
          icon={<svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>}
        />
      </div>

      {/* Analytics Row: 2 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Skill Competency Radar */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Campus Skill Competency Radar</h3>
                <p className="text-xs text-slate-500">Student proficiency benchmarked against industry standards</p>
              </div>
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                Verified Skills
              </span>
            </div>
            <div className="py-2">
              <RadarWebChart
                data={[
                  { subject: 'Full Stack Web', value: 88 },
                  { subject: 'AI / ML Inference', value: 82 },
                  { subject: 'Cloud & DevOps', value: 76 },
                  { subject: 'Hardware / VLSI', value: 68 },
                  { subject: 'Cybersecurity', value: 72 },
                  { subject: 'Data Engineering', value: 84 }
                ]}
                color="#6366f1"
              />
            </div>
          </div>
        </div>

        {/* Right: Badge Category Distribution */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Badge Categories & Distribution</h3>
                <p className="text-xs text-slate-500">Credential classification breakdown across cohorts</p>
              </div>
              <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                14,250 Total Badges
              </span>
            </div>
            <div className="space-y-4 py-4">
              <MultiSegmentProgressBar
                segments={[
                  { label: 'Coding & Architecture', value: 38, color: '#6366f1' },
                  { label: 'AI & Data Science', value: 26, color: '#8b5cf6' },
                  { label: 'Cloud & DevOps', value: 18, color: '#06b6d4' },
                  { label: 'Design & UI/UX', value: 10, color: '#f59e0b' },
                  { label: 'Soft Skills & Leadership', value: 8, color: '#ec4899' }
                ]}
              />

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <p className="text-slate-500">Top Credential Category</p>
                  <p className="font-bold text-slate-800 text-sm">Full-Stack & Systems (38%)</p>
                </div>
                <div className="p-3 bg-indigo-50 rounded-xl space-y-1">
                  <p className="text-indigo-600 font-medium">Fastest Growing</p>
                  <p className="font-bold text-indigo-900 text-sm">Generative AI & LLMs (+48% YoY)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, roll no, or skill..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium whitespace-nowrap">
            <Filter className="w-3.5 h-3.5" /> Department:
          </div>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="All">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Electronics & Comm.">Electronics & Comm.</option>
            <option value="Mechanical Engg.">Mechanical Engg.</option>
          </select>
        </div>
      </div>

      {/* Portfolios Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPortfolios.map((portfolio) => (
          <div 
            key={portfolio.id}
            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
          >
            <div>
              {/* Card Top: Avatar & Stamped Seal */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold flex items-center justify-center text-sm shadow-md shadow-indigo-500/20">
                    {portfolio.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">{portfolio.name}</h4>
                    <p className="text-xs text-slate-400 font-mono">{portfolio.rollNumber} • {portfolio.dept}</p>
                  </div>
                </div>
                {portfolio.isStamped && (
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[11px] font-bold rounded-full border border-emerald-200 flex items-center gap-1 shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> STAMPED
                  </span>
                )}
              </div>

              {/* Headline */}
              <p className="text-xs font-medium text-slate-700 mt-3 line-clamp-2">
                {portfolio.headline}
              </p>

              {/* Key Metrics Row */}
              <div className="grid grid-cols-3 gap-2 mt-4 p-2.5 bg-slate-50 rounded-xl text-center">
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">CGPA</p>
                  <p className="text-xs font-bold text-slate-800">{portfolio.cgpa}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Badges</p>
                  <p className="text-xs font-bold text-indigo-600">{portfolio.badgesCount} Verified</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Wins</p>
                  <p className="text-xs font-bold text-amber-600">{portfolio.hackathonWins} Hacks</p>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="mt-4">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Verified Competencies</p>
                <div className="flex flex-wrap gap-1.5">
                  {portfolio.topSkills.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 bg-indigo-50/70 text-indigo-700 text-xs font-medium rounded-lg border border-indigo-100/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Featured Project Snippet */}
              <div className="mt-4 p-3 bg-slate-50/70 rounded-xl border border-slate-100 space-y-1">
                <p className="text-[10px] uppercase font-bold text-slate-400">Featured Capstone</p>
                <p className="text-xs font-semibold text-slate-800 truncate">{portfolio.featuredProject.title}</p>
                <p className="text-[11px] text-slate-500 line-clamp-1">{portfolio.featuredProject.description}</p>
              </div>
            </div>

            {/* Action */}
            <div className="pt-2">
              <button
                onClick={() => setSelectedModal(portfolio)}
                className="w-full py-2.5 bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 font-semibold text-xs rounded-xl transition flex items-center justify-center gap-2 border border-slate-200 hover:border-indigo-200"
              >
                <Eye className="w-3.5 h-3.5" /> View Full Verified Portfolio
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Full Portfolio Modal */}
      {selectedModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white font-bold flex items-center justify-center text-lg shadow-lg shadow-indigo-500/20">
                  {selectedModal.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-xl">{selectedModal.name}</h3>
                    {selectedModal.isStamped && (
                      <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> STAMPED
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{selectedModal.rollNumber} • {selectedModal.dept} • {selectedModal.year}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-5 space-y-5">
              {/* Bio & Headline */}
              <div>
                <p className="text-sm font-semibold text-slate-800">{selectedModal.headline}</p>
                <p className="text-xs text-slate-600 mt-1">{selectedModal.bio}</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-3 p-3 bg-slate-50 rounded-2xl text-center">
                <div>
                  <p className="text-xs text-slate-400 font-medium">CGPA</p>
                  <p className="text-base font-extrabold text-slate-800">{selectedModal.cgpa}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Badges</p>
                  <p className="text-base font-extrabold text-indigo-600">{selectedModal.badgesCount}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Hackathons</p>
                  <p className="text-base font-extrabold text-amber-600">{selectedModal.hackathonWins}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Repositories</p>
                  <p className="text-base font-extrabold text-emerald-600">{selectedModal.githubProjects}</p>
                </div>
              </div>

              {/* Featured Project */}
              <div className="p-4 bg-indigo-50/40 rounded-2xl border border-indigo-100/70 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Featured Capstone Project</span>
                  <a 
                    href={selectedModal.featuredProject.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    View Code <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{selectedModal.featuredProject.title}</h4>
                <p className="text-xs text-slate-600">{selectedModal.featuredProject.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedModal.featuredProject.techStack.map((tech, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-white text-slate-700 text-[10px] font-medium rounded-md border border-slate-200">
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {selectedModal.featuredProject.mentorStamped}
                </p>
              </div>

              {/* Certifications */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Verified Certifications</h4>
                <div className="space-y-2">
                  {selectedModal.certifications.map((cert, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 bg-white border border-slate-100 rounded-xl text-xs">
                      <span className="font-semibold text-slate-800 flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> {cert}
                      </span>
                      <span className="text-emerald-600 font-medium">CAPFLY Cryptographic Seal ✓</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setSelectedModal(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    downloadPortfolio(selectedModal);
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition flex items-center gap-2 shadow-md shadow-indigo-600/20"
                >
                  <Download className="w-3.5 h-3.5" /> Download Verified PDF Dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Issue Badge Modal */}
      {showIssueBadgeModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Issue Digital Skill Badge</h3>
                  <p className="text-xs text-slate-500">Mint verified credential on student profile</p>
                </div>
              </div>
              <button
                onClick={() => setShowIssueBadgeModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleIssueBadge} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Student</label>
                <select
                  required
                  value={newBadgeStudent}
                  onChange={(e) => setNewBadgeStudent(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Choose Student...</option>
                  {portfolios.map(p => (
                    <option key={p.id} value={p.name}>{p.name} ({p.rollNumber} - {p.dept})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Badge Title / Competency</label>
                <select
                  value={newBadgeTitle}
                  onChange={(e) => setNewBadgeTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Full Stack Ninja">Full Stack Ninja (Level 3)</option>
                  <option value="AI / LLM Systems Practitioner">AI / LLM Systems Practitioner</option>
                  <option value="Cloud Architect Specialist">Cloud Architect Specialist</option>
                  <option value="National Hackathon Champion">National Hackathon Champion</option>
                  <option value="Embedded / VLSI Hardware Master">Embedded / VLSI Hardware Master</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Issuing Mentor / Authority</label>
                <input
                  type="text"
                  defaultValue="CAPFLY Academic Evaluation Council"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowIssueBadgeModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition flex items-center gap-2 shadow-lg shadow-indigo-600/20"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Mint & Issue Badge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
