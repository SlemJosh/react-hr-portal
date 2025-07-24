// =======================
// roleUtils.js
// Description: Formats internal role keys into human-readable labels
// =======================

export function formatRole(role) {
  if (!role) return ''; // Guard clause for null/undefined

  switch (role.toLowerCase()) {
    case 'hr':
    case 'human-resources':
      return 'Human Resources';
    case 'employee':
      return 'Employee';
    default:
      return role;
  }
}
