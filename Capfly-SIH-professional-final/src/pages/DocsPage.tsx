import React, { useState } from 'react';
import { 
  Search, 
  ExternalLink, 
  Copy, 
  Check, 
  Code2, 
  Terminal, 
  Sparkles, 
  ChevronRight,
  X,
  Key,
  ArrowLeft
} from 'lucide-react';
import type { PortalType } from '../components/layout/Navbar';

interface DocsPageProps {
  onBack: () => void;
  onSelectPortal?: (portal: PortalType) => void;
}

export type CodeLanguage = 'javascript' | 'python' | 'curl';

export interface DocItem {
  id: string;
  title: string;
  category: string;
  breadcrumb: string[];
  badge: string;
  description: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  subtitle: string;
  panelText: string;
  snippets: {
    javascript: string;
    python: string;
    curl: string;
  };
}

export const docRegistry: Record<string, DocItem> = {
  'quickstart': {
    id: 'quickstart',
    title: 'Developer quickstart',
    category: 'Get started',
    breadcrumb: ['Docs', 'Get started', 'Developer quickstart'],
    badge: 'GET STARTED',
    description: 'Make your first API request in minutes. Learn the basics of the CapFly unified collaboration engine.',
    endpoint: 'https://api.capfly.io/v1/auth/init',
    method: 'POST',
    subtitle: 'Initialize Skill Diagnostic',
    panelText: 'Ingest candidate evaluation questionnaires and query prerequisite gaps directly via the SDK.',
    snippets: {
      javascript: `import { CapFlyClient } from "@capfly/sdk";
const client = new CapFlyClient({ apiKey: process.env.CAPFLY_KEY });

// Evaluate candidate competency against live industry rubric
const assessment = await client.skillEngine.evaluateGap({
  studentId: "STU-2026-IT",
  targetTrack: "Cloud Backend Engineer",
  rubricVersion: "2026-Q3-Enterprise"
});

console.log(\`Readiness: \${assessment.compatibilityScore}%\`);`,
      python: `from capfly import CapFlyClient
import os

client = CapFlyClient(api_key=os.getenv("CAPFLY_KEY"))

# Ingest assessment and compute prerequisite gap matrix
assessment = client.skill_engine.evaluate_gap(
    student_id="STU-2026-IT",
    target_track="Cloud Backend Engineer",
    rubric_version="2026-Q3-Enterprise"
)

print(f"Readiness: {assessment.compatibility_score}%")`,
      curl: `curl -X POST https://api.capfly.io/v1/skill-engine/evaluate \\
  -H "Authorization: Bearer $CAPFLY_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "studentId": "STU-2026-IT",
    "targetTrack": "Cloud Backend Engineer"
  }'`
    }
  },

  'auth': {
    id: 'auth',
    title: 'Authentication & API Keys',
    category: 'Get started',
    breadcrumb: ['Docs', 'Get started', 'Authentication & API Keys'],
    badge: 'SECURITY',
    description: 'Authenticate all CapFly API queries using bearer tokens generated from your developer dashboard.',
    endpoint: 'https://api.capfly.io/v1/auth/verify',
    method: 'POST',
    subtitle: 'Verify Bearer Token',
    panelText: 'Validates API key authorization scope and checks rate limits across institutional domain quotas.',
    snippets: {
      javascript: `import { CapFlyClient } from "@capfly/sdk";

const client = new CapFlyClient({ apiKey: "capfly_live_key_99812x" });
const authState = await client.auth.verify();
console.log("Authenticated scope:", authState.permissions);`,
      python: `from capfly import CapFlyClient

client = CapFlyClient(api_key="capfly_live_key_99812x")
auth_state = client.auth.verify()
print("Authenticated scope:", auth_state.permissions)`,
      curl: `curl -X POST https://api.capfly.io/v1/auth/verify \\
  -H "Authorization: Bearer capfly_live_key_99812x"`
    }
  },

  'architecture': {
    id: 'architecture',
    title: 'Role Architecture Overview',
    category: 'Get started',
    breadcrumb: ['Docs', 'Get started', 'Role Architecture Overview'],
    badge: 'ARCHITECTURE',
    description: 'Understand CapFly RBAC rules separating Student, Industry, Academia, and Institution data boundaries.',
    endpoint: 'https://api.capfly.io/v1/architecture/roles',
    method: 'GET',
    subtitle: 'Query RBAC Permission Matrix',
    panelText: 'Retrieves granular access levels for student data vaults, faculty endorsements, and recruiter pipelines.',
    snippets: {
      javascript: `const roles = await client.architecture.getRoles();
console.log("Active RBAC Scopes:", roles.map(r => r.name));`,
      python: `roles = client.architecture.get_roles()
print("Active RBAC Scopes:", [r['name'] for r in roles])`,
      curl: `curl https://api.capfly.io/v1/architecture/roles \\
  -H "Authorization: Bearer $CAPFLY_KEY"`
    }
  },

  'skill-assessment': {
    id: 'skill-assessment',
    title: 'Skill Assessment API',
    category: 'Core Engines',
    breadcrumb: ['Docs', 'Core Engines', 'Skill Assessment API'],
    badge: 'CORE API',
    description: 'Ingest industry-curated technical questionnaires, evaluate soft-skill diagnostics, and generate verified skill profiles.',
    endpoint: 'https://api.capfly.io/v1/assessments/evaluate',
    method: 'POST',
    subtitle: 'Submit Questionnaire Results',
    panelText: 'Transmits proctored aptitude answers and live code telemetry to generate a verified scorecard.',
    snippets: {
      javascript: `const evaluation = await client.assessments.submitAnswers({
  studentId: "STU-2026-IT",
  testId: "EVAL-FULLSTACK-Q3",
  answers: [
    { questionId: "Q-ARC-01", selectedOption: "A" }
  ]
});

console.log("Strengths:", evaluation.strengths);`,
      python: `evaluation = client.assessments.submit_answers(
    student_id="STU-2026-IT",
    test_id="EVAL-FULLSTACK-Q3",
    answers=[{"questionId": "Q-ARC-01", "selectedOption": "A"}]
)

print("Scorecard:", evaluation.scorecard)`,
      curl: `curl -X POST https://api.capfly.io/v1/assessments/evaluate \\
  -H "Authorization: Bearer $CAPFLY_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"studentId":"STU-2026-IT","testId":"EVAL-FULLSTACK-Q3"}'`
    }
  },

  'gap-analysis': {
    id: 'gap-analysis',
    title: 'Prerequisite Gap Engine',
    category: 'Core Engines',
    breadcrumb: ['Docs', 'Core Engines', 'Gap Analysis & Profiling'],
    badge: 'ALGORITHM',
    description: 'Map candidate scores against live enterprise DAG prerequisite trees to pinpoint exact missing toolchains.',
    endpoint: 'https://api.capfly.io/v1/graph/prerequisites',
    method: 'GET',
    subtitle: 'Query Prerequisite Tree',
    panelText: 'Traverse directed acyclic graphs to compute required learning modules for role eligibility.',
    snippets: {
      javascript: `const graph = await client.graph.getPrerequisitePath({
  currentSkills: ["REST APIs", "SQL"],
  desiredRole: "Senior Distributed Architect"
});

console.log("Missing Prerequisites:", graph.unlockedRoadmap);`,
      python: `graph = client.graph.get_prerequisite_path(
    current_skills=["REST APIs", "SQL"],
    desired_role="Senior Distributed Architect"
)

print("Unlocked Roadmap:", graph.unlocked_roadmap)`,
      curl: `curl -G https://api.capfly.io/v1/graph/prerequisites \\
  -H "Authorization: Bearer $CAPFLY_KEY" \\
  -d "role=Senior+Distributed+Architect"`
    }
  },

  'matcher': {
    id: 'matcher',
    title: 'Internship & Placement Matcher',
    category: 'Core Engines',
    breadcrumb: ['Docs', 'Core Engines', 'Internship & Placement Matcher'],
    badge: 'MATCHING',
    description: 'Match students to live corporate requisitions using verified skill compatibility scoring and eligibility criteria.',
    endpoint: 'https://api.capfly.io/v1/matcher/shortlist',
    method: 'POST',
    subtitle: 'Run Real-Time Candidate Match',
    panelText: 'Filters student profiles by assessment thresholds, faculty sign-offs, and company requirements.',
    snippets: {
      javascript: `const matches = await client.matcher.findOpportunities({
  studentId: "STU-2026-IT",
  minCompatibility: 0.85,
  type: ["internship", "entry-level"]
});

console.log(\`Found \${matches.length} direct requisitions.\`);`,
      python: `matches = client.matcher.find_opportunities(
    student_id="STU-2026-IT",
    min_compatibility=0.85,
    type=["internship", "entry-level"]
)

print(matches)`,
      curl: `curl -X POST https://api.capfly.io/v1/matcher/shortlist \\
  -H "Authorization: Bearer $CAPFLY_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"studentId":"STU-2026-IT","minCompatibility":0.85}'`
    }
  },

  'vault': {
    id: 'vault',
    title: 'Digital Vault & Telemetry',
    category: 'Core Engines',
    breadcrumb: ['Docs', 'Core Engines', 'Digital Vault & Telemetry'],
    badge: 'SECURE',
    description: 'Access tamper-proof student credentials, marksheet transcripts, verified internship reports, and code commit telemetry.',
    endpoint: 'https://api.capfly.io/v1/vault/candidate-ledger',
    method: 'GET',
    subtitle: 'Fetch Verifiable Candidate Ledger',
    panelText: 'Cryptographically verified audit trail endorsed by university departments and corporate mentors.',
    snippets: {
      javascript: `const ledger = await client.vault.getLedger("STU-2026-IT");
console.log(ledger.academicCredentials, ledger.mentorEndorsements);`,
      python: `ledger = client.vault.get_ledger("STU-2026-IT")
print(ledger.mentor_endorsements)`,
      curl: `curl https://api.capfly.io/v1/vault/candidate-ledger/STU-2026-IT \\
  -H "Authorization: Bearer $CAPFLY_KEY"`
    }
  },

  'student-wh': {
    id: 'student-wh',
    title: 'Student Webhooks',
    category: 'Portal Handshakes',
    breadcrumb: ['Docs', 'Portal Handshakes', 'Student Webhooks'],
    badge: 'WEBHOOKS',
    description: 'Listen to real-time events when students finish diagnostics, update project repos, or receive faculty approvals.',
    endpoint: 'https://api.capfly.io/v1/webhooks/student-events',
    method: 'POST',
    subtitle: 'Register Event Listener',
    panelText: 'Subscribes institutional dashboards to candidate diagnostic score triggers and submission updates.',
    snippets: {
      javascript: `const webhook = await client.webhooks.subscribe({
  event: "diagnostic.completed",
  targetUrl: "https://university.edu/api/capfly-listener"
});
console.log("Subscribed webhook ID:", webhook.id);`,
      python: `webhook = client.webhooks.subscribe(
    event="diagnostic.completed",
    target_url="https://university.edu/api/capfly-listener"
)
print("Webhook ID:", webhook.id)`,
      curl: `curl -X POST https://api.capfly.io/v1/webhooks/student-events \\
  -H "Authorization: Bearer $CAPFLY_KEY" \\
  -d '{"event":"diagnostic.completed","targetUrl":"https://university.edu/api/capfly-listener"}'`
    }
  },

  'industry-req': {
    id: 'industry-req',
    title: 'Industry Requisitions',
    category: 'Portal Handshakes',
    breadcrumb: ['Docs', 'Portal Handshakes', 'Industry Requisitions'],
    badge: 'REQUISITION',
    description: 'Publish enterprise internship openings, set prerequisite DAG trees, and fetch verified candidate pools.',
    endpoint: 'https://api.capfly.io/v1/industry/requisitions',
    method: 'POST',
    subtitle: 'Publish Job Brief & Rubric',
    panelText: 'Posts enterprise hiring parameters directly to matching student dashboards across accredited partner colleges.',
    snippets: {
      javascript: `const req = await client.industry.createRequisition({
  title: "Cloud Infrastructure Intern",
  stipend: "₹35,000/mo",
  prerequisites: ["Kubernetes", "Golang"]
});
console.log("Published Requisition:", req.id);`,
      python: `req = client.industry.create_requisition(
    title="Cloud Infrastructure Intern",
    stipend="₹35,000/mo",
    prerequisites=["Kubernetes", "Golang"]
)
print("Published Requisition:", req.id)`,
      curl: `curl -X POST https://api.capfly.io/v1/industry/requisitions \\
  -H "Authorization: Bearer $CAPFLY_KEY" \\
  -d '{"title":"Cloud Infrastructure Intern","stipend":"₹35,000/mo"}'`
    }
  },

  'faculty-sign': {
    id: 'faculty-sign',
    title: 'Academia Endorsements',
    category: 'Portal Handshakes',
    breadcrumb: ['Docs', 'Portal Handshakes', 'Academia Endorsements'],
    badge: 'ENDORSEMENT',
    description: 'API endpoints for faculty members to co-sign capstones, accredit FDP participation, and approve industrial sabbaticals.',
    endpoint: 'https://api.capfly.io/v1/academia/endorse',
    method: 'POST',
    subtitle: 'Submit Faculty Endorsement',
    panelText: 'Digitally signs student project repositories with university department cryptographic verification keys.',
    snippets: {
      javascript: `const signoff = await client.academia.endorseProject({
  facultyId: "FAC-8812",
  projectId: "PROJ-AWS-09",
  grade: "A+"
});
console.log("Endorsement signature:", signoff.hash);`,
      python: `signoff = client.academia.endorse_project(
    faculty_id="FAC-8812",
    project_id="PROJ-AWS-09",
    grade="A+"
)
print("Endorsement hash:", signoff.hash)`,
      curl: `curl -X POST https://api.capfly.io/v1/academia/endorse \\
  -H "Authorization: Bearer $CAPFLY_KEY" \\
  -d '{"facultyId":"FAC-8812","projectId":"PROJ-AWS-09"}'`
    }
  },

  'institutional-sync': {
    id: 'institutional-sync',
    title: 'Institutional Sync',
    category: 'Portal Handshakes',
    breadcrumb: ['Docs', 'Portal Handshakes', 'Institutional Sync'],
    badge: 'POST',
    description: 'Bulk sync CGPA transcripts, placement eligibility manifests, and departmental syllabus benchmarks.',
    endpoint: 'https://api.capfly.io/v1/institution/sync',
    method: 'POST',
    subtitle: 'Batch Student Roster Synchronization',
    panelText: 'Ingests entire batch cohorts to calculate campus-wide employability and placement readiness.',
    snippets: {
      javascript: `const batchJob = await client.institution.startBatchSync({
  batchYear: 2026,
  department: "Information Technology",
  recordsCount: 450
});

console.log(\`Sync status: \${batchJob.status} | Verified: \${batchJob.verifiedCount}\`);`,
      python: `batch_job = client.institution.start_batch_sync(
    batch_year=2026,
    department="Information Technology",
    records_count=450
)

print(f"Sync status: {batch_job.status}")`,
      curl: `curl -X POST https://api.capfly.io/v1/institution/sync \\
  -H "Authorization: Bearer $CAPFLY_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"batchYear":2026,"department":"Information Technology"}'`
    }
  }
};

