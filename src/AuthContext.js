// =======================
// AuthContext.js
// Description: Provides authentication and role-based login context for the app.
// =======================

import React, { createContext, useContext, useState } from 'react';

// Create the context
const AuthContext = createContext();

// AuthProvider wraps around the app and stores the login state
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // user: { name, role }

  // Simulated login function
  const login = (name, role) => setUser({ name, role });

  // Simulated logout function
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for easy access to AuthContext
export function useAuth() {
  return useContext(AuthContext);
}
