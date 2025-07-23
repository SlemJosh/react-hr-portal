// =======================
// AuthContext.js
// Description: Provides authentication and role-based login context for the app with persistence
// =======================

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (firstName, lastName, role, email = '') => {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const matchingEmployee = employees.find(emp => emp.email === email);

    const department = matchingEmployee?.department || (role === 'hr' ? 'HR' : 'To Be Assigned');
    const title = matchingEmployee?.title || '';

    const userData = {
      firstName,
      lastName,
      email,
      role,
      department,
      title,
    };

    // Optional debug
    console.log('🔐 Logging in with user:', userData);

    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
