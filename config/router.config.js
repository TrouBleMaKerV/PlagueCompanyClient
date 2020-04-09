export default [
  // user
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/Main/Province',
          },
          {
            path: '/Main',
            icon: 'profile',
            name: 'Main',
            routes: [
              {
                path: '/Main/Province',
                name: 'Province',
                component: './Main/Province',
                hideInMenu: 'true',//添加页不需要在menu上显示
              },
              {
                path: '/Main/News',
                name: 'News',
                component: './Main/News',
              },
              {
                path: '/Main/Rumors',
                name: 'Rumors',
                component: './Main/Rumors',
              },
              {
                path: '/Main/ChinaStatistic',
                name: 'ChinaStatistic',
                component: './Main/ChinaStatistic',
              },
              {
                path: '/Main/Country',
                name: 'Country',
                component: './Main/Country',
                hideInMenu: 'true',//添加页不需要在menu上显示
              },
              {
                path: '/Main/World',
                name: 'World',
                component: './Main/World',
              },
            ],
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
