
import React, { useState } from 'react';
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
  ShieldAlert
} from 'lucide-react';
import { restoreEntity, permanentDeleteEntity } from '../../api/controllers/adminController';
import { useAuth } from '../../context/AuthContext';

const Trash: React.FC = () => {
  const { user: adminUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'users' | 'tasks' | 'plans'>('users');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const [deletedItems, setDeletedItems] = useState({
    users: [
      { id: 'u_del_1', name: 'Zohaib Ali', email: 'zohaib@del.com', deletedAt: 'Oct 24, 10:30 AM' },
      { id: 'u_del_2', name: 'Sara Khan', email: 'sara@del.com', deletedAt: 'Oct 22, 02:15 PM' }
    ],
    tasks: [
      { id: 't_del_1', title: 'Old English Essay', reward: 150, deletedAt: 'Oct 20, 11:00 AM' }
    ],
    plans: [
      { id: 'p_del_1', name: 'Legacy Starter', investment: 500, deletedAt: 'Sep 15, 09:00 AM' }
    ]
  });

  const handleRestore = async (item: any) => {
    await restoreEntity(activeTab, item.id, adminUser);
    const updated = { ...deletedItems };
    updated[activeTab] = updated[activeTab].filter((i: any) => i.id !== item.id);
    setDeletedItems(updated);
    alert(`${item.name || item.title} has been restored!`);
  };

  const handlePermanentDelete = async () => {
    if (!selectedItem) return;
    await permanentDeleteEntity(activeTab, selectedItem.id, adminUser);
    const updated = { ...deletedItems };
    updated[activeTab] = updated[activeTab].filter((i: any) => i.id !== selectedItem.id);
    setDeletedItems(updated);
    setIsDeleteModalOpen(false);
    setSelectedItem(null);
  };

  const tabs = [
    { id: 'users', label: 'Users', icon: Users },
    { id: 'tasks', label: 'Tasks', icon: Zap },
    { id: 'plans', label: 'Plans', icon: Layers }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20 px-1">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
        <div>
          <h1 className="text-xl font-black text-gray-900 leading-none">Recycle Bin</h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Managed Soft Delete Repository</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-2 ${
                activeTab === tab.id ? 'bg-white text-rose-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span className="text-[10px] font-black uppercase tracking-tight">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-start space-x-3 mb-4">
        <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
        <p className="text-[9px] font-bold text-rose-700 leading-relaxed uppercase tracking-tight">
          Entities in trash are restricted from active platform operations. Restore to reactivate or delete forever to purge from database.
        </p>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">Entity Name</th>
                <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">Deleted On</th>
                <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence mode="popLayout">
                {deletedItems[activeTab].map((item: any) => (
                  <motion.tr 
                    key={item.id}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 font-black text-[10px]">
                          {item.id[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-black text-gray-900 leading-none mb-1">{item.name || item.title}</p>
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest truncate max-w-[150px]">{item.email || `Rs. ${item.reward || item.investment}`}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                       <p className="text-[10px] font-black text-gray-600">{item.deletedAt}</p>
                    </td>
                    <td className="px-6 py-5 text-right">
                       <div className="flex items-center justify-end space-x-2">
                          <button 
                            onClick={() => handleRestore(item)}
                            className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-colors"
                            title="Restore"
                          >
                             <RefreshCcw className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => { setSelectedItem(item); setIsDeleteModalOpen(true); }}
                            className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition-colors"
                            title="Delete Permanently"
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
            <div className="p-20 text-center">
               <ShieldAlert className="w-12 h-12 text-gray-100 mx-auto mb-4" />
               <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Trash bin is empty for this node</p>
            </div>
          )}
        </div>
      </div>

      {/* Permanent Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setIsDeleteModalOpen(false)} />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-[2.5rem] p-8 shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-black text-gray-900 mb-2">Node Purge Confirmation</h2>
              <p className="text-[11px] text-gray-500 font-medium mb-8 leading-relaxed uppercase tracking-tight">
                This action is IRREVERSIBLE. All data associated with <span className="text-rose-600 font-black">{selectedItem?.name || selectedItem?.title}</span> will be permanently purged from our infrastructure.
              </p>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-500 font-black rounded-xl text-[10px] uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button 
                  onClick={handlePermanentDelete}
                  className="flex-[2] py-3 bg-rose-600 text-white font-black rounded-xl text-[10px] uppercase tracking-widest shadow-lg shadow-rose-200"
                >
                  Purge Forever
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
