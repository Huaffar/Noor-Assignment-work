
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  X, 
  Eye, 
  Search, 
  Layers, 
  Loader2, 
  CheckCircle2, 
  ClipboardList 
} from 'lucide-react';
import { approvePlanRequest, rejectPlanRequest, getPlanRequests } from '../../../api/controllers/adminController';

const PlanRequests: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'Pending' | 'Approved' | 'Rejected'>('Pending');
  const [requests, setRequests] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProof, setSelectedProof] = useState<string | null>(null);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getPlanRequests();
      setRequests(data || []);
    } catch (err) { setRequests([]); }
    finally { setLoading(false); }
  };

  const handleVerify = async (req: any) => {
    await approvePlanRequest(req.userId, req.id, req.plan, req.price);
    setRequests(prev => prev.map(r => r.id === req.id ? { ...r, status: 'Approved' } : r));
  };

  const filteredRequests = useMemo(() => {
    return requests.filter(r => r.status === filter && r.trxId.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [requests, filter, searchQuery]);

  if (loading) return <div className="p-20 text-center"><Loader2 className="w-10 h-10 text-theme-primary animate-spin mx-auto" /></div>;

  return (
    <div className="max-w-7xl mx-auto space-y-4 pb-20 px-1 scale-[0.98] origin-top">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 px-4 py-4 themed-card rounded-2xl shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 themed-gradient text-white rounded-xl flex items-center justify-center shadow-lg"><Layers className="w-5 h-5" /></div>
          <div>
            <h1 className="text-sm font-black text-theme-text uppercase leading-none">Plan Requests</h1>
            <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mt-1">Buy Requests Waiting</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex bg-theme-secondary/50 p-1 rounded-xl border border-gray-100">
            {['Pending', 'Approved', 'Rejected'].map(s => (
              <button key={s} onClick={() => setFilter(s as any)} className={`px-4 py-2 rounded-lg text-[8px] font-black uppercase transition-all ${filter === s ? 'bg-white text-theme-primary shadow-sm' : 'text-gray-400'}`}>{s}</button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Find TrxID..." className="bg-theme-bg border border-theme-bg rounded-xl py-2 pl-10 pr-4 text-[10px] font-black uppercase outline-none focus:border-theme-primary w-40" />
          </div>
        </div>
      </div>

      <div className="themed-card rounded-[2rem] shadow-sm overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-theme-secondary/20 border-b border-theme-bg">
                <th className="px-6 py-4 text-[8px] font-black text-gray-400 uppercase tracking-widest">Member</th>
                <th className="px-6 py-4 text-[8px] font-black text-gray-400 uppercase tracking-widest">Plan Detail</th>
                <th className="px-6 py-4 text-[8px] font-black text-gray-400 uppercase tracking-widest">Trx ID</th>
                <th className="px-6 py-4 text-[8px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-theme-bg">
              {filteredRequests.map((req) => (
                <tr key={req.id} className="hover:bg-theme-secondary/5 group transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                       <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center font-black text-white text-[10px] uppercase shadow-md">{req.user[0]}</div>
                       <div className="min-w-0">
                          <p className="text-[11px] font-black text-theme-text uppercase truncate leading-none">{req.user}</p>
                          <p className="text-[8px] font-bold text-gray-300 uppercase mt-1.5">ID: {req.userId}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[10px] font-black text-theme-primary uppercase leading-none mb-1">Rs. {req.price}</p>
                    <p className="text-[8px] font-bold text-gray-400 uppercase">{req.plan}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                       <div className="bg-theme-bg border border-theme-bg px-2 py-1 rounded text-[9px] font-black text-gray-500 font-mono tracking-tight">{req.trxId}</div>
                       <button onClick={() => setSelectedProof(req.proof)} className="p-2 bg-theme-secondary text-theme-primary rounded-xl hover:bg-theme-primary hover:text-white transition-all"><Eye className="w-4 h-4" /></button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {req.status === 'Pending' ? (
                      <div className="flex items-center justify-end space-x-2">
                        <button className="p-2.5 bg-rose-50 text-rose-500 rounded-xl"><X className="w-4.5 h-4.5" /></button>
                        <button onClick={() => handleVerify(req)} className="px-5 py-2.5 bg-slate-950 text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg">APPROVE</button>
                      </div>
                    ) : (
                      <div className={`inline-flex items-center px-3 py-1 rounded-lg text-[7px] font-black uppercase tracking-widest border ${req.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                         {req.status}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selectedProof && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-6" onClick={() => setSelectedProof(null)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="themed-card rounded-[2.5rem] p-2 max-w-sm shadow-2xl relative" onClick={e => e.stopPropagation()}>
              <img src={selectedProof} className="w-full h-auto rounded-[2rem]" alt="Proof" />
              <button onClick={() => setSelectedProof(null)} className="absolute top-6 right-6 p-2.5 bg-black/60 text-white rounded-full"><X className="w-5 h-5" /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlanRequests;
