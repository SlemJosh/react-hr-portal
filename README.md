# HR Portal React App

A role-based Human Resources portal built with React, Bootstrap, and localStorage. This mock HR system allows managers to add employees, track departments, and handle leave requests, simulating core functionality without requiring a backend.

---

## 🚀 Features

- Secure login/signup with role-based dashboards
- HR users can view, add, and manage employees
- Employees can submit and cancel leave requests
- Live updates via React Context API
- Toast notifications for key actions
- Responsive UI styled with Bootstrap 5
- Preloaded users and reset functionality for demos

---

https://react-hr-portal.netlify.app/

## 🧪 Demo Credentials

**Preloaded HR User**  
- **Email:** `jean.grey@hrportal.com`  
- **Password:** `admin123`  
- **Note:** Jean Grey is the default HR Operations Manager and cannot be deleted.

**Self-signup option**  
- You can also **sign up** as a new HR user via the login page.
- Select `Human Resources` as your role to unlock admin views.

**Added Employees**  
- All employees created via the HR dashboard are assigned a default password: `temp1234`.

---

## 🛠 Tech Stack

- React 18
- React Router v6
- React Bootstrap
- React Toastify
- Custom context/state management
- LocalStorage (for persistence)

---

## 📂 Project Structure

```
src/
├── components/
│   ├── auth/             # Login & Signup
│   ├── employee/         # LeaveRequest, EmployeeDashboard
│   ├── hr/               # AddEmployee, ViewEmployees
│   └── shared/           # Navbar, Footer, ProtectedRoute
├── context/              # AuthContext and EmployeeContext
├── data/                 # Default user/employee JSON
├── App.jsx               # Main routing logic
└── index.js              # Entry point
```

---

## ✅ Current Functionality

- [x] Role-based routing and dashboard views
- [x] HR can add employees with department and title
- [x] Employees can submit/cancel leave requests
- [x] Context API provides live updates without page refresh
- [x] Toast alerts for success and errors
- [x] Demo reset feature restores app to default state

---

## 🔮 Future Improvements

- Assign employees unique IDs instead of using email as identifiers
- Password reset system with security questions or email prompts
- Password encryption (even in localStorage)
- Search, sort, and filter options in employee directory
- Add avatar or profile photo support
- Persistent session with login retention
- Leave request history and filters (e.g., by status or department)
- Admin dashboard metrics (e.g., total employees, open requests)
- Option to connect to real backend (MongoDB/Express) for production use

---

## ⚠ Known Limitations

- All data is stored in browser `localStorage`
- No backend — intended as a front-end simulation
- No real authentication/encryption
- No accessibility audits completed

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE).

---

## 👤 Contact

**Joshua Slem**  
GitHub: [github.com/SlemJosh](https://github.com/SlemJosh)  
_(aka GrayBear — a name used in design, gaming, and dev work)_

---

