// =======================
// ViewEmployees.jsx (updated)
// Description: Card view with modal editing + styled info badges + pending leave requests + fire employee
// Now includes: Refresh fix on demo reset
// =======================

import React, { useState, useEffect } from "react";
import { useEmployeeContext } from "../../context/EmployeeContext";
import {
  Card,
  Button,
  Row,
  Col,
  Container,
  Modal,
  Form,
  Badge,
} from "react-bootstrap";
import { getDepartmentColor } from "../../utils/badgeUtils";
import { toast } from "react-toastify";

export default function ViewEmployees() {
  const { employees, updateEmployee, removeEmployee } = useEmployeeContext();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [confirmFire, setConfirmFire] = useState(false);

  // Leave requests
  const leaveRequests = JSON.parse(localStorage.getItem("leaveRequests")) || [];

  const getPendingCount = (email) =>
    leaveRequests.filter(
      (req) => req.employeeEmail === email && req.status === "Pending"
    ).length;

  const handleClose = () => {
    setShowModal(false);
    setSelectedEmployee(null);
    setConfirmFire(false);
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

  const handleFire = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (selectedEmployee?.email === "Jean.Grey@hrportal.com") {
      toast.info("Jean Grey cannot be fired. She is the Phoenix.");
      return;
    }

    if (selectedEmployee?.email === currentUser?.email) {
      toast.info("You can't fire yourself.");
      return;
    }

    toast.warning(
      <div>
        <p className="mb-1 fw-bold">
          Are you sure you want to fire {selectedEmployee.firstName}{" "}
          {selectedEmployee.lastName}?
        </p>
        <p className="mb-2 text-danger">This action cannot be undone.</p>
        <div className="d-flex justify-content-end">
          <Button
            size="sm"
            variant="danger"
            className="me-2"
            onClick={() => {
              const currentUser = JSON.parse(
                localStorage.getItem("currentUser")
              );

              if (selectedEmployee?.email === "Jean.Grey@hrportal.com") {
                toast.dismiss();
                toast.info("Jean Grey cannot be fired. She is the Phoenix.");
                return;
              }

              if (selectedEmployee?.email === currentUser?.email) {
                toast.dismiss();
                toast.info("You can't fire yourself.");
                return;
              }

              toast.dismiss();
              toast.error(
                <div>
                  <p className="mb-1 fw-bold">Are you really sure?</p>
                  <p className="mb-2 text-danger">
                    This looks like it could be the end for{" "}
                    {selectedEmployee.firstName} {selectedEmployee.lastName}.
                  </p>
                  <div className="d-flex justify-content-end">
                    <Button
                      size="sm"
                      variant="danger"
                      className="me-2"
                      onClick={() => {
                        if (selectedEmployee?.email === "Jean.Grey@hrportal.com") {
                          toast.dismiss();
                          toast.info("Jean Grey cannot be fired. She is the Phoenix.");
                          return;
                        }

                        if (selectedEmployee?.email === currentUser?.email) {
                          toast.dismiss();
                          toast.info("You can't fire yourself.");
                          return;
                        }

                        setConfirmFire(true);
                        toast.dismiss();
                      }}
                    >
                      Yes, Fire Them
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => toast.dismiss()}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>,
                {
                  autoClose: false,
                  closeOnClick: false,
                }
              );
            }}
          >
            Confirm
          </Button>
          <Button size="sm" variant="secondary" onClick={() => toast.dismiss()}>
            Cancel
          </Button>
        </div>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
      }
    );
  };

  useEffect(() => {
    if (confirmFire && selectedEmployee?.email) {
      if (selectedEmployee.email === "Jean.Grey@hrportal.com") {
        toast.error("Jean Grey cannot be fired.");
        return;
      }

      removeEmployee(selectedEmployee.email);
      toast.success(
        `${selectedEmployee.firstName} ${selectedEmployee.lastName} has been fired.`
      );
      handleClose();
    }
  }, [confirmFire, selectedEmployee, removeEmployee]);

  // ✅ NEW: Refresh fix after demo reset
  useEffect(() => {
    const handleStorageChange = () => {
      // Force a manual state refresh (reloads employee context on reset)
      window.location.reload();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Employee Directory</h2>

      {employees.length === 0 ? (
        <p>No employees added yet.</p>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {employees.map((emp, index) => (
            <Col key={emp.email || index}>
              <Card
                className="shadow-sm h-100 border border-success"
                onClick={() => handleShow(emp)}
                style={{
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.02)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1.0)")
                }
              >
                <Card.Body>
                  <Card.Title>
                    {emp.firstName && emp.lastName
                      ? `${emp.firstName} ${emp.lastName}`
                      : emp.name || "Unnamed"}
                  </Card.Title>

                  <Card.Subtitle className="mb-2">
                    {emp.department && (
                      <Badge
                        bg={getDepartmentColor(emp.department)}
                        className="me-1"
                      >
                        {emp.department}
                      </Badge>
                    )}
                    {emp.title && <Badge bg="secondary">{emp.title}</Badge>}
                  </Card.Subtitle>

                  <Card.Text>
                    <small>
                      <strong>Email:</strong> {emp.email}
                      <br />
                      <strong>Role:</strong>{" "}
                      {emp.role === "hr" ? "Human Resources" : "Employee"}
                      <br />
                      <strong>Leave Requests:</strong>{" "}
                      {getPendingCount(emp.email) > 0 ? (
                        <Badge bg="warning" text="dark">
                          {getPendingCount(emp.email)} Pending
                        </Badge>
                      ) : (
                        <span className="text-muted">None pending</span>
                      )}
                    </small>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Modal remains unchanged */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEmployee && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  value={editForm.firstName || ""}
                  disabled
                  readOnly
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  value={editForm.lastName || ""}
                  disabled
                  readOnly
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Role (Access)</Form.Label>
                <Form.Select
                  name="role"
                  value={editForm.role}
                  onChange={handleChange}
                >
                  <option value="employee">Employee</option>
                  <option value="hr">Human Resources</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Job Title</Form.Label>
                <Form.Control
                  name="title"
                  type="text"
                  value={editForm.title || ""}
                  onChange={handleChange}
                  placeholder="Team Lead, Developer, etc."
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Department</Form.Label>
                <Form.Select
                  name="department"
                  value={editForm.department || ""}
                  onChange={handleChange}
                >
                  <option value="">Select a Department</option>
                  <option value="HR">HR</option>
                  <option value="IT">IT</option>
                  <option value="Security">Security</option>
                  <option value="Operations">Operations</option>
                  <option value="Sales">Sales</option>
                  <option value="Finance">Finance</option>
                  <option value="Leadership">Leadership</option>
                  <option value="Communications">Communications</option>
                  <option value="Legal">Legal</option>
                  <option value="Marine Ops">Marine Ops</option>
                  <option value="Culinary Services">Culinary Services</option>
                  <option value="Logistics">Logistics</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Tactical Ops">Tactical Ops</option>
                  <option value="Public Relations">Public Relations</option>
                  <option value="Intelligence">Intelligence</option>
                  <option value="Mythical Affairs">Mythical Affairs</option>
                  <option value="Dimensional R&D">Dimensional R&D</option>
                </Form.Select>
              </Form.Group>

              <div className="d-flex justify-content-between">
                <Button variant="outline-warning" size="sm" disabled>
                  🔁 Reset Password
                </Button>
                <Button variant="outline-danger" size="sm" onClick={handleFire}>
                  🔥 Fire Employee
                </Button>
              </div>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
