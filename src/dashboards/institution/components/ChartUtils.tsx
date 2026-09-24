import React, { useState, useEffect } from 'react';

const useMountAnimation = (delay = 50) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  return isMounted;
};

export const useTooltip = () => {
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, content: null as React.ReactNode });
  const handleMouseMove = (e: React.MouseEvent, content: React.ReactNode) => {
    setTooltip({ show: true, x: e.clientX, y: e.clientY, content });
  };
  const handleMouseLeave = () => {
    setTooltip(prev => ({ ...prev, show: false }));
  };
  return { tooltip, handleMouseMove, handleMouseLeave };
};

export const ChartTooltip = ({ show, x, y, content }: { show: boolean, x: number, y: number, content: React.ReactNode }) => {
  if (!show) return null;
  return (
    <div 
      className="fixed z-50 pointer-events-none bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded-md shadow-lg transition-opacity duration-150 ease-in-out whitespace-nowrap"
      style={{ top: y + 15, left: x + 15 }}
    >
      {content}
    </div>
  );
};

// 1. DONUT CHART (SVG Donut with Center Text and Legend)
export const DonutChart = ({ 
  data = [], 
  centerText, 
  centerSubtext,
  centerLabel,
  centerSublabel 
}: { 
  data?: any[]; 
  centerText?: string; 
  centerSubtext?: string;
  centerLabel?: string;
  centerSublabel?: string;
}) => {
  const isMounted = useMountAnimation();
  const { tooltip, handleMouseMove, handleMouseLeave } = useTooltip();
  const total = data.reduce((acc: number, item: any) => acc + (item.value || 0), 0) || 1;
  const C = 201.06; // Circumference for r=32 (2 * PI * 32)
  let accumulatedPct = 0;

  const mainLabel = centerLabel || centerText;
  const subLabel = centerSublabel || centerSubtext;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 w-full py-1 relative">
      <div className="relative w-48 h-48 shrink-0">
        <svg viewBox="0 0 80 80" className="w-full h-full transform -rotate-90">
          {data.map((item: any, idx: number) => {
            const pct = (item.value || 0) / total;
            const strokeDasharray = isMounted ? `${pct * C} ${C}` : `0 ${C}`;
            const strokeDashoffset = -accumulatedPct * C;
            accumulatedPct += pct;

            return (
              <circle
                key={idx}
                cx="40"
                cy="40"
                r="32"
                fill="transparent"
                stroke={item.color || '#3b82f6'}
                strokeWidth="10"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000 ease-out hover:opacity-80 cursor-pointer"
                onMouseMove={(e) => handleMouseMove(e, <div className="font-semibold">{item.label}: {item.value} ({Math.round(pct * 100)}%)</div>)}
                onMouseLeave={handleMouseLeave}
              />
            );
          })}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-2">
          {mainLabel && (
            <span className="text-xl font-black text-slate-900 tracking-tight leading-none">
              {mainLabel}
            </span>
          )}
          {subLabel && (
            <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider leading-none">
              {subLabel}
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 w-full space-y-2">
        {data.map((item: any, idx: number) => (
          <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-100 last:border-0">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-md shrink-0 shadow-2xs" style={{ backgroundColor: item.color || '#3b82f6' }} />
              <span className="text-slate-700 font-semibold">{item.label}</span>
            </div>
            <span className="font-extrabold text-slate-900">
              {item.value} <span className="text-slate-400 font-normal">({Math.round(((item.value || 0) / total) * 100)}%)</span>
            </span>
          </div>
        ))}
      </div>
      <ChartTooltip {...tooltip} />
    </div>
  );
};

// 2. VERTICAL BAR CHART
export const VerticalBarChart = ({ data = [], maxValue = 100 }: { data?: { label: string; value: number; color?: string }[]; maxValue?: number }) => {
  const isMounted = useMountAnimation();
  const { tooltip, handleMouseMove, handleMouseLeave } = useTooltip();
  return (
    <div className="w-full h-full flex flex-col justify-end pt-4 relative">
      <div className="flex items-end justify-between gap-3 h-44 px-2">
        {data.map((item: any, idx: number) => {
          const heightPct = isMounted ? Math.min(100, Math.max(8, ((item.value || 0) / maxValue) * 100)) : 0;
          const barColor = item.color || '#3b82f6';

          return (
            <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
              <span className={`text-[11px] font-black text-slate-700 mb-1 opacity-90 group-hover:scale-110 transition-all duration-500 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {item.value}
              </span>
              <div 
                className="w-full max-w-[40px] bg-slate-100 rounded-t-lg h-full flex items-end overflow-hidden p-0.5 cursor-pointer"
                onMouseMove={(e) => handleMouseMove(e, <div className="font-semibold">{item.label}: {item.value}</div>)}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="w-full rounded-t-md transition-all duration-1000 ease-out group-hover:brightness-110"
                  style={{ height: `${heightPct}%`, backgroundColor: barColor }}
                />
              </div>
              <span className="text-[10px] font-bold text-slate-500 mt-2 truncate w-full text-center">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
      <ChartTooltip {...tooltip} />
    </div>
  );
};

// 3. HORIZONTAL BAR CHART (Supports optional total, default 100)
export const HorizontalBarChart = ({ data = [] }: { data?: any[] }) => {
  const isMounted = useMountAnimation();
  const { tooltip, handleMouseMove, handleMouseLeave } = useTooltip();
  return (
    <div className="w-full space-y-3.5 py-1 relative">
      {data.map((item: any, idx: number) => {
        const total = item.total || 100;
        const val = item.value || 0;
        const pct = isMounted ? Math.min(100, Math.round((val / total) * 100)) : 0;
        const barColor = item.color || '#3b82f6';

        return (
          <div 
            key={idx} 
            className="space-y-1 cursor-pointer"
            onMouseMove={(e) => handleMouseMove(e, <div className="font-semibold">{item.label}: {val}{item.total ? ` / ${item.total}` : ''} ({isMounted ? pct : 0}%)</div>)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-700">{item.label}</span>
              <span className="font-extrabold text-slate-900">{val}{item.total ? ` / ${item.total}` : ''} ({isMounted ? pct : 0}%)</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${pct}%`, backgroundColor: barColor }}
              />
            </div>
          </div>
        );
      })}
      <ChartTooltip {...tooltip} />
    </div>
  );
};

