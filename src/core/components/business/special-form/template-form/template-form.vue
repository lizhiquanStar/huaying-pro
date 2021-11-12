<template>
  <div>
    <el-dialog
      title="查看签单"
      :visible.sync="dialogVisibleSignOnly"
      width="50%"
      :before-close="handleClose"
      :close-on-click-modal="false"
      class="bs-template-form"
      v-if="otherShow.route === 'sign'"
    >
      <div id="printMe" class="print">
        <div class="chuchaName" v-if="isChucha">
          <label class="lable">对应出差申请单</label>
          <span>{{ chuchaName ? chuchaName.value : '' }}</span>
        </div>
        <div v-if="FormType === 1">
          <bs-chucha-form
            v-if="url === '1'"
            :dataChild="dataChild"
            :dataList="dataList"
          ></bs-chucha-form>
          <bs-jiaban-form
            v-else-if="url === '2'"
            :dataChild="dataChild"
            :dataList="dataList"
          ></bs-jiaban-form>
          <bs-nianjia-form
            v-else-if="url === '3'"
            :dataChild="dataChild"
            :dataList="dataList"
          ></bs-nianjia-form>
          <bs-binjia-form
            v-else-if="url === '4'"
            :dataChild="dataChild"
            :dataList="dataList"
          ></bs-binjia-form>
          <bs-binjia-more-form
            v-else-if="url === '5'"
            :dataChild="dataChild"
            :dataList="dataList"
          ></bs-binjia-more-form>
          <bs-shijia-form
            v-else-if="url === '6'"
            :dataChild="dataChild"
            :dataList="dataList"
          ></bs-shijia-form>
          <bs-shijia-more-form
            v-else-if="url === '7'"
            :dataChild="dataChild"
            :dataList="dataList"
          ></bs-shijia-more-form>
          <bs-shijia-more-form
            v-else-if="url === '8'"
            :dataChild="dataChild"
            :dataList="dataList"
          ></bs-shijia-more-form>
          <bs-tiaoxiu-form
            v-else-if="url === '9' || url === '10'"
            :dataChild="dataChild"
            :dataList="dataList"
          ></bs-tiaoxiu-form>
        </div>
        <div v-else>
          <div class="contentHtml" v-html="content"></div>
        </div>
        <div class="auditLook">
          <div class="step" v-if="isShow">
            <h5>审批记录</h5>
            <el-steps direction="vertical" :active="orderStatus">
              <el-step
                v-for="(item, index) in auditList"
                :key="index"
                :title="item.Name"
                icon="el-icon-edit"
              >
                <template slot="description">
                  <p>
                    <span
                      >{{
                        item.State === -1
                          ? '发起人'
                          : item.State === 0
                          ? '查阅人'
                          : item.State > 0
                          ? '审核人'
                          : ''
                      }}：{{ item.UserName }}</span
                    >
                    <span
                      >意见：<b
                        :style="{
                          color: item.State === 2 ? '#f00' : '#52C41A'
                        }"
                        >{{ item.Commit }}</b
                      ></span
                    >
                  </p>
                  <p>
                    <span>{{ item.Time }}</span>
                  </p>
                </template>
              </el-step>
            </el-steps>
          </div>
          <div class="look" v-if="isShow">
            <h5>查看记录</h5>
            <ul>
              <li v-for="(item, index) in lookList" :key="index">
                <b>【{{ item.RoleName }}】</b>{{ item.UserName }}
                <span
                  :style="{
                    color: item.State === 0 ? '#f00' : ''
                  }"
                  >{{ item.Commit }}</span
                >
                <span>{{ item.Time }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleBtnName">打印</el-button>
        <el-button @click="dialogVisibleSignOnly = false">取 消</el-button>
      </div>
    </el-dialog>
    <comp-add-edit-dialog
      :addEditDialogConfig="addEditDialogConfig"
      class="bs-template-form"
    >
      <template #html>
        <div v-if="FormType === 1">
          <bs-chucha-form
            v-if="url === '1'"
            :dataChild="dataChild"
            :dataList="dataList"
          ></bs-chucha-form>
          <bs-jiaban-form
            v-else-if="url === '2'"
            :dataChild="dataChild"
            :dataList="dataList"
          ></bs-jiaban-form>
          <bs-nianjia-form
            v-else-if="url === '3'"
            :dataChild="dataChild"
            :dataList="dataList"
          ></bs-nianjia-form>
          <bs-binjia-form
            v-else-if="url === '4'"
            :dataChild="dataChild"
            :dataList="dataList"
          ></bs-binjia-form>
          <bs-binjia-more-form
            v-else-if="url === '5'"
            :dataChild="dataChild"
            :dataList="dataList"
          ></bs-binjia-more-form>
          <bs-shijia-form
            v-else-if="url === '6'"
            :dataChild="dataChild"
            :dataList="dataList"
          ></bs-shijia-form>
          <bs-shijia-more-form
            v-else-if="url === '7'"
            :dataChild="dataChild"
            :dataList="dataList"
          ></bs-shijia-more-form>
          <bs-shijia-more-form
            v-else-if="url === '8'"
            :dataChild="dataChild"
            :dataList="dataList"
          ></bs-shijia-more-form>
          <bs-tiaoxiu-form
            v-else-if="url === '9' || url === '10'"
            :dataChild="dataChild"
            :dataList="dataList"
          ></bs-tiaoxiu-form>
        </div>
        <div v-else>
          <div class="contentHtml" v-html="content"></div>
        </div>
      </template>

      <template #steps v-if="isShow">
        <div class="step">
          <h5>审批记录</h5>
          <el-steps direction="vertical" :active="orderStatus">
            <el-step
              v-for="(item, index) in auditList"
              :key="index"
              :title="item.Name"
              icon="el-icon-edit"
            >
              <template slot="description">
                <p>
                  <span
                    >{{
                      item.State === -1
                        ? '发起人'
                        : item.State === 0
                        ? '查阅人'
                        : item.State > 0
                        ? '审核人'
                        : ''
                    }}：{{ item.UserName }}</span
                  >
                  <span
                    >意见：<i
                      :style="{
                        color: item.State === 2 ? '#f00' : '#52C41A'
                      }"
                      >{{ item.Commit }}</i
                    ></span
                  >
                </p>
                <p>
                  <span>{{ item.Time }}</span>
                </p>
              </template>
            </el-step>
          </el-steps>
        </div>
      </template>

      <template #looks v-if="isShow">
        <div class="look">
          <h5>查看记录</h5>
          <ul>
            <li v-for="(item, index) in lookList" :key="index">
              <b>【{{ item.RoleName }}】</b>{{ item.UserName }}
              <span
                :style="{
                  color: item.State === 0 ? '#f00' : ''
                }"
                >{{ item.Commit }}</span
              >
              <span>{{ item.Time }}</span>
            </li>
          </ul>
        </div>
      </template>
    </comp-add-edit-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';
