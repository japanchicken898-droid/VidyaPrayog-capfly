import React, { useState } from 'react';
import { Globe, X, Check, Search, Sparkles } from 'lucide-react';
import { useLanguage, TOP_10_INDIAN_LANGUAGES, type SupportedLanguage, type LanguageInfo } from '../../context/LanguageContext';

interface LanguageSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LanguageSelectorModal: React.FC<LanguageSelectorModalProps> = ({ isOpen, onClose }) => {
  const { currentLanguage, setLanguage } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredLanguages = TOP_10_INDIAN_LANGUAGES.filter(
    (lang) =>
      lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lang.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (code: SupportedLanguage) => {
    setLanguage(code);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200 notranslate"
      translate="no"
    >
      {/* Modal Card - Marked with notranslate and translate="no" so it strictly remains in English */}
      <div 
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col max-h-[90vh] notranslate"
        translate="no"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header (always in English) */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-50/50 via-purple-50/30 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 notranslate" translate="no">
                  Languages
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-700 uppercase tracking-wider flex items-center gap-1 notranslate" translate="no">
                  <Sparkles className="w-2.5 h-2.5" />
                  Top 10 Indian Languages
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5 notranslate" translate="no">
                Select your preferred language for all portals
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input (always in English) */}
        <div className="px-6 pt-4 pb-2 bg-white">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by language (Hindi, Tamil...), script, or region..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 placeholder:text-slate-400 notranslate"
              translate="no"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 notranslate"
                translate="no"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Language Grid - Names in English with Native Script */}
        <div className="px-6 py-4 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-2.5 notranslate" translate="no">
          {filteredLanguages.map((lang: LanguageInfo) => {
            const isSelected = currentLanguage === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelect(lang.code)}
                className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer notranslate ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20 shadow-xs'
                    : 'border-slate-200/80 bg-white hover:border-blue-300 hover:bg-slate-50/70 hover:shadow-2xs'
                }`}
                translate="no"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {lang.code.toUpperCase()}
                  </div>
                  <div>
                    {/* Primary English name first, native script alongside */}
                    <div className="flex items-center gap-1.5 notranslate" translate="no">
                      <span className="font-extrabold text-sm text-slate-900">
                        {lang.name}
                      </span>
                      {lang.code !== 'en' && (
                        <span className="text-xs text-slate-600 font-semibold bg-slate-100 px-1.5 py-0.5 rounded">
                          {lang.nativeName}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 notranslate" translate="no">
                      <span className="text-[10px] text-slate-400 font-medium">
                        {lang.region}
                      </span>
                      <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded">
                        {lang.speakers}
                      </span>
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer (always in English) */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between text-xs text-slate-500 font-medium notranslate" translate="no">
          <div className="flex items-center gap-1.5 notranslate" translate="no">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
            <span className="notranslate" translate="no">Changes language across all 4 portals &amp; landing page</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition notranslate cursor-pointer"
            translate="no"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
