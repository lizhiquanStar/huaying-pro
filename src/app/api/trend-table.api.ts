import { Send, HTTP_METHODS } from '@/core/http';

class Api {
  // 列表title
  listTitle(params?: any) {
    return Send({
      mock: [
        {
          byOrg: '',
          code: 'language',
          componentFieldId: null,
          componentId: '5',
          createBy: 'admin',
          createTime: '2019-12-11 13:43:03',
          delFlag: 0,
          description: null,
          deviceId: '217062936026288128',
          dictCode: 'language',
          expression: null,
          id: '217062936030482432',
          isDefault: 0,
          isRequired: 1,
          isSelect: 1,
          isSole: 0,
          isView: 1,
          length: 100,
          name: '语言',
          orderBy: 50,
          rangeMax: null,
          rangeMin: null,
          units: '',
          upLimit: null,
          updateBy: null,
          updateTime: '2020-03-11 16:02:39'
        },
        {
          byOrg: '',
          code: 'shipin',
          componentFieldId: null,
          componentId: '17',
          createBy: null,
          createTime: null,
          delFlag: 0,
          description: null,
          deviceId: '217062936026288128',
          dictCode: '',
          expression: null,
          id: '1255409516418818049',
          isDefault: 0,
          isRequired: 0,
          isSelect: 0,
          isSole: 0,
          isView: 1,
          length: 100,
          name: '视频',
          orderBy: 60,
          rangeMax: null,
          rangeMin: null,
          units: '',
          upLimit: null,
          updateBy: null,
          updateTime: null
        },
        {
          byOrg: '',
          code: 'pic',
          componentFieldId: null,
          componentId: '14',
          createBy: null,
          createTime: null,
          delFlag: 0,
          description: null,
          deviceId: '217062936026288128',
          dictCode: '',
          expression: null,
          id: '1255724059082743809',
          isDefault: 0,
          isRequired: 1,
          isSelect: 0,
          isSole: 0,
          isView: 1,
          length: 1000,
          name: 'img',
          orderBy: 90,
          rangeMax: null,
          rangeMin: null,
          units: '',
          upLimit: 5,
          updateBy: null,
          updateTime: null
        }
      ],
      url: '/obj/attribute',
      params: params,
      method: HTTP_METHODS.GET,
      errorText: '获取列表数据失败'
    });
  }

  // 查询搜索条件字段
  getSearch(params?: any) {
    return Send({
      mock: [
        {
          byOrg: '',
          code: 'name',
          componentFieldId: null,
          componentId: '7',
          createBy: 'admin',
          createTime: '2019-12-11 13:43:03',
          delFlag: 0,
          description: null,
          deviceId: '217062936026288128',
          dictCode: null,
          expression: null,
          id: '217062936026288129',
          isDefault: 0,
          isRequired: 1,
          isSelect: 1,
          isSole: 1,
          isView: 1,
          length: 64,
          name: '名称',
          orderBy: 10,
          rangeMax: null,
          rangeMin: null,
          units: null,
          upLimit: null,
          updateBy: 'admin',
          updateTime: '2020-04-01 15:17:09'
        }
      ],
      url: '/ins/device-mng/search-field',
      params: params,
      method: HTTP_METHODS.GET,
      errorText: '获取查询搜索条件字段数据失败'
    });
  }

  // 获取字典数据
  getSearchCode(params?: any) {
    return Send({
      mock: [
        {
          byOrg: null,
          content: '0',
          createBy: null,
          createTime: null,
          description: null,
          dictId: null,
          enabled: 1,
          id: '1201404479392980994',
          label: '中文',
          orderBy: '1',
          updateBy: null,
          updateTime: null
        },
        {
          byOrg: null,
          content: '1',
          createBy: null,
          createTime: null,
          description: null,
          dictId: null,
          enabled: 1,
          id: '1201404541594509314',
          label: '英文',
          orderBy: '2',
          updateBy: null,
          updateTime: null
        }
      ],
      url: '/sys/dict-item',
      params: params,
      method: HTTP_METHODS.GET,
      errorText: '获取查询搜索条件字段数据失败'
    });
  }

  // 动态列表数据
  listInfo(params?: any) {
    return Send({
      url: '/ins/device-mng/detail',
      params: params,
      method: HTTP_METHODS.GET,
      errorText: '获取列表数据失败'
    });
  }

