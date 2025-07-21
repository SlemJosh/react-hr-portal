// =======================
// EmployeeDashboard.jsx
// Description: Dashboard page for Employee users (Bootstrap styled)
// =======================

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { formatRole } from '../../utils/roleUtils';

export default function EmployeeDashboard() {
  const { user, logout } = useAuth();

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow p-4">
            <Card.Body>
              <h2 className="mb-3 text-center">Employee Dashboard</h2>
              <p className="text-center">
                Welcome, <strong>{user?.firstName} {user?.lastName}</strong>!
              </p>
              <p className="text-center text-muted">Role: {formatRole(user?.role)}</p>

              <div className="d-flex justify-content-center my-4">
                <Link to="/leave-request" className="btn btn-primary me-3">
                  📆 Submit Leave Request
                </Link>
              </div>

              <div className="text-center">
                <Button variant="outline-danger" onClick={logout}>
                  Logout
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
