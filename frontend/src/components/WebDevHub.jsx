import React, { useState } from 'react';
import { Plus, ExternalLink, BookOpen, ArrowLeft, Play, Tv, Radio, Trash2 } from 'lucide-react';

const YoutubeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

// Helper to extract YouTube embed video ID
function getYouTubeEmbedId(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export default function WebDevHub({ resources = [], onAddResource, onDeleteResource, onBack }) {
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formYtUrl, setFormYtUrl] = useState('');
  const [formTopic, setFormTopic] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [sessionDate, setSessionDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formTitle || !formYtUrl) return;

    onAddResource({
      title: formTitle,
      youtube_url: formYtUrl,
      topic: formTopic || 'Live Stream',
      notes: formNotes,
      session_date: sessionDate
    });

    setFormTitle('');
    setFormYtUrl('');
    setFormTopic('');
    setFormNotes('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-l-4 border-red-500">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20">
            <YoutubeIcon className="w-8 h-8 text-red-500" />
          </div>

          {onBack && (
            <button
              onClick={onBack}
              className="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5 border border-red-500/30 text-red-300 hover:text-red-200 transition-all cursor-pointer"
              title="Back to Dashboard"
            >
              <ArrowLeft className="w-4 h-4 text-red-400" />
              <span className="font-bold">⬅️ Back to Dashboard</span>
            </button>
          )}

          <div>
            <h2 className="text-2xl font-extrabold text-white">YouTube Live Stream Hub</h2>
            <p className="text-xs text-slate-400">
              Post daily YouTube Live stream links, topic updates, and live lecture information
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-extrabold text-xs shadow-lg shadow-red-500/30 transition-all cursor-pointer flex items-center gap-1.5 border-0 whitespace-nowrap"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>+ Update Live Stream Link</span>
        </button>
      </div>

      {/* 🔴 LIVE STREAM SCHEDULE & CHANNEL INFO BANNER */}
      <div className="glass-card p-5 border border-red-500/30 bg-gradient-to-r from-red-950/30 via-slate-900/60 to-purple-950/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/40 animate-pulse">
            <Radio className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse">
                🔴 LIVE STREAM HUB
              </span>
              <span className="text-xs font-mono text-slate-300">Daily Streams</span>
            </div>
            <h3 className="text-sm font-bold text-white mt-1">Watch daily live stream updates and lecture recordings</h3>
          </div>
        </div>

        <a
          href="https://www.youtube.com/@NoobXCoder"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary text-xs py-2 px-4 border-red-500/40 text-red-300 hover:bg-red-500/10 flex items-center gap-1.5 whitespace-nowrap font-bold"
        >
          <YoutubeIcon className="w-4 h-4 text-red-500" />
          <span>Subscribe @NoobXCoder Channel</span>
        </a>
      </div>

      {/* Grid of YouTube Live Stream Updates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {resources.length === 0 ? (
          <div className="col-span-2 glass-card p-12 text-center text-slate-400 font-semibold space-y-2">
            <Tv className="w-10 h-10 text-red-500/50 mx-auto" />
            <p>No live stream updates posted yet. Click <b>"+ Update Live Stream Link"</b> to post your first stream!</p>
          </div>
        ) : (
          resources.map((item) => {
            const embedId = getYouTubeEmbedId(item.youtube_url);

            return (
              <div key={item.id} className="glass-card p-6 flex flex-col justify-between space-y-4 hover:border-red-500/30 transition-all border-l-4 border-red-500">
                
                <div className="space-y-3">
                  {/* Meta Header */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 flex items-center gap-1.5">
                      <YoutubeIcon className="w-3.5 h-3.5 text-red-400" /> Live Stream Update
                    </span>
                    <span className="text-xs font-mono text-slate-300">
                      🗓️ {item.session_date || item.date}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white leading-snug">{item.title}</h3>
                  
                  {item.topic && (
                    <span className="text-xs font-semibold text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded-md inline-block">
                      ⚡ {item.topic}
                    </span>
                  )}

                  {/* 📺 EMBEDDED YOUTUBE VIDEO PLAYER OR PREVIEW */}
                  {embedId ? (
                    <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-md">
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${embedId}`}
                        title={item.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : item.youtube_url ? (
                    <a
                      href={item.youtube_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-xl bg-red-950/30 border border-red-500/30 flex items-center justify-between hover:bg-red-950/50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/30 group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 text-red-400 fill-current" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Watch Live Stream Video</p>
                          <p className="text-[11px] font-mono text-red-300 truncate max-w-xs">{item.youtube_url}</p>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-red-400" />
                    </a>
                  ) : null}

                  {/* Stream Notes / Details */}
                  {item.notes && (
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-purple-400" /> Stream Information & Notes
                      </h4>
                      <p className="text-xs text-slate-300 bg-slate-900/80 p-3 rounded-xl border border-slate-800 leading-relaxed whitespace-pre-wrap">
                        {item.notes}
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer Actions: Delete Button + Watch Stream */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                  {onDeleteResource ? (
                    <button
                      onClick={() => onDeleteResource(item.id)}
                      className="px-3 py-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-slate-800 hover:border-red-500/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                      title="Delete Stream Update"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                      <span>Delete</span>
                    </button>
                  ) : <div />}

                  {item.youtube_url && (
                    <a
                      href={item.youtube_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-red-500/20"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Watch Stream Video</span>
                    </a>
                  )}
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* ---------------- MODAL: Update Live Stream Link ---------------- */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card max-w-lg w-full p-6 space-y-4 border border-red-500/40 animate-scaleUp shadow-2xl">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-extrabold text-slate-100 flex items-center gap-2">
                <YoutubeIcon className="w-5 h-5 text-red-500" /> Update YouTube Live Stream Link
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold px-2 py-1 rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-200 mb-1">Stream / Video Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Daily Live Stream #12 - Building System Architecture"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="glass-input"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-200 mb-1">YouTube Live Stream / Video URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={formYtUrl}
                  onChange={(e) => setFormYtUrl(e.target.value)}
                  className="glass-input"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold text-slate-200 mb-1">Topic / Tech Stack</label>
                  <input
                    type="text"
                    placeholder="e.g. Node.js & System Design"
                    value={formTopic}
                    onChange={(e) => setFormTopic(e.target.value)}
                    className="glass-input"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-200 mb-1">Stream Date</label>
                  <input
                    type="date"
                    value={sessionDate}
                    onChange={(e) => setSessionDate(e.target.value)}
                    className="glass-input font-mono text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-200 mb-1">Live Stream Information & Notes (Optional)</label>
                <textarea
                  rows="4"
                  placeholder="Add details about today's live stream, key discussion points, or schedule..."
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  className="glass-input"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn-secondary text-xs py-2.5 px-4 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-extrabold text-xs shadow-lg shadow-red-500/30 transition-all cursor-pointer border-0"
                >
                  Publish Stream Update
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
