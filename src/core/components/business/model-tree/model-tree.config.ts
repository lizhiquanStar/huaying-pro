import { Component } from 'vue-property-decorator';
import UIComponentFactory from '@/core/factory/component-ui.factory';
import { COMPONENT_METHOD, COMPONENT_DATA } from '@/core/dtos/factories.dto';
import { CompTreeAdapter } from '../../customize/tree/src/CompTree.adapter';
import { CompAddEditDialogAdapter } from '@/core/dtos/adapter.dto';
import { BsModelTreeApi } from './model-tree.api';
import { eventBus } from '@/core/utils/vue/event-bus';
import { API_CONFIG } from '@/config/http.config';
import { FormItem } from '@/core/decorators/form-item.decorator';
@Component({})
export class BsModelTreeConfig extends UIComponentFactory {
  COMPONENT_METHOD = COMPONENT_METHOD;
  COMPONENT_DATA = COMPONENT_DATA;
  @FormItem('addEditDialogConfig.form') FilePath: any;

  treeLength = 0; //
  showTreeId: any; //缓存的树ID
  currentId: any; // 当前树
  currentCode: any; //
  showAuto = 1; // 处理设置自动审核 1设置 2保存 取消
  currentTreeName = ''; // 当前选中的树名称
  loadingTree = false;
  deviceMessage = ''; // 审核模型文案

  get paramModelId() {
    // 搜索跳转来的时候可能会带modelId
    return this.$route.params.modelId || '';
  }
  get paramModelCode() {
    // 搜索跳转来的时候可能会带modelCode
    return this.$route.params.modelCode || '';
  }

  get paramModelAudit() {
    // 搜索跳转来的时候可能会带isAutoAudit
    return this.$route.params.isAutoAudit || '';
  }
  // 新增部门
  add() {
    this.emit(
      this.COMPONENT_METHOD.addEditDialogOpen,
      {
        type: 'add',
        payload: {}
      },
      'department'
    );
  }
  // 编辑部门
  edit(data: any) {
    this.emit(
      this.COMPONENT_METHOD.addEditDialogOpen,
      {
        type: 'edit',
        payload: data,
        requiredKeys: ['Id']
      },
      'department'
    );
  }
  // 删除
  async del(id: string) {
    this.$confirm('确定删除该部门吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      callback: async (res: any) => {
        if (res == 'confirm') {
          const res = await BsModelTreeApi.del({ id: id });
          if (!res) return;
          this.$message.success('删除成功');
          this.getTreeList();
          this.emit(this.COMPONENT_METHOD.gridUpdate);
        }
      }
    });
  }
  mounted() {
    this.getTreeList();
    this.FilePath.uploadConfig.headers = {
      Authorization: 'bearer ' + this.$store.state.user.token
    };
  }
  // 树形列表
  async getTreeList() {
    this.loadingTree = true;
    const res: any = await BsModelTreeApi.treeList();
    this.loadingTree = false;
    if (!res || !res[0]) return;
    const vm = this.getThis();
    vm.treeLength = res.length;
    const id: any = this.paramModelId || this.$store.state.user.IdBm || ''; // 当前树第一个ID
    const code: any = this.paramModelCode || res[0].code; // 当前树第一个ID
    const ref = this.treeConfig.tree.ref;
    const showTreeId = vm.showTreeId || id;
    setTimeout(() => {
      if (showTreeId) ref!.setCurrentKey(showTreeId);
      this.treeConfig.tree.defaultExpandedKeys = ['0']; // 默认展开的节点
    }, 0);
    vm.currentTreeName = res[0].Name;
    vm.currentId = id;
    eventBus.$emit('modelIdChange', showTreeId, code, vm.currentTreeName, res); // 处理接口地址动态变化
    this.treeConfig.tree.data = [
      // @ts-ignore
      { Id: '', Name: '浙江广安科贸有限公司', children: res }
    ];
  }
  treeConfig: CompTreeAdapter = {
    name: 'moduleTree',
    tree: {
      ref: null,
      nodeKey: 'Id',
      showCheckbox: false,
      defaultExpandAll: true,
      expandOnClickNode: false,
      props: {
        label: 'Name',
        children: 'children'
      },
      filterNodeMethod: (value, data: any) => {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      data: {
        api: BsModelTreeApi.treeList
      },
      on: {
        nodeClick: (node: any) => {
          // if (node.Id == 0) return;
          const vm = this.getThis();
          vm.currentId = node.Id; // 获取当前的树ID，便于新增，删除拿去ID
          vm.showTreeId = node.Id;
          vm.currentCode = node.code;
          vm.currentTreeName = node.Name;
          vm.$emit('sendId', node.Id, node.code, node.Name);
          eventBus.$emit('modelIdChange', node.Id, node.code, node.Name);
          console.log(9);
        }
      }
    }
  };
  addEditDialogConfig: CompAddEditDialogAdapter = {
    name: 'department',
    addApi: BsModelTreeApi.add,
    editApi: BsModelTreeApi.add,
    addTitle: '新增部门',
    editTitle: '编辑部门',
    dialog: {
      width: '500px'
    },
    on: {
      success: () => {
        this.getTreeList();
      }
    },
    form: {
      itemWidth: '100%',
      labelWidth: '100px',
      formItems: [
        {
          label: '部门名称',
          rule: 'required',
          modelName: 'Name',
          inputConfig: {
            maxlength: 6,
            showWordLimit: true
          }
        },
        {
          label: '部门图标',
          modelName: 'FilePath',
          rule: 'required',
          type: 'upload',
          uploadConfig: {
            type: 'image',
            limit: 1,
            action: API_CONFIG.apiPrefixUrl + '/ChatMessage/UploadFile',
            accept: '.jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF',
            getModelByRes: (res, config, oldModel) => {
              const vm = this.getThis();
              if (res.code !== API_CONFIG.successCode) {
                vm.$message.error(res.message || '上传失败');
                return '';
              }
              return res.data;
            },
            getUploadsByModel(model) {
              return [
                {
                  id: model,
                  url: model,
                  name: model
                }
              ];
            }
          }
        }
      ]
    },
    formModel: {
      Name: '',
      FilePath: ''
    }
  };
}
