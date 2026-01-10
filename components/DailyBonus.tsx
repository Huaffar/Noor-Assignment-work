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
  TrendingUp,
  Calendar,
  CloudLightning
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
        particleCount: 100,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#0ea5e9', '#ffffff']
      });
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setIsClaiming(false);
    }
  };

  const nextRewardDay = currentStreak === 7 ? 1 : currentStreak + 1;
  const nextRewardAmount = nextRewardDay === 7 ? settings.streakConfig.milestoneReward : settings.streakConfig.dailyReward;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-sky-50 shadow-lg shadow-sky-900/[0.02] overflow-hidden group mx-1"
    >
      <div className="p-4 flex items-center justify-between border-b border-sky-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 shadow-inner">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-[11px] font-black text-gray-900 uppercase">Daily Attendance</h3>
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Streak: <span className="text-sky-600">{currentStreak} Days</span></p>
          </div>
        </div>
        <div className="flex items-center space-x-1.5">
           <button 
             onClick={() => setWantsReminder(!wantsReminder)}
             className={`p-2 rounded-lg transition-all border ${wantsReminder ? 'bg-sky-50 text-sky-600 border-sky-100' : 'bg-gray-50 text-gray-400 border-gray-100'}`}
           >
             {wantsReminder ? <Bell className="w-3.5 h-3.5" /> : <BellOff className="w-3.5 h-3.5" />}
           </button>
           <button 
             onClick={() => setShowHistory(!showHistory)}
             className={`p-2 rounded-lg transition-all border ${showHistory ? 'bg-slate-900 text-white border-slate-800' : 'bg-gray-50 text-gray-400 border-gray-100'}`}
           >
             <History className="w-3.5 h-3.5" />
           </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-8 px-1">
          {[1, 2, 3, 4, 5, 6, 7].map((day) => {
            const isSettled = day <= currentStreak;
            const isToday = !isClaimedToday && day === (currentStreak + 1);
            const isFinishedToday = isClaimedToday && day === currentStreak;
            
            return (
              <div key={day} className="flex flex-col items-center space-y-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all relative ${
                  isSettled || isFinishedToday ? 'bg-emerald-500 text-white shadow-md' : 
                  isToday ? 'bg-sky-600 text-white shadow-xl shadow-sky-200' : 
                  'bg-gray-50 text-gray-300 border border-gray-100'
                }`}>
                  {isSettled || isFinishedToday ? <CheckCircle2 className="w-4.5 h-4.5" /> : 
                   day === 7 ? <Sparkles className="w-4 h-4" /> : 
                   <span className="text-[10px] font-black">{day}</span>}
                </div>
                <span className={`text-[7px] font-black uppercase tracking-widest ${isToday ? 'text-sky-600' : 'text-slate-400'}`}>
                  D-{day}
                </span>
              </div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {!isClaimedToday ? (
            <motion.div key="claim" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
               <button
                onClick={handleClaim}
                disabled={isClaiming}
                className="w-full py-4 bg-slate-950 text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center shadow-xl hover:bg-sky-600 active:scale-95"
              >
                {isClaiming ? <Loader2 className="w-4 h-4 animate-spin" /> : <><CloudLightning className="w-4 h-4 mr-2 text-sky-400" /> Collect Reward (+{settings.streakConfig.dailyReward})</>}
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="prediction" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-sky-50 border border-sky-100 rounded-xl p-4 flex items-center justify-between shadow-inner"
            >
              <div className="flex items-center space-x-3">
                 <TrendingUp className="w-5 h-5 text-sky-500" />
                 <div>
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Next Reward Coming</p>
                    <p className="text-xs font-black text-slate-900">Rs. {nextRewardAmount} Pending</p>
                 </div>
              </div>
              <span className="text-[8px] font-black bg-emerald-500 text-white px-2 py-1 rounded-md tracking-widest uppercase">READY</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="bg-slate-950 p-2 text-center border-t border-white/5">
         <p className="text-[7px] font-black text-white/30 uppercase tracking-[0.4em]">Official Daily Attendance System</p>
      </div>
    </motion.div>
  );
};

export default DailyBonus;