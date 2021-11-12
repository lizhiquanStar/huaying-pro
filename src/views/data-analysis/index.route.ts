export default [
  {
    name: 'AmoyData',
    path: '/amoy-data',
    component: () => import(/* webpackChunkName: "amoy-data" */ './amoy-data')
  }
];
