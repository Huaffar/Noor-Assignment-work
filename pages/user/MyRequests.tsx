
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  History, 
  ArrowUpRight, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  XCircle,
  Search,
  Filter
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved':
      case 'Completed':
        return <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-green-100 text-green-800 border border-green-200">Approved</span>;
      case 'Pending':
        return <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-yellow-100 text-yellow-800 border border-yellow-200">Pending</span>;
      case 'Rejected':
        return <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-red-100 text-red-800 border border-red-200">Rejected</span>;
      default:
        return <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-gray-100 text-gray-800 border border-gray-200">{status}</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900">Request Hub</h1>
          <p className="text-gray-500 font-medium">Track your financial interactions and plan upgrades.</p>
        </div>
        
        <div className="flex p-1.5 bg-gray-100 rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab('withdrawals')}
            className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center ${
              activeTab === 'withdrawals' ? 'bg-white text-rose-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <ArrowUpRight className="w-4 h-4 mr-2" /> Withdrawals
          </button>
          <button
            onClick={() => setActiveTab('plans')}
            className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center ${
              activeTab === 'plans' ? 'bg-white text-rose-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <ShieldCheck className="w-4 h-4 mr-2" /> Plan Purchases
          </button>
        </div>
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Request ID</th>
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  {activeTab === 'withdrawals' ? 'Amount / Method' : 'Plan / Price'}
                </th>
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence mode="popLayout">
                {(activeTab === 'withdrawals' ? withdrawalHistory : planHistory).map((req, idx) => (
                  <motion.tr 
                    key={req.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-rose-50/5 transition-colors"
                  >
                    <td className="px-10 py-6 text-sm font-bold text-gray-500">{req.date}</td>
                    <td className="px-10 py-6">
                      <code className="text-xs font-black text-rose-600 bg-rose-50 px-2 py-1 rounded-lg">#{req.id}</code>
                    </td>
                    <td className="px-10 py-6">
                      <p className="font-black text-gray-900">
                        {activeTab === 'withdrawals' 
                          ? `Rs. ${(req as any).amount.toLocaleString()}` 
                          : (req as any).plan}
                      </p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        {activeTab === 'withdrawals' ? (req as any).method : `Rs. ${(req as any).price.toLocaleString()}`}
                      </p>
                    </td>
                    <td className="px-10 py-6 text-right">
                      {getStatusBadge(req.status)}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        
        {((activeTab === 'withdrawals' ? withdrawalHistory : planHistory).length === 0) && (
          <div className="p-20 text-center">
            <Clock className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No records found</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MyRequests;
