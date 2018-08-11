export const navItems = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer'
    // badge: {
    //   variant: 'info',
    //   text: 'NEW'
    // }
  },
  {
    title: true,
    name: '관리'
  },
  {
    name: '회원관리',
    url: '/usr',
    icon: 'fa fa-user-circle-o',
    children: [
      {
        name: '유효회원',
        url: '/usr-list',
        icon: 'fa fa-user-o'
      },
      {
        name: '탈퇴회원',
        url: '/usrDelete-list',
        icon: 'fa fa-user-o'
      }
    ]
  },
  {
    name: '스터디룸 관리',
    url: '/room-list',
    icon: 'icon-drop'
  },
  {
    name: '상품 관리',
    url: '/prod-list',
    icon: 'fa fa-inbox'
  },
  {
    name: '예약 관리',
    url: '/reserv-list',
    icon: 'icon-calendar'
  },
  {
    title: true,
    name: '게시판'
  },
  {
    name: '공지사항',
    url: '/notice-list',
    icon: 'icon-pencil'
  },
  {
    title: true,
    name: '차트'
  },
  {
    name: '차트',
    url: '/charts',
    icon: 'icon-pie-chart'
  },
  {
    title: true,
    name: '설정'
  },
  {
    name: '설정',
    url: '/def-detail/1',
    icon: 'icon-settings'
  }
];
