import React, { useState } from 'react';
import { Plus, ExternalLink, Edit2, Trash2, Code2, BookOpen, CheckCircle, RefreshCw, Layers, ArrowLeft, Copy, Check, Sparkles, FileCode, Lightbulb, Code } from 'lucide-react';

export default function DSATracker({ questions, onAddQuestion, onUpdateQuestion, onDeleteQuestion, onBack, isAdmin = false }) {
  // Modal State
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [showAddSolutionModal, setShowAddSolutionModal] = useState(false);
  const [selectedQuestionForSolution, setSelectedQuestionForSolution] = useState(null);

  const [viewingNotes, setViewingNotes] = useState(null);
  const [activeModalTab, setActiveModalTab] = useState('approach');
  const [copiedCode, setCopiedCode] = useState(false);
  
  // 1. Simple Add Question Form State
  const [formTitle, setFormTitle] = useState('');
  const [formPlatform, setFormPlatform] = useState('LeetCode');
  const [formDifficulty, setFormDifficulty] = useState('Easy');
  const [formUrl, setFormUrl] = useState('');
  const [formTopic, setFormTopic] = useState('');
  const [formStatus, setFormStatus] = useState('Solved');

  // 2. Separate Approach & Solution Code Form State
  const [formTargetQuestionId, setFormTargetQuestionId] = useState('');
  const [formApproach, setFormApproach] = useState('');
  const [formSolutionCode, setFormSolutionCode] = useState('');

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Submit 1: Quick Add Question
  const handleAddQuestionSubmit = async (e) => {
    e.preventDefault();
    if (!formTitle) return;

    await onAddQuestion({
      title: formTitle,
      platform: formPlatform,
      difficulty: formDifficulty,
      problem_url: formUrl,
      topic: formTopic || 'General',
      status: formStatus,
      date_solved: new Date().toISOString().split('T')[0]
    });

    setFormTitle('');
    setFormUrl('');
    setFormTopic('');
    setShowAddQuestionModal(false);
  };

  // Submit 2: Dedicated Approach & Solution Upload
  const handleAddSolutionSubmit = async (e) => {
    e.preventDefault();
    if (!formTargetQuestionId) return;

    await onUpdateQuestion(formTargetQuestionId, {
      approach: formApproach,
      solution_code: formSolutionCode
    });

    setFormApproach('');
    setFormSolutionCode('');
    setFormTargetQuestionId('');
    setSelectedQuestionForSolution(null);
    setShowAddSolutionModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner Header */}
      <div className="glass-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-l-4 border-sky-500">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5 border border-sky-500/30 text-sky-300 hover:text-sky-200 transition-all cursor-pointer"
              title="Back to Dashboard"
            >
              <ArrowLeft className="w-4 h-4 text-sky-400" />
              <span className="font-bold">⬅️ Back to Dashboard</span>
            </button>
          )}

          <div>
            <h2 className="text-xl font-extrabold text-white">DSA Question Tracker</h2>
            <p className="text-xs text-slate-400">Track solved problems, approach notes & code solutions across LeetCode, GFG & CodeChef</p>
          </div>
        </div>

        {/* Action Buttons protected by Admin RBAC */}
        <div className="flex items-center gap-2">
          {isAdmin ? (
            <>
              <button
                onClick={() => setShowAddQuestionModal(true)}
                className="btn-primary text-xs py-2.5 px-4 whitespace-nowrap flex items-center gap-1.5 shadow-md shadow-sky-500/20"
              >
                <Plus className="w-4 h-4 text-slate-950" />
                <span>+ Log Problem</span>
              </button>

              <button
                onClick={() => {
                  if (questions.length > 0) setFormTargetQuestionId(questions[0].id);
                  setShowAddSolutionModal(true);
                }}
                className="btn-accent text-xs py-2.5 px-4 whitespace-nowrap flex items-center gap-1.5"
              >
                <FileCode className="w-4 h-4" />
                <span>+ Upload Approach & Code</span>
              </button>
            </>
          ) : (
            <div className="px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-1.5">
              <span>🔒 Admin Access Required for CRUD</span>
            </div>
          )}
        </div>
      </div>

      {/* DSA Question List Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/70 text-xs font-extrabold text-slate-200 uppercase tracking-wider">
                <th className="py-4 px-6">Problem Title & Topic</th>
                <th className="py-4 px-4">Platform</th>
                <th className="py-4 px-4">Difficulty</th>
                <th className="py-4 px-4">Date Solved</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-6 text-right">Approach & Solution Code</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm">
              {questions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-500">
                    No questions logged yet. Click <b>"+ Log Problem"</b> to add your first solve!
                  </td>
                </tr>
              ) : (
                questions.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-800/40 transition-colors">
                    
                    {/* Title & Topic */}
                    <td className="py-4 px-6">
                      <div className="font-bold text-white flex items-center gap-2">
                        <span>{q.title}</span>
                        {q.problem_url && (
                          <a
                            href={q.problem_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sky-400 hover:text-sky-300 transition-colors"
                            title="Open Problem Link"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800 font-mono mt-1 inline-block">
                        🏷️ {q.topic}
                      </span>
                    </td>

                    {/* Platform Badge */}
                    <td className="py-4 px-4">
                      <span className={q.platform === 'LeetCode' ? 'badge badge-leetcode' : 'badge badge-gfg'}>
                        {q.platform}
                      </span>
                    </td>

                    {/* Difficulty Badge */}
                    <td className="py-4 px-4">
                      <span
                        className={
                          q.difficulty === 'Easy'
                            ? 'badge badge-easy'
                            : q.difficulty === 'Medium'
                            ? 'badge badge-medium'
                            : 'badge badge-hard'
                        }
                      >
                        {q.difficulty}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 text-xs font-mono text-slate-400">
                      {q.date_solved}
                    </td>

                    {/* Status Pill */}
                    <td className="py-4 px-4">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                          q.status === 'Solved'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}
                      >
                        {q.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {q.approach || q.solution_code || q.notes ? (
                          <button
                            onClick={() => {
                              setViewingNotes(q);
                              setActiveModalTab(q.approach ? 'approach' : 'code');
                            }}
                            className="px-3 py-1.5 rounded-xl bg-sky-500/10 text-sky-300 hover:bg-sky-500/20 border border-sky-500/30 text-xs font-bold transition-all flex items-center gap-1.5"
                          >
                            <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                            <span>View Approach & Code</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedQuestionForSolution(q);
                              setFormTargetQuestionId(q.id);
                              setShowAddSolutionModal(true);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 border border-purple-500/30 text-xs font-bold transition-all flex items-center gap-1.5"
                          >
                            <FileCode className="w-3.5 h-3.5 text-purple-400" />
                            <span>+ Upload Code</span>
                          </button>
                        )}

                        <button
                          onClick={() => onDeleteQuestion(q.id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                          title="Delete Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* OPTION 1 MODAL: Quick Add Problem Only */}
      {showAddQuestionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="glass-card w-full max-w-lg p-6 relative space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-sky-400" /> Log New DSA Problem
            </h3>

            <form onSubmit={handleAddQuestionSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Problem Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Two Sum / 3Sum / Trapping Rain Water"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="glass-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Platform</label>
                  <select
                    value={formPlatform}
                    onChange={(e) => setFormPlatform(e.target.value)}
                    className="glass-input"
                  >
                    <option value="LeetCode">LeetCode</option>
                    <option value="GeeksforGeeks">GeeksforGeeks</option>
                    <option value="Codeforces">Codeforces</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Difficulty</label>
                  <select
                    value={formDifficulty}
                    onChange={(e) => setFormDifficulty(e.target.value)}
                    className="glass-input"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Topic Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. Dynamic Programming / Arrays"
                    value={formTopic}
                    onChange={(e) => setFormTopic(e.target.value)}
                    className="glass-input"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Status</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value)}
                    className="glass-input"
                  >
                    <option value="Solved">Solved</option>
                    <option value="Revision Needed">Revision Needed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Problem Link URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://leetcode.com/problems/..."
                  value={formUrl}
                  onChange={(e) => setFormUrl(e.target.value)}
                  className="glass-input"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddQuestionModal(false)}
                  className="btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs">
                  Save Problem
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* OPTION 2 MODAL: Dedicated Upload Solution Approach & Code */}
      {showAddSolutionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="glass-card w-full max-w-xl p-6 relative space-y-4 border-l-4 border-purple-500">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <FileCode className="w-5 h-5 text-purple-400" /> Upload Approach & Solution Code
            </h3>

            <form onSubmit={handleAddSolutionSubmit} className="space-y-4">
              
              {/* Select Target Question */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Select Problem *</label>
                <select
                  value={formTargetQuestionId || selectedQuestionForSolution?.id || ''}
                  onChange={(e) => setFormTargetQuestionId(e.target.value)}
                  className="glass-input text-xs font-bold text-sky-300 bg-slate-900/90"
                  required
                >
                  <option value="">Select Problem to Attach Code...</option>
                  {questions.map((q) => (
                    <option key={q.id} value={q.id}>
                      {q.title} ({q.platform}) — {q.difficulty}
                    </option>
                  ))}
                </select>
              </div>

              {/* Approach Field */}
              <div>
                <label className="block text-xs font-semibold text-amber-400 mb-1 flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5" /> Solution Approach & Intuition
                </label>
                <textarea
                  rows="3"
                  placeholder="Explain your approach, intuition, dynamic programming state, space & time complexity..."
                  value={formApproach}
                  onChange={(e) => setFormApproach(e.target.value)}
                  className="glass-input text-xs font-mono"
                ></textarea>
              </div>

              {/* Solution Code Field */}
              <div>
                <label className="block text-xs font-semibold text-purple-400 mb-1 flex items-center gap-1">
                  <FileCode className="w-3.5 h-3.5" /> Full Solution Code (C++, Java, Python, JS...)
                </label>
                <textarea
                  rows="6"
                  placeholder="// Paste your full solution code snippet here..."
                  value={formSolutionCode}
                  onChange={(e) => setFormSolutionCode(e.target.value)}
                  className="w-full bg-slate-950 text-sky-300 font-mono text-xs p-3.5 rounded-xl border border-slate-800 outline-none leading-relaxed resize-none shadow-inner"
                  required
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddSolutionModal(false)}
                  className="btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-accent text-xs">
                  Upload Approach & Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW MODAL: Approach & Solution Code Reader */}
      {viewingNotes && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="glass-card w-full max-w-2xl p-6 relative max-h-[85vh] overflow-y-auto space-y-4 border-l-4 border-sky-400">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-xl font-bold text-slate-100">{viewingNotes.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={viewingNotes.platform === 'LeetCode' ? 'badge badge-leetcode' : 'badge badge-gfg'}>
                    {viewingNotes.platform}
                  </span>
                  <span className="text-xs font-mono text-slate-400">Topic: {viewingNotes.topic}</span>
                  <span className="text-xs font-mono text-slate-400">📅 {viewingNotes.date_solved}</span>
                </div>
              </div>

              {viewingNotes.problem_url && (
                <a
                  href={viewingNotes.problem_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5"
                >
                  <span>Open Problem</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {/* Modal Tabs */}
            <div className="flex items-center gap-3 border-b border-slate-800 pb-2">
              <button
                onClick={() => setActiveModalTab('approach')}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                  activeModalTab === 'approach'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                <span>Approach & Intuition</span>
              </button>

              <button
                onClick={() => setActiveModalTab('code')}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                  activeModalTab === 'code'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileCode className="w-3.5 h-3.5 text-purple-400" />
                <span>Solution Code</span>
              </button>
            </div>

            {/* Tab 1 Content: Approach */}
            {activeModalTab === 'approach' && (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-sky-200 leading-relaxed whitespace-pre-wrap min-h-[160px]">
                {viewingNotes.approach || viewingNotes.notes || 'No detailed approach notes provided for this solution.'}
              </div>
            )}

            {/* Tab 2 Content: Solution Code */}
            {activeModalTab === 'code' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">Verified Code Snippet</span>
                  <button
                    onClick={() => handleCopyCode(viewingNotes.solution_code || viewingNotes.notes || '')}
                    className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded border border-slate-800"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 leading-relaxed whitespace-pre-wrap max-h-80 overflow-y-auto shadow-inner">
                  {viewingNotes.solution_code || viewingNotes.notes || 'No solution code snippet uploaded.'}
                </div>
              </div>
            )}

            <div className="flex justify-end pt-2 border-t border-slate-800">
              <button onClick={() => setViewingNotes(null)} className="btn-secondary text-xs">
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
