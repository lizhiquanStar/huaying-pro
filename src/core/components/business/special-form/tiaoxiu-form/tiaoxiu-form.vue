<template>
  <div class="bs-tiaoxiu-form">
    <h2>
      广安科贸有限公司员工调休申请表
    </h2>
    <table cellspacing="0" cellpadding="0">
      <tr>
        <td style="width: 15%">姓 名</td>
        <td style="width: 25%">{{ dataChildObj.Name }}</td>
        <!-- <td style="width: 15%">可调休天数</td>
        <td style="width: 10%">{{ dataChildObj.TotalDays }}</td> -->
        <td style="width: 15%">所属部门</td>
        <td style="width: 45%">{{ bmName }}</td>
      </tr>
      <tr>
        <td style="width: 15%">职务</td>
        <td style="width: 25%">{{ dataChildObj.Position }}</td>
        <td style="width: 15%">调休联系电话</td>
        <td style="width: 45%">{{ dataChildObj.Phone }}</td>
      </tr>
      <tr>
        <td style="width: 15%">调休时间</td>
        <td style="width: 25%">
          {{ dataChildObj.Starttime }}---{{ dataChildObj.Endtime }}
        </td>
        <td style="width: 15%">调休去向</td>
        <td style="width: 45%">{{ dataChildObj.Remark }}</td>
      </tr>
      <tr>
        <td colspan="4">
          注：调休单，半天起算；按考勤要求 : 9:00 — 12：00，13：00
          —17：30；开始时间选择 9：00 或 13：00；结束时间 12：00 或 17：30
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';
import { BsTiaoxiuFormConfig } from './tiaoxiu-form.config';

@Component({})
export default class BsTiaoxiuForm extends Mixins(BsTiaoxiuFormConfig) {
  dataChildObj: any = {};
  bmName = '';
  @Prop({
    type: Object,
    default() {
      return {};
    }
  })
  dataChild!: any;
  @Watch('dataChild', { immediate: true, deep: true })
  onIdChange(v: any) {
    this.dataChildObj = v;
  }

  // 部门列表
  @Prop({
    type: Object,
    default() {
      return {};
    }
  })
  dataList!: any;
  @Watch('dataList', { immediate: true, deep: true })
  onChange(v: any) {
    v.bmlist.map((item: any) => {
      if (item.Id === this.dataChildObj.Dept) {
        this.bmName = item.Name;
      }
    });
  }
}
</script>

<style lang="scss">
@import 'src/core/styles/export.scss';

@include b(bs-tiaoxiu-form) {
  h2 {
    color: #000;
    margin: 0 0 10px;
    text-align: center;
  }
  table {
    font-size: 12px;
    border: 1px solid #000;
    border-bottom: none;
    color: #000;
    width: 100%;
    text-align: left;
    padding: 0;
    margin: 0;
    tr {
      height: 14px;
      td {
        border-right: 1px solid #000;
        border-bottom: 1px solid #000;
        line-height: 20px;
        padding: 10px 0 10px 10px;
        &:last-child {
          border-right: none;
        }
      }
    }
  }
}
</style>
