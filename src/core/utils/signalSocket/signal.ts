import * as signalR from '@aspnet/signalr';

const socket = new signalR.HubConnectionBuilder()
  .withUrl(
    process.env.NODE_ENV === 'production'
      ? '/chatHub'
      : 'http://192.168.1.247:9001/chatHub',
    {}
  )
  .build();

export default {
  install: (Vue: any) => {
    Vue.prototype.$socket = socket;
  }
};
