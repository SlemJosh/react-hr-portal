// =======================
// AuthContext.js
// Description: Provides authentication and role-based login context for the app with persistence
// =======================

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Initialize user from localStorage if available
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Login updates state and localStorage
  const login = (firstName, lastName, role, email = '') => {
    const userData = { firstName, lastName, role, email };
    setUser(userData);
    localStorage.setItem('loggedInUser', JSON.stringify(userData));
  };

  // Logout clears state and localStorage
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
