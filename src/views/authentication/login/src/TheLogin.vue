<template>
  <div class="the-login">
    <div class="the-login__container">
      <div class="the-login__form">
        <comp-tabs class="the-login__tabs" :tabsConfig="tabsConfig">
          <!-- 账户密码登录 -->
          <div class="the-login__password" slot="password">
            <comp-form :formConfig="passwordFormConfig" @keyup.native="onKeyup">
            </comp-form>
            <el-checkbox v-model="checked" @change="remember"
              >记住密码</el-checkbox
            >
            <el-button
              :loading="passwordLoadingFunc.loading"
              class="the-login__submit"
              type="primary"
              @click="formValidate"
              >{{ passwordLoadingFunc.text }}</el-button
            >
          </div>
          <!-- 手机快捷登录 -->
          <div class="the-login__phone" slot="phone">
            <comp-form :formConfig="phoneFormConfig">
              <template #captcha>
                <el-button
                  size="mini"
                  :disabled="sendSmsFunc.disable"
                  @click="sendSmsFunc.send(phoneFormConfig.formModel.name)"
                  >{{ sendSmsFunc.showText }}</el-button
                >
              </template>
            </comp-form>
            <el-button
              :loading="mobileLoadingFunc.loading"
              class="the-login__submit"
              type="primary"
              @click="formValidate('phone')"
              @keyup.enter="formValidate('phone')"
              >{{ mobileLoadingFunc.text }}</el-button
            >
          </div>
        </comp-tabs>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { TheLoginConfig } from './TheLogin.config';
import { TheLoginApi } from './TheLogin.api';
import { CaptchaFunc } from '../../../../core/funcs/captcha.func';
import { SendSmsFunc } from '../../../../core/funcs/send-sms.func';

@Component({})
export default class TheLogin extends Mixins(TheLoginConfig) {
  captchaFunc = new CaptchaFunc(TheLoginApi.codeImageUrl);
  sendSmsFunc = new SendSmsFunc({
    api: TheLoginApi.codeMobile,
    smsKey: 'mobile'
  });
  formValidate(formName?: string) {
    typeof formName === 'string'
      ? this.emit(this.COMPONENT_METHOD.formValidate, null, formName)
      : this.emit(this.COMPONENT_METHOD.formValidate);
  }

  onKeyup(e: KeyboardEvent) {
    if (e.keyCode === 13) {
      this.formValidate();
    }
  }
}
</script>

<style lang="scss">
@import 'src/core/styles/export.scss';

@include b(the-login) {
  .el-form-item__label {
    text-align: left;
  }
  input::-webkit-input-placeholder {
    color: $placeholderColor;
  }
  input:-moz-placeholder {
    color: $placeholderColor;
  }
  input::-moz-placeholder {
    color: $placeholderColor;
  }
  input:-ms-input-placeholder {
    color: $placeholderColor;
  }
  .el-form-item {
    border-bottom: 1px solid $borderAidColor;
    margin-bottom: 15px;
  }

  position: relative;
  width: 100%;
  height: 100%;
  background-image: url('../../../../assets/images/login/bg.png');
  background-size: 100% 100%;
  background-position: 50% 50%;
  background-size: cover;
  @include layout();
  @include layout-align(center, center);
  @include e(container) {
    height: 415px;
    @include layout();
    width: 100%;
    @include layout-align(end, end);
    flex-wrap: nowrap;
    @include e(form) {
      position: relative;
      width: 377px;
      margin-right: 15%;
      height: 100%;
      @include e(tabs) {
        width: 100%;
        padding: 20px;
        .el-tabs__header {
          margin: 30px 0 40px;
        }
        .el-tabs__item {
          color: $aidFontColor;
          &.is-active {
            color: $brandColor;
            font-weight: bold;
          }
        }
        .el-tabs__active-bar {
          background: none;
        }
        .el-tabs__nav-wrap::after {
          display: none;
        }

        @include e(password) {
          .captcha {
            width: 105px;
            height: 32px;
            cursor: pointer;
          }
        }
        @include e(phone) {
          .captcha {
            width: 105px;
            height: 32px;
            cursor: pointer;
          }
        }
        @include e(submit) {
          width: 100%;
          margin: 20px 0 0;
        }
        .comp-form__form {
          padding: 0;
        }
        .el-input__inner {
          color: $defaultFontColor;
          background: none;
          border: none;
        }
      }
    }
    .base-form-item__tip,
    .base-form-item__error {
      bottom: -15px;
    }
  }
}
.the-login__notify-chrome {
  width: 360px;
  .el-button {
    width: 130px;
    height: 32px;
    background: $brandColor;
    color: #fff;
    padding: 10px 5px;
  }
}
</style>
