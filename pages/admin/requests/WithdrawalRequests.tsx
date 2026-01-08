
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Banknote, 
  CheckCircle2, 
  XCircle, 
  ArrowUpRight, 
  Clock, 
  Phone, 
  Wallet,
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
    // In real app:
    // Approve -> Mark as Paid
    // Reject -> Mark as Rejected & refund user balance
    setRequests(prev => prev.filter(r => r.id !== id));
    console.log(`${action.toUpperCase()} Withdrawal Request: ${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black text-gray-900">Payout Hub</h1>
          <p className="text-gray-500 font-medium">Process user withdrawals once you have transferred funds manually.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-emerald-50 text-emerald-600 px-4 py-3 rounded-2xl font-black text-xs border border-emerald-100 flex items-center">
            <Banknote className="w-4 h-4 mr-2" />
            Total Pending: Rs. {requests.reduce((sum, r) => sum + r.amount, 0).toLocaleString()}
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        <AnimatePresence>
          {requests.map((req, idx) => (
            <motion.div
              key={req.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-8 group"
            >
              <div className="flex items-center space-x-6 lg:w-1/4">
                <div className={`w-16 h-16 rounded-3xl flex items-center justify-center text-xl font-black ${
                  req.method === 'EasyPaisa' ? 'bg-emerald-50 text-emerald-600' : 
                  req.method === 'JazzCash' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'
                }`}>
                  {req.method[0]}
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900">{req.user}</h3>
                  <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    Requested {req.date}
                  </div>
                </div>
              </div>

              <div className="lg:w-1/4">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Payment Method</p>
                <div className="flex items-center">
                  <span className="font-bold text-gray-900">{req.method}</span>
                  <span className="mx-2 text-gray-200">|</span>
                  <span className="text-sm font-medium text-gray-500">{req.accountName}</span>
                </div>
                <div className="flex items-center mt-2 text-sm font-black text-rose-600">
                  <Phone className="w-3.5 h-3.5 mr-2" />
                  {req.accountNumber}
                </div>
              </div>

              <div className="lg:w-1/5">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Payout Amount</p>
                <p className="text-3xl font-black text-gray-900">Rs. {req.amount.toLocaleString()}</p>
              </div>

              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => handleProcess(req.id, 'reject')}
                  className="flex-1 lg:flex-none px-8 py-4 bg-gray-50 text-gray-400 font-black rounded-2xl hover:bg-red-50 hover:text-red-600 transition-all flex items-center justify-center"
                >
                  <X className="w-5 h-5 mr-2" /> Reject
                </button>
                <button 
                  onClick={() => handleProcess(req.id, 'approve')}
                  className="flex-1 lg:flex-none px-10 py-4 bg-gray-900 text-white font-black rounded-2xl hover:bg-rose-600 transition-all flex items-center justify-center shadow-xl shadow-gray-200 group/btn"
                >
                  <Check className="w-5 h-5 mr-2 group-hover/btn:scale-125 transition-transform" /> Mark as Paid
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {requests.length === 0 && (
          <div className="p-20 text-center bg-gray-50/50 border-4 border-dashed border-gray-100 rounded-[3rem]">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-gray-400">All Payouts Settled</h2>
            <p className="text-gray-400 font-medium">No pending withdrawal requests in the queue.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawalRequests;
