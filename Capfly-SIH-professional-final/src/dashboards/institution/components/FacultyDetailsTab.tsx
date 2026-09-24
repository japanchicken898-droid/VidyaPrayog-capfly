import React, { useState } from 'react';
import { Users, GraduationCap, Award, Search, Plus, Building2, X } from 'lucide-react';
import { DonutChart, MultiSegmentProgressBar } from './ChartUtils';

interface FacultyMember {
  id: string; avatarBg: string; avatarText: string; name: string;
  department: string; designation: string; experience: string;
  email: string; contact: string; status: 'Active' | 'On Leave'; qualification: string;
}

const initialFaculty: FacultyMember[] = [
  { id: 'FAC-CSE-001', avatarBg: 'bg-blue-600', avatarText: 'AS', name: 'Dr. Anitha S', department: 'CSE', designation: 'Professor & HOD', experience: '16 Years', email: 'anitha.s@college.edu.in', contact: '9876512345', status: 'Active', qualification: 'Ph.D in AI & Machine Learning' },
  { id: 'FAC-ECE-002', avatarBg: 'bg-emerald-600', avatarText: 'KR', name: 'Dr. Karthik R', department: 'ECE', designation: 'Associate Professor', experience: '12 Years', email: 'karthik.r@college.edu.in', contact: '9876523456', status: 'Active', qualification: 'Ph.D in VLSI & Embedded Systems' },
  { id: 'FAC-MECH-003', avatarBg: 'bg-amber-600', avatarText: 'PM', name: 'Dr. Prakash M', department: 'Mechanical', designation: 'Professor', experience: '18 Years', email: 'prakash.m@college.edu.in', contact: '9876534567', status: 'Active', qualification: 'Ph.D in Robotics & Automation' },
  { id: 'FAC-EEE-004', avatarBg: 'bg-purple-600', avatarText: 'MP', name: 'Dr. Meena P', department: 'EEE', designation: 'Associate Professor', experience: '10 Years', email: 'meena.p@college.edu.in', contact: '9876545678', status: 'Active', qualification: 'Ph.D in Power Electronics' },
  { id: 'FAC-CIVIL-005', avatarBg: 'bg-rose-600', avatarText: 'DK', name: 'Dr. Divya K', department: 'Civil', designation: 'Assistant Professor', experience: '6 Years', email: 'divya.k@college.edu.in', contact: '9876556789', status: 'Active', qualification: 'Ph.D in Structural Engineering' },
  { id: 'FAC-CSE-006', avatarBg: 'bg-indigo-600', avatarText: 'RS', name: 'Prof. Ramesh S', department: 'CSE', designation: 'Assistant Professor', experience: '5 Years', email: 'ramesh.s@college.edu.in', contact: '9876567890', status: 'Active', qualification: 'M.Tech in Computer Networks' },
  { id: 'FAC-ECE-007', avatarBg: 'bg-teal-600', avatarText: 'VK', name: 'Prof. Vidhya K', department: 'ECE', designation: 'Assistant Professor', experience: '7 Years', email: 'vidhya.k@college.edu.in', contact: '9876578901', status: 'On Leave', qualification: 'M.E in Communication Systems' },
  { id: 'FAC-MECH-008', avatarBg: 'bg-orange-600', avatarText: 'AG', name: 'Dr. Anand G', department: 'Mechanical', designation: 'Associate Professor', experience: '14 Years', email: 'anand.g@college.edu.in', contact: '9876589012', status: 'Active', qualification: 'Ph.D in Thermal Engineering' },
];

const designationPieData = [
  { label: 'Professors & HODs', value: 46, color: '#2563eb' },
  { label: 'Associate Professors', value: 58, color: '#10b981' },
  { label: 'Assistant Professors', value: 80, color: '#f59e0b' },
];

