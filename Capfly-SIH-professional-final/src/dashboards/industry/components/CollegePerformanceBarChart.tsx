import React, { useState } from 'react';
import {
  BarChart3,
  Award,
  CheckCircle2,
  Building2,
  TrendingUp,
  Users,
  Sparkles
} from 'lucide-react';

export interface CollegePerformanceData {
  id: string;
  rank: number;
  name: string;
  shortName: string;
  avgScore: number;
  studentsCount: number;
  passingCount: number;
  passingRate: number;
  topTrack: string;
  color: string;
  accentFrom: string;
  accentTo: string;
}

export const COLLEGE_BENCHMARK_DATA: CollegePerformanceData[] = [
  {
    id: 'abc',
    rank: 1,
    name: 'ABC Institute of Technology',
    shortName: 'ABC Tech',
    avgScore: 86.0,
    studentsCount: 140,
    passingCount: 129,
    passingRate: 92.1,
    topTrack: 'Distributed Systems & Cloud',
    color: '#2563EB', // Vibrant Royal Blue
    accentFrom: '#3B82F6',
    accentTo: '#1D4ED8',
  },
  {
    id: 'xyz',
    rank: 2,
    name: 'XYZ College of Engineering',
    shortName: 'XYZ College',
    avgScore: 78.0,
    studentsCount: 115,
    passingCount: 97,
    passingRate: 84.3,
    topTrack: 'Full-Stack & DevOps',
    color: '#0D9488', // Vibrant Teal / Emerald
    accentFrom: '#14B8A6',
    accentTo: '#0F766E',
  },
  {
    id: 'pqr',
    rank: 3,
    name: 'PQR Engineering College',
    shortName: 'PQR College',
    avgScore: 72.0,
    studentsCount: 95,
    passingCount: 72,
    passingRate: 75.6,
    topTrack: 'Embedded & IoT Systems',
    color: '#F59E0B', // Vibrant Amber / Orange
    accentFrom: '#FBBF24',
    accentTo: '#D97706',
  },
];

