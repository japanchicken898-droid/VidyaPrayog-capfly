import React from 'react';
import { ArrowRight, BookOpen, BriefcaseBusiness, GraduationCap, Handshake, Search, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const portals = [
    { label: 'Students', icon: GraduationCap, desc: 'Build a verified skills profile and discover opportunities.' },
    { label: 'Academia', icon: BookOpen, desc: 'Connect curriculum, assessments and industry needs.' },
    { label: 'Industry', icon: BriefcaseBusiness, desc: 'Discover emerging talent through evidence-based skills.' },
    { label: 'Institutions', icon: Handshake, desc: 'Coordinate partnerships, internships and placements.' },
  ];

  return (
    <main className="capfly-hero min-w-0 flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <section className="relative overflow-hidden border-b border-slate-100 px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
        <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-blue-50" />
        <div className="pointer-events-none absolute right-20 top-20 h-32 w-32 rounded-full border border-blue-100" />
        <div className="relative max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700"><Sparkles className="h-3.5 w-3.5" /> A connected skills ecosystem</div>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.08] tracking-[-0.055em] text-slate-950 sm:text-5xl lg:text-[62px]">Turn learning into<br /><span className="text-blue-600">real opportunity.</span></h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">Capfly connects students, educators, institutions and industry through skill mapping, assessments, internships and placement intelligence.</p>
          <div className="mt-8 flex max-w-3xl items-center gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-[0_6px_20px_rgba(23,35,63,0.05)]">
            <Search className="ml-3 h-5 w-5 shrink-0 text-slate-400" />
            <span className="min-w-0 flex-1 truncate text-sm text-slate-400 sm:text-[15px]">Search skills, internships, projects or opportunities</span>
            <button type="button" className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">Explore</button>
          </div>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-slate-400"><span>✓ Skill-first discovery</span><span>✓ Evidence-based profiles</span><span>✓ Collaboration-ready</span></div>
        </div>
      </section>
      <section className="bg-slate-50/70 px-6 py-8 sm:px-10 lg:px-14">
        <div className="flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Explore the platform</p><h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-slate-950">One ecosystem. Four perspectives.</h2></div><ArrowRight className="h-5 w-5 shrink-0 text-blue-600" /></div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {portals.map(({ label, icon: Icon, desc }) => <div key={label} className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-sm"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600"><Icon className="h-5 w-5" /></div><p className="mt-5 text-sm font-bold text-slate-900">{label}</p><p className="mt-2 text-xs leading-5 text-slate-500">{desc}</p><div className="mt-4 flex items-center gap-1 text-xs font-semibold text-blue-600">View workspace <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" /></div></div>)}
        </div>
      </section>
    </main>
  );
};