// 4. SMOOTH AREA TREND CHART (Supports both number[] and object[])
export const SmoothAreaTrendChart = ({ 
  data = [65, 72, 68, 85, 82, 94], 
  labels = ['2020', '2021', '2022', '2023', '2024', '2025'],
  color = "#10b981",
  fillColor = "rgba(16, 185, 129, 0.15)"
}: {
  data?: any;
  labels?: string[];
  color?: string;
  fillColor?: string;
}) => {
  const isMounted = useMountAnimation();
  const width = 340;
  const height = 140;
  const padding = 20;
  const pathLength = 2000;

  // Normalize data array
  const rawArray: any[] = Array.isArray(data) ? data : [50, 60, 70, 80];
  const numericData: number[] = rawArray.map((item: any) => 
    typeof item === 'number' ? item : (item && typeof item.value === 'number' ? item.value : 50)
  );

  const displayLabels: string[] = labels && labels.length === numericData.length
    ? labels
    : rawArray.map((item: any, idx: number) => 
        item && typeof item.label === 'string' ? item.label : (labels[idx] || `P${idx + 1}`)
      );

  const min = Math.min(...numericData) * 0.85;
  const max = Math.max(...numericData) * 1.1 || 100;

  const points = numericData.map((val, idx) => {
    const denom = numericData.length > 1 ? numericData.length - 1 : 1;
    const x = padding + (idx / denom) * (width - padding * 2);
    const y = height - padding - ((val - min) / (max - min || 1)) * (height - padding * 2);
    return { x, y, val };
  });

  const pathD = points.reduce((acc, p, i) => i === 0 ? `M ${p.x},${p.y}` : `${acc} L ${p.x},${p.y}`, '');
  const areaD = `${pathD} L ${points[points.length - 1]?.x || width - padding},${height - padding} L ${points[0]?.x || padding},${height - padding} Z`;
  const { tooltip, handleMouseMove, handleMouseLeave } = useTooltip();

  return (
    <div className="w-full flex flex-col items-center relative">
      <div className="w-full relative">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          <path d={areaD} fill={fillColor} style={{ opacity: isMounted ? 1 : 0, transition: 'opacity 1s ease-out 0.3s' }} />
          <path d={pathD} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" 
            style={{ strokeDasharray: pathLength, strokeDashoffset: isMounted ? 0 : pathLength, transition: 'stroke-dashoffset 1.5s ease-out' }} />
          {points.map((p, i) => (
            <g key={i}>
              <circle 
                cx={p.x} cy={p.y} r="4" fill="#ffffff" stroke={color} strokeWidth="2.5" className="pointer-events-none" 
                style={{ opacity: isMounted ? 1 : 0, transition: `opacity 0.5s ease-out ${0.5 + (i * 0.1)}s` }}
              />
              <circle 
                cx={p.x} cy={p.y} r="16" fill="transparent" className="cursor-pointer"
                onMouseMove={(e) => handleMouseMove(e, <div className="font-semibold text-center">{displayLabels[i]}<br/><span className="text-slate-300 font-normal">Value: {p.val}</span></div>)}
                onMouseLeave={handleMouseLeave}
              />
            </g>
          ))}
        </svg>
      </div>
      <div className="flex justify-between w-full mt-2 px-1 text-[10px] font-bold text-slate-400">
        {displayLabels.map((l, i) => <span key={i}>{l}</span>)}
      </div>
      <ChartTooltip {...tooltip} />
    </div>
  );
};

