import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Building2, 
  Handshake,
  FileText, 
  LogOut, 
  Bell, 
  ChevronRight, 
  X,
  BookOpen,
  Award,
  GraduationCap,
  Briefcase,
  Landmark
} from 'lucide-react';

import { DashboardTab } from './components/DashboardTab';
import { StudentDetailsTab } from './components/StudentDetailsTab';
import { AcademicRecordsTab } from './components/AcademicRecordsTab';
import { AttendanceTab } from './components/AttendanceTab';
import { DepartmentYearTab } from './components/DepartmentYearTab';
import { StudentPortfoliosTab } from './components/StudentPortfoliosTab';

import { FacultyDetailsTab } from './components/FacultyDetailsTab';
import { TeachingWorkloadTab } from './components/TeachingWorkloadTab';
import { FacultyDevelopmentTab } from './components/FacultyDevelopmentTab';
import { ResearchPublicationsTab } from './components/ResearchPublicationsTab';
import { IndustryEngagementTab } from './components/IndustryEngagementTab';

import { IndustryTab } from './components/IndustryTab';
import { IndustryPartnersTab } from './components/IndustryPartnersTab';
import { MoUsAgreementsTab } from './components/MoUsAgreementsTab';
import { IndustryProjectsTab } from './components/IndustryProjectsTab';
import { GuestLecturesTab } from './components/GuestLecturesTab';
import { IndustryVisitsTab } from './components/IndustryVisitsTab';

import { ReportsTab } from './components/ReportsTab';
import { PlacementsTab } from './components/PlacementsTab';
import { InternshipsTab } from './components/InternshipsTab';
import { SkillMappingTab } from './components/SkillMappingTab';

import { useLanguage } from '../../context/LanguageContext';
import { LanguageSelectorPill } from '../../components/common/LanguageSelectorPill';

export type ActiveSlide = 
  | 'dashboard'
  | 'students'
  | 'student-details'
  | 'academic-records'
  | 'attendance'
  | 'department-year'
  | 'student-portfolios'
  | 'faculty'
  | 'faculty-details'
  | 'teaching-workload'
  | 'faculty-development'
  | 'research-publications'
  | 'industry-engagement'
  | 'industry' 
  | 'industry-partners'
  | 'mous-agreements'
  | 'industry-projects'
  | 'guest-lectures'
  | 'industry-visits'
  | 'industry-internships'
  | 'reports'
  | 'placement-analysis'
  | 'internship-analysis'
  | 'skill-development'
  | 'reports-c1'
  | 'reports-c2'
  | 'reports-c3'
  | 'reports-c4'
  | 'reports-metrics';

interface NavItem {
  id: 'dashboard' | 'students' | 'faculty' | 'industry' | 'reports';
  label: string;
  icon: React.ElementType;
}

interface InstitutionDashboardProps {
  onLogout?: () => void;
}

