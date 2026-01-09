
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  History,
  FileText,
  Search,
  Filter,
  Download,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowUpRight,
  Target,
  FileSearch,
  Loader2
} from 'lucide-react';
import html2canvas from 'html2canvas';

const MyRequests: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Work' | 'Plans'>('Work');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Approved' | 'Pending'>('All');
  const [isExporting, setIsExporting] = useState(false);

  const workHistory = [
    { id: 'WRK-821', title: 'English Writing #42', reward: 240, status: 'Approved', date: 'Today, 11:30 AM' },
    { id: 'WRK-810', title: 'Urdu Copy Task #12', reward: 150, status: 'Pending', date: 'Yesterday' },
    { id: 'WRK-792', title: 'Network Audit #09', reward: 50, status: 'Approved', date: 'Oct 24, 2023' },
  ];

  const planHistory = [
    { id: 'PLN-991', plan: 'Gold Package', cost: 2000, status: 'Approved', date: 'Oct 22, 2023' },
    { id: 'PLN-421', plan: 'Diamond Pro', cost: 5000, status: 'Pending', date: 'Today, 09:15 AM' },
  ];

  const data = activeTab === 'Work' ? workHistory : planHistory;
  const filteredData = data.filter(i => filterStatus === 'All' || i.status === filterStatus);

  const exportPDF = async () => {
    setIsExporting(true);
    const element = document.getElementById('audit-table');
    if (!element) return;
    
    try {
      const canvas = await html2canvas(element, { scale: 2, backgroundColor: '#ffffff' });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.download = `Noor_Audit_Report_${Date.now()}.png`;
      link.href = image;
      link.click();
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-24 px-2 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
         <div>
            <h1 className="text-2xl font-black text-gray-900 leading-none uppercase tracking-tighter">Audit Ledger</h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em] mt-2">Verified history of platform ops</p>
         </div>
         <div className="flex gap-2">
            <button 
               onClick={exportPDF}
               disabled={isExporting}
               className="flex items-center space-x-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all disabled:opacity-50"
            >
               {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4 text-rose-500" />}
               <span>Export Statement</span>
            </button>
         </div>
      </div>

      <div className="flex flex-wrap gap-3 px-2">
         <div className="flex bg-gray-100 p-1 rounded-xl">
            {['Work', 'Plans'].map(t => (
               <button 
                  key={t} onClick={() => setActiveTab(t as any)}
                  className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${activeTab === t ? 'bg-white text-rose-600 shadow-sm' : 'text-gray-400'}`}
               >
                  {t} History
               </button>
            ))}
         </div>
         <div className="flex bg-gray-100 p-1 rounded-xl">
            {['All', 'Approved', 'Pending'].map(s => (
               <button 
                  key={s} onClick={() => setFilterStatus(s as any)}
                  className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${filterStatus === s ? 'bg-slate-900 text-white shadow-sm' : 'text-gray-400'}`}
               >
                  {s}
               </button>
            ))}
         </div>
      </div>

      <div id="audit-table" className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                     <th className="px-8 py-5 text-[9px] font-black text-gray-400 uppercase tracking-widest">Entry Detail</th>
                     <th className="px-8 py-5 text-[9px] font-black text-gray-400 uppercase tracking-widest">Transaction Node</th>
                     <th className="px-8 py-5 text-[9px] font-black text-gray-400 uppercase tracking-widest">Status Node</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {filteredData.map((item: any) => (
                     <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-8 py-6">
                           <div className="flex items-center space-x-4">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-inner ${item.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                 {activeTab === 'Work' ? <FileText className="w-5 h-5" /> : <Target className="w-5 h-5" />}
                              </div>
                              <div>
                                 <h4 className="text-[11px] font-black text-slate-900 uppercase">{item.title || item.plan}</h4>
                                 <p className="text-[8px] font-bold text-gray-400 uppercase mt-1">ID: {item.id} • {item.date}</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <p className={`text-xs font-black ${activeTab === 'Work' ? 'text-emerald-600' : 'text-slate-900'}`}>
                              {activeTab === 'Work' ? '+' : '-'} Rs. {(item.reward || item.cost).toLocaleString()}
                           </p>
                           <p className="text-[7px] font-bold text-gray-300 uppercase tracking-tighter mt-1">Audit Sequence #129</p>
                        </td>
                        <td className="px-8 py-6">
                           <div className={`inline-flex items-center px-3 py-1 rounded-full border text-[8px] font-black uppercase tracking-widest ${
                              item.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                           }`}>
                              {item.status === 'Approved' ? <CheckCircle2 className="w-3 h-3 mr-1.5" /> : <Clock className="w-3 h-3 mr-1.5" />}
                              {item.status}
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
            {filteredData.length === 0 && (
               <div className="py-24 text-center">
                  <FileSearch className="w-12 h-12 text-gray-100 mx-auto mb-4" />
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">No audit data in selected range</p>
               </div>
            )}
         </div>
      </div>
    </div>
  );
};

export default MyRequests;
