import React from 'react';

export type StudentTabType = 'dashboard' | 'skills' | 'opportunities' | 'learn' | 'portfolio' | 'roadmaps' | 'collaboration';

interface StudentSidebarProps {
  currentTab: StudentTabType;
  onSelectTab: (tab: StudentTabType) => void;
}

// Custom icons matching the exact visual style in the reference image
const DashboardIcon: React.FC<{ className?: string; size?: number }> = ({ className = "w-6 h-6", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="5" y="5" width="9" height="9" rx="2.5" stroke="currentColor" strokeWidth="2.8" />
    <rect x="18" y="5" width="9" height="9" rx="2.5" stroke="currentColor" strokeWidth="2.8" />
    <rect x="5" y="18" width="9" height="9" rx="2.5" stroke="currentColor" strokeWidth="2.8" />
    <rect x="18" y="18" width="9" height="9" rx="2.5" stroke="currentColor" strokeWidth="2.8" />
  </svg>
);

const SkillsIcon: React.FC<{ className?: string; size?: number }> = ({ className = "w-6 h-6", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path 
      d="M16 4L6 8.5V15C6 22 10.5 27.5 16 29C21.5 27.5 26 22 26 15V8.5L16 4Z" 
      stroke="currentColor" 
      strokeWidth="2.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <path 
      d="M12 16L14.8 19L20 13" 
      stroke="currentColor" 
      strokeWidth="2.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </svg>
);

const OpportunitiesIcon: React.FC<{ className?: string; size?: number }> = ({ className = "w-6 h-6", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path 
      d="M11 9V6.5C11 5.4 11.9 4.5 13 4.5H19C20.1 4.5 21 5.4 21 6.5V9" 
      stroke="currentColor" 
      strokeWidth="2.8" 
      strokeLinecap="round" 
    />
    <rect x="5" y="9" width="22" height="18" rx="4.5" stroke="currentColor" strokeWidth="2.8" />
    <line x1="12" y1="9" x2="12" y2="27" stroke="currentColor" strokeWidth="2.5" />
    <line x1="20" y1="9" x2="20" y2="27" stroke="currentColor" strokeWidth="2.5" />
  </svg>
);

const LearnIcon: React.FC<{ className?: string; size?: number }> = ({ className = "w-6 h-6", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path 
      d="M16 6L3 13L16 20L29 13L16 6Z" 
      stroke="currentColor" 
      strokeWidth="2.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <path 
      d="M8 16V22.5C8 22.5 11.5 26 16 26C20.5 26 24 22.5 24 22.5V16" 
      stroke="currentColor" 
      strokeWidth="2.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <path 
      d="M26 14.5V23.5" 
      stroke="currentColor" 
      strokeWidth="2.8" 
      strokeLinecap="round" 
    />
  </svg>
);

const PortfolioIcon: React.FC<{ className?: string; size?: number }> = ({ className = "w-6 h-6", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path 
      d="M5 9C5 7.6 6.1 6.5 7.5 6.5H13L16 10H24.5C25.9 10 27 11.1 27 12.5V24.5C27 25.9 25.9 27 24.5 27H7.5C6.1 27 5 25.9 5 24.5V9Z" 
      stroke="currentColor" 
      strokeWidth="2.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <circle cx="14" cy="17" r="2.2" fill="currentColor" />
    <circle cx="20" cy="22" r="2.2" fill="currentColor" />
    <path d="M14 17V22H18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

const RoadmapsIcon: React.FC<{ className?: string; size?: number }> = ({ className = "w-6 h-6", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path 
      d="M7 25L7 11C7 9.5 8.5 8 10 8L22 8C23.5 8 25 9.5 25 11L25 21" 
      stroke="currentColor" 
      strokeWidth="2.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <circle cx="7" cy="27" r="2.5" stroke="currentColor" strokeWidth="2.8" />
    <circle cx="25" cy="24" r="2.5" stroke="currentColor" strokeWidth="2.8" />
    <path d="M12 12L15 15L20 10" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CollaborationIcon: React.FC<{ className?: string; size?: number }> = ({ className = "w-6 h-6", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M22 19V17C22 14.2386 19.7614 12 17 12H15C12.2386 12 10 14.2386 10 17V19" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="16" cy="7" r="3" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M27 26V24C27 21.6 25 19.5 22.5 19.1" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="23" cy="14" r="2.5" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 26V24C5 21.6 7 19.5 9.5 19.1" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="9" cy="14" r="2.5" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

import { useLanguage } from '../../../context/LanguageContext';

export const StudentSidebar: React.FC<StudentSidebarProps> = ({ currentTab, onSelectTab }) => {
  const { t } = useLanguage();

  const menuItems: {
    id: StudentTabType;
    label: string;
    Icon: React.FC<{ className?: string; size?: number }>;
  }[] = [
    {
      id: 'dashboard',
      label: t('dashboard', 'Dashboard'),
      Icon: DashboardIcon,
    },
    {
      id: 'skills',
      label: t('skill_assessments', 'Skills'),
      Icon: SkillsIcon,
    },
    {
      id: 'opportunities',
      label: t('opportunities', 'Opportunities'),
      Icon: OpportunitiesIcon,
    },
    {
      id: 'learn',
      label: t('learn_hub', 'Learn'),
      Icon: LearnIcon,
    },
    {
      id: 'portfolio',
      label: t('digital_portfolio', 'Portfolio'),
      Icon: PortfolioIcon,
    },
    {
      id: 'roadmaps',
      label: 'Roadmaps',
      Icon: RoadmapsIcon,
    },
    {
      id: 'collaboration',
      label: 'Collab Hub',
      Icon: CollaborationIcon,
    },
  ];

  return (
    <aside className="w-full md:w-26 lg:w-28 bg-white border-r border-[#E6ECF5] shrink-0 p-2.5 sm:p-3 flex flex-row md:flex-col items-center select-none overflow-x-auto md:overflow-x-visible">
      <nav className="flex flex-row md:flex-col items-center gap-1.5 sm:gap-2 w-full justify-center md:justify-start">
        {menuItems.map((item) => {
          const { Icon, id, label } = item;
          const isActive = currentTab === id;

          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelectTab(id)}
              className={`w-[70px] h-[70px] sm:w-[76px] sm:h-[76px] rounded-2xl p-1.5 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-150 transform active:scale-95 shrink-0 ${
                isActive
                  ? 'bg-violet-600 text-white shadow-[0_3px_0_#5b21b6] hover:bg-violet-700 translate-y-[-1px]'
                  : 'bg-white text-[#2C3E50] border-[2px] border-[#DFE7F3] shadow-[0_2.5px_0_#DFE7F3] hover:border-[#CBD8EA] hover:bg-slate-50/80'
              }`}
            >
              <div className="flex items-center justify-center mb-1">
                <Icon size={20} className={isActive ? 'text-white' : 'text-[#33465E]'} />
              </div>
              <span className={`text-[9.5px] sm:text-[10.5px] font-black tracking-tighter leading-none text-center block w-full px-0.5 ${
                isActive ? 'text-white' : 'text-[#24354A]'
              }`}>
                {label}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default StudentSidebar;
