import { Component } from 'vue-property-decorator';
import UIComponentFactory from '@/core/factory/component-ui.factory';
import { COMPONENT_METHOD, COMPONENT_DATA } from '@/core/dtos/factories.dto';

@Component({})
export class TheContainerSidebarConfig extends UIComponentFactory {
  COMPONENT_METHOD = COMPONENT_METHOD;
  COMPONENT_DATA = COMPONENT_DATA;
  SIDEBAR_CONFIG1: any[] = [
    {
      title: '首页',
      path: '/home',
      id: 'home',
      perm: '',
      icon: 'iconhome iconfont'
    },
    {
      title: '系统中心',
      perm: '',
      id: '2',
      icon: 'iconfont iconsystem_center',
      children: [
        {
          title: '菜单管理',
          path: '/permission-management',
          perm: '',
          id: 'permission',
          icon: ''
        },
        {
          title: '角色管理',
          path: '/role-management',
          id: 'role',
          perm: '',
          icon: ''
        }
      ]
    }
  ];
}
