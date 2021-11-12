<template>
  <div class="the-amoy-data">
    <el-breadcrumb separator="/" v-if="$route.query.type == 'online-market'">
      <el-breadcrumb-item
        v-for="(item, index) in breads"
        :key="index"
        @click.native="breadClick(item, index)"
        >{{ item }}</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="echart" v-loading="chartLoading" v-if="showEchart">
      <div id="dataEchart" ref="dataEchart" style="width: 100%;height: 400px;">
        <el-empty
          description="无数据或其他错误"
          v-if="chartData && !chartData.length"
        ></el-empty>
      </div>
    </div>
    <div
      id="main"
      ref="showDetail"
      v-if="showEchart"
      style="width: 100%;height:100%;"
    ></div>
    <div class="table-data">
      <div class="search-month" v-if="$route.query.type != 'online-market'">
        <el-select
          v-model="month"
          placeholder="请选择"
          :offset="6"
          @change="changeSelect"
        >
          <el-option
            size="samll"
            v-for="item in monthOptions"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>

      <comp-tabs :tabsConfig="tabConfig" v-else></comp-tabs>
      <vxe-table
        border
        resizable
        size="mini"
        show-overflow
        row-key
        show-header-overflow
        highlight-hover-row
        highlight-current-row
        ref="xTable"
        :span-method="rowspanMethod"
        :loading="loading"
      >
        <template v-for="item in tableColumn">
          <vxe-column
            v-if="item.visible"
            :key="item.field"
            :field="item.field"
            :title="item.title"
            :min-width="item.minWidth"
          ></vxe-column>
        </template>
      </vxe-table>
      <base-pagination :config="paginationConfig"></base-pagination>
    </div>
    <!-- <el-drawer :visible.sync="drawer" :with-header="false" size="300px">
      <comp-search :searchConfig="searchConfig"></comp-search>
    </el-drawer> -->
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { TheAmoyDataConfig } from './TheAmoyData.config';
import { EchartConfig } from './echart.config';
import { eventBus } from '@/core/utils/vue/event-bus';
import { BasePagination } from '@/core/components/base';

@Component({
  components: { BasePagination }
})
export default class TheAmoyData extends Mixins(
  TheAmoyDataConfig,
  EchartConfig
) {
  drawer = false;
  showEchart = false; // 是否需要显示echart图表

  breadClick(bread, index) {
    const leve = Number(this.$route.query.level);
    const breadLen = this.breads.length;
    const lev = breadLen + Number(leve) - 1;
    if (index == breadLen - 1) return;
    this.breads.splice(index + 1, breadLen - 1);
    this.level = lev - 1 != leve ? lev - 3 : leve - 1;
    this.getChart(lev - 1 != leve, bread);
  }

  mounted() {
    eventBus.$on('handleSearch', () => {
      this.drawer = true;
    });
  }

  beforeDestroy() {
    eventBus.$off('handleSearch');
  }

  created() {
    const { type } = this.$route.query;
    this.$nextTick(async () => {
      this.showEchart = type == 'online-market';
      type == 'online-market' && this.getChart();
      type == 'online-market' && (await this.getTab());
      this.getTableData();
    });
  }
}
</script>

<style lang="scss">
@import 'src/core/styles/export.scss';

@include b(the-amoy-data) {
  .comp-search {
    border: none;
    padding-right: 0;
    .comp-search__form,
    .comp-search,
    .comp-search__container,
    .comp-search__forms {
      height: 100%;
    }
    .base-form__container {
      display: flex;
      height: 100%;
      flex-direction: column;
    }
    .comp-search__buttons {
      margin-top: 20px;
      align-self: flex-end;
    }
  }
  .echart {
    margin: 0 24px 0 14px;
    overflow-x: auto;
  }
  .search-month {
    @include layout();
    @include layout-align(center, end);
    margin-bottom: 20px;
  }
  .el-breadcrumb {
    padding: 24px;
  }
  .el-breadcrumb__item,
  .el-breadcrumb__inner {
    cursor: pointer;
  }
  .el-breadcrumb__item:last-child .el-breadcrumb__inner,
  .el-breadcrumb__item:last-child .el-breadcrumb__inner a {
    opacity: 0.6;
  }
  .table-data {
    padding: 24px;
    .vxe-table--render-default .vxe-table--body-wrapper {
      min-height: 100px;
    }
    .vxe-cell {
      text-align: center;
    }
    .vxe-cell--title {
      text-align: center;
      width: 100%;
    }
  }
  .base-pagination {
    padding: 20px 0;
  }
}
@media screen and (max-width: 1024px) {
  .the-amoy-data {
    border-top: 10px solid $defaultBg;
  }
}
</style>
