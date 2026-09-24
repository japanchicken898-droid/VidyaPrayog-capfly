import React, { useState } from 'react';
import { IndustryHeader } from './components/IndustryHeader';
import { IndustrySidebar } from './components/IndustrySidebar';
import type { IndustryTabType } from './components/IndustrySidebar';
import { PostOpportunitiesView } from './components/PostOpportunitiesView';
import { MentorshipProgramsView } from './components/MentorshipProgramsView';
import { CandidateMatchingView } from './components/CandidateMatchingView';
import { IndustryCollaborationHub } from './components/IndustryCollaborationHub';
import { ClipboardList, Users, TrendingUp, Building2 } from 'lucide-react';
import type { NotificationItem } from './components/NotificationCenter';
import { SkillAssessmentModule } from './components/SkillAssessmentModule';
import { CollegePerformanceBarChart } from './components/CollegePerformanceBarChart';
import { IndustryDomainPieChart } from './components/IndustryDomainPieChart';

interface IndustryDashboardProps {
  onLogout?: () => void;
}

// Background question bank (data-only, not rendered in any UI)
const ASSESSMENT_QUESTION_BANK = [
  { id: 1, track: 'Aptitude',      q: 'A train at 72 km/h crosses a 250m platform in 25s. Time to cross a pole?' },
  { id: 2, track: 'Aptitude',      q: 'Two cards drawn without replacement from a deck. P(both Aces)?' },
  { id: 3, track: 'Core CS',       q: 'Why is B+ Tree preferred over Hash Index for range queries in RDBMS?' },
  { id: 4, track: 'Core CS',       q: "What does 'Safe State' guarantee in Banker's Algorithm?" },
  { id: 5, track: 'DSA',           q: 'Worst-case search complexity in an AVL Tree with N nodes?' },
  { id: 6, track: 'Coding',        q: 'Output of recursive array reversal: arr={10,20,30,40,50}?' },
  { id: 7, track: 'System Design', q: 'Pattern for multi-provider payment gateway without modifying existing classes?' },
  { id: 8, track: 'Core CS',       q: 'Difference between process scheduling FCFS vs Round Robin in throughput?' },
];
// Suppress unused warning - this is background data
void ASSESSMENT_QUESTION_BANK;

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n-1',
    institutionName: 'IIT Madras',
    proposalTitle: 'AI & Data Engineering Industry Mentorship Program',
    department: 'Dept. of Computer Science',
    receivedTime: '12 mins ago',
    status: 'Pending Review',
    slots: 45,
    read: false,
  },
  {
    id: 'n-2',
    institutionName: 'Anna University',
    proposalTitle: 'Full-Stack Cloud & DevOps Accelerator',
    department: 'Information Technology',
    receivedTime: '1 hour ago',
    status: 'Pending Review',
    slots: 60,
    read: false,
  },
  {
    id: 'n-3',
    institutionName: 'NIT Trichy',
    proposalTitle: 'Embedded Systems & IoT Hardware Capstone Mentorship',
    department: 'ECE & Robotics',
    receivedTime: '3 hours ago',
    status: 'Under Discussion',
    slots: 30,
    read: true,
  },
];

