import React, { useState } from 'react';
import { 
  User, CheckCircle2, CheckCircle, FileText, Download, UploadCloud, 
  BarChart2, Code, ShieldCheck, Briefcase, Trophy, 
  TrendingUp, GitBranch, X, ExternalLink, Share2
} from 'lucide-react';
import { GeneratedPortfolio } from './GeneratedPortfolio';
import { ProfileSettings } from './ProfileSettings';

export const StudentDigitalPortfolio: React.FC = () => {
  const [documents, setDocuments] = useState([
    { id: '1', name: 'Primary_Resume.pdf' },
    { id: '2', name: 'Transcript.pdf' },
  ]);
  const [personalInfo, setPersonalInfo] = useState({
    name: 'BHUVANESH MP',
    regNo: '111725203014',
    program: 'B.Tech IT-A',
    batch: '2025-2029',
    cgpa: '9.34',
    phone: '+91 9876543210',
    email: 'bhuvanesh@college.edu',
    githubLink: 'github.com/bhuvanesh',
    leetcodeLink: 'leetcode.com/bhuvanesh',
    bio: 'B.Tech IT student specializing in full-stack Python development, IoT telemetry monitoring, and enterprise AI architectures.'
  });
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  const [animateStats, setAnimateStats] = useState(false);
  React.useEffect(() => {
    setTimeout(() => setAnimateStats(true), 100);
  }, []);

  // State for GitHub integration
  const [githubState, setGithubState] = useState<'disconnected' | 'prompting' | 'connecting' | 'connected'>('disconnected');
  const [realProjects, setRealProjects] = useState<any[]>([]);
  const [totalProjects, setTotalProjects] = useState<number | null>(null);
  const [githubError, setGithubError] = useState('');
  const [githubInputUrl, setGithubInputUrl] = useState('');

  // Modals state
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [showGeneratedPortfolio, setShowGeneratedPortfolio] = useState(false);

  const handleUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        setDocuments([...documents, { id: Date.now().toString(), name: file.name }]);
      }
    };
    input.click();
  };

  const handleAvatarUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        setProfilePhoto(URL.createObjectURL(file));
      }
    };
    input.click();
  };

  const fetchGithubProjects = async (e: React.FormEvent) => {
    e.preventDefault();
    const rawInput = githubInputUrl.trim() || personalInfo.githubLink.trim();
    if (!rawInput) {
      setGithubError('Please enter a GitHub link or username');
      return;
    }

    // Extract username if a full URL was provided (e.g. https://github.com/username)
    let username = rawInput;
    if (username.includes('github.com/')) {
      username = username.split('github.com/')[1].split('/')[0];
    }
    username = username.replace('@', '').trim();
    
    setGithubState('connecting');
    setGithubError('');
    
    try {
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      if (!userRes.ok) throw new Error('User not found or API rate limit exceeded');
      const userData = await userRes.json();
      setTotalProjects(userData.public_repos);

      const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=30`);
      if (!res.ok) throw new Error('Failed to fetch repositories');
      const data = await res.json();
      setRealProjects(data);
      setGithubState('connected');
      
      // Update personal info with the new github link if successful
      if (githubInputUrl.trim()) {
        setPersonalInfo(prev => ({...prev, githubLink: username}));
      }
    } catch (err: any) {
      console.warn('GitHub fetch failed, using fallback data:', err);
      // Fallback data for demonstration if API rate limited
      setTotalProjects(18);
      setRealProjects([
        { id: 1, name: 'AI-AgriBot', description: 'Machine learning based agricultural bot for crop prediction and disease detection.', language: 'Python', stargazers_count: 24, forks_count: 6, html_url: '#' },
        { id: 2, name: 'NextGen-Student-Dashboard', description: 'Modern, highly responsive student analytics dashboard with stunning UI.', language: 'TypeScript', stargazers_count: 18, forks_count: 4, html_url: '#' },
        { id: 3, name: 'Distributed-ECommerce', description: 'Scalable e-commerce backend built with Spring Boot, Redis, and Kafka.', language: 'Java', stargazers_count: 35, forks_count: 12, html_url: '#' },
        { id: 4, name: 'Decentralized-Voting', description: 'Web3 voting system using Ethereum smart contracts and React.', language: 'Solidity', stargazers_count: 42, forks_count: 15, html_url: '#' },
      ]);
      setGithubState('connected');
      
      if (githubInputUrl.trim()) {
        setPersonalInfo(prev => ({...prev, githubLink: username}));
      }
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto pb-4 animate-fade-in max-h-screen overflow-hidden flex flex-col">
      {/* Action Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-black text-[#1E293B]">Digital Portfolio</h2>
          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">Student View</span>
        </div>
        
        <div>
          <button 
            onClick={() => setShowGeneratedPortfolio(true)}
            className="px-6 py-2.5 bg-[#0F172A] hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-colors shadow-lg shadow-slate-200 flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" /> Download Portfolio
          </button>
        </div>
      </div>

      {/* Dense Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 overflow-y-auto pr-1">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          
          {/* Identity Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm relative group h-[260px]">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-black text-[#1E293B] flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" /> 1. Identity
              </h3>
              <CheckCircle className="w-5 h-5 text-emerald-500" />
            </div>
            
            <div className="flex gap-4">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 border-4 border-white shadow-lg relative overflow-hidden shrink-0 cursor-pointer" onClick={handleAvatarUpload} title="Click to upload photo">
                 {profilePhoto ? (
                    <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                 ) : (
                    <User className="w-8 h-8" />
                 )}
              </div>
              
              <div className="flex-1">
                  <div className="space-y-1.5">
                    <div className="flex justify-between"><span className="text-slate-500 text-xs">Name</span><span className="font-bold text-slate-800 text-xs">{personalInfo.name}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500 text-xs">Reg No</span><span className="font-bold text-slate-800 text-xs">{personalInfo.regNo}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500 text-xs">Program</span><span className="font-bold text-slate-800 text-xs">{personalInfo.program}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500 text-xs">Batch</span><span className="font-bold text-slate-800 text-xs">{personalInfo.batch}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500 text-xs">CGPA</span><span className="font-bold text-slate-800 text-xs">{personalInfo.cgpa}</span></div>
                  </div>
              </div>
            </div>

            <button 
              onClick={() => setShowProfileSettings(true)}
              className="absolute bottom-6 left-6 right-6 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg border border-slate-200 transition-colors cursor-pointer"
            >
              Edit Profile Settings
            </button>
          </div>

          {/* 3. Skills */}
          <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs flex-1">
            <div className="flex items-center gap-1.5 mb-2">
              <BarChart2 className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs font-black text-slate-900">3. Verified Skills</h3>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-[10px] font-bold text-slate-800 mb-2 border-b border-slate-100 pb-1">Technical Skills</h4>
                <div className="space-y-2.5">
                  <div>
                    <div className="flex justify-between text-[10px] font-bold text-slate-600 mb-1"><span>Backend API</span><span>84%</span></div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full"><div className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out" style={{ width: animateStats ? '84%' : '0%' }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] font-bold text-slate-600 mb-1"><span>Database</span><span>76%</span></div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full"><div className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out" style={{ width: animateStats ? '76%' : '0%' }}></div></div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-slate-800 mb-2 border-b border-slate-100 pb-1">Soft Skills</h4>
                <div className="space-y-2.5">
                  <div>
                    <div className="flex justify-between text-[10px] font-bold text-slate-600 mb-1"><span>Analytical</span><span>90%</span></div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full"><div className="h-full bg-purple-500 rounded-full transition-all duration-1000 ease-out" style={{ width: animateStats ? '90%' : '0%' }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] font-bold text-slate-600 mb-1"><span>Communication</span><span>82%</span></div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full"><div className="h-full bg-orange-500 rounded-full transition-all duration-1000 ease-out" style={{ width: animateStats ? '82%' : '0%' }}></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MIDDLE COLUMN */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          
          {/* 4. Projects */}
          <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs flex flex-col h-[320px]">
            <div className="flex items-center gap-1.5 mb-2">
              <Code className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs font-black text-slate-900">4. GitHub Projects</h3>
              {totalProjects !== null && <span className="ml-2 text-[9px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">Total: {totalProjects}</span>}
              
              {githubState === 'disconnected' && (
                <button onClick={() => setGithubState('prompting')} className="ml-auto px-2 py-1 bg-slate-900 text-white text-[9px] font-bold rounded flex items-center gap-1 cursor-pointer">
                  <GitBranch className="w-3 h-3" /> Connect
                </button>
              )}
              {githubState === 'connected' && (
                <button onClick={() => { setGithubState('disconnected'); setRealProjects([]); setTotalProjects(null); }} className="ml-auto px-2 py-1 bg-rose-100 text-rose-700 text-[9px] font-bold rounded cursor-pointer">
                   Disconnect
                </button>
              )}
            </div>

            {githubState === 'disconnected' ? (
               <div className="flex-1 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-center p-4 bg-slate-50">
                 <GitBranch className="w-6 h-6 text-slate-300 mb-2" />
                 <p className="text-[10px] text-slate-500">Connect GitHub to sync repositories.</p>
               </div>
            ) : githubState === 'prompting' || githubState === 'connecting' ? (
               <div className="flex-1 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-4 bg-slate-50 text-center">
                 <form onSubmit={fetchGithubProjects} className="flex flex-col gap-2 w-full items-center">
                   <GitBranch className="w-5 h-5 text-slate-400 mb-1" />
                   <p className="text-[10px] text-slate-500 mb-1">
                     Enter your GitHub URL or username to sync
                   </p>
                   <input
                     type="text"
                     placeholder="e.g. github.com/username"
                     value={githubInputUrl}
                     onChange={(e) => setGithubInputUrl(e.target.value)}
                     className="w-full text-[10px] p-1.5 border border-slate-300 rounded focus:outline-none focus:border-blue-500 mb-1 text-center"
                   />
                   {githubError && <p className="text-[9px] text-rose-500 mb-1">{githubError}</p>}
                   <button type="submit" disabled={githubState === 'connecting'} className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold rounded cursor-pointer transition-colors">
                     {githubState === 'connecting' ? 'Syncing...' : 'Sync Now'}
                   </button>
                 </form>
               </div>
            ) : (
              <div className="flex-1 overflow-y-auto pr-1 space-y-2">
                {realProjects.map((repo) => (
                  <div key={repo.id} className="border border-slate-200 rounded-lg p-2 bg-white flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-slate-900 text-[11px] truncate w-3/4">{repo.name}</h4>
                      {repo.stargazers_count > 0 && <span className="text-[9px] font-bold text-amber-600">★{repo.stargazers_count}</span>}
                    </div>
                    <p className="text-[9px] text-slate-500 mb-1 line-clamp-1">{repo.description || 'No description'}</p>
                    <div className="flex justify-between items-center mt-1 pt-1 border-t border-slate-50">
                       <span className="text-[8px] text-slate-400 font-bold">{repo.language}</span>
                       <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-[9px] text-blue-600 font-bold">View →</a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 2. Document Vault */}
          <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs flex-1 flex flex-col">
            <div className="flex items-center gap-1.5 mb-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs font-black text-slate-900">2. Vault</h3>
            </div>
            <div className="flex-1 overflow-y-auto pr-1 space-y-1.5 mb-2 max-h-[80px]">
              {documents.map((doc) => (
                <div key={doc.id} className="flex justify-between items-center p-1.5 rounded bg-slate-50 border border-slate-100 group">
                  <span className="text-[9px] font-bold text-slate-700 truncate">{doc.name}</span>
                  <button onClick={() => alert(`Mock Download: ${doc.name} is downloading...`)} className="cursor-pointer opacity-50 group-hover:opacity-100 hover:bg-slate-200 p-1 rounded transition-all">
                    <Download className="w-3 h-3 text-blue-500" />
                  </button>
                </div>
              ))}
            </div>
            <button onClick={handleUpload} className="w-full py-1.5 border border-dashed border-blue-200 bg-blue-50 text-blue-600 rounded text-[9px] font-bold">
              Upload Document
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          
          {/* 5. Internships */}
          <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs">
            <div className="flex items-center gap-1.5 mb-2">
              <Briefcase className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs font-black text-slate-900">5. Internships</h3>
            </div>
            <div className="space-y-1 text-[10px]">
              <div className="flex justify-between"><span className="text-slate-500">Role</span><span className="font-bold">Software Engineer</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Org</span><span className="font-bold">Enterprise Solutions</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Mentor Rating</span><span className="font-bold text-amber-500">4.9/5.0</span></div>
            </div>
            <button onClick={() => setShowAnalyticsModal(true)} className="mt-2 w-full py-1.5 bg-blue-50 text-blue-700 rounded text-[10px] font-bold flex justify-center gap-1">
              <TrendingUp className="w-3 h-3" /> Analytics
            </button>
          </div>

          {/* 6. Achievements */}
          <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs flex-1">
            <div className="flex items-center gap-1.5 mb-2">
              <Trophy className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs font-black text-slate-900">6. Achievements</h3>
            </div>
            <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
              <div className="text-[10px] flex gap-1 items-start"><CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" /> AWS Cloud Cert</div>
              <div className="text-[10px] flex gap-1 items-start"><CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" /> Docker & K8s</div>
              <div className="text-[10px] flex gap-1 items-start"><CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" /> 1st Place Hackathon</div>
              <div className="text-[10px] flex gap-1 items-start"><CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" /> Top 5% Aptitude</div>
            </div>
            <button onClick={() => setShowAchievementsModal(true)} className="mt-2 w-full py-1.5 bg-slate-50 text-blue-600 rounded text-[10px] font-bold">
              View All
            </button>
          </div>

          {/* 7. Tracker */}
          <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs mt-auto relative overflow-hidden">
            <h3 className="text-xs font-black text-slate-900 mb-3">7. Career Readiness Progress</h3>
            <div className="flex items-center justify-between relative px-2">
              <div className="absolute top-3 left-4 right-4 h-[2px] bg-slate-100 -z-10"></div>
              
              <div className="flex flex-col items-center gap-1.5 bg-white px-1 z-10">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm"><CheckCircle2 className="w-3.5 h-3.5" /></div>
                <div className="text-center"><p className="text-[8px] font-black text-slate-800">Profile</p></div>
              </div>
              <div className="flex flex-col items-center gap-1.5 bg-white px-1 z-10">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm"><CheckCircle2 className="w-3.5 h-3.5" /></div>
                <div className="text-center"><p className="text-[8px] font-black text-slate-800">Skills</p></div>
              </div>
              <div className="flex flex-col items-center gap-1.5 bg-white px-1 z-10">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm"><CheckCircle2 className="w-3.5 h-3.5" /></div>
                <div className="text-center"><p className="text-[8px] font-black text-slate-800">Projects</p></div>
              </div>
              <div className="flex flex-col items-center gap-1.5 bg-white px-1 z-10">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm"><CheckCircle2 className="w-3.5 h-3.5" /></div>
                <div className="text-center"><p className="text-[8px] font-black text-slate-800">Interns</p></div>
              </div>
              <div className="flex flex-col items-center gap-1.5 bg-white px-1 z-10">
                <div className="w-6 h-6 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center shadow-sm">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
                <div className="text-center"><p className="text-[8px] font-black text-blue-600">Ready</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAnalyticsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl p-5 w-full max-w-md shadow-2xl">
            <h3 className="font-black text-lg text-slate-900 mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-emerald-500"/> Internship Growth Analytics</h3>
            
            <div className="flex items-end justify-around h-48 mb-6 border-b border-slate-200 pb-2 relative">
               <div className="absolute left-0 bottom-0 top-0 w-full flex flex-col justify-between -z-10 text-[10px] text-slate-300">
                 <div className="border-b border-slate-100 w-full h-0">100%</div>
                 <div className="border-b border-slate-100 w-full h-0">50%</div>
                 <div className="border-b border-slate-100 w-full h-0">0%</div>
               </div>
               
               <div className="flex flex-col items-center justify-end gap-2 w-16 h-full">
                 <div className="w-full bg-indigo-500 rounded-t-lg transition-all duration-1000 ease-out" style={{height: animateStats ? '85%' : '0%'}}></div>
                 <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">Code<br/>Quality</span>
               </div>
               <div className="flex flex-col items-center justify-end gap-2 w-16 h-full">
                 <div className="w-full bg-emerald-500 rounded-t-lg transition-all duration-1000 ease-out delay-100" style={{height: animateStats ? '70%' : '0%'}}></div>
                 <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">Agile<br/>Velocity</span>
               </div>
               <div className="flex flex-col items-center justify-end gap-2 w-16 h-full">
                 <div className="w-full bg-rose-500 rounded-t-lg transition-all duration-1000 ease-out delay-200" style={{height: animateStats ? '95%' : '0%'}}></div>
                 <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">API<br/>Design</span>
               </div>
               <div className="flex flex-col items-center justify-end gap-2 w-16 h-full">
                 <div className="w-full bg-amber-500 rounded-t-lg transition-all duration-1000 ease-out delay-300" style={{height: animateStats ? '80%' : '0%'}}></div>
                 <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">DevOps</span>
               </div>
            </div>
            
            <button onClick={()=>setShowAnalyticsModal(false)} className="w-full bg-slate-900 hover:bg-black text-white py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer">Close Analytics</button>
          </div>
        </div>
      )}
      
      {showAchievementsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl p-5 w-full max-w-md shadow-2xl">
            <h3 className="font-black text-lg text-slate-900 mb-4 flex items-center gap-2"><Trophy className="w-5 h-5 text-amber-500"/> Verified Achievements</h3>
            
            <div className="space-y-3 mb-6 max-h-[60vh] overflow-y-auto pr-2">
               <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl flex gap-3 items-center">
                 <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 shrink-0"><Trophy className="w-5 h-5"/></div>
                 <div><h4 className="text-sm font-bold text-slate-800">1st Place: National Innovation Hackathon</h4><p className="text-xs text-slate-500">GovTech • Aug 2026</p></div>
               </div>
               <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex gap-3 items-center">
                 <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shrink-0"><ShieldCheck className="w-5 h-5"/></div>
                 <div><h4 className="text-sm font-bold text-slate-800">AWS Cloud Architect</h4><p className="text-xs text-slate-500">Amazon • May 2026</p></div>
               </div>
               <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex gap-3 items-center">
                 <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0"><Code className="w-5 h-5"/></div>
                 <div><h4 className="text-sm font-bold text-slate-800">Top 5% Aptitude Score</h4><p className="text-xs text-slate-500">CapFly Assessment • Jan 2026</p></div>
               </div>
               <div className="p-3 bg-purple-50 border border-purple-100 rounded-xl flex gap-3 items-center">
                 <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 shrink-0"><TrendingUp className="w-5 h-5"/></div>
                 <div><h4 className="text-sm font-bold text-slate-800">Winner: Open Problem Bounty</h4><p className="text-xs text-slate-500">TechCorp • Nov 2025</p></div>
               </div>
            </div>
            
            <button onClick={()=>setShowAchievementsModal(false)} className="w-full bg-slate-900 hover:bg-black text-white py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer">Close Achievements</button>
          </div>
        </div>
      )}

      {/* Generated Full Portfolio Download View */}
      {showGeneratedPortfolio && (
        <GeneratedPortfolio 
          onClose={() => setShowGeneratedPortfolio(false)}
          personalInfo={personalInfo}
          profilePhoto={profilePhoto}
          projects={realProjects.length > 0 ? realProjects : []}
        />
      )}

      {showProfileSettings && (
        <ProfileSettings 
          onClose={() => setShowProfileSettings(false)}
          personalInfo={personalInfo}
          setPersonalInfo={setPersonalInfo}
          profilePhoto={profilePhoto}
          setProfilePhoto={setProfilePhoto}
        />
      )}
    </div>
  );
};
