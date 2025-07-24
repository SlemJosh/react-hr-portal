// =======================
// App.jsx
// Main routing + context providers + initial data preload
// =======================

import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Context Providers
import { AuthProvider } from "./context/AuthContext";
import { EmployeeProvider } from "./context/EmployeeContext";

// Preload Data
import { defaultUsers, defaultEmployees, defaultLeaveRequests } from "./data/defaultData";

// Route Guard
import ProtectedRoute from "./routes/ProtectedRoute";

// Auth & Public Pages
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ForgotPassword from "./components/auth/ForgotPassword";

// HR Pages
import HRDashboard from "./components/dashboard/HRDashboard";
import AddEmployee from "./components/hr/AddEmployee";
import ViewEmployees from "./components/hr/ViewEmployees";
import LeaveRequests from "./components/hr/LeaveRequests";

// Employee Pages
import EmployeeDashboard from "./components/dashboard/EmployeeDashboard";
import LeaveRequestForm from "./components/employee/LeaveRequestForm";

// Shared UI
import Navbar from "./components/common/Navbar";

export default function App() {
  useEffect(() => {
    const users = localStorage.getItem("users");
    const employees = localStorage.getItem("employees");
    const leaveRequests = localStorage.getItem("leaveRequests");
    const hasPreloaded = localStorage.getItem("preloaded");

    if ((!users || !employees || !leaveRequests) && !hasPreloaded) {
      localStorage.setItem("users", JSON.stringify(defaultUsers));
      localStorage.setItem("employees", JSON.stringify(defaultEmployees));
      localStorage.setItem("leaveRequests", JSON.stringify(defaultLeaveRequests));
      localStorage.setItem("preloaded", "true");
      window.location.reload();
    }
  }, []);

  return (
    <AuthProvider>
      <EmployeeProvider>
        <Router>
          <Navbar />
          <ToastContainer position="top-center" autoClose={3000} pauseOnHover />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* HR Routes */}
            <Route
              path="/hr"
              element={
                <ProtectedRoute allowedRoles={["hr"]}>
                  <HRDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-employee"
              element={
                <ProtectedRoute allowedRoles={["hr"]}>
                  <AddEmployee />
                </ProtectedRoute>
              }
            />
            <Route
              path="/view-employees"
              element={
                <ProtectedRoute allowedRoles={["hr"]}>
                  <ViewEmployees />
                </ProtectedRoute>
              }
            />
            <Route
              path="/leave-requests"
              element={
                <ProtectedRoute allowedRoles={["hr"]}>
                  <LeaveRequests />
                </ProtectedRoute>
              }
            />

            {/* Employee Routes */}
            <Route
              path="/employee"
              element={
                <ProtectedRoute allowedRoles={["employee"]}>
                  <EmployeeDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/leave-request"
              element={
                <ProtectedRoute allowedRoles={["employee"]}>
                  <LeaveRequestForm />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </EmployeeProvider>
    </AuthProvider>
  );
}
