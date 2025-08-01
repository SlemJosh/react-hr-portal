// =======================
// EmployeeContext.jsx
// Description: Provides global employee list state with localStorage sync
// =======================

import React, { createContext, useReducer, useContext, useEffect } from "react";

// =======================
// Context & Helpers
// =======================
const EmployeeContext = createContext();

const loadInitialEmployees = () => {
  const stored = localStorage.getItem("employees");
  return stored ? JSON.parse(stored) : [];
};

const initialState = {
  employees: loadInitialEmployees(),
};

// =======================
// Reducer
// =======================
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
      if (
        action.payload?.toLowerCase() === "jean.grey@hrportal.com"
      ) {
        console.warn("Cannot remove Jean Grey from employee list.");
        return state;
      }

      const updated = state.employees.filter(
        (emp) => emp.email.toLowerCase() !== action.payload.toLowerCase()
      );
      localStorage.setItem("employees", JSON.stringify(updated));
      return { ...state, employees: updated };
    }

    default:
      return state;
  }
}

// =======================
// Provider Component
// =======================
export function EmployeeProvider({ children }) {
  const [state, dispatch] = useReducer(employeeReducer, initialState);

  // 🔁 Sync state when localStorage changes (cross-tab or reset)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "employees") {
        const updated = JSON.parse(e.newValue);
        if (updated) {
          dispatch({ type: "SET_EMPLOYEES", payload: updated });
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const addEmployee = (employee) =>
    dispatch({ type: "ADD_EMPLOYEE", payload: employee });

  const setEmployees = (employeeList) =>
    dispatch({ type: "SET_EMPLOYEES", payload: employeeList });

  const updateEmployee = (updatedData) =>
    dispatch({ type: "UPDATE_EMPLOYEE", payload: updatedData });

  const removeEmployee = (email) =>
    dispatch({ type: "REMOVE_EMPLOYEE", payload: email });

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

// =======================
// useEmployeeContext Hook
// =======================
export function useEmployeeContext() {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error(
      "useEmployeeContext must be used within an EmployeeProvider"
    );
  }
  return context;
}
