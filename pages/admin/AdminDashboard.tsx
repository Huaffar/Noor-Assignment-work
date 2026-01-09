import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Users, 
  Banknote, 
  Zap,
  MousePointer2,
  FileCheck,
  Signal,
  ArrowUpRight,
  Loader2,
  LayoutDashboard,
  Clock,
  CreditCard,
  Filter
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

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);
  const [pendingPlans, setPendingPlans] = useState(0);
  const [pendingWork, setPendingWork] = useState(0);
  const [timeRange, setTimeRange] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');

  useEffect(() => {
    const syncNodeMetrics = async () => {
      // Faster, parallel execution
      const [baseStats, requests, analytics] = await Promise.all([
        getAdminDashboardStats(),
        getPlanRequests(),
        getAuditAnalytics()
      ]);
      
      setStats(baseStats);
      // Link precisely to current data state
      setPendingPlans(requests.filter(r => r.status === 'Pending').length);
      setPendingWork(analytics.todayStats.pending);
    };
    
    syncNodeMetrics();
  }, []);

  const filteredData = useMemo(() => {
    if (!stats) return null;
    const multi = timeRange === 'Daily' ? 1 : timeRange === 'Weekly' ? 7 : 30;
    return {
      users: stats.totalUsers, // Absolutely correct length from controller
      earning: Math.floor(stats.totalEarning / 30 * multi),
      payouts: Math.floor(stats.todayPayouts * multi),
      nodes: stats.activeNodes,
      chart: stats.growthData.map((d: any) => ({
        ...d,
        revenue: Math.floor(d.revenue * (multi / 30))
      }))
    };
  }, [stats, timeRange]);

  if (!stats) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-rose-100 border-t-rose-600 rounded-full animate-spin" />
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Synchronizing Hub Metrics...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-4 pb-20 px-1 scale-[0.98] origin-top">
      {/* Platform Status Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-3 rounded-[1.5rem] border border-pink-50 shadow-sm mx-1">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-slate-950 text-pink-500 shadow-md">
            <LayoutDashboard className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-xs font-black text-slate-900 uppercase leading-none">Global Hub Control</h1>
            <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest mt-1">Network Personnel: {filteredData?.users} Active Nodes</p>
          </div>
        </div>

        <div className="flex bg-gray-100 p-0.5 rounded-lg border border-gray-200">
          {['Daily', 'Weekly', 'Monthly'].map(r => (
            <button 
              key={r} onClick={() => setTimeRange(r as any)}
              className={`px-3 py-1.5 rounded-md text-[8px] font-black uppercase transition-all ${
                timeRange === r ? 'bg-white text-pink-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Real-time KPI Cluster */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 px-1">
        {[
          { label: 'Personnel Ledger', value: filteredData?.users.toLocaleString(), icon: Users, color: '#f472b6', bg: 'bg-pink-50', link: '/admin/users' },
          { label: 'Pending Requests', value: pendingPlans.toLocaleString(), icon: Clock, color: '#6366f1', bg: 'bg-indigo-50', link: '/admin/plan-requests' },
          { label: 'Aggregate Rev', value: `Rs. ${(filteredData?.earning / 1000).toFixed(1)}k`, icon: Banknote, color: '#10B981', bg: 'bg-emerald-50', link: '/admin/finance' },
          { label: 'Pending Audits', value: pendingWork.toLocaleString(), icon: Zap, color: '#f59e0b', bg: 'bg-amber-50', link: '/admin/reviews' }
        ].map((item, idx) => (
          <motion.div 
            key={idx + timeRange} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
            onClick={() => navigate(item.link)}
            className="bg-white p-4 rounded-[1.8rem] border border-pink-50 shadow-sm relative overflow-hidden group cursor-pointer active:scale-95"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 shadow-inner ${item.bg}`} style={{ color: item.color }}>
              <item.icon className="w-4 h-4" />
            </div>
            <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
            <h3 className="text-base font-black text-slate-900 leading-none">{item.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 px-1">
        {/* Main Growth Lattice */}
        <div className="lg:col-span-9 bg-white p-5 rounded-[2.2rem] border border-pink-50 shadow-sm">
          <div className="flex items-center justify-between mb-6">
             <div>
                <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Throughput Matrix</h3>
                <p className="text-[7px] font-bold text-slate-400 uppercase mt-0.5">Real-time Platform Logic Trace</p>
             </div>
             <div className="px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100 flex items-center space-x-1 animate-pulse">
               <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
               <span className="text-[7px] font-black text-emerald-600 uppercase tracking-widest">Live Flow</span>
             </div>
          </div>
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredData?.chart}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f472b6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#f472b6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#fdf2f8" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 7, fontWeight: 800 }} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', fontSize: '8px', fontWeight: 900, backgroundColor: '#0f172a', color: '#fff' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#f472b6" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dynamic Rapid Actions */}
        <div className="lg:col-span-3 space-y-3">
           <Link to="/admin/reviews" className="bg-white border border-pink-50 p-4 rounded-[1.8rem] block group shadow-sm active:scale-95 relative overflow-hidden">
              {pendingWork > 0 && (
                <div className="absolute top-3 right-3 w-4.5 h-4.5 bg-rose-500 text-white rounded-full flex items-center justify-center text-[8px] font-black animate-pulse shadow-lg border-2 border-white">
                  {pendingWork}
                </div>
              )}
              <div className="flex items-center justify-between mb-3">
                 <div className="w-8 h-8 rounded-lg bg-pink-500 text-white flex items-center justify-center shadow-lg">
                    <FileCheck className="w-4 h-4" />
                 </div>
                 <ArrowUpRight className="w-4 h-4 text-slate-200" />
              </div>
              <p className="text-[7px] font-black text-slate-400 uppercase leading-none mb-1">Logic Review</p>
              <h4 className="text-sm font-black text-slate-900 leading-none">WORK AUDIT</h4>
           </Link>

           <Link to="/admin/plan-requests" className="bg-white border border-pink-50 p-4 rounded-[1.8rem] block group shadow-sm active:scale-95 relative overflow-hidden">
              {pendingPlans > 0 && (
                <div className="absolute top-3 right-3 w-4.5 h-4.5 bg-rose-500 text-white rounded-full flex items-center justify-center text-[8px] font-black animate-pulse shadow-lg border-2 border-white">
                  {pendingPlans}
                </div>
              )}
              <div className="flex items-center justify-between mb-3">
                 <div className="w-8 h-8 rounded-lg bg-indigo-500 text-white flex items-center justify-center shadow-lg">
                    <Zap className="w-4 h-4" />
                 </div>
                 <ArrowUpRight className="w-4 h-4 text-slate-200" />
              </div>
              <p className="text-[7px] font-black text-slate-400 uppercase leading-none mb-1">Node Activation</p>
              <h4 className="text-sm font-black text-slate-900 leading-none">PLAN QUEUE</h4>
           </Link>
           
           <div className="bg-slate-950 p-4 rounded-[1.8rem] text-center border border-slate-800 shadow-xl">
              <div className="flex items-center justify-center space-x-1.5 mb-2 text-emerald-400">
                 <Signal className="w-3 h-3 animate-pulse" />
                 <span className="text-[8px] font-black uppercase">Core Uptime: {stats.uptime}</span>
              </div>
              <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-pink-500 w-[99.9%] rounded-full shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;