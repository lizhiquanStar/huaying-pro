<template>
  <div class="bs-sign-audit-chucha-form">
    <h2>出差申请表</h2>
    <table cellspacing="0" cellpadding="0">
      <tr>
        <td style="width: 15%">姓 名</td>
        <td style="width: 25%">{{ dataChildObj.Name }}</td>
        <td style="width: 15%">所属部门</td>
        <td style="width: 45%" colspan="2">{{ bmName }}</td>
      </tr>
      <tr>
        <td>出差时间</td>
        <td>{{ dataChildObj.Starttime }}</td>
        <td>预计结束时间</td>
        <td colspan="2">{{ dataChildObj.Endtime }}</td>
      </tr>
      <tr>
        <td>出差方式</td>
        <td>{{ dataChildObj.Gotype }}</td>
        <td>陪同人员姓名及人数</td>
        <td colspan="2">{{ dataChildObj.Fllowperson }}</td>
      </tr>
      <tr>
        <td rowspan="2">预计费用（含借款）</td>
        <td>往返车费</td>
        <td>住宿费用/天数</td>
        <td>预计餐费</td>
        <td>共计</td>
      </tr>
      <tr>
        <td>{{ dataChildObj.Carcost }}</td>
        <td>{{ dataChildObj.Sleepcost }}</td>
        <td>{{ dataChildObj.Eatcost }}</td>
        <td>{{ dataChildObj.Totalcost }}</td>
      </tr>
      <tr>
        <td>预计项目规模</td>
        <td colspan="4">{{ dataChildObj.Projectscale }}</td>
      </tr>
      <tr>
        <td>预计签约时间</td>
        <td colspan="4">{{ dataChildObj.Contracttime }}</td>
      </tr>
      <tr>
        <td>被访单位</td>
        <td colspan="4">{{ dataChildObj.Targetcompany }}</td>
      </tr>
      <tr>
        <td>被拜访人</td>
        <td>{{ dataChildObj.Targetperson }}</td>
        <td>联系方式</td>
        <td colspan="2">{{ dataChildObj.Targetpersontel }}</td>
      </tr>
      <tr>
        <td>出差事由</td>
        <td colspan="4">{{ dataChildObj.Remark }}</td>
      </tr>
      <tr>
        <td>预计达到目的</td>
        <td colspan="4">{{ dataChildObj.Plan }}</td>
      </tr>
      <tr>
        <td colspan="5">
          注：此表由出差人填写后交部门经理；一式一份，由财务留存。
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';
import { BsChuchaFormConfig } from './chucha-form.config';

@Component({})
export default class BsChuchaForm extends Mixins(BsChuchaFormConfig) {
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

@include b(bs-sign-audit-chucha-form) {
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
