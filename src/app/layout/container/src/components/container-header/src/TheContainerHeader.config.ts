import { TheContainerHeaderApi } from './TheContainerHeader.api';
import { Component } from 'vue-property-decorator';
import UIComponentFactory from '@/core/factory/component-ui.factory';
import { COMPONENT_METHOD, COMPONENT_DATA } from '@/core/dtos/factories.dto';
import { CompFormDialogAdapter } from '@/core/components/customize/form-dialog/src/CompFormDialog.adapter';
import { FormItem } from '@/core/decorators/form-item.decorator';

@Component({})
export class TheContainerHeaderConfig extends UIComponentFactory {
  COMPONENT_METHOD = COMPONENT_METHOD;
  COMPONENT_DATA = COMPONENT_DATA;
  // fromPath = '';
  collapse = false;

  @FormItem('passwordDialog.form') password: any;
  @FormItem('passwordDialog.form') IdPass: any;
  @FormItem('passwordDialog.form') checkPassword: any;

  get menu(): any[] {
    const user = this.$store.state.user || {};
    return user.menu || [];
  }
  get configMenu() {
    const config = this.menu.find((i: any) => i.title === '配置中心');
    if (!config || !config.children) return [];
    return config.children
      .filter((i: any) => {
        if (!i.path && i.children) {
          const childrens = i.children.filter((i: any) => i.path);
          i.path = childrens.length ? childrens[0].path : '';
          i.paths = childrens.map((i: any) => i.path);
        }
        return !!i.path;
      })
      .map((i: any) => {
        return {
          title: i.title,
          path: i.path,
          paths: i.paths || [i.path]
        };
      });
  }
  get showMenuTransfer() {
    // 业务中心或者配置中心只有一个时不显示
    // 业务中心的页面
    const business = this.menu.find((i: any) => i.title === '业务中心');
    // 配置中心的页面
    const config = this.menu.find((i: any) => i.title === '配置中心');
    return business && business.children && config && config.children;
  }
  get user() {
    return this.$store.state.user || {};
  }

  showPassword = false;
  togglePassword() {
    this.showPassword = !this.showPassword;
    this.password.inputConfig.type = this.showPassword ? 'text' : 'password';
  }

  showOldPassword = false;
  toggleOldPassword() {
    this.showOldPassword = !this.showOldPassword;
    this.IdPass.inputConfig.type = this.showOldPassword ? 'text' : 'password';
  }

  showCheckPassword = false;
  toggleCheckPassword() {
    this.showCheckPassword = !this.showCheckPassword;
    this.checkPassword.inputConfig.type = this.showCheckPassword
      ? 'text'
      : 'password';
  }

  systemHandle() {
    this.$router.push('/system-info');
  }
  infoDialog: CompFormDialogAdapter = {
    name: 'info',
    api: TheContainerHeaderApi.editUser,
    handleApiParam(params) {
      Reflect.deleteProperty(params, 'password');
      return params;
    },
    on: {
      success: () => {
        this.$store.dispatch('getUser');
      }
    },
    form: {
      itemWidth: '100%',
      labelWidth: '60px',
      formItems: [
        {
          label: '用户名',
          modelClassName: 'password-item',
          modelName: 'IdName',
          inputConfig: {
            disabled: true,
            placeholder: '请输入用户名'
          }
        },
        {
          label: '部门',
          modelClassName: 'password-item',
          rule: '',
          modelName: 'IdBmName',
          inputConfig: {
            disabled: true
          }
        },
        {
          label: '岗位',
          modelClassName: 'password-item',
          modelName: 'IdGroupName',
          inputConfig: {
            disabled: true,
            placeholder: '请输入岗位'
          }
        },
        {
          label: '密码',
          modelClassName: 'password-item',
          modelName: 'IdPass',
          slots: {
            append: 'updatePassword'
          },
          inputConfig: {
            type: 'password',
            placeholder: '请输入密码',
            disabled: true
          }
        }
      ]
    },
    formModel: {
      IdName: this.user.IdName,
      IdBmName: this.user.IdBmName,
      IdGroupName: this.user.IdGroupName,
      IdPass: this.user.IdPass,
      Id: this.user.Id
    },
    dialog: {
      title: '用户信息',
      width: '412px',
      hiddenDefaultFooter: true,
      on: {
        open: () => {}
      }
    }
  };

  passwordDialog: CompFormDialogAdapter = {
    name: 'password',
    api: TheContainerHeaderApi.resetPwd,
    handleApiParam: (params) => {
      Reflect.deleteProperty(params, 'checkPassword');
      params.Id = this.user.Id;
      return params;
    },
    form: {
      itemWidth: '100%',
      labelWidth: '90px',
      formItems: [
        {
          label: '当前密码',
          rule: 'required|min:6|max:32',
          modelName: 'IdPass',
          modelClassName: 'password-input',
          slots: {
            append: 'oldPasswordToggle'
          },
          inputConfig: {
            type: 'password',
            placeholder: '请输入当前密码'
          }
        },
        {
          label: '新密码',
          rule: 'required|min:6|max:32',
          modelName: 'IdPasstwo',
          modelClassName: 'password-input',
          slots: {
            append: 'passwordToggle'
          },
          inputConfig: {
            type: 'password',
            placeholder: '请输入新密码'
          }
        },
        {
          label: '确认密码',
          rule: 'required|check_password:新密码|min:6|max:32',
          modelName: 'checkPassword',
          modelClassName: 'password-input',
          slots: {
            append: 'checkPasswordToggle'
          },
          inputConfig: {
            type: 'password',
            placeholder: '请输入确认密码'
          }
        }
      ]
    },
    formModel: {
      IdPasstwo: '',
      checkPassword: '',
      IdPass: ''
    },
    dialog: {
      title: '修改密码',
      width: '362px',
      appendToBody: true
    }
  };
}
