<template>
  <div class="base-tree-select" v-clickoutside="handleHidden">
    <base-input
      :config="Config.input"
      inner
      v-model.trim="labelModel"
      @click.native="handleShow"
      @clear="onClose"
    >
      <template v-for="(_, slot) in $scopedSlots" #[slot]>
        <slot :name="slot"></slot>
      </template>
      <i
        v-if="labelModel"
        slot="suffix"
        class="el-icon-close"
        @click="onClose"
      ></i>
    </base-input>

    <!-- 存放v-model的输入框 -->
    <input :name="Config.modelName" type="hidden" v-model.lazy.trim="model" />

    <!-- 下拉树 -->
    <div
      class="base-tree-select__tree-container"
      :class="{ 'tree-select-multiple': Config.tree.showCheckbox }"
      v-show="treeVisible"
    >
      <base-tree
        :config="Config.tree"
        inner
        ref="baseTree"
        @node-click="onTreeNodeClick"
        @check="treeNodeCheck"
        @output-change="copyOutputsToTarget('treeOutputs', $event)"
      >
        <template v-for="(_, slot) in $scopedSlots" #[slot]="{node, data}">
          <slot :name="slot" :node="node" :data="data"></slot>
        </template>
      </base-tree>
      <div
        class="base-tree-select__tree-footer"
        v-if="Config.tree.showCheckbox"
      >
        <el-button type="primary" size="small" @click="getCheck(1)"
          >确定</el-button
        >
        <el-button type="default" size="small" @click="getCheck(0)"
          >清空</el-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Mixins, Watch } from 'vue-property-decorator';
import FromComponentFactory from '@/core/factory/component-form.factory';
import { TREE_SELECT_DEFAULT } from './BaseTreeSelect.default';
import Clickoutside from '@/core/utils/vue/clickoutside';
import { BaseTreeSelectAdapter } from './BaseTreeSelect.adapter';
import BaseInput from '../../input/src/BaseInput.vue';
import BaseTree from '../../../tree/src/BaseTree.vue';
import { BaseTreeOutput } from '../../../tree/src/BaseTree.adapter';

@Component({
  directives: { Clickoutside },
  components: {
    BaseInput,
    BaseTree
  }
})
export default class BaseTreeSelect extends Mixins(FromComponentFactory) {
  @Prop({ type: Object }) config!: BaseTreeSelectAdapter;
  get Config(): BaseTreeSelectAdapter {
    return _(this.config)
      .defaultsDeep(TREE_SELECT_DEFAULT)
      .value();
  }
  get label() {
    return (
      (this.Config.tree &&
        this.Config.tree.props &&
        this.Config.tree.props.label) ||
      'label'
    );
  }
  @Watch('Config.label')
  onLabelChange(v: string) {
    if (v) this.labelModel = v;
  }

  labelModel = this.Config.label || '';
  treeVisible = false;

  treeOutputs: BaseTreeOutput = {};

  handleShow() {
    this.treeVisible = true;
    if (this.Config.tree && !_.isArray(this.Config.tree.data)) {
      this.Config.tree.data.send && this.Config.tree!.data.send();
    }
  }
  handleHidden() {
    this.treeVisible = false;
  }
  handleReset() {
    this.treeVisible = false;
    this.labelModel = '';
    this.model = '';
    const tree = this.Config.tree!.ref;
    if (tree) {
      tree.setCurrentKey('');
    }
  }

  onTreeNodeClick(data: any) {
    this.labelModel = data[this.label];
    this.model = data[this.Config.valueKey || 'id'];
    this.treeVisible = false;
  }
  getCheck(state: number) {
    if (state == 0) {
      this.labelModel = '';
      this.model = '';
    }
    this.treeVisible = false;
  }
  treeNodeCheck(obj: any, bol: any) {
    const baseTree: any = this.$refs.baseTree;
    const tree = baseTree.$refs[baseTree.$options.name];
    if (!tree) return;
    if (!bol || !bol.checkedNodes) return;
    const labels: any = [];
    const value: any = [];
    bol.checkedNodes.map((item: any) => {
      labels.push(item[this.label]);
      value.push(item[this.Config.valueKey || 'id']);
    });
    this.labelModel = labels.join(',');
    this.model = value.join(',');
  }
  onClose() {
    this.labelModel = '';
    this.model = '';
  }

  async onModelChange(model: any) {
    if (model) {
      if (!this.labelModel && !_.isArray(this.Config.tree.data)) {
        await this.waitUnitResultTrue(() => !!this.treeOutputs.getData);
        await this.treeOutputs.getData!();
      }
      setTimeout(() => {
        const baseTree: any = this.$refs.baseTree;
        const tree = baseTree.$refs[baseTree.$options.name];
        if (!tree) return;
        if (!this.Config.tree.showCheckbox) {
          tree.setCurrentKey(model);
          const node: any = tree.getCurrentNode();
          this.labelModel = node && (node[this.label] || '');
        } else {
          tree.setCurrentKey(model);
          const result: any = tree.getCheckedNodes();
          const res: any = [];
          result.map((item: any) => {
            res.push(item[this.label]);
          });
        }
      }, 0);
    }
    if (!model && this.labelModel) {
      this.labelModel = '';
    }
  }
}
</script>

<style lang="scss">
@import 'src/core/styles/export.scss';

@include b(base-tree-select) {
  position: relative;
  @include e(tree-container) {
    position: absolute;
    background: #fff;
    z-index: 10;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    width: 100%;
    padding: 10px 5px;
    @include e(tree-footer) {
      text-align: right;
    }
  }
}
</style>
