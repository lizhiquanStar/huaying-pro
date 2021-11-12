<template>
  <div
    class="fl-button-group"
    :class="{
      'is-align-left': Config.align === 'left',
      'is-align-mid': Config.align === 'mid',
      'is-align-right': Config.align === 'right'
    }"
  >
    <base-button
      class="fl-button-group__button"
      v-for="(button, index) in Config.buttons"
      :key="index"
      :config="button"
      inner
      >{{ button.text || '' }}</base-button
    >
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import { FlButtonGroupAdapter } from './FlButtonGroup.adapter';
import { FL_BUTTON_GROUP_DEFAULT_CONFIG } from './FlButtonGroup.default';
import FunctionalComponentFactory from '@/core/factory/component-functional.factory';
import defaultsDeep from 'lodash/defaultsDeep';
import { COMPONENT_CONFIG } from '@/config/component.config';
import { BaseButton } from '@/core/components/base';

@Component({
  name: 'FlButtonGroup',
  components: {
    BaseButton
  }
})
export default class FlButtonGroup extends FunctionalComponentFactory {
  @Prop({ type: Object }) buttonGroupConfig!: FlButtonGroupAdapter;
  get Config(): FlButtonGroupAdapter {
    return defaultsDeep(
      this.buttonGroupConfig,
      COMPONENT_CONFIG.buttonGroup,
      FL_BUTTON_GROUP_DEFAULT_CONFIG
    );
  }
}
</script>

<style lang="scss">
@import 'src/core/styles/export.scss';
@import './__styles__/operation.scss';

@include b(fl-button-group) {
  padding: 20px 20px 10px;
  @include layout();
  @include when(align-left) {
    @include layout-align(start, start);
  }
  @include when(align-mid) {
    @include layout-align(start, center);
  }
  @include when(align-right) {
    @include layout-align(start, end);
  }
}
</style>
