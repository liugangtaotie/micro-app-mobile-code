import Vue from "vue";
import Router from "vue-router";

/**
 * 路由分模块管理
 */
import _homeRouter from "./_homeRouter"; // 主页模块
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    ..._homeRouter,
  // sub-first
  {
    path: "/sub-first",
    name: "sub-first",
    component: () => import(/* webpackChunkName: "sub-first" */ "@VIE/sub-first.vue"),
  },
  // sub-second
  {
    path: "/sub-second",
    name: "sub-second",
    component: () => import(/* webpackChunkName: "sub-second" */ "@VIE/sub-second.vue"),
  },
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
