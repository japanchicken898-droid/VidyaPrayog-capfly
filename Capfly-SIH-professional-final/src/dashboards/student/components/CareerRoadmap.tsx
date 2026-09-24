import React, { useState } from 'react';
import { Briefcase, ArrowLeft, CheckCircle2, ChevronRight, Zap, Target, Award, Rocket, AlertTriangle, ExternalLink } from 'lucide-react';

// Standardized Phases for all Career Tracks
const PHASES = [
  'Foundational Academics & Core Competencies',
  'Intermediate Skill Development & Certifications',
  'Applied Projects & Industry Internships',
  'Final Placement & Interview Readiness'
];

// Master Data Structure
const INITIAL_CAREER_TRACKS = {
  'Full-Stack Engineer': {
    title: 'Full-Stack Engineer',
    avgPackage: '₹12-24 LPA',
    demandIndex: 'Critical',
    matchScore: 88,
    description: 'Design and build end-to-end scalable web applications. Master both frontend UI architectures and backend microservices.',
    phases: [
      {
        title: PHASES[0],
        nodes: [
          { id: 'fse_1_1', name: 'Data Structures & Algorithms (Java/C++)', status: 'done', action: 'Practice on Code Arena', gap: null },
          { id: 'fse_1_2', name: 'Database Management Systems (DBMS)', status: 'done', action: 'Review SQL Module', gap: null },
          { id: 'fse_1_3', name: 'Computer Networks & OS', status: 'learning', action: 'Start Networking Course', gap: '⚠️ Low OS concept scores in recent test' }
        ]
      },
      {
        title: PHASES[1],
        nodes: [
          { id: 'fse_2_1', name: 'React / Next.js Certification', status: 'pending', action: 'Enroll in React Masterclass', gap: null },
          { id: 'fse_2_2', name: 'Node.js & Express API Development', status: 'pending', action: 'View Backend Curriculum', gap: null },
          { id: 'fse_2_3', name: 'System Design Basics', status: 'pending', action: 'Watch System Design VODs', gap: null }
        ]
      },
      {
        title: PHASES[2],
        nodes: [
          { id: 'fse_3_1', name: 'Build E-Commerce Clone', status: 'pending', action: 'View Project Brief', gap: null },
          { id: 'fse_3_2', name: 'Summer Industry Internship', status: 'pending', action: 'Apply on Opportunity Hub', gap: '⚠️ Requires minimum 75% coding score' },
          { id: 'fse_3_3', name: 'Open Source Contributions', status: 'pending', action: 'View GitHub Repos', gap: null }
        ]
      },
      {
        title: PHASES[3],
        nodes: [
          { id: 'fse_4_1', name: 'Mock Technical Interviews', status: 'pending', action: 'Schedule Mock Interview', gap: null },
          { id: 'fse_4_2', name: 'Aptitude & Logical Reasoning Prep', status: 'pending', action: 'Start Aptitude Test', gap: '⚠️ Logical Reasoning is currently below 50%' },
          { id: 'fse_4_3', name: 'Final Placement Drive', status: 'pending', action: 'View Eligible Companies', gap: null }
        ]
      }
    ]
  },
  'Data Scientist': {
    title: 'Data Scientist',
    avgPackage: '₹14-30 LPA',
    demandIndex: 'High',
    matchScore: 72,
    description: 'Leverage statistical models, machine learning, and big data technologies to extract insights and drive business decisions.',
    phases: [
      {
        title: PHASES[0],
        nodes: [
          { id: 'ds_1_1', name: 'Advanced Mathematics & Statistics', status: 'learning', action: 'Start Stats Module', gap: null },
          { id: 'ds_1_2', name: 'Python for Data Science', status: 'pending', action: 'Practice Pandas/NumPy', gap: null }
        ]
      },
      {
        title: PHASES[1],
        nodes: [
          { id: 'ds_2_1', name: 'Machine Learning Certification', status: 'pending', action: 'Enroll in ML Course', gap: null },
          { id: 'ds_2_2', name: 'Deep Learning (TensorFlow/PyTorch)', status: 'pending', action: 'View DL Curriculum', gap: null }
        ]
      },
      {
        title: PHASES[2],
        nodes: [
          { id: 'ds_3_1', name: 'Predictive Modeling Project', status: 'pending', action: 'Download Dataset', gap: null },
          { id: 'ds_3_2', name: 'Data Engineering Internship', status: 'pending', action: 'Apply on Opportunity Hub', gap: null }
        ]
      },
      {
        title: PHASES[3],
        nodes: [
          { id: 'ds_4_1', name: 'Case Study Interviews', status: 'pending', action: 'Practice Case Studies', gap: null },
          { id: 'ds_4_2', name: 'Final Placement Drive', status: 'pending', action: 'View Eligible Companies', gap: null }
        ]
      }
    ]
  },
  'Cloud Architect': {
    title: 'Cloud Architect',
    avgPackage: '₹15-35 LPA',
    demandIndex: 'Critical',
    matchScore: 65,
    description: 'Design, deploy, and manage scalable, highly available, and fault-tolerant systems on AWS, Azure, or GCP.',
    phases: [
      {
        title: PHASES[0],
        nodes: [
          { id: 'ca_1_1', name: 'Networking & OS Internals', status: 'learning', action: 'Start Networking Course', gap: null },
          { id: 'ca_1_2', name: 'Linux Administration', status: 'pending', action: 'Practice Linux CLI', gap: null }
        ]
      },
      {
        title: PHASES[1],
        nodes: [
          { id: 'ca_2_1', name: 'AWS/Azure Solutions Architect Cert', status: 'pending', action: 'Enroll in Certification Prep', gap: null },
          { id: 'ca_2_2', name: 'Infrastructure as Code (Terraform)', status: 'pending', action: 'View IaC Curriculum', gap: null }
        ]
      },
      {
        title: PHASES[2],
        nodes: [
          { id: 'ca_3_1', name: 'Deploy Scalable Web App', status: 'pending', action: 'View Project Brief', gap: null },
          { id: 'ca_3_2', name: 'DevOps Internship', status: 'pending', action: 'Apply on Opportunity Hub', gap: null }
        ]
      },
      {
        title: PHASES[3],
        nodes: [
          { id: 'ca_4_1', name: 'System Design Interviews', status: 'pending', action: 'Practice System Design', gap: null },
          { id: 'ca_4_2', name: 'Final Placement Drive', status: 'pending', action: 'View Eligible Companies', gap: null }
        ]
      }
    ]
  },
  'Cybersecurity Analyst': {
    title: 'Cybersecurity Analyst',
    avgPackage: '₹10-22 LPA',
    demandIndex: 'High',
    matchScore: 80,
    description: 'Protect networks, systems, and data from cyber threats through ethical hacking, monitoring, and incident response.',
    phases: [
      {
        title: PHASES[0],
        nodes: [
          { id: 'cs_1_1', name: 'Networking Protocols (TCP/IP)', status: 'learning', action: 'Start Networking Course', gap: null },
          { id: 'cs_1_2', name: 'Cryptography Basics', status: 'pending', action: 'View Crypto Curriculum', gap: null }
        ]
      },
      {
        title: PHASES[1],
        nodes: [
          { id: 'cs_2_1', name: 'CompTIA Security+ / CEH', status: 'pending', action: 'Enroll in Certification Prep', gap: null },
          { id: 'cs_2_2', name: 'Web Application Security (OWASP)', status: 'pending', action: 'Practice OWASP Top 10', gap: null }
        ]
      },
      {
        title: PHASES[2],
        nodes: [
          { id: 'cs_3_1', name: 'Vulnerability Assessment Project', status: 'pending', action: 'View Project Brief', gap: null },
          { id: 'cs_3_2', name: 'Security Operations Internship', status: 'pending', action: 'Apply on Opportunity Hub', gap: null }
        ]
      },
      {
        title: PHASES[3],
        nodes: [
          { id: 'cs_4_1', name: 'CTF (Capture The Flag) Challenges', status: 'pending', action: 'Participate in CTF', gap: null },
          { id: 'cs_4_2', name: 'Final Placement Drive', status: 'pending', action: 'View Eligible Companies', gap: null }
        ]
      }
    ]
  }
};

