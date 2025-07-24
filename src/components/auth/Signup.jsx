// =======================
// Signup.jsx
// Account creation form with styled layout and context login
// =======================

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import "../../styles/index.css";

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const normalizedEmail = email.toLowerCase();

    const existingUser = users.find((user) => user.email === normalizedEmail);

    if (existingUser) {
      setError("User already exists with this email.");
      return;
    }

    // Add to users
    const newUser = {
      firstName,
      lastName,
      email: normalizedEmail,
      password,
      role,
    };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));

    // Add to employees if not already present
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const alreadyInEmployees = employees.find((e) => e.email === normalizedEmail);

    if (!alreadyInEmployees) {
      const newEmployee = {
        id: Date.now(),
        firstName,
        lastName,
        email: normalizedEmail,
        role,
        department: "To Be Assigned",
        title: "",
      };
      localStorage.setItem("employees", JSON.stringify([...employees, newEmployee]));
    }

    // Set auth state and redirect
    login(firstName, lastName, role, normalizedEmail);
    navigate(role === "hr" ? "/hr" : "/employee");
  };

  return (
    <div className="login-background">
      <div className="login-overlay" />
      <Container className="d-flex justify-content-center align-items-center min-vh-100 login-card-container">
        <Row className="w-100 justify-content-center">
          <Col md={6} lg={5}>
            <div className="p-4 translucent-card">
              <h2 className="text-center mb-4">Create Account</h2>
              <Form onSubmit={handleSubmit}>
                {error && <Alert variant="danger">{error}</Alert>}

                <Form.Group controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formLastName" className="mt-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mt-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formRole" className="mt-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="employee">Employee</option>
                    <option value="hr">Human Resources</option>
                  </Form.Select>
                </Form.Group>

                <Button type="submit" className="mt-4 w-100" variant="primary">
                  Sign Up
                </Button>

                <div className="mt-3 text-center">
                  <p>
                    Already have an account?{" "}
                    <a href="/" className="link-primary">
                      Login here
                    </a>
                  </p>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
