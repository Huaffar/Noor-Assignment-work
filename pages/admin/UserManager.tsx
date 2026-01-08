
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Wallet, 
  ExternalLink, 
  Filter, 
  Ban, 
  CheckCircle2, 
  X,
  TrendingUp,
  TrendingDown,
  User as UserIcon
} from 'lucide-react';

const UserManager: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([
    { id: 'u_1', name: 'Zaid Khan', email: 'zaid@example.com', balance: 4500, status: 'active', joined: 'Oct 12' },
    { id: 'u_2', name: 'Fatima Ali', email: 'fatima@example.com', balance: 12000, status: 'active', joined: 'Sep 28' },
    { id: 'u_3', name: 'Omar Malik', email: 'omar@example.com', balance: 50, status: 'banned', joined: 'Aug 15' },
  ]);

  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [walletAmount, setWalletAmount] = useState('');

  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));

  const handleStatusToggle = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'banned' : 'active' } : u));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 pb-20 px-1">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-1">
        <div>
          <h1 className="text-xl font-black text-gray-900 leading-none">Personnel Control</h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Platform Node Management</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." className="bg-white border border-gray-100 rounded-xl py-2 pl-9 pr-4 text-xs font-bold outline-none focus:ring-4 focus:ring-pink-500/5 focus:border-pink-400 w-full md:w-64 shadow-sm" />
          </div>
          <button className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-pink-600 shadow-sm"><Filter className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">Member</th>
                <th className="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">Balance</th>
                <th className="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest text-right">Ops</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="group hover:bg-pink-50/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-pink-50 text-pink-600 rounded-lg flex items-center justify-center font-black text-[10px]">{user.name[0]}</div>
                      <div>
                        <p className="text-xs font-black text-gray-900 leading-none mb-1">{user.name}</p>
                        <p className={`text-[8px] font-black uppercase tracking-widest ${user.status === 'active' ? 'text-emerald-500' : 'text-rose-500'}`}>{user.status}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center text-xs font-black text-gray-700">
                      Rs. {user.balance.toLocaleString()}
                      <button onClick={() => { setSelectedUser(user); setIsWalletModalOpen(true); }} className="ml-2 p-1 bg-gray-50 text-gray-300 hover:text-emerald-600 rounded"><Wallet className="w-3 h-3" /></button>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <button onClick={() => handleStatusToggle(user.id)} className={`p-2 rounded-lg transition-all ${user.status === 'active' ? 'bg-gray-50 text-gray-300 hover:text-rose-500' : 'bg-emerald-50 text-emerald-600'}`}>{user.status === 'active' ? <Ban className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}</button>
                      <button onClick={() => navigate('/dashboard')} className="p-2 bg-gray-50 text-gray-300 hover:text-pink-600 rounded-lg"><ExternalLink className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {isWalletModalOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setIsWalletModalOpen(false)} />
            <motion.div initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} className="relative w-full max-w-xs bg-white rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4"><h3 className="text-sm font-black text-gray-900 uppercase">Adjust Balance</h3><button onClick={() => setIsWalletModalOpen(false)}><X className="w-4 h-4 text-gray-400" /></button></div>
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100"><p className="text-[8px] font-black text-gray-400 uppercase mb-0.5">Editing</p><p className="text-xs font-black text-gray-900">{selectedUser?.name}</p></div>
                <input type="number" value={walletAmount} onChange={e => setWalletAmount(e.target.value)} placeholder="0.00" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 font-black outline-none focus:border-pink-400 text-lg" />
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => setIsWalletModalOpen(false)} className="py-3 bg-gray-100 text-gray-500 font-black rounded-xl text-[10px] uppercase">Deduct</button>
                  <button onClick={() => setIsWalletModalOpen(false)} className="py-3 bg-pink-600 text-white font-black rounded-xl text-[10px] uppercase shadow-lg shadow-pink-100">Add Cash</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserManager;
