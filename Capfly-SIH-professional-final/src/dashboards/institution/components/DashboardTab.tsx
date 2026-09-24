import React, { useState } from 'react';
import { 
  MultiSegmentProgressBar, 
  SmoothAreaTrendChart, 
  ResearchFunnelChart, 
  RadarWebChart, 
  VerticalBarChart, 
  SemiCircleGauge 
} from './ChartUtils';
import { Calendar, Download } from 'lucide-react';
import { InstitutionExportModal } from './InstitutionExportModal';

interface DashboardTabProps {
  selectedYear?: string;
  onYearChange?: (year: string) => void;
  onNavigateSection?: (section: string) => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  selectedYear = '2025 - 2026',
  onYearChange,
  onNavigateSection
}) => {
  const [showExportModal, setShowExportModal] = useState(false);

  const exportConfig = {
    filename: `institutional_overview_report_${selectedYear.replace(/\s/g, '')}`,
    pdfLabel: `Institutional Dashboard Overview Report — ${selectedYear}`,
    csvData: 'Metric,Value,Status\n' +
      'Total Active Students,3842,Enrolled\n' +
      'Average CGPA,8.34,Honours Tier\n' +
      'Placement Clearance,94.8%,Completed\n' +
      'Active Industry MoUs,42,Verified\n' +
      'NAAC Accreditation Readiness,98.4%,A++ Grade Projected',
  };

  const handleExportOverview = () => setShowExportModal(true);

  return (
    <div className="space-y-6 font-sans text-slate-800 bg-[#f8fafc] min-h-full pb-12">
      <InstitutionExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        config={exportConfig}
      />
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Institutional Dashboard</h1>
          <p className="text-xs text-slate-500 font-medium">Real-time Performance Analytics &amp; Key Institutional Metrics</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-semibold text-slate-600">Academic Year:</span>
            <select
              value={selectedYear}
              onChange={(e) => onYearChange && onYearChange(e.target.value)}
              className="text-xs font-bold text-slate-900 bg-transparent border-none outline-none cursor-pointer pr-1"
            >
              <option value="2025 - 2026">2025 - 2026</option>
              <option value="2024 - 2025">2024 - 2025</option>
              <option value="2023 - 2024">2023 - 2024</option>
            </select>
          </div>

          <button
            onClick={handleExportOverview}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg px-3 py-1.5 transition-colors shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Export Overview
          </button>
        </div>
      </div>

      {/* 6 ANALYTICS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* CARD 1: Student Distribution */}
        <div 
          onClick={() => onNavigateSection && onNavigateSection('students')}
          className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between h-80 hover:shadow-md transition-shadow cursor-pointer group"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-2">
            <h2 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Student Distribution</h2>
            <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">Year Proportions</span>
          </div>

          <div className="flex-1 flex items-center justify-center py-2">
            <MultiSegmentProgressBar
              segments={[
                { label: '1st Year', value: 320, color: '#3b82f6' },
                { label: '2nd Year', value: 298, color: '#10b981' },
                { label: '3rd Year', value: 342, color: '#f59e0b' },
                { label: '4th Year', value: 288, color: '#8b5cf6' }
              ]}
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Total Enrolled: <strong>1,248</strong></span>
            <span className="text-[11px] text-blue-600 font-bold group-hover:underline">View Roster &rarr;</span>
          </div>
        </div>

        {/* CARD 2: Placement Analytics */}
        <div 
          onClick={() => onNavigateSection && onNavigateSection('placement-analysis')}
          className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between h-80 hover:shadow-md transition-shadow cursor-pointer group"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-2">
            <h2 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Placement Analytics</h2>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">Batch Growth Trend</span>
          </div>

          <div className="flex-1 flex items-center justify-center py-2">
            <SmoothAreaTrendChart
              color="#10b981"
              data={[
                { label: '2021', value: 68 },
                { label: '2022', value: 72 },
                { label: '2023', value: 75 },
                { label: '2024', value: 81 },
                { label: '2025', value: 86 }
              ]}
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Placement Rate: <strong className="text-slate-900">86.4%</strong></span>
            <span className="text-[11px] text-blue-600 font-bold group-hover:underline">View Analysis &rarr;</span>
          </div>
        </div>

        {/* CARD 3: Internship Conversion */}
        <div 
          onClick={() => onNavigateSection && onNavigateSection('internship-analysis')}
          className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between h-80 hover:shadow-md transition-shadow cursor-pointer group"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-2">
            <h2 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Internship Conversion</h2>
            <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">Pipeline</span>
          </div>

          <div className="flex-1 flex items-center justify-center py-2">
            <ResearchFunnelChart
              steps={[
                { label: 'Applied', count: 1100, percentage: 100, color: '#c084fc' },
                { label: 'Shortlisted', count: 850, percentage: 77, color: '#a855f7' },
                { label: 'Active Interns', count: 680, percentage: 61, color: '#7e22ce' }
              ]}
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Active Internships: <strong className="text-slate-900">680</strong></span>
            <span className="text-[11px] text-blue-600 font-bold group-hover:underline">View Log &rarr;</span>
          </div>
        </div>

        {/* CARD 4: Faculty Participation */}
        <div 
          onClick={() => onNavigateSection && onNavigateSection('faculty')}
          className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between h-80 hover:shadow-md transition-shadow cursor-pointer group"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-2">
            <h2 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Faculty Radar</h2>
            <span className="text-[10px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">5-Domain Matrix</span>
          </div>

          <div className="flex-1 flex items-center justify-center py-2">
            <RadarWebChart
              data={[
                { subject: 'Teaching', score: 92 },
                { subject: 'Research', score: 78 },
                { subject: 'Ph.D Ratio', score: 85 },
                { subject: 'Mentoring', score: 90 },
                { subject: 'Industry R&D', score: 70 }
              ]}
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Active Faculty: <strong className="text-slate-900">186</strong></span>
            <span className="text-[11px] text-blue-600 font-bold group-hover:underline">View Faculty &rarr;</span>
          </div>
        </div>

        {/* CARD 5: Industry Collaboration */}
        <div 
          onClick={() => onNavigateSection && onNavigateSection('industry')}
          className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between h-80 hover:shadow-md transition-shadow cursor-pointer group"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-2">
            <h2 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Industry Collaboration</h2>
            <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">Engagements</span>
          </div>

          <div className="flex-1 flex items-center justify-center py-2">
            <VerticalBarChart
              data={[
                { label: 'MoUs', value: 48, color: '#2563eb' },
                { label: 'Joint R&D', value: 34, color: '#10b981' },
                { label: 'Lectures', value: 65, color: '#8b5cf6' },
                { label: 'Patents', value: 18, color: '#f59e0b' }
              ]}
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Corporate MoUs: <strong className="text-slate-900">48 Active</strong></span>
            <span className="text-[11px] text-blue-600 font-bold group-hover:underline">Explore &rarr;</span>
          </div>
        </div>

        {/* CARD 6: Institutional Skill Index */}
        <div 
          onClick={() => onNavigateSection && onNavigateSection('skill-development')}
          className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between h-80 hover:shadow-md transition-shadow cursor-pointer group"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-2">
            <h2 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Institutional Skill Index</h2>
            <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">Gauge Score</span>
          </div>

          <div className="flex-1 flex items-center justify-center py-2">
            <SemiCircleGauge
              value={92}
              label="Industry Readiness Index"
              color="#3b82f6"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Target Achievement: <strong className="text-slate-900">92%</strong></span>
            <span className="text-[11px] text-blue-600 font-bold group-hover:underline">Skill Map &rarr;</span>
          </div>
        </div>

      </div>
    </div>
  );
};
