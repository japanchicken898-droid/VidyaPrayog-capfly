import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  GraduationCap, 
  Award, 
  TrendingUp, 
  Layers, 
  CheckCircle2, 
  BookOpen, 
  Download, 
  Search,
  ArrowUpRight,
  ShieldCheck,
  Briefcase
} from 'lucide-react';
import { VerticalBarChart, DonutChart, KPICard } from './ChartUtils';
import { InstitutionExportModal } from './InstitutionExportModal';

interface DepartmentData {
  id: string;
  name: string;
  code: string;
  hodName: string;
  hodEmail: string;
  totalStudents: number;
  facultyCount: number;
  facultyRatio: string;
  placementRate: number;
  avgCgpa: number;
  labsCount: number;
  intakeSanctioned: number;
  years: { y1: number; y2: number; y3: number; y4: number };
  color: string;
}

const departmentData: DepartmentData[] = [
  {
    id: 'dept-1',
    name: 'Computer Science & Engineering',
    code: 'CSE',
    hodName: 'Dr. Suresh R. Venkatesh',
    hodEmail: 'hod.cse@capfly.edu',
    totalStudents: 1120,
    facultyCount: 78,
    facultyRatio: '1:14.3',
    placementRate: 94.8,
    avgCgpa: 8.42,
    labsCount: 14,
    intakeSanctioned: 1200,
    years: { y1: 300, y2: 280, y3: 270, y4: 270 },
    color: '#6366f1'
  },
  {
    id: 'dept-2',
    name: 'Electronics & Communication',
    code: 'ECE',
    hodName: 'Dr. Meenakshi Sundaram',
    hodEmail: 'hod.ece@capfly.edu',
    totalStudents: 940,
    facultyCount: 64,
    facultyRatio: '1:14.6',
    placementRate: 89.2,
    avgCgpa: 8.18,
    labsCount: 11,
    intakeSanctioned: 960,
    years: { y1: 250, y2: 240, y3: 225, y4: 225 },
    color: '#8b5cf6'
  },
  {
    id: 'dept-3',
    name: 'Electrical & Electronics Engg.',
    code: 'EEE',
    hodName: 'Dr. Anandvardhan Rao',
    hodEmail: 'hod.eee@capfly.edu',
    totalStudents: 680,
    facultyCount: 46,
    facultyRatio: '1:14.7',
    placementRate: 85.6,
    avgCgpa: 7.95,
    labsCount: 9,
    intakeSanctioned: 720,
    years: { y1: 180, y2: 175, y3: 165, y4: 160 },
    color: '#06b6d4'
  },
  {
    id: 'dept-4',
    name: 'Mechanical Engineering',
    code: 'MECH',
    hodName: 'Dr. Rajesh K. Tiwari',
    hodEmail: 'hod.mech@capfly.edu',
    totalStudents: 650,
    facultyCount: 44,
    facultyRatio: '1:14.7',
    placementRate: 82.4,
    avgCgpa: 7.82,
    labsCount: 12,
    intakeSanctioned: 720,
    years: { y1: 170, y2: 165, y3: 160, y4: 155 },
    color: '#f59e0b'
  },
  {
    id: 'dept-5',
    name: 'Civil Engineering',
    code: 'CIVIL',
    hodName: 'Dr. Sunita Deshmukh',
    hodEmail: 'hod.civil@capfly.edu',
    totalStudents: 452,
    facultyCount: 32,
    facultyRatio: '1:14.1',
    placementRate: 78.9,
    avgCgpa: 7.74,
    labsCount: 8,
    intakeSanctioned: 480,
    years: { y1: 120, y2: 115, y3: 110, y4: 107 },
    color: '#ec4899'
  }
];

