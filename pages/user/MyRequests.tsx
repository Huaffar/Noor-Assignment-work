
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  ShieldCheck, 
  Clock, 
  Wallet,
  Calendar,
  ChevronRight,
  Search
} from 'lucide-react';

type Tab = 'withdrawals' | 'plans';

const MyRequests: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('withdrawals');

  const withdrawalHistory = [
    { id: 'WD-8821', amount: 2500, method: 'EasyPaisa', status: 'Pending', date: 'Oct 24, 2023' },
    { id: 'WD-7712', amount: 5000, method: 'JazzCash', status: 'Approved', date: 'Oct 20, 2023' },
    { id: 'WD-5541', amount: 1200, method: 'EasyPaisa', status: 'Rejected', date: 'Oct 15, 2023' },
  ];

  const planHistory = [
    { id: 'PL-9901', plan: 'Gold Package', price: 2000, status: 'Approved', date: 'Oct 10, 2023' },
    { id: 'PL-3321', plan: 'Student Bundle', price: 500, status: 'Approved', date: 'Sep 10, 2023' },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Approved':
      case 'Completed':
        return 'text-emerald-500 bg-emerald-50 border-emerald-100';
      case 'Pending':
        return 'text-amber-500 bg-amber-50 border-amber-100';
      case 'Rejected':
        return 'text-red-500 bg-red-50 border-red-100';
      default:
        return 'text-gray-400 bg-gray-50 border-gray-100';
    }
  };

  const data = activeTab === 'withdrawals' ? withdrawalHistory : planHistory;

  return (
    <div className="max-w-xl mx-auto space-y-4 pb-20 px-1">
      {/* Compact Header */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h1 className="text-lg font-black text-gray-900 leading-none">Request Hub</h1>
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">Transaction Node Logs</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('withdrawals')}
            className={`relative px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 ${
              activeTab === 'withdrawals' ? 'text-rose-600' : 'text-gray-400'
            }`}
          >
            {activeTab === 'withdrawals' && (
              <motion.div layoutId="activeTabReq" className="absolute inset-0 bg-white rounded-lg shadow-sm" />
            )}
            <span className="relative z-10 flex items-center space-x-1">
              <ArrowUpRight className="w-3 h-3" />
              <span className="text-[9px] font-black uppercase tracking-tight">Payouts</span>
            </span>
          </button>
          <button
            onClick={() => setActiveTab('plans')}
            className={`relative px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 ${
              activeTab === 'plans' ? 'text-rose-600' : 'text-gray-400'
            }`}
          >
            {activeTab === 'plans' && (
              <motion.div layoutId="activeTabReq" className="absolute inset-0 bg-white rounded-lg shadow-sm" />
            )}
            <span className="relative z-10 flex items-center space-x-1">
              <ShieldCheck className="w-3 h-3" />
              <span className="text-[9px] font-black uppercase tracking-tight">Plans</span>
            </span>
          </button>
        </div>
      </div>

      {/* High Density List */}
      <div className="space-y-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="space-y-2"
          >
            {data.length > 0 ? (
              data.map((item: any, idx) => (
                <div 
                  key={item.id}
                  className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group active:bg-gray-50 transition-all"
                >
                  <div className="flex items-center space-x-3.5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${activeTab === 'withdrawals' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                      {activeTab === 'withdrawals' ? <Wallet className="w-4.5 h-4.5" /> : <ShieldCheck className="w-4.5 h-4.5" />}
                    </div>
                    <div>
                      <h3 className="text-[11px] font-black text-gray-900 leading-tight mb-0.5">
                        {activeTab === 'withdrawals' ? item.method : item.plan}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">ID: {item.id}</span>
                        <span className="w-0.5 h-0.5 bg-gray-200 rounded-full" />
                        <span className="text-[9px] font-bold text-gray-400 leading-none uppercase">{item.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-[11px] font-black text-gray-900 leading-none mb-1.5">
                      Rs. {(item.amount || item.price).toLocaleString()}
                    </p>
                    <div className={`px-2 py-0.5 rounded-md border text-[7px] font-black uppercase tracking-widest inline-block ${getStatusStyle(item.status)}`}>
                      {item.status}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white p-12 rounded-[2rem] text-center border border-dashed border-gray-100">
                <Clock className="w-10 h-10 text-gray-100 mx-auto mb-3" />
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">No Node History</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mini Stats Summary Footer */}
      <div className="pt-2">
        <div className="bg-gray-100/50 rounded-2xl p-4 flex items-center justify-center space-x-4 border border-gray-100">
           <div className="flex items-center text-[8px] font-black text-gray-400 uppercase tracking-[0.2em]">
             <Calendar className="w-3 h-3 mr-2 text-rose-400" />
             Cycle Log Synchronized
           </div>
        </div>
      </div>
    </div>
  );
};

export default MyRequests;
