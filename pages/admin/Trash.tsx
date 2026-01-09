import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trash2, 
  RefreshCcw, 
  Users, 
  Zap, 
  Layers, 
  Search, 
  Filter, 
  AlertTriangle,
  X,
  ShieldAlert,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Target
} from 'lucide-react';
import { restoreEntity, permanentDeleteEntity } from '../../api/controllers/adminController';
import { getAllPlans, restorePlan, purgePlan } from '../../api/controllers/planController';
import { useAuth } from '../../context/AuthContext';

const Trash: React.FC = () => {
  const { user: adminUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'users' | 'tasks' | 'plans'>('users');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isRestoring, setIsRestoring] = useState<string | null>(null);

  const [deletedItems, setDeletedItems] = useState<any>({
    users: [
      { id: 'u_del_1', name: 'Zohaib Ali', email: 'zohaib@del.com', deletedAt: 'Oct 24, 10:30 AM' },
      { id: 'u_del_2', name: 'Sara Khan', email: 'sara@del.com', deletedAt: 'Oct 22, 02:15 PM' }
    ],
    tasks: [
      { id: 't_del_1', title: 'Old English Essay', reward: 150, deletedAt: 'Oct 20, 11:00 AM' }
    ],
    plans: [] // Fetched dynamically
  });

  useEffect(() => {
    if (activeTab === 'plans') {
      getAllPlans(true).then(data => {
        setDeletedItems((prev: any) => ({ ...prev, plans: data }));
      });
    }
  }, [activeTab]);

  const handleRestore = async (item: any) => {
    setIsRestoring(item.id);
    await new Promise(r => setTimeout(r, 1200));
    
    if (activeTab === 'plans') await restorePlan(item.id);
    else await restoreEntity(activeTab, item.id, adminUser);
    
    setDeletedItems((prev: any) => ({
      ...prev,
      [activeTab]: prev[activeTab].filter((i: any) => i.id !== item.id)
    }));
    
    setIsRestoring(null);
  };

  const handlePermanentDelete = async () => {
    if (!selectedItem) return;
    
    if (activeTab === 'plans') await purgePlan(selectedItem.id);
    else await permanentDeleteEntity(activeTab, selectedItem.id, adminUser);
    
    setDeletedItems((prev: any) => ({
      ...prev,
      [activeTab]: prev[activeTab].filter((i: any) => i.id !== selectedItem.id)
    }));
    setIsDeleteModalOpen(false);
    setSelectedItem(null);
  };

  const tabs = [
    { id: 'users', label: 'Personnel', icon: Users },
    { id: 'tasks', label: 'Payloads', icon: Zap },
    { id: 'plans', label: 'Revenue Tiers', icon: Layers }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20 px-1 scale-[0.98] origin-top">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-[1.5rem] bg-slate-950 flex items-center justify-center border border-slate-800 shadow-xl">
             <Trash2 className="w-6 h-6 text-pink-400" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 uppercase leading-none">Recycle Vault</h1>
            <p className="text-[8px] text-slate-400 font-bold uppercase tracking-[0.3em] mt-1.5">Entity Decommissioning Console</p>
          </div>
        </div>
        <div className="flex bg-pink-50 p-1 rounded-xl border border-pink-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-lg transition-all flex items-center space-x-2.5 ${
                activeTab === tab.id ? 'bg-white text-pink-500 shadow-sm border border-pink-100' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span className="text-[10px] font-black uppercase tracking-tight">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-pink-50 shadow-sm overflow-hidden min-h-[400px]">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-pink-50/50 border-b border-pink-100">
                <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Node Signature</th>
                <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Decommission Date</th>
                <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Ops Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-50">
              <AnimatePresence mode="popLayout">
                {deletedItems[activeTab].map((item: any) => (
                  <motion.tr 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="hover:bg-pink-50/10 transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-slate-400 font-black text-[12px] uppercase border border-gray-100 shadow-inner">
                          {item.name?.[0] || item.title?.[0]}
                        </div>
                        <div>
                          <p className="text-[11px] font-black text-slate-900 uppercase leading-none mb-1.5">{item.name || item.title}</p>
                          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest truncate max-w-[200px]">{item.email || `Payload Yield: Rs. ${item.reward || item.price}`}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       <p className="text-[10px] font-black text-slate-600 uppercase tracking-tight">{item.deletedAt || 'Legacy Purge'}</p>
                       <span className="text-[7px] font-black text-rose-400 uppercase tracking-tighter">Isolation Mode Active</span>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <div className="flex items-center justify-end space-x-2">
                          <button 
                            disabled={isRestoring === item.id}
                            onClick={() => handleRestore(item)}
                            className="p-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm active:scale-90"
                            title="Synchronize Node Back to Cluster"
                          >
                             {isRestoring === item.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCcw className="w-4 h-4" />}
                          </button>
                          <button 
                            onClick={() => { setSelectedItem(item); setIsDeleteModalOpen(true); }}
                            className="p-3 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-sm active:scale-90"
                            title="Permanent Logic Erasure"
                          >
                             <Trash2 className="w-4 h-4" />
                          </button>
                       </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {deletedItems[activeTab].length === 0 && (
            <div className="py-32 text-center flex flex-col items-center">
               <div className="w-20 h-20 bg-emerald-50 rounded-[2.5rem] flex items-center justify-center mb-6 shadow-inner">
                 <ShieldCheck className="w-10 h-10 text-emerald-300" />
               </div>
               <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">Vault Status: Synchronized</p>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/95 backdrop-blur-md" onClick={() => setIsDeleteModalOpen(false)} />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-[3rem] p-10 shadow-2xl text-center border border-white/20"
            >
              <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                <ShieldAlert className="w-10 h-10" />
              </div>
              <h2 className="text-xl font-black text-slate-900 mb-3 uppercase tracking-tighter">Fatal Erasure Node</h2>
              <p className="text-[11px] text-slate-400 font-medium mb-10 leading-relaxed uppercase tracking-tight">
                Warning: Erasing <span className="text-rose-500 font-black underline">{selectedItem?.name || selectedItem?.title}</span> will permanently purge all associated metadata from the platform core. This is <span className="text-rose-600 font-black">irreversible</span>.
              </p>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 py-4 bg-slate-100 text-slate-500 font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all"
                >
                  ABORT
                </button>
                <button 
                  onClick={handlePermanentDelete}
                  className="flex-[2] py-4 bg-rose-500 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-rose-200 active:scale-95 transition-all"
                >
                  EXECUTE PURGE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Trash;