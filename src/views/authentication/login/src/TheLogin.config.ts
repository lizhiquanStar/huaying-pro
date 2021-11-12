import { TheLoginApi } from './TheLogin.api';
import { LoadingButtonFunc } from './../../../../core/funcs/loading-button.func';
import { CompFormAdapter } from '@/core/components/customize/form/src/CompForm.adapter';
import { CompTabsAdapter } from './../../../../core/components/customize/tabs/src/CompTabs.adapter';
import { Component } from 'vue-property-decorator';
import ViewFactory from '@/core/factory/view.factory';
import { COMPONENT_METHOD, COMPONENT_DATA } from '@/core/dtos/factories.dto.ts';
import { rememberCookie } from '@/core/utils/cookie/cookie.ts';
import { FormItem } from '@/core/decorators/form-item.decorator';

@Component({})
export class TheLoginConfig extends ViewFactory {
  COMPONENT_METHOD = COMPONENT_METHOD;
  COMPONENT_DATA = COMPONENT_DATA;
  @FormItem('passwordFormConfig.form') pwd: any;

  text = '登录中....';
  checked = false;

  get menu() {
    return this.$store.state.user.menu || [];
  }
  get home() {
    return this.$store.state.user.home || '';
  }
  // 检测是否是谷歌浏览器
  get isChrome() {
    const markList = [
      'ubrowser', // UC
      'taobrowser', // 淘宝
      'lbbrowser', // 猎豹
      'qqbrowser', // QQ
      'maxthon', // 遨游
      'bidubrowser' // 百度
    ];
    const mimeTypeList = [
      'application/vnd.chromium.remoting-viewer', // 360
      'application/sogou-native-widget-plugin' // 搜狗
    ];
    const ua = navigator.userAgent.toLowerCase();
    const mimeTypes = Array.from(navigator.mimeTypes).map((i) =>
      i.type.toLowerCase()
    );
    return (
      ua.includes('chrome') &&
      !markList.some((i) => ua.includes(i)) &&
      !mimeTypeList.some((i) => mimeTypes.includes(i))
    );
  }
  // 清除cookie
  remember() {
    if (!this.checked) {
      rememberCookie.setCookie('', '', -1);
    }
  }
  mounted() {
    localStorage.clear();
    this.$store.commit('clearUser');
    const cookie: any = rememberCookie.getCookie();
    if (cookie && cookie.userName) {
      this.pwd.inputConfig.type = 'password';
      this.passwordFormConfig.formModel = {
        ...this.passwordFormConfig.formModel,
        ...cookie
      };
      this.checked = true;
    } else {
      this.passwordFormConfig.formModel = {
        ...this.passwordFormConfig.formModel,
        ...{ userName: '', pwd: '' }
      };
    }
    var sUserAgent = navigator.userAgent.toLowerCase();
    if (
      /ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(
        sUserAgent
      )
    ) {
      this.$confirm(
        '尊敬的用户您好！移动端OA正在马不停蹄的开发中，敬请期待',
        '温馨提示',
        {
          confirmButtonText: '好的',
          showCancelButton: false,
          type: 'success'
        }
      );
    } else {
      if (!this.isChrome) {
        const hadShowChrome = sessionStorage.getItem('hadShowChrome');
        // 当前tab页展示过了就不展示了
        if (!hadShowChrome) {
          // 建议使用谷歌浏览器
          this.$notify({
            title: '提示',
            customClass: 'the-login__notify-chrome',
            duration: 0,
            dangerouslyUseHTMLString: true,
            message:
              '<p>尊敬的用户</p><p>为了确保您的用户体检和功能完整，建议您使用谷歌浏览器</p><a class="el-button" href="https://www.google.cn/chrome/" target="_blank">下载谷歌浏览器</a>',
            position: 'bottom-left'
          });
          sessionStorage.setItem('hadShowChrome', 'true');
        }
      }
    }
  }

  passwordLoadingFunc = new LoadingButtonFunc('登录', this.text);
  mobileLoadingFunc = new LoadingButtonFunc('登录', this.text);

