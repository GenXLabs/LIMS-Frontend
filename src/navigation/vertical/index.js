const navigation = () => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'tabler:smart-home'
    },
    {
      title: 'Second Page',
      path: '/second-page',
      icon: 'tabler:mail'
    },
    {
      path: '/acl',
      action: 'read',
      subject: 'acl-page',
      title: 'Access Control',
      icon: 'tabler:shield'
    },
    {
      title: 'User Profile',
      path: '/user-profile',
      icon: 'clarity:avatar-line'
    },
    {
      title: 'User accounts',
      path: '/user-accounts',
      icon: 'tabler:users'
    }
  ]
}

export default navigation