export const DocsPage: React.FC<DocsPageProps> = ({ onBack, onSelectPortal }) => {
  const [activeDocId, setActiveDocId] = useState<string>('quickstart');
  const [codeLang, setCodeLang] = useState<CodeLanguage>('javascript');
  const [copied, setCopied] = useState<boolean>(false);
  const [endpointCopied, setEndpointCopied] = useState<boolean>(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [isAiChatOpen, setIsAiChatOpen] = useState<boolean>(false);
  const [chatMessage, setChatMessage] = useState<string>('');
  const [chatLog, setChatLog] = useState<{ sender: 'user' | 'ai'; text: string }[]>([
    { sender: 'ai', text: 'CapFly API Docs assistant online. Ask me anything about endpoint parameters, SDK methods, or webhooks!' }
  ]);

  const activeDoc = docRegistry[activeDocId] || docRegistry['quickstart'];

  const getCodeSnippet = () => {
    return activeDoc.snippets[codeLang] || activeDoc.snippets.javascript;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getCodeSnippet());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyEndpoint = () => {
    navigator.clipboard.writeText(activeDoc.endpoint);
    setEndpointCopied(true);
    setTimeout(() => setEndpointCopied(false), 2000);
  };

  const handleGenerateKey = () => {
    const key = `capfly_live_key_${Math.random().toString(36).substring(2, 12)}_${Date.now()}`;
    setGeneratedKey(key);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    const msg = chatMessage;
    setChatLog(prev => [...prev, { sender: 'user', text: msg }]);
    setChatMessage('');
    setTimeout(() => {
      let reply = `The endpoint \`${activeDoc.endpoint}\` (${activeDoc.method}) is used for ${activeDoc.subtitle.toLowerCase()}. Pass bearer tokens in headers.`;
      const lower = msg.toLowerCase();
      if (lower.includes('key') || lower.includes('auth')) {
        reply = "Include `Authorization: Bearer <CAPFLY_KEY>` in header requests. You can generate API keys using the 'Create API key' button.";
      } else if (lower.includes('python') || lower.includes('sdk')) {
        reply = "Install via `pip install capfly` or `npm install @capfly/sdk`. Both support async batch synchronization and diagnostic queries.";
      }
      setChatLog(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-slate-200">
      
      {/* 2. TOP GLOBAL HEADER BAR */}
      <header className="h-14 border-b border-[#e5e7eb] bg-white px-6 flex items-center justify-between sticky top-0 z-50">
        {/* Left Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
          <div className="w-6 h-6 rounded-md bg-slate-950 flex items-center justify-center text-white font-bold text-xs">
            ⚡
          </div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base tracking-tight text-slate-950">
              CapFly
            </span>
            <span className="font-mono text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
              Developers
            </span>
          </div>
        </div>


        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Search Bar */}
          <div className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-200 text-xs text-slate-600 px-3 py-1.5 rounded-lg w-52 cursor-pointer">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="flex-1 text-slate-400">Search documentation...</span>
            <kbd className="bg-white border border-slate-200 px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-400 font-bold">⌘K</kbd>
          </div>

          {/* Console Link */}
          <button
            type="button"
            onClick={() => onSelectPortal?.('student')}
            className="border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs px-3 py-1.5 rounded-md font-semibold flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>Console</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </button>

          {/* Return to CapFly Home */}
          <button 
            type="button"
            onClick={onBack} 
            className="border border-slate-300 hover:border-slate-950 bg-white hover:bg-slate-50 text-slate-900 text-xs font-semibold px-3.5 py-1.5 rounded-md flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            ← Return to Home
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex min-h-[calc(100vh-56px)]">
        
        {/* 3. LEFT SIDEBAR */}
        <aside className="w-60 shrink-0 border-r border-[#e5e7eb] bg-white sticky top-14 h-[calc(100vh-56px)] overflow-y-auto px-3 py-4 hidden md:block scrollbar-none">
          
          {/* Top Home Button */}
          <div className="mb-2">
            <button
              type="button"
              onClick={() => setActiveDocId('quickstart')}
              className="h-8 px-2.5 rounded-md text-xs font-semibold bg-white border border-[#e5e7eb] shadow-xs flex items-center justify-between cursor-pointer w-full text-left transition-colors hover:bg-slate-50"
            >
              <span className="truncate text-[12px] leading-none">CapFly Platform</span>
              <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold shrink-0 ml-1.5">
                v2.4
              </span>
            </button>
          </div>

          {/* 01. GET STARTED */}
          <div>
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 px-2 mt-4 mb-1.5">
              01. GET STARTED
            </div>
            <div className="space-y-0.5">
              {[
                { id: 'quickstart', label: 'Developer quickstart' },
                { id: 'auth', label: 'Authentication & API Keys' },
                { id: 'architecture', label: 'Role Architecture' }
              ].map((item) => {
                const isActive = activeDocId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveDocId(item.id)}
                    className={`h-8 px-2.5 rounded-md text-xs flex items-center justify-between transition-colors cursor-pointer w-full text-left truncate ${
                      isActive
                        ? 'bg-slate-100 text-slate-950 font-semibold border border-slate-200/80'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50 font-medium'
                    }`}
                  >
                    <span className="truncate text-[12px] leading-none">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 02. CORE ENGINES */}
          <div>
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 px-2 mt-4 mb-1.5">
              02. CORE ENGINES
            </div>
            <div className="space-y-0.5">
              {[
                { id: 'skill-assessment', label: 'Skill Assessment API', badge: 'Core API' },
                { id: 'gap-analysis', label: 'Prerequisite Gap Engine' },
                { id: 'matcher', label: 'Placement Matcher' },
                { id: 'vault', label: 'Digital Vault Telemetry' }
              ].map((item) => {
                const isActive = activeDocId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveDocId(item.id)}
                    className={`h-8 px-2.5 rounded-md text-xs flex items-center justify-between transition-colors cursor-pointer w-full text-left truncate ${
                      isActive
                        ? 'bg-slate-100 text-slate-950 font-semibold border border-slate-200/80'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50 font-medium'
                    }`}
                  >
                    <span className="truncate text-[12px] leading-none">{item.label}</span>
                    {item.badge && (
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded leading-none shrink-0 ml-1.5">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 03. PORTAL HANDSHAKES */}
          <div>
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 px-2 mt-4 mb-1.5">
              03. PORTAL HANDSHAKES
            </div>
            <div className="space-y-0.5">
              {[
                { id: 'student-wh', label: 'Student Webhooks' },
                { id: 'industry-req', label: 'Industry Requisitions' },
                { id: 'faculty-sign', label: 'Academia Endorsements' },
                { id: 'institutional-sync', label: 'Institutional Sync', badge: 'POST' }
              ].map((item) => {
                const isActive = activeDocId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveDocId(item.id)}
                    className={`h-8 px-2.5 rounded-md text-xs flex items-center justify-between transition-colors cursor-pointer w-full text-left truncate ${
                      isActive
                        ? 'bg-slate-100 text-slate-950 font-semibold border border-slate-200/80'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50 font-medium'
                    }`}
                  >
                    <span className="truncate text-[12px] leading-none">{item.label}</span>
                    {item.badge && (
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded leading-none shrink-0 ml-1.5">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* 4. MAIN CONTENT AREA */}
        <main className="flex-1 max-w-4xl px-6 lg:px-10 py-8 space-y-6">
          
          {/* Breadcrumb */}
          <div className="font-mono text-xs text-slate-500 flex items-center gap-2">
            {activeDoc.breadcrumb.map((crumb, index) => (
              <React.Fragment key={index}>
                <span className={index === activeDoc.breadcrumb.length - 1 ? 'text-slate-900 font-semibold' : ''}>
                  {crumb}
                </span>
                {index < activeDoc.breadcrumb.length - 1 && (
                  <ChevronRight className="w-3 h-3 text-slate-400" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Header */}
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black tracking-tight text-slate-950 font-sans flex items-center gap-3">
                {activeDoc.title}
              </h1>
              <span className="bg-slate-100 text-slate-800 font-mono text-[11px] font-bold px-2 py-0.5 rounded">
                [ {activeDoc.badge} ]
              </span>
            </div>
            <p className="text-sm text-slate-600 mt-2 font-sans leading-relaxed">
              {activeDoc.description}
            </p>
          </div>

          {/* Endpoint Bar */}
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg flex items-center justify-between font-mono text-xs text-slate-800">
            <div className="flex items-center gap-3">
              <span className="bg-slate-900 text-white font-bold px-2 py-0.5 rounded text-[10px]">
                {activeDoc.method}
              </span>
              <span className="text-blue-700 font-semibold">
                {activeDoc.endpoint}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="bg-slate-200 text-slate-700 font-bold px-1.5 py-0.5 rounded text-[10px]">
                v2.4 API
              </span>
              <button
                type="button"
                onClick={handleCopyEndpoint}
                className="text-slate-500 hover:text-slate-950 transition-colors flex items-center gap-1 cursor-pointer text-[11px]"
              >
                {endpointCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-bold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy URL</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* THE QUICKSTART SPLIT CARD */}
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs grid grid-cols-12">
            
            {/* Left Sub-Panel (Cols 1 to 5) */}
            <div className="col-span-12 lg:col-span-5 p-6 bg-slate-50/50 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-blue-700 font-mono text-[10px] font-bold tracking-wider uppercase">
                  [ SDK INITIALIZATION ]
                </span>
                <h3 className="text-lg font-bold text-slate-950 mt-2">
                  {activeDoc.subtitle}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed font-sans">
                  {activeDoc.panelText}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-6">
                <button 
                  type="button"
                  onClick={() => onSelectPortal?.('student')}
                  className="bg-slate-950 hover:bg-black text-white font-semibold text-xs px-4 py-2 rounded-md transition-colors cursor-pointer"
                >
                  Get started →
                </button>
                <button 
                  type="button"
                  onClick={() => setIsApiKeyModalOpen(true)}
                  className="bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-semibold text-xs px-4 py-2 rounded-md transition-colors cursor-pointer"
                >
                  Create API key
                </button>
              </div>
            </div>

            {/* Right Sub-Panel (Cols 6 to 12 - Syntax Highlighted Code) */}
            <div className="col-span-12 lg:col-span-7 bg-[#0d1117] p-5 font-mono text-xs text-slate-200 flex flex-col justify-between min-h-[280px]">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    {[
                      { id: 'javascript' as CodeLanguage, label: 'JavaScript' },
                      { id: 'python' as CodeLanguage, label: 'Python' },
                      { id: 'curl' as CodeLanguage, label: 'cURL' }
                    ].map(lang => (
                      <button
                        key={lang.id}
                        type="button"
                        onClick={() => setCodeLang(lang.id)}
                        className={`cursor-pointer transition-colors ${
                          codeLang === lang.id
                            ? 'bg-blue-600 text-white rounded px-2.5 py-1 text-[11px] font-semibold'
                            : 'text-slate-400 hover:text-white px-2 py-1 text-[11px]'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-[11px] cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied ✓</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Code Window */}
                <pre className="overflow-x-auto text-[11px] leading-relaxed text-slate-200 font-mono py-1">
                  <code>{getCodeSnippet()}</code>
                </pre>
              </div>

              {/* Footer row */}
              <div className="text-slate-500 text-[10px] pt-3 border-t border-slate-800 flex justify-between font-mono">
                <span>API Endpoint: v2/skill-engine</span>
                <span>Response Time: ~45ms</span>
              </div>
            </div>

          </div>

          {/* LMS Integration Banner */}
          <div className="bg-slate-900 text-white rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs mt-6">
            <div className="space-y-1">
              <div className="font-mono text-[10px] font-bold text-sky-400 uppercase tracking-wider">
                ⚡ LMS INTEGRATION
              </div>
              <h3 className="text-base font-bold text-white">
                Build with the CapFly Engine in Canvas / Moodle
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                The CapFly LMS plugin syncs verified lab assessments directly to student digital portfolios.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onSelectPortal?.('institution')}
              className="bg-white hover:bg-slate-100 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs transition-colors shrink-0 cursor-pointer"
            >
              Install the plugin →
            </button>
          </div>

          {/* Build Paths Grid (2 Cards) */}
          <div className="space-y-4 pt-2">
            <h2 className="text-xl font-bold tracking-tight text-slate-950 font-sans">
              Build paths
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-sans">
              
              {/* Card 1 */}
              <div className="border border-slate-200 p-5 rounded-xl bg-white hover:border-slate-400 transition-colors shadow-2xs">
                <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-900 flex items-center justify-center mb-3">
                  <Code2 className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-slate-950 mb-1">
                  Skill Assessment API
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal mb-4">
                  Ingest industry-curated technical questionnaires, evaluate soft-skill diagnostics, and output tamper-proof competency ledgers.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveDocId('skill-assessment')}
                  className="font-mono text-xs font-bold text-blue-700 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore API Specs →</span>
                </button>
              </div>

              {/* Card 2 */}
              <div className="border border-slate-200 p-5 rounded-xl bg-white hover:border-slate-400 transition-colors shadow-2xs">
                <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-900 flex items-center justify-center mb-3">
                  <Terminal className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-slate-950 mb-1">
                  Talent Matcher SDK
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal mb-4">
                  Filter verified candidates by real-time test benchmarks, faculty endorsements, and GitHub code hygiene telemetry.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveDocId('matcher')}
                  className="font-mono text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore Matcher Specs →</span>
                </button>
              </div>

            </div>
          </div>

        </main>
      </div>

      {/* Floating AI Assistant */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isAiChatOpen ? (
          <button
            type="button"
            onClick={() => setIsAiChatOpen(true)}
            className="bg-slate-950 text-white px-4 py-2 rounded-full font-sans text-xs font-semibold shadow-lg hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer border border-slate-800"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Ask CapFly AI</span>
          </button>
        ) : (
          <div className="w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden font-sans flex flex-col h-[400px]">
            <div className="bg-slate-950 p-3 text-white flex items-center justify-between">
              <span className="font-mono text-xs font-bold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                Ask CapFly AI ({activeDoc.title})
              </span>
              <button type="button" onClick={() => setIsAiChatOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 p-3 overflow-y-auto space-y-2 text-xs font-sans bg-slate-50">
              {chatLog.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-2.5 rounded-xl ${msg.sender === 'user' ? 'bg-slate-950 text-white' : 'bg-white border border-slate-200 text-slate-800 shadow-2xs'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendChat} className="p-2 border-t border-slate-200 bg-white flex gap-1">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder={`Ask about ${activeDoc.title}...`}
                className="flex-1 px-2.5 py-1 text-xs border border-slate-200 rounded-md focus:outline-none focus:border-slate-400"
              />
              <button type="submit" className="bg-slate-950 text-white text-xs font-mono font-bold px-3 py-1 rounded-md cursor-pointer">
                Send
              </button>
            </form>
          </div>
        )}
      </div>

      {/* API Key Modal */}
      {isApiKeyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 font-sans">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-slate-950" />
                <h3 className="font-bold text-base text-slate-950">Create Developer API Key</h3>
              </div>
              <button type="button" onClick={() => setIsApiKeyModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Generate a secret key to authenticate your SDK queries against CapFly live skill diagnostic endpoints.
            </p>

            {!generatedKey ? (
              <button
                type="button"
                onClick={handleGenerateKey}
                className="w-full bg-slate-950 text-white font-mono text-xs font-bold py-2.5 rounded-lg hover:bg-black transition-colors cursor-pointer"
              >
                GENERATE LIVE KEY →
              </button>
            ) : (
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 bg-slate-900 text-emerald-400 rounded-lg break-all border border-slate-800">
                  {generatedKey}
                </div>
                <div className="text-[11px] text-amber-600 font-sans font-semibold">
                  ⚠️ Copy this key now. It will not be shown again.
                </div>
                <button
                  type="button"
                  onClick={() => setIsApiKeyModalOpen(false)}
                  className="w-full bg-slate-950 text-white font-bold py-2 rounded-lg cursor-pointer hover:bg-black transition-colors"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default DocsPage;
