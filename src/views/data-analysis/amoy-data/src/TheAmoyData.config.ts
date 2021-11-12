import { Component } from 'vue-property-decorator';
import { CompTabsAdapter } from '@/core/components/customize/tabs/src/CompTabs.adapter';
import { PaginationAdapter } from '@/core/components/base/pagination/src/BasePagination.adapter';
import { TheAmoyDataApi } from './TheAmoyData.api';
import { CompSearchAdapter } from '@/core/components/customize/search/src/CompSearch.adapter';
import { currentTableColumn } from './table.column.config';
import { CommonConfig } from './common.config';
@Component({})
export class TheAmoyDataConfig extends CommonConfig {
  loading = false;
  limit = 10;
  currentPage = 1;
  month = '';
  type = this.$route.query.type;
  channelType = this.$route.query.channelType;
  monthOptions = [
    '',
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月'
  ];
  tableColumn = currentTableColumn(this.type, this.$route.query.level, this.channelType);

  // 通用行合并函数（将相同多列数据合并为一行）
  // @ts-ignore
  rowspanMethod({ row, _rowIndex, column, visibleData }) {
    if (this.type != 'online-market') return;
    const fields = ['parentName0', 'parentName1', 'parentName2', 'parentName3'];
    const cellValue = row[column.property];
    if (cellValue && fields.includes(column.property)) {
      const prevRow = visibleData[_rowIndex - 1];
      let nextRow = visibleData[_rowIndex + 1];
      if (prevRow && prevRow[column.property] === cellValue) {
        return { rowspan: 0, colspan: 0 };
      } else {
        let countRowspan = 1;
        while (nextRow && nextRow[column.property] === cellValue) {
          nextRow = visibleData[++countRowspan + _rowIndex];
        }
        if (countRowspan > 1) {
          return { rowspan: countRowspan, colspan: 1 };
        }
      }
    }
  }

  async getTableData() {
    let list: any = [];
    this.loading = true;
    // ptype: online, underline
    // type: online-market online-personalCare online-foodDrink online-makeups online-babyToys online-pet online-home  online-houseDevice online-other
    // type: underline-repast underline-retail underline-other
    const { type, pname, name } = this.$route.query;
    const ptype = (type as string).split('-')[0];
    const sort = type == 'online-market' ? 'static_date' : ptype == 'online' ? 'month' : 'date';
    const comParam = {
      limit: this.limit,
      page: this.currentPage,
      month: this.month || '',
      order: 'desc',
      sort
    };
    let params = {};
    let apiType = '';
    if (ptype == 'online') {
      apiType = type == 'online-market' ? 'online-market' : 'online-other';
    } else {
      apiType = type as string;
    }

    if (type == 'online-market' && ptype == 'online') {
      params = {
        level: this.level,
        parentName: ''
      };
    } else if (ptype == 'online') {
      params = {
        hyType: pname || '',
        qdType: name || ''
      };
    }

    const apiParams = {
      ...comParam,
      ...params
    };
    const res = await TheAmoyDataApi.list(apiType, apiParams);
    if (!res) {
      this.loading = false;
      return;
    }
    this.paginationConfig.total = res.total;
    
    list = res.list || [];
    for (let i = 0; i < res.list.length; i++){
      const list = res.list.map(x => {
        if (x.tsjZengsu == 'tsjZengsu') {
          return x+'%'
        }
        return x;
      })
    }
    // list = res.list || [];

    if (this.$refs.xTable) {
      await (this.$refs.xTable as any).reloadData(list);
    }
    this.loading = false;
  }

  async getTab() {
    this.loading = true;
    const res = await TheAmoyDataApi.month();
    if (!res) return;
    const list = res || [];
    this.tabConfig.tabs.tabPanes = list.map((item) => {
      return { label: `${item}月数据汇总`, name: item };
    });
    this.month = list[0];
    this.tabConfig.tabs.model = list[0];
  }

  changeSelect() {
    this.currentPage = 1;
    this.getTableData();
  }

  tabConfig: CompTabsAdapter = {
    tabs: {
      model: '',
      tabPanes: [],
      on: {
        tabClick: (res) => {
          const vm = this.getThis();
          vm.month = res.name;
          vm.currentPage = 1;
          this.getTableData();
        }
      }
    }
  };

  paginationConfig: PaginationAdapter = {
    total: 0,
    layout: 'total, prev, pager, next',
    background: true,
    on: {
      sizeChange: (item) => {
        const vm = this.getThis();
        vm.limit = item;
        this.getTableData();
      },
      currentChange: (item) => {
        const vm = this.getThis();
        vm.currentPage = item;
        this.getTableData();
      },
      prevClick: (item) => {
        console.log(item);
      },
      nextClick: (item) => {
        console.log(item);
      }
    }
  };

  searchConfig: CompSearchAdapter = {
    form: {
      formItems: [
        {
          label: '一级类目',
          modelName: 'name',
          type: 'select',
          selectConfig: {
            options: {
              api: TheAmoyDataApi.list,
              handleData(data) {
                if (!data) return [];
                return data.map((i: any) => {
                  return {
                    label: i.Name,
                    value: i.Id
                  };
                });
              }
            }
          }
        },
        {
          label: '二级类目',
          modelName: 'name',
          type: 'select',
          selectConfig: {
            options: {
              api: TheAmoyDataApi.list,
              handleData(data) {
                if (!data) return [];
                return data.map((i: any) => {
                  return {
                    label: i.Name,
                    value: i.Id
                  };
                });
              }
            }
          }
        }
      ]
    },
    on: {
      search: () => {
        const vm = this.getThis();
        vm.currentPage = 1;
        console.log(vm.searchConfig.formModel);
      }
    },
    formModel: {}
  };
}
