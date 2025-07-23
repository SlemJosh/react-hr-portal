// ==========================================
// defaultData.js - Preloaded Users, Employees, and Leave Requests
// ==========================================

// =======================
// Users for AuthContext
// =======================

export const defaultUsers = [
  {
    email: "carol@company.com",
    password: "admin123",
    role: "hr",
    firstName: "Carol",
    lastName: "Jarvis",
  },
  {
    email: "bruce@company.com",
    password: "IamBatman1",
    role: "employee",
    firstName: "Bruce",
    lastName: "Wayne",
  },
  {
    email: "clark@company.com",
    password: "Krypton123",
    role: "employee",
    firstName: "Clark",
    lastName: "Kent",
  },
  {
    email: "steve@company.com",
    password: "ShieldTime1",
    role: "employee",
    firstName: "Steve",
    lastName: "Rogers",
  },
  {
    email: "logan@company.com",
    password: "SniktSnikt",
    role: "employee",
    firstName: "Logan",
    lastName: "Howlett",
  },
  {
    email: "diana@company.com",
    password: "LassoTruth1",
    role: "employee",
    firstName: "Diana",
    lastName: "Prince",
  },
  {
    email: "peter@company.com",
    password: "Webhead",
    role: "employee",
    firstName: "Peter",
    lastName: "Parker",
  },
  {
    email: "barry@company.com",
    password: "TooFast4U",
    role: "employee",
    firstName: "Barry",
    lastName: "Allen",
  },
  {
    email: "natasha@company.com",
    password: "RedLedger1",
    role: "employee",
    firstName: "Natasha",
    lastName: "Romanoff",
  },
  {
    email: "arthur@company.com",
    password: "TridentPower",
    role: "employee",
    firstName: "Arthur",
    lastName: "Curry",
  },
  {
    email: "alfred@company.com",
    password: "TeaAndScones",
    role: "employee",
    firstName: "Alfred",
    lastName: "Pennyworth",
  },
  {
    email: "wanda@company.com",
    password: "ChaosMagic",
    role: "employee",
    firstName: "Wanda",
    lastName: "Maximoff",
  },
  {
    email: "tony@company.com",
    password: "IamIronman",
    role: "employee",
    firstName: "Tony",
    lastName: "Stark",
  },
  {
    email: "thor@company.com",
    password: "Mjolnir123",
    role: "employee",
    firstName: "Thor",
    lastName: "Odinson",
  },
  {
    email: "wade@company.com",
    password: "Chimichanga",
    role: "employee",
    firstName: "Wade",
    lastName: "Wilson",
  },
];

// =======================
// Employees for EmployeeContext
// =======================

export const defaultEmployees = [
  {
    firstName: "Carol",
    lastName: "Jarvis",
    email: "carol@company.com",
    department: "HR",
    title: "Operations Manager",
    role: "hr",
  },
  {
    firstName: "Bruce",
    lastName: "Wayne",
    email: "bruce@company.com",
    department: "Security",
    title: "Night Operations",
    role: "employee",
  },
  {
    firstName: "Clark",
    lastName: "Kent",
    email: "clark@company.com",
    department: "Communications",
    title: "Reporter",
    role: "employee",
  },
  {
    firstName: "Steve",
    lastName: "Rogers",
    email: "steve@company.com",
    department: "Leadership",
    title: "Captain",
    role: "employee",
  },
  {
    firstName: "Logan",
    lastName: "Howlett",
    email: "logan@company.com",
    department: "Tactical Ops",
    title: "Field Agent",
    role: "employee",
  },
  {
    firstName: "Diana",
    lastName: "Prince",
    email: "diana@company.com",
    department: "Legal",
    title: "Diplomatic Advisor",
    role: "employee",
  },
  {
    firstName: "Peter",
    lastName: "Parker",
    email: "peter@company.com",
    department: "IT",
    title: "Intern",
    role: "employee",
  },
  {
    firstName: "Barry",
    lastName: "Allen",
    email: "barry@company.com",
    department: "Logistics",
    title: "Courier",
    role: "employee",
  },
  {
    firstName: "Natasha",
    lastName: "Romanoff",
    email: "natasha@company.com",
    department: "Intelligence",
    title: "Field Analyst",
    role: "employee",
  },
  {
    firstName: "Arthur",
    lastName: "Curry",
    email: "arthur@company.com",
    department: "Marine Ops",
    title: "Deep Diver",
    role: "employee",
  },
  {
    firstName: "Alfred",
    lastName: "Pennyworth",
    email: "alfred@company.com",
    department: "Culinary Services",
    title: "Private Chef & Butler",
    role: "employee",
  },
  {
    firstName: "Wanda",
    lastName: "Maximoff",
    email: "wanda@company.com",
    department: "Public Relations",
    title: "Public Engagement Officer",
    role: "employee",
  },
  {
    firstName: "Tony",
    lastName: "Stark",
    email: "tony@company.com",
    department: "Finance",
    title: "Senior Financial Strategist",
    role: "employee",
  },
  {
    firstName: "Thor",
    lastName: "Odinson",
    email: "thor@company.com",
    department: "Mythical Affairs",
    title: "Cultural Liaison",
    role: "employee",
  },
  {
    firstName: "Wade",
    lastName: "Wilson",
    email: "wade@company.com",
    department: "Tactical Ops",
    title: "Wildcard",
    role: "employee",
  },
];

