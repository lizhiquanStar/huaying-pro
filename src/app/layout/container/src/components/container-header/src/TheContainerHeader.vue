<template>
  <div class="the-container-header">
    <div
      class="the-container-header__logo"
      :class="{ 'is-small': collapse }"
      @click="$router.push($store.state.user.home)"
    >
      华映数据中台
    </div>

    <div
      class="the-container-header__user"
      :class="
        $route.meta && $route.meta.currentParent == 1 ? 'bg-main' : 'bg-white'
      "
    >
      <i
        class="el-icon-arrow-left"
        @click="$router.back()"
        v-if="!needCollapse && fromRoute()"
      ></i>
      <div
        class="fml-flex-1 tl fml-collpase"
        v-if="!$route.meta || $route.meta.currentParent != 1"
      >
        <el-tooltip
          effect="light"
          content="收缩左侧菜单栏"
          placement="top-start"
          v-if="needCollapse"
        >
          <i
            class="icon-middle"
            :class="{
              'el-icon-s-fold': !collapse,
              'el-icon-s-unfold': collapse
            }"
            @click="collapseHandle"
          ></i>
        </el-tooltip>
        <span
          class="header-bread-title"
          v-show="$route.meta.name || $route.query.name"
        >
          <!-- <i class="el-icon-position"></i>&ensp; -->
          {{ $route.meta.name || $route.query.name }}</span
        >
      </div>
      <div class="fml-header-right">
        <!-- <i
          class="el-icon-search"
          @click="search"
          v-if="!needCollapse && fromRoute()"
        ></i> -->
        <div
          class="fml-menu-list"
          v-if="$route.meta && $route.meta.currentParent == 1"
          style="margin-left:100px"
        >
          <span
            v-for="(item, index) in configMenu"
            :key="index"
            :class="{ active: item.paths.includes($route.path) }"
            @click="$router.push(item.path)"
            >{{ item.title }}</span
          >
        </div>
        <div class="fml-menu-tip" v-if="needMessage">
          <div class="fml-menu-list">
            <span @click="systemHandle">
              <el-badge
                :value="message"
                class="item"
                size="small"
                v-if="message"
              >
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="系统消息"
                  placement="top-start"
                >
                  <i class="el-icon-bell"></i>
                </el-tooltip>
              </el-badge>
              <el-tooltip
                class="item"
                effect="dark"
                content="系统消息"
                placement="top-start"
                v-else
              >
                <i class="el-icon-bell"></i>
              </el-tooltip>
            </span>
          </div>
          <el-dropdown v-if="needUserInfo">
            <p>
              <i class="el-icon-user"></i>
              {{ $store.state.user.IdName }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </p>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="openUserInfo">
                用户信息
              </el-dropdown-item>
              <el-dropdown-item divided @click.native="logout"
                >注销</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <comp-form-dialog :formDialogConfig="infoDialog">
      <template #updatePassword>
        <span class="the-container-header__update-pwd" @click="openPwdDialog"
          >修改密码</span
        >
      </template>
    </comp-form-dialog>
    <comp-form-dialog
      class="the-container-header__password"
      :formDialogConfig="passwordDialog"
    >
      <i
        :class="[
          'password-icon',
          'iconfont',
          showPassword ? 'iconkejian' : 'iconbukejian'
        ]"
        slot="passwordToggle"
        @click="togglePassword"
      ></i>
      <i
        :class="[
          'password-icon',
          'iconfont',
          showCheckPassword ? 'iconkejian' : 'iconbukejian'
        ]"
        slot="checkPasswordToggle"
        @click="toggleCheckPassword"
      ></i>
      <i
        :class="[
          'password-icon',
          'iconfont',
          showOldPassword ? 'iconkejian' : 'iconbukejian'
        ]"
        slot="oldPasswordToggle"
        @click="toggleOldPassword"
      ></i>
    </comp-form-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { TheContainerHeaderConfig } from './TheContainerHeader.config';
import { TheContainerHeaderApi } from './TheContainerHeader.api';
import { API_CONFIG } from '@/config/http.config';
import { eventBus } from '@/core/utils/vue/event-bus';

