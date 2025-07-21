// =======================
// Login.js
// Description: Login screen to simulate authentication and role selection
// =======================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [role, setRole] = useState('employee');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(name, role);

    if (role === 'hr') {
      navigate('/hr');
    } else {
      navigate('/employee');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <br /><br />
        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="employee">Employee</option>
            <option value="hr">HR</option>
          </select>
        </label>
        <br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
