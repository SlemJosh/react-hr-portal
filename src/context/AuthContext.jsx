// =======================
// AuthContext.js
// Description: Provides authentication and role-based login context for the app.
// =======================

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // ✅ Updated login to handle first + last name separately
  const login = (firstName, lastName, role, email = '') => {
    setUser({ firstName, lastName, role, email });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
