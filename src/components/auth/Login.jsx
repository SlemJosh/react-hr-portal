// =======================
// Login.jsx
// Description: Login screen with initial logo overlay that reveals form on click
// =======================

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Form, Button, Container, Row, Col, Alert, Card } from "react-bootstrap";
import "../../styles/index.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [error, setError] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password &&
        u.role === role
    );

    if (!user) {
      setError("Invalid email, password, or role.");
      return;
    }

    login(user.firstName, user.lastName, user.role, user.email);
    navigate(user.role === "hr" ? "/hr" : "/employee");
  };

  return (
    <div className="login-background">
      <div className="login-overlay" />
      <Container className="d-flex justify-content-center align-items-center min-vh-100 login-card-container">
        <Row className="w-100 justify-content-center">
          <Col md={6} lg={5}>
            {!showLoginForm ? (
              <Card
                className="p-4 translucent-card text-center logo-overlay-card"
                onClick={() => setShowLoginForm(true)}
                role="button"
              >
                <img
                  src="/assets/images/sbilogo.png"
                  alt="S&B Industries Logo"
                />
                <p className="mt-3 logo-overlay-text">Click to Enter the Portal</p>
              </Card>
            ) : (
              <div className="p-4 translucent-card">
                <h2 className="text-center mb-4">Login</h2>
                <Form onSubmit={handleSubmit}>
                  {error && <Alert variant="danger">{error}</Alert>}

                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formPassword" className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formRole" className="mt-3">
                    <Form.Label>Select Role</Form.Label>
                    <Form.Select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="employee">Employee</option>
                      <option value="hr">Human Resources</option>
                    </Form.Select>
                  </Form.Group>

                  <Button variant="primary" type="submit" className="mt-4 w-100">
                    Login
                  </Button>

                  <div className="mt-3 text-center">
                    <p>
                      Don't have an account?{" "}
                      <a href="/signup" className="link-primary">
                        Sign up here
                      </a>
                    </p>
                    <p className="mt-2">
                      <a href="/forgot-password" className="link-secondary">
                        Forgot your password? Click here
                      </a>
                    </p>
                  </div>
                </Form>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
