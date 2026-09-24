import React from 'react';
import { LayoutDashboard, Briefcase, Users, UserCheck, Handshake } from 'lucide-react';

export type IndustryTabType = 'dashboard' | 'opportunities' | 'mentorship' | 'candidate-matching' | 'collaboration';

interface IndustrySidebarProps {
  currentTab: IndustryTabType;
  onSelectTab: (tab: IndustryTabType) => void;
}

export const IndustrySidebar: React.FC<IndustrySidebarProps> = ({ currentTab, onSelectTab }) => {
  const menuItems: {
    id: IndustryTabType;
    label: string;
    icon: React.ComponentType<{ className?: string; size?: number }>;
  }[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'opportunities',
      label: 'Opportunities',
      icon: Briefcase,
    },
    {
      id: 'mentorship',
      label: 'Mentorship',
      icon: Users,
    },
    {
      id: 'candidate-matching',
      label: 'Candidates',
      icon: UserCheck,
    },
    {
      id: 'collaboration',
      label: 'Collaboration',
      icon: Handshake,
    },
  ];

  return (
    <aside className="w-full md:w-24 lg:w-26 bg-white border-r border-[#E6ECF5] shrink-0 p-2.5 sm:p-3 flex flex-row md:flex-col items-center select-none overflow-x-auto md:overflow-x-visible">
      <nav className="flex flex-row md:flex-col items-center gap-2.5 sm:gap-3 w-full justify-center md:justify-start">
        {menuItems.map((item) => {
          const { icon: Icon, id, label } = item;
          const isActive = currentTab === id;

          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelectTab(id)}
              className={`w-[74px] h-[74px] sm:w-[78px] sm:h-[78px] rounded-[20px] p-2 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-150 transform active:scale-95 shrink-0 ${
                isActive
                  ? 'bg-violet-600 text-white shadow-[0_3.5px_0_#5b21b6] hover:bg-violet-700 translate-y-[-1px]'
                  : 'bg-white text-[#2C3E50] border-[2.5px] border-[#DFE7F3] shadow-[0_3px_0_#DFE7F3] hover:border-[#CBD8EA] hover:bg-slate-50/80'
              }`}
            >
              <div className="flex items-center justify-center mb-1">
                <Icon size={22} className={isActive ? 'text-white' : 'text-[#33465E]'} />
              </div>
              <span className={`text-[10px] sm:text-[11px] font-black tracking-tight leading-none truncate max-w-full px-0.5 ${
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

export default IndustrySidebar;
