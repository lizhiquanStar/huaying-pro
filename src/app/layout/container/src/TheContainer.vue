<template>
  <div class="the-container">
    <!-- 头部 -->
    <the-container-header
      @collapseShow="clickCollapse"
      v-if="$route.query.type != 'show'"
    ></the-container-header>
    <div class="the-container__block">
      <!-- 左侧导航 -->
      <the-container-sidebar
        :isCollapse="collapse"
        v-if="$route.query.type != 'show'"
      ></the-container-sidebar>
      <!-- 主体内容 -->
      <the-container-main></the-container-main>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { TheContainerConfig } from './TheContainer.config';
import TheContainerHeader from './components/container-header';
import TheContainerSidebar from './components/container-sidebar';
import TheContainerMain from './components/container-main';

@Component({
  components: {
    TheContainerMain,
    TheContainerSidebar,
    TheContainerHeader
  }
})
export default class TheContainer extends Mixins(TheContainerConfig) {
  collapse: boolean = false;
  clickCollapse(collapse: boolean) {
    this.collapse = collapse;
  }
}
</script>

<style lang="scss">
@import 'src/core/styles/export.scss';

@include b(the-container) {
  width: 100%;
  height: 100%;
  @include layout(column);
  @include layout-wrap(nowrap);

  @include e(block) {
    width: 100%;
    overflow: hidden;
    flex: 1;
    @include layout();
    @include layout-align();
    @include layout-wrap(nowrap);
  }
  .the-container-header__logo,
  .the-container-sidebar {
    display: none;
  }
}
@media screen and (max-width: 1024px) {
  .the-container-sidebar,
  .the-container-header__logo {
    display: none;
  }
  .the-container-main {
    border-color: #fff;
    border-width: 0;
  }
}
</style>
