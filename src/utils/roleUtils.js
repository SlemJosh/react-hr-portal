// utils/roleUtils.js

export function formatRole(role) {
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