export const InstitutionDashboard: React.FC<InstitutionDashboardProps> = ({ onLogout }) => {
  const { t } = useLanguage();

  const navItems: NavItem[] = [
    { id: 'dashboard', label: t('dashboard', 'Dashboard'), icon: LayoutDashboard },
    { id: 'students', label: t('students_analytics', 'Students'), icon: Users },
    { id: 'faculty', label: t('faculty_records', 'Faculty'), icon: UserCheck },
    { id: 'industry', label: t('industry_collaboration', 'Industry Collaboration'), icon: Handshake },
    { id: 'reports', label: t('naac_reports', 'Reports'), icon: FileText },
  ];

  const [activeSlide, setActiveSlide] = useState<ActiveSlide>('dashboard');
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<string>('2025 - 2026');

  // Toggle directly to default sub-tab of the chosen section
  const handleSidebarClick = (id: NavItem['id']) => {
    if (id === 'dashboard') {
      if (
        activeSlide !== 'dashboard' && 
        activeSlide !== 'placement-analysis' && 
        activeSlide !== 'internship-analysis' && 
        activeSlide !== 'skill-development'
      ) {
        setActiveSlide('dashboard');
      }
    } else if (id === 'students') {
      if (
        activeSlide !== 'students' &&
        activeSlide !== 'student-details' &&
        activeSlide !== 'academic-records' &&
        activeSlide !== 'attendance' &&
        activeSlide !== 'department-year' &&
        activeSlide !== 'student-portfolios'
      ) {
        setActiveSlide('student-details');
      }
    } else if (id === 'faculty') {
      if (
        activeSlide !== 'faculty' &&
        activeSlide !== 'faculty-details' &&
        activeSlide !== 'teaching-workload' &&
        activeSlide !== 'faculty-development' &&
        activeSlide !== 'research-publications' &&
        activeSlide !== 'industry-engagement'
      ) {
        setActiveSlide('faculty-details');
      }
    } else if (id === 'industry') {
      if (
        activeSlide !== 'industry' &&
        activeSlide !== 'industry-partners' &&
        activeSlide !== 'mous-agreements' &&
        activeSlide !== 'industry-projects' &&
        activeSlide !== 'guest-lectures' &&
        activeSlide !== 'industry-visits' &&
        activeSlide !== 'industry-internships'
      ) {
        setActiveSlide('industry-partners');
      }
    } else if (id === 'reports') {
      if (
        activeSlide !== 'reports' &&
        activeSlide !== 'reports-c1' &&
        activeSlide !== 'reports-c2' &&
        activeSlide !== 'reports-c3' &&
        activeSlide !== 'reports-c4' &&
        activeSlide !== 'reports-metrics'
      ) {
        setActiveSlide('reports-c1');
      }
    } else {
      setActiveSlide(id as ActiveSlide);
    }
  };

  const handleSubmenuSelect = (slide: ActiveSlide) => {
    setActiveSlide(slide);
  };

  // Derived Active States for Main Nav Items
  const isDashboardActive = 
    activeSlide === 'dashboard' || 
    activeSlide === 'placement-analysis' || 
    activeSlide === 'internship-analysis' || 
    activeSlide === 'skill-development';

  const isStudentsActive = 
    activeSlide === 'students' || 
    activeSlide === 'student-details' || 
    activeSlide === 'academic-records' || 
    activeSlide === 'attendance' || 
    activeSlide === 'department-year' || 
    activeSlide === 'student-portfolios';

  const isIndustryActive = 
    activeSlide === 'industry' || 
    activeSlide === 'industry-partners' ||
    activeSlide === 'mous-agreements' ||
    activeSlide === 'industry-projects' ||
    activeSlide === 'guest-lectures' ||
    activeSlide === 'industry-visits' ||
    activeSlide === 'industry-internships';

  const isFacultyActive = 
    activeSlide === 'faculty' || 
    activeSlide === 'faculty-details' || 
    activeSlide === 'teaching-workload' || 
    activeSlide === 'faculty-development' || 
    activeSlide === 'research-publications' || 
    activeSlide === 'industry-engagement';

  const isReportsActive = 
    activeSlide === 'reports' || 
    activeSlide === 'reports-c1' || 
    activeSlide === 'reports-c2' || 
    activeSlide === 'reports-c3' || 
    activeSlide === 'reports-c4' || 
    activeSlide === 'reports-metrics';

  // Render Main Content according to Active Slide
  // ── Render Top Horizontal Sub-Navigation ──
  const renderSubNavigation = () => {
    // Helper to render a tab
    const renderTab = (slideId: ActiveSlide, label: string) => {
      const isActive = activeSlide === slideId;
      return (
        <button
          key={slideId}
          onClick={() => handleSubmenuSelect(slideId)}
          className={`px-4 py-3 text-sm transition-all whitespace-nowrap cursor-pointer ${
            isActive 
              ? 'border-b-2 border-slate-950 text-slate-950 font-bold' 
              : 'border-b-2 border-transparent text-slate-500 hover:text-slate-900 font-medium hover:border-slate-300'
          }`}
        >
          {label}
        </button>
      );
    };

    if (isStudentsActive) {
      return (
        <div className="flex items-center gap-2 px-6 border-b border-slate-200 overflow-x-auto bg-white pt-2 z-10 shrink-0 shadow-xs">
          {renderTab('student-details', 'Student Details')}
          {renderTab('academic-records', 'Academic Records')}
          {renderTab('attendance', 'Attendance')}
          {renderTab('department-year', 'Department & Year')}
          {renderTab('student-portfolios', 'Student Portfolios')}
        </div>
      );
    }
    
    if (isFacultyActive) {
      return (
        <div className="flex items-center gap-2 px-6 border-b border-slate-200 overflow-x-auto bg-white pt-2 z-10 shrink-0 shadow-xs">
          {renderTab('faculty-details', 'Faculty Details')}
          {renderTab('teaching-workload', 'Teaching & Workload')}
          {renderTab('faculty-development', 'Faculty Development')}
          {renderTab('research-publications', 'Research & Publications')}
          {renderTab('industry-engagement', 'Industry Engagement')}
        </div>
      );
    }

    if (isIndustryActive) {
      return (
        <div className="flex items-center gap-2 px-6 border-b border-slate-200 overflow-x-auto bg-white pt-2 z-10 shrink-0 shadow-xs">
          {renderTab('industry-partners', 'Industry Partners')}
          {renderTab('mous-agreements', 'MoUs & Agreements')}
          {renderTab('industry-projects', 'Industry Projects')}
          {renderTab('guest-lectures', 'Guest Lectures & Workshops')}
          {renderTab('industry-visits', 'Industry Visits')}
          {renderTab('industry-internships', 'Industry Internships')}
        </div>
      );
    }

    if (isReportsActive) {
      return (
        <div className="flex items-center gap-2 px-6 border-b border-slate-200 overflow-x-auto bg-white pt-2 z-10 shrink-0 shadow-xs">
          {renderTab('reports-c1', 'Criterion I: Curricular Aspects')}
          {renderTab('reports-c2', 'Criterion II: Teaching-Learning')}
          {renderTab('reports-c3', 'Criterion III: Research')}
          {renderTab('reports-c4', 'Criterion IV: Infrastructure')}
          {renderTab('reports-metrics', 'Metrics Dashboard')}
        </div>
      );
    }

    // Dashboard has no sub-nav
    return null;
  };

  const renderMainContent = () => {
    switch (activeSlide) {
      case 'dashboard':
        return (
          <DashboardTab 
            selectedYear={selectedYear} 
            onYearChange={setSelectedYear}
            onNavigateSection={(sec) => handleSubmenuSelect(sec as ActiveSlide)} 
          />
        );
      
      // Students Floating Submenu Views
      case 'students':
      case 'student-details':
        return <StudentDetailsTab />;
      case 'academic-records':
        return <AcademicRecordsTab />;
      case 'attendance':
        return <AttendanceTab />;
      case 'department-year':
        return <DepartmentYearTab />;
      case 'student-portfolios':
        return <StudentPortfoliosTab />;

      // Faculty Floating Submenu Views
      case 'faculty':
      case 'faculty-details':
        return <FacultyDetailsTab />;
      case 'teaching-workload':
        return <TeachingWorkloadTab />;
      case 'faculty-development':
        return <FacultyDevelopmentTab />;
      case 'research-publications':
        return <ResearchPublicationsTab />;
      case 'industry-engagement':
        return <IndustryEngagementTab />;

      // Industry Collaboration Submenu Views - Each opens its own dedicated single page
      case 'industry':
      case 'industry-partners':
        return <IndustryPartnersTab />;
      case 'mous-agreements':
        return <MoUsAgreementsTab />;
      case 'industry-projects':
        return <IndustryProjectsTab />;
      case 'guest-lectures':
        return <GuestLecturesTab />;
      case 'industry-visits':
        return <IndustryVisitsTab />;
      case 'industry-internships':
        return <InternshipsTab />;

      case 'reports':
      case 'reports-c1':
      case 'reports-c2':
      case 'reports-c3':
      case 'reports-c4':
      case 'reports-metrics':
        return <ReportsTab />;

      case 'placement-analysis':
        return <PlacementsTab />;
      case 'internship-analysis':
        return <InternshipsTab />;
      case 'skill-development':
        return <SkillMappingTab />;

      default:
        return (
          <DashboardTab 
            selectedYear={selectedYear} 
            onYearChange={setSelectedYear}
            onNavigateSection={(sec) => handleSubmenuSelect(sec as ActiveSlide)} 
          />
        );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#f8fafc] font-sans antialiased overflow-hidden select-none">
      
      {/* 1. TOP HEADER BRANDING BAR */}
      <header className="h-16 bg-white text-slate-900 flex items-center justify-between px-6 shrink-0 z-30 border-b border-slate-200 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveSlide('dashboard')}>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-950 font-['Outfit'] leading-none">
                  Capfly
                </span>
                <span className="text-slate-300 font-light text-sm">|</span>
                <span className="text-xs sm:text-sm font-bold text-blue-600">
                  {t('institution_portal', 'Institution Portal')}
                </span>
                <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">v2.0</span>
              </div>
              <p className="text-[10px] text-slate-400 font-semibold tracking-wide mt-0.5">Connect &bull; Learn &bull; Collaborate</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <LanguageSelectorPill />

          <button className="relative p-2 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer rounded-lg hover:bg-slate-100">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
          </button>

          <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-blue-600 font-bold text-xs flex items-center justify-center text-white ring-2 ring-blue-100">
              CI
            </div>
            <span className="text-xs font-bold text-slate-800 hidden sm:block">City Institution</span>
          </div>

          <button 
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl px-3.5 py-2 transition-colors shadow-xs cursor-pointer ml-1 sm:ml-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t('logout', 'Logout')}</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN LAYOUT: SIDEBAR + CONTENT */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-full md:w-24 lg:w-26 bg-white border-r border-[#E6ECF5] shrink-0 p-2.5 sm:p-3 flex flex-row md:flex-col items-center select-none overflow-x-auto md:overflow-x-visible">
          <nav className="flex flex-row md:flex-col items-center gap-2.5 sm:gap-3 w-full justify-center md:justify-start">
            {navItems.map((item) => {
              const isDashboardItem = item.id === 'dashboard';
              const isStudentsItem = item.id === 'students';
              const isFacultyItem = item.id === 'faculty';
              const isIndustryItem = item.id === 'industry';

              const isActive = isDashboardItem 
                ? isDashboardActive
                : isStudentsItem 
                  ? isStudentsActive
                  : isFacultyItem
                    ? isFacultyActive
                    : isIndustryItem
                      ? isIndustryActive
                      : item.id === 'reports'
                        ? isReportsActive
                        : activeSlide === item.id;

              return (
                <button
                  key={item.id}
                  data-sidebar-id={item.id}
                  onClick={() => handleSidebarClick(item.id)}
                  title={item.label}
                  className={`w-[74px] h-[74px] sm:w-[78px] sm:h-[78px] rounded-[20px] p-2 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-150 transform active:scale-95 shrink-0 ${
                    isActive
                      ? 'bg-violet-600 text-white shadow-[0_3.5px_0_#5b21b6] hover:bg-violet-700 translate-y-[-1px]'
                      : 'bg-white text-[#2C3E50] border-[2.5px] border-[#DFE7F3] shadow-[0_3px_0_#DFE7F3] hover:border-[#CBD8EA] hover:bg-slate-50/80'
                  }`}
                >
                  <div className="flex items-center justify-center mb-1">
                    <item.icon className={`w-[22px] h-[22px] ${isActive ? 'text-white' : 'text-[#33465E]'}`} />
                  </div>
                  <span className={`text-[10px] sm:text-[11px] font-black tracking-tight leading-none truncate max-w-full px-0.5 ${
                    isActive ? 'text-white' : 'text-[#24354A]'
                  }`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* CONTENT VIEW AREA */}
        <div className="flex-1 flex flex-col bg-white">
          {renderSubNavigation()}
          <main className="flex-1 overflow-y-auto p-6 bg-[#f8fafc]">
            <div className="max-w-7xl mx-auto">
              {renderMainContent()}
            </div>
          </main>
        </div>
      </div>


      {/* LOGOUT CONFIRMATION MODAL */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto ring-8 ring-red-50/50">
              <LogOut className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Confirm Logout</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Are you sure you want to end your current session and exit the CAPFLY Institution Portal?
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button 
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowLogoutModal(false);
                  if (onLogout) {
                    onLogout();
                  } else {
                    window.location.href = '/';
                  }
                }}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-colors cursor-pointer shadow-sm"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER BAR */}
      <footer className="h-9 bg-white border-t border-slate-200/80 px-6 flex items-center justify-between text-[11px] text-slate-400 font-semibold shrink-0 z-10">
        <div>&copy; 2025 CAPFLY. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-slate-600 transition-colors">Privacy</a>
          <span>&bull;</span>
          <a href="#" className="hover:text-slate-600 transition-colors">Terms</a>
          <span>&bull;</span>
          <a href="#" className="hover:text-slate-600 transition-colors">Help</a>
        </div>
      </footer>
    </div>
  );
};
