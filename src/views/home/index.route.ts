export default {
  name: 'Home',
  path: '/',
  meta: { id: 'home', name: '华映数据' },
  component: () => import(/* webpackChunkName: "home" */ '.')
};
