<template>
  <div
    class="layout-div"
    :class="{
      'is-row': direction === 'row',
      'is-column': direction === 'column',
      'is-wrap': wrap,
      'is-nowrap': !wrap
    }"
    :style="{
      alignItems: alignFormatVaule[0],
      alignContent: alignFormatVaule[0],
      justifyContent: alignFormatVaule[1]
    }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class LayoutDiv extends Vue {
  @Prop({ type: String, default: 'row' })
  direction!: 'column' | 'row';

  @Prop({ type: String, default: 'start start' })
  align!: string;

  @Prop({ type: Boolean, default: true })
  wrap!: boolean;

  get alignFormatVaule() {
    const alignArr = this.align.split(' ');
    return alignArr.map((s) => {
      let res = '';
      switch (s) {
        case 'start':
          res = 'flex-start';
          break;
        case 'end':
          res = 'flex-end';
          break;
        case 'between':
          res = 'space-between';
          break;
        case 'around':
          res = 'space-around';
          break;
        default:
          res = s;
      }
      return res;
    });
  }
}
</script>

<style lang="scss">
@import 'src/core/styles/export.scss';

@include b(layout-div) {
  display: flex;
  box-sizing: border-box;

  @include when(row) {
    flex-direction: row;
  }
  @include when(column) {
    flex-direction: column;
  }
  @include when(wrap) {
    flex-wrap: wrap;
  }
  @include when(nowrap) {
    flex-wrap: nowrap;
  }
}
</style>
