import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Wallet, 
  ShieldCheck, 
  Users, 
  ChevronRight, 
  ArrowDownToLine,
  Rocket,
  BarChart3,
  TrendingUp,
  Clock,
  Target,
  Zap,
  Lock,
  ArrowRight,
  AlertCircle,
  FileText
} from 'lucide-react';
import { 
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  XAxis,
  CartesianGrid,
  YAxis
} from 'recharts';
import { useAuth } from '../../context/AuthContext';
import DailyBonus from '../../components/DailyBonus';
import Preloader from '../../components/Preloader';

const Dashboard: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeRequest, setActiveRequest] = useState<any>(null);

  useEffect(() => {
    if (user) {
      const requests = JSON.parse(localStorage.getItem('noor_plan_requests') || '[]');
      const userReq = requests.find((r: any) => r.userId === user.id);
      if (userReq) setActiveRequest(userReq);
    }
  }, [user]);

  const hasPlan = user?.currentPlan && user?.currentPlan !== 'None';

  const stats = useMemo(() => ({
    todayYield: hasPlan ? 680 : 0,
    monthlyTarget: hasPlan ? 18000 : 0,
    currentProgress: hasPlan ? 14400 : 0,
    totalWithdrawn: user?.totalWithdrawn || 0,
    referralEarnings: hasPlan ? 2400 : 0,
    pendingAudits: hasPlan ? 4 : 0
  }), [user, hasPlan]);

  const chartData = useMemo(() => [
    { name: 'Mon', yield: hasPlan ? 450 : 0 }, { name: 'Tue', yield: hasPlan ? 720 : 0 }, 
    { name: 'Wed', yield: hasPlan ? 580 : 0 }, { name: 'Thu', yield: hasPlan ? 840 : 0 }, 
    { name: 'Fri', yield: hasPlan ? 1100 : 0 }, { name: 'Sat', yield: hasPlan ? 950 : 0 },
    { name: 'Sun', yield: hasPlan ? 1320 : 0 }
  ], [hasPlan]);

  if (authLoading || !user) return <Preloader />;

  const dailyLimit = user.dailyLimit || 0;
  const completedToday = (user as any).completedTasksToday || 0;
  const progressPercent = dailyLimit > 0 ? (completedToday / dailyLimit) * 100 : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-4 pb-24 px-1 scale-[0.98] lg:scale-100 origin-top">
      <AnimatePresence>
        {activeRequest && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            className={`mx-1 p-4 rounded-[1.8rem] border flex items-center justify-between mb-2 shadow-sm ${
              activeRequest.status === 'Pending' ? 'bg-amber-50 border-amber-100 text-amber-800' :
              activeRequest.status === 'Approved' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' :
              'bg-rose-50 border-rose-100 text-rose-800'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-inner ${
                activeRequest.status === 'Pending' ? 'bg-amber-100' :
                activeRequest.status === 'Approved' ? 'bg-emerald-100' :
                'bg-rose-100'
              }`}>
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest">Earning Plan: {activeRequest.plan}</p>
                <p className="text-[8px] font-bold uppercase opacity-70">
                  Status: <span className="font-black underline">{activeRequest.status}</span>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-8 bg-slate-950 p-6 md:p-10 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl border border-white/5"
        >
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-theme-primary/10 rounded-full blur-[100px] -mr-32 -mt-32" />
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8">
            <div className="flex-1 space-y-8">
               <div>
                  <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.4em] mb-2">Total Wallet Balance</p>
                  <div className="flex items-baseline space-x-2">
                     <span className="text-sm font-bold text-theme-primary/50">PKR</span>
                     <h2 className="text-5xl font-black tracking-tighter leading-none">{(user.balance || 0).toLocaleString()}</h2>
                  </div>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: 'Today', val: `Rs. ${stats.todayYield}`, color: 'text-emerald-400', icon: Zap },
                    { label: 'Growth', val: hasPlan ? `${((stats.currentProgress/stats.monthlyTarget)*100).toFixed(0)}%` : '0%', color: 'text-theme-primary', icon: TrendingUp },
                    { label: 'Paid Out', val: `Rs. ${stats.totalWithdrawn.toLocaleString()}`, color: 'text-amber-400', icon: ArrowDownToLine },
                    { label: 'Referral', val: `Rs. ${stats.referralEarnings.toLocaleString()}`, color: 'text-indigo-400', icon: Users }
                  ].map((s, i) => (
                    <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                       <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center">
                         <s.icon className="w-2.5 h-2.5 mr-1.5" /> {s.label}
                       </p>
                       <p className={`text-[12px] font-black ${s.color}`}>{s.val}</p>
                    </div>
                  ))}
               </div>
            </div>

            <div className="md:w-52 flex flex-col justify-end gap-3">
               <button onClick={() => navigate('/withdraw')} className="w-full py-4 themed-gradient text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl active:scale-95 transition-all flex items-center justify-center">
                 Withdraw Now
               </button>
               {!hasPlan && (
                 <button onClick={() => navigate('/upgrade')} className="w-full py-4 bg-white text-slate-950 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-lg active:scale-95 transition-all flex items-center justify-center">
                   <Rocket className="w-4 h-4 mr-2 text-theme-primary" /> Upgrade Plan
                 </button>
               )}
            </div>
          </div>
        </motion.div>

        <div className="lg:col-span-4 h-full">
          <DailyBonus />
        </div>
      </div>

      {!hasPlan ? (
        <div className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col items-center text-center space-y-6 mx-1">
           <div className="w-20 h-20 bg-theme-secondary rounded-[2rem] flex items-center justify-center text-theme-primary shadow-inner">
             <Lock className="w-10 h-10" />
           </div>
           <div className="max-w-md">
             <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Activate Your Account</h3>
             <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2 leading-relaxed">
               Please select an earning plan to unlock your daily handwriting assignments and start receiving payments.
             </p>
           </div>
           <button onClick={() => navigate('/upgrade')} className="px-10 py-4 bg-slate-950 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl flex items-center group active:scale-95 transition-all">
             View Earning Packages <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
           </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
             <div className="flex items-center justify-between mb-10">
                <div>
                  <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-widest flex items-center">
                    <BarChart3 className="w-4.5 h-4.5 mr-2.5 text-theme-primary" /> Earning Summary
                  </h3>
                  <p className="text-[8px] text-gray-400 font-bold uppercase mt-1 tracking-widest">Platform Sync Active</p>
                </div>
             </div>
             <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="yieldGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--theme-primary)" stopOpacity={0.15}/>
                          <stop offset="95%" stopColor="var(--theme-primary)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 900, fill: '#94a3b8' }} dy={10} />
                      <YAxis hide />
                      <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', fontSize: '11px', fontWeight: 'bold' }} />
                      <Area type="monotone" dataKey="yield" stroke="var(--theme-primary)" strokeWidth={3} fillOpacity={1} fill="url(#yieldGrad)" />
                   </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>

          <div className="lg:col-span-4 grid grid-cols-1 gap-4 h-full">
             <div className="bg-white p-6 rounded-[2.2rem] border border-gray-100 shadow-sm flex flex-col justify-between group hover:border-theme-primary/20 transition-all">
                <div className="flex items-center justify-between">
                   <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500 shadow-inner"><Clock className="w-6 h-6" /></div>
                   <span className="text-[8px] font-black text-amber-600 bg-amber-50 px-2 py-1 rounded-lg uppercase border border-amber-100">Reviewing</span>
                </div>
                <div className="mt-4">
                   <h4 className="text-3xl font-black text-slate-900 leading-none">{stats.pendingAudits}</h4>
                   <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-2">Work Under Check</p>
                </div>
             </div>

             <div className="bg-white p-6 rounded-[2.2rem] border border-gray-100 shadow-sm flex flex-col justify-between group hover:border-theme-primary/20 transition-all">
                <div className="flex items-center justify-between">
                   <div className="w-10 h-10 bg-theme-secondary rounded-xl flex items-center justify-center text-theme-primary shadow-inner"><Target className="w-6 h-6" /></div>
                   <span className="text-[8px] font-black text-theme-primary bg-theme-secondary px-2 py-1 rounded-lg uppercase border border-theme-primary/10">Daily Target</span>
                </div>
                <div className="mt-4">
                   <h4 className="text-3xl font-black text-slate-900 leading-none">{completedToday}/{dailyLimit}</h4>
                   <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mt-3 shadow-inner">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} className="h-full bg-theme-primary" />
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-1">
         <div className="bg-emerald-50/50 border border-emerald-100 p-5 rounded-[2rem] flex items-center space-x-5">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-emerald-500 shrink-0">
               <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
               <p className="text-[10px] font-black text-emerald-800 uppercase leading-none">Safe Account</p>
               <p className="text-[8px] font-bold text-emerald-600/60 uppercase tracking-widest mt-2">End-to-End Secure</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;