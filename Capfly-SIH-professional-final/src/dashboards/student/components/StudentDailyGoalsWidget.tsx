import React, { useState } from 'react';
import { Check, Plus, Edit2 } from 'lucide-react';

interface Goal {
  id: string;
  text: string;
  tag: string;
  completed: boolean;
}

export const StudentDailyGoalsWidget: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([
    { id: '1', text: 'Complete Quantitative Aptitude Test', tag: '11:00 AM', completed: false },
    { id: '2', text: 'Solve 2 Graph Challenges on Arena', tag: 'Arena', completed: false },
    { id: '3', text: 'Review Docker Capstone PR', tag: 'Project', completed: true },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTaskText, setEditTaskText] = useState('');

  const toggleGoal = (id: string) => {
    setGoals(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  };

  const handleAddSubmit = (e: React.KeyboardEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => {
    if ('key' in e && e.key !== 'Enter') return;
    
    if (newTaskText.trim()) {
      setGoals([...goals, {
        id: Date.now().toString(),
        text: newTaskText.trim(),
        tag: 'New',
        completed: false
      }]);
    }
    setNewTaskText('');
    setIsAdding(false);
  };

  const startEditing = (goal: Goal) => {
    setEditingId(goal.id);
    setEditTaskText(goal.text);
  };

  const handleEditSubmit = (id: string, e: React.KeyboardEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => {
    if ('key' in e && e.key !== 'Enter') return;

    if (editTaskText.trim()) {
      setGoals(goals.map(g => g.id === id ? { ...g, text: editTaskText.trim() } : g));
    }
    setEditingId(null);
  };

  return (
    <div className="col-span-12 md:col-span-4 bg-white border border-slate-100 rounded-2xl p-5 shadow-xs font-sans flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-bold text-slate-900">Today's Goals</h3>
          <span className="bg-slate-100 font-mono text-[10px] text-slate-600 px-2 py-0.5 rounded font-bold">Week 38</span>
        </div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4 block">My Targets</span>
        
        <div className="space-y-3">
          {goals.map(goal => (
            <div key={goal.id} className="flex items-start gap-3 group">
              <button 
                onClick={() => toggleGoal(goal.id)}
                className={`w-5 h-5 mt-0.5 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                  goal.completed 
                    ? 'bg-emerald-500 border-emerald-500 text-white' 
                    : 'border-slate-300 text-transparent hover:border-emerald-400'
                }`}
              >
                <Check className="w-3 h-3" strokeWidth={3} />
              </button>
              
              <div className="flex-1 flex flex-col pt-0.5">
                {editingId === goal.id ? (
                  <input 
                    type="text"
                    value={editTaskText}
                    onChange={(e) => setEditTaskText(e.target.value)}
                    onKeyDown={(e) => handleEditSubmit(goal.id, e)}
                    onBlur={(e) => handleEditSubmit(goal.id, e)}
                    autoFocus
                    className="text-xs font-semibold text-slate-800 border-b border-blue-400 focus:outline-none bg-transparent w-full"
                  />
                ) : (
                  <div className="flex items-start justify-between gap-2">
                    <span 
                      onClick={() => startEditing(goal)}
                      className={`text-xs font-semibold transition-all duration-300 cursor-text ${
                        goal.completed ? 'line-through text-slate-400 opacity-60' : 'text-slate-800'
                      }`}
                    >
                      {goal.text}
                    </span>
                    <button onClick={() => startEditing(goal)} className="text-slate-300 hover:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Edit2 className="w-3 h-3" />
                    </button>
                  </div>
                )}
                <span className={`text-[10px] font-medium mt-1 ${goal.completed ? 'text-slate-300' : 'text-blue-500'}`}>
                  {goal.tag}
                </span>
              </div>
            </div>
          ))}

          {isAdding && (
            <div className="flex items-start gap-3 animate-fade-in">
              <div className="w-5 h-5 mt-0.5 rounded-full border border-slate-300 shrink-0"></div>
              <input 
                type="text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                onKeyDown={handleAddSubmit}
                onBlur={handleAddSubmit}
                autoFocus
                placeholder="Type a new goal..."
                className="text-xs font-semibold text-slate-800 border-b border-slate-300 focus:border-blue-500 focus:outline-none bg-transparent w-full flex-1 pt-0.5"
              />
            </div>
          )}
        </div>
      </div>

      {!isAdding && (
        <button 
          onClick={() => setIsAdding(true)}
          className="mt-6 flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" /> Add task
        </button>
      )}
    </div>
  );
};
