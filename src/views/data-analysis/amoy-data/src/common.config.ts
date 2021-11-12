import { Component } from 'vue-property-decorator';
import ViewFactory from '@/core/factory/view.factory';
import echarts from 'echarts';
import { TheAmoyDataApi } from './TheAmoyData.api';

const option: any = {
  legend: {
    bottom: 10,
    align: 'left',
    icon: 'circle', //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none
    itemWidth: 10, // 设置宽度
    itemHeight: 10, // 设置高度
    itemGap: 12, // 设置间距
    textStyle: {
      color: '#000',
      fontSize: 12
    }
  },
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 1,
      minValueSpan: 15,
      zoomLock: true
    }
  ],
  grid: {
    top: '50px',
    left: '15px',
    right: 0,
    bottom: '40px',
    containLabel: true
  },
  dataset: {
    source: []
  },
  xAxis: { type: 'category', axisLabel: { rotate: 40, interval: 0 } },
  yAxis: {
    name: '单位 (千万)'
  },
  color: [
    '#476BB3',
    '#6B996B',
    '#B3B348',
    '#8585CC',
    '#7AB9CC',
    '#99855C',
    '#193B80',
    '#B36BB3',
    '#29A0CC',
    '#377F8D',
    '#2F979D',
    '#B35A86'
  ],
  series: []
};

@Component({})
export class CommonConfig extends ViewFactory {
  level = Number(this.$route.query.level) - 1;
}
