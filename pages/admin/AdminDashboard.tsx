import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Users, 
  Banknote, 
  FileCheck, 
  LayoutDashboard,
  Clock,
  TrendingUp,
  Filter,
  ArrowUpRight,
  Activity,
  ShieldCheck,
  Zap,
  ArrowRight,
  Target,
  Rocket,
  ShieldAlert
} from 'lucide-react';
import { 
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar
} from 'recharts';
import { getAdminDashboardStats, getAuditAnalytics, getPlanRequests } from '../../api/controllers/adminController';
import { useSystem } from '../../context/SystemContext';
import Preloader from '../../components/Preloader';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { settings } = useSystem();
  const [stats, setStats] = useState<any>(null);
  const [pendingPlans, setPendingPlans] = useState(0);
  const [pendingWork, setPendingWork] = useState(0);
  const [timeRange, setTimeRange] = useState<'Today' | 'Yesterday' | 'Monthly'>('Today');

  const theme = settings.themes.find(t => t.id === settings.activeThemeId) || settings.themes[0];

  useEffect(() => {
    const syncMetrics = async () => {
      try {
        const [baseStats, requests, analytics] = await Promise.all([
          getAdminDashboardStats(),
          getPlanRequests(),
          getAuditAnalytics()
        ]);
        setStats(baseStats);
        setPendingPlans(requests.filter(r => r.status === 'Pending').length);
        setPendingWork(analytics.todayStats.pending);
      } catch (e) {
        console.error("Dashboard Sync Error", e);
      }
    };
    syncMetrics();
  }, []);

  const filteredData = useMemo(() => {
    if (!stats) return null;
    let multiplier = timeRange === 'Monthly' ? 30 : timeRange === 'Yesterday' ? 0.95 : 1;
    return {
      users: stats.totalUsers,
      earning: Math.floor((stats.totalEarning / 30) * multiplier),
      payouts: Math.floor(stats.todayPayouts * multiplier),
      chart: stats.growthData.map((d: any) => ({
        ...d,
        revenue: Math.floor(d.revenue * (multiplier / (timeRange === 'Monthly' ? 5 : 1))),
        load: Math.floor(d.revenue * 1.5)
      }))
    };
  }, [stats, timeRange]);

  if (!stats) return <Preloader />;

  const kpiData = [
    { label: 'Total Members', value: filteredData?.users.toLocaleString(), icon: Users, bg: 'bg-blue-50', color: '#3b82f6', link: '/admin/users' },
    { label: 'Tier Sales', value: `Rs. ${(filteredData?.earning / 1000).toFixed(1)}k`, icon: Banknote, bg: 'bg-emerald-50', color: '#10B981', link: '/admin/finance' },
    { label: 'Audit Queue', value: (pendingPlans + pendingWork).toString(), icon: ShieldAlert, bg: 'bg-rose-50', color: '#f43f5e', link: '/admin/reviews' },
    { label: 'Network Uptime', value: '99.9%', icon: Activity, bg: 'bg-indigo-50', color: '#6366f1', link: '/admin/reports' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-4 pb-20 px-1 scale-[0.98] lg:scale-100 origin-top">
      {/* Admin Header */}
      <div className="bg-slate-950 p-6 rounded-[2.5rem] text-white shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 mx-1 border border-white/5 relative overflow-hidden">
        <div className="bg-data-grid absolute inset-0 opacity-10" />
        <div className="flex items-center space-x-5 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl">
            <LayoutDashboard className="w-7 h-7 text-theme-primary animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-black uppercase tracking-tight leading-none">Control Center</h1>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.4em] mt-2">Platform Management v4.5 • {timeRange} View</p>
          </div>
        </div>

        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 relative z-10">
          {['Today', 'Yesterday', 'Monthly'].map(r => (
            <button key={r} onClick={() => setTimeRange(r as any)} className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase transition-all whitespace-nowrap ${timeRange === r ? 'bg-white text-slate-950 shadow-xl' : 'text-slate-500 hover:text-white'}`}>{r}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-1">
        {kpiData.map((item, idx) => (
          <motion.div 
            key={idx} onClick={() => navigate(item.link)} 
            whileHover={{ y: -3 }}
            className="bg-white p-4 rounded-[1.8rem] border border-gray-100 shadow-sm cursor-pointer active:scale-95 group transition-all"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 shadow-inner ${item.bg}`} style={{ color: item.color }}><item.icon className="w-5 h-5" /></div>
            <div className="space-y-0.5">
               <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{item.label}</p>
               <h3 className="text-xl font-black text-slate-900 tracking-tighter">{item.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-1">
        <div className="lg:col-span-8 space-y-4">
           <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-10">
                 <div className="flex items-center space-x-3">
                    <TrendingUp className="w-5 h-5 text-theme-primary" />
                    <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">Revenue Flow Analytics</h3>
                 </div>
                 <div className="text-[9px] font-black text-emerald-500 bg-emerald-50 px-3 py-1.5 rounded-xl uppercase">+18.4% Growth</div>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={filteredData?.chart}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={theme.primary} stopOpacity={0.15}/><stop offset="95%" stopColor={theme.primary} stopOpacity={0}/></linearGradient>
                      <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/></linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} dy={10} />
                    <YAxis hide />
                    <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', fontWeight: 900, backgroundColor: '#0f172a', color: '#fff', fontSize: '11px' }} />
                    <Area type="monotone" dataKey="revenue" stroke={theme.primary} strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                    <Area type="monotone" dataKey="load" stroke="#6366f1" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorLoad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
           </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
           <div className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden h-full flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-theme-primary/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                 <History className="w-8 h-8 text-theme-primary mb-6" />
                 <h4 className="text-2xl font-black uppercase leading-tight tracking-tighter">System Activity <br/>History</h4>
                 <div className="mt-8 space-y-5">
                    {[
                      { user: 'Omar K.', type: 'Disbursal', val: '4,500', status: 'OK' },
                      { user: 'Sana A.', type: 'Tier Up', val: 'Gold', status: 'OK' },
                      { user: 'Zaid M.', type: 'Work Audit', val: 'Approved', status: 'OK' }
                    ].map((h, i) => (
                      <div key={i} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0">
                         <div>
                            <p className="text-[10px] font-black text-white uppercase leading-none mb-1">{h.user}</p>
                            <p className="text-[7px] font-bold text-slate-500 uppercase tracking-widest">{h.type}</p>
                         </div>
                         <div className="text-right">
                            <p className="text-[10px] font-black text-theme-primary leading-none mb-1">{h.val}</p>
                            <p className="text-[6px] font-black text-emerald-500 uppercase">{h.status}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
              <Link to="/admin/audit" className="relative z-10 pt-8 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-theme-primary hover:text-white transition-colors">
                 <span>System Logs</span>
                 <ArrowRight className="w-5 h-5" />
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;