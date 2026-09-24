import React, { useState } from 'react';
import { 
  GraduationCap, 
  Building2, 
  School, 
  Landmark, 
  ShieldCheck, 
  GitFork, 
  CheckCircle2, 
  Handshake, 
  UserCheck, 
  Search, 
  ArrowLeft,
  X,
  Sparkles,
  MessageSquare,
  Globe,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import type { PortalType } from '../components/layout/Navbar';

interface HelpCenterProps {
  onBack: () => void;
  onSelectPortal?: (portal: PortalType) => void;
}

interface GuideCard {
  id: string;
  title: string;
  category: string;
  icon: React.ElementType;
  description: string;
  steps: string[];
  faq: { q: string; a: string }[];
}

export const HelpCenter: React.FC<HelpCenterProps> = ({ onBack, onSelectPortal }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCard, setSelectedCard] = useState<GuideCard | null>(null);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ sender: 'user' | 'ai'; text: string }[]>([
    { sender: 'ai', text: 'Hello! I am CapFly Support AI. Ask me anything about student diagnostics, faculty FDPs, or industry hiring workflows.' }
  ]);

  const cards: GuideCard[] = [
    {
      id: 'student-workflow',
      title: 'Student Portal Workflow',
      category: 'Student Portal',
      icon: GraduationCap,
      description: 'How students take technical/soft skill questionnaires, view diagnostic gap analysis, complete industry learning tracks, and apply directly to matched internships.',
      steps: [
        '1. Login with university credentials and complete initial profile setup.',
        '2. Take the 30-minute Industry Skill Diagnostic questionnaire calibrated by corporate hiring bars.',
        '3. Inspect your Competency Inventory & Gap Matrix highlighting strengths and missing prerequisites.',
        '4. Enroll in recommended industry capstone modules and submit GitHub project repositories.',
        '5. Receive verified faculty sign-off and dispatch your 1-click ATS application directly to enterprise recruiters.'
      ],
      faq: [
        { q: 'Are diagnostic tests timed?', a: 'Yes, technical diagnostics are 30 minutes with anti-cheat proctoring.' },
        { q: 'How do I get faculty verification?', a: 'Your department HOD or assigned faculty mentor receives an automated sign-off notification upon project completion.' }
      ]
    },
    {
      id: 'industry-portal',
      title: 'Industry & Enterprise Portal',
      category: 'Industry Portal',
      icon: Building2,
      description: 'How companies post internships, entry-level jobs, publish training bootcamps, review candidate repository telemetry, and shortlist talent.',
      steps: [
        '1. Register your enterprise profile with corporate GSTIN and official domain verification.',
        '2. Publish skill requisitions with explicit prerequisite DAG trees (e.g. Golang, Kafka, Kubernetes).',
        '3. Sponsor live student capstone projects with direct mentor code review guidelines.',
        '4. Filter candidate telemetry by diagnostic test scores, GitHub code hygiene, and faculty endorsements.',
        '5. Dispatch direct internship and PPO offers with transparent onboarding timelines.'
      ],
      faq: [
        { q: 'Can we post custom capstones?', a: 'Yes, enterprise partners can post sponsored project briefs with custom evaluation rubrics.' },
        { q: 'Is candidate code telemetry verified?', a: 'All project repos are audited via automated static code analysis and faculty co-signoffs.' }
      ]
    },
    {
      id: 'academia-portal',
      title: 'Academia & Faculty Portal',
      category: 'Academia Portal',
      icon: School,
      description: 'How faculty access industrial training sabbaticals, register for accredited FDPs, propose collaborative research, and endorse student project repositories.',
      steps: [
        '1. Access the Faculty Portal using institutional SSO or college email verification.',
        '2. Browse AICTE-approved Faculty Development Programs (FDPs) sponsored by industry tech leads.',
        '3. Review and digitally sign off on student capstone submissions within your department.',
        '4. Submit industrial sabbatical requests to co-work inside corporate engineering R&D labs.',
        '5. Propose joint applied research grants with corporate innovation partners.'
      ],
      faq: [
        { q: 'How are FDP credits tracked?', a: 'FDP certificates are digitally signed and accredited under AICTE national guidelines.' },
        { q: 'Can multiple faculty co-sign a capstone?', a: 'Yes, multi-disciplinary capstones support multiple faculty mentors.' }
      ]
    },
    {
      id: 'institutional-intelligence',
      title: 'Institutional Intelligence',
      category: 'Institution Portal',
      icon: Landmark,
      description: 'How college placement cells monitor batch skill trends, track internship participation, detect syllabus lag, and download institutional readiness reports.',
      steps: [
        '1. Log into the Institution Portal as a Placement Officer or Principal Administrator.',
        '2. Inspect batch-wide competency heatmaps across CS, Data Science, and Core Engineering tracks.',
        '3. Analyze syllabus depreciation reports comparing university lab manuals vs current market requirements.',
        '4. Track active MoUs, industry visit participation, and student placement conversion rates.',
        '5. Export PDF readiness briefs for NAAC / NIRF accreditation reviews.'
      ],
      faq: [
        { q: 'Is batch data exportable?', a: 'Yes, placement officers can download CSV/PDF reports formatted for NIRF and NAAC.' },
        { q: 'How often are syllabus lag metrics updated?', a: 'Metrics update quarterly based on real-time enterprise requisition data.' }
      ]
    },
    {
      id: 'digital-portfolio',
      title: 'Digital Portfolio & Secure Vault',
      category: 'Platform Core',
      icon: ShieldCheck,
      description: 'Guidelines on tamper-proof academic records, resume storage, verified certifications, faculty project sign-offs, and shareable public ATS links.',
      steps: [
        '1. Every student receives an immutable digital portfolio ledger tied to their verified ID.',
        '2. Test diagnostic scores, capstone deliverables, and faculty approvals are cryptographically logged.',
        '3. Generate shareable public portfolio URLs formatted specifically for enterprise ATS parsers.',
        '4. Maintain full privacy control over who can view your verified academic records.'
      ],
      faq: [
        { q: 'Is the portfolio publicly shareable?', a: 'Yes, students can generate public links with granular privacy toggles.' }
      ]
    },
    {
      id: 'skill-assessment-engine',
      title: 'Skill Assessment & Prerequisite Engine',
      category: 'Engine Tech',
      icon: GitFork,
      description: 'Technical breakdown of how questionnaires evaluate competencies against dynamic industry DAG trees to pinpoint exact missing skills.',
      steps: [
        '1. Questionnaires use adaptive difficulty branching to measure theoretical and practical depth.',
        '2. Responses map directly onto industry Directed Acyclic Graphs (DAGs) representing prerequisite stacks.',
        '3. Output metrics generate a clear percentage match score and list exact missing prerequisites.',
        '4. System automatically suggests targeted learning micro-modules to close identified gaps.'
      ],
      faq: [
        { q: 'What topics are covered in diagnostics?', a: 'Data structures, algorithms, system design, cloud infrastructure, and software engineering practices.' }
      ]
    },
    {
      id: 'internship-pipeline',
      title: 'Internship & Placement Pipeline',
      category: 'Placement Lifecycle',
      icon: CheckCircle2,
      description: 'Step-by-step lifecycle from 1-click application submission to mentor progress feedback, completion certificates, and placement conversion.',
      steps: [
        '1. Students click 1-Click Apply on matched enterprise internship postings.',
        '2. Recruiters review verified skill badges and candidate code repository benchmarks.',
        '3. Accepted interns complete weekly milestone check-ins with assigned industry mentors.',
        '4. Successful internship completion converts automatically into PPO recommendations.'
      ],
      faq: [
        { q: 'Do internships include stipends?', a: 'All verified industry listings on CapFly explicitly state stipend terms.' }
      ]
    },
    {
      id: 'collaborative-research',
      title: 'Collaborative Research & MoUs',
      category: 'Industry-Academia',
      icon: Handshake,
      description: 'Framework for institutional MoUs, industry-funded research problems, corporate guest lectures, and joint hackathons.',
      steps: [
        '1. Institutions initiate digital MoU agreements with verified corporate partners.',
        '2. Industry partners post real-world R&D challenges for joint faculty-student research teams.',
        '3. Schedule guest lectures and industrial workshops with live attendance tracking.',
        '4. Publish joint research whitepapers with corporate co-sponsorship.'
      ],
      faq: [
        { q: 'How are MoUs executed?', a: 'Digital MoUs are executed with verified electronic signatures and legal templates.' }
      ]
    },
    {
      id: 'account-roles-verification',
      title: 'Account, Roles & Verification',
      category: 'Security & Access',
      icon: UserCheck,
      description: 'Role-based access controls, college email domain verification, institutional SSO, and credential verification policies.',
      steps: [
        '1. Accounts are verified via institutional email domains (.ac.in, .edu) or enterprise domain checks.',
        '2. Role-Based Access Controls (RBAC) ensure strict separation between Student, Faculty, Industry, and Admin views.',
        '3. Institutional SSO integration supported via SAML 2.0 and OAuth2.',
        '4. Security policies comply with AICTE national data privacy guidelines.'
      ],
      faq: [
        { q: 'Can I change my role later?', a: 'Role upgrades require administrator domain verification.' }
      ]
    }
  ];

  const filteredCards = cards.filter(card => 
    card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiMessage.trim()) return;

    const userText = aiMessage;
    setChatHistory(prev => [...prev, { sender: 'user', text: userText }]);
    setAiMessage('');

    setTimeout(() => {
      let reply = "CapFly connects students, faculty, and industry through verified skill diagnostics and live project capstones. How can I assist your specific portal workflow?";
      const lower = userText.toLowerCase();
      if (lower.includes('student') || lower.includes('diagnostic')) {
        reply = "Students can take 30-minute skill diagnostics, view their competency gap matrix, and enroll in industry capstones to land verified internships.";
      } else if (lower.includes('industry') || lower.includes('hire') || lower.includes('job')) {
        reply = "Industry recruiters publish tech stack requisitions, sponsor student capstones, and filter candidates by verified test scores and GitHub code hygiene.";
      } else if (lower.includes('faculty') || lower.includes('academia') || lower.includes('fdp')) {
        reply = "Faculty can access AICTE-accredited FDPs, apply for corporate industrial sabbaticals, and co-sign student project repositories.";
      }
      setChatHistory(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* 1. Header Bar */}
      <header className="h-16 border-b border-slate-200 bg-white sticky top-0 z-40 px-4 sm:px-8 flex items-center justify-between">
        {/* Left: Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
          <div className="w-8 h-8 rounded-lg bg-[#1d4ed8] flex items-center justify-center text-white font-bold text-sm shadow-xs">
            C
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-950">
            CapFly <span className="font-sans text-xs font-normal text-slate-500">| Help Center</span>
          </span>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1 text-xs font-mono font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
            <Globe className="w-3.5 h-3.5" />
            <span>English (US)</span>
          </div>

          <button
            type="button"
            onClick={() => onSelectPortal?.('student')}
            className="text-xs font-mono font-bold text-slate-700 hover:text-blue-600 px-3 py-1.5 rounded border border-slate-200 hover:border-blue-300 transition cursor-pointer"
          >
            Portals Sign In
          </button>

          <button
            type="button"
            onClick={onBack}
            className="bg-slate-950 hover:bg-slate-800 text-white text-xs font-mono font-bold px-4 py-2 rounded transition flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Return to CapFly Home</span>
          </button>
        </div>
      </header>

      {/* 2. Hero Search Section */}
      <section className="pt-12 pb-10 px-4 sm:px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mb-3">
          How can we help you today?
        </h1>
        <p className="text-sm text-slate-500 font-medium mb-8 max-w-lg mx-auto">
          Explore portal workflows, diagnostic calibration guides, and institutional partnership frameworks.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for guides, portal workflows, and verification policies..."
            className="w-full border-b-2 border-slate-300 pl-10 pr-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-950 transition font-sans"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs font-mono"
            >
              CLEAR
            </button>
          )}
        </div>
      </section>

      {/* 3. The 9 Core Portal Feature Guides Grid (Image 3 Style) */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => setSelectedCard(card)}
                className="bg-white border border-slate-200 hover:border-slate-400 rounded-2xl p-6 transition-all shadow-xs hover:shadow-md cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  {/* Black Rounded Square Icon Badge (Image 3 exact match) */}
                  <div className="w-12 h-12 bg-slate-950 text-white rounded-xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1d4ed8] bg-blue-50 px-2 py-0.5 rounded border border-blue-100 mb-2 inline-block">
                    {card.category}
                  </span>

                  <h3 className="font-black text-lg text-slate-950 group-hover:text-[#1d4ed8] transition mb-2">
                    {card.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between font-mono text-xs font-bold text-slate-700 group-hover:text-[#1d4ed8]">
                  <span>READ GUIDE</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {filteredCards.length === 0 && (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200">
            <p className="text-slate-600 font-mono text-sm">No help topics match "{searchQuery}".</p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="mt-3 text-xs font-mono font-bold text-[#1d4ed8] underline"
            >
              Reset search filter
            </button>
          </div>
        )}
      </main>

      {/* 4. Interactive Detail Modal */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200 max-h-[85vh] flex flex-col font-sans animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-950 text-white rounded-xl flex items-center justify-center">
                  <selectedCard.icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] font-bold text-[#1d4ed8] uppercase">{selectedCard.category}</span>
                  <h3 className="font-black text-xl text-slate-950">{selectedCard.title}</h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCard(null)}
                className="p-1 rounded-lg hover:bg-slate-200 text-slate-500 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              <div>
                <h4 className="font-mono text-xs font-bold text-slate-500 uppercase mb-2">OVERVIEW & WORKFLOW</h4>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">{selectedCard.description}</p>
              </div>

              <div>
                <h4 className="font-mono text-xs font-bold text-slate-500 uppercase mb-3">STEP-BY-STEP EXECUTION</h4>
                <div className="space-y-2 font-sans text-xs">
                  {selectedCard.steps.map((step, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium">
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-mono text-xs font-bold text-slate-500 uppercase mb-3">FREQUENTLY ASKED QUESTIONS</h4>
                <div className="space-y-3 font-sans text-xs">
                  {selectedCard.faq.map((item, idx) => (
                    <div key={idx} className="p-3.5 bg-blue-50/50 border border-blue-100 rounded-lg">
                      <div className="font-bold text-slate-900 mb-1">Q: {item.q}</div>
                      <div className="text-slate-600">{item.a}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between font-mono text-xs">
              <span className="text-slate-500">Need direct assistance?</span>
              <button
                type="button"
                onClick={() => {
                  setSelectedCard(null);
                  setIsAiChatOpen(true);
                }}
                className="bg-[#1d4ed8] text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                ASK AI SUPPORT →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Ask CapFly AI Chat Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isAiChatOpen ? (
          <button
            type="button"
            onClick={() => setIsAiChatOpen(true)}
            className="bg-slate-950 hover:bg-slate-800 text-white font-mono text-xs font-bold px-4 py-3 rounded-full shadow-2xl flex items-center gap-2 transition transform hover:scale-105 cursor-pointer border border-slate-800"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>Ask CapFly AI</span>
          </button>
        ) : (
          <div className="w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden font-sans flex flex-col h-[420px] animate-in fade-in slide-in-from-bottom-5">
            <div className="bg-slate-950 p-3.5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="font-mono text-xs font-bold">CapFly AI Support</span>
              </div>
              <button
                type="button"
                onClick={() => setIsAiChatOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 p-3 overflow-y-auto space-y-3 font-sans text-xs bg-slate-50">
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-2.5 rounded-xl ${
                      msg.sender === 'user'
                        ? 'bg-[#1d4ed8] text-white rounded-br-none'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-2xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-2 border-t border-slate-200 bg-white flex gap-1.5">
              <input
                type="text"
                value={aiMessage}
                onChange={(e) => setAiMessage(e.target.value)}
                placeholder="Ask about diagnostics, hiring, FDPs..."
                className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-slate-950 font-sans"
              />
              <button
                type="submit"
                className="bg-slate-950 text-white font-mono text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-slate-800"
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>

    </div>
  );
};

export default HelpCenter;
