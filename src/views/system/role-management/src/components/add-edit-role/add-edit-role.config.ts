import { Component } from 'vue-property-decorator';
import UIComponentFactory from '@/core/factory/component-ui.factory';
import { COMPONENT_METHOD, COMPONENT_DATA } from '@/core/dtos/factories.dto.ts';
import { CompFormAdapter } from '@/core/components/customize/form/src/CompForm.adapter';
import { CompDialogAdapter } from '@/core/components/customize/dialog/src/CompDialog.adapter';
import { CompGridAdapter } from '@/core/components/customize/grid/src/CompGrid.adapter';
import { BsRoleManagementAddEditRoleApi } from './add-edit-role.api';
import { CompTabsAdapter } from '@/core/components/customize/tabs/src/CompTabs.adapter';

@Component({})
export class BsAddEditRoleConfig extends UIComponentFactory {
  COMPONENT_METHOD = COMPONENT_METHOD;
  COMPONENT_DATA = COMPONENT_DATA;
  type: string | undefined = '';
  onOpen(data: any) {
    this.type = data.type;
    if (data.type == 'edit') {
      (this.dialogConfig.dialog as any).title = '编辑角色';
      this.formConfig.formModel.IdKey = data.payload.IdKey;
      this.formConfig.formModel.Id = data.payload.Id;
      (this.gridConfig.table.data as any).params = { id: data.payload.Id };
      this.$nextTick(() => {
        this.emit(this.COMPONENT_METHOD.gridUpdate, {}, 'dataGrid');
      });
    } else {
      (this.dialogConfig.dialog as any).title = '新增角色';
      this.formConfig.formModel.IdKey = '';
      this.formConfig.formModel.Id = '';
      (this.gridConfig.table.data as any).params = {};
      this.$nextTick(() => {
        this.emit(this.COMPONENT_METHOD.gridUpdate, {}, 'dataGrid');
      });
    }
  }
  //全选
  handleAll(row: any) {
    const all: any = [];
    row.children.map((item: any) => {
      all.push(item.Id);
    });
    row.CheckList = row.Checked ? all : [];
  }
  //单选
  handleSingle(row: any) {
    const checkedCount = row.CheckList.length;
    row.Checked = checkedCount === row.children.length;
  }

  tabsConfig: CompTabsAdapter = {
    tabs: {
      type: 'card',
      model: 'dataPerm',
      tabPanes: [
        {
          label: '数据权限',
          name: 'dataPerm',
          slot: 'dataPerm'
        }
      ]
    }
  };
  formConfig: CompFormAdapter = {
    form: {
      itemWidth: '50%',
      formItems: [
        {
          label: '角色名称',
          modelName: 'IdKey',
          rule: 'required'
        },
        {
          label: '功能权限',
          modelName: 'funcPerm',
          rule: 'required',
          type: 'treeSelect',
          treeSelectConfig: {
            label: '',
            valueKey: 'Id',
            input: {
              clearable: true,
              readonly: false
            },
            tree: {
              data: {
                api: BsRoleManagementAddEditRoleApi.list,
                params: {},
                handleData: (data) => {
                  return data.Powers;
                }
              },
              nodeKey: 'Id',
              showCheckbox: true,
              props: {
                label: 'Name',
                children: 'children'
              }
            }
          }
        }
      ]
    },
    formModel: {
      IdKey: '',
      Id: ''
    },
    on: {
      validated: async (result: boolean) => {
        if (result) {
          const vm = this.getThis();
          // 数据权限
          const permData: any = [];
          const dataPerm = (vm.gridConfig.table.data as any).data;
          dataPerm.map((item: any) => {
            if (item.CheckList && item.CheckList.length > 0) {
              permData.push(item.CheckList);
            }
          });
          //功能权限
          const funcData: any = [];
          const funcPerm: any = vm.funcConfig.table.data || [];
          funcPerm.map((item: any) => {
            if (item.CheckList && item.CheckList.length > 0) {
              funcData.push(item.CheckList.join(','));
            }
          });
          const params: any = {
            IdKey: vm.formConfig.formModel.IdKey,
            DataPowerIds: permData.join(','),
            PowerIds: funcData.join(',')
          };
          if (vm.type == 'edit') {
            params.Id = vm.formConfig.formModel.Id;
            const res1: any = await BsRoleManagementAddEditRoleApi.edit(params);
            if (!res1) return;
            this.$message.success('编辑成功');
            this.emit(this.COMPONENT_METHOD.dialogClose);
            this.emit(this.COMPONENT_METHOD.gridUpdate);
          } else {
            const res: any = await BsRoleManagementAddEditRoleApi.add(params);
            if (!res) return;
            this.$message.success('新增成功');
            this.emit(this.COMPONENT_METHOD.dialogClose);
            this.emit(this.COMPONENT_METHOD.gridUpdate);
          }
        }
      }
    }
  };
  dialogConfig: CompDialogAdapter = {
    dialog: {
      title: '新增角色',
      width: '1010px',
      height: '600px',
      on: {
        submit: (data: any) => {
          this.emit(this.COMPONENT_METHOD.formValidate, {});
        }
      }
    }
  };

  gridConfig: CompGridAdapter = {
    name: 'dataGrid',
    table: {
      showSelection: false,
      showNo: false,
      data: {
        api: BsRoleManagementAddEditRoleApi.list,
        params: {},
        immediate: false,
        handleData: (data) => {
          const vm = this.getThis();
          vm.funcConfig.table.data = data.Powers;
          data.DataPowers.map((item: any) => {
            item.CheckList =
              item.CheckList.length > 0 ? item.CheckList.join(',') : '';
          });
          return data.DataPowers;
        }
      },
      pagination: {
        enable: false
      },
      hiddenPagination: true,
      columns: [
        {
          prop: 'Name',
          label: '菜单名称',
          width: '180px'
        },
        {
          prop: 'Menu',
          label: '数据权限',
          columnType: 'slot',
          slotConfig: {
            slot: 'required'
          }
        }
      ]
    }
  };

  funcConfig: CompGridAdapter = {
    name: 'funcGrid',
    table: {
      showSelection: false,
      showNo: false,
      data: [],
      hiddenPagination: true,
      pagination: {
        enable: false
      },
      columns: [
        {
          prop: 'Name',
          label: '菜单名称',
          width: '180px'
        },
        {
          prop: 'checkbox',
          label: '全选',
          width: '50px',
          columnType: 'slot',
          slotConfig: {
            slot: 'checkBox'
          }
        },
        {
          prop: 'Menu',
          label: '功能权限',
          columnType: 'slot',
          slotConfig: {
            slot: 'required'
          }
        }
      ]
    }
  };
}
