import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

export function ProtectedRoute({ children }) {
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// At the end
export default ProtectedRoute;
