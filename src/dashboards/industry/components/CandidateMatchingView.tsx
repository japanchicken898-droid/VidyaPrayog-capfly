import React, { useState } from 'react';
import {
  UserCheck, Sparkles, Search, ChevronRight, Zap,
  CheckCircle2, X, Award, Check, ExternalLink
} from 'lucide-react';

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.2a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
  </svg>
);

const LeetCodeIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.16zM15.42 12.062a1.38 1.38 0 0 0-1.378 1.382v2.76a1.38 1.38 0 0 0 2.76 0v-2.76c0-.764-.617-1.382-1.382-1.382z" />
  </svg>
);

// ─── Types ───────────────────────────────────────────────────────────────────

export interface VerifiedPlatforms {
  github: {
    repoCount: number;
    pinnedProject: string;
    projectUrl: string;
    profileUrl: string; // empty string = not linked
  };
  linkedin: {
    handle: string;
    verified: boolean;
    profileUrl: string;
  };
  leetcode: {
    rankOrBadge: string;
    badge: string;
    profileUrl: string;
  };
}

export interface MatchedCandidate {
  id: string;
  name: string;
  college: string;
  year: string;
  topSkills: string[];
  matchScore: number;
  assignedTestScore: number;
  isTopPerformer: boolean;
  status: 'Available' | 'Fast-Tracked for Interview' | 'Shortlisted';
  verifiedPlatforms: VerifiedPlatforms;
}

const INITIAL_CANDIDATES: MatchedCandidate[] = [
  {
    id: 'c-1',
    name: 'Priya Sharma',
    college: 'IIT Madras',
    year: 'B.Tech Computer Science (Final Year)',
    topSkills: ['React', 'TypeScript', 'Node.js', 'Distributed Systems', 'PostgreSQL'],
    matchScore: 98,
    assignedTestScore: 93,
    isTopPerformer: true,
    status: 'Available',
    verifiedPlatforms: {
      github: {
        repoCount: 14,
        pinnedProject: 'Distributed Cache Engine',
        projectUrl: 'https://github.com/priyasharma-dev/cache-engine',
        profileUrl: 'https://github.com/priyasharma-dev'
      },
      linkedin: {
        handle: 'in/priyasharma-cse',
        verified: true,
        profileUrl: 'https://linkedin.com/in/priyasharma-cse'
      },
      leetcode: {
        rankOrBadge: 'Knight / 420+ Solved',
        badge: 'Top Tier ↗',
        profileUrl: 'https://leetcode.com/priyasharma'
      }
    }
  },
  {
    id: 'c-2',
    name: 'Rohan Verma',
    college: 'Anna University',
    year: 'B.Tech Information Technology (Final Year)',
    topSkills: ['Python', 'FastAPI', 'Docker', 'PostgreSQL', 'Redis'],
    matchScore: 95,
    assignedTestScore: 91,
    isTopPerformer: true,
    status: 'Available',
    verifiedPlatforms: {
      github: {
        repoCount: 19,
        pinnedProject: 'Async Event Broker',
        projectUrl: 'https://github.com/rohanverma-tech/event-broker',
        profileUrl: 'https://github.com/rohanverma-tech'
      },
      linkedin: {
        handle: 'in/rohanverma-tech',
        verified: true,
        profileUrl: 'https://linkedin.com/in/rohanverma-tech'
      },
      leetcode: {
        rankOrBadge: 'Guardian / 580+ Solved',
        badge: 'Top Tier ↗',
        profileUrl: 'https://leetcode.com/rohanverma'
      }
    }
  },
  {
    id: 'c-3',
    name: 'Meera Nambiar',
    college: 'BITS Pilani',
    year: 'B.Tech AI & Data Science (Year 3)',
    topSkills: ['PyTorch', 'Computer Vision', 'Python', 'MLOps', 'Transformers'],
    matchScore: 94,
    assignedTestScore: 92,
    isTopPerformer: true,
    status: 'Available',
    verifiedPlatforms: {
      github: {
        repoCount: 12,
        pinnedProject: 'Edge Vision Inference Pipeline',
        projectUrl: 'https://github.com/meera-nambiar/edge-vision',
        profileUrl: 'https://github.com/meera-nambiar'
      },
      linkedin: {
        handle: 'in/meera-nambiar',
        verified: true,
        profileUrl: 'https://linkedin.com/in/meera-nambiar'
      },
      leetcode: {
        rankOrBadge: 'Knight / 350+ Solved',
        badge: 'Top Tier ↗',
        profileUrl: 'https://leetcode.com/meeranambiar'
      }
    }
  },
  {
    id: 'c-4',
    name: 'Ananya Iyer',
    college: 'NIT Trichy',
    year: 'B.Tech Electronics & Comm. (Final Year)',
    topSkills: ['C++', 'Embedded Systems', 'IoT', 'RTOS', 'Linux Kernel'],
    matchScore: 91,
    assignedTestScore: 89,
    isTopPerformer: false,
    status: 'Available',
    verifiedPlatforms: {
      github: {
        repoCount: 8,
        pinnedProject: 'FreeRTOS Industrial Telemetry Hub',
        projectUrl: 'https://github.com/ananya-iyer-dev/rtos-hub',
        profileUrl: 'https://github.com/ananya-iyer-dev'
      },
      linkedin: {
        handle: '',
        verified: false,
        profileUrl: '' // unlinked to demonstrate disabled state
      },
      leetcode: {
        rankOrBadge: 'Knight / 310+ Solved',
        badge: 'Top Tier ↗',
        profileUrl: 'https://leetcode.com/ananyaiyer'
      }
    }
  },
];

