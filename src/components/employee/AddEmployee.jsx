// =======================
// AddEmployee.jsx
// Description: Form to add a new employee (HR only)
// =======================

import React, { useState } from 'react';
import { useEmployeeContext } from '../../context/EmployeeContext';
import { useNavigate } from 'react-router-dom';

export default function AddEmployee() {
  const { addEmployee } = useEmployeeContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'employee',
    department: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.department) {
      alert('Please fill in all fields');
      return;
    }

    // Add employee to context
    addEmployee(formData);

    // Optional: reset form or redirect
    setFormData({
      name: '',
      email: '',
      role: 'employee',
      department: '',
    });

    navigate('/view-employees'); // Or stay on same page
  };

  return (
    <div className="container mt-5">
      <h2>Add New Employee</h2>
      <form onSubmit={handleSubmit} className="mt-4">

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            name="name"
            type="text"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            name="email"
            type="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Role</label>
          <select
            name="role"
            className="form-select"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Department</label>
          <input
            name="department"
            type="text"
            className="form-control"
            value={formData.department}
            onChange={handleChange}
            placeholder="Marketing"
          />
        </div>

        <button type="submit" className="btn btn-success">
          Add Employee
        </button>
      </form>
    </div>
  );
}
