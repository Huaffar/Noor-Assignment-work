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
  Phone,
  Lock,
  Eye,
  EyeOff,
  RefreshCcw,
  ShieldAlert
} from 'lucide-react';

const UserManager: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [activeView, setActiveView] = useState<'info' | 'financial' | 'security'>('info');
  const [showPassword, setShowPassword] = useState(false);

  const users = [
    { id: 'u_1', name: 'Ahmed Raza', email: 'ahmed@noor.com', whatsapp: '03001234567', pass: 'noor1234', balance: 4500, earned: 12000, withdrawn: 7500, status: 'Active', joined: '12 Oct 23', tier: 'Gold Plan', lastActivity: '2m ago' },
    { id: 'u_2', name: 'Sana Khan', email: 'sana@noor.com', whatsapp: '03017772221', pass: 'sanaPass99', balance: 12000, earned: 24000, withdrawn: 12000, status: 'Active', joined: '28 Sep 23', tier: 'Diamond Plan', lastActivity: '1h ago' },
    { id: 'u_3', name: 'Bilal Malik', email: 'bilal@ops.com', whatsapp: '03221114445', pass: 'freshUser88', balance: 150, earned: 800, withdrawn: 0, status: 'Pending', joined: 'Yesterday', tier: 'Basic Plan', lastActivity: '5h ago' },
    { id: 'u_4', name: 'Zohaib Ali', email: 'zohaib@hub.com', whatsapp: '03456667778', pass: 'zohaibNode', balance: 8400, earned: 15600, withdrawn: 7200, status: 'Active', joined: '15 Oct 23', tier: 'Gold Plan', lastActivity: 'Just now' },
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
            <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mt-1">Worker Management Terminal</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
            <input 
              value={search} onChange={e => setSearch(e.target.value)} 
              placeholder="Search by ID or Name..." 
              className="bg-gray-50 border border-gray-100 rounded-xl py-2 pl-9 pr-4 text-[10px] font-black uppercase outline-none focus:border-theme-primary w-full md:w-48 shadow-inner" 
            />
          </div>
          <button className="p-2.5 bg-slate-100 rounded-xl text-slate-400 hover:text-theme-primary transition-colors"><Filter className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-1">
        {filteredUsers.map(u => (
          <motion.div 
            key={u.id} 
            layout
            onClick={() => { setSelectedUser(u); setActiveView('info'); setShowPassword(false); }}
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
               <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Joined {u.joined}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
               <div>
                  <p className="text-[7px] font-black text-gray-300 uppercase tracking-tighter mb-0.5">Wallet</p>
                  <p className="text-[11px] font-black text-slate-900 leading-none">Rs. {u.balance.toLocaleString()}</p>
               </div>
               <div className="text-right">
                  <p className="text-[7px] font-black text-gray-300 uppercase tracking-tighter mb-0.5">Plan Tier</p>
                  <p className="text-[9px] font-black text-theme-primary uppercase leading-none">{u.tier.split(' ')[0]}</p>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedUser && (
          <div className="fixed inset-0 z-[250] flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={() => setSelectedUser(null)} />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              className="relative w-full max-w-[360px] bg-white h-full shadow-2xl flex flex-col border-l border-white/20"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-slate-950 text-white rounded-xl flex items-center justify-center shadow-lg"><Fingerprint className="w-5 h-5 text-theme-primary" /></div>
                  <div>
                    <h2 className="text-[12px] font-black text-slate-900 uppercase leading-none">User Protocol</h2>
                    <p className="text-[8px] font-bold text-gray-400 uppercase mt-1.5 tracking-widest">Entity: {selectedUser.id}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedUser(null)} className="p-2 bg-gray-50 rounded-xl text-gray-400 hover:text-rose-600 transition-colors"><X className="w-4 h-4" /></button>
              </div>

              {/* View Switcher */}
              <div className="flex p-1 bg-gray-100 rounded-2xl m-6 border border-gray-200">
                 {[
                   { id: 'info', icon: LayoutDashboard, label: 'Bio' },
                   { id: 'financial', icon: Banknote, label: 'Finance' },
                   { id: 'security', icon: Lock, label: 'Auth' }
                 ].map(v => (
                   <button key={v.id} onClick={() => setActiveView(v.id as any)} className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl transition-all ${activeView === v.id ? 'bg-white text-theme-primary shadow-sm' : 'text-gray-400'}`}>
                      <v.icon className="w-4 h-4" />
                      <span className="text-[8px] font-black uppercase tracking-widest">{v.label}</span>
                   </button>
                 ))}
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar p-6 pt-0 space-y-6">
                <AnimatePresence mode="wait">
                  {activeView === 'info' && (
                    <motion.div key="i" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                       <div className="bg-gray-50 p-8 rounded-[2.5rem] text-center border border-gray-100 shadow-inner">
                          <div className="w-20 h-20 bg-white rounded-3xl shadow-xl mx-auto mb-5 flex items-center justify-center border border-gray-100">
                             <div className="w-full h-full rounded-[1.2rem] themed-gradient flex items-center justify-center font-black text-white text-3xl uppercase">{selectedUser.name[0]}</div>
                          </div>
                          <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">{selectedUser.name}</h3>
                          <p className="text-[9px] font-bold text-gray-400 uppercase mt-2 tracking-[0.2em]">{selectedUser.email}</p>
                       </div>
                       <div className="space-y-3">
                          <div className="p-4 bg-white rounded-2xl border border-gray-100 flex items-center justify-between">
                             <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">WhatsApp Link</span>
                             <span className="text-[11px] font-black text-slate-700">{selectedUser.whatsapp}</span>
                          </div>
                          <div className="p-4 bg-white rounded-2xl border border-gray-100 flex items-center justify-between">
                             <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Revenue Tier</span>
                             <span className="text-[11px] font-black text-theme-primary uppercase">{selectedUser.tier}</span>
                          </div>
                          <div className="p-4 bg-white rounded-2xl border border-gray-100 flex items-center justify-between">
                             <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Account State</span>
                             <span className="text-[10px] font-black text-emerald-500 uppercase">{selectedUser.status}</span>
                          </div>
                       </div>
                    </motion.div>
                  )}

                  {activeView === 'financial' && (
                    <motion.div key="f" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                       <div className="grid grid-cols-2 gap-3">
                          <div className="p-6 bg-slate-950 rounded-[2rem] text-center shadow-xl">
                             <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-2">Available</p>
                             <p className="text-xl font-black text-white">Rs. {selectedUser.balance}</p>
                          </div>
                          <div className="p-6 bg-emerald-50 rounded-[2rem] border border-emerald-100 text-center">
                             <p className="text-[8px] font-black text-emerald-600 uppercase tracking-widest mb-2">Net Yield</p>
                             <p className="text-xl font-black text-emerald-600">Rs. {selectedUser.earned}</p>
                          </div>
                       </div>
                       <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
                          <div className="flex items-center space-x-3 mb-4">
                             <History className="w-4 h-4 text-gray-400" />
                             <h4 className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Capital Trace</h4>
                          </div>
                          <div className="space-y-3">
                             <div className="flex justify-between items-center text-[10px] font-bold">
                                <span className="text-gray-400">Total Disbursements</span>
                                <span className="text-slate-900">Rs. {selectedUser.withdrawn}</span>
                             </div>
                             <div className="flex justify-between items-center text-[10px] font-bold">
                                <span className="text-gray-400">Yield Efficiency</span>
                                <span className="text-emerald-500">98.4%</span>
                             </div>
                          </div>
                       </div>
                    </motion.div>
                  )}

                  {activeView === 'security' && (
                    <motion.div key="s" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                       <div className="bg-rose-50 border border-rose-100 p-6 rounded-[2rem] space-y-6">
                          <div className="flex items-center space-x-3 text-rose-600">
                             <ShieldAlert className="w-5 h-5" />
                             <h4 className="text-[11px] font-black uppercase">Credential Monitor</h4>
                          </div>
                          
                          <div className="space-y-4">
                             <div className="space-y-2">
                                <label className="text-[8px] font-black text-rose-400 uppercase tracking-widest ml-1">Current Passcode</label>
                                <div className="flex bg-white border border-rose-100 rounded-xl p-3 items-center justify-between shadow-inner">
                                   <p className="font-mono text-sm font-black tracking-widest text-slate-700">
                                      {showPassword ? selectedUser.pass : '••••••••'}
                                   </p>
                                   <button onClick={() => setShowPassword(!showPassword)} className="p-1.5 hover:bg-gray-50 rounded-lg transition-colors">
                                      {showPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                                   </button>
                                </div>
                             </div>
                             
                             <button className="w-full py-4 bg-rose-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center justify-center active:scale-95 transition-all">
                                <RefreshCcw className="w-4 h-4 mr-2" /> Reset Logic Node
                             </button>
                          </div>
                       </div>

                       <div className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem] space-y-4">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Login History</p>
                          <div className="space-y-3">
                             <div className="flex justify-between items-center text-[10px] font-bold">
                                <span className="text-gray-400">Last Sync</span>
                                <span className="text-slate-900">{selectedUser.lastActivity}</span>
                             </div>
                             <div className="flex justify-between items-center text-[10px] font-bold">
                                <span className="text-gray-400">IP Origin</span>
                                <span className="text-slate-900 font-mono">182.164.22.9</span>
                             </div>
                          </div>
                       </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="p-6 space-y-3 border-t border-gray-100 bg-gray-50/30">
                 <button className="w-full py-4 themed-gradient text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center justify-center hover:brightness-110 active:scale-95 transition-all">
                   <UserCheck className="w-4.5 h-4.5 mr-2" /> Commit Identity Sync
                 </button>
                 <button className="w-full py-4 bg-white text-rose-500 border border-rose-100 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all active:scale-95 shadow-sm">
                   <Ban className="w-4.5 h-4.5 mr-2" /> Revoke Hub Access
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