
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Wallet, 
  ArrowUpRight, 
  History, 
  TrendingUp, 
  Zap, 
  Users, 
  ArrowDownCircle, 
  BellRing,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { useSystem } from '../../context/SystemContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { settings } = useSystem();
  const navigate = useNavigate();

  const weeklyData = [
    { day: 'M', pkr: 150 },
    { day: 'T', pkr: 450 },
    { day: 'W', pkr: 300 },
    { day: 'T', pkr: 600 },
    { day: 'F', pkr: 850 },
    { day: 'S', pkr: 400 },
    { day: 'S', pkr: 720 }
  ];

  const recentActivity = [
    { id: 1, type: 'Task Reward', amount: '+150', date: 'Today', status: 'Success' },
    { id: 2, type: 'Referral', amount: '+200', date: 'Yesterday', status: 'Success' },
    { id: 3, type: 'Withdrawal', amount: '-1200', date: '24 Oct', status: 'Pending' }
  ];

  return (
    <div className="max-w-md mx-auto space-y-2.5 pb-20 px-0.5">
      {/* Compact Header */}
      <div className="flex items-center justify-between px-1.5">
        <div>
          <p className="text-[9px] font-black text-rose-600 uppercase tracking-widest leading-none mb-1">Worker Node</p>
          <h1 className="text-xs font-black text-gray-900 leading-none">Salam, {user?.name.split(' ')[0]}</h1>
        </div>
        <div className="w-7 h-7 rounded-full bg-rose-50 flex items-center justify-center border border-rose-100">
          <BellRing className="w-3.5 h-3.5 text-rose-600" />
        </div>
      </div>

      {/* Slim Notice */}
      <div className="bg-rose-600/5 border border-rose-100 h-5.5 flex items-center overflow-hidden rounded">
        <div className="bg-rose-600 h-full px-1.5 flex items-center text-white text-[7px] font-black uppercase tracking-tighter shrink-0 z-10">
          NEWS
        </div>
        <motion.div 
          animate={{ x: [400, -800] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="whitespace-nowrap text-rose-700 font-bold text-[8px] px-1.5"
        >
          {settings.noticeBoard || "Referral commission updated! Withdrawals processed daily at 10 AM PKT."}
        </motion.div>
      </div>

      {/* Pocket Money Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-rose-600 to-rose-700 rounded-xl p-3.5 text-white shadow-xl shadow-rose-200/40 relative overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        
        <div className="flex justify-between items-center relative z-10">
          <div>
            <p className="text-[7px] font-black text-rose-100 uppercase tracking-widest mb-0.5">Account Balance</p>
            <h2 className="text-xl font-black tracking-tighter leading-none">Rs. {user?.balance.toLocaleString()}</h2>
            <div className="mt-1.5 flex items-center text-[7px] font-bold bg-white/20 w-fit px-1.5 py-0.5 rounded-md border border-white/5">
              <ShieldCheck className="w-2.5 h-2.5 mr-1 text-emerald-300" /> Verified
            </div>
          </div>
          
          <div className="flex space-x-1.5">
            <button 
              onClick={() => navigate('/wallet')}
              className="w-8 h-8 bg-white rounded-lg flex flex-col items-center justify-center text-rose-600 shadow-md active:scale-90 transition-all"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span className="text-[5px] font-black uppercase mt-0.5">Cash</span>
            </button>
            <button 
              onClick={() => navigate('/requests')}
              className="w-8 h-8 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg flex flex-col items-center justify-center text-white active:scale-90 transition-all"
            >
              <History className="w-3.5 h-3.5" />
              <span className="text-[5px] font-black uppercase mt-0.5">Logs</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Ultra Compact Stats (2x2) */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "Today Earning", value: "Rs. 680", icon: TrendingUp },
          { label: "Tasks Ready", value: "08 Assignments", icon: Zap },
          { label: "My Network", value: user?.referralCount || "0", icon: Users },
          { label: "Total Paid", value: "Rs. 2.4k", icon: ArrowDownCircle }
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04 }}
            className="bg-white p-2.5 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-2"
          >
            <div className="w-6 h-6 bg-rose-50 rounded-lg flex items-center justify-center text-rose-600 shrink-0">
              <item.icon className="w-3 h-3" />
            </div>
            <div className="min-w-0">
              <p className="text-[7px] font-black text-gray-400 uppercase tracking-tight leading-none mb-0.5 truncate">{item.label}</p>
              <p className="text-[10px] font-black text-gray-900 leading-none truncate">{item.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Yield Trend Mini Chart */}
      <div className="bg-white p-2.5 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-2.5 px-0.5">
          <h3 className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none">Performance Hub</h3>
          <div className="text-[6px] font-black text-emerald-500 bg-emerald-50 px-1 py-0.5 rounded border border-emerald-100">
            +18% Yield
          </div>
        </div>
        <div className="h-24 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="roseFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e11d48" stopOpacity={0.1}/>
                  <stop offset="100%" stopColor="#e11d48" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 7, fontWeight: 900, fill: '#cbd5e1'}} 
                dy={6} 
              />
              <YAxis hide domain={['auto', 'auto']} />
              <Tooltip 
                contentStyle={{ borderRadius: '6px', border: 'none', boxShadow: '0 2px 4px -1px rgb(0 0 0 / 0.1)', fontSize: '7px', fontWeight: 900 }}
              />
              <Area 
                type="monotone" 
                dataKey="pkr" 
                stroke="#e11d48" 
                strokeWidth={2} 
                fillOpacity={1} 
                fill="url(#roseFill)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Slim Activity List */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-3 py-2 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
          <h3 className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none">Audit Log</h3>
          <button onClick={() => navigate('/requests')} className="text-[7px] font-black text-rose-600 uppercase hover:underline leading-none">History</button>
        </div>
        <div className="divide-y divide-gray-50">
          {recentActivity.map((log) => (
            <div key={log.id} className="px-3 py-2 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-1 h-1 rounded-full ${log.amount.startsWith('+') ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                <div>
                  <p className="text-[9px] font-black text-gray-800 leading-none truncate max-w-[100px]">{log.type}</p>
                  <p className="text-[6px] font-bold text-gray-400 uppercase mt-0.5">{log.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-[9px] font-black leading-none ${log.amount.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {log.amount}
                </p>
                <p className="text-[5px] font-black text-gray-300 uppercase mt-0.5 tracking-tighter">{log.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Call to Action */}
      <button 
        onClick={() => navigate('/tasks')}
        className="w-full bg-slate-900 rounded-xl p-2.5 flex items-center justify-between text-white active:scale-[0.98] transition-all shadow-xl shadow-slate-200/50"
      >
        <div className="flex items-center space-x-2 text-left">
          <div className="w-6 h-6 bg-rose-600 rounded flex items-center justify-center">
             <Zap className="w-3 h-3 fill-white" />
          </div>
          <div>
             <p className="text-[6px] font-black leading-none uppercase tracking-[0.2em] text-rose-400 mb-0.5">Task Center</p>
             <p className="text-[10px] font-black leading-none">Start Assignments</p>
          </div>
        </div>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
      </button>
    </div>
  );
};

export default Dashboard;