import React, { useState } from 'react';
import {
  GraduationCap, Plus, Download, Calendar, Users, Star, Building2, CheckCircle2
} from 'lucide-react';
import { SemiCircleGauge, VerticalBarChart, KPICard } from './ChartUtils';
import { IndustryExportModal } from './IndustryExportModal';

interface Lecture {
  id: string; topic: string; speakerName: string; speakerDesignation: string;
  company: string; date: string; attendeesCount: number; rating: number;
  department: string; status: 'Completed' | 'Upcoming' | 'Registration Open';
}

const mockLectures: Lecture[] = [
  { id:'L-801', topic:'Architecting High-Throughput Distributed Systems at Scale',
    speakerName:'Sanjay Deshpande', speakerDesignation:'Principal Architect',
    company:'Amazon Web Services', date:'12 Sep 2026', attendeesCount:450,
    rating:4.9, department:'Computer Science', status:'Completed' },
  { id:'L-802', topic:'Next-Gen Semiconductor Design and VLSI Physical Design Flow',
    speakerName:'Dr. Ananya Ray', speakerDesignation:'Sr. Director of Silicon Engineering',
    company:'NVIDIA India', date:'28 Sep 2026', attendeesCount:380,
    rating:4.8, department:'Electronics and Communication', status:'Upcoming' },
  { id:'L-803', topic:'Quantitative Finance and High-Frequency Trading Algorithms',
    speakerName:'Vikram Malhotra', speakerDesignation:'VP Quantitative Research',
    company:'Goldman Sachs', date:'05 Oct 2026', attendeesCount:520,
    rating:5.0, department:'Math and Data Science', status:'Registration Open' },
];

export const GuestLecturesTab: React.FC = () => {
  const deptBarData = [
    { label:'CSE', value:18, color:'#3b82f6' },
    { label:'ECE', value:14, color:'#10b981' },
    { label:'Mech', value:10, color:'#f59e0b' },
    { label:'Biotech', value:8, color:'#ec4899' },
    { label:'Civil', value:8, color:'#8b5cf6' },
  ];

  const [showExportModal, setShowExportModal] = useState(false);

  const exportConfig = {
    filename: 'guest_lectures_attendance_log',
    pdfLabel: 'Guest Lectures & Industrial Masterclasses Attendance Report',
    csvData: 'Topic,Speaker,Designation,Company,Date,Attendees,Rating\n' +
      mockLectures.map(l => `"${l.topic}","${l.speakerName}","${l.speakerDesignation}","${l.company}","${l.date}",${l.attendeesCount},${l.rating}`).join('\n'),
  };

  const handleExportLectures = () => {
    setShowExportModal(true);
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto relative">
      <IndustryExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        config={exportConfig}
        onToast={(msg) => { void msg; }}
      />
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Guest Lectures and Industrial Masterclasses</h1>
            <p className="text-xs text-slate-500 mt-0.5">Keynotes, technical workshops and executive interactions by corporate leaders</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleExportLectures}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-2 cursor-pointer">
            <Download className="w-4 h-4 text-slate-500"/>Lecture Logs PDF
          </button>
          <button onClick={handleExportLectures}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-purple-500/20 cursor-pointer">
            <Plus className="w-4 h-4"/>Schedule Guest Session
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Sessions Delivered" value="58" change="+14 this semester" isPositive={true} icon={<svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>} color="purple"/>
        <KPICard title="Corporate Speakers" value="42" change="C-Suite and Tech VPs" isPositive={true} icon={<svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>} color="blue"/>
        <KPICard title="Total Attendees" value="4,820" change="92% attendance" isPositive={true} icon={<svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>} color="emerald"/>
        <KPICard title="Avg Rating" value="4.9 / 5.0" change="Top rated" isPositive={true} icon={<svg className="w-5 h-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>} color="amber"/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <SemiCircleGauge value={94} label="Overall Student Satisfaction Index" color="#8b5cf6"/>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 mb-4">Sessions by Department</h2>
          <VerticalBarChart data={deptBarData}/>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Featured and Scheduled Guest Sessions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockLectures.map(lec => (
            <div key={lec.id} className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 text-[10px] font-bold">{lec.department}</span>
                  <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3"/>{lec.date}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm leading-snug line-clamp-3">{lec.topic}</h4>
              </div>
              <div className="pt-3 border-t border-slate-200/60">
                <div className="font-bold text-slate-800 text-xs">{lec.speakerName}</div>
                <div className="text-[11px] text-slate-500">{lec.speakerDesignation} - <span className="font-semibold text-purple-600">{lec.company}</span></div>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1 text-emerald-600 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400"/>{lec.rating} Rating
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    lec.status==='Completed' ? 'bg-emerald-50 text-emerald-700' :
                    lec.status==='Registration Open' ? 'bg-blue-50 text-blue-700' :
                    'bg-amber-50 text-amber-700'}`}>{lec.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
