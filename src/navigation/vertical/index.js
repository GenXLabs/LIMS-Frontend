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
      title: 'View Reservations',
      icon: 'ion:calendar-outline'
    },
    {
      path: '/staff/lab-reservation/admin-reservations',
      title: 'View Reservation Requests',
      icon: 'mdi:table-cog'
    }
  ]
}

export default navigation
