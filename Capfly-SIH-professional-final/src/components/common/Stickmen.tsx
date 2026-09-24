import React from 'react';

// Orange Mascot Small (#e56828)
export const OrangeMascotSmall: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 40 40" fill="none" stroke="#e56828" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Head */}
    <circle cx="20" cy="10" r="5" fill="#e56828" />
    {/* Torso */}
    <line x1="20" y1="15" x2="20" y2="27" />
    {/* Waving Arm */}
    <path d="M20 18 L28 12 L33 14" />
    {/* Other Arm */}
    <line x1="20" y1="18" x2="12" y2="23" />
    {/* Left Leg */}
    <line x1="20" y1="27" x2="14" y2="36" />
    {/* Right Leg */}
    <line x1="20" y1="27" x2="26" y2="36" />
  </svg>
);

// Orange Mascot Leaning (-6deg)
export const OrangeMascotLeaning: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <div className="inline-block transform -rotate-6">
    <svg viewBox="0 0 40 40" fill="none" stroke="#e56828" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="18" cy="9" r="5" fill="#e56828" />
      <line x1="18" y1="14" x2="22" y2="26" />
      <path d="M19 18 L29 16 L31 22" />
      <line x1="19" y1="18" x2="10" y2="21" />
      <line x1="22" y1="26" x2="15" y2="36" />
      <line x1="22" y1="26" x2="28" y2="35" />
    </svg>
  </div>
);

// Orange Mascot Waving
export const OrangeMascotWaving: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 40 40" fill="none" stroke="#e56828" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="20" cy="9" r="5" fill="#e56828" />
    <line x1="20" y1="14" x2="20" y2="26" />
    {/* Raised Waving Arm */}
    <path d="M20 17 L29 10 L34 14" />
    <line x1="20" y1="17" x2="11" y2="22" />
    <line x1="20" y1="26" x2="13" y2="36" />
    <line x1="20" y1="26" x2="27" y2="36" />
  </svg>
);

// Orange Mascot Pointing Up
export const OrangeMascotPointingUp: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 40 40" fill="none" stroke="#e56828" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="20" cy="12" r="5" fill="#e56828" />
    <line x1="20" y1="17" x2="20" y2="28" />
    {/* Pointing Arm Straight Up */}
    <path d="M20 20 L20 4 L22 2" />
    <line x1="20" y1="20" x2="11" y2="24" />
    <line x1="20" y1="28" x2="14" y2="37" />
    <line x1="20" y1="28" x2="26" y2="37" />
  </svg>
);

// Green Mascot Small (#4a8b5c)
export const GreenMascotSmall: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 40 40" fill="none" stroke="#4a8b5c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="20" cy="10" r="5" fill="#4a8b5c" />
    <line x1="20" y1="15" x2="20" y2="27" />
    <line x1="20" y1="18" x2="28" y2="22" />
    <line x1="20" y1="18" x2="12" y2="22" />
    <line x1="20" y1="27" x2="14" y2="36" />
    <line x1="20" y1="27" x2="26" y2="36" />
  </svg>
);

// Green Mascot Standing On Line
export const GreenMascotStandingOnLine: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 50 40" fill="none" stroke="#4a8b5c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Grounding line */}
    <line x1="2" y1="36" x2="48" y2="36" stroke="#4a8b5c" strokeWidth="2" />
    {/* Body standing on line */}
    <circle cx="25" cy="10" r="5" fill="#4a8b5c" />
    <line x1="25" y1="15" x2="25" y2="26" />
    <path d="M25 18 L33 13 L37 16" />
    <line x1="25" y1="18" x2="17" y2="22" />
    <line x1="25" y1="26" x2="18" y2="36" />
    <line x1="25" y1="26" x2="32" y2="36" />
  </svg>
);

// Green Mascot Peeking over bottom right border
export const GreenMascotPeeking: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 40 30" fill="none" stroke="#4a8b5c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Peeking Head */}
    <circle cx="20" cy="12" r="7" fill="#4a8b5c" />
    {/* Two eyes */}
    <circle cx="17" cy="11" r="1" fill="#ffffff" stroke="none" />
    <circle cx="23" cy="11" r="1" fill="#ffffff" stroke="none" />
    {/* Hands holding the edge */}
    <path d="M9 25 C11 20 15 20 16 25" />
    <path d="M24 25 C25 20 29 20 31 25" />
    {/* Border line */}
    <line x1="0" y1="25" x2="40" y2="25" stroke="#4a8b5c" strokeWidth="2" />
  </svg>
);

// CapFlyerBot (Cobalt Blue gradient orb with planetary ring and glowing pill eyes)
export const CapFlyerBot: React.FC<{ className?: string }> = ({ className = 'w-14 h-14' }) => (
  <div className={`relative inline-block animate-bounce-gentle filter drop-shadow-[0_8px_16px_rgba(29,78,216,0.35)] ${className}`}>
    <style>{`
      @keyframes bounce-gentle {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-8px) rotate(2deg); }
      }
      .animate-bounce-gentle {
        animation: bounce-gentle 4s ease-in-out infinite;
      }
    `}</style>
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <radialGradient id="capflyer-orb" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#1d4ed8" />
          <stop offset="100%" stopColor="#0f172a" />
        </radialGradient>
        <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      
      {/* Tilted Back Planetary Ring */}
      <ellipse cx="32" cy="34" rx="28" ry="8" fill="none" stroke="url(#ring-gradient)" strokeWidth="3" transform="rotate(-15 32 34)" opacity="0.6" />

      {/* Main Gradient Orb */}
      <circle cx="32" cy="32" r="20" fill="url(#capflyer-orb)" stroke="#60a5fa" strokeWidth="1.5" />

      {/* Tilted Front Planetary Ring */}
      <path d="M 6 30 A 28 8 0 0 0 54 36" fill="none" stroke="url(#ring-gradient)" strokeWidth="3.5" strokeLinecap="round" transform="rotate(-15 32 34)" />

      {/* Glowing Pill Eyes */}
      <rect x="23" y="27" width="5" height="9" rx="2.5" fill="#38bdf8" className="animate-pulse" />
      <rect x="36" y="27" width="5" height="9" rx="2.5" fill="#38bdf8" className="animate-pulse" />

      {/* Glossy Reflection Highlight */}
      <ellipse cx="26" cy="19" rx="6" ry="3" fill="#ffffff" opacity="0.35" transform="rotate(-30 26 19)" />
    </svg>
  </div>
);
