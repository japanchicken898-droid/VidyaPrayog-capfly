import React from 'react';

// Capfly Blue Paper Plane Logo
export const CapflyLogoIcon: React.FC<{ className?: string; size?: number }> = ({ className = "w-7 h-7", size = 28 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M3 16.5L33 3L19.5 33L15 21L3 16.5Z"
      fill="#0066FF"
    />
    <path
      d="M33 3L15 21L19.5 33L33 3Z"
      fill="#0052CC"
      opacity="0.35"
    />
    <path
      d="M15 21L21 15"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// Social Media Icons
export const LinkedInIcon: React.FC<{ className?: string; size?: number }> = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28Z" />
  </svg>
);

export const XTwitterIcon: React.FC<{ className?: string; size?: number }> = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const YouTubeIcon: React.FC<{ className?: string; size?: number }> = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export const InstagramIcon: React.FC<{ className?: string; size?: number }> = ({ className = "w-4 h-4", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// Hero Step-by-Step Staircase Illustration
export const HeroStaircaseIllustration: React.FC = () => {
  return (
    <div className="relative w-full max-w-[620px] mx-auto select-none">

      {/* Hand-drawn style annotations */}
      <div className="absolute top-2 left-6 z-20 text-center transform -rotate-12 hidden sm:block pointer-events-none">
        <div className="font-serif italic text-sm sm:text-base font-bold text-slate-800 leading-tight">
          Learn<br />
          Assess<br />
          Grow<br />
          Get Hired!
        </div>
        <svg className="w-8 h-8 text-slate-500 mx-auto mt-1" viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M15 2 C 18 10, 18 20, 24 26" strokeDasharray="3 3" />
          <path d="M22 22 L 25 26 L 20 27" />
        </svg>
      </div>

      <div className="absolute top-2 right-6 z-20 text-center transform rotate-8 hidden sm:block pointer-events-none">
        <div className="font-serif italic text-sm sm:text-base font-bold text-slate-800 leading-tight">
          Your Skills<br />
          Our Support<br />
          A Brighter Future
        </div>
        <svg className="w-8 h-8 text-slate-500 mx-auto mt-1" viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M15 2 C 12 10, 10 20, 4 26" strokeDasharray="3 3" />
          <path d="M8 22 L 3 26 L 6 28" />
        </svg>
      </div>

      {/* Main Vector SVG Illustration */}
      <svg
        viewBox="0 0 640 520"
        className="w-full h-auto drop-shadow-sm"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients matching exact image tones */}
          <linearGradient id="purpleStepFront" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C4B5FD" />
            <stop offset="100%" stopColor="#A78BFA" />
          </linearGradient>
          <linearGradient id="yellowStepFront" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="100%" stopColor="#FACC15" />
          </linearGradient>
          <linearGradient id="greenStepFront" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A7F3D0" />
            <stop offset="100%" stopColor="#4ADE80" />
          </linearGradient>
          <linearGradient id="blueTowerFront" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#60A5FA" />
          </linearGradient>
          <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="6" stdDeviation="5" floodOpacity="0.08" />
          </filter>
        </defs>

        {/* Soft Sky Clouds */}
        <g opacity="0.6">
          <ellipse cx="120" cy="110" rx="40" ry="18" fill="#F0F8FF" />
          <ellipse cx="145" cy="100" rx="30" ry="20" fill="#F0F8FF" />
          <ellipse cx="480" cy="80" rx="55" ry="24" fill="#F0F8FF" />
          <ellipse cx="510" cy="72" rx="35" ry="22" fill="#F0F8FF" />
        </g>

        {/* Green Plants & Foliage */}
        <g opacity="0.9">
          {/* Left bushes */}
          <ellipse cx="65" cy="380" rx="35" ry="45" fill="#86EFAC" />
          <ellipse cx="85" cy="400" rx="25" ry="35" fill="#4ADE80" />
          <ellipse cx="50" cy="350" rx="20" ry="30" fill="#22C55E" />

          {/* Behind Tower Foliage */}
          <ellipse cx="530" cy="220" rx="30" ry="45" fill="#86EFAC" />
          <ellipse cx="550" cy="245" rx="20" ry="35" fill="#4ADE80" />
          <ellipse cx="600" cy="390" rx="28" ry="48" fill="#4ADE80" />
        </g>

        {/* 1. Purple Step: Learn */}
        <g filter="url(#cardShadow)">
          {/* 3D Top bevel */}
          <path d="M80 375 L170 375 L200 345 L110 345 Z" fill="#DDD6FE" />
          {/* Front face */}
          <rect x="80" y="375" width="90" height="100" rx="14" fill="url(#purpleStepFront)" />
          {/* Book Icon */}
          <g transform="translate(112, 395)">
            <path d="M3 6C8 3 13 4 15 6C17 4 22 3 27 6V22C22 19 17 20 15 22C13 20 8 19 3 22V6Z" stroke="#2E1065" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 6V22" stroke="#2E1065" strokeWidth="2.5" strokeLinecap="round" />
          </g>
          <text x="125" y="450" textAnchor="middle" fill="#2E1065" fontSize="15" fontWeight="bold" fontFamily="sans-serif">
            Learn
          </text>
        </g>

        {/* 2. Yellow Step: Assess */}
        <g filter="url(#cardShadow)">
          {/* 3D Top bevel */}
          <path d="M190 310 L280 310 L310 280 L220 280 Z" fill="#FEF9C3" />
          {/* Front face */}
          <rect x="190" y="310" width="90" height="165" rx="14" fill="url(#yellowStepFront)" />
          {/* Assess Test Sheet Icon */}
          <g transform="translate(222, 330)">
            <rect x="4" y="2" width="20" height="25" rx="3" fill="none" stroke="#713F12" strokeWidth="2.5" />
            <line x1="8" y1="8" x2="20" y2="8" stroke="#713F12" strokeWidth="2" strokeLinecap="round" />
            <line x1="8" y1="14" x2="20" y2="14" stroke="#713F12" strokeWidth="2" strokeLinecap="round" />
            <circle cx="9" cy="20" r="1.5" fill="#713F12" />
            <circle cx="14" cy="20" r="1.5" fill="#713F12" />
          </g>
          <text x="235" y="405" textAnchor="middle" fill="#713F12" fontSize="15" fontWeight="bold" fontFamily="sans-serif">
            Assess
          </text>
        </g>

        {/* 3. Green Step: Intern */}
        <g filter="url(#cardShadow)">
          {/* 3D Top bevel */}
          <path d="M300 245 L390 245 L420 215 L330 215 Z" fill="#DCFCE7" />
          {/* Front face */}
          <rect x="300" y="245" width="90" height="230" rx="14" fill="url(#greenStepFront)" />
          {/* Briefcase Icon */}
          <g transform="translate(332, 265)">
            <rect x="3" y="7" width="24" height="18" rx="4" fill="none" stroke="#14532D" strokeWidth="2.5" />
            <path d="M10 7V4C10 3 11 2 12 2H18C19 2 20 3 20 4V7" stroke="#14532D" strokeWidth="2.5" />
            <circle cx="15" cy="16" r="2" fill="#14532D" />
          </g>
          <text x="345" y="335" textAnchor="middle" fill="#14532D" fontSize="15" fontWeight="bold" fontFamily="sans-serif">
            Intern
          </text>
        </g>

        {/* 4. Blue Tower Step: Get Hired */}
        <g filter="url(#cardShadow)">
          {/* 3D Top bevel */}
          <path d="M410 175 L500 175 L530 145 L440 145 Z" fill="#E0F2FE" />
          {/* Front face */}
          <rect x="410" y="175" width="90" height="300" rx="18" fill="url(#blueTowerFront)" />
          {/* Flag on top pole */}
          <g transform="translate(458, 105)">
            <line x1="0" y1="0" x2="0" y2="45" stroke="#1E3A8A" strokeWidth="3" strokeLinecap="round" />
            <path d="M0 2 L26 8 L0 18 Z" fill="#0066FF" />
            <path d="M0 2 L12 10 L0 18 Z" fill="#0047BA" opacity="0.3" />
          </g>
          {/* Bar Chart Icon */}
          <g transform="translate(442, 200)">
            <rect x="3" y="14" width="4" height="12" rx="1.5" fill="#1E3A8A" />
            <rect x="11" y="8" width="4" height="18" rx="1.5" fill="#1E3A8A" />
            <rect x="19" y="2" width="4" height="24" rx="1.5" fill="#1E3A8A" />
          </g>
          <text x="455" y="260" textAnchor="middle" fill="#1E3A8A" fontSize="15" fontWeight="bold" fontFamily="sans-serif">
            Get Hired
          </text>
        </g>

        {/* Student Climber Character */}
        <g transform="translate(245, 105)" filter="url(#cardShadow)">
          {/* Backpack on student */}
          <ellipse cx="68" cy="130" rx="18" ry="24" fill="#0284C7" transform="rotate(-15 68 130)" />
          <path d="M62 120 C62 114 74 114 78 122" stroke="#0369A1" strokeWidth="3" fill="none" />

          {/* Student Head & Hair */}
          <circle cx="106" cy="74" r="18" fill="#FCD34D" />
          {/* Dark Brown Hair */}
          <path d="M92 70 C92 54 114 52 120 62 C122 67 120 77 110 74 C102 72 98 78 92 70 Z" fill="#451A03" />
          <circle cx="113" cy="74" r="2" fill="#451A03" />
          <path d="M110 82 C112 85 117 85 119 82" stroke="#451A03" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Shirt (Sky Blue) */}
          <path d="M88 92 C88 87 96 84 106 87 C116 84 122 87 124 97 L120 142 L92 140 Z" fill="#0284C7" />

          {/* Right Leg stepping up */}
          <path d="M112 138 L134 158 L152 160" stroke="#1E293B" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <ellipse cx="155" cy="160" rx="8" ry="5" fill="#2563EB" />
          <ellipse cx="157" cy="162" rx="7" ry="2" fill="#FFFFFF" />

          {/* Left Leg on lower step */}
          <path d="M96 138 L84 168 L64 180" stroke="#1E293B" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <ellipse cx="62" cy="182" rx="8" ry="5" fill="#2563EB" />
          <ellipse cx="62" cy="184" rx="7" ry="2" fill="#FFFFFF" />

          {/* Left Arm */}
          <path d="M92 97 L76 117 L66 110" stroke="#FCD34D" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {/* Right Arm swinging forward */}
          <path d="M119 97 L136 112 L144 104" stroke="#FCD34D" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
      </svg>
    </div>
  );
};

// Workspace Character Cards Illustrations
export const StudentIllustration: React.FC = () => (
  <svg viewBox="0 0 160 130" className="w-32 h-24 mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="80" cy="65" r="50" fill="#E0F2FE" />
    <circle cx="80" cy="42" r="16" fill="#FDBA74" />
    <path d="M68 36 C68 22 90 22 94 32 C95 38 92 44 84 42 Z" fill="#1E293B" />
    <circle cx="85" cy="42" r="2" fill="#451A03" />
    <path d="M64 60 C64 54 70 52 80 52 C90 52 96 54 96 60 L100 84 L60 84 Z" fill="#0284C7" />
    <path d="M62 66 L72 78 L88 78 L98 66" stroke="#FDBA74" strokeWidth="6" strokeLinecap="round" fill="none" />
    <rect x="68" y="73" width="24" height="15" rx="3" fill="#94A3B8" />
    <path d="M64 88 L96 88" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const AcademiaIllustration: React.FC = () => (
  <svg viewBox="0 0 160 130" className="w-32 h-24 mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="80" cy="65" r="50" fill="#F3E8FF" />
    <circle cx="80" cy="40" r="16" fill="#FDBA74" />
    <path d="M64 38 C64 24 96 24 96 38 C96 52 90 56 80 54 C70 56 64 52 64 38 Z" fill="#451A03" />
    <circle cx="75" cy="40" r="1.5" fill="#451A03" />
    <circle cx="85" cy="40" r="1.5" fill="#451A03" />
    <path d="M64 60 C64 54 70 52 80 52 C90 52 96 54 96 60 L98 84 L62 84 Z" fill="#F59E0B" />
    <rect x="74" y="67" width="20" height="24" rx="3" fill="#1E293B" transform="rotate(-10 74 67)" />
    <line x1="78" y1="74" x2="88" y2="72" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <line x1="79" y1="80" x2="89" y2="78" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const IndustryIllustration: React.FC = () => (
  <svg viewBox="0 0 160 130" className="w-32 h-24 mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="80" cy="65" r="50" fill="#DCFCE7" />
    <circle cx="80" cy="40" r="15" fill="#FDBA74" />
    <path d="M68 34 C68 22 90 22 92 30 C94 34 90 40 82 38 Z" fill="#1E293B" />
    <path d="M62 58 C62 52 70 50 80 50 C90 50 98 52 98 58 L100 84 L60 84 Z" fill="#0F172A" />
    <path d="M74 50 L80 64 L86 50 Z" fill="#FFFFFF" />
    <path d="M79 54 L81 54 L82 68 L80 70 L78 68 Z" fill="#EF4444" />
    <rect x="68" y="72" width="24" height="15" rx="3" fill="#94A3B8" />
    <path d="M64 87 L96 87" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const InstitutionIllustration: React.FC = () => (
  <svg viewBox="0 0 160 130" className="w-32 h-24 mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="80" cy="65" r="50" fill="#FFEDD5" />
    <path d="M80 26 L110 44 L50 44 Z" fill="#EA580C" />
    <rect x="54" y="44" width="52" height="44" rx="3" fill="#FDBA74" />
    <rect x="60" y="50" width="6" height="38" fill="#EA580C" rx="1.5" />
    <rect x="73" y="50" width="6" height="38" fill="#EA580C" rx="1.5" />
    <rect x="86" y="50" width="6" height="38" fill="#EA580C" rx="1.5" />
    <rect x="98" y="50" width="4" height="38" fill="#EA580C" rx="1.5" />
    <path d="M73 68 C73 63 86 63 86 68 V88 H73 V68 Z" fill="#9A3412" />
    <circle cx="80" cy="38" r="4.5" fill="#FFFFFF" />
  </svg>
);

// Student Journey Flowchart Illustration
export const StudentJourneyDiagram: React.FC = () => {
  return (
    <div className="relative w-full max-w-3xl mx-auto py-2">

      {/* 4 Connected Step Nodes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10 items-stretch">

        {/* Step 1: Skill Gap Analysis */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs hover:shadow-md transition text-center flex flex-col items-center">
          <span className="text-[11px] font-extrabold text-[#0066FF] tracking-wider uppercase">STEP 1</span>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">Skill Gap Analysis</h4>
          <div className="w-24 h-20 my-2 flex items-center justify-center">
            <svg viewBox="0 0 100 80" className="w-full h-full" fill="none">
              <rect x="22" y="10" width="56" height="38" rx="4" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2" />
              <line x1="30" y1="20" x2="48" y2="20" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
              <line x1="30" y1="28" x2="62" y2="28" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" />
              <line x1="30" y1="36" x2="44" y2="36" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" />
              <circle cx="66" cy="20" r="4" fill="#22C55E" />
              <path d="M50 48 L50 62 M35 62 L65 62" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
              <circle cx="50" cy="64" r="8" fill="#FDBA74" />
              <path d="M38 78 C38 72 44 70 50 70 C56 70 62 72 62 78 Z" fill="#8B5CF6" />
            </svg>
          </div>
          <p className="text-[11px] text-slate-500 font-medium mt-auto">Assess skills & uncover gaps</p>
        </div>

        {/* Step 2: Personalized report & AI Mock Interviews */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs hover:shadow-md transition text-center flex flex-col items-center relative">
          <span className="text-[11px] font-extrabold text-[#0066FF] tracking-wider uppercase">STEP 2</span>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">Personalized report</h4>
          <div className="w-24 h-20 my-2 flex items-center justify-center relative">
            <svg viewBox="0 0 100 80" className="w-full h-full" fill="none">
              <rect x="20" y="8" width="60" height="60" rx="8" fill="#FAF5FF" stroke="#A855F7" strokeWidth="2" />
              <circle cx="50" cy="30" r="12" fill="#E9D5FF" />
              <path d="M46 28 L50 32 L56 26" stroke="#7E22CE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="30" y="48" width="40" height="4" rx="2" fill="#C084FC" />
              <rect x="30" y="56" width="25" height="4" rx="2" fill="#DDD6FE" />
            </svg>
          </div>
          <div className="mt-auto bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-full text-[10px] font-bold text-purple-700 flex items-center gap-1">
            <span>✨ AI Mock Interviews</span>
          </div>
        </div>

        {/* Step 3: Real Interviews & 92% Confidence */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs hover:shadow-md transition text-center flex flex-col items-center">
          <span className="text-[11px] font-extrabold text-[#0066FF] tracking-wider uppercase">STEP 3</span>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">Real Interviews</h4>
          <div className="w-24 h-20 my-2 flex items-center justify-center">
            <svg viewBox="0 0 100 80" className="w-full h-full" fill="none">
              <rect x="15" y="12" width="70" height="48" rx="6" fill="#F0FDF4" stroke="#22C55E" strokeWidth="2" />
              <circle cx="35" cy="32" r="8" fill="#FDBA74" />
              <path d="M25 48 C25 42 30 40 35 40 C40 40 45 42 45 48 Z" fill="#0F172A" />
              <circle cx="65" cy="32" r="8" fill="#FDBA74" />
              <path d="M55 48 C55 42 60 40 65 40 C70 40 75 42 75 48 Z" fill="#2563EB" />
              <circle cx="50" cy="22" r="5" fill="#86EFAC" />
            </svg>
          </div>
          <div className="mt-auto bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full text-[10px] font-bold text-emerald-700">
            <strong>92%</strong> confidence boost
          </div>
        </div>

        {/* Step 4: Job Offer & Onboarding */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs hover:shadow-md transition text-center flex flex-col items-center">
          <span className="text-[11px] font-extrabold text-[#0066FF] tracking-wider uppercase">STEP 4</span>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">Job Offer & Onboard</h4>
          <div className="w-24 h-20 my-2 flex items-center justify-center">
            <svg viewBox="0 0 100 80" className="w-full h-full" fill="none">
              <circle cx="50" cy="24" r="10" fill="#FDBA74" />
              <path d="M38 52 C38 42 44 38 50 38 C56 38 62 42 62 52 Z" fill="#F59E0B" />
              <path d="M38 42 L26 26" stroke="#FDBA74" strokeWidth="4" strokeLinecap="round" />
              <rect x="64" y="44" width="16" height="12" rx="2" fill="#78350F" />
              <path d="M68 44 V41 C68 40 69 39 70 39 H74 C75 39 76 40 76 41 V44" stroke="#78350F" strokeWidth="2" />
            </svg>
          </div>
          <div className="mt-auto bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full text-[10px] font-bold text-blue-700">
            <strong>3x</strong> Faster skill dev
          </div>
        </div>

      </div>

      {/* Decorative background dashed path */}
      <svg className="hidden lg:block absolute top-1/2 left-0 w-full h-12 -translate-y-1/2 pointer-events-none -z-0" viewBox="0 0 800 50" fill="none">
        <path d="M 100 25 C 200 -10, 300 60, 400 25 C 500 -10, 600 60, 700 25" stroke="#F472B6" strokeWidth="2" strokeDasharray="6 6" opacity="0.5" />
      </svg>
    </div>
  );
};
