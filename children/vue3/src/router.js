import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Home from './pages/page1.vue';

const routes = createRouter({
  history: createWebHistory(window.__MICRO_APP_BASE_URL__ || '/micro-app/vue3/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/page2',
      name: 'page2',
      component: () => import(/* webpackChunkName: "page2" */ './pages/page2.vue'),
    },
  ]
})


export default routes
