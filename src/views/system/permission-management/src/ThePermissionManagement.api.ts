import { Send, HTTP_METHODS } from '@/core/http';

class Api {
  // 列表
  list(params?: any) {
    return Send({
      url: '/sys/permission/list',
      params: params,
      apiUrlNo: 1,
      method: HTTP_METHODS.GET,
      errorText: '获取列表数据失败'
    });
  }

  // 获取全部
  all(params?: any) {
    return Send({
      mock: [
        {
          component: null,
          componentName: null,
          createBy: 'admin',
          createTime: '2020-03-10 16:58:21',
          description: '',
          icon: 'el-icon-s-home',
          id: '1237301756313546753',
          isLeaf: null,
          menuType: 1,
          orderBy: 1,
          parentId: '1207497841393016833',
          path: '/index',
          perms: 'index',
          permsType: null,
          ruleFlag: 0,
          title: '首页',
          updateBy: 'admin',
          updateTime: '2020-03-10 16:58:21',
          url: ''
        },
        {
          component: null,
          componentName: null,
          createBy: 'admin',
          createTime: '2019-12-19 11:08:14',
          description: '',
          icon: '',
          id: '1207497841393016833',
          isLeaf: null,
          menuType: 0,
          orderBy: 10,
          parentId: null,
          path: '',
          perms: '',
          permsType: null,
          ruleFlag: 0,
          title: '业务中心',
          updateBy: 'admin',
          updateTime: '2020-01-02 13:30:44',
          url: ''
        },
        {
          component: '',
          componentName: '',
          createBy: 'admin',
          createTime: '2019-11-28 09:28:10',
          description: '',
          icon: 'iconfont iconfunctional',
          id: '1199862512821542913',
          isLeaf: null,
          menuType: 1,
          orderBy: 1001,
          parentId: '1207497841393016833',
          path: '/',
          perms: '1',
          permsType: 1,
          ruleFlag: 0,
          title: '数据中心',
          updateBy: 'admin',
          updateTime: '2019-12-19 20:18:08',
          url: ''
        },
        {
          component: '',
          componentName: '',
          createBy: 'admin',
          createTime: '2019-11-28 09:29:29',
          description: '',
          icon: 'iconfont iconmodel_data1',
          id: '1199862842816798722',
          isLeaf: null,
          menuType: 1,
          orderBy: 100101,
          parentId: '1199862512821542913',
          path: '/data-management',
          perms: '3-1',
          permsType: 1,
          ruleFlag: 0,
          title: '数据管理',
          updateBy: 'admin',
          updateTime: '2019-12-23 13:19:52',
          url: ''
        },
        {
          component: null,
          componentName: null,
          createBy: 'admin',
          createTime: '2019-12-06 16:49:54',
          description: '',
          icon: '',
          id: '1202872782196060161',
          isLeaf: null,
          menuType: 2,
          orderBy: 999999,
          parentId: '1199862842816798722',
          path: '',
          perms: 'user:add',
          permsType: null,
          ruleFlag: 0,
          title: '新增',
          updateBy: 'admin',
          updateTime: '2019-12-06 16:49:54',
          url: null
        }
      ],
      url: '/sys/permission',
      apiUrlNo: 1,
      params: params,
      method: HTTP_METHODS.GET,
      errorText: '获取列表数据失败'
    });
  }

  // 获取单个 - params - { id: ** }
  getOne(params?: any) {
    return Send({
      url: '/sys/permission',
      apiUrlNo: 1,
      params: params,
      method: HTTP_METHODS.GET,
      errorText: '获取列表数据失败'
    });
  }

  // 新增
  add(params?: any) {
    return Send({
      url: '/sys/permission',
      apiUrlNo: 1,
      params: params,
      method: HTTP_METHODS.POST,
      errorText: '新增失败'
    });
  }

  // 编辑
  edit(params?: any) {
    return Send({
      url: '/sys/permission',
      apiUrlNo: 1,
      params: params,
      method: HTTP_METHODS.PUT,
      errorText: '编辑失败'
    });
  }

  // 删除
  delete(params?: any) {
    return Send({
      url: '/sys/permission',
      apiUrlNo: 1,
      params: params,
      method: HTTP_METHODS.DELETE,
      errorText: '删除失败'
    });
  }
}

export const ThePermissionManagementApi = new Api();