  // 新增编辑动态表单
  addeditForm(params?: any) {
    return Send({
      mock: [
        {
          byOrg: '',
          createBy: 'admin',
          createTime: '2020-04-30 15:09:55',
          description: null,
          deviceId: '217062936026288128',
          id: '1204637697177141249',
          updateBy: 'admin',
          updateTime: '2020-04-30 15:09:55',
          attributes: [
            {
              attributeRels: [],
              byOrg: '',
              code: 'name',
              componentFieldId: null,
              componentId: '7',
              createBy: 'admin',
              createTime: '2019-12-11 13:43:03',
              delFlag: 0,
              description: null,
              deviceId: '217062936026288128',
              dictCode: null,
              expression: null,
              id: '217062936026288129',
              isDefault: 0,
              isRequired: 1,
              isSelect: 1,
              isSole: 1,
              isView: 1,
              length: 64,
              name: '名称',
              orderBy: 10,
              rangeMax: null,
              rangeMin: null,
              units: null,
              upLimit: null,
              updateBy: 'admin',
              updateTime: '2020-04-01 15:17:09'
            },
            {
              attributeRels: [],
              byOrg: '',
              code: 'img',
              componentFieldId: null,
              componentId: '14',
              createBy: null,
              createTime: null,
              delFlag: 0,
              description: null,
              deviceId: '217062936026288128',
              dictCode: '',
              expression: null,
              id: '1255467926485065729',
              isDefault: 0,
              isRequired: 0,
              isSelect: 0,
              isSole: 0,
              isView: 1,
              length: 1000,
              name: '图片',
              orderBy: 70,
              rangeMax: null,
              rangeMin: null,
              units: '',
              upLimit: 2,
              updateBy: null,
              updateTime: null
            },
            {
              attributeRels: [],
              byOrg: '',
              code: 'file',
              componentFieldId: null,
              componentId: '15',
              createBy: 'admin',
              createTime: '2020-04-30 15:09:33',
              delFlag: 0,
              description: null,
              deviceId: '217062936026288128',
              dictCode: '',
              expression: null,
              id: '1255756156832911361',
              isDefault: 0,
              isRequired: 1,
              isSelect: 0,
              isSole: 0,
              isView: 1,
              length: 1000,
              name: '文件',
              orderBy: 100,
              rangeMax: null,
              rangeMin: null,
              units: '',
              upLimit: 5,
              updateBy: 'admin',
              updateTime: '2020-04-30 15:09:33'
            },
            {
              attributeRels: [],
              byOrg: '',
              code: 'shipin',
              componentFieldId: null,
              componentId: '17',
              createBy: null,
              createTime: null,
              delFlag: 0,
              description: null,
              deviceId: '217062936026288128',
              dictCode: '',
              expression: null,
              id: '1255409516418818049',
              isDefault: 0,
              isRequired: 0,
              isSelect: 0,
              isSole: 0,
              isView: 1,
              length: 100,
              name: '视频',
              orderBy: 60,
              rangeMax: null,
              rangeMin: null,
              units: '',
              upLimit: null,
              updateBy: null,
              updateTime: null
            }
          ]
        }
      ],
      url: '/obj/device-from',
      params: params,
      method: HTTP_METHODS.GET,
      errorText: '获取列表数据失败'
    });
  }
  // 左侧树
  treeList() {
    return Send({
      url: '/sys/depart/tree',
      method: HTTP_METHODS.GET,
      errorText: '获取数据失败'
    });
  }
  // 获取文件名称
  fileInfos(params?: any) {
    return Send({
      mock: [
        {
          byOrg: '',
          createBy: null,
          createTime: '2020-04-30 15:12:14',
          delFlag: 0,
          description: '',
          id: '1255756830228418561',
          name: '智能门禁2020-1-4.docx',
          objectId: '',
          size: 22455,
          suffix: 'docx',
          updateBy: null,
          updateTime: '2020-04-30 15:12:14',
          url: 'doc/1255756830228418561.docx'
        }
      ],
      url: '/file/infos',
      params: params,
      method: HTTP_METHODS.GET,
      errorText: '获取数据失败'
    });
  }
}

export const TrendTableApi = new Api();
