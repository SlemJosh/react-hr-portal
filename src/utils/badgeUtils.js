// =======================
// badgeUtils.js
// Description: Maps department names to Bootstrap badge colors (clean & consistent)
// =======================

export function getDepartmentColor(department) {
  switch (department) {
    case 'HR':
    case 'Tactical Ops':
      return 'danger';

    case 'IT':
    case 'Dimensional R&D':
      return 'primary';

    case 'Security':
    case 'Logistics':
      return 'warning';

    case 'Operations':
    case 'Leadership':
    case 'Mythical Affairs':
      return 'secondary';

    case 'Sales':
    case 'Marine Ops':
    case 'Culinary Services':
      return 'success';

    case 'Finance':
    case 'Legal':
    case 'Intelligence':
      return 'dark';

    case 'Communications':
    case 'Marketing':
    case 'Public Relations':
      return 'info';

    case 'To Be Assigned':
      return 'secondary';

    default:
      return 'secondary'; // fallback for any unknown departments
  }
}
