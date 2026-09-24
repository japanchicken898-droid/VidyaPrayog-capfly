import React, { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageSelectorModal } from './LanguageSelectorModal';

interface LanguageSelectorPillProps {
  variant?: 'light' | 'dark' | 'glass';
  className?: string;
}

export const LanguageSelectorPill: React.FC<LanguageSelectorPillProps> = ({
  variant = 'light',
  className = ''
}) => {
  const { currentLangInfo } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  let styleClasses = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-blue-400';
  if (variant === 'dark') {
    styleClasses = 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700';
  } else if (variant === 'glass') {
    styleClasses = 'bg-white/10 border-white/20 text-white hover:bg-white/20';
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-2xs cursor-pointer notranslate ${styleClasses} ${className}`}
        translate="no"
        title="Languages"
      >
        <Globe className="w-3.5 h-3.5 text-blue-500" />
        <span className="font-bold notranslate" translate="no">
          {currentLangInfo.name}
          {currentLangInfo.code !== 'en' && ` (${currentLangInfo.nativeName})`}
        </span>
        <ChevronDown className="w-3 h-3 text-slate-400" />
      </button>

      <LanguageSelectorModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};