// =======================
// Preloaded Leave Requests (with REALISTIC UUIDs)
// =======================

export const defaultLeaveRequests = [
  {
    id: "e21f3e6a-f7f5-44bb-bcd0-1a4c4e72caa1",
    employeeEmail: "bruce@company.com",
    employeeName: "Bruce Wayne",
    startDate: "2025-08-15",
    endDate: "2025-08-20",
    reason: "Family emergency",
    leaveType: "PTO",
    notes: "",
    status: "Pending"
  },
  {
    id: "ae41cc8c-f6b4-407c-9ea6-72b5917f9485",
    employeeEmail: "clark@company.com",
    employeeName: "Clark Kent",
    startDate: "2025-09-01",
    endDate: "2025-09-05",
    reason: "Vacation",
    leaveType: "PTO",
    notes: "",
    status: "Pending"
  },
  {
    id: "12f9294c-e638-4c2a-a0a9-f73a1ab34ff1",
    employeeEmail: "diana@company.com",
    employeeName: "Diana Prince",
    startDate: "2025-08-25",
    endDate: "2025-08-28",
    reason: "Conference",
    leaveType: "Business",
    notes: "",
    status: "Pending"
  },
  {
    id: "d6a68f0e-3941-46a2-926f-2093e9d0a101",
    employeeEmail: "alfred@company.com",
    employeeName: "Alfred Pennyworth",
    startDate: "2025-08-10",
    endDate: "2025-08-12",
    reason: "Annual High Tea Festival",
    leaveType: "Personal",
    notes: "",
    status: "Pending"
  },
  {
    id: "bb33f7d2-59cb-4e8e-b152-54b224b9be3a",
    employeeEmail: "wanda@company.com",
    employeeName: "Wanda Maximoff",
    startDate: "2025-08-30",
    endDate: "2025-09-02",
    reason: "Wellness Retreat",
    leaveType: "PTO",
    notes: "",
    status: "Pending"
  },
  {
    id: "3a58de7e-90e5-4484-882f-e51a03a0f9f2",
    employeeEmail: "wade@company.com",
    employeeName: "Wade Wilson",
    startDate: "2025-08-01",
    endDate: "2025-08-02",
    reason: "Got bored",
    leaveType: "UPT",
    notes: "",
    status: "Pending"
  },
  {
    id: "457bfa11-93be-4ae6-aec1-eaee22dd8f76",
    employeeEmail: "wade@company.com",
    employeeName: "Wade Wilson",
    startDate: "2025-08-04",
    endDate: "2025-08-04",
    reason: "Lost a bet",
    leaveType: "UPT",
    notes: "",
    status: "Pending"
  },
  {
    id: "9041c905-209f-4424-9f6e-dcc2f0c3d59f",
    employeeEmail: "wade@company.com",
    employeeName: "Wade Wilson",
    startDate: "2025-08-10",
    endDate: "2025-08-15",
    reason: "Mysterious rash",
    leaveType: "Sick",
    notes: "",
    status: "Pending"
  },
  {
    id: "9ebd0c15-8a4d-4983-a6b0-9904e05c4e5e",
    employeeEmail: "wade@company.com",
    employeeName: "Wade Wilson",
    startDate: "2025-09-03",
    endDate: "2025-09-04",
    reason: "Unspecified mission",
    leaveType: "Business",
    notes: "",
    status: "Pending"
  },
  {
    id: "2c5919ee-3de5-4d87-8701-15b7c964dcee",
    employeeEmail: "wade@company.com",
    employeeName: "Wade Wilson",
    startDate: "2025-09-10",
    endDate: "2025-09-11",
    reason: "Mental health day",
    leaveType: "PTO",
    notes: "",
    status: "Pending"
  }
];
