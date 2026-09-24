import React, { useState } from 'react';
import { LogOut, Search, X, GraduationCap, BookOpen, BriefcaseBusiness, Landmark } from 'lucide-react';
import { CapflyLogoIcon } from '../landing/LandingIllustrations';

export type PortalType = 'student' | 'industry' | 'academia' | 'institution';

interface NavbarProps {
  activePortal: PortalType | null;
  onSelectPortal: (portal: PortalType | null) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePortal, onSelectPortal }) => {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const portalOptions = [
    { id: 'student' as PortalType, title: 'Student Portal', icon: GraduationCap, color: 'text-blue-600 bg-blue-50' },
    { id: 'academia' as PortalType, title: 'Academia Portal', icon: BookOpen, color: 'text-purple-600 bg-purple-50' },
    { id: 'industry' as PortalType, title: 'Industry Portal', icon: BriefcaseBusiness, color: 'text-emerald-600 bg-emerald-50' },
    { id: 'institution' as PortalType, title: 'Institution Portal', icon: Landmark, color: 'text-orange-600 bg-orange-50' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 text-slate-900 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] w-full max-w-[1400px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          
          {/* Logo */}
          <button 
            type="button" 
            onClick={() => onSelectPortal(null)} 
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          >

            <span className="text-[22px] font-extrabold tracking-tight text-slate-950">
              Capfly
            </span>
          </button>

          {/* Center Navigation for Landing vs Portal View */}
          {activePortal === null ? (
            <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600" aria-label="Primary navigation">
              <a href="#workspaces" className="hover:text-[#0066FF] transition">Platform</a>
              <a href="#how-it-works" className="hover:text-[#0066FF] transition">How It Works</a>
              <a href="#workspaces" className="hover:text-[#0066FF] transition">For Institutions</a>
              <a href="#about" className="hover:text-[#0066FF] transition">About</a>
            </nav>
          ) : (
            <nav className="hidden items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1 md:flex" aria-label="Portal navigation">
              <button 
                type="button" 
                onClick={() => onSelectPortal(null)} 
                className="rounded-full px-4 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition"
              >
                Overview
              </button>
              <button 
                type="button" 
                onClick={() => onSelectPortal('student')} 
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${activePortal === 'student' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Student
              </button>
              <button 
                type="button" 
                onClick={() => onSelectPortal('academia')} 
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${activePortal === 'academia' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Academia
              </button>
              <button 
                type="button" 
                onClick={() => onSelectPortal('industry')} 
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${activePortal === 'industry' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Industry
              </button>
              <button 
                type="button" 
                onClick={() => onSelectPortal('institution')} 
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${activePortal === 'institution' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Institution
              </button>
            </nav>
          )}

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {activePortal === null ? (
              <>
                <button 
                  type="button" 
                  onClick={() => setIsSignInModalOpen(true)}
                  className="rounded-xl border border-slate-200 hover:border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 shadow-2xs cursor-pointer"
                >
                  Sign In
                </button>
                <button 
                  type="button" 
                  onClick={() => onSelectPortal('student')} 
                  className="rounded-xl bg-[#0066FF] hover:bg-blue-700 active:bg-blue-800 px-5 py-2 text-sm font-semibold text-white shadow-sm transition transform hover:-translate-y-0.5 cursor-pointer"
                >
                  Get Started
                </button>
              </>
            ) : (
              <button 
                type="button" 
                onClick={() => onSelectPortal(null)} 
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700 cursor-pointer"
              >
                <LogOut className="h-4 w-4" /> 
                <span className="hidden sm:inline">Exit workspace</span>
                <span className="sm:hidden">Exit</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Sign In Portal Picker Modal */}
      {isSignInModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">

                <h3 className="font-extrabold text-base text-slate-900">Sign in to Capfly</h3>
              </div>
              <button 
                type="button" 
                onClick={() => setIsSignInModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 mt-3 mb-5 font-medium">
              Select your workspace role to access your dedicated portal:
            </p>

            <div className="space-y-2.5">
              {portalOptions.map(({ id, title, icon: Icon, color }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setIsSignInModalOpen(false);
                    onSelectPortal(id);
                  }}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-200/90 hover:border-blue-400 hover:bg-blue-50/50 transition text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition">
                      {title}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-slate-400 group-hover:text-blue-600 transition">
                    Enter →
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
