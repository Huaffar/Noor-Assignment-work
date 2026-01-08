import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Wallet, 
  ExternalLink, 
  Filter, 
  Ban, 
  CheckCircle2, 
  X,
  User as UserIcon,
  Users
} from 'lucide-react';

const UserManager: React.FC = () => {
  const [users, setUsers] = useState([
    { id: 'u_1', name: 'Zaid Khan', email: 'zaid@example.com', balance: 4500, status: 'active', joined: 'Oct 12' },
    { id: 'u_2', name: 'Fatima Ali', email: 'fatima@example.com', balance: 12000, status: 'active', joined: 'Sep 28' },
    { id: 'u_3', name: 'Omar Malik', email: 'omar@example.com', balance: 50, status: 'banned', joined: 'Aug 15' },
  ]);

  const [search, setSearch] = useState('');

  return (
    <div className="max-w-4xl mx-auto space-y-2.5 pb-20 px-1">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center space-x-2">
          {/* Added Users to lucide-react imports to resolve the error */}
          <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center border border-slate-800">
            <Users className="w-3.5 h-3.5 text-rose-500" />
          </div>
          <div>
            <h1 className="text-sm font-black text-gray-900 leading-none uppercase tracking-tight">Personnel</h1>
            <p className="text-[7px] text-gray-400 font-bold uppercase mt-0.5">Control Nodes</p>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-2.5 h-2.5 text-gray-400" />
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Filter..." className="bg-white border border-gray-100 rounded-lg py-1 pl-6 pr-2 text-[8px] font-black uppercase outline-none focus:border-rose-400 w-32 shadow-sm" />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-3 py-2 text-[7px] font-black text-gray-400 uppercase">Member</th>
              <th className="px-3 py-2 text-[7px] font-black text-gray-400 uppercase">Credit</th>
              <th className="px-3 py-2 text-[7px] font-black text-gray-400 uppercase text-right">Ops</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.map((user) => (
              <tr key={user.id} className="group hover:bg-rose-50/10">
                <td className="px-3 py-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-rose-50 text-rose-600 rounded-md flex items-center justify-center font-black text-[8px]">{user.name[0]}</div>
                    <div className="min-w-0">
                      <p className="text-[9px] font-black text-gray-900 leading-none uppercase truncate">{user.name}</p>
                      <p className={`text-[6px] font-black uppercase mt-0.5 ${user.status === 'active' ? 'text-emerald-500' : 'text-rose-500'}`}>{user.status}</p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-2 text-[9px] font-black text-gray-700">Rs. {user.balance.toLocaleString()}</td>
                <td className="px-3 py-2 text-right">
                  <div className="flex items-center justify-end space-x-1">
                    <button className="p-1 bg-gray-50 text-gray-300 hover:text-emerald-600 rounded"><Wallet className="w-2.5 h-2.5" /></button>
                    <button className={`p-1 rounded ${user.status === 'active' ? 'bg-gray-50 text-gray-300 hover:text-rose-500' : 'bg-emerald-50 text-emerald-600'}`}>{user.status === 'active' ? <Ban className="w-2.5 h-2.5" /> : <CheckCircle2 className="w-2.5 h-2.5" />}</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManager;