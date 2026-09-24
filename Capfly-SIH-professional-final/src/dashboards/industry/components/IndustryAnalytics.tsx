import React from 'react';
import { BarChart3, TrendingUp, DollarSign } from 'lucide-react';

export const IndustryAnalytics: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-emerald-600" />
        <span>R&D ROI & Talent Pipeline Metrics</span>
      </h3>
      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 uppercase">Hiring Conversion</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-900 mt-1">84%</p>
          <p className="text-xs text-emerald-700 mt-1">Intern-to-FTE Conversion Rate</p>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 uppercase">Recruitment Savings</span>
            <DollarSign className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-black text-blue-900 mt-1">$120,000 / yr</p>
          <p className="text-xs text-blue-700 mt-1">Saved via Direct Campus Pipeline</p>
        </div>
      </div>
    </div>
  );
};
