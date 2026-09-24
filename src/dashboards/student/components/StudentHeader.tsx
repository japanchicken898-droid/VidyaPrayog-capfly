import React from 'react';
import { LogOut } from 'lucide-react';
import { CapflyLogoIcon } from '../../../components/landing/LandingIllustrations';
import { useLanguage } from '../../../context/LanguageContext';
import { LanguageSelectorPill } from '../../../components/common/LanguageSelectorPill';

interface StudentHeaderProps {
  onLogout: () => void;
  currentTab: string;
}

export const StudentHeader: React.FC<StudentHeaderProps> = ({ onLogout, currentTab }) => {
  const { t } = useLanguage();

  const getBreadcrumb = () => {
    switch (currentTab) {
      case 'dashboard':
        return `${t('dashboard', 'Dashboard')} > ${t('overview', 'Overview')}`;
      case 'skills':
        return `${t('skill_assessments', 'Skills')} > My Skills`;
      case 'opportunities':
        return `${t('opportunities', 'Opportunities')} > Job Board`;
      case 'portfolio':
        return `${t('digital_portfolio', 'Digital Portfolio')} > My Profile`;
      case 'learn':
        return `${t('learn_hub', 'Learn Hub')} > Courses`;
      default:
        return `${t('dashboard', 'Dashboard')} > ${t('overview', 'Overview')}`;
    }
  };

  return (
    <div className="w-full flex flex-col shrink-0">
      {/* Top Header Bar: Clean White with Crisp Dark Branding */}
      <header className="w-full bg-white text-slate-900 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between border-b border-slate-200 shadow-xs">
        {/* Title & Brand */}
        <div className="flex items-center gap-3">

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-950 font-['Outfit'] leading-none">
                Capfly
              </span>
              <span className="text-slate-300 font-light text-sm">|</span>
              <span className="text-xs sm:text-sm font-bold text-blue-600">
                {t('student_portal', 'Student Portal')}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-0.5">
              Empowering Your Career Journey
            </span>
          </div>
        </div>

        {/* Right Controls: Language Selector Pill & Logout Button */}
        <div className="flex items-center gap-3 sm:gap-4">
          <LanguageSelectorPill />
          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-2 px-3.5 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-all duration-150 cursor-pointer"
            title="Log out and return to landing page"
          >
            <LogOut className="w-4 h-4" />
            <span>{t('logout', 'Logout')}</span>
          </button>
        </div>
      </header>

      {/* Sub-Header Bar */}
      <div className="w-full bg-[#E0F2FE] border-b border-[#BAE6FD] px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
          <span className="text-blue-600 font-bold">Portal</span>
          <span className="text-slate-400">/</span>
          <span className="text-slate-800">{getBreadcrumb()}</span>
        </div>
        <div className="text-[11px] font-medium text-slate-500 hidden sm:flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Online</span>
        </div>
      </div>
    </div>
  );
};

export default StudentHeader;
