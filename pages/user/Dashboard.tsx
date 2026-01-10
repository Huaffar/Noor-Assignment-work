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
  Tooltip,
  XAxis,
  CartesianGrid
} from 'recharts';
import { useAuth } from '../../context/AuthContext';
import DailyBonus from '../../components/DailyBonus';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState<'Daily' | 'Weekly' | 'Monthly'>('Weekly');

  const stats = useMemo(() => {
    return {
      today: 680,
      monthly: 14400,
      totalEarned: user?.totalEarned || 18400,
      totalWithdrawn: user?.totalWithdrawn || 13000,
      referralEarn: 2400,
      pendingTasks: 4
    };
  }, [user]);

  const chartData = [
    { name: 'Mon', val: 400 }, { name: 'Tue', val: 700 }, { name: 'Wed', val: 500 },
    { name: 'Thu', val: 800 }, { name: 'Fri', val: 1200 }, { name: 'Sat', val: 1000 },
    { name: 'Sun', val: 1400 }
  ];

  const limit = user?.dailyLimit || 12;
  const completed = (user as any)?.completedTasksToday || 3;
  const taskProgress = (completed / limit) * 100;

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24 px-4 scale-[0.98] lg:scale-100 origin-top">
      
      {/* Top Section - Multi-Column on PC */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Wallet & Actions - Spans more space on PC */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-8 bg-slate-950 p-8 md:p-12 rounded-[3rem] text-white relative overflow-hidden shadow-2xl border border-white/5"
        >
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-theme-primary/10 rounded-full blur-[100px] -mr-48 -mt-48" />
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between gap-12">
            <div className="flex-1 space-y-10">
               <div className="space-y-2">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Node Balance Matrix</p>
                  <div className="flex items-baseline space-x-3">
                     <span className="text-xl font-bold text-theme-primary opacity-60">PKR</span>
                     <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">{(user?.balance || 0).toLocaleString()}</h2>
                  </div>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Today Yield', val: `Rs. ${stats.today}`, color: 'text-emerald-400' },
                    { label: 'Cycle Earning', val: `Rs. ${stats.monthly.toLocaleString()}`, color: 'text-theme-primary' },
                    { label: 'Asset Withdrawn', val: `Rs. ${stats.totalWithdrawn.toLocaleString()}`, color: 'text-amber-400' },
                    { label: 'Affiliate Rev', val: `Rs. ${stats.referralEarn.toLocaleString()}`, color: 'text-indigo-400' }
                  ].map((s, i) => (
                    <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                       <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{s.label}</p>
                       <p className={`text-sm font-black ${s.color}`}>{s.val}</p>
                    </div>
                  ))}
               </div>
            </div>

            <div className="md:w-64 flex flex-col justify-end gap-3">
               <button onClick={() => navigate('/withdraw')} className="w-full py-5 themed-gradient text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-theme-primary/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center">
                 <ArrowDownToLine className="w-5 h-5 mr-3" /> Withdraw Funds
               </button>
               <button onClick={() => navigate('/upgrade')} className="w-full py-5 bg-white text-slate-950 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-slate-50 active:scale-95 transition-all flex items-center justify-center">
                 <Rocket className="w-5 h-5 mr-3 text-theme-primary" /> Boost Plan
               </button>
            </div>
          </div>
        </motion.div>

        {/* Attendance - Side column on PC */}
        <div className="lg:col-span-4 h-full flex flex-col">
          <DailyBonus />
        </div>
      </div>

      {/* Middle Section - Performance & Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Performance Chart - Large on PC */}
        <div className="lg:col-span-8 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
           <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2 text-theme-primary" /> Yield Performance
                </h3>
                <p className="text-[10px] text-gray-400 font-medium uppercase mt-1">Real-time network contribution audit</p>
              </div>
              <div className="flex items-center space-x-2 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                 <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                 <span className="text-[10px] font-black text-emerald-600 uppercase">+14.2% Growth</span>
              </div>
           </div>
           <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--theme-primary)" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="var(--theme-primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8' }} dy={10} />
                    <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', shadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
                    <Area type="monotone" dataKey="val" stroke="var(--theme-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Task Nodes Grid - Optimized for PC column */}
        <div className="lg:col-span-4 grid grid-cols-1 gap-4 h-full">
           <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-4 flex flex-col justify-between hover:border-theme-primary/30 transition-all">
              <div className="flex items-center justify-between">
                 <div className="w-10 h-10 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500"><Clock className="w-6 h-6" /></div>
                 <span className="text-[10px] font-black text-amber-500 bg-amber-50 px-2 py-1 rounded-lg uppercase">In Audit</span>
              </div>
              <div>
                 <h4 className="text-3xl font-black text-slate-900 leading-none mb-2">{stats.pendingTasks}</h4>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pending Validations</p>
              </div>
              <button onClick={() => navigate('/requests')} className="w-full py-3 bg-gray-50 text-slate-400 rounded-xl text-[9px] font-black uppercase hover:bg-slate-900 hover:text-white transition-all">View Audit Log</button>
           </div>

           <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-4 flex flex-col justify-between hover:border-theme-primary/30 transition-all">
              <div className="flex items-center justify-between">
                 <div className="w-10 h-10 bg-theme-secondary rounded-2xl flex items-center justify-center text-theme-primary"><Target className="w-6 h-6" /></div>
                 <span className="text-[10px] font-black text-theme-primary bg-theme-secondary px-2 py-1 rounded-lg uppercase">Daily Node</span>
              </div>
              <div>
                 <h4 className="text-3xl font-black text-slate-900 leading-none mb-2">{completed}/{limit}</h4>
                 <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mt-3">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${taskProgress}%` }} className="h-full bg-theme-primary" />
                 </div>
              </div>
              <button onClick={() => navigate('/tasks')} className="w-full py-3 themed-gradient text-white rounded-xl text-[9px] font-black uppercase shadow-lg active:scale-95 transition-all">Execute Assignments</button>
           </div>
        </div>
      </div>

      {/* Footer Meta Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {/* System Status Node */}
         <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-[2.5rem] flex items-center space-x-5">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-emerald-500">
               <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
               <p className="text-[10px] font-black text-emerald-700 uppercase">Network Secure</p>
               <p className="text-[8px] font-bold text-emerald-600/60 uppercase mt-1 tracking-widest">Global Hub Sync 100%</p>
            </div>
         </div>

         {/* Personnel Stat */}
         <div className="bg-slate-50 border border-slate-200 p-6 rounded-[2.5rem] flex items-center space-x-5 opacity-60">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-400">
               <Users className="w-7 h-7" />
            </div>
            <div>
               <p className="text-[10px] font-black text-slate-600 uppercase">Node Level: Active</p>
               <p className="text-[8px] font-bold text-slate-400 uppercase mt-1 tracking-widest">Personnel Verification OK</p>
            </div>
         </div>

         {/* Support Node */}
         <div onClick={() => navigate('/support')} className="bg-blue-50 border border-blue-100 p-6 rounded-[2.5rem] flex items-center justify-between cursor-pointer hover:bg-blue-100 transition-all group">
            <div className="flex items-center space-x-5">
               <div className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                  <Rocket className="w-7 h-7" />
               </div>
               <div>
                  <p className="text-[10px] font-black text-blue-700 uppercase">Need Support?</p>
                  <p className="text-[8px] font-bold text-blue-600/60 uppercase mt-1 tracking-widest">Connect to HQ Cluster</p>
               </div>
            </div>
            <ChevronRight className="w-5 h-5 text-blue-300" />
         </div>
      </div>
    </div>
  );
};

export default Dashboard;