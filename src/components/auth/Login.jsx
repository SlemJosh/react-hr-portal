// =======================
// Login.jsx
// Description: Login screen to simulate authentication and role selection
// =======================

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Allow login by first name or email, match role and password
    const user = users.find(
      (u) =>
        (u.firstName.toLowerCase() === name.toLowerCase() ||
          u.email.toLowerCase() === name.toLowerCase()) &&
        u.role === role
    );

    if (!user) {
      setError("User not found or role mismatch. Please check your info.");
      return;
    }

    if (user.password !== password) {
      setError("Incorrect password. Please try again.");
      return;
    }

    login(user.firstName || user.email, user.role);
    navigate(user.role === "hr" ? "/hr" : "/employee");
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Login</h2>
          <Form
            onSubmit={handleSubmit}
            className="p-4 border rounded bg-light shadow"
          >
            {error && <Alert variant="danger">{error}</Alert>}

            <Form.Group controlId="formName">
              <Form.Label>Name or Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name or email"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                <option value="hr">HR</option>
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
        </Col>
      </Row>
    </Container>
  );
}
