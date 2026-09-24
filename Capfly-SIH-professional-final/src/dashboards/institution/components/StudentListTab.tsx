import React, { useState } from 'react';

interface StudentRow {
  id: string;
  name: string;
  rollNumber: string;
  studentType: string;
  department: string;
  verifiedSkillScore: string;
}

export const StudentListTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedDept, setSelectedDept] = useState('All Departments');

  const studentsData: StudentRow[] = [
    { id: '1', name: 'Harini S', rollNumber: 'CAP001', studentType: 'Regular', department: 'CSE', verifiedSkillScore: '92%' },
    { id: '2', name: 'Karthik R', rollNumber: 'CAP002', studentType: 'Regular', department: 'ECE', verifiedSkillScore: '78%' },
    { id: '3', name: 'Priya M', rollNumber: 'CAP003', studentType: 'Regular', department: 'EEE', verifiedSkillScore: '65%' },
    { id: '4', name: 'Arun K', rollNumber: 'CAP004', studentType: 'Regular', department: 'Mechanical', verifiedSkillScore: '88%' },
    { id: '5', name: 'Divya L', rollNumber: 'CAP005', studentType: 'Lateral Entry', department: 'Civil', verifiedSkillScore: '70%' },
    { id: '6', name: 'Ramesh V', rollNumber: 'CAP006', studentType: 'Regular', department: 'CSE', verifiedSkillScore: '85%' },
    { id: '7', name: 'Sneha P', rollNumber: 'CAP007', studentType: 'Regular', department: 'ECE', verifiedSkillScore: '90%' },
  ];

  const filteredStudents = studentsData.filter(s =>
    selectedDept === 'All Departments' || s.department.toLowerCase() === selectedDept.toLowerCase()
  );

  return (
    <div className="space-y-6 font-sans text-slate-800 bg-[#f8fafc] min-h-full pb-12">
      {/* Title Header */}
      <div className="border-b border-gray-200/80 pb-3">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Student Records</h1>
        <p className="text-xs text-slate-500 font-medium">Verified Student Digital Master Roster</p>
      </div>

      {/* Sub-tabs & Department Filter Row (PRAGATI MITRA SPECIFIED) */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('All')}
            className={`px-5 py-2 text-xs font-bold rounded-full transition-colors cursor-pointer ${
              activeTab === 'All'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            All
          </button>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-500">Department Filter:</label>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-xs font-bold text-slate-700 outline-none cursor-pointer shadow-2xs"
          >
            <option value="All Departments">Select Department (All)</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Civil">Civil</option>
          </select>
        </div>
      </div>

      {/* SIMPLE DATA TABLE WITH LIGHT GRAY HEADERS (PRAGATI MITRA SPECIFIED: Id | Name | Roll Number | Student Type | Department | Verified Skill Score) */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-[11px] uppercase font-bold text-slate-600 border-b border-gray-200">
                <th className="py-3.5 px-4 w-16 text-center">Id</th>
                <th className="py-3.5 px-4">Name</th>
                <th className="py-3.5 px-4">Roll Number</th>
                <th className="py-3.5 px-4">Student Type</th>
                <th className="py-3.5 px-4">Department</th>
                <th className="py-3.5 px-4 text-center">Verified Skill Score</th>
              </tr>
            </thead>
            <tbody className="text-xs font-semibold text-slate-700 divide-y divide-gray-100">
              {filteredStudents.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 text-center text-slate-400 font-bold">{row.id}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{row.name}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-700">{row.rollNumber}</td>
                  <td className="py-3.5 px-4 text-slate-500">{row.studentType}</td>
                  <td className="py-3.5 px-4 text-slate-600 font-bold">{row.department}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-block px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded font-black text-xs">
                      {row.verifiedSkillScore}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center text-xs text-slate-500 font-semibold">
          <span>Showing 1 to {filteredStudents.length} of 200 students</span>
          <div className="flex gap-1">
            <button className="px-2.5 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 text-xs">Previous</button>
            <button className="px-2.5 py-1 bg-slate-800 text-white rounded text-xs">1</button>
            <button className="px-2.5 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 text-xs">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};