const NodeItem = ({ node, onStatusChange }: { node: any, onStatusChange: (status: string) => void }) => {
  const [showPopover, setShowPopover] = useState(false);

  let wrapperClass = "bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm";
  let textClass = "text-slate-700";
  let Icon = Target;
  let iconClass = "text-slate-300 group-hover:text-slate-400";
  let extraBadge = null;

  if (node.status === 'done') {
    wrapperClass = "bg-emerald-50 border-emerald-200";
    textClass = "text-slate-400 line-through decoration-slate-300";
    Icon = CheckCircle2;
    iconClass = "text-emerald-500";
  } else if (node.status === 'learning') {
    wrapperClass = "bg-blue-50 border-blue-300 shadow-md ring-2 ring-blue-100";
    textClass = "text-blue-900";
    Icon = Zap;
    iconClass = "text-blue-500";
    extraBadge = <span className="text-[10px] uppercase tracking-wider font-black text-blue-600 bg-blue-200 px-2 py-0.5 rounded ml-3 shrink-0">In Progress</span>;
  } else if (node.status === 'skip') {
    wrapperClass = "opacity-40 bg-slate-100 border-slate-200";
    textClass = "text-slate-500";
    Icon = CheckCircle2; 
    iconClass = "text-slate-400";
  }

  return (
    <div className="relative">
      <div 
        className={`px-4 py-4 rounded-xl border-2 transition-all cursor-pointer group flex flex-col gap-3 ${wrapperClass}`} 
        onClick={() => setShowPopover(!showPopover)}
      >
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Icon className={`w-5 h-5 mt-0.5 ${iconClass}`} />
            <span className={`font-bold text-sm text-left ${textClass}`}>
              {node.name}
            </span>
          </div>
          {extraBadge}
        </div>

        {node.gap && node.status !== 'done' && (
          <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg p-2 mt-1">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <span className="text-xs font-semibold text-amber-700">{node.gap}</span>
          </div>
        )}

        {node.status !== 'done' && (
          <div className="mt-2 pt-3 border-t border-slate-100/50 flex justify-between items-center">
             <button onClick={(e) => { e.stopPropagation(); alert(`Navigating to: ${node.action}`); }} className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 bg-white/50 px-2 py-1 rounded border border-blue-100 hover:bg-blue-50 transition-colors">
               {node.action} <ExternalLink className="w-3 h-3" />
             </button>
          </div>
        )}
      </div>

      {/* Interactive Popover */}
      {showPopover && (
        <div 
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-40 bg-white rounded-xl shadow-xl border border-slate-200 p-1.5 z-30 flex flex-col gap-1 animate-fade-in" 
          onClick={e => e.stopPropagation()}
        >
          <button 
            onClick={() => { onStatusChange('learning'); setShowPopover(false); }} 
            className="text-xs font-bold px-3 py-2 rounded-lg hover:bg-blue-50 text-blue-700 text-left w-full flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Zap className="w-4 h-4 text-blue-500" /> Mark In Progress
          </button>
          <button 
            onClick={() => { onStatusChange('done'); setShowPopover(false); }} 
            className="text-xs font-bold px-3 py-2 rounded-lg hover:bg-emerald-50 text-emerald-700 text-left w-full flex items-center gap-2 transition-colors cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Mark Complete
          </button>
          <div className="h-px bg-slate-100 my-1"></div>
          <button 
            onClick={() => { onStatusChange('pending'); setShowPopover(false); }} 
            className="text-xs font-bold px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-500 text-left w-full flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Target className="w-4 h-4 text-slate-300" /> Reset
          </button>
        </div>
      )}
    </div>
  );
};


