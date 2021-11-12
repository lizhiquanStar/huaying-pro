<template>
  <div class="bs-model-tree" v-loading="loadingTree">
    <comp-tree :treeConfig="treeConfig" class="fml-tree-left">
      <template #default="{node,data}">
        <div v-if="data.Id != ''" class="fml-flex-list">
          <p class="fml-flex-1">{{ node.label }}</p>
          <p>
            <i
              class="el-icon-edit-outline"
              @click.stop.prevent="edit(data)"
            ></i>
            <i class="el-icon-delete" @click.stop.prevent="del(data.Id)"></i>
          </p>
        </div>

        <span v-else>
          {{ node.label }}
          <el-tooltip content="单击新增部门" placement="top" effect="light">
            <i class="el-icon-circle-plus" @click.stop.prevent="add"></i>
          </el-tooltip>
        </span>
      </template>
    </comp-tree>
    <comp-add-edit-dialog
      :addEditDialogConfig="addEditDialogConfig"
    ></comp-add-edit-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { BsModelTreeConfig } from './model-tree.config';
import { API_CONFIG } from '../../../../config/http.config';

@Component({
  name: 'BsModelTree'
})
export default class BsModelTree extends Mixins(BsModelTreeConfig) {
  // 获取用户信息
  get token() {
    return this.$store.state.user.access_token;
  }
  // 域名
  apiPrefixUrl = API_CONFIG.apiPrefixUrl;
  get downLoadUrl() {
    return (
      this.apiPrefixUrl +
      '/obj/device-upload/download?access_token=' +
      this.token
    );
  }
}
</script>

<style lang="scss">
@import 'src/core/styles/export.scss';

@include b(bs-model-tree) {
  width: 260px;
  height: 100%;
  overflow-y: auto;
  padding-top: 20px;
  border-radius: 2px;
  background: #fff;
  border-right: 20px solid $defaultBg;
  position: relative;
  flex-shrink: 0;
  .el-image {
    padding: 10px;
  }
  .base-upload__image .el-image__inner {
    object-fit: contain;
  }
  .fml-flex-list {
    width: 100%;
    @include layout();
    @include layout-align(center, center);
    .el-icon-edit-outline {
      color: $brandColor;
      margin-right: 10px;
      margin-left: 10px;
      font-size: 16px;
    }
    .el-icon-delete {
      color: $dangerColor;
      font-size: 16px;
    }
  }
  .base-upload {
    height: 120px;
  }
  .base-upload__add-image {
    cursor: pointer;
  }
  .fml-tree-left {
    width: 240px;
  }
  .fml-tree-search {
    .el-form {
      margin-left: 10px;
    }
    .comp-form__form {
      padding-bottom: 0;
    }
  }
  .base-upload-img__avatar,
  .base-upload-img__icon {
    width: 60px;
    height: 60px;
    line-height: 60px;
    border: none;
  }
  .base-upload-img__icon {
    background: #fff;
    border: 1px dashed #dcdfe6;
  }
  .fml-h3 {
    margin-left: 20px;
    margin-bottom: 15px;
    font-weight: bold;
    font-size: 14px;
    .el-button--mini,
    .el-button--mini.is-round {
      padding: 7px;
    }
  }
  .fl-button-group {
    position: fixed;
    background: #fff;
    height: 80px;
    z-index: 10;
    left: 20px;
    bottom: 20px;
    .el-button {
      &.is-circle {
        color: $brandColor;
        border-radius: 50%;
        padding: 12px;
        border: none;
        box-shadow: none;
        margin: 0;
        i {
          min-width: 20px;
          height: 20px;
        }
      }
    }
    .el-badge__content.is-fixed {
      top: 10px;
      right: 20px;
      width: 10px;
      height: 10px;
      line-height: 10px;
      padding: 0;
      font-size: 0;
    }
  }
  .fml-tree-box {
    padding-bottom: 80px;
  }
  .el-tree {
    color: $defaultFontColor;
    padding: 0 5px;
    font-weight: 400;
    padding: 0 15px 80px 0;
    .el-tree-node.is-current > .el-tree-node__content {
      div:not(.el-tree-node__expand-icon):not(.el-checkbox__inner):not(.el-checkbox__input) {
        font-size: 14px;
        font-weight: 400;
        color: $brandColor;
        line-height: 22px;
      }
    }
    .el-tree-node__content {
      div,
      span {
        font-size: 14px;
      }
    }
    .el-tree-node__content {
      height: 44px;
    }
    .el-tree-node__expand-icon:not(.is-leaf) {
      color: $brandColor;
      font-size: 14px !important;
    }
    .el-tree-node__expand-icon {
      margin-left: 20px;
    }
    .el-icon-circle-plus {
      margin-left: 10px;
      font-size: 17px;
      color: $brandColor;
      vertical-align: middle;
    }
  }
}
</style>
