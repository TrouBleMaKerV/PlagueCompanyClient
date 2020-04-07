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
