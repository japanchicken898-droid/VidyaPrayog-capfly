import React from 'react';
import { BookMarked, FileText } from 'lucide-react';

export const PublicationFeed: React.FC = () => {
  const publications = [
    { title: 'Benchmarking Edge Computing in Smart Urban Grids', journal: 'IEEE Transactions 2026', citations: 42 },
    { title: 'Hybrid Machine Learning for Autonomous Robotics', journal: 'ACM Journal of AI Engineering', citations: 19 },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
        <BookMarked className="w-5 h-5 text-purple-600" />
        <span>Recent Publications & Patents</span>
      </h3>
      <div className="space-y-3">
        {publications.map((pub, idx) => (
          <div key={idx} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70">
            <h4 className="font-bold text-slate-800 text-sm flex items-start gap-2">
              <FileText className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              {pub.title}
            </h4>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
              <span>{pub.journal}</span>
              <span className="font-semibold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                {pub.citations} Citations
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
