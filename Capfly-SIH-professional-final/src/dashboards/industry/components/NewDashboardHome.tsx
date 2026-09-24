import React, { useState, useEffect } from 'react';
import {
  GraduationCap, BarChart3,
  CheckCircle2, Send, Loader2, Clock, Tag, X,
  ChevronRight, Award, Radio, TrendingUp, Users
} from 'lucide-react';

// ── College leaderboard data ───────────────────────────────────────────────────

interface CollegeEntry {
  id: string;
  rank: number;
  name: string;
  shortCode: string;
  avgScore: number;
  totalStudents: number;
  passRate: number;
  topStream: string;
  color: string;
  accentFrom: string;
  accentTo: string;
  aboveCutoff: boolean;
}

const BENCHMARK = 75;

const INITIAL_COLLEGES: CollegeEntry[] = [
  {
    id: 'xyz', rank: 1, name: 'XYZ College of Engineering', shortCode: 'XYZ',
    avgScore: 86, totalStudents: 140, passRate: 92.1, topStream: 'Coding & System Design',
    color: '#2563EB', accentFrom: '#3B82F6', accentTo: '#1D4ED8', aboveCutoff: true,
  },
  {
    id: 'pqr', rank: 2, name: 'PQR Institute of Technology', shortCode: 'PQR',
    avgScore: 78, totalStudents: 115, passRate: 84.3, topStream: 'Quantitative Aptitude',
    color: '#0D9488', accentFrom: '#14B8A6', accentTo: '#0F766E', aboveCutoff: true,
  },
  {
    id: 'abc', rank: 3, name: 'ABC Engineering College', shortCode: 'ABC',
    avgScore: 72, totalStudents: 90, passRate: 75.6, topStream: 'Technical Core CS',
    color: '#F59E0B', accentFrom: '#FBBF24', accentTo: '#D97706', aboveCutoff: false,
  },
];

const RANK_COLORS = [
  'bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-md',  // 1st
  'bg-gradient-to-br from-slate-300 to-slate-400 text-white shadow-sm',   // 2nd
  'bg-gradient-to-br from-amber-600 to-amber-700 text-white shadow-sm',   // 3rd
];

// ── Types ──────────────────────────────────────────────────────────────────────

interface AssignedAssessment {
  title: string;
  batch: string;
  duration: string;
  passingCriteria: string;
  tracks: string[];
  assignedAt: string;
}

// ── Toast ──────────────────────────────────────────────────────────────────────

const SuccessToast: React.FC<{ message: string; onDismiss: () => void }> = ({ message, onDismiss }) => (
  <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
    <div className="flex items-start gap-3 px-4 py-3.5 bg-[#0B192C] text-white rounded-2xl shadow-2xl border border-slate-700 max-w-sm">
      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-xs font-bold">Assessment Deployed</p>
        <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">{message}</p>
      </div>
      <button type="button" onClick={onDismiss} className="text-slate-400 hover:text-white cursor-pointer">
        <X className="w-4 h-4" />
      </button>
    </div>
  </div>
);

// ── Live Countdown ─────────────────────────────────────────────────────────────

