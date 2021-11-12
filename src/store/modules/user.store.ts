import { GlobalApi } from '@/app/api/global.api';
import { eventBus } from '@/core/utils/vue/event-bus';
import router from '@/router';
import { API_CONFIG } from '@/config/http.config';

const localStorageEnable =
  window.Storage &&
  window.localStorage &&
  window.localStorage instanceof Storage;
const localUser = localStorageEnable && localStorage.getItem('user');
const localOnce = localStorageEnable && localStorage.getItem('onceLogin');
const localPermissions =
  localStorageEnable && localStorage.getItem('permission');
const user = localStorageEnable && localUser ? JSON.parse(localUser) : {};
const img: any = null;
const onlineList: any = []; //监听在线用户
const onceLogin =
  localStorageEnable && localOnce ? JSON.parse(localOnce) : false; //是否第一次登陆
const permissions =
  localStorageEnable && localPermissions ? JSON.parse(localPermissions) : [];

const User = {
  state: {
    onlineList, //socket在线用户
    onceLogin, //是否第一次登录
    img,
    user, //用户信息
    isTokenExpiredHandling: false, // 是否正在处理401
    permissions // 按钮权限
  },
  mutations: {
    setOnlineList: (state: any, onlineList: any) => {
      state.onlineList = onlineList;
    },
    setOnceLogin: (state: any, once: any) => {
      localStorageEnable &&
        localStorage.setItem('onceLogin', JSON.stringify(once));
      state.onceLogin = once;
    },
    setUser: (state: any, user: any) => {
      localStorageEnable && localStorage.setItem('user', JSON.stringify(user));
      state.user = user;
    },
    setUserInfo: (state: any, userInfo: any) => {
      const user = Object.assign(state.user, userInfo);
      localStorageEnable && localStorage.setItem('user', JSON.stringify(user));
      state.user = user;
    },
    setMenu: (state: any, menu: any) => {
      state.user = {
        ...state.user,
        home: getHomePath(menu),
        menu
      };
      state.permissions = getPermissions(menu);
      if (localStorageEnable) {
        localStorage.setItem('user', JSON.stringify(state.user));
        localStorage.setItem('permission', JSON.stringify(state.permissions));
      }
    },
    clearUser: (state: any) => {
      if (localStorageEnable) {
        localStorage.removeItem('user');
        localStorage.removeItem('onceLogin');
        localStorage.removeItem('permissions');
      }
      state.user = {};
      state.onceLogin = false;
      state.permissions = [];
    },
    tokenExpired: (state: any) => {
      if (state.isTokenExpiredHandling) return;
      if (!state.isTokenExpiredHandling) return;
      state.isTokenExpiredHandling = true;
      eventBus.$alert('你的浏览器登录已过期，请重新登录。', '登录过期', {
        showClose: false,
        customClass: 'error401',
        confirmButtonText: '登录',
        callback: () => {
          if (localStorageEnable) {
            localStorage.removeItem('user');
            localStorage.removeItem('onceLogin');
            localStorage.removeItem('permissions');
          }
          state.user = {};
          state.permissions = [];
          state.onceLogin = false;
          API_CONFIG.linkUrl
            ? (window.location.href = API_CONFIG.linkUrl)
            : router.push('/login');
          state.isTokenExpiredHandling = false;
        }
      });
    }
  },
  actions: {
    async getMenu(context: any) {
      const menu: any = await GlobalApi.getMenu();
      if (!menu) return;
      context.commit('setMenu', menu);
    },
    //第三方登录的时候可以使用从而拿去用户信息
    async getUser(context: any) {
      const res: any = await GlobalApi.getUser();
      if (!res || !res.data) return;
      context.commit('setUser', res.data);
    },
    //登录过程重新获取token
    async getRefresh(context: any) {
      const res: any = await GlobalApi.loginRefresh();
      if (!res || !res.data) return;
      context.commit('setUserInfo', res.data.token);
    }
  }
};

function getHomePath(menu: any[] = []) {
  const getFirstPathItem = (list: any[]) => {
    let path = '';
    list.forEach((i) => {
      if (path) return;
      if (i.path && i.path !== '/') path = i.path;
      if (i.children && i.children.length && !path)
        path = getFirstPathItem(i.children);
    });
    return path;
  };
  let path = '';
  path = getFirstPathItem(menu);
  return path;
}

function getPermissions(menu: any[] = []) {
  const permissions: any[] = [];
  const forEachMenu = (list: any[]) => {
    list.forEach((i) => {
      if (i.menuType === 2 && i.perms) permissions.push(i.perms);
      if (i.children && i.children.length) forEachMenu(i.children);
    });
  };
  forEachMenu(menu);
  return permissions;
}

export default User;
