
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
import DailyBonus from '../../components/DailyBonus';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { settings } = useSystem();
  const navigate = useNavigate();

  const marquee = settings.marqueeConfig;

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
          <p className="text-[9px] font-black uppercase tracking-widest leading-none mb-1" style={{ color: 'var(--theme-primary)' }}>Worker Node</p>
          <h1 className="text-xs font-black text-gray-900 leading-none">Salam, {user?.name.split(' ')[0]}</h1>
        </div>
        <div className="w-7 h-7 rounded-full flex items-center justify-center border" style={{ backgroundColor: 'var(--theme-bg)', borderColor: 'var(--theme-primary)' }}>
          <BellRing className="w-3.5 h-3.5" style={{ color: 'var(--theme-primary)' }} />
        </div>
      </div>

      {/* Dynamic Notice Bar */}
      {marquee.isActive && (
        <div 
          className="h-7 flex items-center overflow-hidden rounded-lg border shadow-sm" 
          style={{ backgroundColor: marquee.bgColor, borderColor: `${marquee.textColor}20`, transform: `scale(${marquee.scale})` }}
        >
          <div className="h-full px-2 flex items-center text-white text-[7px] font-black uppercase tracking-tighter shrink-0 z-10" style={{ backgroundColor: marquee.textColor }}>
            NEWS
          </div>
          <div className="relative flex-1 overflow-hidden">
            <motion.div 
              animate={{ x: [400, -1000] }}
              transition={{ duration: marquee.speed, repeat: Infinity, ease: "linear" }}
              className={`whitespace-nowrap font-bold ${marquee.fontSize} px-2`}
              style={{ color: marquee.textColor }}
            >
              {marquee.text}
            </motion.div>
          </div>
        </div>
      )}

      {/* Gamified Bonus System */}
      <DailyBonus />

      {/* Pocket Money Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-xl p-3.5 text-white shadow-xl relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-text))' }}
      >
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        
        <div className="flex justify-between items-center relative z-10">
          <div>
            <p className="font-black uppercase tracking-widest text-[7px] mb-0.5 opacity-80">Account Balance</p>
            <h2 className="text-xl font-black tracking-tighter leading-none">Rs. {user?.balance.toLocaleString()}</h2>
            <div className="mt-1.5 flex items-center text-[7px] font-bold bg-white/20 w-fit px-1.5 py-0.5 rounded-md border border-white/5">
              <ShieldCheck className="w-2.5 h-2.5 mr-1 text-emerald-300" /> Verified
            </div>
          </div>
          
          <div className="flex space-x-1.5">
            <button 
              onClick={() => navigate('/wallet')}
              className="w-8 h-8 bg-white rounded-lg flex flex-col items-center justify-center shadow-md active:scale-90 transition-all"
              style={{ color: 'var(--theme-primary)' }}
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

      {/* Rest of dashboard... */}
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
            <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: 'var(--theme-primary)15', color: 'var(--theme-primary)' }}>
              <item.icon className="w-3 h-3" />
            </div>
            <div className="min-w-0">
              <p className="text-[7px] font-black text-gray-400 uppercase tracking-tight leading-none mb-0.5 truncate">{item.label}</p>
              <p className="text-[10px] font-black text-gray-900 leading-none truncate">{item.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
