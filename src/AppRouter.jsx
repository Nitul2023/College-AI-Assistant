import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { OnboardingWizard } from './pages/OnboardingWizard';
import { Dashboard } from './pages/Dashboard';
import { SkillSelector } from './pages/SkillSelector'; // NEW
import { RoadmapView } from './pages/RoadmapView'; // NEW
import { ProtectedRoute } from './components/ProtectedRoute';
import authService from './services/authService';

function AppRouter() {
  const isAuthenticated = authService.isAuthenticated();

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} 
      />
      <Route 
        path="/signup" 
        element={isAuthenticated ? <Navigate to="/onboarding" /> : <Signup />} 
      />

      {/* Protected Routes */}
      <Route
        path="/onboarding"
        element={
          <ProtectedRoute>
            <OnboardingWizard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      
      {/* NEW: Skills & Roadmap Routes */}
      <Route
        path="/skills"
        element={
          <ProtectedRoute>
            <SkillSelector />
          </ProtectedRoute>
        }
      />
      <Route
        path="/roadmap"
        element={
          <ProtectedRoute>
            <RoadmapView />
          </ProtectedRoute>
        }
      />

      {/* Default Route */}
      <Route 
        path="/" 
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} 
      />
      
      {/* 404 */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRouter;