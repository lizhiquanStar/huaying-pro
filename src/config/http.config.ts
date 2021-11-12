import store from '@/store';
import { ApiConfig, HTTP_BODY_TYPES } from '@/core/http/http.dto';

export const API_CONFIG: ApiConfig = {
  apiPrefixUrl: 'http://47.100.189.31:8080', //接口域名地址
  defaultBodyType: HTTP_BODY_TYPES.RAW_JSON, //默认请求的content_type
  successCode: 0,
  successMessage: '请求成功',
  errroDefaultMessage: '服务器连接出现问题',
  errorHandles: [
    (httpStatus) => {
      if (httpStatus === 401 || httpStatus === 400) {
        store.commit('tokenExpired');
      }
    }
  ],
  beforeApiSend(options) {
    const token = store.state.user.token;
    const tokenType = store.state.user.token_type || 'bearer ';
    if (token) {
      if (options.headers) {
        options.headers.Authorization = `${tokenType} ${token}`;
      } else {
        options.headers = {
          Authorization: `${tokenType} ${token}`
        };
      }
    }
    return options;
  },
  hasNoErrorHandle(httpStatus) {
    if (httpStatus === 401) return true;
    return false;
  }
};

export interface HttpResponeType {
  errno: number | string;
  message: string;
  result: any;
  timestamp: number;
}

export interface HttpErrorResponeType {
  errno: number | string;
  message: string;
  result: any;
  timestamp: number;
}
