
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Download, 
  Smartphone, 
  Share2, 
  ShieldCheck, 
  Loader2, 
  SmartphoneNfc,
  Check
} from 'lucide-react';
import html2canvas from 'html2canvas';

interface Transaction {
  id: string;
  amount: number;
  method: string;
  status: string;
  date: string;
  account?: string;
  trxId?: string;
}

interface PaymentReceiptProps {
  transaction: Transaction;
}

const PaymentReceipt: React.FC<PaymentReceiptProps> = ({ transaction }) => {
  const receiptRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleDownload = async () => {
    if (!receiptRef.current) return;
    setIsExporting(true);
    
    try {
      const canvas = await html2canvas(receiptRef.current, {
        scale: 3, // High DPI for crisp text
        backgroundColor: '#fdf2f8',
        logging: false,
        useCORS: true
      });
      
      const image = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement('a');
      link.download = `Noor_Payment_${transaction.id}.png`;
      link.href = image;
      link.click();
    } catch (err) {
      console.error("Export failed", err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* The Physical Receipt Card */}
      <div 
        ref={receiptRef}
        className="w-full max-w-[320px] bg-white receipt-cut shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-t-3xl overflow-hidden border border-gray-100"
      >
        {/* Header Section */}
        <div className="bg-rose-600 p-6 text-center text-white relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute -top-10 -left-10 w-24 h-24 bg-white rounded-full blur-2xl" />
          </div>
          
          <div className="relative z-10 space-y-3">
             <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-xl text-rose-600">
                <CheckCircle2 className="w-8 h-8 animate-bounce" />
             </div>
             <h2 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80">Withdrawal Successful</h2>
             <h3 className="text-3xl font-black tracking-tighter leading-none">Rs. {transaction.amount.toLocaleString()}</h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          <div className="text-center space-y-1">
             <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Transaction Date</p>
             <p className="text-xs font-bold text-gray-800">{transaction.date} • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          </div>

          <div className="border-t border-b border-dashed border-gray-100 py-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Sent To</span>
              <div className="flex items-center space-x-2 text-right">
                <div className="min-w-0">
                  <p className="text-[11px] font-black text-gray-900 leading-none mb-0.5">{transaction.method}</p>
                  <p className="text-[9px] font-bold text-rose-500 uppercase">{transaction.account || '03xx-xxxxxxx'}</p>
                </div>
                <div className={`p-1.5 rounded-lg ${transaction.method.toLowerCase().includes('paisa') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                  {transaction.method.toLowerCase().includes('paisa') ? <Smartphone className="w-4 h-4" /> : <SmartphoneNfc className="w-4 h-4" />}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Trx ID</span>
              <span className="text-[11px] font-black text-gray-900 tracking-tighter font-mono bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                {transaction.trxId || '#WDR-882199'}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Network Status</span>
              <div className="flex items-center space-x-1.5 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                <Check className="w-2.5 h-2.5 text-emerald-600" />
                <span className="text-[8px] font-black text-emerald-600 uppercase">Settled</span>
              </div>
            </div>
          </div>

          {/* Marketing Branding */}
          <div className="text-center pt-2 pb-8">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <div className="w-5 h-5 rounded bg-rose-600 flex items-center justify-center text-[10px] font-black text-white shadow-lg shadow-rose-200">N</div>
              <span className="text-xs font-black tracking-tighter text-gray-900">Noor<span className="text-rose-600">Official</span></span>
            </div>
            <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-relaxed">
              Pakistan's Verified Task Network<br />
              <span className="text-rose-500">www.noorofficial.com</span>
            </p>
          </div>
        </div>
      </div>

      {/* Control Actions (Hidden on Export) */}
      <div className="flex w-full max-w-[320px] gap-3">
         <button 
           onClick={handleDownload}
           disabled={isExporting}
           className="flex-1 py-3.5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center shadow-2xl active:scale-95 transition-all disabled:opacity-50"
         >
           {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Download className="w-4 h-4 mr-2 text-rose-500" /> Get Digital Slip</>}
         </button>
      </div>
    </div>
  );
};

export default PaymentReceipt;
