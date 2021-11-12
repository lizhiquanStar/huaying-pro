export default [
  {
    name: 'Error404',
    path: '/error-404',
    meta: { unauthorized: true },
    component: () => import(/* webpackChunkName: "error-404" */ './error-404')
  },
  {
    name: 'Error403',
    path: '/error-403',
    meta: { unauthorized: true },
    component: () => import(/* webpackChunkName: "error-403" */ './error-403')
  },
  {
    name: 'Login',
    path: '/login',
    meta: { unauthorized: true },
    component: () => import(/* webpackChunkName: "login" */ './login')
  }
];
