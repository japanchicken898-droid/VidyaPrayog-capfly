import React, { useState, useEffect } from 'react';
import type { PortalType } from './components/layout/Navbar';
import { LandingPage } from './pages/LandingPage';
import { HelpCenter } from './pages/HelpCenter';
import { DocsPage } from './pages/DocsPage';
import { IndustryDashboard } from './dashboards/industry/IndustryDashboard';
import { StudentDashboard } from './dashboards/student/StudentDashboard';
import { AcademiaDashboard } from './dashboards/academia/AcademiaDashboard';
import { InstitutionDashboard } from './dashboards/institution/InstitutionDashboard';

import { LanguageProvider } from './context/LanguageContext';

const getInitialPortal = (): PortalType | null => {
  if (typeof window === 'undefined') return null;
  const path = window.location.pathname.toLowerCase();
  if (path.includes('industry')) return 'industry';
  if (path.includes('student')) return 'student';
  if (path.includes('academia')) return 'academia';
  if (path.includes('institution')) return 'institution';
  return null;
};

const AppContent: React.FC = () => {
  const [activePortal, setActivePortal] = useState<PortalType | null>(getInitialPortal);
  const [currentView, setCurrentView] = useState<'landing' | 'help' | 'docs'>('landing');

  useEffect(() => {
    // Clear mock applications on hard reload so state doesn't persist forever
    localStorage.removeItem('capfly_student_applications');
    localStorage.removeItem('capfly_student_course_enrollments');
    localStorage.removeItem('capfly_student_workshop_registrations');
    
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('capfly_workshop_details_')) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(k => localStorage.removeItem(k));

    const handlePopState = () => {
      setActivePortal(getInitialPortal());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectPortal = (portal: PortalType | null) => {
    setActivePortal(portal);
    const targetPath = portal ? `/${portal}` : '/';
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ portal }, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    // Complete state flush
    localStorage.clear();
    sessionStorage.clear();
    
    // Reset basic views
    setActivePortal(null);
    setCurrentView('landing');
    
    // Clean restart to fully wipe React memory (roadmap nodes, profile states, etc.)
    window.location.href = '/';
  };

  // If Industry, Student, Academia, or Institution Portal is active, render the dedicated workspace directly
  if (activePortal === 'industry') {
    return <IndustryDashboard onLogout={handleLogout} />;
  }

  if (activePortal === 'student') {
    return <StudentDashboard onLogout={handleLogout} />;
  }

  if (activePortal === 'academia') {
    return <AcademiaDashboard onLogout={handleLogout} />;
  }

  if (activePortal === 'institution') {
    return <InstitutionDashboard onLogout={handleLogout} />;
  }

  // Active view switching for Landing, Help Center, and Developer Docs
  if (currentView === 'help') {
    return <HelpCenter onBack={() => setCurrentView('landing')} onSelectPortal={handleSelectPortal} />;
  }

  if (currentView === 'docs') {
    return <DocsPage onBack={() => setCurrentView('landing')} onSelectPortal={handleSelectPortal} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Main Landing Page View with integrated top navigation */}
      <main className="flex-1 w-full">
        <LandingPage 
          activePortal={activePortal} 
          onSelectPortal={handleSelectPortal} 
          onSelectView={setCurrentView}
        />
      </main>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
