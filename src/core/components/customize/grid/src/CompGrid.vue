<template>
  <div
    class="comp-grid"
    ref="grid"
    :style="{
      minHeight: sinkFunc.getMinHeight(Config)
    }"
  >
    <base-table
      class="comp-grid__table"
      ref="table"
      @output-change="copyOutputsToTarget('tableOutputs', $event)"
      :config="Config.table"
      inner
      v-on="mergeEventsAndDasherizeKeys([Config.on, $listeners])"
    >
      <template v-for="(_, slot) in $scopedSlots" #[slot]="{scope}">
        <slot :name="slot" :scope="scope"></slot>
      </template>
    </base-table>
    <div
      v-if="!Config.table.hiddenPagination"
      class="comp-grid__pagination-container"
    >
      <base-pagination
        class="comp-grid__pagination"
        @output-change="copyOutputsToTarget('paginationOutputs', $event)"
        @size-change="tableOutputs.update && $nextTick(tableOutputs.update)"
        @current-change="tableOutputs.update && $nextTick(tableOutputs.update)"
        :config="Config.pagination"
        inner
        v-on="$listeners"
      ></base-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import BaseTable from '../../../base/table/src/BaseTable.vue';
import { Component, Prop, Mixins } from 'vue-property-decorator';
import { CompGridAdapter, CompGridOutput } from './CompGrid.adapter';
import { BasePaginationOutput } from '../../../base/pagination/src/BasePagination.adapter';
import BasePagination from '../../../base/pagination/src/BasePagination.vue';
import { BaseTableOutput } from '../../../base/table/src/BaseTable.adapter';
import {
  COMPONENT_TYPE,
  CustomizeComponentBase
} from '@/core/dtos/factories.dto';
import CustomizeComponentFactory from '@/core/factory/component-customize.factory';
import defaultsDeep from 'lodash/defaultsDeep';
import assign from 'lodash/assign';
import { COMP_GRID_DEFAULT_CONFIG } from './CompGrid.default';
import { CompGridSinkFunc, CompGridParamsFunc } from './CompGrid.support';
import { COMPONENT_CONFIG } from '../../../../../config/component.config';

@Component({
  name: 'CompGrid',
  components: {
    BaseTable,
    BasePagination
  }
})
export default class CompGrid extends Mixins(CustomizeComponentFactory)
  implements CustomizeComponentBase {
  @Prop({ type: Object }) gridConfig!: CompGridAdapter;
  get Config(): CompGridAdapter {
    if (!this.gridConfig.pagination) {
      this.$set(this.gridConfig, 'pagination', {});
    }
    this.$set(this.gridConfig.pagination!, 'total', this.tableOutputs.total);
    if (!this.gridConfig.table.pagination) {
      this.$set(this.gridConfig.table, 'pagination', {});
    }
    assign(this.gridConfig.table.pagination, {
      ...this.paginationOutputs
    });
    assign(this.gridConfig.table, {
      searchParam: this.paramsFunc.params
    });
    return defaultsDeep(
      this.gridConfig,
      COMPONENT_CONFIG.grid,
      COMP_GRID_DEFAULT_CONFIG
    );
  }
  get output(): CompGridOutput {
    return {
      ...this.tableOutputs,
      ...this.paginationOutputs,
      setParams: this.paramsFunc.setParams
    };
  }
  type = COMPONENT_TYPE.grid;
  tableOutputs: BaseTableOutput = {
    total: 0
  };
  paginationOutputs: BasePaginationOutput = {};

  sinkFunc = new CompGridSinkFunc();
  paramsFunc = new CompGridParamsFunc();

  mounted() {
    this.$nextTick(() => this.sinkFunc.setTop(this.$refs.grid as Element));
  }
}
</script>

<style lang="scss">
@import 'src/core/styles/export.scss';

@include b(comp-grid) {
  margin-top: 10px;
  background: #fff;
  padding: 0 18px 25px;
  @include layout(column);
  @include layout-align(start, between);

  @include e(table) {
    .cell {
      color: $defaultFontColor;
      font-weight: 400;
    }

    &.el-table--striped .el-table__body tr.el-table__row--striped td {
      background: $stripedColor;
    }
  }
  @include e(pagination-container) {
    width: 100%;
    margin-top: 17px;
    text-align: right;

    @include e(pagination) {
      .el-pager li {
        margin: 2px 4px;
        padding: 0;
        height: 24px;
        line-height: 24px;
        min-width: 24px;
        border: 1px solid $stripedColor;
        border-radius: 2px;

        &.active {
          background: $brandColor;
          color: #fff;
        }
      }
    }
  }
}
</style>
