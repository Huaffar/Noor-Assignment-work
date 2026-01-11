
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
  Clock,
  Filter,
  CheckCircle2
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
  
  // Real-time Intelligence Mock
  const reportStats = useMemo(() => [
    { label: 'Network Personnel', val: '15,420', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Verified Hubs', val: '84%', icon: Globe, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Work Requests', val: '124', icon: History, color: 'text-amber-500', bg: 'bg-amber-50' }
  ], []);

  const pulseData = [
    { time: '08:00', load: 8000 },
    { time: '10:00', load: 12000 },
    { time: '12:00', load: 18000 },
    { time: '14:00', load: 14000 },
    { time: '16:00', load: 22000 },
    { time: '18:00', load: 31000 },
    { time: '20:00', load: 28000 },
  ];

  const traceLogs = [
    { id: 'LOG-88', user: 'Zaid K.', action: 'Tier Activation', val: '+3.5k', time: '10:45 AM', status: 'Settled' },
    { id: 'LOG-89', user: 'Sara A.', action: 'Handwritten Audit', val: '-240', time: '11:20 AM', status: 'Verified' },
    { id: 'LOG-90', user: 'Ali R.', action: 'Disbursal Pulse', val: '-4.5k', time: 'Just now', status: 'Wait' },
    { id: 'LOG-91', user: 'Fatima Q.', action: 'Typing Audit', val: '-150', time: '3h ago', status: 'Verified' },
    { id: 'LOG-92', user: 'Ahmed S.', action: 'Tier Activation', val: '+500', time: '5h ago', status: 'Settled' },
  ];

  return (
    <div className="max-w-7xl mx-auto pb-32 space-y-4 px-1 scale-[0.98] lg:scale-100 origin-top">
      {/* Precision Intelligence Header */}
      <div className="bg-slate-950 p-5 rounded-[2rem] text-white shadow-2xl relative overflow-hidden mx-1 border border-white/5">
        <div className="bg-data-grid absolute inset-0 opacity-10" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
           <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center shadow-2xl">
                 <BarChart3 className="w-6 h-6 text-theme-primary animate-pulse" />
              </div>
              <div>
                 <h1 className="text-base font-black uppercase tracking-tight leading-none">Intelligence Terminal</h1>
                 <p className="text-[8px] text-slate-500 font-bold uppercase tracking-[0.4em] mt-2">Filter Kernel: {timeFilter} Logic</p>
              </div>
           </div>
           
           <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/5">
              {['Today', 'Yesterday', 'Monthly'].map(f => (
                <button 
                  key={f} onClick={() => setTimeFilter(f as any)} 
                  className={`px-4 py-2 rounded-lg text-[8px] font-black uppercase transition-all ${timeFilter === f ? 'bg-white text-slate-950 shadow-xl' : 'text-slate-500 hover:text-white'}`}
                >
                  {f}
                </button>
              ))}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-1">
        {/* Main Analysis Cluster */}
        <div className="lg:col-span-8 space-y-4">
           {/* Primary Chart Node */}
           <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-start mb-8 px-2">
                 <div>
                    <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Throughput Pulse</h3>
                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1.5">Network Load Analytics</p>
                 </div>
                 <div className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-50 rounded-xl border border-emerald-100">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-[9px] font-black text-emerald-600 uppercase">+12.4% Intensity</span>
                 </div>
              </div>
              <div className="h-48 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={pulseData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                       <defs>
                          <linearGradient id="intelPulse" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="var(--theme-primary)" stopOpacity={0.2}/>
                             <stop offset="95%" stopColor="var(--theme-primary)" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 7, fontWeight: 900, fill: '#94a3b8' }} dy={10} />
                       <YAxis hide />
                       <Tooltip 
                         contentStyle={{ borderRadius: '20px', border: 'none', fontSize: '10px', fontWeight: 900, backgroundColor: '#0f172a', color: '#fff', padding: '12px' }} 
                       />
                       <Area type="monotone" dataKey="load" stroke="var(--theme-primary)" strokeWidth={3} fillOpacity={1} fill="url(#intelPulse)" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>

           {/* High-Density Trace Ledger */}
           <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/50 px-6">
                 <div className="flex items-center space-x-2.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <h3 className="text-[10px] font-black text-slate-900 uppercase">Real-Time Logic Trace</h3>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">CLUSTER_SYNC_OK</span>
                 </div>
              </div>
              <div className="overflow-x-auto no-scrollbar">
                 <table className="w-full text-left">
                    <tbody className="divide-y divide-gray-50">
                       {traceLogs.map(log => (
                         <tr key={log.id} className="hover:bg-theme-secondary/10 transition-colors group cursor-pointer">
                            <td className="px-6 py-3.5">
                               <p className="text-[10px] font-black text-slate-900 uppercase leading-none">{log.user}</p>
                               <p className="text-[7px] font-bold text-gray-300 uppercase mt-1 tracking-tighter">{log.action}</p>
                            </td>
                            <td className="px-6 py-3.5">
                               <div className={`inline-flex items-center px-2 py-0.5 rounded text-[6px] font-black uppercase border ${log.status === 'Settled' || log.status === 'Verified' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                                  {log.status === 'Settled' ? <CheckCircle2 className="w-2 h-2 mr-1" /> : <Clock className="w-2 h-2 mr-1" />}
                                  {log.status}
                               </div>
                            </td>
                            <td className="px-6 py-3.5 text-right">
                               <p className={`text-[10px] font-black ${log.val.startsWith('+') ? 'text-emerald-600' : 'text-slate-900'}`}>{log.val.startsWith('+') ? '' : ''}{log.val}</p>
                               <p className="text-[7px] font-bold text-gray-300 uppercase tracking-tighter mt-1">{log.time}</p>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
              <div className="p-4 bg-gray-50/50 border-t border-gray-50 text-center">
                 <button className="text-[8px] font-black text-gray-400 uppercase tracking-widest hover:text-theme-primary transition-colors flex items-center justify-center mx-auto">
                   <Download className="w-3 h-3 mr-2" /> Download Extended Ledger Trace
                 </button>
              </div>
           </div>
        </div>

        {/* Intelligence Side Column */}
        <div className="lg:col-span-4 space-y-4">
           <div className="bg-slate-900 p-6 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden border border-white/5 group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-theme-primary/10 rounded-full blur-3xl group-hover:bg-theme-primary/20 transition-all" />
              <Activity className="w-8 h-8 text-theme-primary mb-4" />
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em] mb-1.5">Gross Revenue Yield</p>
              <h2 className="text-3xl font-black tracking-tighter">Rs. 84,200</h2>
              <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                 <div className="space-y-1">
                    <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest">Disbursed</p>
                    <p className="text-[13px] font-black text-rose-400 leading-none">Rs. 14.5k</p>
                 </div>
                 <div className="text-right space-y-1">
                    <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest">Retention</p>
                    <p className="text-[13px] font-black text-emerald-400 leading-none">92.4%</p>
                 </div>
              </div>
           </div>

           <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-5">
              <div className="flex items-center justify-between px-1">
                 <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Cluster Status</h3>
                 <Filter className="w-3 h-3 text-slate-300" />
              </div>
              <div className="space-y-3.5">
                 {reportStats.map((stat, i) => (
                   <div key={i} className="flex items-center justify-between group cursor-default">
                      <div className="flex items-center space-x-3.5">
                         <div className={`w-9 h-9 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-inner group-hover:scale-95 transition-transform`}><stat.icon className="w-4.5 h-4.5" /></div>
                         <div>
                            <p className="text-[11px] font-black text-slate-900 leading-none">{stat.val}</p>
                            <p className="text-[7px] font-bold text-gray-400 uppercase tracking-tighter mt-1">{stat.label}</p>
                         </div>
                      </div>
                      <div className="w-5 h-5 rounded-lg bg-gray-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowDownToLine className="w-3 h-3 text-gray-300" />
                      </div>
                   </div>
                 ))}
              </div>
              <button className="w-full py-3 bg-gray-50 text-slate-400 rounded-2xl text-[8px] font-black uppercase tracking-widest border border-gray-100 hover:bg-slate-900 hover:text-white transition-all">Re-Sync Node Clusters</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
