// EmployeeContext.jsx
// Description: Provides global employee list state using React Context + useReducer

import React, { createContext, useReducer, useContext } from 'react';

// Create Context
const EmployeeContext = createContext();

// Initial State
const initialState = {
  employees: []
};

// Reducer
function employeeReducer(state, action) {
  switch (action.type) {
    case 'ADD_EMPLOYEE':
      return {
        ...state,
        employees: [...state.employees, action.payload]
      };
    default:
      return state;
  }
}

// Provider Component
export function EmployeeProvider({ children }) {
  const [state, dispatch] = useReducer(employeeReducer, initialState);

  const addEmployee = (employee) => {
    dispatch({ type: 'ADD_EMPLOYEE', payload: employee });
  };

  return (
    <EmployeeContext.Provider value={{ employees: state.employees, addEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
}

// Custom Hook
export function useEmployeeContext() {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployeeContext must be used within an EmployeeProvider');
  }
  return context;
}
