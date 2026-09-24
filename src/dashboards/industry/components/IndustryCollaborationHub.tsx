import React, { useState } from 'react';
import { 
  FileText, Video, Users, CheckSquare, Plus, Calendar, Monitor, Star, 
  Clock, Search, Filter, Building2, Upload, ExternalLink, CheckCircle2, XCircle,
  X, Sparkles, Check, Edit, UserPlus, Eye, Award
} from 'lucide-react';

type CollabSubTab = 'problems' | 'webinars' | 'mentors' | 'reviews';

export const IndustryCollaborationHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CollabSubTab>('problems');
  const [searchTeam, setSearchTeam] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // ── State for Problem Statements ──
  const [problems, setProblems] = useState([
    { id: 'ps-1', title: 'AI-Powered Supply Chain Optimizer', category: 'Hackathon Prompt', date: 'Posted 2 days ago', applications: 14, status: 'Active', description: 'Optimize last-mile delivery routes using graph algorithms and real-time traffic data.' },
    { id: 'ps-2', title: 'Edge Computing for Remote Diagnostics', category: 'Capstone Topic', date: 'Posted 1 week ago', applications: 8, status: 'Active', description: 'Deploy micro-AI models on low-power IoT gateways for medical telemetry.' },
    { id: 'ps-3', title: 'Zero-Trust Architecture Implementation', category: 'Corporate Challenge', date: 'Posted 2 weeks ago', applications: 32, status: 'Closing Soon', description: 'Implement dynamic IAM policies and micro-segmentation for hybrid cloud environments.' }
  ]);
  const [isPostProblemModalOpen, setPostProblemModalOpen] = useState(false);
  const [isManageProblemModalOpen, setManageProblemModalOpen] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState<any>(null);
  const [newProblem, setNewProblem] = useState({ title: '', category: 'Hackathon Prompt', description: '' });

  // ── State for Webinars ──
  const [webinars, setWebinars] = useState([
    { id: 'w-1', title: 'Masterclass: Cloud Native Microservices', date: 'Oct 24, 2026', time: '10:00 AM - 12:00 PM', speaker: 'Dr. Alan Smith (Principal Engineer)', registrations: 120 },
    { id: 'w-2', title: 'Workshop: Introduction to MLOps', date: 'Oct 28, 2026', time: '02:00 PM - 05:00 PM', speaker: 'Sarah Jones (Lead Data Scientist)', registrations: 85 },
  ]);
  const [isScheduleWebinarModalOpen, setScheduleWebinarModalOpen] = useState(false);
  const [isEditWebinarModalOpen, setEditWebinarModalOpen] = useState(false);
  const [selectedWebinar, setSelectedWebinar] = useState<any>(null);
  const [newWebinar, setNewWebinar] = useState({ title: '', date: '', time: '', speaker: '' });

  // ── State for Mentors & Teams ──
  const [mentors, setMentors] = useState([
    { id: 'm-1', name: 'John Doe', role: 'Sr. Backend Dev', activeTeams: 2, capacity: 3 },
    { id: 'm-2', name: 'Jane Smith', role: 'Lead Data Eng', activeTeams: 1, capacity: 2 },
    { id: 'm-3', name: 'Alice Johnson', role: 'Cloud Architect', activeTeams: 3, capacity: 3 },
  ]);

  const [teams, setTeams] = useState([
    { id: 't-1', name: 'Team Innovators', inst: 'IIT Madras', project: 'AI Supply Chain', matchScore: 92, assignedMentor: null as string | null },
    { id: 't-2', name: 'Cloud Architects', inst: 'Anna University', project: 'Zero-Trust Architecture', matchScore: 85, assignedMentor: null as string | null },
    { id: 't-3', name: 'Cyber Sentinels', inst: 'NIT Trichy', project: 'Edge Computing Diagnostics', matchScore: 89, assignedMentor: 'John Doe' },
  ]);
  const [isAssignMentorModalOpen, setAssignMentorModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const [selectedMentorName, setSelectedMentorName] = useState<string>('');

  // ── State for Submissions Review ──
  const [submissions, setSubmissions] = useState([
    { id: 'sub-1', team: 'Data Miners', type: 'Capstone Prototype', date: 'Submitted Oct 18', status: 'Needs Review', repoUrl: 'https://github.com/dataminers/capstone', score: null as number | null },
    { id: 'sub-2', team: 'SecureNet', type: 'Hackathon Final Code', date: 'Submitted Oct 17', status: 'In Review', repoUrl: 'https://github.com/securenet/zerotrust', score: null as number | null },
    { id: 'sub-3', team: 'HealthTech Squad', type: 'Edge Telemetry Project', date: 'Submitted Oct 15', status: 'Approved', repoUrl: 'https://github.com/healthtech/edge-ai', score: 94 },
  ]);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [reviewGrade, setReviewGrade] = useState<number>(90);
  const [reviewComments, setReviewComments] = useState<string>('');

  // Handlers
  const handlePostProblemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created = {
      id: `ps-${Date.now()}`,
      title: newProblem.title,
      category: newProblem.category,
      date: 'Posted Just Now',
      applications: 0,
      status: 'Active',
      description: newProblem.description
    };
    setProblems([created, ...problems]);
    setPostProblemModalOpen(false);
    setNewProblem({ title: '', category: 'Hackathon Prompt', description: '' });
    triggerToast(`🎉 New Problem Statement "${created.title}" published!`);
  };

  const handleScheduleWebinarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created = {
      id: `w-${Date.now()}`,
      title: newWebinar.title,
      date: newWebinar.date || 'Nov 10, 2026',
      time: newWebinar.time || '10:00 AM - 11:30 AM',
      speaker: newWebinar.speaker || 'Corporate Lead',
      registrations: 0
    };
    setWebinars([created, ...webinars]);
    setScheduleWebinarModalOpen(false);
    setNewWebinar({ title: '', date: '', time: '', speaker: '' });
    triggerToast(`📅 Masterclass "${created.title}" scheduled!`);
  };

  const handleAssignMentorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeam || !selectedMentorName) return;

    setTeams(teams.map(t => t.id === selectedTeam.id ? { ...t, assignedMentor: selectedMentorName } : t));
    setMentors(mentors.map(m => m.name === selectedMentorName ? { ...m, activeTeams: m.activeTeams + 1 } : m));

    setAssignMentorModalOpen(false);
    triggerToast(`👤 Mentor ${selectedMentorName} assigned to ${selectedTeam.name}!`);
  };

  const handleApproveSubmission = (id: string, grade: number) => {
    setSubmissions(submissions.map(s => s.id === id ? { ...s, status: 'Approved', score: grade } : s));
    setReviewModalOpen(false);
    triggerToast(`✅ Submission from ${selectedSubmission?.team} approved with score ${grade}/100!`);
  };

  const handleRejectSubmission = (id: string) => {
    setSubmissions(submissions.map(s => s.id === id ? { ...s, status: 'Changes Requested' } : s));
    setReviewModalOpen(false);
    triggerToast(`⚠️ Feedback & change request sent to ${selectedSubmission?.team}.`);
  };

  const filteredTeams = teams.filter(t => 
    t.name.toLowerCase().includes(searchTeam.toLowerCase()) || 
    t.inst.toLowerCase().includes(searchTeam.toLowerCase()) ||
    t.project.toLowerCase().includes(searchTeam.toLowerCase())
  );

  return (
    <div className="space-y-5 relative animate-fade-in">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-[999] bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* ── Header ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 font-['Outfit']">Collaboration Hub</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manage corporate challenges, webinars, mentors, and review student capstone submissions.
            </p>
          </div>
          {activeTab === 'problems' && (
            <button 
              onClick={() => setPostProblemModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Post New Problem
            </button>
          )}
          {activeTab === 'webinars' && (
            <button 
              onClick={() => setScheduleWebinarModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-colors cursor-pointer"
            >
              <Video className="w-4 h-4" /> Schedule Webinar
            </button>
          )}
        </div>

        {/* ── Tabs ── */}
        <div className="px-5 py-1.5 flex items-center gap-6 overflow-x-auto border-b border-slate-200 bg-slate-50/50">
          {[
            { id: 'problems', label: 'Problem Statements', icon: FileText },
            { id: 'webinars', label: 'Webinars & Workshops', icon: Video },
            { id: 'mentors', label: 'Mentor Allocation', icon: Users },
            { id: 'reviews', label: 'Submission Review', icon: CheckSquare },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as CollabSubTab)}
                className={`py-3 text-sm font-bold border-b-2 transition-colors shrink-0 flex items-center gap-2 cursor-pointer ${
                  isActive 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" /> {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Content Area ── */}
      <div className="space-y-4">
        
        {/* 1. Problem Statements */}
        {activeTab === 'problems' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-fade-in">
            {problems.map(item => (
              <div key={item.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                      {item.category}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                      item.status === 'Active' ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-amber-700 bg-amber-50 border-amber-200'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <h3 className="font-black text-slate-900 text-base font-['Outfit']">{item.title}</h3>
                  <p className="text-xs text-slate-600 mt-2 font-medium line-clamp-2">{item.description}</p>
                  <p className="text-xs text-slate-400 mt-2 flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5" /> {item.date}
                  </p>
                </div>
                <div className="mt-5 flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="text-sm font-bold text-slate-700">{item.applications} Teams Applied</span>
                  <button 
                    onClick={() => { setSelectedProblem(item); setManageProblemModalOpen(true); }}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer flex items-center gap-1"
                  >
                    Manage <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. Webinars & Workshops */}
        {activeTab === 'webinars' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden animate-fade-in">
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Upcoming Sessions</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {webinars.map(item => (
                <div key={item.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <Monitor className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-500 font-medium mt-1">Speaker: {item.speaker}</p>
                      <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-500 font-semibold">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {item.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {item.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 border-t md:border-t-0 border-slate-100 pt-3 md:pt-0">
                    <div className="text-right">
                      <div className="text-sm font-black text-slate-900">{item.registrations}</div>
                      <div className="text-[10px] uppercase tracking-wide text-slate-500 font-bold">Registered</div>
                    </div>
                    <button 
                      onClick={() => { setSelectedWebinar(item); setEditWebinarModalOpen(true); }}
                      className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Edit className="w-3.5 h-3.5" /> Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Mentor Allocation */}
        {activeTab === 'mentors' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
            {/* Mentors List */}
            <div className="md:col-span-1 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col h-[520px]">
              <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm">Corporate Mentors</h3>
                <span className="text-[10px] font-bold text-slate-500">{mentors.length} Available</span>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
                {mentors.map((mentor) => (
                  <div key={mentor.id} className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 cursor-pointer transition-colors">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-800 text-sm">{mentor.name}</h4>
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Mentor</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">{mentor.role}</p>
                    <div className="mt-2.5 flex items-center justify-between text-[10px] font-bold">
                      <span className="text-slate-600">Assigned Teams:</span>
                      <span className={`${mentor.activeTeams >= mentor.capacity ? 'text-rose-600 font-black' : 'text-emerald-600 font-black'}`}>
                        {mentor.activeTeams} / {mentor.capacity}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${mentor.activeTeams >= mentor.capacity ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                        style={{ width: `${Math.min(100, (mentor.activeTeams / mentor.capacity) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Allocation Area */}
            <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col h-[520px]">
              <div className="p-4 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="font-bold text-slate-900 text-sm">Student Teams (Mentor Allocation)</h3>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    value={searchTeam}
                    onChange={(e) => setSearchTeam(e.target.value)}
                    placeholder="Search teams or projects..." 
                    className="pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs w-full sm:w-56 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {filteredTeams.map(team => (
                  <div key={team.id} className="p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-black text-slate-900 text-sm">{team.name}</h4>
                        {team.assignedMentor ? (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                            <Check className="w-3 h-3" /> Mentor: {team.assignedMentor}
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                            Pending Mentor
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mt-1">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" /> {team.inst}
                      </div>
                      <div className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200 mt-2 inline-block">
                        Project: {team.project}
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                      <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200 flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-current text-emerald-500" /> {team.matchScore}% AI Match
                      </div>
                      <button 
                        onClick={() => { setSelectedTeam(team); setSelectedMentorName(mentors[0]?.name || ''); setAssignMentorModalOpen(true); }}
                        className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <UserPlus className="w-3.5 h-3.5" /> {team.assignedMentor ? 'Reassign Mentor' : 'Assign Mentor'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. Submission Review & Grading */}
        {activeTab === 'reviews' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden animate-fade-in">
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Capstone & Hackathon Submissions</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {submissions.map(sub => (
                <div key={sub.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                      sub.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-amber-50 text-amber-600 border-amber-200'
                    }`}>
                      <Upload className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-sm">{sub.team}</h4>
                        {sub.score && (
                          <span className="text-[10px] font-black text-violet-700 bg-violet-50 border border-violet-200 px-2 py-0.5 rounded flex items-center gap-1">
                            <Award className="w-3 h-3" /> Score: {sub.score}/100
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-slate-600 mt-0.5">{sub.type}</p>
                      <p className="text-[10px] text-slate-400 mt-1">{sub.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      sub.status === 'Approved' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : sub.status === 'Changes Requested'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {sub.status}
                    </span>
                    <button 
                      onClick={() => { setSelectedSubmission(sub); setReviewModalOpen(true); }}
                      className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" /> Review Files
                    </button>
                    <div className="flex items-center gap-1 border-l border-slate-200 pl-3">
                      <button 
                        onClick={() => handleApproveSubmission(sub.id, 92)} 
                        className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer" 
                        title="Approve Submission"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleRejectSubmission(sub.id)} 
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer" 
                        title="Request Changes"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── MODALS ── */}

      {/* MODAL 1: POST NEW PROBLEM */}
      {isPostProblemModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-black text-slate-900 text-lg">Post Corporate Problem Statement</h3>
              <button onClick={() => setPostProblemModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer"><X className="w-5 h-5"/></button>
            </div>
            <form onSubmit={handlePostProblemSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Problem Title *</label>
                <input 
                  required 
                  type="text" 
                  value={newProblem.title}
                  onChange={e => setNewProblem({ ...newProblem, title: e.target.value })}
                  placeholder="e.g. Real-Time Fraud Detection Engine" 
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Category *</label>
                <select 
                  value={newProblem.category}
                  onChange={e => setNewProblem({ ...newProblem, category: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="Hackathon Prompt">Hackathon Prompt</option>
                  <option value="Capstone Topic">Capstone Topic</option>
                  <option value="Corporate Challenge">Corporate Challenge</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Problem Description & Objectives *</label>
                <textarea 
                  required
                  rows={4}
                  value={newProblem.description}
                  onChange={e => setNewProblem({ ...newProblem, description: e.target.value })}
                  placeholder="Detail the technical background, constraints, and target outcomes for students..." 
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 resize-none" 
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setPostProblemModalOpen(false)} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer">Cancel</button>
                <button type="submit" className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm cursor-pointer">Publish Problem</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: SCHEDULE WEBINAR */}
      {isScheduleWebinarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-black text-slate-900 text-lg">Schedule Masterclass / Webinar</h3>
              <button onClick={() => setScheduleWebinarModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer"><X className="w-5 h-5"/></button>
            </div>
            <form onSubmit={handleScheduleWebinarSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Session Title *</label>
                <input 
                  required 
                  type="text" 
                  value={newWebinar.title}
                  onChange={e => setNewWebinar({ ...newWebinar, title: e.target.value })}
                  placeholder="e.g. Scalable Kubernetes in Production" 
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Date *</label>
                  <input 
                    required 
                    type="date" 
                    value={newWebinar.date}
                    onChange={e => setNewWebinar({ ...newWebinar, date: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 cursor-pointer" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Time Slot *</label>
                  <input 
                    required 
                    type="text" 
                    value={newWebinar.time}
                    onChange={e => setNewWebinar({ ...newWebinar, time: e.target.value })}
                    placeholder="e.g. 10:00 AM - 11:30 AM" 
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Speaker Name & Role *</label>
                <input 
                  required 
                  type="text" 
                  value={newWebinar.speaker}
                  onChange={e => setNewWebinar({ ...newWebinar, speaker: e.target.value })}
                  placeholder="e.g. Dr. Alan Smith (Principal Engineer)" 
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" 
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setScheduleWebinarModalOpen(false)} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer">Cancel</button>
                <button type="submit" className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm cursor-pointer">Schedule Session</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: ASSIGN MENTOR MODAL */}
      {isAssignMentorModalOpen && selectedTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-black text-slate-900 text-lg">Assign Corporate Mentor</h3>
              <button onClick={() => setAssignMentorModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer"><X className="w-5 h-5"/></button>
            </div>
            <form onSubmit={handleAssignMentorSubmit} className="p-6 space-y-4">
              <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-100 text-sm">
                <h4 className="font-bold text-slate-900">{selectedTeam.name}</h4>
                <p className="text-xs text-slate-600">{selectedTeam.inst} • Project: {selectedTeam.project}</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Select Mentor *</label>
                <select 
                  value={selectedMentorName}
                  onChange={e => setSelectedMentorName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 cursor-pointer font-medium"
                >
                  {mentors.map(m => (
                    <option key={m.id} value={m.name}>
                      {m.name} ({m.role}) — {m.activeTeams}/{m.capacity} Teams
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setAssignMentorModalOpen(false)} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer">Cancel</button>
                <button type="submit" className="px-6 py-2.5 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-sm cursor-pointer">Confirm Assignment</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: SUBMISSION REVIEW & GRADING MODAL */}
      {isReviewModalOpen && selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-black text-slate-900 text-lg">Review Student Submission</h3>
              <button onClick={() => setReviewModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer"><X className="w-5 h-5"/></button>
            </div>
            
            <div className="p-6 space-y-5">
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-black text-slate-900">{selectedSubmission.team}</h4>
                  <span className="text-xs font-bold text-slate-500">{selectedSubmission.date}</span>
                </div>
                <p className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded inline-block mt-1">
                  {selectedSubmission.type}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700">Code Repository:</span>
                  <a href={selectedSubmission.repoUrl} target="_blank" rel="noreferrer" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                    {selectedSubmission.repoUrl} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700">Documentation & Architecture:</span>
                  <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> PDF Verified
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Assign Evaluation Score (0-100)</label>
                <div className="flex items-center gap-4">
                  <input 
                    type="range" 
                    min="50" 
                    max="100" 
                    value={reviewGrade}
                    onChange={e => setReviewGrade(Number(e.target.value))}
                    className="flex-1 accent-blue-600 cursor-pointer"
                  />
                  <span className="w-12 text-center text-lg font-black text-slate-900 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200">
                    {reviewGrade}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Feedback / Comments</label>
                <textarea 
                  rows={3}
                  value={reviewComments}
                  onChange={e => setReviewComments(e.target.value)}
                  placeholder="Add feedback for the student team..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => handleRejectSubmission(selectedSubmission.id)}
                  className="px-5 py-2.5 text-sm font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl cursor-pointer"
                >
                  Request Changes
                </button>
                <button 
                  type="button" 
                  onClick={() => handleApproveSubmission(selectedSubmission.id, reviewGrade)}
                  className="px-6 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" /> Approve &amp; Grade
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: EDIT WEBINAR */}
      {isEditWebinarModalOpen && selectedWebinar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-black text-slate-900 text-lg">Edit Webinar Session</h3>
              <button onClick={() => setEditWebinarModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer"><X className="w-5 h-5"/></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Session Title</label>
                <input 
                  type="text" 
                  defaultValue={selectedWebinar.title} 
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" 
                />
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
                Current Registrations: <span className="font-bold text-slate-900">{selectedWebinar.registrations} Students</span>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button onClick={() => setEditWebinarModalOpen(false)} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer">Cancel</button>
                <button 
                  onClick={() => {
                    setEditWebinarModalOpen(false);
                    triggerToast(`Session details updated for ${selectedWebinar.title}!`);
                  }} 
                  className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl cursor-pointer shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