import { BsTemplateFormConfig } from './template-form.config';
import printJS from 'print-js';
import BsChuchaForm from '../chucha-form/chucha-form.vue';
import BsJiabanForm from '../jiaban-form/jiaban-form.vue';
import BsNianjiaForm from '../nianjia-form/nianjia-form.vue';
import BsBinjiaForm from '../binjia-form/binjia-form.vue';
import BsBinjiaMoreForm from '../binjia-more-form/binjia-more-form.vue';
import BsShijiaForm from '../shijia-form/shijia-form.vue';
import BsShijiaMoreForm from '../shijia-more-form/shijia-more-form.vue';
import BsTiaoxiuForm from '../tiaoxiu-form/tiaoxiu-form.vue';

@Component({
  components: {
    BsShijiaMoreForm, // <bs-shijia-more-form>
    BsShijiaForm, // <bs-shijia-form>
    BsBinjiaMoreForm, // <bs-binjia-more-form>
    BsBinjiaForm, // <bs-binjia-form>
    BsNianjiaForm, // <bs-nianjia-form>
    BsJiabanForm, // <bs-jiaban-form>
    BsChuchaForm, // <bs-chucha-form>
    BsTiaoxiuForm //<bs-tiaoxiu-form>
  }
})
export default class BsTemplateForm extends Mixins(BsTemplateFormConfig) {
  otherShow: any = {};
  @Prop({
    type: Object,
    default() {
      return {};
    }
  })
  dataRow!: any;
  @Watch('dataRow', { immediate: true, deep: true })
  onRowChange(row: any) {
    console.log(row);
    if (row.FormType === 0 || row.FormType === 1) {
      this.otherShow = row;
      this.$nextTick(() => {
        this.getAuditLook(row);
      });
    }
  }

