
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/user/Dashboard';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import WorkCenter from './pages/WorkCenter';
import DoTask from './pages/DoTask';
import WalletHub from './pages/user/WalletHub';
import Settings from './pages/user/Settings';
import MyPlan from './pages/user/MyPlan';
import PlanMarket from './pages/user/PlanMarket';
import Referrals from './pages/user/Referrals';
import MyRequests from './pages/user/MyRequests';
import Support from './pages/user/Support';
import AdminDashboard from './pages/admin/AdminDashboard';
import ReviewTasks from './pages/admin/ReviewTasks';
import ManagePlans from './pages/admin/ManagePlans';
import WorkManager from './pages/admin/WorkManager';
import UserManager from './pages/admin/UserManager';
import AdminSettings from './pages/admin/AdminSettings';
import PlanRequests from './pages/admin/requests/PlanRequests';
import WithdrawalRequests from './pages/admin/requests/WithdrawalRequests';
import AuditHistory from './pages/admin/AuditHistory';
import Trash from './pages/admin/Trash';
import Header from './layout/Header';
import Footer from './layout/Footer';
import UserLayout from './layout/UserLayout';
import Loader from './components/Loader';
import Maintenance from './components/Maintenance';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SystemProvider, useSystem } from './context/SystemContext';

// Public Layout Wrapper
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user, logout } = useAuth();
  return (
    <div className="flex flex-col min-h-screen">
      <Header isAuthenticated={isAuthenticated} user={user} onLogout={logout} />
      <main className="flex-grow pt-16">{children}</main>
      <Footer />
    </div>
  );
};

const AppRoutes: React.FC = () => {
  const { isAuthenticated, loading: authLoading, user } = useAuth();
  const { settings, isLoading: systemLoading } = useSystem();

  if (authLoading || systemLoading) return <Loader />;

  // Maintenance Guard: Block non-admins if maintenanceMode is active
  const isMaintenanceActive = settings.maintenanceMode;
  const isUserAdmin = user?.role === 'admin';
  
  if (isMaintenanceActive && !isUserAdmin) {
    return <Maintenance />;
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Landing /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route 
          path="/login" 
          element={!isAuthenticated ? <PublicLayout><Login /></PublicLayout> : <Navigate to="/dashboard" />} 
        />
        <Route 
          path="/register" 
          element={!isAuthenticated ? <PublicLayout><Register /></PublicLayout> : <Navigate to="/dashboard" />} 
        />

        {/* Protected Dashboard Routes */}
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? (
              <UserLayout>
                <Dashboard />
              </UserLayout>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        
        <Route 
          path="/tasks" 
          element={
            isAuthenticated ? (
              <UserLayout>
                <WorkCenter />
              </UserLayout>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />

        <Route 
          path="/do-task/:id" 
          element={
            isAuthenticated ? (
              <UserLayout>
                <DoTask />
              </UserLayout>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />

        <Route 
          path="/wallet" 
          element={
            isAuthenticated ? (
              <UserLayout>
                <WalletHub />
              </UserLayout>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />

        <Route 
          path="/profile" 
          element={
            isAuthenticated ? (
              <UserLayout>
                <Settings />
              </UserLayout>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />

        <Route 
          path="/my-plan" 
          element={
            isAuthenticated ? (
              <UserLayout>
                <MyPlan />
              </UserLayout>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />

        <Route 
          path="/upgrade" 
          element={
            isAuthenticated ? (
              <UserLayout>
                <PlanMarket />
              </UserLayout>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />

        <Route 
          path="/referrals" 
          element={
            isAuthenticated ? (
              <UserLayout>
                <Referrals />
              </UserLayout>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />

        <Route 
          path="/requests" 
          element={
            isAuthenticated ? (
              <UserLayout>
                <MyRequests />
              </UserLayout>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />

        <Route 
          path="/support" 
          element={
            isAuthenticated ? (
              <UserLayout>
                <Support />
              </UserLayout>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />

        {/* Admin Routes */}
        <Route 
          path="/admin" 
          element={
            isAuthenticated && user?.role === 'admin' ? (
              <UserLayout>
                <AdminDashboard />
              </UserLayout>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />

        <Route 
          path="/admin/reviews" 
          element={
            isAuthenticated && user?.role === 'admin' ? (
              <UserLayout>
                <ReviewTasks />
              </UserLayout>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />

        <Route 
          path="/admin/history" 
          element={
            isAuthenticated && user?.role === 'admin' ? (
              <UserLayout>
                <AuditHistory />
              </UserLayout>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />

        <Route 
          path="/admin/trash" 
          element={
            isAuthenticated && user?.role === 'admin' ? (
              <UserLayout>
                <Trash />
              </UserLayout>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />

        <Route 
          path="/admin/work" 
          element={
            isAuthenticated && user?.role === 'admin' ? (
              <UserLayout>
                <WorkManager />
              </UserLayout>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />

        <Route 
          path="/admin/plans" 
          element={
            isAuthenticated && user?.role === 'admin' ? (
              <UserLayout>
                <ManagePlans />
              </UserLayout>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />

        <Route 
          path="/admin/users" 
          element={
            isAuthenticated && user?.role === 'admin' ? (
              <UserLayout>
                <UserManager />
              </UserLayout>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />

        <Route 
          path="/admin/plan-requests" 
          element={
            isAuthenticated && user?.role === 'admin' ? (
              <UserLayout>
                <PlanRequests />
              </UserLayout>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />

        <Route 
          path="/admin/withdrawals" 
          element={
            isAuthenticated && user?.role === 'admin' ? (
              <UserLayout>
                <WithdrawalRequests />
              </UserLayout>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />

        <Route 
          path="/admin/settings" 
          element={
            isAuthenticated && user?.role === 'admin' ? (
              <UserLayout>
                <AdminSettings />
              </UserLayout>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <SystemProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </SystemProvider>
  );
};

export default App;
