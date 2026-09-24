import React, { useState, useEffect } from 'react';
import { BookOpen, Code, Lightbulb, CheckCircle2, PlayCircle, Clock, Calendar, MapPin, Sparkles, Send, X, Users, Building2 } from 'lucide-react';

type LearnTab = 'courses' | 'arena' | 'workshops';

interface Course {
  id: string;
  title: string;
  provider: string;
  duration: string;
  description: string;
  imageColor: string;
  isIndustry: boolean;
  link?: string;
  imageUrls?: string[];
}

interface Workshop {
  id: string;
  title: string;
  instructor: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

const COURSES: Course[] = [
  {
    id: 'cert-1',
    title: 'Generative AI & LLM Deployment',
    provider: 'TechNova AI Research',
    duration: '8 Weeks',
    description: 'Production-ready training covering prompt engineering, fine-tuning open-source LLMs, RAG architectures, and scalable inference deployment.',
    imageColor: 'bg-purple-50',
    isIndustry: true,
    imageUrls: [
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg'
    ]
  },
  {
    id: 'cert-2',
    title: 'Cloud-Native DevOps & Kubernetes',
    provider: 'Cloudify Networks',
    duration: '10 Weeks',
    description: 'Comprehensive industry certification targeting container orchestration, automated GitOps pipelines, infrastructure as code with Terraform.',
    imageColor: 'bg-emerald-50',
    isIndustry: true,
    imageUrls: [
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg'
    ]
  },
  {
    id: 'cert-3',
    title: 'Full-Stack Next.js & Microservices',
    provider: 'EdgeCraft Software',
    duration: '6 Weeks',
    description: 'Master modern full-stack web engineering using Next.js 15 App Router, React Server Components, distributed event-driven messaging.',
    imageColor: 'bg-rose-50',
    isIndustry: true,
    imageUrls: [
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg'
    ]
  },
  {
    id: 'c-1',
    title: 'Ultimate AWS Certified Solutions Architect Associate',
    provider: 'UDEMY',
    duration: '27 Hours',
    description: 'Full Practice Exam | Learn Cloud Computing | Pass the AWS Certified Solutions Architect Associate Certification SAA-C03!',
    imageColor: 'bg-orange-50',
    isIndustry: false,
    link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/',
    imageUrls: [
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg'
    ]
  },
  {
    id: 'c-2',
    title: 'Become a Java Full Stack Developer with React & Spring Boot',
    provider: 'UDEMY',
    duration: '38 Hours',
    description: 'Master Java Full Stack: React, Spring Boot, REST APIs, JPA, Security, JWT, Redux, Stripe, Tailwind CSS & More',
    imageColor: 'bg-indigo-50',
    isIndustry: false,
    link: 'https://www.udemy.com/course/become-a-java-full-stack-developer-with-react-spring-boot/?couponCode=26BBPAA2MX',
    imageUrls: [
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg'
    ]
  },
  {
    id: 'c-3',
    title: 'Google Data Analytics Professional Certificate',
    provider: 'COURSERA',
    duration: '6 Months',
    description: 'Get on the fast track to a career in Data Analytics. Learn in-demand skills, and get AI training from Google experts.',
    imageColor: 'bg-blue-50',
    isIndustry: false,
    link: 'https://www.coursera.org/professional-certificates/google-data-analytics',
    imageUrls: [
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg'
    ]
  }
];

const WORKSHOPS: Workshop[] = [
  {
    id: 'ws-1',
    title: 'Python Programming for Beginners',
    instructor: 'A. Sharma (Senior Software Fellow)',
    date: '25 October 2026',
    time: '10:00 AM – 2:00 PM IST',
    location: 'Hybrid / Main Campus Auditorium',
    description: 'Interactive crash course introducing variables, data structures, functions, file operations, and writing first command-line automation scripts.'
  },
  {
    id: 'ws-2',
    title: 'Git & GitHub Core Mastery',
    instructor: 'P. Raman (Principal DevRel Architect)',
    date: '02 November 2026',
    time: '11:00 AM – 3:00 PM IST',
    location: 'Virtual Lab (CapFly Interactive Sandbox)',
    description: 'Hands-on workshop teaching branch management, rebase workflows, merge conflict resolution, pull request etiquette, and GitHub Actions CI pipelines.'
  },
  {
    id: 'ws-3',
    title: 'Intro to UI/UX Design with Figma',
    instructor: 'N. Kapoor (Lead Product Designer)',
    date: '08 November 2026',
    time: '02:00 PM – 6:00 PM IST',
    location: 'Hybrid / Design Innovation Hub',
    description: 'Explore fundamental user interface design principles, layout grids, auto-layout in Figma, component design systems, and rapid clickable prototyping.'
  }
];

const LANGUAGES = [
  { id: 'c', name: 'C', icon: 'https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg', initialCode: '#include <stdio.h>\n\nint main() {\n    // Write your code here\n    return 0;\n}' },
  { id: 'cpp', name: 'C++', icon: 'https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg', initialCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your code here\n    return 0;\n}' },
  { id: 'java', name: 'Java', icon: 'https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg', initialCode: 'public class Main {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}' },
  { id: 'python', name: 'Python', icon: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg', initialCode: 'def solve():\n    # Write your code here\n    pass\n\nif __name__ == "__main__":\n    solve()' },
  { id: 'react', name: 'React', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg', initialCode: 'import React from "react";\n\nexport default function App() {\n  return (\n    <div>\n      {/* Write your code here */}\n    </div>\n  );\n}' }
];

const CHALLENGES = {
  c: Array.from({length: 10}, (_, i) => ({ id: `c-${i}`, title: `C Challenge ${i+1}: Pointers & Arrays`, difficulty: 'Easy', score: 10 })),
  cpp: Array.from({length: 10}, (_, i) => ({ id: `cpp-${i}`, title: `C++ Challenge ${i+1}: STL Vectors`, difficulty: 'Medium', score: 20 })),
  java: Array.from({length: 10}, (_, i) => ({ id: `java-${i}`, title: `Java Challenge ${i+1}: Object Oriented Design`, difficulty: 'Medium', score: 20 })),
  python: Array.from({length: 10}, (_, i) => ({ id: `py-${i}`, title: `Python Challenge ${i+1}: List Comprehensions`, difficulty: 'Easy', score: 10 })),
  react: Array.from({length: 10}, (_, i) => ({ id: `react-${i}`, title: `React Challenge ${i+1}: State & Props`, difficulty: 'Hard', score: 30 }))
};

const CodeArena = () => {
  const [selectedLang, setSelectedLang] = useState('python');
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null);
  const [code, setCode] = useState('');
  const [runStatus, setRunStatus] = useState<'idle' | 'running' | 'success' | 'wrong'>('idle');
  const [solvedChallenges, setSolvedChallenges] = useState<Record<string, boolean>>({});

  const handleSolve = (challenge: any, lang: any) => {
    setSelectedChallenge(challenge);
    setCode(lang.initialCode);
    setRunStatus('idle');
  };

  const currentLangObj = LANGUAGES.find(l => l.id === selectedLang);

  const handleSubmit = () => {
    setRunStatus('running');
    setTimeout(() => {
      // Dummy validation: Code must be changed from initial template and have > 10 extra characters
      if (!currentLangObj || code.trim() === currentLangObj.initialCode.trim() || code.length < currentLangObj.initialCode.length + 5) {
        setRunStatus('wrong');
      } else {
        setRunStatus('success');
        setSolvedChallenges(prev => ({ ...prev, [selectedChallenge.id]: true }));
      }
    }, 1500);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Languages (Compact Row) */}
      <div className="flex flex-wrap gap-3">
        {LANGUAGES.map(lang => (
          <button
            key={lang.id}
            onClick={() => setSelectedLang(lang.id)}
            className={`px-5 py-3 flex items-center gap-3 rounded-xl border-2 transition-all cursor-pointer ${selectedLang === lang.id ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-slate-100 bg-white hover:border-blue-200 hover:shadow-sm'}`}
          >
            <img src={lang.icon} alt={lang.name} className="w-6 h-6 object-contain drop-shadow-sm" />
            <span className="text-sm font-bold text-slate-700">{lang.name}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Side: Challenges List (Takes up more space) */}
        <div className="lg:col-span-8">
          <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
            <Code className="w-5 h-5 text-blue-500" /> {currentLangObj?.name} Challenges
          </h3>
          <div className="space-y-3">
            {CHALLENGES[selectedLang as keyof typeof CHALLENGES].map((chal) => {
              const isSolved = solvedChallenges[chal.id];
              return (
                <div key={chal.id} className={`bg-white p-4 rounded-xl border ${isSolved ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-200'} shadow-xs flex items-center justify-between hover:border-blue-300 transition-colors`}>
                  <div className="flex items-center gap-4">
                    {isSolved && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
                    <div>
                      <h4 className={`font-bold text-sm mb-1 ${isSolved ? 'text-emerald-900' : 'text-slate-800'}`}>{chal.title}</h4>
                      <p className="text-xs text-slate-500">
                        <span className={chal.difficulty === 'Easy' ? 'text-emerald-600 font-semibold' : chal.difficulty === 'Medium' ? 'text-amber-600 font-semibold' : 'text-rose-600 font-semibold'}>{chal.difficulty}</span>
                        {' '} • {currentLangObj?.name} (Basic) • Max Score: {chal.score}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSolve(chal, currentLangObj)}
                    className={`px-4 py-2 border text-xs font-bold rounded-lg transition-colors shadow-sm cursor-pointer shrink-0 ${isSolved ? 'bg-emerald-100 border-emerald-200 text-emerald-700 hover:bg-emerald-200' : 'bg-white border-slate-200 hover:border-blue-500 hover:text-blue-600 text-slate-700'}`}
                  >
                    {isSolved ? 'Review Code' : 'Solve'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Track Progress */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col items-center text-center">
            <h4 className="font-black text-lg text-slate-800 mb-2">{currentLangObj?.name} Master Track</h4>
            <p className="text-xs text-slate-500 mb-6">Complete all challenges to earn the {currentLangObj?.name} badge.</p>
            
            <div className="relative w-32 h-32 flex items-center justify-center mb-6">
              {/* Background ring */}
              <svg className="w-full h-full -rotate-90 absolute inset-0" viewBox="0 0 36 36">
                <path className="text-slate-100" strokeWidth="3" stroke="currentColor" fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                {/* Progress ring */}
                <path className="text-emerald-500 transition-all duration-1000 ease-out" strokeWidth="3" strokeDasharray={`${(Object.keys(solvedChallenges).filter(k => k.startsWith(selectedLang === 'c' ? 'c-' : selectedLang === 'cpp' ? 'cpp-' : selectedLang === 'java' ? 'java-' : selectedLang === 'react' ? 'react-' : 'py-')).length / (CHALLENGES[selectedLang as keyof typeof CHALLENGES]?.length || 10)) * 100}, 100`} stroke="currentColor" fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="text-center absolute">
                <span className="text-2xl font-black text-slate-800">
                  {Object.keys(solvedChallenges).filter(k => k.startsWith(selectedLang === 'c' ? 'c-' : selectedLang === 'cpp' ? 'cpp-' : selectedLang === 'java' ? 'java-' : selectedLang === 'react' ? 'react-' : 'py-')).length}
                </span>
                <span className="text-xs font-bold text-slate-400">/{CHALLENGES[selectedLang as keyof typeof CHALLENGES]?.length || 10}</span>
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mt-1"><CheckCircle2 className="w-3 h-3 inline pb-0.5"/> Solved</p>
              </div>
            </div>

            <div className="w-full bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-around">
              <div className="flex flex-col items-center">
                <span className="text-lg font-black text-slate-800">
                  {(CHALLENGES[selectedLang as keyof typeof CHALLENGES]?.length || 10) - Object.keys(solvedChallenges).filter(k => k.startsWith(selectedLang === 'c' ? 'c-' : selectedLang === 'cpp' ? 'cpp-' : selectedLang === 'java' ? 'java-' : selectedLang === 'react' ? 'react-' : 'py-')).length}
                </span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Attempting</span>
              </div>
              <div className="w-px h-8 bg-slate-200"></div>
              <div className="flex flex-col items-center">
                <span className="text-lg font-black text-slate-800">
                  {Math.round((Object.keys(solvedChallenges).filter(k => k.startsWith(selectedLang === 'c' ? 'c-' : selectedLang === 'cpp' ? 'cpp-' : selectedLang === 'java' ? 'java-' : selectedLang === 'react' ? 'react-' : 'py-')).length / (CHALLENGES[selectedLang as keyof typeof CHALLENGES]?.length || 10)) * 100)}%
                </span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Done</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Editor Modal */}
      {selectedChallenge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4" onClick={() => setSelectedChallenge(null)}>
          <div className="w-full max-w-5xl h-[85vh] bg-slate-50 rounded-2xl shadow-2xl overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="bg-[#0B192C] px-6 py-4 flex justify-between items-center text-white shrink-0">
              <div className="flex items-center gap-3">
                <Code className="w-5 h-5 text-blue-400" />
                <h3 className="font-black">{selectedChallenge.title}</h3>
              </div>
              <button onClick={() => setSelectedChallenge(null)} className="p-1 hover:bg-slate-800 rounded cursor-pointer transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 flex overflow-hidden">
              {/* Problem Description */}
              <div className="w-1/3 bg-white border-r border-slate-200 p-6 overflow-y-auto">
                <h4 className="font-black text-lg text-slate-900 mb-2">Problem Statement</h4>
                <div className="flex gap-2 mb-4">
                  <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider ${selectedChallenge.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-700' : selectedChallenge.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'}`}>
                    {selectedChallenge.difficulty}
                  </span>
                  <span className="text-[10px] px-2 py-1 bg-blue-50 text-blue-700 rounded font-bold uppercase tracking-wider">
                    Score: {selectedChallenge.score}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                  Write a program to solve this challenge using {currentLangObj?.name}. Ensure your solution is optimal and handles all edge cases.
                </p>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4">
                  <p className="text-xs font-bold text-slate-700 mb-1">Example Input:</p>
                  <pre className="text-xs text-slate-600 font-mono">5{'\n'}2 3 6 6 5</pre>
                  <p className="text-xs font-bold text-slate-700 mb-1 mt-3">Example Output:</p>
                  <pre className="text-xs text-slate-600 font-mono">5</pre>
                </div>
              </div>

              {/* Code Editor */}
              <div className="w-2/3 flex flex-col bg-slate-900">
                <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex justify-between items-center shrink-0">
                  <div className="flex items-center gap-2">
                    <img src={currentLangObj?.icon} className="w-4 h-4 object-contain" alt="" />
                    <span className="text-xs font-bold text-slate-300">main.{selectedLang === 'python' ? 'py' : selectedLang === 'java' ? 'java' : selectedLang === 'cpp' ? 'cpp' : selectedLang === 'react' ? 'jsx' : 'c'}</span>
                  </div>
                </div>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="flex-1 w-full bg-transparent text-slate-300 p-4 font-mono text-sm resize-none focus:outline-none"
                  spellCheck="false"
                />
                <div className="bg-slate-800 p-4 border-t border-slate-700 flex justify-between items-center shrink-0 h-20">
                  <div>
                    {runStatus === 'running' && (
                      <span className="text-blue-400 text-sm font-bold flex items-center gap-2 animate-pulse">
                        <PlayCircle className="w-4 h-4 animate-spin" /> Running test cases...
                      </span>
                    )}
                    {runStatus === 'success' && (
                      <span className="text-emerald-400 text-sm font-bold flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" /> Success: All Test Cases Passed!
                      </span>
                    )}
                    {runStatus === 'wrong' && (
                      <span className="text-rose-400 text-sm font-bold flex items-center gap-2">
                        <X className="w-5 h-5" /> Wrong Answer: Output does not match expected result.
                      </span>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <button className="px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-white text-sm font-bold rounded-xl transition-colors cursor-pointer">
                      Run Code
                    </button>
                    <button 
                      onClick={handleSubmit}
                      disabled={runStatus === 'running' || runStatus === 'success'}
                      className={`px-5 py-2.5 text-white text-sm font-bold rounded-xl transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed ${runStatus === 'success' ? 'bg-emerald-600' : runStatus === 'wrong' ? 'bg-rose-600 hover:bg-rose-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                      <Send className="w-4 h-4" /> {runStatus === 'success' ? 'Accepted' : runStatus === 'wrong' ? 'Try Again' : 'Submit Code'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const StudentLearnHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<LearnTab>('courses');
  const [enrolledCourses, setEnrolledCourses] = useState<Record<string, boolean>>({});
  const [registeredWorkshops, setRegisteredWorkshops] = useState<Record<string, boolean>>({});
  
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [formData, setFormData] = useState({ name: '', collegeId: '', collegeName: '' });

  useEffect(() => {
    const loadState = () => {
      const courses = localStorage.getItem('capfly_student_course_enrollments');
      if (courses) setEnrolledCourses(JSON.parse(courses));
      
      const workshops = localStorage.getItem('capfly_student_workshop_registrations');
      if (workshops) setRegisteredWorkshops(JSON.parse(workshops));
    };
    loadState();
    const interval = setInterval(loadState, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleEnroll = (courseId: string) => {
    const newState = { ...enrolledCourses, [courseId]: true };
    setEnrolledCourses(newState);
    localStorage.setItem('capfly_student_course_enrollments', JSON.stringify(newState));
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWorkshop) return;
    
    // Store simple boolean state for UI
    const newUIState = { ...registeredWorkshops, [selectedWorkshop.id]: true };
    setRegisteredWorkshops(newUIState);
    localStorage.setItem('capfly_student_workshop_registrations', JSON.stringify(newUIState));

    // Store detailed application for industry portal sync
    const detailedKey = `capfly_workshop_details_${selectedWorkshop.id}`;
    const existing = JSON.parse(localStorage.getItem(detailedKey) || '[]');
    existing.push({
      id: `p-${Date.now()}`,
      name: formData.name,
      college: formData.collegeName,
      branch: formData.collegeId, // storing ID in branch to mock it easily
      registeredAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      attendanceStatus: 'Waitlisted'
    });
    localStorage.setItem(detailedKey, JSON.stringify(existing));

    setSelectedWorkshop(null);
    setFormData({ name: '', collegeId: '', collegeName: '' });
  };

  return (
    <div className="space-y-4">
      {/* Header Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-xs flex flex-wrap gap-2 items-center">
        <button
          onClick={() => setActiveTab('courses')}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer flex items-center gap-2 ${activeTab === 'courses' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          <BookOpen className="w-4 h-4" /> Courses
        </button>
        <button
          onClick={() => setActiveTab('arena')}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer flex items-center gap-2 ${activeTab === 'arena' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          <Code className="w-4 h-4" /> Code Arena
        </button>
        <button
          onClick={() => setActiveTab('workshops')}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer flex items-center gap-2 ${activeTab === 'workshops' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          <Lightbulb className="w-4 h-4" /> Workshops
        </button>
      </div>

      {activeTab === 'courses' && (
        <div className="space-y-4 animate-fade-in">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {COURSES.map(course => (
              <div key={course.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                <div className={`h-24 ${course.imageColor} relative flex items-center justify-center gap-2`}>
                  {course.imageUrls && course.imageUrls.map((url, i) => (
                    <div key={i} className="w-12 h-12 bg-white/60 rounded-full p-2 flex items-center justify-center backdrop-blur-sm shadow-sm border border-white">
                      <img src={url} alt="Course Technology" className="w-full h-full object-contain" />
                    </div>
                  ))}
                  {course.isIndustry && (
                    <div className="absolute top-2 right-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded border border-slate-200 text-[9px] font-extrabold text-indigo-700 uppercase flex items-center gap-1 shadow-sm">
                      <Building2 className="w-2.5 h-2.5" /> Industry Assigned
                    </div>
                  )}
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <span className={`text-[9px] font-extrabold tracking-wider uppercase mb-1.5 ${course.isIndustry ? 'text-purple-600' : 'text-fuchsia-600'}`}>
                    {course.provider}
                  </span>
                  <h3 className="font-black text-slate-900 text-xs leading-snug mb-1.5">{course.title}</h3>
                  <p className="text-[11px] text-slate-500 mb-3 line-clamp-2 leading-snug flex-1">{course.description}</p>
                  
                  {enrolledCourses[course.id] && (
                    <div className="mb-4 space-y-1.5">
                      <div className="flex justify-between text-[10px] font-bold text-slate-600">
                        <span>Progress</span>
                        <span>0%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[5%] rounded-full"></div>
                      </div>
                    </div>
                  )}

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <Clock className="w-3.5 h-3.5" /> {course.duration}
                      </div>
                      {course.link ? (
                        <a
                          href={course.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2 h-[34px] bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-sm flex items-center justify-center"
                        >
                          Enroll
                        </a>
                      ) : enrolledCourses[course.id] ? (
                      <button className="px-4 py-2 h-[34px] bg-slate-100 text-slate-700 text-xs font-bold rounded-lg cursor-pointer hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5">
                        <PlayCircle className="w-3.5 h-3.5" /> Continue
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleEnroll(course.id)}
                        className="px-5 py-2 h-[34px] bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-sm flex items-center justify-center"
                      >
                        Enroll
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'arena' && <CodeArena />}

      {activeTab === 'workshops' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
          {WORKSHOPS.map(ws => (
            <div key={ws.id} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col hover:border-blue-300 transition-colors h-full">
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-lg text-[10px] font-black uppercase tracking-wider">
                    Foundational Workshop
                  </span>
                  {registeredWorkshops[ws.id] && (
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Registered
                    </span>
                  )}
                </div>
                <h3 className="font-black text-slate-900 text-lg mb-1 leading-tight">{ws.title}</h3>
                <p className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 mb-3">
                  <Users className="w-3.5 h-3.5 text-blue-500" /> {ws.instructor}
                </p>
                <p className="text-xs text-slate-500 mb-4 flex-1 line-clamp-3">{ws.description}</p>
                
                <div className="flex flex-col gap-2 text-[11px] text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="flex items-center gap-1.5 font-medium"><Calendar className="w-3.5 h-3.5 text-slate-400" /> {ws.date}</span>
                  <span className="flex items-center gap-1.5 font-medium"><Clock className="w-3.5 h-3.5 text-slate-400" /> {ws.time}</span>
                  <span className="flex items-center gap-1.5 font-medium"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {ws.location}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 shrink-0">
                {registeredWorkshops[ws.id] ? (
                  <button disabled className="w-full py-2.5 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold cursor-not-allowed flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Seat Reserved
                  </button>
                ) : (
                  <button 
                    onClick={() => setSelectedWorkshop(ws)}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2"
                  >
                    Register Now
                  </button>
                )}
                <p className="text-[9px] text-center text-slate-400 mt-2 font-bold uppercase tracking-wider">Limited Seats Available</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Workshop Registration Modal */}
      {selectedWorkshop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4" onClick={() => setSelectedWorkshop(null)}>
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="bg-[#0B192C] px-6 py-4 flex justify-between items-center text-white">
              <h3 className="font-black">Workshop Registration</h3>
              <button onClick={() => setSelectedWorkshop(null)} className="p-1 hover:bg-slate-800 rounded cursor-pointer transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleRegisterSubmit} className="p-6 space-y-4">
              <p className="text-sm font-semibold text-slate-800 mb-2 border-b border-slate-100 pb-3">{selectedWorkshop.title}</p>
              
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name *</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter your full name" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">College ID / Roll No *</label>
                <input required type="text" value={formData.collegeId} onChange={e => setFormData({...formData, collegeId: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. 21CS045" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">College / University Name *</label>
                <input required type="text" value={formData.collegeName} onChange={e => setFormData({...formData, collegeName: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter your college name" />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setSelectedWorkshop(null)} className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-colors cursor-pointer flex items-center gap-2">
                  <Send className="w-3.5 h-3.5" /> Confirm Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
