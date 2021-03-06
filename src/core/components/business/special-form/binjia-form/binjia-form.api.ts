import { Send, HTTP_METHODS } from '@/core/http';

class Api {
  // 列表接口
  list(params?: any) {
    return Send({
      url: '/admin/list',
      params,
      method: HTTP_METHODS.GET,
      errorText: '获取数据失败'
    });
  }
}

export const BsSignAuditBinjiaFormApi = new Api();
