import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AttendanceHeatmap from './components/AttendanceHeatmap';
import DSATracker from './components/DSATracker';
import WebDevHub from './components/WebDevHub';
import DoubtPortal from './components/DoubtPortal';
import AuthModal from './components/AuthModal';
import BentoGrid from './components/BentoGrid';
import WebDevTracker from './components/WebDevTracker';
import AIMLTracker from './components/AIMLTracker';
import { Plus } from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('bento');
  const [streak, setStreak] = useState(3);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [dsaQuestions, setDsaQuestions] = useState([]);
  const [webResources, setWebResources] = useState([]);
  const [webDevTasks, setWebDevTasks] = useState([]);
  const [aimlTasks, setAimlTasks] = useState([]);
  const [doubts, setDoubts] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [user, setUser] = useState(null);
  
  // Theme & Background States
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('lo_theme') || 'cyberpunk';
  });

  const [bgStyle, setBgStyle] = useState(() => {
    return localStorage.getItem('lo_bg_style') || 'aurora';
  });

  // Modals
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('lo_theme', theme);
  }, [theme]);

  useEffect(() => {
    document.body.setAttribute('data-bg', bgStyle);
    localStorage.setItem('lo_bg_style', bgStyle);
  }, [bgStyle]);

  useEffect(() => {
    fetchDSA();
    fetchResources();
    fetchWebDevTasks();
    fetchAIMLTasks();
    fetchAttendance();
    fetchDoubts();
    fetchSessions();

    const savedUser = localStorage.getItem('lo_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {}
    }
  }, []);

  const fetchDSA = async () => {
    try {
      const res = await fetch(`${API_BASE}/dsa`);
      if (res.ok) setDsaQuestions(await res.json());
    } catch (e) {}
  };

  const fetchResources = async () => {
    try {
      const res = await fetch(`${API_BASE}/resources`);
      if (res.ok) setWebResources(await res.json());
    } catch (e) {}
  };

  const fetchAttendance = async () => {
    try {
      const res = await fetch(`${API_BASE}/attendance`);
      if (res.ok) {
        const data = await res.json();
        setStreak(data.streak || 0);
        setAttendanceRecords(data.records || []);
      }
    } catch (e) {}
  };

  const fetchDoubts = async () => {
    try {
      const res = await fetch(`${API_BASE}/doubts`);
      if (res.ok) setDoubts(await res.json());
    } catch (e) {}
  };

  const fetchSessions = async () => {
    try {
      const res = await fetch(`${API_BASE}/sessions`);
      if (res.ok) setSessions(await res.json());
    } catch (e) {}
  };

  const fetchWebDevTasks = async () => {
    try {
      const res = await fetch(`${API_BASE}/webdev-tasks`);
      if (res.ok) setWebDevTasks(await res.json());
    } catch (e) {}
  };

  const handleAddWebDevTask = async (taskData) => {
    try {
      const res = await fetch(`${API_BASE}/webdev-tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      });
      if (res.ok) {
        const data = await res.json();
        setWebDevTasks(data.tasks);
      } else {
        setWebDevTasks([{ ...taskData, id: Date.now() }, ...webDevTasks]);
      }
    } catch (e) {
      setWebDevTasks([{ ...taskData, id: Date.now() }, ...webDevTasks]);
    }
  };

  const handleAddWebDevApproach = async (taskId, approach) => {
    try {
      const res = await fetch(`${API_BASE}/webdev-tasks/approach`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId, approach })
      });
      if (res.ok) {
        const data = await res.json();
        setWebDevTasks(data.tasks);
      }
    } catch (e) {
      setWebDevTasks(webDevTasks.map(t => t.id === Number(taskId) ? { ...t, approach } : t));
    }
  };

  const handleAddWebDevCode = async (taskId, solution_code) => {
    try {
      const res = await fetch(`${API_BASE}/webdev-tasks/code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId, solution_code })
      });
      if (res.ok) {
        const data = await res.json();
        setWebDevTasks(data.tasks);
      }
    } catch (e) {
      setWebDevTasks(webDevTasks.map(t => t.id === Number(taskId) ? { ...t, solution_code } : t));
    }
  };

  const handleDeleteWebDevTask = async (id) => {
    try {
      await fetch(`${API_BASE}/webdev-tasks/${id}`, { method: 'DELETE' });
    } catch (e) {}
    setWebDevTasks(webDevTasks.filter((t) => t.id !== id));
  };

  const fetchAIMLTasks = async () => {
    try {
      const res = await fetch(`${API_BASE}/aiml-tasks`);
      if (res.ok) setAimlTasks(await res.json());
    } catch (e) {}
  };

  const handleAddAIMLTask = async (taskData) => {
    try {
      const res = await fetch(`${API_BASE}/aiml-tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      });
      if (res.ok) {
        const data = await res.json();
        setAimlTasks(data.tasks);
      } else {
        setAimlTasks([{ ...taskData, id: Date.now() }, ...aimlTasks]);
      }
    } catch (e) {
      setAimlTasks([{ ...taskData, id: Date.now() }, ...aimlTasks]);
    }
  };

  const handleAddAIMLApproach = async (taskId, approach) => {
    try {
      const res = await fetch(`${API_BASE}/aiml-tasks/approach`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId, approach })
      });
      if (res.ok) {
        const data = await res.json();
        setAimlTasks(data.tasks);
      }
    } catch (e) {
      setAimlTasks(aimlTasks.map(t => t.id === Number(taskId) ? { ...t, approach } : t));
    }
  };

  const handleAddAIMLCode = async (taskId, solution_code) => {
    try {
      const res = await fetch(`${API_BASE}/aiml-tasks/code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId, solution_code })
      });
      if (res.ok) {
        const data = await res.json();
        setAimlTasks(data.tasks);
      }
    } catch (e) {
      setAimlTasks(aimlTasks.map(t => t.id === Number(taskId) ? { ...t, solution_code } : t));
    }
  };

  const handleDeleteAIMLTask = async (id) => {
    try {
      await fetch(`${API_BASE}/aiml-tasks/${id}`, { method: 'DELETE' });
    } catch (e) {}
    setAimlTasks(aimlTasks.filter((t) => t.id !== id));
  };

  const handleAddDSA = async (newQ) => {
    try {
      const res = await fetch(`${API_BASE}/dsa`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQ)
      });
      if (res.ok) {
        const data = await res.json();
        setDsaQuestions([data, ...dsaQuestions]);
        fetchAttendance();
      } else {
        setDsaQuestions([{ ...newQ, id: Date.now() }, ...dsaQuestions]);
      }
    } catch (e) {
      setDsaQuestions([{ ...newQ, id: Date.now() }, ...dsaQuestions]);
    }
  };

  const handleDeleteDSA = async (id) => {
    try {
      await fetch(`${API_BASE}/dsa/${id}`, { method: 'DELETE' });
    } catch (e) {}
    setDsaQuestions(dsaQuestions.filter((q) => q.id !== id));
  };

  const handleAddResource = async (newRes) => {
    try {
      const res = await fetch(`${API_BASE}/resources`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRes)
      });
      if (res.ok) {
        const data = await res.json();
        setWebResources([data, ...webResources]);
        fetchAttendance();
      } else {
        setWebResources([{ ...newRes, id: Date.now() }, ...webResources]);
      }
    } catch (e) {
      setWebResources([{ ...newRes, id: Date.now() }, ...webResources]);
    }
  };

  const handleDeleteResource = async (id) => {
    try {
      await fetch(`${API_BASE}/resources/${id}`, { method: 'DELETE' });
    } catch (e) {}
    setWebResources(webResources.filter((r) => r.id !== id));
  };

  const handleCheckIn = async (note) => {
    try {
      await fetch(`${API_BASE}/attendance/checkin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note })
      });
      fetchAttendance();
    } catch (e) {
      const todayStr = new Date().toISOString().split('T')[0];
      setStreak(streak + 1);
      setAttendanceRecords([{ date: todayStr, status: 'Present', note }, ...attendanceRecords]);
    }
  };

  const handleAskDoubt = async (doubtData) => {
    try {
      const res = await fetch(`${API_BASE}/doubts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(doubtData)
      });
      if (res.ok) {
        const data = await res.json();
        setDoubts([data, ...doubts]);
        return data;
      }
    } catch (e) {}
    const mock = { ...doubtData, id: Date.now(), status: 'Pending' };
    setDoubts([mock, ...doubts]);
    return mock;
  };

  const handleBookSession = async (sessionData) => {
    try {
      const res = await fetch(`${API_BASE}/sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sessionData)
      });
      if (res.ok) {
        const data = await res.json();
        setSessions([data, ...sessions]);
        return data;
      }
    } catch (e) {}
    const mock = { ...sessionData, id: Date.now(), meeting_status: 'Scheduled' };
    setSessions([mock, ...sessions]);
    return mock;
  };

  const handleLogin = async (email, password) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    localStorage.setItem('lo_token', data.token);
    localStorage.setItem('lo_user', JSON.stringify(data.user));
    setUser(data.user);
  };

  const handleRegister = async (name, email, password) => {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    localStorage.setItem('lo_token', data.token);
    localStorage.setItem('lo_user', JSON.stringify(data.user));
    setUser(data.user);
  };

  const handleLogout = () => {
    localStorage.removeItem('lo_token');
    localStorage.removeItem('lo_user');
    setUser(null);
  };

  const triggerQuickLogDSA = () => {
    setActiveTab('dsa');
  };

  const navigateBackToBento = () => {
    setActiveTab('bento');
  };

  return (
    <div className="min-h-screen pb-20 relative">
      
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        streak={streak}
        user={user}
        theme={theme}
        setTheme={setTheme}
        bgStyle={bgStyle}
        setBgStyle={setBgStyle}
        onLogout={handleLogout}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenDoubtModal={() => setActiveTab('doubts')}
        onQuickAddDSA={triggerQuickLogDSA}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 pt-6 space-y-6">
        
        {/* Tab 0: Modern Bento Grid Dashboard (Includes Attendance Heatmap) */}
        {activeTab === 'bento' && (
          <>
            <AttendanceHeatmap
              streak={streak}
              records={attendanceRecords}
              onCheckIn={handleCheckIn}
            />

            <BentoGrid
              streak={streak}
              dsaQuestions={dsaQuestions}
              webResources={webResources}
              user={user}
              onSwitchTab={setActiveTab}
              onQuickAddDSA={triggerQuickLogDSA}
            />
          </>
        )}



        {/* Tab 2: DSA Quest Tracker */}
        {activeTab === 'dsa' && (
          <DSATracker
            questions={dsaQuestions}
            onAddQuestion={handleAddDSA}
            onDeleteQuestion={handleDeleteDSA}
            onBack={navigateBackToBento}
          />
        )}

        {/* Tab 2.5: Web Dev Daily Learning Tracker */}
        {activeTab === 'webdev_tracker' && (
          <WebDevTracker
            tasks={webDevTasks}
            onAddTask={handleAddWebDevTask}
            onAddApproach={handleAddWebDevApproach}
            onAddCode={handleAddWebDevCode}
            onDeleteTask={handleDeleteWebDevTask}
            onBack={navigateBackToBento}
          />
        )}

        {/* Tab 2.6: AI/ML Daily Tracker */}
        {activeTab === 'aiml_tracker' && (
          <AIMLTracker
            tasks={aimlTasks}
            onAddTask={handleAddAIMLTask}
            onAddApproach={handleAddAIMLApproach}
            onAddCode={handleAddAIMLCode}
            onDeleteTask={handleDeleteAIMLTask}
            onBack={navigateBackToBento}
          />
        )}

        {/* Tab 3: Web Dev YouTube Live Stream Material Hub */}
        {activeTab === 'webdev' && (
          <WebDevHub
            resources={webResources}
            onAddResource={handleAddResource}
            onDeleteResource={handleDeleteResource}
            onBack={navigateBackToBento}
          />
        )}

        {/* Tab 4: ₹10 Razorpay Doubt & Mentorship Gateway */}
        {activeTab === 'doubts' && (
          <DoubtPortal
            doubts={doubts}
            sessions={sessions}
            onAskDoubt={handleAskDoubt}
            onBookSession={handleBookSession}
            onBack={navigateBackToBento}
          />
        )}

      </main>

      {/* FLOATING QUICK ADD BUTTON */}
      <button
        onClick={triggerQuickLogDSA}
        className="fixed bottom-6 right-6 z-40 btn-primary p-4 rounded-full shadow-2xl shadow-sky-500/40 hover:scale-110 transition-transform flex items-center justify-center gap-2"
        title="Quick Log Solved Question"
      >
        <Plus className="w-6 h-6 text-slate-950" />
        <span className="text-xs font-bold hidden sm:inline text-slate-950">Quick Log Problem</span>
      </button>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />

    </div>
  );
}
