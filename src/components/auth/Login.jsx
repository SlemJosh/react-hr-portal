// =======================
// Login.jsx
// Description: Login screen to simulate authentication and role selection
// =======================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [role, setRole] = useState('employee');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(name, role);

    if (role === 'hr') {
      navigate('/hr');
    } else {
      navigate('/employee');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow">
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formRole" className="mt-3">
              <Form.Label>Select Role</Form.Label>
              <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="employee">Employee</option>
                <option value="hr">HR</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4 w-100">
              Login
            </Button>

            <div className="mt-3 text-center">
              <p>
                Don't have an account?{' '}
                <a href="/signup" className="link-primary">
                  Sign up here
                </a>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
