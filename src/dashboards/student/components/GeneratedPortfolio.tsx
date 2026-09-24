import React from 'react';
import { 
  Globe, Mail, Link as LinkIcon,
  Code, ShieldCheck, Database, Printer, GitBranch, Star, Award, CheckCircle2, Cpu, X
} from 'lucide-react';

interface GeneratedPortfolioProps {
  onClose: () => void;
  personalInfo: {
    name: string;
    regNo: string;
    program: string;
    batch: string;
    cgpa: string;
    phone?: string;
    email?: string;
    githubLink?: string;
    leetcodeLink?: string;
  };
  profilePhoto: string | null;
  projects: any[];
}

export const GeneratedPortfolio: React.FC<GeneratedPortfolioProps> = ({ 
  onClose, personalInfo, profilePhoto, projects 
}) => {

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-50 overflow-y-auto flex justify-center items-start py-8 print:py-0 print:bg-white">
      {/* Floating Action Buttons */}
      <div className="fixed top-6 right-6 flex gap-4 z-50 print:hidden">
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full shadow-lg font-bold transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4" /> Save as PDF
        </button>
        <button 
          onClick={onClose}
          className="w-10 h-10 bg-white hover:bg-rose-50 text-slate-900 hover:text-rose-600 border border-slate-200 rounded-full flex items-center justify-center shadow-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Portfolio Canvas (A4 Dimensions constraint: w-[794px] h-[1123px] approx) */}
      <div className="w-[794px] h-[1123px] bg-white shadow-2xl print:shadow-none relative overflow-hidden flex flex-col font-sans shrink-0 print:w-full print:h-screen print:max-w-none">
        
        {/* Background Blobs */}
        <div className="absolute top-0 right-0 w-2/3 h-[400px] bg-blue-50/50 rounded-bl-full -z-10"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-[300px] bg-rose-50/50 rounded-tr-full -z-10"></div>

        {/* Minimal Navigation Header */}
        <header className="px-8 py-5 flex justify-between items-center border-b border-slate-100/50 bg-white/50 backdrop-blur-sm z-10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#1E293B] rounded flex items-center justify-center text-white font-black text-xs shrink-0">C</div>
            <span className="text-lg font-black tracking-tight text-[#1E293B]">capfly</span>
            <span className="ml-2 px-2 py-0.5 bg-amber-100 text-amber-700 text-[8px] font-black rounded-full uppercase tracking-widest">Portfolio</span>
          </div>
          
          <div className="flex items-center gap-5 text-[9px] font-bold text-slate-600">
            {personalInfo.phone && <span className="flex items-center gap-1.5 whitespace-nowrap"><Globe className="w-3 h-3 text-blue-500" /> {personalInfo.phone}</span>}
            {personalInfo.email && <span className="flex items-center gap-1.5 whitespace-nowrap"><Mail className="w-3 h-3 text-rose-500" /> {personalInfo.email}</span>}
            {personalInfo.githubLink && <span className="flex items-center gap-1.5 whitespace-nowrap"><GitBranch className="w-3 h-3 text-slate-800" /> {personalInfo.githubLink.replace('https://', '').replace('github.com/', '')}</span>}
            {personalInfo.leetcodeLink && <span className="flex items-center gap-1.5 whitespace-nowrap"><Code className="w-3 h-3 text-amber-500" /> {personalInfo.leetcodeLink.replace('https://', '').replace('leetcode.com/', '')}</span>}
          </div>
        </header>

        {/* Hero Section */}
        <section className="px-8 py-6 flex items-center justify-between">
          <div className="max-w-[400px]">
            <p className="text-blue-600 font-bold uppercase tracking-widest text-[10px] mb-2">Hello, I'm</p>
            <h1 className="text-4xl font-black text-[#1E293B] leading-tight mb-3">{personalInfo.name}</h1>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Hi, I'm {personalInfo.name}, a passionate {personalInfo.program} student (Batch of {personalInfo.batch}) with Registration No. {personalInfo.regNo}. I help teams build high-quality software solutions and bring ideas into reality.
            </p>
            <div className="flex gap-3">
              <div className="px-4 py-2 border border-slate-200 text-emerald-600 text-xs font-bold rounded-lg flex items-center">
                CGPA: {personalInfo.cgpa} / 10.0
              </div>
            </div>
          </div>
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10 bg-slate-100 shrink-0">
            {profilePhoto ? (
              <img src={profilePhoto} alt={personalInfo.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-bold">No Photo</div>
            )}
          </div>
        </section>

        {/* Compact Grid Layout for Details */}
        <div className="px-8 py-4 flex-1 grid grid-cols-12 gap-6">
          
          {/* Left Column (Wider) */}
          <div className="col-span-7 flex flex-col gap-6">
            
            {/* Skills & Expertise */}
            <section>
              <div className="mb-3">
                <h2 className="text-lg font-black text-[#1E293B] border-b-2 border-blue-100 pb-1 inline-block">Core Expertise</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded flex items-center justify-center shrink-0"><Code className="w-4 h-4" /></div>
                  <div><h3 className="text-xs font-bold text-[#1E293B]">Frontend Dev</h3><p className="text-[9px] text-slate-500 leading-tight">React, Next.js, Tailwind</p></div>
                </div>
                <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex items-start gap-3">
                  <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded flex items-center justify-center shrink-0"><Database className="w-4 h-4" /></div>
                  <div><h3 className="text-xs font-bold text-[#1E293B]">Backend APIs</h3><p className="text-[9px] text-slate-500 leading-tight">Node.js, PostgreSQL</p></div>
                </div>
                <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-50 text-purple-600 rounded flex items-center justify-center shrink-0"><Cpu className="w-4 h-4" /></div>
                  <div><h3 className="text-xs font-bold text-[#1E293B]">System Design</h3><p className="text-[9px] text-slate-500 leading-tight">Microservices, Scalability</p></div>
                </div>
                <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex items-start gap-3">
                  <div className="w-8 h-8 bg-rose-50 text-rose-600 rounded flex items-center justify-center shrink-0"><ShieldCheck className="w-4 h-4" /></div>
                  <div><h3 className="text-xs font-bold text-[#1E293B]">Cybersecurity</h3><p className="text-[9px] text-slate-500 leading-tight">Auth, Vulnerability Testing</p></div>
                </div>
              </div>
            </section>

            {/* GitHub Projects */}
            <section>
              <div className="mb-3 flex justify-between items-end border-b-2 border-blue-100 pb-1">
                <h2 className="text-lg font-black text-[#1E293B]">Top Projects</h2>
                <span className="text-[9px] text-slate-500 font-bold">{projects.length} Repositories</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {projects.slice(0, 4).map(repo => (
                  <div key={repo.id} className="border border-slate-200 rounded-xl p-3 flex flex-col bg-white">
                    <h3 className="text-xs font-bold text-[#1E293B] mb-1 truncate">{repo.name}</h3>
                    <p className="text-[9px] text-slate-500 leading-tight mb-2 flex-1 line-clamp-2">{repo.description || "No description provided."}</p>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-50">
                      <span className="text-[8px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">{repo.language || 'Code'}</span>
                      <div className="flex gap-2 text-[9px] font-bold text-slate-400">
                        <span className="flex items-center gap-0.5"><Star className="w-3 h-3" /> {repo.stargazers_count}</span>
                        <span className="flex items-center gap-0.5"><GitBranch className="w-3 h-3" /> {repo.forks_count}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column (Narrower) */}
          <div className="col-span-5 flex flex-col gap-6">
            
            {/* Certifications & Badges */}
            <section>
              <div className="mb-3">
                <h2 className="text-lg font-black text-[#1E293B] border-b-2 border-amber-100 pb-1 inline-block">Certifications & Badges</h2>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 bg-white p-2.5 rounded-lg border border-slate-100 shadow-sm">
                  <div className="w-8 h-8 bg-amber-50 rounded flex items-center justify-center shrink-0 text-amber-600"><Award className="w-4 h-4"/></div>
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-800">AWS Cloud Practitioner</h4>
                    <p className="text-[8px] text-slate-500">Issued by Amazon Web Services</p>
                  </div>
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 ml-auto" />
                </div>
                <div className="flex items-center gap-3 bg-white p-2.5 rounded-lg border border-slate-100 shadow-sm">
                  <div className="w-8 h-8 bg-blue-50 rounded flex items-center justify-center shrink-0 text-blue-600"><Award className="w-4 h-4"/></div>
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-800">Meta Front-End Developer</h4>
                    <p className="text-[8px] text-slate-500">Issued by Coursera</p>
                  </div>
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 ml-auto" />
                </div>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 shadow flex items-center justify-center text-white text-[8px] font-black border border-white">Top 5%</div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow flex items-center justify-center text-white text-[8px] font-black border border-white">Star</div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow flex items-center justify-center text-white text-[8px] font-black border border-white">Pro</div>
                </div>
              </div>
            </section>

            {/* Assessments & Analytics */}
            <section>
              <div className="mb-3">
                <h2 className="text-lg font-black text-[#1E293B] border-b-2 border-emerald-100 pb-1 inline-block">Assessments</h2>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-[9px] font-bold text-slate-600 mb-1"><span>Aptitude Score</span><span>88%</span></div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full"><div className="h-full bg-blue-500 w-[88%] rounded-full"></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[9px] font-bold text-slate-600 mb-1"><span>Technical Skills</span><span>92%</span></div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full"><div className="h-full bg-emerald-500 w-[92%] rounded-full"></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[9px] font-bold text-slate-600 mb-1"><span>Communication</span><span>85%</span></div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full"><div className="h-full bg-purple-500 w-[85%] rounded-full"></div></div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-700">Overall Readiness</span>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[9px] font-black rounded uppercase">Excellent</span>
                </div>
              </div>
            </section>

          </div>
        </div>
        
        {/* Footer */}
        <div className="px-8 py-3 bg-slate-900 text-center text-[9px] text-slate-400 mt-auto">
          Generated automatically by Capfly Portfolio Engine • {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
};
