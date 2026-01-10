import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Users, 
  Fingerprint, 
  ChevronRight, 
  X, 
  Ban, 
  Filter,
  UserCheck,
  CreditCard,
  LayoutDashboard,
  ShieldCheck,
  Banknote,
  Activity,
  MoreVertical,
  Mail,
  Phone
} from 'lucide-react';

const UserManager: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [activeView, setActiveView] = useState<'info' | 'financial' | 'audit'>('info');

  const users = [
    { id: 'u_1', name: 'Ahmed Raza', email: 'ahmed@noor.com', whatsapp: '03001234567', balance: 4500, earned: 12000, withdrawn: 7500, status: 'Active', joined: '12 Oct 23', tier: 'Gold Plan', lastActivity: '2m ago' },
    { id: 'u_2', name: 'Sana Khan', email: 'sana@noor.com', whatsapp: '03017772221', balance: 12000, earned: 24000, withdrawn: 12000, status: 'Active', joined: '28 Sep 23', tier: 'Diamond Plan', lastActivity: '1h ago' },
    { id: 'u_3', name: 'Bilal Malik', email: 'bilal@ops.com', whatsapp: '03221114445', balance: 150, earned: 800, withdrawn: 0, status: 'Pending', joined: 'Yesterday', tier: 'Basic Plan', lastActivity: '5h ago' },
    { id: 'u_4', name: 'Zohaib Ali', email: 'zohaib@hub.com', whatsapp: '03456667778', balance: 8400, earned: 15600, withdrawn: 7200, status: 'Active', joined: '15 Oct 23', tier: 'Gold Plan', lastActivity: 'Just now' },
  ];

  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto space-y-4 pb-20 px-1 scale-[0.98] origin-top">
      {/* Search & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 px-4 py-4 themed-card rounded-2xl shadow-sm border border-gray-100 mx-1">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center text-white shadow-lg">
            <Users className="w-5 h-5 text-theme-primary" />
          </div>
          <div>
            <h1 className="text-sm font-black text-slate-900 uppercase">Personnel Hub</h1>
            <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mt-1">Management of Worker Network</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
            <input 
              value={search} onChange={e => setSearch(e.target.value)} 
              placeholder="Search Members..." 
              className="bg-gray-50 border border-gray-100 rounded-xl py-2 pl-9 pr-4 text-[10px] font-black uppercase outline-none focus:border-theme-primary w-full md:w-48 shadow-inner" 
            />
          </div>
          <button className="p-2.5 bg-slate-100 rounded-xl text-slate-400 hover:text-theme-primary transition-colors"><Filter className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Grid of User Cards: Single column for mobile, multiple for larger screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-1">
        {filteredUsers.map(u => (
          <motion.div 
            key={u.id} 
            layout
            onClick={() => setSelectedUser(u)}
            className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="flex items-start justify-between mb-5">
               <div className="w-12 h-12 rounded-2xl bg-theme-secondary text-theme-primary flex items-center justify-center font-black text-lg uppercase shadow-inner">
                 {u.name[0]}
               </div>
               <div className={`px-3 py-1 rounded-full text-[7px] font-black uppercase tracking-widest border ${u.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                 {u.status}
               </div>
            </div>

            <div className="space-y-1.5">
               <h3 className="text-[12px] font-black text-slate-900 uppercase truncate leading-none">{u.name}</h3>
               <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest truncate">Joined {u.joined}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
               <div>
                  <p className="text-[7px] font-black text-gray-300 uppercase tracking-tighter mb-0.5">Balance</p>
                  <p className="text-[11px] font-black text-slate-900 leading-none">Rs. {u.balance.toLocaleString()}</p>
               </div>
               <div className="text-right">
                  <p className="text-[7px] font-black text-gray-300 uppercase tracking-tighter mb-0.5">Node Tier</p>
                  <p className="text-[9px] font-black text-theme-primary uppercase leading-none">{u.tier.split(' ')[0]}</p>
               </div>
            </div>

            <button className="absolute bottom-3 right-3 p-1.5 bg-gray-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0 translate-x-2">
               <ChevronRight className="w-4 h-4 text-theme-primary" />
            </button>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedUser && (
          <div className="fixed inset-0 z-[250] flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={() => setSelectedUser(null)} />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              className="relative w-full max-w-[340px] bg-white h-full shadow-2xl flex flex-col border-l border-white/20"
            >
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 bg-slate-950 text-white rounded-xl flex items-center justify-center shadow-lg"><Fingerprint className="w-5 h-5 text-theme-primary" /></div>
                  <div>
                    <h2 className="text-[11px] font-black text-slate-900 uppercase">State Protocol</h2>
                    <p className="text-[7px] font-bold text-gray-400 uppercase mt-0.5">Entity: {selectedUser.id}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedUser(null)} className="p-2 bg-gray-50 rounded-xl text-gray-400 hover:text-rose-500 transition-colors"><X className="w-4 h-4" /></button>
              </div>

              {/* View Switcher */}
              <div className="flex p-1 bg-gray-100 rounded-xl m-4 border border-gray-200">
                 {[
                   { id: 'info', icon: LayoutDashboard },
                   { id: 'financial', icon: Banknote },
                   { id: 'audit', icon: Activity }
                 ].map(v => (
                   <button key={v.id} onClick={() => setActiveView(v.id as any)} className={`flex-1 flex items-center justify-center py-2.5 rounded-lg transition-all ${activeView === v.id ? 'bg-white text-theme-primary shadow-sm' : 'text-gray-400'}`}>
                      <v.icon className="w-4 h-4" />
                   </button>
                 ))}
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar p-6 pt-0 space-y-6">
                <AnimatePresence mode="wait">
                  {activeView === 'info' && (
                    <motion.div key="i" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                       <div className="bg-gray-50 p-6 rounded-[2rem] text-center border border-gray-100 shadow-inner">
                          <div className="w-16 h-16 bg-white rounded-2xl shadow-xl mx-auto mb-4 flex items-center justify-center border border-gray-100">
                             <div className="w-full h-full rounded-[1rem] themed-gradient flex items-center justify-center font-black text-white text-xl uppercase">{selectedUser.name[0]}</div>
                          </div>
                          <h3 className="text-sm font-black text-slate-900 uppercase">{selectedUser.name}</h3>
                          <p className="text-[8px] font-bold text-gray-400 uppercase mt-1 tracking-widest">{selectedUser.email}</p>
                       </div>
                       <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100">
                             <span className="text-[8px] font-black text-gray-400 uppercase">WhatsApp</span>
                             <span className="text-[10px] font-black text-slate-700">{selectedUser.whatsapp}</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100">
                             <span className="text-[8px] font-black text-gray-400 uppercase">Account Tier</span>
                             <span className="text-[10px] font-black text-theme-primary">{selectedUser.tier}</span>
                          </div>
                       </div>
                    </motion.div>
                  )}

                  {activeView === 'financial' && (
                    <motion.div key="f" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                       <div className="grid grid-cols-2 gap-3">
                          <div className="p-4 bg-slate-950 rounded-2xl text-center shadow-lg">
                             <p className="text-[7px] font-black text-slate-500 uppercase mb-1">Balance</p>
                             <p className="text-base font-black text-white">Rs. {selectedUser.balance}</p>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                             <p className="text-[7px] font-black text-gray-400 uppercase mb-1">Withdrawn</p>
                             <p className="text-base font-black text-rose-500">Rs. {selectedUser.withdrawn}</p>
                          </div>
                       </div>
                    </motion.div>
                  )}

                  {activeView === 'audit' && (
                    <motion.div key="a" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                       <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-[2rem] text-center">
                          <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                          <p className="text-[10px] font-black text-emerald-700 uppercase">Verified State</p>
                          <p className="text-[7px] font-bold text-emerald-600/60 uppercase tracking-[0.2em] mt-1">Audit Success</p>
                       </div>
                       <div className="space-y-2">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-gray-100">
                               <div className="w-2 h-2 rounded-full bg-gray-200" />
                               <div className="min-w-0 flex-1">
                                  <p className="text-[9px] font-black text-slate-900 uppercase truncate">Login Track Sync</p>
                                  <p className="text-[7px] text-gray-400 uppercase">Hub 0{i}</p>
                               </div>
                            </div>
                          ))}
                       </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="p-5 space-y-2 border-t border-gray-50">
                 <button className="w-full py-3 themed-gradient text-white rounded-xl font-black text-[9px] uppercase tracking-widest shadow-xl flex items-center justify-center hover:brightness-110"><UserCheck className="w-4 h-4 mr-2" /> Commit Node Sync</button>
                 <button className="w-full py-3 bg-rose-50 text-rose-500 rounded-xl font-black text-[9px] uppercase tracking-widest border border-rose-100 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all"><Ban className="w-4 h-4 mr-2" /> Suspend Member</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserManager;