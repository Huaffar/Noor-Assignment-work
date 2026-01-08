
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, CheckCircle2, Lock, Sparkles, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';
import { useSystem } from '../context/SystemContext';
import { claimDailyBonus } from '../api/controllers/bonusController';

const DailyBonus: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { settings } = useSystem();
  const [isClaiming, setIsClaiming] = useState(false);

  if (!isAuthenticated || !settings.streakConfig.isActive) return null;

  const currentStreak = user?.checkInStreak || 0;
  const lastClaim = user?.lastCheckInDate ? new Date(user.lastCheckInDate) : null;
  const isClaimedToday = lastClaim?.toDateString() === new Date().toDateString();

  const handleClaim = async () => {
    if (isClaimedToday || isClaiming) return;
    setIsClaiming(true);
    
    try {
      const res = await claimDailyBonus(user, settings.streakConfig);
      
      // Confetti Burst
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: [settings.themes.find(t => t.id === settings.activeThemeId)?.primary || '#e11d48', '#ffffff']
      });

      // In a real app, you'd update global auth state here
      // dispatch({ type: 'UPDATE_USER', payload: res.user });
      alert(res.message);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4 relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
            <Gift className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-[11px] font-black text-gray-900 uppercase leading-none">Daily Attendance</h3>
            <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">Claim your rewards</p>
          </div>
        </div>
        <div className="flex items-center space-x-1 bg-amber-50 px-2 py-1 rounded-lg">
           <Sparkles className="w-3 h-3 text-amber-500" />
           <span className="text-[9px] font-black text-amber-600 uppercase tracking-tighter">{currentStreak} Day Streak</span>
        </div>
      </div>

      <div className="flex justify-between items-center px-1 mb-5">
        {[1, 2, 3, 4, 5, 6, 7].map((day) => {
          const isPast = day <= currentStreak;
          const isToday = day === (isClaimedToday ? currentStreak : currentStreak + 1);
          const isFuture = day > (isClaimedToday ? currentStreak : currentStreak + 1);
          
          return (
            <div key={day} className="flex flex-col items-center space-y-1.5">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                isPast ? 'bg-emerald-500 text-white' : 
                isToday ? 'bg-rose-600 text-white ring-4 ring-rose-50' : 
                'bg-gray-100 text-gray-300'
              }`}>
                {isPast ? <CheckCircle2 className="w-4 h-4" /> : 
                 day === 7 ? <Gift className="w-4 h-4" /> : 
                 <span className="text-[10px] font-black">{day}</span>}
              </div>
              <span className={`text-[7px] font-black uppercase tracking-tighter ${isToday ? 'text-rose-600' : 'text-gray-400'}`}>
                Day {day}
              </span>
            </div>
          );
        })}
      </div>

      <button
        onClick={handleClaim}
        disabled={isClaimedToday || isClaiming}
        className={`w-full py-3 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center ${
          isClaimedToday 
            ? 'bg-gray-50 text-gray-400 border border-gray-100' 
            : 'bg-slate-900 text-white hover:bg-rose-600 shadow-xl shadow-slate-200/50 active:scale-95'
        }`}
      >
        {isClaiming ? <Loader2 className="w-4 h-4 animate-spin" /> : 
         isClaimedToday ? 'Already Collected Today' : 'Claim Daily Reward'}
      </button>
    </motion.div>
  );
};

export default DailyBonus;
