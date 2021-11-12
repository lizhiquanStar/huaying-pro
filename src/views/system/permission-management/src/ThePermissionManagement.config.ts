import { DeleteFunc } from '@/core/funcs/delete.func';
import { FlButtonGroupAdapter } from '@/core/components/functional/button-group/src/FlButtonGroup.adapter';
import { CompGridAdapter } from '@/core/components/customize/grid/src/CompGrid.adapter';
import { CompAddEditDialogAdapter } from '@/core/components/customize/add-edit-dialog/src/CompAddEditDialog.adapter';
import { ThePermissionManagementApi } from './ThePermissionManagement.api';
import { Component } from 'vue-property-decorator';
import ViewFactory from '@/core/factory/view.factory';
import { COMPONENT_METHOD, COMPONENT_DATA } from '@/core/dtos/factories.dto.ts';
import { FormItem } from '@/core/decorators/form-item.decorator';

export function handleDenpenentListToTree(
  list: { [k: string]: any }[],
  handleItem?: (item: { [k: string]: any }) => { [k: string]: any }
) {
  const handleFunc = handleItem || ((data) => data);
  const lv1Menus = list
    .filter((item) => !item.parentId || item.parentId === '0')
    .map(handleFunc);
  const leaveMenus = list.filter((item) => item.parentId);
  function findParentAndRemoveIt(list: any[], parentList: any[]) {
    const ids = parentList.map((parentItem) => parentItem.id);
    const leaveMenus = list.filter((item) => !ids.includes(item.parentId));
    parentList.forEach((parentItem) => {
      parentItem.children = list
        .filter((item) => item.parentId === parentItem.id)
        .map(handleFunc);
      if (parentItem.children.length && leaveMenus.length) {
        findParentAndRemoveIt(leaveMenus, parentItem.children);
      }
    });
  }
  findParentAndRemoveIt(leaveMenus, lv1Menus);
  return lv1Menus;
}

const FORM_PATH = 'addEditDialogConfig.form';

@Component({})
export class ThePermissionManagementConfig extends ViewFactory {
  COMPONENT_METHOD = COMPONENT_METHOD;
  COMPONENT_DATA = COMPONENT_DATA;

  @FormItem(FORM_PATH) menuType: any;
  @FormItem(FORM_PATH) url: any;
  @FormItem(FORM_PATH) path: any;
  @FormItem(FORM_PATH) icon: any;
  @FormItem(FORM_PATH) orderBy: any;
  @FormItem(FORM_PATH) perms: any;

