
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  CheckCircle2, 
  X,
  SmartphoneNfc,
  ChevronRight,
  History,
  AlertCircle,
  Lock,
  TrendingUp,
  Loader2,
  ShieldAlert
} from 'lucide-react';
import { useSystem } from '../../context/SystemContext';
import { useAuth } from '../../context/AuthContext';

const WalletHub: React.FC = () => {
  const { settings } = useSystem();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [withdrawStep, setWithdrawStep] = useState(1);
  const [withdrawData, setWithdrawData] = useState({ amount: '', method: 'EasyPaisa', account: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Referral & KYC Lock Conditions
  const isReferralLocked = (user?.referralCount || 0) < 1;
  const isKYCLocked = user?.kycStatus !== 'approved';

  const requests = [
    { id: 'W1', type: 'Withdrawal', amount: 2000, status: 'Completed', date: '2 days ago', method: 'EasyPaisa' },
    { id: 'P1', type: 'Plan Buy', amount: 500, status: 'Pending', date: '5 hours ago', plan: 'Student Bundle' },
    { id: 'W2', type: 'Withdrawal', amount: 1500, status: 'Rejected', date: '1 week ago', method: 'JazzCash' }
  ];

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    if (isKYCLocked) {
      setError("Verify identity first.");
      return;
    }

    const amountNum = Number(withdrawData.amount);
    if (amountNum < settings.minWithdrawal) {
      setError(`Min. Rs. ${settings.minWithdrawal}`);
      return;
    }
    if (amountNum > (user?.balance || 0)) {
      setError('Insufficient funds');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsWithdrawModalOpen(false);
      setWithdrawStep(1);
      setWithdrawData({ amount: '', method: 'EasyPaisa', account: '' });
      setError('');
      alert("Verification Pending! Activation in 1-2 hours.");
    }, 2000);
  };

  return (
    <div className="max-w-xl mx-auto pb-20 px-1 space-y-3">
      <div className="flex items-center justify-between px-2">
        <div>
          <h1 className="text-lg font-black text-gray-900 leading-none">Wallet</h1>
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">Managed Earnings</p>
        </div>
        <div className={`px-2.5 py-1 rounded-lg border flex items-center space-x-1.5 ${isKYCLocked ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-emerald-50 border-emerald-100 text-emerald-600'}`}>
           {isKYCLocked ? <ShieldAlert className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
           <span className="text-[7px] font-black uppercase tracking-widest">{isKYCLocked ? 'Unverified' : 'Verified'}</span>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-rose-500 to-pink-600 p-5 rounded-2xl text-white shadow-lg shadow-rose-200 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 blur-xl" />
        <div className="relative z-10">
          <p className="text-rose-100 font-black uppercase tracking-[0.2em] text-[7px] mb-0.5">Available Funds</p>
          <div className="flex items-baseline space-x-1 mb-4">
            <span className="text-xs font-bold text-rose-100">Rs.</span>
            <span className="text-2xl font-black tracking-tight">{user?.balance.toLocaleString()}</span>
          </div>
          
          <button 
            onClick={() => setIsWithdrawModalOpen(true)}
            className="w-full bg-white text-rose-600 py-2.5 rounded-xl font-black text-[10px] hover:bg-rose-50 transition-all shadow-md active:scale-95 flex items-center justify-center uppercase tracking-widest"
          >
            Cash Out <ArrowUpRight className="ml-1 w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>

      {/* Identity Warning */}
      {isKYCLocked && (
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => navigate('/kyc')}
          className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between group cursor-pointer"
        >
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center text-white shrink-0 shadow-lg shadow-rose-900/40">
               <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[9px] font-black text-white uppercase tracking-tight">Identity Scan Required</p>
              <p className="text-[7px] font-bold text-gray-400 uppercase">Click to complete KYC</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-rose-500 transition-colors" />
        </motion.div>
      )}

      {/* Referral Lock Warning */}
      {isReferralLocked && (
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-amber-50 rounded-xl border border-amber-100 flex items-center space-x-2.5"
        >
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-amber-600 shrink-0 shadow-sm">
             <Lock className="w-4 h-4" />
          </div>
          <p className="text-[9px] font-bold text-amber-700 uppercase tracking-tight">
            Invite <span className="text-amber-900 font-black">1 Active Referral</span> to unlock.
          </p>
        </motion.div>
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Recent Activity</h3>
          <History className="w-3.5 h-3.5 text-gray-300" />
        </div>

        <div className="space-y-1.5">
          {requests.map((req) => (
            <div key={req.id} className="bg-white p-2.5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group active:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-2.5">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  req.type === 'Withdrawal' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                }`}>
                  {req.type === 'Withdrawal' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
                </div>
                <div>
                  <h4 className="font-black text-gray-900 text-xs leading-none mb-0.5">{req.type}</h4>
                  <p className="text-[7px] font-black text-gray-400 uppercase tracking-tight">{req.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-gray-900 text-xs leading-none mb-0.5">Rs. {req.amount}</p>
                <p className={`text-[7px] font-black uppercase tracking-tight ${
                  req.status === 'Completed' ? 'text-emerald-500' : 
                  req.status === 'Pending' ? 'text-amber-500' : 'text-red-500'
                }`}>
                  {req.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isWithdrawModalOpen && (
          <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-0">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setIsWithdrawModalOpen(false)}
            />
            <motion.div 
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              className="relative w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-black text-gray-900 uppercase">Payout Request</h2>
                <button onClick={() => setIsWithdrawModalOpen(false)} className="p-1.5 bg-gray-50 rounded-lg">
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {isKYCLocked ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-3xl flex items-center justify-center mx-auto shadow-xl shadow-rose-100">
                    <ShieldAlert className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-black text-gray-900 leading-tight">Identity Required</h3>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest max-w-[200px] mx-auto leading-relaxed">Please complete your Biometric scan to unlock cash outs.</p>
                  <button 
                    onClick={() => navigate('/kyc')}
                    className="w-full bg-slate-900 text-white py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl"
                  >
                    Go to Identity Node
                  </button>
                </div>
              ) : withdrawStep === 1 ? (
                <div className="space-y-3">
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest text-center">Select Destination</p>
                  <div className="grid grid-cols-2 gap-2">
                    {['EasyPaisa', 'JazzCash'].map(m => (
                      <button 
                        key={m}
                        onClick={() => setWithdrawData({...withdrawData, method: m})}
                        className={`py-4 rounded-xl border-2 transition-all flex flex-col items-center gap-1.5 ${
                          withdrawData.method === m ? 'border-rose-400 bg-rose-50 text-rose-600' : 'border-gray-50 bg-gray-50 text-gray-300'
                        }`}
                      >
                        <SmartphoneNfc className="w-6 h-6" />
                        <span className="font-black text-[9px] uppercase tracking-widest">{m}</span>
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={() => setWithdrawStep(2)}
                    className="w-full py-3 bg-slate-900 text-white font-black rounded-xl text-[10px] uppercase tracking-widest"
                  >
                    Set Amount
                  </button>
                </div>
              ) : (
                <form onSubmit={handleWithdraw} className="space-y-3">
                  <div className="bg-rose-50 p-2.5 rounded-lg border border-rose-100 flex items-center space-x-2">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                    <p className="text-[8px] font-bold text-rose-700 uppercase">Min: Rs. {settings.minWithdrawal}</p>
                  </div>

                  <div>
                    <label className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Cash Amount</label>
                    <input 
                      required
                      type="number"
                      placeholder="0.00"
                      value={withdrawData.amount}
                      onChange={e => { setWithdrawData({...withdrawData, amount: e.target.value}); setError(''); }}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 font-black outline-none focus:border-rose-400 text-lg"
                    />
                    {error && <p className="text-red-500 text-[8px] font-black uppercase mt-1 ml-1">{error}</p>}
                  </div>

                  <div>
                    <label className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">{withdrawData.method} Account</label>
                    <input 
                      required
                      type="text"
                      placeholder="03XXXXXXXXX"
                      value={withdrawData.account}
                      onChange={e => setWithdrawData({...withdrawData, account: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 font-black outline-none focus:border-rose-400 text-sm"
                    />
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button type="button" onClick={() => setWithdrawStep(1)} className="flex-1 py-3 bg-gray-100 text-gray-500 font-black rounded-xl text-[10px] uppercase">Back</button>
                    {isReferralLocked ? (
                      <button disabled className="flex-[2] py-3 bg-gray-200 text-gray-400 font-black rounded-xl text-[10px] uppercase cursor-not-allowed">Locked</button>
                    ) : (
                      <button type="submit" disabled={isSubmitting} className="flex-[2] py-3 bg-rose-600 text-white font-black rounded-xl text-[10px] uppercase shadow-lg shadow-rose-100">
                        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Request Cash"}
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
