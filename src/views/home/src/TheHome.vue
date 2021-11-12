<template>
  <div class="the-home">
    <el-carousel indicator-position="none" :autoplay="false">
      <el-carousel-item>
        <el-image
          src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
        ></el-image>
      </el-carousel-item>
    </el-carousel>
    <div class="body">
      <div class="content" v-for="item in data" :key="item.type">
        <h5>{{ item.title }}</h5>
        <el-row :gutter="20">
          <el-col
            :span="8"
            v-for="(val, index) in item.value"
            :key="val.name"
            @click.native="handle(item.type, val)"
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
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { TheHomeConfig } from './TheHome.config';
import { TheHomeApi } from './TheHome.api';
@Component({})
export default class TheHome extends Mixins(TheHomeConfig) {
  data: any[] = [];
  colors = ['#5ab5be', '#4f87ee', '#ee8570', '#e6b251'];
  // 获取信息
  async getData() {
    const res = await TheHomeApi.getTaobaoData();
    if (!res) return;
    this.data = res;
  }

  // 跳转
  handle(type: string, item: any) {
    if (type == 'live-e-commerce') {
      window.location = item.url;
    } else {
      this.$router.push({
        name: type == 'online' ? 'MarketSecond' : 'AmoyData',
        query: {
          ptype: type,
          type: item.type,
          level: item.level,
          name: item.name
        }
      });
    }
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
