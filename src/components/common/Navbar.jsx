// ============================
// Navbar.jsx
// Description: Dynamic Navbar with auth-aware links
// ============================

import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AppNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">HR Portal</Navbar.Brand>
        <Nav className="ms-auto">
          {user ? (
            <>
              <Nav.Item className="me-3 text-white">
                Welcome, <strong>{user.name}</strong> ({user.role})
              </Nav.Item>
              <Button variant="outline-light" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Nav.Link href="/signup">Signup</Nav.Link>
              <Nav.Link href="/">Login</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
