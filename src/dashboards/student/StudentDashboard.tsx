import React, { useState, useEffect } from 'react';
import { PlayCircle, Clock, CheckCircle2, Video, Calendar as CalendarIcon, Link as LinkIcon, ExternalLink, X, ChevronLeft, ChevronRight, Monitor, Lightbulb, Star } from 'lucide-react';
import { StudentHeader } from './components/StudentHeader';
import { StudentSidebar } from './components/StudentSidebar';
import { StudentOpportunitiesHub } from './components/StudentOpportunitiesHub';
import { StudentLearnHub } from './components/StudentLearnHub';
import { StudentSkillsHub } from './components/StudentSkillsHub';
import { StudentDigitalPortfolio } from './components/StudentDigitalPortfolio';
import { StudentCollaborationHub } from './components/StudentCollaborationHub';
import { StudentRoadmaps } from './components/StudentRoadmaps';
import { StudentLeaderboardWidget } from './components/StudentLeaderboardWidget';
import { StudentDailyGoalsWidget } from './components/StudentDailyGoalsWidget';
import type { StudentTabType } from './components/StudentSidebar';

const getQuestionsForTest = (title: string, skills: string) => {
  const isWeb = /web|react|html|css|js|frontend/i.test(skills) || /web|frontend/i.test(title);
  const isCloud = /cloud|docker|kubernetes|aws|devops/i.test(skills) || /cloud|devops/i.test(title);
  const isData = /data|algorithm|array|tree|linked list/i.test(skills) || /data|algorithm/i.test(title);

  if (isWeb) {
    return [
      { q: 'Which of the following is NOT a semantic HTML element?', options: ['<article>', '<div>', '<header>', '<nav>'], ans: 1 },
      { q: 'What does CSS stand for?', options: ['Computer Style Sheets', 'Creative Style Sheets', 'Cascading Style Sheets', 'Colorful Style Sheets'], ans: 2 },
      { q: 'In React, what hook is used to manage side effects?', options: ['useState', 'useContext', 'useEffect', 'useReducer'], ans: 2 },
      { q: 'What is the virtual DOM in React?', options: ['A direct copy of the real DOM', 'A lightweight JavaScript representation of the DOM', 'A separate browser window', 'A state management library'], ans: 1 },
      { q: 'Which method is used to convert a JSON object into a string?', options: ['JSON.parse()', 'JSON.toString()', 'JSON.stringify()', 'JSON.objectify()'], ans: 2 },
      { q: 'What does the "use strict" directive do in JavaScript?', options: ['Enforces stricter parsing and error handling', 'Prevents the use of strict operators', 'Requires all variables to be strongly typed', 'None of the above'], ans: 0 },
    ];
  } else if (isCloud) {
    return [
      { q: 'What is Docker primarily used for?', options: ['Virtualizing hardware', 'Containerizing applications', 'Managing databases', 'Load balancing'], ans: 1 },
      { q: 'Which of the following is a key feature of Kubernetes?', options: ['Automated rollouts and rollbacks', 'Object-relational mapping', 'Client-side routing', 'CSS preprocessing'], ans: 0 },
      { q: 'What is a "Pod" in Kubernetes?', options: ['A type of cloud storage', 'The smallest deployable computing unit', 'A load balancer', 'A container registry'], ans: 1 },
      { q: 'Which AWS service is used for scalable object storage?', options: ['Amazon EC2', 'Amazon RDS', 'Amazon S3', 'AWS Lambda'], ans: 2 },
      { q: 'What is Infrastructure as Code (IaC)?', options: ['Writing infrastructure logic in C++', 'Managing infrastructure using configuration files', 'A type of malware', 'A cloud IDE'], ans: 1 },
      { q: 'Which tool is commonly used for IaC?', options: ['Terraform', 'React', 'MongoDB', 'Webpack'], ans: 0 },
    ];
  } else if (isData) {
    return [
      { q: 'What is the time complexity of searching an element in a balanced BST?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'], ans: 2 },
      { q: 'Which data structure uses LIFO (Last In First Out)?', options: ['Queue', 'Stack', 'Array', 'Linked List'], ans: 1 },
      { q: 'What is the worst-case time complexity of QuickSort?', options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'], ans: 2 },
      { q: 'Which data structure is ideal for implementing a priority queue?', options: ['Array', 'Stack', 'Heap', 'Linked List'], ans: 2 },
      { q: 'What does BFS stand for in graph traversal?', options: ['Binary First Search', 'Breadth First Search', 'Best First Search', 'Basic First Search'], ans: 1 },
      { q: 'Which sorting algorithm is most efficient for nearly sorted arrays?', options: ['QuickSort', 'MergeSort', 'Insertion Sort', 'Selection Sort'], ans: 2 },
    ];
  } else {
    const topic = skills.split(',')[0] || 'the core concept';
    return [
      { q: `What is the primary advantage of ${topic}?`, options: ['Improves compilation speed', 'Enhances scalability and decoupling', 'Reduces memory footprint by 90%', 'Automatically fixes syntax errors'], ans: 1 },
      { q: `Which design pattern is most commonly associated with ${topic}?`, options: ['Singleton', 'Observer', 'Factory', 'MVC'], ans: 1 },
      { q: `How does ${topic} handle state management?`, options: ['It uses local storage', 'It is completely stateless', 'It maintains internal state', 'It depends on the database'], ans: 2 },
      { q: `What is a known limitation of ${topic}?`, options: ['Too much boilerplate code', 'Single point of failure', 'Lack of community support', 'High latency'], ans: 0 },
      { q: `Which of these tools is commonly used alongside ${topic}?`, options: ['Webpack', 'Docker', 'Jenkins', 'All of the above'], ans: 3 },
      { q: `When should you NOT use ${topic}?`, options: ['For small applications', 'For enterprise applications', 'For real-time data processing', 'Never'], ans: 0 },
    ];
  }
};

