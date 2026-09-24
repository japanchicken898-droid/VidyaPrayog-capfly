import React, { useState } from 'react';
import { 
  X, 
  ClipboardCheck, 
  Award, 
  CheckCircle2, 
  Clock, 
  Building2, 
  ShieldCheck,
  Send
} from 'lucide-react';

interface AssessmentTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  assessmentTitle: string;
  targetBatch: string;
  onPublishSuccess?: () => void;
}

interface QuestionItem {
  id: number;
  category: 'Aptitude' | 'Core CS' | 'DSA' | 'Coding' | 'System Design';
  difficulty: string;
  question: string;
  codeSnippet?: string;
  options: { label: string; text: string }[];
}

export const AssessmentTestModal: React.FC<AssessmentTestModalProps> = ({
  isOpen,
  onClose,
  assessmentTitle,
  targetBatch,
  onPublishSuccess
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  if (!isOpen) return null;

  // 7 College placement-grade technical questions
  const questions: QuestionItem[] = [
    {
      id: 1,
      category: 'Aptitude',
      difficulty: 'Intermediate - Campus Level',
      question: 'A train traveling at 72 km/h crosses a 250m long platform in 25 seconds. How long will it take to cross an electric pole traveling at the same speed?',
      options: [
        { label: 'A', text: '12.5 seconds' },
        { label: 'B', text: '14.0 seconds' },
        { label: 'C', text: '10.0 seconds' },
        { label: 'D', text: '15.5 seconds' }
      ]
    },
    {
      id: 2,
      category: 'Aptitude',
      difficulty: 'Intermediate - Campus Level',
      question: 'From a standard well-shuffled deck of 52 cards, two cards are drawn consecutively at random without replacement. What is the exact probability that both cards are Aces?',
      options: [
        { label: 'A', text: '1 / 221' },
        { label: 'B', text: '4 / 663' },
        { label: 'C', text: '1 / 169' },
        { label: 'D', text: '2 / 13' }
      ]
    },
    {
      id: 3,
      category: 'Core CS',
      difficulty: 'Core CS - Campus Placement',
      question: 'In relational database engines (e.g., PostgreSQL / MySQL InnoDB), why is a B+ Tree index preferred over a Hash index for range-filtered queries such as `WHERE salary BETWEEN 50000 AND 80000`?',
      options: [
        { label: 'A', text: 'Hash indexing does not preserve key ordering, rendering range scans O(N) rather than O(log N + k)' },
        { label: 'B', text: 'B+ Trees reside purely in main memory, whereas Hash indexes enforce disk paging' },
        { label: 'C', text: 'Hash indexes have O(log N) point search which is inherently slower than B+ Tree leaf seeks' },
        { label: 'D', text: 'B+ Tree nodes automatically eliminate duplicate records at the storage block layer' }
      ]
    },
    {
      id: 4,
      category: 'Core CS',
      difficulty: 'Core CS - Campus Placement',
      question: "In Operating Systems and the Banker's Algorithm for deadlock avoidance, if the system is determined to be in a 'Safe State', which of the following assertions is unconditionally TRUE?",
      options: [
        { label: 'A', text: 'There exists at least one safe allocation sequence of processes that guarantees deadlock will not occur' },
        { label: 'B', text: 'The condition of Mutual Exclusion has been systematically disabled across all active threads' },
        { label: 'C', text: 'Resource preemption is immediately executed for all lower-priority worker processes' },
        { label: 'D', text: 'Available system resources exactly match the maximum declared claim of all processes combined' }
      ]
    },
    {
      id: 5,
      category: 'DSA',
      difficulty: 'Data Structures - Placement Grade',
      question: 'What is the worst-case time complexity of searching for a specific key in an AVL Tree or Red-Black Tree containing N elements, and what structural property guarantees this bound?',
      options: [
        { label: 'A', text: 'O(log N), guaranteed by maintaining strict height balance factors within {-1, 0, +1} or black-height invariants' },
        { label: 'B', text: 'O(1), guaranteed by amortized rotation balancing across successive traversals' },
        { label: 'C', text: 'O(N), because skewed rotational rebalancing degrades under ascending sequential keys' },
        { label: 'D', text: 'O(N log N), caused by recursive subtree weight factor recalculation' }
      ]
    },
    {
      id: 6,
      category: 'Coding',
      difficulty: 'Coding Benchmark - Campus Level',
      question: 'Evaluate the following recursive array reversal subroutine. For input arr = {10, 20, 30, 40, 50}, what is the final state of arr and the maximum call stack depth allocated during execution?',
      codeSnippet: `void solve(int arr[], int start, int end) {\n    if (start >= end) return;\n    int temp = arr[start];\n    arr[start] = arr[end];\n    arr[end] = temp;\n    solve(arr, start + 1, end - 1);\n}`,
      options: [
        { label: 'A', text: '{50, 40, 30, 20, 10} with maximum call stack depth of 3' },
        { label: 'B', text: '{10, 20, 30, 40, 50} with maximum call stack depth of 5' },
        { label: 'C', text: '{50, 20, 30, 40, 10} with maximum call stack depth of 2' },
        { label: 'D', text: '{30, 20, 10, 50, 40} with maximum call stack depth of 4' }
      ]
    },
    {
      id: 7,
      category: 'System Design',
      difficulty: 'System Design - Campus Placement',
      question: 'An enterprise payment gateway must support Stripe, PayPal, and Razorpay without altering existing billing orchestrator classes when onboarding future providers. Which design principle and OOP mechanism should be applied?',
      options: [
        { label: 'A', text: 'Open/Closed Principle via Runtime Polymorphism (Strategy Pattern with common IPaymentProcessor interface)' },
        { label: 'B', text: 'Encapsulation strictly via private multiple class inheritance without abstract interfaces' },
        { label: 'C', text: 'Dynamic downcasting of provider classes at execution runtime inside payment handlers' },
        { label: 'D', text: 'Singleton Anti-pattern enforcing static dispatch across concrete provider wrappers' }
      ]
    }
  ];

  const handleSelectOption = (questionId: number, optionLabel: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionLabel
    }));
  };

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setPublishSuccess(true);
      if (onPublishSuccess) {
        onPublishSuccess();
      }
      setTimeout(() => {
        setPublishSuccess(false);
        onClose();
      }, 2000);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header: Dark Navy Theme Alignment */}
        <div className="bg-[#0B192C] text-white px-5 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <ClipboardCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-extrabold tracking-tight font-['Outfit'] text-white">
                  Assessment Question Paper Preview
                </h3>
                <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-blue-900/80 text-blue-300 border border-blue-700">
                  7 Questions
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">
                {assessmentTitle} • <span className="text-blue-300 font-semibold">{targetBatch}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Close Preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Sub-Header Banner */}
        <div className="bg-[#E0F2FE] border-b border-[#BAE6FD] px-5 py-2.5 flex flex-wrap items-center justify-between gap-2 shrink-0 text-xs font-semibold text-slate-700">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <span>Campus Placement Grade Evaluation Suite (Aptitude, Coding & Core CS)</span>
          </div>
          <div className="flex items-center gap-3 text-slate-600 text-[11px]">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-500" /> 90 Mins Total
            </span>
            <span className="flex items-center gap-1">
              <Building2 className="w-3 h-3 text-slate-500" /> Industry Benchmark Standard
            </span>
          </div>
        </div>

        {/* Modal Body: Scrollable Question Items */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 bg-[#F8FAFC]">
          {publishSuccess ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-emerald-200 shadow-xs flex flex-col items-center justify-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                Assessment Successfully Published & Assigned!
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md">
                The 7 college-level benchmark questions have been broadcasted to all enrolled 3rd-year engineering cohorts across partner institutions.
              </p>
            </div>
          ) : (
            questions.map((q) => {
              const selectedOption = selectedAnswers[q.id];

              return (
                <div
                  key={q.id}
                  className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 shadow-2xs hover:border-slate-300 transition-colors"
                >
                  {/* Question Meta Badge Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5 pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-blue-50 text-blue-700 text-xs font-bold flex items-center justify-center border border-blue-200">
                        Q{q.id}
                      </span>
                      <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                        {q.category}
                      </span>
                    </div>

                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                      {q.difficulty}
                    </span>
                  </div>

                  {/* Question Statement */}
                  <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">
                    {q.question}
                  </p>

                  {/* Optional Code Snippet */}
                  {q.codeSnippet && (
                    <pre className="mt-2.5 p-3 rounded-lg bg-slate-900 text-emerald-400 font-mono text-[11px] leading-snug overflow-x-auto border border-slate-800">
                      <code>{q.codeSnippet}</code>
                    </pre>
                  )}

                  {/* Options Radio List */}
                  <div className="mt-3.5 space-y-2">
                    {q.options.map((opt) => {
                      const isChecked = selectedOption === opt.label;

                      return (
                        <label
                          key={opt.label}
                          onClick={() => handleSelectOption(q.id, opt.label)}
                          className={`flex items-start gap-3 p-2.5 rounded-lg border text-xs cursor-pointer select-none transition-all ${
                            isChecked
                              ? 'bg-blue-50/70 border-blue-500 ring-1 ring-blue-400/40 text-blue-950 font-semibold'
                              : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-700'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${q.id}`}
                            checked={isChecked}
                            onChange={() => handleSelectOption(q.id, opt.label)}
                            className="mt-0.5 text-blue-600 focus:ring-blue-500 cursor-pointer"
                          />
                          <div className="flex items-start gap-2">
                            <span className="font-bold shrink-0 text-slate-500">
                              ({opt.label})
                            </span>
                            <span>{opt.text}</span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="bg-white border-t border-[#E2E8F0] px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Passing Criterion: 70% Overall Score Across All Tracks</span>
          </div>

          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Close
            </button>

            <button
              type="button"
              disabled={isPublishing}
              onClick={handlePublish}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              {isPublishing ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Broadcasting to Batches...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish & Assign to College Batches</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
