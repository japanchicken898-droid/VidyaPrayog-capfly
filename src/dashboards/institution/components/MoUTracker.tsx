import React from 'react';
import { FileCheck, ShieldAlert } from 'lucide-react';

export const MoUTracker: React.FC = () => {
  const mous = [
    { company: 'Global Tech Corp', scope: 'AI Lab & Internships', validUntil: 'Dec 2028', status: 'Active' },
    { company: 'CloudScale Inc', scope: 'Cloud DevOps Curriculum', validUntil: 'Nov 2027', status: 'Active' },
    { company: 'AutoDrive Systems', scope: 'Robotics R&D Co-op', validUntil: 'Mar 2026', status: 'Renewal Due' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
        <FileCheck className="w-5 h-5 text-amber-600" />
        <span>Corporate MoUs & Alliances</span>
      </h3>
      <div className="space-y-3">
        {mous.map((mou, idx) => (
          <div key={idx} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-slate-800 text-sm">{mou.company}</h4>
              <p className="text-xs text-slate-500">{mou.scope}</p>
            </div>
            <div className="text-right">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1 ${
                mou.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {mou.status === 'Renewal Due' && <ShieldAlert className="w-3 h-3 text-amber-600" />}
                {mou.status}
              </span>
              <span className="block text-[10px] text-slate-400 mt-1">Valid: {mou.validUntil}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
