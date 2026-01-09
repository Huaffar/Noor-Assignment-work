
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Wallet, 
  TrendingUp, 
  Zap, 
  History, 
  ArrowRight,
  Layers,
  BarChart3,
  Filter,
  ArrowUpRight,
  CheckCircle2,
  Calendar,
  Smartphone,
  ShieldCheck,
  LayoutGrid,
  // Added missing Share2 and Users imports
  Share2,
  Users
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
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
      profit: Math.floor((user?.totalEarned || 8450) / 30 * multi),
      tasks: Math.floor(42 / 30 * multi),
      referrals: Math.floor(12 / 30 * multi),
      chart: [
        { day: 'M', amount: 400 * (multi/7) }, { day: 'T', amount: 300 * (multi/7) }, { day: 'W', amount: 600 * (multi/7) },
        { day: 'T', amount: 800 * (multi/7) }, { day: 'F', amount: 500 * (multi/7) }, { day: 'S', amount: 900 * (multi/7) }, { day: 'S', amount: 1200 * (multi/7) },
      ]
    };
  }, [timeFilter, user]);

  const completed = user?.completedTasksToday || 3;
  const limit = user?.dailyLimit || 8;
  const taskProgress = (completed / limit) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-4 pb-24 px-1 scale-[0.98] origin-top">
      {/* Top Identity Node */}
      <div className="flex items-center justify-between bg-white px-5 py-3 rounded-2xl border border-pink-50 shadow-sm mx-1">
         <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 shadow-inner">
               <UserIcon className="w-5 h-5" />
            </div>
            <div>
               <h1 className="text-[13px] font-black text-slate-900 uppercase leading-none">Command Terminal</h1>
               <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest mt-1">Worker Node: {user?.id.toUpperCase()}</p>
            </div>
         </div>
         <div className="bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100 flex items-center space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest">Logic Synced</span>
         </div>
      </div>

      {/* Top Row: Wallet & Quota - Compressed */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="md:col-span-7 bg-slate-950 rounded-[2rem] p-6 text-white relative overflow-hidden shadow-2xl border border-slate-800"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-rose-600/10 rounded-full blur-[60px] -mr-16 -mt-16" />
          <div className="relative z-10 h-full flex flex-col justify-between">
             <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-3">
                   <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-2xl">
                      <Wallet className="w-5 h-5 text-rose-500" />
                   </div>
                   <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Hub Treasury</p>
                </div>
                <button onClick={() => navigate('/wallet')} className="p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"><History className="w-4 h-4 text-slate-400" /></button>
             </div>
             
             <div className="mb-6">
                <div className="flex items-baseline space-x-2">
                   <span className="text-sm font-bold opacity-30 uppercase">PKR</span>
                   <h1 className="text-4xl font-black tracking-tighter leading-none">{(user?.balance || 0).toLocaleString()}</h1>
                </div>
                <p className="text-[8px] font-bold text-emerald-400 uppercase tracking-[0.4em] mt-2 flex items-center"><ShieldCheck className="w-3 h-3 mr-1.5" /> Verified Ledger Balance</p>
             </div>

             <div className="flex gap-2.5">
                <button onClick={() => navigate('/withdraw')} className="flex-1 bg-rose-600 text-white py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-rose-950/40 active:scale-95 transition-all">Instant Payout</button>
                <button onClick={() => navigate('/upgrade')} className="flex-1 bg-white/5 border border-white/10 text-white py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white/10 active:scale-95 transition-all">Expand Capacity</button>
             </div>
          </div>
        </motion.div>

        {/* Daily Capacity Node */}
        <div className="md:col-span-5 bg-white p-6 rounded-[2rem] border border-pink-50 shadow-sm flex flex-col justify-between">
           <div className="flex justify-between items-start mb-2">
              <div>
                 <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Node Load</h3>
                 <p className="text-[8px] font-bold text-slate-400 uppercase mt-1 tracking-widest">Daily Processing Quota</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-500 shadow-inner"><Zap className="w-5 h-5" /></div>
           </div>
           
           <div className="space-y-4 my-6">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter">
                 <span className="text-slate-400">Payload Transmitted</span>
                 <span className="text-slate-900">{completed} / {limit} Pgs</span>
              </div>
              <div className="h-2.5 bg-slate-50 rounded-full overflow-hidden border border-slate-100 relative shadow-inner">
                 <motion.div 
                   initial={{ width: 0 }} 
                   animate={{ width: `${taskProgress}%` }} 
                   className="h-full bg-gradient-to-r from-pink-500 to-rose-600 rounded-full shadow-[0_0_12px_rgba(244,63,94,0.4)]" 
                 />
              </div>
           </div>

           <button onClick={() => navigate('/tasks')} className="w-full py-3 bg-slate-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center group shadow-xl active:scale-95 transition-all">
             Initialize Payloads <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-rose-500" />
           </button>
        </div>
      </div>

      {/* Dynamic Global Filter */}
      <div className="flex items-center justify-between bg-white px-5 py-2.5 rounded-2xl border border-pink-50 shadow-sm mx-1">
         <div className="flex items-center space-x-3">
            <BarChart3 className="w-4 h-4 text-slate-400" />
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Telemetry Filter:</span>
         </div>
         <div className="flex bg-slate-100 p-0.5 rounded-xl border border-slate-200">
            {['Daily', 'Weekly', 'Monthly'].map(f => (
              <button 
                key={f} onClick={() => setTimeFilter(f as any)}
                className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase transition-all ${timeFilter === f ? 'bg-white text-pink-600 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {f}
              </button>
            ))}
         </div>
      </div>

      {/* Performance Grid - Dynamic Stats */}
      <div className="grid grid-cols-3 gap-3 mx-1">
         {[
           { label: 'Cumulative Yield', val: `Rs. ${stats.profit}`, icon: BarChart3, color: 'text-rose-500', bg: 'bg-rose-50' },
           { label: 'Payload Integrity', val: `${stats.tasks} Nodes`, icon: LayoutGrid, color: 'text-indigo-500', bg: 'bg-indigo-50' },
           { label: 'Affiliate Bonus', val: `Rs. ${stats.referrals * 150}`, icon: Share2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
         ].map((kpi, i) => (
           <div key={i} className="bg-white p-4 rounded-[2rem] border border-pink-50 shadow-sm group hover:border-pink-300 transition-all hover:shadow-xl hover:shadow-pink-900/5">
              <div className={`w-9 h-9 rounded-xl ${kpi.bg} ${kpi.color} flex items-center justify-center mb-4 shadow-inner group-hover:scale-90 transition-transform`}>
                 <kpi.icon className="w-4.5 h-4.5" />
              </div>
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">{kpi.label}</p>
              <h4 className="text-[13px] font-black text-slate-900 leading-none">{kpi.val}</h4>
           </div>
         ))}
      </div>

      <DailyBonus />
    </div>
  );
};

const UserIcon = ({ className }: { className?: string }) => <Users className={className} />;

export default Dashboard;
