import React, { useState } from 'react';
import { Users, Award, Briefcase, Search, Plus, Download, DollarSign, Clock, Lightbulb } from 'lucide-react';
import { DonutChart, VerticalBarChart, KPICard } from './ChartUtils';
import { InstitutionExportModal } from './InstitutionExportModal';

export const FacultyTab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'roster' | 'consultancy' | 'patents' | 'fdp'>('roster');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showExportModal, setShowExportModal] = useState(false);

  const exportConfig = {
    filename: 'faculty_roster_report',
    pdfLabel: 'Faculty Roster & Performance Report',
    csvData: 'Name,Department,Status\nDr. Anitha S,CSE,Active\nDr. Prakash M,Mechanical,Completed\nDr. Karthik R,ECE,Active',
  };

  // 1. Consultancy Data
  const consultancyData = [
    { id: 'CON-2025-01', lead: 'Dr. Anitha S', dept: 'CSE', client: 'TCS Research', title: 'AI Infrastructure Optimization', amount: '₹ 28.5 Lakhs', status: 'Active', duration: '12 Months' },
    { id: 'CON-2025-02', lead: 'Dr. Prakash M', dept: 'Mechanical', client: 'Larsen & Toubro', title: 'Robotic Welding Automation', amount: '₹ 42.0 Lakhs', status: 'Completed', duration: '18 Months' },
    { id: 'CON-2025-03', lead: 'Dr. Karthik R', dept: 'ECE', client: 'Bosch India', title: 'RISC-V Chip Validation', amount: '₹ 34.0 Lakhs', status: 'Active', duration: '9 Months' },
    { id: 'CON-2025-04', lead: 'Dr. Meena P', dept: 'EEE', client: 'Tata Power', title: 'Smart Grid Load Balancing', amount: '₹ 18.0 Lakhs', status: 'In Review', duration: '6 Months' },
    { id: 'CON-2025-05', lead: 'Dr. Divya K', dept: 'Civil', client: 'NHA India', title: 'Concrete Durability Testing', amount: '₹ 20.0 Lakhs', status: 'Active', duration: '12 Months' },
  ];

  // 2. Patent Submissions Data
  const patentData = [
    { id: 'PAT-IN-2025/001', lead: 'Dr. Anitha S', dept: 'CSE', title: 'Quantum-Safe Cryptographic Protocol for IoT Nodes', status: 'Granted', year: '2025' },
    { id: 'PAT-IN-2025/042', lead: 'Dr. Karthik R', dept: 'ECE', title: 'Low-Power Neural Processing Accelerator for Edge Devices', status: 'Published', year: '2025' },
    { id: 'PAT-IN-2025/089', lead: 'Dr. Prakash M', dept: 'Mechanical', title: 'Autonomous Heavy Metal Sorting Machine via Computer Vision', status: 'Filed', year: '2026' },
    { id: 'PAT-IN-2024/112', lead: 'Dr. Meena P', dept: 'EEE', title: 'Bi-directional Wireless EV Charger Controller', status: 'Granted', year: '2024' },
  ];

  // 3. FDP Completion Progress Data
  const fdpDepartmentData = [
    { department: 'Computer Science & Engineering', totalFaculty: 45, fdpCompleted: 38, percentage: 84.4, activeGrants: 14 },
    { department: 'Electronics & Communication', totalFaculty: 38, fdpCompleted: 30, percentage: 78.9, activeGrants: 10 },
    { department: 'Electrical & Electronics', totalFaculty: 32, fdpCompleted: 24, percentage: 75.0, activeGrants: 8 },
    { department: 'Mechanical Engineering', totalFaculty: 40, fdpCompleted: 22, percentage: 55.0, activeGrants: 11 },
    { department: 'Civil Engineering', totalFaculty: 31, fdpCompleted: 18, percentage: 58.0, activeGrants: 5 },
  ];

  // Faculty Roster Data
  const facultyRoster = [
    { id: 'FAC001', name: 'Dr. Anitha S', dept: 'CSE', desig: 'Professor', fdp: 8, res: 5, ind: 3, cert: 12, mentHours: '240 hrs' },
    { id: 'FAC002', name: 'Dr. Karthik R', dept: 'ECE', desig: 'Associate Professor', fdp: 6, res: 4, ind: 2, cert: 10, mentHours: '180 hrs' },
    { id: 'FAC003', name: 'Dr. Meena P', dept: 'EEE', desig: 'Assistant Professor', fdp: 4, res: 3, ind: 1, cert: 8, mentHours: '120 hrs' },
    { id: 'FAC004', name: 'Dr. Prakash M', dept: 'Mechanical', desig: 'Professor', fdp: 7, res: 6, ind: 4, cert: 15, mentHours: '310 hrs' },
    { id: 'FAC005', name: 'Dr. Divya K', dept: 'Civil', desig: 'Associate Professor', fdp: 5, res: 2, ind: 2, cert: 9, mentHours: '150 hrs' },
  ];

  return (
    <div className="space-y-6 pb-12 font-sans text-slate-800 animate-in fade-in duration-300">
      <InstitutionExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        config={exportConfig}
      />
      {/* 1. RESOURCE UTILIZATION & KPI METRICS STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <KPICard title="Total Faculty" value="186" icon={Users} colorClass="bg-blue-100 text-blue-600" />
        <KPICard title="Consultancy Rev." value="₹ 142.5 L" subtext="↑ 24% vs LY" icon={DollarSign} colorClass="bg-emerald-100 text-emerald-600" highlight={true} />
        <KPICard title="Mentorship Hours" value="1,420 hrs" subtext="High Impact" icon={Clock} colorClass="bg-purple-100 text-purple-600" />
        <KPICard title="Joint Projects" value="28 Active" subtext="19.4% faculty" icon={Briefcase} colorClass="bg-indigo-100 text-indigo-600" />
        <KPICard title="Patents Filed" value="18" subtext="6 Granted" icon={Lightbulb} colorClass="bg-amber-100 text-amber-600" />
        <KPICard title="Utilization Score" value="88.4%" subtext="Optimal" icon={Award} colorClass="bg-rose-100 text-rose-600" highlight={true} />
      </div>

      {/* 2. SIX-GRID VISUAL ANALYTICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm flex flex-col">
          <h3 className="text-sm font-black text-slate-800 mb-4 tracking-tight">Faculty Cadre Distribution</h3>
          <div className="flex-1 flex items-center justify-center">
            <DonutChart data={[
              { label: 'Professor', value: 25, color: '#3b82f6' },
              { label: 'Associate Professor', value: 32, color: '#10b981' },
              { label: 'Assistant Professor', value: 43, color: '#f59e0b' }
            ]} />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm flex flex-col">
          <h3 className="text-sm font-black text-slate-800 mb-4 tracking-tight">Faculty Development Participation</h3>
          <div className="flex-1 flex items-center justify-center">
            <VerticalBarChart data={[
              { label: 'FDPs', value: 42, color: '#3b82f6' },
              { label: 'Workshops', value: 36, color: '#10b981' },
              { label: 'Certifications', value: 28, color: '#f59e0b' },
              { label: 'Conferences', value: 18, color: '#8b5cf6' }
            ]} />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm flex flex-col">
          <h3 className="text-sm font-black text-slate-800 mb-4 tracking-tight">Research & Publications Breakdown</h3>
          <div className="flex-1 flex items-center justify-center">
            <DonutChart data={[
              { label: 'Research Projects', value: 40, color: '#3b82f6' },
              { label: 'Publications', value: 30, color: '#10b981' },
              { label: 'Patents', value: 20, color: '#f59e0b' },
              { label: 'Grants', value: 10, color: '#8b5cf6' }
            ]} />
          </div>
        </div>
      </div>

      {/* 3. RESEARCH & CONSULTANCY TRACKER LEDGER WITH MULTI-TAB SWITCHER */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col">
        {/* Sub-Nav Header */}
        <div className="flex flex-col md:flex-row border-b border-slate-200/80 bg-slate-50/70 justify-between items-stretch">
          <div className="flex items-center overflow-x-auto">
            <button
              onClick={() => setActiveSubTab('roster')}
              className={`px-5 py-3.5 text-xs font-bold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${activeSubTab === 'roster' ? 'border-blue-600 text-blue-700 bg-white' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              Faculty Roster ({facultyRoster.length})
            </button>
            <button
              onClick={() => setActiveSubTab('consultancy')}
              className={`px-5 py-3.5 text-xs font-bold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${activeSubTab === 'consultancy' ? 'border-blue-600 text-blue-700 bg-white' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              Consultancy & Grants (₹ 142.5 L)
            </button>
            <button
              onClick={() => setActiveSubTab('patents')}
              className={`px-5 py-3.5 text-xs font-bold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${activeSubTab === 'patents' ? 'border-blue-600 text-blue-700 bg-white' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              Patent Submissions (18)
            </button>
            <button
              onClick={() => setActiveSubTab('fdp')}
              className={`px-5 py-3.5 text-xs font-bold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${activeSubTab === 'fdp' ? 'border-blue-600 text-blue-700 bg-white' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              FDP Progress Tracker
            </button>
          </div>

          <div className="p-3 flex items-center gap-3 shrink-0">
            <button 
              onClick={() => setShowExportModal(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-300 rounded-md text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> Export Report
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 rounded-md text-xs font-bold text-white hover:bg-blue-700 transition-colors shadow-sm">
              <Plus className="w-3.5 h-3.5" /> Add Record
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="p-4 border-b border-slate-200/80 flex items-center gap-4 bg-white">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search faculty name, project title, or ID..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-100 border-none rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none text-slate-700 font-semibold placeholder-slate-400"
            />
          </div>
          <select 
            value={selectedDeptFilter}
            onChange={(e) => setSelectedDeptFilter(e.target.value)}
            className="px-3 py-2 bg-slate-100 border-none rounded-lg text-xs font-semibold text-slate-700 outline-none appearance-none pr-8 relative cursor-pointer min-w-[140px]"
          >
            <option value="All">All Departments</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Civil">Civil</option>
          </select>
        </div>

        {/* Dynamic Sub-tab Views */}
        <div className="overflow-x-auto">
          {activeSubTab === 'roster' && (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[10px] uppercase font-black text-slate-500 tracking-wider">
                  <th className="p-4 border-b border-slate-200/80 w-12 text-center">#</th>
                  <th className="p-4 border-b border-slate-200/80">Faculty ID</th>
                  <th className="p-4 border-b border-slate-200/80">Name</th>
                  <th className="p-4 border-b border-slate-200/80">Department</th>
                  <th className="p-4 border-b border-slate-200/80">Designation</th>
                  <th className="p-4 border-b border-slate-200/80 text-center">Mentorship Hours</th>
                  <th className="p-4 border-b border-slate-200/80 text-center">FDPs</th>
                  <th className="p-4 border-b border-slate-200/80 text-center">Research Projects</th>
                  <th className="p-4 border-b border-slate-200/80 text-center">Industry Projects</th>
                  <th className="p-4 border-b border-slate-200/80 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-xs font-semibold text-slate-700">
                {facultyRoster
                  .filter(f => selectedDeptFilter === 'All' || f.dept === selectedDeptFilter)
                  .filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()) || f.id.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((row, i) => (
                    <tr key={row.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="p-4 border-b border-slate-200/80 text-center text-slate-400">{i + 1}</td>
                      <td className="p-4 border-b border-slate-200/80 font-bold text-slate-800">{row.id}</td>
                      <td className="p-4 border-b border-slate-200/80 font-bold text-slate-800">{row.name}</td>
                      <td className="p-4 border-b border-slate-200/80 text-slate-500">{row.dept}</td>
                      <td className="p-4 border-b border-slate-200/80 text-slate-500">{row.desig}</td>
                      <td className="p-4 border-b border-slate-200/80 text-center font-black text-purple-600">{row.mentHours}</td>
                      <td className="p-4 border-b border-slate-200/80 text-center font-bold text-blue-600">{row.fdp}</td>
                      <td className="p-4 border-b border-slate-200/80 text-center font-bold text-emerald-600">{row.res}</td>
                      <td className="p-4 border-b border-slate-200/80 text-center font-bold text-orange-600">{row.ind}</td>
                      <td className="p-4 border-b border-slate-200/80 text-center">
                        <button className="px-3 py-1 border border-blue-200 text-blue-600 bg-blue-50 rounded-md text-[10px] font-bold uppercase hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">View</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {activeSubTab === 'consultancy' && (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[10px] uppercase font-black text-slate-500 tracking-wider">
                  <th className="p-4 border-b border-slate-200/80">Project ID</th>
                  <th className="p-4 border-b border-slate-200/80">Faculty Lead</th>
                  <th className="p-4 border-b border-slate-200/80">Dept</th>
                  <th className="p-4 border-b border-slate-200/80">Client Organization</th>
                  <th className="p-4 border-b border-slate-200/80">Consultancy Scope / Title</th>
                  <th className="p-4 border-b border-slate-200/80 text-center">Revenue Generated</th>
                  <th className="p-4 border-b border-slate-200/80 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="text-xs font-semibold text-slate-700">
                {consultancyData.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 border-b border-slate-200/80 font-bold text-slate-800">{row.id}</td>
                    <td className="p-4 border-b border-slate-200/80 font-bold">{row.lead}</td>
                    <td className="p-4 border-b border-slate-200/80 text-slate-500">{row.dept}</td>
                    <td className="p-4 border-b border-slate-200/80 text-slate-700 font-bold">{row.client}</td>
                    <td className="p-4 border-b border-slate-200/80 text-slate-600">{row.title}</td>
                    <td className="p-4 border-b border-slate-200/80 text-center font-black text-emerald-600">{row.amount}</td>
                    <td className="p-4 border-b border-slate-200/80 text-center">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${row.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : row.status === 'Completed' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeSubTab === 'patents' && (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[10px] uppercase font-black text-slate-500 tracking-wider">
                  <th className="p-4 border-b border-slate-200/80">Patent ID</th>
                  <th className="p-4 border-b border-slate-200/80">Inventor / Faculty Lead</th>
                  <th className="p-4 border-b border-slate-200/80">Dept</th>
                  <th className="p-4 border-b border-slate-200/80">Invention Title</th>
                  <th className="p-4 border-b border-slate-200/80 text-center">Filing Year</th>
                  <th className="p-4 border-b border-slate-200/80 text-center">Patent Status</th>
                </tr>
              </thead>
              <tbody className="text-xs font-semibold text-slate-700">
                {patentData.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 border-b border-slate-200/80 font-bold text-slate-800">{row.id}</td>
                    <td className="p-4 border-b border-slate-200/80 font-bold">{row.lead}</td>
                    <td className="p-4 border-b border-slate-200/80 text-slate-500">{row.dept}</td>
                    <td className="p-4 border-b border-slate-200/80 text-slate-700 font-bold">{row.title}</td>
                    <td className="p-4 border-b border-slate-200/80 text-center">{row.year}</td>
                    <td className="p-4 border-b border-slate-200/80 text-center">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${row.status === 'Granted' ? 'bg-emerald-100 text-emerald-700' : row.status === 'Published' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeSubTab === 'fdp' && (
            <div className="p-6 space-y-4">
              <h3 className="text-sm font-black text-slate-800 tracking-tight">Department-wise FDP Completion & Resource Utilization</h3>
              <div className="space-y-4">
                {fdpDepartmentData.map((dept, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="w-64">
                      <h4 className="text-xs font-black text-slate-800">{dept.department}</h4>
                      <p className="text-[10px] text-slate-500 font-semibold">{dept.totalFaculty} Total Faculty Members</p>
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-600">FDP Completion Rate</span>
                        <span className="text-blue-600">{dept.percentage}% ({dept.fdpCompleted} / {dept.totalFaculty})</span>
                      </div>
                      <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: `${dept.percentage}%` }} />
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-center shrink-0">
                      <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold">
                        {dept.activeGrants} Active Grants
                      </div>
                      <button className="px-3 py-1 bg-white border border-slate-300 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-100">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
