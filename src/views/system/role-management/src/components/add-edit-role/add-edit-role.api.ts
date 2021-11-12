import { Send, HTTP_METHODS } from '@/core/http';

class Api {
  // 列表接口
  list(params?: any) {
    return Send({
      url: params.id ? '/Role/get?id=' + params.id : '/Role/get',
      params: {},
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    });
  }
  edit(params?: any) {
    return Send({
      url: '/Role/update',
      params,
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    });
  }
  add(params?: any) {
    return Send({
      url: '/Role/save',
      params,
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    });
  }
}

export const BsRoleManagementAddEditRoleApi = new Api();
