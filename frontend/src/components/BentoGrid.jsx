import React from 'react';
import AutoSyncWidget from './AutoSyncWidget';
import TopologicalRoadmap from './TopologicalRoadmap';
import { Flame, Trophy, HelpCircle, Code2, ArrowUpRight, CheckCircle2, IndianRupee, Plus, Calendar, ExternalLink } from 'lucide-react';

const YoutubeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function BentoGrid({ streak, dsaQuestions, webResources, user, onSwitchTab, onQuickAddDSA }) {
  // Sort questions by date
  const sortedDSA = [...dsaQuestions].sort((a, b) => new Date(b.date_solved || b.date) - new Date(a.date_solved || a.date));

  return (
    <div className="space-y-6">
      
      {/* 🚀 QUICK ACTION HUB BAR */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Quick Action 1: Log Solved Question */}
        <div
          onClick={onQuickAddDSA}
          className="glass-card p-5 cursor-pointer border-l-4 border-sky-400 hover:border-sky-300 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">+ Log Solved Problem</h3>
              <p className="text-xs text-slate-400">Add today's LeetCode / GFG problem</p>
            </div>
          </div>
          <ArrowUpRight className="w-5 h-5 text-sky-400 opacity-60 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Quick Action 2: YouTube Live Stream Hub */}
        <div
          onClick={() => onSwitchTab('webdev')}
          className="glass-card p-5 cursor-pointer border-l-4 border-red-500 hover:border-red-400 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <YoutubeIcon className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">Live Notes & Code</h3>
              <p className="text-xs text-slate-400">Access YouTube stream PDFs & code</p>
            </div>
          </div>
          <ArrowUpRight className="w-5 h-5 text-red-400 opacity-60 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Quick Action 3: ₹10 Doubts & Session */}
        <div
          onClick={() => onSwitchTab('doubts')}
          className="glass-card p-5 cursor-pointer border-l-4 border-emerald-400 hover:border-emerald-300 transition-all flex items-center justify-between group sm:col-span-2 lg:col-span-1"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <IndianRupee className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">Ask Doubt (₹10)</h3>
              <p className="text-xs text-slate-400">Book 1-on-1 code debugging session</p>
            </div>
          </div>
          <ArrowUpRight className="w-5 h-5 text-emerald-400 opacity-60 group-hover:opacity-100 transition-opacity" />
        </div>

      </div>

      {/* Main Stats Bento Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        
        {/* Bento Item 1: User Profile & Rank Level */}
        <div className="glass-card p-5 border-l-4 border-indigo-500 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Developer Level
            </span>
            <Trophy className="w-5 h-5 text-yellow-400" />
          </div>

          <div>
            <h3 className="text-xl font-extrabold text-slate-100">{user?.name || 'LO Novelist & Dev'}</h3>
            <p className="text-xs text-indigo-300 font-bold mt-1">⚡ Grandmaster Level 4</p>
          </div>

          <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-semibold">Total XP:</span>
            <span className="font-extrabold text-sky-400">1,450 XP</span>
          </div>
        </div>

        {/* Bento Item 2: Streak Flame Counter */}
        <div className="glass-card p-5 border-l-4 border-orange-500 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
              Daily Streak
            </span>
            <Flame className="w-6 h-6 text-orange-500 animate-pulse" />
          </div>

          <div>
            <div className="text-3xl font-black text-orange-400">{streak} Days</div>
            <p className="text-xs text-slate-400 mt-1">Keep solving daily to maintain streak</p>
          </div>

          <button
            onClick={onQuickAddDSA}
            className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1"
          >
            <span>+ Log Today's Problem</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bento Item 3: Quick Youtube Stream Card */}
        <div className="glass-card p-5 border-l-4 border-red-500 flex flex-col justify-between space-y-3 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <YoutubeIcon className="w-5 h-5 text-red-500" />
              <span className="text-xs font-bold text-slate-100">Latest YouTube Live Material</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">
              {webResources[0]?.session_date || 'Today'}
            </span>
          </div>

          {webResources[0] ? (
            <div>
              <h4 className="text-sm font-bold text-slate-100 line-clamp-1">{webResources[0].title}</h4>
              <p className="text-xs text-slate-300 mt-1 line-clamp-2">{webResources[0].notes}</p>
            </div>
          ) : (
            <p className="text-xs text-slate-400">No live stream materials uploaded yet.</p>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <button
              onClick={() => onSwitchTab('webdev')}
              className="btn-accent text-xs py-1.5 px-3"
            >
              <span>View All Notes & Code</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Free PDF & Source Code
            </span>
          </div>
        </div>

      </div>

      {/* 📅 DAILY SOLVED QUESTIONS TIMELINE FEED */}
      <div className="glass-card p-5 space-y-4 border-l-4 border-sky-400">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">Daily Solved Questions History</h3>
              <p className="text-xs text-slate-400">Every single problem you log day-by-day</p>
            </div>
          </div>

          <button
            onClick={() => onSwitchTab('dsa')}
            className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1"
          >
            <span>View Full Log</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Solved Feed List */}
        <div className="space-y-2.5">
          {sortedDSA.length > 0 ? (
            sortedDSA.slice(0, 5).map((q) => (
              <div
                key={q.id}
                className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex items-center justify-between flex-wrap gap-3 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {/* Platform Badge */}
                  <span className={`badge ${
                    q.platform?.toLowerCase().includes('gfg') || q.platform?.toLowerCase().includes('geeks')
                      ? 'badge-gfg'
                      : 'badge-leetcode'
                  }`}>
                    {q.platform || 'LeetCode'}
                  </span>

                  <div>
                    <h4 className="text-xs font-bold text-slate-100 flex items-center gap-2">
                      <span>{q.title}</span>
                      {q.solution_url && (
                        <a href={q.solution_url} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300">
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Topic: {q.topic || 'DSA'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Difficulty Badge */}
                  <span className={`badge ${
                    q.difficulty?.toLowerCase() === 'easy'
                      ? 'badge-easy'
                      : q.difficulty?.toLowerCase() === 'hard'
                      ? 'badge-hard'
                      : 'badge-medium'
                  }`}>
                    {q.difficulty || 'Medium'}
                  </span>

                  {/* Date Solved Pill */}
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
                    📅 {q.date_solved || q.date || 'Today'}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-xs text-slate-400">
              No questions logged yet today. Click "+ Log Solved Problem" to start!
            </div>
          )}
        </div>
      </div>

      {/* Automated LeetCode Sync Row */}
      <AutoSyncWidget />

      {/* Topological Learning Graph Component */}
      <TopologicalRoadmap />

    </div>
  );
}
