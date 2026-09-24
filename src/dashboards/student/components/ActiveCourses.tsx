import React from 'react';
import { PlayCircle, Clock } from 'lucide-react';

export const ActiveCourses: React.FC = () => {
  const courses = [
    { title: 'Full Stack Industry Capstone Project', instructor: 'Dr. Ramesh Kumar', progress: 78, tag: 'Industry Mentored' },
    { title: 'Machine Learning & Predictive AI Foundations', instructor: 'Prof. Ananya Roy', progress: 60, tag: 'Core CS' },
    { title: 'Cloud Infrastructure & DevOps Best Practices', instructor: 'Industry Specialist Tech Corp', progress: 45, tag: 'Hands-on Lab' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center justify-between">
        <span>Active Learning Modules</span>
        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">3 In Progress</span>
      </h3>
      <div className="space-y-4">
        {courses.map((course, idx) => (
          <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                  {course.tag}
                </span>
                <h4 className="font-bold text-slate-800 mt-1">{course.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Instructor: {course.instructor}
                </p>
              </div>
              <button className="p-2 text-blue-600 hover:bg-blue-100/60 rounded-xl transition-colors">
                <PlayCircle className="w-6 h-6" />
              </button>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
