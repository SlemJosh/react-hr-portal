// =======================
// ViewEmployees.jsx
// Description: Lists all added employees (from context)
// =======================

import React from 'react';
import { useEmployeeContext } from '../../context/EmployeeContext';
import { Table } from 'react-bootstrap';

export default function ViewEmployees() {
  const { employees } = useEmployeeContext();

  return (
    <div className="container mt-4">
      <h2>Employee List</h2>

      {employees.length === 0 ? (
        <p>No employees added yet.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.role}</td>
                <td>{emp.department}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
