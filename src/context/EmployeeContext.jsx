// =======================
// EmployeeContext.jsx
// Description: Provides global employee list state with localStorage sync
// =======================

import React, { createContext, useReducer, useContext, useEffect } from 'react';

// Create Context
const EmployeeContext = createContext();

// Load from localStorage if available
const loadInitialEmployees = () => {
  const stored = localStorage.getItem('employees');
  return stored ? JSON.parse(stored) : [];
};

// Initial State
const initialState = {
  employees: loadInitialEmployees()
};

// Reducer
function employeeReducer(state, action) {
  switch (action.type) {
    case 'ADD_EMPLOYEE': {
      const updated = [...state.employees, action.payload];
      localStorage.setItem('employees', JSON.stringify(updated));
      return { ...state, employees: updated };
    }
    case 'SET_EMPLOYEES': {
      localStorage.setItem('employees', JSON.stringify(action.payload));
      return { ...state, employees: action.payload };
    }
    default:
      return state;
  }
}

// Provider
export function EmployeeProvider({ children }) {
  const [state, dispatch] = useReducer(employeeReducer, initialState);

  // Ensure localStorage is synced on first render (optional safety net)
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(state.employees));
  }, [state.employees]);

  const addEmployee = (employee) => {
    dispatch({ type: 'ADD_EMPLOYEE', payload: employee });
  };

  const setEmployees = (employeeList) => {
    dispatch({ type: 'SET_EMPLOYEES', payload: employeeList });
  };

  return (
    <EmployeeContext.Provider value={{ employees: state.employees, addEmployee, setEmployees }}>
      {children}
    </EmployeeContext.Provider>
  );
}

// Hook
export function useEmployeeContext() {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployeeContext must be used within an EmployeeProvider');
  }
  return context;
}