  setMenuTypeOptions(disabledOptionValues: number[] = []) {
    this.menuType.selectConfig.options.forEach((i: any) => {
      i.disabled = disabledOptionValues.includes(i.value);
    });
  }

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
            const vm = this.getThis();
            vm.menuType.selectConfig.disabled = true;
            this.setMenuTypeOptions();
            vm.addEditDialogConfig.formModel.menuType = 0;
            this.emit(this.COMPONENT_METHOD.addEditDialogOpen);
          }
        }
      }
    ]
  };

  gridConfig: CompGridAdapter = {
    hiddenPagination: true,
    table: {
      rowKey: 'id',
      showNo: true,
      data: {
        api: ThePermissionManagementApi.all,
        handleEach: false,
        handleData(data) {
          return handleDenpenentListToTree(data, (item) => {
            switch (item.menuType) {
              case 0:
                item.menuTypeName = '一级菜单';
                break;
              case 1:
                item.menuTypeName = '子菜单';
                break;
              case 2:
                item.menuTypeName = '按钮/权限';
            }
            return item;
          });
        }
      },
      pagination: {
        enable: false
      },
      columns: [
        {
          label: '名称',
          prop: 'title'
        },
        {
          label: '菜单类型',
          prop: 'menuTypeName'
        },
        {
          label: '前端路由',
          prop: 'path'
        },
        {
          label: '权限编码',
          prop: 'perms'
        },
        {
          label: '后端地址',
          prop: 'url'
        },
        {
          label: '操作',
          columnType: 'button',
          buttonConfig: {
            handleEachButton(buttons, { row }) {
              return buttons.map((i) => {
                if (row.menuType === 2 && i.text === '添加子菜单')
                  i.disabled = true;
                return i;
              });
            },
            buttons: [
              {
                text: '编辑',
                type: 'primary',
                permissionName: '',
                onClick: ({ row }) => {
                  const vm = this.getThis();
                  vm.menuType.selectConfig.disabled = true;
                  this.setMenuTypeOptions();
                  vm.addEditDialogConfig.formModel.menuType = '';
                  this.emit(this.COMPONENT_METHOD.addEditDialogOpen, {
                    type: 'edit',
                    payload: row,
                    requiredKeys: ['id']
                  });
                }
              },
              {
                text: '添加子菜单',
                disabled: false,
                type: 'primary',
                permissionName: '',
                onClick: ({ row }) => {
                  const vm = this.getThis();
                  vm.menuType.selectConfig.disabled = false;
                  this.setMenuTypeOptions([0]);
                  vm.addEditDialogConfig.formModel.menuType = '';
                  this.emit(this.COMPONENT_METHOD.addEditDialogOpen, {
                    type: 'add',
                    payload: { parentId: row.id },
                    requiredKeys: ['parentId']
                  });
                }
              },
              {
                text: '删除',
                type: 'danger',
                permissionName: '',
                onClick: async ({ row }) => {
                  const res = await new DeleteFunc({
                    api: ThePermissionManagementApi.delete,
                    apiParam: { id: row.id }
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

  addEditDialogConfig: CompAddEditDialogAdapter = {
    addApi: ThePermissionManagementApi.add,
    editApi: ThePermissionManagementApi.edit,
    addTitle: '新增权限',
    editTitle: '编辑权限',
    dialog: {
      width: '800px',
      minWidth: '800px'
    },
    form: {
      itemWidth: '50%',
      labelWidth: '125px',
      formItems: [
        {
          label: '名称',
          modelName: 'title',
          rule: 'required'
        },
        {
          label: '菜单类型',
          modelName: 'menuType',
          rule: 'required',
          type: 'select',
          selectConfig: {
            on: {
              modelChange: (v) => {
                const vm = this.getThis();
                if (v && v === 2) {
                  vm.path.visible = false;
                  vm.url.visible = true;
                  vm.orderBy.visible = false;
                  vm.icon.visible = false;
                  vm.perms.visible = true;
                } else {
                  vm.path.visible = true;
                  vm.url.visible = false;
                  vm.orderBy.visible = true;
                  vm.icon.visible = true;
                  vm.perms.visible = false;
                }
              }
            },
            disabled: false,
            options: [
              {
                label: '一级菜单',
                value: 0,
                disabled: false
              },
              {
                label: '子菜单',
                value: 1,
                disabled: false
              },
              {
                label: '按钮权限',
                value: 2,
                disabled: false
              }
            ]
          }
        },
        {
          label: '前端路由',
          visible: true,
          modelName: 'path',
          rule: 'url'
        },
        {
          label: '后端地址',
          visible: true,
          modelName: 'url',
          rule: 'url'
        },
        {
          label: '菜单排序',
          visible: true,
          modelName: 'orderBy',
          inputConfig: {
            type: 'number'
          }
        },
        {
          label: '菜单图标',
          visible: true,
          modelName: 'icon',
          inputConfig: {
            placeholder: '多个类名空格分隔'
          }
        },
        {
          label: '权限编码',
          visible: false,
          modelName: 'perms',
          inputConfig: {
            placeholder: '多个用逗号分隔'
          }
        }
      ]
    },
    formModel: {
      title: '',
      url: '',
      path: '',
      menuType: '',
      icon: '',
      perms: '',
      orderBy: ''
    }
  };
}
