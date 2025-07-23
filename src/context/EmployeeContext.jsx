// =======================
// EmployeeContext.jsx
// Description: Provides global employee list state with localStorage sync (email as unique ID)
// =======================

import React, { createContext, useReducer, useContext, useEffect } from "react";

// Create Context
const EmployeeContext = createContext();

// Load from localStorage if available
const loadInitialEmployees = () => {
  const stored = localStorage.getItem("employees");
  return stored ? JSON.parse(stored) : [];
};

// Initial State
const initialState = {
  employees: loadInitialEmployees(),
};

// Reducer
function employeeReducer(state, action) {
  switch (action.type) {
    case "ADD_EMPLOYEE": {
      const updated = [...state.employees, action.payload];
      localStorage.setItem("employees", JSON.stringify(updated));
      return { ...state, employees: updated };
    }
    case "SET_EMPLOYEES": {
      localStorage.setItem("employees", JSON.stringify(action.payload));
      return { ...state, employees: action.payload };
    }
    case "UPDATE_EMPLOYEE": {
      const updated = state.employees.map((emp) =>
        emp.email === action.payload.email ? { ...emp, ...action.payload } : emp
      );
      localStorage.setItem("employees", JSON.stringify(updated));
      return { ...state, employees: updated };
    }
    case "REMOVE_EMPLOYEE": {
      const updated = state.employees.filter(
        (emp) => emp.email !== action.payload
      );
      localStorage.setItem("employees", JSON.stringify(updated));
      return { ...state, employees: updated };
    }
    default:
      return state;
  }
}

// Provider
export function EmployeeProvider({ children }) {
  const [state, dispatch] = useReducer(employeeReducer, initialState);

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(state.employees));
  }, [state.employees]);

  const addEmployee = (employee) => {
    dispatch({ type: "ADD_EMPLOYEE", payload: employee });
  };

  const setEmployees = (employeeList) => {
    dispatch({ type: "SET_EMPLOYEES", payload: employeeList });
  };

  const updateEmployee = (updatedData) => {
    dispatch({ type: "UPDATE_EMPLOYEE", payload: updatedData });
  };

  const removeEmployee = (email) => {
    dispatch({ type: "REMOVE_EMPLOYEE", payload: email });
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees: state.employees,
        addEmployee,
        setEmployees,
        updateEmployee,
        removeEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

// Hook
export function useEmployeeContext() {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error(
      "useEmployeeContext must be used within an EmployeeProvider"
    );
  }
  return context;
}
