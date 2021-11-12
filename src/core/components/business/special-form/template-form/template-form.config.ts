import { BsTemplateFormApi } from './template-form.api';
import { CompAddEditDialogAdapter } from './../../../customize/add-edit-dialog/src/CompAddEditDialog.adapter';
import { FormItem } from '@/core/decorators/form-item.decorator';
import { Component } from 'vue-property-decorator';
import UIComponentFactory from '@/core/factory/component-ui.factory';
import { COMPONENT_METHOD, COMPONENT_DATA } from '@/core/dtos/factories.dto.ts';

@Component({})
export class BsTemplateFormConfig extends UIComponentFactory {
  COMPONENT_METHOD = COMPONENT_METHOD;
  COMPONENT_DATA = COMPONENT_DATA;

  @FormItem('addEditDialogConfig.form') BusinessFormID: any;
  @FormItem('addEditDialogConfig.form') Suggest: any;
  orderStatus = 0;
  isShow = false;
  dataList = {
    bmlist: [],
    allFormList: []
  };
  auditList: any[] = [];
  lookList: any[] = [];
  // 特殊表单Url
  dataChild: any = {};
  url: any = '';
  FormType: any = '';
  // 通用模板html
  content: any = '';
  // 获取用户信息
  get user() {
    return this.$store.state.user;
  }
  // 我的签单字段
  dialogVisibleSignOnly = false;
  chuchaName: any = {};
  isChucha = false;

  // 审核查询
  async getAuditLook(row: any) {
    const vm = this.getThis();
    let res: any = {};
    vm.addEditDialogConfig.formModel.Id = row.id;
    // 对应出差申请单
    if (row.FormTempName === '员工出差报告') {
      const res = await BsTemplateFormApi.GetMyBusinessList({
        userId: row.CREATE_BY
      });
      if (!res) return;
      if (row.route === 'sign') {
        this.chuchaName = res.find((item: any) => {
          if (item.key === row.BusinessFormID) {
            return item.value;
          }
        });
        this.isChucha = true;
      } else {
        const parkNameList: any[] = [];
        res.map((item: any, index: number) => {
          parkNameList.push({ label: item.value, value: item.key });
        });
        vm.BusinessFormID.selectConfig!.options = parkNameList;
        vm.BusinessFormID.visible = true;
      }
    } else {
      if (row.route === 'sign') {
        this.isChucha = false;
      } else {
        vm.BusinessFormID.visible = false;
      }
    }
    if (row.FormType === 1) {
      if (row.Url === '1') {
        res = await BsTemplateFormApi.getBusiness({
          id: row.ExampleId
        });
        res.Carcost = res.Carcost === 0 ? null : res.Carcost;
        res.Sleepcost = res.Sleepcost === 0 ? null : res.Sleepcost;
        res.Eatcost = res.Eatcost === 0 ? null : res.Eatcost;
        res.Totalcost = res.Totalcost === 0 ? null : res.Totalcost;
      } else if (row.Url === '2') {
        res = await BsTemplateFormApi.getOvertimeForm({
          id: row.ExampleId
        });
      } else if (row.Url === '3') {
        res = await BsTemplateFormApi.getYearLeave({
          id: row.ExampleId
        });
      } else if (row.Url === '4') {
        res = await BsTemplateFormApi.getSickLeave({
          id: row.ExampleId
        });
      } else if (row.Url === '5') {
        res = await BsTemplateFormApi.getmSickLeaveMore({
          id: row.ExampleId
        });
      } else if (row.Url === '6') {
        res = await BsTemplateFormApi.getLeaveForm({
          id: row.ExampleId
        });
      } else if (row.Url === '7') {
        res = await BsTemplateFormApi.getLeaveMore({
          id: row.ExampleId
        });
      } else if (row.Url === '8') {
        res = await BsTemplateFormApi.getLeaveFew({
          id: row.ExampleId
        });
      } else if (row.Url === '9') {
        res = await BsTemplateFormApi.getBreakOff({
          id: row.ExampleId
        });
      } else if (row.Url === '10') {
        res = await BsTemplateFormApi.getBreakOffMore({
          id: row.ExampleId
        });
      }
    } else if (row.FormType === 0) {
      res.content = vm.content = row.Content;
      vm.addEditDialogConfig.formModel.BusinessFormID = row.BusinessFormID;
    }
    if (!res) return;
    console.log(res);
    const otherForm = { ...res };
    otherForm.url = row.Url;
    vm.dataChild = otherForm;
    vm.url = row.Url;
    vm.FormType = row.FormType;
    if (row.route === 'sign') {
      vm.dialogVisibleSignOnly = true;
    } else {
      this.emit(
        this.COMPONENT_METHOD.addEditDialogOpen,
        { type: 'edit' },
        'complateForm'
      );
    }
    // 显示审核数据
    if (row.FlowStartId) {
      const res1 = await BsTemplateFormApi.getAuditInfo({
        id: row.FlowStartId
      });
      if (!res1) return;
      this.isShow = true;
      this.auditList = res1.AuditList;
      this.lookList = res1.LookList;
      this.orderStatus = res1.Active;
    } else {
      this.isShow = false;
    }
    // 是否展示意见
    if (row.StateName === '未批示') {
      vm.Suggest.visible = true;
      vm.addEditDialogConfig.editTitle = '审核签单';
      (vm.addEditDialogConfig.dialog as any).footerButtons[0].visable = true;
      (vm.addEditDialogConfig.dialog as any).footerButtons[1].visable = true;
    } else if (row.StateName === '已批示') {
      vm.Suggest.visible = false;
      vm.addEditDialogConfig.editTitle = '查看签单';
      (vm.addEditDialogConfig.dialog as any).footerButtons[0].visable = false;
      (vm.addEditDialogConfig.dialog as any).footerButtons[1].visable = false;
    } else if (row.StateName === '未查阅') {
      vm.Suggest.visible = false;
      (vm.addEditDialogConfig.dialog as any).footerButtons[2].visable = true;
      vm.addEditDialogConfig.editTitle = '查阅';
    } else if (row.StateName === '已查阅') {
      vm.Suggest.visible = false;
      (vm.addEditDialogConfig.dialog as any).footerButtons[2].visable = false;
      vm.addEditDialogConfig.editTitle = '查阅';
    } else {
      vm.Suggest.visible = false;
      (vm.addEditDialogConfig.dialog as any).footerButtons[0].visable = false;
      (vm.addEditDialogConfig.dialog as any).footerButtons[1].visable = false;
      (vm.addEditDialogConfig.dialog as any).footerButtons[2].visable = false;
    }
  }

