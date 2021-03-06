import { Component } from 'vue-property-decorator';
import CoreFactory from './core.factory';

@Component({})
export default class UIComponentFactory extends CoreFactory {
  /**
   * config 箭头函数中获取到vue实例的方法
   */
  getThis() {
    return this;
  }
  fromRoute() {
    return window.history.length > 1 && this.$route.name != 'Home';
  }
}
