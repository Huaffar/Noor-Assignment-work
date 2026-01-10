import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  FileCheck, 
  Download, 
  Search, 
  Activity,
  History,
  TrendingUp,
  Layers,
  ArrowDownToLine,
  Zap,
  Globe,
  Clock
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

const AdminReports: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState<'Today' | 'Yesterday' | 'Monthly'>('Today');
  const [activeCategory, setActiveCategory] = useState<'All' | 'Withdrawal' | 'Task Buy'>('All');

  const chartData = [
    { time: '08:00', val: 8000 },
    { time: '10:00', val: 12000 },
    { time: '12:00', val: 18000 },
    { time: '14:00', val: 14000 },
    { time: '16:00', val: 22000 },
    { time: '18:00', val: 31000 },
    { time: '20:00', val: 28000 },
  ];

  const reportLogs = [
    { id: 'LOG-88', user: 'Zaid K.', action: 'Plan Buy', val: '+Rs. 3500', time: '10:45 AM', status: 'Success' },
    { id: 'LOG-89', user: 'Sara A.', action: 'Audit', val: '-Rs. 240', time: '11:20 AM', status: 'Verified' },
    { id: 'LOG-90', user: 'Ali R.', action: 'Payout', val: '-Rs. 4500', time: 'Just now', status: 'Pending' },
    { id: 'LOG-91', user: 'Fatima Q.', action: 'Audit', val: '-Rs. 150', time: '3h ago', status: 'Verified' },
    { id: 'LOG-92', user: 'Ahmed S.', action: 'Plan Buy', val: '+Rs. 500', time: '5h ago', status: 'Success' },
  ];

  return (
    <div className="max-w-7xl mx-auto pb-32 space-y-3 px-1 scale-[0.98] origin-top">
      {/* Precision Header */}
      <div className="bg-slate-950 p-4 rounded-2xl text-white shadow-2xl relative overflow-hidden mx-1 border border-white/5">
        <div className="bg-data-grid absolute inset-0 opacity-5" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
           <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
                 <BarChart3 className="w-5 h-5 text-theme-primary" />
              </div>
              <div>
                 <h1 className="text-[13px] font-black uppercase tracking-tight leading-none">Intelligence Hub</h1>
                 <p className="text-[7px] text-slate-500 font-bold uppercase tracking-[0.3em] mt-1.5">Kernel Filter: {timeFilter} Logic</p>
              </div>
           </div>
           
           <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/5">
              {['Today', 'Yesterday', 'Monthly'].map(f => (
                <button key={f} onClick={() => setTimeFilter(f as any)} className={`px-3 py-1.5 rounded-lg text-[7px] font-black uppercase transition-all ${timeFilter === f ? 'bg-white text-slate-950 shadow-md' : 'text-slate-500'}`}>{f}</button>
              ))}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 px-1">
        {/* Main Intelligence Cluster */}
        <div className="lg:col-span-8 space-y-3">
           {/* Chart Pulse */}
           <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-start mb-6">
                 <div>
                    <h3 className="text-[10px] font-black text-slate-900 uppercase">System Pulse</h3>
                    <p className="text-[7px] font-bold text-gray-400 uppercase tracking-widest mt-1">Throughput Analytics</p>
                 </div>
                 <div className="flex items-center space-x-1.5 px-2 py-1 bg-emerald-50 rounded-lg">
                    <TrendingUp className="w-3 h-3 text-emerald-500" />
                    <span className="text-[8px] font-black text-emerald-600 uppercase">+12.4%</span>
                 </div>
              </div>
              <div className="h-40 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                       <defs>
                          <linearGradient id="colorPulse" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                             <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 7, fontWeight: 900, fill: '#94a3b8' }} />
                       <YAxis hide />
                       <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', fontSize: '9px', fontWeight: 900, backgroundColor: '#0f172a', color: '#fff' }} />
                       <Area type="monotone" dataKey="val" stroke="#0ea5e9" strokeWidth={2} fillOpacity={1} fill="url(#colorPulse)" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>

           {/* High-Density Today Logic Ledger */}
           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-3.5 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                 <div className="flex items-center space-x-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <h3 className="text-[9px] font-black text-slate-900 uppercase">Live Audit Stream</h3>
                 </div>
                 <div className="flex items-center gap-2">
                    <Search className="w-3 h-3 text-gray-300" />
                    <span className="text-[7px] font-black text-gray-400 uppercase">SECURE_SYNC_OK</span>
                 </div>
              </div>
              <div className="overflow-x-auto no-scrollbar">
                 <table className="w-full text-left">
                    <tbody className="divide-y divide-gray-50">
                       {reportLogs.map(log => (
                         <tr key={log.id} className="hover:bg-theme-secondary/10 transition-colors group cursor-pointer">
                            <td className="px-4 py-2.5">
                               <p className="text-[9px] font-black text-slate-900 uppercase leading-none">{log.user}</p>
                               <p className="text-[6px] font-bold text-gray-300 uppercase mt-1 tracking-tighter">{log.action}</p>
                            </td>
                            <td className="px-4 py-2.5">
                               <div className={`inline-flex items-center px-1.5 py-0.5 rounded text-[5px] font-black uppercase border ${log.status === 'Success' || log.status === 'Verified' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                                  {log.status}
                               </div>
                            </td>
                            <td className="px-4 py-2.5 text-right">
                               <p className={`text-[9px] font-black ${log.val.startsWith('+') ? 'text-emerald-600' : 'text-slate-900'}`}>{log.val}</p>
                               <p className="text-[6px] font-bold text-gray-300 uppercase tracking-tighter">{log.time}</p>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
              <div className="p-3 bg-gray-50/50 border-t border-gray-50 text-center">
                 <button className="text-[7px] font-black text-gray-400 uppercase tracking-widest hover:text-theme-primary">Download Full Logic Trace</button>
              </div>
           </div>
        </div>

        {/* Side Metrics Cluster */}
        <div className="lg:col-span-4 space-y-3">
           <div className="bg-slate-900 p-5 rounded-2xl text-white shadow-xl relative overflow-hidden border border-white/5">
              <Activity className="w-6 h-6 text-theme-primary mb-3" />
              <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest mb-1">Today Revenue</p>
              <h2 className="text-2xl font-black tracking-tighter">Rs. 84,200</h2>
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                 <div>
                    <p className="text-[6px] font-black text-slate-500 uppercase">Payouts</p>
                    <p className="text-xs font-black text-rose-400">Rs. 14.5k</p>
                 </div>
                 <div className="text-right">
                    <p className="text-[6px] font-black text-slate-500 uppercase">Retention</p>
                    <p className="text-xs font-black text-emerald-400">92.4%</p>
                 </div>
              </div>
           </div>

           <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <h3 className="text-[9px] font-black text-slate-900 uppercase">Cluster Status</h3>
              <div className="space-y-3">
                 {[
                   { label: 'Active Personnel', val: '15k+', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
                   { label: 'Verified Nodes', val: '84%', icon: Globe, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                   { label: 'Wait List', val: '124', icon: History, color: 'text-amber-500', bg: 'bg-amber-50' }
                 ].map((stat, i) => (
                   <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                         <div className={`w-8 h-8 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center shadow-inner`}><stat.icon className="w-4 h-4" /></div>
                         <div>
                            <p className="text-[9px] font-black text-slate-900 leading-none">{stat.val}</p>
                            <p className="text-[6px] font-bold text-gray-400 uppercase tracking-tighter">{stat.label}</p>
                         </div>
                      </div>
                      <ArrowDownToLine className="w-3 h-3 text-gray-200" />
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