  @Prop({
    type: Object,
    default() {
      return {};
    }
  })
  dataFormList!: any;
  @Watch('dataFormList', { immediate: true, deep: true })
  onChange(v: any) {
    this.dataList.bmlist = v.bmlist;
  }

  // 打印后处理
  async handleBtnName() {
    printJS({
      printable: 'printMe',
      type: 'html',
      css: [
        '/print.css',
        'https://unpkg.com/element-ui/lib/theme-chalk/index.css'
      ],
      scanStyles: false
    });
  }

  handleClose() {
    this.dialogVisibleSignOnly = false;
  }
}
</script>

<style lang="scss">
@import 'src/core/styles/export.scss';

@include b(bs-template-form) {
  .name {
    color: #0088ff;
    cursor: pointer;
  }
  .step {
    line-height: normal;
    h5 {
      font-size: 14px;
      color: #333;
      background: #f2f2f2;
      width: 95%;
      text-align: center;
      height: 32px;
      line-height: 32px;
      margin: 0 0 15px;
      padding: 0;
    }
    .el-step__description {
      color: #666;
      p {
        margin: 0 0 5px;
        span {
          margin: 0 20px 0 0;
          display: inline-block;
          width: auto;
          i {
            font-style: normal;
            font-weight: 400;
          }
        }
      }
    }
  }
  .look {
    h5 {
      font-size: 14px;
      color: #333;
      background: #f2f2f2;
      width: 95%;
      text-align: center;
      height: 32px;
      line-height: 32px;
      margin: 0 0 15px;
      padding: 0;
    }
    ul {
      li {
        font-size: 12px;
        color: #666;
        margin: 0 0 10px;
        b {
          color: #333;
        }
        span {
          margin: 0 0 0 16px;
          display: inline-block;
          width: auto;
        }
      }
    }
  }
  .auditLook {
    display: flex;
    flex-direction: row;
    .step {
      line-height: normal;
      width: 48%;
      h5 {
        font-size: 14px;
        color: #333;
        background: #f2f2f2;
        text-align: center;
        height: 32px;
        line-height: 32px;
        margin: 15px 0;
      }
      .el-step__description {
        color: #666;
        p {
          margin: 0 0 5px;
          span {
            margin: 0 20px 0 0;
            display: inline-block;
            width: auto;
            i {
              font-style: normal;
              font-weight: 400;
            }
          }
        }
      }
    }
    .look {
      width: 48%;
      margin: 0 0 0 20px;
      h5 {
        font-size: 14px;
        color: #333;
        background: #f2f2f2;
        text-align: center;
        height: 32px;
        line-height: 32px;
        margin: 15px 0;
      }
      ul {
        li {
          font-size: 12px;
          color: #666;
          margin: 0 0 10px;
          b {
            color: #333;
          }
          span {
            margin: 0 0 0 16px;
            display: inline-block;
            width: auto;
          }
        }
      }
    }
  }
}
</style>
