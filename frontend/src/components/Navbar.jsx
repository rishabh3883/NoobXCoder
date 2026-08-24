import React, { useState } from 'react';
import { Flame, Code2, HelpCircle, LayoutGrid, LogIn, LogOut, Sparkles, Palette, Monitor, Sun, Moon, Plus, Terminal, Layers, Brain } from 'lucide-react';

const YoutubeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function Navbar({ activeTab, setActiveTab, streak, user, theme, setTheme, bgStyle, setBgStyle, onLogout, onOpenAuth, onOpenDoubtModal, onQuickAddDSA }) {
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const isLight = theme === 'light';

  const toggleDarkLightMode = () => {
    if (isLight) {
      setTheme('cyberpunk');
      setBgStyle('aurora');
    } else {
      setTheme('light');
      setBgStyle('light');
    }
  };

  const themes = [
    { id: 'cyberpunk', name: '🌌 Cyberpunk Dark' },
    { id: 'emerald', name: '🐉 Emerald Matrix' },
    { id: 'amethyst', name: '🔮 Midnight Violet' },
    { id: 'sunset', name: '🌅 Sunset Amber' },
    { id: 'light', name: '☀️ Clean Light Glass' }
  ];

  const backgrounds = [
    { id: 'aurora', name: '✨ Glass Aurora Glow' },
    { id: 'mesh', name: '🕸️ Cyber Grid Mesh' },
    { id: 'oled', name: '⬛ Pure OLED Black' },
    { id: 'nebula', name: '🌌 Cosmic Space Nebula' },
    { id: 'matrix', name: '📟 Matrix Hacker Lines' }
  ];

  return (
    <header className="sticky top-0 z-50 px-4 py-2.5 border-b border-slate-800 bg-[rgba(9,13,22,0.92)] backdrop-blur-md transition-all shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 flex-nowrap">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('bento')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-purple-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
            <Code2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold bg-gradient-to-r from-sky-400 via-purple-300 to-pink-400 bg-clip-text text-transparent brand-title">
              NoobXCoder
            </h1>
            <p className="text-xs text-slate-400 brand-sub">Daily Study Tracker</p>
          </div>
        </div>

        {/* Friendly Tab Navigation Bar */}
        <nav className="flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 nav-container">
          <button
            onClick={() => setActiveTab('bento')}
            className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'bento'
                ? 'bg-gradient-to-r from-purple-500 to-sky-500 text-white shadow-md shadow-purple-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5 nav-btn-inactive'
            }`}
          >
            <LayoutGrid className="w-4 h-4 shrink-0" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('dsa')}
            className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'dsa'
                ? 'bg-gradient-to-r from-sky-500 to-sky-600 text-slate-950 shadow-md shadow-sky-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5 nav-btn-inactive'
            }`}
          >
            <Code2 className="w-4 h-4 shrink-0" />
            <span>DSA Questions</span>
          </button>

          <button
            onClick={() => setActiveTab('webdev_tracker')}
            className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'webdev_tracker'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5 nav-btn-inactive'
            }`}
          >
            <Layers className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>Web Dev Tracker</span>
          </button>

          <button
            onClick={() => setActiveTab('aiml_tracker')}
            className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'aiml_tracker'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-md shadow-emerald-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5 nav-btn-inactive'
            }`}
          >
            <Brain className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>AI/ML Tracker</span>
          </button>

          <button
            onClick={() => setActiveTab('webdev')}
            className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'webdev'
                ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-md shadow-red-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5 nav-btn-inactive'
            }`}
          >
            <YoutubeIcon className="w-4 h-4 text-red-400 shrink-0" />
            <span>YouTube Live</span>
          </button>

          <button
            onClick={() => setActiveTab('doubts')}
            className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'doubts'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-md shadow-emerald-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5 nav-btn-inactive'
            }`}
          >
            <HelpCircle className="w-4 h-4 shrink-0" />
            <span>Doubts (₹10)</span>
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 relative">
          


          {/* Quick Dark/Light Switcher */}
          <button
            onClick={toggleDarkLightMode}
            className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-slate-500 text-yellow-400 transition-all flex items-center justify-center cursor-pointer theme-btn shadow-sm"
            title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            {isLight ? <Moon className="w-4 h-4 text-purple-600" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>



          {/* Streak Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 font-bold text-xs shadow-sm">
            <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
            <span>{streak}d</span>
          </div>

          {/* USER PROFILE */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 hover:border-slate-600 transition-all cursor-pointer user-btn"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-r from-sky-400 to-purple-500 flex items-center justify-center font-bold text-xs text-slate-950">
                  {user.name.charAt(0)}
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-semibold text-white leading-tight user-name">{user.name}</p>
                </div>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 glass-card p-2 shadow-2xl z-50 border border-slate-700 animate-fadeIn">
                  <div className="px-3 py-2 border-b border-slate-800">
                    <p className="text-xs font-bold text-white">{user.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      onLogout();
                      setShowUserMenu(false);
                    }}
                    className="w-full mt-1 text-left text-xs px-3 py-2 rounded-lg flex items-center gap-2 text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={onOpenAuth} className="btn-secondary text-xs py-2 px-3">
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
}
