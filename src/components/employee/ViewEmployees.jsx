// =======================
// ViewEmployees.jsx
// Description: Card view with modal editing + styled info badges
// =======================

import React, { useState } from 'react';
import { useEmployeeContext } from '../../context/EmployeeContext';
import { Card, Button, Row, Col, Container, Modal, Form, Badge } from 'react-bootstrap';
import { getDepartmentColor } from '../../utils/badgeUtils';

export default function ViewEmployees() {
  const { employees, updateEmployee } = useEmployeeContext();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editForm, setEditForm] = useState({});

  const handleClose = () => {
    setShowModal(false);
    setSelectedEmployee(null);
  };

  const handleShow = (employee) => {
    setSelectedEmployee(employee);
    setEditForm({ ...employee });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateEmployee(editForm);
    handleClose();
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Employee Directory</h2>

      {employees.length === 0 ? (
        <p>No employees added yet.</p>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {employees.map((emp, index) => (
            <Col key={index}>
              <Card
                className="shadow-sm h-100 border border-success"
                onClick={() => handleShow(emp)}
                style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
              >
                <Card.Body>
                  <Card.Title>
                    {emp.firstName && emp.lastName
                      ? `${emp.firstName} ${emp.lastName}`
                      : emp.name || 'Unnamed'}
                  </Card.Title>

                  <Card.Subtitle className="mb-2">
                    {emp.department && (
                      <Badge bg={getDepartmentColor(emp.department)} className="me-1">
                        {emp.department}
                      </Badge>
                    )}
                    {emp.title && (
                      <Badge bg="secondary">{emp.title}</Badge>
                    )}
                  </Card.Subtitle>

                  <Card.Text>
                    <small>
                      <strong>Email:</strong> {emp.email} <br />
                      <strong>Role:</strong>{' '}
                      {emp.role === 'hr' ? 'Human Resources' : 'Employee'} <br />
                      <strong>Leave Requests:</strong>{' '}
                      <span className="text-muted">None pending</span>
                    </small>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Edit Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEmployee && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" value={editForm.firstName || ''} disabled readOnly />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" value={editForm.lastName || ''} disabled readOnly />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Role (Access)</Form.Label>
                <Form.Select name="role" value={editForm.role} onChange={handleChange}>
                  <option value="employee">Employee</option>
                  <option value="hr">Human Resources</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Job Title</Form.Label>
                <Form.Control
                  name="title"
                  type="text"
                  value={editForm.title || ''}
                  onChange={handleChange}
                  placeholder="Team Lead, Developer, etc."
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Department</Form.Label>
                <Form.Select
                  name="department"
                  value={editForm.department || ''}
                  onChange={handleChange}
                >
                  <option value="">Select a Department</option>
                  <option value="IT">IT</option>
                  <option value="Operations">Operations</option>
                  <option value="HR">HR</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Security">Security</option>
                  <option value="Sales">Sales</option>
                  <option value="Finance">Finance</option>
                </Form.Select>
              </Form.Group>

              <div className="d-flex justify-content-between">
                <Button variant="outline-warning" size="sm" disabled>
                  🔁 Reset Password
                </Button>
                <Button variant="outline-danger" size="sm" disabled>
                  🔥 Fire Employee
                </Button>
              </div>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="success" onClick={handleSave}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
