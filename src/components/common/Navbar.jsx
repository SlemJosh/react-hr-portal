// =======================
// Navbar.jsx
// Description: Top navigation bar with role-based links and logout
// =======================

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

export default function AppNavbar() {
  const { isLoggedIn, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to={user?.role === 'hr' ? '/hr' : '/employee'}>
          HR Portal
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isLoggedIn && user?.role === 'hr' && (
              <>
                <Nav.Link as={Link} to="/add-employee">Add Employee</Nav.Link>
                <Nav.Link as={Link} to="/view-employees">View Employees</Nav.Link>
              </>
            )}
            {isLoggedIn && user?.role === 'employee' && (
              <Nav.Link as={Link} to="/leave-request">Leave Request</Nav.Link>
            )}
          </Nav>

          {isLoggedIn && (
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
