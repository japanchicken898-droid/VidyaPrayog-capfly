import React from 'react';
import { Send } from 'lucide-react';

interface LogoProps {
  variant?: 'leftPanel' | 'hero';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'leftPanel', className = '' }) => {
  if (variant === 'leftPanel') {
    return (
      <div className={`flex items-center justify-center gap-3 px-6 py-4 rounded-xl border border-slate-200/80 bg-white shadow-sm hover:shadow-md transition-shadow ${className}`}>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 p-[2px] shadow-sm flex items-center justify-center">
          <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center gap-[3px]">
            <div className="w-1.5 h-4 bg-emerald-500 rounded-full"></div>
            <div className="w-1.5 h-4 bg-teal-500 rounded-full"></div>
          </div>
        </div>
        <span className="text-2xl font-extrabold tracking-tight text-slate-900 font-['Outfit']">
          CAPFLY
        </span>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <div className="flex items-center justify-center gap-2">
        <span className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 font-['Outfit']">
          CAPFLY
        </span>
        <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30 transform -rotate-12 hover:rotate-0 transition-transform">
          <Send className="w-6 h-6 md:w-7 md:h-7 stroke-[2.5]" />
        </div>
      </div>
      <div className="mt-2 text-sm md:text-base font-bold tracking-widest text-slate-700 uppercase">
        Learn <span className="text-blue-600 font-extrabold">•</span> Connect <span className="text-blue-600 font-extrabold">•</span> Grow
      </div>
      <p className="mt-1 text-xs md:text-sm font-semibold text-slate-600 max-w-md">
        Bridging Academia and Industry for a Brighter Future
      </p>
    </div>
  );
};
