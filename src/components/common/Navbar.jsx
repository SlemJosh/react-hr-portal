// ============================
// Navbar.jsx
// Role-based navigation bar with user info and department badge
// ============================

import React from "react";
import { Navbar, Container, Nav, Button, Badge } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { getDepartmentColor } from "../../utils/badgeUtils";

export default function AppNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const brandLink = user ? (user.role === "hr" ? "/hr" : "/employee") : "/";

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="sticky-top sticky-nav-shadow">
      <Container className="d-flex justify-content-between align-items-center">
        {/* Logo + Brand */}
        <Navbar.Brand as={Link} to={brandLink} className="d-flex align-items-center">
          <img
            src="/assets/images/sbilogo.png"
            alt="S&B Logo"
            height="36"
            className="me-2 sb-navbar-logo"
          />
          <span className="fw-bold">S&B Industries</span>
        </Navbar.Brand>

        {/* Center Nav Links */}
        <Nav className="mx-auto">
          {user?.role === "hr" && (
            <>
              <Nav.Link as={Link} to="/view-employees">Employee List</Nav.Link>
              <Nav.Link as={Link} to="/add-employee">Add Employee</Nav.Link>
              <Nav.Link as={Link} to="/leave-requests">Leave Requests</Nav.Link>
            </>
          )}
          {user?.role === "employee" && (
            <Nav.Link as={Link} to="/leave-request">Request Leave</Nav.Link>
          )}
        </Nav>

        {/* User Info + Logout / Auth Links */}
        <Nav className="d-flex align-items-center">
          {user ? (
            <>
              <Nav.Item className="text-white me-3">
                <strong>
                  {user.firstName} {user.lastName}
                </strong>
                {user.department && (
                  <Badge
                    bg={getDepartmentColor(user.department)}
                    className="ms-2"
                  >
                    {user.department}
                  </Badge>
                )}
              </Nav.Item>
              <Button variant="outline-light" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
              <Nav.Link as={Link} to="/">Login</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
