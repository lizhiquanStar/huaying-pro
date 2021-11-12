import { Send, HTTP_METHODS } from '@/core/http';

class Api {
  // 列表接口
  list(params?: any) {
    return Send({
      mock: {
        total: 1,
        records: [
          {
            ChargeDep: null,
            CreateBy: '129',
            CreateOn: '2020-04-13 16:36:10',
            DataPowerIds: null,
            DataPowers: null,
            Id: '1675a88be90745b694f97f91a71a8453',
            IdKey: '车间经理角色',
            IdName: null,
            IdValue: null,
            OrderBy: 0,
            PowerIds: null,
            Powers: null,
            Status: 10,
            UpdateBy: '129',
            UpdateOn: '2020-04-15 14:32:25'
          }
        ]
      },
      url: '/Role/page',
      params: params,
      method: HTTP_METHODS.POST,
      errorText: '获取列表数据失败'
    });
  }
  // 新增
  add(params?: any) {
    return Send({
      url: '/Role/save',
      params: params,
      method: HTTP_METHODS.POST,
      errorText: '新增失败'
    });
  }

  // 编辑
  edit(params?: any) {
    return Send({
      url: '/Role/update',
      params: params,
      method: HTTP_METHODS.POST,
      errorText: '编辑失败'
    });
  }
  // 分管部门
  depart(params?: any) {
    return Send({
      url: '/Role/updatecharge',
      params: params,
      method: HTTP_METHODS.POST,
      errorText: '编辑失败'
    });
  }
  // 删除
  delete(params?: any) {
    return Send({
      url: '/Role/delete?key=' + params.id,
      params: params,
      method: HTTP_METHODS.POST,
      errorText: '删除失败'
    });
  }
  //部门
  getDepart() {
    return Send({
      url: '/Bm/getlist',
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    });
  }
}

export const TheRoleManagementApi = new Api();
