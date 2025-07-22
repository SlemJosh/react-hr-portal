// =======================
// LeaveRequest.jsx
// Description: Submit and view employee leave requests (with unique ID per request)
// =======================

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // ✅ Unique ID generator

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

  const [userRequests, setUserRequests] = useState([]);

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem('leaveRequests')) || [];
    const userFiltered = storedRequests.filter(req => req.employeeEmail === loggedInUser.email);
    setUserRequests(userFiltered);
  }, [loggedInUser.email]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow.toISOString().split('T')[0];
  };

  const isAtLeast24HoursOut = (dateStr) => {
    const selectedDate = new Date(dateStr);
    const now = new Date();
    const diff = selectedDate.getTime() - now.getTime();
    return diff >= 24 * 60 * 60 * 1000;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isAtLeast24HoursOut(formData.startDate)) {
      toast.error('🚫 Start date must be at least 24 hours in the future!');
      return;
    }

    const newRequest = {
      id: uuidv4(), // ✅ Add unique ID
      employeeEmail: loggedInUser.email,
      employeeName: `${loggedInUser.firstName} ${loggedInUser.lastName}`,
      startDate: formData.startDate,
      endDate: formData.endDate || formData.startDate,
      leaveType: formData.leaveType,
      reason: formData.reason,
      notes: formData.notes,
      status: 'Pending'
    };

    const allRequests = JSON.parse(localStorage.getItem('leaveRequests')) || [];
    const updatedRequests = [...allRequests, newRequest];
    localStorage.setItem('leaveRequests', JSON.stringify(updatedRequests));

    setUserRequests(prev => [...prev, newRequest]);

    toast.success('✅ Leave request submitted!');
    setFormData({
      startDate: '',
      endDate: '',
      leaveType: 'Vacation',
      reason: '',
      notes: '',
    });

    setTimeout(() => navigate('/employee'), 800);
  };

  return (
    <div className="container py-4">
      <h2 id="leaveForm" className="mb-4">Submit New Leave Request</h2>

      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light mb-5">
        <div className="mb-3">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            name="startDate"
            className="form-control"
            min={getTomorrowDate()}
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
            min={formData.startDate || getTomorrowDate()}
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
        <button type="submit" className="btn btn-success">Submit Request</button>
      </form>
    </div>
  );
}