  addEditDialogConfig: CompAddEditDialogAdapter = {
    name: 'complateForm',
    addApi: () => {},
    editApi: () => {},
    addTitle: '',
    editTitle: '查看签单',
    dialog: {
      width: '60%',
      minWidth: '800px',
      on: {
        close: () => {
          const vm = this.getThis();
          vm.$emit('clearRow');
          this.emit(
            this.COMPONENT_METHOD.addEditDialogClose,
            undefined,
            'complateForm'
          );
        }
      },
      footerButtons: [
        {
          tag: 'submit',
          text: '同意',
          visable: false,
          on: {
            click: async () => {
              const vm = this.getThis();
              const formModel = vm.addEditDialogConfig.formModel;
              console.log(formModel);
              const res = await BsTemplateFormApi.access({
                Id: formModel.Id,
                Suggest: formModel.Suggest
              });
              if (!res) return;
              this.emit(
                this.COMPONENT_METHOD.addEditDialogClose,
                undefined,
                'complateForm'
              );
              this.emit(
                this.COMPONENT_METHOD.gridUpdate,
                {},
                'auditGridConfig'
              );
            }
          }
        },
        {
          tag: 'submit',
          text: '不同意',
          visable: false,
          on: {
            click: async () => {
              const vm = this.getThis();
              const formModel = vm.addEditDialogConfig.formModel;
              console.log(formModel);
              const res = await BsTemplateFormApi.refuse({
                Id: formModel.Id,
                Suggest: formModel.Suggest
              });
              if (!res) return;
              this.emit(
                this.COMPONENT_METHOD.addEditDialogClose,
                undefined,
                'complateForm'
              );
              this.emit(
                this.COMPONENT_METHOD.gridUpdate,
                {},
                'auditGridConfig'
              );
            }
          }
        },
        {
          tag: 'submit',
          visable: false,
          on: {
            click: async () => {
              const vm = this.getThis();
              const formModel = vm.addEditDialogConfig.formModel;
              const res = await BsTemplateFormApi.ComfirmLook({
                Id: formModel.Id
              });
              if (!res) return;
              this.emit(
                this.COMPONENT_METHOD.addEditDialogClose,
                undefined,
                'complateForm'
              );
              this.emit(this.COMPONENT_METHOD.gridUpdate, {}, 'lookGridConfig');
            }
          }
        },
        {
          tag: 'close',
          on: {
            click: () => {
              const vm = this.getThis();
              vm.$emit('clearRow');
              this.emit(
                this.COMPONENT_METHOD.addEditDialogClose,
                undefined,
                'complateForm'
              );
            }
          }
        }
      ]
    },
    form: {
      itemWidth: '50%',
      labelWidth: '80px',
      formItems: [
        {
          label: '对应出差申请单',
          modelName: 'BusinessFormID',
          width: '60%',
          labelWidth: '150px',
          visible: false,
          type: 'select',
          selectConfig: {
            disabled: true,
            options: []
          }
        },
        {
          label: '',
          labelWidth: '0',
          width: '100%',
          type: 'slot',
          slotConfig: {
            name: 'html'
          }
        },
        {
          label: '',
          modelName: 'stepName',
          labelWidth: '0',
          width: '50%',
          type: 'slot',
          slotConfig: {
            name: 'steps'
          }
        },
        {
          label: '',
          modelName: 'lookList',
          labelWidth: '0',
          width: '50%',
          type: 'slot',
          slotConfig: {
            name: 'looks'
          }
        },
        {
          label: '审批意见',
          modelName: 'Suggest',
          rule: 'no_special',
          visible: false,
          width: '100%',
          inputConfig: {
            placeholder: '请输入审批意见',
            type: 'textarea',
            rows: 2
          }
        }
      ]
    },
    formModel: {
      BusinessFormID: '',
      Id: '',
      Suggest: ''
    }
  };
}
