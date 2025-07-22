// =======================
// AuthContext.js
// Description: Provides authentication and role-based login context for the app with persistence
// =======================

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('loggedInUser');
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

    console.log('🔐 Logging in with user:', userData); // Optional debug
    setUser(userData);
    localStorage.setItem('loggedInUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('loggedInUser');
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
