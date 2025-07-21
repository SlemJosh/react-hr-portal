// =======================
// ForgotPassword.jsx
// Description: Simulated forgot password message page
// =======================

import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function ForgotPassword() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="text-center p-4 shadow">
            <h3>Forgot Your Password?</h3>
            <p className="mt-3 text-muted">
              Unfortunately, we don’t support password resets in this system. <br />
              Please contact your friendly neighborhood Human Resources representative.
            </p>
            <p className="fw-bold">💼 HR Contact: Carol@ThisCompany.com</p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
