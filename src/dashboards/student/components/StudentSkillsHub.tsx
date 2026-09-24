import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { PlayCircle, CheckCircle2, Clock, X, Code, Send, BarChart3 } from 'lucide-react';

const APTITUDE_TESTS = {
  verbal: [
    { section: 'Verbal Ability', q: 'Identify the synonym for "Ephemeral".', options: ['Eternal', 'Short-lived', 'Solid', 'Bright'], ans: 1 },
    { section: 'Verbal Ability', q: 'Fill in the blank: She was _____ by the beautiful landscape.', options: ['bored', 'captivated', 'angry', 'repulsed'], ans: 1 },
    { section: 'Verbal Ability', q: 'What is the antonym of "Obscure"?', options: ['Hidden', 'Clear', 'Dark', 'Confusing'], ans: 1 },
    { section: 'Verbal Ability', q: 'Choose the correct spelling.', options: ['Accomodate', 'Accommodate', 'Acomodate', 'Acommodate'], ans: 1 },
    { section: 'Verbal Ability', q: 'The phrase "Break the ice" means:', options: ['To crush ice', 'To start a conflict', 'To initiate conversation', 'To freeze something'], ans: 2 },
  ],
  logical: [
    { section: 'Logical Reasoning', q: 'If A is the brother of B, and B is the sister of C, how is A related to C?', options: ['Father', 'Brother', 'Uncle', 'Cousin'], ans: 1 },
    { section: 'Logical Reasoning', q: 'Find the next number in the series: 2, 6, 12, 20, ?', options: ['30', '28', '24', '32'], ans: 0 },
    { section: 'Logical Reasoning', q: 'All birds have feathers. A penguin is a bird. Therefore:', options: ['Penguins can fly', 'Penguins have feathers', 'Penguins are fish', 'Penguins like cold'], ans: 1 },
    { section: 'Logical Reasoning', q: 'If RED is coded as 27, then BLUE is coded as:', options: ['30', '40', '42', '45'], ans: 1 }, 
    { section: 'Logical Reasoning', q: 'Which word does not belong?', options: ['Apple', 'Banana', 'Carrot', 'Mango'], ans: 2 },
  ],
  quant: [
    { section: 'Quantitative Aptitude', q: 'What is 15% of 200?', options: ['20', '30', '40', '50'], ans: 1 },
    { section: 'Quantitative Aptitude', q: 'A train 100m long is running at 36 km/hr. Time to pass a pole?', options: ['10s', '12s', '8s', '15s'], ans: 0 },
    { section: 'Quantitative Aptitude', q: 'If x + y = 10 and x - y = 4, find x.', options: ['7', '6', '3', '5'], ans: 0 },
    { section: 'Quantitative Aptitude', q: 'Calculate the probability of getting a sum of 7 with two dice.', options: ['1/6', '1/12', '1/3', '1/4'], ans: 0 },
    { section: 'Quantitative Aptitude', q: 'What is the square root of 144?', options: ['10', '11', '12', '14'], ans: 2 },
  ]
};

