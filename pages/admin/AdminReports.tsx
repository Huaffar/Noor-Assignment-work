import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Banknote, 
  Users, 
  FileCheck, 
  Zap, 
  Download, 
  Search, 
  Filter, 
  ChevronDown,
  ArrowUpRight,
  Activity,
  Calendar,
  CheckCircle2,
  Clock,
  ShieldCheck,
  History,
  Briefcase,
  Layers,
  ArrowDownToLine
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  Cell
} from 'recharts';

const AdminReports: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Task Buy' | 'Daily Approve' | 'User Activities' | 'Withdrawal'>('All');
  const [timeFilter, setTimeFilter] = useState<'Today' | 'Yesterday' | 'Monthly' | 'Custom'>('Today');

  const chartData = [
    { date: '08 AM', yield: 8000, activity: 15, expense: 2000 },
    { date: '10 AM', yield: 12000, activity: 45, expense: 8000 },
    { date: '12 PM', yield: 15000, activity: 62, expense: 4000 },
    { date: '02 PM', yield: 22000, activity: 90, expense: 12000 },
    { date: '04 PM', yield: 18000, activity: 75, expense: 3000 },
    { date: '06 PM', yield: 28000, activity: 110, expense: 9500 },
    { date: '08 PM', yield: 35000, activity: 130, expense: 15000 },
  ];

  const categories = [
    { id: 'All', label: 'Global Pulse', icon: Activity },
    { id: 'Task Buy', label: 'Earning Tiers', icon: Layers },
    { id: 'Daily Approve', label: 'Yield Audits', icon: FileCheck },
    { id: 'User Activities', label: 'Personnel Pulse', icon: Users },
    { id: 'Withdrawal', label: 'Treasury Disbursal', icon: ArrowDownToLine },
  ];

  const reportLogs = [
    { id: 'LOG-8821', type: 'Task Buy', user: 'Zaid K.', status: 'Success', amount: '+Rs. 3500', time: '10:45 AM' },
    { id: 'LOG-7742', type: 'Daily Approve', user: 'Sana A.', status: 'Verified', amount: '-Rs. 240', time: '11:20 AM' },
    { id: 'LOG-9931', type: 'Withdrawal', user: 'Ali R.', status: 'Pending', amount: '-Rs. 4500', time: 'Just now' },
    { id: 'LOG-4421', type: 'Registration', user: 'M. Ahmed', status: 'Active', amount: 'N/A', time: '2m ago' },
    { id: 'LOG-1102', type: 'Daily Approve', user: 'Fatima Q.', status: 'Verified', amount: '-Rs. 150', time: '3h ago' },
  ];

  const filteredLogs = useMemo(() => {
    if (activeCategory === 'All') return reportLogs;
    return reportLogs.filter(log => log.type === activeCategory);
  }, [activeCategory]);

  return (
    <div className="max-w-7xl mx-auto pb-32 space-y-4 px-1 scale-[0.98] origin-top">
      {/* Intelligence Header */}
      <div className="bg-slate-950 p-6 rounded-[2rem] text-white shadow-2xl relative overflow-hidden mx-1 border border-white/10">
        <div className="bg-data-grid absolute inset-0 opacity-10" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
           <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center shadow-2xl">
                 <BarChart3 className="w-6 h-6 text-theme-primary" />
              </div>
              <div>
                 <h1 className="text-lg font-black uppercase tracking-tight">Personnel Intelligence Hub</h1>
                 <p className="text-[7px] text-slate-500 font-bold uppercase tracking-[0.4em] mt-1">Audit Filter: {timeFilter} Logic</p>
              </div>
           </div>
           <div className="flex items-center space-x-2">
              <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 overflow-x-auto no-scrollbar">
                {['Today', 'Yesterday', 'Monthly', 'Custom'].map(f => (
                  <button key={f} onClick={() => setTimeFilter(f as any)} className={`px-4 py-1.5 rounded-lg text-[8px] font-black uppercase transition-all whitespace-nowrap ${timeFilter === f ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}>{f}</button>
                ))}
              </div>
              <button className="p-3 bg-theme-primary text-white rounded-xl shadow-xl active:scale-95 transition-transform"><Download className="w-4 h-4" /></button>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 px-1">
        {/* Metric Cluster Vertical */}
        <div className="lg:col-span-1 space-y-2.5">
           {categories.map(cat => (
             <button 
               key={cat.id} onClick={() => setActiveCategory(cat.id as any)}
               className={`w-full p-4 rounded-[1.8rem] border transition-all flex items-center justify-between group ${activeCategory === cat.id ? 'bg-white border-theme-primary shadow-xl ring-4 ring-theme-secondary/50' : 'bg-white/50 border-gray-100 grayscale opacity-60 hover:opacity-100 hover:grayscale-0'}`}
             >
               <div className="flex items-center space-x-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-inner ${activeCategory === cat.id ? 'bg-slate-950 text-theme-primary' : 'bg-gray-100 text-gray-400'}`}>
                     <cat.icon className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest leading-none">{cat.label}</span>
               </div>
               <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeCategory === cat.id ? '-rotate-90 text-theme-primary' : 'text-gray-300'}`} />
             </button>
           ))}
        </div>

        {/* Visual Matrix */}
        <div className="lg:col-span-3 space-y-4">
           <div className="themed-card p-6 min-h-[380px] flex flex-col border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                 <div>
                    <h3 className="text-xs font-black text-slate-900 uppercase leading-none">{activeCategory} Distribution Matrix</h3>
                    <p className="text-[7px] text-slate-400 font-bold uppercase mt-1.5 tracking-widest">Real-time Global Throughput Audit</p>
                 </div>
                 <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                       <div className="w-2 h-2 rounded-full bg-theme-primary" />
                       <span className="text-[8px] font-black uppercase text-slate-400">Node In</span>
                    </div>
                    <div className="flex items-center space-x-2">
                       <div className="w-2 h-2 rounded-full bg-slate-950" />
                       <span className="text-[8px] font-black uppercase text-slate-400">Node Out</span>
                    </div>
                 </div>
              </div>

              <div className="flex-1 w-full">
                 <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={chartData}>
                       <defs>
                          <linearGradient id="colorY" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                             <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 900, fill: '#94a3b8' }} />
                       <YAxis hide />
                       <Tooltip cursor={{ stroke: '#0ea5e9', strokeWidth: 1 }} contentStyle={{ borderRadius: '12px', border: 'none', fontSize: '10px', fontWeight: 900, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} />
                       <Area type="monotone" dataKey="yield" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorY)" />
                       <Area type="monotone" dataKey="expense" stroke="#0f172a" strokeWidth={2} fill="none" strokeDasharray="4 4" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>

           {/* Comprehensive History Cluster */}
           <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-50 flex items-center justify-between bg-gray-50/20">
                 <div className="flex items-center space-x-2">
                    <History className="w-4 h-4 text-slate-400" />
                    <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Active Intelligence Ledger</h3>
                 </div>
                 <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-300" />
                    <input className="bg-white border border-gray-100 rounded-lg py-1 pl-7 pr-3 text-[9px] font-black uppercase outline-none focus:border-theme-primary w-32 shadow-inner" placeholder="Trace Log..." />
                 </div>
              </div>
              <div className="overflow-x-auto no-scrollbar">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="bg-white border-b border-gray-50">
                          <th className="px-6 py-4 text-[7px] font-black text-gray-400 uppercase tracking-[0.2em]">Audit Type</th>
                          <th className="px-6 py-4 text-[7px] font-black text-gray-400 uppercase tracking-[0.2em]">Entity</th>
                          <th className="px-6 py-4 text-[7px] font-black text-gray-400 uppercase tracking-[0.2em]">Node State</th>
                          <th className="px-6 py-4 text-[7px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Yield Pulse</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                       {filteredLogs.map(log => (
                         <tr key={log.id} className="hover:bg-theme-secondary/10 transition-colors group cursor-pointer">
                            <td className="px-6 py-4">
                               <p className="text-[10px] font-black text-slate-900 uppercase leading-none">{log.type}</p>
                               <p className="text-[7px] font-bold text-gray-300 uppercase mt-1 tracking-widest">{log.id}</p>
                            </td>
                            <td className="px-6 py-4">
                               <p className="text-[10px] font-black text-slate-700 leading-none">{log.user}</p>
                               <p className="text-[7px] font-bold text-gray-400 uppercase mt-1 tracking-widest">{log.time}</p>
                            </td>
                            <td className="px-6 py-4">
                               <div className={`inline-flex items-center px-2 py-0.5 rounded-md text-[7px] font-black uppercase tracking-widest border ${log.status === 'Success' || log.status === 'Verified' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                                  {log.status === 'Success' || log.status === 'Verified' ? <CheckCircle2 className="w-2.5 h-2.5 mr-1" /> : <Clock className="w-2.5 h-2.5 mr-1" />}
                                  {log.status}
                               </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                               <p className={`text-[11px] font-black ${log.amount.startsWith('+') ? 'text-emerald-600' : 'text-slate-900'} tracking-tight`}>{log.amount}</p>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
                 {filteredLogs.length === 0 && (
                    <div className="py-20 text-center">
                       <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">No Intelligence nodes in current filter</p>
                    </div>
                 )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;