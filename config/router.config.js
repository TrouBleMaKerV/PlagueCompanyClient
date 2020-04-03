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