const CODING_PROBLEMS = [
  { id: 1, title: 'Reverse a String', difficulty: 'Easy', desc: 'Write a program that takes a string as input and returns the string reversed.', in: '"hello"', out: '"olleh"' },
  { id: 2, title: 'Two Sum', difficulty: 'Medium', desc: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.', in: '[2,7,11,15]\n9', out: '[0,1]' },
  { id: 3, title: 'Find Maximum', difficulty: 'Easy', desc: 'Find the maximum element in a given array of numbers.', in: '[1, 5, 3, 9, 2]', out: '9' }
];

const LANGS: Record<string, {name: string, ext: string, code: string}> = {
  python: { name: 'Python', ext: 'py', code: 'def solve():\n    # Write your code here\n    pass' },
  java: { name: 'Java', ext: 'java', code: 'class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}' },
  cpp: { name: 'C++', ext: 'cpp', code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your code here\n    return 0;\n}' },
  c: { name: 'C', ext: 'c', code: '#include <stdio.h>\n\nint main() {\n    // Write your code here\n    return 0;\n}' }
};

const DomainDistributionChart = React.memo(({ animateCharts }: { animateCharts: boolean }) => {
  const [activeDomain, setActiveDomain] = useState<number | null>(null);

  const handleSelect = React.useCallback((idx: number | null) => {
    setActiveDomain(idx);
  }, []);
  
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col h-full">
      <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-3">Domain Distribution Matrix</h3>
      <div className="flex flex-col xl:flex-row items-center xl:items-start gap-8">
         {/* Animated SVG Donut Chart */}
         <div className="relative w-48 h-48 shrink-0">
           <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
             {[
               { color: '#10b981', pct: 26, name: 'Industry Assessments', desc: 'Practical problems posed directly by hiring partners.' },
               { color: '#0ea5e9', pct: 29, name: 'Academia Assessments', desc: 'Theoretical concepts and university syllabus tests.' },
               { color: '#e11d48', pct: 21, name: 'Aptitude', desc: 'Logical, Verbal, and Quantitative reasoning.' },
               { color: '#f59e0b', pct: 24, name: 'Coding', desc: 'Algorithmic and logic building tasks.' },
             ].map((slice, i, arr) => {
               const prevPcts = arr.slice(0, i).reduce((sum, item) => sum + item.pct, 0);
               const circumference = 2 * Math.PI * 25; // 157.08
               const strokeLength = animateCharts ? (slice.pct / 100) * circumference : 0;
               const offset = (prevPcts / 100) * circumference;
               
               return (
                 <circle
                   key={i}
                   cx="50"
                   cy="50"
                   r="25"
                   fill="transparent"
                   stroke={slice.color}
                   strokeWidth="50"
                   strokeDasharray={`${strokeLength} ${circumference}`}
                   strokeDashoffset={-offset}
                   style={{ transition: animateCharts ? 'stroke-dasharray 1s ease-out, opacity 150ms ease-in-out' : 'none' }}
                   className={`cursor-pointer transition-all duration-150 ease-in-out ${activeDomain !== null && activeDomain !== i ? 'opacity-30' : 'opacity-100 hover:opacity-80'}`}
                   onMouseEnter={() => handleSelect(i)}
                   onMouseLeave={() => handleSelect(null)}
                 />
               );
             })}
           </svg>
           {activeDomain !== null && (
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <span className="bg-white/90 backdrop-blur-sm text-slate-800 font-black text-xl px-3 py-1 rounded-lg shadow-sm border border-slate-100 transition-all duration-150 ease-in-out scale-100">
                 {[26, 29, 21, 24][activeDomain]}%
               </span>
             </div>
           )}
         </div>
         
         <div className="space-y-4 w-full flex-1">
           {[
             { color: 'bg-emerald-500', text: 'Industry Assessments', pct: 26 },
             { color: 'bg-sky-500', text: 'Academia Assessments', pct: 29 },
             { color: 'bg-rose-600', text: 'Aptitude', pct: 21 },
             { color: 'bg-amber-500', text: 'Coding', pct: 24 },
           ].map((item, idx) => (
             <div 
               key={item.text} 
               onMouseEnter={() => handleSelect(idx)}
               onMouseLeave={() => handleSelect(null)}
               className={`flex items-center gap-3 text-sm font-bold transition-all duration-150 ease-in-out cursor-pointer p-2 rounded-xl border ${activeDomain === idx ? 'bg-slate-50 border-slate-200 shadow-sm' : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50/50'}`}
             >
               <span className={`w-3.5 h-3.5 rounded-full ${item.color} shadow-sm shrink-0 transition-transform duration-150 ${activeDomain === idx ? 'scale-110' : ''}`}></span> 
               <span>{item.text} ({item.pct}%)</span>
             </div>
           ))}
         </div>
      </div>
      
      {activeDomain !== null ? (
        <div className="mt-6 bg-slate-50 border border-slate-200 rounded-xl p-5 transition-all duration-150 ease-in-out flex-1 opacity-100 translate-y-0 scale-100">
           {(() => {
             const details = [
               { title: 'Industry Assessments', desc: 'Practical problems posed directly by hiring partners testing real-world software engineering capabilities.', breakdown: [{ label: 'Frontend', val: 40 }, { label: 'Backend', val: 35 }, { label: 'System Design', val: 25 }] },
               { title: 'Academia Assessments', desc: 'Theoretical concepts and university syllabus tests verifying foundational computer science knowledge.', breakdown: [{ label: 'Data Structures', val: 50 }, { label: 'OS', val: 30 }, { label: 'Networks', val: 20 }] },
               { title: 'Aptitude', desc: 'Logical, Verbal, and Quantitative reasoning which form the core filtering step for many enterprise recruiters.', breakdown: [{ label: 'Logical Reasoning', val: 45 }, { label: 'Quantitative Aptitude', val: 35 }, { label: 'Verbal Ability', val: 20 }] },
               { title: 'Coding', desc: 'Algorithmic and logic building tasks evaluating optimal problem solving speed.', breakdown: [{ label: 'Python', val: 50 }, { label: 'Java', val: 30 }, { label: 'C++', val: 20 }] }
             ][activeDomain];
             
             return (
               <>
                 <h4 className="font-black text-slate-800 text-lg">{details.title} Details</h4>
                 <p className="text-sm text-slate-600 mt-2 mb-4">{details.desc}</p>
                 <div className="flex gap-4 items-center flex-wrap">
                   {details.breakdown.map((b, i) => (
                     <div key={i} className="flex-1 min-w-[80px] bg-white border border-slate-200 rounded-lg p-3 shadow-xs hover:border-blue-300 transition-colors duration-150 cursor-default">
                       <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate">{b.label}</div>
                       <div className="text-lg font-black text-blue-600 mt-1">{b.val}%</div>
                     </div>
                   ))}
                 </div>
               </>
             );
           })()}
        </div>
      ) : (
        <div className="mt-6 bg-slate-50 border border-slate-200 rounded-xl p-5 flex items-center justify-center text-slate-400 text-sm font-medium italic flex-1 min-h-[140px]">
          Hover over a chart segment to view detailed breakdowns.
        </div>
      )}
    </div>
  );
});

