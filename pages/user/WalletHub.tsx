
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  X,
  SmartphoneNfc,
  ChevronRight,
  History,
  AlertCircle,
  Lock,
  UserPlus,
  TrendingUp
} from 'lucide-react';
import { useSystem } from '../../context/SystemContext';
import { useAuth } from '../../context/AuthContext';

const WalletHub: React.FC = () => {
  const { settings } = useSystem();
  const { user } = useAuth();
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [withdrawStep, setWithdrawStep] = useState(1);
  const [withdrawData, setWithdrawData] = useState({ amount: '', method: 'EasyPaisa', account: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Referral Lock Condition
  const isWithdrawalLocked = (user?.referralCount || 0) < 1;

  const requests = [
    { id: 'W1', type: 'Withdrawal', amount: 2000, status: 'Completed', date: '2 days ago', method: 'EasyPaisa' },
    { id: 'P1', type: 'Plan Buy', amount: 500, status: 'Pending', date: '5 hours ago', plan: 'Student Bundle' },
    { id: 'W2', type: 'Withdrawal', amount: 1500, status: 'Rejected', date: '1 week ago', method: 'JazzCash' }
  ];

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = Number(withdrawData.amount);
    
    if (amountNum < settings.minWithdrawal) {
      setError(`Minimum withdrawal is Rs. ${settings.minWithdrawal}`);
      return;
    }
    if (amountNum > (user?.balance || 0)) {
      setError('Insufficient balance in your Noor wallet.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsWithdrawModalOpen(false);
      setWithdrawStep(1);
      setWithdrawData({ amount: '', method: 'EasyPaisa', account: '' });
      setError('');
      alert("Withdrawal request submitted! Funds will arrive within 24 hours.");
    }, 2000);
  };

  return (
    <div className="max-w-xl mx-auto pb-20 px-1 space-y-4">
      <div className="flex items-center justify-between px-2">
        <div>
          <h1 className="text-xl font-black text-gray-900 leading-none">Personal Bank</h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Earnings Portfolio</p>
        </div>
        <div className="bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-100 flex items-center space-x-2">
           <TrendingUp className="w-3.5 h-3.5 text-rose-600" />
           <span className="text-[8px] font-black text-rose-600 uppercase tracking-widest">Verified</span>
        </div>
      </div>

      {/* Modern Compact Balance Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-rose-600 to-pink-700 p-6 rounded-3xl text-white shadow-xl shadow-rose-200 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
        <div className="relative z-10 space-y-6">
          <div>
            <p className="text-rose-100 font-black uppercase tracking-[0.2em] text-[8px] mb-1">Total Available Balance</p>
            <div className="flex items-baseline space-x-1">
              <span className="text-sm font-bold text-rose-200">Rs.</span>
              <span className="text-3xl font-black tracking-tighter">{user?.balance.toLocaleString()}</span>
            </div>
          </div>
          
          <button 
            onClick={() => setIsWithdrawModalOpen(true)}
            className="w-full bg-white text-rose-600 py-3.5 rounded-2xl font-black text-xs hover:bg-rose-50 transition-all shadow-lg active:scale-95 flex items-center justify-center group uppercase tracking-widest"
          >
            Cash Out Funds <ArrowUpRight className="ml-1.5 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </motion.div>

      {/* Withdrawal Lock Warning */}
      {isWithdrawalLocked && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start space-x-3"
        >
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-amber-600 shrink-0 shadow-sm">
             <Lock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-black text-amber-900 text-xs">Withdrawal Locked</h4>
            <p className="text-[10px] font-bold text-amber-700/80 mt-0.5 leading-relaxed uppercase tracking-tight">
              Invite <span className="text-amber-900 font-black underline">1 active friend</span> to unlock payouts.
            </p>
          </div>
        </motion.div>
      )}

      {/* Transaction History Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Recent Ledger</h3>
          <div className="flex items-center space-x-1 text-[8px] font-black text-gray-400 uppercase tracking-widest">
            <History className="w-3 h-3" />
            <span>Audit Logs</span>
          </div>
        </div>

        <div className="grid gap-2">
          {requests.map((req) => (
            <div key={req.id} className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group active:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  req.type === 'Withdrawal' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                }`}>
                  {req.type === 'Withdrawal' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="font-black text-gray-900 text-sm leading-none mb-1">{req.type}</h4>
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-tight">{req.date} • {req.method || req.plan}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-gray-900 text-sm leading-none mb-1">Rs. {req.amount}</p>
                <div className={`text-[8px] font-black uppercase tracking-tight ${
                  req.status === 'Completed' ? 'text-emerald-500' : 
                  req.status === 'Pending' ? 'text-amber-500' : 'text-red-500'
                }`}>
                  {req.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile-Optimized Withdrawal Modal */}
      <AnimatePresence>
        {isWithdrawModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
              onClick={() => setIsWithdrawModalOpen(false)}
            />
            <motion.div 
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-lg bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] p-6 sm:p-8 shadow-2xl overflow-hidden"
            >
              <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-6 sm:hidden" />
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black text-gray-900">Cash Out</h2>
                <button onClick={() => setIsWithdrawModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:block">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {withdrawStep === 1 ? (
                <div className="space-y-4">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Choose Payout Method</p>
                  <div className="grid grid-cols-2 gap-3">
                    {['EasyPaisa', 'JazzCash'].map(m => (
                      <button 
                        key={m}
                        onClick={() => setWithdrawData({...withdrawData, method: m})}
                        className={`py-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                          withdrawData.method === m ? 'border-rose-600 bg-rose-50 text-rose-600' : 'border-gray-100 bg-gray-50 text-gray-400'
                        }`}
                      >
                        <SmartphoneNfc className="w-8 h-8" />
                        <span className="font-black text-[10px] uppercase tracking-widest">{m}</span>
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={() => setWithdrawStep(2)}
                    className="w-full py-4 bg-gray-900 text-white font-black rounded-2xl text-xs uppercase tracking-widest hover:bg-rose-600 transition-all flex items-center justify-center group"
                  >
                    Continue <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleWithdraw} className="space-y-4">
                  <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <p className="text-[9px] font-bold text-rose-700 leading-tight uppercase tracking-tight">
                      Min. Payout: Rs. {settings.minWithdrawal}
                    </p>
                  </div>

                  <div>
                    <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Amount</label>
                    <input 
                      required
                      type="number"
                      placeholder="e.g. 1000"
                      value={withdrawData.amount}
                      onChange={e => { setWithdrawData({...withdrawData, amount: e.target.value}); setError(''); }}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 font-black outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all text-xl"
                    />
                    {error && <p className="text-red-500 text-[8px] font-black uppercase tracking-widest mt-1.5 ml-1">{error}</p>}
                  </div>

                  <div>
                    <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">{withdrawData.method} No.</label>
                    <input 
                      required
                      type="text"
                      placeholder="03XXXXXXXXX"
                      value={withdrawData.account}
                      onChange={e => setWithdrawData({...withdrawData, account: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 font-black outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all text-xl"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button 
                      type="button"
                      onClick={() => setWithdrawStep(1)}
                      className="flex-1 py-4 bg-gray-100 text-gray-500 font-black rounded-xl text-xs uppercase tracking-widest"
                    >
                      Back
                    </button>
                    {isWithdrawalLocked ? (
                      <button 
                        disabled
                        className="flex-[2] py-4 bg-gray-200 text-gray-400 font-black rounded-xl text-xs uppercase tracking-widest flex items-center justify-center cursor-not-allowed"
                      >
                        <Lock className="w-3 h-3 mr-1.5" /> Locked
                      </button>
                    ) : (
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-[2] py-4 bg-rose-600 text-white font-black rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-rose-200"
                      >
                        {isSubmitting ? "Wait..." : "Send Request"}
                      </button>
                    )}
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WalletHub;
