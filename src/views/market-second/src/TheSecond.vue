<template>
  <div class="the-home" style="padding-top: 10px">
    <div class="body">
      <el-row :gutter="20" class="content">
        <el-col
          :span="8"
          v-for="(val, index) in data"
          :key="val.name"
          @click.native="handle(val)"
        >
          <i
            class="iconfont"
            :class="val.icon"
            :style="{ color: colors[index % 3] }"
          ></i>
          <p>{{ val.name }}</p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { MarketSecond } from './TheSecond.config';
import { TheHomeApi } from './TheSecond.api';
@Component({})
export default class TheSecond extends Mixins(MarketSecond) {
  data: any[] = [];
  colors = ['#5ab5be', '#4f87ee', '#ee8570', '#e6b251'];
  // 获取信息
  async getData() {
    const { type } = this.$route.query;
    const res = await TheHomeApi.getTaobaoData();
    if (!res) return;
    const industry =
      (type as string).split('-')[1] == 'market' ? 'market' : 'other';
    this.data = res[industry];
  }

  // 跳转
  handle(item: any) {
    const { type, name } = this.$route.query;
    this.$router.push({
      name: 'AmoyData',
      query: {
        channelType: item.type,
        level: item.level,
        type,
        pname: name,
        name: item.name
      }
    });
  }
  created() {
    this.getData();
  }
}
</script>

<style lang="scss">
@import 'src/core/styles/export.scss';
.el-notification__icon {
  color: #0088ff;
}
.the-container-main {
  position: relative;
}
@include b(the-home) {
  height: 100%;
  overflow: auto;
  background: #f0f2f5;
  .el-carousel {
    border-bottom: 16px solid $defaultBg;
  }
  .el-image {
    width: 100%;
  }
  .el-carousel__container,
  .el-carousel__item {
    height: 150px;
    width: 100%;
    border-radius: 20px;
  }
  .iconfont {
    font-size: 32px;
  }
  .el-col {
    text-align: center;
    margin-top: 20px;
    cursor: pointer;
    p {
      margin-top: 10px;
    }
  }
  .body {
    .content {
      border-radius: 2px;
      padding: 20px;
      background: #fff;
      border-bottom: 16px solid $defaultBg;
      h5 {
        font-size: 16px;
        color: #333333;
      }
    }
    .head {
      p {
        font-size: 14px;
        color: #333333;
        cursor: pointer;
        span {
          font-size: 18px;
          color: #ff0000;
          font-weight: bold;
          padding: 0 2px;
        }
      }
    }
  }
  span {
    width: auto;
    height: auto;
  }
}
@media screen and (max-width: 1024px) {
  @include b(the-home) {
    .el-carousel__container,
    .el-image,
    .el-carousel__item {
      border-radius: 0;
    }
  }
}
</style>