const PerformanceCategorization = React.memo(({ animateCharts }: { animateCharts: boolean }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col h-full">
       <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-3">Performance Categorization</h3>
       <div className="space-y-8 flex-1 flex flex-col justify-center pb-4">
          {[
            { label: 'Industry Assessment', correct: 65, wrong: 35, gapAdvice: 'Gap: Focus on practical implementation of Backend APIs and System Design.' },
            { label: 'Academia Assessments', correct: 80, wrong: 20, gapAdvice: 'Gap: Needs improvement in advanced Data Structures like Trees and Graphs.' },
            { label: 'Aptitude', correct: 40, wrong: 60, gapAdvice: 'Gap: Logical Reasoning speed and Quantitative formulas need practice.' },
            { label: 'Coding', correct: 55, wrong: 45, gapAdvice: 'Gap: Improve algorithmic efficiency (O(N) vs O(N^2)) in Java/Python.' },
          ].map(item => (
            <div key={item.label} className="flex flex-col gap-2 relative group cursor-help">
               <div className="text-xs font-black text-slate-700 uppercase tracking-wider truncate shrink-0 transition-colors duration-150 group-hover:text-rose-600">{item.label}</div>
               <div className="flex-1 flex h-8 rounded-lg overflow-hidden shadow-sm bg-slate-100">
                  <div 
                    className="bg-emerald-500 flex items-center justify-center text-[10px] text-white font-bold transition-all duration-1000 ease-out group-hover:brightness-110 whitespace-nowrap overflow-hidden relative" 
                    style={{ width: animateCharts ? `${item.correct}%` : '0%' }}
                  >
                    {animateCharts && item.correct > 0 ? `${item.correct}% Correct` : ''}
                  </div>
                  <div 
                    className="bg-rose-500 flex items-center justify-center text-[10px] text-white font-bold transition-all duration-1000 ease-out group-hover:brightness-110 whitespace-nowrap overflow-hidden relative" 
                    style={{ width: animateCharts ? `${item.wrong}%` : '0%' }}
                  >
                    {animateCharts && item.wrong > 0 ? `${item.wrong}% Wrong` : ''}
                  </div>
               </div>
               
               {/* Pure CSS Tooltip (No React State Required) */}
               <div className="absolute right-0 top-12 z-20 w-64 bg-slate-800 text-white text-xs font-medium p-3 rounded-xl shadow-lg transition-all duration-200 ease-in-out opacity-0 invisible group-hover:opacity-100 group-hover:visible scale-95 group-hover:scale-100 translate-y-2 group-hover:translate-y-0 origin-top-right pointer-events-none">
                 <div className="absolute -top-2 right-4 w-4 h-4 bg-slate-800 rotate-45"></div>
                 <div className="relative z-10">
                   <span className="font-bold text-rose-300 block mb-1">Needs Improvement</span>
                   {item.gapAdvice}
                 </div>
               </div>
            </div>
          ))}
       </div>
    </div>
  );
});

