import React, { useState } from 'react';
import { 
  GraduationCap, 
  Users, 
  Building2, 
  Landmark, 
  ChevronRight, 
  Globe, 
  Sparkles,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Cpu,
  Layers,
  BookOpen
} from 'lucide-react';
import type { PortalType } from '../components/layout/Navbar';
import { CapflyLogoIcon } from '../components/landing/LandingIllustrations';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelectorModal } from '../components/common/LanguageSelectorModal';

interface LandingPageProps {
  activePortal?: PortalType | null;
  onSelectPortal?: (portal: PortalType) => void;
  onSelectView?: (view: 'landing' | 'help' | 'docs') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSelectPortal, onSelectView }) => {
  const { currentLanguage, currentLangInfo, t } = useLanguage();
  const [isLangModalOpen, setIsLangModalOpen] = useState<boolean>(false);
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);

  const handlePortalClick = (portal: PortalType) => {
    if (onSelectPortal) {
      onSelectPortal(portal);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6b3bd9] via-[#7d4de8] to-[#5926ca] text-slate-900 font-sans selection:bg-purple-200 selection:text-purple-900 flex flex-col justify-between">
      
      {/* Language Selector Modal */}
      <LanguageSelectorModal
        isOpen={isLangModalOpen}
        onClose={() => setIsLangModalOpen(false)}
      />

      {/* ==================== MAIN HERO VIEW (EXACT MATCH TO USER IMAGE) ==================== */}
      <main className="w-full flex-1 flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8">
        <div className="w-full max-w-[1400px] relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-[#7c4de8]">
          
          {/* ================= DESKTOP / TABLET WIDESCREEN CANVAS (>= 1024px) ================= */}
          <div className="hidden lg:block relative w-full" style={{ paddingBottom: '47.95%' }}>
            
            {/* Background Artwork matching exact provided image */}
            <img 
              src="/capfly_landing_original.jpg" 
              alt="CAPFLY - Bridging Faculty and Industry"
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            />

            {/* Subtle Gradient Highlights */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-purple-900/10 pointer-events-none" />

            {/* ================= INTERACTIVE LEFT WHITE CARD ================= */}
            {/* Positioned pixel-perfectly over the left card area of the image */}
            <div 
              className="absolute left-[2.4%] top-[6.4%] w-[26.2%] h-[87.2%] bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-4 xl:p-5 flex flex-col justify-between z-20"
              style={{
                boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.4)'
              }}
            >
              {/* Card Header: Brand, Title & Tagline */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">

                  <span className="text-2xl xl:text-[26px] font-black tracking-tight text-slate-950">
                    CAPFLY
                  </span>
                </div>
                <div className="text-[11px] xl:text-xs font-bold text-slate-600 tracking-wide">
                  {t('tagline', 'Learn • Connect • Grow')}
                </div>
                <p className="text-[10px] xl:text-[10.5px] font-semibold text-slate-500 mt-1 leading-snug px-1">
                  {t('subtitle', 'Bridging Faculty and Industry for a Brighter Future')}
                </p>
              </div>

              {/* 4 Login Buttons */}
              <div className="space-y-2 xl:space-y-2.5 my-1">
                {/* 1. Student Login */}
                <button
                  type="button"
                  onClick={() => handlePortalClick('student')}
                  className="w-full flex items-center justify-between p-2.5 xl:p-3 rounded-xl border border-slate-200/80 bg-white hover:border-blue-500 hover:bg-blue-50/40 hover:shadow-md transition-all cursor-pointer text-left group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 xl:w-9 xl:h-9 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <GraduationCap className="w-4 h-4 xl:w-5 xl:h-5" />
                    </div>
                    <div className="truncate">
                      <div className="font-bold text-xs xl:text-sm text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                        {t('student_login', 'Student Login')}
                      </div>
                      <div className="text-[9.5px] xl:text-[10px] font-medium text-slate-400 truncate">
                        {t('student_sub', 'Explore • Learn • Build Your Future')}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                </button>

                {/* 2. Academia Login */}
                <button
                  type="button"
                  onClick={() => handlePortalClick('academia')}
                  className="w-full flex items-center justify-between p-2.5 xl:p-3 rounded-xl border border-slate-200/80 bg-white hover:border-purple-500 hover:bg-purple-50/40 hover:shadow-md transition-all cursor-pointer text-left group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 xl:w-9 xl:h-9 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Users className="w-4 h-4 xl:w-5 xl:h-5" />
                    </div>
                    <div className="truncate">
                      <div className="font-bold text-xs xl:text-sm text-slate-900 group-hover:text-purple-600 transition-colors truncate">
                        {t('academia_login', 'Faculty Login')}
                      </div>
                      <div className="text-[9.5px] xl:text-[10px] font-medium text-slate-400 truncate">
                        {t('academia_sub', 'Teach • Research • Collaborate')}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                </button>

                {/* 3. Industry Login */}
                <button
                  type="button"
                  onClick={() => handlePortalClick('industry')}
                  className="w-full flex items-center justify-between p-2.5 xl:p-3 rounded-xl border border-slate-200/80 bg-white hover:border-emerald-500 hover:bg-emerald-50/40 hover:shadow-md transition-all cursor-pointer text-left group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 xl:w-9 xl:h-9 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Building2 className="w-4 h-4 xl:w-5 xl:h-5" />
                    </div>
                    <div className="truncate">
                      <div className="font-bold text-xs xl:text-sm text-slate-900 group-hover:text-emerald-600 transition-colors truncate">
                        {t('industry_login', 'Industry Login')}
                      </div>
                      <div className="text-[9.5px] xl:text-[10px] font-medium text-slate-400 truncate">
                        {t('industry_sub', 'Hire • Mentor • Innovate')}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                </button>

                {/* 4. Institution Login */}
                <button
                  type="button"
                  onClick={() => handlePortalClick('institution')}
                  className="w-full flex items-center justify-between p-2.5 xl:p-3 rounded-xl border border-slate-200/80 bg-white hover:border-amber-500 hover:bg-amber-50/40 hover:shadow-md transition-all cursor-pointer text-left group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 xl:w-9 xl:h-9 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Landmark className="w-4 h-4 xl:w-5 xl:h-5" />
                    </div>
                    <div className="truncate">
                      <div className="font-bold text-xs xl:text-sm text-slate-900 group-hover:text-amber-600 transition-colors truncate">
                        {t('institution_login', 'Institution Login')}
                      </div>
                      <div className="text-[9.5px] xl:text-[10px] font-medium text-slate-400 truncate">
                        {t('institution_sub', 'Analyze • Track • Empower')}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                </button>
              </div>

              {/* ================= LANGUAGES BUTTON (BELOW PORTAL BOX) ================= */}
              <div className="pt-2 border-t border-slate-100 notranslate" translate="no">
                <div className="text-center mb-1">
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 notranslate" translate="no">
                    Languages
                  </span>
                </div>
                
                {/* Interactive Languages Button */}
                <button
                  type="button"
                  onClick={() => setIsLangModalOpen(true)}
                  className="w-full flex items-center justify-between px-3 py-1.5 xl:py-2 rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-slate-100/90 hover:border-blue-400 transition-all cursor-pointer shadow-2xs group notranslate"
                  translate="no"
                >
                  <div className="flex items-center gap-2 notranslate" translate="no">
                    <Globe className="w-3.5 h-3.5 text-blue-600 group-hover:rotate-12 transition-transform" />
                    <span className="text-xs font-extrabold text-slate-800 notranslate" translate="no">
                      {currentLangInfo.name}
                      {currentLangInfo.code !== 'en' && ` (${currentLangInfo.nativeName})`}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-y-0.5 transition-all" />
                </button>

                {/* Powered By CAPFLY */}
                <div className="text-center mt-2">
                  <span className="text-[9.5px] font-semibold text-slate-400 tracking-wide">
                    {t('powered_by', 'Powered by CAPFLY')}
                  </span>
                </div>
              </div>
            </div>

            {/* ================= INTERACTIVE HOTSPOTS OVER ILLUSTRATION ================= */}
            {/* Student Hotspot (Top-Left Bubble & Wheel Quadrant) */}
            <div
              onClick={() => handlePortalClick('student')}
              onMouseEnter={() => setHoveredHotspot('student')}
              onMouseLeave={() => setHoveredHotspot(null)}
              className="absolute left-[30.2%] top-[27.5%] w-[10.5%] h-[15%] rounded-2xl cursor-pointer transition-all hover:ring-2 hover:ring-blue-400/80 hover:bg-blue-500/10 z-10"
              title="Click to open Student Portal"
            />

            {/* Faculty Hotspot (Top-Right Bubble & Wheel Quadrant) */}
            <div
              onClick={() => handlePortalClick('academia')}
              onMouseEnter={() => setHoveredHotspot('academia')}
              onMouseLeave={() => setHoveredHotspot(null)}
              className="absolute left-[67.5%] top-[27.5%] w-[10.5%] h-[15%] rounded-2xl cursor-pointer transition-all hover:ring-2 hover:ring-purple-400/80 hover:bg-purple-500/10 z-10"
              title="Click to open Faculty Portal"
            />

            {/* Industry Hotspot (Center-Right Bubble & Wheel Quadrant) */}
            <div
              onClick={() => handlePortalClick('industry')}
              onMouseEnter={() => setHoveredHotspot('industry')}
              onMouseLeave={() => setHoveredHotspot(null)}
              className="absolute left-[78.5%] top-[27.5%] w-[10.5%] h-[15%] rounded-2xl cursor-pointer transition-all hover:ring-2 hover:ring-emerald-400/80 hover:bg-emerald-500/10 z-10"
              title="Click to open Industry Portal"
            />

            {/* Institution Hotspot (Far-Right Bubble & Wheel Quadrant) */}
            <div
              onClick={() => handlePortalClick('institution')}
              onMouseEnter={() => setHoveredHotspot('institution')}
              onMouseLeave={() => setHoveredHotspot(null)}
              className="absolute left-[89%] top-[33%] w-[10%] h-[15%] rounded-2xl cursor-pointer transition-all hover:ring-2 hover:ring-amber-400/80 hover:bg-amber-500/10 z-10"
              title="Click to open Institution Portal"
            />
          </div>

          {/* ================= MOBILE & TABLET RESPONSIVE LAYOUT (< 1024px) ================= */}
          <div className="lg:hidden flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-[#764CE8] to-[#6035db]">
            
            {/* Interactive Card */}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-5 sm:p-6 flex flex-col justify-between">
              {/* Brand & Subtitle */}
              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-2 mb-1">

                  <span className="text-2xl font-black tracking-tight text-slate-950">
                    CAPFLY
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-600 tracking-wide">
                  {t('tagline', 'Learn • Connect • Grow')}
                </div>
                <p className="text-xs font-semibold text-slate-500 mt-1 leading-snug">
                  {t('subtitle', 'Bridging Faculty and Industry for a Brighter Future')}
                </p>
              </div>

              {/* 4 Login Buttons */}
              <div className="space-y-3 mb-4">
                <button
                  type="button"
                  onClick={() => handlePortalClick('student')}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-500 hover:bg-blue-50/40 hover:shadow-md transition-all cursor-pointer text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-900 group-hover:text-blue-600">
                        {t('student_login', 'Student Login')}
                      </div>
                      <div className="text-[11px] font-medium text-slate-500">
                        {t('student_sub', 'Explore • Learn • Build Your Future')}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                </button>

                <button
                  type="button"
                  onClick={() => handlePortalClick('academia')}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:border-purple-500 hover:bg-purple-50/40 hover:shadow-md transition-all cursor-pointer text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-900 group-hover:text-purple-600">
                        {t('academia_login', 'Faculty Login')}
                      </div>
                      <div className="text-[11px] font-medium text-slate-500">
                        {t('academia_sub', 'Teach • Research • Collaborate')}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600" />
                </button>

                <button
                  type="button"
                  onClick={() => handlePortalClick('industry')}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:border-emerald-500 hover:bg-emerald-50/40 hover:shadow-md transition-all cursor-pointer text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-900 group-hover:text-emerald-600">
                        {t('industry_login', 'Industry Login')}
                      </div>
                      <div className="text-[11px] font-medium text-slate-500">
                        {t('industry_sub', 'Hire • Mentor • Innovate')}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                </button>

                <button
                  type="button"
                  onClick={() => handlePortalClick('institution')}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:border-amber-500 hover:bg-amber-50/40 hover:shadow-md transition-all cursor-pointer text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0">
                      <Landmark className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-900 group-hover:text-amber-600">
                        {t('institution_login', 'Institution Login')}
                      </div>
                      <div className="text-[11px] font-medium text-slate-500">
                        {t('institution_sub', 'Analyze • Track • Empower')}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
                </button>
              </div>

              {/* Languages Button */}
              <div className="pt-3 border-t border-slate-100 notranslate" translate="no">
                <div className="text-center mb-1.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 notranslate" translate="no">
                    Languages
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsLangModalOpen(true)}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-blue-400 transition-all cursor-pointer notranslate"
                  translate="no"
                >
                  <div className="flex items-center gap-2.5 notranslate" translate="no">
                    <Globe className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-bold text-slate-800 notranslate" translate="no">
                      {currentLangInfo.name}
                      {currentLangInfo.code !== 'en' && ` (${currentLangInfo.nativeName})`}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                <div className="text-center mt-3">
                  <span className="text-[11px] font-semibold text-slate-400">
                    {t('powered_by', 'Powered by CAPFLY')}
                  </span>
                </div>
              </div>
            </div>

            {/* Preview Illustration below on Mobile */}
            <div className="w-full max-w-md mt-6 rounded-2xl overflow-hidden shadow-xl border border-white/20">
              <img 
                src="/capfly_landing_original.jpg" 
                alt="CAPFLY Overview Illustration" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

        </div>
      </main>

      {/* ==================== FOOTER NAV ==================== */}
      <footer className="w-full max-w-[1400px] mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-white/80 font-medium gap-3">
        <div className="flex items-center gap-3">
          <span className="font-bold text-white">CAPFLY Platform</span>
          <span>&bull;</span>
          <span>{t('slogan_footer', 'Learn | Connect | Collaborate | Grow')}</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setIsLangModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition cursor-pointer border border-white/20"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{currentLangInfo.nativeName}</span>
            <span className="text-[10px] opacity-75">({t('languages', 'Languages')})</span>
          </button>
          
          {onSelectView && (
            <button
              type="button"
              onClick={() => onSelectView('help')}
              className="hover:text-white transition cursor-pointer"
            >
              {t('help', 'Help Center')}
            </button>
          )}
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
