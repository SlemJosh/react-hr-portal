// =======================
// ProtectedRoute.js
// Description: Protects routes based on user login and role
// =======================

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// allowedRoles: ['hr', 'employee', etc.]
export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" />; // Not logged in
  if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" />; // Role mismatch

  return children;
}
