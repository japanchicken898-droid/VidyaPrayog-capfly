import React from 'react';
import { LogOut, Building2 } from 'lucide-react';
import { NotificationCenter, type NotificationItem } from './NotificationCenter';

import { useLanguage } from '../../../context/LanguageContext';
import { LanguageSelectorPill } from '../../../components/common/LanguageSelectorPill';

interface IndustryHeaderProps {
  onLogout: () => void;
  currentTab: string;
  notifications?: NotificationItem[];
  onAcceptNotification?: (id: string, name: string) => void;
  onMarkAllNotificationsRead?: () => void;
}

export const IndustryHeader: React.FC<IndustryHeaderProps> = ({ 
  onLogout, 
  currentTab,
  notifications = [],
  onAcceptNotification = () => {},
  onMarkAllNotificationsRead = () => {}
}) => {
  const { t } = useLanguage();

  const getBreadcrumb = () => {
    switch (currentTab) {
      case 'dashboard':
        return `${t('dashboard', 'Dashboard')} > ${t('overview', 'Dashboard Overview')}`;
      case 'opportunities':
        return `${t('opportunities', 'Opportunities')} > Post Opportunities`;
      case 'mentorship':
        return `${t('mentorship_programs', 'Mentorship')} > Mentorship Programs`;
      case 'candidate-matching':
        return `${t('talent_matching', 'Recruitment')} > Candidate Matching`;
      default:
        return `${t('dashboard', 'Dashboard')} > ${t('overview', 'Dashboard Overview')}`;
    }
  };

  return (
    <div className="w-full flex flex-col shrink-0">
      {/* Top Header Bar */}
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
                {t('industry_portal', 'Industry Portal')}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-0.5">
              Enterprise Talent &amp; Innovation Network
            </span>
          </div>
        </div>

        {/* Right Controls: Language Selector & Red Logout Button */}
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

      {/* Sub-Header Bar: Light Blue Tint */}
      <div className="w-full bg-[#E0F2FE] border-b border-[#BAE6FD] px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
          <span className="text-blue-700 font-bold">Portal</span>
          <span className="text-slate-400">/</span>
          <span className="text-slate-800">{getBreadcrumb()}</span>
        </div>

        {/* Right Area: Live Workspace Session & Prominent Notification Bell */}
        <div className="flex items-center gap-3">
          <div className="text-xs font-semibold text-slate-700 hidden sm:flex items-center gap-1.5 bg-white/70 px-3 py-1.5 rounded-xl border border-[#BAE6FD] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Live Workspace Session</span>
          </div>

          {/* Prominent Header Notification Bell Container */}
          <NotificationCenter
            notifications={notifications}
            onAccept={onAcceptNotification}
            onMarkAllRead={onMarkAllNotificationsRead}
          />
        </div>
      </div>
    </div>
  );
};
