import store from '@/store';

export function hasPermission(permissionName: string) {
  const permissions = store.state.permissions;
  if (!permissionName) return true;
  return !!permissions.find((i: string) => i === permissionName);
}
