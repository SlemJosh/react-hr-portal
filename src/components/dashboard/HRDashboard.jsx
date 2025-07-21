// =======================
// HRDashboard.jsx
// Description: Dashboard page for HR users
// =======================

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function HRDashboard() {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: '2rem' }}>
      <h2>HR Dashboard</h2>
      <p>Welcome, {user?.name}!</p>
      <p>You are logged in as: {user?.role}</p>

      <nav>
        <Link to="/add-employee">➕ Add Employee</Link> |{" "}
        <Link to="/view-employees">📋 View Employees</Link>
      </nav>

      <br />
      <button onClick={logout}>Logout</button>
    </div>
  );
}