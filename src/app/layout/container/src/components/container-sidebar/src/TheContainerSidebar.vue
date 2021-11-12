<template>
  <el-menu
    class="the-container-sidebar"
    :unique-opened="true"
    router
    :default-active="$route.meta.id"
    background-color="#2E323F"
    text-color="#FFFFFF"
    :collapse="isCollapse"
  >
    <sidebar-menu
      :config="SIDEBAR_CONFIG1"
      :collapse="isCollapse"
    ></sidebar-menu>
  </el-menu>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator';
import { TheContainerSidebarConfig } from './TheContainerSidebar.config';
import SidebarMenu from './components/sidebar-menu/sidebar-menu.vue';

@Component({
  components: {
    SidebarMenu
  }
})
export default class TheContainerSidebar extends Mixins(
  TheContainerSidebarConfig
) {
  @Prop({ type: Boolean, default: false })
  isCollapse = false;
}
</script>

<style lang="scss">
@import 'src/core/styles/export.scss';
@include b(the-container-sidebar) {
  width: 200px;
  height: 100%;
  background: $sideBarBg;
  overflow-x: hidden;
  .el-menu-item,
  .el-submenu__title {
    line-height: 46px;
  }
  .el-submenu {
    .el-menu--inline {
      .sidebar-menu__submenu-item {
        padding-left: 60px !important;
      }
    }
  }
  .el-submenu.is-opened {
    .el-submenu__title,
    .el-menu-item-group,
    .el-menu-item-group li {
      background: $sideBarBg !important;
    }
    .el-menu-item-group li:hover {
      background: $sideBarBg !important;
    }
    .el-menu-item-group li.el-menu-item.is-active {
      background: $brandColor !important;
      color: #fff !important;
    }
  }
  .el-menu-item i,
  .el-submenu__title i {
    color: #fff;
  }

  .el-submenu__title,
  .el-submenu .el-menu-item {
    height: 46px;
    line-height: 46px;
  }
  &.el-menu--collapse {
    width: 64px;
    i.fml-icon-right {
      margin-right: 20px;
    }
    .el-submenu__icon-arrow {
      right: 5px;
    }
    .el-submenu__title {
      span {
        display: none;
      }
    }
  }
  &.el-menu {
    border-right: none;
  }
}
</style>
