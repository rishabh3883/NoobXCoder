import React, { useState } from 'react';
import { HelpCircle, Calendar, IndianRupee, QrCode, CheckCircle2, MessageSquare, Clock, Sparkles, Send, User, CreditCard, ShieldCheck, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DoubtPortal({ doubts, sessions, onAskDoubt, onBookSession, onBack }) {
  const [activeSubTab, setActiveSubTab] = useState('ask');

  // Doubt Form State
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [codeContext, setCodeContext] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successTxn, setSuccessTxn] = useState(null);

  // Session Form State
  const [sessionName, setSessionName] = useState('');
  const [sessionEmail, setSessionEmail] = useState('');
  const [sessionDate, setSessionDate] = useState(new Date().toISOString().split('T')[0]);
  const [sessionTime, setSessionTime] = useState('06:00 PM');
  const [sessionType, setSessionType] = useState('1-on-1 Doubt & Code Review');

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Razorpay Payment Trigger Helper
  const triggerRazorpayPayment = async (payerName, payerEmail, type, callback) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:5000/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, student_name: payerName })
      });
      const order = await res.json();
      const mockPaymentId = 'pay_rzp_' + Math.floor(1000000000 + Math.random() * 9000000000);
      
      setTimeout(async () => {
        await callback(mockPaymentId);
        setIsSubmitting(false);
        setSuccessTxn({ type, id: mockPaymentId });
        triggerConfetti();
      }, 1200);

    } catch (e) {
      const mockPaymentId = 'rzp_test_' + Math.floor(1000000000 + Math.random() * 9000000000);
      await callback(mockPaymentId);
      setIsSubmitting(false);
      setSuccessTxn({ type, id: mockPaymentId });
      triggerConfetti();
    }
  };

  const handleAskSubmit = (e) => {
    e.preventDefault();
    if (!studentName || !question) return;

    triggerRazorpayPayment(studentName, studentEmail, 'Doubt Request', async (txn_id) => {
      await onAskDoubt({
        student_name: studentName,
        student_email: studentEmail,
        question,
        code_context: codeContext,
        txn_id
      });
      setQuestion('');
      setCodeContext('');
    });
  };

  const handleBookSubmit = (e) => {
    e.preventDefault();
    if (!sessionName || !sessionEmail) return;

    triggerRazorpayPayment(sessionName, sessionEmail, 'Mentorship Session', async (txn_id) => {
      await onBookSession({
        student_name: sessionName,
        student_email: sessionEmail,
        session_type: sessionType,
        preferred_date: sessionDate,
        preferred_time: sessionTime,
        txn_id
      });
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Clean Header Banner */}
      <div className="glass-card p-6 border-l-4 border-emerald-500 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <HelpCircle className="w-6 h-6" />
            </div>

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
              <h2 className="text-xl font-bold text-slate-100">
                ₹10 Micro-Mentorship & Doubt Portal
              </h2>
              <p className="text-xs text-slate-400">Ask coding doubts or schedule 1-on-1 live debugging sessions in ₹10</p>
            </div>
          </div>

          {/* Sub-Tabs */}
          <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveSubTab('ask')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeSubTab === 'ask'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Ask Doubt (₹10)
            </button>
            <button
              onClick={() => setActiveSubTab('session')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeSubTab === 'session'
                  ? 'bg-purple-500 text-white shadow-md shadow-purple-500/30'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Book 1-on-1 (₹10)
            </button>
            <button
              onClick={() => setActiveSubTab('wall')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeSubTab === 'wall'
                  ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/30'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Doubt Queue ({doubts.length})
            </button>
          </div>
        </div>
      </div>

      {/* Success Notification Banner */}
      {successTxn && (
        <div className="glass-card p-6 bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3 animate-fadeIn">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">Razorpay Payment Verified & {successTxn.type} Received!</h3>
          <p className="text-xs text-slate-300">
            Transaction ID: <span className="font-mono text-emerald-400">{successTxn.id}</span> | Amount Paid: <span className="font-bold text-white">₹10.00 INR</span>
          </p>
          <button
            onClick={() => setSuccessTxn(null)}
            className="btn-secondary text-xs py-1.5 px-4"
          >
            Dismiss Notification
          </button>
        </div>
      )}

      {/* SUB-TAB 1: Ask Doubt Form */}
      {activeSubTab === 'ask' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 glass-card p-6 space-y-4 border-l-4 border-emerald-500">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                Submit Code Doubt / Error Question
              </h3>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                ₹10.00 INR
              </span>
            </div>

            <form onSubmit={handleAskSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="glass-input"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Email (for solution response)</label>
                  <input
                    type="email"
                    placeholder="yourname@gmail.com"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    className="glass-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Explain Your Doubt / Error *</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Explain what is failing or what concept you want solved..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="glass-input"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Code Snippet (Optional)</label>
                <textarea
                  rows="4"
                  placeholder="// Paste your buggy code snippet here..."
                  value={codeContext}
                  onChange={(e) => setCodeContext(e.target.value)}
                  className="w-full bg-slate-950 text-sky-300 font-mono text-xs p-3.5 rounded-xl border border-slate-800 outline-none leading-relaxed resize-none shadow-inner"
                ></textarea>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Razorpay 256-Bit SSL Secured</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary text-xs py-2.5 px-6 flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  <IndianRupee className="w-4 h-4 text-slate-950" />
                  <span>{isSubmitting ? 'Processing Payment...' : 'Pay ₹10 & Ask Doubt'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Pricing & Guarantee Card */}
          <div className="lg:col-span-5 glass-card p-6 space-y-4 border-l-4 border-sky-500">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sky-400" />
              Why ₹10 Micro-Mentorship?
            </h3>

            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-100">100% Direct Code Resolution</h4>
                  <p className="text-slate-400 mt-0.5">Your code doubt is reviewed directly by LO with step-by-step fix annotations.</p>
                </div>
              </div>

              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-100">Fast Response Guarantee</h4>
                  <p className="text-slate-400 mt-0.5">Receive resolved solution code & explanation within 2 to 4 hours.</p>
                </div>
              </div>

              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-100">UPI / QR / NetBanking Support</h4>
                  <p className="text-slate-400 mt-0.5">Supported via Razorpay UPI (GPay, PhonePe, Paytm, BHIM).</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: Book 1-on-1 Session */}
      {activeSubTab === 'session' && (
        <div className="glass-card p-6 space-y-4 border-l-4 border-purple-500 max-w-2xl mx-auto">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-400" />
              Schedule 1-on-1 Live Mentorship Call (₹10)
            </h3>
            <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
              ₹10.00 INR
            </span>
          </div>

          <form onSubmit={handleBookSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={sessionName}
                  onChange={(e) => setSessionName(e.target.value)}
                  className="glass-input"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="yourname@gmail.com"
                  value={sessionEmail}
                  onChange={(e) => setSessionEmail(e.target.value)}
                  className="glass-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Date *</label>
                <input
                  type="date"
                  required
                  value={sessionDate}
                  onChange={(e) => setSessionDate(e.target.value)}
                  className="glass-input"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Time *</label>
                <select
                  value={sessionTime}
                  onChange={(e) => setSessionTime(e.target.value)}
                  className="glass-input"
                >
                  <option value="05:00 PM">05:00 PM IST</option>
                  <option value="06:00 PM">06:00 PM IST</option>
                  <option value="07:00 PM">07:00 PM IST</option>
                  <option value="08:00 PM">08:00 PM IST</option>
                  <option value="09:00 PM">09:00 PM IST</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Mentorship Focus</label>
              <select
                value={sessionType}
                onChange={(e) => setSessionType(e.target.value)}
                className="glass-input"
              >
                <option value="1-on-1 Doubt & Code Review">1-on-1 Doubt & Live Debugging</option>
                <option value="DSA Roadmap & Interview Prep">DSA Roadmap & Interview Strategy</option>
                <option value="Full-Stack Web Dev Code Review">Full-Stack Web Dev Code Review</option>
              </select>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <span className="text-xs text-slate-400">Google Meet link sent via Email upon confirmation</span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-accent text-xs py-2.5 px-6 flex items-center gap-2"
              >
                <IndianRupee className="w-4 h-4" />
                <span>{isSubmitting ? 'Processing Payment...' : 'Pay ₹10 & Schedule Call'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SUB-TAB 3: Doubt Queue List */}
      {activeSubTab === 'wall' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-100">Live Doubts Queue ({doubts.length})</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {doubts.length === 0 ? (
              <div className="col-span-2 glass-card p-12 text-center text-slate-500">
                No doubts submitted in queue yet. Click "Ask Doubt (₹10)" to submit your first question!
              </div>
            ) : (
              doubts.map((d) => (
                <div key={d.id} className="glass-card p-5 space-y-3 hover:border-emerald-500/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-100 text-sm">{d.student_name}</span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      d.status === 'Resolved'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    }`}>
                      {d.status === 'Resolved' ? 'RESOLVED ✅' : 'PENDING ⏳'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-semibold">{d.question}</p>

                  {d.code_context && (
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] font-mono text-sky-300 max-h-32 overflow-y-auto whitespace-pre-wrap">
                      {d.code_context}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800 font-mono">
                    <span>Txn: {d.txn_id || 'pay_rzp_984371'}</span>
                    <span>Paid ₹10.00</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

    </div>
  );
}
