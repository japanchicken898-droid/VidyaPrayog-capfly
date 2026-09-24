import React, { useState } from 'react';
import { Map, Zap } from 'lucide-react';
import { SkillRoadmap } from './SkillRoadmap';
import { CareerRoadmap } from './CareerRoadmap';

export const StudentRoadmaps: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'career' | 'skill'>('career');

  return (
    <div className="p-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      
      {/* Segmented Control Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-1.5 flex items-center w-fit mb-8 shadow-sm">
        <button
          onClick={() => setActiveTab('career')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
            activeTab === 'career' 
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Map className="w-4 h-4" />
          Career Roadmap
        </button>
        <button
          onClick={() => setActiveTab('skill')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
            activeTab === 'skill' 
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Zap className="w-4 h-4" />
          Skill Roadmap
        </button>
      </div>

      {/* Tab Content */}
      <div className="w-full">
        {activeTab === 'career' ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
            <CareerRoadmap />
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
            <SkillRoadmap />
          </div>
        )}
      </div>

    </div>
  );
};