export const DepartmentYearTab: React.FC = () => {
  const [selectedDeptId, setSelectedDeptId] = useState<string | null>(null);

  const totalStudents = departmentData.reduce((acc, d) => acc + d.totalStudents, 0);
  const totalFaculty = departmentData.reduce((acc, d) => acc + d.facultyCount, 0);

  const [showExportModal, setShowExportModal] = useState(false);
  const [exportConfig, setExportConfig] = useState<{ filename: string; csvData: string; pdfLabel: string } | null>(null);

  const handleExportData = () => {
    setExportConfig({
      filename: 'department_demographics_report',
      pdfLabel: 'Department & Year-wise Demographics Official Report',
      csvData: 'Dept Code,Department Name,HoD,Total Students,Faculty Count,Faculty Ratio,Placement %,Avg CGPA,1st Yr,2nd Yr,3rd Yr,4th Yr\n' +
        departmentData.map(d => `${d.code},"${d.name}","${d.hodName}",${d.totalStudents},${d.facultyCount},${d.facultyRatio},${d.placementRate}%,${d.avgCgpa},${d.years.y1},${d.years.y2},${d.years.y3},${d.years.y4}`).join('\n'),
    });
    setShowExportModal(true);
  };

  const downloadDeptDossier = (dept: DepartmentData) => {
    setExportConfig({
      filename: `${dept.code}_department_dossier`,
      pdfLabel: `Department Profile & Dossier — ${dept.name} (${dept.code})`,
      csvData: `Code,Name,HoD,Students,Intake,Faculty,Placement %,CGPA,Y1,Y2,Y3,Y4\n${dept.code},"${dept.name}","${dept.hodName}",${dept.totalStudents},${dept.intakeSanctioned},${dept.facultyCount},${dept.placementRate}%,${dept.avgCgpa},${dept.years.y1},${dept.years.y2},${dept.years.y3},${dept.years.y4}`,
    });
    setShowExportModal(true);
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto animate-in fade-in duration-300">
      {exportConfig && (
        <InstitutionExportModal
          isOpen={showExportModal}
          onClose={() => { setShowExportModal(false); setExportConfig(null); }}
          config={exportConfig}
        />
      )}
      {/* Page Header Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
            <Building2 className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Department & Year-wise Strength Analytics</h1>
            <p className="text-sm text-slate-500 mt-1">
              Cohort distribution, faculty-to-student ratios, academic performance benchmarks & infrastructure capacity.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportData}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition shadow-sm"
          >
            <Download className="w-4 h-4 text-slate-500" />
            Export Demographics
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard
          title="Total Student Enrollment"
          value={totalStudents.toLocaleString()}
          subtitle="Across 5 Engineering Faculties"
          trend={{ value: 4.8, isPositive: true }}
          color="amber"
          icon={<svg className="w-5 h-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
        />
        <KPICard
          title="Faculty-Student Ratio"
          value="1 : 14.5"
          subtitle={`Total ${totalFaculty} Teaching Faculty`}
          trend={{ value: 2.1, isPositive: true }}
          color="emerald"
          icon={<svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>}
        />
        <KPICard
          title="Final Year (2025 Batch)"
          value="917 Students"
          subtitle="Placement Active Cohort"
          trend={{ value: 5.2, isPositive: true }}
          color="indigo"
          icon={<svg className="w-5 h-5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>}
        />
        <KPICard
          title="Sanctioned Intake Fill"
          value="94.2%"
          subtitle="3,842 / 4,080 Capacity"
          trend={{ value: 1.4, isPositive: true }}
          color="purple"
          icon={<svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>}
        />
      </div>

      {/* Analytics Row: 2 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Department Strength Bar Chart */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Department-wise Total Enrollment</h3>
              <p className="text-xs text-slate-500">Student headcount per engineering discipline</p>
            </div>
            <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg">
              Sanctioned Intake: 4,080
            </span>
          </div>
          <div className="h-64">
            <VerticalBarChart
              data={departmentData.map(d => ({
                label: d.code,
                value: d.totalStudents,
                color: d.color
              }))}
              maxValue={1300}
            />
          </div>
        </div>

        {/* Right: Year-wise Distribution Donut */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Cohort Year Distribution</h3>
                <p className="text-xs text-slate-500">Undergraduate 4-year batch proportions</p>
              </div>
              <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                4 Academic Batches
              </span>
            </div>
            <div className="py-2">
              <DonutChart
                data={[
                  { label: '1st Year (Freshmen)', value: 1020, color: '#6366f1' },
                  { label: '2nd Year (Sophomores)', value: 975, color: '#8b5cf6' },
                  { label: '3rd Year (Juniors)', value: 930, color: '#06b6d4' },
                  { label: '4th Year (Seniors)', value: 917, color: '#f59e0b' }
                ]}
                centerLabel="3,842"
                centerSublabel="Total Students"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Department Cards Deep-Dive Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Department Performance & Infrastructure Matrix</h3>
            <p className="text-xs text-slate-500">In-depth overview of faculty ratios, year cohorts, placement success and research labs</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {departmentData.map((dept) => {
            const fillRate = ((dept.totalStudents / dept.intakeSanctioned) * 100).toFixed(1);


  return (
              <div 
                key={dept.id} 
                className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition space-y-4"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <span 
                      className="px-2.5 py-1 rounded-lg text-xs font-bold text-white mb-2 inline-block shadow-sm"
                      style={{ backgroundColor: dept.color }}
                    >
                      {dept.code}
                    </span>
                    <h4 className="font-bold text-slate-900 text-base leading-tight">{dept.name}</h4>
                    <p className="text-xs text-slate-500 mt-1">HoD: {dept.hodName}</p>
                  </div>
                </div>

                {/* Key Stats Grid */}
                <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl text-center">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Students</p>
                    <p className="text-sm font-bold text-slate-800">{dept.totalStudents}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Faculty</p>
                    <p className="text-sm font-bold text-emerald-600">{dept.facultyRatio}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Placements</p>
                    <p className="text-sm font-bold text-indigo-600">{dept.placementRate}%</p>
                  </div>
                </div>

                {/* Year-wise Cohort Breakdown */}
                <div>
                  <p className="text-xs font-semibold text-slate-600 mb-2">Year-wise Student Headcount</p>
                  <div className="grid grid-cols-4 gap-1.5 text-center">
                    <div className="p-1.5 bg-slate-100/70 rounded-lg">
                      <p className="text-[10px] text-slate-400 font-medium">1st Yr</p>
                      <p className="text-xs font-bold text-slate-800">{dept.years.y1}</p>
                    </div>
                    <div className="p-1.5 bg-slate-100/70 rounded-lg">
                      <p className="text-[10px] text-slate-400 font-medium">2nd Yr</p>
                      <p className="text-xs font-bold text-slate-800">{dept.years.y2}</p>
                    </div>
                    <div className="p-1.5 bg-slate-100/70 rounded-lg">
                      <p className="text-[10px] text-slate-400 font-medium">3rd Yr</p>
                      <p className="text-xs font-bold text-slate-800">{dept.years.y3}</p>
                    </div>
                    <div className="p-1.5 bg-slate-100/70 rounded-lg">
                      <p className="text-[10px] text-slate-400 font-medium">4th Yr</p>
                      <p className="text-xs font-bold text-slate-800">{dept.years.y4}</p>
                    </div>
                  </div>
                </div>

                {/* Capacity Fill & Academic Score */}
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">Sanctioned Intake Fill</span>
                    <span className="font-bold text-slate-800">{fillRate}% ({dept.totalStudents}/{dept.intakeSanctioned})</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${fillRate}%`, backgroundColor: dept.color }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-500 pt-1">
                    <span>Labs: <strong className="text-slate-700">{dept.labsCount}</strong></span>
                    <span>Avg CGPA: <strong className="text-slate-700">{dept.avgCgpa}</strong></span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
