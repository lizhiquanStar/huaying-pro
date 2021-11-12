import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// 引入外部资源样式和全局样式
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import '@/core/utils/vue/vee-validate';
import XEUtils from 'xe-utils';
import { VXETable, Column, Table, Header, Tooltip } from 'vxe-table';
import zhCN from 'vxe-table/lib/locale/lang/zh-CN';
import {
  CompGrid,
  CompForm,
  CompFormGroup,
  CompSearch,
  CompDialog,
  CompTabs,
  CompAddEditDialog,
  CompFormDialog,
  CompTree,
  CompDataBus
} from '@/core/components/customize';
import { FlBreadcrumb, FlButtomGroup } from '@/core/components/functional';
import './core/styles/index.scss';
import {
  BaseButton,
  BaseButtonGroup,
  BasePagination,
  BaseDialog,
  BaseInput,
  BaseCheckbox,
  BaseTabs
} from './core/components/base';
import * as _ from 'lodash';
import { hasPermission } from './core/acl/src/acl.util';

Object.assign(window, _);

const globalComponents = [
  BaseButton,
  BaseButtonGroup,
  BasePagination,
  BaseDialog,
  BaseInput,
  BaseCheckbox,
  BaseTabs,
  CompGrid,
  CompForm,
  CompFormGroup,
  CompSearch,
  CompDialog,
  CompTabs,
  CompAddEditDialog,
  CompFormDialog,
  CompTree,
  CompDataBus,
  FlBreadcrumb,
  FlButtomGroup
];
globalComponents.forEach((component: any) => {
  Vue.component(component.options.name, component);
});
Vue.use(ElementUI);
Vue.use(Table)
  .use(Column)
  .use(Header)
  .use(Tooltip);
VXETable.setup({
  i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args)
});
Vue.config.productionTip = false;
Vue.prototype.$hasPermission = hasPermission;
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
