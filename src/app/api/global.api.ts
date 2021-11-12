import { Send, HTTP_METHODS } from '@/core/http';
import { HTTP_BODY_TYPES } from '@/core/http/http.dto';

class Api {
  // 默认接口 - 实际使用请删除
  upload(params?: any) {
    return Send({
      url: '/file/upload',
      params,
      method: HTTP_METHODS.POST,
      errorText: '上传失败',
      bodyType: HTTP_BODY_TYPES.FORM_DATA
    });
  }

  // 默认接口 - 实际使用请删除
  fileInfo(params?: any) {
    return Send({
      url: '/file/info',
      params,
      method: HTTP_METHODS.GET
    });
  }

  // 自动刷新
  loginRefresh(params?: any) {
    return Send({
      url: '/login/refresh',
      params: params,
      method: HTTP_METHODS.POST,
      isHandleBySelf: true
    });
  }
  // 获取菜单
  getMenu(params?: any) {
    return Send({
      url: '/sys/permission/listPermission4User',
      params: params,
      apiUrlNo: 1,
      method: HTTP_METHODS.GET,
      bodyType: HTTP_BODY_TYPES.FORM_DATA
    });
  }
  // 获取用户
  getUser(params?: any) {
    return Send({
      url: '/sys/permission/listPermission4User',
      apiUrlNo: 1,
      params: params,
      method: HTTP_METHODS.GET,
      bodyType: HTTP_BODY_TYPES.FORM_DATA
    });
  }
}

export const GlobalApi = new Api();
