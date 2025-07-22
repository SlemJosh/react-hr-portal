// =======================
// EmployeeDashboard.jsx
// Description: Dashboard page for Employee users with full leave history (scrollable)
// =======================

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';
import { formatRole } from '../../utils/roleUtils';

export default function EmployeeDashboard() {
  const { user, logout } = useAuth();
  const [userRequests, setUserRequests] = useState([]);

  useEffect(() => {
    const allRequests = JSON.parse(localStorage.getItem('leaveRequests')) || [];
    const filtered = allRequests
      .filter((req) => req.employeeEmail === user?.email)
      .reverse(); // Show most recent first
    setUserRequests(filtered);
  }, [user?.email]);

  const getBadgeVariant = (status) => {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Denied':
        return 'danger';
      default:
        return 'warning text-dark';
    }
  };

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

              {userRequests.length > 0 ? (
                <>
                  <h5 className="mt-4 mb-2">📋 Your Leave Request History</h5>
                  <div
                    className="scroll-container p-2 border rounded"
                    style={{
                      maxHeight: '400px',
                      overflowY: 'auto',
                      backgroundColor: '#f8f9fa'
                    }}
                  >
                    {userRequests.map((req, idx) => (
                      <Card className="shadow-sm mb-3" key={idx}>
                        <Card.Body className="py-3 px-4">
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <Card.Title className="mb-1">{req.leaveType}</Card.Title>
                              <Card.Subtitle className="mb-2 text-muted">
                                {req.startDate} → {req.endDate}
                              </Card.Subtitle>
                              <Card.Text className="mb-1">
                                <strong>Reason:</strong>{' '}
                                {req.reason.length > 60 ? req.reason.slice(0, 60) + '...' : req.reason}
                              </Card.Text>
                              {req.notes && (
                                <Card.Text className="mb-1 text-muted">
                                  <em>Notes:</em> {req.notes.length > 60 ? req.notes.slice(0, 60) + '...' : req.notes}
                                </Card.Text>
                              )}
                            </div>
                            <Badge bg={getBadgeVariant(req.status)} className="fs-6 mt-1">
                              {req.status}
                            </Badge>
                          </div>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center mt-4 text-muted">
                  You haven’t submitted any leave requests yet.
                </div>
              )}

              <div className="text-center mt-5">
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
