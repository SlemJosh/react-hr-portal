// ==============================
// AddEmployee.jsx
// Description: Form to add employee with department dropdown + title
// ==============================

import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useEmployeeContext } from "../../context/EmployeeContext";
import { useAuth } from "../../context/AuthContext";

export default function AddEmployee() {
  const { addEmployee } = useEmployeeContext();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "employee",
    department: "IT",
    title: "",
    password: "temp1234", // Default password for added employees
  });

  const departments = [
    "IT",
    "HR",
    "Security",
    "Sales",
    "Operations",
    "Finance",
    "Marketing",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEmployee = {
      ...formData,
      id: Date.now(),
    };

    // Save employee in employee list
    addEmployee(newEmployee);

    // Save user login credentials
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({
      email: formData.email,
      password: formData.password,
      role: formData.role,
      firstName: formData.firstName,
      lastName: formData.lastName,
    });
    localStorage.setItem("users", JSON.stringify(users));

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      role: "employee",
      department: "IT",
      title: "",
      password: "temp1234",
    });
  };

  return (
    <Container className="mt-4">
      <h2>Add New Employee</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </Col>
          <Col>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Row className="mb-3">
          <Col>
            <Form.Label>Department</Form.Label>
            <Form.Select
              name="department"
              value={formData.department}
              onChange={handleChange}
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col>
            <Form.Label>Job Title</Form.Label>
            <Form.Control
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Manager, Developer, etc."
            />
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Access Role</Form.Label>
          <Form.Select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="employee">Employee</option>
            <option value="hr">Human Resources</option>
          </Form.Select>
        </Form.Group>

        <Button type="submit" variant="success">
          Add Employee
        </Button>
      </Form>
    </Container>
  );
}
