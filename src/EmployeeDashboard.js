// =======================
// EmployeeDashboard.js
// Description: Dashboard page for Employee users
// =======================

import React from 'react';
import { useAuth } from './AuthContext';

export default function EmployeeDashboard() {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Employee Dashboard</h2>
      <p>Welcome, {user?.name}!</p>
      <p>You are logged in as: {user?.role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
