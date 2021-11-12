import { DeleteFunc } from '@/core/funcs/delete.func';
import { FlButtonGroupAdapter } from '@/core/components/functional/button-group/src/FlButtonGroup.adapter';
import { CompGridAdapter } from '@/core/components/customize/grid/src/CompGrid.adapter';
import { TheRoleManagementApi } from './TheRoleManagement.api';
import { CompAddEditDialogAdapter } from '@/core/components/customize/add-edit-dialog/src/CompAddEditDialog.adapter';
import { Component } from 'vue-property-decorator';
import ViewFactory from '@/core/factory/view.factory';
import { COMPONENT_METHOD, COMPONENT_DATA } from '@/core/dtos/factories.dto';
import { CompSearchAdapter } from '@/core/components/customize/search/src/CompSearch.adapter';

@Component({})
export class TheRoleManagementConfig extends ViewFactory {
  COMPONENT_METHOD = COMPONENT_METHOD;
  COMPONENT_DATA = COMPONENT_DATA;
  addEditDialogConfig: CompAddEditDialogAdapter = {
    addApi: () => {},
    editApi: TheRoleManagementApi.depart,
    addTitle: '',
    editTitle: '分管部门',
    dialog: {
      width: '600px',
      buttons: [{ tag: 'close' }]
    },
    handleEditParam: (data: any) => {
      data.ChargeDep = data.ChargeDep.join(',');
      console.log(data);
      return data;
    },
    form: {
      itemWidth: '100%',
      labelWidth: '100px',
      formItems: [
        {
          label: '分管部门',
          modelName: 'ChargeDep',
          rule: 'required',
          type: 'select',
          selectConfig: {
            multiple: true,
            filterable: true,
            options: {
              api: TheRoleManagementApi.getDepart,
              immediate: true,
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
    formModel: {
      ChargeDep: []
    }
  };
  searchConfig: CompSearchAdapter = {
    form: {
      formItems: [
        {
          label: '角色名称',
          modelName: 'keyword',
          inputConfig: {
            placeholder: '请输入角色名称',
            clearable: true
          }
        }
      ]
    },
    formModel: {}
  };
  buttonGroupConfig: FlButtonGroupAdapter = {
    styles: ['operation'],
    buttons: [
      {
        text: '新 增',
        type: 'primary',
        permissionName: '',
        icon: 'el-icon-plus',
        on: {
          click: () => {
            this.emit(this.COMPONENT_METHOD.dialogOpen, { type: 'add' });
          }
        }
      }
    ]
  };
  gridConfig: CompGridAdapter = {
    table: {
      showNo: true,
      data: {
        api: TheRoleManagementApi.list,
        immediate: true,
        handleData: (data) => {
          return data;
        }
      },
      columns: [
        {
          label: '角色名称',
          prop: 'IdKey'
        },
        {
          label: '别名',
          prop: 'IdName'
        },
        {
          label: '操作',
          columnType: 'button',
          buttonConfig: {
            buttons: [
              {
                text: '编辑',
                type: 'primary',
                permissionName: '',
                onClick: ({ row }) => {
                  this.emit(this.COMPONENT_METHOD.dialogOpen, {
                    type: 'edit',
                    payload: row,
                    requiredKeys: ['Id']
                  });
                }
              },
              {
                text: '分管部门',
                permissionName: '',
                type: 'primary',
                onClick: async ({ row }) => {
                  this.emit(this.COMPONENT_METHOD.addEditDialogOpen, {
                    type: 'edit',
                    payload: {
                      Id: row.Id,
                      ChargeDep: row.ChargeDep ? row.ChargeDep.split(',') : []
                    },
                    requiredKeys: ['Id']
                  });
                }
              },
              {
                text: '删除',
                permissionName: '',
                type: 'primary',
                onClick: async ({ row }) => {
                  const res = await new DeleteFunc({
                    api: TheRoleManagementApi.delete,
                    apiParam: { id: row.Id }
                  }).delete();
                  if (res) this.emit(this.COMPONENT_METHOD.gridUpdate);
                }
              }
            ]
          }
        }
      ]
    }
  };
}
