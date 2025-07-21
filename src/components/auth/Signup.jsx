// =======================
// Signup.jsx
// Description: Signup with localStorage + login + redirect + spinner
// =======================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'employee',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, role } = formData;

    if (!firstName || !lastName || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existing = users.find((u) => u.email === email);
    if (existing) {
      setError('User with this email already exists.');
      return;
    }

    const newUser = { firstName, lastName, email, password, role };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // ⬇️ Also add to employee list if not already there
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const alreadyInEmployees = employees.find((e) => e.email === email);

    if (!alreadyInEmployees) {
      const newEmployee = {
        name: `${firstName} ${lastName}`,
        email,
        role,
        department: 'To Be Assigned',
      };
      localStorage.setItem('employees', JSON.stringify([...employees, newEmployee]));
    }

    // ⬇️ Auto-login with spinner and redirect
    login(firstName, lastName, role, email);
    setLoading(true);

    setTimeout(() => {
      navigate(role === 'hr' ? '/hr' : '/employee');
    }, 500);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Sign Up</h2>

          {loading ? (
            <div className="text-center my-5">
              <Spinner animation="border" role="status" />
              <p className="mt-3">Redirecting to your dashboard...</p>
            </div>
          ) : (
            <Form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow">
              {error && <Alert variant="danger">{error}</Alert>}

              <Form.Group className="mb-3" controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formRole">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="employee">Employee</option>
                  <option value="hr">Human Resources</option>
                </Form.Select>
              </Form.Group>

              <Button variant="success" type="submit" className="w-100">
                Register
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
}
