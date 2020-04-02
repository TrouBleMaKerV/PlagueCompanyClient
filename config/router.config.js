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
            redirect: '/Main/Main',
          },
          {
            path: '/Main',
            icon: 'profile',
            name: 'Main',
            routes: [
              {
                path: '/Main/Main',
                name: 'Main',
                component: './Main/Main',
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
