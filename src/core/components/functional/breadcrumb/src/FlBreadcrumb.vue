<template>
  <div class="fl-breadcrumb">
    <p class="fl-breadcrumb__prefix">
      <i class="el-icon-location-outline"></i>
      当前位置：
    </p>
    <el-breadcrumb :v-bind="filterAttrsForVBind(Config, 'breadcrumb')">
      <el-breadcrumb-item
        v-for="(item, index) in Config.items"
        :key="index"
        v-bind="item"
        >{{ item.label }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import { FlBreadcrumbAdapter } from './FlBreadcrumb.adapter';
import { FL_BREADCRUMB_DEFAULT_CONFIG } from './FlBreadcrumb.default';
import FunctionalComponentFactory from '@/core/factory/component-functional.factory';
import defaultsDeep from 'lodash/defaultsDeep';
import { COMPONENT_CONFIG } from '@/config/component.config';

@Component({ name: 'FlBreadcrumb' })
export default class FlBreadcrumb extends FunctionalComponentFactory {
  @Prop({ type: Object }) breadcrumbConfig!: FlBreadcrumbAdapter;
  get Config(): FlBreadcrumbAdapter {
    return defaultsDeep(
      this.breadcrumbConfig,
      COMPONENT_CONFIG.breadcrumb,
      FL_BREADCRUMB_DEFAULT_CONFIG
    );
  }
}
</script>

<style lang="scss">
@import 'src/core/styles/export.scss';

@include b(fl-breadcrumb) {
  height: 40px;
  background: $defaultBg;
  @include layout();
  @include layout-align(center, start);

  @include e(prefix) {
    @include layout();
    @include layout-align(center, start);
    font-size: 14px;
    font-weight: 400;
    color: $aidFontColor1;
    i {
      color: $brandNearColor;
      font-size: 18px;
      margin-right: 4px;
    }
  }
}
</style>
