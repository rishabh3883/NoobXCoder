import React, { useState } from 'react';
import { Flame, Code2, HelpCircle, LayoutGrid, LogIn, LogOut, Sparkles, Palette, Monitor, Sun, Moon, Plus, Terminal, Layers, Brain, Menu, X } from 'lucide-react';

const YoutubeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function Navbar({ activeTab, setActiveTab, streak, user, theme, setTheme, bgStyle, setBgStyle, onLogout, onOpenAuth, onOpenDoubtModal, onQuickAddDSA }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileDrawer, setShowMobileDrawer] = useState(false);

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

  const navLinks = [
    { id: 'bento', label: 'Dashboard', icon: <LayoutGrid className="w-4 h-4 shrink-0" /> },
    { id: 'dsa', label: 'DSA Questions', icon: <Code2 className="w-4 h-4 shrink-0" /> },
    { id: 'webdev_tracker', label: 'Web Dev Tracker', icon: <Layers className="w-4 h-4 text-indigo-400 shrink-0" /> },
    { id: 'aiml_tracker', label: 'AI/ML Tracker', icon: <Brain className="w-4 h-4 text-emerald-400 shrink-0" /> },
    { id: 'webdev', label: 'YouTube Live', icon: <YoutubeIcon className="w-4 h-4 text-red-400 shrink-0" /> },
    { id: 'doubts', label: 'Doubts (₹10)', icon: <HelpCircle className="w-4 h-4 shrink-0" /> },
  ];

  return (
    <header className="sticky top-0 z-50 px-3 sm:px-4 py-2.5 border-b border-slate-800 bg-[rgba(9,13,22,0.92)] backdrop-blur-md transition-all shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Brand Logo & Mobile Hamburger Menu */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* ☰ Triple Dash Hamburger Button for Mobile */}
          <button
            onClick={() => setShowMobileDrawer(true)}
            className="p-2 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-slate-500 text-sky-400 md:hidden flex items-center justify-center cursor-pointer shadow-sm"
            title="Open Mobile Navigation Menu"
          >
            <Menu className="w-5 h-5 text-sky-400" />
          </button>

          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('bento')}>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-purple-600 flex items-center justify-center shadow-lg shadow-sky-500/20 shrink-0">
              <Code2 className="w-5.5 h-5.5 text-white" />
            </div>
            <div>
              <h1 className="text-base sm:text-xl font-extrabold bg-gradient-to-r from-sky-400 via-purple-300 to-pink-400 bg-clip-text text-transparent brand-title whitespace-nowrap">
                NoobXCoder
              </h1>
              <p className="text-[10px] sm:text-xs text-slate-400 brand-sub hidden sm:block">Daily Study Tracker</p>
            </div>
          </div>

        </div>

        {/* Desktop Tab Navigation Bar */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 nav-container">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === link.id
                  ? 'bg-gradient-to-r from-purple-500 to-sky-500 text-white shadow-md shadow-purple-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5 nav-btn-inactive'
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 relative shrink-0">
          
          {/* Quick Dark/Light Switcher */}
          <button
            onClick={toggleDarkLightMode}
            className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-slate-500 text-yellow-400 transition-all flex items-center justify-center cursor-pointer theme-btn shadow-sm"
            title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            {isLight ? <Moon className="w-4 h-4 text-purple-600" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Streak Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 font-bold text-xs shadow-sm">
            <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
            <span>{streak}d</span>
          </div>

          {/* USER PROFILE */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 bg-slate-800/80 px-2.5 py-1.5 rounded-xl border border-slate-700 hover:border-slate-600 transition-all cursor-pointer user-btn"
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
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="btn-primary text-xs py-2 px-3.5 flex items-center gap-1.5 shadow-md shadow-sky-500/20"
            >
              <LogIn className="w-3.5 h-3.5 text-slate-950" />
              <span>Sign In</span>
            </button>
          )}

        </div>

      </div>

      {/* 📱 SLIDE-OUT MOBILE DRAWER SIDEBAR */}
      {showMobileDrawer && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm animate-fadeIn"
            onClick={() => setShowMobileDrawer(false)}
          ></div>

          {/* Drawer Sidebar Panel */}
          <div className="relative w-4/5 max-w-xs bg-[#090d16] border-r border-slate-800 h-full p-5 flex flex-col justify-between z-10 shadow-2xl animate-scaleUp">
            <div className="space-y-6">
              
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-purple-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
                    <Code2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-base font-extrabold bg-gradient-to-r from-sky-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                      NoobXCoder
                    </h2>
                    <p className="text-[10px] text-slate-400">Navigation Menu</p>
                  </div>
                </div>

                <button
                  onClick={() => setShowMobileDrawer(false)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => {
                      setActiveTab(link.id);
                      setShowMobileDrawer(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
                      activeTab === link.id
                        ? 'bg-gradient-to-r from-purple-500 to-sky-500 text-white shadow-md shadow-purple-500/30'
                        : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <button
                onClick={() => {
                  toggleDarkLightMode();
                  setShowMobileDrawer(false);
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-800 text-xs font-bold text-slate-200 flex items-center justify-center gap-2 border border-slate-700"
              >
                {isLight ? <Moon className="w-4 h-4 text-purple-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
                <span>{isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}</span>
              </button>

              {user ? (
                <button
                  onClick={() => {
                    onLogout();
                    setShowMobileDrawer(false);
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-rose-500/10 text-xs font-bold text-rose-400 flex items-center justify-center gap-2 border border-rose-500/30"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout ({user.name})</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    onOpenAuth();
                    setShowMobileDrawer(false);
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-sky-500 text-xs font-bold text-slate-950 flex items-center justify-center gap-2 shadow-md shadow-sky-500/20"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In / Register</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </header>
  );
}
