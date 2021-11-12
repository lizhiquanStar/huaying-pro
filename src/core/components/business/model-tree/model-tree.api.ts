import { Send, HTTP_METHODS } from '@/core/http';
import { HTTP_BODY_TYPES } from '@/core/http/http.dto';

class Api {
  // 左侧树
  treeList() {
    return Send({
      mock: [
        {
          CreateBy: null,
          CreateOn: '2009-11-16 16:32:01',
          FilePath:
            '/upload/2020-04-08/849b27b5-f442-4d77-b892-775f91b0f926.png',
          HasPower: true,
          Id: '8001',
          Name: '公司领导',
          OrderBy: 10,
          Src: null,
          Status: 10,
          UpdateBy: '129',
          UpdateOn: '2020-04-08 15:57:22',
          Users: null
        }
      ],
      url: '/Bm/getonlymylist',
      bodyType: HTTP_BODY_TYPES.RAW_JSON,
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    });
  }
  //删除
  delTree(delId: object) {
    return Send({
      url: '/obj/device-type/{id}',
      bodyType: HTTP_BODY_TYPES.RAW_JSON,
      params: delId,
      method: HTTP_METHODS.DELETE,
      errorText: '删除失败'
    });
  }
  // 新增
  add(params?: any) {
    return Send({
      url: '/Bm/save',
      params: params,
      method: HTTP_METHODS.POST,
      errorText: '新增失败'
    });
  }
  // 删除
  del(params?: any) {
    return Send({
      url: '/Bm/delete?key=' + params.id,
      params: params,
      method: HTTP_METHODS.POST,
      errorText: '删除失败'
    });
  }
}

export const BsModelTreeApi = new Api();
