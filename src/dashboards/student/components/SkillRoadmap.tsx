import React, { useState } from 'react';
import { Bookmark, ArrowLeft, CheckCircle2, ChevronRight, Zap, Target, BookOpen, X, Code2, Database, Terminal, Cpu } from 'lucide-react';

const DOMAINS = [
  { id: 'Full Stack', icon: Code2, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 'Data Analyst', icon: Database, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { id: 'AI Engineer / Data Scientist', icon: Cpu, color: 'text-purple-500', bg: 'bg-purple-50' },
  { id: 'DevOps / Cloud', icon: Terminal, color: 'text-orange-500', bg: 'bg-orange-50' }
];

// Highly granular, bottom-up technical mastery learning tree
const INITIAL_ROADMAP_DATA: Record<string, any> = {
  'Full Stack': {
    title: 'Full Stack Developer',
    description: 'A granular, step-by-step path to mastering modern full-stack web development, from fundamentals to cloud deployment.',
    sections: [
      {
        title: 'Level 1: Internet & Web Fundamentals',
        checkpoint: 'Web Basics',
        nodes: [
          { name: 'How the Internet Works (HTTP/DNS)', status: 'done' },
          { name: 'HTML5 Semantic Structure & Forms', status: 'done' },
          { name: 'Web Accessibility (a11y) Basics', status: 'done' }
        ]
      },
      {
        title: 'Level 2: Styling & Layouts',
        checkpoint: 'UI Mastery',
        nodes: [
          { name: 'CSS3 Flexbox & CSS Grid', status: 'learning' },
          { name: 'Responsive Design & Media Queries', status: 'pending' },
          { name: 'CSS Variables & Modern Selectors', status: 'pending' },
          { name: 'TailwindCSS / Utility-first CSS', status: 'pending' }
        ]
      },
      {
        title: 'Level 3: JavaScript Deep Dive',
        checkpoint: 'Language Core',
        nodes: [
          { name: 'Variables, Data Types & Functions', status: 'pending' },
          { name: 'DOM Manipulation & Events', status: 'pending' },
          { name: 'ES6+ Features & Modules', status: 'pending' },
          { name: 'Async JS, Promises & Fetch API', status: 'pending' }
        ]
      },
      {
        title: 'Level 4: Tooling & Version Control',
        checkpoint: 'Developer Workflow',
        nodes: [
          { name: 'Git & GitHub Workflows', status: 'pending' },
          { name: 'NPM / Yarn / PNPM Package Managers', status: 'pending' },
          { name: 'Vite & Webpack Bundlers', status: 'pending' }
        ]
      },
      {
        title: 'Level 5: React Frontend Architecture',
        checkpoint: 'Modern Frontend',
        nodes: [
          { name: 'React Components, Props & JSX', status: 'pending' },
          { name: 'React Hooks (useState, useEffect, etc.)', status: 'pending' },
          { name: 'React Router & Navigation', status: 'pending' },
          { name: 'State Management (Zustand/Redux)', status: 'pending' },
          { name: 'Data Fetching (React Query/SWR)', status: 'pending' }
        ]
      },
      {
        title: 'Level 6: Backend Fundamentals (Node.js)',
        checkpoint: 'Server-Side',
        nodes: [
          { name: 'Node.js Runtime & Event Loop', status: 'pending' },
          { name: 'Express.js & Routing', status: 'pending' },
          { name: 'RESTful API Design Principles', status: 'pending' },
          { name: 'Middleware & Error Handling', status: 'pending' }
        ]
      },
      {
        title: 'Level 7: Databases & Data Modeling',
        checkpoint: 'Data Persistence',
        nodes: [
          { name: 'Relational DBs & SQL (PostgreSQL)', status: 'pending' },
          { name: 'NoSQL Databases (MongoDB)', status: 'pending' },
          { name: 'ORMs (Prisma / Drizzle)', status: 'pending' },
          { name: 'Redis Caching Basics', status: 'pending' }
        ]
      },
      {
        title: 'Level 8: Security & Authentication',
        checkpoint: 'Secure Apps',
        nodes: [
          { name: 'JWT & Session-based Auth', status: 'pending' },
          { name: 'OAuth 2.0 (Google/GitHub Login)', status: 'pending' },
          { name: 'Web Security (CORS, XSS, CSRF)', status: 'pending' }
        ]
      },
      {
        title: 'Level 9: Deployment & DevOps',
        checkpoint: 'Production Ready',
        nodes: [
          { name: 'Docker Containerization', status: 'pending' },
          { name: 'CI/CD (GitHub Actions)', status: 'pending' },
          { name: 'Cloud Hosting (Vercel, AWS EC2)', status: 'pending' }
        ]
      }
    ]
  },
  'Data Analyst': {
    title: 'Data Analyst',
    description: 'Transform raw data into actionable business insights using statistical programming and visualization tools.',
    sections: [
      {
        title: 'Level 1: Data Fundamentals',
        checkpoint: 'Data Literacy',
        nodes: [
          { name: 'Types of Data & Formats (CSV, JSON)', status: 'done' },
          { name: 'Data Quality & Cleaning Basics', status: 'done' }
        ]
      },
      {
        title: 'Level 2: Spreadsheets Mastery',
        checkpoint: 'Excel / Sheets',
        nodes: [
          { name: 'Advanced Formulas (VLOOKUP, INDEX/MATCH)', status: 'learning' },
          { name: 'Pivot Tables & Dashboards', status: 'pending' },
          { name: 'Power Query Basics', status: 'pending' }
        ]
      },
      {
        title: 'Level 3: BI & Storytelling',
        checkpoint: 'Visual Insights',
        nodes: [
          { name: 'Tableau / PowerBI Fundamentals', status: 'pending' },
          { name: 'Interactive Dashboards', status: 'pending' },
          { name: 'Data Storytelling Principles', status: 'pending' }
        ]
      },
      {
        title: 'Level 4: Database Querying (SQL)',
        checkpoint: 'Data Extraction',
        nodes: [
          { name: 'SQL SELECT, WHERE, & Aggregations', status: 'pending' },
          { name: 'Table JOINs & Subqueries', status: 'pending' },
          { name: 'Window Functions & CTEs', status: 'pending' }
        ]
      },
      {
        title: 'Level 5: Python for Data',
        checkpoint: 'Programming',
        nodes: [
          { name: 'Jupyter Notebooks & Python Basics', status: 'pending' },
          { name: 'Data Structures (Lists, Dictionaries)', status: 'pending' }
        ]
      },
      {
        title: 'Level 6: Data Wrangling',
        checkpoint: 'Processing',
        nodes: [
          { name: 'Pandas DataFrames', status: 'pending' },
          { name: 'NumPy Arrays & Math', status: 'pending' },
          { name: 'Handling Missing Data & Outliers', status: 'pending' }
        ]
      },
      {
        title: 'Level 7: Visualization Libraries',
        checkpoint: 'Custom Charts',
        nodes: [
          { name: 'Matplotlib Basics', status: 'pending' },
          { name: 'Seaborn Statistical Plots', status: 'pending' },
          { name: 'Plotly Interactive Visuals', status: 'pending' }
        ]
      },
      {
        title: 'Level 8: Applied Statistics',
        checkpoint: 'Business Ready',
        nodes: [
          { name: 'Descriptive Statistics', status: 'pending' },
          { name: 'Probability Distributions', status: 'pending' },
          { name: 'A/B Testing & Hypothesis Testing', status: 'pending' }
        ]
      }
    ]
  },
  'AI Engineer / Data Scientist': {
    title: 'AI & Data Scientist',
    description: 'Build predictive models, neural networks, and modern generative AI solutions.',
    sections: [
      {
        title: 'Level 1: Mathematical Foundations',
        checkpoint: 'Math Core',
        nodes: [
          { name: 'Linear Algebra (Vectors, Matrices)', status: 'done' },
          { name: 'Calculus for Deep Learning', status: 'learning' },
          { name: 'Probability & Statistics', status: 'pending' }
        ]
      },
      {
        title: 'Level 2: Python Data Science Stack',
        checkpoint: 'Data Handling',
        nodes: [
          { name: 'Advanced Python (OOP, Generators)', status: 'pending' },
          { name: 'Pandas & Feature Engineering', status: 'pending' },
          { name: 'Scikit-learn Pipelines', status: 'pending' }
        ]
      },
      {
        title: 'Level 3: Classical Machine Learning',
        checkpoint: 'ML Algorithms',
        nodes: [
          { name: 'Linear & Logistic Regression', status: 'pending' },
          { name: 'Decision Trees & Random Forests', status: 'pending' },
          { name: 'XGBoost & Gradient Boosting', status: 'pending' },
          { name: 'K-Means Clustering & PCA', status: 'pending' }
        ]
      },
      {
        title: 'Level 4: ML Operations (MLOps)',
        checkpoint: 'Tracking',
        nodes: [
          { name: 'Model Evaluation Metrics', status: 'pending' },
          { name: 'Experiment Tracking (MLflow / W&B)', status: 'pending' },
          { name: 'Hyperparameter Tuning', status: 'pending' }
        ]
      },
      {
        title: 'Level 5: Deep Learning Foundations',
        checkpoint: 'Neural Nets',
        nodes: [
          { name: 'Artificial Neural Networks (ANNs)', status: 'pending' },
          { name: 'PyTorch / TensorFlow Frameworks', status: 'pending' },
          { name: 'Backpropagation & Optimizers', status: 'pending' }
        ]
      },
      {
        title: 'Level 6: Specialized Architectures',
        checkpoint: 'Vision & Text',
        nodes: [
          { name: 'CNNs for Computer Vision', status: 'pending' },
          { name: 'RNNs & LSTMs', status: 'pending' },
          { name: 'Word Embeddings (Word2Vec, GloVe)', status: 'pending' }
        ]
      },
      {
        title: 'Level 7: Modern AI & Transformers',
        checkpoint: 'State-of-the-Art',
        nodes: [
          { name: 'Attention Mechanism & Transformers', status: 'pending' },
          { name: 'Hugging Face Transformers Library', status: 'pending' }
        ]
      },
      {
        title: 'Level 8: Generative AI & LLMs',
        checkpoint: 'GenAI',
        nodes: [
          { name: 'LLM Prompt Engineering', status: 'pending' },
          { name: 'RAG (Retrieval-Augmented Gen) & Vector DBs', status: 'pending' },
          { name: 'LangChain & LlamaIndex', status: 'pending' },
          { name: 'PEFT & LoRA Fine-tuning', status: 'pending' }
        ]
      },
      {
        title: 'Level 9: AI Deployment',
        checkpoint: 'Production',
        nodes: [
          { name: 'FastAPI for Model Serving', status: 'pending' },
          { name: 'ONNX & TensorRT Optimization', status: 'pending' },
          { name: 'Dockerizing AI Applications', status: 'pending' }
        ]
      }
    ]
  },
  'DevOps / Cloud': {
    title: 'DevOps & Cloud Engineer',
    description: 'Automate infrastructure, ensure system reliability at scale, and master cloud architectures.',
    sections: [
      {
        title: 'Level 1: OS & Linux Mastery',
        checkpoint: 'Systems Core',
        nodes: [
          { name: 'Linux CLI & File Systems', status: 'done' },
          { name: 'Bash Scripting & Automation', status: 'learning' },
          { name: 'SSH & User Management', status: 'pending' }
        ]
      },
      {
        title: 'Level 2: Networking & Security',
        checkpoint: 'Connectivity',
        nodes: [
          { name: 'TCP/IP, DNS, & HTTP/S', status: 'pending' },
          { name: 'Firewalls & Load Balancing', status: 'pending' },
          { name: 'SSL/TLS Certificates', status: 'pending' }
        ]
      },
      {
        title: 'Level 3: Version Control & Collaboration',
        checkpoint: 'Git Ops',
        nodes: [
          { name: 'Advanced Git (Rebase, Cherry-pick)', status: 'pending' },
          { name: 'Branching Strategies (GitFlow)', status: 'pending' }
        ]
      },
      {
        title: 'Level 4: Containerization',
        checkpoint: 'Containers',
        nodes: [
          { name: 'Docker Architecture & Images', status: 'pending' },
          { name: 'Docker Compose', status: 'pending' },
          { name: 'Container Registries (DockerHub, ECR)', status: 'pending' }
        ]
      },
      {
        title: 'Level 5: CI/CD Pipelines',
        checkpoint: 'Automation',
        nodes: [
          { name: 'GitHub Actions Workflows', status: 'pending' },
          { name: 'Jenkins / GitLab CI Basics', status: 'pending' },
          { name: 'Automated Testing Integrations', status: 'pending' }
        ]
      },
      {
        title: 'Level 6: Infrastructure as Code (IaC)',
        checkpoint: 'Declarative Infra',
        nodes: [
          { name: 'Terraform State & Modules', status: 'pending' },
          { name: 'Ansible Configuration Management', status: 'pending' },
          { name: 'AWS CloudFormation', status: 'pending' }
        ]
      },
      {
        title: 'Level 7: Cloud Providers (AWS/Azure)',
        checkpoint: 'Cloud Native',
        nodes: [
          { name: 'IAM & Security Groups', status: 'pending' },
          { name: 'Compute (EC2, Lambda)', status: 'pending' },
          { name: 'Storage (S3, RDS)', status: 'pending' },
          { name: 'VPC & Cloud Networking', status: 'pending' }
        ]
      },
      {
        title: 'Level 8: Container Orchestration',
        checkpoint: 'Kubernetes',
        nodes: [
          { name: 'K8s Architecture (Pods, Nodes, Clusters)', status: 'pending' },
          { name: 'Deployments & Services', status: 'pending' },
          { name: 'Helm Package Manager', status: 'pending' }
        ]
      },
      {
        title: 'Level 9: Monitoring & Observability',
        checkpoint: 'Reliability',
        nodes: [
          { name: 'Prometheus & Grafana', status: 'pending' },
          { name: 'ELK Stack (Elasticsearch, Logstash, Kibana)', status: 'pending' },
          { name: 'Datadog / New Relic Basics', status: 'pending' }
        ]
      }
    ]
  }
};

const NodeItem = ({ node, onStatusChange }: { node: any, onStatusChange: (status: string) => void }) => {
  const [showPopover, setShowPopover] = useState(false);

  let wrapperClass = "bg-white border-slate-200 hover:border-slate-300 hover:shadow-md";
  let textClass = "text-slate-700";
  let Icon = BookOpen;
  let iconClass = "text-slate-400 group-hover:text-blue-500";
  let extraBadge = null;
  let nodeGlow = "";

  if (node.status === 'done') {
    wrapperClass = "bg-emerald-50/80 border-emerald-200 hover:border-emerald-300 hover:shadow-md";
    textClass = "text-slate-400 line-through decoration-slate-300";
    Icon = CheckCircle2;
    iconClass = "text-emerald-500";
  } else if (node.status === 'learning') {
    wrapperClass = "bg-purple-50/80 border-purple-300 shadow-md ring-2 ring-purple-100 scale-[1.02]";
    textClass = "text-purple-900";
    Icon = Zap;
    iconClass = "text-purple-500 animate-pulse";
    nodeGlow = "shadow-[0_0_15px_rgba(168,85,247,0.15)]";
    extraBadge = <span className="text-[10px] uppercase tracking-wider font-black text-purple-700 bg-purple-200/80 px-2.5 py-0.5 rounded-full ml-3 shrink-0 border border-purple-300/50">Learning</span>;
  } else if (node.status === 'skip') {
    wrapperClass = "opacity-50 bg-slate-50 border-slate-200 grayscale-[50%] hover:grayscale-0 transition-all";
    textClass = "text-slate-500";
    Icon = X;
    iconClass = "text-slate-400";
  }

  // Handle cycle logic on click
  const handleCycle = (e: React.MouseEvent) => {
    // If popover is meant to be opened on right click or separate button, we can do cycle on main body
    // but the prompt asked for "cycle through OR select states". 
    // We will stick to opening popover on click for explicit selection, 
    // to match the existing rich interaction model.
    setShowPopover(!showPopover);
  };

  return (
    <div 
      className={`relative px-4 py-3.5 rounded-2xl border-2 transition-all duration-300 cursor-pointer group flex items-center justify-between ${wrapperClass} ${nodeGlow}`} 
      onClick={handleCycle}
    >
      <div className="flex items-center gap-3">
        <div className={`p-1.5 rounded-lg bg-white/60 shadow-sm ${node.status === 'learning' ? 'bg-purple-100/50' : ''}`}>
          <Icon className={`w-4 h-4 ${iconClass}`} />
        </div>
        <span className={`font-bold text-sm tracking-tight text-left ${textClass}`}>
          {node.name}
        </span>
      </div>
      
      {extraBadge}
      
      {/* Interactive Popover */}
      {showPopover && (
        <div 
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-40 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-200/60 p-1.5 z-50 flex flex-col gap-1 animate-in fade-in zoom-in-95 duration-200" 
          onClick={e => e.stopPropagation()}
        >
          <button 
            onClick={() => { onStatusChange('learning'); setShowPopover(false); }} 
            className="text-xs font-bold px-3 py-2.5 rounded-lg hover:bg-purple-50 text-purple-700 text-left w-full flex items-center gap-2.5 transition-colors cursor-pointer"
          >
            <Zap className="w-4 h-4 text-purple-500" /> Mark Learning
          </button>
          <button 
            onClick={() => { onStatusChange('done'); setShowPopover(false); }} 
            className="text-xs font-bold px-3 py-2.5 rounded-lg hover:bg-emerald-50 text-emerald-700 text-left w-full flex items-center gap-2.5 transition-colors cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Mark Done
          </button>
          <button 
            onClick={() => { onStatusChange('skip'); setShowPopover(false); }} 
            className="text-xs font-bold px-3 py-2.5 rounded-lg hover:bg-slate-100 text-slate-600 text-left w-full flex items-center gap-2.5 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 text-slate-400" /> Skip Module
          </button>
          <div className="h-px bg-slate-100 my-1 w-full"></div>
          <button 
            onClick={() => { onStatusChange('pending'); setShowPopover(false); }} 
            className="text-xs font-bold px-3 py-2.5 rounded-lg hover:bg-slate-50 text-slate-400 text-left w-full flex items-center gap-2.5 transition-colors cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-slate-300" /> Reset State
          </button>
        </div>
      )}
    </div>
  );
};

export const SkillRoadmap = () => {
  const [roadmapData, setRoadmapData] = useState(() => JSON.parse(JSON.stringify(INITIAL_ROADMAP_DATA)));
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  const handleStatusChange = (domain: string, sectionIdx: number, nodeIdx: number, newStatus: string) => {
    setRoadmapData((prev: Record<string, any>) => {
      const newData = { ...prev };
      
      if (!newData[domain]) {
        newData[domain] = {
          title: domain,
          description: `Standardized roadmap and checkpoints for ${domain}.`,
          sections: [
            {
              title: 'Core Fundamentals',
              nodes: [
                { name: 'Introduction to ' + domain, status: 'pending' },
                { name: 'Basic Principles', status: 'pending' },
              ]
            }
          ]
        };
      }
      
      const newDomainData = { ...newData[domain] };
      const newSections = [...newDomainData.sections];
      const newNodes = [...newSections[sectionIdx].nodes];
      
      newNodes[nodeIdx] = { ...newNodes[nodeIdx], status: newStatus };
      newSections[sectionIdx] = { ...newSections[sectionIdx], nodes: newNodes };
      newDomainData.sections = newSections;
      
      newData[domain] = newDomainData;
      return newData;
    });
  };

  if (!selectedDomain) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Technical Mastery Trees</h2>
            <p className="text-sm text-slate-500 font-medium mt-1">Select a specialization to track your granular learning progress.</p>
          </div>
          <div className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 shadow-sm flex items-center gap-2">
            <Target className="w-3.5 h-3.5" /> Select Track
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DOMAINS.map((domainObj, idx) => {
            const DomainIcon = domainObj.icon;
            return (
              <div 
                key={idx}
                onClick={() => setSelectedDomain(domainObj.id)}
                className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm hover:shadow-xl hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer group relative overflow-hidden flex flex-col h-full"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-slate-50 to-transparent -z-10 group-hover:scale-110 transition-transform duration-500 rounded-bl-full"></div>
                
                <div className={`${domainObj.bg} w-12 h-12 rounded-xl flex items-center justify-center mb-4 border border-white shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                  <DomainIcon className={`w-6 h-6 ${domainObj.color}`} />
                </div>
                
                <div className="flex flex-col flex-grow">
                  <h3 className="font-black text-slate-800 text-lg group-hover:text-blue-600 transition-colors leading-tight mb-2">{domainObj.id}</h3>
                  <div className="mt-auto flex justify-between items-center pt-4">
                    <span className="text-xs font-bold text-slate-400 group-hover:text-blue-500 transition-colors">View Tree</span>
                    <div className="bg-slate-50 group-hover:bg-blue-50 p-1.5 rounded-lg transition-colors">
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const currentRoadmap = roadmapData[selectedDomain] || {
    title: selectedDomain,
    description: `Standardized roadmap and checkpoints for ${selectedDomain}.`,
    sections: [
      {
        title: 'Core Fundamentals',
        nodes: [
          { name: 'Introduction to ' + selectedDomain, status: 'pending' },
          { name: 'Basic Principles', status: 'pending' },
        ]
      }
    ]
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500 w-full pb-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 sticky top-0 bg-[#F4F7FB]/95 backdrop-blur-xl z-40 py-5 border-b border-slate-200/50 gap-4">
        <button 
          onClick={() => setSelectedDomain(null)}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold text-sm px-4 py-2.5 bg-white rounded-xl shadow-sm border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Roadmaps
        </button>
        <div className="md:text-right flex-1 w-full flex flex-col md:items-end">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            {currentRoadmap.title}
          </h2>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1 bg-slate-100 px-2 py-0.5 rounded-md inline-block">Bottom-Up Mastery Tree</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-0">
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 via-purple-100/50 to-emerald-100/50 blur-3xl -z-10 rounded-full opacity-50"></div>
          <p className="text-slate-600 bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-200/60 shadow-lg inline-block text-sm md:text-base font-medium leading-relaxed max-w-2xl">
            {currentRoadmap.description}
          </p>
        </div>

        <div className="relative">
          {/* Central Connecting Line */}
          <div className="absolute left-1/2 top-4 bottom-4 w-1.5 bg-gradient-to-b from-slate-200 via-slate-200 to-transparent -translate-x-1/2 z-0 rounded-full hidden md:block"></div>

          {/* Tree built bottom-up visually */}
          <div className="flex flex-col-reverse gap-y-16 relative z-10">
            {currentRoadmap.sections.map((section: any, originalIdx: number) => (
              <div key={originalIdx} className="relative group/section">
                
                {/* Checkpoint / Section Header */}
                <div className="flex justify-center mb-10 sticky top-32 z-30 pointer-events-none">
                  <div className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-black text-sm shadow-xl flex items-center gap-2.5 border border-slate-700/50 pointer-events-auto transition-transform group-hover/section:scale-105">
                    <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center">
                      <Target className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                    {section.checkpoint || section.title}
                  </div>
                </div>

                {/* Nodes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-6 relative">
                  {section.nodes.map((node: any, nIdx: number) => {
                    const isLeft = nIdx % 2 === 0;
                    
                    const lineColors: Record<string, string> = {
                      done: 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]',
                      learning: 'bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.5)]',
                      skip: 'bg-slate-200 opacity-50',
                      pending: 'bg-slate-200'
                    };
                    const lineClass = lineColors[node.status] || lineColors.pending;

                    return (
                      <div key={nIdx} className={`relative ${isLeft ? 'md:text-right md:pr-10' : 'md:col-start-2 md:pl-10'} z-10 hover:z-20`}>
                        {/* Connector Line for Desktop */}
                        <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-10 h-1 rounded-full transition-colors duration-500 ${lineClass} ${isLeft ? 'right-0' : 'left-0'}`}></div>
                        
                        {/* Dot on the central line */}
                        <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white transition-all duration-500 z-10 ${isLeft ? 'right-[-26px]' : 'left-[-26px]'} ${node.status === 'done' ? 'bg-emerald-500 scale-110' : node.status === 'learning' ? 'bg-purple-500 scale-110 animate-pulse' : node.status === 'skip' ? 'bg-slate-300' : 'bg-slate-400'}`}></div>

                        <div className={`inline-block w-full max-w-sm ${isLeft ? 'md:mr-auto' : 'md:ml-auto'}`}>
                          <NodeItem 
                            node={node} 
                            onStatusChange={(newStatus) => handleStatusChange(selectedDomain, originalIdx, nIdx, newStatus)} 
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

