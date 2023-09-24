const navigation = () => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'tabler:smart-home'
    },

    {
      sectionTitle: 'Laboratory Reservation'
    },
    {
      path: '/student/lab-reservation/create-request',
      title: 'Request Reservation',
      icon: 'tabler:calendar-event'
    },
    {
      path: '/student/lab-reservation/view-requests',
      title: 'My Reservations',
      icon: 'mdi:calendar-user-outline'
    },
    {
      path: '/staff/lab-reservation/admin-reservations',
      title: 'Reservation Requests',
      icon: 'mdi:table-cog'
    },
    {
      sectionTitle: 'User Management'
    },
    {
      path: '/users/user-accounts',
      title: 'User Accounts',
      icon: 'tabler:users'
    },
   
   
    {
      sectionTitle: 'Practical Timetable'
    },
    {
      path: '/student/timetable',
      title: 'Practical Timetable',
      icon: 'simple-line-icons:calender'
    },
 
    {
      sectionTitle: 'Practical Manual'
    },
    {
      path: '/staff/practical-manual/module-category',
      title: 'Module category',
      icon: 'tabler:file-text'
    },
    {
      path: '/student/document-retrieval',
      title: 'Document Retrieval',
      icon: 'tabler:file-text'
    },
    {
      path: '/staff/practical-manual/manage-document',
      title: 'Manage Document',
      icon: 'tabler:file-text'
    },
 
    {

      path: '/student/document-file',
      title: 'Document File',
      icon: 'tabler:file-text'
    },
    {
      sectionTitle: 'Inventory Management'

    },
    {
      path: '/staff/inventory-management',
      title: 'Inventory Management',
      icon: 'material-symbols:lab-research-outline-sharp'
    },
    {
      sectionTitle: 'Quality assurance'
    },
    {
      path: '/staff/internal-quality-assurance/laboratory-audit-report',
      title: 'Laboratory Audit Report',
      icon: 'carbon:report'
    },
    {
      path: '/staff/internal-quality-assurance/instrument-calibration',
      title: 'Instrument Calibration',
      icon: 'carbon:report'
    },
    {
      path: '/staff/internal-quality-assurance/temperature-monitoring-chart',
      title: 'Temperature Monitoring Chart',
      icon: 'game-icons:chart'
    },

    {
      sectionTitle: 'SOP Management'
    },
    {
      title: 'Instruments',
      icon: 'arcticons:pslab',
      path: '/staff/sop-management/instruments'
    },
    {
      title: 'Biohazard Dispose',
      icon: 'fluent-emoji-high-contrast:biohazard',
      path: '/staff/sop-management/biohazard-dispose'
    },
    {
      sectionTitle: 'Research Management'
    },
    {
      title: 'Research Management',
      icon: ' ',
      path: '/staff/sop-management/instruments'
    }

  ]
}

export default navigation
