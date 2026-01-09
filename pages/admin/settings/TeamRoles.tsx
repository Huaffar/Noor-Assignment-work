
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  UserPlus, 
  Trash2, 
  Mail, 
  Lock, 
  X, 
  CheckCircle2, 
  UserCircle, 
  ShieldAlert,
  Loader2,
  Key
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const RoleBadge = ({ role }: { role: string }) => {
  switch (role) {
    case 'super_admin':
      return <span className="px-2 py-0.5 rounded-md text-[7px] font-black uppercase bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-sm tracking-widest">Super Admin</span>;
    case 'manager':
      // Style changed to Dark Slate as requested
      return <span className="px-2 py-0.5 rounded-md text-[7px] font-black uppercase bg-slate-900 text-white shadow-sm tracking-widest">Manager</span>;
    case 'support':
      return <span className="px-2 py-0.5 rounded-md text-[7px] font-black uppercase bg-emerald-500 text-white shadow-sm tracking-widest">Support</span>;
    default:
      return null;
  }
};

const TeamRoles: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [staff, setStaff] = useState([
    { id: 'a1', name: 'Root Admin', email: 'admin@noorofficial.com', role: 'super_admin', status: 'active', lastLogin: '2m ago' },
    { id: 'a2', name: 'Zohaib Manager', email: 'zohaib@noor.com', role: 'manager', status: 'active', lastLogin: '1h ago' },
    { id: 'a3', name: 'Sara Support', email: 'sara@noor.com', role: 'support', status: 'active', lastLogin: 'Yesterday' },
  ]);

  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'support' });

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const newStaff = {
        ...formData,
        id: 'a_' + Date.now(),
        status: 'active' as const,
        lastLogin: 'Never'
      };
      setStaff([...staff, newStaff]);
      setIsSubmitting(false);
      setIsModalOpen(false);
      setFormData({ name: '', email: '', password: '', role: 'support' });
    }, 1200);
  };

  const handleDelete = (id: string) => {
    if (id === currentUser?.id) return alert("Security breach blocked: Self-termination is restricted.");
    if (confirm("Permanently revoke this node's access?")) {
      setStaff(staff.filter(s => s.id !== id));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-gray-50 pb-3">
        <div>
          <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Access Control List</h3>
          <p className="text-[7px] text-gray-400 font-bold uppercase mt-0.5">Personnel Infrastructure</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all shadow-lg"
        >
          <UserPlus className="w-3 h-3" />
          <span>Add Staff</span>
        </button>
      </div>

      <div className="overflow-hidden bg-gray-50/50 rounded-xl border border-gray-100">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white border-b border-gray-100">
              <th className="px-4 py-2 text-[7px] font-black text-gray-400 uppercase">Personnel</th>
              <th className="px-4 py-2 text-[7px] font-black text-gray-400 uppercase text-center">Auth Node</th>
              <th className="px-4 py-2 text-[7px] font-black text-gray-400 uppercase text-right">Ops</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {staff.map((s) => (
              <tr key={s.id} className="hover:bg-white transition-colors group">
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-lg bg-white border border-gray-100 flex items-center justify-center shadow-sm">
                      <UserCircle className="w-4 h-4 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-900 leading-none mb-0.5 uppercase">{s.name}</p>
                      <p className="text-[7px] font-bold text-gray-400 truncate max-w-[120px]">{s.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <RoleBadge role={s.role} />
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end space-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    {currentUser?.role === 'super_admin' && s.id !== currentUser.id && (
                      <button 
                        onClick={() => handleDelete(s.id)}
                        className="p-1.5 bg-white border border-gray-100 text-gray-300 hover:text-rose-600 rounded-md shadow-sm"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                    <span className="text-[6px] font-black text-gray-300 uppercase">{s.lastLogin}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
            <motion.div 
              initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }}
              className="relative w-full max-w-sm bg-white rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6">
                <button onClick={() => setIsModalOpen(false)} className="p-2 bg-gray-50 rounded-xl text-gray-400"><X className="w-4 h-4" /></button>
              </div>

              <div className="mb-6">
                <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-black text-gray-900 leading-tight">Add Team Node</h2>
                <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">Assign roles to staff members</p>
              </div>

              <form onSubmit={handleAddStaff} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative">
                    <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2.5 pl-10 pr-4 font-bold text-[11px] outline-none" placeholder="Staff Name" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-1">Secure Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2.5 pl-10 pr-4 font-bold text-[11px] outline-none" placeholder="staff@noorofficial.com" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-1">Assign Node Role</label>
                    <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2.5 px-3 font-black text-[10px] uppercase outline-none">
                      <option value="manager">Manager</option>
                      <option value="support">Support</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-1">Access Pass</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-300" />
                      <input required type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2.5 pl-8 pr-4 font-bold text-[11px] outline-none" placeholder="••••••••" />
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-100 flex items-start space-x-2 mt-2">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-[8px] font-bold text-amber-800 leading-tight uppercase">
                    Node Security: Managers have full financial control. Support staff are read-only except for tickets.
                  </p>
                </div>

                <button 
                  disabled={isSubmitting}
                  className="w-full py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all flex items-center justify-center"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Deploy Personnel Node</>}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeamRoles;