// 5. RADAR / SPIDER WEB CHART
export const RadarWebChart = ({ data = [], color = "#059669" }: { data?: any[]; color?: string }) => {
  const isMounted = useMountAnimation();
  const size = 180;
  const center = size / 2;
  const radius = 58;
  const total = data.length || 1;

  const getCoordinates = (index: number, val: number) => {
    const angle = (Math.PI * 2 / total) * index - Math.PI / 2;
    const safeVal = Math.max(0, Math.min(100, val || 0));
    const r = (safeVal / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const points = data.map((d: any, i: number) => {
    const scoreVal = typeof d.score === 'number' ? d.score : (typeof d.value === 'number' ? d.value : 50);
    return getCoordinates(i, scoreVal);
  });

  const polygonPoints = points.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const { tooltip, handleMouseMove, handleMouseLeave } = useTooltip();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-1 relative">
      <div className="relative w-44 h-44 shrink-0">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
          {[0.25, 0.5, 0.75, 1].map((lvl, idx) => {
            const webPoints = data.map((_, i) => {
              const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
              const r = lvl * radius;
              return `${(center + r * Math.cos(angle)).toFixed(1)},${(center + r * Math.sin(angle)).toFixed(1)}`;
            }).join(' ');
            return (
              <polygon key={idx} points={webPoints} fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2 2" />
            );
          })}

          {data.map((_, i) => {
            const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
            const x2 = center + radius * Math.cos(angle);
            const y2 = center + radius * Math.sin(angle);
            return <line key={i} x1={center} y1={center} x2={x2} y2={y2} stroke="#cbd5e1" strokeWidth="1" />;
          })}

          <polygon points={polygonPoints} fill={color} fillOpacity="0.25" stroke={color} strokeWidth="2.5" 
            style={{ opacity: isMounted ? 1 : 0, transform: isMounted ? 'scale(1)' : 'scale(0.5)', transformOrigin: 'center', transition: 'all 1s ease-out' }} />

          {points.map((p, i) => (
            <g key={i}>
              <circle 
                cx={p.x} cy={p.y} r="4" fill={color} stroke="#ffffff" strokeWidth="1.5" className="pointer-events-none"
                style={{ opacity: isMounted ? 1 : 0, transition: `opacity 0.5s ease-out ${0.5 + (i * 0.1)}s` }} 
              />
              <circle 
                cx={p.x} cy={p.y} r="16" fill="transparent" className="cursor-pointer"
                onMouseMove={(e) => handleMouseMove(e, <div className="font-semibold text-center">{data[i].subject || data[i].label}<br/><span className="text-slate-300 font-normal">Score: {data[i].score || data[i].value}%</span></div>)}
                onMouseLeave={handleMouseLeave}
              />
            </g>
          ))}
        </svg>
      </div>

      <div className="space-y-1.5 text-xs flex-1">
        {data.map((d: any, i: number) => {
          const val = typeof d.score === 'number' ? d.score : (typeof d.value === 'number' ? d.value : 0);
          return (
            <div key={i} className="flex justify-between items-center py-0.5 border-b border-slate-100 last:border-0">
              <span className="text-slate-600 font-semibold truncate max-w-[140px]">{d.subject || d.label}</span>
              <span className="font-extrabold text-slate-900">{val}%</span>
            </div>
          );
        })}
      </div>
      <ChartTooltip {...tooltip} />
    </div>
  );
};

// 6. SEMI-CIRCLE GAUGE METER
export const SemiCircleGauge = ({ value = 0, max = 100, label, color = "#10b981" }: { value?: number; max?: number; label: string; color?: string }) => {
  const isMounted = useMountAnimation();
  const { tooltip, handleMouseMove, handleMouseLeave } = useTooltip();
  const safeVal = Math.min(max, Math.max(0, value || 0));
  const pct = safeVal / max;

  return (
    <div className="flex flex-col items-center justify-center py-2 relative">
      <div className="relative w-44 h-24 overflow-hidden flex items-end justify-center">
        <svg viewBox="0 0 100 50" className="w-full h-full">
          <path d="M 10,50 A 40,40 0 0,1 90,50" fill="none" stroke="#f1f5f9" strokeWidth="12" strokeLinecap="round" />
          <path
            d="M 10,50 A 40,40 0 0,1 90,50"
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray="125.6"
            strokeDashoffset={125.6 * (isMounted ? (1 - pct) : 1)}
            className="transition-all duration-1000 ease-out cursor-pointer hover:opacity-80"
            onMouseMove={(e) => handleMouseMove(e, <div className="font-semibold">{label}: {value} / {max} ({Math.round(pct * 100)}%)</div>)}
            onMouseLeave={handleMouseLeave}
          />
        </svg>
        <div className="absolute bottom-0 flex flex-col items-center pointer-events-none">
          <span className="text-2xl font-black text-slate-900">{value}%</span>
        </div>
      </div>
      <span className="text-xs font-bold text-slate-600 mt-1">{label}</span>
      <ChartTooltip {...tooltip} />
    </div>
  );
};

// 7. RADIAL GAUGE
export const RadialGauge = ({ value = 0, label, color = "#2563eb", total }: { value?: number; label: string; color?: string; total?: number }) => {
  const isMounted = useMountAnimation();
  const { tooltip, handleMouseMove, handleMouseLeave } = useTooltip();
  return (
    <div className="flex flex-col items-center justify-center py-2 relative">
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#f1f5f9"
            strokeWidth="3.8"
          />
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke={color}
            strokeWidth="3.8"
            strokeDasharray={isMounted ? `${value}, 100` : '0, 100'}
            className="transition-all duration-1000 ease-out cursor-pointer hover:opacity-80"
            onMouseMove={(e) => handleMouseMove(e, <div className="font-semibold">{label}: {value}%</div>)}
            onMouseLeave={handleMouseLeave}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl font-black text-slate-900">{value}%</span>
        </div>
      </div>
      <span className="text-xs font-bold text-slate-600 mt-1">{label}</span>
      <ChartTooltip {...tooltip} />
    </div>
  );
};

// 8. MULTI-SEGMENT PROGRESS BAR
export const MultiSegmentProgressBar = ({ segments = [] }: { segments?: { label: string; value: number; color: string }[] }) => {
  const isMounted = useMountAnimation();
  const { tooltip, handleMouseMove, handleMouseLeave } = useTooltip();
  const total = segments.reduce((acc, s) => acc + (s.value || 0), 0) || 1;

  return (
    <div className="w-full space-y-3 relative">
      <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
        {segments.map((s, i) => {
          const pct = ((s.value || 0) / total) * 100;
          return (
            <div
              key={i}
              className="h-full transition-all duration-1000 ease-out hover:opacity-85 cursor-pointer relative"
              style={{ width: isMounted ? `${pct}%` : '0%', backgroundColor: s.color }}
              onMouseMove={(e) => handleMouseMove(e, <div className="font-semibold">{s.label}: {s.value} ({Math.round(pct)}%)</div>)}
              onMouseLeave={handleMouseLeave}
            />
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
        {segments.map((s, i) => (
          <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
              <span className="text-slate-700 truncate max-w-[90px]">{s.label}</span>
            </div>
            <span className="font-extrabold text-slate-900">{s.value} ({Math.round(((s.value || 0) / total) * 100)}%)</span>
          </div>
        ))}
      </div>
      <ChartTooltip {...tooltip} />
    </div>
  );
};

// 9. RESEARCH FUNNEL
export const ResearchFunnelChart = ({ steps = [] }: { steps?: { label: string; count: number; percentage: number; color: string }[] }) => {
  const isMounted = useMountAnimation();
  const { tooltip, handleMouseMove, handleMouseLeave } = useTooltip();
  return (
    <div className="w-full space-y-2.5 py-1 relative">
      {steps.map((step, idx) => (
        <div key={idx} className="flex items-center gap-3">
          <div className="w-24 text-right shrink-0">
            <p className="text-xs font-bold text-slate-800 truncate">{step.label}</p>
            <p className="text-[10px] font-semibold text-slate-400">{step.count}</p>
          </div>
          <div 
            className="flex-1 bg-slate-100 h-7 rounded-lg overflow-hidden relative flex items-center px-3 border border-slate-200/60 cursor-pointer"
            onMouseMove={(e) => handleMouseMove(e, <div className="font-semibold">{step.label}: {step.count} ({step.percentage}%)</div>)}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="absolute left-0 top-0 bottom-0 transition-all duration-1000 ease-out rounded-r-lg opacity-85"
              style={{ width: isMounted ? `${step.percentage}%` : '0%', backgroundColor: step.color }}
            />
            <span className="relative z-10 text-xs font-black text-slate-800 flex items-center justify-between w-full pointer-events-none">
              <span>{step.percentage}%</span>
              <span className="text-[10px] text-slate-600 font-bold bg-white/90 px-2 py-0.5 rounded shadow-2xs">Stage {idx + 1}</span>
            </span>
          </div>
        </div>
      ))}
      <ChartTooltip {...tooltip} />
    </div>
  );
};

export const FunnelChart = ResearchFunnelChart;

// 10. KPI CARD COMPONENT
export const KPICard = ({ 
  title, 
  value, 
  subtitle,
  trend,
  change, 
  isPositive, 
  icon, 
  color = "blue" 
}: any) => {
  const displayChange = trend?.value !== undefined ? `${trend.value}%` : change;
  const positive = trend?.isPositive !== undefined ? trend.isPositive : isPositive;

  const renderIcon = () => {
    if (!icon) return null;
    if (React.isValidElement(icon)) return icon;
    if (typeof icon === 'function') {
      const IconComponent = icon;
      return <IconComponent className="w-6 h-6" />;
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition">
      <div className="space-y-1">
        <p className="text-xs font-semibold text-slate-500">{title}</p>
        <h3 className="text-2xl font-extrabold text-slate-900">{value}</h3>
        {subtitle && <p className="text-[11px] text-slate-400 font-medium">{subtitle}</p>}
        {displayChange && (
          <p className={`text-[11px] font-bold ${positive ? 'text-emerald-600' : 'text-rose-600'}`}>
            {positive ? '↑' : '↓'} {displayChange}
          </p>
        )}
      </div>
      {icon && (
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
          color === 'blue' ? 'bg-blue-50 text-blue-600' :
          color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
          color === 'amber' ? 'bg-amber-50 text-amber-600' :
          color === 'purple' ? 'bg-purple-50 text-purple-600' :
          color === 'rose' ? 'bg-rose-50 text-rose-600' :
          color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
          'bg-slate-50 text-slate-600'
        }`}>
          {renderIcon()}
        </div>
      )}
    </div>
  );
};

// 11. MULTI-LINE GRAPH
export const MultiLineGraph = ({
  years = ['2021', '2022', '2023', '2024', '2025'],
  lines = [
    { label: 'Internships', data: [15, 22, 34, 44, 64], color: '#3b82f6' },
    { label: 'Placements', data: [25, 36, 48, 60, 85], color: '#10b981' },
    { label: 'Projects', data: [10, 15, 20, 26, 42], color: '#f59e0b' }
  ]
}: {
  years?: string[];
  lines?: { label: string; data: number[]; color: string }[];
}) => {
  const isMounted = useMountAnimation();
  const { tooltip, handleMouseMove, handleMouseLeave } = useTooltip();
  const width = 360;
  const height = 150;
  const padding = 30;
  const maxVal = 100;
  const pathLength = 2000;

  return (
    <div className="w-full flex flex-col items-center relative">
      <div className="flex items-center justify-end gap-4 w-full text-xs font-semibold mb-2">
        {lines.map((line, idx) => (
          <div key={idx} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: line.color }} />
            <span className="text-slate-600 text-[11px] font-bold">{line.label}</span>
          </div>
        ))}
      </div>

      <div className="w-full relative">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          {[0, 20, 40, 60, 80, 100].map((val) => {
            const y = height - padding - (val / maxVal) * (height - padding * 2);
            return (
              <g key={val}>
                <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="#f1f5f9" strokeDasharray="3 3" />
                <text x={padding - 6} y={y + 3} textAnchor="end" fill="#94a3b8" fontSize="8" fontWeight="700">{val}</text>
              </g>
            );
          })}

          {lines.map((line, idx) => {
            const points = line.data.map((val, i) => {
              const x = padding + (i / (years.length - 1)) * (width - padding * 2);
              const y = height - padding - (val / maxVal) * (height - padding * 2);
              return { x, y, val };
            });

            const pathD = points.reduce((acc, p, i) => i === 0 ? `M ${p.x},${p.y}` : `${acc} L ${p.x},${p.y}`, '');

            return (
              <g key={idx}>
                <path d={pathD} fill="none" stroke={line.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" 
                  style={{ strokeDasharray: pathLength, strokeDashoffset: isMounted ? 0 : pathLength, transition: `stroke-dashoffset 1.5s ease-out ${idx * 0.2}s` }} />
                {points.map((p, i) => (
                  <g key={i}>
                    <circle 
                      cx={p.x} cy={p.y} r="4" fill="#ffffff" stroke={line.color} strokeWidth="2.5" className="pointer-events-none" 
                      style={{ opacity: isMounted ? 1 : 0, transition: `opacity 0.5s ease-out ${0.5 + (i * 0.1) + (idx * 0.2)}s` }}
                    />
                    <circle 
                      cx={p.x} cy={p.y} r="16" fill="transparent" className="cursor-pointer"
                      onMouseMove={(e) => handleMouseMove(e, <div className="font-semibold text-center">{line.label} ({years[i]})<br/><span className="text-slate-300 font-normal">Metric: {p.val}</span></div>)}
                      onMouseLeave={handleMouseLeave}
                    />
                  </g>
                ))}
              </g>
            );
          })}
        </svg>

        <div className="flex justify-between mt-1 pl-6 pr-2 text-[10px] font-extrabold text-slate-500">
          {years.map((y, i) => (
            <span key={i} className="text-center">{y}</span>
          ))}
        </div>
      </div>
      <ChartTooltip {...tooltip} />
    </div>
  );
};
