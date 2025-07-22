// =======================
// LeaveRequests.jsx
// Description: HR master view with centered toggle & no empty employees in Pending Only mode
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
} from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function LeaveRequests() {
  const [grouped, setGrouped] = useState({});
  const [showPendingOnly, setShowPendingOnly] = useState(false);
  const [collapsedHandled, setCollapsedHandled] = useState({});
  const [forceShowHandled, setForceShowHandled] = useState(false); // For "View All Past Requests" button

  useEffect(() => {
    loadRequests();
  }, []);

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

  const updateStatus = (id, newStatus) => {
    const all = Object.values(grouped).flatMap(emp => emp.requests);
    const updated = all.map(req =>
      req.id === id ? { ...req, status: newStatus } : req
    );
    localStorage.setItem('leaveRequests', JSON.stringify(updated));
    loadRequests();
    toast.success(`Request ${newStatus.toLowerCase()}!`);
  };

  // Toggle for handled requests
  const toggleCollapse = (empKey) => {
    setCollapsedHandled((prev) => ({
      ...prev,
      [empKey]: !prev[empKey]
    }));
  };

  // Filter: Only show employees with pending requests if toggled on
  const employeesToShow = Object.entries(grouped).filter(([email, { requests }]) => {
    if (showPendingOnly) {
      return requests.some(r => r.status === "Pending");
    }
    return true;
  });

  // If no pending, show a callout and an option to view history
  const noPending = showPendingOnly && employeesToShow.length === 0;

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-2">Manage Leave Requests</h2>
      <Alert variant="info" className="text-center mb-4">
        Review, approve, or deny pending requests. Click an employee to view all their leave requests.
      </Alert>
      {/* Centered toggle */}
      <div className="d-flex justify-content-center align-items-center mb-4">
        <Form.Check
          type="switch"
          id="pending-only-switch"
          label="Show Only Pending"
          checked={showPendingOnly}
          onChange={() => { setShowPendingOnly((prev) => !prev); setForceShowHandled(false); }}
          className="me-2"
        />
      </div>
      {noPending ? (
        <div className="text-center my-5">
          <h5 className="mb-3">🎉 No active pending leave requests at this time.</h5>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => { setShowPendingOnly(false); setForceShowHandled(true); }}
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
                  <Row xs={1} md={2} className="g-3">
                    {/* Pending Requests */}
                    {pending.map((req) => (
                      <Col key={req.id}>
                        <Card className="shadow-sm h-100 border border-primary">
                          <Card.Body>
                            <Card.Title>
                              {req.leaveType} {getBadge(req.status)}
                            </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                              {req.startDate} → {req.endDate}
                            </Card.Subtitle>
                            <Card.Text>
                              <strong>Reason:</strong> {req.reason}<br />
                              {req.notes && (
                                <span><strong>Notes:</strong> {req.notes}</span>
                              )}
                            </Card.Text>
                            <div className="d-flex gap-2">
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

                    {/* Handled Requests (collapsed if >10) */}
                    {!showPendingOnly && handled.length > 0 && (
                      <Col xs={12}>
                        <div>
                          {tooManyHandled ? (
                            <>
                              <Button
                                variant="link"
                                size="sm"
                                className="p-0 mb-2"
                                onClick={() => toggleCollapse(email)}
                              >
                                {isCollapsed ? `Show ${handled.length} Past Requests...` : "Hide Past Requests"}
                              </Button>
                              <Collapse in={!isCollapsed || forceShowHandled}>
                                <div>
                                  <Row xs={1} md={2} className="g-3">
                                    {handled.map(req => (
                                      <Col key={req.id}>
                                        <Card className="shadow-sm h-100 border border-secondary bg-light">
                                          <Card.Body>
                                            <Card.Title>
                                              {req.leaveType} {getBadge(req.status)}
                                            </Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">
                                              {req.startDate} → {req.endDate}
                                            </Card.Subtitle>
                                            <Card.Text>
                                              <strong>Reason:</strong> {req.reason}<br />
                                              {req.notes && (
                                                <span><strong>Notes:</strong> {req.notes}</span>
                                              )}
                                            </Card.Text>
                                          </Card.Body>
                                        </Card>
                                      </Col>
                                    ))}
                                  </Row>
                                </div>
                              </Collapse>
                            </>
                          ) : (
                            <Row xs={1} md={2} className="g-3 mt-2">
                              {handled.map(req => (
                                <Col key={req.id}>
                                  <Card className="shadow-sm h-100 border border-secondary bg-light">
                                    <Card.Body>
                                      <Card.Title>
                                        {req.leaveType} {getBadge(req.status)}
                                      </Card.Title>
                                      <Card.Subtitle className="mb-2 text-muted">
                                        {req.startDate} → {req.endDate}
                                      </Card.Subtitle>
                                      <Card.Text>
                                        <strong>Reason:</strong> {req.reason}<br />
                                        {req.notes && (
                                          <span><strong>Notes:</strong> {req.notes}</span>
                                        )}
                                      </Card.Text>
                                    </Card.Body>
                                  </Card>
                                </Col>
                              ))}
                            </Row>
                          )}
                        </div>
                      </Col>
                    )}
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      )}
    </Container>
  );
}
