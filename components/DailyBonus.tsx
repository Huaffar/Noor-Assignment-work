
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gift, 
  CheckCircle2, 
  Bell, 
  BellOff, 
  Sparkles, 
  Loader2, 
  History, 
  ChevronDown, 
  ArrowRight,
  TrendingUp,
  Zap,
  Lock,
  Activity,
  Calendar
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';
import { useSystem } from '../context/SystemContext';
import { claimDailyBonus } from '../api/controllers/bonusController';

const DailyBonus: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { settings } = useSystem();
  const [isClaiming, setIsClaiming] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [wantsReminder, setWantsReminder] = useState(user?.wantsReminder || false);

  if (!isAuthenticated || !settings.streakConfig.isActive) return null;

  const currentStreak = user?.checkInStreak || 0;
  const lastClaim = user?.lastCheckInDate ? new Date(user.lastCheckInDate) : null;
  const isClaimedToday = lastClaim?.toDateString() === new Date().toDateString();

  const handleClaim = async () => {
    if (isClaimedToday || isClaiming) return;
    setIsClaiming(true);
    
    try {
      await claimDailyBonus(user, settings.streakConfig);
      
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#e11d48', '#ffffff', '#fb7185']
      });

    } catch (err: any) {
      console.error(err.message);
    } finally {
      setIsClaiming(false);
    }
  };

  const toggleReminder = () => {
    setWantsReminder(!wantsReminder);
  };

  const nextRewardDay = currentStreak === 7 ? 1 : currentStreak + 1;
  const nextRewardAmount = nextRewardDay === 7 ? settings.streakConfig.milestoneReward : settings.streakConfig.dailyReward;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden group hover:border-rose-100 transition-all"
    >
      {/* Header - High Tech */}
      <div className="p-5 flex items-center justify-between border-b border-gray-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 shadow-inner group-hover:scale-95 transition-transform">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-[11px] font-black text-gray-900 uppercase leading-none tracking-tight">Attendance Node</h3>
            <p className="text-[7px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1.5">Streak: <span className="text-rose-600">{currentStreak} Phases</span></p>
          </div>
        </div>
        <div className="flex items-center space-x-1.5">
           <button 
             onClick={toggleReminder}
             className={`p-2.5 rounded-xl transition-all border shadow-sm ${wantsReminder ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-gray-50 text-gray-300 border-gray-100'}`}
           >
             {wantsReminder ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
           </button>
           <button 
             onClick={() => setShowHistory(!showHistory)}
             className={`p-2.5 rounded-xl transition-all border shadow-sm ${showHistory ? 'bg-slate-900 text-white border-slate-800' : 'bg-gray-50 text-gray-400 border-gray-100'}`}
           >
             <History className="w-4 h-4" />
           </button>
        </div>
      </div>

      {/* Logic Grid */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-8 px-1">
          {[1, 2, 3, 4, 5, 6, 7].map((day) => {
            const isSettled = day <= currentStreak;
            const isToday = !isClaimedToday && day === (currentStreak + 1);
            const isFinishedToday = isClaimedToday && day === currentStreak;
            
            return (
              <div key={day} className="flex flex-col items-center space-y-3">
                <motion.div 
                  initial={false}
                  animate={isToday ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all relative overflow-hidden ${
                  isSettled || isFinishedToday ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100' : 
                  isToday ? 'bg-rose-600 text-white ring-4 ring-rose-50 shadow-xl shadow-rose-200' : 
                  'bg-gray-50 text-gray-300 border border-gray-100'
                }`}>
                  {isSettled || isFinishedToday ? <CheckCircle2 className="w-4.5 h-4.5" /> : 
                   day === 7 ? <Sparkles className="w-4.5 h-4.5" /> : 
                   <span className="text-[10px] font-black">{day}</span>}
                </motion.div>
                <span className={`text-[7px] font-black uppercase tracking-widest ${isToday ? 'text-rose-600' : 'text-gray-400'}`}>
                  Ph-{day}
                </span>
              </div>
            );
          })}
        </div>

        {/* Claim Protocol */}
        <AnimatePresence mode="wait">
          {!isClaimedToday ? (
            <motion.div 
              key="claim" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="space-y-4"
            >
               <button
                onClick={handleClaim}
                disabled={isClaiming}
                className="w-full py-4.5 bg-slate-950 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.4em] transition-all flex items-center justify-center shadow-2xl hover:bg-rose-600 active:scale-95 group"
              >
                {isClaiming ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Activity className="w-4.5 h-4.5 mr-2.5 text-rose-500 group-hover:scale-125 transition-transform" /> Sync Daily Yield (+{settings.streakConfig.dailyReward})</>}
              </button>
              <p className="text-center text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] opacity-60">Maintain daily sync to maximize node dividends</p>
            </motion.div>
          ) : (
            <motion.div 
              key="prediction" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-50 border border-gray-100 rounded-[1.5rem] p-4 flex items-center justify-between shadow-inner"
            >
              <div className="flex items-center space-x-3.5">
                 <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-rose-500 shadow-sm border border-gray-100">
                    <TrendingUp className="w-5 h-5" />
                 </div>
                 <div>
                    <p className="text-[7px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1.5">Next Yield Phase</p>
                    <p className="text-sm font-black text-slate-900 leading-none">Rs. {nextRewardAmount} Pending</p>
                 </div>
              </div>
              <div className="bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100 flex items-center space-x-1.5">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-sm" />
                 <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest">PHASE READY</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Audit Log Sub-section */}
        <AnimatePresence>
          {showHistory && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-6 pt-6 border-t border-gray-50"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-3">
                   <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Attendance Ledger</p>
                   <div className="h-px bg-gray-50 flex-1 mx-4" />
                </div>
                {user.rewardHistory && user.rewardHistory.length > 0 ? (
                  <div className="grid grid-cols-1 gap-1.5">
                    {user.rewardHistory.map((log: any) => (
                      <div key={log.id} className="bg-white border border-gray-100 p-2.5 rounded-xl flex items-center justify-between shadow-sm hover:border-emerald-100 transition-all group">
                         <div className="flex items-center space-x-3">
                            <Calendar className="w-3.5 h-3.5 text-gray-300 group-hover:text-rose-500 transition-colors" />
                            <span className="text-[9px] font-black text-gray-600 uppercase tracking-tight">{new Date(log.date).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                         </div>
                         <span className="text-[10px] font-black text-emerald-600">+Rs. {log.amount} Yield</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                     <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.3em]">No Historical Data</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Infrastructure Note */}
      <div className="bg-slate-950 p-2.5 text-center flex items-center justify-center space-x-2 border-t border-white/5">
         <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
         <p className="text-[7px] font-black text-white/40 uppercase tracking-[0.5em]">Protocol v2.5.0 • Attendance Synchronizer</p>
      </div>
    </motion.div>
  );
};

export default DailyBonus;