export const CollegePerformanceBarChart: React.FC = () => {
  const [hoveredCollege, setHoveredCollege] = useState<CollegePerformanceData | null>(null);

  const BENCHMARK_SCORE = 75; // Placement benchmark cutoff at 75%
  const maxScore = 100;

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs space-y-7">
      {/* ── Section Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-base sm:text-lg font-black text-slate-900 font-['Outfit'] leading-none">
                College-Wise Assessment
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                Institutional Benchmark
              </span>
            </div>
          </div>
        </div>

        {/* Cutoff Indicator Pill */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="px-3.5 py-1.5 bg-slate-100 text-slate-800 border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs">
            <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
            <span>Placement Cutoff: 75%</span>
          </span>
        </div>
      </div>

      {/* ── 1. Top Performance Bar Graph (Larger height and wider bars) ── */}
      <div className="bg-slate-50/70 rounded-2xl border border-slate-200/80 p-5 sm:p-6 relative">
        <div className="flex items-center justify-between text-xs text-slate-700 mb-4 pb-2 border-b border-slate-200/70 font-bold">
          <span className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-600" />
            <span>Campus Comparative Analysis (Average Score %)</span>
          </span>
          <span className="text-[11px] text-blue-700 font-bold bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
            3 Calibrated Colleges (ABC, XYZ, PQR)
          </span>
        </div>

        {/* Visual Canvas */}
        <div className="relative h-64 sm:h-72 flex items-end justify-around pt-6 pb-8 px-4 sm:px-12">
          {/* Dashed Grid Lines */}
          <div className="absolute inset-x-4 sm:inset-x-12 top-6 bottom-8 flex flex-col justify-between pointer-events-none">
            <div className="border-b border-dashed border-slate-200 w-full flex justify-between">
              <span className="text-[10px] text-slate-400 font-mono -mt-2">100%</span>
            </div>
            <div className="border-b border-dashed border-slate-200 w-full flex justify-between">
              <span className="text-[10px] text-slate-400 font-mono -mt-2">75%</span>
            </div>
            <div className="border-b border-dashed border-slate-200 w-full flex justify-between">
              <span className="text-[10px] text-slate-400 font-mono -mt-2">50%</span>
            </div>
            <div className="border-b border-dashed border-slate-200 w-full flex justify-between">
              <span className="text-[10px] text-slate-400 font-mono -mt-2">25%</span>
            </div>
            <div className="border-b border-slate-300 w-full flex justify-between">
              <span className="text-[10px] text-slate-400 font-mono -mt-2">0%</span>
            </div>
          </div>

          {/* Distinct Dashed Benchmark Cutoff Line at 75% */}
          <div
            className="absolute inset-x-4 sm:inset-x-12 border-b-2 border-emerald-500 border-dashed pointer-events-none z-10 flex items-center justify-end pr-2"
            style={{ bottom: `${(BENCHMARK_SCORE / maxScore) * 100}%` }}
          >
            <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded border border-emerald-300 shadow-2xs">
              Placement Cutoff: 75%
            </span>
          </div>

          {/* College Performance Bars */}
          {COLLEGE_BENCHMARK_DATA.map((col) => {
            const isHovered = hoveredCollege?.id === col.id;
            const heightPercent = (col.avgScore / maxScore) * 100;

            return (
              <div
                key={col.id}
                className="flex flex-col items-center z-20 group cursor-pointer relative"
                style={{ width: '28%' }}
                onMouseEnter={() => setHoveredCollege(col)}
                onMouseLeave={() => setHoveredCollege(null)}
              >
                {/* Floating Metric Badge over Bar */}
                <div
                  className={`mb-2 px-3 py-1 rounded-xl text-xs font-black transition-all ${
                    isHovered
                      ? 'bg-[#0F172A] text-white shadow-md scale-105'
                      : 'bg-white text-slate-900 border border-slate-200 shadow-2xs'
                  }`}
                >
                  {col.avgScore}% Avg Score
                </div>

                {/* Vertical Bar (Wider: max-w-[96px] sm:max-w-[110px]) */}
                <div className="w-full max-w-[80px] sm:max-w-[90px] h-32 sm:h-40 flex items-end justify-center">
                  <div
                    className={`w-full rounded-t-2xl transition-all duration-300 relative ${
                      isHovered ? 'ring-4 ring-blue-300/60 shadow-lg' : 'hover:opacity-95 shadow-sm'
                    }`}
                    style={{
                      height: `${heightPercent}%`,
                      background: `linear-gradient(180deg, ${col.accentFrom} 0%, ${col.accentTo} 100%)`,
                    }}
                  >
                    {/* Inner Glass Sheen */}
                    <div className="absolute inset-0 bg-white/15 rounded-t-2xl pointer-events-none" />

                    {/* Pass Rate Indicator Chip inside bar */}
                    <div className="absolute bottom-3 inset-x-0 text-center text-xs font-black text-white drop-shadow-xs">
                      {col.passingRate.toFixed(0)}% Pass Rate
                    </div>
                  </div>
                </div>

                {/* X-Axis Labels */}
                <div className="mt-3 text-center">
                  <p
                    className={`text-xs sm:text-sm font-black transition-colors ${
                      isHovered ? 'text-blue-600' : 'text-slate-900'
                    }`}
                  >
                    {col.name}
                  </p>
                  <span className="text-[11px] text-slate-600 font-bold block mt-0.5">
                    {col.studentsCount} Candidates Evaluated
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 2. Vibrant Gamified Leaderboard Card ── */}
      <div className="space-y-4 pt-2">
        {/* Banner Header: High-vibrancy gradient container */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 rounded-2xl p-5 text-white text-center shadow-lg relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div className="relative z-10 space-y-2">
            <span className="inline-block bg-white/20 text-white font-extrabold px-3.5 py-1 rounded-full text-[10px] sm:text-xs border border-white/30 backdrop-blur-xs shadow-2xs">
              2026–2027 Placement Drive
            </span>
            <h3 className="text-xl sm:text-2xl font-black font-['Outfit'] tracking-tight">
              Campus Placement Leaderboard
            </h3>
            <p className="text-[10px] sm:text-xs text-blue-100 font-medium max-w-xl mx-auto">
              Real-time institutional performance metrics benchmarking qualifying technical aptitude and hireability standards.
            </p>
          </div>
        </div>

        {/* Ranked College Rows (Floating rounded cards with colored rank circles and progress pills) */}
        <div className="space-y-3.5">
          {/* Rank #1: ABC Institute of Technology */}
          <div className="bg-white rounded-2xl border-2 border-amber-200 shadow-sm p-4 sm:p-5 hover:shadow-md transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                {/* Gold circular badge */}
                <div className="bg-amber-400 text-slate-950 font-black w-8 h-8 rounded-full flex items-center justify-center shadow-md text-sm shrink-0">
                  #1
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-black text-slate-900 font-['Outfit']">
                    ABC Institute of Technology
                  </h4>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-500">
                    Highest Scoring Stream: <strong className="text-slate-800">Distributed Systems &amp; Cloud</strong>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap self-start sm:self-center">
                {/* Progress Pill */}
                <span className="bg-amber-100 text-amber-900 font-bold px-3 py-1 rounded-full text-[10px] sm:text-xs border border-amber-300 shadow-2xs">
                  Avg 86.0% • 92.1% Pass Rate
                </span>
                <span className="px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-wide bg-emerald-50 text-emerald-700 border border-emerald-200">
                  [ABOVE CUTOFF]
                </span>
              </div>
            </div>

            {/* Vibrant base progress fill bar */}
            <div className="mt-2">
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-200">
                <div
                  className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full transition-all duration-500"
                  style={{ width: '92.1%' }}
                />
              </div>
            </div>
          </div>

          {/* Rank #2: XYZ College of Engineering */}
          <div className="bg-white rounded-2xl border-2 border-emerald-200 shadow-sm p-4 sm:p-5 hover:shadow-md transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                {/* Vibrant Emerald circular badge */}
                <div className="bg-emerald-500 text-white font-black w-8 h-8 rounded-full flex items-center justify-center shadow-md text-sm shrink-0">
                  #2
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-black text-slate-900 font-['Outfit']">
                    XYZ College of Engineering
                  </h4>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-500">
                    Highest Scoring Stream: <strong className="text-slate-800">Full-Stack &amp; DevOps</strong>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap self-start sm:self-center">
                {/* Progress Pill */}
                <span className="bg-emerald-100 text-emerald-900 font-bold px-3 py-1 rounded-full text-[10px] sm:text-xs border border-emerald-300 shadow-2xs">
                  Avg 78.0% • 84.3% Pass Rate
                </span>
                <span className="px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-wide bg-emerald-50 text-emerald-700 border border-emerald-200">
                  [ABOVE CUTOFF]
                </span>
              </div>
            </div>

            {/* Vibrant base progress fill bar */}
            <div className="mt-3.5">
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-200">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-500"
                  style={{ width: '84.3%' }}
                />
              </div>
            </div>
          </div>

          {/* Rank #3: PQR Engineering College */}
          <div className="bg-white rounded-2xl border-2 border-purple-200 shadow-sm p-4 sm:p-5 hover:shadow-md transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                {/* Vibrant Purple/Coral circular badge */}
                <div className="bg-purple-500 text-white font-black w-8 h-8 rounded-full flex items-center justify-center shadow-md text-sm shrink-0">
                  #3
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-black text-slate-900 font-['Outfit']">
                    PQR Engineering College
                  </h4>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-500">
                    Highest Scoring Stream: <strong className="text-slate-800">Embedded &amp; IoT Systems</strong>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap self-start sm:self-center">
                {/* Progress Pill */}
                <span className="bg-purple-100 text-purple-900 font-bold px-3 py-1 rounded-full text-[10px] sm:text-xs border border-purple-300 shadow-2xs">
                  Avg 72.0% • 75.6% Pass Rate
                </span>
                <span className="px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-wide bg-amber-50 text-amber-700 border border-amber-200">
                  [TARGET RANGE]
                </span>
              </div>
            </div>

            {/* Vibrant base progress fill bar */}
            <div className="mt-3.5">
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-200">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-500"
                  style={{ width: '75.6%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegePerformanceBarChart;
