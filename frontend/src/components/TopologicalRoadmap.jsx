import React, { useState, useEffect } from 'react';
import { GitCommit, Lock, CheckCircle2, PlayCircle, ShieldAlert, ArrowRight, Award } from 'lucide-react';

export default function TopologicalRoadmap() {
  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoadmap();
  }, []);

  const fetchRoadmap = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/roadmap');
      if (res.ok) {
        const data = await res.json();
        setNodes(data);
      }
    } catch (e) {
      console.warn('Roadmap fetch fallback mode');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteNode = async (nodeId) => {
    try {
      const res = await fetch('http://localhost:5000/api/roadmap/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodeId })
      });
      if (res.ok) {
        const data = await res.json();
        setNodes(data.nodes);
      }
    } catch (e) {}
  };

  return (
    <div className="glass-card p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/20">
              PEDAGOGICAL DEPENDENCY GRAPH
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
            <GitCommit className="w-5 h-5 text-purple-400" /> Topological Data Structures & Algorithms Roadmap
          </h2>
          <p className="text-xs text-slate-400">
            Advanced topics remain locked until foundational prerequisites are completed.
          </p>
        </div>

        {/* Global Progress Bar */}
        <div className="w-full md:w-64 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
          <div className="flex justify-between text-xs font-bold mb-1">
            <span className="text-slate-100 font-extrabold">Overall Progress</span>
            <span className="text-purple-400 font-extrabold">
              {nodes.filter((n) => n.status === 'Completed').length} / {nodes.length} Completed
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-sky-400 transition-all duration-500"
              style={{
                width: `${(nodes.filter((n) => n.status === 'Completed').length / (nodes.length || 1)) * 100}%`
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Nodes Graph Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative">
        {nodes.map((node, index) => {
          const isCompleted = node.status === 'Completed';
          const isInProgress = node.status === 'In Progress';
          const isLocked = node.status === 'Locked';

          return (
            <div
              key={node.id}
              className={`p-5 rounded-2xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                isCompleted
                  ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-100 shadow-md shadow-emerald-500/10'
                  : isInProgress
                  ? 'bg-purple-950/30 border-purple-500/50 text-white ring-1 ring-purple-500/30'
                  : 'bg-slate-950/40 border-slate-800 text-slate-500 opacity-70'
              }`}
            >
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900/80 border border-slate-800 text-slate-400">
                  {node.category}
                </span>

                {isCompleted ? (
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> COMPLETED
                  </span>
                ) : isInProgress ? (
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1 animate-pulse">
                    <PlayCircle className="w-3 h-3 text-purple-400" /> IN PROGRESS
                  </span>
                ) : (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-slate-800 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> LOCKED
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <div className="space-y-1.5 mb-4">
                <h3 className="font-bold text-slate-100 text-base">{node.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{node.description}</p>
              </div>

              {/* Progress & Action */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div className="font-mono text-slate-400">
                  <span>Problems: </span>
                  <span className="font-bold text-sky-400">{node.solved_count}</span> / {node.total_required}
                </div>

                {!isCompleted && !isLocked && (
                  <button
                    onClick={() => handleCompleteNode(node.id)}
                    className="btn-accent text-[11px] py-1 px-3 flex items-center gap-1"
                  >
                    <span>Mark Complete</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
