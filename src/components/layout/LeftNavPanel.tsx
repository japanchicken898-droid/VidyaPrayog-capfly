import React from 'react';
import type { PortalType } from './Navbar';
import { GraduationCap, Building2, School, Landmark, ArrowRight, ShieldCheck } from 'lucide-react';

interface LeftNavPanelProps { activePortal?: PortalType | null; onSelectPortal?: (portal: PortalType) => void; }

export const LeftNavPanel: React.FC<LeftNavPanelProps> = ({ activePortal = null, onSelectPortal }) => {
  const loginButtons: { label: string; id: PortalType; icon: React.ComponentType<{ className?: string }>; description: string }[] = [
    { label: 'Student', id: 'student', icon: GraduationCap, description: 'Skills, learning and opportunities' },
    { label: 'Academia', id: 'academia', icon: School, description: 'Assessments and academic outcomes' },
    { label: 'Industry', id: 'industry', icon: Building2, description: 'Talent and collaboration pipeline' },
    { label: 'Institution', id: 'institution', icon: Landmark, description: 'Partnerships and placement insights' },
  ];

  return <aside className="capfly-role-panel flex w-full shrink-0 flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 md:p-6 lg:w-[286px] xl:w-[304px]">
    <div>
      <div className="mb-7"><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-blue-600"><ShieldCheck className="h-4 w-4" /> Secure access</div><h2 className="mt-3 text-2xl font-bold tracking-[-0.04em] text-slate-950">Choose your workspace</h2><p className="mt-2 text-sm leading-6 text-slate-500">Enter the experience designed for your role in the skills ecosystem.</p></div>
      <div className="space-y-2.5">
        {loginButtons.map(({ label, id, icon: Icon, description }) => { const isActive = activePortal === id; return <button key={id} type="button" onClick={() => onSelectPortal?.(id)} className={`group flex w-full items-center justify-between rounded-xl border px-4 py-3.5 text-left transition ${isActive ? 'border-blue-300 bg-blue-50/70 shadow-sm' : 'border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50'}`}><span className="flex min-w-0 items-center gap-3"><span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600'}`}><Icon className="h-[18px] w-[18px]" /></span><span className="min-w-0"><span className="block text-sm font-bold text-slate-800">{label}</span><span className="mt-0.5 block truncate text-xs text-slate-400">{description}</span></span></span><ArrowRight className={`h-4 w-4 shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-300 group-hover:text-blue-500'}`} /></button>; })}
      </div>
    </div>
    <div className="mt-8 border-t border-slate-100 pt-5"><p className="text-xs leading-5 text-slate-400">A unified platform for skill mapping, internships, industry engagement and placement readiness.</p><div className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-500"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Platform ready</div></div>
  </aside>;
};
