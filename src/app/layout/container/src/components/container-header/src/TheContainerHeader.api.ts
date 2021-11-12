import { Send, HTTP_METHODS } from '@/core/http';

class Api {
  // 注销
  logout(params?: any) {
    return Send({
      url: '/login/signout',
      params: params,
      method: HTTP_METHODS.POST,
      errorText: '退出登录失败'
    });
  }

  // 修改用户信息
  editUser(params?: any) {
    return Send({
      url: '/User/update',
      params: params,
      method: HTTP_METHODS.POST,
      errorText: '修改用户信息失败'
    });
  }

  // 修改用户密码
  resetPwd(params?: any) {
    return Send({
      url: '/User/UpdatePass',
      params: params,
      method: HTTP_METHODS.POST,
      errorText: '修改用户密码失败'
    });
  }

  // 获取当前用户信息
  getUser(params?: any) {
    return Send({
      url: '/sys/user-info/current',
      params: params,
      method: HTTP_METHODS.GET,
      errorText: '获取用户信息失败'
    });
  }

  // 获取系统通知未读消息总数
  getNoreadnum(params?: any) {
    return Send({
      url: '/Msg/noreadnum',
      params: params,
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    });
  }
}

export const TheContainerHeaderApi = new Api();
