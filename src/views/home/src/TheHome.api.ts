import { Send, HTTP_METHODS } from '@/core/http';

class Api {
  // 获取淘宝数据
  getTaobaoData(params?: any) {
    return Send({
      mock: [
        {
          title: '线上机会发掘',
          type: 'online',
          value: [
            {
              level: 1,
              icon: 'icon-jibie1',
              name: '市场大盘',
              type: 'online-market'
            },
            {
              level: 2,
              icon: 'icon-jibie3',
              name: '个护',
              type: 'online-personalCare'
            },
            {
              level: 3,
              icon: 'icon-jibie2',
              name: '食品饮料',
              type: 'online-foodDrink'
            },
            {
              level: 4,
              icon: 'icon-jibie4',
              name: '美妆',
              type: 'online-makeups'
            },
            {
              level: 5,
              icon: 'icon-jibie',
              name: '母婴玩具',
              type: 'online-babyToys'
            },
            {
              level: 6,
              icon: 'icon-pinpai',
              name: '宠物',
              type: 'online-pet'
            },
            {
              level: 7,
              icon: 'icon-pinpai',
              name: '家居安装',
              type: 'online-home'
            },
            {
              level: 8,
              icon: 'icon-pinpai',
              name: '家用电器',
              type: 'online-houseDevice'
            },
            {
              level: 9,
              icon: 'icon-pinpai',
              name: '其他',
              type: 'online-other'
            }
          ]
        },
        {
          title: '线下机会发掘',
          type: 'underline',
          value: [
            {
              type: 'underline-repast',
              icon: 'icon-luru',
              name: '连锁餐饮'
            },
            {
              type: 'underline-retail',
              icon: 'icon-canyin',
              name: '零售渠道'
            },
            {
              type: 'underline-other',
              icon: 'icon-lingshou',
              name: '其他业态'
            }
          ]
        },
        {
          title: '数据验证',
          type: 'live-e-commerce',
          value: [
            {
              type: 'tikTok',
              icon: 'icon-lingshou',
              name: '查品牌',
              url:'https://www.wjx.cn/vj/eIIJbdn.aspx',
            }
          ]
        }
      ],
      url: '/Bm/getlist',
      params,
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    });
  }
}

export const TheHomeApi = new Api();
