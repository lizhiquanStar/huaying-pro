import { Send, HTTP_METHODS } from '@/core/http';

/**
 * online 线上机会
 * underline 线下机会
 */
const apiList = {
  'online-market': '/admin/hotbrand/list', // 市场大盘
  'online-other': '/admin/hotbrand/xianshang_list', // 市场大盘之外其他
  'underline-repast': '/admin/hotbrand/canyin_list', // 餐饮
  'underline-retail': '/admin/hotbrand/linshou_list', // 零售
  'underline-other': '/admin/hotbrand/qitayetai_list' // 其他业态
};
class Api {
  // 图表接口
  chartData(params?: any) {
    return Send({
      url: '/admin/hotbrand/chart_data_list_by_level',
      params,
      method: HTTP_METHODS.GET,
      errorText: '获取数据失败'
    });
  }
  // 折线图图表接口
  lineListData(params?: any) {
    return Send({
      url: '/admin/hotbrand/chart_child_data_list_by_level',
      params,
      method: HTTP_METHODS.GET,
      errorText: '获取数据失败'
    });
  }
  // 列表接口
  list(apiType: string, params?: any) {
    return Send({
      url: apiList[apiType],
      params,
      method: HTTP_METHODS.GET,
      errorText: '获取数据失败'
    });
  }

  // 月份
  month(params?: any) {
    return Send({
      url: '/admin/hotbrand/monthlist',
      params,
      method: HTTP_METHODS.GET,
      errorText: '获取数据失败'
    });
  }
}

export const TheAmoyDataApi = new Api();
