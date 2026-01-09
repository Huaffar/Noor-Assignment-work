import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, 
  SmartphoneNfc, 
  ShieldCheck, 
  ShieldAlert, 
  Loader2, 
  Check, 
  X,
  Search,
  CheckCircle2,
  History
} from 'lucide-react';
import { rejectWithdrawal, approveWithdrawal } from '../../api/controllers/adminController';
import { sendNotification } from '../../api/utils/sendNotification';

const ManageWithdrawals: React.FC = () => {
  const [filter, setFilter] = useState<'Pending' | 'Approved' | 'Rejected'>('Pending');
  const [requests, setRequests] = useState([
    { id: 'wd_101', userId: 'u1', user: 'Zaid Ali', phone: '03001112223', amount: 4500, method: 'EasyPaisa', account: '03001112223', kyc: 'Approved', date: '2h ago', status: 'Pending' },
    { id: 'wd_102', userId: 'u2', user: 'Fatima Sheikh', phone: '03019998887', amount: 12000, method: 'JazzCash', account: '03019998887', kyc: 'Approved', date: '4h ago', status: 'Pending' },
    { id: 'wd_103', userId: 'u3', user: 'Bilal Khan', phone: '03125556667', amount: 2500, method: 'EasyPaisa', account: '03125556667', kyc: 'Pending', date: '5h ago', status: 'Pending' },
  ]);

  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleMarkPaid = async (req: any) => {
    setLoadingId(req.id);
    setTimeout(async () => {
      await approveWithdrawal(req.userId, req.id, req.amount);
      await sendNotification(req.userId, "Funds Disbursed! 💰", `Rs. ${req.amount} has been sent to your ${req.method} account.`);
      setRequests(requests.map(r => r.id === req.id ? { ...r, status: 'Approved' } : r));
      setLoadingId(null);
    }, 1200);
  };

  const handleReject = async (req: any) => {
    if(confirm(`Refund Rs. ${req.amount} back to worker balance?`)) {
       await rejectWithdrawal(req.userId, req.id, req.amount, "Audit Failure");
       setRequests(requests.map(r => r.id === req.id ? { ...r, status: 'Rejected' } : r));
    }
  };

  const filteredRequests = requests.filter(r => r.status === filter);

  return (
    <div className="max-w-7xl mx-auto pb-20 px-1 space-y-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 px-1">
        <div>
          <h1 className="text-xl font-black text-slate-900 leading-none uppercase tracking-tight">Payout Ledger</h1>
          <p className="text-[7px] text-slate-400 font-bold uppercase tracking-widest mt-1">Verification and Disbursement Queue</p>
        </div>
        <div className="flex bg-slate-100 p-0.5 rounded-xl border border-slate-200">
          {['Pending', 'Approved', 'Rejected'].map((s: any) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-1.5 rounded-lg text-[8px] font-black uppercase transition-all ${filter === s ? 'bg-white text-pink-600 shadow-sm' : 'text-slate-400'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-950 text-white">
                <th className="px-6 py-4 text-[7px] font-black uppercase tracking-widest">Personnel</th>
                <th className="px-6 py-4 text-[7px] font-black uppercase tracking-widest">Channel Node</th>
                <th className="px-6 py-4 text-[7px] font-black uppercase tracking-widest">Asset Value</th>
                <th className="px-6 py-4 text-[7px] font-black uppercase tracking-widest text-right">Commit Ops</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRequests.map((req) => (
                <tr key={req.id} className="hover:bg-pink-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center font-black text-pink-600 text-xs">{req.user[0]}</div>
                      <div>
                        <p className="text-[11px] font-black text-slate-900 uppercase truncate">{req.user}</p>
                        <p className="text-[7px] font-bold text-slate-300 uppercase mt-0.5">{req.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                       {req.method === 'EasyPaisa' ? <Smartphone className="w-3.5 h-3.5 text-emerald-500" /> : <SmartphoneNfc className="w-3.5 h-3.5 text-rose-500" />}
                       <span className="text-[10px] font-black text-slate-600">{req.account}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-black text-slate-900 tracking-tighter">Rs. {req.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">
                    {req.status === 'Pending' ? (
                      <div className="flex items-center justify-end space-x-1.5">
                        <button onClick={() => handleReject(req)} className="p-2 bg-rose-50 text-rose-400 hover:bg-rose-500 hover:text-white rounded-lg transition-all"><X className="w-4 h-4" /></button>
                        <button 
                          disabled={loadingId === req.id}
                          onClick={() => handleMarkPaid(req)}
                          className="px-4 py-2 bg-slate-950 text-white hover:bg-emerald-600 rounded-lg font-black text-[9px] uppercase tracking-widest shadow-md transition-all flex items-center"
                        >
                          {loadingId === req.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <><Check className="w-3.5 h-3.5 mr-1.5" /> Disburse</>}
                        </button>
                      </div>
                    ) : (
                      <div className={`inline-flex items-center px-3 py-1 rounded-lg text-[7px] font-black uppercase tracking-widest border ${req.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                        {req.status === 'Approved' ? <CheckCircle2 className="w-3 h-3 mr-1.5" /> : <X className="w-3 h-3 mr-1.5" />}
                        {req.status}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredRequests.length === 0 && (
            <div className="py-20 text-center flex flex-col items-center">
               <History className="w-10 h-10 text-gray-100 mb-4" />
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">No history in this node</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageWithdrawals;