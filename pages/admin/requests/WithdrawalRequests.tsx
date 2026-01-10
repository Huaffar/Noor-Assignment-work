
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  Clock, 
  Search,
  Filter,
  Check,
  X
} from 'lucide-react';

const WithdrawalRequests: React.FC = () => {
  const [requests, setRequests] = useState([
    {
      id: 'wd_201',
      user: 'Zaid Khan',
      amount: 4500,
      method: 'EasyPaisa',
      accountName: 'Zaid Khan',
      accountNumber: '03001234567',
      date: '1h ago'
    },
    {
      id: 'wd_202',
      user: 'Fatima Ali',
      amount: 12000,
      method: 'JazzCash',
      accountName: 'Fatima Ali Pervaiz',
      accountNumber: '03017654321',
      date: '3h ago'
    },
    {
      id: 'wd_203',
      user: 'Omar Malik',
      amount: 2500,
      method: 'Bank Transfer',
      accountName: 'Omar Malik',
      accountNumber: 'PK12HABA000000123456789',
      date: '5h ago'
    }
  ]);

  const handleProcess = (id: string, action: 'approve' | 'reject') => {
    setRequests(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 space-y-4 px-1">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 px-1">
        <div>
          <h1 className="text-xl font-black text-gray-900 leading-none uppercase tracking-tight">Payout Hub</h1>
          <p className="text-[7px] text-gray-400 font-bold uppercase tracking-widest mt-1">Pending Ledger: Rs. {requests.reduce((sum, r) => sum + r.amount, 0).toLocaleString()}</p>
        </div>
        <div className="flex items-center space-x-2">
           <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
              <input className="bg-white border border-gray-100 rounded-lg py-1.5 pl-8 pr-3 text-[10px] font-black uppercase outline-none focus:border-rose-400 w-40 shadow-sm" placeholder="Find Node..." />
           </div>
           <button className="p-1.5 bg-white border border-gray-100 rounded-lg text-gray-400"><Filter className="w-3.5 h-3.5" /></button>
        </div>
      </div>

      <div className="space-y-2">
        <AnimatePresence>
          {requests.map((req) => (
            <motion.div
              key={req.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-center space-x-3.5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                  req.method === 'EasyPaisa' ? 'bg-emerald-50 text-emerald-600' : 
                  req.method === 'JazzCash' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'
                }`}>
                  {req.method[0]}
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-black text-gray-900 uppercase leading-none mb-1 truncate">{req.user}</h3>
                  <div className="flex items-center text-[7px] font-black text-gray-400 uppercase tracking-tighter">
                    <Clock className="w-2.5 h-2.5 mr-1" /> Requested {req.date}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:flex sm:items-center gap-4 flex-1">
                <div className="px-2 border-l border-gray-50">
                  <p className="text-[6px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Gateway / Acc</p>
                  <p className="text-[9px] font-bold text-gray-900 leading-tight">{req.method}</p>
                  <p className="text-[8px] font-black text-rose-600 truncate">{req.accountNumber}</p>
                </div>
                <div className="px-2 border-l border-gray-50">
                  <p className="text-[6px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Asset Value</p>
                  <p className="text-sm font-black text-gray-900 tracking-tighter">Rs. {req.amount.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center space-x-1.5 shrink-0">
                <button 
                  onClick={() => handleProcess(req.id, 'reject')}
                  className="p-2 bg-gray-50 text-gray-400 hover:text-rose-600 rounded-xl transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleProcess(req.id, 'approve')}
                  className="px-4 py-2 bg-slate-900 text-white hover:bg-emerald-600 rounded-xl font-black text-[9px] uppercase tracking-widest shadow-lg transition-all flex items-center"
                >
                  <Check className="w-3 h-3 mr-1.5" /> Transact
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {requests.length === 0 && (
          <div className="p-16 text-center bg-gray-50/50 border border-dashed border-gray-200 rounded-[2rem]">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
            <h2 className="text-sm font-black text-gray-400 uppercase">Ledger Balanced</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawalRequests;
