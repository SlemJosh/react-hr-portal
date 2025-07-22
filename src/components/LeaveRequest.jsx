// =======================
// LeaveRequest.jsx
// Description: Submit new employee leave request (form only)
// =======================

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function LeaveRequest() {
  const { user: loggedInUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    leaveType: 'Vacation',
    reason: '',
    notes: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRequest = {
      employeeEmail: loggedInUser.email,
      employeeName: `${loggedInUser.firstName} ${loggedInUser.lastName}`,
      startDate: formData.startDate,
      endDate: formData.endDate || formData.startDate,
      leaveType: formData.leaveType,
      reason: formData.reason,
      notes: formData.notes,
      status: 'Pending',
    };

    const allRequests = JSON.parse(localStorage.getItem('leaveRequests')) || [];
    const updatedRequests = [...allRequests, newRequest];
    localStorage.setItem('leaveRequests', JSON.stringify(updatedRequests));

    toast.success('Leave request submitted!');

    setTimeout(() => {
      navigate('/employee');
    }, 1500);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Submit New Leave Request</h2>

      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light">
        <div className="mb-3">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            name="startDate"
            className="form-control"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">End Date (optional)</label>
          <input
            type="date"
            name="endDate"
            className="form-control"
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Leave Type</label>
          <select
            name="leaveType"
            className="form-select"
            value={formData.leaveType}
            onChange={handleChange}
          >
            <option value="Vacation">Vacation</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Paid Time Off">Paid Time Off</option>
            <option value="UPT">Unpaid Time</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Reason</label>
          <textarea
            name="reason"
            className="form-control"
            rows="2"
            value={formData.reason}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Additional Notes (optional)</label>
          <textarea
            name="notes"
            className="form-control"
            rows="2"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          Submit Request
        </button>
      </form>
    </div>
  );
}
