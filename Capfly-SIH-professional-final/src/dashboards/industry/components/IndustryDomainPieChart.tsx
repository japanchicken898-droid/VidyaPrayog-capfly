import React, { useState } from 'react';
import { PieChart as PieChartIcon } from 'lucide-react';

export interface DomainSegment {
  id: string;
  name: string;
  percentage: number;
  studentsCount: number;
  color: string;
  hoverColor: string;
  gradientFrom: string;
  gradientTo: string;
}

const DOMAIN_DATA: DomainSegment[] = [
  {
    id: 'fullstack',
    name: 'Full-Stack & Cloud',
    percentage: 35,
    studentsCount: 1698,
    color: '#2563EB', // Blue
    hoverColor: '#1D4ED8',
    gradientFrom: '#3B82F6',
    gradientTo: '#1D4ED8',
  },
  {
    id: 'ai-data',
    name: 'AI & Data Engineering',
    percentage: 30,
    studentsCount: 1455,
    color: '#0D9488', // Teal
    hoverColor: '#0F766E',
    gradientFrom: '#14B8A6',
    gradientTo: '#0F766E',
  },
  {
    id: 'iot-embedded',
    name: 'Embedded Systems & IoT',
    percentage: 20,
    studentsCount: 970,
    color: '#F59E0B', // Amber
    hoverColor: '#D97706',
    gradientFrom: '#FBBF24',
    gradientTo: '#D97706',
  },
  {
    id: 'devops-security',
    name: 'Cybersecurity & DevOps',
    percentage: 15,
    studentsCount: 727,
    color: '#6366F1', // Indigo
    hoverColor: '#4F46E5',
    gradientFrom: '#818CF8',
    gradientTo: '#4F46E5',
  },
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

export const IndustryDomainPieChart: React.FC = () => {
  const [activeSegment, setActiveSegment] = useState<DomainSegment | null>(null);

  let currentAngle = 0;
  const slices = DOMAIN_DATA.map((seg) => {
    const span = (seg.percentage / 100) * 360;
    const start = currentAngle;
    const end = currentAngle + span;
    currentAngle = end;
    return { seg, start, end };
  });

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200/80">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-slate-900 font-['Outfit']">
          <PieChartIcon className="w-4 h-4 text-blue-600" />
          <span>Industry Collaboration Domains</span>
        </div>
        <span className="text-[10px] font-extrabold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
          Expanded Distribution
        </span>
      </div>

      {/* Enlarged Donut Chart & Domain Legend side-by-side */}
      <div className="flex flex-col md:flex-row items-center justify-around gap-6 flex-1 py-1">
        {/* Enlarged Donut Chart SVG */}
        <div className="relative shrink-0 flex items-center justify-center" style={{ width: 180, height: 180 }}>
          <svg viewBox="0 0 240 240" width={180} height={180} className="transform -rotate-90">
            <defs>
              {DOMAIN_DATA.map(s => (
                <linearGradient key={s.id} id={`gpie-${s.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={s.gradientFrom} />
                  <stop offset="100%" stopColor={s.gradientTo} />
                </linearGradient>
              ))}
              <filter id="pieShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity="0.25" />
              </filter>
            </defs>
            {slices.map(({ seg, start, end }) => {
              const isHov = activeSegment?.id === seg.id;
              // Expanded stroke thickness: inner ~64, outer ~112 (thickness: 48px)
              const inner = isHov ? 60 : 64;
              const outer = isHov ? 118 : 112;
              return (
                <path
                  key={seg.id}
                  d={describeArc(120, 120, inner, outer, start, end)}
                  fill={`url(#gpie-${seg.id})`}
                  className="cursor-pointer transition-all duration-200"
                  style={{
                    filter: isHov ? 'url(#pieShadow)' : 'none',
                    opacity: activeSegment ? (isHov ? 1 : 0.6) : 0.95,
                  }}
                  onMouseEnter={() => setActiveSegment(seg)}
                  onMouseLeave={() => setActiveSegment(null)}
                />
              );
            })}
          </svg>

          {/* Center Stat: Bold "100% ENROLLED" inside donut hole */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            <span className="text-2xl font-black text-slate-900 font-['Outfit'] leading-none tracking-tight">
              100%
            </span>
            <span className="text-xs font-black text-slate-900 uppercase tracking-widest mt-1">
              ENROLLED
            </span>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50/90 border border-blue-200 px-2 py-0.5 rounded-full mt-1.5 shadow-2xs">
              {activeSegment ? `${activeSegment.name.split('&')[0].trim()} (${activeSegment.percentage}%)` : 'Active Cohorts'}
            </span>
          </div>
        </div>

        {/* High-Contrast Domain Legend */}
        <div className="w-full md:w-64 space-y-2.5">
          {DOMAIN_DATA.map(item => {
            const isSelected = activeSegment?.id === item.id;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveSegment(item)}
                onMouseLeave={() => setActiveSegment(null)}
                className={`flex items-center justify-between px-3 py-1.5 rounded-xl border cursor-pointer transition-all ${
                  isSelected 
                    ? 'border-blue-400 bg-blue-50/50 shadow-sm ring-2 ring-blue-100' 
                    : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className="w-3.5 h-3.5 rounded-full shrink-0 shadow-2xs"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className={`text-xs font-bold truncate ${isSelected ? 'text-slate-950 font-black' : 'text-slate-800'}`}>
                    {item.name}
                  </span>
                </div>
                <span className="text-sm font-black text-slate-950 font-mono shrink-0 pl-2 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                  {item.percentage}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default IndustryDomainPieChart;