const deptStrengthSegments = [
  { label: 'CSE', value: 48, color: '#2563eb' },
  { label: 'ECE', value: 40, color: '#10b981' },
  { label: 'Mechanical', value: 36, color: '#f59e0b' },
  { label: 'EEE', value: 32, color: '#8b5cf6' },
  { label: 'Civil', value: 28, color: '#f43f5e' },
];

export const FacultyDetailsTab: React.FC = () => {
  const [facultyList, setFacultyList] = useState<FacultyMember[]>(initialFaculty);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [desigFilter, setDesigFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(null);
  const [newFaculty, setNewFaculty] = useState({ name: '', department: 'CSE', designation: 'Assistant Professor', experience: '3 Years', email: '', contact: '', qualification: 'M.Tech' });

  const filtered = facultyList.filter(f => {
    const q = f.name.toLowerCase().includes(search.toLowerCase()) || f.id.toLowerCase().includes(search.toLowerCase());
    const d = deptFilter === 'All' || f.department === deptFilter;
    const e = desigFilter === 'All' || f.designation.includes(desigFilter);
    return q && d && e;
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFaculty.name) return;
    const id = `FAC-${newFaculty.department}-${String(facultyList.length + 1).padStart(3, '0')}`;
    const initials = newFaculty.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'FC';
    setFacultyList([{ id, avatarBg: 'bg-blue-600', avatarText: initials, ...newFaculty, status: 'Active' }, ...facultyList]);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Faculty Details</h1>
          <p className="text-xs text-slate-500">Faculty &gt; Faculty Profiles &amp; Department Roster</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer">
          <Plus className="w-4 h-4" /><span>Add New Faculty</span>
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Faculty', value: '184', color: 'bg-blue-50 text-blue-600', Icon: Users },
          { label: 'Professors & HODs', value: '46', color: 'bg-emerald-50 text-emerald-600', Icon: GraduationCap },
          { label: 'Associate Professors', value: '58', color: 'bg-purple-50 text-purple-600', Icon: Award },
          { label: 'Ph.D Holders (77%)', value: '142', color: 'bg-amber-50 text-amber-600', Icon: Building2 },
        ].map((c, i) => (
          <div key={i} className="bg-white rounded-xl p-5 border border-slate-100 shadow-xs flex items-center justify-between">
            <div><p className="text-xs font-semibold text-slate-500 mb-1">{c.label}</p><h3 className="text-2xl font-extrabold text-slate-900">{c.value}</h3></div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${c.color}`}><c.Icon className="w-6 h-6" /></div>
          </div>
        ))}
      </div>

      {/* CHART ROW: Donut Pie + Multi-Segment Horizontal Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
          <div className="pb-3 border-b border-slate-100 mb-4">
            <h3 className="text-sm font-bold text-slate-900">Faculty Designation Breakdown</h3>
            <p className="text-[10px] text-slate-400 font-semibold">Institutional Cadre Distribution — Donut Chart</p>
          </div>
          <DonutChart data={designationPieData} centerText="184" centerSubtext="Faculty" />
        </div>

        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
          <div className="pb-3 border-b border-slate-100 mb-4">
            <h3 className="text-sm font-bold text-slate-900">Department Strength Distribution</h3>
            <p className="text-[10px] text-slate-400 font-semibold">Proportional Faculty Allocation — Segment Bar</p>
          </div>
          <div className="mt-2">
            <MultiSegmentProgressBar segments={deptStrengthSegments} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search faculty name or ID..." className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold">
          <option value="All">All Departments</option>
          <option value="CSE">CSE</option><option value="ECE">ECE</option><option value="EEE">EEE</option><option value="Mechanical">Mechanical</option><option value="Civil">Civil</option>
        </select>
        <select value={desigFilter} onChange={e => setDesigFilter(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold">
          <option value="All">All Designations</option>
          <option value="Professor">Professor</option><option value="Associate">Associate Professor</option><option value="Assistant">Assistant Professor</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead><tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-extrabold uppercase text-slate-500">
            <th className="py-3.5 px-4">Faculty ID</th><th className="py-3.5 px-4">Faculty Name</th><th className="py-3.5 px-4">Department</th><th className="py-3.5 px-4">Designation</th><th className="py-3.5 px-4">Experience</th><th className="py-3.5 px-4">Email</th><th className="py-3.5 px-4">Status</th><th className="py-3.5 px-4 text-center">Actions</th>
          </tr></thead>
          <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
            {filtered.map(f => (
              <tr key={f.id} className="hover:bg-slate-50/70">
                <td className="py-3.5 px-4 font-mono font-bold text-slate-800">{f.id}</td>
                <td className="py-3.5 px-4"><div className="flex items-center gap-2.5"><div className={`w-8 h-8 rounded-full ${f.avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0`}>{f.avatarText}</div><div><span className="font-bold text-slate-900 block">{f.name}</span><span className="text-[10px] text-slate-400">{f.qualification}</span></div></div></td>
                <td className="py-3.5 px-4">{f.department}</td>
                <td className="py-3.5 px-4">{f.designation}</td>
                <td className="py-3.5 px-4">{f.experience}</td>
                <td className="py-3.5 px-4 text-slate-500">{f.email}</td>
                <td className="py-3.5 px-4"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${f.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>{f.status}</span></td>
                <td className="py-3.5 px-4 text-center"><button onClick={() => setSelectedFaculty(f)} className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-2.5 py-1 rounded-md cursor-pointer">View Profile</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedFaculty && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full ${selectedFaculty.avatarBg} text-white font-bold text-base flex items-center justify-center`}>{selectedFaculty.avatarText}</div>
                <div><h3 className="text-base font-bold text-slate-900">{selectedFaculty.name}</h3><p className="text-xs text-slate-500">{selectedFaculty.designation} &bull; {selectedFaculty.department}</p></div>
              </div>
              <button onClick={() => setSelectedFaculty(null)} className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 cursor-pointer"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-3 text-xs">
              {[['Faculty ID', selectedFaculty.id], ['Qualification', selectedFaculty.qualification], ['Experience', selectedFaculty.experience], ['Email', selectedFaculty.email], ['Contact', selectedFaculty.contact]].map(([k, v]) => (
                <div key={k} className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex justify-between"><span className="text-slate-400 font-semibold">{k}:</span><span className="font-bold text-slate-800">{v}</span></div>
              ))}
            </div>
            <div className="mt-6 flex justify-end"><button onClick={() => setSelectedFaculty(null)} className="px-4 py-2 text-xs font-bold text-white bg-blue-600 rounded-lg cursor-pointer">Close Profile</button></div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">Add Faculty Member</h3>
              <button onClick={() => setShowAddModal(false)} className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 cursor-pointer"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleAdd} className="space-y-3 text-xs">
              <div><label className="block font-bold text-slate-700 mb-1">Full Name</label><input type="text" required placeholder="e.g. Dr. Suresh K" value={newFaculty.name} onChange={e => setNewFaculty({...newFaculty, name: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block font-bold text-slate-700 mb-1">Department</label>
                  <select value={newFaculty.department} onChange={e => setNewFaculty({...newFaculty, department: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                    <option value="CSE">CSE</option><option value="ECE">ECE</option><option value="EEE">EEE</option><option value="Mechanical">Mechanical</option><option value="Civil">Civil</option>
                  </select>
                </div>
                <div><label className="block font-bold text-slate-700 mb-1">Designation</label>
                  <select value={newFaculty.designation} onChange={e => setNewFaculty({...newFaculty, designation: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                    <option>Professor &amp; HOD</option><option>Professor</option><option>Associate Professor</option><option>Assistant Professor</option>
                  </select>
                </div>
              </div>
              <div><label className="block font-bold text-slate-700 mb-1">Qualification</label><input type="text" placeholder="e.g. Ph.D in Cybersecurity" value={newFaculty.qualification} onChange={e => setNewFaculty({...newFaculty, qualification: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" /></div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 font-bold text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg">Save Faculty</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
