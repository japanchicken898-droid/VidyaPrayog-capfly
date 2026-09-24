import React, { useState } from 'react';
import { Bell, CheckCircle2, ChevronRight, School, X, Check } from 'lucide-react';

export interface NotificationItem {
  id: string;
  institutionName: string;
  proposalTitle: string;
  department: string;
  receivedTime: string;
  status: 'Pending Review' | 'Accepted' | 'Under Discussion';
  slots: number;
  read: boolean;
}

interface NotificationCenterProps {
  notifications: NotificationItem[];
  onAccept: (id: string, name: string) => void;
  onMarkAllRead: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  onAccept,
  onMarkAllRead
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;
  const hasUnseen = unreadCount > 0;

  const handleToggle = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState && hasUnseen) {
      // Mark as seen when opening
      onMarkAllRead();
    }
  };

  return (
    <div className="relative">
      {/* Prominent Notification Bell Button */}
      <button
        type="button"
        onClick={handleToggle}
        className="relative p-2.5 bg-white rounded-xl border border-slate-200 shadow-sm hover:bg-slate-50 cursor-pointer flex items-center justify-center transition-all duration-150"
        title={hasUnseen ? `${unreadCount} unread proposals` : 'Notifications'}
      >
        <Bell className="w-5 h-5 text-slate-700" />

        {/* Active Unread Indicator Dot */}
        {hasUnseen && (
          <span className="w-3 h-3 bg-rose-500 rounded-full border-2 border-white absolute -top-0.5 -right-0.5 animate-pulse" />
        )}
      </button>

      {/* Floating Notifications Dropdown Popover */}
      {isOpen && (
        <div 
          className="absolute right-0 mt-2.5 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150 text-slate-900"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-3.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                <Bell className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 font-['Outfit']">Institution Notifications</h4>
                <p className="text-[10px] text-slate-500">Incoming partner proposals</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={onMarkAllRead}
                  className="text-[10px] font-bold text-blue-600 hover:text-blue-800 px-2 py-0.5 rounded hover:bg-blue-50 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Check className="w-3 h-3" />
                  <span>Mark read</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* List of Notifications */}
          <div className="max-h-[340px] overflow-y-auto divide-y divide-slate-100 p-2 space-y-1.5">
            {notifications.map((item) => {
              const isAccepted = item.status === 'Accepted';
              return (
                <div
                  key={item.id}
                  className={`p-3 rounded-xl border transition-all text-left ${
                    isAccepted
                      ? 'bg-emerald-50/40 border-emerald-200/80'
                      : 'bg-white hover:bg-blue-50/40 border-slate-100 hover:border-blue-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <School className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="text-xs font-bold text-slate-900">{item.institutionName}</span>
                      <span className="text-[10px] text-slate-400">• {item.department}</span>
                    </div>
                    <span className="text-[10px] font-medium text-slate-400 shrink-0">
                      {item.receivedTime}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-slate-800 mt-1 line-clamp-1">
                    {item.proposalTitle}
                  </p>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[11px]">
                    <span className="text-slate-500 font-medium">
                      Cohort: <strong className="text-slate-700">{item.slots} Mentees</strong>
                    </span>

                    {isAccepted ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-[10px] bg-emerald-100/80 px-2 py-0.5 rounded-md border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Accepted
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onAccept(item.id, item.institutionName)}
                        className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold shadow-2xs transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <span>Review & Accept</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-2 bg-slate-50 border-t border-slate-100 text-center">
            <span className="text-[10px] font-semibold text-slate-500">
              {notifications.length} Total Institutional Proposals Synced
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
