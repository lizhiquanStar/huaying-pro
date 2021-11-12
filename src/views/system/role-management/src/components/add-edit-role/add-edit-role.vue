<template>
  <div class="bs-role-management-add-edit-role">
    <comp-dialog @open="onOpen" :dialogConfig="dialogConfig">
      <comp-form :formConfig="formConfig"></comp-form>
      <comp-tabs :tabsConfig="tabsConfig">
        <comp-grid :gridConfig="gridConfig" slot="dataPerm">
          <template #required="{scope}">
            <el-radio
              v-for="item in scope.row.children"
              :key="item.Id"
              class="mr10"
              v-model="scope.row.CheckList"
              :label="item.Id"
              >{{ item.Name }}</el-radio
            >
          </template>
        </comp-grid>
      </comp-tabs>
    </comp-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { BsAddEditRoleConfig } from './add-edit-role.config';
import BaseRaido from '@/core/components/base/form/raido/src/BaseRaido.vue';

@Component({
  components: { BaseRaido }
})
export default class BsAddEditRole extends Mixins(BsAddEditRoleConfig) {}
</script>

<style lang="scss">
@import 'src/core/styles/export.scss';

@include b(bs-role-management-add-edit-role) {
  .el-tab-pane {
    height: 300px;
    overflow-y: auto;
  }
  .el-checkbox {
    font-weight: 400;
  }
  .comp-form__form {
    padding: 0;
  }
}
</style>
