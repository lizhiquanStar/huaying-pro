<template>
  <div class="sidebar-menu">
    <template v-for="item in config">
      <el-submenu
        v-if="
          item.children && item.children.length && $hasPermission(item.perm)
        "
        :key="item.id"
        :index="item.id"
      >
        <template slot="title">
          <i v-if="item.icon" :class="[item.icon]" class="fml-icon-right"></i>
          <i v-else class="el-icon-setting fml-icon-right"></i>
          <span class="sidebar-menu_subment-title">{{ item.title }}</span>
        </template>
        <sidebar-menu :config="item.children"></sidebar-menu>
      </el-submenu>

      <el-menu-item
        class="sidebar-menu__submenu-item"
        :style="{ display: !isCollapse ? 'block' : 'flex' }"
        v-else-if="item.path && $hasPermission(item.perm)"
        :key="item.id"
        :index="item.id"
        :route="item.path"
      >
        <i
          class="sidebar-menu__item-icon fml-icon-right"
          v-if="item.icon"
          :class="[item.icon]"
        ></i>
        <span class="sidebar-menu_subment-title">{{ item.title }}</span>
      </el-menu-item>

      <el-submenu
        v-else-if="$hasPermission(item.perm)"
        :key="item.id"
        :index="item.id"
      >
        <template slot="title">
          <i v-if="item.icon" :class="[item.icon]" class="fml-icon-right"></i>
          <i v-else class="el-icon-setting fml-icon-right"></i>
          <span>{{ item.title }}</span>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({ name: 'SidebarMenu' })
export default class SidebarMenu extends Vue {
  @Prop({ type: Array, default: () => [] })
  config!: any[];
  @Prop({ type: Boolean, default: false })
  isCollapse = false;
}
</script>

<style lang="scss">
@import 'src/core/styles/export.scss';

@include b(sidebar-menu) {
  i.fml-icon-right {
    font-size: 18px;
    width: 24px;
    text-align: left;
    margin-right: 16px;
    display: inline-block;
  }

  @include e(item-icon) {
    font-size: 14px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    margin-right: 5px;
  }

  @include e(submenu-item) {
    &.sidebar-menu__submenu-item {
      height: 46px;
    }
    @include layout();
    @include layout-align(center, start);
    i {
      font-size: 18px;
      text-align: left;
      margin-right: 16px;
    }
  }
  span {
    width: auto;
  }
}
</style>