export const CandidateMatchingView: React.FC = () => {
  const [candidates, setCandidates] = useState<MatchedCandidate[]>(INITIAL_CANDIDATES);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'fast-tracked' | 'top-performers'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Fast-track interview action
  const handleFastTrack = (id: string) => {
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: 'Fast-Tracked for Interview' } : c
      )
    );
    setToastMessage('Candidate shortlisted for direct fast-track interview.');
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Standard shortlist action
  const handleShortlist = (id: string) => {
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === 'Shortlisted' ? 'Available' : 'Shortlisted' } : c
      )
    );
    setToastMessage('Candidate updated in shortlist pool.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filtered = candidates.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.college.toLowerCase().includes(search.toLowerCase()) ||
      c.topSkills.some((s) => s.toLowerCase().includes(search.toLowerCase()));

    if (!matchesSearch) return false;
    if (filterType === 'fast-tracked') return c.status === 'Fast-Tracked for Interview';
    if (filterType === 'top-performers') return c.isTopPerformer;
    return true;
  });

  const fastTrackedCount = candidates.filter((c) => c.status === 'Fast-Tracked for Interview').length;
  const topPerformersCount = candidates.filter((c) => c.isTopPerformer).length;

  return (
    <div className="flex flex-col space-y-3 h-[calc(100vh-120px)] overflow-hidden">
      {/* Floating Success Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
          <div className="flex items-center gap-3 px-4 py-3 bg-[#0B192C] text-white rounded-2xl shadow-2xl border border-slate-700 max-w-md">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4 fill-blue-400" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-white">Direct Interview Pipeline</p>
              <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">{toastMessage}</p>
            </div>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Header & Quick Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
            <UserCheck className="w-4 h-4" />
            <span>AI Talent Recommender &amp; Verified Credentials</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 font-['Outfit'] mt-1">
            Candidate Matching
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Filter Pills */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                filterType === 'all'
                  ? 'bg-white text-blue-600 shadow-xs font-bold'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              All ({candidates.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterType('top-performers')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                filterType === 'top-performers'
                  ? 'bg-white text-blue-600 shadow-xs font-bold'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              Top Performers ({topPerformersCount})
            </button>
            <button
              type="button"
              onClick={() => setFilterType('fast-tracked')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                filterType === 'fast-tracked'
                  ? 'bg-blue-600 text-white shadow-xs font-bold'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              <Zap className="w-3 h-3" />
              Fast-Tracked ({fastTrackedCount})
            </button>
          </div>

          {/* Search bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search skill, college, name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 w-48 sm:w-56"
            />
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Candidate Cards Grid */}
      <div className="flex-1 overflow-y-auto min-h-0 pb-4">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
          {filtered.map((candidate) => {
            const isFastTracked = candidate.status === 'Fast-Tracked for Interview';
            const gh = candidate.verifiedPlatforms.github;
            const li = candidate.verifiedPlatforms.linkedin;
            const lc = candidate.verifiedPlatforms.leetcode;

            return (
              <div
                key={candidate.id}
                className={`bg-white rounded-xl border p-4 shadow-xs flex flex-col justify-between transition-all hover:shadow-md ${
                  isFastTracked
                    ? 'border-blue-400 ring-2 ring-blue-100/50'
                    : 'border-[#E2E8F0] hover:border-blue-300'
                }`}
              >
                <div>
                  {/* Top Row: Candidate Name, College & Match Score */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <h3 className="text-lg font-bold text-slate-950 font-['Outfit'] leading-none">
                          {candidate.name}
                        </h3>
                        {isFastTracked ? (
                          <span className="px-1.5 py-0.5 rounded text-[9px] bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold tracking-wide flex items-center gap-1 shadow-2xs">
                            <Zap className="w-2.5 h-2.5 fill-amber-300 text-amber-300" />
                            FAST-TRACKED
                          </span>
                        ) : candidate.status === 'Shortlisted' ? (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-bold flex items-center gap-1">
                            <Check className="w-2.5 h-2.5" />
                            SHORTLISTED
                          </span>
                        ) : candidate.isTopPerformer ? (
                          <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-300 text-[9px] font-extrabold flex items-center gap-1">
                            <Award className="w-2.5 h-2.5 text-amber-600" />
                            TOP 5%
                          </span>
                        ) : null}
                      </div>
                      <p className="text-[11px] font-semibold text-slate-600">
                        {candidate.college} • {candidate.year}
                      </p>
                    </div>

                    <div className="flex flex-col items-end shrink-0 gap-1">
                      <span className="bg-emerald-50 text-emerald-800 font-extrabold border border-emerald-200 px-2 py-0.5 rounded-full text-[11px] flex items-center gap-1 shadow-2xs">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        {candidate.matchScore}% Match
                      </span>
                      <span className="text-[10px] font-bold text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                        Assessment: {candidate.assignedTestScore}/100
                      </span>
                    </div>
                  </div>

                  {/* ────────────────────────────────────────────────────────── */}
                  {/* COMPACT PROFESSIONAL LINKS GRID */}
                  {/* ────────────────────────────────────────────────────────── */}
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {/* GitHub Pill */}
                    {gh.profileUrl ? (
                      <a
                        href={gh.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-1.5 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 hover:border-slate-300 transition-colors group"
                        title={`Visit ${candidate.name}'s GitHub`}
                      >
                        <div className="w-6 h-6 rounded flex items-center justify-center shrink-0">
                          <GithubIcon className="w-3.5 h-3.5 text-slate-700 group-hover:text-slate-900 transition-colors" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider leading-none">GitHub</span>
                          <span className="text-[10px] font-bold text-slate-900 truncate mt-0.5">{gh.repoCount} Repos</span>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center gap-2 p-1.5 bg-slate-50/50 border border-slate-100 rounded-lg opacity-60">
                        <div className="w-6 h-6 rounded flex items-center justify-center shrink-0">
                          <GithubIcon className="w-3.5 h-3.5 text-slate-400" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-none">GitHub</span>
                          <span className="text-[10px] font-medium text-slate-500 truncate mt-0.5">Not Linked</span>
                        </div>
                      </div>
                    )}

                    {/* LinkedIn Pill */}
                    {li.profileUrl ? (
                      <a
                        href={li.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-1.5 bg-blue-50/50 border border-blue-100 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors group"
                        title={`Visit ${candidate.name}'s LinkedIn`}
                      >
                        <div className="w-6 h-6 rounded flex items-center justify-center shrink-0">
                          <LinkedinIcon className="w-3.5 h-3.5 text-blue-600 group-hover:text-blue-700 transition-colors" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[9px] font-bold text-blue-500 uppercase tracking-wider leading-none">LinkedIn</span>
                          <span className="text-[10px] font-bold text-blue-900 truncate mt-0.5">Verified ✓</span>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center gap-2 p-1.5 bg-slate-50/50 border border-slate-100 rounded-lg opacity-60">
                        <div className="w-6 h-6 rounded flex items-center justify-center shrink-0">
                          <LinkedinIcon className="w-3.5 h-3.5 text-slate-400" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-none">LinkedIn</span>
                          <span className="text-[10px] font-medium text-slate-500 truncate mt-0.5">Not Linked</span>
                        </div>
                      </div>
                    )}

                    {/* LeetCode Pill */}
                    {lc.profileUrl ? (
                      <a
                        href={lc.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-1.5 bg-amber-50/50 border border-amber-100 rounded-lg hover:bg-amber-50 hover:border-amber-200 transition-colors group"
                        title={`Visit ${candidate.name}'s LeetCode`}
                      >
                        <div className="w-6 h-6 rounded flex items-center justify-center shrink-0">
                          <LeetCodeIcon className="w-3.5 h-3.5 text-amber-600 group-hover:text-amber-700 transition-colors" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[9px] font-bold text-amber-500 uppercase tracking-wider leading-none">LeetCode</span>
                          <span className="text-[10px] font-bold text-amber-900 truncate mt-0.5">{lc.rankOrBadge.split('/')[0].trim()}</span>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center gap-2 p-1.5 bg-slate-50/50 border border-slate-100 rounded-lg opacity-60">
                        <div className="w-6 h-6 rounded flex items-center justify-center shrink-0">
                          <LeetCodeIcon className="w-3.5 h-3.5 text-slate-400" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-none">LeetCode</span>
                          <span className="text-[10px] font-medium text-slate-500 truncate mt-0.5">Not Linked</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Verified Technical Skills Chips */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100">
                    <div className="flex flex-wrap gap-1.5">
                      {candidate.topSkills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 bg-slate-50 text-slate-700 rounded-md text-[10px] font-bold border border-slate-200 shadow-2xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    Batch 2027
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleShortlist(candidate.id)}
                      className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold py-1.5 px-3 rounded-lg shadow-2xs transition-colors cursor-pointer text-[10px]"
                    >
                      {candidate.status === 'Shortlisted' ? 'Shortlisted ✓' : 'Shortlist'}
                    </button>

                    {isFastTracked ? (
                      <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-[10px] font-black flex items-center gap-1.5 shadow-2xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Fast-Tracked</span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleFastTrack(candidate.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-lg transition-all shadow-xs cursor-pointer flex items-center gap-1.5 text-[10px]"
                      >
                        <Zap className="w-3 h-3 fill-amber-300 text-amber-300" />
                        <span>Fast Track</span>
                      </button>
                    )}
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

export default CandidateMatchingView;
