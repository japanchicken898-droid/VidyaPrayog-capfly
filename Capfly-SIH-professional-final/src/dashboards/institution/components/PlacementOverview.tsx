import React from 'react';
import { PieChart, Briefcase } from 'lucide-react';

export const PlacementOverview: React.FC = () => {
  const departments = [
    { name: 'Computer Science & Engineering', placed: '98%', avgPackage: '$24,000 / yr' },
    { name: 'Electronics & Communication', placed: '92%', avgPackage: '$18,500 / yr' },
    { name: 'Information Technology', placed: '96%', avgPackage: '$22,000 / yr' },
    { name: 'Data Science & AI', placed: '100%', avgPackage: '$28,000 / yr' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <PieChart className="w-5 h-5 text-amber-600" />
          Department-wise Placement Performance (2026 Batch)
        </span>
      </h3>
      <div className="space-y-3">
        {departments.map((dept, idx) => (
          <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-amber-50/20 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-emerald-600" />
                {dept.name}
              </h4>
              <p className="text-xs text-slate-500 mt-1">Average CTC: {dept.avgPackage}</p>
            </div>
            <div className="text-right">
              <span className="text-sm font-extrabold text-amber-900 bg-amber-100 px-3 py-1 rounded-lg">
                {dept.placed} Placed
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
