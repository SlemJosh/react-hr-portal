// badgeUtils.js

export function getDepartmentColor(department) {
  switch (department) {
    case 'HR':
      return 'danger';
    case 'IT':
      return 'primary';
    case 'Marketing':
      return 'info';
    case 'Security':
      return 'warning';
    case 'Operations':
      return 'secondary';
    case 'Sales':
      return 'success';
    case 'Finance':
      return 'dark';
    default:
      return 'secondary'; // ← safer default to prevent unreadable badge
  }
}
