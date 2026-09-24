import React, { useState } from 'react';
import jsPDF from 'jspdf';
import {
  Users, School, Calendar, ChevronRight, Award, Shield,
  BookOpen, Clock, MapPin, CheckCircle2, X,
  Sparkles, Layers, Check, Download, Edit3, Share2,
  Building2, Video, Copy, Mail, ExternalLink
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Types & Interfaces
// ─────────────────────────────────────────────────────────────────────────────

type ProgramTab = 'mentorship' | 'certification' | 'workshop';

export interface WeekSyllabus {
  week: number;
  title: string;
  topics: string[];
}

export interface MentorshipItem {
  id: string;
  title: string;
  institution: string;
  mentorLead: string;
  mentorContact: {
    email: string;
    phone: string;
    role: string;
  };
  facultyCoordinator: {
    name: string;
    department: string;
    email: string;
  };
  duration: string;
  studentsEnrolled: number;
  status: 'Active' | 'Under Proposal' | 'Completed';
  domain: string;
  milestone?: string;
  progressPercent?: number;
  nextLiveSync?: string;
  googleMeetUrl: string;
  inPersonVenue: string;
  sessionSchedule: string;
  syllabus: WeekSyllabus[];
}

export interface CertificationCourse {
  id: string;
  title: string;
  domain: string;
  duration: string;
  overview: string;
  modules: string[];
  enrolledStudents: number;
  partnerCompany: string;
  published?: boolean;
  examWindow: string;
  totalSlots: number;
  bookedSlots: number;
  highlightChips?: string[];
}

export interface WorkshopParticipant {
  id: string;
  name: string;
  college: string;
  branch: string;
  registeredAt: string;
  attendanceStatus: 'Confirmed' | 'Waitlisted';
}

export interface BeginnerWorkshop {
  id: string;
  title: string;
  instructor: string;
  date: string;
  time: string;
  location: string;
  maxCandidates: string;
  totalSeats: number;
  reservedSeats: number;
  prerequisites: string;
  overview: string;
  meetUrl: string;
  deckUrl: string;
  participants: WorkshopParticipant[];
  skills?: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Initial Mock Data
// ─────────────────────────────────────────────────────────────────────────────

const SAMPLE_12_WEEK_SYLLABUS: WeekSyllabus[] = [
  { week: 1, title: 'Orientation & Architecture Foundations', topics: ['Distributed System Topology', 'Monolith to Microservices'] },
  { week: 2, title: 'Protocols & Inter-Service Comms', topics: ['gRPC vs REST', 'Protocol Buffers', 'TCP/IP Optimization'] },
  { week: 3, title: 'Data Persistence & Replication', topics: ['Distributed SQL', 'ACID vs BASE', 'Consensus (Raft/Paxos)'] },
  { week: 4, title: 'System Architecture & Interface Design', topics: ['C4 Architecture Model', 'API Gateway Patterns'] },
  { week: 5, title: 'Asynchronous Messaging & Event Streams', topics: ['Apache Kafka', 'Event Sourcing', 'Dead Letter Queues'] },
  { week: 6, title: 'Mid-Term Architecture Defense', topics: ['Team Presentations', 'Industry Architecture Review'] },
  { week: 7, title: 'Scalability & Caching Layers', topics: ['Distributed Redis', 'Cache Invalidation Strategies'] },
  { week: 8, title: 'Containerization & Orchestration', topics: ['Docker Internals', 'Kubernetes Deployment Patterns'] },
  { week: 9, title: 'Observability & Zero-Trust Security', topics: ['Distributed Tracing (Jaeger)', 'OAuth2 / mTLS'] },
  { week: 10, title: 'Chaos Engineering & Fault Tolerance', topics: ['Circuit Breakers', 'Load Testing & Chaos Mesh'] },
  { week: 11, title: 'Final Code Hardening & CI/CD', topics: ['Production Helm Charts', 'Automated Canary Deployments'] },
  { week: 12, title: 'Capstone Demo Day & Evaluation', topics: ['Executive Industry Panel', 'Certification Awards'] }
];

const INITIAL_MENTORSHIP_TRACKS: MentorshipItem[] = [
  {
    id: 'mp-1',
    title: 'Full-Stack Distributed Systems Mentorship Track',
    institution: 'IIT Madras',
    mentorLead: 'Dr. R. Sundaram (Principal Architect)',
    mentorContact: {
      email: 'sundaram.r@technova.io',
      phone: '+91 98410 22341',
      role: 'Principal Architect & Distributed Systems Lead'
    },
    facultyCoordinator: {
      name: 'Prof. K. Venkatesh',
      department: 'Dept of Computer Science & Engineering',
      email: 'venkatesh.k@iitm.ac.in'
    },
    duration: '12 Weeks (Aug - Nov 2026)',
    studentsEnrolled: 45,
    status: 'Active',
    domain: 'Full-Stack & Cloud',
    milestone: 'Phase 2 - System Architecture | Week 4 of 12',
    progressPercent: 33,
    nextLiveSync: 'Oct 18, 2026 • 4:00 PM IST',
    googleMeetUrl: 'https://meet.google.com/new',
    inPersonVenue: 'Auditorium 3B, CSE Dept, IIT Madras',
    sessionSchedule: 'Tuesdays & Thursdays • 4:00 PM – 5:30 PM IST',
    syllabus: SAMPLE_12_WEEK_SYLLABUS
  },
  {
    id: 'mp-2',
    title: 'Applied AI & LLM Deployment for Enterprise',
    institution: 'Anna University',
    mentorLead: 'K. Meenakshi (Director of Data Engineering)',
    mentorContact: {
      email: 'meenakshi.k@datasphere.ai',
      phone: '+91 94440 88219',
      role: 'Director of Applied AI & Data Systems'
    },
    facultyCoordinator: {
      name: 'Dr. M. Senthil Kumar',
      department: 'Dept of Information Science & Technology',
      email: 'senthil.m@annauniv.edu'
    },
    duration: '8 Weeks (Sep - Oct 2026)',
    studentsEnrolled: 60,
    status: 'Active',
    domain: 'AI & Data Engineering',
    milestone: 'Phase 3 - Model Optimization & vLLM Serving | Week 5 of 8',
    progressPercent: 62,
    nextLiveSync: 'Oct 19, 2026 • 5:30 PM IST',
    googleMeetUrl: 'https://meet.google.com/new',
    inPersonVenue: 'Ramanujan Computing Complex, Hall 4, Anna University',
    sessionSchedule: 'Mondays & Wednesdays • 5:30 PM – 7:00 PM IST',
    syllabus: SAMPLE_12_WEEK_SYLLABUS.slice(0, 8)
  },
  {
    id: 'mp-3',
    title: 'Cybersecurity & Secure Systems Architecture',
    institution: 'NIT Trichy',
    mentorLead: 'V. Anand (Security Fellow)',
    mentorContact: {
      email: 'anand.v@edgecraft.sec',
      phone: '+91 97910 44520',
      role: 'Principal Security Fellow & Threat Researcher'
    },
    facultyCoordinator: {
      name: 'Dr. S. Mary Saira Bhanu',
      department: 'Dept of Computer Applications',
      email: 'mary.s@nitt.edu'
    },
    duration: '10 Weeks (Starting Oct 2026)',
    studentsEnrolled: 30,
    status: 'Under Proposal',
    domain: 'Cybersecurity & Network',
    milestone: 'Proposal Phase - Awaiting Industry Sponsor Sign-off',
    progressPercent: 10,
    nextLiveSync: 'Pending Approval',
    googleMeetUrl: 'https://meet.google.com/new',
    inPersonVenue: 'Octagon Computer Centre, Seminar Hall B, NIT Trichy',
    sessionSchedule: 'Fridays • 3:00 PM – 5:00 PM IST',
    syllabus: SAMPLE_12_WEEK_SYLLABUS.slice(0, 10)
  }
];

const INITIAL_CERTIFICATION_COURSES: CertificationCourse[] = [
  {
    id: 'cert-1',
    title: 'Generative AI & LLM Deployment',
    domain: 'Artificial Intelligence',
    duration: '8 Weeks (Self-paced & Live Labs)',
    partnerCompany: 'TechNova AI Research',
    overview: 'Production-ready training covering prompt engineering, fine-tuning open-source LLMs, RAG architectures, and scalable inference deployment with vLLM and TensorRT.',
    modules: [
      'Module 1: Foundations of Foundation Models & Tokenization',
      'Module 2: Retrieval-Augmented Generation (RAG) & Vector Stores',
      'Module 3: Parameter-Efficient Fine-Tuning (LoRA / QLoRA)',
      'Module 4: Enterprise LLM Serving, Guardrails & Eval Harness'
    ],
    highlightChips: ['Prompt Engineering', 'LoRA Fine-Tuning', 'RAG & Vector Stores', 'vLLM & TensorRT'],
    enrolledStudents: 142,
    examWindow: 'Oct 15, 2026 – Oct 20, 2026',
    totalSlots: 200,
    bookedSlots: 142
  },
  {
    id: 'cert-2',
    title: 'Cloud-Native DevOps & Kubernetes',
    domain: 'Cloud Infrastructure',
    duration: '10 Weeks (Weekend Live Cohorts)',
    partnerCompany: 'Cloudify Networks',
    overview: 'Comprehensive industry certification targeting container orchestration, automated GitOps pipelines, infrastructure as code with Terraform, and zero-trust service meshes.',
    modules: [
      'Module 1: Docker Internals & Container Security Hardening',
      'Module 2: Production Kubernetes Architecture & Helm Packaging',
      'Module 3: GitOps with ArgoCD & Progressive Canary Rollouts',
      'Module 4: Observability: Prometheus, Grafana, OpenTelemetry'
    ],
    highlightChips: ['Container Orchestration', 'GitOps Pipelines', 'Terraform IaC', 'Zero-Trust Mesh'],
    enrolledStudents: 198,
    examWindow: 'Nov 01, 2026 – Nov 06, 2026',
    totalSlots: 250,
    bookedSlots: 198
  },
  {
    id: 'cert-3',
    title: 'Full-Stack Next.js & Microservices',
    domain: 'Software Architecture',
    duration: '6 Weeks (Hands-on Sprint)',
    partnerCompany: 'EdgeCraft Software',
    overview: 'Master modern full-stack web engineering using Next.js 15 App Router, React Server Components, distributed event-driven messaging with Kafka, and scalable SQL databases.',
    modules: [
      'Module 1: Next.js 15 App Router & Server Actions Deep Dive',
      'Module 2: Microservices Inter-Service Comms (gRPC & REST)',
      'Module 3: Event Streaming Architecture with Apache Kafka',
      'Module 4: Database Partitioning, Caching (Redis) & Auth'
    ],
    highlightChips: ['Next.js 15 App Router', 'React Server Components', 'Apache Kafka', 'Distributed SQL'],
    enrolledStudents: 165,
    examWindow: 'Nov 12, 2026 – Nov 18, 2026',
    totalSlots: 200,
    bookedSlots: 165
  }
];

const INITIAL_BEGINNER_WORKSHOPS: BeginnerWorkshop[] = [
  {
    id: 'ws-1',
    title: 'Python Programming for Beginners',
    instructor: 'A. Sharma, Senior Software Fellow',
    date: '25 Oct 2026',
    time: '10:00 AM – 2:00 PM IST',
    location: 'Hybrid / Main Auditorium',
    maxCandidates: 'Max 100',
    totalSeats: 100,
    reservedSeats: 72,
    prerequisites: 'No prior programming experience required. Laptop with Python 3.x installed.',
    overview: 'Interactive crash course introducing variables, data structures, functions, file operations, and writing first command-line automation scripts.',
    skills: ['Variables & Logic', 'Data Structures', 'File Operations', 'CLI Automation'],
    meetUrl: 'https://meet.google.com/new',
    deckUrl: 'https://capfly.io/workshops/deck/python-101',
    participants: [
      { id: 'p-1', name: 'Rithanya S.', college: 'RMK Engineering College', branch: 'CSE - Year 3', registeredAt: 'Oct 02, 2026, 10:14 AM', attendanceStatus: 'Confirmed' },
      { id: 'p-2', name: 'Manoj Kumar', college: 'ABC Institute of Tech', branch: 'ECE - Year 2', registeredAt: 'Oct 03, 2026, 02:40 PM', attendanceStatus: 'Confirmed' },
      { id: 'p-3', name: 'Deepa Krishnan', college: 'XYZ College of Engg', branch: 'IT - Year 3', registeredAt: 'Oct 04, 2026, 09:22 AM', attendanceStatus: 'Confirmed' },
      { id: 'p-4', name: 'Siddharth Rao', college: 'Anna University', branch: 'Mechanical (Minor CS)', registeredAt: 'Oct 05, 2026, 11:05 AM', attendanceStatus: 'Confirmed' },
      { id: 'p-5', name: 'Kavya Balaji', college: 'IIT Madras', branch: 'Electrical Engg', registeredAt: 'Oct 06, 2026, 04:18 PM', attendanceStatus: 'Confirmed' }
    ]
  },
  {
    id: 'ws-2',
    title: 'Git & GitHub Core Mastery',
    instructor: 'P. Raman, Principal DevRel Architect',
    date: '02 Nov 2026',
    time: '11:00 AM – 3:00 PM IST',
    location: 'Virtual Sandbox',
    maxCandidates: 'Max 150',
    totalSeats: 150,
    reservedSeats: 118,
    prerequisites: 'Basic command-line familiarity and free GitHub account.',
    overview: 'Hands-on workshop teaching branch management, rebase workflows, merge conflict resolution, pull request etiquette, and GitHub Actions CI pipelines.',
    skills: ['Branching & Rebase', 'PR Etiquette', 'Merge Conflicts', 'GitHub Actions'],
    meetUrl: 'https://meet.google.com/new',
    deckUrl: 'https://capfly.io/workshops/deck/git-mastery',
    participants: [
      { id: 'p-6', name: 'Arunmozhi Varman', college: 'NIT Trichy', branch: 'CSE - Year 3', registeredAt: 'Oct 03, 2026, 01:15 PM', attendanceStatus: 'Confirmed' },
      { id: 'p-7', name: 'Pavithra Mohan', college: 'RMK Engineering College', branch: 'AI & Data Science', registeredAt: 'Oct 04, 2026, 11:30 AM', attendanceStatus: 'Confirmed' },
      { id: 'p-8', name: 'Harish Nambiar', college: 'ABC Institute of Tech', branch: 'IT - Year 2', registeredAt: 'Oct 05, 2026, 03:45 PM', attendanceStatus: 'Confirmed' }
    ]
  },
  {
    id: 'ws-3',
    title: 'Intro to UI/UX Design with Figma',
    instructor: 'N. Kapoor, Lead Product Designer',
    date: '08 Nov 2026',
    time: '02:00 PM – 6:00 PM IST',
    location: 'Hybrid / Main Auditorium',
    maxCandidates: 'Max 80',
    totalSeats: 80,
    reservedSeats: 64,
    prerequisites: 'Figma free account. Creative mindset, no coding necessary.',
    overview: 'Explore fundamental user interface design principles, layout grids, auto-layout in Figma, component design systems, and rapid clickable prototyping.',
    skills: ['Layout Grids', 'Auto-Layout', 'Design Systems', 'Interactive Prototypes'],
    meetUrl: 'https://meet.google.com/new',
    deckUrl: 'https://capfly.io/workshops/deck/uiux-figma',
    participants: [
      { id: 'p-9', name: 'Tanvi Deshmukh', college: 'XYZ College of Engg', branch: 'CSE - Year 2', registeredAt: 'Oct 06, 2026, 10:00 AM', attendanceStatus: 'Confirmed' },
      { id: 'p-10', name: 'Aditya Pillai', college: 'Anna University', branch: 'Design & Computing', registeredAt: 'Oct 07, 2026, 02:10 PM', attendanceStatus: 'Confirmed' }
    ]
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// Real PDF Generation Function (Client-side via jsPDF)
// ─────────────────────────────────────────────────────────────────────────────

const generateProgramBriefPDF = (program: MentorshipItem) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  let y = 14;

  // Header Dark Banner
  doc.setFillColor(11, 25, 44); // #0B192C
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text('CAPFLY ENTERPRISE MENTORSHIP PROGRAM BRIEF', margin, 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(147, 197, 253);
  doc.text('Official Industry-Academia Collaborative Curriculum Document • AY 2026–2027', margin, 18);
  doc.text(`Generated: ${new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}`, pageWidth - margin - 35, 18);

  y = 36;

  // Program Overview Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, pageWidth - margin * 2, 34, 3, 3, 'FD');

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text(program.title, margin + 5, y + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text(`Partner Institution: ${program.institution}`, margin + 5, y + 15);
  doc.text(`Domain: ${program.domain}`, margin + 5, y + 21);
  doc.text(`Duration: ${program.duration} • Enrolled Cohort: ${program.studentsEnrolled} Candidates`, margin + 5, y + 27);

  doc.text(`Delivery: Hybrid (Google Meet + In-Person Campus Lab)`, margin + 95, y + 15);
  doc.text(`Campus Venue: ${program.inPersonVenue}`, margin + 95, y + 21);
  doc.text(`Status: ${program.status.toUpperCase()}`, margin + 95, y + 27);

  y += 42;

  // Leadership & Contacts
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('PROGRAM LEADERSHIP & FACULTY LIAISON', margin, y);
  y += 4;

  // Mentor Card
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(margin, y, 86, 26, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(29, 78, 216);
  doc.text('INDUSTRY MENTOR LEAD', margin + 4, y + 5.5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text(program.mentorLead, margin + 4, y + 11);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text(program.mentorContact.role, margin + 4, y + 16);
  doc.text(`Email: ${program.mentorContact.email} | Direct: ${program.mentorContact.phone}`, margin + 4, y + 21);

  // Faculty Coordinator Card
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(margin + 90, y, 86, 26, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(109, 40, 217);
  doc.text('UNIVERSITY FACULTY COORDINATOR', margin + 94, y + 5.5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text(program.facultyCoordinator.name, margin + 94, y + 11);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text(program.facultyCoordinator.department, margin + 94, y + 16);
  doc.text(`Institution: ${program.institution} | Email: ${program.facultyCoordinator.email}`, margin + 94, y + 21);

  y += 33;

  // Syllabus Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text(`COMPLETE CURRICULUM SYLLABUS BREAKDOWN (${program.syllabus.length} WEEKS)`, margin, y);
  y += 4;

  // Table header
  doc.setFillColor(11, 25, 44);
  doc.rect(margin, y, pageWidth - margin * 2, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text('WEEK', margin + 3, y + 4.2);
  doc.text('MODULE TITLE & CORE LEARNING OBJECTIVES', margin + 20, y + 4.2);
  doc.text('TOPICS & HANDS-ON LAB COVERAGE', margin + 95, y + 4.2);
  y += 6;

  // Table rows
  program.syllabus.forEach((item, index) => {
    if (y > 270) {
      doc.addPage();
      y = 15;
      doc.setFillColor(11, 25, 44);
      doc.rect(margin, y, pageWidth - margin * 2, 6, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(255, 255, 255);
      doc.text('WEEK', margin + 3, y + 4.2);
      doc.text('MODULE TITLE & CORE LEARNING OBJECTIVES', margin + 20, y + 4.2);
      doc.text('TOPICS & HANDS-ON LAB COVERAGE', margin + 95, y + 4.2);
      y += 6;
    }

    doc.setFillColor(index % 2 === 0 ? 255 : 248, index % 2 === 0 ? 255 : 250, index % 2 === 0 ? 255 : 252);
    doc.rect(margin, y, pageWidth - margin * 2, 8.5, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.rect(margin, y, pageWidth - margin * 2, 8.5, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(29, 78, 216);
    doc.text(`W${item.week}`, margin + 3, y + 5.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    const splitTitle = doc.splitTextToSize(item.title, 70);
    doc.text(splitTitle, margin + 20, y + 5.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(71, 85, 105);
    const topicsText = item.topics.join(' • ');
    const splitTopics = doc.splitTextToSize(topicsText, 80);
    doc.text(splitTopics, margin + 95, y + 5.5);

    y += 8.5;
  });

  y += 5;
  if (y > 275) {
    doc.addPage();
    y = 15;
  }

  // Footer seal
  doc.setDrawColor(203, 213, 225);
  doc.line(margin, y, pageWidth - margin, y);
  y += 4;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text('This program brief is certified by the CapFly Industry Advisory Council and partner institution academic deans.', margin, y);
  doc.text('Verification Hash: CAPFLY-SIG-2026-NITT-IITM-AU-789X', pageWidth - margin - 75, y);

  // Direct Browser Download
  const safeTitle = program.title.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 25);
  doc.save(`Program_Brief_${safeTitle}.pdf`);
};

// ─────────────────────────────────────────────────────────────────────────────
// Slide-Out Program Details Drawer Component
// ─────────────────────────────────────────────────────────────────────────────

interface ProgramDetailsDrawerProps {
  program: MentorshipItem | null;
  onClose: () => void;
  onDownloadBrief: (program: MentorshipItem) => void;
}

const ProgramDetailsDrawer: React.FC<ProgramDetailsDrawerProps> = ({ program, onClose, onDownloadBrief }) => {
  if (!program) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs" onClick={onClose}>
      <div
        className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 overflow-hidden animate-slide-in-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="bg-[#0B192C] px-6 py-5 flex items-center justify-between text-white shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">
              <School className="w-4 h-4" />
              <span>{program.institution} • {program.domain}</span>
            </div>
            <h3 className="text-lg font-black font-['Outfit'] leading-tight">
              {program.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Duration</p>
              <p className="text-xs font-bold text-slate-800 mt-0.5">{program.duration.split(' ')[0]} {program.duration.split(' ')[1]}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Enrolled Mentees</p>
              <p className="text-xs font-bold text-blue-600 mt-0.5">{program.studentsEnrolled} Students</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Status</p>
              <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide mt-0.5 ${
                program.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {program.status}
              </span>
            </div>
          </div>

          {/* Delivery & Venue Info */}
          <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 space-y-2 text-xs">
            <h4 className="font-bold text-blue-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5 text-blue-600" />
              Hybrid Delivery Architecture
            </h4>
            <p className="text-slate-700">
              <strong>Campus Venue:</strong> {program.inPersonVenue}
            </p>
            <p className="text-slate-700">
              <strong>Schedule:</strong> {program.sessionSchedule}
            </p>
            <p className="text-slate-700">
              <strong>Live Meeting Room:</strong>{' '}
              <a
                href={program.googleMeetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-bold underline hover:text-blue-800"
              >
                {program.googleMeetUrl}
              </a>
            </p>
          </div>

          {/* Lead Mentor & Faculty Coordinator Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider">
                <Users className="w-4 h-4 text-blue-600" />
                <span>Lead Industry Mentor</span>
              </div>
              <p className="font-bold text-slate-900 text-sm">{program.mentorLead}</p>
              <p className="text-xs text-slate-500">{program.mentorContact.role}</p>
              <div className="text-xs text-slate-600 pt-1 border-t border-slate-100 space-y-1">
                <p>Email: <strong className="text-slate-800">{program.mentorContact.email}</strong></p>
                <p>Direct: <strong className="text-slate-800">{program.mentorContact.phone}</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-wider">
                <School className="w-4 h-4 text-purple-600" />
                <span>Faculty Coordinator</span>
              </div>
              <p className="font-bold text-slate-900 text-sm">{program.facultyCoordinator.name}</p>
              <p className="text-xs text-slate-500">{program.facultyCoordinator.department}</p>
              <div className="text-xs text-slate-600 pt-1 border-t border-slate-100 space-y-1">
                <p>Institution: <strong className="text-slate-800">{program.institution}</strong></p>
                <p>Email: <strong className="text-slate-800">{program.facultyCoordinator.email}</strong></p>
              </div>
            </div>
          </div>

          {/* Full 12-Week Syllabus */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Full Curriculum Syllabus ({program.syllabus.length} Weeks)</span>
              </h4>
              <span className="text-[11px] text-slate-400 font-medium">Industry Vetted Curriculum</span>
            </div>

            <div className="space-y-2">
              {program.syllabus.map((item) => (
                <div key={item.week} className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 text-xs">
                  <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                    <span className="text-blue-700">Week {item.week}: {item.title}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {item.topics.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[10px] text-slate-600">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Drawer Action Footer with Functional PDF Download */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Close Drawer
          </button>
          <button
            type="button"
            onClick={() => onDownloadBrief(program)}
            className="px-5 py-2.5 bg-[#0B192C] hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <Download className="w-4 h-4 text-blue-400" />
            Download Program Brief (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// In-Person Campus Session & Roster Modal Component
// ─────────────────────────────────────────────────────────────────────────────

interface InPersonModalProps {
  program: MentorshipItem | null;
  onClose: () => void;
}

const InPersonSessionModal: React.FC<InPersonModalProps> = ({ program, onClose }) => {
  if (!program) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4" onClick={onClose}>
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0B192C] px-6 py-4 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-base font-black font-['Outfit']">In-Person Campus Session Details</h3>
              <p className="text-[11px] text-slate-300">{program.institution} • On-Campus Lab Access</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-start gap-2">
              <Building2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-900 text-sm">Assigned Campus Venue</p>
                <p className="text-slate-600 mt-0.5">{program.inPersonVenue}</p>
              </div>
            </div>

            <div className="flex items-start gap-2 pt-2 border-t border-slate-200">
              <Clock className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-900">Weekly Scheduled Timings</p>
                <p className="text-slate-600 mt-0.5">{program.sessionSchedule}</p>
              </div>
            </div>
          </div>

          {/* Session Roster Info */}
          <div className="space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span className="uppercase tracking-wider text-[11px]">Enrolled Student Check-In Roster</span>
              <span className="text-blue-600 font-black">{program.studentsEnrolled} Registered Students</span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 text-slate-600 space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span>Physical Lab Check-in Mode:</span>
                <span className="font-semibold text-slate-900">Institution RFID / Smart ID Badge</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span>Faculty Proctor:</span>
                <span className="font-semibold text-slate-900">{program.facultyCoordinator.name}</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span>Attendance Threshold:</span>
                <span className="font-semibold text-emerald-700">85% Mandatory for Course Completion</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Workshop Registered Participants Modal Component
// ─────────────────────────────────────────────────────────────────────────────

interface ParticipantsModalProps {
  workshop: BeginnerWorkshop | null;
  onClose: () => void;
}

const WorkshopParticipantsModal: React.FC<ParticipantsModalProps> = ({ workshop, onClose }) => {
  if (!workshop) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4" onClick={onClose}>
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0B192C] px-6 py-4 flex items-center justify-between text-white shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs text-blue-400 font-bold uppercase tracking-wider">
              <Users className="w-4 h-4" />
              <span>Registered Candidate Roster</span>
            </div>
            <h3 className="text-base font-black font-['Outfit'] mt-0.5">{workshop.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sub-Header / Capacity Count */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span>Capacity: <strong>{workshop.reservedSeats} / {workshop.totalSeats} Seats Filled</strong></span>
          <span className="font-semibold text-emerald-700">● Live Enrollment Sync</span>
        </div>

        {/* List of Registered Participants */}
        <div className="p-6 overflow-y-auto space-y-2 flex-1">
          {workshop.participants.map((p, idx) => (
            <div key={p.id} className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs hover:border-blue-300 transition-colors">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-700 font-bold flex items-center justify-center text-[10px] shrink-0">
                  {idx + 1}
                </span>
                <div>
                  <p className="font-bold text-slate-900">{p.name}</p>
                  <p className="text-slate-500 text-[11px]">{p.college} • {p.branch}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-bold">
                  {p.attendanceStatus}
                </span>
                <p className="text-[10px] text-slate-400 mt-1">{p.registeredAt}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">Auto-synced with college placement cell</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Workshop Share Modal / Popover Component
// ─────────────────────────────────────────────────────────────────────────────

interface ShareWorkshopModalProps {
  workshop: BeginnerWorkshop | null;
  onClose: () => void;
  onDispatchToCandidates: (workshop: BeginnerWorkshop) => void;
}

const ShareWorkshopModal: React.FC<ShareWorkshopModalProps> = ({
  workshop,
  onClose,
  onDispatchToCandidates
}) => {
  const [copiedMeet, setCopiedMeet] = useState(false);
  const [copiedDeck, setCopiedDeck] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  if (!workshop) return null;

  const fullInvitationText = `🎓 CapFly Foundational Workshop Invitation\n\n📌 Title: ${workshop.title}\n👤 Instructor: ${workshop.instructor}\n📅 Date & Time: ${workshop.date} | ${workshop.time}\n📍 Location: ${workshop.location}\n\n🔗 Direct Video Session Link (Google Meet):\n${workshop.meetUrl}\n\n📚 Resource Deck & Sandbox:\n${workshop.deckUrl}\n\nPrerequisites: ${workshop.prerequisites}`;

  const handleCopyMeet = async () => {
    try {
      await navigator.clipboard.writeText(workshop.meetUrl);
      setCopiedMeet(true);
      setTimeout(() => setCopiedMeet(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleCopyDeck = async () => {
    try {
      await navigator.clipboard.writeText(workshop.deckUrl);
      setCopiedDeck(true);
      setTimeout(() => setCopiedDeck(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleCopyFullInvitation = async () => {
    try {
      await navigator.clipboard.writeText(fullInvitationText);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#0B192C] px-6 py-4 flex items-center justify-between text-white shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs text-blue-400 font-bold uppercase tracking-wider">
              <Share2 className="w-4 h-4" />
              <span>Share Workshop & Resource Deck</span>
            </div>
            <h3 className="text-base font-black font-['Outfit'] mt-0.5">{workshop.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Workshop Meta Summary Banner */}
        <div className="px-6 py-3 bg-blue-50/70 border-b border-blue-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-700">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              {workshop.date} • {workshop.time}
            </span>
            <span className="text-slate-400">|</span>
            <span className="font-semibold text-blue-700">
              {workshop.reservedSeats} Enrolled Candidates
            </span>
          </div>
          <button
            type="button"
            onClick={handleCopyFullInvitation}
            className="px-2.5 py-1 bg-white hover:bg-blue-100 border border-blue-200 text-blue-700 rounded-lg text-[11px] font-bold transition-colors cursor-pointer flex items-center gap-1"
          >
            {copiedAll ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
            {copiedAll ? 'Invitation Copied!' : 'Copy Entire Invitation'}
          </button>
        </div>

        {/* Modal Body / Shareable Fields */}
        <div className="p-6 space-y-4 text-xs">
          {/* Direct Join Link Field */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-blue-600" />
                Direct Video Join Link (Google Meet)
              </span>
              <span className="text-emerald-700 font-semibold text-[10px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Live Active Room
              </span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={workshop.meetUrl}
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-xs font-mono font-medium focus:outline-hidden select-all"
              />
              <button
                type="button"
                onClick={handleCopyMeet}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  copiedMeet
                    ? 'bg-emerald-600 text-white border border-emerald-600'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300'
                }`}
              >
                {copiedMeet ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 text-blue-600" />}
                {copiedMeet ? 'Copied!' : 'Copy Link'}
              </button>
              <a
                href={workshop.meetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shrink-0"
                title="Launch Google Meet in new tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Launch
              </a>
            </div>
          </div>

          {/* Resource Deck Link Field */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                Resource Deck & Interactive Sandbox
              </span>
              <span className="text-blue-700 font-semibold text-[10px] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                PDF / Slides / Code Sandbox
              </span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={workshop.deckUrl}
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-xs font-mono font-medium focus:outline-hidden select-all"
              />
              <button
                type="button"
                onClick={handleCopyDeck}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  copiedDeck
                    ? 'bg-emerald-600 text-white border border-emerald-600'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300'
                }`}
              >
                {copiedDeck ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 text-blue-600" />}
                {copiedDeck ? 'Copied!' : 'Copy Link'}
              </button>
              <a
                href={workshop.deckUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shrink-0"
              >
                <Download className="w-3.5 h-3.5 text-slate-600" />
                Download PDF / View Deck
              </a>
            </div>
          </div>

          {/* Quick Info Box */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <p className="text-[11px] font-bold text-slate-700">Workshop Distribution Information:</p>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Enrolled students will receive the Google Meet room link and slide deck synchronously via their CapFly Student Portal notifications and university placement emails.
            </p>
          </div>

          {/* Direct Dispatch to Candidates Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onDispatchToCandidates(workshop)}
              className="w-full py-2.5 px-4 bg-[#1D4ED8] hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Send Invitation to All Registered Candidates ({workshop.reservedSeats})
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">Links are verified and authenticated</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Slide-Out Workshop Details & Career Impact Drawer Component
// ─────────────────────────────────────────────────────────────────────────────

interface WorkshopDetailsDrawerProps {
  workshop: BeginnerWorkshop | null;
  onClose: () => void;
  onShare: (workshop: BeginnerWorkshop) => void;
  onViewParticipants: (workshop: BeginnerWorkshop) => void;
}

const WorkshopDetailsDrawer: React.FC<WorkshopDetailsDrawerProps> = ({
  workshop,
  onClose,
  onShare,
  onViewParticipants,
}) => {
  if (!workshop) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs" onClick={onClose}>
      <div
        className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 overflow-hidden animate-slide-in-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="bg-[#0B192C] px-6 py-5 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>Foundational Workshop Details & Career Impact</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          {/* Large Title & Instructor Details */}
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 inline-block mb-2 shadow-2xs">
              Live Career Acceleration Lab
            </span>
            <h2 className="text-2xl font-black text-slate-900 font-['Outfit'] leading-tight">
              {workshop.title}
            </h2>
            <div className="flex items-center gap-2 mt-2 text-sm font-semibold text-slate-700">
              <Users className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Conducted by <strong className="text-slate-900">{workshop.instructor}</strong></span>
            </div>
          </div>

          {/* Highlight Box: "Why You Must Attend" */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 space-y-3 shadow-2xs">
            <h3 className="text-sm font-black uppercase tracking-wider text-blue-950 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Why You Must Attend
            </h3>
            <div className="space-y-2.5">
              <div className="p-3.5 bg-white/95 rounded-xl border border-blue-100 flex items-start gap-3 shadow-2xs">
                <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">Production-Ready Skills</h4>
                  <p className="text-xs text-slate-600 mt-0.5">End-to-end hands-on execution and industry calibrated engineering tooling.</p>
                </div>
              </div>

              <div className="p-3.5 bg-white/95 rounded-xl border border-blue-100 flex items-start gap-3 shadow-2xs">
                <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">Portfolio Asset</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Live commits pushed to GitHub during the workshop with verified audit proof.</p>
                </div>
              </div>

              <div className="p-3.5 bg-white/95 rounded-xl border border-blue-100 flex items-start gap-3 shadow-2xs">
                <div className="w-6 h-6 rounded-lg bg-purple-100 text-purple-700 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">Fast-Track Talent Visibility</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Direct hiring visibility and priority interview shortlisting with corporate partner pipelines.</p>
                </div>
              </div>
            </div>
          </div>

          {/* 2×2 Decorative Pastel Tiles for Date, Time, Venue, and Max Capacity */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
              Session Schedule & Logistics
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Date Tile */}
              <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white text-blue-600 flex items-center justify-center shrink-0 shadow-2xs">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider block">Session Date</span>
                  <strong className="text-xs sm:text-sm font-black text-slate-900">{workshop.date}</strong>
                </div>
              </div>

              {/* Time Tile */}
              <div className="p-3.5 bg-purple-50/70 border border-purple-200 rounded-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white text-purple-600 flex items-center justify-center shrink-0 shadow-2xs">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-purple-800 uppercase tracking-wider block">Timing (IST)</span>
                  <strong className="text-xs sm:text-sm font-black text-slate-900">{workshop.time}</strong>
                </div>
              </div>

              {/* Venue Tile */}
              <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white text-amber-600 flex items-center justify-center shrink-0 shadow-2xs">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">Campus Venue</span>
                  <strong className="text-xs sm:text-sm font-black text-slate-900">{workshop.location}</strong>
                </div>
              </div>

              {/* Max Capacity Tile */}
              <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white text-emerald-600 flex items-center justify-center shrink-0 shadow-2xs">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Cohort Capacity</span>
                  <strong className="text-xs sm:text-sm font-black text-slate-900">{workshop.maxCandidates} ({workshop.reservedSeats} Enrolled)</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Direct Live Meeting Access */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <Video className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Live Virtual Classroom:</span>
              <a
                href={workshop.meetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-bold hover:underline truncate"
              >
                Google Meet Room ↗
              </a>
            </div>
            <a
              href={workshop.meetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0"
            >
              Join Meet
            </a>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-5 border-t border-slate-200 bg-slate-50/80 flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onShare(workshop)}
            className="w-full sm:flex-1 py-2.5 px-4 bg-[#0F172A] hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4 text-blue-400" />
            <span>Share Workshop Link / Deck</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onViewParticipants(workshop);
            }}
            className="w-full sm:w-auto py-2.5 px-4 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
          >
            <Users className="w-4 h-4 text-blue-600" />
            <span>Participants ({workshop.participants.length})</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Main MentorshipProgramsView Component
// ─────────────────────────────────────────────────────────────────────────────

export const MentorshipProgramsView: React.FC = () => {
  const [activeTab, setActiveTab]                     = useState<ProgramTab>('mentorship');
  const [mentorships, setMentorships]                 = useState<MentorshipItem[]>(INITIAL_MENTORSHIP_TRACKS);
  const [courses, setCourses]                         = useState<CertificationCourse[]>(INITIAL_CERTIFICATION_COURSES);
  const [workshops, setWorkshops]                     = useState<BeginnerWorkshop[]>(INITIAL_BEGINNER_WORKSHOPS);

  // Modals & Drawers State
  const [selectedDrawerProgram, setSelectedDrawerProgram]     = useState<MentorshipItem | null>(null);
  const [selectedInPersonProgram, setSelectedInPersonProgram] = useState<MentorshipItem | null>(null);
  const [selectedWorkshop, setSelectedWorkshop]               = useState<BeginnerWorkshop | null>(null);
  const [selectedWorkshopDrawer, setSelectedWorkshopDrawer]   = useState<BeginnerWorkshop | null>(null);
  const [shareWorkshop, setShareWorkshop]                     = useState<BeginnerWorkshop | null>(null);

  // Inline Exam Window Editing for Certification Courses
  const [editingExamId, setEditingExamId]                     = useState<string | null>(null);
  const [examWindowInput, setExamWindowInput]                 = useState<string>('');

  // Notification Toast
  const [notification, setNotification]                       = useState<string | null>(null);

  // Sync with Student Portal Enrollments
  React.useEffect(() => {
    const syncWithStudentPortal = () => {
      // Sync Courses
      const rawCourse = localStorage.getItem('capfly_student_course_enrollments');
      if (rawCourse) {
        const courseEnrolls = JSON.parse(rawCourse);
        setCourses(prev => prev.map(c => {
          if (courseEnrolls[c.id]) {
            const initialCount = INITIAL_CERTIFICATION_COURSES.find(ic => ic.id === c.id)?.bookedSlots || 0;
            return { ...c, bookedSlots: initialCount + 1 > c.totalSlots ? c.totalSlots : initialCount + 1 };
          }
          return c;
        }));
      }

      // Sync Workshops
      setWorkshops(prev => prev.map(w => {
        const rawWSDoc = localStorage.getItem(`capfly_workshop_details_${w.id}`);
        if (rawWSDoc) {
          const newParticipants = JSON.parse(rawWSDoc);
          const initialParticipants = INITIAL_BEGINNER_WORKSHOPS.find(iw => iw.id === w.id)?.participants || [];
          const existingIds = new Set(initialParticipants.map(p => p.id));
          const uniqueNew = newParticipants.filter((p: any) => !existingIds.has(p.id));
          const merged = [...initialParticipants, ...uniqueNew];
          
          return {
            ...w,
            participants: merged,
            reservedSeats: INITIAL_BEGINNER_WORKSHOPS.find(iw => iw.id === w.id)!.reservedSeats + uniqueNew.length
          };
        }
        return w;
      }));
    };

    syncWithStudentPortal();
    const intervalId = setInterval(syncWithStudentPortal, 2000);
    return () => clearInterval(intervalId);
  }, []);

  // Dynamic Summary Metrics
  const partnerInstitutionsCount = new Set(mentorships.map((m) => m.institution)).size;
  const activeMenteesCount = mentorships
    .filter((m) => m.status === 'Active')
    .reduce((sum, m) => sum + m.studentsEnrolled, 0);
  const pendingProposalsCount = mentorships.filter((m) => m.status === 'Under Proposal').length;

  // Handlers for Mentorship Proposals
  const handleAcceptProposal = (prog: MentorshipItem) => {
    setMentorships((prev) =>
      prev.map((m) =>
        m.id === prog.id
          ? {
              ...m,
              status: 'Active',
              milestone: 'Phase 1 - Orientation & Setup | Week 1 of 10',
              progressPercent: 10,
              nextLiveSync: 'Oct 24, 2026 • 3:00 PM IST'
            }
          : m
      )
    );
    setNotification(`Proposal approved! Partnership notification & curriculum sync dispatched to ${prog.institution}.`);
    setTimeout(() => setNotification(null), 6000);
  };

  const handleRequestRevision = (prog: MentorshipItem) => {
    setNotification(`Revision requested! Formal notes dispatched to faculty coordinator at ${prog.institution}.`);
    setTimeout(() => setNotification(null), 6000);
  };

  const handleDownloadBrief = (program: MentorshipItem) => {
    generateProgramBriefPDF(program);
    setNotification(`Program Brief for "${program.title}" downloaded successfully as a PDF.`);
    setTimeout(() => setNotification(null), 5000);
  };

  // Handlers for Certification Courses
  const handlePublishCourse = (course: CertificationCourse) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === course.id ? { ...c, published: true } : c))
    );
    setNotification('Certification Course successfully published and synced with student catalog.');
    setTimeout(() => setNotification(null), 6000);
  };

  const handleStartEditExamWindow = (course: CertificationCourse) => {
    setEditingExamId(course.id);
    setExamWindowInput(course.examWindow);
  };

  const handleSaveExamWindow = (courseId: string) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, examWindow: examWindowInput } : c))
    );
    setEditingExamId(null);
    setNotification('Assessment exam window updated and schedule published to enrolled students.');
    setTimeout(() => setNotification(null), 5000);
  };

  // Handlers for Beginner Workshops
  const handleShareWorkshopLink = async (workshop: BeginnerWorkshop) => {
    const invitationText = `🎓 CapFly Foundational Workshop Invitation\n\n📌 Title: ${workshop.title}\n👤 Instructor: ${workshop.instructor}\n📅 Date & Time: ${workshop.date} | ${workshop.time}\n📍 Location: ${workshop.location}\n\n🔗 Direct Video Session Link (Google Meet):\n${workshop.meetUrl}\n\n📚 Resource Deck & Sandbox:\n${workshop.deckUrl}\n\nPrerequisites: ${workshop.prerequisites}`;
    try {
      await navigator.clipboard.writeText(invitationText);
    } catch {
      // fallback
    }
    setShareWorkshop(workshop);
    setNotification('Workshop link & resource deck copied to clipboard!');
    setTimeout(() => setNotification(null), 5000);
  };

  const handleDispatchWorkshopInvitation = (workshop: BeginnerWorkshop) => {
    setShareWorkshop(null);
    setNotification(`Joining link & workshop deck successfully dispatched to all ${workshop.reservedSeats} registered candidates.`);
    setTimeout(() => setNotification(null), 6000);
  };

  return (
    <div className="space-y-6">
      {/* Global Success Notification Alert Banner */}
      {notification && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 flex items-center justify-between text-emerald-900 text-xs sm:text-sm font-semibold shadow-xs animate-fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{notification}</span>
          </div>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="text-emerald-700 hover:text-emerald-900 p-1 rounded-lg hover:bg-emerald-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Module Header Banner */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
            <Users className="w-4 h-4" />
            <span>Academic Collaboration Hub</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit'] mt-1">
            Mentorship &amp; Training Programs
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Oversee collaborative university tracks, proctored certification courses, and hands-on beginner workshops.
          </p>
        </div>
      </div>

      {/* 3-Tab Segmented Selector */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-1.5 shadow-xs flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => setActiveTab('mentorship')}
          className={`flex-1 min-w-[160px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'mentorship'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Mentorship Tracks</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] ${
            activeTab === 'mentorship' ? 'bg-white text-blue-600' : 'bg-slate-100 text-slate-600'
          }`}>
            {mentorships.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('certification')}
          className={`flex-1 min-w-[160px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'certification'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Certification Courses</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] ${
            activeTab === 'certification' ? 'bg-white text-blue-600' : 'bg-slate-100 text-slate-600'
          }`}>
            {courses.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('workshop')}
          className={`flex-1 min-w-[160px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'workshop'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Beginner Workshops</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] ${
            activeTab === 'workshop' ? 'bg-white text-blue-600' : 'bg-slate-100 text-slate-600'
          }`}>
            {workshops.length}
          </span>
        </button>
      </div>

      {/* ────────────────────────────────────────────────────────────────────────── */}
      {/* TAB 1: Mentorship Tracks Sub-View */}
      {/* ────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'mentorship' && (
        <div className="space-y-6">
          {/* Summary Metrics Header Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <School className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Institutions</p>
                <h4 className="text-lg font-black text-slate-900 font-['Outfit']">
                  {partnerInstitutionsCount} Partner Institutions
                </h4>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cohort Enrolment</p>
                <h4 className="text-lg font-black text-slate-900 font-['Outfit']">
                  {activeMenteesCount} Active Mentees
                </h4>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Approvals Required</p>
                <h4 className="text-lg font-black text-slate-900 font-['Outfit']">
                  {pendingProposalsCount} Proposal Pending Approval
                </h4>
              </div>
            </div>
          </div>

          {/* Program Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {mentorships.map((prog) => {
              const isUnderProposal = prog.status === 'Under Proposal';

              return (
                <div
                  key={prog.id}
                  className={`bg-white rounded-2xl border shadow-xs p-5 sm:p-6 transition-all space-y-4 ${
                    isUnderProposal
                      ? 'border-amber-300 ring-1 ring-amber-100 bg-amber-50/20'
                      : 'border-[#E2E8F0] hover:border-blue-300'
                  }`}
                >
                  {/* Top Bar: Badges & Institution */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide ${
                        prog.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-300 animate-pulse'
                      }`}
                    >
                      {prog.status === 'Under Proposal' ? 'UNDER PROPOSAL' : prog.status}
                    </span>
                    <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                      <School className="w-3.5 h-3.5 text-slate-400" />
                      {prog.institution}
                    </span>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                      {prog.domain}
                    </span>
                  </div>

                  {/* Title & Metadata */}
                  <div className="flex-1 mt-1">
                    <h3 className="text-sm font-bold text-slate-900 font-['Outfit'] leading-tight mb-2">
                      {prog.title}
                    </h3>
                    <div className="space-y-1.5 text-[11px] text-slate-500">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 min-w-0">
                          <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <strong className="text-slate-700 truncate">{prog.mentorLead}</strong>
                        </span>
                        <strong className="text-blue-600 shrink-0">{prog.studentsEnrolled} Mentees</strong>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{prog.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 mt-auto">
                    {!isUnderProposal ? (
                      <div className="flex gap-1.5 shrink-0">
                        <a
                          href={prog.googleMeetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 flex items-center justify-center bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                          title="Join Live Class"
                        >
                          <Video className="w-4 h-4" />
                        </a>
                        <button
                          type="button"
                          onClick={() => setSelectedInPersonProgram(prog)}
                          className="w-8 h-8 flex items-center justify-center bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors"
                          title="View In-Person Venue"
                        >
                          <MapPin className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          type="button"
                          onClick={() => handleAcceptProposal(prog)}
                          className="px-3 py-1.5 bg-[#1D4ED8] hover:bg-blue-800 text-white rounded-lg text-[11px] font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1 shrink-0"
                        >
                          <Check className="w-3 h-3" />
                          Accept
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRequestRevision(prog)}
                          className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded-lg text-[11px] font-bold transition-all cursor-pointer shrink-0"
                        >
                          Revise
                        </button>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => setSelectedDrawerProgram(prog)}
                      className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-[11px] font-bold transition-colors flex items-center gap-1 cursor-pointer shrink-0 ml-auto"
                    >
                      <span>Details</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────────────────────── */}
      {/* ────────────────────────────────────────────────────────────────────────── */}
      {/* TAB 2: Certification Courses Sub-View */}
      {/* ────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'certification' && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-1 px-1">
            <span className="font-medium text-slate-600">
              In-demand technology certifications with online proctored exams and live seat reservation management
            </span>
            <span className="font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100 shrink-0">
              {courses.length} Certified Courses Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course) => {
              const fillRatio = Math.round((course.bookedSlots / course.totalSlots) * 100);

              return (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs hover:border-blue-300 transition-all flex flex-col"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-bold truncate">
                        {course.domain.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 leading-tight mb-2">
                      {course.title}
                    </h3>
                    
                    <div className="text-[11px] text-slate-500 space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="truncate flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5" /> {course.partnerCompany}
                        </span>
                        <span className="font-bold text-blue-600">{fillRatio}% Booked</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {course.duration}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center">
                    <button
                      type="button"
                      onClick={() => handlePublishCourse(course)}
                      disabled={course.published}
                      className={`w-full py-1.5 rounded-lg text-[11px] font-bold transition-all shadow-xs ${
                        course.published
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-[#0F172A] hover:bg-slate-800 text-white'
                      }`}
                    >
                      {course.published ? 'Published to Catalog ✓' : 'Publish Course'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────────────────────── */}
      {/* TAB 3: Beginner Workshops Sub-View */}
      {/* ────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'workshop' && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-1 px-1">
            <span className="font-medium text-slate-600">
              Entry-level foundational workshops with real-time seat reservation metrics and participant sync
            </span>
            <span className="font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100 shrink-0">
              {workshops.length} Workshops Scheduled
            </span>
          </div>

          {/* 3-Column Card Layout with Mild Pastel Accents */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workshops.map((ws) => {
              const seatPercent = Math.round((ws.reservedSeats / ws.totalSeats) * 100);
              const remainingSeats = ws.totalSeats - ws.reservedSeats;

              return (
                <div
                  key={ws.id}
                  className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-bold uppercase">
                        Foundational
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {remainingSeats} Open
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 font-['Outfit'] leading-tight mb-2">
                      {ws.title}
                    </h3>
                    
                    <div className="text-[11px] text-slate-500 space-y-1.5">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <strong className="text-slate-700 truncate">{ws.instructor}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" /> {ws.date}
                        </span>
                        <span className="font-bold text-blue-600">{seatPercent}% Booked</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="flex gap-1.5">
                       <button
                         type="button"
                         onClick={() => handleShareWorkshopLink(ws)}
                         className="w-8 h-8 flex items-center justify-center bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
                         title="Share Link"
                       >
                         <Share2 className="w-4 h-4" />
                       </button>
                       <button
                         type="button"
                         onClick={() => setSelectedWorkshop(ws)}
                         className="w-8 h-8 flex items-center justify-center bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer"
                         title="Participants"
                       >
                         <Users className="w-4 h-4" />
                       </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedWorkshopDrawer(ws)}
                      className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-[11px] font-bold transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>Details</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Program Details Slide-Out Drawer (with PDF Download) */}
      <ProgramDetailsDrawer
        program={selectedDrawerProgram}
        onClose={() => setSelectedDrawerProgram(null)}
        onDownloadBrief={handleDownloadBrief}
      />

      {/* Workshop Details & Career Impact Slide-Out Drawer */}
      <WorkshopDetailsDrawer
        workshop={selectedWorkshopDrawer}
        onClose={() => setSelectedWorkshopDrawer(null)}
        onShare={handleShareWorkshopLink}
        onViewParticipants={(w) => setSelectedWorkshop(w)}
      />

      {/* In-Person Campus Session Details Modal */}
      <InPersonSessionModal
        program={selectedInPersonProgram}
        onClose={() => setSelectedInPersonProgram(null)}
      />

      {/* Workshop Registered Participants Modal */}
      <WorkshopParticipantsModal
        workshop={selectedWorkshop}
        onClose={() => setSelectedWorkshop(null)}
      />

      {/* Workshop Share Modal / Popover */}
      <ShareWorkshopModal
        workshop={shareWorkshop}
        onClose={() => setShareWorkshop(null)}
        onDispatchToCandidates={handleDispatchWorkshopInvitation}
      />
    </div>
  );
};
