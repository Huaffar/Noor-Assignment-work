
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  X, 
  Eye, 
  Search, 
  Filter, 
  CheckCircle2, 
  Loader2, 
  AlertTriangle, 
  Layers, 
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

  if (loading) return <div className="p-20 text-center"><Loader2 className="w-8 h-8 text-pink-500 animate-spin mx-auto" /></div>;

  return (
    <div className="max-w-7xl mx-auto space-y-3 pb-20 px-1 scale-[0.98] origin-top">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 px-3 py-3 bg-white p-4 rounded-2xl border border-pink-50 shadow-sm mx-1">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 bg-slate-950 text-pink-500 rounded-lg flex items-center justify-center shadow-lg"><Layers className="w-4 h-4" /></div>
          <div>
            <h1 className="text-xs font-black text-slate-900 uppercase leading-none">Activation Matrix</h1>
            <p className="text-[7px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Tier Verification</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex bg-gray-100 p-0.5 rounded-lg border border-gray-200">
            {['Pending', 'Approved', 'Rejected'].map(s => (
              <button key={s} onClick={() => setFilter(s as any)} className={`px-3 py-1 rounded-md text-[7px] font-black uppercase transition-all ${filter === s ? 'bg-white text-pink-600 shadow-sm' : 'text-slate-400'}`}>{s}</button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-300" />
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Find ID..." className="bg-gray-50 border border-gray-100 rounded-lg py-1 pl-6 pr-2 text-[9px] font-black uppercase outline-none focus:border-pink-300 w-32" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[1.8rem] border border-pink-50 shadow-sm overflow-hidden mx-1">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-pink-50/20 border-b border-pink-50">
                <th className="px-5 py-3 text-[7px] font-black text-slate-400 uppercase tracking-widest">Worker Node</th>
                <th className="px-5 py-3 text-[7px] font-black text-slate-400 uppercase tracking-widest">Tier / Asset</th>
                <th className="px-5 py-3 text-[7px] font-black text-slate-400 uppercase tracking-widest">Trace</th>
                <th className="px-5 py-3 text-[7px] font-black text-slate-400 uppercase tracking-widest text-right">Ops</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-50">
              {filteredRequests.map((req) => (
                <tr key={req.id} className="hover:bg-pink-50/5 group transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center space-x-2">
                       <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center font-black text-pink-500 text-[9px] uppercase">{req.user[0]}</div>
                       <div className="min-w-0">
                          <p className="text-[10px] font-black text-slate-900 uppercase truncate leading-none">{req.user}</p>
                          <p className="text-[7px] font-bold text-slate-400 uppercase mt-1">ID: {req.userId}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-[8px] font-black text-pink-500 uppercase">Rs. {req.price}</span>
                    <p className="text-[7px] font-bold text-slate-400 uppercase">{req.plan}</p>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center space-x-1.5">
                       <div className="bg-gray-50 border border-gray-100 px-1.5 py-0.5 rounded text-[8px] font-black text-slate-500 font-mono">{req.trxId}</div>
                       <button onClick={() => setSelectedProof(req.proof)} className="p-1 bg-pink-50 text-pink-500 rounded hover:bg-pink-500 hover:text-white transition-all"><Eye className="w-3 h-3" /></button>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right">
                    {req.status === 'Pending' ? (
                      <div className="flex items-center justify-end space-x-1">
                        <button className="p-1.5 bg-rose-50 text-rose-400 rounded-lg"><X className="w-3 h-3" /></button>
                        <button onClick={() => handleVerify(req)} className="px-3 py-1.5 bg-slate-950 text-white rounded-lg font-black text-[8px] uppercase tracking-widest">Verify</button>
                      </div>
                    ) : (
                      <div className={`inline-flex items-center px-2 py-0.5 rounded text-[6px] font-black uppercase tracking-widest border ${req.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] bg-slate-950/95 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedProof(null)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-[2rem] p-2 max-w-xs shadow-2xl relative" onClick={e => e.stopPropagation()}>
              <img src={selectedProof} className="w-full h-auto rounded-[1.5rem]" alt="Proof" />
              <button onClick={() => setSelectedProof(null)} className="absolute top-4 right-4 p-1.5 bg-black/60 text-white rounded-full"><X className="w-4 h-4" /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlanRequests;
