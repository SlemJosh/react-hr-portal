// =======================
// EmployeeDashboard.jsx
// Description: Employee Dashboard with modern cancel modal + animated leave request cards
// =======================

import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Badge,
  Modal
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { formatRole } from '../../utils/roleUtils';

export default function EmployeeDashboard() {
  const { user, logout } = useAuth();
  const [recentRequests, setRecentRequests] = useState([]);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  // Wrap fetchRequests in useCallback to satisfy useEffect dependency warning
  const fetchRequests = useCallback(() => {
    const allRequests = JSON.parse(localStorage.getItem('leaveRequests')) || [];
    const userRequests = allRequests
      .filter((req) => req.employeeEmail === user?.email)
      .reverse();

    setRecentRequests(userRequests);
  }, [user?.email]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

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

  const getCardStyle = (status) => {
    switch (status) {
      case 'Approved':
        return { borderLeft: '5px solid #198754' };
      case 'Denied':
        return { borderLeft: '5px solid #dc3545' };
      case 'Pending':
        return { borderLeft: '5px solid #ffc107' };
      default:
        return {};
    }
  };

  const handleCancelClick = (requestId) => {
    setSelectedRequestId(requestId);
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    const allRequests = JSON.parse(localStorage.getItem('leaveRequests')) || [];
    const updatedRequests = allRequests.filter((req) => req.id !== selectedRequestId);

    localStorage.setItem('leaveRequests', JSON.stringify(updatedRequests));
    toast.warning('Leave request cancelled.');
    setShowCancelModal(false);
    setSelectedRequestId(null);
    fetchRequests();
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={10}>
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

              {recentRequests.length > 0 ? (
                <>
                  <h5 className="mt-4">📋 Your Leave Requests</h5>
                  <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                    <Row className="g-3">
                      {recentRequests.map((req) => (
                        <Col md={12} key={req.id}>
                          <Card
                            className="shadow-sm animate__animated animate__fadeIn"
                            style={getCardStyle(req.status)}
                          >
                            <Card.Body>
                              <div className="d-flex justify-content-between align-items-start">
                                <div>
                                  <Card.Title className="mb-1">{req.leaveType}</Card.Title>
                                  <Card.Subtitle className="mb-2 text-muted">
                                    {req.startDate} → {req.endDate}
                                  </Card.Subtitle>
                                  <Card.Text className="mb-1">
                                    <strong>Reason:</strong> {req.reason}
                                  </Card.Text>
                                  {req.notes && (
                                    <Card.Text className="mb-2">
                                      <strong>Notes:</strong> {req.notes}
                                    </Card.Text>
                                  )}
                                </div>
                                <div className="text-end">
                                  <Badge
                                    bg={getBadgeVariant(req.status)}
                                    className="fs-6 mb-2"
                                  >
                                    {req.status}
                                  </Badge>
                                  {req.status === 'Pending' && (
                                    <Button
                                      variant="outline-danger"
                                      size="sm"
                                      onClick={() => handleCancelClick(req.id)}
                                    >
                                      Cancel
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
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

      {/* Cancel Modal */}
      <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Leave Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to cancel this leave request? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            No, Keep It
          </Button>
          <Button variant="danger" onClick={confirmCancel}>
            Yes, Cancel It
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