export const IndustryDashboard: React.FC<IndustryDashboardProps> = ({ onLogout }) => {
  const [currentTab, setCurrentTab] = useState<IndustryTabType>('dashboard');
  const [assessmentSubView, setAssessmentSubView] = useState<'student' | 'college'>('student');
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const handleLogout = () => {
    if (onLogout) onLogout();
    else window.location.href = '/';
  };

  const handleAcceptNotification = (id: string, instName: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, status: 'Accepted' as const, read: true } : n)
    );
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Stats for top banner
  const stats = [
    { icon: ClipboardList, label: 'Active Assessments', value: '12 Deployed',    color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { icon: Users,         label: 'Total Candidates',   value: '4,850 Enrolled', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { icon: TrendingUp,    label: 'Avg. Campus Score',  value: '78.4%',          color: 'bg-amber-50 text-amber-700 border-amber-200' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7FB] text-slate-900 font-sans">
      {/* 1. Top Header Bar & Sub-Header Bar */}
      <IndustryHeader
        onLogout={handleLogout}
        currentTab={currentTab}
        notifications={notifications}
        onAcceptNotification={handleAcceptNotification}
        onMarkAllNotificationsRead={handleMarkAllRead}
      />

      {/* 2. Main Body: Left Vertical Sidebar + Content Canvas */}
      <div className="flex-1 flex flex-col md:flex-row w-full">
        <IndustrySidebar currentTab={currentTab} onSelectTab={setCurrentTab} />

        <main className="flex-1 p-4 sm:p-5 overflow-y-auto w-full">

          {/* ── Tab 1: Dashboard Overview ── */}
          {currentTab === 'dashboard' && (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-3 sm:p-4 shadow-xs flex flex-col space-y-4">
              {/* ── Row 1: Upper Console Card (Metrics & Domains) ── */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h1 className="text-sm font-bold text-slate-900 font-['Outfit'] leading-none">
                        Industry Collaboration Workspace
                      </h1>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs">
                        Corporate Partner Console
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                  {/* Left Column: 3 High-Contrast KPI Cards (5 cols) */}
                  <div className="lg:col-span-5 flex flex-col gap-1.5">
                    {stats.map((s) => {
                      const Icon = s.icon;
                      return (
                        <div
                          key={s.label}
                          className={`flex items-center gap-3 px-3 py-2 rounded-xl border ${s.color} shadow-xs transition-all`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-white/80 flex items-center justify-center shrink-0 shadow-2xs">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-extrabold text-base font-['Outfit'] leading-tight">{s.value}</div>
                            <div className="text-[9px] font-bold opacity-80 uppercase tracking-wider">{s.label}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Right Column: Industry Collaboration Domains Donut Chart (7 cols) */}
                  <div className="lg:col-span-7 bg-slate-50/70 rounded-2xl border border-slate-200/80 p-2.5 h-full flex flex-col justify-center">
                    <IndustryDomainPieChart />
                  </div>
                </div>
              </div>

              {/* ── Row 2: Master Section: Skill Assessment ── */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                {/* Section Header & Segmented Dual-Button View Switcher */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h2 className="text-sm font-bold text-slate-900 font-['Outfit']">
                      Skill Assessment
                    </h2>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 shadow-2xs">
                      Campus Benchmark &amp; Talent Evaluation Engine
                    </span>
                  </div>

                  {/* Segmented Dual-Button View Switcher */}
                  <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200/80 gap-1 self-start sm:self-center">
                    <button
                      type="button"
                      onClick={() => setAssessmentSubView('student')}
                      className={
                        assessmentSubView === 'student'
                          ? 'bg-[#0F172A] text-white shadow-md font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer text-[11px]'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer text-[11px]'
                      }
                    >
                      Student Skill Assessment
                    </button>

                    <button
                      type="button"
                      onClick={() => setAssessmentSubView('college')}
                      className={
                        assessmentSubView === 'college'
                          ? 'bg-[#0F172A] text-white shadow-md font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer text-[11px]'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer text-[11px]'
                      }
                    >
                      College-Wise Assessment
                    </button>
                  </div>
                </div>

                {/* Active Sub-View */}
                <div className="w-full">
                  {assessmentSubView === 'student' ? (
                    <SkillAssessmentModule />
                  ) : (
                    <CollegePerformanceBarChart />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── Tab 2: Post Opportunities ── */}
          {currentTab === 'opportunities' && <PostOpportunitiesView />}

          {/* ── Tab 3: Mentorship Programs ── */}
          {currentTab === 'mentorship' && <MentorshipProgramsView />}

          {/* ── Tab 4: Candidate Matching ── */}
          {currentTab === 'candidate-matching' && <CandidateMatchingView />}

          {/* ── Tab 5: Collaboration Hub ── */}
          {currentTab === 'collaboration' && <IndustryCollaborationHub />}
        </main>
      </div>
    </div>
  );
};

export default IndustryDashboard;
