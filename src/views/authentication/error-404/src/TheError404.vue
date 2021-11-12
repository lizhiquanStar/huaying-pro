<template>
  <div class="the-error-404">
    <div class="the-error-404__container">
      <img :src="errorImage" />
      <div class="the-error-404__content">
        <p class="title">404</p>
        <p class="desc">抱歉，你访问的页面不存在</p>
        <co-button type="primary" size="small" @click="goToHome"
          >返 回</co-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { TheError404Config } from './TheError404.config';
import errorImage from '@/assets/images/component/error404.png';

@Component({})
export default class TheError404 extends Mixins(TheError404Config) {
  errorImage = errorImage;

  get token() {
    return this.$store.state.user.access_token;
  }
  get home() {
    return this.$store.state.user.home || '';
  }

  goToHome() {
    if (this.home) {
      this.$router.push(this.home);
    } else {
      this.$router.push('/login');
    }
  }
}
</script>

<style lang="scss">
@import 'src/core/styles/export.scss';

@include b(the-error-404) {
  width: 100%;
  height: 100%;
  background: #f0f2f5;
  @include layout();
  @include layout-align(center, center);

  @include e(container) {
    @include layout();
    @include layout-align(start, start);

    img {
      width: 194px;
      height: 196px;
      margin-right: 101px;
    }

    @include e(content) {
      @include layout(column);
      @include layout-align();

      .title {
        font-size: 64px;
        font-weight: 500;
        color: rgba(67, 78, 88, 1);
        margin-bottom: 23px;
        line-height: 1;
      }
      .desc {
        font-size: 21px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 1;
        margin-bottom: 25px;
      }
    }
  }
}
</style>
