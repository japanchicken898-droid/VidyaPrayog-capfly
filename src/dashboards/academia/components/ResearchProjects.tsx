import React from 'react';
import { FlaskConical, Users, ExternalLink } from 'lucide-react';

export const ResearchProjects: React.FC = () => {
  const projects = [
    { title: 'AI-Driven Predictive Logistics for Smart Supply Chains', partner: 'LogisticsTech Corp', grant: '$45,000', students: 4 },
    { title: 'Quantum Encryption Protocols for Next-Gen Telecoms', partner: 'CyberSec Labs', grant: '$60,000', students: 6 },
    { title: 'Sustainable AgriTech IoT Sensor Mesh Systems', partner: 'AgriGlobe Corp', grant: '$30,000', students: 3 },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-purple-600" />
          Joint Academia-Industry Research Grants
        </span>
        <button className="text-xs font-bold text-purple-600 hover:text-purple-700">View All</button>
      </h3>
      <div className="space-y-3">
        {projects.map((proj, idx) => (
          <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-purple-50/30 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-slate-800 text-sm">{proj.title}</h4>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-3">
                <span>Industry Partner: <strong>{proj.partner}</strong></span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-purple-600" /> {proj.students} Scholars</span>
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-sm font-extrabold text-purple-700 bg-purple-100 px-3 py-1 rounded-lg">
                {proj.grant}
              </span>
              <button className="block text-xs font-semibold text-slate-400 hover:text-purple-600 mt-1 ml-auto">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
