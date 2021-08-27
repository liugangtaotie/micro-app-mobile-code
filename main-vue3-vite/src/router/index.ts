import React16 from "../pages/react16.vue";
import {createRouter, createWebHistory} from "vue-router";

const routes = [
  {
    path: '/',
    redirect: '/react16/'
  },
  {
    path: '/react16/:page*',
    name: 'react16',
    component: React16,
  },
  {
    path: '/react17/:page*',
    name: 'react17',
    component: () => import(/* webpackChunkName: "react17" */ '../pages/react17.vue'),
  },
  {
    path: '/vue2/:page*',
    name: 'vue2',
    component: () => import(/* webpackChunkName: "vue2" */ '../pages/vue2.vue'),
  },
  {
    path: '/vue3/:page*',
    name: 'vue3',
    component: () => import(/* webpackChunkName: "vue3" */ '../pages/vue3.vue'),
  },
  {
    path: '/vite/:page*',
    name: 'vite',
    component: () => import(/* webpackChunkName: "vite" */ '../pages/vite.vue'),
  },
  {
    path: '/angular11/:page*',
    name: 'angular11',
    component: () => import(/* webpackChunkName: "angular11" */ '../pages/angular11.vue'),
  },
  {
    path: '/multiple/:page*',
    name: 'multiple',
    component: () => import(/* webpackChunkName: "multiple" */ '../pages/multiple.vue'),
  },
  {
    path: '/self/:page*',
    name: 'self',
    component: () => import(/* webpackChunkName: "self" */ '../pages/self.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), routes: routes
})

export default router;
