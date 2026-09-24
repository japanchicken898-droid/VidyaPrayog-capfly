import { Award } from 'lucide-react';

export const StudentGrades: React.FC = () => {
  const evaluations = [
    { student: 'Priya Verma', project: 'Neural Network Optimizer', industryScore: '98/100', status: 'Approved' },
    { student: 'Vikram Mehta', project: 'Distributed Ledger Core', industryScore: '92/100', status: 'Approved' },
    { student: 'Sneha Patel', project: 'Automated Microgrid System', industryScore: '89/100', status: 'In Review' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Award className="w-5 h-5 text-purple-600" />
        <span>Industry Project Mentorship Evaluations</span>
      </h3>
      <div className="space-y-3">
        {evaluations.map((item, idx) => (
          <div key={idx} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-slate-800 text-sm">{item.student}</h4>
              <p className="text-xs text-slate-500">{item.project}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-slate-900">{item.industryScore}</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                item.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
