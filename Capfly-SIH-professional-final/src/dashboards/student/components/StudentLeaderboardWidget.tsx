import React, { useEffect, useState } from 'react';
import { Medal, User } from 'lucide-react';

export const StudentLeaderboardWidget: React.FC = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animations after mount
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="col-span-12 md:col-span-4 bg-white border border-slate-100 rounded-2xl p-4 shadow-xs font-sans flex flex-col items-center h-full justify-between">
      <h3 className="text-sm font-bold text-slate-900 mb-6 w-full text-left">Skill Leaderboard</h3>
      
      {/* 1. Podium Section */}
      <div className="flex items-end justify-center gap-2 mb-3 h-28 w-full px-2 mt-4">
        {/* Rank 2 - Rose (Left) */}
        <div className="flex flex-col items-center relative w-1/3">
          <div className="flex flex-col items-center absolute -top-10">
            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 overflow-hidden z-10 flex items-center justify-center text-slate-400 shadow-sm">
              <User className="w-4 h-4" />
            </div>
            <Medal className="w-4 h-4 text-slate-400 -mt-2 z-20 bg-white rounded-full p-0.5" />
            <span className="text-[10px] font-bold text-slate-600 mt-0.5">Rose</span>
          </div>
          <div 
            className={`w-full bg-slate-200 rounded-t-xl transition-all duration-1000 ease-out flex items-start justify-center pt-1.5`}
            style={{ height: animate ? '60px' : '0px' }}
          >
          </div>
        </div>

        {/* Rank 1 - Aryan (Center) */}
        <div className="flex flex-col items-center relative w-1/3">
          <div className="flex flex-col items-center absolute -top-12">
            <div className="w-10 h-10 rounded-full border-2 border-amber-300 p-0.5 overflow-hidden z-10 bg-white shadow-md flex items-center justify-center text-amber-500">
              <User className="w-5 h-5" />
            </div>
            <Medal className="w-5 h-5 text-amber-500 -mt-2.5 z-20 bg-white rounded-full p-0.5" />
            <span className="text-[10px] font-bold text-amber-600 mt-0.5">Aryan</span>
          </div>
          <div 
            className={`w-full bg-amber-400 rounded-t-xl transition-all duration-1000 ease-out flex items-start justify-center pt-2 shadow-sm`}
            style={{ height: animate ? '90px' : '0px' }}
          >
          </div>
        </div>

        {/* Rank 3 - Shruti (Right) */}
        <div className="flex flex-col items-center relative w-1/3">
          <div className="flex flex-col items-center absolute -top-10">
            <div className="w-8 h-8 rounded-full border border-orange-300 p-0.5 overflow-hidden z-10 bg-white shadow-sm flex items-center justify-center text-orange-400">
              <User className="w-4 h-4" />
            </div>
            <Medal className="w-4 h-4 text-orange-500 -mt-2 z-20 bg-white rounded-full p-0.5" />
            <span className="text-[10px] font-bold text-slate-600 mt-0.5">Shruti</span>
          </div>
          <div 
            className={`w-full bg-orange-400 rounded-t-xl transition-all duration-1000 ease-out flex items-start justify-center pt-1.5`}
            style={{ height: animate ? '45px' : '0px' }}
          >
          </div>
        </div>
      </div>

      {/* 2. Current User Pill Card */}
      <div className="w-full bg-emerald-500 rounded-xl p-2.5 flex items-center justify-between text-white shadow-sm mb-3">
        <div className="flex flex-col items-center gap-0.5 w-1/4">
          <div className="w-7 h-7 rounded-full border border-white/60 flex items-center justify-center bg-white/20">
            <User className="w-3.5 h-3.5" />
          </div>
          <span className="text-[9px] font-semibold">You</span>
        </div>
        
        <div className="flex flex-col items-center w-1/4">
          <span className="text-[9px] text-emerald-100 font-medium">%age</span>
          <span className="text-xs font-bold">87%</span>
        </div>
        
        <div className="flex flex-col items-center w-1/4">
          <span className="text-[9px] text-emerald-100 font-medium">%tile</span>
          <span className="text-xs font-bold">90.8</span>
        </div>
        
        <div className="flex flex-col items-center w-1/4">
          <span className="text-[9px] text-emerald-100 font-medium">Rank</span>
          <span className="text-sm font-black">10</span>
        </div>
      </div>

      {/* 3. Vertical Ranking List (Reduced to 3 to save space) */}
      <div className="w-full flex flex-col text-xs px-1 space-y-0.5">
        {[
          { name: 'Smriti Irani', score: '97%', rank: '04' },
          { name: 'Naren Dave', score: '96%', rank: '05' },
          { name: 'Arya Ali', score: '95.8%', rank: '06' },
        ].map((student, i) => (
          <div key={i} className="flex items-center justify-between py-1.5 border-b border-transparent hover:bg-slate-50 transition-colors rounded-lg px-2">
            <span className="font-medium text-slate-700 w-1/2 text-[11px]">{student.name}</span>
            <span className="font-semibold text-slate-600 w-1/4 text-center text-[11px]">{student.score}</span>
            <span className="font-black text-slate-700 w-1/4 text-right text-xs">{student.rank}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
