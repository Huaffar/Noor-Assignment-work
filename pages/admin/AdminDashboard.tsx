import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Users, 
  Banknote, 
  FileCheck, 
  LayoutDashboard,
  Clock,
  CreditCard,
  Briefcase,
  TrendingUp,
  UserPlus,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { 
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { getAdminDashboardStats, getAuditAnalytics, getPlanRequests } from '../../api/controllers/adminController';
import { useSystem } from '../../context/SystemContext';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { settings } = useSystem();
  const [stats, setStats] = useState<any>(null);
  const [pendingPlans, setPendingPlans] = useState(0);
  const [pendingWork, setPendingWork] = useState(0);
  const [timeRange, setTimeRange] = useState<'Today' | 'Yesterday' | 'Monthly' | 'Select Wise'>('Today');

  const theme = settings.themes.find(t => t.id === settings.activeThemeId) || settings.themes[0];

  useEffect(() => {
    const syncNodeMetrics = async () => {
      const [baseStats, requests, analytics] = await Promise.all([
        getAdminDashboardStats(),
        getPlanRequests(),
        getAuditAnalytics()
      ]);
      
      setStats(baseStats);
      setPendingPlans(requests.filter(r => r.status === 'Pending').length);
      setPendingWork(analytics.todayStats.pending);
    };
    
    syncNodeMetrics();
  }, []);

  const filteredData = useMemo(() => {
    if (!stats) return null;
    let multiplier = 1;
    switch(timeRange) {
      case 'Yesterday': multiplier = 0.95; break;
      case 'Monthly': multiplier = 30; break;
      case 'Select Wise': multiplier = 7; break;
      default: multiplier = 1;
    }
    
    return {
      users: stats.totalUsers,
      earning: Math.floor((stats.totalEarning / 30) * multiplier),
      payouts: Math.floor(stats.todayPayouts * multiplier),
      nodes: stats.activeNodes,
      chart: stats.growthData.map((d: any) => ({
        ...d,
        revenue: Math.floor(d.revenue * (multiplier / (timeRange === 'Monthly' ? 5 : 1)))
      }))
    };
  }, [stats, timeRange]);

  if (!stats) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
      <div className="w-10 h-10 border-2 border-theme-secondary border-t-theme-primary rounded-full animate-spin" />
      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Loading Manager...</p>
    </div>
  );

  const kpiData = [
    { label: 'Total Members', value: filteredData?.users.toLocaleString(), icon: Users, color: '#f472b6', bg: 'bg-pink-50', link: '/admin/users' },
    { label: 'New Signups', value: timeRange === 'Today' ? '+14' : '+12', icon: UserPlus, color: '#0ea5e9', bg: 'bg-sky-50', link: '/admin/users' },
    { label: 'Plan Requests', value: pendingPlans.toLocaleString(), icon: Clock, color: '#6366f1', bg: 'bg-indigo-50', link: '/admin/plan-requests' },
    { label: 'Pending Review', value: pendingWork.toLocaleString(), icon: FileCheck, color: '#f59e0b', bg: 'bg-amber-50', link: '/admin/reviews' },
    { label: 'Total Revenue', value: `Rs. ${(filteredData?.earning / 1000).toFixed(1)}k`, icon: Banknote, color: '#10B981', bg: 'bg-emerald-50', link: '/admin/finance' },
    { label: 'Total Paid Out', value: `Rs. ${filteredData?.payouts.toLocaleString()}`, icon: CreditCard, color: '#e11d48', bg: 'bg-rose-50', link: '/admin/withdrawals' },
    { label: 'Active Jobs', value: '48 Tasks', icon: Briefcase, color: '#8b5cf6', bg: 'bg-violet-50', link: '/admin/work' },
    { label: 'System Health', value: '96.4%', icon: TrendingUp, color: '#14b8a6', bg: 'bg-teal-50', link: '/admin/reviews' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-4 pb-20 px-1">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 themed-card p-4 rounded-xl shadow-sm border border-gray-100 mx-1">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-slate-900 text-white">
            <LayoutDashboard className="w-5 h-5 text-theme-primary" />
          </div>
          <div>
            <h1 className="text-sm font-black text-slate-900 uppercase">Admin Dashboard</h1>
            <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">Status: {timeRange}</p>
          </div>
        </div>

        <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-100 overflow-x-auto no-scrollbar">
          {['Today', 'Yesterday', 'Monthly', 'Select Wise'].map(r => (
            <button key={r} onClick={() => setTimeRange(r as any)} className={`px-4 py-1.5 rounded-md text-[8px] font-black uppercase transition-all whitespace-nowrap ${timeRange === r ? 'bg-slate-950 text-white shadow-md' : 'text-gray-400'}`}>{r}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-1">
        {kpiData.map((item, idx) => (
          <motion.div key={idx} layout onClick={() => navigate(item.link)} className="bg-white p-3 rounded-2xl relative overflow-hidden group cursor-pointer active:scale-95 shadow-sm border border-gray-50">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center mb-2 shadow-inner ${item.bg}`} style={{ color: item.color }}><item.icon className="w-3.5 h-3.5" /></div>
            <p className="text-[7px] font-black text-gray-400 uppercase mb-1 leading-none">{item.label}</p>
            <h3 className="text-sm font-black text-slate-900 leading-none">{item.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-1">
        <div className="lg:col-span-8 themed-card p-5 rounded-2xl shadow-sm">
          <h3 className="text-[9px] font-black text-slate-900 uppercase tracking-widest mb-6">Income Report</h3>
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredData?.chart}>
                <defs><linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={theme.primary} stopOpacity={0.1}/><stop offset="95%" stopColor={theme.primary} stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 8, fontWeight: 800 }} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', fontSize: '9px', fontWeight: 900, backgroundColor: '#0f172a', color: '#fff' }} />
                <Area type="monotone" dataKey="revenue" stroke={theme.primary} strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-3">
           <Link to="/admin/reports" className="bg-slate-950 p-6 rounded-2xl block text-white shadow-2xl relative overflow-hidden group">
              <TrendingUp className="w-6 h-6 text-theme-primary mb-4" />
              <h4 className="text-lg font-black uppercase leading-tight">Advanced Reports</h4>
              <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-2">See full payment history</p>
           </Link>

           <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <h3 className="text-[9px] font-black text-slate-900 uppercase border-b border-gray-50 pb-2">Recent Activity</h3>
              <div className="space-y-3">
                 {[
                   { user: 'Zaid K.', action: 'Withdrawal', val: 'Rs. 4500' },
                   { user: 'Sara M.', action: 'Plan Buy', val: 'Gold' },
                   { user: 'Ali R.', action: 'Audit', val: 'Paid' },
                 ].map((act, i) => (
                   <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                         <div className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center font-black text-[8px] text-gray-400">{act.user[0]}</div>
                         <div>
                            <p className="text-[9px] font-black text-slate-900 leading-none">{act.user}</p>
                            <p className="text-[7px] font-bold text-gray-400 uppercase mt-0.5">{act.action}</p>
                         </div>
                      </div>
                      <span className="text-[9px] font-black text-slate-700">{act.val}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;