import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $hasPermission: (permissionName: string) => boolean;
    $socket: any;
  }
}

declare const BMap: any;
declare const AMap: any;
declare const window: any;
