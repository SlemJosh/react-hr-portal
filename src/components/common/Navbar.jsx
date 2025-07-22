// ============================
// Navbar.jsx
// Description: Navbar with role-based links and department badge
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
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand as={Link} to={brandLink}>HR Portal</Navbar.Brand>

        {/* Centered role-specific links */}
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

        {/* Right aligned user info + logout */}
        <Nav className="d-flex align-items-center">
          {user ? (
            <>
              <Nav.Item className="text-white me-3">
                <strong>
                  {user.firstName} {user.lastName}
                </strong>{" "}
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