interface StudentDashboardProps {
  onLogout?: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onLogout }) => {
  const [currentTab, setCurrentTab] = useState<StudentTabType>('dashboard');
  const [assignedAssessments, setAssignedAssessments] = useState<any[]>([]);
  const [activeTest, setActiveTest] = useState<any>(null);
  const [testTimeLeft, setTestTimeLeft] = useState(30 * 60);
  const [testState, setTestState] = useState<'active' | 'results'>('active');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const [goals, setGoals] = useState([
    { id: 1, title: 'Complete 2 Core Diagnostics', subtext: '2 of 2 Completed', progress: '100%', color: 'emerald', done: false },
    { id: 2, title: 'Solve 5 Arena Challenges', subtext: '4 of 5 Solved', progress: '80%', color: 'blue', done: false },
    { id: 3, title: 'PR Review for Microservices Capstone', subtext: 'Review In Progress', progress: '50%', color: 'amber', done: false }
  ]);

  const toggleGoal = (id: number) => {
    setGoals(goals.map(g => g.id === id ? { ...g, done: !g.done } : g));
  };

  const [activeNewsIndex, setActiveNewsIndex] = useState(0);

  const techNews = [
    {
      tag: 'BREAKING', tagColor: 'emerald',
      title: 'Open AI introduces GPT-6 Astra',
      desc: 'An omni-model solving logic gaps up to 3x faster than previous iterations.',
      img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=150&h=100'
    },
    {
      tag: 'TRENDING', tagColor: 'amber',
      title: "Meta's Llama-4 goes completely open-source",
      desc: 'Shaking the AI industry and democratizing advanced NLP capabilities for developers.',
      img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=150&h=100'
    },
    {
      tag: 'UPDATE', tagColor: 'blue',
      title: 'Apple drops new Passkeys API updates',
      desc: 'Eliminating traditional passwords for enterprise accounts by Q4.',
      img: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80&w=150&h=100'
    }
  ];

  const handleNextNews = () => setActiveNewsIndex((prev) => (prev + 1) % techNews.length);
  const handlePrevNews = () => setActiveNewsIndex((prev) => (prev - 1 + techNews.length) % techNews.length);

  useEffect(() => {
    const loadState = () => {
      const saved = localStorage.getItem('capfly_assigned_blueprints');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setAssignedAssessments(parsed.filter((b: any) => b.assigned));
        } catch (e) {}
      }
    };
    loadState();
    const interval = setInterval(loadState, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!activeTest || testTimeLeft <= 0) return;
    const interval = setInterval(() => {
      setTestTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [activeTest, testTimeLeft]);

  const handleStartTest = (test: any) => {
    setActiveTest(test);
    setTestTimeLeft(30 * 60); // 30 mins
    setTestState('active');
    setSelectedAnswers({});
  };

  const closeTest = () => {
    setActiveTest(null);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7FB] text-slate-900 font-sans">
      {/* Top Header Bar & Sub-Header Bar */}
      <StudentHeader onLogout={handleLogout} currentTab={currentTab} />

      {/* Main Body: Left Vertical Sidebar + Content Canvas */}
      <div className="flex-1 flex flex-col md:flex-row w-full">
        {/* Vertical Left Navigation Sidebar */}
        <StudentSidebar currentTab={currentTab} onSelectTab={setCurrentTab} />

        {/* Content Canvas */}
        <main className="flex-1 p-3 overflow-y-auto w-full">
          {/* Tab 1: Dashboard */}
          {/* Tab 1: Dashboard */}
          {currentTab === 'dashboard' && (
            <div className="space-y-3">
              {/* Tech Newsletter Carousel */}
              <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex items-center h-16 relative group">
                <div className="bg-blue-600 h-full px-4 flex items-center justify-center relative z-10 shrink-0 w-28">
                  <span className="font-black text-white text-[10px] uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                    Tech News
                  </span>
                  <div className="absolute -right-3 top-0 bottom-0 w-3 bg-blue-600 [clip-path:polygon(0_0,0_100%,100%_50%)]"></div>
                </div>
                
                <div className="flex-1 h-full ml-6 relative flex items-center justify-between pr-4">
                   <div className="flex items-center gap-4 animate-fade-in" key={activeNewsIndex}>
                     <img src={techNews[activeNewsIndex].img} alt="News thumbnail" className="w-16 h-10 object-cover rounded-lg shadow-sm border border-slate-200 shrink-0" />
                     <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className={`text-${techNews[activeNewsIndex].tagColor}-700 font-bold px-1.5 py-0.5 bg-${techNews[activeNewsIndex].tagColor}-100 border border-${techNews[activeNewsIndex].tagColor}-200 rounded text-[10px]`}>{techNews[activeNewsIndex].tag}</span>
                          <span className="text-slate-900 font-black text-[15px]">{techNews[activeNewsIndex].title}</span>
                        </div>
                        <p className="text-slate-500 text-xs font-medium line-clamp-1">{techNews[activeNewsIndex].desc}</p>
                     </div>
                   </div>

                   <div className="flex items-center gap-2 shrink-0 ml-4">
                      <button onClick={handlePrevNews} className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors border border-slate-200 cursor-pointer shadow-sm">
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button onClick={handleNextNews} className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors border border-slate-200 cursor-pointer shadow-sm">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              
              {/* Left Column: My Assessments (8 cols) */}
              <div className="lg:col-span-8 space-y-4">
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                    <div>
                      <h3 className="text-lg font-black text-slate-900">My Assessments</h3>
                    </div>
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
                      {assignedAssessments.length > 0 ? assignedAssessments.length : 2} Pending
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Academia Assessments */}
                    <div>
                      <h4 className="text-sm font-bold text-slate-700 mb-3 border-l-4 border-purple-500 pl-2">Academia Assessments</h4>
                      <div className="space-y-3">
                        {(assignedAssessments.length > 0 ? assignedAssessments : [{ id: 'mock-1', title: 'Mid-Term OOP Evaluation', isIndustry: false }])
                          .filter(a => !a.isIndustry)
                          .map(assessment => (
                            <div key={assessment.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all flex flex-col justify-between gap-3 h-28">
                              <span className="text-sm font-bold text-slate-900 line-clamp-2">{assessment.title}</span>
                              <button
                                onClick={() => handleStartTest(assessment)}
                                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                              >
                                Start Test
                              </button>
                            </div>
                          ))
                        }
                      </div>
                    </div>

                    {/* Industry Assessments */}
                    <div>
                      <h4 className="text-sm font-bold text-slate-700 mb-3 border-l-4 border-emerald-500 pl-2">Industry Assessments</h4>
                      <div className="space-y-3">
                        {(assignedAssessments.length > 0 ? assignedAssessments : [{ id: 'mock-2', title: 'Cloud DevOps Certification Mock', isIndustry: true }])
                          .filter(a => a.isIndustry)
                          .map(assessment => (
                            <div key={assessment.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all flex flex-col justify-between gap-3 h-28">
                              <span className="text-sm font-bold text-slate-900 line-clamp-2">{assessment.title}</span>
                              <button
                                onClick={() => handleStartTest(assessment)}
                                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                              >
                                Start Test
                              </button>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Upcoming Schedule (4 cols) */}
              <div className="lg:col-span-4">
                <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-xs sticky top-3">
                  <h3 className="text-lg font-black text-slate-900 pb-2 border-b border-slate-100 mb-2">
                    Upcoming Schedule
                  </h3>

                  <div className="relative border-l-2 border-slate-100 ml-3 space-y-3 pb-0">
                    {/* Event 1 */}
                    <div className="relative pl-6">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-4 border-white bg-blue-200 ring-1 ring-slate-100"></div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Today, 2:00 PM</p>
                      <h4 className="font-bold text-slate-800 text-sm mb-1.5">Mock Technical Interview</h4>
                      <div className="flex items-center gap-3">
                        <a href="https://meet.google.com/new" target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1.5 font-bold transition-colors cursor-pointer w-fit p-1.5 -ml-1.5 rounded hover:bg-blue-50">
                          <Video className="w-4 h-4" /> Google Meet
                        </a>
                        <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Mock+Technical+Interview&details=Mock+interview+via+Google+Meet&dates=20261018T140000Z/20261018T150000Z" target="_blank" rel="noreferrer" className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5 font-bold transition-colors cursor-pointer w-fit p-1.5 rounded hover:bg-indigo-50 border border-transparent hover:border-indigo-100">
                          <CalendarIcon className="w-4 h-4" /> Important Events
                        </a>
                      </div>
                    </div>

                    {/* Event 2 */}
                    <div className="relative pl-6">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-4 border-white bg-slate-400 ring-1 ring-slate-100"></div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Tomorrow, 10:30 AM</p>
                      <h4 className="font-bold text-slate-800 text-sm mb-1.5">Industry Placement Talk</h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                        <CalendarIcon className="w-4 h-4 text-slate-400" /> TechCorp Inc.
                      </p>
                    </div>
                    
                  </div>
                </div>
              </div>

            </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Column 1: Average Performance (Cols 1 to 4) */}
                <div className="col-span-12 md:col-span-4 bg-white border border-slate-100 rounded-2xl p-5 shadow-xs font-sans flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-900">Average Performance</h3>
                    <span className="text-[11px] font-mono text-slate-400">Last 7 Days</span>
                  </div>
                  <div className="flex flex-col space-y-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                        <Monitor className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-500 font-medium">Hours Spent</span>
                        <span className="text-base font-bold text-indigo-950">34h</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
                        <Lightbulb className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-500 font-medium">Test Results</span>
                        <span className="text-base font-bold text-cyan-600">82%</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                        <Star className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-500 font-medium">Chapters Completed</span>
                        <span className="text-base font-bold text-amber-500">14</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 2: Daily Goals Widget */}
                <StudentDailyGoalsWidget />

                {/* Column 3: Batch & Cohort Leaderboard (Cols 9 to 12) */}
                <StudentLeaderboardWidget />
              </div>

            </div>
          )}

          {/* Tab 2: Skills */}
          {currentTab === 'skills' && (
            <StudentSkillsHub />
          )}

          {/* Tab 3: Opportunities */}
          {currentTab === 'opportunities' && (
            <StudentOpportunitiesHub />
          )}

          {currentTab === 'portfolio' && (
            <StudentDigitalPortfolio />
          )}
          {currentTab === 'collaboration' && (
            <StudentCollaborationHub />
          )}
          {currentTab === 'roadmaps' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both" style={{ animationDelay: '150ms' }}>
              <StudentRoadmaps />
            </div>
          )}

          {/* Tab 5: Learn */}
          {currentTab === 'learn' && (
            <StudentLearnHub />
          )}
        </main>
      </div>

      {/* Test Modal */}
      {activeTest && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-[#F4F7FB]">
          {/* Header */}
          <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shrink-0">
            <div>
              <h2 className="text-xl font-black text-slate-900">{activeTest.title}</h2>
              <p className="text-sm text-slate-500">
                {testState === 'results' ? 'Assessment Results' : `Questions • Pass Threshold: 60%`}
              </p>
            </div>
            <div className="flex items-center gap-6">
              {testState === 'active' && (
                <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-xl border border-amber-200 font-bold font-mono">
                  {Math.floor(testTimeLeft / 60).toString().padStart(2, '0')}:{(testTimeLeft % 60).toString().padStart(2, '0')}
                </div>
              )}
              <button 
                onClick={closeTest}
                className="px-5 py-2 bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold rounded-xl transition-colors text-sm cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
          
          {/* Questions Area */}
          <div className="flex-1 overflow-y-auto p-6 md:p-10 flex justify-center">
            <div className="w-full max-w-3xl space-y-8 animate-fade-in">
              {getQuestionsForTest(activeTest.title, activeTest.skills || '').map((qObj, idx) => {
                const options = qObj.options;
                const correctAnswerIndex = qObj.ans;
                const isCorrect = selectedAnswers[idx] === correctAnswerIndex;
                
                return (
                  <div key={idx} className={`bg-white p-6 rounded-2xl border ${testState === 'results' ? (isCorrect ? 'border-emerald-300 shadow-emerald-500/10' : 'border-rose-300 shadow-rose-500/10') : 'border-slate-200'} shadow-sm`}>
                    <h4 className="font-bold text-slate-800 mb-4 flex gap-3 leading-relaxed">
                      <span className="text-blue-600 shrink-0">Q{idx + 1}.</span> 
                      <span>{qObj.q}</span>
                    </h4>
                    <div className="space-y-3">
                      {options.map((opt, oIdx) => {
                        let rowClass = "border-slate-100 hover:bg-slate-50";
                        if (testState === 'results') {
                          if (oIdx === correctAnswerIndex) {
                            rowClass = "border-emerald-200 bg-emerald-50 text-emerald-900 font-bold";
                          } else if (selectedAnswers[idx] === oIdx) {
                            rowClass = "border-rose-200 bg-rose-50 text-rose-900";
                          } else {
                            rowClass = "border-slate-100 opacity-60";
                          }
                        } else if (selectedAnswers[idx] === oIdx) {
                          rowClass = "border-blue-200 bg-blue-50";
                        }
                        return (
                          <label key={oIdx} className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${testState === 'active' ? 'cursor-pointer' : 'cursor-default'} ${rowClass}`}>
                            <input 
                              type="radio" 
                              name={`q-${idx}`} 
                              disabled={testState === 'results'}
                              checked={selectedAnswers[idx] === oIdx}
                              onChange={() => setSelectedAnswers(prev => ({...prev, [idx]: oIdx}))}
                              className={`w-4 h-4 shrink-0 ${testState === 'results' ? '' : 'cursor-pointer text-blue-600 focus:ring-blue-500'}`} 
                            />
                            <span className="text-sm font-medium">{opt}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              
              {testState === 'active' && (
                <div className="flex justify-end pt-4 pb-12">
                  <button 
                    onClick={() => setTestState('results')}
                    className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl shadow-md transition-colors flex items-center gap-2 text-lg cursor-pointer"
                  >
                    <CheckCircle2 className="w-6 h-6" /> Submit Assessment
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
