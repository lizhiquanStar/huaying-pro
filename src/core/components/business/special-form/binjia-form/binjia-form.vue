<template>
  <div class="bs-sign-audit-binjia-form">
    <h2>广安科贸有限公司员工病假申请表</h2>
    <table cellspacing="0" cellpadding="0">
      <tr>
        <td style="width: 10%">姓 名</td>
        <td style="width: 25%">{{ dataChildObj.Name }}</td>
        <td style="width: 10%">性别</td>
        <td style="width: 10%">
          {{ dataChildObj.Gender === 0 ? '男' : '女' }}
        </td>
        <td style="width: 15%">所属部门</td>
        <td style="width: 45%">{{ bmName }}</td>
      </tr>
      <tr>
        <td style="width: 15%">职 务</td>
        <td style="width: 25%">{{ dataChildObj.Position }}</td>
        <td style="width: 15%" colspan="2">休假联系电话</td>
        <td style="width: 45%" colspan="2">{{ dataChildObj.Phone }}</td>
      </tr>
      <tr>
        <td>拟休假时间</td>
        <td colspan="5">
          {{ dataChildObj.Starttime }}---{{ dataChildObj.Endtime }}
        </td>
      </tr>
      <tr>
        <td>休假去向</td>
        <td colspan="5">{{ dataChildObj.Remark }}</td>
      </tr>
      <tr>
        <td colspan="6">
          1天以内副总审批。（1天以上不填此单，需总经理审批。）
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';
import { BsBinjiaFormConfig } from './binjia-form.config';

@Component({})
export default class BsBinjiaForm extends Mixins(BsBinjiaFormConfig) {
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

@include b(bs-sign-audit-binjia-form) {
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
