// =======================
// EmployeeContext.jsx
// Description: Global state for managing employee data
// =======================

import React, { createContext, useReducer, useContext } from 'react';

// 1️⃣ Create Context
const EmployeeContext = createContext();

// 2️⃣ Initial State
const initialState = {
  employees: []
};

// 3️⃣ Reducer
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

// 4️⃣ Provider Component
export function EmployeeProvider({ children }) {
  const [state, dispatch] = useReducer(employeeReducer, initialState);

  return (
    <EmployeeContext.Provider value={{ state, dispatch }}>
      {children}
    </EmployeeContext.Provider>
  );
}

// 5️⃣ Hook to use in components
export function useEmployeeContext() {
  return useContext(EmployeeContext);
}
