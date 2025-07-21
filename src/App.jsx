// =======================
// App.jsx
// Description: Main routing configuration with protected routes
// =======================

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { EmployeeProvider } from './context/EmployeeContext';

// Route Guard
import ProtectedRoute from './routes/ProtectedRoute';

// Component Pages
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ForgotPassword from './components/auth/ForgotPassword';
import HRDashboard from './components/dashboard/HRDashboard';
import EmployeeDashboard from './components/dashboard/EmployeeDashboard';
import AddEmployee from './components/employee/AddEmployee';
import ViewEmployees from './components/employee/ViewEmployees';
import LeaveRequest from './components/LeaveRequest';

// Common UI
import Navbar from './components/common/Navbar';

export default function App() {
  return (
    <AuthProvider>
      <EmployeeProvider>
        <Router>
          <Navbar /> {/* 🧭 Visible on all routes */}
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Protected HR Routes */}
            <Route
              path="/hr"
              element={
                <ProtectedRoute allowedRoles={['hr']}>
                  <HRDashboard />
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
      </EmployeeProvider>
    </AuthProvider>
  );
}
