
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Users, 
  Fingerprint, 
  ChevronRight, 
  X, 
  Ban, 
  ShieldCheck, 
  ArrowDown, 
  Briefcase, 
  Network, 
  Save, 
  ArrowRight,
  Filter
} from 'lucide-react';

const UserManager: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const users = [
    { id: 'u_1', name: 'Zaid Khan', email: 'zaid@node.com', balance: 4500, status: 'active', joined: 'Oct 12', tier: 'Gold Package' },
    { id: 'u_2', name: 'Fatima Ali', email: 'fatima@node.com', balance: 12000, status: 'active', joined: 'Sep 28', tier: 'Diamond Pro' },
  ];

  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto space-y-3 pb-20 px-1 scale-[0.98] origin-top">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 px-2 py-3 bg-white rounded-2xl border border-pink-50 shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center text-pink-400">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-xs font-black text-slate-900 uppercase">Registry</h1>
            <p className="text-[7px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Personnel Management</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-300" />
            <input 
              value={search} onChange={e => setSearch(e.target.value)} 
              placeholder="Find Worker..." 
              className="bg-gray-50 border border-gray-100 rounded-lg py-1.5 pl-8 pr-3 text-[10px] font-black uppercase outline-none focus:border-pink-300 w-48" 
            />
          </div>
          <button className="p-1.5 bg-gray-50 rounded-lg text-slate-400 border border-gray-100"><Filter className="w-3.5 h-3.5" /></button>
        </div>
      </div>

      <div className="bg-white rounded-[1.8rem] border border-pink-50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-pink-50/30 border-b border-pink-50">
                <th className="px-5 py-3 text-[7px] font-black text-slate-400 uppercase tracking-widest">Worker</th>
                <th className="px-5 py-3 text-[7px] font-black text-slate-400 uppercase tracking-widest">Tier Node</th>
                <th className="px-5 py-3 text-[7px] font-black text-slate-400 uppercase tracking-widest text-right">Commit Ops</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-50">
              {filteredUsers.map(u => (
                <tr key={u.id} className="hover:bg-pink-50/10 group transition-colors cursor-pointer" onClick={() => setSelectedUser(u)}>
                  <td className="px-5 py-3">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-7 h-7 rounded-lg bg-pink-100 flex items-center justify-center font-black text-pink-600 text-[10px] uppercase">{u.name[0]}</div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-black text-slate-900 uppercase truncate leading-none">{u.name}</p>
                        <p className="text-[7px] font-bold text-slate-300 uppercase mt-1 truncate">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="px-1.5 py-0.5 bg-pink-50 border border-pink-100 rounded text-[7px] font-black text-pink-500 uppercase">{u.tier}</span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button className="p-1.5 bg-slate-900 text-white rounded-lg hover:bg-pink-500 shadow-sm"><ChevronRight className="w-3 h-3" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Identity Terminal - Compact Drawer */}
      <AnimatePresence>
        {selectedUser && (
          <div className="fixed inset-0 z-[250] flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={() => setSelectedUser(null)} />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              className="relative w-full max-w-[340px] bg-white h-full shadow-2xl flex flex-col"
            >
              <div className="p-5 border-b border-pink-50 flex items-center justify-between bg-white">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-slate-950 text-pink-400 rounded-lg flex items-center justify-center shadow-lg"><Fingerprint className="w-4 h-4" /></div>
                  <div>
                    <h2 className="text-[10px] font-black text-slate-900 uppercase">Audit Terminal</h2>
                    <p className="text-[7px] font-bold text-slate-400 uppercase mt-0.5">Node: {selectedUser.id}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedUser(null)} className="p-1.5 bg-pink-50 rounded-lg text-pink-400"><X className="w-5 h-5" /></button>
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-6">
                <div className="bg-pink-50 rounded-[1.8rem] p-6 border border-pink-100 text-center">
                    <div className="w-16 h-16 rounded-[1.2rem] bg-white p-0.5 shadow-lg border border-pink-200 mx-auto mb-3">
                      <div className="w-full h-full rounded-[1rem] bg-pink-400 flex items-center justify-center font-black text-white text-xl uppercase">{selectedUser.name[0]}</div>
                    </div>
                    <h3 className="text-xs font-black text-slate-900 uppercase leading-none">{selectedUser.name}</h3>
                    <p className="text-[7px] font-bold text-slate-400 uppercase mt-1.5">{selectedUser.email}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2 px-1">
                    <Briefcase className="w-3 h-3 text-pink-500" />
                    <h4 className="text-[8px] font-black text-slate-900 uppercase tracking-widest">Statistics</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100 text-center">
                       <p className="text-[7px] font-black text-slate-400 uppercase mb-1">Balance</p>
                       <p className="text-xs font-black text-slate-900">Rs. {selectedUser.balance}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100 text-center">
                       <p className="text-[7px] font-black text-slate-400 uppercase mb-1">Status</p>
                       <p className="text-[8px] font-black text-emerald-600 uppercase">{selectedUser.status}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                   <button className="py-2.5 bg-slate-950 text-white rounded-xl font-black text-[8px] uppercase tracking-widest flex items-center justify-center hover:bg-rose-600 transition-all"><ArrowRight className="w-3 h-3 mr-1.5" /> Session</button>
                   <button className="py-2.5 border-2 border-rose-100 text-rose-500 rounded-xl font-black text-[8px] uppercase tracking-widest flex items-center justify-center hover:bg-rose-50 transition-all"><Ban className="w-3 h-3 mr-1.5" /> Suspend</button>
                </div>
              </div>

              <div className="p-5 border-t border-pink-50">
                <button 
                  onClick={() => setSelectedUser(null)}
                  className="w-full py-3.5 bg-slate-950 text-white rounded-2xl font-black text-[9px] uppercase tracking-[0.2em] shadow-xl"
                >
                  Commit Logic Sync
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserManager;
