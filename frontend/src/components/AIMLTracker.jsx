import React, { useState } from 'react';
import { Plus, ArrowLeft, ExternalLink, Trash2, FileText, Code2, Copy, Check, Sparkles, Brain, Cpu } from 'lucide-react';

export default function AIMLTracker({ tasks = [], onAddTask, onAddApproach, onAddCode, onDeleteTask, onBack }) {
  // Modal visibility states
  const [showLogModal, setShowLogModal] = useState(false);
  const [showApproachModal, setShowApproachModal] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [viewingTask, setViewingTask] = useState(null);

  // Form states for Log Task (Question)
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Machine Learning');
  const [topic, setTopic] = useState('');
  const [taskUrl, setTaskUrl] = useState('');
  const [dateSolved, setDateSolved] = useState(new Date().toISOString().split('T')[0]);

  // Form states for Upload Approach
  const [selectedTaskForApproach, setSelectedTaskForApproach] = useState('');
  const [approachNotes, setApproachNotes] = useState('');

  // Form states for Upload Code
  const [selectedTaskForCode, setSelectedTaskForCode] = useState('');
  const [solutionCode, setSolutionCode] = useState('');

  // UI Copy feedback state
  const [copied, setCopied] = useState(false);

  // 1. Submit New AI/ML Question / Task
  const handleLogSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;

    await onAddTask({
      title,
      category,
      topic: topic || category,
      task_url: taskUrl,
      date_solved: dateSolved
    });

    setTitle('');
    setTopic('');
    setTaskUrl('');
    setShowLogModal(false);
  };

  // 2. Submit Approach Notes
  const handleApproachSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTaskForApproach || !approachNotes) return;

    await onAddApproach(selectedTaskForApproach, approachNotes);
    setSelectedTaskForApproach('');
    setApproachNotes('');
    setShowApproachModal(false);
  };

  // 3. Submit Solution Code
  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTaskForCode || !solutionCode) return;

    await onAddCode(selectedTaskForCode, solutionCode);
    setSelectedTaskForCode('');
    setSolutionCode('');
    setShowCodeModal(false);
  };

  // Copy code handler
  const handleCopyCode = (codeText) => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper to open approach modal pre-selecting a task
  const openApproachModalForTask = (taskId) => {
    setSelectedTaskForApproach(taskId);
    const existing = tasks.find((t) => t.id === taskId);
    setApproachNotes(existing?.approach || '');
    setShowApproachModal(true);
  };

  // Helper to open code modal pre-selecting a task
  const openCodeModalForTask = (taskId) => {
    setSelectedTaskForCode(taskId);
    const existing = tasks.find((t) => t.id === taskId);
    setSolutionCode(existing?.solution_code || '');
    setShowCodeModal(true);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-card p-6 border-l-4 border-emerald-400 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5 border border-emerald-500/30 text-emerald-300 hover:text-emerald-200 transition-all cursor-pointer"
                title="Back to Dashboard"
              >
                <ArrowLeft className="w-4 h-4 text-emerald-400" />
                <span className="font-bold">⬅️ Back to Dashboard</span>
              </button>
            )}

            <div>
              <h2 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
                <Brain className="w-6 h-6 text-emerald-400 inline" /> AI / Machine Learning Daily Tracker
              </h2>
              <p className="text-xs text-slate-400">Log daily AI/ML models, upload architecture & math approaches, and attach PyTorch / TensorFlow code</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
              TOTAL MODELS: {tasks.length}
            </span>
          </div>
        </div>
      </div>

      {/* Main Table Card & 3 Separate Upload Action Buttons */}
      <div className="glass-card overflow-hidden space-y-4 p-6">
        
        {/* Header Bar with 3 Distinct Upload Buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-slate-100">Logged AI/ML Tasks & Models ({tasks.length})</h3>
            <p className="text-xs text-slate-400">Track AI questions, neural architectures, loss functions & Python code</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* OPTION 1: Log Question / Task */}
            <button
              onClick={() => setShowLogModal(true)}
              className="btn-primary text-xs py-2.5 px-4 flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
            >
              <Plus className="w-4 h-4 text-slate-950" />
              <span>1. + Log AI/ML Task</span>
            </button>

            {/* OPTION 2: Upload Approach */}
            <button
              onClick={() => {
                if (tasks.length > 0) setSelectedTaskForApproach(tasks[0].id);
                setShowApproachModal(true);
              }}
              className="btn-secondary text-xs py-2.5 px-4 flex items-center gap-1.5 border border-purple-500/40 text-purple-300 hover:bg-purple-500/10 shadow-md shadow-purple-500/10"
            >
              <FileText className="w-4 h-4 text-purple-400" />
              <span>2. + Upload Approach</span>
            </button>

            {/* OPTION 3: Upload Code */}
            <button
              onClick={() => {
                if (tasks.length > 0) setSelectedTaskForCode(tasks[0].id);
                setShowCodeModal(true);
              }}
              className="btn-accent text-xs py-2.5 px-4 flex items-center gap-1.5 shadow-md shadow-teal-500/20"
            >
              <Code2 className="w-4 h-4 text-white" />
              <span>3. + Upload Code</span>
            </button>
          </div>
        </div>

        {/* AI/ML Tasks List Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/70 text-xs font-extrabold text-slate-200 uppercase tracking-wider">
                <th className="py-4 px-6">Model Title & Topic</th>
                <th className="py-4 px-4">Domain Category</th>
                <th className="py-4 px-4">Date Solved</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-6 text-right">Approach & Solution Code</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm">
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-slate-400 font-semibold">
                    No AI/ML tasks logged yet. Click <b>"+ Log AI/ML Task"</b> to add your first machine learning solve!
                  </td>
                </tr>
              ) : (
                tasks.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-800/40 transition-colors">
                    
                    {/* Title & Topic */}
                    <td className="py-4 px-6">
                      <div className="font-bold text-white flex items-center gap-2">
                        <span>{t.title}</span>
                        {t.task_url && (
                          <a
                            href={t.task_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-400 hover:text-emerald-300 transition-colors"
                            title="Open Kaggle / Demo"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 font-mono mt-0.5">{t.topic}</div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                        {t.category}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 font-mono text-xs text-slate-300">
                      {t.date_solved || t.date}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-bold border border-teal-500/20">
                        Completed ✅
                      </span>
                    </td>

                    {/* Action Column: View / Upload Approach & Code */}
                    <td className="py-4 px-6 text-right space-x-2">
                      {t.approach || t.solution_code ? (
                        <button
                          onClick={() => setViewingTask(t)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-bold transition-all cursor-pointer"
                        >
                          📖 View Approach & Code
                        </button>
                      ) : (
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => openApproachModalForTask(t.id)}
                            className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 border border-purple-500/30 text-xs font-bold transition-all cursor-pointer"
                          >
                            + Approach
                          </button>
                          <button
                            onClick={() => openCodeModalForTask(t.id)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-bold transition-all cursor-pointer"
                          >
                            + Code
                          </button>
                        </div>
                      )}

                      <button
                        onClick={() => onDeleteTask(t.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors ml-2"
                        title="Delete Task"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* ---------------- MODAL 1: Log AI/ML Task / Question ---------------- */}
      {showLogModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card max-w-md w-full p-6 space-y-4 border border-emerald-500/40 animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-400" /> Log AI/ML Model / Task
              </h3>
              <button
                onClick={() => setShowLogModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold px-2 py-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleLogSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Model / Question Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fine-tune LLaMA 3 with LoRA / QLoRA"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="glass-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Domain Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="glass-input"
                  >
                    <option value="Machine Learning">Machine Learning (Sklearn)</option>
                    <option value="Deep Learning">Deep Learning (PyTorch)</option>
                    <option value="NLP">NLP & Transformers</option>
                    <option value="Computer Vision">Computer Vision (CNN/YOLO)</option>
                    <option value="LLM Fine-Tuning">LLMs & Prompt Engineering</option>
                    <option value="Reinforcement Learning">Reinforcement Learning</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Sub-Topic / Algorithm</label>
                  <input
                    type="text"
                    placeholder="e.g. Self-Attention Mechanism"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="glass-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Kaggle / Notebook / Repo URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://kaggle.com/code/..."
                  value={taskUrl}
                  onChange={(e) => setTaskUrl(e.target.value)}
                  className="glass-input"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Date Solved</label>
                <input
                  type="date"
                  value={dateSolved}
                  onChange={(e) => setDateSolved(e.target.value)}
                  className="glass-input"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs py-2 px-5 bg-emerald-500 text-slate-950">
                  Log AI/ML Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- MODAL 2: Upload Approach Notes ---------------- */}
      {showApproachModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card max-w-xl w-full p-6 space-y-4 border border-purple-500/40 animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-400" /> Upload Model Architecture & Math Notes
              </h3>
              <button
                onClick={() => setShowApproachModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold px-2 py-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleApproachSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Select AI/ML Task *</label>
                <select
                  required
                  value={selectedTaskForApproach}
                  onChange={(e) => {
                    setSelectedTaskForApproach(e.target.value);
                    const sel = tasks.find(t => t.id === Number(e.target.value));
                    setApproachNotes(sel?.approach || '');
                  }}
                  className="glass-input"
                >
                  <option value="">-- Choose AI/ML Task --</option>
                  {tasks.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.title} ({t.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Model Architecture, Loss Function & Math Notes *</label>
                <textarea
                  rows="6"
                  required
                  placeholder="Explain learning rate, loss function, gradient clipping, evaluation metrics (F1/Accuracy), or network architecture..."
                  value={approachNotes}
                  onChange={(e) => setApproachNotes(e.target.value)}
                  className="glass-input"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowApproachModal(false)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-accent text-xs py-2 px-5 bg-purple-600 hover:bg-purple-500">
                  Save Math & Approach Notes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- MODAL 3: Upload Solution Code ---------------- */}
      {showCodeModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card max-w-2xl w-full p-6 space-y-4 border border-emerald-500/40 animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-emerald-400" /> Upload Python / PyTorch Solution Code
              </h3>
              <button
                onClick={() => setShowCodeModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold px-2 py-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCodeSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Select AI/ML Task *</label>
                <select
                  required
                  value={selectedTaskForCode}
                  onChange={(e) => {
                    setSelectedTaskForCode(e.target.value);
                    const sel = tasks.find(t => t.id === Number(e.target.value));
                    setSolutionCode(sel?.solution_code || '');
                  }}
                  className="glass-input"
                >
                  <option value="">-- Choose AI/ML Task --</option>
                  {tasks.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.title} ({t.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Python / PyTorch / TensorFlow Code Snippet *</label>
                <textarea
                  rows="10"
                  required
                  placeholder="# Paste your Python, PyTorch, or Scikit-Learn code snippet here...\nimport torch\nimport torch.nn as nn"
                  value={solutionCode}
                  onChange={(e) => setSolutionCode(e.target.value)}
                  className="w-full bg-slate-950 text-emerald-300 font-mono text-xs p-3.5 rounded-xl border border-slate-800 outline-none leading-relaxed resize-none shadow-inner"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCodeModal(false)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-accent text-xs py-2 px-5 bg-emerald-500 text-slate-950">
                  Save PyTorch Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- GLASS READER MODAL: View Approach & Code ---------------- */}
      {viewingTask && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 space-y-5 border border-emerald-500/40 animate-scaleUp">
            
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {viewingTask.category}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{viewingTask.title}</h3>
                <p className="text-xs text-slate-400 font-mono">Topic: {viewingTask.topic}</p>
              </div>
              <button
                onClick={() => setViewingTask(null)}
                className="text-slate-400 hover:text-white text-sm font-bold px-2.5 py-1 rounded-lg bg-slate-800"
              >
                ✕
              </button>
            </div>

            {/* Approach Notes Section */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-purple-300 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-purple-400" /> Architecture & Math Notes
              </h4>
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                {viewingTask.approach || 'No math or architecture notes uploaded for this model yet.'}
              </div>
            </div>

            {/* Solution Code Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-emerald-300 flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-emerald-400" /> Full Python / PyTorch Code
                </h4>
                {viewingTask.solution_code && (
                  <button
                    onClick={() => handleCopyCode(viewingTask.solution_code)}
                    className="btn-secondary text-xs py-1 px-3 flex items-center gap-1"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-emerald-400" />}
                    <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                )}
              </div>

              {viewingTask.solution_code ? (
                <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed shadow-inner max-h-80">
                  <code>{viewingTask.solution_code}</code>
                </pre>
              ) : (
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs text-slate-400 italic">
                  No PyTorch / Python code snippet attached for this model yet.
                </div>
              )}
            </div>

            <div className="flex items-center justify-end pt-3 border-t border-slate-800">
              <button
                onClick={() => setViewingTask(null)}
                className="btn-primary text-xs py-2 px-5 bg-emerald-500 text-slate-950"
              >
                Close Reader
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
