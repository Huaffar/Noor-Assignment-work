import React, { useEffect, useState, lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { StatusBar } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';

// Layout & Critical Components
import Header from './layout/Header';
import Footer from './layout/Footer';
import UserLayout from './layout/UserLayout';
import Preloader from './components/Preloader';
import Maintenance from './components/Maintenance';
import UserSurvey from './components/UserSurvey'; 
import ErrorBoundary from './components/ErrorBoundary';
import { useAuth } from './context/AuthContext';
import { useSystem } from './context/SystemContext';
import { useMobileBack } from './hooks/useMobileBack';
import { AdminRoute, UserRoute } from './components/RouteGuards';

// Lazy Loaded Pages
const Landing = lazy(() => import('./pages/Landing'));
const Dashboard = lazy(() => import('./pages/user/Dashboard'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const DailyWork = lazy(() => import('./pages/user/DailyWork'));
const WalletHub = lazy(() => import('./pages/user/WalletHub'));
const Withdraw = lazy(() => import('./pages/user/Withdraw')); 
const Profile = lazy(() => import('./pages/user/Profile'));
const PlanMarket = lazy(() => import('./pages/user/PlanMarket'));
const Referrals = lazy(() => import('./pages/user/Referrals'));
const MyRequests = lazy(() => import('./pages/user/MyRequests'));
const Support = lazy(() => import('./pages/user/Support'));

// Admin Pages
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const UserManager = lazy(() => import('./pages/admin/UserManager'));
const ManagePlans = lazy(() => import('./pages/admin/ManagePlans'));
const ManageTasks = lazy(() => import('./pages/admin/ManageTasks')); 
const KYCRequests = lazy(() => import('./pages/admin/KYCRequests'));
const ManageWithdrawals = lazy(() => import('./pages/admin/ManageWithdrawals')); 
const PaymentMethods = lazy(() => import('./pages/admin/PaymentMethods'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));
const PlanRequests = lazy(() => import('./pages/admin/requests/PlanRequests'));
const Trash = lazy(() => import('./pages/admin/Trash'));
const ManageGuides = lazy(() => import('./pages/admin/ManageGuides'));
const ManageMarketing = lazy(() => import('./pages/admin/ManageMarketing'));
const SendAlert = lazy(() => import('./pages/admin/SendAlert'));
const AuditHistory = lazy(() => import('./pages/admin/AuditHistory'));
const WorkManager = lazy(() => import('./pages/admin/WorkManager'));

const MobileAppWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useMobileBack();
  const { user, isAuthenticated } = useAuth();
  const [showSurvey, setShowSurvey] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user && user.role !== 'admin') {
      const surveyKey = `noor_survey_done_${user.id}`;
      if (!localStorage.getItem(surveyKey) && (!user.currentPlan || user.currentPlan === 'None')) {
        setShowSurvey(true);
      }
    }
  }, [user, isAuthenticated]);

  return (
    <>
      {showSurvey && <UserSurvey onComplete={() => { if(user) localStorage.setItem(`noor_survey_done_${user.id}`, 'true'); setShowSurvey(false); }} />}
      {children}
    </>
  );
};

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user, logout } = useAuth();
  return (
    <div className="flex flex-col min-h-screen">
      <Header isAuthenticated={isAuthenticated} user={user} onLogout={logout} />
      <main className="flex-grow pt-14">
        {children}
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  const { settings } = useSystem();
  if (settings.maintenanceMode) return <Maintenance />;

  return (
    <Router>
      <ErrorBoundary>
        <MobileAppWrapper>
          <Suspense fallback={<Preloader />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<PublicLayout><Landing /></PublicLayout>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected User Routes */}
              <Route path="/dashboard" element={<UserRoute><UserLayout><Dashboard /></UserLayout></UserRoute>} />
              <Route path="/tasks" element={<UserRoute><UserLayout><DailyWork /></UserLayout></UserRoute>} />
              <Route path="/wallet" element={<UserRoute><UserLayout><WalletHub /></UserLayout></UserRoute>} />
              <Route path="/withdraw" element={<UserRoute><UserLayout><Withdraw /></UserLayout></UserRoute>} />
              <Route path="/profile" element={<UserRoute><UserLayout><Profile /></UserLayout></UserRoute>} />
              <Route path="/upgrade" element={<UserRoute><UserLayout><PlanMarket /></UserLayout></UserRoute>} />
              <Route path="/referrals" element={<UserRoute><UserLayout><Referrals /></UserLayout></UserRoute>} />
              <Route path="/requests" element={<UserRoute><UserLayout><MyRequests /></UserLayout></UserRoute>} />
              <Route path="/support" element={<UserRoute><UserLayout><Support /></UserLayout></UserRoute>} />

              {/* Protected Admin Routes */}
              <Route path="/admin" element={<AdminRoute><UserLayout><AdminDashboard /></UserLayout></AdminRoute>} />
              <Route path="/admin/users" element={<AdminRoute><UserLayout><UserManager /></UserLayout></AdminRoute>} />
              <Route path="/admin/plans" element={<AdminRoute><UserLayout><ManagePlans /></UserLayout></AdminRoute>} />
              <Route path="/admin/plan-requests" element={<AdminRoute><UserLayout><PlanRequests /></UserLayout></AdminRoute>} />
              <Route path="/admin/withdrawals" element={<AdminRoute><UserLayout><ManageWithdrawals /></UserLayout></AdminRoute>} />
              <Route path="/admin/reviews" element={<AdminRoute><UserLayout><ManageTasks /></UserLayout></AdminRoute>} />
              <Route path="/admin/kyc" element={<AdminRoute><UserLayout><KYCRequests /></UserLayout></AdminRoute>} />
              <Route path="/admin/finance" element={<AdminRoute><UserLayout><PaymentMethods /></UserLayout></AdminRoute>} />
              <Route path="/admin/settings" element={<AdminRoute><UserLayout><AdminSettings /></UserLayout></AdminRoute>} />
              <Route path="/admin/trash" element={<AdminRoute><UserLayout><Trash /></UserLayout></AdminRoute>} />
              <Route path="/admin/guides" element={<AdminRoute><UserLayout><ManageGuides /></UserLayout></AdminRoute>} />
              <Route path="/admin/marketing" element={<AdminRoute><UserLayout><ManageMarketing /></UserLayout></AdminRoute>} />
              <Route path="/admin/alerts" element={<AdminRoute><UserLayout><SendAlert /></UserLayout></AdminRoute>} />
              <Route path="/admin/audit" element={<AdminRoute><UserLayout><AuditHistory /></UserLayout></AdminRoute>} />
              <Route path="/admin/work" element={<AdminRoute><UserLayout><WorkManager /></UserLayout></AdminRoute>} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </MobileAppWrapper>
      </ErrorBoundary>
    </Router>
  );
};

export default App;