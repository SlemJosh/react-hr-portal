// =======================
// AddEmployee.jsx
// Description: Add employee form with confirmation toast (via react-toastify)
// =======================

import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // ✅ Toastify for consistent feedback

export default function AddEmployee() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "employee",
    department: "To Be Assigned",
    title: "",
    password: "temp1234",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, role, department, title, password } =
      formData;

    if (!firstName || !lastName || !email || !role) {
      setError("Please fill in all required fields.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const employees = JSON.parse(localStorage.getItem("employees")) || [];

    const userExists = users.find((u) => u.email === email);
    if (userExists) {
      setError("A user with this email already exists.");
      return;
    }

    const newUser = { firstName, lastName, email, role, password };
    const newEmployee = { firstName, lastName, email, role, department, title };

    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    localStorage.setItem(
      "employees",
      JSON.stringify([...employees, newEmployee])
    );

    toast.success(`✅ Added ${firstName} ${lastName} to the team!`);

    setTimeout(() => {
      navigate("/view-employees");
    }, 1000);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="text-center mb-4">Add New Employee</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form
            onSubmit={handleSubmit}
            className="border p-4 rounded bg-light shadow"
          >
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Select
                name="department"
                value={formData.department}
                onChange={handleChange}
              >
                <option>To Be Assigned</option>
                <option>HR</option>
                <option>IT</option>
                <option>Security</option>
                <option>Operations</option>
                <option>Sales</option>
                <option>Finance</option>
                <option>Leadership</option>
                <option>Communications</option>
                <option>Legal</option>
                <option>Marine Ops</option>
                <option>Culinary Services</option>
                <option>Logistics</option>
                <option>Marketing</option>
                <option>Tactical Ops</option>
                <option>Public Relations</option>
                <option>Intelligence</option>
                <option>Mythical Affairs</option>
                <option>Dimensional R&D</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="employee">Employee</option>
                <option value="hr">Human Resources</option>
              </Form.Select>
            </Form.Group>

            <Button variant="success" type="submit" className="w-100">
              Add Employee
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
