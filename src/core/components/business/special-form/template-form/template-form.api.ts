import { Send, HTTP_METHODS } from '@/core/http';

class Api {
  // 列表接口
  list(params?: any) {
    return Send({
      url: '/admin/list',
      params,
      method: HTTP_METHODS.GET,
      errorText: '获取数据失败'
    });
  }

  // 审核过后数据
  getAuditInfo(params?: any) {
    return Send({
      url: `/Flow/GetAuditAndLookInfo?id=${params.id}`,
      params,
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    });
  }

  // 获取出差申请单
  getBusiness(params?: any) {
    return Send({
      url: `/FormBusiness/Get?id=${params.id}`,
      params,
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    });
  }

  // 获取加班申请单
  getOvertimeForm(params?: any) {
    return Send({
      url: `/FormOvertime/get?id=${params.id}`,
      params,
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    });
  }

  // 获取年假申请单
  getYearLeave(params?: any) {
    return Send({
      url: `/FormYearleave/get?id=${params.id}`,
      params,
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    });
  }

  // 获取病假申请单
  getSickLeave(params?: any) {
    return Send({
      url: `/FormSickleave/get?id=${params.id}`,
      params,
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    });
  }

  // 获取病假大于一天申请单
  getmSickLeaveMore(params?: any) {
    return Send({
      url: `/FormSickleavemore/get?id=${params.id}`,
      params,
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    });
  }

  // 获取事假申请单
  getLeaveForm(params?: any) {
    return Send({
      url: `/FormLeave/Get?id=${params.id}`,
      params,
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    });
  }

  // 获取事假大于一天申请单
  getLeaveMore(params?: any) {
    return Send({
      url: `/FormLeavemore/Get?id=${params.id}`,
      params,
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    });
  }

  // 获取零星事假
  getLeaveFew(params?: any) {
    return Send({
      url: `/FormLeaveFewFew/Get?id=${params.id}`,
      params,
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    });
  }

  // 获取调休单
  getBreakOff(params?: any) {
    return Send({
      url: `/FormOffLater/Get?id=${params.id}`,
      params,
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    });
  }

  // 获取调休大于一天
  getBreakOffMore(params?: any) {
    return Send({
      url: `/FormOffLaterMore/Get?id=${params.id}`,
      params,
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    });
  }

  // 获取通用表单实例
  getmExample(params?: any) {
    return Send({
      url: `/FormExample/Get?id=${params.id}`,
      params,
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    });
  }

  // 出单报告对应出差单
  GetMyBusinessList(params?: any) {
    return Send({
      url: `/FormBusiness/GetMyBusiness?userId=${params.userId}`,
      params,
      method: HTTP_METHODS.POST,
      errorText: '提交失败'
    });
  }

  // 出差单查单出差报告
  GetFormExampleData(params?: any) {
    return Send({
      url: `/Flow/GetFlowDetailByExampleId?id=${params.id}`,
      params,
      method: HTTP_METHODS.POST,
      errorText: '查询失败'
    });
  }

  // 审核通过
  access(params?: any) {
    return Send({
      url: '/Flow/Access',
      params,
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    });
  }

  // 审核拒绝
  refuse(params?: any) {
    return Send({
      url: '/Flow/Refuse',
      params,
      method: HTTP_METHODS.POST,
      errorText: '获取数据失败'
    });
  }

  // 查阅
  ComfirmLook(params?: any) {
    return Send({
      url: `/Flow/ComfirmLook?id=${params.Id}`,
      params,
      method: HTTP_METHODS.POST,
      errorText: '查阅失败'
    });
  }
}

export const BsTemplateFormApi = new Api();