const LiveCountdown: React.FC = () => {
  const [seconds, setSeconds] = useState(2 * 86400 + 8 * 3600 + 15 * 60 + 30);
  useEffect(() => {
    const t = setInterval(() => setSeconds(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="flex items-center gap-1.5">
      {[{ v: d, l: 'DAYS' }, { v: h, l: 'HRS' }, { v: m, l: 'MINS' }, { v: s, l: 'SECS' }].map((item, i) => (
        <React.Fragment key={item.l}>
          {i > 0 && <span className="text-blue-300 font-black text-lg leading-none mb-2">:</span>}
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] leading-none">{pad(item.v)}</span>
            <span className="text-[9px] font-bold text-blue-200/80 uppercase tracking-wider mt-0.5">{item.l}</span>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

// ── Leaderboard Row ────────────────────────────────────────────────────────────

const LeaderboardRow: React.FC<{ entry: CollegeEntry; isTop3: boolean; delay: number }> = ({ entry, isTop3, delay }) => {
  return (
    <div
      className={`group flex items-center gap-3 sm:gap-4 px-4 py-3.5 rounded-2xl border transition-all duration-200 cursor-default animate-in fade-in slide-in-from-left-4`}
      style={{
        animationDelay: `${delay}ms`,
        background: isTop3
          ? `linear-gradient(135deg, ${entry.accentFrom}12 0%, ${entry.accentTo}08 100%)`
          : 'rgba(248,250,252,0.8)',
        borderColor: isTop3 ? `${entry.color}30` : '#e2e8f0',
      }}
    >
      {/* Rank badge */}
      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-black shrink-0 ${
        entry.rank <= 3 ? RANK_COLORS[entry.rank - 1] : 'bg-slate-100 text-slate-500 border border-slate-200'
      }`}>
        {entry.rank}
      </div>

      {/* College icon / avatar */}
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-black shrink-0 shadow-sm"
        style={{ background: `linear-gradient(135deg, ${entry.accentFrom} 0%, ${entry.accentTo} 100%)` }}
      >
        {entry.shortCode[0]}
      </div>

      {/* College name + stream */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-bold leading-tight truncate ${isTop3 ? 'text-slate-900' : 'text-slate-700'}`}>
          {entry.name}
        </p>
        <p className="text-[10px] text-slate-500 font-medium truncate mt-0.5">{entry.topStream}</p>
      </div>

      {/* Score badge */}
      <div className="shrink-0 text-right">
        <div className={`text-lg font-black font-['Outfit'] leading-none ${isTop3 ? '' : 'text-slate-700'}`}
          style={{ color: isTop3 ? entry.color : undefined }}>
          {entry.avgScore}%
        </div>
        <div className="text-[10px] font-semibold text-slate-500 mt-0.5">Avg Score</div>
      </div>

      {/* Progress bar */}
      <div className="hidden sm:flex flex-col gap-1 w-28 shrink-0">
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${entry.avgScore}%`,
              background: `linear-gradient(90deg, ${entry.accentFrom}, ${entry.accentTo})`,
            }}
          />
        </div>
        <div className="flex justify-between text-[9px] text-slate-400 font-medium">
          <span>{entry.passRate.toFixed(0)}% pass</span>
          <span>{entry.totalStudents} students</span>
        </div>
      </div>

      {/* Status pill */}
      <div className="shrink-0">
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
          entry.aboveCutoff
            ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
            : 'bg-amber-100 text-amber-700 border border-amber-200'
        }`}>
          {entry.aboveCutoff ? <><CheckCircle2 className="w-2.5 h-2.5" />Above Cutoff</> : 'Target Range'}
        </span>
      </div>
    </div>
  );
};

// ── Student Skill Assessment Panel ────────────────────────────────────────────

const StudentSkillAssessmentPanel: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [assessmentTitle, setAssessmentTitle] = useState('Campus Technical & Aptitude Benchmark Assessment 2026');
  const [targetBatch, setTargetBatch]         = useState('All Engineering & Computer Science Batches');
  const [duration, setDuration]               = useState('90 Minutes (Standard)');
  const [passingCriteria, setPassingCriteria] = useState('70% Minimum Score');
  const [selectedTracks, setSelectedTracks]   = useState<string[]>(['Aptitude Questions', 'Coding Challenges', 'Technical Core']);
  const [assignedAssessment, setAssignedAssessment] = useState<AssignedAssessment | null>(null);
  const [isSubmitting, setIsSubmitting]       = useState(false);
  const [toastMessage, setToastMessage]       = useState<string | null>(null);

  const batchOptions = [
    'All Engineering & Computer Science Batches',
    'Final Year B.Tech (All Branches)',
    'Second Year B.Tech (All Branches)',
    'Lateral Entry & Diploma Engineering',
    'M.Tech / Post-Graduate Engineering',
  ];
  const durationOptions = [
    '60 Minutes (Speed Test)', '90 Minutes (Standard)',
    '120 Minutes (Comprehensive)', '180 Minutes (Full Placement Simulation)',
  ];
  const passingOptions = [
    '50% Minimum Score', '60% Minimum Score', '70% Minimum Score',
    '75% Minimum Score', '80% Minimum Score',
  ];
  const availableTracks = [
    { name: 'Aptitude Questions', color: 'bg-amber-50 text-amber-800 border-amber-300' },
    { name: 'Coding Challenges',  color: 'bg-blue-50 text-blue-800 border-blue-300' },
    { name: 'Technical Core',     color: 'bg-purple-50 text-purple-800 border-purple-300' },
  ];

  const toggleTrack = (t: string) =>
    setSelectedTracks(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  const handleAssign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTracks.length) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setAssignedAssessment({
        title: assessmentTitle, batch: targetBatch, duration, passingCriteria,
        tracks: [...selectedTracks],
        assignedAt: new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      });
      
      try {
        const saved = localStorage.getItem('capfly_assigned_blueprints');
        const parsed = saved ? JSON.parse(saved) : [];
        parsed.push({
          id: `ind-${Date.now()}`,
          title: assessmentTitle,
          provider: 'Industry Assessment',
          skills: selectedTracks.join(', '),
          threshold: parseInt(passingCriteria) || 70,
          duration: duration.split(' ')[0] + ' Mins',
          assigned: true,
          isIndustry: true
        });
        localStorage.setItem('capfly_assigned_blueprints', JSON.stringify(parsed));
      } catch (e) {}

      setIsSubmitting(false);
      setToastMessage('Assessment assigned to all enrolled campus batches.');
      setTimeout(() => setToastMessage(null), 5000);
    }, 800);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900 font-['Outfit']">Student Skill Assessment</h3>
            <p className="text-[11px] text-slate-500">Evaluate campus talent across Aptitude, Coding & Core CS</p>
          </div>
        </div>
        {assignedAssessment ? (
          <span className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold rounded-xl flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />Active / Assigned
          </span>
        ) : (
          <button
            type="button"
            onClick={() => setShowForm(v => !v)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
              showForm ? 'bg-slate-100 text-slate-700 border border-slate-200' : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            {showForm ? 'Close' : 'Skill Assessment'}
            {!showForm && <ChevronRight className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

      {/* Assigned strip */}
      {assignedAssessment && (
        <div className="mx-5 mt-4 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="flex items-center gap-1.5 font-bold"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />{assignedAssessment.title}</span>
          <span className="text-emerald-700">Batch: <strong>{assignedAssessment.batch}</strong></span>
          <span className="text-emerald-700">Duration: <strong>{assignedAssessment.duration}</strong></span>
          <span className="text-emerald-700">Cutoff: <strong>{assignedAssessment.passingCriteria}</strong></span>
          <span className="text-slate-400 text-[10px] ml-auto">Deployed: {assignedAssessment.assignedAt}</span>
        </div>
      )}

      {/* Form */}
      {(showForm || assignedAssessment) && (
        <div className="p-5 pt-4">
          <form onSubmit={handleAssign} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Assessment Title</label>
                <input
                  type="text"
                  value={assessmentTitle}
                  onChange={e => setAssessmentTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Target Batch</label>
                <select value={targetBatch} onChange={e => setTargetBatch(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                  {batchOptions.map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-blue-500" />Question Track to Answer
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTracks.map(t => {
                  const active = selectedTracks.includes(t.name);
                  return (
                    <button key={t.name} type="button" onClick={() => toggleTrack(t.name)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-2 ${
                        active ? `${t.color} ring-2 ring-blue-400/30 shadow-xs scale-[1.02]` : 'bg-slate-50 text-slate-400 border-slate-200 hover:border-slate-300'
                      }`}>
                      <span className={`w-2 h-2 rounded-full ${active ? 'bg-current' : 'bg-slate-300'}`} />
                      {t.name}
                      {active && <span className="text-[10px] font-black">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />Test Duration
                </label>
                <select value={duration} onChange={e => setDuration(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                  {durationOptions.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Passing Criteria</label>
                <select value={passingCriteria} onChange={e => setPassingCriteria(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                  {passingOptions.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="flex items-end">
                <button type="submit" disabled={isSubmitting || !selectedTracks.length}
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer">
                  {isSubmitting
                    ? <><Loader2 className="w-3.5 h-3.5 animate-spin" />Assigning...</>
                    : <><Send className="w-3.5 h-3.5" />Assign Test</>
                  }
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {!showForm && !assignedAssessment && (
        <div className="px-5 py-8 text-center">
          <GraduationCap className="w-10 h-10 text-slate-200 mx-auto mb-2" />
          <p className="text-sm text-slate-400 font-medium">Click <strong>Skill Assessment</strong> to create and assign a test.</p>
        </div>
      )}

      {toastMessage && <SuccessToast message={toastMessage} onDismiss={() => setToastMessage(null)} />}
    </div>
  );
};

// ── College Live Tracking Leaderboard ─────────────────────────────────────────

const CollegeAssessmentPanel: React.FC = () => {
  const [showTracking, setShowTracking] = useState(false);

  // Sorted by avgScore descending
  const sorted = [...INITIAL_COLLEGES].sort((a, b) => b.avgScore - a.avgScore)
    .map((c, i) => ({ ...c, rank: i + 1 }));

  const topCollege = sorted[0];
  const totalStudents = sorted.reduce((s, c) => s + c.totalStudents, 0);
  const overallAvg = Math.round(sorted.reduce((s, c) => s + c.avgScore, 0) / sorted.length);

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900 font-['Outfit']">College-Wise Performance Assessment</h3>
            <p className="text-[11px] text-slate-500">Comparative benchmark across partner institutions</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowTracking(v => !v)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
            showTracking
              ? 'bg-slate-100 text-slate-700 border border-slate-200'
              : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white'
          }`}
        >
          <Radio className="w-3.5 h-3.5" />
          {showTracking ? 'Close Tracking' : 'Live Tracking'}
          {!showTracking && <ChevronRight className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Live Tracking Panel */}
      {showTracking && (
        <div className="overflow-hidden">
          {/* Deep blue leaderboard header */}
          <div className="bg-gradient-to-br from-[#1E3A5F] via-[#1a3050] to-[#162740] px-6 py-5 text-white">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Live Assessment</span>
                </div>
                <h4 className="text-xl font-black font-['Outfit'] leading-tight">College Performance Leaderboard</h4>
                <p className="text-xs text-blue-200/80 mt-1">Which college will top the placement benchmark?</p>
              </div>

              {/* Live Countdown */}
              <div className="text-center bg-white/10 rounded-2xl px-5 py-3 border border-white/15 backdrop-blur-sm">
                <div className="text-[10px] font-bold text-blue-200/80 uppercase tracking-widest mb-1.5">ENDS IN</div>
                <LiveCountdown />
              </div>
            </div>

            {/* Benchmark cutoff chip */}
            <div className="mt-4 flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[11px] font-bold px-3 py-1 rounded-full">
                <CheckCircle2 className="w-3 h-3" />
                Placement Cutoff: {BENCHMARK}%
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 text-blue-100 text-[11px] font-semibold px-3 py-1 rounded-full">
                <Users className="w-3 h-3" />
                {totalStudents} Students Evaluated
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 text-blue-100 text-[11px] font-semibold px-3 py-1 rounded-full">
                <TrendingUp className="w-3 h-3" />
                {overallAvg}% Overall Avg
              </span>
            </div>
          </div>

          {/* Leaderboard list */}
          <div className="p-5 space-y-3">
            {/* Column headers */}
            <div className="flex items-center gap-4 px-4 pb-1">
              <span className="w-9 shrink-0" />
              <span className="w-9 shrink-0" />
              <span className="flex-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">College Name</span>
              <span className="w-16 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">Score</span>
              <span className="hidden sm:block w-28 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Progress</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</span>
            </div>

            {sorted.map((entry, i) => (
              <LeaderboardRow key={entry.id} entry={entry} isTop3={entry.rank <= 3} delay={i * 80} />
            ))}
          </div>

          {/* Benchmark Overview footer strip */}
          <div className="mx-5 mb-5 p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs">
              <Award className="w-5 h-5 text-amber-500 shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Top Campus</p>
                <p className="text-xs font-black text-slate-900">{topCollege.name}</p>
              </div>
              <span className="ml-auto text-sm font-black text-blue-600">{topCollege.avgScore}%</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs">
              <Users className="w-5 h-5 text-emerald-500 shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Evaluated</p>
                <p className="text-xs font-black text-slate-900">{totalStudents} Candidates</p>
              </div>
              <span className="ml-auto text-sm font-black text-emerald-600">85.2%</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs">
              <TrendingUp className="w-5 h-5 text-blue-500 shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Benchmark</p>
                <p className="text-xs font-black text-slate-900">{BENCHMARK}% Placement Cutoff</p>
              </div>
              <span className="ml-auto text-sm font-black text-slate-700">2/3 Pass</span>
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!showTracking && (
        <div className="px-5 py-8 text-center">
          <BarChart3 className="w-10 h-10 text-slate-200 mx-auto mb-2" />
          <p className="text-sm text-slate-400 font-medium">Click <strong>Live Tracking</strong> to view real-time college performance rankings.</p>
        </div>
      )}
    </div>
  );
};

// ── Main Export ────────────────────────────────────────────────────────────────

export const NewDashboardHome: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'skill' | 'college'>('skill');

  return (
    <div className="space-y-4">
      {/* Toggle tabs */}
      <div className="flex items-center bg-white border border-slate-200 rounded-2xl shadow-xs p-1 gap-0.5 w-fit">
        <button
          type="button"
          onClick={() => setActiveSection('skill')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSection === 'skill' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          Student Skill Assessment
        </button>
        <button
          type="button"
          onClick={() => setActiveSection('college')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSection === 'college' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          College-Wise Performance Assessment
        </button>
      </div>

      {activeSection === 'skill' ? <StudentSkillAssessmentPanel /> : <CollegeAssessmentPanel />}
    </div>
  );
};
