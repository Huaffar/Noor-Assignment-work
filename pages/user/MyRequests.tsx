import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  History,
  FileText,
  Download,
  CheckCircle2,
  Clock,
  Target,
  FileSearch,
  Loader2,
  ChevronRight,
  ShieldCheck,
  XCircle
} from 'lucide-react';
import html2canvas from 'html2canvas';

const MyRequests: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Work' | 'Plans'>('Work');
  const [isExporting, setIsExporting] = useState(false);

  const workHistory = [
    { id: 'WRK-821', title: 'English Writing Node #42', reward: 240, status: 'Approved', date: 'Today, 11:30 AM', sequence: '129' },
    { id: 'WRK-810', title: 'Urdu Payload #12', reward: 150, status: 'Pending', date: 'Yesterday', sequence: '128' },
    { id: 'WRK-792', title: 'Audit Session #09', reward: 50, status: 'Rejected', date: 'Oct 24', reason: 'Blurry Capture', sequence: '127' },
  ];

  const planHistory = [
    { id: 'PLN-991', plan: 'Gold Package', cost: 2000, status: 'Approved', date: 'Oct 22', sequence: '11' },
    { id: 'PLN-421', plan: 'Diamond Pro', cost: 5000, status: 'Pending', date: 'Today, 09:15 AM', sequence: '12' },
  ];

  const exportPDF = async () => {
    setIsExporting(true);
    const element = document.getElementById('audit-table');
    if (!element) return;
    try {
      const canvas = await html2canvas(element, { scale: 2, backgroundColor: '#ffffff' });
      const link = document.createElement('a');
      link.download = `Noor_Statement_${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally { setIsExporting(false); }
  };

  const currentData = activeTab === 'Work' ? workHistory : planHistory;

  return (
    <div className="max-w-4xl mx-auto pb-24 px-2 space-y-6 scale-[0.98] origin-top">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
         <div>
            <h1 className="text-2xl font-black text-slate-900 leading-none uppercase tracking-tighter">Audit Ledger</h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em] mt-2">Verified history of platform operations</p>
         </div>
         <button 
           onClick={exportPDF} disabled={isExporting}
           className="flex items-center space-x-2 bg-slate-950 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 disabled:opacity-50 transition-all"
         >
           {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4 text-theme-primary" />}
           <span>Export Archive</span>
         </button>
      </div>

      <div className="flex bg-gray-100 p-1 rounded-2xl mx-2 border border-gray-200">
         {['Work', 'Plans'].map(t => (
           <button 
             key={t} onClick={() => setActiveTab(t as any)}
             className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === t ? 'bg-white text-theme-primary shadow-sm' : 'text-gray-400 hover:text-slate-600'}`}
           >
             {t} History
           </button>
         ))}
      </div>

      <div id="audit-table" className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
         <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                     <th className="px-8 py-5 text-[9px] font-black text-gray-400 uppercase tracking-widest">Entry Signature</th>
                     <th className="px-8 py-5 text-[9px] font-black text-gray-400 uppercase tracking-widest">Value Pulse</th>
                     <th className="px-8 py-5 text-[9px] font-black text-gray-400 uppercase tracking-widest text-right">Audit Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  <AnimatePresence mode="popLayout">
                    {currentData.map((item: any) => (
                      <motion.tr key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-gray-50/30 transition-colors group">
                        <td className="px-8 py-6">
                           <div className="flex items-center space-x-4">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-inner ${
                                 item.status === 'Approved' ? 'bg-emerald-50 text-emerald-500' : 
                                 item.status === 'Rejected' ? 'bg-rose-50 text-rose-500' : 'bg-amber-50 text-amber-500'
                              }`}>
                                 {activeTab === 'Work' ? <FileText className="w-5 h-5" /> : <Target className="w-5 h-5" />}
                              </div>
                              <div>
                                 <h4 className="text-[11px] font-black text-slate-900 uppercase truncate max-w-[180px]">{item.title || item.plan}</h4>
                                 <p className="text-[8px] font-bold text-gray-400 uppercase mt-1">Seq: #{item.sequence} • {item.date}</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <p className={`text-xs font-black ${activeTab === 'Work' ? 'text-emerald-600' : 'text-slate-950'}`}>
                              {activeTab === 'Work' ? '+' : '-'} Rs. {(item.reward || item.cost).toLocaleString()}
                           </p>
                           <p className="text-[7px] font-black text-slate-300 uppercase tracking-tighter mt-1">{item.id}</p>
                        </td>
                        <td className="px-8 py-6 text-right">
                           <div className={`inline-flex items-center px-3 py-1.5 rounded-full border text-[8px] font-black uppercase tracking-widest ${
                              item.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                              item.status === 'Rejected' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                           }`}>
                              {item.status === 'Approved' ? <CheckCircle2 className="w-3 h-3 mr-1.5" /> : 
                               item.status === 'Rejected' ? <XCircle className="w-3 h-3 mr-1.5" /> : <Clock className="w-3 h-3 mr-1.5" />}
                              {item.status}
                           </div>
                           {item.reason && <p className="text-[7px] font-black text-rose-400 uppercase mt-1 mr-1">{item.reason}</p>}
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
               </tbody>
            </table>
            {currentData.length === 0 && (
               <div className="py-24 text-center">
                  <FileSearch className="w-12 h-12 text-gray-100 mx-auto mb-4" />
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">No matching node history found</p>
               </div>
            )}
         </div>
      </div>
    </div>
  );
};

export default MyRequests;