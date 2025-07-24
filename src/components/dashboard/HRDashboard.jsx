// =======================
// HRDashboard.jsx
// HR dashboard with navigation shortcuts and demo reset (Jean only)
// =======================

import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { formatRole } from "../../utils/roleUtils";
import "../../styles/index.css";

export default function HRDashboard() {
  const { user, logout } = useAuth();

  const handleResetData = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="login-background">
      <div className="login-overlay" />
      <Container className="d-flex justify-content-center align-items-center min-vh-100 login-card-container">
        <Row className="w-100 justify-content-center">
          <Col md={8} lg={6}>
            <div className="p-4 translucent-card text-center">
              <h2 className="mb-3">HR Dashboard</h2>
              <p>
                Welcome, <strong>{user?.firstName} {user?.lastName}</strong>!
              </p>
              <p className="text-muted">Role: {formatRole(user?.role)}</p>

              <div className="d-flex justify-content-center gap-3 my-4 flex-wrap">
                <Link to="/add-employee" className="btn btn-success">
                  Add Employee
                </Link>
                <Link to="/view-employees" className="btn btn-info text-white">
                  View Employees
                </Link>
                <Link to="/leave-requests" className="btn btn-warning text-dark">
                  Leave Requests
                </Link>
              </div>

              <div className="d-flex justify-content-center gap-2 flex-wrap">
                {user?.email === "jean.grey@snb.team" && (
                  <Button variant="outline-secondary" onClick={handleResetData}>
                    Reset Demo Data
                  </Button>
                )}
                <Button variant="outline-danger" onClick={logout}>
                  Logout
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
