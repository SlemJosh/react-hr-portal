// =======================
// ProtectedRoute.jsx
// Description: Protects routes based on user login and role
// =======================

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Usage: <ProtectedRoute allowedRoles={['hr']}><SomePage /></ProtectedRoute>
export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  if (!user) {
    console.warn('🔒 Access blocked: no user logged in.');
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(user.role)) {
    console.warn(`🔒 Access blocked: role "${user.role}" not in [${allowedRoles.join(', ')}]`);
    return <Navigate to="/unauthorized" />;
  }

  return children;
}
