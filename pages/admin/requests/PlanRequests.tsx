
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  X, 
  Eye, 
  Search, 
  Filter, 
  ShieldCheck
} from 'lucide-react';

const PlanRequests: React.FC = () => {
  const [requests, setRequests] = useState([
    { id: 'req_101', user: 'Zaid K.', plan: 'Gold', price: 3500, trxId: 'TXN8829', date: '2m' },
    { id: 'req_102', user: 'Fatima A.', plan: 'Std.', price: 2000, trxId: 'JZC7721', date: '15m' },
  ]);

  const [selectedProof, setSelectedProof] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto space-y-4 pb-20 px-1">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 px-1">
        <div>
          <h1 className="text-xl font-black text-gray-900 leading-none">Upgrade Audits</h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Payment Verification</p>
        </div>
        <div className="flex items-center space-x-1.5">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
            <input placeholder="TrxID..." className="bg-white border border-gray-100 rounded-lg py-1.5 pl-8 pr-3 text-[10px] font-black uppercase outline-none focus:border-pink-400 w-full md:w-48 shadow-sm" />
          </div>
          <button className="p-2 bg-white border border-gray-100 rounded-lg text-gray-400 shadow-sm"><Filter className="w-3.5 h-3.5" /></button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">User/Plan</th>
                <th className="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">TrxID</th>
                <th className="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest text-right">Ops</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-pink-50/20 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-[11px] font-black text-gray-900 leading-none mb-1">{req.user}</p>
                    <p className="text-[8px] font-black text-pink-600 uppercase tracking-tighter">{req.plan} • Rs. {req.price}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="bg-gray-50 px-2 py-1 rounded text-[10px] font-bold text-gray-500 w-fit">{req.trxId}</div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <button onClick={() => setSelectedProof('https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg')} className="p-1.5 bg-gray-50 text-gray-400 rounded-lg"><Eye className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg"><Check className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 bg-rose-50 text-rose-600 rounded-lg"><X className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selectedProof && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setSelectedProof(null)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-2xl p-2 max-w-xs w-full shadow-2xl overflow-hidden relative" onClick={e => e.stopPropagation()}>
              <img src={selectedProof} className="w-full h-auto rounded-xl" alt="Proof" />
              <button onClick={() => setSelectedProof(null)} className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full"><X className="w-4 h-4" /></button>
              <div className="p-3 text-center"><p className="text-[10px] font-black text-gray-400 uppercase">Match TrxID and Confirm</p></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlanRequests;
