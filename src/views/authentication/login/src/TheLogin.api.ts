import { API_CONFIG } from '@/config/http.config';
import { Send, HTTP_METHODS } from '@/core/http';
import { HTTP_BODY_TYPES } from '@/core/http/http.dto';

class Api {
  // 生成图片验证码接口地址
  codeImageUrl = API_CONFIG.apiPrefixUrl + '/code/image';

  // 登录接口 / token失效，刷新token
  login(params?: any) {
    return Send({
      url: '/login/auth?userName=' + params.userName + '&pwd=' + params.pwd,
      params: {},
      method: HTTP_METHODS.POST,
      bodyType: HTTP_BODY_TYPES.FORM_DATA,
      isHandleBySelf: true
    });
  }
  // 重新获取token
  refresh(params?: any) {
    return Send({
      url: '/login/refresh',
      params: params,
      method: HTTP_METHODS.POST
    });
  }
  // 生成短信验证码
  codeMobile(params?: any) {
    return Send({
      url: '/code/sms',
      params: params,
      method: HTTP_METHODS.GET,
      errorText: '发送失败'
    });
  }
}

export const TheLoginApi = new Api();
