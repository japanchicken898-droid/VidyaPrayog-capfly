import React, { useState } from 'react';

interface InternshipEntry {
  id: string;
  candidateName: string;
  rollNumber: string;
  department: string;
  hostCompany: string;
  internshipRole: string;
  duration: string;
  status: 'Completed' | 'Ongoing' | 'Applied';
}

export const InternshipLogTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedDate, setSelectedDate] = useState('12-09-2026');
  const [isFetched, setIsFetched] = useState(true);

  const internshipLogs: InternshipEntry[] = [
    { id: 'INT-101', candidateName: 'Harini S', rollNumber: 'CAP001', department: 'CSE', hostCompany: 'TCS Research', internshipRole: 'Cloud Infrastructure', duration: '6 Months', status: 'Completed' },
    { id: 'INT-102', candidateName: 'Karthik R', rollNumber: 'CAP002', department: 'ECE', hostCompany: 'Bosch Engineering', internshipRole: 'Embedded Firmware Dev', duration: '3 Months', status: 'Ongoing' },
    { id: 'INT-103', candidateName: 'Arun K', rollNumber: 'CAP004', department: 'Mechanical', hostCompany: 'Larsen & Toubro', internshipRole: 'Robotics & Automation', duration: '6 Months', status: 'Completed' },
    { id: 'INT-104', candidateName: 'Divya L', rollNumber: 'CAP005', department: 'Civil', hostCompany: 'L&T Infrastructure', internshipRole: 'BIM 3D Modeling', duration: '2 Months', status: 'Applied' },
    { id: 'INT-105', candidateName: 'Ramesh V', rollNumber: 'CAP006', department: 'CSE', hostCompany: 'Infosys', internshipRole: 'Full Stack Development', duration: '6 Months', status: 'Completed' },
  ];

  const handleFetch = () => {
    setIsFetched(true);
  };

  return (
    <div className="space-y-6 font-sans text-slate-800 bg-[#f8fafc] min-h-full pb-12">
      {/* Title Header */}
      <div className="border-b border-gray-200/80 pb-3">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Internship Log</h1>
        <p className="text-xs text-slate-500 font-medium">Track Industrial Internship Applications &amp; Progress</p>
      </div>

      {/* Sub-tab Pill Button */}
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

      {/* FILTER BAR (PRAGATI MITRA SPECIFIED: "Select Date" Input + GREEN "Fetch" Button bg-green-600 hover:bg-green-700 text-white rounded px-5 py-2) */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-slate-600">Select Date:</label>
          <input
            type="text"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            placeholder="DD-MM-YYYY"
            className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs font-bold text-slate-800 outline-none w-44"
          />
        </div>

        <button
          onClick={handleFetch}
          className="bg-green-600 hover:bg-green-700 text-white rounded px-5 py-2 text-xs font-bold cursor-pointer transition-colors shadow-xs"
        >
          Fetch
        </button>
      </div>

      {/* DATA TABLE FOR FETCHED INTERNSHIP LOGS */}
      {isFetched && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex justify-between items-center">
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Fetched Internship Applications ({internshipLogs.length})</h2>
            <span className="text-xs text-slate-400 font-semibold">Date Filter: {selectedDate}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-[11px] uppercase font-bold text-slate-600 border-b border-gray-200">
                  <th className="py-3.5 px-4">Log ID</th>
                  <th className="py-3.5 px-4">Candidate Name</th>
                  <th className="py-3.5 px-4">Roll Number</th>
                  <th className="py-3.5 px-4">Department</th>
                  <th className="py-3.5 px-4">Host Company</th>
                  <th className="py-3.5 px-4">Internship Role</th>
                  <th className="py-3.5 px-4 text-center">Duration</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="text-xs font-semibold text-slate-700 divide-y divide-gray-100">
                {internshipLogs.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{row.id}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">{row.candidateName}</td>
                    <td className="py-3.5 px-4 text-slate-600 font-bold">{row.rollNumber}</td>
                    <td className="py-3.5 px-4 text-slate-500">{row.department}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-700">{row.hostCompany}</td>
                    <td className="py-3.5 px-4 text-slate-600">{row.internshipRole}</td>
                    <td className="py-3.5 px-4 text-center font-bold text-slate-600">{row.duration}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                        row.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                        row.status === 'Ongoing' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                        'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
