import React, { useState } from 'react';
import { Calendar, CheckCircle2, Flame, Trophy } from 'lucide-react';

export default function AttendanceHeatmap({ streak, records, onCheckIn }) {
  const [checkingIn, setCheckingIn] = useState(false);
  const [noteInput, setNoteInput] = useState('');

  // Generate last 30 days grid for calendar heatmap
  const days = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const isPresent = records?.some(r => r.date === dateStr && r.status === 'Present');
    const isTodayStr = dateStr === today.toISOString().split('T')[0];
    
    days.push({
      dateStr,
      dayNum: d.getDate(),
      month: d.toLocaleString('default', { month: 'short' }),
      isPresent,
      isToday: isTodayStr
    });
  }

  const todayMarked = records?.some(r => r.date === today.toISOString().split('T')[0] && r.status === 'Present');

  const handleCheckInSubmit = async (e) => {
    e.preventDefault();
    setCheckingIn(true);
    await onCheckIn(noteInput);
    setNoteInput('');
    setCheckingIn(false);
  };

  return (
    <div className="glass-card p-4 mb-4 relative overflow-hidden">
      
      {/* Compact Top Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
        
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2 leading-tight">
              Daily Attendance Heatmap
            </h2>
            <p className="text-[11px] text-slate-400">30-Day streak activity</p>
          </div>
        </div>

        {/* Attendance Action & Stats */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-1.5 bg-slate-900/60 px-2.5 py-1 rounded-lg border border-slate-800 text-xs">
            <Trophy className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Streak:</span>
            <span className="font-extrabold text-orange-400">{streak} Days 🔥</span>
          </div>

          {!todayMarked ? (
            <form onSubmit={handleCheckInSubmit} className="flex items-center gap-1.5">
              <input
                type="text"
                placeholder="Today's note..."
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                className="glass-input text-[11px] py-1 px-2.5 w-32 hidden md:block"
              />
              <button
                type="submit"
                disabled={checkingIn}
                className="btn-primary text-[11px] py-1 px-3 whitespace-nowrap"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-950" />
                <span>{checkingIn ? 'Marking...' : 'Mark Present'}</span>
              </button>
            </form>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Marked Today</span>
            </div>
          )}
        </div>

      </div>

      {/* Ultra-Compact Micro Heatmap Tiles Strip */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 pt-1 scrollbar-thin">
        {days.map((item, idx) => (
          <div
            key={idx}
            title={`${item.dateStr} (${item.month} ${item.dayNum}) - ${item.isPresent ? 'Present' : 'Not marked'}`}
            className={`flex-shrink-0 w-8 h-8 rounded-md border flex flex-col items-center justify-center transition-all cursor-pointer ${
              item.isPresent
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 shadow-sm shadow-emerald-500/20 hover:scale-105'
                : 'bg-slate-900/40 border-slate-800 text-slate-500 hover:border-slate-700'
            } ${item.isToday ? 'ring-1 ring-sky-400 ring-offset-1 ring-offset-slate-950' : ''}`}
          >
            <span className="text-[8px] uppercase tracking-tighter opacity-60 leading-none">{item.month}</span>
            <span className="text-[11px] font-extrabold leading-none mt-0.5">{item.dayNum}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
