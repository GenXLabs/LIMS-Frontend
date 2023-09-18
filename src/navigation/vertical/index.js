const navigation = () => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'tabler:smart-home'
    },
    {
      title: 'User Profile',
      path: '/user-profile',
      icon: 'clarity:avatar-line'
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
      path: '/user-accounts',
      title: 'User Accounts',
      icon: 'tabler:users'
    },
    {
      sectionTitle: 'Practical timetable'
    },
    {
      path: '/student/practical-timetable',
      title: 'Practical Timetable',
      icon: 'simple-line-icons:calender'
    },
    {
      sectionTitle:'inventory management'

    },
    {
      path:'/staff/inventory-management',
      title:'Inventory Management',
      icon:'simple-line-icons:calender'
    }
  ]
}

export default navigation
