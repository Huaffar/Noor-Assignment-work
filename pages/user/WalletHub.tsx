import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Wallet, 
  ArrowUpRight, 
  History, 
  TrendingUp, 
  ArrowDown,
  ArrowUp,
  Briefcase,
  ChevronRight,
  ShieldCheck,
  Zap,
  Clock,
  ArrowDownToLine
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const WalletHub: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'in' | 'out'>('all');

  const transactions = useMemo(() => [
    { id: 'TX-8821', type: 'withdrawal', amount: 4500, status: 'success', description: 'Disbursal to EasyPaisa', date: 'Today, 10:30 AM', isCredit: false },
    { id: 'TX-7742', type: 'task_earning', amount: 240, status: 'success', description: 'Assignment Yield #821', date: 'Today, 09:15 AM', isCredit: true },
    { id: 'TX-1102', type: 'plan_purchase', amount: 3500, status: 'success', description: 'Tier Upgrade: Gold', date: 'Oct 22', isCredit: false },
    { id: 'TX-0092', type: 'bonus', amount: 150, status: 'success', description: 'Network Loyalty Bonus', date: 'Oct 20', isCredit: true },
  ], []);

  const filteredTransactions = useMemo(() => {
    if (filter === 'all') return transactions;
    return transactions.filter(t => filter === 'in' ? t.isCredit : !t.isCredit);
  }, [filter, transactions]);

  return (
    <div className="max-w-xl mx-auto pb-24 px-1 space-y-4 scale-[0.98] origin-top">
      {/* Premium Wallet Header */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="bg-slate-950 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden mx-1 border border-white/5 group"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-theme-primary/10 rounded-full blur-[80px] -mr-20 -mt-20 group-hover:bg-theme-primary/20 transition-all duration-700" />
        <div className="relative z-10 space-y-8">
           <div className="flex justify-between items-start">
              <div>
                 <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.4em] mb-2">Network Capital Node</p>
                 <div className="flex items-baseline space-x-2">
                    <span className="text-sm font-bold text-theme-primary/50">PKR</span>
                    <h2 className="text-5xl font-black tracking-tighter leading-none">{(user?.balance || 0).toLocaleString()}</h2>
                 </div>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl">
                 <Wallet className="w-7 h-7 text-theme-primary animate-pulse" />
              </div>
           </div>

           <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => navigate('/withdraw')}
                className="py-4 bg-white text-slate-950 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center justify-center active:scale-95 transition-all"
              >
                <ArrowDownToLine className="w-4 h-4 mr-2 text-theme-primary" /> Disburse
              </button>
              <button 
                onClick={() => navigate('/upgrade')}
                className="py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center hover:bg-white/10 transition-all"
              >
                <Zap className="w-4 h-4 mr-2 text-theme-primary" /> Invest
              </button>
           </div>
        </div>
      </motion.div>

      {/* Stats Summary Matrix */}
      <div className="grid grid-cols-2 gap-3 px-1">
         <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-inner"><TrendingUp className="w-5 h-5" /></div>
            <div>
               <p className="text-[12px] font-black text-slate-900 leading-none">Rs. {(user as any)?.totalEarned || 0}</p>
               <p className="text-[7px] font-black text-gray-400 uppercase tracking-widest mt-1">Gross Yield</p>
            </div>
         </div>
         <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shadow-inner"><ArrowUpRight className="w-5 h-5" /></div>
            <div>
               <p className="text-[12px] font-black text-slate-900 leading-none">Rs. {user?.totalWithdrawn || 0}</p>
               <p className="text-[7px] font-black text-gray-400 uppercase tracking-widest mt-1">Net Payouts</p>
            </div>
         </div>
      </div>

      {/* Transaction Trace Ledger */}
      <div className="space-y-3 pt-2">
         <div className="flex items-center justify-between px-4">
            <div className="flex items-center space-x-2.5">
               <Clock className="w-4 h-4 text-slate-400" />
               <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Transaction Trace</h3>
            </div>
            <div className="flex bg-gray-100 p-0.5 rounded-xl border border-gray-200">
              {['all', 'in', 'out'].map(opt => (
                <button key={opt} onClick={() => setFilter(opt as any)} className={`px-4 py-1.5 rounded-lg text-[8px] font-black uppercase transition-all ${filter === opt ? 'bg-white text-theme-primary shadow-sm border border-gray-200' : 'text-gray-400'}`}>{opt}</button>
              ))}
            </div>
         </div>

         <div className="space-y-1.5 px-1">
            <AnimatePresence mode="popLayout">
               {filteredTransactions.map((tx) => (
                 <motion.div 
                   key={tx.id} layout initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                   className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-theme-primary/20 transition-all cursor-pointer"
                 >
                    <div className="flex items-center space-x-4 min-w-0">
                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-inner ${tx.isCredit ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                          {tx.isCredit ? <ArrowDown className="w-5 h-5" /> : <ArrowUp className="w-5 h-5" />}
                       </div>
                       <div className="min-w-0">
                          <h4 className="text-[11px] font-black text-slate-900 uppercase truncate leading-none mb-1.5 group-hover:text-theme-primary transition-colors">{tx.description}</h4>
                          <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">{tx.date}</p>
                       </div>
                    </div>
                    <div className="text-right ml-4 shrink-0">
                       <p className={`text-[13px] font-black ${tx.isCredit ? 'text-emerald-600' : 'text-rose-600'}`}>{tx.isCredit ? '+' : '-'} {tx.amount.toLocaleString()}</p>
                       <span className="text-[6px] font-black bg-gray-50 border border-gray-100 px-1.5 py-0.5 rounded text-gray-400 uppercase tracking-tighter mt-1 inline-block">ID: {tx.id}</span>
                    </div>
                 </motion.div>
               ))}
            </AnimatePresence>

            {filteredTransactions.length === 0 && (
              <div className="py-20 text-center bg-gray-50/50 rounded-[2.5rem] border border-dashed border-gray-200">
                 <Briefcase className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                 <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">No entries found in this logic trace.</p>
              </div>
            )}
         </div>
      </div>

      {/* Security Footer */}
      <div className="flex flex-col items-center justify-center py-10 opacity-30">
         <ShieldCheck className="w-5 h-5 text-emerald-500 mb-2" />
         <span className="text-[8px] font-black uppercase tracking-[0.4em]">AES-256 Ledger Encryption Active</span>
      </div>
    </div>
  );
};

export default WalletHub;