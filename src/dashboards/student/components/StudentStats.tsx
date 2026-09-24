import React from 'react';
import { BookOpen, Award, Briefcase, TrendingUp } from 'lucide-react';

export const StudentStats: React.FC = () => {
  const stats = [
    { label: 'Active Courses', value: '6', icon: BookOpen, color: 'text-blue-600 bg-blue-50' },
    { label: 'Verified Skills', value: '14', icon: Award, color: 'text-purple-600 bg-purple-50' },
    { label: 'Industry Applications', value: '5', icon: Briefcase, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Career Readiness Index', value: '92%', icon: TrendingUp, color: 'text-amber-600 bg-amber-50' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-0.5">{stat.value}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};
