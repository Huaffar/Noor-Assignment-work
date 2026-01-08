
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Clock, 
  Banknote, 
  ShieldCheck, 
  ArrowUpRight,
  TrendingUp,
  Activity,
  Calendar,
  Layers,
  PieChart as PieIcon
} from 'lucide-react';
import { 
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  CartesianGrid
} from 'recharts';
import { getAdminDashboardStats } from '../../api/controllers/adminController';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    getAdminDashboardStats().then(data => setStats(data));
  }, []);

  if (!stats) return <div className="p-10 text-center font-black text-[10px] text-gray-400 uppercase tracking-widest">Initialising Command Center...</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-4 pb-20 px-1">
      {/* Visual Header */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center text-rose-500 shadow-xl shadow-rose-900/20 border border-slate-800">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-900 leading-none">Command Overview</h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Real-time Node Monitoring</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center space-x-2 bg-white px-3 py-1.5 rounded-xl border border-gray-100 shadow-sm">
          <Calendar className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[10px] font-black text-gray-600 uppercase tracking-tighter">OCT 25, 2023 - Live Feed</span>
        </div>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Platform Revenue', value: 'PKR 742k', icon: Banknote, trend: '+12.4%', color: 'rose' },
          { label: 'Active Personnel', value: '15.2k', icon: Users, trend: '+450 today', color: 'blue' },
          { label: 'Awaiting Audit', value: '148 Tasks', icon: Clock, trend: 'High Volume', color: 'amber' },
          { label: 'Node Health', value: '99.9%', icon: ShieldCheck, trend: 'Optimal', color: 'emerald' }
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group"
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-3 bg-${item.color}-50 text-${item.color}-600`}>
              <item.icon className="w-4 h-4" />
            </div>
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1.5">{item.label}</p>
            <h3 className="text-lg font-black text-gray-900 leading-none">{item.value}</h3>
            <p className={`text-[8px] font-black uppercase mt-2 ${item.color === 'rose' || item.color === 'blue' ? 'text-emerald-500' : 'text-gray-400'}`}>
              {item.trend}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Area Chart */}
        <div className="lg:col-span-2 bg-slate-950 p-6 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/10 rounded-full blur-[80px] -mr-32 -mt-32" />
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-rose-500">Revenue Yield</h3>
              <p className="text-[10px] text-slate-500 font-bold mt-1">Daily platform income over last 7 sessions</p>
            </div>
            <div className="flex items-center space-x-1 bg-white/5 px-3 py-1 rounded-lg border border-white/10">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[10px] font-black text-white">+18.2%</span>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.revenueHistory}>
                <defs>
                  <linearGradient id="adminChart" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e11d48" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#e11d48" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 8, fill: '#64748b', fontWeight: 900}} 
                  dy={10}
                  tickFormatter={(val) => val.split('-')[2]}
                />
                <YAxis hide domain={['auto', 'auto']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', fontSize: '10px', fontWeight: 900, color: '#fff' }}
                  itemStyle={{ color: '#e11d48' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#e11d48" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#adminChart)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Distribution Pie Chart */}
        <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center justify-center">
          <div className="w-full mb-6">
            <h3 className="text-[9px] font-black text-gray-400 uppercase tracking-widest text-center">User Classification</h3>
          </div>
          <div className="h-48 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.userDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {stats.userDistribution.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '10px', fontWeight: 900 }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-lg font-black text-gray-900 leading-none">12.5k</p>
              <p className="text-[7px] font-black text-gray-400 uppercase">Total</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 w-full mt-6">
            {stats.userDistribution.map((item: any) => (
              <div key={item.name} className="text-center">
                <div className="w-2 h-2 rounded-full mx-auto mb-1" style={{ backgroundColor: item.color }} />
                <p className="text-[8px] font-black text-gray-400 uppercase">{item.name}</p>
                <p className="text-[10px] font-black text-gray-900">{((item.value / 12500) * 100).toFixed(0)}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Task Traffic Bar Chart */}
        <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Assignment Flow</h3>
            <Layers className="w-4 h-4 text-rose-500" />
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Mon', sub: 400, app: 240 },
                { name: 'Tue', sub: 300, app: 139 },
                { name: 'Wed', sub: 200, app: 980 },
                { name: 'Thu', sub: 278, app: 390 },
                { name: 'Fri', sub: 189, app: 480 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 900, fill: '#94a3b8'}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '10px', border: 'none', fontSize: '10px', fontWeight: 900 }} />
                <Bar dataKey="sub" fill="#e11d48" radius={[4, 4, 0, 0]} barSize={12} />
                <Bar dataKey="app" fill="#0f172a" radius={[4, 4, 0, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Audit Activity Feed */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Audit Logs</h3>
            <button className="text-[8px] font-black text-rose-600 uppercase hover:underline">Full Trace</button>
          </div>
          <div className="flex-grow p-4 space-y-3">
             {[
               { icon: ShieldCheck, title: "Withdrawal Cleared", user: "Zaid Khan", time: "2m ago", color: "emerald" },
               { icon: Activity, title: "New Assignment Live", user: "Admin", time: "15m ago", color: "blue" },
               { icon: PieIcon, title: "Plan Purchase Approved", user: "Fatima Ali", time: "1h ago", color: "rose" }
             ].map((log, lIdx) => (
               <div key={lIdx} className="flex items-center space-x-3 group cursor-default">
                  <div className={`w-8 h-8 rounded-xl bg-${log.color}-50 text-${log.color}-600 flex items-center justify-center shrink-0`}>
                    <log.icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-grow">
                    <p className="text-[11px] font-black text-gray-900 truncate leading-none mb-1">{log.title}</p>
                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">{log.user} • {log.time}</p>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-200 group-hover:text-rose-600 transition-colors" />
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
