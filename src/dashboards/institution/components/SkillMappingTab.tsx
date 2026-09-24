import React, { useState } from 'react';
import { VerticalBarChart, HorizontalBarChart } from './ChartUtils';

export const SkillMappingTab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'Student' | 'Faculty' | 'All'>('Student');

  return (
    <div className="space-y-6 font-sans text-slate-800 bg-[#f8fafc] min-h-full pb-12">
      {/* Title & Sub-tabs Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/80 pb-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Skill Assessment &amp; Mapping</h1>
          <p className="text-xs text-slate-500 font-medium">Departmental Proficiency &amp; Deficit Analysis</p>
        </div>

        {/* Center Date Header (PRAGATI MITRA SPECIFIED) */}
        <div className="px-4 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-bold text-slate-700 shadow-2xs">
          Date: 12-09-2026
        </div>
      </div>

      {/* Sub-Navigation Tabs: Pill Buttons (PRAGATI MITRA SPECIFIED: bg-gray-200, active bg-slate-800 text-white) */}
      <div className="flex items-center gap-2">
        {(['Student', 'Faculty', 'All'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={`px-5 py-2 text-xs font-bold rounded-full transition-colors cursor-pointer ${
              activeSubTab === tab 
                ? 'bg-slate-800 text-white shadow-xs' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* SUMMARY STATS BOX (PRAGATI MITRA SPECIFIED: Total 200, Assessed 180, Skill Gap 20, Placed 45) */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Students</p>
          <p className="text-2xl font-black text-slate-900 mt-1">200</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Assessed</p>
          <p className="text-2xl font-black text-blue-600 mt-1">180</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Skill Gap Identified</p>
          <p className="text-2xl font-black text-amber-600 mt-1">20</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Industry Placed</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">45</p>
        </div>
      </div>

      {/* 2-COLUMN CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Skill Assessment Bar Chart */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs space-y-4">
          <div className="border-b border-gray-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">Department Skill Assessment</h2>
            <p className="text-xs text-slate-500 font-medium">Proficient Count per Department</p>
          </div>

          <VerticalBarChart data={[
            { label: 'CSE', value: 78, color: '#3b82f6' },
            { label: 'ECE', value: 65, color: '#10b981' },
            { label: 'EEE', value: 52, color: '#f59e0b' },
            { label: 'Mech', value: 48, color: '#8b5cf6' },
            { label: 'Civil', value: 40, color: '#ec4899' },
          ]} />
        </div>

        {/* Card 3: Skill Trend Line & Breakdown Chart */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs space-y-4">
          <div className="border-b border-gray-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">Skill Gap Analysis &amp; Trend</h2>
            <p className="text-xs text-slate-500 font-medium">Top Skill Deficit Areas across Curriculum</p>
          </div>

          <HorizontalBarChart data={[
            { label: 'Cloud Native & DevOps', value: 35, color: '#ef4444' },
            { label: 'GenAI & Python LLMs', value: 42, color: '#f59e0b' },
            { label: 'Embedded RISC-V C', value: 28, color: '#3b82f6' },
            { label: 'EV Battery Management', value: 30, color: '#8b5cf6' },
            { label: 'BIM 3D Modeling', value: 20, color: '#10b981' },
          ]} />
        </div>
      </div>
    </div>
  );
};
