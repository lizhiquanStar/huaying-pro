<template>
  <div class="the-permission-management">
    <fl-button-group :buttonGroupConfig="buttonGroupConfig"></fl-button-group>
    <comp-grid :gridConfig="gridConfig"></comp-grid>
    <comp-add-edit-dialog
      :addEditDialogConfig="addEditDialogConfig"
    ></comp-add-edit-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { ThePermissionManagementConfig } from './ThePermissionManagement.config';

@Component({})
export default class ThePermissionManagement extends Mixins(
  ThePermissionManagementConfig
) {}
</script>

<style lang="scss">
@import 'src/core/styles/export.scss';

@include b(the-permission-management) {
  .el-table__indent {
    padding-left: 0 !important;
  }
}
</style>
