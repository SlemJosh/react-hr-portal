// =======================
// ForgotPassword.jsx
// Description: Styled placeholder with portal background and branding
// =======================

import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/index.css";

export default function ForgotPassword() {
  return (
    <div className="login-background">
      <div className="login-overlay" />
      <Container className="d-flex justify-content-center align-items-center min-vh-100 login-card-container">
        <Row className="w-100 justify-content-center">
          <Col md={6} lg={5}>
            <div className="p-4 translucent-card text-center">
              <h3 className="mb-3">Forgot Your Password?</h3>
              <p className="text-muted">
                Unfortunately, we don’t support password resets in this system.
                <br />
                Please contact your friendly neighborhood Human Resources representative.
              </p>
              <p className="fw-bold mt-3">HR Contact: Jean.Grey@hrportal.com</p>

              <div className="mt-4">
                <Image
                  src="/assets/images/sbilogo.png"
                  alt="S&B Industries Logo"
                  className="mt-2"
                  style={{ maxHeight: "40px", opacity: 0.85 }}
                  fluid
                />
              </div>

              <p className="mt-4">
                <Link to="/" className="link-secondary">
                  ← Back to Login
                </Link>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
