import React from 'react';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

export const SkillBadges: React.FC = () => {
  const badges = [
    { name: 'React Architecture', issuer: 'Meta Certified', level: 'Advanced' },
    { name: 'Node.js & Microservices', issuer: 'Capfly Academy', level: 'Intermediate' },
    { name: 'AWS Cloud Foundations', issuer: 'Amazon Web Services', level: 'Verified' },
    { name: 'Agile & DevOps Workflow', issuer: 'Atlassian Certified', level: 'Practical' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
        <ShieldCheck className="w-5 h-5 text-emerald-500" />
        <span>Verified Industry Skill Badges</span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {badges.map((badge, idx) => (
          <div key={idx} className="p-3.5 rounded-xl border border-slate-100 bg-emerald-50/20 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                {badge.name}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">{badge.issuer}</p>
            </div>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md">
              {badge.level}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
