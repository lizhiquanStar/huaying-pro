import { Component } from 'vue-property-decorator';
import echarts from 'echarts';
import { TheAmoyDataApi } from './TheAmoyData.api';
import { CommonConfig } from './common.config';
const sw = window.screen.availWidth;
const option = (level) => {
  return {
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
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: level > 5 ? 0.01 : level > 3 ? 0.4 : 1,
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
      name: `单位 (${level > 3 ? '百万' : '千万'})`
    },
    color: [
      '#52a217',
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
};

// 柱状图中折线图数据
const optionLine = (level) => {
  return {
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
        end: level > 5 ? 0.01 : level > 3 ? 0.4 : 1,
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
      name: `单位 (${level > 3 ? '百万' : '千万'})`
    },
    color: [
      '#52a217',
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
};


@Component({})
export class EchartConfig extends CommonConfig {
  dataEchart: echarts.ECharts | null = null;
  chartLoading = false;
  chartData: any = null;
  breads: any = [this.$route.query.name]; // 类目下钻

  async getChart(isNext?: boolean, name?: any) {
    this.chartLoading = true;
    const apiType = isNext ? 'lineListData' : 'chartData';
    const params: any = {
      level: this.level
    };
    if (isNext) {
      params.name = name;
    }
    const res = await TheAmoyDataApi[apiType](params);
    this.chartLoading = false;
    this.chartData = res || [];
    if (!res || !res.length) return;
    this.dataEchart && this.dataEchart.dispose();
    this.dataEchart = echarts.init(this.$refs.dataEchart as HTMLCanvasElement);
    const dataX = Array(res[0].length - 1).fill({
      type: 'bar',
      barWidth: 30,
      barGap: 30,
      label: {
        show: true,
        position: 'top',
        fontSize: 13,
        fontWeight: 'bold',
        color: '#131313'
      }
    });
    this.dataEchart.clear();
    this.dataEchart.off('click');
    const opt: any = option(this.$route.query.level);
    opt.dataset.source = res;
    opt.series = dataX;
    this.dataEchart.setOption(opt);
    const lev = this.breads.length + Number(this.$route.query.level) - 1;
    if (lev < 5) {
      (this.dataEchart as any).getZr().on('click', async (params) => {
        const pointInPixel = [params.offsetX, params.offsetY];
        if ((this.dataEchart as any).containPixel('grid', pointInPixel)) {
          const xIndex = (this.dataEchart as any).convertFromPixel({ seriesIndex: 0 }, [params.offsetX, params.offsetY])[0];
          const name = res[xIndex + 1][0];
          this.breads.push(name);
          this.level = lev - 1;
          this.getChart(true, name);
        }
      });
    } else {
      // this.$message('没有更多了~')
    }
  }
}
