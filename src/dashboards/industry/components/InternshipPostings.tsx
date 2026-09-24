import React from 'react';
import { Briefcase, MapPin, Plus } from 'lucide-react';

export const InternshipPostings: React.FC = () => {
  const jobs = [
    { title: 'Senior AI System Architect Intern', location: 'Bengaluru / Remote', applicants: 48, status: 'Active' },
    { title: 'Full Stack Cloud Engineer Co-op', location: 'Hyderabad / On-site', applicants: 62, status: 'Active' },
    { title: 'Data Analytics & ML Researcher', location: 'Pune / Hybrid', applicants: 31, status: 'Draft' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-emerald-600" />
          <span>Active Campus Recruitment & Internships</span>
        </h3>
        <button className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg flex items-center gap-1">
          <Plus className="w-4 h-4" /> Post New Opportunity
        </button>
      </div>
      <div className="space-y-3">
        {jobs.map((job, idx) => (
          <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-emerald-50/20 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-slate-800 text-sm">{job.title}</h4>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md">
                {job.applicants} Candidates Applied
              </span>
              <span className="block text-[10px] uppercase tracking-wider font-extrabold text-slate-400 mt-1">
                Status: {job.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
