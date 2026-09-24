import React, { useState } from 'react';
import { Bell, CheckCircle2, ChevronRight, School, Sparkles, X } from 'lucide-react';

interface ProposalNotification {
  id: string;
  institutionName: string;
  proposalTitle: string;
  department: string;
  receivedTime: string;
  status: 'Pending Review' | 'Accepted' | 'Under Discussion';
  slots: number;
}

export const InstitutionNotifications: React.FC = () => {
  const [proposals, setProposals] = useState<ProposalNotification[]>([
    {
      id: 'p-1',
      institutionName: 'IIT Madras',
      proposalTitle: 'AI & Data Engineering Industry Mentorship Program',
      department: 'Dept. of Computer Science',
      receivedTime: '12 mins ago',
      status: 'Pending Review',
      slots: 45
    },
    {
      id: 'p-2',
      institutionName: 'Anna University',
      proposalTitle: 'Full-Stack Cloud & DevOps Accelerator',
      department: 'Information Technology',
      receivedTime: '1 hour ago',
      status: 'Pending Review',
      slots: 60
    },
    {
      id: 'p-3',
      institutionName: 'NIT Trichy',
      proposalTitle: 'Embedded Systems & IoT Hardware Capstone Mentorship',
      department: 'ECE & Robotics',
      receivedTime: '3 hours ago',
      status: 'Under Discussion',
      slots: 30
    }
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAccept = (id: string, instName: string) => {
    setProposals((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'Accepted' as const } : p))
    );
    setToastMessage(`Proposal from ${instName} accepted & partnership schedule finalized.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs flex flex-col justify-between h-full relative">
      {/* Mini notification toast */}
      {toastMessage && (
        <div className="absolute top-2 right-2 left-2 z-30 bg-[#0B192C] text-white p-3 rounded-xl shadow-lg border border-slate-700 flex items-center justify-between text-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-[11px] leading-snug">{toastMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-2 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 mb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 font-['Outfit']">
                Institution Notifications
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                Incoming university proposals with Review & Accept controls
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 text-[11px] font-extrabold bg-blue-100 text-blue-800 rounded-full">
            {proposals.filter((p) => p.status === 'Pending Review').length} New
          </span>
        </div>

        {/* Real-time alerts list */}
        <div className="space-y-2.5">
          {proposals.map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-xl border transition-all ${
                item.status === 'Accepted'
                  ? 'bg-emerald-50/50 border-emerald-200'
                  : 'bg-slate-50 hover:bg-blue-50/40 border-slate-200/80 hover:border-blue-200'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <School className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="text-xs font-bold text-slate-900">{item.institutionName}</span>
                  <span className="text-[10px] text-slate-400 font-medium">• {item.department}</span>
                </div>
                <span className="text-[10px] font-semibold text-slate-400 shrink-0">
                  {item.receivedTime}
                </span>
              </div>

              <p className="text-xs font-semibold text-blue-900 mt-1.5 line-clamp-1">
                {item.proposalTitle}
              </p>

              <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-slate-200/60 text-[11px]">
                <span className="text-slate-500 font-medium">
                  Cohort: <strong className="text-slate-700">{item.slots} Mentees</strong>
                </span>
                
                <div className="flex items-center gap-1.5">
                  {item.status === 'Accepted' ? (
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-[11px] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Accepted & Scheduled
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleAccept(item.id, item.institutionName)}
                      className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] font-bold shadow-2xs transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <span>Review & Accept</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-blue-600" />
          Proposals synced with Institution Academic Calendars
        </span>
        <span className="font-semibold text-blue-600">3 Total Active</span>
      </div>
    </div>
  );
};