@Component({})
export default class TheContainerHeader extends Mixins(
  TheContainerHeaderConfig
) {
  message = 0;
  needCollapse = false;
  needMessage = false;
  needUserInfo = false;

  search() {
    eventBus.$emit('handleSearch');
  }

  openUserInfo() {
    this.emit(this.COMPONENT_METHOD.formDialogOpen, undefined, 'info');
  }
  openPwdDialog() {
    this.emit(this.COMPONENT_METHOD.formDialogOpen, undefined, 'password');
  }
  async logout() {
    this.$socket
      .invoke('Logout', this.$store.state.user.Id)
      .then(async () => {
        this.$socket.stop();
      })
      .catch((err: any) => {
        return console.error(err.toString());
      });
    const res: any = await TheContainerHeaderApi.logout({});
    if (!res) return;
    this.$message.success('退出成功');
    this.$store.commit('clearUser');
    API_CONFIG.linkUrl
      ? (window.location.href = API_CONFIG.linkUrl)
      : this.$router.replace('/login');
  }
  collapseHandle() {
    this.collapse = !this.collapse;
    this.$emit('collapseShow', this.collapse);
  }

  // 系统消息
  systemHandle() {
    this.$router.push('/system-message');
  }

  // 获取系统消息未读数据
  async getNoreadnumData() {
    const res = await TheContainerHeaderApi.getNoreadnum();
    if (!res) return;
    this.message = res;
  }

  created() {
    // this.getNoreadnumData();
  }
}
</script>
<style lang="scss">
@import 'src/core/styles/export.scss';
@include b(the-container-header) {
  width: 100%;
  background: $sideBarColor;
  @include layout();
  @include layout-align(center, center);
  @include e(search) {
    margin-right: 36px;
    font-weight: 700;
  }
  .el-icon-arrow-left,
  .el-icon-search {
    vertical-align: middle;
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
  }
  .header-bread-title {
    font-size: 16px;
    color: #141414;
    font-weight: bold;
  }
  .el-dropdown {
    color: inherit;
  }
  .el-icon-bell {
    cursor: pointer;
  }
  .fml-menu-tip {
    @include layout();
    @include layout-align(center, center);
  }
  .fml-header-right {
    @include layout();
    @include layout-align(center, end);
  }
  .fml-menu-list {
    span {
      margin-right: 37px;
      position: relative;
      &:hover {
        opacity: 0.8;
      }
    }
    span.active {
      border-bottom: 3px solid $brandColor;
      padding-bottom: 16px;
      font-weight: bold;
    }
    .el-icon-sort {
      transform: rotate(90deg);
      margin-right: 9px;
    }
  }

  .fml-collpase {
    font-size: 16px;
    text-align: center;
  }
  @include e(logo) {
    line-height: 58px;
    padding-left: 20px;
    color: #fff;
    font-size: 24px;
    width: 200px;
    transition: all 0.3s ease-in-out;
    height: 58px;
    cursor: pointer;
    @include layout();
    @include layout-align(center, start);
    @include when(small) {
      width: 64px;
      padding-left: 0;
      @include layout();
      @include layout-align(center, center);
      img {
        width: 45px;
        height: 24px;
      }
    }
    p {
      font-size: 24px;
      font-weight: 400;
      text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.76);
    }
    img {
      height: 34px;
      max-width: 100%;
    }
  }
  @include e(user) {
    padding-right: 24px;
    padding-left: 24px;
    transition: all 0.3s ease-in-out;
    @include layout();
    @include layout-align(center, center);
    flex: 1;
    height: 58px;
    p {
      font-weight: 400;
      line-height: 22px;
    }
  }

  @include e(update-pwd) {
    font-weight: 400;
    color: $brandColor;
    line-height: 20px;
    margin-left: 12px;
    cursor: pointer;
  }
  .password-item {
    width: 75%;
  }
}

.the-container-header__password {
  .password-input {
    width: 210px;
    margin-right: 5px;
  }
  .password-icon {
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: $brandColor;
    }
  }
}
</style>
