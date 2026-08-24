import React from 'react';
import { Wrench, ShieldAlert, ArrowLeft, RefreshCw, Cpu, Server, Sparkles } from 'lucide-react';

export default function CodeCompiler({ onSwitchTab }) {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-6 animate-fadeIn">
      
      {/* Main Maintenance Glass Card */}
      <div className="glass-card p-8 md:p-12 text-center border-l-4 border-amber-500 relative overflow-hidden space-y-6">
        
        {/* Ambient Glow Circles */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Maintenance Icon Badge */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shadow-xl shadow-amber-500/10 animate-bounce">
          <Wrench className="w-10 h-10" />
        </div>

        {/* Title & Badge */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            <span>Under Maintenance</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100">
            Live Compiler Server Upgrade in Progress
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            We are upgrading our multi-language code execution sandbox servers (Python, Java, C++, C, & JS) with GPU acceleration and isolated Docker containers for faster execution speeds.
          </p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 max-w-2xl mx-auto">
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-left space-y-1">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-xs">
              <Server className="w-4 h-4" /> Sandbox Cluster
            </div>
            <p className="text-xs font-semibold text-slate-200">Upgrading Nodes</p>
            <p className="text-[10px] text-slate-400">Isolated Sandbox VM</p>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-left space-y-1">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
              <RefreshCw className="w-4 h-4 animate-spin" /> Status
            </div>
            <p className="text-xs font-semibold text-amber-400">Maintenance Active</p>
            <p className="text-[10px] text-slate-400">Estimated: Back Soon</p>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-left space-y-1">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-xs">
              <Cpu className="w-4 h-4" /> Supported Runtimes
            </div>
            <p className="text-xs font-semibold text-slate-200">Python, Java, C++, JS</p>
            <p className="text-[10px] text-slate-400">High Optimization -O2</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 flex items-center justify-center gap-4">
          <button
            onClick={() => onSwitchTab?.('bento')}
            className="btn-primary text-xs py-2.5 px-6 flex items-center gap-2 shadow-lg shadow-sky-500/20"
          >
            <ArrowLeft className="w-4 h-4 text-slate-950" />
            <span>Return to Bento Dashboard</span>
          </button>
        </div>

      </div>

    </div>
  );
}
