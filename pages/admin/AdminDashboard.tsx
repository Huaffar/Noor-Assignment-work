
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

  if (!stats) return <div className="p-10 text-center font-black text-[9px] text-gray-400 uppercase tracking-widest">Initialising Node...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-2.5 pb-20 px-1">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center shadow-lg border border-slate-800 bg-slate-900 text-rose-500">
            <Activity className="w-3.5 h-3.5" />
          </div>
          <div>
            <h1 className="text-sm font-black text-gray-900 leading-none uppercase tracking-tight">Command Center</h1>
            <p className="text-[7px] text-gray-400 font-bold uppercase mt-0.5">Real-time Traffic</p>
          </div>
        </div>
        <div className="bg-white px-2 py-1 rounded-lg border border-gray-100 flex items-center space-x-1 shadow-sm">
          <Calendar className="w-2.5 h-2.5 text-gray-400" />
          <span className="text-[7px] font-black text-gray-500 uppercase">Live Audit</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {[
          { label: 'Revenue', value: 'Rs. 742k', icon: Banknote, trend: '+12.4%', color: 'var(--theme-primary)' },
          { label: 'Personnel', value: '15.2k', icon: Users, trend: '+450 today', color: '#2563EB' },
          { label: 'Pending', value: '148', icon: Clock, trend: 'High Vol', color: '#D97706' },
          { label: 'Node', value: '99.9%', icon: ShieldCheck, trend: 'Optimal', color: '#10B981' }
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-2.5 rounded-xl border border-gray-100 shadow-sm group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${item.color}10`, color: item.color }}>
                <item.icon className="w-3 h-3" />
              </div>
              <span className="text-[6px] font-black uppercase text-emerald-500">{item.trend}</span>
            </div>
            <p className="text-[7px] font-black text-gray-400 uppercase leading-none mb-0.5">{item.label}</p>
            <h3 className="text-xs font-black text-gray-900 leading-none">{item.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5">
        <div className="lg:col-span-2 bg-slate-950 p-4 rounded-2xl text-white relative overflow-hidden h-[240px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[8px] font-black uppercase tracking-widest text-rose-500">Revenue Yield</h3>
            <div className="bg-white/5 px-1.5 py-0.5 rounded text-[6px] font-black">+18.2%</div>
          </div>
          <div className="h-[170px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.revenueHistory}>
                <defs>
                  <linearGradient id="adminChart" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--theme-primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--theme-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 6, fill: '#64748b'}} dy={5} tickFormatter={(val) => val.split('-')[2]} />
                <YAxis hide />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '4px', fontSize: '7px' }} />
                <Area type="monotone" dataKey="amount" stroke="var(--theme-primary)" strokeWidth={1.5} fill="url(#adminChart)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
          <h3 className="text-[7px] font-black text-gray-400 uppercase mb-4">Classification</h3>
          <div className="h-32 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={stats.userDistribution} cx="50%" cy="50%" innerRadius={35} outerRadius={45} paddingAngle={5} dataKey="value">
                  {stats.userDistribution.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? 'var(--theme-primary)' : entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-xs font-black text-gray-900">12.5k</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1 w-full mt-4">
            {stats.userDistribution.map((item: any, index: number) => (
              <div key={item.name} className="text-center">
                <div className="w-1 h-1 rounded-full mx-auto mb-0.5" style={{ backgroundColor: index === 0 ? 'var(--theme-primary)' : item.color }} />
                <p className="text-[6px] font-black text-gray-400 uppercase truncate">{item.name}</p>
                <p className="text-[7px] font-black">{((item.value / 12500) * 100).toFixed(0)}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
