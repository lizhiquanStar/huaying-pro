import Vue from 'vue';
import Router, { RawLocation } from 'vue-router';
import AuthenticationRoutes from '../views/authentication/index.route';
import SystemRoutes from '../views/system/index.route';
import TheContainer from '@/app/layout/container';
import HomeRoute from '../views/home/index.route';
import DataAnalysisRoutes from '../views/data-analysis/index.route';
import MarketSecond from '../views/market-second/index.route';
/**
 * 修复vue router 3.1.1以下，push相同路由会报错的问题
 */
const originalPush = Router.prototype.push;
Router.prototype.push = function(loation: RawLocation) {
  const push = originalPush.bind(this);
  return push(loation).catch((e: Error) => e) as any;
};

Vue.use(Router);

const layoutRoute = {
  path: '',
  component: TheContainer,
  children: [HomeRoute, ...SystemRoutes, ...DataAnalysisRoutes, ...MarketSecond]
};

export default new Router({
  routes: [
    {
      path: '/login',
      redirect: '/login'
    },
    ...AuthenticationRoutes,
    layoutRoute,
    {
      path: '*',
      redirect: '/error-404'
    }
  ]
});
