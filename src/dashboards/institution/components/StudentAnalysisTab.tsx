import React, { useState } from 'react';

interface CandidateProfile {
  rollNumber: string;
  name: string;
  department: string;
  year: string;
  verifiedSkillScore: string;
  skills: { name: string; score: number }[];
  internships: { title: string; company: string; status: string }[];
  digitalPortfolioStatus: string;
}

export const StudentAnalysisTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Student');
  const [inputRoll, setInputRoll] = useState('CAP001');
  const [profile, setProfile] = useState<CandidateProfile | null>({
    rollNumber: 'CAP001',
    name: 'Harini S',
    department: 'Computer Science & Engineering',
    year: '4th Year',
    verifiedSkillScore: '92%',
    skills: [
      { name: 'Data Structures & Algorithms', score: 94 },
      { name: 'Full Stack React & Node.js', score: 90 },
      { name: 'Cloud Native & Microservices', score: 88 },
      { name: 'GenAI & Python', score: 95 },
    ],
    internships: [
      { title: 'Cloud Infrastructure', company: 'TCS Research', status: 'Completed' },
      { title: 'AI Module Assistant', company: 'Infosys', status: 'Completed' },
    ],
    digitalPortfolioStatus: 'Cryptographically Stamped & Verified',
  });

  const mockProfiles: Record<string, CandidateProfile> = {
    CAP001: {
      rollNumber: 'CAP001',
      name: 'Harini S',
      department: 'Computer Science & Engineering',
      year: '4th Year',
      verifiedSkillScore: '92%',
      skills: [
        { name: 'Data Structures & Algorithms', score: 94 },
        { name: 'Full Stack React & Node.js', score: 90 },
        { name: 'Cloud Native & Microservices', score: 88 },
        { name: 'GenAI & Python', score: 95 },
      ],
      internships: [
        { title: 'Cloud Infrastructure', company: 'TCS Research', status: 'Completed' },
      ],
      digitalPortfolioStatus: 'Cryptographically Stamped & Verified',
    },
    CAP002: {
      rollNumber: 'CAP002',
      name: 'Karthik R',
      department: 'Electronics & Communication',
      year: '3rd Year',
      verifiedSkillScore: '78%',
      skills: [
        { name: 'Embedded Systems & C', score: 82 },
        { name: 'VLSI Circuit Design', score: 75 },
        { name: 'IoT Protocols', score: 80 },
      ],
      internships: [
        { title: 'Embedded Firmware Dev', company: 'Bosch Engineering', status: 'Ongoing' },
      ],
      digitalPortfolioStatus: 'Verified Stamp Pending',
    }
  };

  const handleFetch = () => {
    const key = inputRoll.trim().toUpperCase();
    if (mockProfiles[key]) {
      setProfile(mockProfiles[key]);
    } else {
      setProfile({
        rollNumber: key || 'CAP001',
        name: 'Student Candidate',
        department: 'Information Technology',
        year: '4th Year',
        verifiedSkillScore: '85%',
        skills: [
          { name: 'Core Programming', score: 85 },
          { name: 'System Design', score: 80 },
        ],
        internships: [
          { title: 'Software Trainee', company: 'Industry Partner', status: 'Completed' }
        ],
        digitalPortfolioStatus: 'Verified Portfolio',
      });
    }
  };

  return (
    <div className="space-y-6 font-sans text-slate-800 bg-[#f8fafc] min-h-full pb-12">
      {/* Title Header */}
      <div className="border-b border-gray-200/80 pb-3">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Candidate Analysis</h1>
        <p className="text-xs text-slate-500 font-medium">Individual Student Skill Mapping &amp; Digital Portfolio Inspection</p>
      </div>

      {/* Sub-tab Pill Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab('Student')}
          className={`px-5 py-2 text-xs font-bold rounded-full transition-colors cursor-pointer ${
            activeTab === 'Student'
              ? 'bg-slate-800 text-white shadow-xs'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Student
        </button>
      </div>

      {/* INPUT BAR (PRAGATI MITRA SPECIFIED: "Enter Roll Number" Input + GREEN "Fetch" Button bg-green-600 hover:bg-green-700 text-white rounded px-5 py-2) */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-3 flex-1">
          <label className="text-xs font-bold text-slate-600 whitespace-nowrap">Enter Roll Number:</label>
          <input
            type="text"
            value={inputRoll}
            onChange={(e) => setInputRoll(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleFetch()}
            placeholder="Enter Student Roll Number (e.g. CAP001)..."
            className="flex-1 max-w-md px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs font-bold text-slate-800 outline-none focus:border-slate-800"
          />
        </div>

        <button
          onClick={handleFetch}
          className="bg-green-600 hover:bg-green-700 text-white rounded px-5 py-2 text-xs font-bold cursor-pointer transition-colors shadow-xs"
        >
          Fetch
        </button>
      </div>

      {/* FETCHED CANDIDATE ANALYSIS CARD */}
      {profile && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-xs p-6 space-y-6">
          {/* Header Profile Info */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-black text-slate-900">{profile.name}</h2>
                <span className="px-2.5 py-0.5 bg-slate-800 text-white text-xs font-bold rounded">
                  {profile.rollNumber}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Department: {profile.department} • Year: {profile.year}
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 font-semibold block">Verified Skill Score</span>
              <span className="text-2xl font-black text-emerald-600">{profile.verifiedSkillScore}</span>
            </div>
          </div>

          {/* Skill Breakdown & Internships Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Skill Mapping */}
            <div className="space-y-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <h3 className="text-xs font-bold uppercase text-slate-700">Individual Skill Mapping Breakdown</h3>
              <div className="space-y-2.5">
                {profile.skills.map((s, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>{s.name}</span>
                      <span className="text-emerald-600">{s.score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${s.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Internship Progress & Digital Portfolio */}
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-2">
                <h3 className="text-xs font-bold uppercase text-slate-700">Internship Progress &amp; Records</h3>
                <div className="space-y-2 pt-1">
                  {profile.internships.map((int, idx) => (
                    <div key={idx} className="p-2.5 bg-white rounded border border-gray-200 text-xs flex justify-between items-center">
                      <div>
                        <p className="font-bold text-slate-800">{int.title}</p>
                        <p className="text-[10px] text-slate-500">{int.company}</p>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                        {int.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
                <h3 className="text-xs font-bold uppercase text-emerald-900">Verified Digital Portfolio Status</h3>
                <p className="text-xs font-bold text-emerald-700">{profile.digitalPortfolioStatus}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
