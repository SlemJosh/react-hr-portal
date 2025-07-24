// =======================
// LeaveRequests.jsx
// Description: HR view to review, approve, and manage employee leave requests
// =======================

import React, { useEffect, useState } from 'react';
import {
  Accordion,
  Card,
  Button,
  Badge,
  Row,
  Col,
  Container,
  Alert,
  Form,
  Collapse,
  ListGroup,
} from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function LeaveRequests() {
  const [grouped, setGrouped] = useState({});
  const [showPendingOnly, setShowPendingOnly] = useState(false);
  const [collapsedHandled, setCollapsedHandled] = useState({});
  const [forceShowHandled, setForceShowHandled] = useState(false);

  useEffect(() => {
    loadRequests();
  }, []);

  // Group and sort requests
  const loadRequests = () => {
    const stored = JSON.parse(localStorage.getItem('leaveRequests')) || [];

    stored.sort((a, b) => {
      const statusOrder = { Pending: 1, Approved: 2, Denied: 3 };
      if (statusOrder[a.status] !== statusOrder[b.status]) {
        return statusOrder[a.status] - statusOrder[b.status];
      }
      return new Date(b.startDate) - new Date(a.startDate);
    });

    const byEmployee = {};
    for (const req of stored) {
      const key = req.employeeEmail || req.employeeName;
      if (!byEmployee[key]) byEmployee[key] = { info: req, requests: [] };
      byEmployee[key].requests.push(req);
    }

    setGrouped(byEmployee);
  };

  // Badge UI helper
  const getBadge = (status) => {
    switch (status) {
      case 'Approved':
        return <Badge bg="success">Approved</Badge>;
      case 'Denied':
        return <Badge bg="danger">Denied</Badge>;
      default:
        return <Badge bg="warning" text="dark">Pending</Badge>;
    }
  };

  // Status update handler
  const updateStatus = (id, newStatus) => {
    const all = Object.values(grouped).flatMap(emp => emp.requests);
    const updated = all.map(req =>
      req.id === id ? { ...req, status: newStatus } : req
    );

    localStorage.setItem('leaveRequests', JSON.stringify(updated));
    loadRequests();
    toast.success(`Request ${newStatus.toLowerCase()}!`);
  };

  // Collapse toggler for handled requests
  const toggleCollapse = (empKey) => {
    setCollapsedHandled((prev) => ({
      ...prev,
      [empKey]: !prev[empKey]
    }));
  };

  // Filter visible employees
  const employeesToShow = Object.entries(grouped).filter(([email, { requests }]) => {
    if (showPendingOnly) {
      return requests.some(r => r.status === "Pending");
    }
    return true;
  });

  const noPending = showPendingOnly && employeesToShow.length === 0;

  return (
    <div className="login-background" style={{ minHeight: "100vh", overflowY: "auto" }}>
      <div className="login-overlay" />
      <Container fluid className="py-5 login-card-container">
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={9}>
            <div className="p-4 translucent-card animate__fadeIn">
              <h2 className="text-center mb-2">Manage Leave Requests</h2>

              <Alert variant="info" className="text-center mb-4">
                Review, approve, or deny pending requests. Click an employee to view all their leave requests.
              </Alert>

              <div className="d-flex justify-content-center align-items-center mb-4">
                <Form.Check
                  type="switch"
                  id="pending-only-switch"
                  label="Show Only Pending"
                  checked={showPendingOnly}
                  onChange={() => {
                    setShowPendingOnly((prev) => !prev);
                    setForceShowHandled(false);
                  }}
                />
              </div>

              {/* No pending state */}
              {noPending ? (
                <div className="text-center my-5">
                  <h5 className="mb-3">No active pending leave requests at this time.</h5>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => {
                      setShowPendingOnly(false);
                      setForceShowHandled(true);
                    }}
                  >
                    View All Past Requests
                  </Button>
                </div>

              ) : employeesToShow.length === 0 ? (
                <p>No leave requests found.</p>

              ) : (
                <Accordion defaultActiveKey={employeesToShow[0]?.[0] || ""} alwaysOpen>
                  {employeesToShow.map(([email, { info, requests }]) => {
                    const pending = requests.filter(r => r.status === "Pending");
                    const handled = requests.filter(r => r.status !== "Pending");
                    const tooManyHandled = handled.length > 10;
                    const isCollapsed = collapsedHandled[email] ?? true;

                    return (
                      <Accordion.Item eventKey={email} key={email}>
                        <Accordion.Header>
                          <span className="fw-bold">{info.employeeName}</span>
                          <Badge bg="secondary" className="ms-2">{email}</Badge>
                          {pending.length > 0 && (
                            <Badge bg="warning" text="dark" className="ms-2">
                              {pending.length} Pending
                            </Badge>
                          )}
                        </Accordion.Header>

                        <Accordion.Body className="bg-light">
                          <Row xs={1} sm={2} md={3} className="g-2">
                            {pending.map((req) => (
                              <Col key={req.id}>
                                <Card className="shadow-sm h-100 border border-primary small-card">
                                  <Card.Body className="p-2" style={{ fontSize: '0.875rem' }}>
                                    <Card.Title className="mb-1">
                                      {req.leaveType} {getBadge(req.status)}
                                    </Card.Title>
                                    <Card.Subtitle className="mb-1 text-muted" style={{ fontSize: '0.75rem' }}>
                                      {req.startDate} → {req.endDate}
                                    </Card.Subtitle>
                                    <Card.Text className="mb-2 text-break">
                                      <strong>Reason:</strong> {req.reason}<br />
                                      {req.notes && (
                                        <span><strong>Notes:</strong> {req.notes}</span>
                                      )}
                                    </Card.Text>
                                    <div className="d-flex gap-2 justify-content-between">
                                      <Button
                                        variant="success"
                                        size="sm"
                                        onClick={() => updateStatus(req.id, 'Approved')}
                                      >Approve</Button>
                                      <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => updateStatus(req.id, 'Denied')}
                                      >Deny</Button>
                                    </div>
                                  </Card.Body>
                                </Card>
                              </Col>
                            ))}
                          </Row>

                          {!showPendingOnly && handled.length > 0 && (
                            <div className="mt-4">
                              <h6 className="fw-bold">Past Requests</h6>

                              {tooManyHandled && (
                                <Button
                                  variant="link"
                                  size="sm"
                                  className="p-0 mb-2"
                                  onClick={() => toggleCollapse(email)}
                                >
                                  {isCollapsed
                                    ? `Show ${handled.length} Past Requests...`
                                    : "Hide Past Requests"}
                                </Button>
                              )}

                              <Collapse in={!isCollapsed || forceShowHandled || !tooManyHandled}>
                                <div>
                                  <ListGroup variant="flush" className="border rounded bg-white px-2">
                                    {handled.map(req => (
                                      <ListGroup.Item key={req.id} className="py-2 px-2">
                                        <div className="d-flex justify-content-between align-items-center">
                                          <div className="fw-semibold">
                                            {req.leaveType} ({req.startDate} → {req.endDate})
                                          </div>
                                          {getBadge(req.status)}
                                        </div>
                                        <div className="text-break" style={{ fontSize: '0.85rem' }}>
                                          <strong>Reason:</strong> {req.reason}<br />
                                          {req.notes && (
                                            <span><strong>Notes:</strong> {req.notes}</span>
                                          )}
                                        </div>
                                      </ListGroup.Item>
                                    ))}
                                  </ListGroup>
                                </div>
                              </Collapse>
                            </div>
                          )}
                        </Accordion.Body>
                      </Accordion.Item>
                    );
                  })}
                </Accordion>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
