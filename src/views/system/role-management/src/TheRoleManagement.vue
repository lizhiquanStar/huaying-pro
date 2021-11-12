<template>
  <div class="the-role-management">
    <comp-search :searchConfig="searchConfig"></comp-search>
    <fl-button-group :buttonGroupConfig="buttonGroupConfig"></fl-button-group>
    <comp-grid :gridConfig="gridConfig"></comp-grid>
    <BsAddEditRole></BsAddEditRole>
    <!-- 分管部门 -->
    <comp-add-edit-dialog
      :addEditDialogConfig="addEditDialogConfig"
    ></comp-add-edit-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { TheRoleManagementConfig } from './TheRoleManagement.config';
import BsAddEditRole from './components/add-edit-role/add-edit-role.vue';

@Component({
  components: {
    BsAddEditRole // <bs-add-edit-role>
  }
})
export default class TheRoleManagement extends Mixins(
  TheRoleManagementConfig
) {}
</script>

<style lang="scss">
@import 'src/core/styles/export.scss';

@include b(the-role-management) {
}
</style>