export const StudentSkillsHub = () => {
  const [activeTab, setActiveTab] = useState('assessment');
  const [activeTest, setActiveTest] = useState<string | null>(null);
  const [testState, setTestState] = useState<'active' | 'results'>('active');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  
  // Coding states
  const [codingLang, setCodingLang] = useState('python');
  const [codingCode, setCodingCode] = useState(LANGS.python.code);
  const [activeProblemIdx, setActiveProblemIdx] = useState(0);
  const [runStatus, setRunStatus] = useState<'idle' | 'running' | 'success' | 'wrong'>('idle');
  const [solvedProblems, setSolvedProblems] = useState<Record<number, boolean>>({});

  // Chart Animation States
  const [animateCharts, setAnimateCharts] = useState(false);

  // Assigned Assessments state
  const [assignedAssessments, setAssignedAssessments] = useState<any[]>([]);

  useEffect(() => {
    const loadState = () => {
      const defaultIndustry = [
        { id: 'ind-dummy-1', title: 'Frontend React Engineer - Technical Screen', isIndustry: true, assigned: true }
      ];
      
      const saved = localStorage.getItem('capfly_assigned_blueprints');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const assigned = parsed.filter((b: any) => b.assigned);
          setAssignedAssessments([...defaultIndustry, ...assigned]);
        } catch (e) {
          setAssignedAssessments(defaultIndustry);
        }
      } else {
        setAssignedAssessments(defaultIndustry);
      }
    };
    loadState();
    const interval = setInterval(loadState, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeTab === 'gap') {
      setAnimateCharts(false);
      const timer = setTimeout(() => setAnimateCharts(true), 100);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  const [profileScore, setProfileScore] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (activeTab === 'profile') {
      setProfileScore(0);
      let current = 0;
      interval = setInterval(() => {
        current += 2;
        if (current >= 78) {
          setProfileScore(78);
          clearInterval(interval);
        } else {
          setProfileScore(current);
        }
      }, 20);
    } else {
      setProfileScore(0);
    }
    return () => clearInterval(interval);
  }, [activeTab]);

  useEffect(() => {
    setCodingCode(LANGS[codingLang].code);
    setRunStatus('idle');
  }, [codingLang, activeProblemIdx]);

  const handleSolve = (type: string) => {
    setActiveTest(type);
    setTestState('active');
    setSelectedAnswers({});
    if (type === 'coding') {
      setActiveProblemIdx(0);
      setCodingLang('python');
      setCodingCode(LANGS.python.code);
      setRunStatus('idle');
    }
  };

  const handleCodingSubmit = () => {
    setRunStatus('running');
    setTimeout(() => {
      const template = LANGS[codingLang].code;
      if (codingCode.trim() === template.trim() || codingCode.length < template.length + 5) {
        setRunStatus('wrong');
      } else {
        setRunStatus('success');
        setSolvedProblems(prev => ({...prev, [activeProblemIdx]: true}));
      }
    }, 1500);
  };

  let questions: any[] = [];
  if (activeTest === 'aptitude') {
    questions = [...APTITUDE_TESTS.verbal, ...APTITUDE_TESTS.logical, ...APTITUDE_TESTS.quant];
  } else if (activeTest === 'verbal' || activeTest === 'logical' || activeTest === 'quant') {
    questions = APTITUDE_TESTS[activeTest as keyof typeof APTITUDE_TESTS];
  } else if (typeof activeTest === 'object' && activeTest !== null) {
    const topic = (activeTest as any).title || 'this topic';
    questions = [
      { q: `What is the primary purpose of ${topic}?`, options: ['Data storage', 'Core functionality', 'Styling', 'Testing'], ans: 1 },
      { q: `Which of the following is a key feature of ${topic}?`, options: ['Scalability', 'Slow performance', 'High latency', 'Redundancy'], ans: 0 },
      { q: `How do you initialize a project in ${topic}?`, options: ['init command', 'start command', 'run command', 'build command'], ans: 0 },
      { q: `What is the most common error in ${topic}?`, options: ['Syntax Error', 'Logic Error', 'Network Error', 'Type Error'], ans: 0 },
      { q: `When should you NOT use ${topic}?`, options: ['For small applications', 'For enterprise applications', 'For real-time data processing', 'Never'], ans: 0 },
    ];
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Tabs Header */}
      <div className="flex items-center gap-6 border-b border-slate-200 px-4 mb-6 mt-2 overflow-x-auto">
        {['Skill Assessment', 'Skill Profile', 'Skill Gap Analysis'].map(tab => {
          const key = tab.split(' ')[1].toLowerCase(); 
          const isActive = activeTab === key;
          return (
            <button 
              key={key} 
              onClick={() => setActiveTab(key)}
              className={`pb-4 text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${isActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
               {tab}
            </button>
          )
        })}
      </div>

      {activeTab === 'assessment' && (
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in items-start">
           
           {/* Column 1: My Assessments */}
           <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col">
              <h3 className="font-black text-lg text-slate-800 mb-4 border-b border-slate-100 pb-3 flex items-center justify-between">
                My Assessments
                <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded">
                  {assignedAssessments.length} PENDING
                </span>
              </h3>
              
              <div className="flex-1 space-y-5 max-h-[400px] overflow-y-auto pr-2">
                 <div>
                   <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Industry</h4>
                   <div className="space-y-3">
                     {assignedAssessments.filter(a => a.isIndustry).length === 0 ? <p className="text-xs text-slate-400 italic">None pending</p> : 
                       assignedAssessments.filter(a => a.isIndustry).map(assessment => (
                         <div key={assessment.id} className="p-3.5 rounded-xl border border-emerald-100 bg-emerald-50/30 hover:bg-emerald-50 transition-colors flex flex-col gap-2.5">
                            <span className="font-bold text-sm text-slate-800 line-clamp-1">{assessment.title}</span>
                            <button onClick={() => handleSolve(assessment)} className="w-full text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg transition-colors cursor-pointer">Start Test</button>
                         </div>
                       ))
                     }
                   </div>
                 </div>
                 
                 <div>
                   <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Academia</h4>
                   <div className="space-y-3">
                     {assignedAssessments.filter(a => !a.isIndustry).length === 0 ? <p className="text-xs text-slate-400 italic">None pending</p> : 
                       assignedAssessments.filter(a => !a.isIndustry).map(assessment => (
                         <div key={assessment.id} className="p-3.5 rounded-xl border border-purple-100 bg-purple-50/30 hover:bg-purple-50 transition-colors flex flex-col gap-2.5">
                            <span className="font-bold text-sm text-slate-800 line-clamp-1">{assessment.title}</span>
                            <button onClick={() => handleSolve(assessment)} className="w-full text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors cursor-pointer">Start Test</button>
                         </div>
                       ))
                     }
                   </div>
                 </div>
              </div>
           </div>

           {/* Column 2: Aptitude Assessments */}
           <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col">
              <h3 className="font-black text-lg text-slate-800 mb-4 border-b border-slate-100 pb-3 flex items-center justify-between">
                Aptitude
                <span className="text-[10px] font-bold bg-rose-50 text-rose-600 px-2 py-1 rounded">
                  CORE FILTERS
                </span>
              </h3>
              <div className="flex-1 space-y-3">
                 {[
                   { id: 'logical', name: 'Logical Reasoning' },
                   { id: 'quant', name: 'Quantitative Aptitude' },
                   { id: 'verbal', name: 'Verbal Ability' }
                 ].map(t => (
                    <div key={t.id} className="p-3.5 rounded-xl border border-rose-100 bg-rose-50/30 flex flex-col gap-2.5 hover:bg-rose-50 transition-colors">
                       <span className="font-bold text-sm text-slate-800 line-clamp-1">{t.name}</span>
                       <button onClick={() => handleSolve(t.id)} className="w-full text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white py-2 rounded-lg transition-colors cursor-pointer">
                          Start Test
                       </button>
                    </div>
                 ))}
              </div>
           </div>

           {/* Column 3: Coding Assessments */}
           <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col">
              <h3 className="font-black text-lg text-slate-800 mb-4 border-b border-slate-100 pb-3 flex items-center justify-between">
                Code Arena
                <span className="text-[10px] font-bold bg-amber-50 text-amber-600 px-2 py-1 rounded">
                  PROCTORED
                </span>
              </h3>
              <div className="flex-1 space-y-3">
                 {[
                   { id: 'c', name: 'C Programming' },
                   { id: 'cpp', name: 'C++ Programming' },
                   { id: 'java', name: 'Java Programming' },
                   { id: 'python', name: 'Python Programming' }
                 ].map(t => (
                    <div key={t.id} className="p-3.5 rounded-xl border border-amber-100 bg-amber-50/30 flex flex-col gap-2.5 hover:bg-amber-50 transition-colors">
                       <span className="font-bold text-sm text-slate-800 line-clamp-1">{t.name}</span>
                       <button onClick={() => {
                           setActiveTest('coding');
                           setTestState('active');
                           setSelectedAnswers({});
                           setActiveProblemIdx(0);
                           setCodingLang(t.id as any);
                           setCodingCode(LANGS[t.id as keyof typeof LANGS].code);
                           setRunStatus('idle');
                       }} className="w-full text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg transition-colors cursor-pointer">
                          Start Challenge
                       </button>
                    </div>
                 ))}
              </div>
           </div>

         </div>
      )}

      {activeTab === 'gap' && (
        <div className="space-y-6">
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 shadow-sm flex items-start gap-4">
             <div className="bg-rose-100 p-2 rounded-full shrink-0">
               <span className="text-rose-600 text-xl font-black">!</span>
             </div>
             <div>
               <h4 className="font-bold text-rose-900">Performance Alert</h4>
               <p className="text-sm text-rose-800 mt-1">Based on your recent performance, you have lagged significantly in <strong>Logical Reasoning Ability</strong>. We highly recommend taking foundational challenges in the logical reasoning domain to close this skill gap before placement drives.</p>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* Left Column: Domain Distribution Matrix (Pie Chart) */}
            <DomainDistributionChart animateCharts={animateCharts} />

            {/* Right Column: Performance Categorization (Bar Graphs) */}
            <PerformanceCategorization animateCharts={animateCharts} />
          </div>
        </div>
      )}
      
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 animate-fade-in">
          {/* Left: Placement Ready Circle (xl:col-span-4) */}
          <div className="xl:col-span-4 bg-white rounded-2xl border border-slate-200 p-8 shadow-xs flex flex-col items-center justify-center min-h-[400px]">
            <div className="relative w-56 h-56 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 absolute inset-0" viewBox="0 0 36 36">
                <path className="text-slate-100" strokeWidth="2.5" stroke="currentColor" fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-blue-600 transition-all duration-[1500ms] ease-out" 
                  strokeWidth="2.5" 
                  strokeDasharray={`${profileScore}, 100`} 
                  strokeLinecap="round"
                  stroke="currentColor" fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="text-center absolute flex flex-col items-center justify-center">
                <span className="text-5xl font-black text-blue-600 tracking-tighter">{profileScore}<span className="text-3xl">%</span></span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">Placement Ready</span>
                <div className="mt-4 text-blue-500">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-slate-500 mt-8 font-medium px-4">
              Your current skill level matches <strong className="text-slate-800">78%</strong> of typical industry requirements.
            </p>
          </div>

          {/* Right: Technical Skills Breakdown (xl:col-span-8) */}
          <div className="xl:col-span-8 bg-white rounded-2xl border border-slate-200 p-8 shadow-xs flex flex-col justify-center min-h-[400px]">
            <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-8 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-500" /> Technical Skills Breakdown
            </h3>
            
            <div className="space-y-8">
              {[
                { name: 'Python Core Syntax', score: 18, total: 20, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', color: 'blue' },
                { name: 'REST APIs & Microservices', score: 15, total: 20, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg', color: 'blue' },
                { name: 'Database Architecture', score: 14, total: 20, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', color: 'blue' },
                { name: 'Docker & Containerization', score: 8, total: 20, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', color: 'orange' },
              ].map((skill, sIdx) => (
                <div key={sIdx} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex items-center gap-4 w-full sm:w-64 shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2 shrink-0 shadow-sm">
                      <img src={skill.icon} alt="" className="w-full h-full object-contain" />
                    </div>
                    <span className="text-sm font-bold text-slate-700 leading-tight">{skill.name}</span>
                  </div>
                  <div className="flex-1 flex gap-1 w-full sm:w-auto">
                    {Array.from({ length: skill.total }).map((_, i) => {
                      const isFilled = i < skill.score;
                      const delay = i * 40 + (sIdx * 100); 
                      const show = profileScore > 10;
                      return (
                        <div 
                          key={i} 
                          className={`h-2.5 flex-1 rounded-sm transition-all duration-300 ${
                            isFilled && show ? (skill.color === 'orange' ? 'bg-orange-500' : 'bg-blue-600') : 'bg-slate-100'
                          }`}
                          style={{ transitionDelay: `${delay}ms` }}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MCQ Modal (Aptitude & Assigned Assessments) */}
      {(['aptitude', 'logical', 'quant', 'verbal'].includes(activeTest as string) || (typeof activeTest === 'object' && activeTest !== null)) && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-[#F4F7FB]">
          <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shrink-0 shadow-sm">
            <div>
              <h2 className="text-xl font-black text-slate-900 capitalize">
                {['logical', 'quant', 'verbal'].includes(activeTest as string) ? `${activeTest} Assessment` : activeTest === 'aptitude' ? 'Aptitude Assessment' : (activeTest as any).title}
              </h2>
              <p className="text-sm text-slate-500">
                {testState === 'results' ? 'Assessment Results' : `${questions.length} Questions • 30 Mins`}
              </p>
            </div>
            <div className="flex items-center gap-6">
              {testState === 'active' && (
                <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-xl border border-amber-200 font-bold font-mono shadow-sm">
                  <Clock className="w-4 h-4" /> 30:00
                </div>
              )}
              <button 
                onClick={() => setActiveTest(null)}
                className="px-5 py-2 bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold rounded-xl transition-colors text-sm cursor-pointer shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 md:p-10 flex justify-center">
            <div className="w-full max-w-4xl space-y-12 animate-fade-in pb-12">
              <div className="space-y-6">
                {questions.map((qObj, globalIdx) => {
                  const options = qObj.options;
                  const correctAnswerIndex = qObj.ans;
                  const isCorrect = selectedAnswers[globalIdx] === correctAnswerIndex;

                  return (
                    <div key={globalIdx} className={`bg-white p-6 rounded-2xl border ${testState === 'results' ? (isCorrect ? 'border-emerald-300 shadow-emerald-500/10' : 'border-rose-300 shadow-rose-500/10') : 'border-slate-200'} shadow-sm`}>
                      <h4 className="font-bold text-slate-800 mb-4 flex gap-3 leading-relaxed">
                        <span className="text-blue-600 shrink-0">Q{globalIdx + 1}.</span> 
                        <span>{qObj.q}</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {options.map((opt: string, oIdx: number) => {
                          let rowClass = "border-slate-100 hover:bg-slate-50";
                          if (testState === 'results') {
                            if (oIdx === correctAnswerIndex) {
                              rowClass = "border-emerald-200 bg-emerald-50 text-emerald-900 font-bold shadow-sm";
                            } else if (selectedAnswers[globalIdx] === oIdx) {
                              rowClass = "border-rose-200 bg-rose-50 text-rose-900";
                            } else {
                              rowClass = "border-slate-100 opacity-50";
                            }
                          } else if (selectedAnswers[globalIdx] === oIdx) {
                            rowClass = "border-blue-300 bg-blue-50/50 shadow-sm";
                          }
                          return (
                            <label key={oIdx} className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all ${testState === 'active' ? 'cursor-pointer hover:border-blue-200' : 'cursor-default'} ${rowClass}`}>
                              <input 
                                type="radio" 
                                name={`q-${globalIdx}`} 
                                disabled={testState === 'results'}
                                checked={selectedAnswers[globalIdx] === oIdx}
                                onChange={() => setSelectedAnswers(prev => ({...prev, [globalIdx]: oIdx}))}
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
              </div>
              
              {testState === 'active' && (
                <div className="flex justify-end pt-4 border-t border-slate-200">
                  <button 
                    onClick={() => {
                      setTestState('results');
                      if (typeof activeTest === 'object' && activeTest !== null) {
                        const saved = localStorage.getItem('capfly_assigned_blueprints');
                        if (saved) {
                          try {
                            const parsed = JSON.parse(saved);
                            const updated = parsed.map((b: any) => b.id === (activeTest as any).id ? { ...b, assigned: false, completed: true } : b);
                            localStorage.setItem('capfly_assigned_blueprints', JSON.stringify(updated));
                            setAssignedAssessments(updated.filter((b: any) => b.assigned));
                          } catch (e) {}
                        }
                      }
                    }}
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

      {/* Coding Editor Modal */}
      {activeTest === 'coding' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4" onClick={() => setActiveTest(null)}>
          <div className="w-full max-w-6xl h-[90vh] bg-slate-50 rounded-2xl shadow-2xl overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="bg-[#0B192C] px-6 py-4 flex justify-between items-center text-white shrink-0">
              <div className="flex items-center gap-3">
                <Code className="w-5 h-5 text-blue-400" />
                <h3 className="font-black">Coding Assessment</h3>
                <span className="bg-blue-900/50 text-blue-300 text-xs px-3 py-1 rounded-full border border-blue-800">Proctored</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-amber-400 font-bold font-mono">
                  <Clock className="w-4 h-4" /> 45:00
                </div>
                <button onClick={() => setActiveTest(null)} className="p-1 hover:bg-slate-800 rounded cursor-pointer transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 flex overflow-hidden">
              {/* Sidebar: Problems */}
              <div className="w-64 bg-slate-100 border-r border-slate-200 overflow-y-auto shrink-0 flex flex-col">
                <div className="p-4 bg-slate-200/50 border-b border-slate-200">
                  <h4 className="font-bold text-slate-800 text-sm">Problems</h4>
                </div>
                <div className="p-2 space-y-1">
                  {CODING_PROBLEMS.map((prob, idx) => {
                    const isSolved = solvedProblems[idx];
                    return (
                      <button 
                        key={idx}
                        onClick={() => setActiveProblemIdx(idx)}
                        className={`w-full text-left p-3 rounded-lg text-sm font-bold transition-colors flex items-center justify-between ${activeProblemIdx === idx ? 'bg-white shadow-sm border border-slate-200 text-blue-700' : 'text-slate-600 hover:bg-slate-200'}`}
                      >
                        <span className="truncate pr-2">{idx + 1}. {prob.title}</span>
                        {isSolved && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Problem Description */}
              <div className="w-1/3 bg-white border-r border-slate-200 p-6 overflow-y-auto">
                <h4 className="font-black text-xl text-slate-900 mb-2">{CODING_PROBLEMS[activeProblemIdx].title}</h4>
                <div className="flex gap-2 mb-6">
                  <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider ${CODING_PROBLEMS[activeProblemIdx].difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                    {CODING_PROBLEMS[activeProblemIdx].difficulty}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  {CODING_PROBLEMS[activeProblemIdx].desc}
                </p>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4">
                  <p className="text-xs font-bold text-slate-700 mb-1">Example Input:</p>
                  <pre className="text-xs text-slate-600 font-mono bg-white p-2 border border-slate-100 rounded">{CODING_PROBLEMS[activeProblemIdx].in}</pre>
                  <p className="text-xs font-bold text-slate-700 mb-1 mt-3">Example Output:</p>
                  <pre className="text-xs text-slate-600 font-mono bg-white p-2 border border-slate-100 rounded">{CODING_PROBLEMS[activeProblemIdx].out}</pre>
                </div>
              </div>

              {/* Code Editor */}
              <div className="flex-1 flex flex-col bg-slate-900">
                <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex justify-between items-center shrink-0">
                  <div className="flex gap-2">
                    {Object.keys(LANGS).map(lKey => (
                      <button 
                        key={lKey}
                        onClick={() => setCodingLang(lKey)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${codingLang === lKey ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'}`}
                      >
                        {LANGS[lKey].name}
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  value={codingCode}
                  onChange={(e) => setCodingCode(e.target.value)}
                  className="flex-1 w-full bg-transparent text-slate-300 p-4 font-mono text-sm resize-none focus:outline-none"
                  spellCheck="false"
                />
                <div className="bg-slate-800 p-4 border-t border-slate-700 flex justify-between items-center shrink-0 h-20">
                  <div>
                    {runStatus === 'running' && (
                      <span className="text-blue-400 text-sm font-bold flex items-center gap-2 animate-pulse">
                        <PlayCircle className="w-4 h-4 animate-spin" /> Running tests...
                      </span>
                    )}
                    {runStatus === 'success' && (
                      <span className="text-emerald-400 text-sm font-bold flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" /> Success! All cases passed.
                      </span>
                    )}
                    {runStatus === 'wrong' && (
                      <span className="text-rose-400 text-sm font-bold flex items-center gap-2">
                        <X className="w-5 h-5" /> Wrong Answer / Unchanged Template.
                      </span>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={handleCodingSubmit}
                      disabled={runStatus === 'running'}
                      className={`px-5 py-2.5 text-white text-sm font-bold rounded-xl transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed ${runStatus === 'success' ? 'bg-emerald-600 hover:bg-emerald-700' : runStatus === 'wrong' ? 'bg-rose-600 hover:bg-rose-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                      <Send className="w-4 h-4" /> {runStatus === 'success' ? 'Solved' : runStatus === 'wrong' ? 'Try Again' : 'Submit Code'}
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
