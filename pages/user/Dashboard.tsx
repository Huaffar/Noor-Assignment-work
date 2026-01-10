import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Wallet, 
  History, 
  CheckCircle2, 
  ShieldCheck, 
  Users, 
  ChevronRight, 
  ArrowDownToLine,
  Target,
  Rocket,
  User as UserIcon,
  BarChart3,
  TrendingUp,
  Clock,
  Briefcase
} from 'lucide-react';
import { 
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip
} from 'recharts';
import { useAuth } from '../../context/AuthContext';
import DailyBonus from '../../components/DailyBonus';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState<'Daily' | 'Weekly' | 'Monthly'>('Weekly');

  const stats = useMemo(() => {
    const multi = timeFilter === 'Daily' ? 1 : timeFilter === 'Weekly' ? 7 : 30;
    return {
      today: 680,
      monthly: 14400,
      totalEarned: user?.totalEarned || 18400,
      totalWithdrawn: user?.totalWithdrawn || 13000,
      referralEarn: 2400,
      pendingTasks: 4
    };
  }, [timeFilter, user]);

  const chartData = [
    { name: 'M', val: 400 }, { name: 'T', val: 700 }, { name: 'W', val: 500 },
    { name: 'T', val: 800 }, { name: 'F', val: 1200 }, { name: 'S', val: 1000 },
    { name: 'S', val: 1400 }
  ];

  const limit = user?.dailyLimit || 12;
  const completed = (user as any)?.completedTasksToday || 3;
  const taskProgress = (completed / limit) * 100;

  return (
    <div className="max-w-xl mx-auto space-y-4 pb-24 px-1 scale-[0.98] origin-top">
      {/* Financial Matrix Card */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="bg-slate-950 p-6 rounded-[2rem] text-white relative overflow-hidden shadow-2xl mx-1 border border-white/5"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-theme-primary/10 rounded-full blur-[80px]" />
        <div className="relative z-10 space-y-6">
           <div className="flex justify-between items-start">
              <div>
                 <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em] mb-1">Available Funds</p>
                 <div className="flex items-baseline space-x-1.5">
                    <span className="text-xs font-bold text-theme-primary opacity-60">PKR</span>
                    <h2 className="text-4xl font-black tracking-tighter leading-none">{(user?.balance || 0).toLocaleString()}</h2>
                 </div>
              </div>
              <div className="flex space-x-2">
                 <button onClick={() => navigate('/wallet')} className="p-2 bg-white/5 rounded-xl border border-white/10"><History className="w-4 h-4 text-theme-primary" /></button>
                 <button onClick={() => navigate('/profile')} className="p-2 bg-white/5 rounded-xl border border-white/10"><UserIcon className="w-4 h-4" /></button>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                 <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-1">Today Kamai</p>
                 <p className="text-sm font-black text-emerald-400">Rs. {stats.today}</p>
              </div>
              <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                 <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-1">Monthly Kamai</p>
                 <p className="text-sm font-black text-theme-primary">Rs. {stats.monthly.toLocaleString()}</p>
              </div>
              <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                 <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Payouts</p>
                 <p className="text-sm font-black text-amber-400">Rs. {stats.totalWithdrawn.toLocaleString()}</p>
              </div>
              <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                 <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-1">Referral Income</p>
                 <p className="text-sm font-black text-indigo-400">Rs. {stats.referralEarn.toLocaleString()}</p>
              </div>
           </div>

           <div className="flex gap-2">
              <button onClick={() => navigate('/withdraw')} className="flex-1 py-3.5 themed-gradient text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center justify-center active:scale-95 transition-all">
                <ArrowDownToLine className="w-3.5 h-3.5 mr-2" /> Raqam Nikalein
              </button>
              <button onClick={() => navigate('/upgrade')} className="flex-1 py-3.5 bg-white text-slate-950 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center active:scale-95 transition-all">
                <Rocket className="w-3.5 h-3.5 mr-2 text-theme-primary" /> Upgrade Plan
              </button>
           </div>
        </div>
      </motion.div>

      {/* Performance Graph */}
      <div className="bg-white p-4 rounded-[1.8rem] border border-gray-100 shadow-sm mx-1">
         <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-black text-slate-900 uppercase">Aap Ki Karkardagi</h3>
            <div className="flex items-center text-[7px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full uppercase">
               <TrendingUp className="w-2.5 h-2.5 mr-1" /> +12% Is Hafte
            </div>
         </div>
         <div className="h-20 w-full">
            <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={chartData}>
                  <defs><linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/><stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/></linearGradient></defs>
                  <Area type="monotone" dataKey="val" stroke="#0ea5e9" strokeWidth={2} fill="url(#colorVal)" />
               </AreaChart>
            </ResponsiveContainer>
         </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mx-1">
        {/* Pending Work Status */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3">
           <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-black text-slate-900 uppercase">Pending Work</h3>
              <Clock className="w-4 h-4 text-amber-500" />
           </div>
           <p className="text-xl font-black text-slate-900 leading-none">{stats.pendingTasks}</p>
           <p className="text-[8px] font-bold text-gray-400 uppercase">Check honey wala kaam</p>
           <button onClick={() => navigate('/requests')} className="w-full py-2 bg-gray-50 text-gray-400 rounded-lg text-[8px] font-black uppercase hover:bg-gray-100">Audit Ledger</button>
        </div>

        {/* Task Progress */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3">
           <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-black text-slate-900 uppercase">Today Kaam</h3>
              <Target className="w-4 h-4 text-theme-primary" />
           </div>
           <p className="text-xl font-black text-slate-900 leading-none">{completed}/{limit}</p>
           <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-theme-primary" style={{ width: `${taskProgress}%` }} />
           </div>
           <button onClick={() => navigate('/tasks')} className="w-full py-2 bg-theme-secondary text-theme-primary rounded-lg text-[8px] font-black uppercase shadow-sm">Open Terminal</button>
        </div>
      </div>

      <DailyBonus />

      <div className="mx-2">
         <div className="flex items-center space-x-2 text-gray-400 mb-2">
            <History className="w-3.5 h-3.5" />
            <h3 className="text-[9px] font-black uppercase">Attendance History</h3>
         </div>
         <div className="space-y-1.5">
            {[
              { day: 'Friday', date: '25 Oct', val: 'Rs. 5', status: 'Present' },
              { day: 'Thursday', date: '24 Oct', val: 'Rs. 5', status: 'Present' },
              { day: 'Wednesday', date: '23 Oct', val: 'Rs. 50', status: 'Milestone' },
            ].map((at, i) => (
              <div key={i} className="bg-white p-3 rounded-xl border border-gray-50 flex items-center justify-between opacity-70 scale-95 origin-left">
                 <div>
                    <p className="text-[10px] font-black text-slate-900 leading-none">{at.day}</p>
                    <p className="text-[7px] text-gray-400 mt-0.5">{at.date}</p>
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] font-black text-emerald-600 leading-none">{at.val}</p>
                    <p className="text-[6px] font-black text-slate-400 uppercase mt-0.5">{at.status}</p>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default Dashboard;