export const CareerRoadmap = () => {
  // Deep clone to ensure full reset on unmount
  const [tracksData, setTracksData] = useState(() => JSON.parse(JSON.stringify(INITIAL_CAREER_TRACKS)));
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);

  const handleStatusChange = (trackId: string, phaseIdx: number, nodeIdx: number, newStatus: string) => {
    setTracksData((prev: any) => {
      const newData = { ...prev };
      const track = { ...newData[trackId] };
      const phases = [...track.phases];
      const nodes = [...phases[phaseIdx].nodes];
      
      nodes[nodeIdx] = { ...nodes[nodeIdx], status: newStatus };
      phases[phaseIdx] = { ...phases[phaseIdx], nodes };
      track.phases = phases;
      
      newData[trackId] = track;
      return newData;
    });
  };

  if (!selectedTrack) {
    return (
      <div className="animate-in fade-in duration-300 w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black text-slate-800">Explore Career Tracks</h2>
          <div className="text-sm font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">Select a role to view the roadmap</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(tracksData).map(([trackName, track]: [string, any]) => (
            <div 
              key={trackName}
              onClick={() => setSelectedTrack(trackName)}
              className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100 text-blue-600 group-hover:scale-110 transition-transform">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Demand</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded mt-0.5 ${
                      track.demandIndex === 'Critical' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                    }`}>
                      {track.demandIndex}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-base font-black text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">{track.title}</h3>
                <p className="text-xs font-medium text-slate-500 mb-4 line-clamp-2">{track.description}</p>
                
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 mb-4">
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Avg Package</span>
                    <span className="font-bold text-slate-700 text-xs">{track.avgPackage}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Match</span>
                    <div className="flex items-center gap-1.5">
                       <span className="font-bold text-blue-600 text-xs">{track.matchScore}%</span>
                       <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
                         <div className="h-full bg-blue-500 rounded-full" style={{ width: `${track.matchScore}%` }}></div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-blue-600 group-hover:text-blue-700">View Roadmap</span>
                <ChevronRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const currentTrack = tracksData[selectedTrack];

  return (
    <div className="animate-in slide-in-from-right-4 duration-300 w-full relative">
      
      {/* Header Area */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-12 sticky top-0 z-40">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => setSelectedTrack(null)}
            className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-50 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Careers
          </button>
          <div className="flex gap-2">
             <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${currentTrack.demandIndex === 'Critical' ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-emerald-50 border-emerald-100 text-emerald-600'}`}>
                {currentTrack.demandIndex} Demand
             </span>
             <span className="text-xs font-bold px-2.5 py-1 rounded-md border bg-slate-50 border-slate-200 text-slate-600">
                {currentTrack.avgPackage}
             </span>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white shrink-0 mt-1">
            <Rocket className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">{currentTrack.title}</h2>
            <p className="text-sm font-medium text-slate-500 mt-1 max-w-2xl">{currentTrack.description}</p>
          </div>
        </div>
      </div>

      {/* Timeline Layout */}
      <div className="max-w-4xl mx-auto pb-24 px-4 relative">
        {/* Central Vertical Timeline Line */}
        <div className="absolute left-12 top-0 bottom-0 w-1 bg-slate-200 z-0 rounded-full md:left-1/2 md:-translate-x-1/2"></div>

        <div className="space-y-16 relative z-10">
          {currentTrack.phases.map((phase: any, pIdx: number) => {
            const isLeft = pIdx % 2 === 0;

            return (
              <div key={pIdx} className="relative flex flex-col md:flex-row md:items-start group">
                
                {/* Mobile: Phase marker on left. Desktop: Phase marker in center */}
                <div className="absolute left-12 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2 w-10 h-10 bg-white border-4 border-slate-200 group-hover:border-blue-400 rounded-full flex items-center justify-center z-20 shadow-sm transition-colors top-0">
                  <span className="text-xs font-black text-slate-500 group-hover:text-blue-600 transition-colors">P{pIdx + 1}</span>
                </div>

                {/* Content Box */}
                <div className={`pl-24 md:pl-0 w-full md:w-[calc(50%-3rem)] ${isLeft ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'}`}>
                   
                   {/* Phase Header */}
                   <div className={`mb-6 ${isLeft ? 'md:items-end' : 'md:items-start'} flex flex-col`}>
                      <span className="text-xs font-black text-blue-600 uppercase tracking-widest mb-1">Phase {pIdx + 1}</span>
                      <h3 className="text-lg font-black text-slate-800">{phase.title}</h3>
                   </div>

                   {/* Nodes container */}
                   <div className="space-y-4">
                     {phase.nodes.map((node: any, nIdx: number) => (
                       <NodeItem 
                         key={nIdx}
                         node={node}
                         onStatusChange={(status) => handleStatusChange(selectedTrack, pIdx, nIdx, status)}
                       />
                     ))}
                   </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
