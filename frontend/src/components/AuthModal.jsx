import React, { useState } from 'react';
import { LogIn, UserPlus, KeyRound, Mail, User, ShieldCheck } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLogin, onRegister }) {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (isLoginTab) {
        await onLogin(email, password);
      } else {
        await onRegister(name, email, password);
      }
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed. Please check details.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async () => {
    setLoading(true);
    try {
      await onLogin('admin@noobxcoder.com', 'admin123');
      onClose();
    } catch (err) {
      setErrorMsg('Admin login error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-card w-full max-w-md p-6 relative border border-sky-500/30 shadow-2xl">
        
        {/* Header Tabs */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLoginTab(true)}
              className={`text-base font-bold pb-1 transition-colors ${
                isLoginTab ? 'text-sky-400 border-b-2 border-sky-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <span className="text-slate-600">/</span>
            <button
              onClick={() => setIsLoginTab(false)}
              className={`text-base font-bold pb-1 transition-colors ${
                !isLoginTab ? 'text-sky-400 border-b-2 border-sky-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              Register Student
            </button>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white font-bold text-sm">
            ✕
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/30 text-xs font-semibold text-red-400">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginTab && (
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Full Name</label>
              <div className="flex items-center gap-2.5 bg-slate-900/90 border border-slate-700 focus-within:border-sky-400 px-3.5 py-2.5 rounded-xl transition-all shadow-inner">
                <User className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  required
                  placeholder="Rishabh Gupta"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-slate-100 placeholder-slate-500 outline-none w-full border-0 p-0 focus:ring-0"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Email / Username</label>
            <div className="flex items-center gap-2.5 bg-slate-900/90 border border-slate-700 focus-within:border-sky-400 px-3.5 py-2.5 rounded-xl transition-all shadow-inner">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                required
                placeholder="admin@noobxcoder.com or student email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent text-xs font-semibold text-slate-100 placeholder-slate-500 outline-none w-full border-0 p-0 focus:ring-0"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Password</label>
            <div className="flex items-center gap-2.5 bg-slate-900/90 border border-slate-700 focus-within:border-sky-400 px-3.5 py-2.5 rounded-xl transition-all shadow-inner">
              <KeyRound className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent text-xs font-semibold text-slate-100 placeholder-slate-500 outline-none w-full border-0 p-0 focus:ring-0"
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-sm py-2.5">
            {isLoginTab ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
            <span>{loading ? 'Authenticating...' : isLoginTab ? 'Sign In to Tracker' : 'Register Account'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
