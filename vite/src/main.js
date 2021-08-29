import { createApp } from 'vue'
import * as VueRouter from 'vue-router'
import App from './App.vue'
import Page1 from './pages/page1.vue'
import Page2 from './pages/page2.vue'

const routes = [
  { path: '/', component: Page1 },
  { path: '/page2', component: Page2 },
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory('/micro-app/vite/'),
  routes,
})

const app = createApp(App)
app.use(router)
app.mount('#vite-app')
