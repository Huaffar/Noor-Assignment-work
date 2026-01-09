
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Wallet, 
  ArrowUpRight, 
  History, 
  TrendingUp, 
  X,
  ArrowDown,
  ArrowUp,
  Briefcase,
  Layers,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import PaymentReceipt from '../../components/PaymentReceipt';

const WalletHub: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'in' | 'out'>('all');
  const [selectedTx, setSelectedTx] = useState<any>(null);
  const [loadCount, setLoadCount] = useState(6);

  const transactions = useMemo(() => [
    { id: 'TX-8821', type: 'withdrawal', amount: 4500, status: 'success', description: 'Withdrawal to EasyPaisa', date: 'Today, 10:30 AM', isCredit: false },
    { id: 'TX-7742', type: 'task_earning', amount: 240, status: 'success', description: 'Urdu Work Reward', date: 'Today, 09:15 AM', isCredit: true },
    { id: 'TX-1102', type: 'plan_purchase', amount: 3500, status: 'success', description: 'Gold Package Activation', date: 'Oct 22', isCredit: false },
    { id: 'TX-0092', type: 'task_earning', amount: 150, status: 'success', description: 'Bonus Reward', date: 'Oct 20', isCredit: true },
    { id: 'TX-0081', type: 'withdrawal', amount: 1200, status: 'pending', description: 'Withdrawal to JazzCash', date: 'Oct 18', isCredit: false },
  ], []);

  const filteredTransactions = useMemo(() => {
    if (filter === 'all') return transactions;
    if (filter === 'in') return transactions.filter(t => t.isCredit);
    return transactions.filter(t => !t.isCredit);
  }, [filter, transactions]);

  const getTxIcon = (type: string, isCredit: boolean) => {
    if (isCredit) return <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner"><ArrowDown className="w-4 h-4" /></div>;
    if (type === 'plan_purchase') return <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner"><Layers className="w-4 h-4" /></div>;
    return <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shadow-inner"><ArrowUp className="w-4 h-4" /></div>;
  };

  return (
    <div className="max-w-xl mx-auto pb-24 px-1 space-y-4 scale-[0.98] origin-top">
      {/* PREMIUM CARD */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="relative h-48 rounded-[2rem] bg-gradient-to-br from-rose-600 to-rose-800 p-6 text-white shadow-2xl mx-2"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div className="flex justify-between items-start">
             <div>
                <p className="text-[8px] font-black uppercase tracking-[0.3em] text-rose-100/60 mb-1">Available Funds</p>
                <div className="flex items-baseline space-x-1.5">
                   <span className="text-sm font-bold opacity-30">PKR</span>
                   <h2 className="text-3xl font-black tracking-tighter">{user?.balance.toLocaleString()}</h2>
                </div>
             </div>
             <Wallet className="w-8 h-8 text-white/20" />
          </div>
          <button onClick={() => navigate('/withdraw')} className="w-full py-3.5 bg-white text-rose-600 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all">Withdraw Money</button>
        </div>
      </motion.div>

      {/* QUICK STATS */}
      <div className="grid grid-cols-3 gap-2 px-2">
        {[
          { label: 'Total Earned', val: 8450, color: 'emerald', icon: TrendingUp },
          { label: 'Withdrawn', val: 5700, color: 'amber', icon: ArrowUpRight },
          { label: 'Invested', val: 3500, color: 'indigo', icon: Briefcase },
        ].map((item, i) => (
          <div key={i} className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center space-y-1.5">
             <div className={`w-7 h-7 rounded-lg flex items-center justify-center bg-${item.color}-50 text-${item.color}-600 shadow-inner`}><item.icon className="w-3.5 h-3.5" /></div>
             <div>
                <p className="text-[10px] font-black text-gray-900">Rs. {item.val.toLocaleString()}</p>
                <p className="text-[6px] font-black text-gray-400 uppercase tracking-widest">{item.label}</p>
             </div>
          </div>
        ))}
      </div>

      {/* ACTIVITY LIST */}
      <div className="px-2 space-y-3">
        <div className="flex items-center justify-between px-2">
           <div className="flex items-center space-x-2">
              <History className="w-3.5 h-3.5 text-gray-400" />
              <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Recent Activity</h3>
           </div>
           <div className="flex bg-gray-100 p-0.5 rounded-lg border border-gray-200">
             {['all', 'in', 'out'].map(opt => (
               <button key={opt} onClick={() => setFilter(opt as any)} className={`px-2.5 py-1 rounded-md text-[7px] font-black uppercase transition-all ${filter === opt ? 'bg-white text-rose-600 shadow-sm' : 'text-gray-400'}`}>{opt}</button>
             ))}
           </div>
        </div>

        <div className="space-y-1">
          <AnimatePresence mode="popLayout">
            {filteredTransactions.slice(0, loadCount).map((tx) => (
              <motion.div key={tx.id} layout className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between active:bg-gray-50 transition-all cursor-pointer" onClick={() => tx.type === 'withdrawal' && tx.status === 'success' ? setSelectedTx(tx) : null}>
                <div className="flex items-center space-x-3 min-w-0">
                  {getTxIcon(tx.type, tx.isCredit)}
                  <div className="min-w-0">
                    <h4 className="text-[9px] font-black text-gray-900 leading-tight uppercase truncate">{tx.description}</h4>
                    <p className="text-[7px] font-bold text-gray-400 uppercase tracking-tighter">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-3">
                   <p className={`text-[10px] font-black ${tx.isCredit ? 'text-emerald-600' : 'text-rose-600'}`}>{tx.isCredit ? '+' : '-'} Rs. {tx.amount.toLocaleString()}</p>
                   <div className={`text-[6px] font-black uppercase px-1 py-0.5 rounded border inline-block ${tx.status === 'success' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>{tx.status}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {loadCount < filteredTransactions.length && (
          <button onClick={() => setLoadCount(prev => prev + 5)} className="w-full py-2.5 text-[8px] font-black text-gray-400 uppercase tracking-widest flex items-center justify-center group">
            <span>Show More Activity</span>
            <ChevronDown className="w-3 h-3 ml-1" />
          </button>
        )}
      </div>

      {/* RECEIPT MODAL */}
      <AnimatePresence>
        {selectedTx && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedTx(null)} className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, y: 15 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 15 }} className="relative w-full max-w-[280px] z-10">
              <button onClick={() => setSelectedTx(null)} className="absolute -top-10 right-0 p-2 bg-white/10 text-white rounded-full"><X className="w-5 h-5" /></button>
              <PaymentReceipt transaction={selectedTx} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WalletHub;
