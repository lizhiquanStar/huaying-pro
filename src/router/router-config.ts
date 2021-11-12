import router from './router';
// import store from '../store';

router.beforeEach((to, from, next) => {
  // 后台给予菜单
  // if (!to.meta.unauthorized) {
  //   const menu = (store.state.user || {}).menu;
  //   if (!menu) return next('/error-403');
  //   const isAllowed = hasPermissionInList(menu, to.path);
  //   if (!isAllowed) return next('/error-403');
  // }
  next();
});

export { router };

export function hasPermissionInList(list: any[], path: string): boolean {
  return list.some((item) => {
    const p = handleMenuPath(item.path, path);
    if (p === path) return true;
    if (item.children && item.children.length)
      return hasPermissionInList(item.children, path);
    return false;
  });
}

function handleMenuPath(path: string, routePath: string) {
  if (_.endsWith(path, '/:id')) {
    const paths = routePath.split('/');
    path = path.replace(':id', paths[paths.length - 1]);
  }
  return path;
}
