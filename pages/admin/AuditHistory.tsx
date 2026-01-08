
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Search, 
  Filter, 
  User as UserIcon,
  ShieldCheck,
  Zap,
  Banknote,
  Trash2,
  RefreshCcw,
  Download
} from 'lucide-react';

const AuditHistory: React.FC = () => {
  const [search, setSearch] = useState('');
  
  const logs = [
    { id: '1', admin: 'Root Admin', action: 'APPROVE_WITHDRAWAL', target: 'Zaid Khan', time: '10:45 AM', details: 'PKR 4,500 disbursed to EasyPaisa' },
    { id: '2', admin: 'Root Admin', action: 'SOFT_DELETE_USER', target: 'BotAcc_1', time: '09:20 AM', details: 'Violated TOS: Multiple accounts' },
    { id: '3', admin: 'System Controller', action: 'UPDATE_SYSTEM', target: 'Limits', time: '08:00 AM', details: 'Min. withdrawal PKR 500' },
  ];

  const getActionIcon = (action: string) => {
    if (action.includes('WITHDRAWAL')) return <Banknote className="w-3 h-3" />;
    if (action.includes('DELETE')) return <Trash2 className="w-3 h-3" />;
    if (action.includes('RESTORE')) return <RefreshCcw className="w-3 h-3" />;
    return <Zap className="w-3 h-3" />;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4 pb-20 px-1">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 px-1">
        <div>
          <h1 className="text-xl font-black text-gray-900 leading-none">Security Trace</h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Immutable System Logs</p>
        </div>
        <div className="flex items-center space-x-1.5 w-full md:w-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Trace action..." className="bg-white border border-gray-100 rounded-lg py-1.5 pl-8 pr-3 text-[10px] font-black uppercase outline-none focus:border-pink-400 w-full shadow-sm" />
          </div>
          <button className="p-2 bg-white border border-gray-100 rounded-lg text-gray-400"><Filter className="w-3.5 h-3.5" /></button>
        </div>
      </div>

      <div className="space-y-1.5">
        {logs.map((log) => (
          <motion.div key={log.id} initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group active:bg-pink-50/20">
            <div className="flex items-center space-x-3 min-w-0">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${log.action.includes('APPROVE') ? 'bg-emerald-50 text-emerald-500' : 'bg-pink-50 text-pink-500'}`}>
                {getActionIcon(log.action)}
              </div>
              <div className="min-w-0">
                <div className="flex items-center space-x-2 mb-0.5">
                  <span className="text-[10px] font-black text-gray-900 truncate uppercase">{log.action.split('_').pop()}</span>
                  <span className="text-[7px] font-black bg-pink-100 text-pink-600 px-1 py-0.5 rounded tracking-tighter uppercase">ID: {log.target}</span>
                </div>
                <p className="text-[9px] font-medium text-gray-500 truncate leading-none">{log.details}</p>
              </div>
            </div>
            <div className="text-right shrink-0">
               <div className="flex items-center justify-end text-[7px] font-black text-gray-400 uppercase tracking-tighter mb-0.5">
                  <UserIcon className="w-2 h-2 mr-1" /> {log.admin.split(' ')[0]}
               </div>
               <p className="text-[7px] font-bold text-gray-300 uppercase tracking-tighter">{log.time}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="w-full p-3 bg-slate-900 rounded-xl flex items-center justify-between text-white shadow-lg shadow-pink-900/10">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-pink-400" />
          <p className="text-[9px] font-black uppercase tracking-widest text-pink-100">Export Security Audit</p>
        </div>
        <Download className="w-3.5 h-3.5 text-slate-500" />
      </button>
    </div>
  );
};

export default AuditHistory;
