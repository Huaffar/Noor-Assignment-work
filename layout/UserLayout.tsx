
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Wallet, 
  LogOut, 
  Menu, 
  ChevronRight,
  ShieldCheck,
  ClipboardCheck,
  Settings as SettingsIcon,
  Layers,
  FilePlus,
  Banknote,
  Users,
  Briefcase,
  TrendingUp,
  Share2,
  History,
  LifeBuoy,
  User as UserIcon,
  Activity,
  Trash2,
  X as CloseIcon,
  HelpCircle,
  UserCheck,
  UserPlus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSystem } from '../context/SystemContext';
import LivePayouts from '../components/LivePayouts';

const UserLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { settings } = useSystem();
  const location = useLocation();
  const navigate = useNavigate();

  const isAdmin = user?.role === 'admin';

  const userMenuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Work Center', path: '/tasks', icon: Briefcase },
    { name: 'My Wallet', path: '/wallet', icon: Wallet },
    { name: 'Identity Node', path: '/kyc', icon: UserCheck },
    { name: 'Invite & Earn', path: '/invite', icon: UserPlus },
    { name: 'Request Hub', path: '/requests', icon: History },
    { name: 'Upgrade Plan', path: '/upgrade', icon: TrendingUp },
    { name: 'My Referrals', path: '/referrals', icon: Share2 },
    { name: 'Support', path: '/support', icon: LifeBuoy },
    { name: 'Settings', path: '/profile', icon: SettingsIcon },
  ];

  const adminMenuItems = [
    { name: 'Command Center', path: '/admin', icon: LayoutDashboard },
    { name: 'Users Control', path: '/admin/users', icon: Users },
    { name: 'Audit History', path: '/admin/history', icon: Activity },
    { name: 'KYC Reviews', path: '/admin/kyc', icon: UserCheck },
    { name: 'Verify Work', path: '/admin/reviews', icon: ClipboardCheck },
    { name: 'Plan Requests', path: '/admin/plan-requests', icon: ShieldCheck },
    { name: 'Payout Hub', path: '/admin/withdrawals', icon: Banknote },
    { name: 'Assignments', path: '/admin/work', icon: FilePlus },
    { name: 'Earning Plans', path: '/admin/plans', icon: Layers },
    { name: 'Manage Support', path: '/admin/support', icon: HelpCircle },
    { name: 'Recycle Bin', path: '/admin/trash', icon: Trash2 },
    { name: 'System Core', path: '/admin/settings', icon: SettingsIcon },
  ];

  const currentMenuItems = isAdmin ? adminMenuItems : userMenuItems;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full border-r transition-colors" style={{ backgroundColor: 'var(--theme-bg)', borderColor: 'var(--theme-primary)', color: 'var(--theme-text)' }}>
      <div className="p-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--theme-primary)' }}>
            <span className="text-white font-bold text-base">N</span>
          </div>
          <span className="text-lg font-black tracking-tighter" style={{ color: 'var(--theme-text)' }}>
            Noor<span style={{ color: 'var(--theme-primary)' }}>Official</span>
          </span>
        </Link>
        <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-1 opacity-50"><CloseIcon className="w-5 h-5" /></button>
      </div>

      <nav className="flex-1 px-3 space-y-0.5 mt-2 no-scrollbar overflow-y-auto">
        {currentMenuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-200 group ${
                isActive ? 'text-white' : 'hover:opacity-80'
              }`}
              style={{ 
                backgroundColor: isActive ? 'var(--theme-primary)' : 'transparent',
                boxShadow: isActive ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none'
              }}
            >
              <div className="flex items-center space-x-2.5">
                <item.icon className="w-4 h-4" style={{ color: isActive ? '#fff' : 'var(--theme-primary)' }} />
                <span className="font-bold text-[13px]">{item.name}</span>
              </div>
              {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-50" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-black/5">
        <div className="p-3 rounded-2xl border" style={{ backgroundColor: 'rgba(0,0,0,0.03)', borderColor: 'rgba(0,0,0,0.05)' }}>
          <div className="flex items-center space-x-2.5 mb-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-black text-xs text-white" style={{ backgroundColor: 'var(--theme-primary)' }}>
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-black truncate">{user?.name}</p>
              <p className="text-[8px] font-black uppercase tracking-widest opacity-50">
                {isAdmin ? 'Administrator' : 'Verified User'}
              </p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-1.5 py-1.5 font-black text-[10px] uppercase tracking-widest rounded-lg transition-all opacity-50 hover:opacity-100"
          >
            <LogOut className="w-3 h-3" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: 'var(--theme-bg)', color: 'var(--theme-text)' }}>
      <LivePayouts />
      <aside className="hidden lg:block w-64 h-screen sticky top-0">
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-72 z-50 lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden h-14 border-b px-4 flex items-center justify-between sticky top-0 z-30 transition-colors" style={{ backgroundColor: 'var(--theme-bg)', borderColor: 'var(--theme-primary)' }}>
          <button onClick={() => setIsSidebarOpen(true)} className="p-2" style={{ color: 'var(--theme-text)' }}>
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-black tracking-tighter text-lg" style={{ color: 'var(--theme-primary)' }}>Noor Official</span>
          <div className="w-8 h-8 rounded-full flex items-center justify-center border" style={{ backgroundColor: 'var(--theme-bg)', borderColor: 'var(--theme-primary)' }}>
             <UserIcon className="w-4 h-4" style={{ color: 'var(--theme-primary)' }} />
          </div>
        </header>

        <main className="flex-1 p-3 md:p-6 overflow-x-hidden no-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
