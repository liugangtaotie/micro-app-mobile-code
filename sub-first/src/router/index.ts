import Vue from "vue";
import Router from "vue-router";

/**
 * 路由分模块管理
 */
import _homeRouter from "./_homeRouter"; // 主页模块
Vue.use(Router);

export default new Router({
  options: {
    // 添加路由前缀，子应用可以通过window.__MICRO_APP_BASE_URL__获取基座下发的baseurl
    base: window.__MICRO_APP_BASE_URL__ || '/',
  },
  history:'/micro-app/sub-first/',
  routes: [
    ..._homeRouter,
    /**
     * 404 Page
     */
    {
      path: "*",
      meta: {
        title: "页面找不到了～！～",
      },
      component: () => import("@VIE/404.vue"),
    },
  ],
} as any);
