import { Send, HTTP_METHODS } from '@/core/http';

class Api {
  // 获取淘宝数据
  getTaobaoData(params?: any) {
    return Send({
      mock: {
        other: [
          {
            level: 1,
            icon: 'icon-jibie1',
            name: '淘系品牌',
            type: 'AmoyLine'
          },
          {
            level: 2,
            icon: 'icon-jibie3',
            name: '抖音品牌',
            type: 'Tiktok'
          },
          {
            level: 3,
            icon: 'icon-jibie2',
            name: '小红书品牌',
            type: 'SmallRedBook'
          },
          {
            level: 4,
            icon: 'icon-jibie4',
            name: '直播品牌',
            type: 'Lives'
          },
          {
            level: 5,
            icon: 'icon-jibie',
            name: '分众投放',
            type: 'AllPerson'
          }
        ],
        market: [
          {
            level: 1,
            icon: 'icon-jibie1',
            name: '一级类目'
          },
          {
            level: 2,
            icon: 'icon-jibie3',
            name: '二级类目'
          },
          {
            level: 3,
            icon: 'icon-jibie2',
            name: '三级类目'
          },
          {
            level: 4,
            icon: 'icon-jibie4',
            name: '四级类目'
          },
          {
            level: 5,
            icon: 'icon-jibie',
            name: '五级类目'
          },
          {
            level: 6,
            icon: 'icon-pinpai',
            name: '淘宝品牌'
          }
        ]
      },
      url: '/Bm/getlist',
      params,
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    });
  }
}

export const TheHomeApi = new Api();
