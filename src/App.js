// =======================
// App.js
// Description: Main routing configuration with protected routes
// =======================

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

// Component Pages (to be created)
import Login from './Login';
import Signup from './Signup';
import HrDashboard from './HrDashboard';
import EmployeeDashboard from './EmployeeDashboard';
import AddEmployee from './AddEmployee';
import ViewEmployees from './ViewEmployees';
import LeaveRequest from './LeaveRequest';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected HR Routes */}
          <Route
            path="/hr"
            element={
              <ProtectedRoute allowedRoles={['hr']}>
                <HrDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-employee"
            element={
              <ProtectedRoute allowedRoles={['hr']}>
                <AddEmployee />
              </ProtectedRoute>
            }
          />
          <Route
            path="/view-employees"
            element={
              <ProtectedRoute allowedRoles={['hr']}>
                <ViewEmployees />
              </ProtectedRoute>
            }
          />

          {/* Protected Employee Routes */}
          <Route
            path="/employee"
            element={
              <ProtectedRoute allowedRoles={['employee']}>
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leave-request"
            element={
              <ProtectedRoute allowedRoles={['employee']}>
                <LeaveRequest />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
