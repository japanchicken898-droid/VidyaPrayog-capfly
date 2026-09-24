import React, { useState } from 'react';
import {
  CheckCircle2,
  Sparkles,
  Send,
  X,
  Loader2,
  Tag,
  Clock,
  GraduationCap
} from 'lucide-react';

interface AssignedAssessment {
  title: string;
  batch: string;
  duration: string;
  passingCriteria: string;
  tracks: string[];
  assignedAt: string;
}

export const SkillAssessmentModule: React.FC = () => {
  // ── Form State ──────────────────────────────────────────────────────────────
  const [assessmentTitle, setAssessmentTitle] = useState('Campus Technical & Aptitude Benchmark Assessment 2026');
  const [targetBatch, setTargetBatch]         = useState('All Engineering & Computer Science Batches');
  const [duration, setDuration]               = useState('90 Minutes (Standard)');
  const [passingCriteria, setPassingCriteria] = useState('70% Minimum Score');
  const [selectedTracks, setSelectedTracks]   = useState<string[]>(['Aptitude Questions', 'Coding Challenges', 'Technical Core']);

  // ── Assignment & Banner State ──────────────────────────────────────────────
  const [assignedAssessment, setAssignedAssessment] = useState<AssignedAssessment | null>(null);
  const [showSuccessBanner, setShowSuccessBanner]   = useState(false);
  const [toastMessage, setToastMessage]             = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting]             = useState(false);

  const availableTracks = [
    { name: 'Aptitude Questions', color: 'bg-amber-50 text-amber-800 border-amber-300' },
    { name: 'Coding Challenges',  color: 'bg-blue-50 text-blue-800 border-blue-300' },
    { name: 'Technical Core',     color: 'bg-purple-50 text-purple-800 border-purple-300' },
  ];

  const batchOptions = [
    'All Engineering & Computer Science Batches',
    'Final Year B.Tech (All Branches)',
    'Second Year B.Tech (All Branches)',
    'Lateral Entry & Diploma Engineering',
    'M.Tech / Post-Graduate Engineering',
  ];

  const durationOptions = [
    '60 Minutes (Speed Test)',
    '90 Minutes (Standard)',
    '120 Minutes (Comprehensive)',
    '180 Minutes (Full Placement Simulation)',
  ];

  const passingOptions = [
    '50% Minimum Score',
    '60% Minimum Score',
    '70% Minimum Score',
    '75% Minimum Score',
    '80% Minimum Score',
  ];

  const toggleTrack = (track: string) => {
    setSelectedTracks((prev) =>
      prev.includes(track) ? prev.filter((t) => t !== track) : [...prev, track]
    );
  };

  const handleAssign = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTracks.length === 0) {
      setToastMessage('Please select at least one question track before assigning.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const assignment: AssignedAssessment = {
        title: assessmentTitle,
        batch: targetBatch,
        duration,
        passingCriteria,
        tracks: [...selectedTracks],
        assignedAt: new Date().toLocaleString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
      };
      setAssignedAssessment(assignment);

      // Sync with student portal localStorage
      try {
        const saved = localStorage.getItem('capfly_assigned_blueprints');
        const parsed = saved ? JSON.parse(saved) : [];
        parsed.push({
          id: `ind-${Date.now()}`,
          title: assessmentTitle,
          provider: 'Industry Assessment',
          skills: selectedTracks.join(', '),
          threshold: parseInt(passingCriteria, 10) || 70,
          duration: duration.split(' ')[0] + ' Mins',
          assigned: true,
          isIndustry: true
        });
        localStorage.setItem('capfly_assigned_blueprints', JSON.stringify(parsed));
      } catch (err) {
        // ignore storage errors
      }

      setIsSubmitting(false);
      setShowSuccessBanner(true);
      setToastMessage('Assessment Deployed Successfully');
      setTimeout(() => setToastMessage(null), 5000);
    }, 600);
  };

  return (
    <div className="space-y-3">
      {/* ── Section Title (Simplified for integrated dashboard view) ── */}
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <GraduationCap className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">Student Skill Assessment Form</h3>
        </div>
        
        {assignedAssessment && (
          <span className="px-2 py-1 bg-emerald-50 border border-emerald-300 text-emerald-800 text-[10px] font-bold rounded-lg flex items-center gap-1 shadow-2xs">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Active / Assigned</span>
          </span>
        )}
      </div>

      {/* ── Floating / Inline Success Banner ───────────────────────────────── */}
      {showSuccessBanner && assignedAssessment && (
        <div className="p-4 bg-emerald-50/90 border border-emerald-300 text-emerald-950 rounded-xl text-xs flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-sm block text-emerald-900">
                Assessment Deployed Successfully
              </span>
              <span className="text-emerald-800 font-medium">
                {assignedAssessment.title} • {assignedAssessment.batch} • {assignedAssessment.duration} ({assignedAssessment.passingCriteria})
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowSuccessBanner(false)}
            className="text-emerald-700 hover:text-emerald-900 p-1 rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ── Input Form Layout (Clean grid, zero explanatory sentences) ────────── */}
      <form onSubmit={handleAssign} className="space-y-3">
        {/* Row 1: Assessment Title & Target Batch */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] sm:text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
              Assessment Title
            </label>
            <input
              type="text"
              value={assessmentTitle}
              onChange={(e) => setAssessmentTitle(e.target.value)}
              placeholder="Campus Technical & Aptitude Benchmark 2026"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white font-medium transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] sm:text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
              Target Batch
            </label>
            <select
              value={targetBatch}
              onChange={(e) => setTargetBatch(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer font-medium"
            >
              {batchOptions.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Question Tracks: Interactive Toggle Pill Buttons */}
        <div>
          <label className="block text-[10px] sm:text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Tag className="w-3 h-3 text-blue-600" />
            <span>Question Tracks</span>
          </label>
          <div className="flex flex-wrap items-center gap-2">
            {availableTracks.map((t) => {
              const active = selectedTracks.includes(t.name);
              return (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => toggleTrack(t.name)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                    active
                      ? `${t.color} ring-1 ring-blue-500/30 shadow-xs`
                      : 'bg-slate-50 text-slate-400 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-current' : 'bg-slate-300'}`} />
                  <span>{t.name}</span>
                  {active && <span className="text-[10px] font-black">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 2: Test Duration, Passing Criteria, and Prominent Navy "Assign Test" Button */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-[10px] sm:text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>Test Duration</span>
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer font-medium"
            >
              {durationOptions.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] sm:text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
              Passing Criteria
            </label>
            <select
              value={passingCriteria}
              onChange={(e) => setPassingCriteria(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer font-medium"
            >
              {passingOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={isSubmitting || !selectedTracks.length}
              className="w-full py-2 px-3 bg-[#0F172A] hover:bg-[#1E293B] disabled:bg-slate-300 text-white rounded-lg text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {isSubmitting ? (
                <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Assigning...</>
              ) : (
                <><Send className="w-3.5 h-3.5" /> Assign Test</>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* ── Floating Toast Notification ────────────────────────────────────── */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
          <div className="flex items-center gap-3 px-4 py-3.5 bg-[#0B192C] text-white rounded-2xl shadow-2xl border border-slate-700 max-w-sm">
            <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <p className="text-xs text-slate-200 font-medium flex-1">{toastMessage}</p>
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
    </div>
  );
};
