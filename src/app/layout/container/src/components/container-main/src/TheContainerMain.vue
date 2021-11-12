<template>
  <div class="the-container-main">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { TheContainerMainConfig } from './TheContainerMain.config';

@Component({})
export default class TheContainerMain extends Mixins(TheContainerMainConfig) {}
</script>

<style lang="scss">
@import 'src/core/styles/export.scss';

@include b(the-container-main) {
  width: 100%;
  height: 100%;
  border: 20px solid $defaultBg;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
}
</style>