  tabsConfig: CompTabsAdapter = {
    tabs: {
      model: 'password',
      activeTabScale: 0.15,
      tabPanes: [
        {
          slot: 'password',
          name: 'password',
          label: '账号登录'
        },
        {
          slot: 'phone',
          name: 'phone',
          label: '手机登录'
        }
      ],
      stretch: true
    }
  };

  passwordFormConfig: CompFormAdapter = {
    form: {
      itemWidth: '100%',
      labelWidth: '60px',
      hideRequiredAsterisk: true,
      formItems: [
        {
          label: '用户名',
          modelName: 'userName',
          validateName: '用户名',
          rule: 'required',
          inputConfig: {
            placeholder: '请输入用户名'
          }
        },
        {
          label: '',
          modelName: '',
          rule: 'required',
          visible: false,
          inputConfig: {
            type: 'password'
          }
        },
        {
          label: '密码',
          modelName: 'pwd',
          validateName: '登录密码',
          rule: 'required',
          inputConfig: {
            placeholder: '请输入登录密码',
            type: 'text',
            autocomplete: 'off',
            on: {
              focus: () => {
                const vm = this.getThis();
                vm.pwd.inputConfig.type = 'password';
              }
            }
          }
        },
        {
          label: '',
          modelName: '',
          rule: '',
          visible: false,
          inputConfig: {
            type: 'password'
          }
        }
      ]
    },
    formModel: {
      userName: '',
      pwd: ''
    },
    styles: ['underline'],
    on: {
      validated: async (isValid) => {
        if (!isValid) return;
        const vm = this.getThis();
        this.passwordLoadingFunc.start();
        const res = await TheLoginApi.login({
          ...this.passwordFormConfig.formModel
        });
        if (vm.checked) {
          rememberCookie.setCookie(
            this.passwordFormConfig.formModel.userName,
            this.passwordFormConfig.formModel.pwd,
            90
          );
        }
        this.passwordLoadingFunc.end();
        if (!res.data || res.data.code !== 200) {
          return this.$message.error(res ? res.data.message : '登录失败');
        }
        vm.$store.commit('setUser', {
          ...res.data.data,
          ...{ token: res.data.token },
          ...{ userName: this.passwordFormConfig.formModel.userName }
        });
        // await this.$store.dispatch('getMenu'); //当需要从后台接口拿取菜单时
        vm.$store.commit('setMenu', res.data.data.UserPower); //不需要从后台接口拿取菜单
        this.text = '初始化过程中...';
        this.passwordLoadingFunc.start();
        this.passwordLoadingFunc.end();
        this.$message.success('登录成功');
        vm.$router.push('/home');
      }
    }
  };

  phoneFormConfig: CompFormAdapter = {
    name: 'phone',
    form: {
      itemWidth: '100%',
      labelWidth: '80px',
      hideRequiredAsterisk: true,
      formItems: [
        {
          modelName: 'username',
          label: '手机号',
          rule: 'required|mobile',
          inputConfig: {
            placeholder: '请输入手机号'
          }
        },
        {
          modelName: 'sms',
          label: '验证码',
          rule: 'required',
          inputConfig: {
            placeholder: '请输入验证码',
            slots: {
              suffix: 'captcha'
            }
          }
        }
      ]
    },
    formModel: {
      username: '',
      sms: ''
    },
    styles: ['underline'],
    on: {
      validated: async (isValid) => {
        if (!isValid) return;
        const vm = this.getThis();
        this.mobileLoadingFunc.start();
        const res = await TheLoginApi.login({
          ...this.phoneFormConfig.formModel
        });
        this.mobileLoadingFunc.end();
        if (!res.data || res.data.code !== 200) {
          return this.$message.error(res ? res.data.message : '登录失败');
        }
        vm.$store.commit('setUser', {
          ...res.data.data,
          ...{ token: res.data.token },
          ...{ userName: this.phoneFormConfig.formModel.userName }
        });
        // await this.$store.dispatch('getMenu'); //当需要从后台接口拿取菜单时
        vm.$store.commit('setMenu', res.data.data.UserPower); //不需要从后台接口拿取菜单
        this.text = '初始化过程中...';
        this.mobileLoadingFunc.end();
        this.$message.success('登录成功');
        vm.$router.push('/home');
      }
    }
  };
}
