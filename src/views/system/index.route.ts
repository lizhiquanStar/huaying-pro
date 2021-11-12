export default [
  {
    name: 'RoleManagement',
    meta: { id: 'role', name: '角色管理' },
    path: '/role-management',
    component: () =>
      import(/* webpackChunkName: "role-management" */ './role-management')
  },
  {
    name: 'PermissionManagement',
    meta: { id: 'permission', name: '权限分配' },
    path: '/permission-management',
    component: () =>
      import(
        /* webpackChunkName: "permission-management" */ './permission-management'
      )
  }
];
