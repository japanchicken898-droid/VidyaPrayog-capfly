import { UserCheck, Star } from 'lucide-react';

export const TalentSearch: React.FC = () => {
  const talents = [
    { name: 'Karan Patel', college: 'Tech Institute of Tech', score: '95% Match', topSkill: 'PyTorch / Distributed AI' },
    { name: 'Ananya Deshmukh', college: 'National Engineering College', score: '91% Match', topSkill: 'Golang / Kubernetes' },
    { name: 'Rohan Gupta', college: 'State Technological Univ', score: '88% Match', topSkill: 'React / Next.js / AWS' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
        <UserCheck className="w-5 h-5 text-emerald-600" />
        <span>Top Matched Student Talent</span>
      </h3>
      <div className="space-y-3">
        {talents.map((t, idx) => (
          <div key={idx} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                {t.name}
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              </h4>
              <p className="text-xs text-slate-500">{t.college}</p>
              <span className="inline-block text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded mt-1">
                {t.topSkill}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md">
                {t.score}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
