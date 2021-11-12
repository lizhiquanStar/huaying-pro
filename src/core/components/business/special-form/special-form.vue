<template>
  <div class="bs-special-form">
    SpecialForm Working!
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { BsSpecialFormConfig } from './special-form.config';

@Component({})
export default class BsSpecialForm extends Mixins(BsSpecialFormConfig) {}
</script>

<style lang="scss">
@import 'src/core/styles/export.scss';

@include b(bs-special-form) {
}
</style>
