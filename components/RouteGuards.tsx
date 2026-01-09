
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader';

export const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loader />;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export const UserRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loader />;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Prevent Admins from accessing User workflows (Surveys/Tasks)
  if (user?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};
